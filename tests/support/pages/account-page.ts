import type { Page } from '@playwright/test';

export class AccountPage {
  constructor(readonly page: Page) {}

  async goto(): Promise<void> {
    await this.page.goto('/account');
  }
}
