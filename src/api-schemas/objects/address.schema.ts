import { z } from 'zod';

export const AddressSchema = z.object({
  city: z.string().nullable().optional(),
  country: z.string().nullable().optional(),
  line1: z.string().nullable().optional(),
  line2: z.string().nullable().optional(),
  postal_code: z.string().nullable().optional(),
  state: z.string().nullable().optional(),
});

export type Address = z.infer<typeof AddressSchema>;
