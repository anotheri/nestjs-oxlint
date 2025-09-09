import { ConfigModule } from '@nestjs/config';
// import { Value } from '@sinclair/typebox/value';

// config
import { getConfigE2E } from './e2e';
// import { EnvSchema } from './schema';

// config for unit and e2e tests only
export const TestConfigModule = ConfigModule.forRoot({
  isGlobal: true,
  // ignoreEnvVars: true,
  skipProcessEnv: true,
  validatePredefined: false,
  ignoreEnvFile: true,
  load: [getConfigE2E],
  // validate: (env) => {
  //   // console.debug('env:', env);
  //   return Value.Parse(EnvSchema, env);
  // },
});
