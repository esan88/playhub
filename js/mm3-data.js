/* PlayHub — Maths Mela Class 3 chapter content
   Source: NCERT Maths Mela, Textbook of Mathematics for Class 3 (Reprint 2026-27), Chapters 1–14.
   Each chapter: story + learning card + one interactive game (quiz | match | sequence). */
window.MM3_CHAPTERS = [
  {
    id: 'c3mm1', n: 1, title: 'What’s in a Name?', emoji: '🏷️', topic: 'Counting letters in names',
    c1: '#5b3df5', c2: '#ff4d8d',
    desc: 'Count letters in names and find the longest and shortest name! A free Class 3 maths lesson and quiz game from NCERT Maths Mela chapter 1.',
    learn: {
      story: 'In Class 3, everyone writes their name on a shiny name-tag. Whose name is the longest? Whose is the shortest? Let’s count letters together! ✏️',
      intro: 'Names are made of letters — and letters can be counted! Compare name lengths and arrange names from short to long.',
      points: [
        'Count the letters in any name to find its length.',
        'The name with the most letters is the longest.',
        'Names with equal letters are the same length.',
        'Arrange names in order — shortest first, longest last.'
      ],
      words: ['name', 'letter', 'count', 'longest', 'shortest', 'order']
    },
    game: {
      type: 'quiz', title: 'Name Length Quiz', instructions: 'Count the letters and tap the correct answer.',
      questions: [
        { vis: '👧 R I Y A', q: 'How many letters are in the name RIYA?', options: ['3', '4', '5'], a: 1, hint: 'R-I-Y-A — count them: 4!' },
        { vis: '🧒 A R J U N', q: 'How many letters are in ARJUN?', options: ['4', '6', '5'], a: 2, hint: 'A-R-J-U-N — 5 letters!' },
        { vis: '👧 S I A | 🧒 K A B I R', q: 'Which name is longer: SIA or KABIR?', options: ['SIA', 'KABIR', 'Same'], a: 1, hint: 'KABIR has 5 letters, SIA has 3!' },
        { vis: '📏 M E E N A', q: 'MEENA and ARJUN — which is true?', options: ['MEENA is longer', 'Same length', 'ARJUN is longer'], a: 1, hint: 'Both have 5 letters — same length!' },
        { vis: '🔤 A', q: 'What is the shortest a name can be?', options: ['0 letters', '1 letter', '10 letters'], a: 1, hint: 'A name needs at least 1 letter!' },
        { vis: '🏷️ A N A N Y A', q: 'How many letters in ANANYA?', options: ['5', '7', '6'], a: 2, hint: 'A-N-A-N-Y-A — 6 letters!' }
      ]
    }
  },
  {
    id: 'c3mm2', n: 2, title: 'Toy Joy', emoji: '🧸', topic: 'Counting, more and less',
    c1: '#f59e0b', c2: '#ef4444',
    desc: 'Count toys, compare groups and guess how many! A free Class 3 maths lesson and quiz game from NCERT Maths Mela chapter 2.',
    learn: {
      story: 'The toy shop shelf is full — teddies, tops, balls and dolls! Estimate first, then count to check. Estimation makes counting joyful! 🧸',
      intro: 'Look at a group, guess how many, then count to verify. Compare two groups to say which has more, less or equal.',
      points: [
        'Estimate means making a smart guess before counting.',
        'Count objects one by one to check your guess.',
        'More means a bigger count; less means a smaller count.',
        'Equal groups have exactly the same number.'
      ],
      words: ['toy', 'estimate', 'count', 'more', 'less', 'equal']
    },
    game: {
      type: 'quiz', title: 'Toy Counting Quiz', instructions: 'Count carefully and tap the right number.',
      questions: [
        { vis: '🧸🧸🧸🧸🧸', q: 'How many teddies?', options: ['4', '5', '6'], a: 1, hint: 'Count each teddy: 5!' },
        { vis: '🪀🪀🪀 | 🪀🪀🪀🪀🪀', q: '3 tops vs 5 tops — which group has less?', options: ['5 tops', '3 tops', 'Equal'], a: 1, hint: '3 is less than 5!' },
        { vis: '⚽⚽⚽⚽ ➕ ⚽⚽', q: '4 balls + 2 balls = ?', options: ['5', '7', '6'], a: 2, hint: '4 + 2 = 6!' },
        { vis: '🎎🎎🎎🎎 🎎🎎🎎🎎', q: 'Two groups of 4 dolls make how many?', options: ['6', '8', '4'], a: 1, hint: '4 + 4 = 8!' },
        { vis: '🧸🪀⚽🎎', q: 'One teddy, one top, one ball, one doll — how many toys?', options: ['3', '5', '4'], a: 2, hint: 'Count them all: 4!' },
        { vis: '🫙❓', q: 'A jar looks full of marbles. What should you do first?', options: ['Count at once', 'Estimate, then count', 'Shake it'], a: 1, hint: 'Smart counters estimate first!' }
      ]
    }
  },
  {
    id: 'c3mm3', n: 3, title: 'Double Century', emoji: '💯', topic: 'Numbers up to 200',
    c1: '#0ea5e9', c2: '#22c55e',
    desc: 'Race to 200! Hundreds, tens and ones in cricket-style scoring. A free Class 3 maths lesson and quiz game from NCERT Maths Mela chapter 3.',
    learn: {
      story: 'The cricket scoreboard ticks past 100… 150… all the way to a DOUBLE CENTURY — 200 runs! Big numbers are just hundreds, tens and ones. 🏏',
      intro: 'Two hundred is 2 hundreds. Every number up to 200 splits into hundreds, tens and ones.',
      points: [
        '100 means 1 hundred; 200 means 2 hundreds.',
        '157 = 1 hundred + 5 tens + 7 ones.',
        'Compare hundreds first, then tens, then ones.',
        'Counting in tens jumps fast: 100, 110, 120 … 200.'
      ],
      words: ['hundred', 'tens', 'ones', 'century', 'compare', 'place']
    },
    game: {
      type: 'quiz', title: 'Double Century Quiz', instructions: 'Split big numbers and tap the answer.',
      questions: [
        { vis: '🏏 2️⃣0️⃣0️⃣', q: 'How many hundreds make 200?', options: ['1', '2', '20'], a: 1, hint: '200 = 2 hundreds!' },
        { vis: '1️⃣5️⃣7️⃣', q: 'In 157, how many tens?', options: ['7', '1', '5'], a: 2, hint: 'The middle digit 5 = 5 tens!' },
        { vis: '1️⃣8️⃣4️⃣ | 1️⃣4️⃣8️⃣', q: 'Which is bigger: 184 or 148?', options: ['148', '184', 'Equal'], a: 1, hint: 'Same hundreds — 8 tens beats 4 tens!' },
        { vis: '1️⃣0️⃣0️⃣ ➕ 3️⃣0️⃣', q: '100 + 30 = ?', options: ['103', '130', '300'], a: 1, hint: '1 hundred and 3 tens = 130!' },
        { vis: '🔟🔟🔟', q: 'Count in tens from 100: 100, 110, 120, __?', options: ['125', '130', '200'], a: 1, hint: 'Add one more ten — 130!' },
        { vis: '1️⃣9️⃣9️⃣ ➕ 1️⃣', q: '199 + 1 = ?', options: ['200', '198', '210'], a: 0, hint: 'One more makes the double century — 200!' }
      ]
    }
  },
  {
    id: 'c3mm4', n: 4, title: 'Vacation with My Nani Maa', emoji: '🧳', topic: 'Planning a journey in order',
    c1: '#8b5cf6', c2: '#06b6d4',
    desc: 'Pack, travel and visit Nani Maa — put every step of the vacation in order! A free Class 3 maths story-sequencing game from NCERT Maths Mela chapter 4.',
    learn: {
      story: 'Holidays! We are going to Nani Maa’s village by train. Tickets, bags, station, train — a journey has steps, and every step comes in order! 🚂',
      intro: 'Big tasks become easy when we order their steps: first, next, then and last.',
      points: [
        'A journey is a list of steps in order.',
        'First we plan, then we pack, then we travel.',
        'Tickets tell the date, time and seat number.',
        'Count days on a calendar to know trip length.'
      ],
      words: ['journey', 'ticket', 'station', 'order', 'first', 'last']
    },
    game: {
      type: 'sequence', title: 'Vacation Steps in Order', instructions: 'Tap the vacation steps from first to last.',
      leftTitle: 'Trip order', rightTitle: 'Tap the next step',
      steps: [
        { emoji: '🗓️', text: 'Plan the trip date with family' },
        { emoji: '🎫', text: 'Buy train tickets' },
        { emoji: '🧳', text: 'Pack bags and food' },
        { emoji: '🚉', text: 'Reach the station on time' },
        { emoji: '🚂', text: 'Board the train and travel' },
        { emoji: '👵', text: 'Hug Nani Maa at her home' }
      ]
    }
  },
  {
    id: 'c3mm5', n: 5, title: 'Fun with Shapes', emoji: '🔺', topic: '2D and 3D shapes',
    c1: '#ec4899', c2: '#8b5cf6',
    desc: 'Triangles, cubes, cones and cylinders hiding everywhere! A free Class 3 maths lesson and matching game from NCERT Maths Mela chapter 5.',
    learn: {
      story: 'The shape parade is here! Flat shapes dance on paper while solid shapes roll and stack. Can you name every marcher? 🎪',
      intro: 'Flat shapes have sides and corners. Solid shapes have faces, edges and corners — and some can roll!',
      points: [
        'Triangle has 3 sides, square has 4 equal sides.',
        'Circle has no sides and no corners.',
        'Cube and box stack well; ball and cone roll.',
        'Match each solid to its flat face — a cone makes a circle!'
      ],
      words: ['triangle', 'square', 'circle', 'cube', 'cone', 'roll']
    },
    game: {
      type: 'match', title: 'Match the Shapes!', instructions: 'Tap a shape name, then tap its picture.',
      pairs: [
        ['Triangle', '🔺'], ['Square', '🟧'], ['Circle', '🟢'],
        ['Cube', '🎲'], ['Cone', '🍦'], ['Ball', '⚽']
      ]
    }
  },
  {
    id: 'c3mm6', n: 6, title: 'House of Hundreds – I', emoji: '🏠', topic: 'Hundreds place value',
    c1: '#10b981', c2: '#3b82f6',
    desc: 'Move into the House of Hundreds! Rooms of 100, 10 and 1. A free Class 3 maths lesson and quiz game from NCERT Maths Mela chapter 6.',
    learn: {
      story: 'Welcome to the House of Hundreds! The biggest room holds hundreds, the middle room holds tens, and the tiny room holds ones. 🏠',
      intro: '3-digit numbers live in three rooms: hundreds, tens and ones.',
      points: [
        'The hundreds digit tells how many hundreds.',
        '245 = 2 hundreds + 4 tens + 5 ones.',
        '100 ones make 1 hundred; 10 tens make 1 hundred.',
        'Zero holds a room empty — 205 has 0 tens.'
      ],
      words: ['hundreds', 'place', 'digit', 'expand', 'zero', 'compare']
    },
    game: {
      type: 'quiz', title: 'House of Hundreds Quiz', instructions: 'Open each number’s rooms and tap the answer.',
      questions: [
        { vis: '2️⃣4️⃣5️⃣', q: 'In 245, the digit 2 means?', options: ['2 ones', '2 tens', '2 hundreds'], a: 2, hint: 'First room = hundreds!' },
        { vis: '3️⃣0️⃣7️⃣', q: 'Expand 307.', options: ['300 + 70 + 0', '300 + 0 + 7', '30 + 0 + 7'], a: 1, hint: '3 hundreds, 0 tens, 7 ones!' },
        { vis: '🏠💯', q: 'How many ones make 1 hundred?', options: ['10', '100', '1000'], a: 1, hint: 'One hundred ones fill the big room!' },
        { vis: '4️⃣5️⃣0️⃣ | 4️⃣0️⃣5️⃣', q: 'Which is bigger: 450 or 405?', options: ['405', 'Equal', '450'], a: 2, hint: 'Same hundreds — 5 tens beats 0 tens!' },
        { vis: '6️⃣0️⃣0️⃣ ➕ 4️⃣', q: '600 + 4 = ?', options: ['640', '604', '6004'], a: 1, hint: '6 hundreds, 0 tens, 4 ones!' },
        { vis: '9️⃣9️⃣ ➕ 1️⃣', q: '99 + 1 = ?', options: ['100', '90', '101'], a: 0, hint: 'Ten tens become 1 hundred — 100!' }
      ]
    }
  },
  {
    id: 'c3mm7', n: 7, title: 'Raksha Bandhan', emoji: '🎀', topic: 'Patterns and counting rakhis',
    c1: '#f97316', c2: '#eab308',
    desc: 'Thread rakhis in pretty patterns and count the love! A free Class 3 maths lesson and quiz game from NCERT Maths Mela chapter 7.',
    learn: {
      story: 'It’s Raksha Bandhan! Sisters tie colourful rakhis in red-gold, red-gold patterns while brothers count sweets for everyone. 🎀',
      intro: 'Patterns repeat a rule. Count in groups to find totals fast.',
      points: [
        'A pattern repeats its rule again and again.',
        'Red, gold, red, gold is an ABAB pattern.',
        'Count rakhis in groups of 2s, 5s or 10s.',
        'One more repeat extends any pattern.'
      ],
      words: ['pattern', 'repeat', 'rakhi', 'rule', 'groups', 'extend']
    },
    game: {
      type: 'quiz', title: 'Rakhi Pattern Quiz', instructions: 'Find the rule and tap what comes next.',
      questions: [
        { vis: '🔴🟡🔴🟡❓', q: 'Red, gold, red, gold, __?', options: ['Red', 'Gold', 'Green'], a: 0, hint: 'ABAB repeats — Red comes next!' },
        { vis: '🧵🧵🧵 🧵🧵🧵', q: 'Two groups of 3 rakhis = ?', options: ['5', '9', '6'], a: 2, hint: '3 + 3 = 6!' },
        { vis: '🍬 × 🔟', q: '10 boxes with 5 sweets each = ?', options: ['15', '50', '500'], a: 1, hint: 'Count in fives ten times — 50!' },
        { vis: '🟥🟥🟨🟥🟥🟨❓', q: 'Red, red, yellow repeating — what is next?', options: ['Yellow', 'Red', 'Blue'], a: 1, hint: 'The rule is R-R-Y — Red restarts it!' },
        { vis: '🎀🎀🎀🎀🎀', q: '5 rakhis for 5 brothers — how many each?', options: ['5', '25', '1'], a: 2, hint: 'One rakhi per brother!' },
        { vis: '2️⃣4️⃣6️⃣❓', q: '2, 4, 6, __?', options: ['7', '8', '10'], a: 1, hint: 'Add 2 each time — 8!' }
      ]
    }
  },
  {
    id: 'c3mm8', n: 8, title: 'Fair Share', emoji: '⚖️', topic: 'Equal sharing and division',
    c1: '#16a34a', c2: '#84cc16',
    desc: 'Share laddoos fairly among friends — everyone gets equal! A free Class 3 maths lesson and quiz game from NCERT Maths Mela chapter 8.',
    learn: {
      story: 'Twelve shiny laddoos, four hungry friends. Deal them round and round — sharing fairly means everyone gets the SAME number! 🍬',
      intro: 'Division is fair sharing. Split a total into equal groups.',
      points: [
        'Fair share = every group gets the same number.',
        '12 shared by 4 gives 3 each.',
        'Deal one by one to share fairly.',
        'Leftovers smaller than the groups stay as remainder.'
      ],
      words: ['share', 'equal', 'divide', 'each', 'groups', 'fair']
    },
    game: {
      type: 'quiz', title: 'Fair Share Quiz', instructions: 'Share equally and tap the answer.',
      questions: [
        { vis: '🍬 × 1️⃣2️⃣ ➗ 4️⃣', q: '12 laddoos shared by 4 friends — each gets?', options: ['4', '3', '2'], a: 1, hint: '12 ÷ 4 = 3!' },
        { vis: '🎈 × 🔟 ➗ 2️⃣', q: '10 balloons for 2 kids — each gets?', options: ['5', '4', '6'], a: 0, hint: 'Half of 10 is 5!' },
        { vis: '🍎🍎🍎🍎🍎🍎 ➗ 3️⃣', q: '6 apples in 3 equal plates — per plate?', options: ['3', '2', '1'], a: 1, hint: '6 ÷ 3 = 2!' },
        { vis: '🧁 × 7️⃣ ➗ 2️⃣', q: '7 cupcakes for 2 friends — shared fairly?', options: ['3 each + 1 left', '4 each', '2 each'], a: 0, hint: '3 each uses 6 — 1 is left over!' },
        { vis: '⚖️ 8️⃣ ➗ 4️⃣', q: '8 ÷ 4 = ?', options: ['2', '4', '12'], a: 0, hint: '4 groups of 2 make 8!' },
        { vis: '👧👧👧 1️⃣5️⃣🌸', q: '15 flowers for 3 girls equally — each gets?', options: ['4', '6', '5'], a: 2, hint: '15 ÷ 3 = 5!' }
      ]
    }
  },
  {
    id: 'c3mm9', n: 9, title: 'House of Hundreds – II', emoji: '🏡', topic: 'Comparing 3-digit numbers',
    c1: '#6366f1', c2: '#06b6d4',
    desc: 'Which house-number is biggest? Compare hundreds, tens, ones! A free Class 3 maths lesson and quiz game from NCERT Maths Mela chapter 9.',
    learn: {
      story: 'Every house on the street has a 3-digit number. Which house is number 358? Line them up and compare, room by room! 🏡',
      intro: 'Compare hundreds first. If tied, compare tens. If still tied, compare ones.',
      points: [
        'Bigger hundreds digit = bigger number.',
        '326 vs 362: same hundreds, 6 tens wins.',
        'Use >, < and = to compare numbers.',
        'Order numbers smallest to biggest step by step.'
      ],
      words: ['compare', 'greater', 'smaller', 'order', 'biggest', 'smallest']
    },
    game: {
      type: 'quiz', title: 'Compare the Houses Quiz', instructions: 'Compare room by room and tap the answer.',
      questions: [
        { vis: '5️⃣1️⃣2️⃣ | 4️⃣9️⃣9️⃣', q: 'Bigger: 512 or 499?', options: ['499', '512', 'Equal'], a: 1, hint: '5 hundreds beats 4 hundreds!' },
        { vis: '3️⃣2️⃣6️⃣ | 3️⃣6️⃣2️⃣', q: 'Bigger: 326 or 362?', options: ['362', '326', 'Equal'], a: 0, hint: 'Same hundreds — 6 tens wins!' },
        { vis: '7️⃣0️⃣4️⃣ | 7️⃣4️⃣0️⃣', q: 'Smaller: 704 or 740?', options: ['740', '704', 'Equal'], a: 1, hint: '0 tens loses to 4 tens!' },
        { vis: '2️⃣9️⃣9️⃣ | 3️⃣0️⃣0️⃣', q: '299 __ 300. Which sign?', options: ['greater than (>)', 'less than (<)', 'equal (=)'], a: 1, hint: '299 is one less than 300!' },
        { vis: '6️⃣6️⃣6️⃣ | 6️⃣6️⃣6️⃣', q: '666 vs 666?', options: ['First bigger', '=', 'Second bigger'], a: 1, hint: 'Same rooms everywhere — equal!' },
        { vis: '1️⃣9️⃣9️⃣ 2️⃣0️⃣1️⃣ 2️⃣0️⃣0️⃣', q: 'Smallest of 199, 201, 200?', options: ['200', '201', '199'], a: 2, hint: '1 hundred loses to 2 hundreds!' }
      ]
    }
  },
  {
    id: 'c3mm10', n: 10, title: 'Fun at Class Party!', emoji: '🎉', topic: 'Party steps in order',
    c1: '#a855f7', c2: '#ec4899',
    desc: 'Plan the class party step by step — decorate, serve, celebrate! A free Class 3 maths story-sequencing game from NCERT Maths Mela chapter 10.',
    learn: {
      story: 'The class party is tomorrow! Balloons, snacks, games and cake — but a super party needs every step in the right order! 🎈',
      intro: 'Ordering steps is sequencing. First things first, last things last.',
      points: [
        'List party jobs before starting.',
        'Decorate first, then bring the food.',
        'Count plates so everyone gets one.',
        'Clean up together at the end.'
      ],
      words: ['party', 'first', 'next', 'then', 'last', 'count']
    },
    game: {
      type: 'sequence', title: 'Party Steps in Order', instructions: 'Tap the party steps from first to last.',
      leftTitle: 'Party order', rightTitle: 'Tap the next step',
      steps: [
        { emoji: '📝', text: 'Make the party jobs list' },
        { emoji: '🎈', text: 'Blow balloons and decorate' },
        { emoji: '🍱', text: 'Arrange snacks and cake' },
        { emoji: '🪑', text: 'Seat every friend' },
        { emoji: '🎮', text: 'Play party games' },
        { emoji: '🧹', text: 'Clean up together' }
      ]
    }
  },
  {
    id: 'c3mm11', n: 11, title: 'Filling and Lifting', emoji: '🥛', topic: 'Capacity and weight',
    c1: '#0ea5e9', c2: '#f59e0b',
    desc: 'Which jug holds more? Which bag is heavier? A free Class 3 maths lesson and quiz game from NCERT Maths Mela chapter 11.',
    learn: {
      story: 'Milk for the party! Which jug holds more — tall-thin or short-wide? And who can lift the heavy bag of flour? Let’s test and see! 🥛',
      intro: 'Capacity is how much a container holds (litres). Weight is how heavy a thing is (kilograms).',
      points: [
        'Tall does not always mean holds more — test by pouring!',
        'Litres measure liquids like milk and water.',
        'Kilograms measure weight like flour and books.',
        'Balance scale tips to the heavier side.'
      ],
      words: ['capacity', 'litre', 'weight', 'heavier', 'lighter', 'pour']
    },
    game: {
      type: 'quiz', title: 'Fill and Lift Quiz', instructions: 'Think, then tap the answer.',
      questions: [
        { vis: '🥛🥛🥛', q: 'A jug holds 3 glasses of milk. Its capacity is?', options: ['3 glasses', '3 kg', '3 litres approx'], a: 0, hint: 'Count what fills it — 3 glasses!' },
        { vis: '⚖️ 📚 | 🎈', q: 'Books vs balloon — which is heavier?', options: ['Balloon', 'Books', 'Same'], a: 1, hint: 'The scale tips to the books!' },
        { vis: '🪣 ➕ 💧', q: 'You pour 2 mugs + 2 mugs of water in a bucket. Total?', options: ['2 mugs', '4 mugs', '3 mugs'], a: 1, hint: '2 + 2 = 4 mugs!' },
        { vis: '🍉 | 🍇', q: 'Watermelon vs one grape — heavier?', options: ['Grape', 'Same', 'Watermelon'], a: 2, hint: 'Big watermelon wins!' },
        { vis: '🥤🥤 | 🥤', q: 'Two small cups or one small cup — which holds more?', options: ['One cup', 'Two cups', 'Same'], a: 1, hint: 'More cups hold more!' },
        { vis: '⚖️ ⚖️', q: 'Scale is balanced. Both sides are?', options: ['Equal', 'Left heavy', 'Right heavy'], a: 0, hint: 'Balanced means equal weight!' }
      ]
    }
  },
  {
    id: 'c3mm12', n: 12, title: 'Give and Take', emoji: '➕', topic: 'Adding and subtracting big numbers',
    c1: '#ef4444', c2: '#f97316',
    desc: 'Give some, take some — add and subtract like a shopkeeper! A free Class 3 maths lesson and quiz game from NCERT Maths Mela chapter 12.',
    learn: {
      story: 'The mela shop is busy! Give 125 toffees, take back change, add new stock — every give and take is plus and minus! 🍭',
      intro: 'Add to combine. Subtract to take away or find the difference.',
      points: [
        '125 + 30 = 155: add tens to tens.',
        '150 − 40 = 110: subtract tens from tens.',
        'Borrow and carry when digits need help.',
        'Check subtraction by adding back.'
      ],
      words: ['add', 'subtract', 'total', 'difference', 'borrow', 'carry']
    },
    game: {
      type: 'quiz', title: 'Give and Take Quiz', instructions: 'Shopkeeper maths — tap the answer.',
      questions: [
        { vis: '1️⃣2️⃣5️⃣ ➕ 3️⃣0️⃣', q: '125 + 30 = ?', options: ['128', '155', '425'], a: 1, hint: '125 + 30 = 155!' },
        { vis: '1️⃣5️⃣0️⃣ ➖ 4️⃣0️⃣', q: '150 − 40 = ?', options: ['110', '100', '190'], a: 0, hint: '15 tens minus 4 tens = 11 tens!' },
        { vis: '2️⃣0️⃣0️⃣ ➖ 5️⃣', q: '200 − 5 = ?', options: ['205', '195', '150'], a: 1, hint: 'Borrow — 195!' },
        { vis: '🍭 8️⃣0️⃣ ➕ 2️⃣5️⃣', q: '80 toffees + 25 toffees = ?', options: ['95', '105', '85'], a: 1, hint: '80 + 25 = 105!' },
        { vis: '💰 5️⃣0️⃣ ➖ 1️⃣5️⃣', q: '₹50 − ₹15 = ?', options: ['₹45', '₹35', '₹65'], a: 1, hint: '50 − 15 = 35!' },
        { vis: '9️⃣9️⃣ ➕ 1️⃣1️⃣', q: '99 + 11 = ?', options: ['100', '101', '110'], a: 2, hint: '99 + 11 = 110!' }
      ]
    }
  },
  {
    id: 'c3mm13', n: 13, title: 'Time Goes On', emoji: '⏰', topic: 'Months of the year in order',
    c1: '#06b6d4', c2: '#8b5cf6',
    desc: 'Months march in order all year round! A free Class 3 maths month-sequencing game from NCERT Maths Mela chapter 13.',
    learn: {
      story: 'January leads the parade, December waves goodbye! Twelve months march in order — can you line them all up? 📅',
      intro: 'A year has 12 months in a fixed order. Calendars and birthdays follow them.',
      points: [
        'January is the first month, December the last.',
        '12 months make 1 full year.',
        '7 days make 1 week — they repeat forever.',
        'Festivals and birthdays come in their month’s turn.'
      ],
      words: ['month', 'year', 'calendar', 'order', 'week', 'birthday']
    },
    game: {
      type: 'sequence', title: 'Months in Order', instructions: 'Tap the months from January to December.',
      leftTitle: 'Year order', rightTitle: 'Tap the next month',
      steps: [
        { emoji: '❄️', text: 'January' },
        { emoji: '💝', text: 'February' },
        { emoji: '🌸', text: 'March' },
        { emoji: '🌷', text: 'April' },
        { emoji: '☀️', text: 'May' },
        { emoji: '🌧️', text: 'June' },
        { emoji: '☔', text: 'July' },
        { emoji: '🪁', text: 'August' },
        { emoji: '🍂', text: 'September' },
        { emoji: '🪔', text: 'October' },
        { emoji: '🌾', text: 'November' },
        { emoji: '🎄', text: 'December' }
      ]
    }
  },
  {
    id: 'c3mm14', n: 14, title: 'The Surajkund Fair', emoji: '🎡', topic: 'Money and counting at the fair',
    c1: '#eab308', c2: '#14b8a6',
    desc: 'Tickets, toys and treats at the Surajkund Fair — count money like a pro! A free Class 3 maths lesson and quiz game from NCERT Maths Mela chapter 14.',
    learn: {
      story: 'Dhol beats, colourful stalls, and the giant wheel! At the Surajkund Fair every ticket and toy has a price — count your rupees right! 🎠',
      intro: 'Add prices to find totals. Subtract to find change. Read counts to find what sold most.',
      points: [
        '₹20 + ₹15 = ₹35 for two tickets.',
        'Change = money given minus price.',
        'Tally marks count visitors fast.',
        'The tallest bar sold the most.'
      ],
      words: ['fair', 'ticket', 'price', 'change', 'total', 'count']
    },
    game: {
      type: 'quiz', title: 'Fair Money Quiz', instructions: 'Count rupees and tap the answer.',
      questions: [
        { vis: '🎟️ 2️⃣0️⃣ ➕ 🎟️ 1️⃣5️⃣', q: '₹20 ticket + ₹15 ticket = ?', options: ['₹25', '₹35', '₹45'], a: 1, hint: '20 + 15 = 35!' },
        { vis: '💵 5️⃣0️⃣ ➖ 🧸 3️⃣0️⃣', q: 'Pay ₹50 for a ₹30 toy. Change?', options: ['₹10', '₹20', '₹30'], a: 1, hint: '50 − 30 = 20!' },
        { vis: '🎠 4️⃣5️⃣ | 🎡 6️⃣0️⃣', q: 'Merry-go-round ₹45, wheel ₹60. Costlier ride?', options: ['Merry-go-round', 'Wheel', 'Same'], a: 1, hint: '60 is more than 45!' },
        { vis: '🍿 1️⃣0️⃣ × 3️⃣', q: '3 popcorn cups at ₹10 each = ?', options: ['₹13', '₹30', '₹20'], a: 1, hint: '10 + 10 + 10 = 30!' },
        { vis: '📊 🟥🟥🟥🟥 | 🟦🟦', q: 'Red stall 4 sales, blue stall 2. Who sold more?', options: ['Blue', 'Same', 'Red'], a: 2, hint: 'Taller bar wins — Red!' },
        { vis: '💰 1️⃣0️⃣0️⃣ ➖ 4️⃣5️⃣', q: '₹100 − ₹45 ride = money left?', options: ['₹55', '₹65', '₹45'], a: 0, hint: '100 − 45 = 55!' }
      ]
    }
  }
];
window.CHAPTERS = window.MM3_CHAPTERS;
window.CHAPTER_SUBJECT = 'Class 3 Maths';
