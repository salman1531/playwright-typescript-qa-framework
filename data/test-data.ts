export type Customer = { name: string; email: string; address: string };

export const products = {
  backpack: { id: 'backpack', name: 'Trail Backpack', price: 49.99 },
  bottle: { id: 'bottle', name: 'Steel Water Bottle', price: 19.5 },
};

export function uniqueCustomer(): Customer {
  const suffix = `${Date.now()}-${Math.floor(Math.random() * 10_000)}`;
  return {
    name: 'Portfolio Tester',
    email: `buyer-${suffix}@example.test`,
    address: '100 Test Avenue',
  };
}
