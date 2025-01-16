# Font versioning

Font version is specified in the font url as a query parameter e.g. `?v=1.0.0`. This is useful when you want to cache the font file in the browser and force the browser to download the new version of the font file when the version changes.

## How to update the font version

1. Update the font version in the font url in the [`app/styles/fonts.css`](../app/styles/fonts.css) file.
2. Update the font version in the font url (href) in the [`app/utils/preload-fonts.ts`](../app/utils/preload-fonts.ts) file.

Note: Inconsistent font urls can cause the browser to download the font file multiple times.