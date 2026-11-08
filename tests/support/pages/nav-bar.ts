import type { Locator, Page } from '@playwright/test';

export class NavBar {
  readonly userMenu: Locator;
  readonly signOut: Locator;

  constructor(readonly page: Page) {
    this.userMenu = page.getByTestId('nav-menu');
    this.signOut = page.getByTestId('nav-sign-out');
  }

  async signOutFromUserMenu(): Promise<void> {
    await this.userMenu.click();
    await this.signOut.click();
  }
}
