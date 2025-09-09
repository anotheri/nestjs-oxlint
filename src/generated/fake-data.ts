import {  } from '@prisma/client';
import { faker } from '@faker-js/faker';
import Decimal from 'decimal.js';



export function fakeItem() {
  return {
    title:  faker.lorem.words({ min: 1, max: 5 }),
    content:  faker.lorem.sentences({ min: 1, max: 5 }),
    updatedAt:  faker.date.recent(),
  };
}
export function fakeItemComplete() {
  return {
    id:  faker.number.int({ min: 0, max: 9999 }),
    title:  faker.lorem.words({ min: 1, max: 5 }),
    content:  faker.lorem.sentences({ min: 1, max: 5 }),
    published: false,
    accountId: faker.number.int(),
    createdAt:  faker.date.past(),
    updatedAt:  faker.date.recent(),
  };
}
export function fakeAccount() {
  return {
    avatarUrl:  faker.image.avatar(),
    updatedAt:  faker.date.recent(),
  };
}
export function fakeAccountComplete() {
  return {
    id:  faker.number.int({ min: 0, max: 9999 }),
    avatarUrl:  faker.image.avatar(),
    createdAt:  faker.date.past(),
    updatedAt:  faker.date.recent(),
  };
}
