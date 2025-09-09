import { parseEncoded } from '@src/common/typebox';
import { fakeItemComplete } from '@src/generated/fake-data';

import { ItemResponseSchema } from './response-item.dto';
import type { ItemResponse } from './response-item.dto';

// used in tests
export const fakeItemEntityDto = (): ItemResponse =>
  parseEncoded(ItemResponseSchema, fakeItemComplete());

// used as OpenAPI example
export const exampleItemEntity = () =>
  parseEncoded(ItemResponseSchema, fakeItemComplete());

// used as OpenAPI example
export const exampleItemList = () => {
  const list = [
    exampleItemEntity(),
    exampleItemEntity(),
    // ...
  ];
  return list.sort((a, b) => a.id - b.id);
};
