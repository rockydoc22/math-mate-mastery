/**
 * COPPA-compliant external link opener. Pair with the <ParentalGate /> dialog:
 * gate the action in your component, then call openExternal(url) on pass.
 * Use for any link that leaves the app: App Store, mailto, marketing site, etc.
 */
export const openExternal = (url: string) => {
  try {
    window.open(url, "_blank", "noopener,noreferrer");
  } catch {
    window.location.href = url;
  }
};
