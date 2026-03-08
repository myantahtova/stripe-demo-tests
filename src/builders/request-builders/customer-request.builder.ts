import { faker } from '@faker-js/faker';
import { Address } from '@api-schemas/objects/address.schema';
import { InvoiceSettings } from '@api-schemas/objects/invoice-settings.schema';
import { Shipping } from '@api-schemas/objects/shipping.schema';
import { TaxExempt } from '@api-schemas/objects/tax-exempt.schema';
import {
  CreateCustomerRequest,
  CreateCustomerRequestSchema,
} from '@api-schemas/requests/create-customer.request';
import { BaseBuilder } from '@builders/base-builder';
import { AddressBuilder } from '@builders/object-builders/address.builder';
import { MetadataBuilder } from '@builders/object-builders/metadata.builder';
import { AUTOMATION_CUSTOMER_PREFIX } from '@constants/test-data-prefixes';

export class CustomerBuilder extends BaseBuilder<CreateCustomerRequest> {
  protected schema = CreateCustomerRequestSchema;

  protected get defaultBody(): CreateCustomerRequest {
    return {
      email: faker.internet.email(),
      name: `${AUTOMATION_CUSTOMER_PREFIX}_${faker.person.fullName()}`,
      phone: faker.phone.number({ style: 'national' }),
      description: faker.lorem.sentence(),
      address: new AddressBuilder().withDefaultFields().build(),
      metadata: new MetadataBuilder().withDefaultFields().build(),
    };
  }

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

  withInvoiceSettings(invoiceSettings: Partial<InvoiceSettings>): this {
    return this.with('invoice_settings', invoiceSettings);
  }

  withDefaultPaymentMethod(paymentMethodId: string): this {
    return this.with('invoice_settings', { default_payment_method: paymentMethodId });
  }

  withTestClock(testClockId: string): this {
    return this.with('test_clock', testClockId);
  }
}
