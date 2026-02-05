import { z } from 'zod';
import { AddressSchema } from '@api-schemas/objects/address.schema.js';
import { ShippingSchema } from '@api-schemas/objects/shipping.schema.js';
import { InvoiceSettingsSchema } from '@api-schemas/objects/invoice-settings.schema.js';
import { CustomerTaxSchema } from '@api-schemas/objects/customer-tax.schema.js';
import { TaxExemptSchema } from '@api-schemas/objects/tax-exempt.schema.js';

export const UpdateCustomerRequestSchema = z.object({
  address: AddressSchema.optional(),
  balance: z.number().optional(),
  description: z.string().optional(),
  email: z.string().optional(),
  metadata: z.record(z.string(), z.string()).optional(),
  name: z.string().optional(),
  phone: z.string().optional(),
  shipping: ShippingSchema.optional(),
  tax: CustomerTaxSchema.optional(),
  tax_exempt: TaxExemptSchema.optional(),
  default_source: z.string().optional(),
  invoice_prefix: z.string().optional(),
  invoice_settings: InvoiceSettingsSchema.partial().optional(),
  next_invoice_sequence: z.number().optional(),
  preferred_locales: z.array(z.string()).optional(),
  source: z.string().optional(),
});

export type UpdateCustomerRequest = z.infer<typeof UpdateCustomerRequestSchema>;
