import type { Question } from '../data';
import questions from './questions.json';
import type { Chapter } from './types';

export const ch02: Chapter = {
  id: '2',
  title: 'Onda fya ondjala!',
  english: 'Food, needs and polite requests',
  page: 11,
  questions: questions['2'] as Question[],
  parts: [
    {
      slug: 'needs',
      title: 'Everyday needs',
      blocks: [
        {
          type: 'words',
          rows: [
            ['I’m hungry.', 'Onda fya ondjala.'],
            ['I’m thirsty.', 'Onda fya enota.'],
            ['I’m full.', 'Onda kuta.'],
            ['I’m finished.', 'Onda mana.'],
            ['I’m tired, I want to go to sleep.', 'Onda loloka, onda hala okukofa.'],
            ['Where is the water?', 'Omeva oku li peni?'],
            ['I don’t eat meat.', 'Ihandi li ombelela.'],
            ['I don’t understand...', 'Kandi udite ko...'],
            ['I’m ... What’s your name?', 'Aame ... Oove lye?'],
            ['The food is very good!', 'Oikulya inyenye! / Oikulya iwa'],
            ['Thank you very much.', 'Tangi unene.'],
            ['Where is the latrine?', 'Okandjuwo oke li peni?'],
          ],
        },
        {
          type: 'words',
          rows: [
            ['I need ...', 'Onda pumbwa ...'],
            ['I want ... (polite)', 'Onda hala ...'],
            ['May I have ... (very polite)', 'Kwafe nge / Kwafele nge ...'],
            ['Give me ... (informal)', 'Pe nge ...'],
            ['Water', 'Omeva (often “omeya”)'],
            ['Basin', 'Oshiyaxa'],
            ['To sleep', 'Okukofa'],
            ['To eat', 'Okulya'],
            ['To bathe', 'Okulikosha'],
            ['Body soap', 'Ofewa (yokulikosha)'],
            ['Candle', 'Okalexita'],
            ['Cup', 'Okakopi'],
            ['Beer', 'Obiila'],
            ['Help (noun)', 'Ekwafo'],
            ['Key', 'Oshapi / Oshipatululo'],
            ['And / With', 'Na'],
            ['Also / Still / Again', 'Natango'],
            ['Or', 'Ile'],
            ['I don’t know', 'Kandi shi shii'],
          ],
        },
        {
          type: 'practice',
          title: 'Exercise 1',
          instruction: 'Translate the following requests into Oshikwanyama.',
          example: 'I want to eat meat → Onda hala okulya ombelela',
          items: [
            'I need a candle.',
            'I want to sleep.',
            'May I have a cup?',
            'I want to bathe. I need water, a basin, and body soap.',
            'I am hungry, I want to eat.',
            'I need a beer.',
          ],
        },
        {
          type: 'tip',
          title: 'Quick Tips',
          blocks: [
            {
              type: 'list',
              items: [
                'There are no articles (a, an, the) in Oshikwanyama.',
                'There is no literal translation for “please” in Oshikwanyama. To express politeness, put _kwafe nge_ or _kwafelenge_ (“help me / help for me”) before what you want to say.',
                '_Alikana_, a word commonly translated as “please”, adds a sense of urgency or exasperation to a request.',
              ],
            },
          ],
        },
        {
          type: 'proverb',
          oshikwanyama: 'Kape na okadila ihaka tilyana komulungu.',
          english: 'There is no bird that never gets ripe fruit on its lips.',
          meaning: 'Everyone is served [someday/somehow]. [Where’s mine?]',
        },
      ],
    },
  ],
};
