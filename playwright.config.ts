import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  workers: 1,
  retries: process.env.CI ? 1 : 0,
  use: { baseURL: 'http://localhost:3100', reducedMotion: 'reduce', trace: 'retain-on-failure' },
  webServer: {
    command: 'npm run dev -- --port 3100',
    url: 'http://localhost:3100',
    reuseExistingServer: !process.env.CI,
  },
});
