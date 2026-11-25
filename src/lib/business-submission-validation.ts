import { LISTING_CATEGORY_GROUPS } from "./listing-category-groups";
import { SIARGAO_MUNICIPALITIES } from "./siargao-municipalities";

const VALID_SUBMISSION_CATEGORIES = new Set(LISTING_CATEGORY_GROUPS.map((group) => group.label));
const VALID_SUBMISSION_MUNICIPALITIES = new Set(SIARGAO_MUNICIPALITIES);

export type BusinessSubmissionInput = {
  business_name: string;
  category: string;
  city: string;
  phone: string;
  email: string;
  website_url?: string | null;
  address: string;
  services: string;
  socials?: Record<string, string>;
};

export function normalizeBusinessName(value: string) {
  return value.toLowerCase().replace(/\s+/g, " ").trim();
}

export function areBusinessNamesEqual(first: string, second: string) {
  return normalizeBusinessName(first) === normalizeBusinessName(second);
}

export function isValidSubmissionEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function isValidPublicUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

export function getBusinessSubmissionValidationError(input: BusinessSubmissionInput) {
  if (!input.business_name || !input.category || !input.city || !input.phone || !input.email || !input.address || !input.services) {
    return "Missing required fields.";
  }

  if (!VALID_SUBMISSION_CATEGORIES.has(input.category)) {
    return "Select a valid directory category group.";
  }

  if (!VALID_SUBMISSION_MUNICIPALITIES.has(input.city)) {
    return "Select a valid Siargao municipality.";
  }

  if (!isValidSubmissionEmail(input.email)) {
    return "Invalid email address.";
  }

  const fieldLengths = [
    [input.business_name, 160],
    [input.category, 120],
    [input.city, 80],
    [input.phone, 80],
    [input.email, 254],
    [input.address, 300],
    [input.services, 1200],
    [input.website_url || "", 300],
    ...Object.values(input.socials || {}).map((value) => [value, 300] as const),
  ] as const;

  if (fieldLengths.some(([value, maxLength]) => value.length > maxLength)) {
    return "One or more fields are too long.";
  }

  if (input.website_url && !isValidPublicUrl(input.website_url)) {
    return "Enter a valid website URL.";
  }

  if (Object.values(input.socials || {}).some((value) => value && !isValidPublicUrl(value))) {
    return "Enter valid social profile URLs.";
  }

  return null;
}
