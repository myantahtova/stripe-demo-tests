import { z } from 'zod';

export const CustomFieldSchema = z.object({
  name: z.string(),
  value: z.string(),
});

export type CustomField = z.infer<typeof CustomFieldSchema>;
