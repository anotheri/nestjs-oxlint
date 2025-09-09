import { HttpStatus } from '@nestjs/common';
import type { ApiResponseOptions } from '@nestjs/swagger';
import { Type } from '@src/common/typebox';

const UnauthorizedSchema = Type.Object(
  {
    message: Type.String({
      default: 'Unauthorized',
      description: 'Unauthorized',
    }),
  },
  { additionalProperties: false },
);

export const UnauthorizedResponse: ApiResponseOptions = {
  status: HttpStatus.UNAUTHORIZED,
  description: 'Returns error message if user is not authenticated',
  schema: UnauthorizedSchema,
};
