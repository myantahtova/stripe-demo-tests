import { z } from 'zod';
import { AddressSchema } from '@api-schemas/objects/address.schema';
import { ShippingSchema } from '@api-schemas/objects/shipping.schema';
import { InvoiceSettingsSchema } from '@api-schemas/objects/invoice-settings.schema';
import { CustomerTaxSchema } from '@api-schemas/objects/customer-tax.schema';
import { TaxExemptSchema } from '@api-schemas/objects/tax-exempt.schema';

export const CustomerResponseSchema = z.object({
  id: z.string(),
  object: z.literal('customer'),
  address: AddressSchema.nullable().optional(),
  balance: z.number().optional(),
  created: z.number().optional(),
  currency: z.string().nullable().optional(),
  default_source: z.string().nullable().optional(),
  delinquent: z.boolean().nullable().optional(),
  description: z.string().nullable().optional(),
  email: z.string().nullable().optional(),
  invoice_prefix: z.string().nullable().optional(),
  invoice_settings: InvoiceSettingsSchema.optional(),
  livemode: z.boolean().optional(),
  metadata: z.record(z.string(), z.string()).optional(),
  name: z.string().nullable().optional(),
  next_invoice_sequence: z.number().nullable().optional(),
  phone: z.string().nullable().optional(),
  preferred_locales: z.array(z.string()).nullable().optional(),
  shipping: ShippingSchema.nullable().optional(),
  tax: CustomerTaxSchema.optional(),
  tax_exempt: TaxExemptSchema.nullable().optional(),
  test_clock: z.string().nullable().optional(),
});

export type CustomerResponse = z.infer<typeof CustomerResponseSchema>;
