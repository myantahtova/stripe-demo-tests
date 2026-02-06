import { faker } from '@faker-js/faker';

export const invalidEmailDataSet = [
  {
    value: 'invalid-email',
    expectedMessage: 'Invalid email address',
    description: 'missing @ symbol',
  },
  { value: 'notanemail.com', expectedMessage: 'Invalid email address', description: 'no @ symbol' },
  { value: 'test@', expectedMessage: 'Invalid email address', description: 'missing domain' },
  {
    value: '@example.com',
    expectedMessage: 'Invalid email address',
    description: 'missing local part',
  },
];

export const invalidNameDataSet = [
  {
    value: faker.string.alpha(257),
    expectedMessage: 'must be at most 256 characters',
    description: '257 characters',
  },
  {
    value: faker.string.alpha(300),
    expectedMessage: 'must be at most 256 characters',
    description: '300 characters',
  },
];

export const invalidDescriptionDataSet = [
  {
    value: faker.string.alpha(351),
    expectedMessage: 'must be at most 350 characters',
    description: '351 characters',
  },
  {
    value: faker.string.alpha(400),
    expectedMessage: 'must be at most 350 characters',
    description: '400 characters',
  },
];

export const invalidMetadataDataSet = [
  {
    value: { [faker.string.alpha(41)]: 'value' },
    expectedMessage: 'Metadata keys can have up to 40 characters',
    description: 'key exceeds 40 chars',
  },
  {
    value: { key: faker.string.alpha(501) },
    expectedMessage: 'Metadata values can have up to 500 characters',
    description: 'value exceeds 500 chars',
  },
];
