import { z } from 'zod';
import { CustomFieldSchema } from '@api-schemas/objects/custom-field.schema.js';
import { RenderingOptionsSchema } from '@api-schemas/objects/rendering-options.schema.js';

export const InvoiceSettingsSchema = z.object({
  custom_fields: z.array(CustomFieldSchema).nullable().optional(),
  default_payment_method: z.string().nullable().optional(),
  footer: z.string().nullable().optional(),
  rendering_options: RenderingOptionsSchema.nullable().optional(),
});

export type InvoiceSettings = z.infer<typeof InvoiceSettingsSchema>;
