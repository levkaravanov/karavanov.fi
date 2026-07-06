#!/usr/bin/env node
import { createHash, createSign } from "node:crypto";
import { readFile } from "node:fs/promises";

const DEFAULT_PROJECT_ID = "karavanovfi-501610";
const DEFAULT_HOSTING_SITE = "karavanovfi";
const DEFAULT_LOOKBACK_DAYS = 7;
const DEFAULT_MAX_LOG_ENTRIES = 10000;
const LOGGING_SCOPE = "https://www.googleapis.com/auth/logging.read";
const TOKEN_URL = "https://oauth2.googleapis.com/token";
const ENTRIES_URL = "https://logging.googleapis.com/v2/entries:list";

const env = {
  projectId: process.env.GCP_PROJECT_ID || DEFAULT_PROJECT_ID,
  hostingSite: process.env.FIREBASE_HOSTING_SITE || DEFAULT_HOSTING_SITE,
  lookbackDays: Number(process.env.WEEKLY_ANALYTICS_LOOKBACK_DAYS || DEFAULT_LOOKBACK_DAYS),
  maxLogEntries: Number(process.env.HOSTING_ANALYTICS_MAX_LOG_ENTRIES || DEFAULT_MAX_LOG_ENTRIES),
  serviceAccountJson: process.env.GOOGLE_SERVICE_ACCOUNT_JSON,
  serviceAccountJsonBase64: process.env.GOOGLE_SERVICE_ACCOUNT_JSON_BASE64,
  googleApplicationCredentials: process.env.GOOGLE_APPLICATION_CREDENTIALS,
  slackWebhookUrl: process.env.SLACK_WEBHOOK_URL,
  dryRun: process.env.HOSTING_ANALYTICS_DRY_RUN === "1" || process.argv.includes("--dry-run"),
};

main().catch(async (error) => {
  const message = `Weekly hosting logs digest failed: ${error.message}`;
  console.error(message);

  if (env.slackWebhookUrl) {
    try {
      await sendSlackMessage(`:warning: *karavanov.fi hosting logs digest failed*\n${escapeSlack(message)}`);
    } catch (slackError) {
      console.error(`Could not send failure notification to Slack: ${slackError.message}`);
    }
  }

  process.exitCode = 1;
});

async function main() {
  validateEnv();

  const period = getPeriod(env.lookbackDays);
  const credentials = await readServiceAccountCredentials();
  const accessToken = await getAccessToken(credentials);
  const entries = await listHostingLogEntries(accessToken, period);
  const report = buildReport(entries, period);
  const message = formatSlackDigest(report);

  if (env.dryRun || !env.slackWebhookUrl) {
    console.log(message);
    return;
  }

  await sendSlackMessage(message);
  console.log(`Sent weekly hosting logs digest for ${env.projectId}/${env.hostingSite}.`);
}

function validateEnv() {
  if (!Number.isFinite(env.lookbackDays) || env.lookbackDays < 1) {
    throw new Error("WEEKLY_ANALYTICS_LOOKBACK_DAYS must be a positive number.");
  }

  if (!Number.isFinite(env.maxLogEntries) || env.maxLogEntries < 1) {
    throw new Error("HOSTING_ANALYTICS_MAX_LOG_ENTRIES must be a positive number.");
  }

  if (!env.serviceAccountJson && !env.serviceAccountJsonBase64 && !env.googleApplicationCredentials) {
    throw new Error(
      "Missing service account credentials. Set GOOGLE_SERVICE_ACCOUNT_JSON, GOOGLE_SERVICE_ACCOUNT_JSON_BASE64, or GOOGLE_APPLICATION_CREDENTIALS.",
    );
  }
}

