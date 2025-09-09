import type { Config } from './schema';

// NOTICE: it's important to avoid name match between ENV vars
// and config object keys, because it will prevent the config
// override for tests.
// Read more: https://stackoverflow.com/questions/62890169/nestjs-configmodule-setting-overriding-values-in-config-object
const baseConfigE2E = {
  nest: {
    env: 'test',
    baseUrl: 'http://localhost:3001',
    version: '0.0.1',
    port: 3001,
    instanceName: 'TestAuth',
    instanceId: '0',
  },
  cors: {
    enabled: true,
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'Accept',
      // 'X-Fingerprint',
      // 'Ngrok-Skip-Browser-Warning',
    ],
    credentials: true,
    origin: true,
  },
};

export const getConfigE2E = (): Config => baseConfigE2E as Config;
