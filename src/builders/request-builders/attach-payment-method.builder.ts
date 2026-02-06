import {
  AttachPaymentMethodRequest,
  AttachPaymentMethodRequestSchema,
} from '@api-schemas/requests/attach-payment-method.request';
import { BaseBuilder } from '@builders/base-builder';

const defaultAttachPaymentMethodRequest: AttachPaymentMethodRequest = {
  customer: '',
  customer_account: undefined,
};

export class AttachPaymentMethodBuilder extends BaseBuilder<AttachPaymentMethodRequest> {
  protected schema = AttachPaymentMethodRequestSchema;
  protected defaultFullBody = defaultAttachPaymentMethodRequest;

  withCustomer(customerId: string): this {
    return this.with('customer', customerId);
  }

  withCustomerAccount(customerAccountId: string): this {
    return this.with('customer_account', customerAccountId);
  }
}
