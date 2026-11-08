import { randomUUID } from 'node:crypto';
import type { APIRequestContext, APIResponse } from '@playwright/test';
import type { Credentials } from '../accounts';

export interface LoginBody {
  access_token: string;
  token_type: string;
  expires_in: number;
}

/** Thin client for the Toolshop `/users` endpoints. */
export class UsersApi {
  constructor(private readonly request: APIRequestContext) {}

  login(email: string, password: string): Promise<APIResponse> {
    return this.request.post('/users/login', { data: { email, password } });
  }

  async token(credentials: Credentials): Promise<string> {
    const response = await this.login(credentials.email, credentials.password);
    if (!response.ok()) throw new Error(`Sign-in failed for ${credentials.email}: ${response.status()}`);
    return ((await response.json()) as LoginBody).access_token;
  }

  logout(token?: string): Promise<APIResponse> {
    return this.request.get('/users/logout', {
      headers: token === undefined ? {} : { Authorization: `Bearer ${token}` },
    });
  }

  forgotPassword(email: string): Promise<APIResponse> {
    return this.request.post('/users/forgot-password', { data: { email } });
  }

  /** Registers a fresh User account that only the calling test uses. */
  async registerDedicatedUser(): Promise<Credentials> {
    const credentials = {
      email: `qa-${randomUUID()}@example.com`,
      password: `Qa!${randomUUID().slice(0, 8)}Zz9`,
    };
    const response = await this.request.post('/users/register', {
      data: {
        first_name: 'Qa',
        last_name: 'Dedicated',
        dob: '1990-01-01',
        phone: '0123456789',
        address: { street: 'Test Street', house_number: '1', city: 'Test', state: 'Test', country: 'NL', postal_code: '1234AA' },
        ...credentials,
      },
    });
    if (response.status() !== 201) throw new Error(`Registration failed: ${response.status()} ${await response.text()}`);
    return credentials;
  }
}
