// Sharing the app: the phone's share sheet (texts, email, anything else), or plain text
// and email links where there's no share sheet. Nothing is sent by the app itself.

export const SHARE_TITLE = 'Oshikwanyama';
export const SHARE_TEXT = 'Learn Oshikwanyama on your phone with the Hai ti! beginner’s guide: every chapter, with quizzes. No ads or accounts, and it works offline.';
const EMAIL_SUBJECT = 'An Oshikwanyama app for your phone';

/** The app's address, without any chapter in the URL. */
export const appUrl = (): string => location.origin + location.pathname;

/** Ready-made links that open a new text message or email with the app's address filled in. */
export function shareLinks(url = appUrl()): { text: string; email: string } {
  const body = encodeURIComponent(`${SHARE_TEXT} ${url}`);
  return {
    text: `sms:?&body=${body}`, // "?&" works with both iPhone and Android messaging apps
    email: `mailto:?subject=${encodeURIComponent(EMAIL_SUBJECT)}&body=${body}`,
  };
}

/**
 * Opens the phone's share sheet. Returns false when there isn't one, so the caller can
 * offer the text and email links instead. Closing the sheet without sharing is fine.
 */
export async function openShareSheet(url = appUrl()): Promise<boolean> {
  if (typeof navigator.share !== 'function') return false;
  try {
    await navigator.share({ title: SHARE_TITLE, text: SHARE_TEXT, url });
  } catch {
    // The person closed the share sheet, or the browser refused: nothing to do.
  }
  return true;
}
