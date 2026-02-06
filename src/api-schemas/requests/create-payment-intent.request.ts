import { z } from 'zod';
import { BillingDetailsSchema } from '@api-schemas/objects/billing-details.schema';
import { SetupFutureUsageSchema } from '@api-schemas/objects/setup-future-usage.schema';
import { ShippingSchema } from '@api-schemas/objects/shipping.schema';

export const CreatePaymentIntentRequestSchema = z.object({
  amount: z.number(),
  currency: z.string(),
  automatic_payment_methods: z
    .object({
      enabled: z.boolean().optional(),
      allow_redirects: z.enum(['always', 'never']).optional(),
    })
    .optional(),
  confirm: z.boolean().optional(),
  customer: z.string().optional(),
  customer_account: z.string().optional(),
  description: z.string().optional(),
  mandate_data: z
    .object({
      customer_acceptance: z
        .object({
          type: z.enum(['online', 'offline']),
          online: z
            .object({
              ip_address: z.string(),
              user_agent: z.string(),
            })
            .optional(),
        })
        .optional(),
    })
    .optional(),
  metadata: z.record(z.string(), z.string()).optional(),
  off_session: z.union([z.boolean(), z.literal('true')]).optional(),
  payment_method: z.string().optional(),
  payment_method_data: z
    .object({
      type: z.string(),
      billing_details: BillingDetailsSchema.optional(),
      sepa_debit: z
        .object({
          iban: z.string(),
        })
        .optional(),
    })
    .optional(),
  payment_method_types: z.array(z.string()).optional(),
  receipt_email: z.string().optional(),
  setup_future_usage: SetupFutureUsageSchema.optional(),
  shipping: ShippingSchema.optional(),
  statement_descriptor: z.string().optional(),
  statement_descriptor_suffix: z.string().optional(),
});

export type CreatePaymentIntentRequest = z.infer<typeof CreatePaymentIntentRequestSchema>;
