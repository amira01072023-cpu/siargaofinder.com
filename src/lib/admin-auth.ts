const DEFAULT_ADMIN_EMAIL = "info@siargaofinder.com";

function normalize(v: string | null | undefined) {
  return (v || "").trim().toLowerCase();
}

export function getAdminEmailAllowlist(
  rawAllowlist = process.env.ADMIN_EMAIL_ALLOWLIST,
  rawAdminEmail = process.env.ADMIN_EMAIL,
) {
  const parseEmails = (value: string | undefined) => [
    ...new Set(
      (value || "")
      .split(",")
      .map(normalize)
      .filter(Boolean),
    ),
  ];

  const configuredAllowlist = parseEmails(rawAllowlist);
  if (configuredAllowlist.length) return configuredAllowlist;

  const configuredSingleEmail = parseEmails(rawAdminEmail);
  if (configuredSingleEmail.length) return configuredSingleEmail;

  return [DEFAULT_ADMIN_EMAIL];
}

export function isAdminEmail(email?: string | null) {
  return getAdminEmailAllowlist().includes(normalize(email));
}
