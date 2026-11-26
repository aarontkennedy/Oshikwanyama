import { describe, expect, it, vi } from 'vitest';
import { bestScore, PROGRESS_KEY, saveScore } from './progress';

describe('best quiz scores', () => {
  it('starts with none', () => {
    expect(bestScore('1')).toBeUndefined();
  });

  it('keeps the best score for each lesson', () => {
    expect(saveScore('1', { correct: 5, total: 10 })).toBe(true);
    expect(saveScore('1', { correct: 4, total: 10 })).toBe(false);
    expect(saveScore('1', { correct: 5, total: 10 })).toBe(false);
    expect(bestScore('1')).toEqual({ correct: 5, total: 10 });
    expect(saveScore('1', { correct: 7, total: 7 })).toBe(true);
    expect(saveScore('2', { correct: 1, total: 10 })).toBe(true);
    expect(bestScore('1')).toEqual({ correct: 7, total: 7 });
    expect(bestScore('2')).toEqual({ correct: 1, total: 10 });
  });

  it('ignores saved data it can’t read', () => {
    localStorage.setItem(PROGRESS_KEY, 'not json');
    expect(bestScore('1')).toBeUndefined();
    localStorage.setItem(PROGRESS_KEY, 'null');
    expect(bestScore('1')).toBeUndefined();
    localStorage.setItem(PROGRESS_KEY, '{"1": {"correct": "lots"}}');
    expect(bestScore('1')).toBeUndefined();
  });

  it('carries on when storage is blocked', () => {
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('blocked');
    });
    expect(saveScore('1', { correct: 3, total: 10 })).toBe(true);
  });
});
