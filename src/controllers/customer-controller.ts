import { APIRequestContext } from '@playwright/test';
import { BaseController } from '@controllers/base-controller';
import { CustomerAsserter } from '@asserters/customer-asserter';
import { CreateCustomerRequest } from '@api-schemas/requests/create-customer.request';
import { UpdateCustomerRequest } from '@api-schemas/requests/update-customer.request';
import { CustomerResponse } from '@api-schemas/responses/customer.response';
import { CustomerListResponse } from '@api-schemas/responses/customer-list.response';
import { CustomerSearchResponse } from '@api-schemas/responses/customer-search.response';

const CUSTOMERS_PATH = '/v1/customers';

export class CustomerController extends BaseController<CustomerController, CustomerAsserter> {
  constructor(request: APIRequestContext) {
    super(request);
  }

  async createCustomer(data?: CreateCustomerRequest): Promise<CustomerController> {
    return this.post(CUSTOMERS_PATH, data);
  }

  async retrieveCustomer(customerId: string): Promise<CustomerController> {
    return this.get(`${CUSTOMERS_PATH}/${customerId}`);
  }

  async updateCustomer(
    customerId: string,
    data?: UpdateCustomerRequest,
  ): Promise<CustomerController> {
    return this.post(`${CUSTOMERS_PATH}/${customerId}`, data);
  }

  async deleteCustomer(customerId: string): Promise<CustomerController> {
    return this.delete(`${CUSTOMERS_PATH}/${customerId}`);
  }

  async listCustomers(params?: Record<string, string>): Promise<CustomerController> {
    return this.get(CUSTOMERS_PATH, params);
  }

  async searchCustomers(params: Record<string, string>): Promise<CustomerController> {
    return this.get(`${CUSTOMERS_PATH}/search`, params);
  }

  getCustomer(): CustomerResponse {
    return this.getResponseBody<CustomerResponse>();
  }

  getCustomerList(): CustomerListResponse {
    return this.getResponseBody<CustomerListResponse>();
  }

  getSearchResult(): CustomerSearchResponse {
    return this.getResponseBody<CustomerSearchResponse>();
  }

  getCustomerId(): string {
    return this.getCustomer().id;
  }

  assertThat(): CustomerAsserter {
    return new CustomerAsserter(this);
  }
}
