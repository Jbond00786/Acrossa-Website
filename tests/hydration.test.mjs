import { site } from '../src/config/site.js';
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { JSDOM, VirtualConsole } from 'jsdom';
import { transformSync } from 'esbuild';
import { routes } from '../src/config/routes.js';

const tick = () => new Promise((resolve) => setTimeout(resolve, 80));
async function mount(path = '/', { noMarkup = false, reducedMotion = true } = {}) {
  const route = routes.find((item) => item.path === path);
  let html = await readFile(
    `dist/${path === '/' ? 'index' : route ? path.slice(1) : '404'}.html`,
    'utf8',
  );
  if (noMarkup)
    html = html.replace(/<div id="root">[\s\S]*<\/div>\s*<\/body>/, '<div id="root"></div></body>');
  const errors = [];
  const console = new VirtualConsole();
  console.on('error', (...args) => errors.push(args.map(String).join(' ')));
  console.on('jsdomError', (error) => errors.push(error.message));
  const dom = new JSDOM(html, {
    url: 'https://acrossaops.com' + path,
    runScripts: 'outside-only',
    pretendToBeVisual: true,
    virtualConsole: console,
  });
  dom.window.matchMedia = () => ({
    matches: reducedMotion,
    addEventListener() {},
    removeEventListener() {},
  });
  dom.window.scrollTo = () => {};
  dom.window.HTMLElement.prototype.scrollIntoView = () => {};
  // No WebGL or layout emulation: these tests validate DOM hydration and interactions only.
  Object.defineProperty(dom.window, 'innerWidth', { value: 390 });
  const src = dom.window.document.querySelector('script[type="module"][src]').getAttribute('src');
  const source = await readFile('dist' + src, 'utf8');
  const compiled = transformSync(source, {
    format: 'iife',
    define: { 'import.meta.url': JSON.stringify('https://acrossaops.com' + src) },
  }).code;
  dom.window.eval(compiled);
  await tick();
  return { dom, errors, doc: dom.window.document };
}

for (const route of routes)
  test(`production React hydration has no errors: ${route.path}`, async () => {
    const { dom, errors, doc } = await mount(route.path);
    try {
      assert.equal(doc.title, route.title);
      assert.equal(doc.querySelectorAll('h1').length, 1);
      assert.equal(doc.querySelectorAll('link[rel="canonical"]').length, 1);
      assert.equal(doc.querySelectorAll('meta[name="description"]').length, 1);
      assert.equal(doc.querySelectorAll('script[type="application/ld+json"]').length, 1);
      assert.deepEqual(errors, []);
    } finally {
      dom.window.close();
    }
  });

test('client navigation updates content, metadata, history, and legacy fragment links', async () => {
  const { dom, errors, doc } = await mount();
  try {
    const link = [...doc.querySelectorAll('a')].find((el) =>
      el.textContent.includes('Explore All Services'),
    );
    link.dispatchEvent(
      new dom.window.MouseEvent('click', { bubbles: true, cancelable: true, button: 0 }),
    );
    await tick();
    assert.equal(dom.window.location.pathname, '/services');
    assert.match(doc.title, /Services \| ACROSSA/);
    assert.match(doc.querySelector('h1').textContent, /Structured Support/);
    dom.window.history.back();
    await tick();
    assert.equal(dom.window.location.pathname, '/');
    dom.window.history.forward();
    await tick();
    assert.equal(dom.window.location.pathname, '/services');
    dom.window.history.pushState(null, '', '/#about');
    dom.window.dispatchEvent(new dom.window.PopStateEvent('popstate'));
    await tick();
    await tick();
    assert.equal(dom.window.location.pathname, '/about');
    assert.equal(dom.window.location.hash, '');
    assert.deepEqual(errors, []);
  } finally {
    dom.window.close();
  }
});

test('contact payload, pending, success, reset, error and retry use intercepted fetch', async () => {
  const { dom, errors, doc } = await mount('/contact');
  try {
    let payload, resolve;
    dom.window.fetch = async (_url, options) => {
      payload = options.body;
      return new Promise((done) => {
        resolve = done;
      });
    };
    const form = doc.querySelector('form');
    for (const [key, value] of Object.entries({
      name: 'Test Visitor',
      email: 'test@example.com',
      company: 'Test Co',
      phone: '5555550100',
      service_needed: 'security-dispatching',
      coverage_window: 'after-hours',
      message: 'Test only',
    }))
      form.elements[key].value = value;
    assert.equal(form.checkValidity(), true);
    form.dispatchEvent(new dom.window.Event('submit', { bubbles: true, cancelable: true }));
    await tick();
    assert.equal(doc.querySelector('button[type="submit"]').disabled, true);
    assert.equal(payload.get('name'), 'Test Visitor');
    assert.ok(payload.get('access_key'));
    assert.equal(payload.get('subject'), `New Inquiry from ${site.name} Website`);
    // Unchecked checkbox honeypots are omitted by native FormData; keep the field intact.
    assert.ok(form.elements.botcheck);
    assert.equal(form.elements.botcheck.checked, false);
    resolve({ ok: true, json: async () => ({ success: true }) });
    await tick();
    assert.equal(doc.querySelector('[role="status"]').textContent, 'Inquiry Received');
    [...doc.querySelectorAll('button')]
      .find((el) => el.textContent.includes('Send Another Note'))
      .click();
    await tick();
    dom.window.fetch = async () => ({
      ok: false,
      json: async () => ({ success: false, message: 'Please retry.' }),
    });
    doc
      .querySelector('form')
      .dispatchEvent(new dom.window.Event('submit', { bubbles: true, cancelable: true }));
    await tick();
    assert.equal(doc.querySelector('[role="alert"]').textContent, 'Please retry.');
    assert.equal(doc.querySelector('button[type="submit"]').disabled, false);
    dom.window.fetch = async () => {
      throw new Error('offline');
    };
    doc
      .querySelector('form')
      .dispatchEvent(new dom.window.Event('submit', { bubbles: true, cancelable: true }));
    await tick();
    assert.match(doc.querySelector('[role="alert"]').textContent, /Network error/);
    assert.deepEqual(errors, []);
  } finally {
    dom.window.close();
  }
});

test('404 hydration and createRoot fallback', async () => {
  for (const [path, options] of [
    ['/missing', {}],
    ['/', { noMarkup: true }],
  ]) {
    const { dom, errors, doc } = await mount(path, options);
    try {
      assert.equal(doc.querySelectorAll('h1').length, 1);
      assert.deepEqual(errors, []);
    } finally {
      dom.window.close();
    }
  }
});
