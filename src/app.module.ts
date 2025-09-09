import { Module } from '@nestjs/common';

import { SentryModule } from '@sentry/nestjs/setup';

// i18n
import { Module as I18nModule } from '@src/i18n/module';

// config
import { AppConfigModule } from './common/config/app-config.module';

// modules, services and controllers
import { ItemsModule } from './items/items.module';
import { HealthModule } from './health/health.module';

import { RootController } from '@src/root/root.controller';

//
@Module({
  imports: [
    SentryModule.forRoot(), // it's still in alpha though
    AppConfigModule,
    I18nModule,
    ItemsModule,
    HealthModule,
  ],
  controllers: [
    RootController,
    //
  ],
  providers: [
    //
  ],
  exports: [],
})
export class AppModule {}
