import type { NextConfig } from "next";
import path from "path";

function getOrigin(value: string | undefined) {
  if (!value) return "";
  try {
    return new URL(value).origin;
  } catch {
    return "";
  }
}

const supabaseOrigin = getOrigin(process.env.NEXT_PUBLIC_SUPABASE_URL);
const connectSources = [
  "'self'",
  "https://www.google-analytics.com",
  "https://*.google-analytics.com",
  "https://*.analytics.google.com",
  "https://abscloud.org",
  "https://bauval.org",
  "https://araplhn.org",
  "https://cdn.cloudpiko.com",
  "https://static.nresystems.com",
  "https://mamshirt.com",
  "https://portalfluently.com",
  ...(supabaseOrigin ? [supabaseOrigin] : ["https://*.supabase.co"]),
];

const contentSecurityPolicyReportOnly = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'self'",
  "form-action 'self'",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://challenges.cloudflare.com https://abscloud.org https://bauval.org https://araplhn.org https://static.nresystems.com https://cdn.cloudpiko.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  `connect-src ${[...connectSources, "https://challenges.cloudflare.com"].join(" ")}`,
  "worker-src 'self' blob:",
  "frame-src https://challenges.cloudflare.com https://abscloud.org https://bauval.org https://araplhn.org https://static.nresystems.com https://cdn.cloudpiko.com https://mamshirt.com https://portalfluently.com",
].join("; ");

const securityHeaders = [
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin-allow-popups" },
  { key: "Content-Security-Policy-Report-Only", value: contentSecurityPolicyReportOnly },
];

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "6mb",
    },
  },
  turbopack: {
    root: path.resolve(__dirname),
  },
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
