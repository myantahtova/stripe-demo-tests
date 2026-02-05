import { Address } from '@api-schemas/objects/address.schema';
import { Shipping, ShippingSchema } from '@api-schemas/objects/shipping.schema';
import { BaseBuilder } from '@builders/base-builder';
import { AddressBuilder } from '@builders/object-builders/address.builder';
import { faker } from '@faker-js/faker';

const defaultShipping: Shipping = {
  name: faker.person.fullName(),
  phone: faker.phone.number(),
  address: new AddressBuilder().withAllFields().build(),
};

export class ShippingBuilder extends BaseBuilder<Shipping> {
  protected schema = ShippingSchema;
  protected defaultFullBody = defaultShipping;

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
