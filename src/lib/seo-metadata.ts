export const DEFAULT_SOCIAL_IMAGE = {
  url: "/og-siargaofinder-logo.jpg",
  width: 1024,
  height: 1024,
  alt: "Siargao Finder local business directory",
};

const MAX_TITLE_LENGTH = 60;

function truncateAtWord(value: string, maxLength: number) {
  if (value.length <= maxLength) return value;
  const shortened = value.slice(0, Math.max(maxLength - 1, 1)).trimEnd();
  const lastSpace = shortened.lastIndexOf(" ");
  return `${lastSpace > 20 ? shortened.slice(0, lastSpace) : shortened}…`;
}

export function buildListingSeoTitle(businessName: string, municipality?: string | null) {
  const suffix = municipality ? ` | ${municipality}, Siargao` : " | Siargao";
  const availableNameLength = Math.max(MAX_TITLE_LENGTH - suffix.length, 24);
  return `${truncateAtWord(businessName, availableNameLength)}${suffix}`;
}

export function buildListingSeoDescription(
  businessName: string,
  municipality?: string | null,
  category?: string | null,
) {
  const location = municipality ? `${municipality}, Siargao` : "Siargao";
  const categoryText = category ? ` ${category.toLowerCase()}` : " business";
  const suffix = ` in ${location}. View contact details, address, services, and${categoryText} directory information.`;
  const availableNameLength = Math.max(160 - suffix.length, 32);
  return `${truncateAtWord(businessName, availableNameLength)}${suffix}`;
}
