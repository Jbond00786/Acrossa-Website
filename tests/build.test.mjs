import { services } from '../src/config/site.js';
import { JSDOM } from 'jsdom';
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
    const doc = new JSDOM(html).window.document;
    assert.equal(doc.title, route.title);
    for (const selector of [
      'meta[name="description"]',
      'meta[property="og:description"]',
      'meta[name="twitter:description"]',
    ]) {
      assert.equal(doc.querySelector(selector).content, route.description);
      for (const service of services)
        assert.ok(doc.querySelector(selector).content.includes(service.name));
    }
    const schema = JSON.parse(doc.querySelector('script[type="application/ld+json"]').textContent);
    assert.deepEqual(schema, structuredData(route));
    assert.deepEqual(
      schema['@graph'].filter((item) => item['@type'] === 'Service').map((item) => item.name),
      services.map((item) => item.name),
    );
    assert.doesNotMatch(
      doc.body.textContent,
      /field service|field trades|truck logistics coordination|remote security dispatching/i,
    );
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

test('service cards, contact options and static fallback share the catalog', async () => {
  const expected = [
    'Security Dispatching',
    'Truck Dispatching',
    'Remote IT Support',
    'Call Center & Customer Care',
  ];
  assert.deepEqual(
    services.map((service) => service.name),
    expected,
  );
  const home = new JSDOM(await readFile('dist/index.html', 'utf8')).window.document;
  const servicePage = new JSDOM(await readFile('dist/services.html', 'utf8')).window.document;
  const contact = new JSDOM(await readFile('dist/contact.html', 'utf8')).window.document;
  for (const service of services) {
    assert.equal(
      home.querySelector(`a[href="/services#${service.id}"] h3`).textContent,
      service.name,
    );
    assert.equal(
      servicePage.getElementById(service.id).querySelector('strong').textContent,
      service.name,
    );
  }
  const options = [...contact.querySelectorAll('select[name="service_needed"] option')].filter(
    (option) => option.value,
  );
  assert.deepEqual(
    options.map((option) => option.textContent),
    expected,
  );
  assert.deepEqual(
    options.map((option) => option.value),
    services.map((service) => service.id),
  );
  assert.ok(contact.querySelector('textarea').placeholder.includes(expected[2]));
  assert.equal(home.querySelectorAll('link[rel="modulepreload"][href*="three-"]').length, 0);
});
