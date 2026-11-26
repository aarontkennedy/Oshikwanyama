// The About page: what the app is, the book it follows (and its licence), how to install it,
// privacy, and copyright. Keep it in step with LICENSE, docs/LEGAL.md and
// public/THIRD_PARTY_NOTICES.txt.
import { BOOK } from './book';

/** Copyright holder, as named in LICENSE. */
export const OWNER = 'aarontkennedy';
export const YEAR = 2026;
export const FEEDBACK_EMAIL = 'aarontkennedy@gmail.com';

const NOTICES_URL = 'THIRD_PARTY_NOTICES.txt';

const html = `
  <p>A companion to the book <cite>${BOOK.title}</cite>: all twelve chapters, the
  appendices and the Grammar Corners, a quiz for each chapter, and every word searchable.
  No ads, no accounts and no tracking. After your first visit it works without an internet
  connection.</p>

  <h2>The book</h2>
  <p><cite>${BOOK.title}</cite> is by ${BOOK.authors}, who wrote it in ${BOOK.year} while
  teaching in Owambo as volunteers. They made it free for everyone under the
  <a href="${BOOK.licenseUrl}">Creative Commons Attribution-ShareAlike 2.0 licence</a>.</p>
  <p>The chapters in this app are their book, adapted for a phone: laid out for a small
  screen, with the quizzes made from its word lists and tables. The exercises are here to
  practise with a friend; the book’s answers aren’t included. A few small changes are
  noted where they matter, such as the drawings to label, which aren’t included.</p>
  <p>The book thanks, among others, Aaron Cooper and his English class at Elombe JSS for the
  proverbs, translated by Meme Feni Haipinge and Tate Julius Hamunyela (a few are from Paavo
  Hasheela’s <cite>Omishe di dule eyovi</cite>), and Laura Veuve for <cite>Efe nge!</cite></p>

  <h2>Add it to your phone</h2>
  <p>Add the app to your home screen and it opens full screen like any other app,
  without the browser’s address bar.</p>

  <h3>iPhone or iPad</h3>
  <ol>
    <li>Open this page in <b>Safari</b>.</li>
    <li>Tap the <b>Share</b> button: a square with an arrow pointing up. It’s at the
      bottom of the screen on iPhone and at the top on iPad.</li>
    <li>Scroll down and tap <b>Add to Home Screen</b>.</li>
    <li>If you see <b>Open as Web App</b>, make sure it’s switched on.</li>
    <li>Tap <b>Add</b>.</li>
  </ol>

  <h3>Android</h3>
  <ol>
    <li>Open this page in <b>Chrome</b>.</li>
    <li>Tap the menu button: three dots in the top corner.</li>
    <li>Tap <b>Add to home screen</b> or <b>Install app</b>, then <b>Install</b>.</li>
  </ol>
  <p>In Samsung Internet, tap the menu button (three lines), then <b>Add page to</b> and
  <b>Home screen</b>.</p>
  <p>From then on, open it from its icon on your home screen. Open it once while you’re
  online, and after that it works anywhere.</p>
  <p>To send the app to someone else, tap the <b>Share</b> button at the top of the list of
  contents: three dots joined by lines. You can send it by text or email.</p>

  <h2>Feedback</h2>
  <p>Found a mistake, or have a phrase you’d like to learn? Send an email.</p>
  <p><a class="btn" href="mailto:${FEEDBACK_EMAIL}?subject=Oshikwanyama%20feedback">Email feedback</a></p>
  <p>Or write to <b>${FEEDBACK_EMAIL}</b>.</p>

  <h2>Privacy</h2>
  <p>Your settings and best quiz scores are saved only on this device. The app doesn’t
  collect or send anything. Its files are delivered by GitHub Pages, like any website.</p>

  <h2>Copyright and licences</h2>
  <p>The lessons, words, Grammar Corners, proverbs and quizzes are adapted from
  <cite>Hai ti!</cite> &copy; ${BOOK.year} ${BOOK.authors}. This adaptation is shared under the
  <a href="https://creativecommons.org/licenses/by-sa/4.0/">Creative Commons
  Attribution-ShareAlike 4.0 licence</a>: you may copy and adapt it, as long as you credit
  the authors and share your version under the same licence.</p>
  <p>The app itself, its code and design, is &copy; ${YEAR} ${OWNER}. All rights reserved.</p>

  <h2>Third-party software</h2>
  <p>Offline support uses Workbox by Google, under the MIT License.</p>
  <details>
    <summary>Show the license notices</summary>
    <pre data-notices></pre>
  </details>`;

/** Renders the About page into `main`. The license notices load when first opened. */
export function mountAbout(main: HTMLElement): void {
  main.innerHTML = html;
  const details = main.querySelector('details')!;
  const notices = main.querySelector<HTMLElement>('[data-notices]')!;
  let loaded = false;
  details.addEventListener('toggle', async () => {
    if (!details.open || loaded) return;
    notices.textContent = 'Loading…';
    try {
      const res = await fetch(NOTICES_URL);
      if (!res.ok) throw new Error(String(res.status));
      notices.textContent = await res.text();
      loaded = true;
    } catch {
      notices.textContent = 'Couldn’t load the notices. Connect to the internet once and try again.';
    }
  });
}
