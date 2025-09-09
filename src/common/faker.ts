import { faker } from '@faker-js/faker';

export const maybe = (obj: Record<string, unknown>) =>
  faker.helpers.maybe(() => obj, { probability: 0.5 });

export const maybeArray = <T>(
  fn: () => T,
  options: { count?: number; probability?: number } = {},
): T[] | undefined =>
  faker.helpers.maybe(
    () => {
      return faker.helpers.multiple(fn, {
        count: options.count ?? faker.number.int({ min: 1, max: 4 }),
      });
    },
    { probability: options.probability ?? 0.5 },
  );
