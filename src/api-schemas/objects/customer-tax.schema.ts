import { z } from 'zod';
import { TaxLocationSchema } from '@api-schemas/objects/tax-location.schema';

export const CustomerTaxSchema = z.object({
  automatic_tax: z.string().optional(),
  ip_address: z.string().nullable().optional(),
  location: TaxLocationSchema.nullable().optional(),
});

export type CustomerTax = z.infer<typeof CustomerTaxSchema>;
