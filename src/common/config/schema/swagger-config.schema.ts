import { Type } from '@src/common/typebox';
import type { Static } from '@src/common/typebox';

export const SwaggerConfigSchema = Type.Object(
  {
    enabled: Type.Optional(Type.Boolean({ default: true })),
    title: Type.Optional(Type.String({ default: 'Nestjs' })),
    description: Type.Optional(
      Type.String({ default: 'The nestjs API description' }),
    ),
    version: Type.Optional(Type.String({ default: '1.0' })),
    openApiPath: Type.Optional(Type.String({ default: '/docs/api' })),
  },
  { additionalProperties: false },
);

export type SwaggerConfig = Static<typeof SwaggerConfigSchema>;
