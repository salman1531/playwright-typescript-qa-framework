import { expect, Page } from '@playwright/test';
import { Customer } from '../data/test-data';

export class CheckoutPage {
  constructor(private readonly page: Page) {}

  async checkout(customer: Customer) {
    await expect(this.page.getByRole('heading', { name: 'Your Cart' })).toBeVisible();
    await this.page.getByRole('button', { name: 'Checkout' }).click();
    await this.page.getByLabel('Full name').fill(customer.name);
    await this.page.getByLabel('Email').fill(customer.email);
    await this.page.getByLabel('Address').fill(customer.address);
    await this.page.getByRole('button', { name: 'Place order' }).click();
    await expect(this.page.getByRole('heading', { name: 'Order confirmed' })).toBeVisible();
    await expect(this.page.getByTestId('order-number')).toHaveText(/^ORD-/);
  }
}
