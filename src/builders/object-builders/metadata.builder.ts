import { z } from 'zod';
import { BaseBuilder } from '@builders/base-builder';

export const MetadataSchema = z.record(z.string(), z.string());
export type Metadata = z.infer<typeof MetadataSchema>;

const defaultMetadata: Metadata = {
  source: 'automation',
  environment: 'test',
};

export class MetadataBuilder extends BaseBuilder<Metadata> {
  protected schema = MetadataSchema;
  protected defaultFullBody = defaultMetadata;

  withSource(source: string): this {
    return this.with('source', source);
  }

  withEnvironment(environment: string): this {
    return this.with('environment', environment);
  }
}
