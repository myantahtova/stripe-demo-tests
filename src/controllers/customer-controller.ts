import { APIRequestContext } from '@playwright/test';
import { CreateCustomerRequest } from '@api-schemas/requests/create-customer.request';
import { UpdateCustomerRequest } from '@api-schemas/requests/update-customer.request';
import {
  CustomerListResponse,
  CustomerListResponseSchema,
} from '@api-schemas/responses/customer-list.response';
import { CustomerResponse, CustomerResponseSchema } from '@api-schemas/responses/customer.response';
import { DeletedCustomerResponseSchema } from '@api-schemas/responses/deleted-customer.response';
import { CustomerAsserter } from '@asserters/customer-asserter';
import { BaseController } from '@controllers/base-controller';

const CUSTOMERS_PATH = '/v1/customers';

export class CustomerController extends BaseController<CustomerController, CustomerAsserter> {
  private createdIds: string[] = [];

  constructor(request: APIRequestContext) {
    super(request);
  }

  async createCustomer(data?: CreateCustomerRequest): Promise<CustomerController> {
    await this.post(CUSTOMERS_PATH, data, CustomerResponseSchema);

    if (!this.isError()) {
      this.createdIds.push(this.getCustomerId());
    }

    return this;
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

  async deleteCreatedCustomers(): Promise<void> {
    const idsToDelete = [...this.createdIds];

    for (const customerId of idsToDelete) {
      await this.deleteCustomer(customerId);

      const status = this.getStatus();
      if (status === 404) {
        continue;
      }

      if (this.isError()) {
        throw new Error(`Failed to clean up customer ${customerId}. Status: ${status}`);
      }
    }

    this.createdIds = [];
  }

  getCustomer(): CustomerResponse {
    return this.getResponseBody<CustomerResponse>();
  }

  getCustomerList(): CustomerListResponse {
    return this.getResponseBody<CustomerListResponse>();
  }

  getCustomerId(): string {
    return this.getCustomer().id;
  }

  assertThat(): CustomerAsserter {
    return new CustomerAsserter(this);
  }
}
