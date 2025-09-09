import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import type { SwaggerConfig } from '@src/common/config/schema';
import type { INestApplication } from '@nestjs/common';

// import metadata from './metadata';

export const setupSwagger = (
  app: INestApplication,
  swaggerConfig: SwaggerConfig,
) => {
  const options = new DocumentBuilder()
    .setTitle(swaggerConfig?.title || 'Nestjs')
    .setDescription(swaggerConfig?.description || 'The nestjs API description')
    .setVersion(swaggerConfig?.version || '1.0')
    // .addTag('auth')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'bearer',
        name: 'JWT access token',
        description: 'Enter JWT access token',
        in: 'header',
      },
      'JWT Access',
    )
    .build();

  // await SwaggerModule.loadPluginMetadata(metadata);
  const document = SwaggerModule.createDocument(app, options, {
    ignoreGlobalPrefix: false,
  });

  SwaggerModule.setup(swaggerConfig?.openApiPath || 'api', app, document, {
    // explorer: true,

    swaggerOptions: {
      docExpansion: 'list',
      defaultModelsExpandDepth: 10,
      defaultModelExpandDepth: 10,
      // filter: true,
      // showRequestDuration: true,
    },
  });
};
