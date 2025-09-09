import { NestFactory } from '@nestjs/core';
import { AppModule } from '@src/app.module';

import { PrismaService } from 'nestjs-prisma';
import type { INestApplication } from '@nestjs/common';
import type { PrismaService as PrismaServiceType } from 'nestjs-prisma';

declare global {
  // oxlint-disable-next-line no-var
  var app: INestApplication;
  // oxlint-disable-next-line no-var
  var prisma: PrismaServiceType;
}

async function bootstrap() {
  console.log('Initializing console...');

  const app = await NestFactory.create(AppModule);

  globalThis.app = app;

  globalThis.prisma = app.get(PrismaService);
}

await bootstrap();
