import { environment } from '../../config/environment';
import { expect, test } from '../../fixtures/test.fixture';

test.describe('Authentication', () => {
  test('@smoke signs in with valid credentials', async ({ loginPage, page }) => {
    await test.step('Open the login page', () => loginPage.open());
    await test.step('Sign in with a valid test user', () => loginPage.signIn(environment.user, environment.password));
    await expect(page.getByRole('heading', { name: 'Products' })).toBeVisible();
  });

  test('shows a clear error for invalid credentials', async ({ loginPage, page }) => {
    await loginPage.open();
    await page.getByLabel('Email').fill('invalid@example.test');
    await page.getByLabel('Password').fill('wrong-password');
    await page.getByRole('button', { name: 'Sign in' }).click();
    await expect(page.getByRole('alert')).toHaveText('Invalid email or password');
  });
});
