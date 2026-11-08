import type { Locator, Page } from '@playwright/test';

export class LoginPage {
  readonly form: Locator;
  readonly email: Locator;
  readonly password: Locator;
  readonly togglePasswordVisibility: Locator;
  readonly submit: Locator;
  readonly emailError: Locator;
  readonly passwordError: Locator;
  readonly loginError: Locator;
  readonly registerLink: Locator;
  readonly forgotPasswordLink: Locator;

  constructor(readonly page: Page) {
    this.form = page.getByTestId('login-form');
    this.email = page.getByTestId('email');
    this.password = page.getByTestId('password');
    this.togglePasswordVisibility = page.locator('app-password-input').getByRole('button');
    this.submit = page.getByTestId('login-submit');
    this.emailError = page.getByTestId('email-error');
    this.passwordError = page.getByTestId('password-error');
    this.loginError = page.getByTestId('login-error');
    this.registerLink = page.getByTestId('register-link');
    this.forgotPasswordLink = page.getByTestId('forgot-password-link');
  }

  async goto(): Promise<void> {
    await this.page.goto('/auth/login');
  }

  async signIn(email: string, password: string): Promise<void> {
    await this.email.fill(email);
    await this.password.fill(password);
    await this.submit.click();
  }
}
