/* PlayHub — Mridang Class 1 English chapter content
   Source: NCERT Mridang English Class 1 (Reprint 2026-27), Units 1–4, 9 chapters.
   Each chapter: learning card + one interactive game (quiz | match | sequence). */
window.EN_CHAPTERS = [
  {
    id: 'en1', n: 1, title: 'Two Little Hands', emoji: '🖐️', topic: 'Body parts & senses',
    c1: '#ef476f', c2: '#ffb703',
    desc: 'Learn body parts and sense words for Class 1 English — hand, leg, eye, ear, nose, mouth. Free NCERT Mridang chapter 1 lesson and matching game for kids.',
    learn: {
      intro: 'We sing "Two Little Hands" and meet the parts of our body — and the work each one does! Eyes see, ears hear, nose smells, mouth eats and skin feels. Clap, tap and name them all.',
      points: [
        'Two little hands clap, two little legs tap — our body helps us do everything!',
        'We see with our eyes, hear with our ears, smell with our nose and eat with our mouth.',
        'New words: hand, leg, head, eye, ear, nose, mouth, skin.',
        'Wash your hands well — wet, rub soap, wash between the fingers, rinse!'
      ],
      words: ['hand', 'leg', 'head', 'eye', 'ear', 'nose', 'mouth', 'skin', 'clap', 'smell']
    },
    game: {
      type: 'match', title: 'Match Body Parts!', instructions: 'Tap a word, then tap the picture it names.',
      pairs: [
        ['hand', '🤚'], ['leg', '🦵'], ['eye', '👁️'],
        ['ear', '👂'], ['nose', '👃'], ['mouth', '👄']
      ]
    }
  },
  {
    id: 'en2', n: 2, title: 'Greetings', emoji: '👋', topic: 'Greetings & action words',
    c1: '#8b5cf6', c2: '#06b6d4',
    desc: 'Say good morning, afternoon, evening and night the right way! A free Class 1 English greetings lesson and game from NCERT Mridang chapter 2.',
    learn: {
      intro: 'When we meet someone we greet them — good morning in the morning, good afternoon after lunch, good evening at sunset and good night before bed. In India we fold our hands and say Namaste!',
      points: [
        'Good morning, good afternoon, good evening, good night — each has its own time.',
        'Namaste is our Indian greeting — fold your hands and smile!',
        'Action words: comb, eat, see, say, hear, walk, play.',
        'Sight words: one, two, to, I, my, is, this.'
      ],
      words: ['morning', 'afternoon', 'evening', 'night', 'Namaste', 'greet', 'eat', 'hear', 'see']
    },
    game: {
      type: 'quiz', title: 'Say the Right Greeting', instructions: 'Read each clue and tap the correct greeting or word.',
      questions: [
        { vis: '🌅 7️⃣', q: 'It is 7 o’clock in the morning. You meet your friend — say…', options: ['Good night', 'Good morning', 'Good afternoon'], a: 1, hint: 'Mornings begin with a bright GOOD MORNING!' },
        { vis: '🌇', q: 'The sun is setting and you meet your aunt. Say…', options: ['Good evening', 'Good morning', 'Good night'], a: 0, hint: 'At sunset it is GOOD EVENING!' },
        { vis: '🌙 🛏️', q: 'You are going to bed. What do you say?', options: ['Good morning', 'Good afternoon', 'Good night'], a: 2, hint: 'Before bed we say GOOD NIGHT!' },
        { vis: '🕐 ☀️', q: 'It is 2 o’clock after lunch. Say…', options: ['Good morning', 'Good afternoon', 'Good evening'], a: 1, hint: 'After lunch, the sun is high — GOOD AFTERNOON!' },
        { vis: '🙏', q: 'In India we fold our hands and say…', options: ['Namaste', 'Goodbye', 'Please'], a: 0, hint: 'NAMASTE is our Indian greeting!' },
        { vis: '🍽️ 😋', q: 'I ____ my food every day.', options: ['eat', 'sleep', 'run'], a: 0, hint: 'We EAT our food with our mouth.' },
        { vis: '🔔 👂', q: 'I ____ the bell ring. My ears help me do this.', options: ['see', 'smell', 'hear'], a: 2, hint: 'Ears help us HEAR sounds.' },
        { vis: '👀', q: 'I ____ my teacher with my eyes.', options: ['hear', 'see', 'touch'], a: 1, hint: 'Eyes help us SEE things.' }
      ]
    }
  },
  {
    id: 'en3', n: 3, title: 'Picture Time', emoji: '🦁', topic: 'Animals & counting',
    c1: '#0ea5e9', c2: '#22c55e',
    desc: 'Name animals in English and count with the fish rhyme — a free Class 1 English lesson and matching game for NCERT Mridang unit 2 chapter 1.',
    learn: {
      intro: 'Look at the picture — so many animals and birds! We name them in English, count with "Once I caught a fish alive" from one to ten, and clap for rhyming words like five–alive and tree–knee.',
      points: [
        'Animals in English: lion, monkey, fish, elephant, frog, rabbit.',
        'Count with the rhyme: one, two, three, four, five … ten!',
        'Rhyming words sound the same at the end — five and alive, tree and knee.',
        'Sight words: each, is, and, little, one, two, three, four, five.'
      ],
      words: ['lion', 'monkey', 'fish', 'elephant', 'frog', 'rabbit', 'animal', 'bird', 'snake']
    },
    game: {
      type: 'match', title: 'Match the Animals', instructions: 'Tap an animal name, then tap its picture.',
      pairs: [
        ['Lion', '🦁'], ['Monkey', '🐒'], ['Fish', '🐟'],
        ['Elephant', '🐘'], ['Frog', '🐸'], ['Rabbit', '🐰']
      ]
    }
  },
  {
    id: 'en4', n: 4, title: 'The Cap-seller and the Monkeys', emoji: '🧢', topic: 'Story & sequencing',
    c1: '#f59e0b', c2: '#7c3aed',
    desc: 'Retell the famous Cap-seller story in order — a free Class 1 English story lesson and sequencing game for kids from NCERT Mridang unit 2 chapter 2.',
    learn: {
      intro: 'A man sells caps carried in a basket on his head. One day he sleeps under a tree — and the monkeys take EVERY cap! Can you put the story events back in order and help him get his caps?',
      points: [
        'New words: cap, basket, monkey, tree, fist, empty, idea.',
        'First the cap-seller sleeps, then the monkeys take the caps.',
        'He shakes his fists — the monkeys copy him, so he throws his cap down.',
        'The monkeys throw their caps too — caps are back! He goes away happily.'
      ],
      words: ['cap', 'basket', 'monkey', 'tree', 'fist', 'empty', 'idea', 'happily']
    },
    game: {
      type: 'sequence', title: 'Put the Story in Order', instructions: 'Tap the events in the order they happened in the story.',
      leftTitle: 'Story, in order', rightTitle: 'Tap the next event',
      steps: [
        { emoji: '🧢', text: 'The cap-seller sleeps under a tree' },
        { emoji: '🐒', text: 'Monkeys take all the caps' },
        { emoji: '😠', text: 'He shakes his fists at the monkeys' },
        { emoji: '💡', text: 'The cap-seller has an idea' },
        { emoji: '🧢', text: 'He throws his own cap down' },
        { emoji: '🎉', text: 'Caps come back — he goes home happy' }
      ]
    }
  },
  {
    id: 'en5', n: 5, title: 'A Farm', emoji: '🐄', topic: 'Farm animals & sounds',
    c1: '#16a34a', c2: '#eab308',
    desc: 'Farm animals, their sounds and colours — a free Class 1 English lesson and quiz game from NCERT Mridang unit 2 chapter 3 "A Farm".',
    learn: {
      intro: 'Grandpa had a farm — E-I-E-I-O! The cow says moo, the hen says cluck. Meet the animals and birds near Jaggu’s house in Nagpur: a dog at the gate, cats in the verandah, a green parrot and a many-coloured peacock.',
      points: [
        'The cow says MOO, the hen says CLUCK — every animal has a sound.',
        'Farm animals: cat, cow, goat, pig, hen, cock, sparrow.',
        'Jaggu’s pets: the dog lives near the gate, the cat chases the rat.',
        'A parrot is green with a red beak — a peacock has many colours!'
      ],
      words: ['cow', 'hen', 'goat', 'pig', 'dog', 'cat', 'parrot', 'peacock', 'moo', 'cluck']
    },
    game: {
      type: 'quiz', title: 'Farm Friends', instructions: 'Listen in your head and tap the right answer.',
      questions: [
        { vis: '🐄', q: 'The cow says ____.', options: ['cluck', 'moo', 'oink'], a: 1, hint: 'A cow says MOO-MOO!' },
        { vis: '🐔', q: 'The hen says ____.', options: ['moo', 'cluck', 'meow'], a: 1, hint: 'A hen says CLUCK-CLUCK!' },
        { vis: '🦁 | 🐔 🐐', q: 'Which animal does NOT live on a farm?', options: ['Lion', 'Hen', 'Goat'], a: 0, hint: 'The lion lives in the jungle, not on a farm.' },
        { vis: '🐶 🚪', q: 'Jaggu’s dog lives near the ____.', options: ['sky', 'gate', 'river'], a: 1, hint: 'It lives near the gate of the house.' },
        { vis: '🐈 🏃 🐀', q: 'The cat ____ the rat.', options: ['chases', 'feeds', 'carries'], a: 0, hint: 'The cat chases the rat!' },
        { vis: '🦜', q: 'A parrot is ____ and has a red beak.', options: ['black', 'red', 'green'], a: 2, hint: 'The parrot is GREEN with a red beak.' },
        { vis: '🦚', q: 'The peacock has ____.', options: ['only white', 'many colours', 'no colours'], a: 1, hint: 'The peacock has many colours!' },
        { vis: '🐒 🌳', q: 'The monkeys ____ and jump in the trees.', options: ['swim', 'fly', 'swing'], a: 2, hint: 'Monkeys SWING from branch to branch.' }
      ]
    }
  },
  {
    id: 'en6', n: 6, title: 'Fun with Pictures', emoji: '🥭', topic: 'Fruits & vegetables',
    c1: '#ef4444', c2: '#22c55e',
    desc: 'Name fruits and vegetables in English and match them to pictures — a free Class 1 English lesson and game from NCERT Mridang unit 3 chapter 1.',
    learn: {
      intro: 'Five red apples hanging on the tree! In the market we see fruits and vegetables of every colour — red apples, yellow mangoes, green guavas, purple brinjals and orange carrots. We eat them to stay healthy and we share them with friends.',
      points: [
        'Fruits: apple, mango, banana, guava, grapes. Vegetables: carrot, brinjal, potato.',
        'Colours of food: red apple, yellow mango, green guava, purple brinjal, orange carrot.',
        'Rhyme: "Five red apples hanging on the tree — one for you, one for me!"',
        'Sight words: his, he, them, her, around, there, those, behind, with, these.'
      ],
      words: ['apple', 'mango', 'banana', 'guava', 'grapes', 'carrot', 'brinjal', 'potato', 'market', 'fruit']
    },
    game: {
      type: 'match', title: 'Match Fruits & Veggies', instructions: 'Tap a word, then tap the right picture.',
      pairs: [
        ['Apple', '🍎'], ['Mango', '🥭'], ['Banana', '🍌'],
        ['Grapes', '🍇'], ['Carrot', '🥕'], ['Brinjal', '🍆']
      ]
    }
  },
  {
    id: 'en7', n: 7, title: 'The Food we Eat', emoji: '🍽️', topic: 'Food, riddles & sharing',
    c1: '#f97316', c2: '#ec4899',
    desc: 'Food riddles, syllable claps and the joy of sharing — a free Class 1 English lesson and quiz game from NCERT Mridang unit 3 chapter 2.',
    learn: {
      intro: 'Poori with aloo sabzi, roti, idli with chutney, paratha, chilla — so many lunch boxes! We solve food riddles, clap syllables (far–mer, two claps) and learn that food tastes better when we share it and say thank you.',
      points: [
        'Riddle answers: orange, coconut, onion, grapes — can you solve them?',
        'Clap once for one syllable: man, cat, hut. Clap twice: far-mer, car-rot.',
        'New words: have, thank you, share, lunch, sick, fruits, today, smiling.',
        'When a friend is hungry, we SHARE our food — and say THANK YOU.'
      ],
      words: ['lunch', 'share', 'thank you', 'paratha', 'idli', 'chilla', 'market', 'farmer', 'dinner']
    },
    game: {
      type: 'quiz', title: 'Food Riddles & Claps', instructions: 'Solve each riddle or clap count, then tap the answer.',
      questions: [
        { vis: '🟠', q: 'I am a fruit. My name is my colour. Who am I?', options: ['Orange', 'Apple', 'Grapes'], a: 0, hint: 'My name tells my colour — ORANGE!' },
        { vis: '🥥', q: 'Hard and brown outside, soft and white inside. Who am I?', options: ['Potato', 'Coconut', 'Onion'], a: 1, hint: 'The coconut is hard outside, white inside!' },
        { vis: '🧅 😭', q: 'I am pink and I make you cry when cut. Who am I?', options: ['Onion', 'Lemon', 'Chilli'], a: 0, hint: 'Cutting an ONION makes your eyes water!' },
        { vis: '🍇 🍇', q: 'I come in green or purple, in a bunch. Who am I?', options: ['Mango', 'Banana', 'Grapes'], a: 2, hint: 'GRAPES come together in a bunch!' },
        { vis: '👏 🌾', q: 'Say and clap: far–mer. How many claps?', options: ['2', '1', '3'], a: 0, hint: 'FAR–MER — two claps, two syllables!' },
        { vis: '👏 🧍', q: 'Say and clap: man. It has ____ syllable.', options: ['one', 'two', 'three'], a: 0, hint: 'One short word, one clap — ONE syllable!' },
        { vis: '🤝 🍛', q: 'When a friend is hungry, we should ____ our food.', options: ['hide', 'share', 'waste'], a: 1, hint: 'Sharing food makes everyone smile!' },
        { vis: '🙏 🍲', q: 'After a meal we say…', options: ['Sorry', 'Thank you', 'Good night'], a: 1, hint: 'We say THANK YOU for the food we get.' }
      ]
    }
  },
  {
    id: 'en8', n: 8, title: 'The Four Seasons', emoji: '🌦️', topic: 'Seasons & clothes',
    c1: '#06b6d4', c2: '#8b5cf6',
    desc: 'Summer, spring, monsoon and winter — what happens and what we wear. A free Class 1 English seasons lesson and quiz game from NCERT Mridang unit 4 chapter 1.',
    learn: {
      intro: 'Summer is hot, winter is cold, monsoon clouds are filled with rain and spring makes flowers bloom. Learn what each season brings and the clothes we wear — cotton frocks in summer, woolen caps in winter and umbrellas in the monsoon!',
      points: [
        'Summer is HOT — everyone wants a dip in the pool.',
        'Spring: flowers bloom every day. Winter: people enjoy the sun’s rays.',
        'Monsoon clouds are filled with RAIN — carry an umbrella!',
        'Clothes: frock, shirt, cap, sari, dhoti-kurta, woolen cap, t-shirt.'
      ],
      words: ['summer', 'winter', 'spring', 'monsoon', 'rain', 'hot', 'cold', 'umbrella', 'frock']
    },
    game: {
      type: 'quiz', title: 'Season sorter', instructions: 'Read the clue and tap the right season word.',
      questions: [
        { vis: '☀️ 🔥', q: 'Summer is ____.', options: ['cold', 'hot', 'wet'], a: 1, hint: 'Summer is HOT — dive into the pool!' },
        { vis: '❄️ 🧣', q: 'Winter is ____.', options: ['hot', 'cold', 'dry'], a: 1, hint: 'Winter is COLD — wear warm clothes.' },
        { vis: '🌧️ ☁️', q: 'Monsoon clouds are filled with ____.', options: ['snow', 'sand', 'rain'], a: 2, hint: 'Clouds bring RAIN in the monsoon.' },
        { vis: '🌸 🌱', q: 'In spring, flowers ____ every day.', options: ['bloom', 'fall', 'burn'], a: 0, hint: 'Flowers BLOOM — they open up pretty!' },
        { vis: '🧣 🥶', q: 'In winter we wear a ____.', options: ['cotton frock', 'woolen cap', 't-shirt'], a: 1, hint: 'A WOolen CAP keeps you warm.' },
        { vis: '☔ 🌧️', q: 'In the monsoon we carry an ____.', options: ['umbrella', 'balloon', 'fan'], a: 0, hint: 'An UMBRELLA keeps the rain off!' },
        { vis: '👒 ☀️', q: 'Brinda wears a cotton ____ in summer.', options: ['frock', 'sweater', 'boots'], a: 0, hint: 'She is wearing a cotton FROCK in Hyderabad.' },
        { vis: '🌊 🏊', q: 'In summer everyone wants a dip in the ____.', options: ['cave', 'tree', 'pool'], a: 2, hint: 'A dip in the POOL cools you down!' }
      ]
    }
  },
  {
    id: 'en9', n: 9, title: 'Anandi’s Rainbow', emoji: '🌈', topic: 'Colours of the rainbow',
    c1: '#6366f1', c2: '#f43f5e',
    desc: 'Learn the seven colours of the rainbow in order — a free Class 1 English lesson and sequencing game from NCERT Mridang unit 4 chapter 2 "Anandi’s Rainbow".',
    learn: {
      intro: 'After the rain, a huge bright rainbow crosses the blue sky! Anandi paints her garden flowers with its colours and leaves yellow for the shining Sun. Put the seven bands in order — red on top, violet at the bottom.',
      points: [
        'Seven colours: red, orange, yellow, green, blue, indigo, violet.',
        'Red is the top band of the rainbow — violet is the last.',
        'Anandi’s cat is called Milli; the Sun kept its bright yellow.',
        'After the rain comes the rainbow — colours hide when it is gone.'
      ],
      words: ['rainbow', 'red', 'orange', 'yellow', 'green', 'blue', 'violet', 'colour', 'sky']
    },
    game: {
      type: 'sequence', title: 'Put the Rainbow in Order', instructions: 'Tap the colours from the top of the rainbow — red first, violet last.',
      leftTitle: 'Rainbow, top to bottom', rightTitle: 'Tap the next colour',
      steps: [
        { emoji: '🔴', text: 'Red — the top band' },
        { emoji: '🟠', text: 'Orange' },
        { emoji: '🟡', text: 'Yellow — the Sun kept it' },
        { emoji: '🟢', text: 'Green for the leaves' },
        { emoji: '🔵', text: 'Blue' },
        { emoji: '🟦', text: 'Indigo' },
        { emoji: '🟪', text: 'Violet — the last band' }
      ]
    }
  }
];
/* chapter.js reads window.CHAPTERS; a page loads exactly one data file. */
window.CHAPTERS = window.EN_CHAPTERS;
window.CHAPTER_SUBJECT = 'Class 1 English';
