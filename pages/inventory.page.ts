import { expect, Page } from '@playwright/test';
import { HeaderComponent } from './components/header.component';

export class InventoryPage {
  readonly header: HeaderComponent;
  constructor(private readonly page: Page) { this.header = new HeaderComponent(page); }

  async addProduct(name: string) {
    const card = this.page.getByTestId('product-card').filter({ hasText: name });
    await card.getByRole('button', { name: 'Add to cart' }).click();
    await expect(this.header.cartLink).toContainText('1');
  }

  async openCart() { await this.header.cartLink.click(); }
}
