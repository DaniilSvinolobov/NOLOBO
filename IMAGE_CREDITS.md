# Image credits

Third-party images used on the site. Add a row for every photograph taken from a stock library.

| File | Photographer | Source | License |
| --- | --- | --- | --- |
| `public/images/process-site-placeholder.svg` | NOLOBO (drawn placeholder) | — | Own work |
| `public/images/portrait-placeholder.svg` | NOLOBO (drawn placeholder) | — | Own work |

## Pending: process photograph

The process section ("One site, five layers") still uses the drawn placeholder. The final photograph needs to be:

- from Unsplash (free, not Unsplash+) or Pexels
- a Mallorca landscape: terraced slope or dry-stone walls with olive trees, Tramuntana or Deià area
- wide format, at least 2400 px wide, soft light
- no people or recognisable houses in the foreground, with calm space (sky, sea or hillside) for the notes

When it is chosen:

1. Save it as WebP (max ~400 KB) in `public/images/`.
2. Point `approach.process.photo` in `src/content.ts` at it, with its pixel `width` and `height`.
3. Realign the overlays in `src/components/processOverlays.ts` (all positions are % of the photo).
4. Replace the placeholder row above with the photographer, source URL and license, and delete the placeholder SVG.
