import { expect, describe, it } from 'vitest';

import { durationToSeconds } from './dates';

describe('durationToSeconds', () => {
  it('should convert a duration string with seconds to seconds', () => {
    const result = durationToSeconds('30s');
    expect(result).toBe(30);
  });

  it('should convert a duration string with minutes to seconds', () => {
    const result = durationToSeconds('2m');
    expect(result).toBe(120);
  });

  it('should convert a duration string with hours to seconds', () => {
    const result = durationToSeconds('1h');
    expect(result).toBe(3600);
  });

  it('should convert a duration string with days to seconds', () => {
    const result = durationToSeconds('7d');
    expect(result).toBe(604800);
  });
});
