import { test as base } from '@playwright/test';
import { CustomerController } from '@controllers/customer-controller';

type ApiFixtures = {
  customerController: CustomerController;
};

export const test = base.extend<ApiFixtures>({
  customerController: async ({ request }, use) => {
    await use(new CustomerController(request));
  },
});

export { expect } from '@playwright/test';
