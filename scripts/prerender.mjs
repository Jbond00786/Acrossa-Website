import { readFile, writeFile, rm } from 'node:fs/promises';
import { render } from '../.prerender/entry-server.js';
import { routes } from '../src/config/routes.js';
import { absoluteUrl } from '../src/config/site.js';
import { renderHead, escapeHtml } from '../src/config/metadata.js';

const template = await readFile('dist/index.html', 'utf8');
const preview = process.env.VERCEL_ENV === 'preview';
for (const path of [...routes.map((route) => route.path), '/404']) {
  const html = template
    .replace(
      /<!--route-head-start-->[\s\S]*?<!--route-head-end-->/,
      renderHead(path, { noindex: preview }),
    )
    .replace('<html lang="en">', `<html lang="en" data-preview="${preview}">`)
    .replace('<div id="root"></div>', `<div id="root">${render(path)}</div>`);
  if (!html.includes('<h1')) throw new Error(`Missing rendered heading at ${path}`);
  const file = path === '/' ? 'index' : path.slice(1);
  await writeFile(`dist/${file}.html`, html);
}
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes.map((route) => `  <url><loc>${escapeHtml(absoluteUrl(route.path))}</loc><lastmod>${route.lastmod}</lastmod><priority>${route.priority}</priority></url>`).join('\n')}\n</urlset>\n`;
await writeFile('dist/sitemap.xml', sitemap);
// Preview exclusion supplements (but does not replace) Vercel Deployment Protection.
if (preview) await writeFile('dist/robots.txt', 'User-agent: *\nDisallow: /\n');
await rm('.prerender', { recursive: true, force: true });
console.log(`Pre-rendered ${routes.length} pages plus a 404; generated canonical sitemap.`);
