import { expect } from '@playwright/test';
import { ChargeStatusEnum } from '@constants/enums';
import { BaseAsserter } from '@asserters/base-asserter';
import type { ChargeController } from '@controllers/charge-controller';

export class ChargeAsserter extends BaseAsserter<ChargeController> {
  hasId(): this {
    const id = this.controller.getResponseBody<{ id?: string }>().id;
    expect(id).toBeDefined();
    expect(id).toMatch(/^ch_/);
    return this;
  }

  hasAmount(expectedAmount: number): this {
    return this.bodyPropertyEquals('amount', expectedAmount);
  }

  hasAmountCaptured(expectedAmountCaptured: number): this {
    return this.bodyPropertyEquals('amount_captured', expectedAmountCaptured);
  }

  hasCurrency(expectedCurrency: string): this {
    return this.bodyPropertyEquals('currency', expectedCurrency);
  }

  hasCustomer(expectedCustomerId: string): this {
    return this.bodyPropertyEquals('customer', expectedCustomerId);
  }

  hasDescription(expectedDescription: string): this {
    return this.bodyPropertyEquals('description', expectedDescription);
  }

  hasPaymentIntent(expectedPaymentIntentId: string): this {
    return this.bodyPropertyEquals('payment_intent', expectedPaymentIntentId);
  }

  hasPaymentMethod(expectedPaymentMethodId: string): this {
    return this.bodyPropertyEquals('payment_method', expectedPaymentMethodId);
  }

  hasStatus(expectedStatus: ChargeStatusEnum): this {
    return this.bodyPropertyEquals('status', expectedStatus);
  }

  isCaptured(): this {
    return this.bodyPropertyEquals('captured', true);
  }

  isPaid(): this {
    return this.bodyPropertyEquals('paid', true);
  }

  isRefunded(): this {
    return this.bodyPropertyEquals('refunded', true);
  }

  isDisputed(): this {
    return this.bodyPropertyEquals('disputed', true);
  }

  isSuccessful(): this {
    return this.hasStatus(ChargeStatusEnum.SUCCEEDED);
  }

  isPending(): this {
    return this.hasStatus(ChargeStatusEnum.PENDING);
  }

  hasFailed(): this {
    return this.hasStatus(ChargeStatusEnum.FAILED);
  }

  hasReceiptEmail(expectedEmail: string): this {
    return this.bodyPropertyEquals('receipt_email', expectedEmail);
  }

  hasReceiptUrl(): this {
    const receiptUrl = this.controller.getResponseBody<{
      receipt_url?: string | null;
    }>().receipt_url;
    expect(receiptUrl).toBeDefined();
    expect(receiptUrl).not.toBeNull();
    expect(receiptUrl).toContain('https://');
    return this;
  }
}
