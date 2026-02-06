import { z } from 'zod';
import { StripeErrorsEnum } from '@constants/enums';

export const ErrorResponseSchema = z.object({
  error: z.object({
    type: z.enum(StripeErrorsEnum),
    code: z.string().optional(),
    message: z.string(),
    param: z.string().optional(),
    doc_url: z.string().optional(),
    request_log_url: z.string().optional(),
  }),
});

export type ErrorResponse = z.infer<typeof ErrorResponseSchema>;
