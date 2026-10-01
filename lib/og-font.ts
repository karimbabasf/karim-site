/**
 * Fetch a Google-hosted font as raw TTF bytes for `next/og` (Satori) to embed.
 *
 * Satori can't use system fonts (it needs the actual glyph data), so the OG
 * image and generated icons load the site's faces at render time. Google Fonts
 * serves TrueType to a non-browser user-agent (Node's fetch), which is exactly
 * what Satori wants. `width` pins a variable font's wdth axis, so the engraved
 * nameplate can be drawn at the page's width (Google serves wdth 150 at weight
 * 600 as a static instance; 151 comes back empty). Returns null on any failure
 * so callers fall back to Satori's built-in font rather than failing the whole
 * image.
 */
export async function loadFont(
  family: string,
  weight: number,
  text?: string,
  width?: number,
): Promise<ArrayBuffer | null> {
  try {
    const fam = family.trim().replace(/\s+/g, "+");
    const axes = width ? `wdth,wght@${width},${weight}` : `wght@${weight}`;
    const subset = text ? `&text=${encodeURIComponent(text)}` : "";
    const url = `https://fonts.googleapis.com/css2?family=${fam}:${axes}${subset}`;
    const css = await (await fetch(url)).text();
    const match = css.match(
      /src:\s*url\(([^)]+)\)\s*format\('(?:opentype|truetype)'\)/,
    );
    if (!match) return null;
    const res = await fetch(match[1]);
    if (!res.ok) return null;
    return await res.arrayBuffer();
  } catch {
    return null;
  }
}
