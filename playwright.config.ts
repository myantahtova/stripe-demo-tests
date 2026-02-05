import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';

const envName = process.env.npm_config_env ?? process.env.ENV ?? 'local';

dotenv.config({
  path: `./.env.${envName}`,
});

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    trace: 'off',
    extraHTTPHeaders: {
      Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
    },
  },
  projects: [
    {
      name: 'stripe-api',
    },
  ],
});
