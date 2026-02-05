import { Address, AddressSchema } from '@api-schemas/objects/address.schema.js';
import { BaseBuilder } from '@builders/base-builder.js';
import { faker } from '@faker-js/faker';

const defaultAddress: Address = {
  line1: faker.location.streetAddress(),
  line2: faker.location.secondaryAddress(),
  city: faker.location.city(),
  state: faker.location.state({ abbreviated: true }),
  postal_code: faker.location.zipCode(),
  country: faker.location.countryCode('alpha-2'),
};

export class AddressBuilder extends BaseBuilder<Address> {
  protected schema = AddressSchema;
  protected defaultFullBody = defaultAddress;

  withLine1(line1: string): this {
    return this.with('line1', line1);
  }

  withLine2(line2: string): this {
    return this.with('line2', line2);
  }

  withCity(city: string): this {
    return this.with('city', city);
  }

  withState(state: string): this {
    return this.with('state', state);
  }

  withPostalCode(postalCode: string): this {
    return this.with('postal_code', postalCode);
  }

  withCountry(country: string): this {
    return this.with('country', country);
  }
}
