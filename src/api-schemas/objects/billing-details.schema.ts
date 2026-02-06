import { z } from 'zod';
import { AddressSchema } from '@api-schemas/objects/address.schema';

export const BillingDetailsSchema = z.object({
  address: AddressSchema.nullable().optional(),
  email: z.string().nullable().optional(),
  name: z.string().nullable().optional(),
  phone: z.string().nullable().optional(),
});

export type BillingDetails = z.infer<typeof BillingDetailsSchema>;
