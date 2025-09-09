import { Type } from '@src/common/typebox';
import type { Static } from '@src/common/typebox';

export const GeneralResponseSchema = Type.Object(
  {
    success: Type.Boolean(),
    message: Type.Optional(Type.String()),
  },
  { additionalProperties: false },
);

export type GeneralResponseType = Static<typeof GeneralResponseSchema>;
