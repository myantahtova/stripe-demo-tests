import { z } from 'zod';
import { PaymentIntentStatusSchema } from '@api-schemas/objects/payment-intent-status.schema';
import { SetupFutureUsageSchema } from '@api-schemas/objects/setup-future-usage.schema';
import { ShippingSchema } from '@api-schemas/objects/shipping.schema';

export const PaymentIntentResponseSchema = z.object({
  id: z.string(),
  object: z.literal('payment_intent'),
  amount: z.number(),
  amount_capturable: z.number().optional(),
  amount_received: z.number().optional(),
  client_secret: z.string().nullable().optional(),
  currency: z.string(),
  customer: z.string().nullable().optional(),
  customer_account: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  last_payment_error: z.unknown().nullable().optional(),
  latest_charge: z.string().nullable().optional(),
  livemode: z.boolean().optional(),
  metadata: z.record(z.string(), z.string()).optional(),
  payment_method: z.string().nullable().optional(),
  receipt_email: z.string().nullable().optional(),
  setup_future_usage: SetupFutureUsageSchema.nullable().optional(),
  shipping: ShippingSchema.nullable().optional(),
  statement_descriptor: z.string().nullable().optional(),
  statement_descriptor_suffix: z.string().nullable().optional(),
  status: PaymentIntentStatusSchema,
  created: z.number().optional(),
  canceled_at: z.number().nullable().optional(),
  cancellation_reason: z.string().nullable().optional(),
});

export type PaymentIntentResponse = z.infer<typeof PaymentIntentResponseSchema>;
