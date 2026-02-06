import { APIRequestContext } from '@playwright/test';
import { CreateCustomerRequest } from '@api-schemas/requests/create-customer.request';
import { UpdateCustomerRequest } from '@api-schemas/requests/update-customer.request';
import {
  CustomerListResponse,
  CustomerListResponseSchema,
} from '@api-schemas/responses/customer-list.response';
import { CustomerSearchResponse } from '@api-schemas/responses/customer-search.response';
import { CustomerResponse, CustomerResponseSchema } from '@api-schemas/responses/customer.response';
import { DeletedCustomerResponseSchema } from '@api-schemas/responses/deleted-customer.response';
import { CustomerAsserter } from '@asserters/customer-asserter';
import { BaseController } from '@controllers/base-controller';

const CUSTOMERS_PATH = '/v1/customers';

export class CustomerController extends BaseController<CustomerController, CustomerAsserter> {
  constructor(request: APIRequestContext) {
    super(request);
  }

  async createCustomer(data?: CreateCustomerRequest): Promise<CustomerController> {
    return this.post(CUSTOMERS_PATH, data, CustomerResponseSchema);
  }

  async retrieveCustomer(customerId: string): Promise<CustomerController> {
    return this.get(`${CUSTOMERS_PATH}/${customerId}`, undefined, CustomerResponseSchema);
  }

  async updateCustomer(
    customerId: string,
    data?: UpdateCustomerRequest,
  ): Promise<CustomerController> {
    return this.post(`${CUSTOMERS_PATH}/${customerId}`, data, CustomerResponseSchema);
  }

  async deleteCustomer(customerId: string): Promise<CustomerController> {
    return this.delete(`${CUSTOMERS_PATH}/${customerId}`, DeletedCustomerResponseSchema);
  }

  async listCustomers(params?: Record<string, string>): Promise<CustomerController> {
    return this.get(CUSTOMERS_PATH, params, CustomerListResponseSchema);
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