function getPeriod(lookbackDays) {
  const end = new Date();
  const start = new Date(end);
  start.setUTCDate(start.getUTCDate() - lookbackDays);

  const previousStart = new Date(start);
  previousStart.setUTCDate(previousStart.getUTCDate() - lookbackDays);

  return {
    start,
    end,
    previousStart,
    startIso: start.toISOString(),
    endIso: end.toISOString(),
    previousStartIso: previousStart.toISOString(),
    label: `${formatDate(start)} - ${formatDate(end)} UTC`,
  };
}

function formatDate(date) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "UTC",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

async function readServiceAccountCredentials() {
  if (env.serviceAccountJsonBase64) {
    return parseServiceAccountJson(Buffer.from(env.serviceAccountJsonBase64, "base64").toString("utf8"));
  }

  if (env.serviceAccountJson) {
    return parseServiceAccountJson(env.serviceAccountJson);
  }

  const fileContents = await readFile(env.googleApplicationCredentials, "utf8");
  return parseServiceAccountJson(fileContents);
}

function parseServiceAccountJson(value) {
  const credentials = JSON.parse(value);
  const requiredFields = ["client_email", "private_key"];
  for (const field of requiredFields) {
    if (!credentials[field]) throw new Error(`Service account JSON is missing ${field}.`);
  }

  return credentials;
}

async function getAccessToken(credentials) {
  const now = Math.floor(Date.now() / 1000);
  const header = {
    alg: "RS256",
    typ: "JWT",
    ...(credentials.private_key_id ? { kid: credentials.private_key_id } : {}),
  };
  const claimSet = {
    iss: credentials.client_email,
    scope: LOGGING_SCOPE,
    aud: TOKEN_URL,
    exp: now + 3600,
    iat: now,
  };

  const unsignedToken = `${base64UrlJson(header)}.${base64UrlJson(claimSet)}`;
  const signature = createSign("RSA-SHA256").update(unsignedToken).sign(credentials.private_key, "base64url");
  const assertion = `${unsignedToken}.${signature}`;

  const response = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion,
    }),
  });
  const data = await response.json();

  if (!response.ok || !data.access_token) {
    throw new Error(`Could not obtain Google access token (${response.status}): ${JSON.stringify(data)}`);
  }

  return data.access_token;
}

function base64UrlJson(value) {
  return Buffer.from(JSON.stringify(value)).toString("base64url");
}

async function listHostingLogEntries(accessToken, period) {
  const filter = [
    'resource.type="firebase_domain"',
    'logName:"webrequests"',
    `timestamp >= "${period.previousStartIso}"`,
    `timestamp < "${period.endIso}"`,
  ].join("\n");

  const entries = [];
  let pageToken;

  do {
    const response = await fetch(ENTRIES_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        resourceNames: [`projects/${env.projectId}`],
        filter,
        orderBy: "timestamp desc",
        pageSize: Math.min(1000, env.maxLogEntries - entries.length),
        ...(pageToken ? { pageToken } : {}),
      }),
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(`Cloud Logging entries.list failed (${response.status}): ${JSON.stringify(data)}`);
    }

    entries.push(...(data.entries || []));
    pageToken = data.nextPageToken;
  } while (pageToken && entries.length < env.maxLogEntries);

  return entries;
}

function buildReport(entries, period) {
  const currentEntries = entries.filter((entry) => {
    const timestamp = new Date(entry.timestamp || entry.receiveTimestamp || 0);
    return timestamp >= period.start && timestamp < period.end;
  });
  const previousEntries = entries.filter((entry) => {
    const timestamp = new Date(entry.timestamp || entry.receiveTimestamp || 0);
    return timestamp >= period.previousStart && timestamp < period.start;
  });

  const current = summarizeEntries(currentEntries);
  const previous = summarizeEntries(previousEntries);

  return {
    period,
    projectId: env.projectId,
    hostingSite: env.hostingSite,
    truncated: entries.length >= env.maxLogEntries,
    current,
    previous,
  };
}

