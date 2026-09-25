import { environment } from '../../config/environment';
import { products, uniqueCustomer } from '../../data/test-data';
import { expect, test } from '../../fixtures/test.fixture';

test('@e2e completes a product checkout', async ({ loginPage, inventoryPage, checkoutPage, page }) => {
  await test.step('Sign in', async () => {
    await loginPage.open();
    await loginPage.signIn(environment.user, environment.password);
  });
  await test.step('Add a product to the cart', () => inventoryPage.addProduct(products.backpack.name));
  await test.step('Open the cart', () => inventoryPage.openCart());
  await test.step('Submit checkout details', () => checkoutPage.checkout(uniqueCustomer()));
  await expect(page.locator('#confirmed-item')).toHaveText(products.backpack.name);
});
