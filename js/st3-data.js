/* PlayHub — Santoor Class 3 English chapter content
   Source: NCERT Santoor, Textbook of English for Class 3 (Reprint 2026-27), Chapters 1–12.
   Each chapter: story + learning card + one interactive game (quiz | match | sequence). */
window.ST3_CHAPTERS = [
  {
    id: 'c3st1', n: 1, title: 'Colours', emoji: '🎨', topic: 'Naming colours around us',
    c1: '#ef4444', c2: '#f59e0b',
    desc: 'Red apples, yellow suns, blue skies — name every colour! A free Class 3 English lesson and matching game from NCERT Santoor chapter 1.',
    learn: {
      story: 'Meena opens her colour box — wow! Every crayon has a name. Let’s paint the world and learn each colour’s name! 🖍️',
      intro: 'Colours have names: red, yellow, blue, green, orange, purple, pink, brown, black, white.',
      points: [
        'Say the colour before the thing — “red apple”.',
        'The sun is yellow, the sky is blue, leaves are green.',
        'Mix red and yellow to imagine orange!',
        'Ask “What colour is it?” to learn new colours.'
      ],
      words: ['red', 'yellow', 'blue', 'green', 'orange', 'colour']
    },
    game: {
      type: 'match', title: 'Match the Colours!', instructions: 'Tap a colour word, then tap its colour.',
      pairs: [
        ['Red', '🟥'], ['Yellow', '🟨'], ['Blue', '🟦'],
        ['Green', '🟩'], ['Orange', '🟧'], ['Purple', '🟪']
      ]
    }
  },
  {
    id: 'c3st2', n: 2, title: 'Badal and Moti', emoji: '☁️', topic: 'Two friends: a cloud and a pearl',
    c1: '#0ea5e9', c2: '#8b5cf6',
    desc: 'Badal the cloud and Moti the pearl are best friends! A free Class 3 English lesson and quiz game from NCERT Santoor chapter 2.',
    learn: {
      story: 'High in the sky floats Badal the soft cloud. Deep in the sea shines Moti the pearl. Different homes — but the BEST of friends! ☁️🦪',
      intro: 'Friends can be different and still love each other. This story is about kindness between two unlikely friends.',
      points: [
        'Badal is a soft white cloud in the sky.',
        'Moti is a shining pearl from the sea.',
        'Good friends help each other.',
        '“Who is your best friend?” — answer in a full sentence.'
      ],
      words: ['cloud', 'pearl', 'friend', 'sky', 'sea', 'kind']
    },
    game: {
      type: 'quiz', title: 'Badal and Moti Quiz', instructions: 'Remember the story and tap the answer.',
      questions: [
        { vis: '☁️', q: 'Who is Badal?', options: ['A pearl', 'A star', 'A cloud'], a: 2, hint: 'Badal floats soft and white in the sky!' },
        { vis: '🦪', q: 'Where does Moti the pearl live?', options: ['In the sea', 'On a tree', 'In the sky'], a: 0, hint: 'Pearls come from the sea!' },
        { vis: '☁️❤️🦪', q: 'Badal and Moti are…?', options: ['Enemies', 'Best friends', 'Strangers'], a: 1, hint: 'Different homes, same love — best friends!' },
        { vis: '🤝', q: 'What do good friends do?', options: ['Fight daily', 'Help each other', 'Hide toys'], a: 1, hint: 'Friends help each other!' },
        { vis: '🌧️', q: 'What does a cloud give us?', options: ['Rain', 'Sand', 'Snow caps'], a: 0, hint: 'Clouds bring rain!' },
        { vis: '✨', q: 'How does Moti look?', options: ['Dark and rough', 'Shiny and white', 'Red and big'], a: 1, hint: 'Pearls shine white!' }
      ]
    }
  },
  {
    id: 'c3st3', n: 3, title: 'Best Friends', emoji: '👭', topic: 'What makes a best friend',
    c1: '#ec4899', c2: '#f97316',
    desc: 'Sharing, caring, playing together — what makes a BEST friend? A free Class 3 English lesson and quiz game from NCERT Santoor chapter 3.',
    learn: {
      story: 'Raju shares his lunch, Tina shares her crayons. Best friends share, care and never leave anyone out! 👭🍱',
      intro: 'A best friend shares, helps, listens and plays fair.',
      points: [
        'Share your toys, food and colours.',
        'Help a friend who falls or feels sad.',
        'Take turns — everyone gets a chance.',
        'Say “sorry” and “thank you” to friends.'
      ],
      words: ['share', 'care', 'help', 'friend', 'turn', 'sorry']
    },
    game: {
      type: 'quiz', title: 'Best Friends Quiz', instructions: 'Choose what a good friend does.',
      questions: [
        { vis: '🍱➡️👭', q: 'Your friend forgot lunch. You…?', options: ['Eat alone', 'Share your lunch', 'Laugh'], a: 1, hint: 'Best friends share!' },
        { vis: '😢', q: 'Your friend is crying. You…?', options: ['Walk away', 'Ask and comfort', 'Giggle'], a: 1, hint: 'Care and comfort!' },
        { vis: '🪀', q: 'Two friends, one top. Fair play means…?', options: ['Take turns', 'Grab it', 'Hide it'], a: 0, hint: 'Take turns!' },
        { vis: '🙏', q: 'You broke a friend’s pencil. Say…?', options: ['Nothing', 'Sorry', 'Good'], a: 1, hint: 'Say sorry!' },
        { vis: '🎁', q: 'A friend gives you a drawing. Say…?', options: ['Thank you', 'Yuck', 'Mine now'], a: 0, hint: 'Say thank you!' },
        { vis: '👭🎮', q: 'Best friends always…?', options: ['Fight', 'Play fair together', 'Tattle'], a: 1, hint: 'Play fair together!' }
      ]
    }
  },
  {
    id: 'c3st4', n: 4, title: 'Out in the Garden', emoji: '🌻', topic: 'Things growing in a garden',
    c1: '#16a34a', c2: '#84cc16',
    desc: 'Buzzing bees, smiling sunflowers and wriggly worms in the garden! A free Class 3 English lesson and matching game from NCERT Santoor chapter 4.',
    learn: {
      story: 'Step into the garden — bees buzz, flowers nod, and a fat worm wriggles under the leaves. What can YOU spot? 🐝',
      intro: 'A garden is full of living things: flowers, trees, birds, bees, butterflies and worms.',
      points: [
        'Flowers need sun, water and soil.',
        'Bees sip nectar and carry pollen.',
        'Birds sing and build nests in trees.',
        'Name three things you see in a garden.'
      ],
      words: ['garden', 'flower', 'bee', 'butterfly', 'tree', 'soil']
    },
    game: {
      type: 'match', title: 'Garden Matching!', instructions: 'Tap a garden word, then tap its picture.',
      pairs: [
        ['Flower', '🌻'], ['Bee', '🐝'], ['Butterfly', '🦋'],
        ['Tree', '🌳'], ['Bird', '🐦'], ['Worm', '🪱']
      ]
    }
  },
  {
    id: 'c3st5', n: 5, title: 'Talking Toys', emoji: '🤖', topic: 'Toys that talk and move',
    c1: '#8b5cf6', c2: '#ec4899',
    desc: 'If toys could talk, what would they say? A free Class 3 English lesson and quiz game from NCERT Santoor chapter 5.',
    learn: {
      story: 'At midnight the toy box creaks open! The teddy stretches, the robot beeps, and the doll sings. If toys could talk… listen! 🧸',
      intro: 'Imagine what toys would say. Use action words: walk, talk, sing, dance, beep, jump.',
      points: [
        'The robot beeps and walks with stiff legs.',
        'The doll sings a sweet lullaby.',
        'The teddy loves warm hugs.',
        'Ask your toy: “What do you want to do today?”'
      ],
      words: ['robot', 'doll', 'teddy', 'beep', 'sing', 'dance']
    },
    game: {
      type: 'quiz', title: 'Talking Toys Quiz', instructions: 'Listen to each toy and tap the answer.',
      questions: [
        { vis: '🤖', q: 'What sound does the robot make?', options: ['Meow', 'Beep-beep', 'Quack'], a: 1, hint: 'Robots go beep-beep!' },
        { vis: '🎎🎵', q: 'What does the doll love to do?', options: ['Sing', 'Swim', 'Fly'], a: 0, hint: 'Dolls sing sweet songs!' },
        { vis: '🧸❤️', q: 'What does the teddy want most?', options: ['A car', 'A warm hug', 'A hat'], a: 1, hint: 'Teddies love hugs!' },
        { vis: '🚗💨', q: 'The toy car says…?', options: ['Vroom-vroom', 'Tick-tock', 'Ding-dong'], a: 0, hint: 'Cars go vroom-vroom!' },
        { vis: '🪁', q: 'Where does the kite love to go?', options: ['Under bed', 'High in the sky', 'In a box'], a: 1, hint: 'Kites fly high!' },
        { vis: '🎠', q: 'The rocking horse moves…?', options: ['Back and forth', 'Up only', 'Round and round'], a: 0, hint: 'Rock back and forth!' }
      ]
    }
  },
  {
    id: 'c3st6', n: 6, title: 'Paper Boats', emoji: '⛵', topic: 'Folding a paper boat in order',
    c1: '#06b6d4', c2: '#0ea5e9',
    desc: 'Fold, press, open — sail your own paper boat! A free Class 3 English boat-folding sequence game from NCERT Santoor chapter 6.',
    learn: {
      story: 'Rain puddles are oceans for paper boats! Fold one carefully, sail it giggling, and share the joy with friends. ⛵🌧️',
      intro: 'Folding needs steps in order. Fold, crease, fold again — then sail!',
      points: [
        'Start with a rectangle of paper.',
        'Fold in half and press the crease.',
        'Open the bottom to make the boat.',
        'Float it gently — paper tears if rushed!'
      ],
      words: ['paper', 'fold', 'boat', 'crease', 'float', 'sail']
    },
    game: {
      type: 'sequence', title: 'Fold a Paper Boat', instructions: 'Tap the folding steps in order.',
      leftTitle: 'Folding order', rightTitle: 'Tap the next step',
      steps: [
        { emoji: '📄', text: 'Take a rectangle of paper' },
        { emoji: '↔️', text: 'Fold it in half' },
        { emoji: '👆', text: 'Press the crease flat' },
        { emoji: '🔺', text: 'Fold corners to the middle' },
        { emoji: '⛵', text: 'Open the bottom into a boat' },
        { emoji: '🌧️', text: 'Float it in a puddle' }
      ]
    }
  },
  {
    id: 'c3st7', n: 7, title: 'The Big Laddoo', emoji: '🟠', topic: 'Big and small sizes',
    c1: '#f59e0b', c2: '#ef4444',
    desc: 'One ENORMOUS laddoo and many tiny ones — big or small? A free Class 3 English lesson and quiz game from NCERT Santoor chapter 7.',
    learn: {
      story: 'For the festival, Grandma rolls one GIANT laddoo — as big as a football! Beside it sit tiny baby laddoos. Which would you pick? 🟠',
      intro: 'Things come in sizes: big, bigger, biggest — small, smaller, smallest.',
      points: [
        'Big and small are opposites.',
        'Compare two things to say which is bigger.',
        '“Biggest” wins among three or more.',
        'Festival sweets come in many sizes!'
      ],
      words: ['big', 'small', 'biggest', 'compare', 'sweet', 'size']
    },
    game: {
      type: 'quiz', title: 'Big or Small Quiz', instructions: 'Compare and tap the answer.',
      questions: [
        { vis: '🟠 | 🟠', q: 'Football laddoo vs marble laddoo — bigger?', options: ['Marble laddoo', 'Football laddoo', 'Same'], a: 1, hint: 'Football-sized wins!' },
        { vis: '🐘 | 🐭', q: 'Bigger animal?', options: ['Mouse', 'Elephant', 'Same'], a: 1, hint: 'Elephant is biggest!' },
        { vis: '🌳🌲🌴', q: 'Three trees — how do we find the tallest?', options: ['Guess', 'Compare all three', 'Pick any'], a: 1, hint: 'Compare them all!' },
        { vis: '🍉 | 🍇', q: 'Smaller fruit?', options: ['Watermelon', 'Grape', 'Same'], a: 1, hint: 'Tiny grape!' },
        { vis: '🏠🏰🛖', q: 'Which word means MOST big?', options: ['Big', 'Bigger', 'Biggest'], a: 2, hint: 'Biggest beats all!' },
        { vis: '🐜 | 🐘', q: 'Smallest animal here?', options: ['Ant', 'Elephant', 'Same'], a: 0, hint: 'Teeny ant!' }
      ]
    }
  },
  {
    id: 'c3st8', n: 8, title: 'Thank God', emoji: '🍎', topic: 'Fruits of the orchard and thanks',
    c1: '#ef4444', c2: '#22c55e',
    desc: 'Wander the orchard, taste sweet fruits and say thank you! A free Class 3 English lesson and matching game from NCERT Santoor chapter 8.',
    learn: {
      story: 'The orchard is bursting — mangoes glow, apples blush. We thank God, the farmer and the sun for every juicy bite! 🍎🙏',
      intro: 'Fruits grow on trees in orchards. Say thank you for food, sun and rain.',
      points: [
        'An orchard is a garden of fruit trees.',
        'Mangoes, apples, bananas grow on trees.',
        'Farmers work hard to grow our food.',
        'Say “thank you” before you eat.'
      ],
      words: ['orchard', 'mango', 'apple', 'farmer', 'thank', 'fruit']
    },
    game: {
      type: 'match', title: 'Orchard Matching!', instructions: 'Tap a fruit word, then tap its picture.',
      pairs: [
        ['Mango', '🥭'], ['Apple', '🍎'], ['Banana', '🍌'],
        ['Grapes', '🍇'], ['Orange', '🍊'], ['Coconut', '🥥']
      ]
    }
  },
  {
    id: 'c3st9', n: 9, title: 'Madhu’s Wish', emoji: '💧', topic: 'Water and good food wishes',
    c1: '#0ea5e9', c2: '#14b8a6',
    desc: 'Madhu wishes for clean water and healthy food for all! A free Class 3 English lesson and quiz game from NCERT Santoor chapter 9.',
    learn: {
      story: 'Madhu closes her eyes and wishes: clean water in every home, fresh food on every plate. What would YOU wish for? 💧🌾',
      intro: 'Water is life. Good food keeps us strong. Wishes show we care.',
      points: [
        'Drink clean water every day.',
        'Fresh fruits and vegetables keep us healthy.',
        'Do not waste water or food.',
        '“I wish…” shares a kind dream.'
      ],
      words: ['water', 'wish', 'healthy', 'fresh', 'drink', 'waste']
    },
    game: {
      type: 'quiz', title: 'Madhu’s Wish Quiz', instructions: 'Choose the healthy, kind answer.',
      questions: [
        { vis: '💧', q: 'What should we drink every day?', options: ['Soda only', 'Clean water', 'Nothing'], a: 1, hint: 'Clean water keeps us going!' },
        { vis: '🍎🥕', q: 'Which food keeps us strong?', options: ['Chips only', 'Fruits and vegetables', 'Candy only'], a: 1, hint: 'Fresh fruits and veggies!' },
        { vis: '🚰', q: 'Brushing teeth — tap water should be…?', options: ['Running full', 'Turned off while brushing', 'Hot always'], a: 1, hint: 'Save every drop!' },
        { vis: '🍱🗑️', q: 'Leftover food should be…?', options: ['Thrown daily', 'Shared or saved', 'Hidden'], a: 1, hint: 'Share, don’t waste!' },
        { vis: '🌧️🌾', q: 'Plants need what to grow?', options: ['Water and sun', 'Toys', 'Noise'], a: 0, hint: 'Water and sunshine!' },
        { vis: '💭❤️', q: 'Madhu’s wish shows she is…?', options: ['Greedy', 'Kind and caring', 'Sleepy'], a: 1, hint: 'Kind wishes for all!' }
      ]
    }
  },
  {
    id: 'c3st10', n: 10, title: 'Night', emoji: '🌙', topic: 'Things of the night sky',
    c1: '#1e1b4b', c2: '#7c3aed',
    desc: 'Moon, twinkling stars and hooting owls — hello, night! A free Class 3 English lesson and matching game from NCERT Santoor chapter 10.',
    learn: {
      story: 'The sun yawns and sleeps. Out come the moon, winking stars and a wise owl. Shh… the night has stories to tell! 🌙🦉',
      intro: 'Night brings the moon, stars and night animals. Day animals sleep.',
      points: [
        'The moon glows in the night sky.',
        'Stars twinkle far, far away.',
        'Owls wake at night; crows sleep.',
        'Say “good night” before you sleep.'
      ],
      words: ['night', 'moon', 'star', 'owl', 'sleep', 'twinkle']
    },
    game: {
      type: 'match', title: 'Night Matching!', instructions: 'Tap a night word, then tap its picture.',
      pairs: [
        ['Moon', '🌙'], ['Star', '⭐'], ['Owl', '🦉'],
        ['Bat', '🦇'], ['Lamp', '🪔'], ['Bed', '🛏️']
      ]
    }
  },
  {
    id: 'c3st11', n: 11, title: 'Chanda Mama Counts the Stars', emoji: '✨', topic: 'Counting on and on',
    c1: '#312e81', c2: '#f59e0b',
    desc: 'Chanda Mama counts stars — 10, 100, 1000… can numbers ever end? A free Class 3 English lesson and quiz game from NCERT Santoor chapter 11.',
    learn: {
      story: 'Chanda Mama points at the sky: “One star, two stars…” The Sun laughs — stars are SO many, you can never finish counting! 🌟',
      intro: 'Numbers never end. After every number comes one more. The Sun and Moon love counting with us.',
      points: [
        'Count forward: 1, 2, 3… it never ends!',
        '10 stars + 10 stars = 20 stars.',
        'The Moon is Chanda Mama; the Sun is his friend.',
        'Big counts can be grouped in tens.'
      ],
      words: ['count', 'star', 'moon', 'sun', 'many', 'never']
    },
    game: {
      type: 'quiz', title: 'Star Counting Quiz', instructions: 'Count with Chanda Mama and tap the answer.',
      questions: [
        { vis: '🌟 × 🔟', q: '10 stars + 10 stars = ?', options: ['10', '20', '100'], a: 1, hint: '10 + 10 = 20!' },
        { vis: '🌙', q: 'Who is Chanda Mama?', options: ['The Sun', 'The Moon', 'A star'], a: 1, hint: 'Mama Moon!' },
        { vis: '☀️', q: 'Who shines in the daytime?', options: ['The Moon', 'The Sun', 'Stars'], a: 1, hint: 'Sunny day!' },
        { vis: '5️⃣➡️❓', q: 'After 5 comes…?', options: ['4', '6', '10'], a: 1, hint: 'One more — 6!' },
        { vis: '⭐⭐⭐ | ⭐⭐', q: '3 stars vs 2 stars — more?', options: ['2 stars', 'Same', '3 stars'], a: 2, hint: '3 beats 2!' },
        { vis: '🔢♾️', q: 'Do numbers ever end?', options: ['Yes at 100', 'Never', 'Yes at 10'], a: 1, hint: 'There is always one more!' }
      ]
    }
  },
  {
    id: 'c3st12', n: 12, title: 'Chandrayaan', emoji: '🚀', topic: 'India’s Moon mission in order',
    c1: '#0f172a', c2: '#ef4444',
    desc: '3… 2… 1… BLAST OFF to the Moon with Chandrayaan! A free Class 3 English mission sequence game from NCERT Santoor chapter 12.',
    learn: {
      story: 'India’s rocket roars and climbs past the clouds! Chandrayaan carries our dreams all the way to the Moon. Will it land softly? 🚀🌙',
      intro: 'Chandrayaan is India’s Moon spacecraft. A mission flies in steps: build, launch, travel, land.',
      points: [
        'Scientists build the rocket and lander.',
        'Countdown ends with a mighty blast-off!',
        'The spacecraft travels through space to the Moon.',
        'A soft landing lets us study the Moon.'
      ],
      words: ['rocket', 'moon', 'launch', 'space', 'land', 'mission']
    },
    game: {
      type: 'sequence', title: 'Chandrayaan Mission Order', instructions: 'Tap the mission steps from first to last.',
      leftTitle: 'Mission order', rightTitle: 'Tap the next step',
      steps: [
        { emoji: '🔧', text: 'Scientists build the rocket' },
        { emoji: '⛽', text: 'Fill fuel and check all parts' },
        { emoji: '🔟', text: 'Countdown: 3… 2… 1…' },
        { emoji: '🚀', text: 'Blast off into the sky' },
        { emoji: '🌌', text: 'Travel through space' },
        { emoji: '🌙', text: 'Land softly on the Moon' }
      ]
    }
  }
];
window.CHAPTERS = window.ST3_CHAPTERS;
window.CHAPTER_SUBJECT = 'Class 3 English';
