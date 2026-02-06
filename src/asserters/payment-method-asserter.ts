import { expect } from '@playwright/test';
import { BaseAsserter } from '@asserters/base-asserter';
import type { PaymentMethodController } from '@controllers/payment-method-controller';

export class PaymentMethodAsserter extends BaseAsserter<PaymentMethodController> {
  hasId(): this {
    const id = this.controller.getResponseBody<{ id?: string }>().id;
    expect(id).toBeDefined();
    expect(id).toMatch(/^pm_/);
    return this;
  }

  hasCustomer(expectedCustomerId: string): this {
    return this.bodyPropertyEquals('customer', expectedCustomerId);
  }

  hasType(expectedType: string): this {
    return this.bodyPropertyEquals('type', expectedType);
  }

  hasCardLast4(expectedLast4: string): this {
    const body = this.controller.getResponseBody<{
      card?: { last4?: string };
    }>();
    expect(body?.card?.last4).toBe(expectedLast4);
    return this;
  }

  hasCardBrand(expectedBrand: string): this {
    const body = this.controller.getResponseBody<{
      card?: { brand?: string };
    }>();
    expect(body?.card?.brand).toBe(expectedBrand);
    return this;
  }

  isAttachedToCustomer(): this {
    const customer = this.controller.getResponseBody<{ customer?: string | null }>().customer;
    expect(customer).toBeDefined();
    expect(customer).not.toBeNull();
    expect(customer).toMatch(/^cus_/);
    return this;
  }
}
