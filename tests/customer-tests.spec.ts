import { CustomerBuilder } from '@builders/request-builders/customer-request.builder';
import {
  invalidDescriptionDataSet,
  invalidEmailDataSet,
  invalidMetadataDataSet,
  invalidNameDataSet,
} from '@constants/invalid-data-sets';
import { test } from '@fixtures/api-fixtures.js';

test.describe('Stripe API - Customers - Positive Tests', () => {
  let createdCustomerIds: string[] = [];

  test.afterEach(async ({ customerController }) => {
    for (const customerId of createdCustomerIds) {
      await customerController.deleteCustomer(customerId);
    }
    createdCustomerIds = [];
  });

  test('should create a customer with all fields', async ({ customerController }) => {
    const email = `test.${Date.now()}@example.com`;
    const name = 'Test Customer';

    const customerData = new CustomerBuilder()
      .withAllFields()
      .withEmail(email)
      .withName(name)
      .build();

    (await customerController
      .createCustomer(customerData))
      .assertThat()
      .statusIs(200)
      .hasId()
      .hasEmail(email)
      .hasName(name);

    createdCustomerIds.push(customerController.getCustomerId());
  });

  test('should create a customer only with required fields', async ({ customerController }) => {
    const customerData = new CustomerBuilder()
      .withRequiredFields()
      .build();

    (await customerController
      .createCustomer(customerData))
      .assertThat()
      .statusIs(200)
      .hasId();

    createdCustomerIds.push(customerController.getCustomerId());
  });

  test('should retrieve a customer by ID', async ({ customerController }) => {
    const email = `retrieve.${Date.now()}@example.com`;

    const customerData = new CustomerBuilder()
      .withEmail(email)
      .build();

    await customerController
      .createCustomer(customerData);

    const customerId = customerController.getCustomerId();
    createdCustomerIds.push(customerId);

    (await customerController
      .retrieveCustomer(customerId))
      .assertThat()
      .statusIs(200)
      .hasId()
      .hasEmail(email);
  });

  test('should update a customer', async ({ customerController }) => {
    const email = `update.${Date.now()}@example.com`;
    const customerData = new CustomerBuilder()
      .withEmail(email)
      .build();

    await customerController.createCustomer(customerData);
    const customerId = customerController.getCustomerId();
    createdCustomerIds.push(customerId);

    const updatedName = 'Updated Customer Name';
    const updatedDescription = 'Updated description';
    const updateData = new CustomerBuilder()
      .withName(updatedName)
      .withDescription(updatedDescription)
      .build();

    (await customerController
      .updateCustomer(customerId, updateData))
      .assertThat()
      .statusIs(200)
      .hasName(updatedName)
      .bodyPropertyEquals('description', updatedDescription);
  });

  test('should delete a customer', async ({ customerController }) => {
    const email = `delete.${Date.now()}@example.com`;
    const customerData = new CustomerBuilder()
      .withEmail(email)
      .build();

    await customerController.createCustomer(customerData);
    const customerId = customerController.getCustomerId();

    (await customerController
      .deleteCustomer(customerId))
      .assertThat()
      .statusIs(200)
      .isDeleted();
  });

  test('should list customers', async ({ customerController }) => {
    const email1 = `list1.${Date.now()}@example.com`;
    const email2 = `list2.${Date.now()}@example.com`;

    const customerData = new CustomerBuilder().withEmail(email1).build();

    await customerController.createCustomer(customerData);
    createdCustomerIds.push(customerController.getCustomerId());

    const customerData2 = new CustomerBuilder()
      .withEmail(email2)
      .build();

    await customerController.createCustomer(customerData2);
    createdCustomerIds.push(customerController.getCustomerId());

    (await customerController
      .listCustomers({ limit: '10' }))
      .assertThat()
      .statusIs(200)
      .bodyPropertyEquals('object', 'list')
      .hasResponseBody();
  });
});

