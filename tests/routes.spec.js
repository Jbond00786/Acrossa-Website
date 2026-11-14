import { services, serviceDeck } from '../src/config/site.js';
import { test, expect } from '@playwright/test';
import { routes } from '../src/config/routes.js';

for (const size of [
  { name: 'desktop', width: 1440, height: 960 },
  { name: 'mobile', width: 390, height: 844 },
]) {
  test(`${size.name}: routes hydrate, assets load and metadata stays unique`, async ({ page }) => {
    await page.setViewportSize(size);
    const errors = [];
    page.on('pageerror', (error) => errors.push(error.message));
    page.on('console', (message) => {
      if (message.type() === 'error') errors.push(message.text());
    });
    page.on('response', (response) => {
      if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`);
    });
    for (const route of routes) {
      const response = await page.goto(route.path);
      expect(response.status()).toBe(200);
      await expect(page).toHaveTitle(route.title);
      await expect(page.locator('h1')).toHaveCount(1);
      await expect(page.locator('head title')).toHaveCount(1);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
        'href',
        `https://acrossaops.com${route.path}`,
      );
      await expect(page.locator('meta[name="description"]')).toHaveCount(1);
      await expect(page.locator('meta[property="og:url"]')).toHaveAttribute(
        'content',
        `https://acrossaops.com${route.path}`,
      );
      await page.waitForTimeout(200);
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
      ).toBe(true);
      await page.reload();
      await expect(page).toHaveTitle(route.title);
    }
    expect(errors).toEqual([]);
  });
}

test('client navigation, back/forward, legacy links and anchors', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Explore All Services' }).click();
  await expect(page).toHaveURL(/\/services$/);
  await expect(page).toHaveTitle('Security & Truck Dispatching, IT & Call Center | ACROSSA');
  await page.goBack();
  await expect(page).toHaveURL('http://127.0.0.1:4173/');
  await page.goForward();
  await expect(page).toHaveURL(/\/services$/);
  for (const legacy of ['home', 'about', 'services', 'contact', 'how-we-work']) {
    await page.goto('/#' + legacy);
    await expect(page).toHaveURL(
      'http://127.0.0.1:4173' + (legacy === 'home' ? '/' : '/' + legacy),
    );
  }
  await page.goto('/services#main-content');
  await expect(page.locator('#main-content')).toBeVisible();
});

test('mobile menu, WhatsApp and reduced motion', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await page.getByRole('button', { name: 'Toggle Menu' }).click();
  await expect(page.getByRole('button', { name: 'Toggle Menu' })).toHaveAttribute(
    'aria-expanded',
    'true',
  );
  await page.locator('#mobile-navigation').getByRole('link', { name: 'contact' }).click();
  await expect(page).toHaveURL(/\/contact$/);
  await expect(page.locator('#mobile-navigation')).toHaveCount(0);
  const whatsapp = page.getByRole('link', { name: /Chat with us on WhatsApp/ });
  await expect(whatsapp).toHaveAttribute('href', 'https://wa.me/message/ZC6GPMPHCVXGA1');
  await expect(whatsapp).toHaveAttribute('rel', 'noopener noreferrer');
  expect(
    await page
      .locator('.whatsapp-icon')
      .evaluate((el) => getComputedStyle(el, '::before').animationName),
  ).toBe('none');
  await page.goto('/');
  await page.waitForTimeout(1800);
  await expect(page.locator('canvas')).toHaveCount(0);
});

async function fillForm(page, selectService = true) {
  await page.getByLabel('Name *', { exact: true }).fill('Test Visitor');
  await page.getByLabel('Business Email').fill('test@example.com');
  await page.getByLabel('Company Name').fill('Test Company');
  await page.getByLabel('Direct Phone').fill('+15555550100');
  if (selectService) await page.getByLabel('Services Needed').selectOption('security-dispatching');
  await page.getByLabel('Coverage Window *', { exact: true }).selectOption('after-hours');
  await page.getByLabel('Main Operational Challenge').fill('Test of the inquiry workflow.');
}

test('Web3Forms validation, payload, pending and success states', async ({ page }) => {
  let payload = '';
  let release;
  await page.route('https://api.web3forms.com/submit', async (route) => {
    payload = route.request().postData();
    await new Promise((resolve) => {
      release = resolve;
    });
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ success: true }),
    });
  });
  await page.goto('/contact');
  const submit = page.locator('button[type="submit"]');
  await submit.click();
  expect(payload).toBe('');
  await fillForm(page);
  await submit.click();
  await expect(submit).toBeDisabled();
  await expect.poll(() => payload).toContain('name="access_key"');
  await expect(page.locator('input[name="botcheck"]')).toHaveCount(1);
  expect(payload).toContain('name="access_key"');
  expect(payload).toContain('name="subject"');
  expect(payload).toContain('security-dispatching');
  release();
  await expect(page.getByRole('status')).toHaveText('Inquiry Received');
  await page.getByRole('button', { name: 'Send Another Note' }).click();
  await expect(page.getByLabel('Business Email')).toBeVisible();
});

