import { test, expect } from '@playwright/test';

test.describe('Login - CMC 2025', () => {

test('Login Scenarios', async ({ page }) => {
  const signinURL = 'https://app2025.calcmenu.com/Welcome/Signin';
  const correctEmail = 'data+209@calcmenu.com';
  const correctPassword = 'Qwerty@12345';
  const dashboardURL = 'https://app2025.calcmenu.com/Home/Dashboard';


  await page.goto(signinURL, { waitUntil: 'domcontentloaded' });

  // Scenario 1: Wrong email
  await page.getByPlaceholder('Email Address').fill('wrongemail@calcmenu.com');
  await page.getByPlaceholder('Password').fill(correctPassword);
  await page.waitForTimeout(1000);
  await page.getByRole('button', { name: 'LOGIN' }).click();
  await expect(page.getByText('This E-mail address does not exists', { exact: true }))
    .toBeVisible({ timeout: 20_000 });

  await page.getByPlaceholder('Email Address').fill('');
  await page.getByPlaceholder('Password').fill('');

  // Scenario 2: Wrong password
  await page.getByPlaceholder('Email Address').fill(correctEmail);
  await page.getByPlaceholder('Password').fill('WrongPassword123');
  await page.waitForTimeout (1000);
  await page.getByRole('button', { name: 'LOGIN' }).click();
  await expect(page.getByText('Wrong password', { exact: true }))
    .toBeVisible({ timeout: 20_000 });
    await page.waitForTimeout (2000);


  await page.getByPlaceholder('Email Address').fill('');
  await page.getByPlaceholder('Password').fill('');



// SCENARIO 3: Correct Credentials
await page.getByPlaceholder('Email Address').fill(correctEmail);
await page.getByPlaceholder('Password').fill(correctPassword);

await Promise.all([
  page.waitForURL('**/Home/Dashboard', { timeout: 60_000 }),
  page.getByRole('button', { name: 'LOGIN' }).click(),
]);

await expect(page).toHaveURL(dashboardURL);
await page.waitForTimeout(5000);

});

});
