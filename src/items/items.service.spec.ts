import { beforeEach, afterEach, expect, describe, it } from 'vitest';
import { mockDeep, mockReset } from 'vitest-mock-extended';
import type { DeepMockProxy } from 'vitest-mock-extended';

import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';

import { PrismaService } from 'nestjs-prisma';

import { ItemsService } from './items.service';
import { fakeItemComplete } from '@src/generated/fake-data';

const mockItemComplete = fakeItemComplete();

describe('ItemsService', () => {
  let itemsService: ItemsService;
  let prisma: DeepMockProxy<PrismaService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ItemsService,
        // PrismaService,
      ],
    })
      .useMocker(mockDeep)
      .compile();

    itemsService = module.get<ItemsService>(ItemsService);
    prisma = module.get(PrismaService);
  });

  afterEach(() => {
    mockReset(prisma);
  });

  it('should be defined', () => {
    expect(itemsService).toBeDefined();
  });

  describe('findAll', () => {
    it('should return the list of items', async () => {
      // Arrange
      prisma.item.findMany.mockResolvedValueOnce([mockItemComplete]);

      // Act
      let error;
      let response;
      try {
        response = await itemsService.findAll();
      } catch (e) {
        error = e;
      }

      // Assert
      expect(error).toBeUndefined();
      expect(response).toBeInstanceOf(Array);
      expect(response?.[0]).toEqual(mockItemComplete);
    });
  });
});