for (const mode of ['api-error', 'network-error']) {
  test(`Web3Forms ${mode} permits retry`, async ({ page }) => {
    await page.route('https://api.web3forms.com/submit', (route) =>
      mode === 'network-error'
        ? route.abort()
        : route.fulfill({
            status: 400,
            contentType: 'application/json',
            body: JSON.stringify({ success: false, message: 'Please retry your inquiry.' }),
          }),
    );
    await page.goto('/contact');
    await fillForm(page);
    await page.locator('button[type="submit"]').click();
    await expect(page.getByRole('alert')).toContainText(
      mode === 'network-error' ? 'Network error' : 'Please retry',
    );
    await expect(page.locator('button[type="submit"]')).toBeEnabled();
  });
}

test('normalization and real 404 on production-file server', async ({ request, page }) => {
  for (const path of ['/services/', '/services.html']) {
    const response = await request.get(path, { maxRedirects: 0 });
    expect(response.status()).toBe(308);
    expect(response.headers().location).toBe('/services');
  }
  const response = await page.goto('/this-page-does-not-exist');
  expect(response.status()).toBe(404);
  await expect(page.getByRole('heading', { name: 'Let’s get you back on track.' })).toBeVisible();
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, follow');
});

for (const service of services) {
  test(`service navigation and inquiry selection: ${service.name}`, async ({ page }) => {
    let payload = '';
    await page.route('https://api.web3forms.com/submit', async (route) => {
      payload = route.request().postData();
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true }),
      });
    });
    await page.goto('/');
    await page.locator(`a[href="/services#${service.id}"]`).click();
    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole('heading', { name: service.title, exact: true })).toBeVisible();
    await expect(
      dialog.getByRole('tabpanel').getByText(service.summary, { exact: true }),
    ).toBeVisible();
    await dialog.getByRole('link', { name: 'Discuss This Service' }).click();
    await expect(page).toHaveURL(`/contact?service=${service.id}`);
    await expect(dialog).toHaveCount(0);
    expect(await page.evaluate(() => document.body.style.overflow)).not.toBe('hidden');
    await expect(page.getByLabel('Services Needed')).toHaveValue(service.id);
    await fillForm(page, false);
    await expect(page.locator('select[name="service_needed"] option')).toHaveText([
      'Choose one of our four services...',
      ...services.map((item) => item.name),
    ]);
    await page.locator('button[type="submit"]').click();
    await expect(page.getByRole('status')).toHaveText('Inquiry Received');
    expect(payload).toContain(service.id);
  });
}

test('desktop loads split 3D assets; mobile keeps static hero', async ({ page }) => {
  const scripts = [];
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('response', (response) => {
    if (response.url().endsWith('.js')) scripts.push(response.url());
  });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.waitForTimeout(1800);
  expect(scripts.some((url) => /Hero3D|three-core/.test(url))).toBe(false);
  await page.setViewportSize({ width: 1440, height: 960 });
  await page.reload();
  await expect.poll(() => scripts.some((url) => /three-core/.test(url))).toBe(true);
  await expect(page.locator('canvas')).toHaveCount(1);
  expect(errors).toEqual([]);
});

