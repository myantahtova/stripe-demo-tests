import { faker } from '@faker-js/faker';
import { Address } from '@api-schemas/objects/address.schema';
import { Shipping, ShippingSchema } from '@api-schemas/objects/shipping.schema';
import { BaseBuilder } from '@builders/base-builder';
import { AddressBuilder } from '@builders/object-builders/address.builder';

export class ShippingBuilder extends BaseBuilder<Shipping> {
  protected schema = ShippingSchema;

  protected get defaultBody(): Shipping {
    return {
      name: faker.person.fullName(),
      phone: faker.phone.number(),
      address: new AddressBuilder().withDefaultFields().build(),
    };
  }

  withName(name: string): this {
    return this.with('name', name);
  }

  withPhone(phone: string): this {
    return this.with('phone', phone);
  }

  withAddress(address: Address): this {
    return this.with('address', address);
  }
}
