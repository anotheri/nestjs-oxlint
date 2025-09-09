import { beforeEach, afterEach, expect, describe, it, vi } from 'vitest';
import type { DeepMockProxy } from 'vitest-mock-extended';
import { mockDeep, mockReset } from 'vitest-mock-extended';

import type { ExecutionContext } from '@nestjs/common';

import { referrerFactory } from './referrer.decorator';
import type { HttpArgumentsHost } from '@nestjs/common/interfaces';

// graphql example you can find here:
// stackoverflow.com/questions/75892074/how-to-do-unit-tests-in-decorators-in-nestjs

describe('Referrer decorator', () => {
  let context: DeepMockProxy<ExecutionContext>;

  beforeEach(() => {
    context = mockDeep<ExecutionContext>();
  });

  afterEach(() => {
    mockReset(context);
  });

  it('should extract the referrer from the HTTP request context', () => {
    // Arrange
    const mockReferrer = 'http://localhost:3000';
    context.switchToHttp.mockReturnValue({
      getType: vi.fn().mockReturnValue('http'),
      getRequest: () => ({
        get: vi.fn().mockReturnValue(mockReferrer),
        // headers: {},
        // body: {},
      }),
      getResponse: vi.fn(),
    } as unknown as HttpArgumentsHost);

    // Act
    const referrer = referrerFactory(undefined, context);

    // Assert
    expect(referrer).toMatch(mockReferrer);
  });
});
