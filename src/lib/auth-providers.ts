const disabledProviderValues = new Set(["disabled", "none", "off"]);

export function parsePublicAuthProviders(value?: string | null) {
  return (value ?? "")
    .split(",")
    .map((provider) => provider.trim().toLowerCase())
    .filter((provider) => provider && !disabledProviderValues.has(provider));
}

export function providerMatches(provider: string, aliases: string[]) {
  return aliases.includes(provider);
}
