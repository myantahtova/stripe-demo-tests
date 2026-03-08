import { AUTOMATION_CUSTOMER_PREFIX } from '@constants/test-data-prefixes';
import { test } from '@fixtures/api-fixtures.js';

const DRY_RUN = process.env.CLEANUP_DRY_RUN !== 'false';
const PAGE_LIMIT = '100';

test.describe('Maintenance - Cleanup', { tag: '@cleanup' }, () => {
  test(
    'should delete test customers created by automation scripts',
    async ({ customerController }) => {
      const matchingCustomerIds: string[] = [];
      let hasMore = true;
      let startingAfter: string | undefined;
      let totalScanned = 0;

      while (hasMore) {
        const params: Record<string, string> = { limit: PAGE_LIMIT };
        if (startingAfter) {
          params.starting_after = startingAfter;
        }

        const customers = (await customerController
          .listCustomers(params))
          .assertThat()
          .statusIs(200)
          .hasResponseBody()
          .also()
          .getCustomerList();

        totalScanned += customers.data.length;

        for (const customer of customers.data) {
          if (customer.name?.startsWith(AUTOMATION_CUSTOMER_PREFIX)) {
            matchingCustomerIds.push(customer.id);
          }
        }

        hasMore = customers.has_more;
        startingAfter = customers.data[customers.data.length - 1]?.id;

        if (hasMore && !startingAfter) {
          throw new Error('Pagination failed: has_more is true but no next cursor was found.');
        }
      }

      console.log(`Scanned customers: ${totalScanned}`);
      console.log(
        `Matched prefix "${AUTOMATION_CUSTOMER_PREFIX}" in name: ${matchingCustomerIds.length}`,
      );

      if (matchingCustomerIds.length === 0) {
        console.log('No customers to delete.');
        return;
      }

      if (DRY_RUN) {
        console.log('Dry run mode enabled. No customers were deleted.');
        return;
      }

      for (const customerId of matchingCustomerIds) {
        (await customerController.deleteCustomer(customerId))
          .assertThat()
          .statusIs(200)
          .isDeleted();
      }

      console.log(`Deleted customers: ${matchingCustomerIds.length}`);
    },
  );
});
