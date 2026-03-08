import { APIRequestContext, APIResponse } from '@playwright/test';
import qs from 'qs';
import { ZodSchema } from 'zod';
import { ErrorResponse, ErrorResponseSchema } from '@api-schemas/responses/error.response';
import { attachApiCallDetails } from '@helpers/api-logger';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export abstract class BaseController<TController, TAsserter> {
  protected request: APIRequestContext;
  protected lastResponse: APIResponse | null = null;
  protected responseBody: unknown = null;
  protected errorResponse: ErrorResponse | null = null;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  private async executeRequest(
    method: HttpMethod,
    path: string,
    options?: {
      data?: object;
      params?: Record<string, string>;
      successResponseSchema?: ZodSchema;
    },
  ): Promise<TController> {
    const { data, params, successResponseSchema } = options ?? {};

    const formOptions = data
      ? {
        data: qs.stringify(data),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      }
      : undefined;

    switch (method) {
      case 'GET':
        this.lastResponse = await this.request.get(path, { params });
        break;
      case 'POST':
        this.lastResponse = await this.request.post(path, formOptions);
        break;
      case 'PUT':
        this.lastResponse = await this.request.put(path, formOptions);
        break;
      case 'DELETE':
        this.lastResponse = await this.request.delete(path);
        break;
    }

    try {
      await this.parseResponseBody(successResponseSchema);
    } finally {
      await attachApiCallDetails(method, path, this.lastResponse, data, this.responseBody, params);
    }

    return this as unknown as TController;
  }

  async get(
    path: string,
    params?: Record<string, string>,
    successResponseSchema?: ZodSchema,
  ): Promise<TController> {
    return this.executeRequest('GET', path, { params, successResponseSchema });
  }

  async post(
    path: string,
    data?: object,
    successResponseSchema?: ZodSchema,
  ): Promise<TController> {
    return this.executeRequest('POST', path, { data, successResponseSchema });
  }

  async put(path: string, data?: object, successResponseSchema?: ZodSchema): Promise<TController> {
    return this.executeRequest('PUT', path, { data, successResponseSchema });
  }

  async delete(path: string, successResponseSchema?: ZodSchema): Promise<TController> {
    return this.executeRequest('DELETE', path, { successResponseSchema });
  }

  protected async parseResponseBody(successResponseSchema?: ZodSchema): Promise<void> {
    try {
      this.responseBody = await this.lastResponse?.json();
    } catch {
      this.responseBody = null;
      this.errorResponse = null;
      return;
    }

    this.checkForErrorResponse();

    if (successResponseSchema && !this.isError()) {
      this.validateSuccessResponse(successResponseSchema);
    }
  }

  private checkForErrorResponse(): void {
    const status = this.lastResponse?.status();
    const isErrorStatus = status && status >= 400;

    if (!isErrorStatus) {
      this.errorResponse = null;
      return;
    }

    this.errorResponse = ErrorResponseSchema.parse(this.responseBody);
  }

  private validateSuccessResponse(successResponseSchema: ZodSchema): void {
    this.responseBody = successResponseSchema.parse(this.responseBody);
  }

  getResponse(): APIResponse | null {
    return this.lastResponse;
  }

  getResponseBody<T>(): T {
    return this.responseBody as T;
  }

  getErrorResponse(): ErrorResponse | null {
    return this.errorResponse;
  }

  isError(): boolean {
    return this.errorResponse !== null;
  }

  getStatus(): number | undefined {
    return this.lastResponse?.status();
  }

  abstract assertThat(): TAsserter;
}
