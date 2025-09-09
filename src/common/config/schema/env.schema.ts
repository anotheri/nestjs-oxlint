import { Type } from '@src/common/typebox';
import type { Static } from '@src/common/typebox';

import { NestConfigSchema } from './nest-config.schema';

export const EnvSchema = Type.Object(
  {
    // General app configuration

    // nest
    NODE_ENV: Type.Index(NestConfigSchema, ['env']),
    PORT: Type.Index(NestConfigSchema, ['port']),
    INSTANCE_NAME: Type.Index(NestConfigSchema, ['instanceName']),
    INSTANCE_ID: Type.Index(NestConfigSchema, ['instanceId']),

    // Internal services configuration

    // mysql
    MYSQL_HOST: Type.String(),
    MYSQL_PORT: Type.Optional(Type.Number({ default: 3306 })), // make sure we use coersion
    MYSQL_ROOT_USER: Type.String(),
    MYSQL_ROOT_PASSWORD: Type.String(),
    MYSQL_USER: Type.String(),
    MYSQL_PASSWORD: Type.String(),
    MYSQL_DATABASE: Type.String(),

    // prisma
    // string format: 'url' doesn't work mysql:// scheme
    DATABASE_URL: Type.String({ format: 'url-local' }),
  },
  { additionalProperties: false },
);

export type Env = Static<typeof EnvSchema>;
