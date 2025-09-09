import { Type } from '@src/common/typebox';
import type { Static } from '@src/common/typebox';

export const RpcGeneralSchema = Type.Object(
  {
    isSuccessful: Type.Boolean(),
    message: Type.Optional(Type.String()),
    error: Type.Optional(Type.String()),
    result: Type.Any(), // it should be extended in the child classes
  },
  { additionalProperties: false },
);

export type RpcGeneralType = Static<typeof RpcGeneralSchema>;
