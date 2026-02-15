import { expect } from '@playwright/test';
import _ from 'lodash';
import { type ZodObject, type ZodRawShape, type ZodTypeAny } from 'zod';

type Path = string | number | Array<string | number>;

/**
 * Generic builder for API payloads. Keeps a working copy of data and lets you
 * add/remove/override fields.
 *
 * `with()` validates the payload against the schema (strict mode for ZodObject).
 * Use `withInvalid()` for negative tests.
 */
export abstract class BaseBuilder<T extends object> {
  /**
   * Provide a full, valid default object in subclasses.
   * Use a getter to ensure fresh data is generated on each access.
   */
  protected abstract get defaultBody(): T;

  /**
   * Provide the Zod schema for the payload type in subclasses.
   */
  protected abstract schema: ZodTypeAny;

  protected workingCopy: Partial<T> = {};

  private isZodObject(): boolean {
    return 'shape' in this.schema && typeof this.schema.shape === 'object';
  }

  private getRequiredKeys(): (keyof T)[] {
    if (!this.isZodObject()) {
      return [];
    }
    const shape = (this.schema as ZodObject<ZodRawShape>).shape;
    return Object.keys(shape).filter((key) => {
      const fieldSchema = shape[key];
      return !this.isOptional(fieldSchema);
    }) as (keyof T)[];
  }

  private isOptional(schema: unknown): boolean {
    const maybe = schema as { isOptional?: () => boolean };
    return typeof maybe.isOptional === 'function' ? maybe.isOptional() : false;
  }

  /**
   * Start with every field from the model's full object.
   */
  withDefaultFields(): this {
    this.workingCopy = _.cloneDeep(this.defaultBody);
    return this;
  }

  /**
   * Start with only the required keys populated from the model.
   */
  withRequiredFields(): this {
    this.workingCopy = _.pick(this.defaultBody, this.getRequiredKeys()) as Partial<T>;
    return this;
  }

  /**
   * Set or override a property. Validates the entire payload (strict mode for ZodObject).
   */
  with<K extends keyof T>(key: K, value: T[K]): this {
    const previous = _.cloneDeep(this.workingCopy);
    _.set(this.workingCopy as Record<string, unknown>, key as string, value);

    const schemaToValidate = this.isZodObject()
      ? (this.schema as ZodObject<ZodRawShape>).strict().partial()
      : this.schema;

    const result = schemaToValidate.safeParse(this.workingCopy);
    if (!result.success) {
      this.workingCopy = previous;
      const messages = result.error.issues.map((i) => i.message).join('; ');
      expect(result.success, `Invalid: ${messages}`).toBe(true);
    }
    return this;
  }

  /**
   * Set or override a property without validation (useful for negative tests).
   */
  withInvalid(path: Path, value: unknown): this {
    _.set(this.workingCopy as Record<string, unknown>, path, value);
    return this;
  }

  /**
   * Remove a property from the payload.
   */
  without(path: Path): this {
    _.unset(this.workingCopy as Record<string, unknown>, path);
    return this;
  }

  /**
   * Return a fresh copy of the built object.
   */
  build(): T {
    return _.cloneDeep(this.workingCopy as T);
  }
}
