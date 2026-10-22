/* PlayHub — Joyful Mathematics Class 2 chapter content
   Source: NCERT Joyful Mathematics Class 2 (Reprint 2026-27), Chapters 1–11.
   Each chapter: learning card + one interactive game (quiz | match | sequence | make10). */
window.JM2_CHAPTERS = [
  {
    id: 'c2m1', n: 1, title: 'A Day at the Beach', emoji: '🏖️', topic: 'Counting in groups: tens & ones',
    c1: '#0ea5e9', c2: '#f59e0b',
    desc: 'Count shells and chikoos in tens and ones at the beach! A free Class 2 maths lesson and quiz game from NCERT Joyful Mathematics chapter 1.',
    learn: {
      intro: 'What a sunny day at the beach! Count shells, chikoos and oranges in trays of 10 plus loose ones — and learn how every 2-digit number is tens plus ones.',
      points: [
        '10 loose ones make 1 group of ten.',
        'A 2-digit number has a tens place and a ones place — 73 is 7 tens and 3 ones.',
        'Compare the tens first, then the ones, to find the bigger number.',
        'Numbers can label things like jerseys, boats and race positions.'
      ],
      words: ['ten', 'ones', 'tens', 'groups', 'compare', 'more', 'less', 'tray']
    },
    game: {
      type: 'quiz', title: 'Beach Counting Quiz', instructions: 'Read each clue and tap the correct answer.',
      questions: [
        { vis: '🟨🟨🟨🟨🟨 🟨🟨🟨🟨🟨', q: 'How many units are in 1 ten-strip?', options: ['10', '8', '12'], a: 0, hint: 'Count the small squares in one long strip — 10!' },
        { vis: '🍈🍈🍈 ➕ 🍈🍈🍈🍈', q: '3 trays of 10 chikoos + 4 loose chikoos = ?', options: ['34', '30', '43'], a: 0, hint: '3 tens and 4 ones make 34!' },
        { vis: '🍊4️⃣3️⃣ | 🍊3️⃣4️⃣', q: 'Which is more: 43 oranges or 34 oranges?', options: ['34', '43', 'Same'], a: 1, hint: 'Compare tens: 4 tens beats 3 tens!' },
        { vis: '4️⃣3️⃣ | 4️⃣7️⃣', q: '43 or 47 — which is more?', options: ['47', '43', 'Same'], a: 0, hint: 'Same tens — compare ones: 7 is bigger than 3!' },
        { vis: '9️⃣9️⃣', q: 'What is the largest two-digit number?', options: ['90', '99', '100'], a: 1, hint: 'Both digits as big as they go — 99!' },
        { vis: '1️⃣0️⃣', q: 'What is the smallest two-digit number?', options: ['11', '99', '10'], a: 2, hint: '1 ten and 0 ones — 10!' },
        { vis: '🟨 × 🔟', q: '10 yellow ten-strips and 0 red ones = ? units', options: ['10', '100 units', '10 units'], a: 1, hint: 'Ten tens fill the whole 100-grid!' },
        { vis: '🎽 1️⃣7️⃣', q: 'Arya’s jersey number is one-ten-seven. Which number?', options: ['7', '71', '17'], a: 2, hint: 'One ten and seven ones — 17!' }
      ]
    }
  },
  {
    id: 'c2m2', n: 2, title: 'Shapes Around Us', emoji: '📦', topic: '3D solid shapes',
    c1: '#8b5cf6', c2: '#ec4899',
    desc: 'Cube, cuboid, cone, cylinder, sphere — match solid shapes! A free Class 2 maths lesson and matching game from NCERT Joyful Mathematics chapter 2.',
    learn: {
      intro: 'Roll the drum, hug the matka! Musical instruments and things at home are solid shapes in disguise — find the cube, cuboid, cone, cylinder and sphere hiding around you.',
      points: [
        'Solid objects have faces, edges and corners.',
        'A box has 6 faces, 12 edges and 8 corners.',
        'A ball rolls because it has no corners.',
        'A drum looks like a cylinder and a matka looks like a sphere.'
      ],
      words: ['cube', 'cuboid', 'cone', 'cylinder', 'sphere', 'face', 'edge', 'corner']
    },
    game: {
      type: 'match', title: 'Match Solid Shapes!', instructions: 'Tap a shape name, then tap its picture.',
      pairs: [
        ['cube', '🎲'], ['cuboid', '📦'], ['sphere', '⚽'],
        ['cylinder', '🥁'], ['cone', '🍦'], ['corner', '📐']
      ]
    }
  },
  {
    id: 'c2m3', n: 3, title: 'Fun with Numbers', emoji: '🔢', topic: 'Numbers 1 to 100 & patterns',
    c1: '#16a34a', c2: '#0ea5e9',
    desc: 'Skip-count in 2s, 5s and 10s and crack number-chart patterns! A free Class 2 maths lesson and quiz game from NCERT Joyful Mathematics chapter 3.',
    learn: {
      intro: 'Hop along the number line! Count forward and backward, jump in 2s, 5s and 10s, spot growing patterns on the 1–100 chart and play Guess My Number.',
      points: [
        'Numbers 1 to 100 live in order on a chart.',
        'Skip counting makes fast jumps — 2s, 5s, 10s.',
        'In a chart window, below is 10 more and above is 10 less.',
        'Patterns grow by a fixed rule — find the rule!'
      ],
      words: ['pattern', 'skip', 'chart', 'forward', 'backward', 'jump', 'rule', 'window']
    },
    game: {
      type: 'quiz', title: 'Number Pattern Quiz', instructions: 'Find the rule and tap the missing number.',
      questions: [
        { vis: '1️⃣ 4️⃣ 7️⃣ ❓', q: 'Next in 1, 4, 7, __?', options: ['8', '10', '9'], a: 1, hint: 'Add 3 each time — 7 + 3 = 10!' },
        { vis: '4️⃣0️⃣ 4️⃣5️⃣ 5️⃣0️⃣ ❓', q: 'Next in 40, 45, 50, __?', options: ['55', '60', '45'], a: 0, hint: 'Add 5 each time — 50 + 5 = 55!' },
        { vis: '5️⃣0️⃣ 6️⃣0️⃣ ❓', q: 'Next in 50, 60, __?', options: ['70', '65', '55'], a: 0, hint: 'Count in tens — 70!' },
        { vis: '🔟 ⬅️', q: 'What comes just before 10?', options: ['11', '8', '9'], a: 2, hint: 'One less than 10 is 9!' },
        { vis: '🔟 ➡️ 💯', q: 'Start at 10 and jump in tens — do you land on 100?', options: ['No', 'Yes', 'Only 50'], a: 1, hint: '10, 20, 30 … all the way to 100!' },
        { vis: '🪟 2️⃣8️⃣ ⬆️', q: 'Chart window with 28 in the centre — which number is on top?', options: ['18', '38', '27'], a: 0, hint: 'Above is 10 less — 18!' },
        { vis: '🪟 2️⃣8️⃣ ⬇️', q: 'Same window — which number is below 28?', options: ['38', '18', '29'], a: 0, hint: 'Below is 10 more — 38!' },
        { vis: '🎲🎲', q: 'Two dice are thrown — what is the smallest total?', options: ['1', '12', '2'], a: 2, hint: '1 + 1 = 2!' }
      ]
    }
  },
  {
    id: 'c2m4', n: 4, title: 'Shadow Story (Togalu)', emoji: '🎭', topic: '2D shapes & shadows',
    c1: '#f59e0b', c2: '#7c3aed',
    desc: 'Puppet shadows, tracing and flat shapes — circle, triangle, square! A free Class 2 maths lesson and matching game from NCERT Joyful Mathematics chapter 4.',
    learn: {
      intro: 'After watching Togalu shadow puppets from Karnataka, make your own finger shadows! Trace bottle caps and boxes, and meet the flat 2-D family: circle, rectangle, triangle and square.',
      points: [
        'Light makes a shadow behind an object.',
        'Tracing an object gives a flat 2D shape.',
        'A circle is all curved with no corners.',
        'Triangles and squares have straight sides and corners.'
      ],
      words: ['shadow', 'circle', 'rectangle', 'triangle', 'square', 'curved', 'straight', 'trace']
    },
    game: {
      type: 'match', title: 'Match Flat Shapes!', instructions: 'Tap a shape word, then tap its picture.',
      pairs: [
        ['circle', '⭕'], ['rectangle', '🖼️'], ['triangle', '🔺'],
        ['square', '⬛'], ['curved edge', '🌙'], ['straight edge', '📏']
      ]
    }
  },
  {
    id: 'c2m5', n: 5, title: 'Playing with Lines', emoji: '📏', topic: 'Standing, sleeping, slanting lines',
    c1: '#ef4444', c2: '#8b5cf6',
    desc: 'Standing, sleeping, slanting and curved lines are everywhere! A free Class 2 maths lesson and matching game from NCERT Joyful Mathematics chapter 5.',
    learn: {
      intro: 'Yoga friends stand straight, sleep flat and bend in curves! Find standing, sleeping, slanting and curved lines with thread and dots — then paint Warli art with them.',
      points: [
        'Lines can stand, sleep, slant or curve.',
        'Standing lines go up-down; sleeping lines go side-to-side.',
        'Curved lines make clouds and rainbows.',
        'Warli and Madhubani art use many types of lines.'
      ],
      words: ['standing', 'sleeping', 'slanting', 'curved', 'vertical', 'horizontal', 'straight', 'line']
    },
    game: {
      type: 'match', title: 'Match the Lines!', instructions: 'Tap a line name, then tap its picture.',
      pairs: [
        ['standing line', '🧍'], ['sleeping line', '😴'], ['slanting line', '⤢'],
        ['curved line', '🌈'], ['vertical', '⬆️'], ['horizontal', '➡️']
      ]
    }
  },
  {
    id: 'c2m6', n: 6, title: 'Decoration for Festival', emoji: '🪔', topic: 'Addition & subtraction',
    c1: '#f97316', c2: '#ec4899',
    desc: 'String garlands of 10 and pair numbers to 100! A free Class 2 maths addition lesson and pairing game from NCERT Joyful Mathematics chapter 6.',
    learn: {
      intro: 'Festival time! String garlands of 10 flowers, light rows of diyas and add them up — Rohan’s 12 plus Suwali’s 53 make 65! Regroup tens like a pro.',
      points: [
        'Add the tens first, then the ones, to add fast.',
        '10 ones regroup into 1 ten.',
        'Subtraction means jumping back on the number line.',
        'Addition and subtraction are opposite families.'
      ],
      words: ['add', 'subtract', 'tens', 'regroup', 'garland', 'diyas', 'together', 'left']
    },
    game: {
      type: 'make10', title: 'Make 100 Pairs!', instructions: 'Tap two tiles that add up to 100.',
      target: 100, tip: 'Pair tens to make 100 · 10+90, 20+80, 30+70, 40+60 …',
      tiles: [10, 90, 20, 80, 30, 70, 40, 60, 15, 85, 25, 75, 50, 50]
    }
  },
  {
    id: 'c2m7', n: 7, title: 'Rani’s Gift', emoji: '🎁', topic: 'Measurement: length, weight, capacity',
    c1: '#a855f7', c2: '#06b6d4',
    desc: 'Handspans, balances and nimbu pani — measure everything! A free Class 2 maths measurement lesson and ordering game from NCERT Joyful Mathematics chapter 7.',
    learn: {
      intro: 'Raja’s bed is 10 handspans — but whose hands? Discover why we must measure with the SAME tool, weigh veggies on a balance and mix the perfect glass of nimbu pani!',
      points: [
        'The same word “handspan” gives different lengths for different people.',
        'Measure fairly by using the same tool every time.',
        'The heavy side of a balance goes down.',
        'A recipe grows equally — double everything for two glasses.'
      ],
      words: ['measure', 'handspan', 'balance', 'heavy', 'light', 'height', 'recipe', 'estimate']
    },
    game: {
      type: 'sequence', title: 'Measure Step by Step', instructions: 'Tap the measuring steps in a sensible order.',
      leftTitle: 'Measure, step by step', rightTitle: 'Tap the next step',
      steps: [
        { emoji: '🖐️', text: 'Measure the bed in handspans' },
        { emoji: '🧵', text: 'Check path length with thread' },
        { emoji: '🧱', text: 'Stack blocks to find height' },
        { emoji: '⚖️', text: 'Weigh the vegetables with a balance' },
        { emoji: '🍋', text: 'Mix 1 glass of nimbu pani' },
        { emoji: '🥛', text: 'Count glasses to fill the bottle' }
      ]
    }
  },
  {
    id: 'c2m8', n: 8, title: 'Grouping and Sharing', emoji: '🍬', topic: 'Multiplication & division',
    c1: '#16a34a', c2: '#eab308',
    desc: 'Wheels, wings and legs — multiply! Then share sweets equally. A free Class 2 maths lesson and quiz game from NCERT Joyful Mathematics chapter 8.',
    learn: {
      intro: 'How many wheels on 7 cars? How many wings on 3 butterflies? Count equal groups super-fast with multiplication — then share gulab jamuns equally with division!',
      points: [
        'Multiplication is fast repeated addition.',
        'The × sign means “groups of”.',
        'You can swap the order and the total stays the same.',
        'Division shares things equally into groups.'
      ],
      words: ['groups', 'times', 'multiply', 'share', 'equally', 'each', 'total', 'divide']
    },
    game: {
      type: 'quiz', title: 'Groups & Shares Quiz', instructions: 'Count the groups and tap the answer.',
      questions: [
        { vis: '🛺🛺', q: '2 autos × 3 wheels each = ? wheels', options: ['5', '6', '9'], a: 1, hint: '3 + 3 = 6!' },
        { vis: '🚲🚲🚲🚲', q: '4 bicycles × 2 wheels each = ? wheels', options: ['8', '6', '10'], a: 0, hint: 'Add 2 four times — 8!' },
        { vis: '🚗 × 7️⃣', q: '7 cars × 4 wheels each = ? wheels', options: ['24', '21', '28'], a: 2, hint: 'Seven fours make 28!' },
        { vis: '🦋🦋🦋', q: '3 butterflies × 2 wings each = ? wings', options: ['5', '6', '4'], a: 1, hint: '3 groups of 2 make 6!' },
        { vis: '🐙🐙', q: '2 octopuses × 8 legs each = ? legs', options: ['10', '16', '18'], a: 1, hint: '8 + 8 = 16!' },
        { vis: '🔴 × 8️⃣', q: '8 packets × 5 bindis each = ? bindis', options: ['40', '35', '45'], a: 0, hint: 'Eight fives make 40!' },
        { vis: '📿 2️⃣0️⃣ ➗ 5️⃣', q: '20 beads, 5 per bracelet = ? bracelets', options: ['5', '3', '4'], a: 2, hint: 'Share 20 into 5s — 4 bracelets!' },
        { vis: '🍌 2️⃣4️⃣ ➗ 3️⃣', q: '24 bananas shared by 3 monkeys — each gets?', options: ['6', '8', '12'], a: 1, hint: 'Divide equally — 8 each!' }
      ]
    }
  },
  {
    id: 'c2m9', n: 9, title: 'Which Season is it?', emoji: '🌦️', topic: 'Seasons, calendar, clock',
    c1: '#06b6d4', c2: '#8b5cf6',
    desc: 'Spring to winter — order the seasons, read clocks and calendars! A free Class 2 maths time lesson and ordering game from NCERT Joyful Mathematics chapter 9.',
    learn: {
      intro: 'Spring flowers, summer heat, monsoon rain, autumn leaves, winter snow! Travel the year in order, read Gargi’s clock and find East where the sun rises.',
      points: [
        'The year has seasons that come in order.',
        'A calendar shows months, weeks and days.',
        'Clocks show the hour and the minute.',
        'The sun rises in the East.'
      ],
      words: ['spring', 'summer', 'monsoon', 'autumn', 'winter', 'calendar', 'clock', 'season']
    },
    game: {
      type: 'sequence', title: 'Order the Year', instructions: 'Tap the seasons in the order they come.',
      leftTitle: 'Year, in order', rightTitle: 'Tap the next season',
      steps: [
        { emoji: '🌸', text: 'Spring — flowers bloom' },
        { emoji: '☀️', text: 'Summer — long hot days' },
        { emoji: '🌧️', text: 'Monsoon — rain, peacock dances' },
        { emoji: '🍂', text: 'Autumn — leaves fall' },
        { emoji: '❄️', text: 'Winter — snow and cold' },
        { emoji: '📅', text: 'New year calendar starts again' }
      ]
    }
  },
  {
    id: 'c2m10', n: 10, title: 'Fun at the Fair', emoji: '🎡', topic: 'Money: rupees & paise',
    c1: '#ef4444', c2: '#f97316',
    desc: 'Tickets, notes, coins — pair rupees to 20! A free Class 2 maths money lesson and pairing game from NCERT Joyful Mathematics chapter 10.',
    learn: {
      intro: 'Rupal has Rs 50 for the fair! Spend Rs 42 on rides and count what is left. Meet Indian notes and coins, and learn that 100 paise make 1 rupee.',
      points: [
        '100 paise make 1 rupee.',
        'Notes and coins can combine to make the same amount.',
        'Count up from what you spent to find money left.',
        'Save and spend money carefully.'
      ],
      words: ['rupee', 'paise', 'coins', 'notes', 'spend', 'save', 'ticket', 'left']
    },
    game: {
      type: 'make10', title: 'Make Rs 20 Pairs!', instructions: 'Tap two coins that add up to Rs 20.',
      target: 20, tip: 'Pair coins to make Rs 20 · 1+19, 2+18, 3+17 …',
      tiles: [1, 19, 2, 18, 3, 17, 4, 16, 5, 15, 6, 14, 10, 10]
    }
  },
  {
    id: 'c2m11', n: 11, title: 'Data Handling', emoji: '📊', topic: 'Tables & picture charts',
    c1: '#6366f1', c2: '#f43f5e',
    desc: 'Favourite colours, fruits and games — chart them all! A free Class 2 maths data lesson and quiz game from NCERT Joyful Mathematics chapter 11.',
    learn: {
      intro: 'What does the class love most — red or yellow? Apples or bananas? Ask everyone fairly, tidy the answers into tables and picture charts, and read most and least!',
      points: [
        'Tables tidy up counting.',
        'Picture charts show data quickly — 1 picture means 1 child.',
        'Most and least compare counts.',
        'Ask everyone fairly to do a survey.'
      ],
      words: ['data', 'table', 'chart', 'most', 'least', 'survey', 'count', 'favourite']
    },
    game: {
      type: 'quiz', title: 'Data Detective Quiz', instructions: 'Read the chart clues and tap the answer.',
      questions: [
        { vis: '📊 🔝', q: '“Most liked” means…', options: ['Biggest count', 'Smallest count', 'Equal count'], a: 0, hint: 'Most liked is the tallest bar!' },
        { vis: '🙂 = 1️⃣', q: 'In our chart 1 face means…', options: ['10 students', '1 student', '0 students'], a: 1, hint: 'Count the faces one by one!' },
        { vis: '🍎8️⃣ 🍌5️⃣', q: 'Apple 8 votes, banana 5 — apple is…', options: ['Less than banana', 'More than banana', 'Equal to banana'], a: 1, hint: '8 is bigger than 5!' },
        { vis: '📊 ⬇️', q: '“Least liked game” means…', options: ['Fewest votes', 'Most votes', 'No votes'], a: 0, hint: 'Least liked is the shortest bar!' },
        { vis: '🚌8️⃣ 🛺5️⃣', q: 'Bus 8 riders, auto 5 — bus riders are…', options: ['Less', 'Equal', 'More'], a: 2, hint: 'Compare 8 and 5 — more!' },
        { vis: '📋 🖼️', q: 'What is the best way to show survey data?', options: ['Hide it', 'Table and picture chart', 'Just guess'], a: 1, hint: 'Tables and charts show counts clearly!' },
        { vis: '🟡 🔴', q: 'Yellow is liked more than red. That means…', options: ['Yellow count is bigger', 'Red count is bigger', 'Both are same'], a: 0, hint: 'More means a bigger number!' },
        { vis: '❓ 📝', q: 'What is the first step of a survey?', options: ['Ask and record', 'Answer alone', 'Close eyes'], a: 0, hint: 'Collect real answers first!' }
      ]
    }
  }
];
/* chapter.js reads window.CHAPTERS; a page loads exactly one data file. */
window.CHAPTERS = window.JM2_CHAPTERS;
window.CHAPTER_SUBJECT = 'Class 2 Maths';
