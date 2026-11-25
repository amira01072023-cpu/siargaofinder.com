import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const appRoot = resolve(process.cwd(), "src/app");

function sourceFor(path: string) {
  return readFileSync(resolve(appRoot, path), "utf8");
}

describe("representative Journal pages", () => {
  it("keeps the established /blog URL while presenting the Journal identity and social metadata", () => {
    const source = sourceFor("blog/page.tsx");
    expect(source).toContain('canonical: "/blog"');
    expect(source).toContain("The Siargao Journal");
    expect(source).toContain("twitter:");
  });

  it("keeps canonical, article schema, dates, and social metadata on a representative blog post", () => {
    const source = sourceFor("blog/siargao-itinerary/page.tsx");
    expect(source).toContain('canonical: "/blog/siargao-itinerary"');
    expect(source).toContain('"@type": "Article"');
    expect(source).toContain("datePublished: publishedDate");
    expect(source).toContain("dateModified: publishedDate");
    expect(source).toContain("openGraph:");
  });

  it("provides a canonical, social image, Article schema, and public navigation on a guide page", () => {
    const source = sourceFor("guide/siargao-surf-schools-guide/page.tsx");
    expect(source).toContain('canonical: "/guide/siargao-surf-schools-guide"');
    expect(source).toContain("images: [DEFAULT_SOCIAL_IMAGE]");
    expect(source).toContain('"@type": "Article"');
    expect(source).toContain("<PublicSiteHeader");
  });
});
