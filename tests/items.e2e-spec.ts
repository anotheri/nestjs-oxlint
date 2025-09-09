import { beforeEach, describe, it, expect, afterAll } from 'vitest';

import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import type { INestApplication } from '@nestjs/common';
// import * as request from 'supertest';
import request from 'supertest';
import { AppModule } from '@src/app.module';

import prisma from './helpers/prisma';
import type { App } from 'supertest/types';
import type { ItemResponse } from '@src/items/dto/response-item.dto';

describe('Items controller (e2e)', () => {
  const baseUrl = '/items';

  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe(`${baseUrl} (GET)`, () => {
    it('should return an array containing one item', async () => {
      // Arrange
      // create first item if it does not exist
      const itemData = {
        title: 'test',
        content: 'hello world!!',
      };
      const accountData = {
        avatarUrl: 'https://via.placeholder.com/100x100',
      };
      await prisma.item.upsert({
        where: {
          id: 1,
        },
        create: {
          ...itemData,
          account: {
            create: accountData,
          },
        },
        update: {
          ...itemData,
        },
      });

      // Act
      const { status, body } = (await request(app.getHttpServer()).get(
        `${baseUrl}`,
      )) as {
        status: number;
        body: ItemResponse[];
      };
      // console.debug('response:', status, body);

      // Assert
      expect(status).toBe(200);
      expect(body).toBeInstanceOf(Array);
      expect(body).toHaveLength(1);
      expect(body[0]).toEqual(
        // `title` is excluded from the serialization Item schema
        expect.objectContaining({
          id: 1,
          // title: itemData.title,
          content: itemData.content,
          createdAt: expect.any(String) as string,
          updatedAt: expect.any(String) as string,
        }),
      );
    });
  });
});
