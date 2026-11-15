const ADMIN_EMAIL = "info@siargaofinder.com";

function normalize(v: string | null | undefined) {
  return (v || "").trim().toLowerCase();
}

export function getAdminEmailAllowlist() {
  return [ADMIN_EMAIL];
}

export function isAdminEmail(email?: string | null) {
  return normalize(email) === ADMIN_EMAIL;
}
