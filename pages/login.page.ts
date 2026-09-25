import { expect, Page } from '@playwright/test';

export class LoginPage {
  constructor(private readonly page: Page) {}

  async open() {
    await this.page.goto('/');
    await expect(this.page.getByRole('heading', { name: 'Demo Store Login' })).toBeVisible();
  }

  async signIn(email: string, password: string) {
    await this.page.getByLabel('Email').fill(email);
    await this.page.getByLabel('Password').fill(password);
    await this.page.getByRole('button', { name: 'Sign in' }).click();
    await expect(this.page).toHaveURL(/\/inventory$/);
  }
}
