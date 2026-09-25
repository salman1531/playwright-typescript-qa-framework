import { APIRequestContext, expect } from '@playwright/test';

export class ApiClient {
  constructor(private readonly request: APIRequestContext, private readonly apiUrl: string) {}

  async products() {
    const response = await this.request.get(`${this.apiUrl}/products`);
    expect(response.ok()).toBeTruthy();
    return response.json() as Promise<Array<{ id: string; name: string; price: number }>>;
  }

  async createOrder(productId: string, email: string) {
    const response = await this.request.post(`${this.apiUrl}/orders`, { data: { productId, email } });
    expect(response.status()).toBe(201);
    return response.json() as Promise<{ id: string; productId: string; email: string; status: string }>;
  }
}
