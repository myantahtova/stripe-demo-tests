import { z } from 'zod';
import { DateRangeFilterSchema } from '@api-schemas/objects/date-range-filter.schema.js';

export const ListCustomersRequestSchema = z.object({
  email: z.string().optional(),
  limit: z.number().optional(),
  starting_after: z.string().optional(),
  ending_before: z.string().optional(),
  created: DateRangeFilterSchema.optional(),
  test_clock: z.string().optional(),
});

export type ListCustomersRequest = z.infer<typeof ListCustomersRequestSchema>;
