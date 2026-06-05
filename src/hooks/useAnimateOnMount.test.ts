import { staggerItem } from './useAnimateOnMount';

describe('staggerItem', () => {
  it('has hidden state with opacity 0 and y offset', () => {
    expect(staggerItem.hidden).toEqual({ opacity: 0, y: 12 });
  });

  it('has show state with opacity 1 and y 0', () => {
    expect(staggerItem.show).toEqual({
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 24,
      },
    });
  });

  it('uses spring transition', () => {
    expect((staggerItem.show as { transition: { type: string } }).transition.type).toBe('spring');
  });
});
