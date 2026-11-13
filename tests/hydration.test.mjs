import { site, services, serviceDeck } from '../src/config/site.js';
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
  dom.window.matchMedia = (query) => ({
    matches: query.includes('no-preference') ? !reducedMotion : reducedMotion,
    addEventListener() {},
    removeEventListener() {},
  });
  dom.window.HTMLDialogElement.prototype.showModal = function () {
    this.open = true;
  };
  dom.window.HTMLDialogElement.prototype.close = function () {
    this.open = false;
  };
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
    assert.equal(doc.title, 'Security & Truck Dispatching, IT & Call Center | ACROSSA');
    assert.equal(doc.querySelector('h1').textContent, serviceDeck.title);
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

test('all service details remain in both pre-rendered documents', async () => {
  for (const file of ['index', 'services']) {
    const dom = new JSDOM(await readFile(`dist/${file}.html`, 'utf8'));
    try {
      const cards = [...dom.window.document.querySelectorAll('.command-card')];
      assert.equal(cards.length, 4);
      services.forEach((service, index) => {
        const card = cards[index];
        assert.ok(card.textContent.includes(service.summary));
        assert.equal(card.querySelectorAll('.command-card__tasks li').length, 4);
        service.tasks.forEach(({ title, description }) => {
          assert.ok(card.textContent.includes(title));
          assert.ok(card.textContent.includes(description));
        });
        service.platforms.forEach((platform) => assert.ok(card.textContent.includes(platform)));
        assert.ok(card.textContent.includes(service.platformNote));
        assert.equal(card.querySelectorAll('.command-card__platform-preview li').length, 4);
      });
      assert.equal(dom.window.document.querySelectorAll('dialog').length, 0);
    } finally {
      dom.window.close();
    }
  }
});

for (const path of ['/', '/services']) {
  test(`compact console opens, switches, traps focus, closes and restores scroll: ${path}`, async () => {
    const { dom, errors, doc } = await mount(path);
    try {
      const triggers = [...doc.querySelectorAll('.command-card__trigger')];
      const key = (value, shiftKey = false) =>
        doc.activeElement.dispatchEvent(
          new dom.window.KeyboardEvent('keydown', {
            key: value,
            shiftKey,
            bubbles: true,
            cancelable: true,
          }),
        );
      doc.body.style.overflow = 'auto';
      triggers[0].focus();
      triggers[0].click();
      await tick();
      const dialog = doc.querySelector('dialog');
      assert.equal(dialog.open, true);
      assert.equal(doc.body.style.overflow, 'hidden');
      assert.equal(doc.activeElement.getAttribute('aria-label'), 'Close command view');
      const active = () => dialog.querySelector('[role="tabpanel"][data-active="true"]');
      assert.equal(active().querySelector('h2').textContent, services[0].title);
      dialog.querySelector('[aria-label="Next service"]').click();
      await tick();
      assert.equal(active().querySelector('h2').textContent, services[1].title);
      assert.equal(dialog.querySelectorAll('[role="tabpanel"][inert]').length, 3);
      key('ArrowRight');
      await tick();
      assert.equal(active().querySelector('h2').textContent, services[2].title);
      assert.equal(doc.activeElement.getAttribute('aria-selected'), 'true');
      key('End');
      await tick();
      assert.equal(active().querySelector('h2').textContent, services[3].title);
      key('Home');
      await tick();
      assert.equal(active().querySelector('h2').textContent, services[0].title);
      const first = dialog.querySelector('[aria-label="Previous service"]');
      const last = active().querySelector('.command-console__secondary');
      first.focus();
      key('Tab', true);
      assert.equal(doc.activeElement, last);
      key('Tab');
      assert.equal(doc.activeElement, first);
      key('Escape');
      await tick();
      assert.equal(doc.querySelector('dialog'), null);
      assert.equal(doc.body.style.overflow, 'auto');
      assert.equal(doc.activeElement, triggers[0]);
      triggers[3].click();
      await tick();
      doc.querySelector('[aria-label="Close command view"]').click();
      await tick();
      assert.equal(doc.querySelector('dialog'), null);
      triggers[2].click();
      await tick();
      const cta = doc.querySelector('[data-active="true"] .command-console__cta');
      assert.equal(cta.getAttribute('href'), `/contact?service=${services[2].id}`);
      cta.click();
      await tick();
      assert.equal(dom.window.location.pathname, '/contact');
      assert.equal(doc.querySelector('dialog'), null);
      assert.equal(doc.body.style.overflow, 'auto');
      assert.deepEqual(errors, []);
    } finally {
      dom.window.close();
    }
  });
}
