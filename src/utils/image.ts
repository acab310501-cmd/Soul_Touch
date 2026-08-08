/**
 * Rewrites a Pexels image URL's width/height query params so the browser
 * downloads an image close to its actual rendered size instead of a fixed
 * 940px version everywhere (avatars, grid thumbnails, etc). Falls back to
 * the original URL untouched for any non-Pexels source.
 */
export function pexelsSized(url: string, width: number, height?: number): string {
  if (!url.includes('images.pexels.com')) return url;
  try {
    const u = new URL(url);
    u.searchParams.set('w', String(width));
    if (height) u.searchParams.set('h', String(height));
    return u.toString();
  } catch {
    return url;
  }
}
