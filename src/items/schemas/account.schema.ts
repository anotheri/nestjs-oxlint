import { Type, transformDate } from '@src/common/typebox';

/**
 * Typebox schemas for Account model (mirrors Prisma schema, API-centric)
 */

export const AccountSchema = Type.Object(
  {
    id: Type.Integer({
      description: 'Account ID',
      minimum: 1,
      examples: [1, 32],
    }),
    avatarUrl: Type.Union(
      [
        Type.Null(),
        Type.String({
          description: 'Avatar URL of the item',
          examples: ['https://example.com/avatar.png', null],
          errorMessage: 'Content must be a string or null',
        }),
      ],
      {
        description: 'Avatar URL of the item, can be null',
        errorMessage: 'Avatar URL must be a string or null',
      },
    ),
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

// export type Account = Static<typeof AccountSchema>;
// export type AccountDecoded = Static<typeof AccountSchema>;
// export type AccountEncoded = Static<typeof AccountSchema>;
