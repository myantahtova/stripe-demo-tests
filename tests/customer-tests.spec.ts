import { AddressBuilder } from '@builders/object-builders/address.builder';
import { CustomerBuilder } from '@builders/request-builders/customer-request.builder';
import { StripeErrorsEnum } from '@constants/enums';
import {
  invalidDescriptionDataSet,
  invalidEmailDataSet,
  invalidMetadataDataSet,
  invalidNameDataSet,
} from '@constants/invalid-data-sets';
import { test } from '@fixtures/api-fixtures.js';

test.describe('Stripe API - Customers - Positive Tests', () => {
  test.afterEach(async ({ customerController }) => {
    await customerController.deleteCreatedCustomers();
  });

  test(
    'should create a customer with all fields',
    { tag: '@smoke' },
    async ({ customerController }) => {
      const email = `test.${Date.now()}@example.com`;
      const name = 'Test Customer';

      const customerData = new CustomerBuilder()
        .withDefaultFields()
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
    },
  );

  test(
    'should create a customer only with required fields',
    { tag: '@smoke' },
    async ({ customerController }) => {
      const customerData = new CustomerBuilder()
        .withRequiredFields()
        .build();

      (await customerController
        .createCustomer(customerData))
        .assertThat()
        .statusIs(200)
        .hasId();
    },
  );

  test('should create customer with specific address', async ({ customerController }) => {
    const customAddress = new AddressBuilder()
      .withLine1('123 Main St')
      .withLine2('Apt 4B')
      .withCity('Anytown')
      .withState('CA')
      .withPostalCode('12345')
      .withCountry('US')
      .build();

    const customerData = new CustomerBuilder()
      .withAddress(customAddress)
      .build();

    (await customerController
      .createCustomer(customerData))
      .assertThat()
      .statusIs(200)
      .hasId()
      .hasAddress(customAddress);
  });

  test('should retrieve a customer by ID', { tag: '@smoke' }, async ({ customerController }) => {
    const email = `retrieve.${Date.now()}@example.com`;

    const customerData = new CustomerBuilder()
      .withEmail(email)
      .build();

    await customerController
      .createCustomer(customerData);

    const customerId = customerController.getCustomerId();

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

    const customerData2 = new CustomerBuilder()
      .withEmail(email2)
      .build();

    await customerController.createCustomer(customerData2);

    (await customerController
      .listCustomers({ limit: '10' }))
      .assertThat()
      .statusIs(200)
      .bodyPropertyEquals('object', 'list')
      .hasResponseBody();
  });
});

test.describe('Stripe API - Customers - Negative Tests', () => {
  test(
    'should fail to create customer with invalid email',
    { tag: '@negative' },
    async ({ customerController }) => {
      const invalidEmail = 'invalid-email';

      const customerData = new CustomerBuilder()
        .withDefaultFields()
        .withInvalid('email', invalidEmail)
        .build();

      (await customerController
        .createCustomer(customerData))
        .assertThat()
        .statusIs(400)
        .hasErrorType(StripeErrorsEnum.INVALID_REQUEST_ERROR)
        .hasErrorMessageContaining(`Invalid email address: invalid-email`);
    },
  );

  test(
    'should fail to retrieve non-existent customer',
    { tag: '@negative' },
    async ({ customerController }) => {
      const nonExistentId = 'cus_nonexistent123';

      (await customerController
        .retrieveCustomer(nonExistentId))
        .assertThat()
        .statusIs(404)
        .hasErrorType(StripeErrorsEnum.INVALID_REQUEST_ERROR)
        .hasErrorMessageContaining('No such customer');
    },
  );

  test(
    'should fail to update non-existent customer',
    { tag: '@negative' },
    async ({ customerController }) => {
      const nonExistentId = 'cus_nonexistent123';
      const updateData = new CustomerBuilder()
        .withDefaultFields()
        .withName('Updated Name')
        .build();

      (await customerController
        .updateCustomer(nonExistentId, updateData))
        .assertThat()
        .statusIs(404)
        .hasErrorType(StripeErrorsEnum.INVALID_REQUEST_ERROR)
        .hasErrorMessageContaining('No such customer');
    },
  );

  test(
    'should fail to delete non-existent customer',
    { tag: '@negative' },
    async ({ customerController }) => {
      const nonExistentId = 'cus_nonexistent123';

      (await customerController.deleteCustomer(nonExistentId))
        .assertThat()
        .statusIs(404)
        .hasErrorType(StripeErrorsEnum.INVALID_REQUEST_ERROR)
        .hasErrorMessageContaining('No such customer');
    },
  );

  test(
    'should fail to create customer with invalid metadata',
    { tag: '@negative' },
    async ({ customerController }) => {
      const customerData = new CustomerBuilder()
        .withEmail(`invalid.metadata.${Date.now()}@example.com`)
        .withInvalid('metadata', 'invalid-string-instead-of-object')
        .build();

      (await customerController
        .createCustomer(customerData))
        .assertThat()
        .statusIs(400)
        .hasErrorType(StripeErrorsEnum.INVALID_REQUEST_ERROR);
    },
  );

  invalidEmailDataSet.forEach(({ value, expectedMessage, description }) => {
    test(
      `should fail when email is invalid: ${description}`,
      { tag: '@negative' },
      async ({ customerController }) => {
        const customerData = new CustomerBuilder()
          .withInvalid('email', value)
          .build();

        (await customerController
          .createCustomer(customerData))
          .assertThat()
          .statusIs(400)
          .hasErrorType(StripeErrorsEnum.INVALID_REQUEST_ERROR)
          .hasErrorMessageContaining(expectedMessage);
      },
    );
  });

  invalidNameDataSet.forEach(({ value, expectedMessage, description }) => {
    test(
      `should fail when name exceeds 256 characters: ${description}`,
      { tag: '@negative' },
      async ({ customerController }) => {
        const customerData = new CustomerBuilder()
          .withEmail(`validation.${Date.now()}@example.com`)
          .withInvalid('name', value)
          .build();

        (await customerController
          .createCustomer(customerData))
          .assertThat()
          .statusIs(400)
          .hasErrorType(StripeErrorsEnum.INVALID_REQUEST_ERROR)
          .hasErrorMessageContaining(expectedMessage);
      },
    );
  });

  invalidDescriptionDataSet.forEach(({ value, expectedMessage, description }) => {
    test(`should fail when description exceeds 500 characters: ${description}`, {
      tag: '@negative',
    }, async ({ customerController }) => {
      const customerData = new CustomerBuilder()
        .withEmail(`validation.${Date.now()}@example.com`)
        .withInvalid('description', value)
        .build();

      (await customerController
        .createCustomer(customerData))
        .assertThat()
        .statusIs(400)
        .hasErrorType(StripeErrorsEnum.INVALID_REQUEST_ERROR)
        .hasErrorMessageContaining(expectedMessage);
    });
  });

  invalidMetadataDataSet.forEach(({ value, expectedMessage, description }) => {
    test(
      `should fail when metadata validation fails: ${description}`,
      { tag: '@negative' },
      async ({ customerController }) => {
        const customerData = new CustomerBuilder()
          .withEmail(`validation.${Date.now()}@example.com`)
          .withInvalid('metadata', value)
          .build();

        (await customerController
          .createCustomer(customerData))
          .assertThat()
          .statusIs(400)
          .hasErrorType(StripeErrorsEnum.INVALID_REQUEST_ERROR)
          .hasErrorMessageContaining(expectedMessage);
      },
    );
  });
});
