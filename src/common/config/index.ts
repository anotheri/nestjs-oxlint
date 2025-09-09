import type { Config } from './schema';
import { version } from '../../../package.json';

// NOTICE: it's important to avoid name match between ENV vars
// and config object keys, because it will prevent the config
// override for tests.
// Read more: https://stackoverflow.com/questions/62890169/nestjs-configmodule-setting-overriding-values-in-config-object

// console.debug('NODE_ENV:', process.env.NODE_ENV);
// console.debug('INSTANCE_NAME:', process.env.INSTANCE_NAME);
// console.debug('INSTANCE_ID:', process.env.INSTANCE_ID);

const config: Config = {
  // General app configuration
  nest: {
    env: process.env.NODE_ENV || 'development',
    version: version,
    baseUrl: process.env.BASE_URL || 'http://localhost:3000',
    port: parseInt(`${process.env.PORT}`, 10) || 3000,
    instanceName: process.env.INSTANCE_NAME || 'nestjs-oxlint',
    instanceId: process.env.INSTANCE_ID || '0',
  },
  cors: {
    enabled: true,
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'Accept',
      'X-Fingerprint',
      // 'Ngrok-Skip-Browser-Warning',
    ],
    credentials: true,
    origin: true,
    // origin: /example\.com$/,
    // origin: ["http://example1.com", /\.example2\.com$/],
  },

  // Docs configuration
  swagger: {
    enabled: true,
    title: 'Nestjs API',
    description: 'The Nestjs API boilerplate.',
    version: version,
    openApiPath: '/docs/api',
  },
};

export default (): Config => config;
