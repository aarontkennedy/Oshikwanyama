import { afterEach, describe, expect, it, vi } from 'vitest';
import { FEEDBACK_EMAIL, mountAbout, OWNER } from './about';

afterEach(() => vi.unstubAllGlobals());

const mount = () => {
  const main = document.createElement('main');
  mountAbout(main);
  return main;
};

const open = async (main: HTMLElement) => {
  const details = main.querySelector('details')!;
  details.open = true;
  details.dispatchEvent(new Event('toggle'));
  await vi.waitFor(() => expect(main.querySelector('[data-notices]')!.textContent).not.toBe('Loading…'));
};

describe('the About page', () => {
  it('covers installing, feedback, privacy and copyright', () => {
    const main = mount();
    const headings = [...main.querySelectorAll('h2')].map((h) => h.textContent);
    expect(headings).toEqual(['The book', 'Add it to your phone', 'Feedback', 'Privacy', 'Copyright and licences', 'Third-party software']);
    expect(main.textContent).toContain(`© 2026 ${OWNER}`);
    expect(main.querySelector<HTMLAnchorElement>('a.btn')!.href).toBe(`mailto:${FEEDBACK_EMAIL}?subject=Oshikwanyama%20feedback`);
  });

  it('loads the license notices once, when opened', async () => {
    const fetch = vi.fn().mockResolvedValue({ ok: true, text: () => Promise.resolve('MIT License') });
    vi.stubGlobal('fetch', fetch);
    const main = mount();
    await open(main);
    expect(main.querySelector('[data-notices]')!.textContent).toBe('MIT License');
    await open(main);
    expect(fetch).toHaveBeenCalledOnce();
    // Closing it doesn't load anything.
    const details = main.querySelector('details')!;
    details.open = false;
    details.dispatchEvent(new Event('toggle'));
    expect(fetch).toHaveBeenCalledOnce();
  });

  it('says so when the notices can’t load', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, status: 404 }));
    const main = mount();
    await open(main);
    expect(main.querySelector('[data-notices]')!.textContent).toContain('Couldn’t load the notices');
  });
});
