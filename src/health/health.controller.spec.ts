import { beforeEach, afterEach, expect, describe, it } from 'vitest';
import type { DeepMockProxy } from 'vitest-mock-extended';
import { mockDeep, mockReset } from 'vitest-mock-extended';

import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';

import { HealthController } from './health.controller';
import { HealthCheckService } from '@nestjs/terminus';
import { TestConfigModule } from '@src/common/config/module-e2e';

describe('HealthController', () => {
  let healthController: HealthController;
  let healthCheckService: DeepMockProxy<HealthCheckService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TestConfigModule],
      controllers: [HealthController],
    })
      .useMocker(mockDeep)
      .compile();

    healthController = module.get<HealthController>(HealthController);
    healthCheckService = module.get(HealthCheckService);
  });

  afterEach(() => {
    mockReset(healthCheckService);
  });

  it('should be defined', () => {
    expect(healthController).toBeDefined();
  });

  describe('health check', () => {
    it('should return a successful health check when all services are reachable', async () => {
      // Arrange
      healthCheckService.check.mockResolvedValueOnce({
        status: 'ok',
        error: {},
        info: {
          database: { status: 'up' },
        },
        details: {
          database: { status: 'up' },
        },
      });

      // Act
      const result = await healthController.check();

      // Assert
      expect(result).toEqual({
        status: 'ok',
        version: '0.0.1',
        error: {},
        info: {
          database: { status: 'up' },
        },
        details: {
          database: { status: 'up' },
        },
      });
    });
  });
});
