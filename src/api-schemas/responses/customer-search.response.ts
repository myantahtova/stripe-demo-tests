import { z } from 'zod';
import { CustomerResponseSchema } from '@api-schemas/responses/customer.response.js';

export const CustomerSearchResponseSchema = z.object({
  object: z.literal('search_result'),
  url: z.string(),
  has_more: z.boolean(),
  data: z.array(CustomerResponseSchema),
  next_page: z.string().optional(),
  total_count: z.number().optional(),
});

export type CustomerSearchResponse = z.infer<typeof CustomerSearchResponseSchema>;
