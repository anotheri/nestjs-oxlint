import { Type } from '@src/common/typebox';
import type { Static, StaticDecode, StaticEncode } from '@src/common/typebox';
import { ItemSchema } from '../schemas/item.schema';

export const ItemResponseSchema = Type.Pick(ItemSchema, [
  'id',
  'content',
  'createdAt',
  'updatedAt',
]);

export type ItemResponse = Static<typeof ItemResponseSchema>;
export type ItemResponseDecoded = StaticDecode<typeof ItemResponseSchema>;
export type ItemResponseEncoded = StaticEncode<typeof ItemResponseSchema>;

// list of items

export const ItemListResponseSchema = Type.Array(ItemResponseSchema);
