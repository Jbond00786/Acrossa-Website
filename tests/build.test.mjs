import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { routes } from '../src/config/routes.js';
import { structuredData } from '../src/config/metadata.js';

for (const route of routes)
  test(`initial HTML includes content and unique metadata: ${route.path}`, async () => {
    const html = await readFile(
      `dist/${route.path === '/' ? 'index' : route.path.slice(1)}.html`,
      'utf8',
    );
    assert.match(html, /<h1[\s>]/);
    assert.equal((html.match(/<title\b/g) || []).length, 1);
    assert.equal((html.match(/rel="canonical"/g) || []).length, 1);
    assert.ok(html.includes(`href="https://acrossaops.com${route.path}"`));
    assert.ok(
      html.includes('property="og:url" content="https://acrossaops.com' + route.path + '"'),
    );
    assert.doesNotMatch(html, /Acrossa Operations LLC|\/2\.png|cdn\.tailwindcss\.com/);
    const schema = structuredData(route);
    assert.equal(schema['@graph'][0].foundingDate, '2025');
    assert.deepEqual(schema['@graph'][0].areaServed, ['US', 'CA']);
    assert.equal(schema['@graph'][0].contactPoint.length, 3);
    assert.ok(schema['@graph'].every((entity) => entity['@type'] !== 'LocalBusiness'));
  });

test('sitemap, robots, assets, noindex 404 and verification files', async () => {
  const sitemap = await readFile('dist/sitemap.xml', 'utf8');
  assert.equal((sitemap.match(/<loc>/g) || []).length, 5);
  assert.doesNotMatch(sitemap, /#/);
  const robots = await readFile('dist/robots.txt', 'utf8');
  assert.match(robots, /Sitemap: https:\/\/acrossaops.com\/sitemap.xml/);
  for (const asset of [
    'brand/acrossa-mark.png',
    'brand/acrossa-social.png',
    'favicon.svg',
    'fonts/adcure.woff2',
  ])
    await access('dist/' + asset);
  const error = await readFile('dist/404.html', 'utf8');
  assert.match(error, /noindex, follow/);
  assert.doesNotMatch(error, /rel="canonical"/);
  const verification = 'public/googleb738463f9443b727.html';
  const original = execFileSync('git', [
    'show',
    `d10de4551707d26a168cf32cf44bcadc56542b0a:${verification}`,
  ]);
  assert.deepEqual(await readFile(verification), original);
  assert.deepEqual(await readFile('dist/googleb738463f9443b727.html'), original);
});
