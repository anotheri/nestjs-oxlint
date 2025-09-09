import { HttpStatus } from '@nestjs/common';
import type { ApiResponseOptions } from '@nestjs/swagger';
import { Type } from '@src/common/typebox';

const BadRequestSchema = Type.Object(
  {
    message: Type.String({ default: 'Bad request' }),
  },
  { additionalProperties: false },
);

export const BadRequestResponse: ApiResponseOptions = {
  status: HttpStatus.BAD_REQUEST,
  description: 'Returns error message if request body is invalid',
  schema: BadRequestSchema,
};