function summarizeEntries(entries) {
  const pageRequests = entries
    .map(normalizeLogEntry)
    .filter((entry) => entry.matchesHostingSite)
    .filter((entry) => entry.isPageRequest);
  const humanPageRequests = pageRequests.filter((entry) => !entry.isBot);
  const botPageRequests = pageRequests.filter((entry) => entry.isBot);
  const statusCounts = countBy(pageRequests, (entry) => String(entry.status || "unknown"));
  const errorRequests = pageRequests.filter((entry) => entry.status >= 400);
  const serverErrors = pageRequests.filter((entry) => entry.status >= 500);
  const uniqueVisitors = new Set(
    humanPageRequests
      .map((entry) => visitorKey(entry))
      .filter(Boolean),
  );

  return {
    totalLogEntries: entries.length,
    pageRequestCount: pageRequests.length,
    humanPageRequestCount: humanPageRequests.length,
    botPageRequestCount: botPageRequests.length,
    uniqueVisitorCount: uniqueVisitors.size,
    errorRequestCount: errorRequests.length,
    serverErrorCount: serverErrors.length,
    topPages: topCounts(countBy(humanPageRequests, (entry) => entry.path), 6),
    countries: topCounts(countBy(humanPageRequests, (entry) => entry.country || "Unknown"), 6),
    referrers: topCounts(countBy(humanPageRequests, (entry) => referrerLabel(entry)), 6),
    hostnames: topCounts(countBy(humanPageRequests, (entry) => entry.hostname || "Unknown"), 4),
    statuses: topCounts(statusCounts, 6),
    errors: topCounts(countBy(errorRequests, (entry) => `${entry.status} ${entry.path}`), 5),
  };
}

function normalizeLogEntry(entry) {
  const httpRequest = entry.httpRequest || {};
  const payload = entry.jsonPayload || {};
  const url = httpRequest.requestUrl || payload.requestUrl || "";
  const parsedUrl = safeUrl(url);
  const pathname = normalizePath(parsedUrl?.pathname || payload.path || "/");
  const hostname = payload.hostname || parsedUrl?.hostname || entry.resource?.labels?.domain_name || "";
  const method = httpRequest.requestMethod || payload.requestMethod || "GET";
  const status = Number(httpRequest.status || payload.status || 0);
  const userAgent = httpRequest.userAgent || payload.userAgent || "";
  const resourceLabels = entry.resource?.labels || {};
  const hostingSite =
    payload.site ||
    payload.siteName ||
    payload.site_name ||
    resourceLabels.site ||
    resourceLabels.site_name ||
    resourceLabels.site_id ||
    "";

  return {
    timestamp: entry.timestamp || entry.receiveTimestamp,
    url,
    path: pathname,
    hostname,
    method,
    status,
    referer: httpRequest.referer || payload.referer || "",
    remoteIp: httpRequest.remoteIp || payload.remoteIp || "",
    userAgent,
    country: payload.remoteIpCountry || "Unknown",
    city: payload.remoteIpCity || "",
    hostingSite,
    matchesHostingSite: !hostingSite || hostingSite === env.hostingSite,
    isBot: isBotUserAgent(userAgent),
    isPageRequest: isPageRequest({ method, pathname }),
  };
}

function safeUrl(value) {
  if (!value) return undefined;

  try {
    return new URL(value);
  } catch {
    return undefined;
  }
}

function normalizePath(pathname) {
  if (!pathname || pathname === "/") return "/";
  const withoutTrailingSlash = pathname.replace(/\/+$/, "");
  return withoutTrailingSlash || "/";
}

function isPageRequest({ method, pathname }) {
  if (!["GET", "HEAD"].includes(String(method).toUpperCase())) return false;
  if (!pathname || pathname.startsWith("/_next/")) return false;
  if (pathname.startsWith("/media/") || pathname.startsWith("/icons/") || pathname.startsWith("/fonts/")) return false;
  if (["/favicon.ico", "/robots.txt", "/sitemap.xml", "/icon.png", "/apple-icon.png"].includes(pathname)) return false;
  if (/\.(?:avif|bmp|css|gif|ico|jpeg|jpg|js|json|map|mp4|png|svg|webm|webp|woff2?|xml)$/i.test(pathname)) return false;

  return true;
}

