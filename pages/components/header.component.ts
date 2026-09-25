import { Locator, Page } from '@playwright/test';

export class HeaderComponent {
  readonly cartLink: Locator;
  readonly signOutButton: Locator;

  constructor(page: Page) {
    this.cartLink = page.getByRole('link', { name: /cart/i });
    this.signOutButton = page.getByRole('button', { name: 'Sign out' });
  }
}
