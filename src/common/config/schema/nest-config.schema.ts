import { Type } from '@src/common/typebox';
import type { Static } from '@src/common/typebox';

export const NestConfigSchema = Type.Object(
  {
    env: Type.Optional(Type.String({ default: 'development' })),
    version: Type.String({ default: '1.0.0' }),
    baseUrl: Type.String({ default: 'http://localhost:3000' }),
    port: Type.Optional(Type.Number({ default: 3000 })),
    instanceName: Type.Optional(Type.String({ default: 'NestApi' })),
    instanceId: Type.Optional(Type.String({ default: '0' })),
  },
  { additionalProperties: false },
);

export type NestConfig = Static<typeof NestConfigSchema>;
