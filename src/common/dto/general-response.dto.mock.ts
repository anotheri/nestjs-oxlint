import { faker } from '@faker-js/faker';
import { parseEncoded } from '@src/common/typebox';

import { GeneralResponseSchema } from './general-response.dto';
import type { GeneralResponseType } from './general-response.dto';

export const fakeGeneralResponseDto = (): GeneralResponseType =>
  parseEncoded(GeneralResponseSchema, {
    success: faker.datatype.boolean(),
    message: faker.lorem.sentence(),
  });
