import {
  AttachPaymentMethodRequest,
  AttachPaymentMethodRequestSchema,
} from '@api-schemas/requests/attach-payment-method.request';
import { BaseBuilder } from '@builders/base-builder';

export class AttachPaymentMethodBuilder extends BaseBuilder<AttachPaymentMethodRequest> {
  protected schema = AttachPaymentMethodRequestSchema;

  protected get defaultBody(): AttachPaymentMethodRequest {
    return {
      customer: '',
      customer_account: undefined,
    };
  }

  withCustomer(customerId: string): this {
    return this.with('customer', customerId);
  }

  withCustomerAccount(customerAccountId: string): this {
    return this.with('customer_account', customerAccountId);
  }
}
