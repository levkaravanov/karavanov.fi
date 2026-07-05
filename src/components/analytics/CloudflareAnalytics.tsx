"use client";

import { useEffect } from "react";

type CloudflareAnalyticsProps = {
  token?: string;
};

export function CloudflareAnalytics({ token }: CloudflareAnalyticsProps) {
  useEffect(() => {
    if (!token) return;
    if (document.getElementById("cloudflare-web-analytics")) return;

    const script = document.createElement("script");
    script.id = "cloudflare-web-analytics";
    script.async = false;
    script.defer = true;
    script.src = "https://static.cloudflareinsights.com/beacon.min.js";
    script.setAttribute("data-cf-beacon", JSON.stringify({ token }));
    script.setAttribute("data-karavanov-analytics", "cloudflare");

    document.body.appendChild(script);
  }, [token]);

  return null;
}
