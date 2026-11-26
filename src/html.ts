// Small helpers for writing pages as HTML strings.

export const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Oshikwanyama text, marked so screen readers and translators know the language (ISO 639-1 "kj"). */
export const osh = (s: string, tag = 'span', cls = '') => `<${tag} lang="kj"${cls ? ` class="${cls}"` : ''}>${esc(s.trim())}</${tag}>`;

/** English text with _underscored_ Oshikwanyama words shown in italics, as in the book. */
export const rich = (s: string) => esc(s).replace(/_([^_]+)_/g, '<em lang="kj">$1</em>');

/** Lets long forms like "Otaa ka/Otava ka" wrap after a slash. */
export const breakable = (s: string) => esc(s.trim()).replace(/\//g, '/<wbr>');

const CHEVRON = '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg>';

export const backLink = (href: string, label: string) =>
  `<header class="topbar"><a class="back" href="${href}">${CHEVRON}<span>${esc(label)}</span></a></header>`;
