import { getVariant } from './getVariant';

describe('getVariant', () => {
  it('returns "classic" for classic', () => {
    expect(getVariant('classic')).toBe('classic');
  });

  it('returns "minimal" for minimal', () => {
    expect(getVariant('minimal')).toBe('minimal');
  });

  it('returns "modern" for modern', () => {
    expect(getVariant('modern')).toBe('modern');
  });

  it('returns "modern" for executive', () => {
    expect(getVariant('executive')).toBe('modern');
  });

  it('returns "classic" for unknown id', () => {
    expect(getVariant('unknown')).toBe('classic');
  });

  it('returns "classic" for empty string', () => {
    expect(getVariant('')).toBe('classic');
  });
});
