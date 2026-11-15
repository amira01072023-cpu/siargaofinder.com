export const SIARGAO_MUNICIPALITIES = [
  "General Luna",
  "Dapa",
  "Del Carmen",
  "Pilar",
  "San Benito",
  "San Isidro",
  "Santa Monica",
  "Socorro",
  "Burgos",
];

export function municipalityToSlug(municipality: string) {
  return municipality
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function slugToMunicipality(slug: string) {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}
