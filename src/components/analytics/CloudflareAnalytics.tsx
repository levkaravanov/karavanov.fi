import Script from "next/script";

type CloudflareAnalyticsProps = {
  token?: string;
};

export function CloudflareAnalytics({ token }: CloudflareAnalyticsProps) {
  if (!token) return null;

  return (
    <Script
      id="cloudflare-web-analytics"
      src="https://static.cloudflareinsights.com/beacon.min.js"
      strategy="afterInteractive"
      data-cf-beacon={JSON.stringify({ token })}
      data-karavanov-analytics="cloudflare"
    />
  );
}
