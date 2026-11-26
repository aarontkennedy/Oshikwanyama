// Design rules that can be checked by reading the stylesheet (docs/DESIGN.md).
import { describe, expect, it } from 'vitest';
import css from './style.css?raw';

describe('readable text', () => {
  it('sets no font size under 18px', () => {
    const sizes = [...css.matchAll(/font-size:\s*(\d+)px/g)].map((m) => Number(m[1]));
    expect(sizes.every((s) => s >= 18)).toBe(true);
    expect(css).toMatch(/--text-sm: 18px/);
  });

  it('makes every button at least a thumb tall', () => {
    expect(css).toMatch(/--tap: 44px/);
    for (const name of ['btn', 'option,\n.tile', 'segmented button', 'link-card', 'text-answer', 'toc-link,\n.link-row', 'practice summary', 'where', 'word-list a']) {
      const block = css.match(new RegExp(`\\.${name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')} \\{[^}]*\\}`))?.[0];
      expect(block, name).toMatch(/min-height: (var\(--tap\)|calc\(var\(--tap\))/);
    }
    expect(css).toMatch(/\.move \{[^}]*height: var\(--tap\)/);
  });
});
