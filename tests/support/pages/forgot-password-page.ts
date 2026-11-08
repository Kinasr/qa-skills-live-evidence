import type { Locator, Page } from '@playwright/test';

export class ForgotPasswordPage {
  readonly form: Locator;
  readonly email: Locator;
  readonly submit: Locator;
  readonly emailError: Locator;
  readonly result: Locator;

  constructor(readonly page: Page) {
    this.form = page.getByTestId('forgot-password-form');
    this.email = this.form.getByTestId('email');
    this.submit = page.getByTestId('forgot-password-submit');
    this.emailError = page.getByTestId('email-error');
    /** The alert the server's answer renders after a submit. */
    this.result = this.form.getByRole('alert');
  }

  async goto(): Promise<void> {
    await this.page.goto('/auth/forgot-password');
  }

  async request(email: string): Promise<void> {
    await this.email.fill(email);
    await this.submit.click();
  }
}
