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
  await expect(page).toHaveTitle(/Services \| ACROSSA/);
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

async function fillForm(page) {
  await page.getByLabel('Name *', { exact: true }).fill('Test Visitor');
  await page.getByLabel('Business Email').fill('test@example.com');
  await page.getByLabel('Company Name').fill('Test Company');
  await page.getByLabel('Direct Phone').fill('+15555550100');
  await page.getByLabel('Services Needed').selectOption('security-dispatching');
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
