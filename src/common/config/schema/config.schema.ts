import { Type } from '@src/common/typebox';
import type { Static } from '@src/common/typebox';

import { NestConfigSchema } from './nest-config.schema';
import { CorsSchema } from './cors-config.schema';
import { SwaggerConfigSchema } from './swagger-config.schema';

export const ConfigSchema = Type.Object(
  {
    // General app configuration
    nest: NestConfigSchema,
    cors: CorsSchema,

    // Docs configuration
    swagger: Type.Optional(SwaggerConfigSchema),
  },
  { additionalProperties: false },
);

export type Config = Static<typeof ConfigSchema>;
