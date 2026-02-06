import { APIRequestContext } from '@playwright/test';
import { CreatePaymentIntentRequest } from '@api-schemas/requests/create-payment-intent.request';
import {
  PaymentIntentResponse,
  PaymentIntentResponseSchema,
} from '@api-schemas/responses/payment-intent.response';
import { PaymentIntentAsserter } from '@asserters/payment-intent-asserter';
import { BaseController } from '@controllers/base-controller';

const PAYMENT_INTENTS_PATH = '/v1/payment_intents';

export class PaymentIntentController extends BaseController<
  PaymentIntentController,
  PaymentIntentAsserter
> {
  constructor(request: APIRequestContext) {
    super(request);
  }

  async createPaymentIntent(data: CreatePaymentIntentRequest): Promise<PaymentIntentController> {
    return this.post(PAYMENT_INTENTS_PATH, data, PaymentIntentResponseSchema);
  }

  async retrievePaymentIntent(paymentIntentId: string): Promise<PaymentIntentController> {
    return this.get(
      `${PAYMENT_INTENTS_PATH}/${paymentIntentId}`,
      undefined,
      PaymentIntentResponseSchema,
    );
  }

  getPaymentIntent(): PaymentIntentResponse {
    return this.getResponseBody<PaymentIntentResponse>();
  }

  getPaymentIntentId(): string {
    return this.getPaymentIntent().id;
  }

  getClientSecret(): string | null | undefined {
    return this.getPaymentIntent().client_secret;
  }

  assertThat(): PaymentIntentAsserter {
    return new PaymentIntentAsserter(this);
  }
}
