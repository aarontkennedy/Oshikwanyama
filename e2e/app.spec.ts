import { expect, test } from '@playwright/test';

const noSideways = (page: import('@playwright/test').Page) => page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);

test('reads a chapter, jumps to a Grammar Corner, and takes its quiz to the end', async ({ page }) => {
  await page.goto('./');
  await expect(page.getByRole('heading', { name: 'Oshikwanyama' })).toBeVisible();
  await page.getByRole('link', { name: /Owa dja peni\?/ }).click();
  await expect(page.getByRole('heading', { name: 'Grammar Corner Verbs' })).toBeAttached();
  await page.getByRole('button', { name: 'Grammar: Verbs' }).click();
  await expect(page.getByRole('heading', { name: 'Grammar Corner Verbs' })).toBeInViewport();
  await page.getByText('Practice: Exercise 1').click();
  await expect(page.getByText('I will sleep.')).toBeVisible();

  await page.getByRole('link', { name: 'Start the quiz' }).click();
  const total = Number((await page.locator('.progress-text').textContent())!.match(/of (\d+)/)![1]);
  for (let i = 0; i < total; i++) {
    const instruction = (await page.locator('.instruction').textContent())!;
    if (instruction.startsWith('Choose')) await page.locator('.option').first().click();
    else if (instruction.startsWith('Type')) await page.locator('[data-input]').fill('something');
    else if (instruction.startsWith('Tap')) {
      const words = await page.locator('[data-word]').count();
      for (let w = 0; w < words; w++) {
        await page.locator(`[data-word="${w}"]`).click();
        await page.locator(`[data-meaning="${w}"]`).click();
      }
    }
    if (!instruction.startsWith('Tap')) await page.getByRole('button', { name: 'Check' }).click();
    await expect(page.locator('[data-feedback]')).not.toBeEmpty();
    expect(await noSideways(page)).toBeLessThanOrEqual(0);
    await page.getByRole('button', { name: i === total - 1 ? 'See your score' : 'Next' }).click();
  }
  await expect(page.getByRole('heading', { name: new RegExp(`You got \\d+ of ${total} right`) })).toBeVisible();
  await page.getByRole('link', { name: 'Contents' }).click();
  await expect(page.locator('.card-best').first()).toContainText('Best quiz score');
});

test('every page fits the phone screen without sideways scrolling', async ({ page }) => {
  await page.goto('./');
  expect(await noSideways(page), 'contents').toBeLessThanOrEqual(0);
  const links = await page.locator('.cards a').evaluateAll((els) => els.map((e) => e.getAttribute('href')!));
  for (const href of [...links, '#/reference', '#/settings', '#/about']) {
    await page.goto(`./${href}`);
    await expect(page.locator('main')).toBeVisible();
    expect(await noSideways(page), href).toBeLessThanOrEqual(0);
  }
});

test('searches all the words', async ({ page }) => {
  await page.goto('./#/words');
  await page.getByRole('searchbox', { name: 'Search the words' }).fill('grandmother');
  await expect(page.locator('[data-count]')).toHaveText('1 match');
  await page.getByRole('link', { name: /Me\(m\)ekulu/ }).click();
  await expect(page.getByRole('heading', { name: 'Ovaneumbo vange' })).toBeVisible();
});

test('the quiz button stays on screen while a long chapter scrolls', async ({ page }) => {
  await page.goto('./#/chapter/1');
  const button = page.getByRole('link', { name: 'Start the quiz' });
  await expect(button).toBeInViewport();
  await page.evaluate(() => window.scrollTo(0, 3000));
  await expect(button).toBeInViewport();
});

test('Share offers text and email when the browser has no share sheet', async ({ page }) => {
  await page.addInitScript(() => {
    delete (Navigator.prototype as { share?: unknown }).share;
  });
  await page.goto('./');
  await page.getByRole('button', { name: 'Share' }).click();
  await expect(page.getByRole('link', { name: 'Send a text' })).toHaveAttribute('href', /^sms:\?&body=/);
  await expect(page.getByRole('link', { name: 'Send an email' })).toHaveAttribute('href', /^mailto:/);
});
