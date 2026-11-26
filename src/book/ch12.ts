import type { Chapter } from './types';

export const ch12: Chapter = {
  id: '12',
  title: 'mOshiwambo!',
  english: 'In Oshiwambo! Other dialects',
  page: 71,
  parts: [
    {
      slug: 'visit',
      title: 'A visit',
      blocks: [
        {
          type: 'dialogue',
          lines: [
            ['A', 'Oove lye hano, mumati wange?'],
            ['B', 'Ngame Pandu ya Shiwedha. Edhina lyoye olye?'],
            ['A', 'Aame Meekulu Nelao. Owa dja peni, Pandu?'],
            ['B', 'Onda dja kElombe.'],
            ['A', 'Ooh, kElombe koNdonga! Oku li nawa?'],
            ['B', 'Heeno, oku li nawa.'],
            ['A', 'Neengobe, odi li nawa?'],
            ['B', 'Ee-ee, oongombe odhi li nawa.'],
            ['A', 'Nounona?'],
            ['B', 'Eeno, uunona owu li nawa.'],
            ['A', 'Oto ningi shike mouKwanyama?'],
            ['B', 'Otandi longo osikola.'],
            ['A', 'Ooh, ove omulongifikola... Owa tambulwa nawa momukunda wetu.'],
            ['B', 'Iyaloo, Kuku.'],
            ['A', 'Natu lyeni oikulya yoshikwanyama...oshifima nevanda. Natango ope na ombelela yoxuxwa.'],
            ['B', 'Ooh, ekaka nonyama yondjuhwa! Iikulya iiwanawa! Onda panda, Kuku!'],
          ],
        },
      ],
    },
    {
      slug: 'oshiwambo',
      title: 'Oshiwambo',
      grammar: true,
      blocks: [
        {
          type: 'text',
          text: 'As you probably noticed, the teacher and the meekulu in the above dialogue are not speaking exactly the same language. The meekulu is speaking Oshikwanyama, while the teacher, who comes from Elombe, speaks Oshindonga. Because these native speakers can understand each other, we can think of both Oshikwanyama and Oshindonga as dialects of the Oshiwambo language. Seven different dialects of Oshiwambo are spoken in Namibia: Oshikwanyama, Oshindonga, Oshikolonkadhi, Oshimbalantu, Oshikwaluudhi, Oshingangera, and Oshikwambi. Only Oshikwanyama and Oshindonga have standard written forms and are taught as subjects in schools.',
        },
        {
          type: 'text',
          text: 'Oshiwambo is a relative newcomer to Namibia. Records of Khoisan speakers dating almost as far back as 30 000 BC have been found in southern Africa. The Khoisan family of languages is best known for its unique “click” sounds. Oshiwambo, on the other hand, is a member of the Bantu language family, which originated around what is now Nigeria. Speakers of proto-Bantu began migrating in search of better farmland five thousand years ago, and arrived in Namibia around 1000 BC. The most widely-spoken languages in Southern and East Africa developed from proto-Bantu, among them Swahili in Kenya and Tanzania, Shona in Zimbabwe, and Zulu in South Africa.',
        },
        {
          type: 'text',
          text: 'The Oshiwambo dialects have many differences, but native speakers understand all of them without much difficulty. When you speak to people, especially young people, you will most likely hear a mixture of dialects.',
        },
        {
          type: 'text',
          text: 'After learning a few key patterns and words, you will begin to understand other dialects of Oshiwambo, too. For example, _f_ in Oshikwanyama becomes _th_ in Oshindonga. Thus, Aandonga eat _oshithima_, while Ovakwanyama sup on _oshifima_. A few of the more common substitutions are listed in the table below.',
        },
        {
          type: 'table',
          head: ['Oshikwanyama', 'Oshindonga', 'Oshikwambi'],
          rows: [
            ['sh – oshi li nawa', 'sh', 'tsh'],
            ['d – edina', 'dh', 'dh'],
            ['-nge – kwafe nge', 'ndje', '-nge'],
            ['nothing – omaongo', 'g – omagongo', 'g'],
            ['d – omalodu', 'v', 'v'],
            ['x/sh – oxjuxwa', 'deep h', 'sh'],
          ],
        },
        {
          type: 'text',
          text: 'The structure of the noun classes is the same, but some of the prefixes and object pronouns are different. It is useful to familiarize yourself with them. Readers especially interested in Oshindonga should see the companion to this book, _Te ti!_',
        },
        {
          type: 'song',
          title: 'Okanona kameme (mOshindonga)',
          note: 'Okwiimba: the same song in Oshindonga and in Oshikwanyama.',
          verses: [
            ['Okanona ka meme', 'Egumbo olyo ndyo', 'Ohandi zi po paife', 'Takamitha ayihe'],
            ['Egumbo, egumbo', 'Egumbo olyo ndyo', 'Ohandi zi po paife', 'Takamitha ayihe'],
          ],
        },
        {
          type: 'song',
          title: 'Okaana kameme (mOshikwanyama)',
          verses: [
            ['Okaana ka meme', 'Eumbo olo lo', 'Ohai di po paife', 'Takamifa aishe'],
            ['Eumbo, eumbo', 'Eumbo olo lo', 'Ohai di po paife', 'Takamifa aishe'],
          ],
        },
        {
          type: 'song',
          title: 'Owambo',
          verses: [
            ['Twa dja kokule', 'Kedi lomatale', 'Twe ya kuoove Owambo'],
            ['Wambo yetu wambo yetu', 'Twe ya kuoove Owambo'],
            ['Mu na Ovandonga', 'Mu na Ovakwanyama', 'Twe ya kuoove Owambo'],
            ['Mu na Ovakwambi', 'Mu na Ovangangera', 'Twe ya kuoove Owambo'],
            ['Mu na Ovakwaluudhi', 'Mu na Ovambalantu', 'Twe ya kuoove Owambo'],
            ['Mu na Ovakolonkadhi', 'Mu na Ovandonga', 'Twe ya kuoove Owambo'],
          ],
        },
        {
          type: 'proverb',
          oshikwanyama: 'Lumosho lilonga manga lulyo e li po.',
          english: 'The left hand learns while the right exists.',
          meaning: 'Learn from your elders while they are still around.',
        },
      ],
    },
    {
      slug: 'making-it-simple',
      title: 'Making It Simple',
      grammar: true,
      blocks: [
        {
          type: 'text',
          text: 'Let’s face it: noun classes make learning Oshikwanyama difficult. Not only do you have to recognize the existence of fourteen different kinds of nouns, but you also have to remember fourteen different kinds of possessives, numbers, subject concords, object pronouns, demonstratives, and adjective formations. Ough, Meme. What the Oshiwambo student needs is a mental structure, like a filing cabinet, in which to store all of these linguistic odds and ends. This final grammar corner offers one such model; yours will undoubtedly be different.',
        },
        { type: 'text', text: 'Let us recall the different object pronouns:' },
        {
          type: 'table',
          head: ['Noun Class', 'Examples', 'Object Pronoun'],
          rows: [
            ['omu', 'omunhu', 'mu'],
            ['ova-', 'ovalongi, ovalongi', 'va'],
            ['omu- (not people)', 'omuti, omulongo', 'u'],
            ['omi-', 'omiti, omilunga', 'di'],
            ['e-', 'etango, efimbo', 'li'],
            ['oma-', 'omafimbo, omeva', 'a'],
            ['oshi-', 'oshikombo, oshifima', 'shi'],
            ['oi-', 'oikulya, oikombo', 'i'],
            ['olu-', 'olukaku, olutu', 'lu'],
            ['oka-', 'okaana, okayaxa', 'ka'],
            ['ou- (plural)', 'ounona, ouyaxa', 'va'],
            ['ou- (singular)', 'oufiku, oupyu', 'u'],
            ['oku-', 'okutwi', 'ku'],
            ['o-', 'ongobe', 'i'],
            ['ee-', 'eengobe', 'di'],
          ],
        },
        {
          type: 'text',
          text: 'While it might not be easy to memorize 150 things, a list of 15 is possible. From this list one is able to derive all of the rest, albeit with quite a number of rules. The rules read as complicated, but with a little time and practice, will become natural for you. However, people and their nouns resist derivation and so must be memorized.',
        },
        { type: 'heading', text: 'Possessives' },
        {
          type: 'text',
          text: 'The object pronoun is essentially the prefix for possessives. Drop the final _i_, unless the _i_ is by itself. In that case, change it to _y_. Change a final _u_ to a _w_ (say _ua_ and you’ll see why).',
        },
        {
          type: 'examples',
          rows: [
            ['my child', 'okaana ka+ange → okaana kange'],
            ['our time', 'efimbo li→ly+etu → ethimbo lyetu'],
            ['your ear', 'okutwi ku→kw+oye → okutwi kwoye'],
            ['their goats', 'oikombo + i→y+avo → oikombo yavo'],
          ],
        },
        { type: 'heading', text: 'Numbers' },
        { type: 'text', text: 'For groups with prefixes _o-_, _ee-_, and _omi-_, the numbers have no prefixes. For the other ones, the object pronoun is the prefix.' },
        {
          type: 'examples',
          rows: [
            ['eight cows', 'eengobe *+hetatu → eengobe hetatu (often eengobe di li hetatu)'],
            ['seven children', 'ounona va+heyali → ounona vaheyali'],
            ['six goats', 'oikombo i+hamano → oikombo ihamano'],
          ],
        },
        { type: 'heading', text: 'Subject concords: present action' },
        {
          type: 'text',
          text: 'In most cases, subject concords are formed by putting _ota-_ before the object pronoun. The negative is the same as the positive, but with _ita-_ instead of _ota-_.',
        },
        {
          type: 'examples',
          from: 'both',
          rows: [
            ['Eengobe ota+di', 'Eengobe otadi...'],
            ['Oikombo ota+i', 'Oikombo otai...'],
            ['Okaana ita+ka', 'Okaana itaka...'],
          ],
        },
        { type: 'heading', text: 'Subject concords: past action' },
        {
          type: 'text',
          text: 'Add _o-_ to the object pronoun. Drop the final _i_, unless it is by itself – then change it to _y_. Change _u_ to _w_. Add an _-a_ to the end if there is not already one in the object pronoun. The negative is just the object pronoun with a prefix of _ina-_ (no changes).',
        },
        {
          type: 'examples',
          from: 'both',
          rows: [
            ['Okaana o+ka', 'Okaana oka...'],
            ['Okaana ina+ka', 'Okanona inaka...'],
            ['Eengobe (o+di+a→oda)', 'Eengobe oda...'],
            ['Eengobe ina+di', 'Eengobe inadi...'],
            ['ikombo (o+i→y+a)→oya', 'Oikombo oya'],
          ],
        },
        { type: 'heading', text: 'Subject concords: future action' },
        { type: 'text', text: 'Add _ka_ to the end of the present subject concord, as a separate word.' },
        {
          type: 'examples',
          from: 'both',
          rows: [
            ['Oikombo otai + ka', 'Oikombo otai ka...'],
            ['Ovalongi otava + ka', 'Ovalongi otava ka...'],
          ],
        },
        { type: 'heading', text: 'Subject concords: present stative' },
        {
          type: 'text',
          text: 'Add _o-_ to the object pronoun. If the last letter is _a_, change it to _e_. The negative is the same as the positive, except with _ka-_ rather than _o-_. Again, _oma-_ is a special case (_oku_, _kaa_)',
        },
        {
          type: 'examples',
          from: 'both',
          rows: [
            ['Etango o+li', 'Etango oli...'],
            ['Okayaxa (o+ka→ke)', 'Okayaxa oke...'],
            ['Oshifima ka+shi', 'Oshifima kashi...'],
            ['Omeva oku', 'Omeva oku... (Sometimes ome...)'],
          ],
        },
        { type: 'heading', text: 'Subject concords: past stative' },
        {
          type: 'text',
          text: 'Take the past tense action subject concord (positive or negative) and add _li_ as a separate word. Then add on, as a separate word again, the positive past action subject concord, without the initial _o-_.',
        },
        {
          type: 'examples',
          from: 'both',
          rows: [
            ['Oshikombo osha + li + (oshi→shi)', 'Oshikombo osha li shi...'],
            ['Ounona ova + li + (ove→ve)', 'Ounona ova li ve...'],
            ['Oikulya inai + li + (oi→i)', 'Oikulya inai li i....'],
          ],
        },
        { type: 'heading', text: 'Demonstrative prefixes' },
        {
          type: 'text',
          text: 'For “this”: Add _a-_ to the beginning of object pronouns that end in _-a_, _o-_ to pronouns that end in _-u_, and _e-_ to those that end in _-i_.',
        },
        {
          type: 'examples',
          rows: [
            ['this porridge', 'oshifima e+shi → oshifima eshi'],
            ['these people', 'ovanhu a+va → ovanhu ava'],
          ],
        },
        { type: 'text', text: 'For “that”: Add an _o_ at the beginning and end, dropping the final vowel. Drop _-i_ or change it to _y_.' },
        {
          type: 'examples',
          rows: [
            ['that house', 'o+li+o → eumbo olo'],
            ['those children', 'ounona o+va+o → ounona ovo'],
            ['that cow', 'ongobe o+i→y+o → ongobe oyo'],
          ],
        },
        { type: 'text', text: 'For “yonder”: Just add _-nya_ / _-inya_, changing _a_ to _e_.' },
        {
          type: 'examples',
          rows: [
            ['yonder trees', 'omiti di+nya → omiti dinya'],
            ['yonder folk', 'ovanhu va→ve+nya → ovanhu venya'],
          ],
        },
        { type: 'heading', text: 'Adjective formation' },
        {
          type: 'text',
          text: 'The adjective prefixes are the object concords, except the “concrete adjectives” which use the possessive prefix. Again, _oma-_ is a special case (_ma-_)',
        },
        {
          type: 'examples',
          rows: [
            ['stupid cow', 'ongobe i+lai → ongobe ilai'],
            ['small children', 'ounona va+shona → ounona vashona'],
            ['bedroom', 'onduda y+okunangala → onduda yokunangala'],
          ],
        },
      ],
    },
    {
      slug: 'further-reading',
      title: 'Further Reading',
      grammar: true,
      blocks: [
        {
          type: 'text',
          text: 'There are actually quite a number of books out about Oshiwambo, although none of them with the sparkling wit of the present one. Listed below are those we found to be most useful and/or in print. Most can be purchased in The Bookstore in Oshakati. We frequently consulted these books as we wrote this guide.',
        },
        {
          type: 'text',
          text: 'This list dates from 2004, when the book was written.',
        },
        { type: 'heading', text: 'Grammars' },
        {
          type: 'list',
          items: [
            'The Yellow Book: Zimmerman (W.) & Hasheela (P.) _Oshikwanyama Grammar_. Windhoek: Gamsberg Macmillan, 1998. This slim volume has lots of useful, fascinating, and relatively readable information about the language and its grammar. However, as it was written more as a reference for linguists than a language guide, its organization does not always behoove beginning learners, and has been compared to a novel of the choose-your-own-adventure variety.',
            'The Green Book: Fivaz (D.) & Shikomba (S.) _A Reference Grammar of Oshindonga_. Second revised edition, Windhoek: Academy, (1986) 2003. The only comprehensive Oshindonga grammar in English, this pithy tome is ideal for the budding linguist, or the died-in-the-wool masochist.',
          ],
        },
        { type: 'heading', text: 'Dictionaries' },
        {
          type: 'text',
          text: 'Unfortunately, the easiest to find are for Oshindonga. But because the languages are so similar, they can still be useful for you, with a little help from your Kwanyama-speaking friends.',
        },
        {
          type: 'list',
          items: [
            'The ELCIN Dictionaries: _English-Ndonga Dictionary_. Compiled by ELCIN Church Council Special Committees Resolution 292/92. Ondangwa: ELCIN Printing Press, 1996. Tirronen (T.) _Ndonga-English Dictionary_. Ondangwa: ELCIN, 1986. A bit outdated – most people don’t have drawing-rooms these days, for instance – but still the most comprehensive.',
            'The Bilingual Dictionary: Viljoen (J.J.), Amakali (P.) & Namuandi (M.) _Oshindonga/English English/Oshindonga Embwiitya Dictionary_. Windhoek: Gamsberg Macmillan, (1984) 2001. A great resource for learners of both Oshindonga and English, this abridged dictionary contains most of the basic words you’ll need in everyday Oshikwanyama. Plus, it goes both ways, so you can look up both words you’ve heard and words you’d really like to know. There is also a short grammar reference in the front.',
          ],
        },
        { type: 'heading', text: 'Grade School Texts' },
        {
          type: 'text',
          text: 'These can often be found in school storerooms. Although they are all in Oshiwambo, they are easy enough to be useful for the intermediate and advanced students.',
        },
      ],
    },
  ],
};
