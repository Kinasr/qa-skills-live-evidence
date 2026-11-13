import type { APIRequestContext } from '@playwright/test';

export interface ProductSummary {
  id: string;
  name: string;
  in_stock: boolean;
}

interface ProductPage {
  data: ProductSummary[];
  current_page: number;
  last_page: number;
}

/** Thin client for the Toolshop `/products` endpoints. */
export class ProductsApi {
  constructor(private readonly request: APIRequestContext) {}

  /** The first catalogue product whose stock state matches, searching every page. */
  async firstWhere(inStock: boolean): Promise<ProductSummary> {
    for (let page = 1; ; page++) {
      const response = await this.request.get('/products', { params: { page } });
      if (!response.ok()) throw new Error(`Product list failed: ${response.status()} ${await response.text()}`);
      const body = (await response.json()) as ProductPage;
      const found = body.data.find((product) => product.in_stock === inStock);
      if (found) return found;
      if (body.current_page >= body.last_page) throw new Error(`No product with in_stock=${inStock}`);
    }
  }
}
