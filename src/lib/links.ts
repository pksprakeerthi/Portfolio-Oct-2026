/** A link counts as "set" once it is a non-empty string. Empty string = placeholder. */
export function isLinkSet(url?: string | null): url is string {
  return typeof url === 'string' && url.trim().length > 0;
}

export function mailto(email?: string | null): string {
  return isLinkSet(email) ? `mailto:${email.trim()}` : '';
}

export const PLACEHOLDER_HINT = 'Link not added yet — set it in src/data/profile.ts';
