import { beforeEach, afterEach, expect, describe, it, vi } from 'vitest';
import type { DeepMockProxy } from 'vitest-mock-extended';
import { mockDeep, mockReset } from 'vitest-mock-extended';

import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import type { ArgumentsHost } from '@nestjs/common';
import { HttpStatus, HttpException, BadRequestException } from '@nestjs/common';

import { AllExceptionsFilter } from './all-exceptions.filter';
import { HttpAdapterHost } from '@nestjs/core';

describe('All exception filter', () => {
  let service: AllExceptionsFilter;
  let mockAdapterHost: DeepMockProxy<HttpAdapterHost>;
  let mockArgumentsHost: DeepMockProxy<ArgumentsHost>;

  beforeEach(async () => {
    vi.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AllExceptionsFilter,
        {
          provide: HttpAdapterHost,
          useValue: mockDeep<HttpAdapterHost>(),
        },
      ],
    })
      .useMocker(mockDeep)
      .compile();

    service = module.get<AllExceptionsFilter>(AllExceptionsFilter);
    mockAdapterHost = module.get(HttpAdapterHost);
    mockArgumentsHost = mockDeep<ArgumentsHost>();
  });

  afterEach(() => {
    mockReset(mockAdapterHost);
    mockReset(mockArgumentsHost);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return generic response on http exception', () => {
    // Arrange
    const spyGetRequest = vi.fn();
    const spyGetResponse = vi.fn().mockReturnValueOnce('test');
    mockArgumentsHost.switchToHttp.mockImplementationOnce(() => {
      return {
        getResponse: spyGetResponse,
        getRequest: spyGetRequest,
        getNext: vi.fn(),
      };
    });

    const expectedStatusCode = HttpStatus.BAD_REQUEST;
    const expectedResponse = {
      statusCode: expectedStatusCode,
      message: 'Http exception',
    };

    // Act
    service.catch(
      new HttpException('Http exception', HttpStatus.BAD_REQUEST),
      mockArgumentsHost,
    );

    // Assert
    expect(mockArgumentsHost.switchToHttp).toBeCalledTimes(1);
    expect(mockArgumentsHost.switchToHttp).toBeCalledWith();
    expect(spyGetRequest).toBeCalledTimes(0);

    expect(mockAdapterHost.httpAdapter.reply).toBeCalledTimes(1);
    expect(mockAdapterHost.httpAdapter.reply).toBeCalledWith(
      'test',
      expectedResponse,
      expectedStatusCode,
    );
  });

  it('should return generic response on unknown exception', () => {
    // Arrange
    const spyGetRequest = vi.fn();
    const spyGetResponse = vi.fn().mockReturnValueOnce('test');
    mockArgumentsHost.switchToHttp.mockImplementationOnce(() => {
      return {
        getResponse: spyGetResponse,
        getRequest: spyGetRequest,
        getNext: vi.fn(),
      };
    });

    const expectedResponse = {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      error: 'Internal Server Error',
    };

    // Act
    service.catch(new Error('Unknown exception'), mockArgumentsHost);

    // Assert
    expect(mockArgumentsHost.switchToHttp).toBeCalledTimes(1);
    expect(mockArgumentsHost.switchToHttp).toBeCalledWith();
    expect(spyGetRequest).toBeCalledTimes(0);

    expect(mockAdapterHost.httpAdapter.reply).toBeCalledTimes(1);
    expect(mockAdapterHost.httpAdapter.reply).toBeCalledWith(
      'test',
      expectedResponse,
      expectedResponse.statusCode,
    );
  });

  it('should return localized response on http exception', () => {
    // Arrange
    const spyGetRequest = vi.fn();
    const spyGetResponse = vi.fn().mockReturnValueOnce('test');
    mockArgumentsHost.switchToHttp.mockImplementationOnce(() => {
      return {
        getResponse: spyGetResponse,
        getRequest: spyGetRequest,
        getNext: vi.fn(),
      };
    });

    const expectedResponse = {
      statusCode: HttpStatus.BAD_REQUEST,
      error: undefined,
      message: 'Test exception',
    };

    // Act
    service.catch(
      new BadRequestException('Test exception', {
        // description: 'test description',
        cause: {
          code: 'unknown-code',
          args: {
            testArg: 'test value',
          },
        },
      }),
      mockArgumentsHost,
    );

    // Assert
    expect(mockArgumentsHost.switchToHttp).toBeCalledTimes(1);
    expect(mockArgumentsHost.switchToHttp).toBeCalledWith();
    expect(spyGetRequest).toBeCalledTimes(0);

    expect(mockAdapterHost.httpAdapter.reply).toBeCalledTimes(1);
    expect(mockAdapterHost.httpAdapter.reply).toBeCalledWith(
      'test',
      expectedResponse,
      expectedResponse.statusCode,
    );
  });
});
