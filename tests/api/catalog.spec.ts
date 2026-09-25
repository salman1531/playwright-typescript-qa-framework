import { products } from '../../data/test-data';
import { expect, test } from '../../fixtures/test.fixture';

test.describe('Catalog API', () => {
  test('@smoke returns the product catalog', async ({ api }) => {
    const catalog = await api.products();
    expect(catalog).toContainEqual(products.backpack);
  });

  test('creates an order with the expected contract', async ({ api }) => {
    const order = await api.createOrder(products.bottle.id, `api-${Date.now()}@example.test`);
    expect(order).toMatchObject({ productId: products.bottle.id, status: 'created' });
    expect(order.id).toMatch(/^ORD-/);
  });
});
