export enum StripeErrorsEnum {
  API_ERROR = 'api_error',
  CARD_ERROR = 'card_error',
  IDEMPOTENCY_ERROR = 'idempotency_error',
  INVALID_REQUEST_ERROR = 'invalid_request_error',
}

export enum PaymentIntentStatusEnum {
  CANCELED = 'canceled',
  PROCESSING = 'processing',
  REQUIRES_ACTION = 'requires_action',
  REQUIRES_CAPTURE = 'requires_capture',
  REQUIRES_CONFIRMATION = 'requires_confirmation',
  REQUIRES_PAYMENT_METHOD = 'requires_payment_method',
  SUCCEEDED = 'succeeded',
}

export enum ChargeStatusEnum {
  SUCCEEDED = 'succeeded',
  PENDING = 'pending',
  FAILED = 'failed',
}
