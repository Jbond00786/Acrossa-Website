# Implementation review

Base: `d10de4551707d26a168cf32cf44bcadc56542b0a` on `main`.
Branch: `dev/prerender-seo-performance`.

## Service catalog update — November 11, 2026

`src/config/site.js` owns the four service names, IDs, descriptions, feature lists, brand, and contact details. Pages, service cards, form options, platform filters, and schema consume that catalog. All five metadata descriptions include the exact four names; social metadata uses the same route descriptions. Vite also generates the base document head from route config to prevent fallback metadata drift.

- Security Dispatching
- Truck Dispatching
- Remote IT Support
- Call Center & Customer Care

Remote IT Support covers approved troubleshooting, ticket records, authorized access help, and specialist escalation. Call Center & Customer Care covers phone, email, chat, CRM records, and customer follow-up. Obsolete trades examples and the calculator's nonfunctional sector selector were removed. Source import-graph inspection found no orphaned components; production source contains no console logging.

CI uses Node 24-compatible GitHub Actions, records the pinned esbuild install-script decision, and retains a Playwright HTML report on success as well as failure.

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
- `npm run lint`: pass with zero warnings (`--max-warnings 0`).
- `npm test`: 15 passing tests, including production-bundle hydration in JSDOM, history/navigation, head-tag uniqueness, contact payload/pending/success/reset/error behavior with intercepted requests, and createRoot fallback.
- Local HTTP server: 200 on five page routes; `/services/` returns 308 to `/services`; an unknown path returns 404. This models the intended hosting behavior rather than proving Vercel edge behavior.
- `git diff --check`: pass.
- Social preview PNG visually inspected; 1200×630; source SVG retained.

## Measured bundle comparison

| Asset | Original build | Updated build |
|---|---:|---:|
| Initial application JavaScript | 864.19 kB | approximately 369.96 kB |
| Initial JavaScript, gzip | 229.17 kB | approximately 111.45 kB |
| Deferred desktop Three.js chunk | included above | 182.91 kB core + 355.88 kB renderer/scene |
| Build-generated CSS | 0.08 kB plus runtime Tailwind CDN | approximately 47.20 kB / 8.51 kB gzip |

Initial application JavaScript is approximately 57% smaller uncompressed and 51% smaller gzip. The old CDN payload is not included in the original JS figure. Desktop users who load the 3D scene will additionally download the deferred chunk. These figures do not establish a Lighthouse score or a field Core Web Vitals result. Three.js core and renderer now remain in separate deferred chunks, each below Vite’s default 500 kB warning threshold; the build completes without warnings.

## Outstanding verification before merging

Local Chromium is restricted by the execution environment. The first revision passed all 8 Chromium tests in GitHub Actions. This update extends the browser suite to 13 tests, including all four service inquiry flows and deferred desktop/mobile assets. All 13 browser tests passed for the service-catalog revision. The latest PR checks are authoritative for subsequent CI maintenance. The Vercel preview requires authentication; deployed edge behavior, personal visual review, mailbox delivery, and Lighthouse remain separate checks.

The supplied Playwright tests run in GitHub Actions. Review the latest results and the Vercel preview before merging. Specifically confirm:

- All five direct routes and refreshes work on Vercel.
- Trailing-slash normalization and real HTTP 404 work at the Vercel edge.
- Production HTML remains indexable; preview exclusion works and Deployment Protection is enabled if privacy is required.
- Mobile/desktop layout, keyboard navigation, and desktop WebGL remain visually correct.
- Lighthouse performance, accessibility, and network errors on the deployed preview.
- A deliberate real inquiry reaches the expected mailbox; automated tests never send actual inquiries.

Nothing should be merged into `main` until reviewed, because that branch automatically deploys the public domain.
