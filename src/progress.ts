// Each chapter’s best quiz score, saved on this phone only.

export const PROGRESS_KEY = 'oshikwanyama:best';

export interface Score {
  correct: number;
  total: number;
}

function load(): Record<string, Score> {
  try {
    const saved = JSON.parse(localStorage.getItem(PROGRESS_KEY) ?? '{}');
    return saved && typeof saved === 'object' ? saved : {};
  } catch {
    return {};
  }
}

export function bestScore(chapterId: string): Score | undefined {
  const s = load()[chapterId];
  return s && Number.isFinite(s.correct) && Number.isFinite(s.total) ? s : undefined;
}

/** Saves a finished quiz's score if it's the best yet. Returns whether it was. */
export function saveScore(chapterId: string, score: Score): boolean {
  const best = bestScore(chapterId);
  if (best && best.correct / best.total >= score.correct / score.total) return false;
  try {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify({ ...load(), [chapterId]: score }));
  } catch {
    // Private browsing: the score lasts until the page closes.
  }
  return true;
}
