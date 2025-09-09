import { HttpStatus } from '@nestjs/common';
import type { ApiResponseOptions } from '@nestjs/swagger';
import { Type } from '@src/common/typebox';

const TooManyRequestsSchema = Type.Object(
  {
    message: Type.String({ default: 'Too many requests' }),
  },
  { additionalProperties: false },
);

export const TooManyRequestsResponse: ApiResponseOptions = {
  status: HttpStatus.TOO_MANY_REQUESTS,
  description: 'Returns error message if rate limit exceeded',
  schema: TooManyRequestsSchema,
};
