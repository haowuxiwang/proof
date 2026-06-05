import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useAutoSave } from './useAutoSave';

describe('useAutoSave', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('calls saveToLocalStorage periodically', () => {
    const setItemSpy = vi.fn();
    vi.stubGlobal('localStorage', {
      getItem: vi.fn(),
      setItem: setItemSpy,
      removeItem: vi.fn(),
      clear: vi.fn(),
      length: 0,
      key: vi.fn(),
    });

    renderHook(() => useAutoSave(5000));

    // Should not have called yet
    expect(setItemSpy).not.toHaveBeenCalled();

    // Fast-forward past the interval
    vi.advanceTimersByTime(6000);

    // saveToLocalStorage calls setItem twice (resume + template)
    expect(setItemSpy).toHaveBeenCalled();
  });

  it('registers beforeunload handler', () => {
    const addEventListenerSpy = vi.spyOn(window, 'addEventListener');

    renderHook(() => useAutoSave(5000));

    expect(addEventListenerSpy).toHaveBeenCalledWith('beforeunload', expect.any(Function));
  });
});
