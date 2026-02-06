import { faker } from '@faker-js/faker';
import { SetupFutureUsage } from '@api-schemas/objects/setup-future-usage.schema';
import { Shipping } from '@api-schemas/objects/shipping.schema';
import {
  CreatePaymentIntentRequest,
  CreatePaymentIntentRequestSchema,
} from '@api-schemas/requests/create-payment-intent.request';
import { BaseBuilder } from '@builders/base-builder';
import { ShippingBuilder } from '@builders/object-builders/shipping.builder';

const defaultCreatePaymentIntentRequest: CreatePaymentIntentRequest = {
  amount: 2000,
  currency: 'usd',
  customer: undefined,
  customer_account: undefined,
  description: faker.lorem.sentence(),
  metadata: { order_id: faker.string.alphanumeric(10) },
  payment_method: undefined,
  receipt_email: faker.internet.email(),
  setup_future_usage: undefined,
  shipping: undefined,
  statement_descriptor: undefined,
  statement_descriptor_suffix: undefined,
};

export class PaymentIntentBuilder extends BaseBuilder<CreatePaymentIntentRequest> {
  protected schema = CreatePaymentIntentRequestSchema;
  protected defaultFullBody = defaultCreatePaymentIntentRequest;

  withAmount(amount: number): this {
    return this.with('amount', amount);
  }

  withCurrency(currency: string): this {
    return this.with('currency', currency);
  }

  withCustomer(customerId: string): this {
    return this.with('customer', customerId);
  }

  withCustomerAccount(customerAccountId: string): this {
    return this.with('customer_account', customerAccountId);
  }

  withDescription(description: string): this {
    return this.with('description', description);
  }

  withMetadata(metadata: Record<string, string>): this {
    return this.with('metadata', metadata);
  }

  withPaymentMethod(paymentMethodId: string): this {
    return this.with('payment_method', paymentMethodId);
  }

  withReceiptEmail(email: string): this {
    return this.with('receipt_email', email);
  }

  withSetupFutureUsage(usage: SetupFutureUsage): this {
    return this.with('setup_future_usage', usage);
  }

  withShipping(shipping: Shipping): this {
    return this.with('shipping', shipping);
  }

  withShippingDetails(): this {
    return this.with('shipping', new ShippingBuilder().withAllFields().build());
  }

  withStatementDescriptor(descriptor: string): this {
    return this.with('statement_descriptor', descriptor);
  }

  withStatementDescriptorSuffix(suffix: string): this {
    return this.with('statement_descriptor_suffix', suffix);
  }
}
