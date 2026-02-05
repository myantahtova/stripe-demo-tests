import { z } from 'zod';

export const TaxExemptSchema = z.enum(['none', 'exempt', 'reverse']);

export type TaxExempt = z.infer<typeof TaxExemptSchema>;
