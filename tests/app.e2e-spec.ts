import { afterAll, beforeEach, describe, expect, it } from 'vitest';

import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import type { INestApplication } from '@nestjs/common';
// import * as request from 'supertest';
import request from 'supertest';
import { AppModule } from '@src/app.module';

import type { App } from 'supertest/types';

describe('AppController (e2e)', () => {
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

  describe('/ (GET)', () => {
    it('should return 200', async () => {
      const { status } = await request(app.getHttpServer()).get('/');

      expect(status).toBe(200);
    });
  });
});
