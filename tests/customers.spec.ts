import { test } from '../src/fixtures/api-fixtures.js';
import { CustomerBuilder } from '@builders/request-builders/customer-request.builder.js';

test.describe('Stripe API - Customers', () => {
  test('should create and delete a customer', async ({ customerController }) => {
    const email = `test.customer.${Date.now()}@example.com`;
    const name = 'Test Customer';

    const customerData = new CustomerBuilder()
      .withAllFields()
      .withEmail(email)
      .withName(name)
      .build();

    (await customerController.createCustomer(customerData))
      .assertThat()
      .statusIs(200)
      .hasId()
      .hasEmail(email)
      .hasName(name);

    const customerId = customerController.getCustomerId();
    (await customerController.deleteCustomer(customerId)).assertThat().statusIs(200).isDeleted();
  });
});
