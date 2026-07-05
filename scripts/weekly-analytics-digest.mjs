const DEFAULT_ACCOUNT_ID = "3db3cb9751c0edeb89e8106f287d0a31";
const DEFAULT_HOSTNAME = "karavanov.fi";
const DEFAULT_LOOKBACK_DAYS = 7;

const env = {
  accountId: process.env.CLOUDFLARE_ACCOUNT_ID || DEFAULT_ACCOUNT_ID,
  apiToken: process.env.CLOUDFLARE_API_TOKEN,
  hostname: process.env.CLOUDFLARE_WEB_ANALYTICS_HOSTNAME || DEFAULT_HOSTNAME,
  lookbackDays: Number(process.env.WEEKLY_ANALYTICS_LOOKBACK_DAYS || DEFAULT_LOOKBACK_DAYS),
  slackWebhookUrl: process.env.SLACK_WEBHOOK_URL,
};

main().catch(async (error) => {
  const message = `Weekly analytics digest failed: ${error.message}`;
  console.error(message);

  if (env.slackWebhookUrl) {
    await sendSlackMessage(`:warning: *karavanov.fi analytics digest failed*\n${escapeSlack(message)}`);
  }

  process.exitCode = 1;
});

async function main() {
  requireEnv("CLOUDFLARE_API_TOKEN", env.apiToken);
  requireEnv("SLACK_WEBHOOK_URL", env.slackWebhookUrl);

  const period = getPeriod(env.lookbackDays);
  const site = await findWebAnalyticsSite();
  const analytics = await loadAnalytics(period, site);
  const message = formatSlackDigest(period, site, analytics);

  await sendSlackMessage(message);
  console.log(`Sent weekly analytics digest for ${env.hostname}.`);
}

function requireEnv(name, value) {
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
}

