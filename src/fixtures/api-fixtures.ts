import { test as base } from '@playwright/test';
import { ChargeController } from '@controllers/charge-controller';
import { CustomerController } from '@controllers/customer-controller';
import { PaymentIntentController } from '@controllers/payment-intent-controller';
import { PaymentMethodController } from '@controllers/payment-method-controller';

type ApiFixtures = {
  chargeController: ChargeController;
  customerController: CustomerController;
  paymentIntentController: PaymentIntentController;
  paymentMethodController: PaymentMethodController;
};

export const test = base.extend<ApiFixtures>({
  chargeController: async ({ request }, use) => {
    await use(new ChargeController(request));
  },
  customerController: async ({ request }, use) => {
    await use(new CustomerController(request));
  },
  paymentIntentController: async ({ request }, use) => {
    await use(new PaymentIntentController(request));
  },
  paymentMethodController: async ({ request }, use) => {
    await use(new PaymentMethodController(request));
  },
});

export { expect } from '@playwright/test';
