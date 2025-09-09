// src/tests/helpers/setup.ts

import { afterAll, afterEach, beforeAll, beforeEach } from 'vitest';
import { configureNestJsTypebox } from 'nestjs-typebox';

// Patch NestJs Swagger to support Typebox DTOs
configureNestJsTypebox({
  setFormats: true,
  // patchSwagger: true,
});

beforeAll(() => {});
afterAll(() => {});
beforeEach(() => {});
afterEach(() => {});