function getPeriod(lookbackDays) {
  if (!Number.isFinite(lookbackDays) || lookbackDays < 1) {
    throw new Error("WEEKLY_ANALYTICS_LOOKBACK_DAYS must be a positive number.");
  }

  const end = new Date();
  const start = new Date(end);
  start.setUTCDate(start.getUTCDate() - lookbackDays);

  return {
    start,
    end,
    startIso: start.toISOString(),
    endIso: end.toISOString(),
    label: `${formatDate(start)} - ${formatDate(end)}`,
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

async function findWebAnalyticsSite() {
  try {
    const response = await cloudflareRest(`/accounts/${env.accountId}/rum/site_info/list`);
    const sites = Array.isArray(response.result) ? response.result : [];
    const site = sites.find((candidate) => {
      const values = [
        candidate.host,
        candidate.hostname,
        candidate.name,
        candidate.site_name,
        candidate.siteName,
      ].filter(Boolean);

      return values.some((value) => String(value).toLowerCase() === env.hostname.toLowerCase());
    });

    if (!site) {
      const knownSites = sites
        .map((candidate) => candidate.host || candidate.hostname || candidate.name || candidate.site_name)
        .filter(Boolean)
        .join(", ");
      return {
        id: undefined,
        hostname: env.hostname,
        siteTag: undefined,
        lookupWarning: `Cloudflare Web Analytics site "${env.hostname}" was not found. Known sites: ${knownSites || "none"}`,
      };
    }

    return {
      id: site.site_id || site.id,
      hostname: site.host || site.hostname || site.name || site.site_name || env.hostname,
      siteTag: site.site_tag || site.siteTag || site.tag,
    };
  } catch (error) {
    return {
      id: undefined,
      hostname: env.hostname,
      siteTag: undefined,
      lookupWarning: `Could not read Web Analytics site info via REST: ${error.message}`,
    };
  }
}

async function loadAnalytics(period, site) {
  const attempts = [
    {
      name: "rumPageloadEventsAdaptiveGroups by siteTag",
      query: buildRumQuery("rumPageloadEventsAdaptiveGroups", "siteTag"),
      variables: {
        accountTag: env.accountId,
        siteTag: site.siteTag,
        start: period.startIso,
        end: period.endIso,
      },
      enabled: Boolean(site.siteTag),
    },
    {
      name: "rumPageloadEventsAdaptiveGroups by requestHost",
      query: buildRumQuery("rumPageloadEventsAdaptiveGroups", "requestHost"),
      variables: {
        accountTag: env.accountId,
        requestHost: env.hostname,
        start: period.startIso,
        end: period.endIso,
      },
      enabled: true,
    },
    {
      name: "rumPageLoadEventsAdaptiveGroups by siteTag",
      query: buildRumQuery("rumPageLoadEventsAdaptiveGroups", "siteTag"),
      variables: {
        accountTag: env.accountId,
        siteTag: site.siteTag,
        start: period.startIso,
        end: period.endIso,
      },
      enabled: Boolean(site.siteTag),
    },
  ];

  const errors = [];

  for (const attempt of attempts.filter((item) => item.enabled)) {
    try {
      const data = await cloudflareGraphql(attempt.query, attempt.variables);
      const account = data.viewer?.accounts?.[0];
      if (!account) throw new Error("GraphQL response did not include account analytics data.");
      return parseAnalytics(account);
    } catch (error) {
      errors.push(`${attempt.name}: ${error.message}`);
    }
  }

  return {
    unavailable: true,
    error: errors.at(-1) || "No analytics query attempts were available.",
    troubleshooting: errors,
  };
}

function buildRumQuery(datasetName, hostFilterField) {
  const hostVariable = hostFilterField === "siteTag" ? "$siteTag" : "$requestHost";
  const hostVariableDeclaration = hostFilterField === "siteTag" ? "$siteTag: string!" : "$requestHost: string!";

  return `
    query WeeklyWebAnalytics($accountTag: string!, ${hostVariableDeclaration}, $start: Time!, $end: Time!) {
      viewer {
        accounts(filter: { accountTag: $accountTag }) {
          totals: ${datasetName}(
            limit: 1
            filter: { ${hostFilterField}: ${hostVariable}, datetime_geq: $start, datetime_lt: $end }
          ) {
            count
          }
          topPages: ${datasetName}(
            limit: 5
            orderBy: [count_DESC]
            filter: { ${hostFilterField}: ${hostVariable}, datetime_geq: $start, datetime_lt: $end }
          ) {
            count
            dimensions {
              requestPath
            }
          }
          countries: ${datasetName}(
            limit: 5
            orderBy: [count_DESC]
            filter: { ${hostFilterField}: ${hostVariable}, datetime_geq: $start, datetime_lt: $end }
          ) {
            count
            dimensions {
              countryName
            }
          }
          referrers: ${datasetName}(
            limit: 5
            orderBy: [count_DESC]
            filter: { ${hostFilterField}: ${hostVariable}, datetime_geq: $start, datetime_lt: $end }
          ) {
            count
            dimensions {
              refererHost
            }
          }
        }
      }
    }
  `;
}

function parseAnalytics(account) {
  const totalEvents = Number(account.totals?.[0]?.count || 0);

  return {
    totalEvents,
    topPages: rowsToList(account.topPages, "requestPath"),
    countries: rowsToList(account.countries, "countryName"),
    referrers: rowsToList(account.referrers, "refererHost"),
  };
}

function rowsToList(rows, dimensionName) {
  return (rows || [])
    .map((row) => ({
      label: row.dimensions?.[dimensionName] || "(unknown)",
      count: Number(row.count || 0),
    }))
    .filter((item) => item.count > 0);
}

function formatSlackDigest(period, site, analytics) {
  const header = `:bar_chart: *Weekly analytics: ${escapeSlack(site.hostname)}*\n_${period.label} UTC_`;
  const warning = site.lookupWarning ? `\n\n_Note: ${escapeSlack(site.lookupWarning)}_` : "";

  if (analytics.unavailable) {
    return [
      header,
      "",
      "Cloudflare Web Analytics site was found, but GraphQL metrics could not be read yet.",
      `Last error: \`${escapeSlack(analytics.error)}\``,
      warning.trim(),
      "",
      "Check that `CLOUDFLARE_API_TOKEN` has Analytics Read access. If Cloudflare changed the Web Analytics GraphQL dataset, update `scripts/weekly-analytics-digest.mjs`.",
    ].filter(Boolean).join("\n");
  }

  return [
    header,
    warning.trim(),
    "",
    `*Events:* ${analytics.totalEvents}`,
    formatSection("Top pages", analytics.topPages),
    formatSection("Countries", analytics.countries),
    formatSection("Referrers", analytics.referrers),
    "",
    `<https://${env.hostname}|Open site> | <https://dash.cloudflare.com/${env.accountId}/web-analytics/sites|Cloudflare Web Analytics>`,
  ].join("\n");
}

function formatSection(title, rows) {
  if (!rows.length) return `*${title}:* no data`;
  return [`*${title}:*`, ...rows.map((row, index) => `${index + 1}. ${escapeSlack(row.label)} — ${row.count}`)].join("\n");
}

async function cloudflareRest(path) {
  const response = await fetch(`https://api.cloudflare.com/client/v4${path}`, {
    headers: {
      Authorization: `Bearer ${env.apiToken}`,
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  if (!response.ok || !data.success) {
    const errorText = (data.errors || []).map((error) => `${error.code}: ${error.message}`).join("; ");
    throw new Error(`Cloudflare REST request failed (${response.status}): ${errorText || "unknown error"}`);
  }
  return data;
}

async function cloudflareGraphql(query, variables) {
  const response = await fetch("https://api.cloudflare.com/client/v4/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.apiToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables }),
  });
  const data = await response.json();
  if (!response.ok || data.errors?.length) {
    const errorText = (data.errors || []).map((error) => error.message).join("; ");
    throw new Error(`Cloudflare GraphQL request failed (${response.status}): ${errorText || "unknown error"}`);
  }
  return data.data;
}

async function sendSlackMessage(text) {
  const response = await fetch(env.slackWebhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });

  if (!response.ok) {
    throw new Error(`Slack webhook failed (${response.status}): ${await response.text()}`);
  }
}

function escapeSlack(value) {
  return String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}
