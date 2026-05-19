import { describe, expect, it } from 'vitest';

import { calculateMarkup } from '../utils/markup';

describe('calculateMarkup', () => {
  it('applies default 8% markup', () => {
    expect(calculateMarkup(100)).toBe(108);
  });

  it('applies custom markup percentage', () => {
    expect(calculateMarkup(100, 15)).toBe(115);
  });

  it('rounds to two decimals', () => {
    expect(calculateMarkup(19.995, 8)).toBe(21.59);
  });

  it('returns zero for zero price', () => {
    expect(calculateMarkup(0)).toBe(0);
  });
});
