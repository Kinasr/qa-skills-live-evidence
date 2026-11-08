export type Role = 'User' | 'Admin';

export interface Credentials {
  email: string;
  password: string;
}

function required(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing env var ${name}; see .env.example`);
  return value;
}

export function account(role: Role): Credentials {
  const prefix = role === 'Admin' ? 'TOOLSHOP_ADMIN' : 'TOOLSHOP_USER';
  return { email: required(`${prefix}_EMAIL`), password: required(`${prefix}_PASSWORD`) };
}

/** A well-formed address no seeded or generated account uses. */
export const unregisteredEmail = () => `unregistered-${Date.now()}-${Math.random().toString(36).slice(2, 8)}@example.com`;
