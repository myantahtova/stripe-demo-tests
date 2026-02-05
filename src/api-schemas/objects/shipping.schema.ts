import { z } from 'zod';
import { AddressSchema } from '@api-schemas/objects/address.schema';

export const ShippingSchema = z.object({
  address: AddressSchema.optional(),
  name: z.string().optional(),
  phone: z.string().optional(),
});

export type Shipping = z.infer<typeof ShippingSchema>;
