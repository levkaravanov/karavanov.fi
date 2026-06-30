"use client";

import { useEffect } from "react";

type CloudflareAnalyticsProps = {
  token?: string;
};

const analyticsScriptId = "cloudflare-web-analytics";

export function CloudflareAnalytics({ token }: CloudflareAnalyticsProps) {
  useEffect(() => {
    if (!token) return;
    if (document.getElementById(analyticsScriptId)) return;

    const script = document.createElement("script");
    script.id = analyticsScriptId;
    script.defer = true;
    script.src = "https://static.cloudflareinsights.com/beacon.min.js";
    script.dataset.cfBeacon = JSON.stringify({ token });
    script.dataset.karavanovAnalytics = "cloudflare";

    document.body.appendChild(script);
  }, [token]);

  return null;
}
