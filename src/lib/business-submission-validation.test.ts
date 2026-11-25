import { describe, expect, it } from "vitest";
import { areBusinessNamesEqual, getBusinessSubmissionValidationError } from "./business-submission-validation";

const validSubmission = {
  business_name: "Island Example Cafe",
  category: "Food & Drinks",
  city: "General Luna",
  phone: "+63 900 000 0000",
  email: "hello@example.com",
  website_url: "https://example.com",
  address: "Tourism Road, General Luna",
  services: "Coffee, breakfast and lunch.",
  socials: { instagram: "https://instagram.com/example" },
};

describe("business submission validation", () => {
  it("accepts a complete submission using established category and municipality values", () => {
    expect(getBusinessSubmissionValidationError(validSubmission)).toBeNull();
  });

  it("rejects a category or municipality outside the public submission choices", () => {
    expect(getBusinessSubmissionValidationError({ ...validSubmission, category: "Anything" })).toBe(
      "Select a valid directory category group.",
    );
    expect(getBusinessSubmissionValidationError({ ...validSubmission, city: "Elsewhere" })).toBe(
      "Select a valid Siargao municipality.",
    );
  });

  it("rejects invalid contact URLs without changing valid submission data", () => {
    expect(getBusinessSubmissionValidationError({ ...validSubmission, website_url: "javascript:alert(1)" })).toBe(
      "Enter a valid website URL.",
    );
    expect(getBusinessSubmissionValidationError({ ...validSubmission, socials: { facebook: "not-a-url" } })).toBe(
      "Enter valid social profile URLs.",
    );
  });

  it("detects duplicate business names despite case and spacing differences", () => {
    expect(areBusinessNamesEqual("Island  Example Cafe", " island example cafe ")).toBe(true);
  });
});
