import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  page.goto('/e-commerce/register');
  await page.fill('[name="email"]', 'Testing11@gmail.com');
  await page.fill('[name="password"]', 'Testing01');
  await page.getByRole('button', { name: 'submit' }).click();
  await expect(page.locator('.alert-success')).toContainText(
    'Login Successful! Redirecting...'
  );
});

test('Profile', async ({ page }) => {
  await page.getByRole('link', { name: 'profile' }).click();
  const name = await page.locator('[name="name"]').inputValue();
  await expect(name).toContain('Dummy');
  await page.getByTestId('male').check();
  await page
    .locator('input[type="file"]')
    .setInputFiles('../playwright-with-QAhive/image/bag.png');
  await page.getByText('Upload').click();
  await expect(page.locator('.alert-info')).toContainText(
    'Upload file: bag.png'
  );
  await page.getByText('save changes').click();
  await expect(page.locator('.alert-success')).toContainText(
    'User Profile Updated!'
  );
});

test('Add product / Order', async ({ page }) => {
  let num = 0;
  for (let i = 1; i < Math.floor(Math.random() * 6); i++) {
    await page
      .getByText('Add to cart')
      .nth(Math.floor(Math.random() * 2))
      .click();
    await num++;
  }
  await page.getByRole('link', { name: `(${num})` }).click();
  const num_item = await page.locator('.mb-0').first().textContent();
  await expect(num_item).toContain(num.toString());
  await page.fill('[name="cardholderName"]', 'Demo');
  await page.fill('[name="cardNumber"]', '4242424242424242');
  await page.fill('[name="expiration"]', '01/2025');
  await page.fill('[name="cvv"]', '123');
  await page.getByRole('button', { name: 'Payment' }).click();
  const text_res = await page.locator('h2.mt-4').textContent();
  await expect(text_res).toContain('Payment Successful');
  await page.getByRole('link', { name: 'Back to Shopping' }).click();
});
