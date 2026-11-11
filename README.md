# ACROSSA website

Vite + React marketing site with build-time HTML for `/`, `/services`, `/how-we-work`, `/about`, and `/contact`. React hydrates those documents and handles subsequent navigation. Three.js is loaded separately after the initial render on eligible desktop screens; small screens, reduced-motion, and data-saving connections use the static brand background.

## Development and validation

Use Node 24 and install from the lockfile:

```sh
npm ci
npm run dev
npm run lint
npm run build
npm test
npx playwright install chromium
npm run test:e2e
```

`npm test` checks initial HTML, sitemap, schema, asset references, verification-file preservation, and DOM-based production hydration/navigation/form states. DOM tests do not simulate rendering, WebGL, layout, or Lighthouse metrics. Playwright covers real browser behavior separately, including direct entry, refresh, metadata, mobile menu, legacy hash URLs, and intercepted Web3Forms submissions. No test sends real inquiries.

`npm run preview` starts a local production-file server on port 4173 with clean URL handling and HTTP 404s. It models the intended Vercel behavior, but a deployed preview must also be checked. Set `CHROMIUM_PATH` only when using an existing Chromium installation.

## Build and content

`vite build` creates the browser assets. The second Vite build bundles `src/entry-server.jsx` for Node. `scripts/prerender.mjs` renders the five pages and `404.html`, adds route metadata/JSON-LD, generates `dist/sitemap.xml`, then removes the temporary SSR output. There is no runtime SSR service.

- `src/config/site.js`: verified public identity/contact information. No LLC or physical storefront claims. WhatsApp is a ContactPoint URL, not an invented social profile.
- `src/config/routes.js`: page metadata, sitemap priorities, and meaningful last-modified dates. Update dates when content changes, not on unrelated rebuilds.
- `src/config/metadata.js`: one head/schema source for both static HTML and client navigation.
- `src/pages/`: existing page views, extracted without replacing their content wholesale.
- `src/components/contact/ContactForm.jsx`: existing Web3Forms integration. `VITE_WEB3FORMS_KEY` remains supported; the original public access key fallback is preserved. Web3Forms access keys are designed for client-side use; never put private credentials in Vite public variables.
- `public/brand/`: social PNG and SVG source, plus the existing vector emblem exported for schema. The social wordmark reuses the provided Adcure font outlines.
- `public/fonts/adcure.woff2`: compressed version of the existing brand font. Unused Google font imports were removed; the existing system sans-serif body stack is retained.

The obsolete `fix-my-website.js` has been removed because it overwrote the application entry, metadata, and CSS configuration. The sitemap is generated only in `dist`, avoiding a stale second copy in `public`.

## Vercel deployment

`vercel.json` deliberately selects a static build (`framework: null`) with `cleanUrls: true` and `trailingSlash: false`. It serves `services.html` as `/services`, and similarly for the other pages. There is no catch-all rewrite to the homepage: unknown paths should use `404.html` with status 404. Keep project-level overrides consistent with these settings.

Google's verification file and meta tag are preserved. No Bing verification file was present in the reviewed source; any verification file subsequently placed in `public` is copied by Vite without modification.

Preview builds (`VERCEL_ENV=preview`) get `noindex` metadata and a disallow-all robots file. This is **not access control**. Use Vercel Deployment Protection if previews must be private. Production metadata always uses the canonical `https://acrossaops.com` origin.

Before merging to `main` (which publishes automatically):

1. Confirm every route directly loads and refreshes on the Vercel preview.
2. Check `/services/` normalizes to `/services` and a random missing path returns HTTP 404.
3. Review mobile/desktop design, desktop WebGL, console, network, and Lighthouse.
4. Verify contact validation/success/error behavior without sending fake production inquiries.
5. Confirm production builds have indexable robots metadata. After publishing, inspect the new clean URLs and the updated `/sitemap.xml` in Search Console.

Legacy links such as `/#services` are translated client-side to the new paths. Server redirects cannot see URL fragments. Ordinary in-page fragment links still scroll to their target after the page renders.

## Service catalog

Edit `src/config/site.js` to change shared service names, IDs, descriptions, feature lists, brand details, or contact information. `src/config/routes.js` composes page metadata from that catalog. Vite generates the fallback document head; the pre-render step generates each page’s static head. Do not duplicate service labels in page markup or `index.html`.

`npm run lint` rejects warnings. The browser suite tests each service option with intercepted submissions; it does not send real inquiries. Three.js core and renderer stay in separate deferred chunks without raising the bundle-warning threshold.
