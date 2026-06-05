import { describe, it, expect } from 'vitest';
import { formatDate } from './formatDate';

describe('formatDate', () => {
  it('formats YYYY-MM to YYYY.MM', () => {
    expect(formatDate('2024-01')).toBe('2024.01');
  });

  it('returns empty string for empty input', () => {
    expect(formatDate('')).toBe('');
  });

  it('handles full date string', () => {
    expect(formatDate('2023-12')).toBe('2023.12');
  });
});
