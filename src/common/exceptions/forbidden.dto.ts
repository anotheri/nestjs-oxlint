import { HttpStatus } from '@nestjs/common';
import type { ApiResponseOptions } from '@nestjs/swagger';
import { Type } from '@src/common/typebox';

const ForbiddenSchema = Type.Object(
  {
    error: Type.Optional(Type.String({ default: 'Forbidden' })),
    message: Type.String({ default: 'Forbidden' }),
  },
  { additionalProperties: false },
);

export const ForbiddenResponse: ApiResponseOptions = {
  status: HttpStatus.FORBIDDEN,
  description:
    'Returns error message if request is forbidden (e.g. user does not have permission)',
  schema: ForbiddenSchema,
};
