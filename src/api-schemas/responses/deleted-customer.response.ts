import { z } from 'zod';

export const DeletedCustomerResponseSchema = z.object({
  id: z.string(),
  object: z.literal('customer'),
  deleted: z.literal(true),
});

export type DeletedCustomerResponse = z.infer<typeof DeletedCustomerResponseSchema>;