function isBotUserAgent(userAgent) {
  return /bot|crawler|spider|preview|facebookexternalhit|slurp|bing|duckduckgo|linkedinbot|whatsapp|telegram|discord|curl|wget/i.test(
    userAgent,
  );
}

function visitorKey(entry) {
  if (!entry.remoteIp && !entry.userAgent) return undefined;
  return createHash("sha256").update(`${entry.remoteIp}|${entry.userAgent}`).digest("hex");
}

function referrerLabel(entry) {
  if (!entry.referer) return "direct / none";
  const parsed = safeUrl(entry.referer);
  if (!parsed) return "unknown";
  if (entry.hostname && parsed.hostname === entry.hostname) return "internal";

  return parsed.hostname.replace(/^www\./, "");
}

function countBy(items, keyFn) {
  const counts = new Map();
  for (const item of items) {
    const key = keyFn(item);
    counts.set(key, (counts.get(key) || 0) + 1);
  }

  return counts;
}

function topCounts(counts, limit) {
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || String(a[0]).localeCompare(String(b[0])))
    .slice(0, limit)
    .map(([label, count]) => ({ label, count }));
}

function formatSlackDigest(report) {
  const status = getReportStatus(report.current);
  const diff = report.current.humanPageRequestCount - report.previous.humanPageRequestCount;
  const diffLabel = formatDiff(diff);
  const warnings = [
    report.truncated ? `Log query reached HOSTING_ANALYTICS_MAX_LOG_ENTRIES=${env.maxLogEntries}; report may be partial.` : "",
    report.current.serverErrorCount > 0 ? `${report.current.serverErrorCount} server error page request(s) detected.` : "",
  ].filter(Boolean);

  return [
    `*karavanov.fi weekly site check*`,
    `_${report.period.label}_`,
    "",
    `*Status:* ${status}`,
    `*Human page requests:* ${report.current.humanPageRequestCount} (${diffLabel} vs previous ${env.lookbackDays}d)`,
    `*Approx unique visitors:* ${report.current.uniqueVisitorCount}`,
    `*Bot page requests:* ${report.current.botPageRequestCount}`,
    `*Errors:* ${report.current.errorRequestCount} page request(s), ${report.current.serverErrorCount} server error(s)`,
    formatSection("Top pages", report.current.topPages),
    formatSection("Countries", report.current.countries),
    formatSection("Referrers", report.current.referrers),
    formatSection("Hostnames", report.current.hostnames),
    formatSection("Statuses", report.current.statuses),
    report.current.errors.length ? formatSection("Errors", report.current.errors) : "",
    warnings.length ? `*Notes:*\n${warnings.map((item) => `- ${escapeSlack(item)}`).join("\n")}` : "",
  ].filter(Boolean).join("\n");
}

function getReportStatus(summary) {
  if (summary.serverErrorCount > 0) return ":warning: server errors detected";
  if (summary.humanPageRequestCount > 0) return ":white_check_mark: traffic present";
  if (summary.botPageRequestCount > 0) return ":information_source: bot-only traffic";
  return ":zzz: no page traffic";
}

function formatDiff(value) {
  if (value === 0) return "no change";
  return value > 0 ? `+${value}` : String(value);
}

function formatSection(title, rows) {
  if (!rows.length) return `*${title}:* no data`;
  return [`*${title}:*`, ...rows.map((row, index) => `${index + 1}. ${escapeSlack(row.label)} - ${row.count}`)].join("\n");
}

async function sendSlackMessage(text) {
  const response = await fetch(env.slackWebhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });

  if (!response.ok) {
    throw new Error(`Slack webhook failed (${response.status}): ${await response.text()}`);
  }
}

function escapeSlack(value) {
  return String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}
