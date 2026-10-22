/* PlayHub — Joyful Mathematics Class 1 chapter content
   Source: NCERT Joyful Mathematics Class 1 (Reprint 2026-27), chapters 1–13.
   Each chapter: learning card + one interactive game (quiz | make10 | sequence). */
window.CHAPTERS = [
  {
    id: 'ch1', n: 1, title: 'Finding the Furry Cat!', emoji: '🐱', topic: 'Position words',
    c1: '#5b3df5', c2: '#ff4d8d',
    desc: 'Play and learn position words for Class 1 — on, under, inside, outside, above, below, before and after. Free interactive chapter 1 game for kids.',
    learn: {
      intro: 'In this chapter we hunt for a furry cat and learn the words that tell us WHERE things are. These are called position words — they help us describe the place of everything around us.',
      points: [
        'Words like on, under, above, below, inside and outside tell the position of things.',
        'Top means the highest place, bottom means the lowest place.',
        'Before comes first, after comes later — like bogies before and after the engine of a train.',
        'We can sort similar things into groups — all buttons together, all leaves together.'
      ],
      words: ['on', 'under', 'inside', 'outside', 'above', 'below', 'top', 'bottom', 'before', 'after']
    },
    game: {
      type: 'quiz', title: 'Where is it?', instructions: 'Read each question and tap the right position word.',
      questions: [
        { vis: '🐱 🛏️', q: 'The cat is sleeping ___ the bed.', options: ['under', 'on top of', 'inside'], a: 1, hint: 'The cat is beneath the bed — that is UNDER.' },
        { vis: '👦 🌳', q: 'The boy is sitting ___ the tree.', options: ['under', 'on', 'outside'], a: 0, hint: 'Under the tree means below its branches.' },
        { vis: '👃 😮', q: 'The nose is ___ the mouth.', options: ['below', 'above', 'behind'], a: 1, hint: 'Look at your face — nose is above the mouth.' },
        { vis: '🐦 🌳', q: 'The birds are ___ the tree.', options: ['on', 'under', 'inside'], a: 0, hint: 'The birds sit on the branches.' },
        { vis: '🍌 ➡️ 🗑️', q: 'Where do you throw the garbage?', options: ['On the bed', 'Inside the dustbin', 'Outside the bag'], a: 1, hint: 'Garbage goes INSIDE the dustbin.' },
        { vis: '🇮🇳', q: 'Where is the Ashoka Chakra on our tiranga?', options: ['On a corner', 'On a side', 'In the middle'], a: 2, hint: 'The blue chakra sits in the middle of the flag.' },
        { vis: '🟠 ⬜ 🟢', q: 'Which colour is at the TOP of our tiranga?', options: ['Green', 'Saffron', 'White'], a: 1, hint: 'Saffron is at the top, white in the middle, green at the bottom.' },
        { vis: '🔴 🔵 🟡 🔴 🔵 🟢', q: 'Suwali put all the buttons together in one group. What is this called?', options: ['Sorting', 'Rolling', 'Sliding'], a: 0, hint: 'Putting similar things together is SORTING into groups.' }
      ]
    }
  },
  {
    id: 'ch2', n: 2, title: 'What is Long? What is Round?', emoji: '🟡', topic: 'Shapes all around',
    c1: '#0ea5e9', c2: '#22c55e',
    desc: 'Learn long and round shapes for Class 1 — which things roll, slide or do both. Fun free chapter 2 maths game for kids.',
    learn: {
      intro: 'Look around you! Some things are long like a pencil, some are round like a ball. In this chapter we feel shapes, roll them and slide them to find what makes them special.',
      points: [
        'Long things are stretched out — a stick, a rope, your legs.',
        'Round things are curved like a circle — a ball, a roti, your face.',
        'Round objects ROLL and flat objects SLIDE on the floor.',
        'Square blocks stack into tall, stable towers — round balls wobble!'
      ],
      words: ['long', 'round', 'circle', 'roll', 'slide', 'shape']
    },
    game: {
      type: 'quiz', title: 'Long or Round?', instructions: 'Look at the clues and tap the correct answer.',
      questions: [
        { vis: '⚪', q: 'Which of these is ROUND?', options: ['A pencil', 'A ball', 'A scale'], a: 1, hint: 'A ball is curved all around — ROUND!' },
        { vis: '🦵 🦵 😊', q: 'My legs are ___ and my face is ___ .', options: ['long and round', 'round and long', 'short and round'], a: 0, hint: 'Legs stretch out (long), faces are curved (round).' },
        { vis: '⚽', q: 'A ball is similar to which shape?', options: ['A square', 'A triangle', 'A circle'], a: 2, hint: 'A ball looks like a circle from every side.' },
        { vis: '📦', q: 'A matchbox is similar to which shape?', options: ['A box shape (cuboid)', 'A ball', 'A circle'], a: 0, hint: 'A matchbox has flat rectangular sides — a box shape.' },
        { vis: '⚽ 📄 🧱', q: 'Which one ROLLS on the floor?', options: ['The brick', 'The ball', 'The paper'], a: 1, hint: 'Round things roll — the ball rolls away!' },
        { vis: '⚪ ⬇️ ⭕', q: 'A striker in carrom usually ___ to the corner.', options: ['slides', 'rolls', 'flies'], a: 0, hint: 'The flat striker SLIDES smoothly on the board.' },
        { vis: '🧱 ⚪ 🧱', q: 'Which makes a tall, stable tower?', options: ['Round balls', 'Square blocks', 'Long pipes'], a: 1, hint: 'Square blocks sit flat on each other — they do not roll off.' },
        { vis: '🧴', q: 'Which object can BOTH roll and slide?', options: ['A water bottle', 'A sheet of paper', 'A button'], a: 0, hint: 'A round bottle rolls — and it also slides on its side.' }
      ]
    }
  },
  {
    id: 'ch3', n: 3, title: 'Mango Treat', emoji: '🥭', topic: 'Counting 1 to 9',
    c1: '#f59e0b', c2: '#ef4444',
    desc: 'Count birds, animals and fruits from 1 to 9 in this free Class 1 chapter 3 game. Learn one more, count and order numbers.',
    learn: {
      intro: 'Birds and animals gather for a mango treat — one joins, then another! Every time one more joins, the count grows by one. That is how we learn numbers 1 to 9.',
      points: [
        'Count objects by touching each one once: 1, 2, 3…',
        '"One more" means the next number — one more than 6 is 7.',
        'Numbers go in order: after 8 comes 9, before 4 comes 3.',
        'We can find which group has more, less or equal.'
      ],
      words: ['count', 'one more', 'after', 'before', 'more', 'less', 'equal']
    },
    game: {
      type: 'quiz', title: 'Count the Friends', instructions: 'Tap the emojis as you count, then choose the right number.',
      questions: [
        { vis: '🐦 🐦 🐦 🐦 🐦', q: 'How many birds are eating the mango?', options: ['4', '5', '6'], a: 1, hint: 'Touch each bird once while counting — there are 5!' },
        { vis: '🥭 🥭 🥭 🥭 🥭 🥭 ➕ 1️⃣', q: 'One more than 6 is ___.', options: ['7', '5', '8'], a: 0, hint: 'Add one finger to six — you get seven.' },
        { vis: '🍎 🍎 🍎 🍎 | 🍌 🍌', q: 'Apples are ___ than bananas.', options: ['more', 'less', 'equal'], a: 0, hint: '4 apples, 2 bananas — apples are more.' },
        { vis: '8️⃣ ➡️ ❓', q: 'Which number comes just AFTER 8?', options: ['7', '9', '10'], a: 1, hint: 'After 8 comes 9.' },
        { vis: '⭐ ⭐ ⭐ ⭐ ⭐ ⭐ ⭐', q: 'The Saptarshi (Big Dipper) has 7 stars. How many do you count?', options: ['6', '8', '7'], a: 2, hint: 'Count them again — 7 stars shine in the Big Dipper.' },
        { vis: '🐒 🦜 🐕 🐈 🐇 🐿️ 🐦 🐢 🐹', q: 'How many animals and birds ate the mango at the END?', options: ['9', '5', '7'], a: 0, hint: 'One joined at a time until 9 friends ate together.' },
        { vis: '🐸 🐸 🐸 🐸 🐸', q: 'One frog hops away. How many frogs are LEFT?', options: ['4', '5', '3'], a: 0, hint: '5 take away 1 — four frogs remain.' },
        { vis: '1️⃣ 2️⃣ ❓ 4️⃣', q: 'The cat walked over the floor: 1, 2, ___, 4. Which number is missing?', options: ['5', '3', '1'], a: 1, hint: 'Between 2 and 4 sits 3.' }
      ]
    }
  },
  {
    id: 'ch4', n: 4, title: 'Dotty Bug and Her Designs', emoji: '🐞', topic: 'Making 10',
    c1: '#ec4899', c2: '#8b5cf6',
    desc: 'Learn to make pairs of 10 and meet the number zero in this free Class 1 chapter 4 game. Number pairs of 10 for kids.',
    learn: {
      intro: 'Ladybugs have dots and Aastha has a tenth birthday! In this chapter we discover ZERO, make pairs that add up to 10, and count beyond 10 with a box of ten.',
      points: [
        'Zero means nothing is left — 4 buttons, all popped off = 0 buttons.',
        'Number pairs of 10: 1 and 9, 2 and 8, 3 and 7, 4 and 6, 5 and 5.',
        'Ten and one more is 11, ten and two more is 12… ten and ten is 20.',
        'A group of ten helps us count bigger collections easily.'
      ],
      words: ['zero', 'ten', 'pair', '11 to 20', 'ten frame']
    },
    game: {
      type: 'make10', title: 'Make 10!', instructions: 'Tap a number, then tap its partner. The pair should make 10 — clear the board to win!',
      tiles: [1, 9, 2, 8, 3, 7, 4, 6, 5, 5, 10, 0, 2, 8]
    }
  },
  {
    id: 'ch5', n: 5, title: 'How Many?', emoji: '🧮', topic: 'Adding and taking away',
    c1: '#10b981', c2: '#3b82f6',
    desc: 'Free Class 1 chapter 5 game — addition and subtraction up to 9 with fun stories, "how many altogether" and "how many left".',
    learn: {
      intro: 'Children join hands at the park — 4 children and 2 more children ALTOGETHER make 6! Then some hop off the bus. This chapter teaches us to add (+) and take away (−).',
      points: [
        'Altogether, total, sum — all mean we ADD: 4 + 2 = 6.',
        'Left, flew away, took away — all mean we SUBTRACT: 6 − 2 = 4.',
        'Adding zero keeps the number the same: 4 + 0 = 4.',
        'One little child steps out… now we are one less! Count backwards from 5 to 0.'
      ],
      words: ['plus (+)', 'minus (−)', 'altogether', 'left', 'total']
    },
    game: {
      type: 'quiz', title: 'Altogether or Left?', instructions: 'Sums and take-aways — tap the correct answer.',
      questions: [
        { vis: '🧍 🧍 🧍 🧍 🧍‍♀️ 🧍‍♀️', q: '4 children and 2 children join. How many children ALTOGETHER?', options: ['5', '6', '7'], a: 1, hint: '4 and 2 more make 6.' },
        { vis: '🍊 🍊 🍊 ➕ 🍊 🍊', q: '3 + 2 = ?', options: ['6', '5', '4'], a: 1, hint: 'Count on from 3: 4, 5.' },
        { vis: '🐸 🐸 🐸 🐸 🐸 🐸', q: '6 frogs, 2 jumped away. How many are LEFT?  6 − 2 = ?', options: ['4', '8', '5'], a: 0, hint: 'Take away 2 from 6 — four frogs remain.' },
        { vis: '🎈 🎈 🎈 🎈 🎈 🎈 🎈', q: '7 balloons, 2 flew away. How many left?  7 − 2 = ?', options: ['9', '5', '4'], a: 1, hint: '7 − 2 = 5 balloons.' },
        { vis: '🧍 🧍 🧍 🧍 🧍 ➖ 1️⃣', q: '5 little children, one steps out with a roar — now we are ___!', options: ['6', '4', '3'], a: 1, hint: 'One less than 5 is 4.' },
        { vis: '🍌 🍌 🍌 🍌 🍌 🍌 🍌 🍌 🍌 ➖ 🍌 🍌 🍌', q: 'Manisha had 9 bananas and ate 3. How many are left?', options: ['6', '12', '3'], a: 0, hint: '9 − 3 = 6 bananas.' },
        { vis: '⚽ ⚽ ⚽ ⚽ ➕ 0️⃣', q: '4 + 0 = ?', options: ['0', '4', '40'], a: 1, hint: 'Adding nothing keeps it 4.' },
        { vis: '🫓 🫓 🫓 🫓', q: '4 ladoos, nothing eaten. How many altogether?  4 + 0 = ?', options: ['4', '0', '5'], a: 0, hint: 'Nothing added — still 4.' }
      ]
    }
  },
  {
    id: 'ch6', n: 6, title: 'Vegetable Farm', emoji: '🥕', topic: 'Adding up to 20',
    c1: '#22c55e', c2: '#84cc16',
    desc: 'Free Class 1 chapter 6 game — addition and subtraction with numbers up to 20 using vegetable baskets and fun problem stories.',
    learn: {
      intro: 'Rumi and Shami fill their baskets with vegetables — 7 tomatoes and 5 tomatoes make 12! In this chapter we add and take away bigger numbers, even beyond 10.',
      points: [
        'To add 12 + 4, count on: 13, 14, 15, 16.',
        'Break big numbers: 12 + 6 = 10 + 2 + 6 = 10 + 8 = 18.',
        'We can hop backwards on the number strip to subtract: 15 − 9 = 6.',
        'Problem stories help us decide whether to add or subtract.'
      ],
      words: ['count on', 'number strip', 'problem story', 'basket']
    },
    game: {
      type: 'quiz', title: 'Basket Maths', instructions: 'Fill the baskets — tap the right answer.',
      questions: [
        { vis: '🍅 🍅 🍅 🍅 🍅 🍅 🍅 + 🍅 🍅 🍅 🍅 🍅', q: '7 tomatoes and 5 tomatoes — how many altogether?  7 + 5 = ?', options: ['11', '13', '12'], a: 2, hint: '7 + 5 = 12 tomatoes.' },
        { vis: '🍅 🍅 🍅 🍅 🍅 🍅 🍅 🍅 🍅 ➕ 🍅 🍅 🍅 🍅', q: '9 + 4 = ?', options: ['13', '12', '14'], a: 0, hint: 'Count on from 9: 10, 11, 12, 13.' },
        { vis: '⭐ ⭐ ⭐ ⭐ ⭐ ⭐ ⭐ ⭐ ➕ ⭐ ⭐ ⭐ ⭐ ⭐ ⭐ ⭐ ⭐', q: '8 + 8 = ?', options: ['14', '18', '16'], a: 2, hint: 'Doubles — 8 and 8 make 16.' },
        { vis: '📿 📿 📿 📿 📿 📿 📿 📿 📿 📿 📿 📿 + 📿 📿 📿 📿', q: 'On the ginladi: 12 beads and 4 more.  12 + 4 = ?', options: ['16', '18', '14'], a: 0, hint: 'Count on: 13, 14, 15, 16.' },
        { vis: '1️⃣5️⃣ ➖ 9️⃣', q: '15 − 9 = ?', options: ['5', '7', '6'], a: 2, hint: 'Hop backwards 9 steps from 15 — land on 6.' },
        { vis: '1️⃣6️⃣ ➖ 4️⃣', q: '16 − 4 = ?', options: ['12', '10', '14'], a: 0, hint: 'Take away 4 from 16 — twelve left.' },
        { vis: '9️⃣ ➖ 5️⃣ ➕ 7️⃣', q: 'A potter had 9 diyas, sold 5, then made 7 more. How many now?', options: ['9', '11', '13'], a: 1, hint: '9 − 5 = 4, then 4 + 7 = 11.' },
        { vis: '1️⃣2️⃣ ➕ 6️⃣', q: 'Sheena had 12 bangles and got 6 more. Total?', options: ['18', '16', '20'], a: 0, hint: '12 + 6 = 18 bangles.' }
      ]
    }
  },
  {
    id: 'ch7', n: 7, title: "Lina's Family", emoji: '📏', topic: 'Measuring & comparing',
    c1: '#f97316', c2: '#eab308',
    desc: 'Free Class 1 chapter 7 game — tallest, shortest, heavier, lighter, nearest and measuring with handspans. Fun measurement practice.',
    learn: {
      intro: 'Lina\'s family gets together and everyone compares! Who is tallest, which is longest, what is heavy? In this chapter we learn to measure and compare the world around us.',
      points: [
        'Taller, tallest — taller compares two, tallest compares everyone.',
        'Longest, shortest, thickest, thinnest — we compare length and width.',
        'We measure length using handspans and fingers, and distance using footspans.',
        'Bigger containers hold more water; heavier things weigh more.'
      ],
      words: ['tallest', 'shortest', 'heavier', 'handspan', 'footspan', 'nearest']
    },
    game: {
      type: 'quiz', title: 'Measure & Compare', instructions: 'Tap the correct comparison answer.',
      questions: [
        { vis: '🗿', q: 'The Statue of Unity is the ___ statue in the world.', options: ['shortest', 'tallest', 'thinnest'], a: 1, hint: 'It is the tallest statue on Earth!' },
        { vis: '🧍 🪑 ⬆️', q: 'Lina stands on a stool. Now she is ___ than before.', options: ['taller', 'shorter', 'lighter'], a: 0, hint: 'The stool lifts her up — she looks taller.' },
        { vis: '🪵 🖍️ 🧂', q: 'Which of these is the LONGEST?', options: ['The chalk piece', 'The big stick', 'The crayon'], a: 1, hint: 'The big stick stretches out the most.' },
        { vis: '🪢 🧵 🧶', q: 'Which of these is the THINNEST?', options: ['A rope', 'A wire', 'A thread'], a: 2, hint: 'A thread is the thinnest of the three.' },
        { vis: '🐘 🥭 🪶', q: 'Which is the HEAVIEST?', options: ['The feather', 'The mango', 'The elephant'], a: 2, hint: 'An elephant is the heaviest of all!' },
        { vis: '🖐️ 📏 🛏️', q: 'We find the length of a TABLE using our ___.', options: ['handspans', 'nose', 'ears'], a: 0, hint: 'Spread your hand — handspan after handspan.' },
        { vis: '🪣 🥤 🥄', q: 'Which holds MORE water?', options: ['The bucket', 'The cup', 'The spoon'], a: 0, hint: 'A bucket is the biggest container.' },
        { vis: '👣 📏 🚪', q: 'To measure the distance between your seat and the classroom door, use your ___.', options: ['footspan', 'hair', 'voice'], a: 0, hint: 'Walk and count steps — that is your footspan!' }
      ]
    }
  },
  {
    id: 'ch8', n: 8, title: 'Fun with Numbers', emoji: '🔢', topic: 'Numbers 21 to 100',
    c1: '#6366f1', c2: '#06b6d4',
    desc: 'Free Class 1 chapter 8 game — count, read and write numbers from 21 to 100 with tens and ones. Missing numbers and counting backwards.',
    learn: {
      intro: 'Simran packs oranges into boxes of ten — 2 boxes and 1 orange is 21! In this chapter we travel all the way from 21 to 100.',
      points: [
        'Every box holds 10 — tens and ones make big numbers: 2 tens and 1 one = 21.',
        'Number names: 30 is thirty, 40 is forty, 50 is fifty… 100 is hundred.',
        'Fill missing numbers going up: 46, 47, 48…',
        'We can also count backwards: 7, 6, 5, 4…'
      ],
      words: ['tens', 'ones', 'twenty one', 'fifty', 'hundred', 'backwards']
    },
    game: {
      type: 'quiz', title: 'Number Adventure', instructions: 'Numbers up to 100 — tap the right answer.',
      questions: [
        { vis: '🍊 🍊 🍊 🍊 🍊 🍊 🍊 🍊 🍊 🍊 | 🍊 🍊 🍊 🍊 🍊 🍊 🍊 🍊 🍊 🍊 | 🍊', q: 'Each box holds 10 oranges. 2 boxes and 1 more orange = ?', options: ['12', '21', '20'], a: 1, hint: '2 tens and 1 one make 21.' },
        { vis: '2️⃣0️⃣ ➕ 1️⃣', q: '20 and 1 more is ___.', options: ['21', '22', '19'], a: 0, hint: 'Twenty-one!' },
        { vis: '2️⃣9️⃣ ➡️ ❓', q: 'Which number comes AFTER 29?', options: ['28', '30', '21'], a: 1, hint: 'After twenty-nine comes thirty.' },
        { vis: '❓ ⬅️ 4️⃣2️⃣', q: 'Which number comes BEFORE 42?', options: ['43', '40', '41'], a: 2, hint: 'One less than 42 is 41.' },
        { vis: '🔟 🔟 🔟 🔟', q: '4 tens make ___.', options: ['44', '40', '4'], a: 1, hint: 'Four tens — forty!' },
        { vis: '4️⃣6️⃣ ❓ 4️⃣8️⃣', q: 'Fill the missing number: 46, ___, 48.', options: ['45', '47', '49'], a: 1, hint: 'Between 46 and 48 sits 47.' },
        { vis: '7️⃣ 6️⃣ 5️⃣ ❓', q: 'Count backwards: 7, 6, 5, ___.', options: ['4', '8', '3'], a: 0, hint: 'Going back one — 4.' },
        { vis: '9️⃣9️⃣ ➕ 1️⃣', q: '99 and 1 more is ___.', options: ['90', '99', '100'], a: 2, hint: 'The last stop — one hundred!' }
      ]
    }
  },
  {
    id: 'ch9', n: 9, title: 'Utsav', emoji: '🎉', topic: 'Patterns & shapes',
    c1: '#a855f7', c2: '#ec4899',
    desc: 'Free Class 1 chapter 9 game — complete growing patterns with colours, shapes and number sequences. Festival patterns for kids.',
    learn: {
      intro: 'Festivals fill our world with patterns — in kolam, kites, clothes and clapping games! A pattern repeats again and again, so we can always guess what comes next.',
      points: [
        'A pattern repeats a part: red-yellow, red-yellow…',
        'Look at the repeating unit before you pick what comes next.',
        'Number patterns grow by the same step: 2, 4, 6, 8…',
        'We can make patterns with colours, shapes, sounds and actions.'
      ],
      words: ['pattern', 'repeat', 'next', 'sequence', 'design']
    },
    game: {
      type: 'quiz', title: 'What Comes Next?', instructions: 'Spot the repeating pattern and tap the piece that comes next.',
      questions: [
        { vis: '🔴 🟡 🔴 🟡 🔴 🟡 🔴 ?', q: 'What comes next?', options: ['🔴', '🟡', '🟢'], a: 1, hint: 'After red always comes yellow.' },
        { vis: '🔵 🔴 🔵 🔴 🔵 ?', q: 'What comes next?', options: ['🔴', '🔵', '🟢'], a: 1, hint: 'The pattern starts again with blue.' },
        { vis: '🍎 🍌 🍎 🍌 🍎 ?', q: 'What comes next?', options: ['🍎', '🍌', '🍊'], a: 1, hint: 'Apple, banana, apple, banana — banana next!' },
        { vis: '🚗 🚙 🚗 🚙 🚗 ?', q: 'What comes next?', options: ['🚙', '🚗', '🚕'], a: 0, hint: 'Car, jeep, car, jeep — jeep next.' },
        { vis: '👏 ✌️ 👏 ✌️ 👏 ❓', q: 'Clap, snap, clap, snap, clap, ___ .', options: ['Snap', 'Clap', 'Jump'], a: 0, hint: 'The action pattern alternates — snap!' },
        { vis: '2 🟰 4 🟰 6 🟰 8 ?', q: 'What comes next in the number pattern?', options: ['9', '10', '12'], a: 1, hint: 'Each number grows by 2 — 8 and 2 more is 10.' },
        { vis: '⭐ 🌙 ⭐ 🌙 ⭐ 🌙 ?', q: 'What comes next?', options: ['🌙', '⭐', '☀️'], a: 1, hint: 'After moon comes star.' },
        { vis: '🔴 🔴 🟡 🔴 🔴 🟡 🔴 🔴 ?', q: 'What comes next?', options: ['🟡', '🔴', '🔵'], a: 0, hint: 'The unit is red-red-yellow — yellow comes now.' }
      ]
    }
  },
  {
    id: 'ch10', n: 10, title: 'How Do I Spend My Day?', emoji: '🌅', topic: 'Daily routine & time',
    c1: '#0ea5e9', c2: '#f59e0b',
    desc: 'Free Class 1 chapter 10 game — put Pihu\'s day in the right order. Morning, afternoon, evening, night and seasons for kids.',
    learn: {
      intro: 'Pihu is 6 years old and shares her day, from morning to night. The sun rises, it gets high at noon, sets in the evening, and the moon comes out at night!',
      points: [
        'Morning: wake up, brush, bath, breakfast, school.',
        'Afternoon: the sun is high — lunch and rest.',
        'Evening: the sun sets — play, study, dinner.',
        'Night: moon and stars out — story book and sleep. There are also 4 seasons: summer, monsoon, spring, winter.'
      ],
      words: ['morning', 'afternoon', 'evening', 'night', 'season']
    },
    game: {
      type: 'sequence', title: "Order Pihu's Day", instructions: 'Tap the activities in the correct order — first thing in the morning to last thing at night.',
      steps: [
        { emoji: '🛏️', text: 'Wake up and drink warm water' },
        { emoji: '🪥', text: 'Brush teeth and take a bath' },
        { emoji: '🏫', text: 'Eat breakfast and go to school' },
        { emoji: '🍛', text: 'Wash hands and have lunch' },
        { emoji: '🛝', text: 'Play with friends and study' },
        { emoji: '🌙', text: 'Dinner, story book and sleep' }
      ]
    }
  },
  {
    id: 'ch11', n: 11, title: 'How Many Times?', emoji: '🎠', topic: 'Same number again and again',
    c1: '#ef4444', c2: '#f97316',
    desc: 'Free Class 1 chapter 11 game — repeated addition: 2 + 2 + 2 and "times" sums from the amusement park ride story.',
    learn: {
      intro: 'At the amusement park, 2 children sit on each horse — 2 + 2 + 2 + 2! When the same number is added again and again, we can say it as "times".',
      points: [
        '2 + 2 + 2 + 2 is 4 times 2 — and it equals 8.',
        '3 + 3 + 3 is 3 times 3 — and it equals 9.',
        'Each plate has 3 jalebis: 6 plates is 6 times 3 = 18.',
        '"Times" is a fast way to add equal groups.'
      ],
      words: ['times', 'equal groups', 'repeated addition', 'total']
    },
    game: {
      type: 'quiz', title: 'Ride & Count', instructions: 'Count equal groups — tap the right total.',
      questions: [
        { vis: '🎠 🎠 🎠 🎠', q: '4 horse rides, 2 children on each. How many children altogether?', options: ['6', '10', '8'], a: 2, hint: '2 + 2 + 2 + 2 = 8.' },
        { vis: '🚂 🚂 🚂', q: '3 bogies with 3 children each. Total?  3 + 3 + 3 = ?', options: ['9', '6', '12'], a: 0, hint: '3 times 3 is 9.' },
        { vis: '🍽️ 🍽️ 🍽️ 🍽️ 🍽️ 🍽️ ×3️⃣', q: 'Each plate has 3 jalebis. 6 plates: 6 times 3 = ?', options: ['18', '9', '16'], a: 0, hint: '3, 6, 9, 12, 15, 18 — count by 3s!' },
        { vis: '🎡', q: 'A big wheel has 5 compartments, 4 children in each. Total?', options: ['15', '25', '20'], a: 2, hint: '4 + 4 + 4 + 4 + 4 = 20.' },
        { vis: '5️⃣ 5️⃣ 5️⃣ 5️⃣', q: '4 times 5 = ?', options: ['20', '9', '45'], a: 0, hint: '5, 10, 15, 20.' },
        { vis: '2️⃣ ➕ 2️⃣ ➕ 2️⃣ ➕ 2️⃣ ➕ 2️⃣', q: 'How many times does 2 appear in 2 + 2 + 2 + 2 + 2?', options: ['5', '4', '6'], a: 0, hint: 'Count the twos — five times.' },
        { vis: '2️⃣ 2️⃣ 2️⃣', q: '2 + 2 + 2 = 6. So 3 times 2 = ?', options: ['6', '4', '8'], a: 0, hint: 'Three twos make six.' },
        { vis: '🚌 🚌 🚌 🚌 🚌 🚌 🚌 🚌 🚌', q: '9 rows of 2 seats in a bus. 9 times 2 = ?', options: ['11', '18', '20'], a: 1, hint: 'Count by 2s nine times — 18.' }
      ]
    }
  },
  {
    id: 'ch12', n: 12, title: 'How Much Can We Spend?', emoji: '💰', topic: 'Money',
    c1: '#eab308', c2: '#14b8a6',
    desc: 'Free Class 1 chapter 12 game — count coins and notes, make amounts and learn buying with rupees. Money practice for kids.',
    learn: {
      intro: 'Riya counts coins of ₹1, ₹2, ₹5 and ₹10 — Sahil counts notes of ₹10, ₹20, ₹50 and ₹100. At Rahim Kaka\'s toy shop we learn how much things cost!',
      points: [
        'Coins: ₹1, ₹2, ₹5, ₹10. Notes: ₹10, ₹20, ₹50, ₹100.',
        'Four ₹5 coins make ₹20 — the same as two ₹10 notes.',
        'We can make one amount in different ways: ₹13 = ₹10 + ₹3.',
        'Saving money is a good habit!'
      ],
      words: ['rupee', 'coin', 'note', 'cost', 'change', 'save']
    },
    game: {
      type: 'quiz', title: 'Shop & Pay', instructions: 'Buy toys with coins and notes — tap the right answer.',
      questions: [
        { vis: '⚽ ₹20', q: 'A ball costs ₹20. How many ₹5 coins does Riya give?', options: ['5', '4', '2'], a: 1, hint: '5 + 5 + 5 + 5 = 20.' },
        { vis: '⚽ ₹20', q: 'How many ₹10 notes make the same ₹20?', options: ['1', '20', '2'], a: 2, hint: '₹10 + ₹10 = ₹20.' },
        { vis: '🚗 ₹14 | 🪙 ₹10', q: 'A car costs ₹14. Riya has ₹10. How much MORE does she need?', options: ['₹4', '₹24', '₹6'], a: 0, hint: '14 − 10 = 4.' },
        { vis: '1️⃣0️⃣ ➕ 2️⃣0️⃣', q: '₹10 + ₹20 = ?', options: ['₹12', '₹30', '₹300'], a: 1, hint: '10 and 20 together are 30.' },
        { vis: '₹2️⃣0️⃣ ₹5️⃣0️⃣ ₹1️⃣0️⃣0️⃣', q: 'Which is the BIGGEST amount?', options: ['₹20', '₹50', '₹100'], a: 2, hint: 'One hundred rupees is the biggest.' },
        { vis: '🪙🪙🪙', q: '3 coins of ₹2 make:', options: ['₹6', '₹5', '₹3'], a: 0, hint: '2 + 2 + 2 = 6.' },
        { vis: '❓ 🪙 = ₹1️⃣3️⃣', q: 'Which group makes ₹13?', options: ['₹10 + ₹2', '₹5 + ₹5', '₹10 + ₹3'], a: 2, hint: '10 and 3 more is 13.' },
        { vis: '🪙 🐷 ❤️', q: 'Saving money is a ___ habit.', options: ['good', 'silly', 'bad'], a: 0, hint: 'The book tells us saving is a good habit!' }
      ]
    }
  },
  {
    id: 'ch13', n: 13, title: 'So Many Toys', emoji: '🧸', topic: 'More, less or equal',
    c1: '#8b5cf6', c2: '#06b6d4',
    desc: 'Free Class 1 chapter 13 game — compare groups and numbers with more than, less than and equal to. Final chapter practice.',
    learn: {
      intro: 'So many toys in the shop! Dolls, cars, elephants, teddy bears — which group has more? In this chapter we compare using three magic phrases: more than, less than, equal to.',
      points: [
        'Count both groups first, then compare.',
        'More than: 7 is more than 5. Less than: 4 is less than 9.',
        'Equal to: 5 + 3 and 4 + 4 are equal — both are 8.',
        'The group with the smallest count is the LEAST in number.'
      ],
      words: ['more than', 'less than', 'equal to', 'most', 'least']
    },
    game: {
      type: 'quiz', title: 'Compare the Toys', instructions: 'Read each sentence and tap more than, less than or equal to.',
      questions: [
        { vis: '🚗 🚗 🚗 | 🧸 🧸', q: 'The number of cars is ___ the number of teddy bears.', options: ['less than', 'equal to', 'more than'], a: 2, hint: '3 cars, 2 teddies — cars are more.' },
        { vis: '🐯 🐯 | 🐯 🐯 🐯', q: 'The first group of tigers is ___ the second group.', options: ['less than', 'more than', 'equal to'], a: 0, hint: '2 is less than 3.' },
        { vis: '5 + 3 | 4 + 4', q: '5 + 3 is ___ 4 + 4.', options: ['more than', 'less than', 'equal to'], a: 2, hint: 'Both sides equal 8!' },
        { vis: '8️⃣ | 6️⃣', q: 'Which number is MORE?', options: ['8', '6', '7'], a: 0, hint: '8 beats 6 and 7.' },
        { vis: '9️⃣ | 4️⃣', q: 'Which number is LESS?', options: ['9', '4', '7'], a: 1, hint: '4 is the smallest here.' },
        { vis: '🌺🌺🌺 | 🌺🌺🌺🌺🌺', q: 'There are 3 red and 5 blue flowers. Red flowers are ___.', options: ['less than', 'more than', 'equal to'], a: 0, hint: '3 is less than 5.' },
        { vis: '🪆 🪆 🪆 | 🚗 🚗 🚗 🚗', q: 'The number of dolls is ___ the number of cars.', options: ['more than', 'equal to', 'less than'], a: 2, hint: '3 dolls, 4 cars — dolls are fewer.' },
        { vis: '9️⃣ | 6️⃣', q: '9 is ___ than 6.', options: ['equal to', 'less than', 'more than'], a: 2, hint: '9 comes after 6 — more!' }
      ]
    }
  }
];
