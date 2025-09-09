import type { PipeTransform, ArgumentMetadata, Type } from '@nestjs/common';
import { Injectable, BadRequestException, mixin } from '@nestjs/common';

import memoize from 'lodash/memoize';

import type { PathImpl2 } from '@nestjs/config';
import type { I18nTranslations } from '@src/generated/i18n.generated';

type ParseIdPipeOptions = {
  code?: PathImpl2<I18nTranslations>;
};

export const ParseIdPipe =
  memoize<
    (options?: ParseIdPipeOptions) => Type<PipeTransform<string, number>>
  >(createParseIdPipe);

export function createParseIdPipe(options?: ParseIdPipeOptions) {
  @Injectable()
  class MixinParseIdPipe implements PipeTransform<string, number> {
    transform(value: string, metadata: ArgumentMetadata): number {
      const val = parseInt(value, 10);

      // console.debug('this.options:', options);

      const isParam = metadata.type === 'param';

      if (isNaN(val) || val <= 0) {
        if (isParam) {
          throw new BadRequestException({
            error: 'Bad Request',
            code: options?.code || 'exceptions.BAD_REQUEST_INT_PARAM',
            args: {
              [metadata.type]: `${metadata.data}`,
            },
          });
        }

        throw new BadRequestException({
          error: 'Bad Request',
          code: 'exceptions.BAD_REQUEST',
        });
      }

      return val;
    }
  }

  return mixin(MixinParseIdPipe);
}
