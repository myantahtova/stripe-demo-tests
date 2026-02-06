import { z } from 'zod';
import { SetupFutureUsageSchema } from '@api-schemas/objects/setup-future-usage.schema';
import { ShippingSchema } from '@api-schemas/objects/shipping.schema';

export const CreatePaymentIntentRequestSchema = z.object({
  amount: z.number(),
  currency: z.string(),
  customer: z.string().optional(),
  customer_account: z.string().optional(),
  description: z.string().optional(),
  metadata: z.record(z.string(), z.string()).optional(),
  payment_method: z.string().optional(),
  receipt_email: z.string().optional(),
  setup_future_usage: SetupFutureUsageSchema.optional(),
  shipping: ShippingSchema.optional(),
  statement_descriptor: z.string().optional(),
  statement_descriptor_suffix: z.string().optional(),
});

export type CreatePaymentIntentRequest = z.infer<typeof CreatePaymentIntentRequestSchema>;
