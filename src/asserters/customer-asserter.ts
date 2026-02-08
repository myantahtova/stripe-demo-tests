import { expect } from '@playwright/test';
import { Address } from '@api-schemas/objects/address.schema';
import { BaseAsserter } from '@asserters/base-asserter';
import type { CustomerController } from '@controllers/customer-controller';

export class CustomerAsserter extends BaseAsserter<CustomerController> {
  hasId(): this {
    const id = this.controller.getResponseBody<{ id?: string }>().id;
    expect(id).toBeDefined();
    expect(id).toMatch(/^cus_/);
    return this;
  }

  hasEmail(expectedEmail: string): this {
    return this.bodyPropertyEquals('email', expectedEmail);
  }

  hasName(expectedName: string): this {
    return this.bodyPropertyEquals('name', expectedName);
  }

  hasDefaultPaymentMethod(expectedPaymentMethodId: string): this {
    const invoiceSettings = this.controller.getResponseBody<{
      invoice_settings?: { default_payment_method?: string | null };
    }>().invoice_settings;
    expect(invoiceSettings).toBeDefined();
    expect(invoiceSettings?.default_payment_method).toBe(expectedPaymentMethodId);
    return this;
  }

  hasAddress(expectedAddress: Address): this {
    return this.bodyPropertyEquals('address', expectedAddress);
  }

  isDeleted(): this {
    return this.bodyPropertyEquals('deleted', true);
  }
}
