import { beforeEach, afterEach, expect, describe, it, vi } from 'vitest';
import { mockDeep } from 'vitest-mock-extended';

import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
// import { PrismaService } from 'nestjs-prisma';
// import { Item } from '@prisma/client';

import { NotFoundException } from '@nestjs/common';

import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';
// import { ItemEntitySchema } from './entities/item.entity';
import { fakeItemComplete } from '@src/generated/fake-data';

const mockItemEntity = fakeItemComplete();

describe('ItemsController', () => {
  let itemsController: ItemsController;
  let itemsService: ItemsService;
  // let i18nMock: DeepMockProxy<I18nContext<I18nTranslations>>;
  // let prisma: DeepMockProxy<PrismaService>;

  beforeEach(async () => {
    // i18nMock = mockDeep<I18nContext<I18nTranslations>>();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemsController],
      providers: [
        ItemsService,
        //PrismaService
      ],
    })
      .useMocker(mockDeep)
      .compile();

    itemsController = module.get<ItemsController>(ItemsController);
    itemsService = module.get<ItemsService>(ItemsService);
    // prisma = module.get(PrismaService);
  });

  afterEach(() => {
    // mockReset(prisma);
    // mockReset(i18nMock);
  });

  it('should be defined', () => {
    expect(itemsController).toBeDefined();
  });

  describe('index', () => {
    it('should return', async () => {
      // Arrange
      vi.spyOn(itemsService, 'findAll').mockResolvedValueOnce([mockItemEntity]);

      // Act
      const response = await itemsController.index();

      // Assert
      expect(response).toBeInstanceOf(Array);
      expect(response[0]).toBeInstanceOf(Object);
    });
  });

  describe('show', () => {
    it('should return an item by id', async () => {
      // Arrange
      const id = mockItemEntity.id;
      vi.spyOn(itemsService, 'findOne').mockResolvedValueOnce(mockItemEntity);

      // Act
      let error;
      let response;
      try {
        response = await itemsController.show(id);
      } catch (e) {
        error = e;
      }

      // Assert
      expect(error).toBeUndefined();
      expect(response).toBeInstanceOf(Object);
      expect(response).toEqual(mockItemEntity);
    });

    it('should throw an appropriate error if item not found', async () => {
      // Arrange
      const id = 2;

      // Act
      let error;
      try {
        await itemsController.show(id);
      } catch (e) {
        // console.error('e:', e);
        error = e;
      }

      // Assert
      expect(error).toBeInstanceOf(NotFoundException);
      expect((error as NotFoundException).getResponse()).toMatchObject({
        error: 'Not found',
        code: 'exceptions.NOT_FOUND',
      });
    });
  });
});
