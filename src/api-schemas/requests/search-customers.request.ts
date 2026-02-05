import { z } from 'zod';

export const SearchCustomersRequestSchema = z.object({
  query: z.string(),
  limit: z.number().optional(),
  page: z.string().optional(),
});

export type SearchCustomersRequest = z.infer<typeof SearchCustomersRequestSchema>;
