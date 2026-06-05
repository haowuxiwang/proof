import '@testing-library/jest-dom/vitest'

// Mock window.matchMedia for sonner and other libraries
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

// Mock URL.createObjectURL/revokeObjectURL for jsdom
if (!URL.createObjectURL) {
  URL.createObjectURL = vi.fn(() => 'blob:mock');
}
if (!URL.revokeObjectURL) {
  URL.revokeObjectURL = vi.fn();
}

// Mock ResizeObserver for Radix UI components
if (!globalThis.ResizeObserver) {
  globalThis.ResizeObserver = class ResizeObserver {
    observe = vi.fn();
    unobserve = vi.fn();
    disconnect = vi.fn();
  };
}

// Mock Element.animate for @formkit/auto-animate (jsdom doesn't support Web Animations API)
if (!Element.prototype.animate) {
  Element.prototype.animate = vi.fn(() => ({
    finished: Promise.resolve(),
    cancel: vi.fn(),
    finish: vi.fn(),
    pause: vi.fn(),
    play: vi.fn(),
    reverse: vi.fn(),
    updatePlaybackRate: vi.fn(),
    commitStyles: vi.fn(),
    persist: vi.fn(),
    currentTime: 0,
    playbackRate: 1,
    playState: 'finished' as AnimationPlayState,
    replaceState: 'active' as AnimationReplaceState,
    pending: false,
    startTime: null,
    timeline: null,
    effect: null,
    oncancel: null,
    onfinish: null,
    onremove: null,
    id: '',
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  } as unknown as Animation));
}
