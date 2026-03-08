import { APIResponse, test } from '@playwright/test';

/**
 * Attach request and response details to the test report.
 */
export async function attachApiCallDetails(
  method: string,
  url: string,
  response: APIResponse,
  requestBody: unknown,
  responseBody: unknown,
  queryParams?: Record<string, string>,
): Promise<void> {
  const status = response.status();

  const apiCallDetails = {
    request: {
      method,
      url,
      queryParams: queryParams || null,
      body: requestBody || null,
    },
    response: {
      status,
      body: responseBody,
    },
  };

  await test.info().attach(`${method} ${url} (${status})`, {
    body: JSON.stringify(apiCallDetails, null, 2),
    contentType: 'application/json',
  });
}
