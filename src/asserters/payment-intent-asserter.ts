import { expect } from '@playwright/test';
import { BaseAsserter } from '@asserters/base-asserter';
import { PaymentIntentStatusEnum } from '@constants/enums';
import type { PaymentIntentController } from '@controllers/payment-intent-controller';

export class PaymentIntentAsserter extends BaseAsserter<PaymentIntentController> {
  hasId(): this {
    const id = this.controller.getResponseBody<{ id?: string }>().id;
    expect(id).toBeDefined();
    expect(id).toMatch(/^pi_/);
    return this;
  }

  hasAmount(expectedAmount: number): this {
    return this.bodyPropertyEquals('amount', expectedAmount);
  }

  hasCurrency(expectedCurrency: string): this {
    return this.bodyPropertyEquals('currency', expectedCurrency);
  }

  hasCustomer(expectedCustomerId: string): this {
    return this.bodyPropertyEquals('customer', expectedCustomerId);
  }

  hasStatus(expectedStatus: PaymentIntentStatusEnum): this {
    return this.bodyPropertyEquals('status', expectedStatus);
  }

  hasDescription(expectedDescription: string): this {
    return this.bodyPropertyEquals('description', expectedDescription);
  }

  hasPaymentMethod(expectedPaymentMethodId: string): this {
    return this.bodyPropertyEquals('payment_method', expectedPaymentMethodId);
  }

  hasClientSecret(): this {
    const clientSecret = this.controller.getResponseBody<{
      client_secret?: string | null;
    }>().client_secret;
    expect(clientSecret).toBeDefined();
    expect(clientSecret).not.toBeNull();
    expect(clientSecret).toContain('pi_');
    expect(clientSecret).toContain('_secret_');
    return this;
  }

  isSuccessful(): this {
    return this.hasStatus(PaymentIntentStatusEnum.SUCCEEDED);
  }

  requiresPaymentMethod(): this {
    return this.hasStatus(PaymentIntentStatusEnum.REQUIRES_PAYMENT_METHOD);
  }

  requiresConfirmation(): this {
    return this.hasStatus(PaymentIntentStatusEnum.REQUIRES_CONFIRMATION);
  }

  isCanceled(): this {
    return this.hasStatus(PaymentIntentStatusEnum.CANCELED);
  }
}
