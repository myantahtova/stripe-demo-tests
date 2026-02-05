import { expect } from '@playwright/test';
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

  isDeleted(): this {
    return this.bodyPropertyEquals('deleted', true);
  }
}
