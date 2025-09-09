import { ConfigModule } from '@nestjs/config';
import { Value } from '@sinclair/typebox/value';

// config
import config from './index';
import { EnvSchema } from './schema/env.schema';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [config],
      validate: (env) => {
        try {
          return Value.Parse(EnvSchema, env);
        } catch (e) {
          console.error('Error validating env:', e);
          throw e;
        }
      },
    }),
  ],
  exports: [ConfigModule],
})
export class AppConfigModule {}
