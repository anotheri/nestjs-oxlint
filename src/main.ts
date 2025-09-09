// Import this first!
import './instrument';

import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { Logger, VersioningType, RequestMethod } from '@nestjs/common';
import { PrismaClientExceptionFilter } from 'nestjs-prisma';
import type { NestExpressApplication } from '@nestjs/platform-express';

// import cookieParser from 'cookie-parser';

import { AppModule } from '@src/app.module';

import type {
  CorsConfig,
  NestConfig,
  SwaggerConfig,
} from './common/config/schema';
import { setupSwagger } from './swagger';
import { json } from 'express';

import { configureNestJsTypebox } from 'nestjs-typebox';

async function bootstrap() {
  const now = Date.now();
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const { httpAdapter } = app.get(HttpAdapterHost);

  // setup Logger
  const logger = new Logger(bootstrap.name);

  // Patch to serialize BigInt to string in ExpressJS response
  // Object.defineProperty(BigInt.prototype, 'toJSON', {
  //   value: function () {
  //     return this.toString() as string;
  //   },
  //   writable: true,
  //   enumerable: false,
  //   configurable: true,
  // });

  const configService = app.get(ConfigService);
  const nestConfig = configService.get<NestConfig>('nest');
  const corsConfig = configService.get<CorsConfig>('cors');
  const swaggerConfig = configService.get<SwaggerConfig>('swagger');

  // Cors
  // https://github.com/expressjs/cors#configuration-options
  if (corsConfig?.enabled) {
    app.enableCors({
      allowedHeaders: corsConfig?.allowedHeaders,
      origin: corsConfig?.origin,
      credentials: corsConfig?.credentials,
    });
  }

  app.use(json({ limit: '300mb' }));

  // Validation
  // app.useGlobalPipes(new ValidationPipe());

  // Prisma Client Exception Filter for unhandled exceptions
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  // proxy setup, read more:
  // https://expressjs.com/en/guide/behind-proxies.html
  app.set('trust proxy', true);

  // setup global prefix, read more:
  // https://docs.nestjs.com/faq/global-prefix
  app.setGlobalPrefix('api', {
    exclude: [
      { path: '.well-known/(.*)', method: RequestMethod.GET },
      // { path: 'healthz', method: RequestMethod.GET }
    ],
  });

  // setup versioning, read more:
  // https://docs.nestjs.com/techniques/versioning
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  // enable shutdown hook
  app.enableShutdownHooks();

  // Cookie Parser
  // app.use(cookieParser());

  // Patch NestJs Swagger to support Typebox DTOs
  configureNestJsTypebox({
    setFormats: true,
    patchSwagger: swaggerConfig?.enabled,
  });

  // Swagger Api
  if (swaggerConfig?.enabled) {
    setupSwagger(app, swaggerConfig);
  }

  // Start the application
  const port = nestConfig?.port || 3000;

  await app.listen(port, '0.0.0.0');

  logger.log('Mapped {/, GET} Swagger api route', 'RouterExplorer');
  logger.log('Mapped {/docs, GET} Swagger api route', 'RouterExplorer');
  logger.log(`Enviroment running at ${nestConfig?.env}`);
  logger.log(`🚀  Server is running at ${await app.getUrl()}`);
  logger.log(
    `🚀  App Name: ${nestConfig?.instanceName}_0_${nestConfig?.instanceId}`,
  );
  // logger.log(`🚀  Timezone:  ${timezone}`);
  logger.log(`🚀  Version:  ${nestConfig?.version}`);
  logger.log(`🚀  Boot Time: ${Date.now() - now}ms`);
}

bootstrap().catch((err) => {
  console.error(`bootstrap error:`, err);
  process.exit(1);
});
