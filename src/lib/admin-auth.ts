const FALLBACK_ADMIN_EMAIL = "amira.01072023@gmail.com";

function normalize(v: string | null | undefined) {
  return (v || "").trim().toLowerCase();
}

function parseAllowlist(raw: string | undefined) {
  return String(raw || "")
    .split(/[\s,;]+/)
    .map((x) => normalize(x))
    .filter(Boolean);
}

export function getAdminEmailAllowlist() {
  const fromAllowlist = parseAllowlist(process.env.ADMIN_EMAIL_ALLOWLIST);
  if (fromAllowlist.length > 0) return fromAllowlist;

  const fromSingle = normalize(process.env.ADMIN_EMAIL);
  if (fromSingle) return [fromSingle];

  return [normalize(FALLBACK_ADMIN_EMAIL)];
}

export function isAdminEmail(email?: string | null) {
  const candidate = normalize(email);
  if (!candidate) return false;
  return getAdminEmailAllowlist().includes(candidate);
}
