import { APIRequestContext } from '@playwright/test';
import { AttachPaymentMethodRequest } from '@api-schemas/requests/attach-payment-method.request';
import {
  PaymentMethodResponse,
  PaymentMethodResponseSchema,
} from '@api-schemas/responses/payment-method.response';
import { PaymentMethodAsserter } from '@asserters/payment-method-asserter';
import { BaseController } from '@controllers/base-controller';

const PAYMENT_METHODS_PATH = '/v1/payment_methods';

export class PaymentMethodController extends BaseController<
  PaymentMethodController,
  PaymentMethodAsserter
> {
  constructor(request: APIRequestContext) {
    super(request);
  }

  async attachPaymentMethod(
    paymentMethodId: string,
    data: AttachPaymentMethodRequest,
  ): Promise<PaymentMethodController> {
    return this.post(
      `${PAYMENT_METHODS_PATH}/${paymentMethodId}/attach`,
      data,
      PaymentMethodResponseSchema,
    );
  }

  getPaymentMethod(): PaymentMethodResponse {
    return this.getResponseBody<PaymentMethodResponse>();
  }

  getPaymentMethodId(): string {
    return this.getPaymentMethod().id;
  }

  assertThat(): PaymentMethodAsserter {
    return new PaymentMethodAsserter(this);
  }
}
