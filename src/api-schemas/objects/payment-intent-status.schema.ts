import { z } from 'zod';
import { PaymentIntentStatusEnum } from '@constants/enums';

export const PaymentIntentStatusSchema = z.enum(PaymentIntentStatusEnum);

export type PaymentIntentStatus = z.infer<typeof PaymentIntentStatusSchema>;
