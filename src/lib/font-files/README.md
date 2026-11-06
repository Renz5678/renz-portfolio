# Bundled portfolio fonts

These unmodified Latin WOFF2 subsets were recovered from this project's previously generated Next.js production assets. `src/lib/fonts.ts` loads them through `next/font/local`, avoiding build-time requests to Google Fonts and the extensionless URL parsing failure in Next 16.3.5.

| File | Family | Variable weight range in file |
| --- | --- | --- |
| space-grotesk-latin.woff2 | Space Grotesk | 300–700 |
| inter-latin.woff2 | Inter | 100–900 |
| jetbrains-mono-latin.woff2 | JetBrains Mono | 100–800 |
| jetbrains-mono-latin-italic.woff2 | JetBrains Mono italic | 100–800 |

Metadata was checked with Next's bundled fontkit reader. Application declarations retain the prior weight ranges. Characters outside these Latin subsets use the declared system fallback.

Licenses are the family-specific OFL files from `google/fonts`: `ofl/spacegrotesk/OFL.txt`, `ofl/inter/OFL.txt`, `ofl/jetbrainsmono/OFL.txt`. All font assets and licenses must be committed together. No font package or framework upgrade is required.
