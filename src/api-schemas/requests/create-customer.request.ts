import { z } from 'zod';
import { AddressSchema } from '@api-schemas/objects/address.schema';
import { CustomerTaxSchema } from '@api-schemas/objects/customer-tax.schema';
import { InvoiceSettingsSchema } from '@api-schemas/objects/invoice-settings.schema';
import { ShippingSchema } from '@api-schemas/objects/shipping.schema';
import { TaxExemptSchema } from '@api-schemas/objects/tax-exempt.schema';

export const CreateCustomerRequestSchema = z.object({
  address: AddressSchema.optional(),
  balance: z.number().optional(),
  description: z.string().optional(),
  email: z.string().optional(),
  metadata: z.record(z.string(), z.string()).optional(),
  name: z.string().optional(),
  payment_method: z.string().optional(),
  phone: z.string().optional(),
  shipping: ShippingSchema.optional(),
  tax: CustomerTaxSchema.optional(),
  tax_exempt: TaxExemptSchema.optional(),
  invoice_prefix: z.string().optional(),
  invoice_settings: InvoiceSettingsSchema.partial().optional(),
  next_invoice_sequence: z.number().optional(),
  preferred_locales: z.array(z.string()).optional(),
  source: z.string().optional(),
  test_clock: z.string().optional(),
});

export type CreateCustomerRequest = z.infer<typeof CreateCustomerRequestSchema>;
