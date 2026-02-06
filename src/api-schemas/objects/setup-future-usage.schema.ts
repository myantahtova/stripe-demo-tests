import { z } from 'zod';

export const SetupFutureUsageSchema = z.enum(['off_session', 'on_session']);

export type SetupFutureUsage = z.infer<typeof SetupFutureUsageSchema>;
