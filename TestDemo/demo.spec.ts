import { test, expect } from '@playwright/test';

test.describe('Login Scenarios - CMC 2025', () => {

  const baseURL = 'https://app2025.calcmenu.com/Welcome/Signin';
  const dashboardURL = 'https://app2025.calcmenu.com/Home/Dashboard';
  const correctEmail = 'data+209@calcmenu.com';
  const correctPassword = 'Qwerty@12345';

  
  test('Login Scenario', async ({ page }) => {
    await page.goto(baseURL);

     // ----------  Wrong Email ----------
  await page.goto(baseURL);

console.log('Testing wrong email...');
await page.getByPlaceholder('Email Address').fill('wrongemail@calcmenu.com');
await page.getByPlaceholder('Password').fill(correctPassword);
await page.waitForTimeout(1000); 
await page.getByRole('button', { name: 'LOGIN' }).click();


  // Expect the error message for wrong email
  const emailError = page.getByText('This E-mail address does not exists', { exact: true });
  await expect(emailError).toBeVisible({ timeout: 10000 });
  await page.waitForTimeout(2000);

  // Clear input fields
  await page.getByPlaceholder('Email Address').fill('');
  await page.getByPlaceholder('Password').fill('');

  // ---------- Wrong Password ----------
  console.log(' Testing wrong password...');
  await page.getByPlaceholder('Email Address').fill(correctEmail);
  await page.getByPlaceholder('Password').fill('WrongPassword123');
  await page.getByRole('button', { name: 'LOGIN' }).click();

  // Expect the error message for wrong password
  const passwordError = page.getByText('Wrong password', { exact: true });
  await expect(passwordError).toBeVisible({ timeout: 10000 });
  await page.waitForTimeout(2000);

  // Clear input fields again
  await page.getByPlaceholder('Email Address').fill('');
  await page.getByPlaceholder('Password').fill('');

  // ---------- Correct Credentials ----------
  console.log(' Testing correct credentials...');
  await page.getByPlaceholder('Email Address').fill(correctEmail);
  await page.getByPlaceholder('Password').fill(correctPassword);
  await Promise.all([
    page.waitForURL('**/Home/Dashboard', { timeout: 80000 }),
    page.getByRole('button', { name: 'LOGIN' }).click(),
  ]);

    // Verify redirect to Dashboard
    await expect(page).toHaveURL(dashboardURL);
    await page.waitForTimeout(5000);

//Added test comment by Cassy 1 

    //Added test comment by Cassy 2
  });
});
