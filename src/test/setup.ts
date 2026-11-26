import { afterEach, vi } from 'vitest';

afterEach(() => {
  vi.useRealTimers();
  localStorage.clear();
  document.body.replaceChildren();
  history.replaceState(null, '', '/');
});
