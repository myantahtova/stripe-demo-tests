import { z } from 'zod';
import { BillingDetailsSchema } from '@api-schemas/objects/billing-details.schema';
import { CardSchema } from '@api-schemas/objects/card.schema';

export const PaymentMethodResponseSchema = z.object({
  id: z.string(),
  object: z.literal('payment_method'),
  billing_details: BillingDetailsSchema.optional(),
  card: CardSchema.nullable().optional(),
  created: z.number().optional(),
  customer: z.string().nullable().optional(),
  livemode: z.boolean().optional(),
  metadata: z.record(z.string(), z.string()).optional(),
  type: z.string().optional(),
});

export type PaymentMethodResponse = z.infer<typeof PaymentMethodResponseSchema>;
