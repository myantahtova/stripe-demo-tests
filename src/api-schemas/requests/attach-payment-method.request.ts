import { z } from 'zod';

export const AttachPaymentMethodRequestSchema = z.object({
  customer: z.string(),
  customer_account: z.string().optional(),
});

export type AttachPaymentMethodRequest = z.infer<typeof AttachPaymentMethodRequestSchema>;
