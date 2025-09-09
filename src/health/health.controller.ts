import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

// services
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'nestjs-prisma';
import {
  HealthCheck,
  HealthCheckService,
  PrismaHealthIndicator,
} from '@nestjs/terminus';
import type { NestConfig } from '@src/common/config/schema';

@Controller('health')
@ApiTags('Health')
export class HealthController {
  constructor(
    private readonly configService: ConfigService,
    private readonly health: HealthCheckService,
    private readonly db: PrismaHealthIndicator,
    private readonly prisma: PrismaService,
  ) {}

  @Get()
  @HealthCheck()
  async check() {
    const nestConfig = this.configService.get<NestConfig>('nest');
    const version = nestConfig?.version;

    const health = await this.health.check([
      // () => this.http.pingCheck('nestjs-docs', 'https://docs.nestjs.com'),
      () => this.db.pingCheck('database', this.prisma),
    ]);

    return {
      ...health,
      version: `${version}`, // no V prefix
    };
  }
}
