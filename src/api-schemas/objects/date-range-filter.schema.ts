import { z } from 'zod';

export const DateRangeFilterSchema = z.object({
  gt: z.number().optional(),
  gte: z.number().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
});

export type DateRangeFilter = z.infer<typeof DateRangeFilterSchema>;
