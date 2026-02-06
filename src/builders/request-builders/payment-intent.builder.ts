import { faker } from '@faker-js/faker';
import { BillingDetails } from '@api-schemas/objects/billing-details.schema';
import { SetupFutureUsage } from '@api-schemas/objects/setup-future-usage.schema';
import { Shipping } from '@api-schemas/objects/shipping.schema';
import {
  CreatePaymentIntentRequest,
  CreatePaymentIntentRequestSchema,
} from '@api-schemas/requests/create-payment-intent.request';
import { BaseBuilder } from '@builders/base-builder';
import { ShippingBuilder } from '@builders/object-builders/shipping.builder';

export class PaymentIntentBuilder extends BaseBuilder<CreatePaymentIntentRequest> {
  protected schema = CreatePaymentIntentRequestSchema;

  protected get defaultFullBody(): CreatePaymentIntentRequest {
    return {
      amount: 2000,
      currency: 'eur',
      automatic_payment_methods: undefined,
      confirm: undefined,
      customer: undefined,
      customer_account: undefined,
      description: faker.lorem.sentence(),
      mandate_data: undefined,
      metadata: { order_id: faker.string.alphanumeric(10) },
      off_session: undefined,
      payment_method: undefined,
      payment_method_data: undefined,
      payment_method_types: undefined,
      receipt_email: faker.internet.email(),
      setup_future_usage: undefined,
      shipping: undefined,
      statement_descriptor: undefined,
      statement_descriptor_suffix: undefined,
    };
  }

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

  withConfirm(confirm: boolean): this {
    return this.with('confirm', confirm);
  }

  withOffSession(offSession: boolean | 'true'): this {
    return this.with('off_session', offSession);
  }

  withAutomaticPaymentMethods(options: {
    enabled?: boolean;
    allow_redirects?: 'always' | 'never';
  }): this {
    return this.with('automatic_payment_methods', options);
  }

  withPaymentMethodData(paymentMethodData: {
    type: string;
    billing_details?: BillingDetails;
    sepa_debit?: { iban: string };
  }): this {
    return this.with('payment_method_data', paymentMethodData);
  }

  withSepaDebit(iban: string, billingDetails: BillingDetails): this {
    return this.with('payment_method_data', {
      type: 'sepa_debit',
      sepa_debit: { iban },
      billing_details: billingDetails,
    });
  }

  withMandateData(mandateData: {
    customer_acceptance?: {
      type: 'online' | 'offline';
      online?: {
        ip_address: string;
        user_agent: string;
      };
    };
  }): this {
    return this.with('mandate_data', mandateData);
  }

  withOnlineMandateAcceptance(
    ipAddress: string = '127.0.0.1',
    userAgent: string = 'playwright-e2e-test',
  ): this {
    return this.with('mandate_data', {
      customer_acceptance: {
        type: 'online',
        online: {
          ip_address: ipAddress,
          user_agent: userAgent,
        },
      },
    });
  }

  withPaymentMethodTypes(types: string[]): this {
    return this.with('payment_method_types', types);
  }
}
