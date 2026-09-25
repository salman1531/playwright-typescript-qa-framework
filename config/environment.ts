import 'dotenv/config';

export const environment = {
  baseUrl: process.env.BASE_URL ?? 'http://127.0.0.1:4173',
  apiUrl: process.env.API_URL ?? 'http://127.0.0.1:4173/api',
  user: process.env.E2E_USER ?? 'qa.user@example.test',
  password: process.env.E2E_PASSWORD ?? 'Portfolio123!',
};
