import { beforeEach, afterEach, expect, describe, it } from 'vitest';
import type { DeepMockProxy } from 'vitest-mock-extended';
import { mockDeep, mockReset } from 'vitest-mock-extended';

import type { ArgumentMetadata } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common';

import { ParseIdPipe } from './parse-id.pipe';

// graphql example you can find here:
// stackoverflow.com/questions/75892074/how-to-do-unit-tests-in-decorators-in-nestjs

describe('Parse-Id pipe', () => {
  let metadata: DeepMockProxy<ArgumentMetadata>;

  beforeEach(() => {
    metadata = mockDeep<ArgumentMetadata>();
  });

  afterEach(() => {
    mockReset(metadata);
  });

  it.each([
    { inVal: '1', outVal: 1 },
    { inVal: '10', outVal: 10 },
  ])('should parse ID from string to number: $inVal', ({ inVal, outVal }) => {
    // Arrange
    const Pipe = ParseIdPipe();
    const target = new Pipe();

    // Act
    const result = target.transform(inVal, metadata);

    // Assert
    expect(result).toEqual(outVal);
  });

  it.each([
    // { inVal: undefined },
    // { inVal: null },
    { inVal: 'text' },
    { inVal: 'undefined' },
    { inVal: '' },
    { inVal: '0' },
    { inVal: '-1' },
    //
  ])(
    'should throw BadRequestException if ID is invalid: $inVal',
    ({ inVal }) => {
      // Arrange
      const Pipe = ParseIdPipe();
      const target = new Pipe();

      // Act

      // Assert
      expect(() => target.transform(inVal, metadata)).toThrowError(
        BadRequestException,
      );
    },
  );
});
