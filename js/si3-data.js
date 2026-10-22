/* PlayHub - Sitar Class 3 Urdu chapter content
   Source: NCERT Sitar, Urdu textbook for Class 3, Chapters 1-19.
   Each chapter: story + learning card + one interactive game (quiz | match | sequence). */
window.SI3_CHAPTERS = [
  {
    id: "c3si1", n: 1, title: "حمد", emoji: "🤲", topic: "Praising Allah in a hamd",
    c1: "#5b3df5", c2: "#ff4d8d",
    desc: "Praise Allah for flowers and green leaves with Hafeez Jalandhari. A free Class 3 Urdu lesson and quiz from NCERT Sitar chapter 1.",
    learn: {
      story: "Look at red flowers and green leaves. This sweet hamd says Allah made them all. Let us sing and thank Allah.",
      intro: "This hamd by Hafeez Jalandhari praises Allah as Khaliq and Malik. Every thing shows His wisdom and blessing. Children read it aloud with love.",
      points: [
        "A hamd praises Allah for all His gifts.",
        "Red flowers and green leaves show His art.",
        "Allah is Khaliq who makes and Malik who owns.",
        "Read the poem aloud in a sweet voice."
      ],
      words: ["حمد", "خدا", "خالق", "مالک", "گلشن", "حکمت", "فیض", "نام"]
    },
    game: {
      type: "quiz", title: "Hamd Quiz", instructions: "Remember the poem and tap the answer.",
      questions: [
        { vis: "🤲✨", q: "Who is this hamd about?", options: ["A farmer", "Allah", "A king"], a: 1, hint: "The whole poem praises Allah!" },
        { vis: "🌸🔴", q: "Redness in flowers shows whose gift?", options: ["Allah gift", "Shop gift", "No gift"], a: 0, hint: "Every colour is His gift!" },
        { vis: "🌿 | 🏜️", q: "Green leaves praise whom?", options: ["The wind", "The gardener", "Allah"], a: 2, hint: "Leaves sing His praise!" },
        { vis: "⭐", q: "Allah is called what in the poem?", options: ["Khaliq and Malik", "Driver", "Cook"], a: 0, hint: "Maker and Master!" },
        { vis: "🎁", q: "Who gave us countless blessings?", options: ["The shop", "Allah", "The bus"], a: 1, hint: "Count His blessings!" },
        { vis: "🎵", q: "How do we read a hamd?", options: ["Silently only", "Angry voice", "Sweet loud voice"], a: 2, hint: "Sweet and loud!" }
      ]
    }
  },
  {
    id: "c3si2", n: 2, title: "آم کی گٹھلی", emoji: "🥭", topic: "Munna and the mangoes",
    c1: "#0ea5e9", c2: "#22c55e",
    desc: "Seven mangoes in the fridge and one little secret. A free Class 3 Urdu lesson and story game from NCERT Sitar chapter 2.",
    learn: {
      story: "Amma brings seven juicy mangoes and cools them in the fridge. Little Munna eats one in secret. Will Abba find the truth?",
      intro: "This story is about truth and shame. Munna hides his act but a clever talk brings the truth out. Dadi loves him for accepting his mistake.",
      points: [
        "Amma keeps seven mangoes cold in the fridge.",
        "Munna eats one mango in secret.",
        "Abba talks wisely about the small seed.",
        "Munna tells the truth and wins hearts."
      ],
      words: ["آم", "گٹھلی", "بازار", "فریج", "سچ", "شام", "بچے"]
    },
    game: {
      type: "sequence", title: "Mango Story Order", instructions: "Tap the story steps from first to last.",
      leftTitle: "Story order", rightTitle: "Tap the next step",
      steps: [
        { emoji: "🛍️", text: "Amma buys seven mangoes" },
        { emoji: "🧊", text: "Wash mangoes and keep in fridge" },
        { emoji: "🚪", text: "Family goes to the other room" },
        { emoji: "🥭", text: "Munna eats one mango in secret" },
        { emoji: "🌙", text: "Abba comes home in the evening" },
        { emoji: "😊", text: "Munna tells the truth at last" }
      ]
    }
  },
  {
    id: "c3si3", n: 3, title: "عید", emoji: "🌙", topic: "Eid festival essay",
    c1: "#f59e0b", c2: "#ef4444",
    desc: "Sweet Eid, fasting, new clothes and fair fun across India. A free Class 3 Urdu lesson and quiz from NCERT Sitar chapter 3.",
    learn: {
      story: "The moon is seen and Eid comes with joy. New clothes, sweet dishes and hugs are everywhere. Let us learn how Eid is loved.",
      intro: "This essay tells about festivals of India like Eid, Holi, Diwali and Christmas. It explains Roza, Sehri, Iftar, Fitra and Zakat. Eid gives a message of joy and sharing.",
      points: [
        "Eid comes after the month of Ramzan fasts.",
        "Sehri is eaten early and Iftar opens the fast.",
        "People wear new clothes and pray the Eid prayer.",
        "Children get Eidi and enjoy the fair rides."
      ],
      words: ["عید", "روزہ", "سحری", "افطار", "چاند", "نماز", "عیدی", "میلہ"]
    },
    game: {
      type: "quiz", title: "Eid Quiz", instructions: "Remember the essay and tap the answer.",
      questions: [
        { vis: "🌙", q: "Which moon festival is the sweet Eid?", options: ["Diwali", "Eid", "Holi"], a: 1, hint: "Sweet dishes on Eid!" },
        { vis: "🌅🚫🍲", q: "In Roza we do not eat till when?", options: ["Till sunset", "Till morning only", "Never"], a: 0, hint: "Fast till the sun sets!" },
        { vis: "🍲🌙", q: "Opening the fast is called?", options: ["Picnic", "Dance", "Iftar"], a: 2, hint: "Iftar at sunset!" },
        { vis: "🌄🍲", q: "Early morning food is called?", options: ["Sehri", "Lunch", "Dinner"], a: 0, hint: "Sehri before dawn!" },
        { vis: "🕌", q: "On Eid people go to pray at?", options: ["Market", "Masjid", "Cinema"], a: 1, hint: "Prayer in the masjid!" },
        { vis: "🎁", q: "Elders give children on Eid?", options: ["Stones", "Leaves", "Eidi"], a: 2, hint: "Happy Eidi gifts!" }
      ]
    }
  },
  {
    id: "c3si4", n: 4, title: "بھارت پیارا", emoji: "🇮🇳", topic: "Our lovely Bharat song",
    c1: "#ec4899", c2: "#8b5cf6",
    desc: "Bharat the star of our eyes with flowers, forests and songs. A free Class 3 Urdu lesson and matching game from NCERT Sitar chapter 4.",
    learn: {
      story: "Bharat is the star of our eyes and support of our hearts. Its flowers, fruits and forests are lovely. Let us sing this song together.",
      intro: "This nazm calls Bharat dear and unique. It praises its water and land, today and tomorrow. Children sing it and learn new words.",
      points: [
        "Bharat is the star of our eyes.",
        "Its flowers, fruits and forests are lovely.",
        "We sing its praise all together.",
        "Love your land, water and people."
      ],
      words: ["بھارت", "پیارا", "پھول", "پھل", "جنگل", "گیت", "آنکھ"]
    },
    game: {
      type: "match", title: "Bharat Words Match", instructions: "Tap a word, then tap its picture.",
      pairs: [
        ["بھارت", "🇮🇳"], ["پھول", "🌸"], ["پھل", "🍎"],
        ["جنگل", "🌳"], ["گیت", "🎵"], ["آنکھ", "👀"]
      ]
    }
  },
  {
    id: "c3si5", n: 5, title: "ستاروں سے آگے", emoji: "🚀", topic: "Kalpana Chawla space story",
    c1: "#10b981", c2: "#3b82f6",
    desc: "Little Hina dreams of space with Kalpana Chawla of Karnal. A free Class 3 Urdu lesson and quiz from NCERT Sitar chapter 5.",
    learn: {
      story: "Hina of Karnal loves the sky and dreams big. Her teacher tells the tale of Kalpana Chawla. Small eyes can dream beyond the stars.",
      intro: "This lesson tells how Kalpana flew on Columbia in 1997 and became the first Indian woman in space. Children remember her hard work and courage. Her memory guides young dreamers.",
      points: [
        "Hina lives in Karnal and loves the sky.",
        "Mrs Sharma tells Kalpana story in class.",
        "Kalpana flew on Columbia and saw the earth.",
        "Big dreams need hard work and courage."
      ],
      words: ["ستارے", "خلا", "جہاز", "خلاباز", "خواب", "مشن", "محنت"]
    },
    game: {
      type: "quiz", title: "Stars Quiz", instructions: "Remember the story and tap the answer.",
      questions: [
        { vis: "👧✨", q: "Which girl dreams of flying to space?", options: ["Hina", "A mango", "A chair"], a: 0, hint: "Hina loves the sky!" },
        { vis: "🏫", q: "Who tells the class about Kalpana?", options: ["A crow", "Mrs Sharma", "A driver"], a: 1, hint: "The kind teacher!" },
        { vis: "🚀", q: "Kalpana flew on which shuttle?", options: ["A bus", "A boat", "Columbia"], a: 2, hint: "Columbia shuttle!" },
        { vis: "🌍", q: "Kalpana was the first Indian woman in?", options: ["Space", "Market", "Forest"], a: 0, hint: "High in space!" },
        { vis: "🕯️", q: "Children lit candles under which tree?", options: ["A chair", "The old banyan", "A car"], a: 1, hint: "Old banyan tree!" },
        { vis: "⭐", q: "Small eyes can dream till where?", options: ["The shop", "The fridge", "Beyond the stars"], a: 2, hint: "Beyond the stars!" }
      ]
    }
  },
  {
    id: "c3si6", n: 6, title: "کشمیر کی سیر", emoji: "🏔️", topic: "Kashmir travelogue places",
    c1: "#f97316", c2: "#eab308",
    desc: "Snow peaks, lotus lakes and pony rides in lovely Kashmir. A free Class 3 Urdu lesson and travel game from NCERT Sitar chapter 6.",
    learn: {
      story: "The writer saw many hill places but loves Kashmir most. Snow peaks shine and green valleys smile. Come, travel Kashmir in order.",
      intro: "This travelogue visits Srinagar, Pampore, Sonmarg and the lotus lake. It tells of springs, ice, horses and narrow paths. Kashmir feels like paradise on earth.",
      points: [
        "Kashmir is loved most of all hill places.",
        "Srinagar, Pampore and Sonmarg are visited.",
        "Snow peaks, lakes and springs look lovely.",
        "Pony rides cross narrow mountain paths."
      ],
      words: ["کشمیر", "پہاڑ", "برف", "جھیل", "چشمہ", "گھوڑا", "وادی", "سفر"]
    },
    game: {
      type: "sequence", title: "Kashmir Trip Order", instructions: "Tap the travel steps from first to last.",
      leftTitle: "Travel order", rightTitle: "Tap the next step",
      steps: [
        { emoji: "🧳", text: "Travel to hill places of India" },
        { emoji: "🕌", text: "Reach Srinagar and nearby areas" },
        { emoji: "🌸", text: "See Pampore Sonmarg and lotus lake" },
        { emoji: "🏔️", text: "Watch snowy peaks and green valleys" },
        { emoji: "🐴", text: "Walk narrow paths or ride a pony" },
        { emoji: "❄️", text: "Play on ice and feel the cold" }
      ]
    }
  },
  {
    id: "c3si7", n: 7, title: "برسات", emoji: "🌧️", topic: "Rain season poem",
    c1: "#ef476f", c2: "#ffb703",
    desc: "Black clouds, sweet rain and green fields with Ismail Merathi. A free Class 3 Urdu lesson and quiz from NCERT Sitar chapter 7.",
    learn: {
      story: "Dark clouds gather and rain falls drip drop. Dry earth wakes up green again. Farmers smile as crops dance.",
      intro: "This nazm of Barsaat shows clouds, rain and joy. Flowers get new colours and jungles turn green. Children learn rain words and rhymes.",
      points: [
        "Black clouds rise before the rain.",
        "Rain wakes dry earth to life.",
        "Farmers work hard and crops grow.",
        "Flowers and jungles turn fresh and green."
      ],
      words: ["برسات", "بادل", "بارش", "کسان", "گھٹا", "ہرا", "پھول"]
    },
    game: {
      type: "quiz", title: "Barsaat Quiz", instructions: "Remember the poem and tap the answer.",
      questions: [
        { vis: "☁️⬛", q: "What rises before the rain?", options: ["Black clouds", "Yellow sun", "White snow"], a: 0, hint: "Dark rainy clouds!" },
        { vis: "🌧️🌱", q: "Rain makes the dry earth?", options: ["A road", "Alive and green", "A car"], a: 1, hint: "Green again!" },
        { vis: "🧑‍🌾", q: "Whose hard work is helped by rain?", options: ["Stars", "Clouds", "Farmers"], a: 2, hint: "Hardworking farmers!" },
        { vis: "🌸", q: "What happens to every flower?", options: ["New colour blooms", "No change", "Snow falls"], a: 0, hint: "New colours bloom!" },
        { vis: "🌳", q: "What colour does the jungle become?", options: ["Red", "Green", "Blue"], a: 1, hint: "Fresh green jungle!" },
        { vis: "🌧️📖", q: "What season is this poem about?", options: ["Winter", "Summer", "Barsaat"], a: 2, hint: "Rainy Barsaat!" }
      ]
    }
  },
  {
    id: "c3si8", n: 8, title: "دوست کی پہچان", emoji: "🐻", topic: "Two friends and a bear",
    c1: "#8b5cf6", c2: "#06b6d4",
    desc: "Two friends, one bear and a true test of friendship. A free Class 3 Urdu lesson and story game from NCERT Sitar chapter 8.",
    learn: {
      story: "Two friends cross a forest when a bear appears. One climbs the tree, one lies still. The bear teaches who a true friend is.",
      intro: "This tale shows a friend in need is a friend indeed. The boy on the ground holds his breath like the dead. The bear sniffs and goes away.",
      points: [
        "Two friends walk through a forest.",
        "One friend climbs a tree in fear.",
        "The other lies still holding breath.",
        "A true friend helps in trouble."
      ],
      words: ["دوست", "جنگل", "ریچھ", "درخت", "مصیبت", "سچا", "سانس"]
    },
    game: {
      type: "sequence", title: "Friends Story Order", instructions: "Tap the story steps from first to last.",
      leftTitle: "Story order", rightTitle: "Tap the next step",
      steps: [
        { emoji: "🌳", text: "Two friends walk through the forest" },
        { emoji: "🐻", text: "A bear suddenly appears" },
        { emoji: "🧗", text: "One friend climbs the tree fast" },
        { emoji: "😶", text: "The other lies still holding breath" },
        { emoji: "👃", text: "The bear sniffs and leaves him" },
        { emoji: "🤝", text: "Friends learn who helps in need" }
      ]
    }
  },
  {
    id: "c3si9", n: 9, title: "میوزیم", emoji: "🏛️", topic: "School trip to the museum",
    c1: "#5b3df5", c2: "#ff4d8d",
    desc: "Bus ride, boats and missiles at the Abdul Kalam memorial. A free Class 3 Urdu lesson and quiz from NCERT Sitar chapter 9.",
    learn: {
      story: "School children ride a bus to the museum with joy. They see a boat and strong missiles. Dr Kalam teaches them to dream big.",
      intro: "This essay visits the A P J Abdul Kalam memorial. It tells of his boat home, science work and love for children. Books and great people are our best friends.",
      points: [
        "Children reach the museum happily by bus.",
        "A boat recalls Kalam father work.",
        "Agni and Prithvi missiles show science power.",
        "Make books and great people your friends."
      ],
      words: ["میوزیم", "اسکول", "بس", "کشتی", "میزائل", "کتاب", "بچے"]
    },
    game: {
      type: "quiz", title: "Museum Quiz", instructions: "Remember the trip and tap the answer.",
      questions: [
        { vis: "🚌", q: "How do children reach the museum?", options: ["By bus", "By boat", "By plane"], a: 0, hint: "Big school bus!" },
        { vis: "🛶", q: "What did children first see inside?", options: ["A car", "A boat", "A star"], a: 1, hint: "Old wooden boat!" },
        { vis: "🚀", q: "Which missiles did they see?", options: ["Toys", "Balls", "Agni and Prithvi"], a: 2, hint: "Strong missiles!" },
        { vis: "🔬", q: "Dr Kalam was a great?", options: ["Scientist", "Cook", "Driver"], a: 0, hint: "Great scientist!" },
        { vis: "❤️👧", q: "Dr Kalam loved whom most?", options: ["Stones", "Children", "Chairs"], a: 1, hint: "Dear children!" },
        { vis: "📚", q: "What should we make our friends?", options: ["Crows", "Buses", "Books and great people"], a: 2, hint: "Lovely books!" }
      ]
    }
  },
  {
    id: "c3si10", n: 10, title: "ہمدردی", emoji: "🐦", topic: "Bulbul and jugnu kindness",
    c1: "#0ea5e9", c2: "#22c55e",
    desc: "A sad bulbul at night and a tiny jugnu full of light. A free Class 3 Urdu lesson and quiz from NCERT Sitar chapter 10.",
    learn: {
      story: "A lonely bulbul sits sad on a branch as night falls. Tiny jugnu comes with a lamp of light. Helping others is the best work.",
      intro: "This poem by Allama Iqbal teaches kindness. The night is dark and the bulbul fears the way. Jugnu offers his God given light with love.",
      points: [
        "A bulbul sits sad and alone at night.",
        "Darkness covers every thing around.",
        "Jugnu brings light like a small lamp.",
        "Best people help others in need."
      ],
      words: ["بلبل", "جگنو", "رات", "روشنی", "مشعل", "مدد", "شجر"]
    },
    game: {
      type: "quiz", title: "Hamdardi Quiz", instructions: "Remember the poem and tap the answer.",
      questions: [
        { vis: "🐦🌙", q: "Who sits sad alone on a branch?", options: ["Bulbul", "Fox", "Fish"], a: 0, hint: "Lonely bulbul!" },
        { vis: "🌃", q: "Why is the bulbul sad?", options: ["Lost money", "Night is dark", "New nest"], a: 1, hint: "Dark night!" },
        { vis: "✨", q: "Who speaks from nearby to help?", options: ["A stone", "A cloud", "Jugnu the firefly"], a: 2, hint: "Tiny glowing jugnu!" },
        { vis: "🏮", q: "What does Jugnu give on the path?", options: ["Light on the path", "A loud horn", "A dark cloud"], a: 0, hint: "Sweet light!" },
        { vis: "🎁", q: "What has Allah given Jugnu?", options: ["A shoe", "A mashal of light", "A chair"], a: 1, hint: "Bright mashal!" },
        { vis: "❤️", q: "Who are the best people?", options: ["Run away", "Sleep all day", "Help others in need"], a: 2, hint: "Helpers are best!" }
      ]
    }
  },
  {
    id: "c3si11", n: 11, title: "بھلائی", emoji: "🐄", topic: "Ramu honesty folk tale",
    c1: "#f59e0b", c2: "#ef4444",
    desc: "Poor Ramu, his cow and a bundle of honesty by the Ganga. A free Class 3 Urdu lesson and quiz from NCERT Sitar chapter 11.",
    learn: {
      story: "Ramu is poor but honest and loves his cow. Famine leaves no fodder to eat. His honesty wins a kind gift.",
      intro: "This folk tale lives near the Ganga river. Ramu takes fodder at night but his heart speaks. The field owner sees all and forgives with love.",
      points: [
        "Ramu is poor but honest and hardworking.",
        "Famine leaves no fodder for his cow.",
        "Honesty is the biggest virtue he keeps.",
        "The owner gifts fodder in the morning."
      ],
      words: ["بھلائی", "گائے", "چارہ", "ایمان", "گاؤں", "مالک", "غریب"]
    },
    game: {
      type: "quiz", title: "Bhalai Quiz", instructions: "Remember the story and tap the answer.",
      questions: [
        { vis: "🐄", q: "Which animal did Ramu keep?", options: ["A cow", "A lion", "A crow"], a: 0, hint: "Gentle milk cow!" },
        { vis: "🌾🚫", q: "Why was Ramu worried?", options: ["Too much rain", "Famine no fodder", "New house"], a: 1, hint: "No fodder time!" },
        { vis: "🌙🌾", q: "What did Ramu take at night?", options: ["Books", "Stars", "Fodder from a field"], a: 2, hint: "Green fodder!" },
        { vis: "💛", q: "What is the biggest thing said Ramu?", options: ["Honesty", "A chair", "A shoe"], a: 0, hint: "Honesty is biggest!" },
        { vis: "👀", q: "Who was secretly watching Ramu?", options: ["A cloud", "The field owner", "A fish"], a: 1, hint: "Kind field owner!" },
        { vis: "🎁🌾", q: "What did the owner bring next morning?", options: ["Stones", "Cars", "A bundle of fodder"], a: 2, hint: "Gift of fodder!" }
      ]
    }
  },
  {
    id: "c3si12", n: 12, title: "فٹ بال", emoji: "⚽", topic: "Football team game",
    c1: "#ec4899", c2: "#8b5cf6",
    desc: "Eleven players, one ball and a big goal cry. A free Class 3 Urdu lesson and quiz from NCERT Sitar chapter 12.",
    learn: {
      story: "Football is played on a wide flat field with two teams. Kick the ball and guard your goal. The referee watches every rule.",
      intro: "This essay explains teams, captain, goal keeper and referee. Each team has eleven players and one goal. Brazil and Kolkata love this game.",
      points: [
        "Football is played only with the feet.",
        "Each team has eleven players and a captain.",
        "Only the goal keeper may use hands.",
        "The referee decision must be obeyed."
      ],
      words: ["فٹبال", "ٹیم", "گول", "کھلاڑی", "کپتان", "ریفری", "کھیل"]
    },
    game: {
      type: "quiz", title: "Football Quiz", instructions: "Remember the essay and tap the answer.",
      questions: [
        { vis: "⚽🦶", q: "Football is played with only?", options: ["Hands", "Feet", "Nose"], a: 1, hint: "Kick with feet!" },
        { vis: "👥", q: "How many players in one team?", options: ["Eleven", "Two", "Five"], a: 0, hint: "Eleven players!" },
        { vis: "🧤🥅", q: "Who can also use hands?", options: ["The cook", "The driver", "The goal keeper"], a: 2, hint: "Goal keeper saves!" },
        { vis: "🏁", q: "Which team wins the match?", options: ["More goals team", "Sleeping team", "Quarrelling team"], a: 0, hint: "More goals wins!" },
        { vis: "🏃📯", q: "Who runs with players and decides?", options: ["A singer", "The referee", "A crow"], a: 1, hint: "Fair referee!" },
        { vis: "🏟️", q: "Which city loves football in India?", options: ["The moon", "The sea", "Kolkata"], a: 2, hint: "Kolkata fans!" }
      ]
    }
  },
  {
    id: "c3si13", n: 13, title: "درختوں سے محبت", emoji: "🌳", topic: "Trees give shade and air",
    c1: "#10b981", c2: "#3b82f6",
    desc: "Birds sing on trees that give cool shade and seasons. A free Class 3 Urdu lesson and matching game from NCERT Sitar chapter 13.",
    learn: {
      story: "Birds live on trees and sing sweet songs. Travellers rest in cool shade. Let us love and guard every tree.",
      intro: "This nazm tells a thousand uses of trees. Elders advise us to keep trees green. Protecting trees protects our seasons and air.",
      points: [
        "Birds nest and sing on trees.",
        "Trees give cool dense shade.",
        "Trees shape our seasons and weather.",
        "Guard trees and love them always."
      ],
      words: ["درخت", "چڑیا", "سایہ", "موسم", "حفاظت", "محبت", "پرندے"]
    },
    game: {
      type: "match", title: "Trees Word Match", instructions: "Tap a word, then tap its picture.",
      pairs: [
        ["درخت", "🌳"], ["چڑیا", "🐦"], ["سایہ", "🌤️"],
        ["پھول", "🌸"], ["موسم", "🍃"], ["محبت", "❤️"]
      ]
    }
  },
  {
    id: "c3si14", n: 14, title: "نیم کا پیڑ", emoji: "🌿", topic: "Neem tree uses tale",
    c1: "#f97316", c2: "#eab308",
    desc: "Rashid lifts his axe but the neem tree has many gifts. A free Class 3 Urdu lesson and quiz from NCERT Sitar chapter 14.",
    learn: {
      story: "Rashid goes to cut the neem tree and rests in its shade. An old man tells him the leaves heal and clean. Rashid promises never to cut trees.",
      intro: "This story lists neem gifts like shade, cool air, clean grain and medicine. Dry leaves guard clothes, oil heals skin and miswak cleans teeth. Every tree has some virtue.",
      points: [
        "Rashid rests tired under the neem shade.",
        "Neem leaves stop heat and give cool air.",
        "Dry leaves guard clothes and grain.",
        "Rashid promises to guard all trees."
      ],
      words: ["نیم", "پیڑ", "پتی", "سایہ", "دوا", "مسواک", "بخار"]
    },
    game: {
      type: "quiz", title: "Neem Tree Quiz", instructions: "Remember the story and tap the answer.",
      questions: [
        { vis: "🪓🌳", q: "With what did Rashid go to cut neem?", options: ["An axe", "A spoon", "A book"], a: 0, hint: "Heavy axe!" },
        { vis: "😴🌳", q: "Where did tired Rashid rest?", options: ["On the moon", "Under the neem shade", "In a shop"], a: 1, hint: "Cool neem shade!" },
        { vis: "☀️🍃", q: "Neem leaves stop what from earth?", options: ["Stars", "Clouds", "Hot sun from reaching earth"], a: 2, hint: "Stops hot sun!" },
        { vis: "👕🌾", q: "Dry leaves guard what?", options: ["Clothes and grain", "Cars", "Buses"], a: 0, hint: "Safe clothes!" },
        { vis: "🪥", q: "What does the soft neem twig give?", options: ["A cap", "Teeth cleaning miswak", "A shoe"], a: 1, hint: "Clean white teeth!" },
        { vis: "🤝🌳", q: "What did Rashid promise at last?", options: ["Cut all trees", "Sleep all day", "Never cut trees again"], a: 2, hint: "Guard every tree!" }
      ]
    }
  },
  {
    id: "c3si15", n: 15, title: "تندرستی اور غذا", emoji: "🍎", topic: "Healthy food and water",
    c1: "#ef476f", c2: "#ffb703",
    desc: "Milk, fruit, grains and clean water keep us strong. A free Class 3 Urdu lesson and matching game from NCERT Sitar chapter 15.",
    learn: {
      story: "Our body needs good clean food every day. Milk, grains, fruits and greens make new blood. Drink clean water and rest well.",
      intro: "This essay tells food comes from animals and plants. Grains give strength and greens help digest food. Too much food and dirty water harm health.",
      points: [
        "Grains, milk, fruits and greens are food.",
        "Milk is a very fine complete food.",
        "Hunger means the stomach needs food.",
        "Clean water, right food and rest keep health."
      ],
      words: ["غذا", "دودھ", "پھل", "سبزی", "اناج", "پانی", "انڈا"]
    },
    game: {
      type: "match", title: "Food Words Match", instructions: "Tap a food word, then tap its picture.",
      pairs: [
        ["دودھ", "🥛"], ["پھل", "🍎"], ["سبزی", "🥬"],
        ["اناج", "🌾"], ["پانی", "💧"], ["انڈا", "🥚"]
      ]
    }
  },
  {
    id: "c3si16", n: 16, title: "پھول کماری", emoji: "👸", topic: "Laughing princess tale",
    c1: "#8b5cf6", c2: "#06b6d4",
    desc: "Princess Phool Kumari forgets to laugh till a funny show. A free Class 3 Urdu lesson and quiz from NCERT Sitar chapter 16.",
    learn: {
      story: "Phool Kumari laughs loudly in the garden, then turns sad and quiet. Bear men and monkey men try to cheer her. A falling cap brings her laugh back.",
      intro: "This tale is about a king, a queen and their dear daughter. When she laughs, flowers, birds and children smile too. Joy spreads to every one around.",
      points: [
        "Phool Kumari is the dear royal daughter.",
        "She laughs loudly and then turns sad.",
        "Bear and monkey shows try to cheer her.",
        "A falling cap and beard make her laugh."
      ],
      words: ["پھول", "راجا", "رانی", "باغ", "ہنسی", "انعام", "بچے"]
    },
    game: {
      type: "quiz", title: "Phool Kumari Quiz", instructions: "Remember the story and tap the answer.",
      questions: [
        { vis: "👸🌸", q: "Who was Phool Kumari?", options: ["The king daughter", "A crow", "A fox"], a: 0, hint: "Dear princess!" },
        { vis: "😂", q: "What did she do loudly first?", options: ["Cry", "Laugh", "Sleep"], a: 1, hint: "Loud happy laugh!" },
        { vis: "😔", q: "After scolding she became?", options: ["A bird", "A car", "Sad and quiet"], a: 2, hint: "Quiet and sad!" },
        { vis: "🐻", q: "Who showed a dance first?", options: ["The bear man", "The moon", "The fish"], a: 0, hint: "Dancing bear!" },
        { vis: "🐒", q: "Whose dance made all laugh?", options: ["A stone", "The monkey", "A shoe"], a: 1, hint: "Funny monkey!" },
        { vis: "🎩", q: "What fell and made her laugh?", options: ["Stars", "Cars", "Cap then beard"], a: 2, hint: "Funny falling cap!" }
      ]
    }
  },
  {
    id: "c3si17", n: 17, title: "سب کا پیارا", emoji: "👦", topic: "Lalu loved by all",
    c1: "#5b3df5", c2: "#ff4d8d",
    desc: "Little Lalu cries and the whole family showers love. A free Class 3 Urdu lesson and matching game from NCERT Sitar chapter 17.",
    learn: {
      story: "Lalu comes crying with tears on his face. Dadi, Amma, Apa and Bhabhi hug him close. Loved Lalu is the star of all eyes.",
      intro: "This poem by Barkat Ali Firaq is full of family love. Each member comforts Lalu with songs, bread and sweets. Lalu belongs to every one.",
      points: [
        "Lalu comes home crying with tears.",
        "Brother, Dadi and Amma ask with love.",
        "Apa gives bread and sweets to eat.",
        "Lalu is dear to all and star of eyes."
      ],
      words: ["لالو", "آنسو", "پیار", "روٹی", "مٹھائی", "گود", "تارا"]
    },
    game: {
      type: "match", title: "Lalu Words Match", instructions: "Tap a word, then tap its picture.",
      pairs: [
        ["لالو", "👦"], ["آنسو", "😢"], ["دادی", "👵"],
        ["روٹی", "🫓"], ["مٹھائی", "🍬"], ["پیار", "❤️"]
      ]
    }
  },
  {
    id: "c3si18", n: 18, title: "رات", emoji: "🌙", topic: "Night moon and stars",
    c1: "#0ea5e9", c2: "#22c55e",
    desc: "Moon rises, stars shine and tired bodies rest at night. A free Class 3 Urdu lesson and matching game from NCERT Sitar chapter 18.",
    learn: {
      story: "Night spreads its wings over our heads. The moon smiles and stars twinkle bright. Sleep now and wash away all tiredness.",
      intro: "This short poem shows night after sunny day. No sun, no heat, only cool rest. Children read, sleep and wake fresh.",
      points: [
        "Night comes and covers the sky.",
        "Moon and stars shine and glow.",
        "Day heat and sunshine go away.",
        "Sleep on the bed and rest well."
      ],
      words: ["رات", "چاند", "تارے", "چمک", "نیند", "بستر", "ٹھنڈک"]
    },
    game: {
      type: "match", title: "Night Words Match", instructions: "Tap a night word, then tap its picture.",
      pairs: [
        ["رات", "🌙"], ["چاند", "🌕"], ["تارے", "⭐"],
        ["ٹھنڈک", "❄️"], ["نیند", "😴"], ["بستر", "🛏️"]
      ]
    }
  },
  {
    id: "c3si19", n: 19, title: "لومڑی اور کوا", emoji: "🦊", topic: "Fox flatters the crow",
    c1: "#f59e0b", c2: "#ef4444",
    desc: "A hungry fox, a crow with bread and a sweet tricky song. A free Class 3 Urdu lesson and story game from NCERT Sitar chapter 19.",
    learn: {
      story: "A fox is hungry for two days and sees a crow with bread. She praises his beauty and sweet voice. The crow opens its beak and loses the bread.",
      intro: "This picture story warns against false praise. The fox names rivers Ravi and Jhelum to flatter. Clever words can steal careless gifts.",
      points: [
        "A fox is hungry for two days.",
        "A crow holds a whole bread in beak.",
        "The fox praises beauty and sweet song.",
        "The bread falls as the beak opens."
      ],
      words: ["لومڑی", "کوا", "روٹی", "درخت", "تعریف", "گانا", "چونچ"]
    },
    game: {
      type: "sequence", title: "Fox and Crow Order", instructions: "Tap the story steps from first to last.",
      leftTitle: "Story order", rightTitle: "Tap the next step",
      steps: [
        { emoji: "🦊", text: "A fox is hungry for two days" },
        { emoji: "🐦", text: "A crow sits on a tree with bread" },
        { emoji: "💡", text: "The fox plans a sweet trick" },
        { emoji: "🎵", text: "The fox praises the crow song" },
        { emoji: "🍞", text: "The crow opens its beak and drops bread" },
        { emoji: "😋", text: "The fox eats the bread with joy" }
      ]
    }
  }
];
window.CHAPTERS = window.SI3_CHAPTERS;
window.CHAPTER_SUBJECT = "Class 3 Urdu";
