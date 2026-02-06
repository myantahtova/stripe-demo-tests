import { z } from 'zod';

// Nested objects (checks, networks, three_d_secure_usage) are kept inline
// as they are card-specific and not reusable across other schemas
export const CardSchema = z.object({
  brand: z.string().optional(),
  checks: z
    .object({
      address_line1_check: z.string().nullable().optional(),
      address_postal_code_check: z.string().nullable().optional(),
      cvc_check: z.string().nullable().optional(),
    })
    .nullable()
    .optional(),
  country: z.string().optional(),
  exp_month: z.number().optional(),
  exp_year: z.number().optional(),
  fingerprint: z.string().optional(),
  funding: z.string().optional(),
  generated_from: z.unknown().nullable().optional(),
  last4: z.string().optional(),
  networks: z
    .object({
      available: z.array(z.string()).optional(),
      preferred: z.string().nullable().optional(),
    })
    .optional(),
  three_d_secure_usage: z
    .object({
      supported: z.boolean().optional(),
    })
    .optional(),
  wallet: z.unknown().nullable().optional(),
});

export type Card = z.infer<typeof CardSchema>;
