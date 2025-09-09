import { beforeEach, expect, describe, it } from 'vitest';

import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';

import { RootController } from '@src/root/root.controller';
import { mockDeep } from 'vitest-mock-extended';

describe('RootController', () => {
  let controller: RootController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [RootController],
      // providers: [ItemsService, PrismaService],
    })
      .useMocker(mockDeep)
      .compile();

    controller = app.get(RootController);
  });

  describe('root', () => {
    it('should return', () => {
      expect(controller.index()).toEqual({ ok: true });
    });
  });
});
