import { expect } from '@playwright/test';
import { BaseController } from '@controllers/base-controller.js';

export class BaseAsserter<TController extends BaseController<unknown, unknown>> {
  protected controller: TController;

  constructor(controller: TController) {
    this.controller = controller;
  }

  statusIs(expectedStatus: number): this {
    expect(this.controller.getStatus()).toBe(expectedStatus);
    return this;
  }

  bodyPropertyEquals(propertyName: string, expectedValue: unknown): this {
    const body = this.controller.getResponseBody() as Record<string, unknown>;
    expect(body[propertyName]).toEqual(expectedValue);
    return this;
  }

  hasResponseBody(): this {
    expect(this.controller.getResponseBody()).toBeDefined();
    expect(this.controller.getResponseBody()).not.toBeNull();
    return this;
  }

  hasErrorType(
    expectedType: 'api_error' | 'card_error' | 'idempotency_error' | 'invalid_request_error',
  ): this {
    const body = this.controller.getResponseBody() as { error?: { type?: string } };
    expect(body?.error?.type).toBe(expectedType);
    return this;
  }

  hasErrorMessage(expectedMessage: string): this {
    const body = this.controller.getResponseBody() as { error?: { message?: string } };
    expect(body?.error?.message).toBe(expectedMessage);
    return this;
  }

  hasErrorMessageContaining(substring: string): this {
    const body = this.controller.getResponseBody() as { error?: { message?: string } };
    expect(body?.error?.message).toContain(substring);
    return this;
  }

  /** Returns the controller to chain another HTTP request */
  also(): TController {
    return this.controller;
  }
}
