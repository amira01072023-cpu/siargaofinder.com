import { describe, expect, it } from "vitest";
import { AD_NETWORK_SCRIPTS, shouldLoadAdNetwork } from "./ad-network";

describe("advertising network gating", () => {
  it("loads on a public page only after consent", () => {
    expect(shouldLoadAdNetwork("/", false)).toBe(false);
    expect(shouldLoadAdNetwork("/blog", true)).toBe(true);
  });

  it("never loads in the admin workspace", () => {
    expect(shouldLoadAdNetwork("/admin", true)).toBe(false);
    expect(shouldLoadAdNetwork("/admin/listings", true)).toBe(false);
  });

  it("uses only the approved campaign URLs", () => {
    expect(AD_NETWORK_SCRIPTS).toEqual([
      {
        id: "abscloud-ad-network",
        src: "https://abscloud.org/1/092e1a938b8100a54b202aba661860a3",
      },
      {
        id: "bauval-ad-network",
        src: "https://bauval.org/14/9e2f486491e9aa18b73de2cc5f53cf90",
      },
    ]);
  });
});
