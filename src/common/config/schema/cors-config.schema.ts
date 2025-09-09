import { Type } from '@src/common/typebox';
import type { Static } from '@src/common/typebox';

export const CorsSchema = Type.Object(
  {
    enabled: Type.Optional(Type.Boolean({ default: true })),
    allowedHeaders: Type.Optional(
      Type.Array(Type.String(), { default: ['Content-Type', 'Authorization'] }),
    ),
    credentials: Type.Optional(Type.Boolean({ default: true })),
    origin: Type.Optional(
      Type.Union(
        [
          Type.Boolean(),
          Type.String(),
          Type.Array(Type.String()),
          //
        ],
        {
          default: true,
        },
      ),
    ),
  },
  { additionalProperties: false },
);

export type CorsConfig = Static<typeof CorsSchema>;
