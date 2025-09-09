import { Type, transformDate } from '@src/common/typebox';

/**
 * Typebox schemas for Item model (mirrors Prisma schema, API-centric)
 */

export const ItemSchema = Type.Object(
  {
    id: Type.Integer({
      description: 'Item ID',
      minimum: 1,
      examples: [1, 32],
    }),
    title: Type.String({
      description: 'Title of the item',
      minLength: 1,
      maxLength: 255,
      examples: ['Sample Item', 'Another Item'],
      errorMessage: 'Title must be a non-empty string with max 255 characters',
    }),
    content: Type.Union([Type.Null(), Type.String({})], {
      description: 'Content of the item, can be null',
      errorMessage: 'Content must be a string or null',
    }),
    published: Type.Boolean({
      description: 'Whether item published or not',
      examples: [true, false],
    }),
    accountId: Type.Integer({
      description: 'ID of the connected account',
      minimum: 1,
      examples: [1, 12],
    }),
    createdAt: transformDate({
      description: 'Creation timestamp',
      examples: ['2023-10-01T12:00:00Z'],
    }),
    // createdBy: Type.Integer({
    //   minimum: 0,
    //   maximum: 4294967295,
    //   description: 'User ID who created',
    // }),
    updatedAt: transformDate({
      description: 'Update timestamp',
      examples: ['2023-10-01T12:00:00Z'],
    }),
    // updatedBy: Type.Integer({
    //   minimum: 0,
    //   maximum: 4294967295,
    //   description: 'User ID who updated',
    // }),
  },
  { additionalProperties: false },
);

// export type Item = Static<typeof ItemSchema>;
// export type ItemDecoded = Static<typeof ItemSchema>;
// export type ItemEncoded = Static<typeof ItemSchema>;
