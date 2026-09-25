import { defineConfig, devices } from '@playwright/test';
import { environment } from './config/environment';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : undefined,
  timeout: 30_000,
  expect: { timeout: 5_000 },
  outputDir: 'artifacts/test-results',
  reporter: [
    ['list'],
    ['html', { outputFolder: 'artifacts/html-report', open: 'never' }],
    ['allure-playwright', { resultsDir: 'artifacts/allure-results', detail: false }],
  ],
  use: {
    baseURL: environment.baseUrl,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 10_000,
  },
  projects: [
    { name: 'api', testMatch: /api\/.*\.spec\.ts/ },
    { name: 'chromium', testIgnore: /api\//, use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', testIgnore: /api\//, use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', testIgnore: /api\//, use: { ...devices['Desktop Safari'] } },
  ],
  webServer: {
    command: 'node demo/server.cjs',
    url: `${environment.baseUrl}/api/health`,
    reuseExistingServer: !process.env.CI,
    timeout: 15_000,
  },
});
