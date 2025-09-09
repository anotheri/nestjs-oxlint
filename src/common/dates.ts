import dayjs from 'dayjs';

import utc from 'dayjs/plugin/utc';
import duration from 'dayjs/plugin/duration';
import type { DurationUnitType } from 'dayjs/plugin/duration';

// import relativeTime from 'dayjs/plugin/relativeTime';
// import isoWeek from 'dayjs/plugin/isoWeek';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';

// NOTE: using require here is a hack to fix dayjs in both nestjs app and vitest tests
dayjs.extend(utc);
dayjs.extend(duration);
// dayjs.extend(relativeTime);
// dayjs.extend(isoWeek);
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

export type { Dayjs } from 'dayjs';
export type { DurationUnitType } from 'dayjs/plugin/duration';

export default dayjs;

/**
 * Converts a duration string to seconds.
 * @param value - The duration string to convert.
 * @returns The duration in seconds.
 * @example
 * durationToSeconds('1h'); // -> 3600
 * durationToSeconds('15m'); // -> 900
 */
export function durationToSeconds(value: string): number {
  const reDurationStr = /(\d+)(\w+)/;
  const durParams = reDurationStr.exec(value);

  if (durParams) {
    const [, val, unit] = durParams;
    if (val && unit) {
      return dayjs.duration(+val, unit as DurationUnitType).asSeconds();
    }
  }

  return 0;
}
