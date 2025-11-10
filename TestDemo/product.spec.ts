import { test, expect, devices } from '@playwright/test';


test.setTimeout(120_000);
test.use({ actionTimeout: 20_000, navigationTimeout: 45_000 });

test('Login and Navigate to Product List', async ({ page }) => {
  const base = 'https://app2025.calcmenu.com';
  const signin = `${base}/Welcome/Signin`;

  // --- Login ---
  await page.goto(signin);
  await page.getByPlaceholder('Email Address').fill('data+209@calcmenu.com');
  await page.getByPlaceholder('Password').fill('Qwerty@12345');
  await page.waitForTimeout(1000);
  await page.getByRole('button', { name: 'LOGIN' }).click();
  await page.waitForURL('**/Home/Dashboard');

  // --- Click Product in sidebar ---
  const productSidebarBtn = page.locator(
    '#nav button:has(img[src*="/Icons/sidebar"][src*="product"])'
  ).first();

  await productSidebarBtn.waitFor({ state: 'visible', timeout: 2000 });
  await productSidebarBtn.click();

  // Wait for Product List to load
  await Promise.race([
    page.waitForURL('**/Home/Product'),
    page.getByText(/Product List/i).waitFor({ timeout: 10000 }),
  ]);

  await page.waitForTimeout(500);
  await page
    .locator('[class*="overlay"], [class*="spinner"], .cdk-overlay-backdrop, .ngx-spinner')
    .first()
    .waitFor({ state: 'detached', timeout: 5000 })
    .catch(() => {});

  // --- Click Search ---
  const candidates = [
    () => page.getByRole('button', { name: /search/i }),
    () => page.locator('[title="Search"], [aria-label="Search"], [data-original-title="Search"]').first(),
    () => page.locator('button:has(i[class*="search"])').first(),
    () => page.locator('.btn.shadow-none.my-auto').first(),
  ];

  let clicked = false;
  for (const get of candidates) {
    const loc = get();
    if (await loc.isVisible().catch(() => false)) {
      try {
        await loc.click({ timeout: 5000 });
        clicked = true;
        break;
      } catch {}
    }
  }

  // --- Wait for list to display, then pause 5s ---
  await Promise.race([
    page.locator('table').first().waitFor({ state: 'visible' }),
    page.getByText(/\bResult\(s\)\b/i).waitFor().catch(() => {}),
  ]);

  await page.waitForTimeout(8_000);

});
