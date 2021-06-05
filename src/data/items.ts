import faker from 'faker';
import { v4 as uuid } from 'uuid';

export const items = [
  { id: uuid(), title: faker.commerce.productName(), description: faker.commerce.productDescription() },
  { id: uuid(), title: faker.commerce.productName(), description: faker.commerce.productDescription() },
  { id: uuid(), title: faker.commerce.productName(), description: faker.commerce.productDescription() },
  { id: uuid(), title: faker.commerce.productName(), description: faker.commerce.productDescription() },
  { id: uuid(), title: faker.commerce.productName(), description: faker.commerce.productDescription() },
];
