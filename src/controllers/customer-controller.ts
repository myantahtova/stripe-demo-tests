import { APIRequestContext } from '@playwright/test';
import { BaseController } from '@controllers/base-controller.js';
import { CustomerAsserter } from '@asserters/customer-asserter.js';
import { CreateCustomerRequest } from '@api-schemas/requests/create-customer.request.js';
import { UpdateCustomerRequest } from '@api-schemas/requests/update-customer.request.js';
import { CustomerResponse } from '@api-schemas/responses/customer.response.js';
import { CustomerListResponse } from '@api-schemas/responses/customer-list.response.js';
import { CustomerSearchResponse } from '@api-schemas/responses/customer-search.response.js';

const CUSTOMERS_PATH = '/v1/customers';

export class CustomerController extends BaseController<CustomerController, CustomerAsserter> {
  constructor(request: APIRequestContext) {
    super(request);
  }

  /**
   * Create a new customer
   * POST /v1/customers
   */
  async createCustomer(params?: CreateCustomerRequest): Promise<CustomerController> {
    return this.post(CUSTOMERS_PATH, params);
  }

  /**
   * Retrieve a customer by ID
   * GET /v1/customers/:id
   */
  async retrieveCustomer(customerId: string): Promise<CustomerController> {
    return this.get(`${CUSTOMERS_PATH}/${customerId}`);
  }

  /**
   * Update a customer
   * POST /v1/customers/:id
   */
  async updateCustomer(
    customerId: string,
    params?: UpdateCustomerRequest,
  ): Promise<CustomerController> {
    return this.post(`${CUSTOMERS_PATH}/${customerId}`, params);
  }

  /**
   * Delete a customer
   * DELETE /v1/customers/:id
   */
  async deleteCustomer(customerId: string): Promise<CustomerController> {
    return this.delete(`${CUSTOMERS_PATH}/${customerId}`);
  }

  /**
   * List all customers
   * GET /v1/customers
   */
  async listCustomers(params?: Record<string, string>): Promise<CustomerController> {
    return this.get(CUSTOMERS_PATH, params);
  }

  /**
   * Search customers
   * GET /v1/customers/search
   */
  async searchCustomers(params: Record<string, string>): Promise<CustomerController> {
    return this.get(`${CUSTOMERS_PATH}/search`, params);
  }

  /**
   * Get the response body typed as CustomerResponse
   */
  getCustomer(): CustomerResponse {
    return this.getResponseBody() as CustomerResponse;
  }

  /**
   * Get the response body typed as CustomerListResponse
   */
  getCustomerList(): CustomerListResponse {
    return this.getResponseBody() as CustomerListResponse;
  }

  /**
   * Get the response body typed as CustomerSearchResponse
   */
  getSearchResult(): CustomerSearchResponse {
    return this.getResponseBody() as CustomerSearchResponse;
  }

  /**
   * Get the customer ID from the response
   */
  getCustomerId(): string {
    return this.getCustomer().id;
  }

  assertThat(): CustomerAsserter {
    return new CustomerAsserter(this);
  }
}
