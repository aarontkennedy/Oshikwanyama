import { afterEach, describe, expect, it, vi } from 'vitest';
import { SHARE_TEXT, SHARE_TITLE, appUrl, openShareSheet, shareLinks } from './share';

afterEach(() => {
  Reflect.deleteProperty(navigator, 'share');
});

describe('sharing', () => {
  it('shares the app’s address without the lesson in the URL', () => {
    history.replaceState(null, '', '/Oshikwanyama/#/lesson/2');
    expect(appUrl()).toBe(`${location.origin}/Oshikwanyama/`);
  });

  it('builds text and email links with the message and address filled in', () => {
    const { text, email } = shareLinks('https://example.com/Oshikwanyama/');
    const body = encodeURIComponent(`${SHARE_TEXT} https://example.com/Oshikwanyama/`);
    expect(text).toBe(`sms:?&body=${body}`);
    expect(email).toBe(`mailto:?subject=${encodeURIComponent('An Oshikwanyama app for your phone')}&body=${body}`);
  });

  it('opens the share sheet when there is one', async () => {
    const share = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'share', { configurable: true, value: share });
    expect(await openShareSheet('https://example.com/')).toBe(true);
    expect(share).toHaveBeenCalledWith({ title: SHARE_TITLE, text: SHARE_TEXT, url: 'https://example.com/' });
  });

  it('is fine when the share sheet is closed without sharing', async () => {
    const share = vi.fn().mockRejectedValue(new DOMException('Cancelled', 'AbortError'));
    Object.defineProperty(navigator, 'share', { configurable: true, value: share });
    expect(await openShareSheet()).toBe(true);
  });

  it('reports when there is no share sheet', async () => {
    expect(await openShareSheet()).toBe(false);
  });
});