for (const size of [
  { name: 'desktop', width: 1440, height: 960 },
  { name: 'mobile', width: 390, height: 844 },
]) {
  for (const path of ['/', '/services']) {
    test(`${size.name}: compact command console interactions on ${path}`, async ({ page }) => {
      await page.setViewportSize(size);
      await page.emulateMedia({
        reducedMotion: size.name === 'mobile' ? 'reduce' : 'no-preference',
      });
      const errors = [];
      page.on('pageerror', (error) => errors.push(error.message));
      await page.goto(path);
      const cards = page.locator('.command-card');
      await expect(cards).toHaveCount(4);
      if (size.name === 'desktop') {
        const bounds = await cards.evaluateAll((elements) =>
          elements.map((el) => {
            const rect = el.getBoundingClientRect();
            return { x: rect.x, y: rect.y, height: rect.height, width: rect.width };
          }),
        );
        expect(bounds.every(({ height }) => height === 440)).toBe(true);
        expect(bounds[0].y).toBe(bounds[1].y);
        expect(bounds[2].y).toBe(bounds[3].y);
        expect(bounds[0].x).toBe(bounds[2].x);
        expect(bounds[0].width).toBeLessThanOrEqual(500);
      }
      if (size.name === 'desktop') {
        const rows = await cards.evaluateAll((elements) =>
          elements.map((el) => {
            const tagline = el.querySelector('.command-card__tagline');
            const summary = el.querySelector('.command-card__summary');
            const pills = [...el.querySelectorAll('.command-card__platform-preview li')];
            const top = el.getBoundingClientRect().top;
            return {
              tagline: tagline.getBoundingClientRect().top - top,
              summary: summary.getBoundingClientRect().top - top,
              pills: pills.map((pill) => pill.getBoundingClientRect().top - top),
              singleLine: tagline.clientHeight === parseFloat(getComputedStyle(tagline).lineHeight),
            };
          }),
        );
        for (const row of rows) {
          expect(row.singleLine).toBe(true);
          expect(row.tagline).toBe(rows[0].tagline);
          expect(row.summary).toBe(rows[0].summary);
          expect(new Set(row.pills).size).toBe(1);
          expect(row.pills[0]).toBe(rows[0].pills[0]);
        }
      }
      const trigger = cards.first().getByRole('button');
      await expect(trigger.locator('.command-card__platform-preview li')).toHaveCount(
        serviceDeck.compactPlatformCount + 1,
      );
      for (const [index, service] of services.entries()) {
        const card = cards.nth(index);
        await expect(card.locator('.command-card__summary')).toHaveText(service.shortSummary);
        await expect(card.locator('.command-card__action svg')).toHaveCount(1);
        const layout = await card.evaluate((el) => {
          const elements = [
            ...el.querySelectorAll(
              '.command-card__trigger h2, .command-card__trigger h3, .command-card__tagline, .command-card__summary, .command-card__platform-preview li, .command-card__action',
            ),
          ];
          const trigger = el.querySelector('.command-card__trigger');
          return {
            fits: elements.every(
              (item) =>
                item.scrollWidth <= item.clientWidth + 1 &&
                item.scrollHeight <= item.clientHeight + 1 &&
                item.getBoundingClientRect().bottom <= trigger.getBoundingClientRect().bottom + 1,
            ),
            clamp: getComputedStyle(el.querySelector('.command-card__summary')).webkitLineClamp,
            font: getComputedStyle(el.querySelector('.command-card__pill')).fontFamily,
            title: getComputedStyle(el.querySelector('h2, h3')).color,
          };
        });
        expect(layout.fits).toBe(true);
        expect(layout.clamp).toBe('none');
        expect(layout.font).toContain('sans-serif');
        expect(layout.title).toBe('rgb(255, 253, 249)');
        expect(await card.textContent()).not.toContain('↗');
      }
      await page
        .locator('.service-deck__grid')
        .screenshot({ path: test.info().outputPath('command-grid.png') });
      await trigger.click();
      const dialog = page.getByRole('dialog');
      await expect(dialog).toBeVisible();
      await expect(dialog.getByRole('button', { name: 'Close command view' })).toBeFocused();
      expect(await page.evaluate(() => document.body.style.overflow)).toBe('hidden');
      await expect(
        dialog.getByRole('tabpanel').getByRole('heading', { name: services[0].title }),
      ).toBeVisible();
      await expect(dialog.getByRole('tabpanel').locator('.command-card__tasks li')).toHaveCount(4);
      await dialog.screenshot({
        path: test.info().outputPath('command-console.png'),
        animations: 'disabled',
      });
      await dialog.getByRole('button', { name: 'Next service' }).click();
      await expect(
        dialog.getByRole('tabpanel').getByRole('heading', { name: services[1].title }),
      ).toBeVisible();
      await page.keyboard.press('ArrowRight');
      await expect(dialog.getByRole('tab', { selected: true })).toContainText(services[2].title);
      await page.keyboard.press('ArrowLeft');
      await expect(dialog.getByRole('tab', { selected: true })).toContainText(services[1].title);
      await dialog.getByRole('tab', { name: `${services[3].code} ${services[3].title}` }).click();
      await expect(
        dialog.getByRole('tabpanel').getByRole('heading', { name: services[3].title }),
      ).toBeVisible();
      await dialog.getByRole('button', { name: 'Next service' }).click();
      await expect(dialog.getByRole('tab', { selected: true })).toContainText(services[0].title);
      await dialog.getByRole('button', { name: 'Previous service' }).click();
      await expect(dialog.getByRole('tab', { selected: true })).toContainText(services[3].title);
      const previous = dialog.getByRole('button', { name: 'Previous service' });
      await previous.focus();
      await page.keyboard.press('Shift+Tab');
      await expect(dialog.getByRole('link', { name: /WhatsApp/ })).toBeFocused();
      await page.keyboard.press('Tab');
      await expect(previous).toBeFocused();
      expect(await dialog.evaluate((el) => el.scrollWidth <= el.clientWidth)).toBe(true);
      if (size.name === 'mobile') {
        expect(
          await dialog
            .locator('.command-console__frame')
            .evaluate((el) => getComputedStyle(el).animationName),
        ).toBe('none');
        expect(
          await dialog
            .getByRole('tabpanel')
            .evaluate((el) => getComputedStyle(el).transitionDuration),
        ).toBe('0s');
      }
      await page.keyboard.press('Escape');
      await expect(dialog).toHaveCount(0);
      await expect(trigger).toBeFocused();
      expect(await page.evaluate(() => document.body.style.overflow)).not.toBe('hidden');
      await trigger.press('Space');
      await expect(dialog).toBeVisible();
      await dialog.getByRole('button', { name: 'Close command view' }).click();
      await expect(dialog).toHaveCount(0);
      await expect(trigger).toBeFocused();
      expect(errors).toEqual([]);
    });
  }
}

