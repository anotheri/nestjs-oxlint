import type { ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { Catch, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

import get from 'lodash/get';
import isString from 'lodash/isString';

import { I18nContext } from 'nestjs-i18n';
import type { I18nTranslations } from '@src/generated/i18n.generated';
import type { PathImpl2 } from '@nestjs/config';

export interface ErrorResponseType {
  code: string;
  args: Partial<{
    field: string;
    value: number | string;
  }>;
}

interface ProcessedError {
  statusCode: number;
  error?: string;
  message?: string;
}

export const processError = (
  exception: unknown,
  i18n: I18nContext<I18nTranslations> | undefined,
  logger: Logger,
): ProcessedError => {
  const httpStatus =
    exception instanceof HttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

  if (exception instanceof HttpException) {
    const responseBody = exception.getResponse();
    logger.debug('> responseBody:', JSON.stringify(responseBody, null, '  '));

    if (isString(get(responseBody, 'code'))) {
      const { code, args } = responseBody as ErrorResponseType;

      const msg = i18n?.t(code as PathImpl2<I18nTranslations>, {
        args,
        lang: i18n?.lang,
      });

      logger.debug('> i18n msg:', msg);

      if (isString(msg)) {
        return {
          error: get(responseBody, 'error') ?? code,
          message: msg || get(responseBody, 'message'),
          statusCode: httpStatus,
        };
      }
    }

    return {
      statusCode: httpStatus,
      ...(isString(responseBody) ? { message: responseBody } : responseBody),
      // ...(httpStatus >= 500 ? { error: 'Internal Server Error' } : {}),
    };
  }

  return {
    error: 'Internal Server Error',
    statusCode: httpStatus,
    ...(exception as Error),
  } as unknown as ProcessedError;
};

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    this.logger.error(exception);
    this.logger.debug('exception:', exception);

    // In certain situations `httpAdapter` might not be available in the
    // constructor method, thus we should resolve it here.
    const { httpAdapter } = this.httpAdapterHost;

    const i18n = I18nContext.current<I18nTranslations>(host);

    const ctx = host.switchToHttp();

    const responseBody = processError(exception, i18n, this.logger);

    httpAdapter.reply(ctx.getResponse(), responseBody, responseBody.statusCode);
  }
}
