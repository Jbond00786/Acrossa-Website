# Implementation review

Base: `d10de4551707d26a168cf32cf44bcadc56542b0a` on `main`.
Branch: `dev/prerender-seo-performance`.

## Delivered

- Five static HTML pages with client-side React navigation and route-specific titles, descriptions, canonicals, Open Graph, Twitter cards, and JSON-LD before JavaScript executes.
- Vercel static build with clean URLs, no trailing slash, and a dedicated 404 document. No blanket homepage rewrite.
- Legacy hash-route links preserved through client-side replacement; section fragments retain scrolling behavior.
- Central Organization/Service/WebSite/WebPage graph: ACROSSA, founded 2025, US/CA coverage, both email addresses, WhatsApp ContactPoint. No LLC, storefront address, invented SearchAction, or LocalBusiness claims.
- 45+ member remote-team positioning, existing client-platform delivery, and explicit exclusion of HR onboarding services.
- Web3Forms handler and public key fallback preserved; field labels connected, submission failures handled, honeypot retained, and WhatsApp CTA added with reduced-motion support.
- Compiled Tailwind CSS, retired fixer script, extracted components, deferred desktop Three.js, static mobile/reduced-motion hero, and repaired animation loop cleanup.
- Missing `/2.png` references removed. Header uses the existing vector fallback directly; favicon and schema/social assets derive from that same mark and the provided Adcure font.
- Unused remote Google font imports removed; existing system body font retained. Brand font compressed to WOFF2.
- Google verification file preserved byte-for-byte. No Bing verification file was present in the source tree reviewed; no verification file was removed.
- Preview build noindex metadata and robots exclusion; these are crawler instructions, not privacy controls.

## Validation completed locally

- `npm run build`: pass; browser build plus Node pre-render creates five pages and a 404 without browser-global errors.
- `npm run lint`: pass.
- `npm test`: 14 passing tests, including production-bundle hydration in JSDOM, history/navigation, head-tag uniqueness, contact payload/pending/success/reset/error behavior with intercepted requests, and createRoot fallback.
- Local HTTP server: 200 on five page routes; `/services/` returns 308 to `/services`; an unknown path returns 404. This models the intended hosting behavior rather than proving Vercel edge behavior.
- `git diff --check`: pass.
- Social preview PNG visually inspected; 1200×630; source SVG retained.

## Measured bundle comparison

| Asset | Original build | Updated build |
|---|---:|---:|
| Initial application JavaScript | 864.19 kB | approximately 374.55 kB |
| Initial JavaScript, gzip | 229.17 kB | approximately 111.71 kB |
| Deferred desktop Three.js chunk | included above | approximately 537.19 kB |
| Build-generated CSS | 0.08 kB plus runtime Tailwind CDN | approximately 47.46 kB / 8.54 kB gzip |

Initial application JavaScript is approximately 57% smaller uncompressed and 51% smaller gzip. The old CDN payload is not included in the original JS figure. Desktop users who load the 3D scene will additionally download the deferred chunk. These figures do not establish a Lighthouse score or a field Core Web Vitals result. Vite still reports a size warning for the deferred Three.js chunk.

## Outstanding verification before merging

Local Chromium cannot start because the execution environment denies a required socket; the downloadable browser installation also failed. The separate cloud browser cannot reach the local preview. Consequently, no real-browser visual/console/network validation or Lighthouse comparison is claimed here. JSDOM is not a substitute for layout or WebGL testing.

The supplied Playwright tests and GitHub Actions workflow cover browser checks when a working Chromium runner is available. Review their results and the Vercel preview before merging. Specifically confirm:

- All five direct routes and refreshes work on Vercel.
- Trailing-slash normalization and real HTTP 404 work at the Vercel edge.
- Production HTML remains indexable; preview exclusion works and Deployment Protection is enabled if privacy is required.
- Mobile/desktop layout, keyboard navigation, and desktop WebGL remain visually correct.
- Lighthouse performance, accessibility, and network errors on the deployed preview.
- A deliberate real inquiry reaches the expected mailbox; automated tests never send actual inquiries.

Nothing should be merged into `main` until reviewed, because that branch automatically deploys the public domain.
