import { z } from 'zod';

export const TaxLocationSchema = z.object({
  country: z.string().optional(),
  state: z.string().optional(),
  source: z.string().optional(),
});

export type TaxLocation = z.infer<typeof TaxLocationSchema>;
