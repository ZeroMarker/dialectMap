import { expect, test } from '@playwright/test';

const tileUrl = /https:\/\/[^/]+\.tile\.openstreetmap\.org\/.*/;
const tile = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jRZkAAAAASUVORK5CYII=', 'base64');

test.beforeEach(async ({ page }) => {
  await page.route(tileUrl, (route) => route.fulfill({ contentType: 'image/png', body: tile }));
});

test('map marker retains its identity and keyboard focus through selection', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/');
  const marker = page.locator('.leaflet-marker-icon[title="北京话"]');
  await expect(marker).toBeVisible();
  await marker.evaluate((element) => element.setAttribute('data-original', 'true'));
  await marker.focus();
  await page.keyboard.press('Space');
  await expect(page.locator('#dialect-title')).toHaveText('北京话');
  await expect(marker).toHaveAttribute('data-original', 'true');
  await expect(marker).toHaveAttribute('aria-pressed', 'true');
  await page.keyboard.press('Escape');
  await expect(marker).toBeFocused();
  await expect(marker).toHaveAttribute('aria-pressed', 'false');
  await page.keyboard.press('Enter');
  await expect(page.locator('#dialect-title')).toHaveText('北京话');
  expect(errors).toEqual([]);
});

for (const viewport of [{ width: 320, height: 568 }, { width: 768, height: 1024 }, { width: 844, height: 390 }, { width: 1024, height: 768 }]) {
  test(`search and details do not overlap at ${viewport.width}×${viewport.height}`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await page.goto('/');
    const search = page.getByRole('region', { name: '搜索与浏览方言' });
    await search.getByRole('button', { name: /北京话/ }).click();
    const details = page.getByRole('region', { name: '北京话', exact: true });
    await expect(details).toBeVisible();
    const a = (await search.boundingBox())!;
    const b = (await details.boundingBox())!;
    expect(a.x + a.width <= b.x || b.x + b.width <= a.x || a.y + a.height <= b.y || b.y + b.height <= a.y).toBeTruthy();
    expect(b.y + b.height).toBeLessThanOrEqual(viewport.height);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(viewport.width);
    await page.getByRole('button', { name: '关闭方言详情' }).click();
    await expect(search.getByRole('button', { name: /北京话/ })).toBeVisible();
  });
}

test('tile failure allows browsing and retrying without losing markers', async ({ page }) => {
  await page.unroute(tileUrl);
  await page.route(tileUrl, (route) => route.abort());
  await page.goto('/');
  await expect(page.getByText('底图暂时无法加载，仍可通过列表查看方言。')).toBeVisible();
  await expect(page.locator('.leaflet-marker-icon')).toHaveCount(12);
  await page.getByRole('region', { name: '搜索与浏览方言' }).getByRole('button', { name: /北京话/ }).click();
  await expect(page.locator('#dialect-title')).toHaveText('北京话');
  await expect(page.getByRole('button', { name: '重试底图' })).toHaveCount(0);
  await page.getByRole('button', { name: '关闭方言详情' }).click();
  await page.unroute(tileUrl);
  await page.route(tileUrl, (route) => route.fulfill({ contentType: 'image/png', body: tile }));
  await page.getByRole('button', { name: '重试底图' }).click();
  await expect(page.locator('.leaflet-tile-loaded').first()).toBeVisible();
  await expect(page.getByRole('button', { name: '重试底图' })).toHaveCount(0);
  await page.getByLabel('搜索方言名称、地区或语言特点').fill('北京');
  await expect(page.locator('.leaflet-marker-icon')).toHaveCount(1);
});
