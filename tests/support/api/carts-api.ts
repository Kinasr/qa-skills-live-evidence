import type { APIRequestContext, APIResponse } from '@playwright/test';

export interface CartItem {
  id: string;
  product_id: string;
  quantity: number;
}

export interface CartBody {
  id: string;
  cart_items: CartItem[];
}

/** Thin client for the Toolshop `/carts` endpoints; a call without a token is a signed-out session. */
export class CartsApi {
  constructor(private readonly request: APIRequestContext) {}

  private headers(token?: string): Record<string, string> {
    return token === undefined ? {} : { Authorization: `Bearer ${token}` };
  }

  create(token?: string): Promise<APIResponse> {
    return this.request.post('/carts', { headers: this.headers(token) });
  }

  /** Creates an empty cart and returns its identifier. */
  async createCart(token?: string): Promise<string> {
    const response = await this.create(token);
    if (!response.ok()) throw new Error(`Cart creation failed: ${response.status()} ${await response.text()}`);
    return ((await response.json()) as { id: string }).id;
  }

  get(cartId: string, token?: string): Promise<APIResponse> {
    return this.request.get(`/carts/${cartId}`, { headers: this.headers(token) });
  }

  addItem(cartId: string, productId: string, quantity: number, token?: string): Promise<APIResponse> {
    return this.request.post(`/carts/${cartId}`, {
      headers: this.headers(token),
      data: { product_id: productId, quantity },
    });
  }

  updateQuantity(cartId: string, productId: string, quantity: number, token?: string): Promise<APIResponse> {
    return this.request.put(`/carts/${cartId}/product/quantity`, {
      headers: this.headers(token),
      data: { product_id: productId, quantity },
    });
  }

  removeItem(cartId: string, productId: string, token?: string): Promise<APIResponse> {
    return this.request.delete(`/carts/${cartId}/product/${productId}`, { headers: this.headers(token) });
  }

  /** The cart's lines, failing loudly when the cart cannot be read. */
  async lines(cartId: string, token?: string): Promise<CartItem[]> {
    const response = await this.get(cartId, token);
    if (!response.ok()) throw new Error(`Cart read failed: ${response.status()} ${await response.text()}`);
    return ((await response.json()) as CartBody).cart_items ?? [];
  }
}
