import { Address } from '@api-schemas/objects/address.schema.js';
import { Shipping } from '@api-schemas/objects/shipping.schema.js';
import { TaxExempt } from '@api-schemas/objects/tax-exempt.schema.js';
import {
  CreateCustomerRequest,
  CreateCustomerRequestSchema,
} from '@api-schemas/requests/create-customer.request.js';
import { BaseBuilder } from '@builders/base-builder.js';
import { AddressBuilder } from '@builders/object-builders/address.builder.js';
import { MetadataBuilder } from '@builders/object-builders/metadata.builder.js';
import { faker } from '@faker-js/faker';

const defaultCreateCustomerRequest: CreateCustomerRequest = {
  email: faker.internet.email(),
  name: faker.person.fullName(),
  phone: faker.phone.number(),
  description: faker.lorem.sentence(),
  address: new AddressBuilder().withAllFields().build(),
  metadata: new MetadataBuilder().withAllFields().build(),
};

export class CustomerBuilder extends BaseBuilder<CreateCustomerRequest> {
  protected schema = CreateCustomerRequestSchema;
  protected defaultFullBody = defaultCreateCustomerRequest;

  withEmail(email: string): this {
    return this.with('email', email);
  }

  withName(name: string): this {
    return this.with('name', name);
  }

  withPhone(phone: string): this {
    return this.with('phone', phone);
  }

  withDescription(description: string): this {
    return this.with('description', description);
  }

  withMetadata(metadata: Record<string, string>): this {
    return this.with('metadata', metadata);
  }

  withAddress(address: Address): this {
    return this.with('address', address);
  }

  withShipping(shipping: Shipping): this {
    return this.with('shipping', shipping);
  }

  withBalance(balance: number): this {
    return this.with('balance', balance);
  }

  withPaymentMethod(paymentMethodId: string): this {
    return this.with('payment_method', paymentMethodId);
  }

  withTaxExempt(taxExempt: TaxExempt): this {
    return this.with('tax_exempt', taxExempt);
  }

  withPreferredLocales(locales: string[]): this {
    return this.with('preferred_locales', locales);
  }

  withInvoicePrefix(prefix: string): this {
    return this.with('invoice_prefix', prefix);
  }

  withTestClock(testClockId: string): this {
    return this.with('test_clock', testClockId);
  }
}
