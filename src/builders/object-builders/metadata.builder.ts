import { z } from 'zod';
import { BaseBuilder } from '@builders/base-builder';

export const MetadataSchema = z.record(z.string(), z.string());
export type Metadata = z.infer<typeof MetadataSchema>;

export class MetadataBuilder extends BaseBuilder<Metadata> {
  protected schema = MetadataSchema;

  protected get defaultFullBody(): Metadata {
    return {
      source: 'automation',
      environment: 'test',
    };
  }

  withSource(source: string): this {
    return this.with('source', source);
  }

  withEnvironment(environment: string): this {
    return this.with('environment', environment);
  }
}
