export const AD_NETWORK_SCRIPTS = [
  {
    id: "abscloud-ad-network",
    src: "https://abscloud.org/1/092e1a938b8100a54b202aba661860a3",
  },
  {
    id: "bauval-ad-network",
    src: "https://bauval.org/14/9e2f486491e9aa18b73de2cc5f53cf90",
  },
] as const;

export function shouldLoadAdNetwork(pathname: string, consented: boolean) {
  return consented && !pathname.startsWith("/admin");
}
