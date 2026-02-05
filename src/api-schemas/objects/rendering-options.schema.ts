import { z } from 'zod';

export const RenderingOptionsSchema = z.record(z.string(), z.unknown());

export type RenderingOptions = z.infer<typeof RenderingOptionsSchema>;
