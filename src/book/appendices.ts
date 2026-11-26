import type { Chapter } from './types';

export const appendixA: Chapter = {
  id: 'a',
  title: 'mOngulu',
  english: 'In the classroom',
  page: 79,
  parts: [
    {
      slug: 'classroom',
      title: 'In the classroom',
      blocks: [
        {
          type: 'words',
          rows: [
            ['Chalkboard', 'Oshipelende'],
            ['Chalk', 'Omya'],
            ['Pen', 'Opena'],
            ['Pencil', 'Opena yekala'],
            ['Paper', 'Ombapila'],
            ['Book', 'Embo'],
            ['Exam', 'Ekonaakono'],
            ['Report / Certificate', 'Odjapo'],
            ['Workshop', 'Oshihongiilonga / Owekshopa'],
            ['Science (esp. Physical Science)', 'Ounongononi'],
            ['Mathematics', 'Omwaalu'],
            ['English', 'Oshiinglisa'],
            ['Afrikaans', 'Oshimbulu'],
            ['German', 'Oshindowishi'],
            ['Portuguese', 'Oshiputu'],
            ['Spanish', 'Oshispania'],
            ['Computers', 'Eekompiuta'],
            ['Principal', 'Omukulunhufikola'],
            ['Secretary', 'Hamushanga'],
            ['Grade', 'Ondodo'],
            ['Bag', 'Ondjato'],
            ['Learners', 'Ovalongwa / Ovanafikola'],
            ['Calculator', 'Okashina'],
            ['Electricity', 'Olusheno'],
            ['School Fund', 'Oshikefa shofikola'],
          ],
        },
        {
          type: 'words',
          rows: [
            ['Prepare', 'Lilongekida'],
            ['Invigilate / Proctor', 'Kalela'],
            ['Sit down', 'Kala omutumba'],
            ['Mark', 'Talela'],
            ['Stand up', 'Fikama'],
            ['Be quiet', 'Mwena'],
            ['Speak louder', 'Popya mokule / muule'],
            ['Speak softer', 'Popya kashona / pedu'],
            ['Read aloud', 'Lesha mokule'],
            ['Be late', 'Laata'],
            ['You are correct', 'Ou li mondjila'],
            ['You are not correct', 'Ku li mondjila / Owa puka'],
            ['Put that axe down', 'Tula ekuva pedu'],
          ],
        },
      ],
    },
  ],
};

export const appendixB: Chapter = {
  id: 'b',
  title: 'nOvakalimo',
  english: 'In the community',
  page: 81,
  parts: [
    {
      slug: 'community',
      title: 'In the community',
      blocks: [
        {
          type: 'words',
          rows: [
            ['Volunteer', 'Omuliyambi'],
            ['Trainer', 'Omudeuli'],
            ['Community', 'Ovanhu vomomukunda / Ovakalimo'],
            ['Development', 'Ehumokomesho'],
            ['Observe', 'Talela'],
            ['Project', 'Opoloyeka'],
            ['Work (noun)', 'Oilonga'],
            ['Meeting', 'Oshihongi'],
            ['Parents’ meeting', 'Oshihongi shovadali'],
            ['School Board', 'Etonatelofikola'],
            ['Clinic', 'Okapangelo / Okilinika'],
            ['Headman', 'Omwene womukunda'],
            ['Fundraising', 'Ekongo loimaliwa'],
            ['Chairperson', 'Omunashipundi'],
            ['Treasurer', 'Omudiinini woiniwe'],
            ['Vote', 'Hoolola'],
          ],
        },
        {
          type: 'words',
          rows: [
            ['We came to this meeting to ...', 'Otwe ya poshihongi eshi sho ...'],
            ['Thank you for the opportunity ...', 'Tangi kompito ...'],
            ['Where can we get ...?', 'Openi hatu dulu okumona ...?'],
            ['Is there someone who can give us ...?', 'Opu na omunhu umwe ta dulu oku tu pa ...?'],
            ['What does this community need?', 'Ovanhu vomomukunda ova pumbwa shike?'],
            ['Opens at ...', 'Otashi patulula po ...'],
            ['Closes at ...', 'Otashi pata po ...'],
            ['I train teachers.', 'Ohandi deula ovalongi.'],
            ['I am an HIV counsellor.', 'Ame omuhungimwenyo wo HIV.'],
          ],
        },
        { type: 'heading', text: 'Eshiivo loshongalele' },
        { type: 'text', text: 'An invitation to a meeting. (Modify this letter for your own purposes.)' },
        {
          type: 'reading',
          paragraphs: [
            'Omufimanekwa ...,',
            'Oto indilwa nefimaneko opo u uye koshingalele sho ... Oshongalele otashi ningwa mo ... potundi ... Ohatu ka popya kombinga yo ...',
            'Weni,',
            '...',
          ],
        },
        {
          type: 'text',
          text: '(Invitation to a meeting for the election of the school board: Dear ..., You are respectfully invited to come to a meeting of ... The meeting will take place on ... (date) ... at ... (time) ... We are going to talk about ... Yours faithfully,)',
        },
      ],
    },
  ],
};

export const appendixC: Chapter = {
  id: 'c',
  title: 'Efe nge!',
  english: 'Dealing with unwanted suitors',
  page: 83,
  parts: [
    {
      slug: 'efe-nge',
      title: 'Efe nge!',
      blocks: [
        { type: 'text', text: 'Some useful expressions for women dealing with unwanted suitors:' },
        {
          type: 'words',
          rows: [
            ['I don’t want you. (works well and gets a laugh from all)', 'Inandi hala. / Inandi ku hala.'],
            ['Let go of me. / Leave me alone.', 'Efe nge!'],
            ['He is bothering me.', 'Ota hepeke nge.'],
            ['I am already married.', 'Onda hombolwa nale.'],
            ['I already have a man; I don’t want two.', 'Ondi na omusamane nale; inandi hala vavali.'],
          ],
        },
        {
          type: 'tip',
          title: 'Quick Tips',
          blocks: [
            {
              type: 'list',
              items: [
                'It is usually best not to insult. _Inandi hala_ is strong enough, and doesn’t make people angry or defensive of their pride.',
                'An effective approach is to say _aaye_ to everything and suck your teeth (’tsk) to show your disgust.',
                'If he asks, _Omusamane woye oku li peni?_ (Where is your husband?), just say, _kEumbo._ (At home.)',
              ],
            },
          ],
        },
      ],
    },
  ],
};
