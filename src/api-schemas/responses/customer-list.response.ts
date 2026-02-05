import { z } from 'zod';
import { CustomerResponseSchema } from '@api-schemas/responses/customer.response.js';

export const CustomerListResponseSchema = z.object({
  object: z.literal('list'),
  url: z.string(),
  has_more: z.boolean(),
  data: z.array(CustomerResponseSchema),
});

export type CustomerListResponse = z.infer<typeof CustomerListResponseSchema>;