test('contact query reloads, manual override, validation and reset retain expected selection', async ({
  page,
}) => {
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  const select = page.getByLabel('Services Needed');
  for (const service of services) {
    await page.goto(`/contact?service=${service.id}`);
    await expect(select).toHaveValue(service.id);
    await page.reload();
    await expect(select).toHaveValue(service.id);
  }
  for (const path of ['/contact?service=unknown', '/contact?service=', '/contact']) {
    await page.goto(path);
    await expect(select).toHaveValue('');
  }
  await page.goto(`/contact?service=${services[2].id}`);
  await expect(select).toHaveValue(services[2].id);
  await select.selectOption(services[1].id);
  await fillForm(page, false);
  await expect(select).toHaveValue(services[1].id);
  let payload = '';
  await page.route('https://api.web3forms.com/submit', async (route) => {
    payload = route.request().postData();
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ success: true }),
    });
  });
  await page.locator('button[type="submit"]').click();
  await expect(page.getByRole('status')).toHaveText('Inquiry Received');
  expect(payload).toContain(services[1].id);
  await page.getByRole('button', { name: 'Send Another Note' }).click();
  await expect(select).toHaveValue(services[2].id);
  expect(errors).toEqual([]);
});

test('route scrolling, anchors, modal layout stability, policy focus and pointer cleanup', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 960 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/services#security-dispatching');
  const card = page.locator('#security-dispatching');
  await expect
    .poll(() =>
      card.evaluate(
        (el) =>
          el.getBoundingClientRect().top >=
          document.querySelector('nav').getBoundingClientRect().bottom,
      ),
    )
    .toBe(true);
  const before = await page.locator('nav').boundingBox();
  const scrollBefore = await page.evaluate(() => scrollY);
  await card.getByRole('button').click();
  const after = await page.locator('nav').boundingBox();
  expect(after.x).toBe(before.x);
  expect(after.width).toBe(before.width);
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toHaveCount(0);
  expect(await page.evaluate(() => scrollY)).toBe(scrollBefore);
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await card.hover();
  await expect(card).toHaveAttribute('data-tracking', 'true');
  expect(
    await card.evaluate((el) => Math.abs(parseFloat(el.style.getPropertyValue('--tilt-x'))) <= 2.5),
  ).toBe(true);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(card).not.toHaveAttribute('data-tracking', 'true');
  const privacy = page.getByRole('button', { name: 'Privacy Policy', exact: true });
  await privacy.click();
  await expect(page.getByRole('dialog', { name: 'Privacy Policy' })).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await expect(privacy).toBeFocused();
  await page.locator('footer').getByRole('link', { name: 'Inquiry Form' }).click();
  await expect(page).toHaveURL(/\/contact$/);
  await expect.poll(() => page.evaluate(() => scrollY)).toBe(0);
});

test('production-file server applies baseline security headers', async ({ request }) => {
  for (const path of [...routes.map(({ path }) => path), '/sitemap.xml']) {
    const response = await request.get(path);
    expect(response.status()).toBe(200);
    expect(response.headers()['x-content-type-options']).toBe('nosniff');
    expect(response.headers()['referrer-policy']).toBe('strict-origin-when-cross-origin');
    expect(response.headers()['x-frame-options']).toBe('DENY');
  }
});
