import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { APPEARANCE_KEY, applyAppearance, BAR_COLORS, getAppearance, setAppearance } from './theme';

beforeEach(() => {
  document.head.innerHTML =
    '<meta name="theme-color" content="" media="(prefers-color-scheme: light)"><meta name="theme-color" content="" media="(prefers-color-scheme: dark)">';
});

afterEach(() => {
  delete document.documentElement.dataset.theme;
  document.head.innerHTML = '';
});

const bars = () => [...document.querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]')].map((m) => m.content);

describe('appearance', () => {
  it('follows the phone until a choice is made', () => {
    expect(getAppearance()).toBe('auto');
    applyAppearance();
    expect(document.documentElement.dataset.theme).toBeUndefined();
    expect(bars()).toEqual([BAR_COLORS.light, BAR_COLORS.dark]);
  });

  it('remembers Light or Dark and paints the browser bar to match', () => {
    setAppearance('dark');
    expect(localStorage.getItem(APPEARANCE_KEY)).toBe('dark');
    expect(getAppearance()).toBe('dark');
    expect(document.documentElement.dataset.theme).toBe('dark');
    expect(bars()).toEqual([BAR_COLORS.dark, BAR_COLORS.dark]);
    setAppearance('auto');
    expect(document.documentElement.dataset.theme).toBeUndefined();
  });

  it('ignores a saved value it doesn’t know', () => {
    localStorage.setItem(APPEARANCE_KEY, 'purple');
    expect(getAppearance()).toBe('auto');
  });

  it('still changes the colors when storage is blocked', () => {
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('blocked');
    });
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('blocked');
    });
    setAppearance('light');
    expect(document.documentElement.dataset.theme).toBe('light');
    expect(getAppearance()).toBe('auto');
  });
});
