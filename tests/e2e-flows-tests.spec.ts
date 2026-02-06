import { CustomerBuilder } from '@builders/request-builders/customer-request.builder';
import { PaymentIntentBuilder } from '@builders/request-builders/payment-intent.builder';
import { PaymentIntentStatusEnum } from '@constants/enums';
import { test } from '@fixtures/api-fixtures.js';

test.describe('E2E Flows', { tag: ['@e2e'] }, () => {
  test.afterEach(async ({ customerController }) => {
    const customerId = customerController.getCustomerId();
    if (customerId) {
      await customerController.deleteCustomer(customerId);
    }
  });

  test('Card Payment Flow', async ({ customerController, paymentMethodController, paymentIntentController }) => {
    const customerData = new CustomerBuilder().withAllFields().build();

    // Crete a customer
    const customerId = (await customerController
      .createCustomer(customerData))
      .assertThat()
      .statusIs(200)
      .hasId()
      .hasEmail(customerData.email!)
      .hasName(customerData.name!)
      .also()
      .getCustomerId();

    // Attach payment method to the customer
    const paymentMethodId = (await paymentMethodController
      .attachPaymentMethod(
        'pm_card_visa',
        { customer: customerId },
      ))
      .assertThat()
      .statusIs(200)
      .hasId()
      .also()
      .getPaymentMethodId();

    // Update customer with the default payment method
    const updatedCustomerData = new CustomerBuilder()
      .withInvoiceSettings({ default_payment_method: paymentMethodId })
      .build();

    (await customerController
      .updateCustomer(customerId, updatedCustomerData))
      .assertThat()
      .statusIs(200)
      .hasDefaultPaymentMethod(paymentMethodId);

    // Create and confirm a payment intent using the attached payment method
    const paymentIntentData = new PaymentIntentBuilder()
      .withAmount(5000)
      .withCurrency('eur')
      .withCustomer(customerId)
      .withPaymentMethod(paymentMethodId)
      .withConfirm(true)
      .withOffSession('true')
      .withAutomaticPaymentMethods({ enabled: true, allow_redirects: 'never' })
      .withMetadata({ test_run: 'e2e_001' })
      .build();

    const paymentIntentId = (await paymentIntentController
      .createPaymentIntent(paymentIntentData))
      .assertThat()
      .statusIs(200)
      .hasId()
      .also()
      .getPaymentIntentId();

    // Get payment intent ad assert successful payment
    (await paymentIntentController.retrievePaymentIntent(paymentIntentId))
      .assertThat()
      .statusIs(200)
      .hasId()
      .hasStatus(PaymentIntentStatusEnum.SUCCEEDED)
      .hasCustomer(customerId)
      .hasPaymentMethod(paymentMethodId);
  });

  test('SEPA Payment Flow', async ({ customerController, paymentIntentController, chargeController }) => {
    // Create SEPA customer
    const customerData = new CustomerBuilder()
      .withAllFields()
      .withMetadata({ test_run: 'sepa_e2e_001' })
      .build();

    const customerId = (await customerController
      .createCustomer(customerData))
      .assertThat()
      .statusIs(200)
      .hasId()
      .hasEmail(customerData.email!)
      .hasName(customerData.name!)
      .also()
      .getCustomerId();

    // Create SEPA payment intent with mandate
    const paymentIntentData = new PaymentIntentBuilder()
      .withAllFields()
      .withCustomer(customerId)
      .withConfirm(true)
      .withSepaDebit('AT611904300234573201', {
        name: customerData.name,
        email: customerData.email,
      })
      .withOnlineMandateAcceptance()
      .withPaymentMethodTypes(['sepa_debit'])
      .withMetadata({ test_run: 'sepa_e2e_001' })
      .build();

    const createdPaymentIntent = await paymentIntentController
      .createPaymentIntent(
        paymentIntentData,
      );
    createdPaymentIntent
      .assertThat()
      .statusIs(200)
      .hasId()
      .hasAmount(paymentIntentData.amount)
      .hasCurrency(paymentIntentData.currency)
      .hasCustomer(customerId);

    const paymentIntentId = createdPaymentIntent.getPaymentIntentId();
    const chargeId = createdPaymentIntent.getChargeId();

    // Retrieve payment intent
    (await paymentIntentController
      .retrievePaymentIntent(paymentIntentId))
      .assertThat()
      .statusIs(200)
      .hasId()
      .hasAmount(paymentIntentData.amount)
      .hasCurrency(paymentIntentData.currency)
      .hasCustomer(customerId);

    // Retrieve charge
    if (chargeId) {
      (await chargeController
        .retrieveCharge(chargeId))
        .assertThat()
        .statusIs(200)
        .hasId()
        .hasAmount(paymentIntentData.amount)
        .hasCurrency(paymentIntentData.currency)
        .hasCustomer(customerId);
    }
  });
});
