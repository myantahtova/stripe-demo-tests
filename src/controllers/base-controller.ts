import { APIRequestContext, APIResponse } from '@playwright/test';
import { attachApiCallDetails } from '@helpers/api-logger';
import qs from 'qs';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export abstract class BaseController<TController, TAsserter> {
  protected request: APIRequestContext;
  protected lastResponse: APIResponse | null = null;
  protected responseBody: unknown = null;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  protected buildUrl(path: string): string {
    const base = process.env.BASE_URL;
    return `${base}${path}`;
  }

  private async executeRequest(
    method: HttpMethod,
    path: string,
    options?: { data?: object; params?: Record<string, string> },
  ): Promise<TController> {
    const url = this.buildUrl(path);
    const { data, params } = options ?? {};

    const formOptions = data
      ? {
          data: qs.stringify(data),
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        }
      : undefined;

    switch (method) {
      case 'GET':
        this.lastResponse = await this.request.get(url, { params });
        break;
      case 'POST':
        this.lastResponse = await this.request.post(url, formOptions);
        break;
      case 'PUT':
        this.lastResponse = await this.request.put(url, formOptions);
        break;
      case 'DELETE':
        this.lastResponse = await this.request.delete(url);
        break;
    }

    await this.parseResponseBody();
    await attachApiCallDetails(method, url, this.lastResponse, data, params);

    return this as unknown as TController;
  }

  async get(path: string, params?: Record<string, string>): Promise<TController> {
    return this.executeRequest('GET', path, { params });
  }

  async post(path: string, data?: object): Promise<TController> {
    return this.executeRequest('POST', path, { data });
  }

  async put(path: string, data?: object): Promise<TController> {
    return this.executeRequest('PUT', path, { data });
  }

  async delete(path: string): Promise<TController> {
    return this.executeRequest('DELETE', path);
  }

  protected async parseResponseBody(): Promise<void> {
    try {
      this.responseBody = await this.lastResponse?.json();
    } catch {
      this.responseBody = null;
    }
  }

  getResponse(): APIResponse | null {
    return this.lastResponse;
  }

  getResponseBody<T>(): T {
    return this.responseBody as T;
  }

  getStatus(): number | undefined {
    return this.lastResponse?.status();
  }

  abstract assertThat(): TAsserter;
}
