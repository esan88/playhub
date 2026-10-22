/* PlayHub — Math Magic Class 3 chapter content
   Source: NCERT Mathematics Class 3 / Math Magic (rationalised), Chapters 1–14.
   Each chapter: story + learning card + one interactive game (quiz | match | sequence). */
window.MH3_CHAPTERS = [
  {
    id: 'c3mh1', n: 1, title: 'Where to Look From', emoji: '👀', topic: 'Top view, side view, front view',
    c1: '#8b5cf6', c2: '#0ea5e9',
    desc: 'Top, side or front — same thing looks different! A free Class 3 maths lesson and quiz game from NCERT Math Magic chapter 1.',
    learn: {
      story: 'Amit climbs the table — wow, the thali looks like a circle from the top! Jump down — now it’s a line! Same thali, new look! 👀',
      intro: 'Things look different from the top, side and front. Draw what you see from each side.',
      points: [
        'Top view looks down from above.',
        'Side view looks from the left or right.',
        'A ball looks like a circle from every side.',
        'A cap looks different from top and side.'
      ],
      words: ['view', 'top', 'side', 'front', 'same', 'different']
    },
    game: {
      type: 'quiz', title: 'Views Quiz', instructions: 'Imagine the view and tap the answer.',
      questions: [
        { vis: '🍽️⬇️', q: 'A round thali from the TOP looks like…?', options: ['A line', 'A circle', 'A triangle'], a: 1, hint: 'Round from above!' },
        { vis: '🍽️➡️', q: 'The same thali from the SIDE looks like…?', options: ['A circle', 'A thin line', 'A square'], a: 1, hint: 'Flat from the side!' },
        { vis: '⚽ | ⚽ | ⚽', q: 'A ball from top, side or front looks…?', options: ['Different each time', 'A circle every time', 'A square'], a: 1, hint: 'Balls never change shape!' },
        { vis: '🧢⬇️ | 🧢➡️', q: 'A cap: top view vs side view — same?', options: ['Yes, same', 'No, different', 'Cap has no view'], a: 1, hint: 'Different views differ!' },
        { vis: '🪑⬇️', q: 'A chair from the top shows mainly the…?', options: ['Legs', 'Seat', 'Back'], a: 1, hint: 'Look down — the seat!' },
        { vis: '🐘⬇️', q: 'An elephant from very high looks…?', options: ['Huge as ever', 'Small like a toy', 'Invisible'], a: 1, hint: 'Far above = tiny!' }
      ]
    }
  },
  {
    id: 'c3mh2', n: 2, title: 'Fun with Numbers', emoji: '🔢', topic: 'Numbers to 100 and jumps',
    c1: '#16a34a', c2: '#0ea5e9',
    desc: 'Hop, skip and jump on the number line to 100! A free Class 3 maths lesson and quiz game from NCERT Math Magic chapter 2.',
    learn: {
      story: 'The 1–100 number strip is a racing track! Frog jumps 2s, rabbit jumps 5s, cheetah jumps 10s. Who reaches 100 first? 🐸',
      intro: 'Count forward and backward. Jump in 2s, 5s and 10s to count fast.',
      points: [
        'Numbers 1 to 100 sit in order.',
        'Jumping in 10s: 10, 20, 30 … 100.',
        'Even jumps land on 2, 4, 6, 8 …',
        'Backward counting goes 100, 99, 98 …'
      ],
      words: ['number', 'jump', 'forward', 'backward', 'order', 'count']
    },
    game: {
      type: 'quiz', title: 'Number Jumps Quiz', instructions: 'Find the jumps and tap the answer.',
      questions: [
        { vis: '🔟 2️⃣0️⃣ 3️⃣0️⃣ ❓', q: 'Next after 10, 20, 30?', options: ['35', '40', '25'], a: 1, hint: 'Tens march on — 40!' },
        { vis: '2️⃣ 4️⃣ 6️⃣ ❓', q: 'Next after 2, 4, 6?', options: ['7', '8', '10'], a: 1, hint: 'Twos hop — 8!' },
        { vis: '5️⃣ 🔟 1️⃣5️⃣ ❓', q: 'Next after 5, 10, 15?', options: ['16', '20', '25'], a: 1, hint: 'Fives jump — 20!' },
        { vis: '💯 ⬅️', q: 'One less than 100?', options: ['101', '99', '90'], a: 1, hint: 'Step back — 99!' },
        { vis: '5️⃣0️⃣ 4️⃣9️⃣ 4️⃣8️⃣ ❓', q: 'Counting back: 50, 49, 48, __?', options: ['47', '51', '40'], a: 0, hint: 'Backwards — 47!' },
        { vis: '3️⃣3️⃣', q: 'In 33, both digits are…?', options: ['Different', 'Same: 3 and 3', 'Zero'], a: 1, hint: 'Twin threes!' }
      ]
    }
  },
  {
    id: 'c3mh3', n: 3, title: 'Give and Take', emoji: '🎁', topic: 'Adding and subtracting',
    c1: '#f59e0b', c2: '#ef4444',
    desc: 'Give toffees, take change — add and subtract like a star! A free Class 3 maths lesson and quiz game from NCERT Math Magic chapter 3.',
    learn: {
      story: 'Golu’s shop: give 46 balloons, take 20 back, add 15 more! Every customer is a plus-or-minus puzzle. 🎈',
      intro: 'Addition combines. Subtraction takes away. Use jumps of 10 to calculate fast.',
      points: [
        '46 + 20 = 66: add tens first.',
        '75 − 30 = 45: subtract tens first.',
        'Add ones, then tens, for big sums.',
        'Check answers by reversing the sum.'
      ],
      words: ['give', 'take', 'add', 'subtract', 'total', 'left']
    },
    game: {
      type: 'quiz', title: 'Give and Take Quiz', instructions: 'Calculate and tap the answer.',
      questions: [
        { vis: '4️⃣6️⃣ ➕ 2️⃣0️⃣', q: '46 + 20 = ?', options: ['48', '66', '86'], a: 1, hint: '46 + 20 = 66!' },
        { vis: '7️⃣5️⃣ ➖ 3️⃣0️⃣', q: '75 − 30 = ?', options: ['45', '72', '105'], a: 0, hint: '75 − 30 = 45!' },
        { vis: '🎈 3️⃣4️⃣ ➕ 1️⃣5️⃣', q: '34 + 15 = ?', options: ['39', '49', '59'], a: 1, hint: '34 + 15 = 49!' },
        { vis: '🍬 9️⃣0️⃣ ➖ 2️⃣5️⃣', q: '90 − 25 = ?', options: ['75', '65', '115'], a: 1, hint: '90 − 25 = 65!' },
        { vis: '5️⃣8️⃣ ➕ 3️⃣2️⃣', q: '58 + 32 = ?', options: ['80', '90', '810'], a: 1, hint: '58 + 32 = 90!' },
        { vis: '1️⃣0️⃣0️⃣ ➖ 1️⃣', q: '100 − 1 = ?', options: ['99', '101', '90'], a: 0, hint: 'One less — 99!' }
      ]
    }
  },
  {
    id: 'c3mh4', n: 4, title: 'Long and Short', emoji: '📏', topic: 'Comparing lengths',
    c1: '#0ea5e9', c2: '#f59e0b',
    desc: 'Giraffe tall, ant small — who is longer? A free Class 3 maths lesson and quiz game from NCERT Math Magic chapter 4.',
    learn: {
      story: 'The giraffe laughs at the short stool, the snake stretches longer than the scale! Measure everything — what’s long, what’s short? 🦒',
      intro: 'Compare lengths side by side. Measure with hand-spans, cubits or a scale.',
      points: [
        'Longer means more length; shorter means less.',
        'Start both things at the same line to compare.',
        'Hand-spans and fingers measure small things.',
        'A metre scale measures longer things.'
      ],
      words: ['long', 'short', 'tall', 'measure', 'compare', 'length']
    },
    game: {
      type: 'quiz', title: 'Long and Short Quiz', instructions: 'Compare and tap the answer.',
      questions: [
        { vis: '🦒 | 🐜', q: 'Who is taller?', options: ['Ant', 'Giraffe', 'Same'], a: 1, hint: 'Long-neck giraffe!' },
        { vis: '✏️📏', q: 'To compare two pencils, you…?', options: ['Close eyes', 'Line up one end', 'Throw them'], a: 1, hint: 'Same starting line!' },
        { vis: '🐍 | 🪱', q: 'Longer: snake or earthworm?', options: ['Earthworm', 'Snake', 'Same'], a: 1, hint: 'Snakey and long!' },
        { vis: '🖐️', q: 'A hand-span measures…?', options: ['Huge fields', 'Small things', 'Weight'], a: 1, hint: 'Small hand, small things!' },
        { vis: '🌳 | 🌱', q: 'Taller plant?', options: ['Seedling', 'Tree', 'Same'], a: 1, hint: 'Towering tree!' },
        { vis: '📏📏', q: 'A metre scale is used for…?', options: ['Tiny ants', 'Longer lengths', 'Water'], a: 1, hint: 'Long jobs!' }
      ]
    }
  },
  {
    id: 'c3mh5', n: 5, title: 'Shapes and Designs', emoji: '🟪', topic: 'Shapes in pretty designs',
    c1: '#ec4899', c2: '#8b5cf6',
    desc: 'Rangoli shapes, tile designs, stamp art! A free Class 3 maths lesson and matching game from NCERT Math Magic chapter 5.',
    learn: {
      story: 'Diwali rangoli blooms — circles, triangles, flowers of colour! Stamps and tiles join the design parade. 🎨',
      intro: 'Designs repeat shapes. Trace, stamp and tile to make patterns.',
      points: [
        'Rangoli repeats shapes in circles.',
        'Stamps print the same shape again.',
        'Tiles fit together with no gaps.',
        'Count sides to name each shape.'
      ],
      words: ['design', 'rangoli', 'stamp', 'tile', 'repeat', 'shape']
    },
    game: {
      type: 'match', title: 'Shape Design Matching!', instructions: 'Tap a shape word, then tap its picture.',
      pairs: [
        ['Star', '⭐'], ['Heart', '❤️'], ['Diamond', '🔷'],
        ['Oval', '⬭'], ['Rectangle', '🟥'], ['Triangle', '🔺']
      ]
    }
  },
  {
    id: 'c3mh6', n: 6, title: 'Fun with Give and Take', emoji: '🧮', topic: 'Tricky addition and subtraction',
    c1: '#10b981', c2: '#3b82f6',
    desc: 'Tricky sums, mystery numbers, shopkeeper puzzles! A free Class 3 maths lesson and quiz game from NCERT Math Magic chapter 6.',
    learn: {
      story: 'The number circus is in town! Missing numbers hide, totals surprise, and only smart give-and-take finds them. 🎪',
      intro: 'Break numbers into tens and ones. Add and subtract in parts.',
      points: [
        '37 + 45 = (30 + 40) + (7 + 5) = 82.',
        '63 − 28: subtract tens, adjust ones.',
        'Find missing numbers by reversing.',
        'Round to tens for quick estimates.'
      ],
      words: ['tricky', 'missing', 'parts', 'estimate', 'reverse', 'total']
    },
    game: {
      type: 'quiz', title: 'Tricky Sums Quiz', instructions: 'Break and solve, then tap.',
      questions: [
        { vis: '3️⃣7️⃣ ➕ 4️⃣5️⃣', q: '37 + 45 = ?', options: ['72', '82', '712'], a: 1, hint: '30+40=70, 7+5=12, total 82!' },
        { vis: '6️⃣3️⃣ ➖ 2️⃣8️⃣', q: '63 − 28 = ?', options: ['35', '45', '41'], a: 0, hint: '63 − 28 = 35!' },
        { vis: '❓ ➕ 2️⃣5️⃣ 🟰 6️⃣0️⃣', q: '? + 25 = 60. Missing number?', options: ['35', '45', '85'], a: 0, hint: '60 − 25 = 35!' },
        { vis: '8️⃣4️⃣ ➖ ❓ 🟰 5️⃣0️⃣', q: '84 − ? = 50. Missing number?', options: ['24', '34', '44'], a: 1, hint: '84 − 50 = 34!' },
        { vis: '4️⃣8️⃣ ➕ 5️⃣2️⃣', q: '48 + 52 = ?', options: ['90', '100', '910'], a: 1, hint: 'A perfect hundred!' },
        { vis: '7️⃣0️⃣ ➖ 3️⃣5️⃣', q: '70 − 35 = ?', options: ['35', '45', '25'], a: 0, hint: 'Half of 70!' }
      ]
    }
  },
  {
    id: 'c3mh7', n: 7, title: 'Time Goes On', emoji: '🕰️', topic: 'Calendar, clock and time',
    c1: '#6366f1', c2: '#06b6d4',
    desc: 'Tick-tock! Days, weeks, months and clock hands. A free Class 3 maths lesson and quiz game from NCERT Math Magic chapter 7.',
    learn: {
      story: 'The old clock ticks all day — morning school, noon lunch, night dreams. Time never stops, so let’s read it! 🕰️',
      intro: 'A clock has hour and minute hands. A calendar has days, weeks and months.',
      points: [
        'Short hand shows hours, long hand shows minutes.',
        '7 days make a week; 12 months make a year.',
        'Morning, noon, evening, night divide the day.',
        'Birthdays and festivals come by date.'
      ],
      words: ['clock', 'hour', 'minute', 'week', 'month', 'calendar']
    },
    game: {
      type: 'quiz', title: 'Time Quiz', instructions: 'Read time and tap the answer.',
      questions: [
        { vis: '🕐', q: 'Short hand on 1, long on 12. Time?', options: ['12:01', '1 o’clock', '1:12'], a: 1, hint: '1 o’clock!' },
        { vis: '📅 × 7️⃣', q: 'How many days in a week?', options: ['5', '7', '10'], a: 1, hint: 'Seven days!' },
        { vis: '🕞', q: 'Half past 3 means…?', options: ['3:00', '3:30', '4:30'], a: 1, hint: 'Half hour gone — 3:30!' },
        { vis: '📅 × 1️⃣2️⃣', q: 'Months in a year?', options: ['10', '12', '7'], a: 1, hint: 'Twelve months!' },
        { vis: '🌅🏫', q: 'School starts in the…?', options: ['Morning', 'Midnight', 'Night'], a: 0, hint: 'Bright morning!' },
        { vis: '🕕', q: 'Short hand on 6, long on 12. Time?', options: ['12:06', '6 o’clock', '6:30'], a: 1, hint: '6 o’clock!' }
      ]
    }
  },
  {
    id: 'c3mh8', n: 8, title: 'Who is Heavier?', emoji: '⚖️', topic: 'Heavy and light',
    c1: '#f97316', c2: '#eab308',
    desc: 'Elephant vs sparrow! Guess, then weigh on the balance. A free Class 3 maths lesson and quiz game from NCERT Math Magic chapter 8.',
    learn: {
      story: 'The see-saw groans — elephant DOWN, sparrow UP! Guess first, then weigh. Heavy and light are so much fun! 🐘',
      intro: 'Heavier pushes the balance down. Lighter rises up. Guess, then check.',
      points: [
        'Guess which is heavier before weighing.',
        'Balance tips toward the heavier side.',
        'A feather is lighter than a stone.',
        'Weigh with a balance or hold in hands.'
      ],
      words: ['heavy', 'light', 'heavier', 'balance', 'guess', 'weigh']
    },
    game: {
      type: 'quiz', title: 'Heavy or Light Quiz', instructions: 'Guess, then tap the answer.',
      questions: [
        { vis: '🐘 | 🐦', q: 'Heavier?', options: ['Sparrow', 'Elephant', 'Same'], a: 1, hint: 'Mighty elephant!' },
        { vis: '🪶 | 🪨', q: 'Lighter?', options: ['Stone', 'Feather', 'Same'], a: 1, hint: 'Floaty feather!' },
        { vis: '⚖️ 📕⬇️ 📗⬆️', q: 'Red book goes down. It is…?', options: ['Lighter', 'Heavier', 'Same'], a: 1, hint: 'Down = heavier!' },
        { vis: '🎒📚 | 🎒🧸', q: 'Bag of books vs bag of one teddy — heavier?', options: ['Teddy bag', 'Books bag', 'Same'], a: 1, hint: 'Books weigh more!' },
        { vis: '🍎🍎🍎 | 🍉', q: 'Three apples vs one watermelon — guess heavier?', options: ['Watermelon', 'Apples', 'Same'], a: 0, hint: 'Big juicy watermelon!' },
        { vis: '⚖️⚖️', q: 'Balanced scale means…?', options: ['Left heavy', 'Equal weight', 'Right heavy'], a: 1, hint: 'Perfect balance!' }
      ]
    }
  },
  {
    id: 'c3mh9', n: 9, title: 'How Many Times?', emoji: '✖️', topic: 'Multiplication as repeated addition',
    c1: '#ef4444', c2: '#a855f7',
    desc: '2, 4, 6, 8 — multiply with tables and jumps! A free Class 3 maths lesson and quiz game from NCERT Math Magic chapter 9.',
    learn: {
      story: 'The spider weaves 4 + 4 + 4 legs! Multiplication is fast addition — how many times? Count and conquer! 🕷️',
      intro: '3 × 4 means 3 groups of 4. Tables help multiply in a flash.',
      points: [
        '3 × 4 = 4 + 4 + 4 = 12.',
        'Learn tables of 2, 3, 4, 5 and 10.',
        'Anything × 0 = 0; anything × 1 stays same.',
        'Arrays show rows × columns.'
      ],
      words: ['times', 'multiply', 'groups', 'table', 'array', 'product']
    },
    game: {
      type: 'quiz', title: 'Times Quiz', instructions: 'Multiply and tap the answer.',
      questions: [
        { vis: '🍎🍎 🍎🍎 🍎🍎', q: '3 groups of 2 apples = ?', options: ['5', '6', '4'], a: 1, hint: '3 × 2 = 6!' },
        { vis: '5️⃣ ✖️ 4️⃣', q: '5 × 4 = ?', options: ['9', '20', '15'], a: 1, hint: '5, 10, 15, 20!' },
        { vis: '🔟 ✖️ 3️⃣', q: '10 × 3 = ?', options: ['13', '30', '103'], a: 1, hint: 'Three tens — 30!' },
        { vis: '7️⃣ ✖️ 0️⃣', q: '7 × 0 = ?', options: ['7', '0', '70'], a: 1, hint: 'Times zero is zero!' },
        { vis: '2️⃣ ✖️ 9️⃣', q: '2 × 9 = ?', options: ['11', '18', '29'], a: 1, hint: 'Double 9 — 18!' },
        { vis: '🕷️ × 8️⃣🦵', q: 'A spider has 8 legs. 2 spiders have…?', options: ['10', '16', '8'], a: 1, hint: '2 × 8 = 16!' }
      ]
    }
  },
  {
    id: 'c3mh10', n: 10, title: 'Play with Patterns', emoji: '🌀', topic: 'Number and shape patterns',
    c1: '#a855f7', c2: '#ec4899',
    desc: 'Crack the growing patterns — numbers, shapes, tiles! A free Class 3 maths lesson and quiz game from NCERT Math Magic chapter 10.',
    learn: {
      story: 'The pattern snake hisses: 5, 10, 15… WHAT’S NEXT? Tiles flip, shapes spin — find the rule, name the next! 🐍',
      intro: 'Patterns follow rules: add same, double, or repeat shapes.',
      points: [
        '5, 10, 15, 20 adds 5 each time.',
        '2, 4, 8, 16 doubles each time.',
        'Shape patterns repeat blocks.',
        'Describe the rule before answering.'
      ],
      words: ['pattern', 'rule', 'next', 'double', 'repeat', 'growing']
    },
    game: {
      type: 'quiz', title: 'Pattern Quiz', instructions: 'Find the rule and tap what comes next.',
      questions: [
        { vis: '5️⃣ 🔟 1️⃣5️⃣ ❓', q: '5, 10, 15, __?', options: ['18', '20', '25'], a: 1, hint: 'Add 5 — 20!' },
        { vis: '2️⃣ 4️⃣ 8️⃣ ❓', q: '2, 4, 8, __?', options: ['10', '12', '16'], a: 2, hint: 'Double it — 16!' },
        { vis: '🔺🟧🔺🟧❓', q: 'Triangle, square repeating — next?', options: ['Triangle', 'Circle', 'Square'], a: 0, hint: 'ABAB — triangle!' },
        { vis: '1️⃣0️⃣0️⃣ 9️⃣0️⃣ 8️⃣0️⃣ ❓', q: '100, 90, 80, __?', options: ['70', '75', '60'], a: 0, hint: 'Minus 10 — 70!' },
        { vis: '⭐⭐ ⭐⭐⭐ ⭐⭐⭐⭐ ❓', q: '2 stars, 3 stars, 4 stars, __?', options: ['6 stars', '5 stars', '4 stars'], a: 1, hint: 'One more each time — 5!' },
        { vis: '3️⃣ 6️⃣ 9️⃣ ❓', q: '3, 6, 9, __?', options: ['10', '12', '15'], a: 1, hint: 'Threes march — 12!' }
      ]
    }
  },
  {
    id: 'c3mh11', n: 11, title: 'Jugs and Mugs', emoji: '🫖', topic: 'Measuring capacity',
    c1: '#06b6d4', c2: '#0ea5e9',
    desc: 'Pour, fill, measure — how many mugs fill the jug? A free Class 3 maths lesson and quiz game from NCERT Math Magic chapter 11.',
    learn: {
      story: 'Lemonade for all! How many small mugs fill the big jug? Pour carefully — splashy maths is the best maths! 🍋',
      intro: 'Capacity is measured by what fills it: mugs, glasses, litres.',
      points: [
        'Count mugs to measure a jug.',
        'Bigger mug = fewer mugs needed.',
        'Litres measure big quantities.',
        'Half and full describe fill levels.'
      ],
      words: ['jug', 'mug', 'pour', 'full', 'half', 'litre']
    },
    game: {
      type: 'quiz', title: 'Jugs and Mugs Quiz', instructions: 'Pour and count, then tap.',
      questions: [
        { vis: '🫖 🥛🥛🥛🥛', q: 'A jug fills 4 mugs. Its capacity?', options: ['4 mugs', '1 mug', '4 litres sure'], a: 0, hint: '4 mugs full!' },
        { vis: '🥛 | 🥛🥛', q: 'One mug vs two mugs — more?', options: ['One mug', 'Two mugs', 'Same'], a: 1, hint: 'Two holds double!' },
        { vis: '🫖➕🫖', q: '2 jugs of 4 mugs each = ?', options: ['6 mugs', '8 mugs', '4 mugs'], a: 1, hint: '4 + 4 = 8!' },
        { vis: '🥛½', q: 'Half a mug is…?', options: ['Full mug', 'Less than full', 'Empty'], a: 1, hint: 'Halfway up!' },
        { vis: '🪣🥛', q: 'A bucket needs 10 mugs. 6 poured. Still need?', options: ['4 mugs', '10 mugs', '6 mugs'], a: 0, hint: '10 − 6 = 4!' },
        { vis: '🍶🍶🍶', q: '3 bottles of 1 litre = ?', options: ['3 litres', '1 litre', '13 litres'], a: 0, hint: '1 + 1 + 1 = 3!' }
      ]
    }
  },
  {
    id: 'c3mh12', n: 12, title: 'Can We Share?', emoji: '🍰', topic: 'Division by sharing',
    c1: '#16a34a', c2: '#84cc16',
    desc: 'One cake, many friends — share it fairly! A free Class 3 maths lesson and quiz game from NCERT Math Magic chapter 12.',
    learn: {
      story: 'Birthday cake! Six friends, one cake — cut it fair so nobody cries. Sharing sweetly is division deliciously! 🍰',
      intro: 'Division splits totals into equal shares. Leftover stays as remainder.',
      points: [
        '15 ÷ 3 = 5: three shares of five.',
        'Share one by one for fairness.',
        'Equal shares have zero leftover.',
        'Remainder is what cannot be shared.'
      ],
      words: ['share', 'divide', 'equal', 'each', 'leftover', 'fair']
    },
    game: {
      type: 'quiz', title: 'Sharing Quiz', instructions: 'Cut fairly and tap the answer.',
      questions: [
        { vis: '🍰 ➗ 6️⃣', q: '1 cake for 6 friends — each gets?', options: ['1 whole', '1 slice of 6', '6 cakes'], a: 1, hint: 'One sixth each!' },
        { vis: '1️⃣5️⃣ ➗ 3️⃣', q: '15 ÷ 3 = ?', options: ['3', '5', '12'], a: 1, hint: 'Three fives make 15!' },
        { vis: '🍊🍊🍊🍊 ➗ 2️⃣', q: '4 oranges for 2 kids — each?', options: ['4', '2', '1'], a: 1, hint: 'Half of 4 is 2!' },
        { vis: '🧁 × 9️⃣ ➗ 3️⃣', q: '9 cupcakes, 3 friends — each?', options: ['2', '4', '3'], a: 2, hint: '9 ÷ 3 = 3!' },
        { vis: '🍪 × 5️⃣ ➗ 2️⃣', q: '5 cookies, 2 kids — fair shares?', options: ['2 each + 1 left', '3 each', '5 each'], a: 0, hint: '2 each, 1 stays!' },
        { vis: '2️⃣0️⃣ ➗ 4️⃣', q: '20 ÷ 4 = ?', options: ['4', '5', '6'], a: 1, hint: 'Four fives make 20!' }
      ]
    }
  },
  {
    id: 'c3mh13', n: 13, title: 'Smart Charts', emoji: '📊', topic: 'Reading pictographs and tallies',
    c1: '#6366f1', c2: '#0ea5e9',
    desc: 'Bars, pictures and tallies tell stories in numbers! A free Class 3 maths lesson and quiz game from NCERT Math Magic chapter 13.',
    learn: {
      story: 'The class votes: mangoes vs bananas! Bananas win by a bunch. Charts turn counting into colourful pictures! 📊',
      intro: 'Pictographs use pictures; bar charts use bars; tallies count in fives.',
      points: [
        'One picture can mean 1 — or 5, if the key says so!',
        'Taller bar = bigger number.',
        'Tally bundles count fast: 4 lines + 1 cross = 5.',
        'Read the key before reading the chart.'
      ],
      words: ['chart', 'bar', 'tally', 'key', 'most', 'votes']
    },
    game: {
      type: 'quiz', title: 'Smart Charts Quiz', instructions: 'Read the chart and tap the answer.',
      questions: [
        { vis: '📊 🟥🟥🟥 | 🟦🟦🟦🟦🟦', q: 'Red bar 3, blue bar 5. Bigger?', options: ['Red', 'Blue', 'Same'], a: 1, hint: 'Taller blue wins!' },
        { vis: '🍎🍎🍎 = 3️⃣', q: 'Key: 1 apple picture = 1 apple. 3 pictures = ?', options: ['3 apples', '30 apples', '1 apple'], a: 0, hint: 'Count pictures — 3!' },
        { vis: '🗳️❚❚❚❚', q: 'Tally with 4 lines crossed = ?', options: ['4', '5', '9'], a: 1, hint: 'Bundle of five!' },
        { vis: '🐱🐱🐱🐱🐱 | 🐶🐶🐶', q: '5 cats, 3 dogs. How many more cats?', options: ['8', '2', '3'], a: 1, hint: '5 − 3 = 2!' },
        { vis: '🥭🥭🥭🥭🥭🥭 | 🍌🍌🍌🍌', q: '6 mangoes, 4 bananas. Total fruits?', options: ['9', '10', '24'], a: 1, hint: '6 + 4 = 10!' },
        { vis: '📊 ❓', q: 'Always read the chart’s ___ first.', options: ['Colours', 'Key', 'Border'], a: 1, hint: 'The key unlocks meaning!' }
      ]
    }
  },
  {
    id: 'c3mh14', n: 14, title: 'Rupees and Paise', emoji: '💰', topic: 'Money: notes, coins and change',
    c1: '#eab308', c2: '#b45309',
    desc: 'Count notes and coins, pay exact, take change! A free Class 3 maths lesson and quiz game from NCERT Math Magic chapter 14.',
    learn: {
      story: 'Pocket money day! ₹100 note, shiny coins — the toy costs ₹65. Pay, count change, and save the rest! 💰',
      intro: 'Notes and coins have values. Add to pay; subtract to find change. 100 paise = 1 rupee.',
      points: [
        '₹10 + ₹10 + ₹5 = ₹25.',
        '100 paise make 1 rupee.',
        'Pay exact or take change.',
        'Save coins in a piggy bank!'
      ],
      words: ['rupee', 'paise', 'coin', 'note', 'change', 'save']
    },
    game: {
      type: 'quiz', title: 'Money Quiz', instructions: 'Count money and tap the answer.',
      questions: [
        { vis: '💵🔟 ➕ 💵🔟 ➕ 🪙5️⃣', q: '₹10 + ₹10 + ₹5 = ?', options: ['₹20', '₹25', '₹15'], a: 1, hint: '10 + 10 + 5 = 25!' },
        { vis: '🪙 × 1️⃣0️⃣0️⃣', q: '100 paise = ?', options: ['₹10', '₹1', '₹100'], a: 1, hint: 'Hundred paise, one rupee!' },
        { vis: '🧸 6️⃣5️⃣ 💵 1️⃣0️⃣0️⃣', q: 'Pay ₹100 for ₹65 toy. Change?', options: ['₹25', '₹45', '₹35'], a: 2, hint: '100 − 65 = 35!' },
        { vis: '🪙🪙🪙🪙🪙', q: 'Five ₹2 coins = ?', options: ['₹7', '₹10', '₹12'], a: 1, hint: '2 × 5 = 10!' },
        { vis: '💵5️⃣0️⃣ | 💵2️⃣0️⃣💵2️⃣0️⃣💵🔟', q: '₹50 note vs 20+20+10. Same?', options: ['No', 'Yes, both ₹50', 'Second more'], a: 1, hint: 'Both make fifty!' },
        { vis: '🐖🪙', q: 'Best place for savings?', options: ['Under pillow', 'Piggy bank', 'Dustbin'], a: 1, hint: 'Oink oink savings!' }
      ]
    }
  }
];
window.CHAPTERS = window.MH3_CHAPTERS;
window.CHAPTER_SUBJECT = 'Class 3 Maths';
