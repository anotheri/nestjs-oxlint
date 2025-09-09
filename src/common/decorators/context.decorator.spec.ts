import { beforeEach, afterEach, expect, describe, it } from 'vitest';
import type { DeepMockProxy } from 'vitest-mock-extended';
import { mockDeep, mockReset } from 'vitest-mock-extended';

import type { ExecutionContext } from '@nestjs/common';

import { contextFactory } from './context.decorator';

// graphql example you can find here:
// stackoverflow.com/questions/75892074/how-to-do-unit-tests-in-decorators-in-nestjs

describe('Context decorator', () => {
  let context: DeepMockProxy<ExecutionContext>;

  beforeEach(() => {
    context = mockDeep<ExecutionContext>();
  });

  afterEach(() => {
    mockReset(context);
  });

  it('should return the whole execution context', () => {
    // Arrange
    // Act
    const result = contextFactory('', context);

    // Assert
    expect(result).toEqual(context);
  });
});