test.describe('Stripe API - Customers - Negative Tests', () => {
  let createdCustomerIds: string[] = [];

  test.afterEach(async ({ customerController }) => {
    for (const customerId of createdCustomerIds) {
      await customerController.deleteCustomer(customerId);
    }
    createdCustomerIds = [];
  });

  test('should fail to create customer with invalid email', async ({ customerController }) => {
    const invalidEmail = 'invalid-email';

    const customerData = new CustomerBuilder()
      .withAllFields()
      .withInvalid('email', invalidEmail)
      .build();

    (await customerController
      .createCustomer(customerData))
      .assertThat()
      .statusIs(400)
      .hasErrorType('invalid_request_error')
      .hasErrorMessageContaining(`Invalid email address: invalid-email`);
  });

  test('should fail to retrieve non-existent customer', async ({ customerController }) => {
    const nonExistentId = 'cus_nonexistent123';

    (await customerController
      .retrieveCustomer(nonExistentId))
      .assertThat()
      .statusIs(404)
      .hasErrorType('invalid_request_error')
      .hasErrorMessageContaining('No such customer');
  });

  test('should fail to update non-existent customer', async ({ customerController }) => {
    const nonExistentId = 'cus_nonexistent123';
    const updateData = new CustomerBuilder()
      .withAllFields()
      .withName('Updated Name')
      .build();

    (await customerController
      .updateCustomer(nonExistentId, updateData))
      .assertThat()
      .statusIs(404)
      .hasErrorType('invalid_request_error')
      .hasErrorMessageContaining('No such customer');
  });

  test('should fail to delete non-existent customer', async ({ customerController }) => {
    const nonExistentId = 'cus_nonexistent123';

    (await customerController.deleteCustomer(nonExistentId))
      .assertThat()
      .statusIs(404)
      .hasErrorType('invalid_request_error')
      .hasErrorMessageContaining('No such customer');
  });

  test('should fail to create customer with invalid metadata', async ({ customerController }) => {
    const customerData = new CustomerBuilder()
      .withEmail(`invalid.metadata.${Date.now()}@example.com`)
      .withInvalid('metadata', 'invalid-string-instead-of-object')
      .build();

    (await customerController
      .createCustomer(customerData))
      .assertThat()
      .statusIs(400)
      .hasErrorType('invalid_request_error');
  });

  invalidEmailDataSet.forEach(({ value, expectedMessage, description }) => {
    test(`should fail when email is invalid: ${description}`, async ({ customerController }) => {
      const customerData = new CustomerBuilder()
        .withInvalid('email', value)
        .build();

      (await customerController
        .createCustomer(customerData))
        .assertThat()
        .statusIs(400)
        .hasErrorType('invalid_request_error')
        .hasErrorMessageContaining(expectedMessage);
    });
  });

  invalidNameDataSet.forEach(({ value, expectedMessage, description }) => {
    test(`should fail when name exceeds 256 characters: ${description}`, async ({ customerController }) => {
      const customerData = new CustomerBuilder()
        .withEmail(`validation.${Date.now()}@example.com`)
        .withInvalid('name', value)
        .build();

      (await customerController
        .createCustomer(customerData))
        .assertThat()
        .statusIs(400)
        .hasErrorType('invalid_request_error')
        .hasErrorMessageContaining(expectedMessage);
    });
  });

  invalidDescriptionDataSet.forEach(({ value, expectedMessage, description }) => {
    test(`should fail when description exceeds 500 characters: ${description}`, async ({ customerController }) => {
      const customerData = new CustomerBuilder()
        .withEmail(`validation.${Date.now()}@example.com`)
        .withInvalid('description', value)
        .build();

      (await customerController
        .createCustomer(customerData))
        .assertThat()
        .statusIs(400)
        .hasErrorType('invalid_request_error')
        .hasErrorMessageContaining(expectedMessage);
    });
  });

  invalidMetadataDataSet.forEach(({ value, expectedMessage, description }) => {
    test(`should fail when metadata validation fails: ${description}`, async ({ customerController }) => {
      const customerData = new CustomerBuilder()
        .withEmail(`validation.${Date.now()}@example.com`)
        .withInvalid('metadata', value)
        .build();

      (await customerController
        .createCustomer(customerData))
        .assertThat()
        .statusIs(400)
        .hasErrorType('invalid_request_error')
        .hasErrorMessageContaining(expectedMessage);
    });
  });
});
