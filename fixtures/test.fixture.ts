import { test as base } from '@playwright/test';
import { environment } from '../config/environment';
import { ApiClient } from '../services/api-client';
import { CheckoutPage } from '../pages/checkout.page';
import { InventoryPage } from '../pages/inventory.page';
import { LoginPage } from '../pages/login.page';

type FrameworkFixtures = {
  api: ApiClient;
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  checkoutPage: CheckoutPage;
};

export const test = base.extend<FrameworkFixtures>({
  api: async ({ request }, use) => use(new ApiClient(request, environment.apiUrl)),
  loginPage: async ({ page }, use) => use(new LoginPage(page)),
  inventoryPage: async ({ page }, use) => use(new InventoryPage(page)),
  checkoutPage: async ({ page }, use) => use(new CheckoutPage(page)),
});

export { expect } from '@playwright/test';
