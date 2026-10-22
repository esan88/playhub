/* PlayHub — Bansuri-I Class 3 Arts chapter content
   Source: NCERT Bansuri-I, Textbook for Arts Class 3 (Reprint 2026-27), Chapters 1–20.
   Each chapter: story + learning card + one interactive game (quiz | match | sequence). */
window.BA3_CHAPTERS = [
  {
    id: 'c3ba1', n: 1, title: 'Objects in Art', emoji: '🏺', topic: 'Drawing everyday objects',
    c1: '#f59e0b', c2: '#ef4444',
    desc: 'Pots, baskets, lamps — draw the objects around you! A free Class 3 Arts lesson and matching game from NCERT Bansuri chapter 1.',
    learn: {
      story: 'Look around — pot, basket, lamp, chair! Every object has a shape waiting to be drawn. Grab a pencil, little artist! ✏️',
      intro: 'Artists draw what they see. Start with simple shapes: circle, square, triangle.',
      points: [
        'Look carefully before you draw.',
        'Big shapes first, details later.',
        'Everyday objects make best models.',
        'Sign your artwork with pride!'
      ],
      words: ['draw', 'object', 'shape', 'look', 'pencil', 'art']
    },
    game: {
      type: 'match', title: 'Objects Matching!', instructions: 'Tap an object word, then tap its picture.',
      pairs: [
        ['Pot', '🏺'], ['Basket', '🧺'], ['Lamp', '🪔'],
        ['Chair', '🪑'], ['Umbrella', '☂️'], ['Drum', '🥁']
      ]
    }
  },
  {
    id: 'c3ba2', n: 2, title: 'Plants in Art', emoji: '🌿', topic: 'Drawing leaves and flowers',
    c1: '#16a34a', c2: '#84cc16',
    desc: 'Leaves, petals, patterns — paint the green world! A free Class 3 Arts lesson and matching game from NCERT Bansuri chapter 2.',
    learn: {
      story: 'Neem leaf, marigold, mango twig — nature gives free stencils! Press, trace and print leafy art. 🌿',
      intro: 'Leaves have shapes and veins. Flowers have petal counts. Print and paint them.',
      points: [
        'Trace a leaf to catch its shape.',
        'Count petals before drawing flowers.',
        'Leaf-print with safe colours.',
        'Green has many shades — mix them!'
      ],
      words: ['leaf', 'petal', 'trace', 'print', 'green', 'vein']
    },
    game: {
      type: 'match', title: 'Plants Matching!', instructions: 'Tap a plant word, then tap its picture.',
      pairs: [
        ['Leaf', '🍃'], ['Flower', '🌼'], ['Tree', '🌳'],
        ['Cactus', '🌵'], ['Bamboo', '🎍'], ['Herb', '🌱']
      ]
    }
  },
  {
    id: 'c3ba3', n: 3, title: 'Animals in Art', emoji: '🐘', topic: 'Drawing animals simply',
    c1: '#b45309', c2: '#f59e0b',
    desc: 'Elephants from ovals, cats from circles! A free Class 3 Arts lesson and matching game from NCERT Bansuri chapter 3.',
    learn: {
      story: 'Oval body, circle head, triangle ears — POOF, an elephant! Every animal starts as easy shapes. 🐘',
      intro: 'Build animals from circles, ovals and lines. Add eyes, ears and tails last.',
      points: [
        'Bodies are ovals; heads are circles.',
        'Ears and tails give character.',
        'Big animals need big paper!',
        'Name your animal art.'
      ],
      words: ['animal', 'oval', 'circle', 'ears', 'tail', 'draw']
    },
    game: {
      type: 'match', title: 'Animals Matching!', instructions: 'Tap an animal word, then tap its picture.',
      pairs: [
        ['Elephant', '🐘'], ['Lion', '🦁'], ['Monkey', '🐵'],
        ['Rabbit', '🐰'], ['Frog', '🐸'], ['Fish', '🐠']
      ]
    }
  },
  {
    id: 'c3ba4', n: 4, title: 'People Around Us', emoji: '🎨', topic: 'Drawing family and friends',
    c1: '#ec4899', c2: '#8b5cf6',
    desc: 'Draw Mummy, Papa, friends — people you love! A free Class 3 Arts lesson and quiz game from NCERT Bansuri chapter 4.',
    learn: {
      story: 'Stick arms, round face, curly hair — that’s Papa! Drawing people we love makes the best gifts. 🎨❤️',
      intro: 'Faces: two eyes, nose, smiling mouth. Bodies: head, trunk, arms, legs.',
      points: [
        'Eyes sit halfway down the face.',
        'Hair and clothes show who is who.',
        'Draw helpers: teacher, doctor, farmer.',
        'Gift your portrait with love.'
      ],
      words: ['people', 'face', 'smile', 'family', 'portrait', 'gift']
    },
    game: {
      type: 'quiz', title: 'People in Art Quiz', instructions: 'Think like an artist and tap.',
      questions: [
        { vis: '🖼️', q: 'A portrait shows mainly the…?', options: ['Feet', 'Face', 'Chair'], a: 1, hint: 'Face focus!' },
        { vis: '👀', q: 'Eyes sit ___ on the face.', options: ['At the top', 'Halfway down', 'On the chin'], a: 1, hint: 'Middle magic!' },
        { vis: '😄', q: 'A smile is drawn as a…?', options: ['Straight stick', 'Up curve', 'Zigzag'], a: 1, hint: 'Curve up!' },
        { vis: '📚', q: 'To draw a teacher, add…?', options: ['Books and board', 'Wings', 'Crown'], a: 0, hint: 'Books tell the job!' },
        { vis: '🎁', q: 'Best gift for Grandma?', options: ['Her portrait', 'Nothing', 'Torn page'], a: 0, hint: 'Drawn with love!' },
        { vis: '🧍', q: 'A standing person needs…?', options: ['Only a head', 'Head, body, arms, legs', 'Only hands'], a: 1, hint: 'Whole body!' }
      ]
    }
  },
  {
    id: 'c3ba5', n: 5, title: 'Festivals, Occasions, and Celebrations', emoji: '🎉', topic: 'Art of festivals',
    c1: '#a855f7', c2: '#eab308',
    desc: 'Diyas, rangoli, buntings — decorate every festival! A free Class 3 Arts lesson and quiz game from NCERT Bansuri chapter 5.',
    learn: {
      story: 'Rangoli at the door, buntings across, diyas in rows — festivals wear handmade art! What will YOU make? 🪔',
      intro: 'Festivals shine with handmade decor: rangoli, torans, cards, lanterns.',
      points: [
        'Rangoli welcomes guests at doors.',
        'Paper buntings dance in wind.',
        'Greeting cards carry love.',
        'Clean up decor after the party.'
      ],
      words: ['festival', 'rangoli', 'bunting', 'card', 'decorate', 'welcome']
    },
    game: {
      type: 'quiz', title: 'Festival Art Quiz', instructions: 'Decorate right and tap.',
      questions: [
        { vis: '🌸🚪', q: 'Rangoli is made…?', options: ['On the door floor', 'On the roof', 'In a book'], a: 0, hint: 'Welcome at the door!' },
        { vis: '🔺🔻🔺', q: 'Buntings are strings of…?', options: ['Stones', 'Paper flags', 'Shoes'], a: 1, hint: 'Fluttering flags!' },
        { vis: '💌', q: 'Festival wishes travel in…?', options: ['Greeting cards', 'Newspapers', 'Bills'], a: 0, hint: 'Cards of love!' },
        { vis: '🏮', q: 'Paper lanterns glow at…?', options: ['Night parties', 'Mornings only', 'Never'], a: 0, hint: 'Night glow!' },
        { vis: '🪔', q: 'Diyas are placed in…?', options: ['Scattered anywhere', 'Neat rows', 'Water pots'], a: 1, hint: 'Rows shine!' },
        { vis: '🧹🎉', q: 'After the party, decor should be…?', options: ['Left messy', 'Cleaned together', 'Burnt'], a: 1, hint: 'Clean together!' }
      ]
    }
  },
  {
    id: 'c3ba6', n: 6, title: 'Our National Anthem', emoji: '🇮🇳', topic: 'Jana Gana Mana with respect',
    c1: '#ff9933', c2: '#138808',
    desc: 'Stand tall, sing proud — Jana Gana Mana! A free Class 3 Arts lesson and quiz game from NCERT Bansuri chapter 6.',
    learn: {
      story: ' Fifty-two seconds, one nation, hearts beating together! When the anthem plays, we stand straight and sing as one. 🇮🇳',
      intro: 'Jana Gana Mana is our National Anthem, written by Rabindranath Tagore.',
      points: [
        'Stand at attention during the anthem.',
        'Sing together in one voice.',
        'The anthem honours our nation.',
        'Remove caps and stand still.'
      ],
      words: ['anthem', 'nation', 'respect', 'stand', 'sing', 'proud']
    },
    game: {
      type: 'quiz', title: 'Anthem Quiz', instructions: 'Stand proud and tap the answer.',
      questions: [
        { vis: '🇮🇳🎵', q: 'Our National Anthem is…?', options: ['Jana Gana Mana', 'A film song', 'A prayer bell'], a: 0, hint: 'Jana Gana Mana!' },
        { vis: '🧔📜', q: 'It was written by…?', options: ['A singer unknown', 'Rabindranath Tagore', 'A king'], a: 1, hint: 'Tagore’s gift!' },
        { vis: '🧍🎵', q: 'During the anthem we…?', options: ['Run around', 'Stand at attention', 'Sit and eat'], a: 1, hint: 'Straight and still!' },
        { vis: '⏱️5️⃣2️⃣', q: 'The anthem plays about ___ seconds.', options: ['10', '52', '200'], a: 1, hint: 'Fifty-two!' },
        { vis: '🎤👫', q: 'We sing the anthem…?', options: ['Alone only', 'Together as one', 'Never'], a: 1, hint: 'One voice!' },
        { vis: '🧢🚫', q: 'Before the anthem, we…?', options: ['Wear caps', 'Remove caps', 'Dance'], a: 1, hint: 'Caps off, respect on!' }
      ]
    }
  },
  {
    id: 'c3ba7', n: 7, title: 'Feel the Rhythm: ta ka ta ki Ta', emoji: '🥁', topic: 'Clapping a rhythm pattern in order',
    c1: '#ef4444', c2: '#7c3aed',
    desc: 'Ta! Ka! Ta! Ki! Ta! Clap the rhythm right. A free Class 3 Arts rhythm sequence game from NCERT Bansuri chapter 7.',
    learn: {
      story: 'The tabla goes dhun-dhun, hands go clap-clap! Ta ka ta ki Ta — five beats marching in order. Feel it! 🥁👏',
      intro: 'Rhythm is beats in order. Clap, tap and snap to play ta ka ta ki Ta.',
      points: [
        'Ta = clap, Ka = tap, Ki = snap.',
        'Five beats make one round.',
        'Repeat rounds without stopping.',
        'Fast or slow — keep the order!'
      ],
      words: ['rhythm', 'clap', 'beat', 'repeat', 'ta', 'order']
    },
    game: {
      type: 'sequence', title: 'Rhythm in Order', instructions: 'Tap the beats of ta ka ta ki Ta in order.',
      leftTitle: 'Beat order', rightTitle: 'Tap the next beat',
      steps: [
        { emoji: '👏', text: 'Clap TA' },
        { emoji: '👆', text: 'Tap KA' },
        { emoji: '👏', text: 'Clap TA again' },
        { emoji: '🤏', text: 'Snap KI' },
        { emoji: '👏', text: 'Clap TA to finish' },
        { emoji: '🔁', text: 'Repeat the whole round' }
      ]
    }
  },
  {
    id: 'c3ba8', n: 8, title: 'Travel Around', emoji: '🗺️', topic: 'Drawing journeys and maps',
    c1: '#0ea5e9', c2: '#f59e0b',
    desc: 'Draw your trip — home, park, river, hills! A free Class 3 Arts lesson and quiz game from NCERT Bansuri chapter 8.',
    learn: {
      story: 'Crayon bus rolls across the page — home, mango tree, river bridge, hills! Maps turn trips into pictures. 🗺️🚌',
      intro: 'Journey drawings show start, path, landmarks and end.',
      points: [
        'Mark home as the starting dot.',
        'Draw paths as winding lines.',
        'Add landmarks: trees, rivers, shops.',
        'Show direction with arrows.'
      ],
      words: ['travel', 'map', 'path', 'landmark', 'arrow', 'journey']
    },
    game: {
      type: 'quiz', title: 'Travel Art Quiz', instructions: 'Map it out and tap.',
      questions: [
        { vis: '🏠🗺️', q: 'A journey drawing starts at…?', options: ['The end', 'Home dot', 'Nowhere'], a: 1, hint: 'Home first!' },
        { vis: '〰️', q: 'Winding lines show the…?', options: ['Border', 'Path', 'Title'], a: 1, hint: 'Follow the path!' },
        { vis: '🌳🏪', q: 'Trees and shops on maps are…?', options: ['Landmarks', 'Mistakes', 'Borders'], a: 0, hint: 'Landmark clues!' },
        { vis: '➡️', q: 'Arrows on a map show…?', options: ['Colours', 'Direction', 'Names'], a: 1, hint: 'Which way!' },
        { vis: '🌉', q: 'A river crossing needs a…?', options: ['Bridge', 'Wall', 'Gate'], a: 0, hint: 'Bridge over!' },
        { vis: '🏁', q: 'The trip ends at the…?', options: ['Start', 'Destination mark', 'Corner'], a: 1, hint: 'Finish flag!' }
      ]
    }
  },
  {
    id: 'c3ba9', n: 9, title: 'Musical Instruments', emoji: '🎶', topic: 'Instruments and their sounds',
    c1: '#8b5cf6', c2: '#ec4899',
    desc: 'Dholak thumps, flute sings, manjira chimes! A free Class 3 Arts lesson and matching game from NCERT Bansuri chapter 9.',
    learn: {
      story: 'Thump goes the dholak, toot goes the flute, ching-ching go the manjira! Every instrument has its own voice. 🎶',
      intro: 'Instruments make music: drums beat, strings strum, flutes blow, bells chime.',
      points: [
        'Dholak and tabla are drums.',
        'Flute sings when we blow.',
        'Manjira are small clash cymbals.',
        'Play softly together in a band.'
      ],
      words: ['music', 'drum', 'flute', 'song', 'band', 'sound']
    },
    game: {
      type: 'match', title: 'Instruments Matching!', instructions: 'Tap an instrument word, then tap its picture.',
      pairs: [
        ['Dholak', '🥁'], ['Flute', '🪈'], ['Guitar', '🎸'],
        ['Trumpet', '🎺'], ['Violin', '🎻'], ['Bell', '🔔']
      ]
    }
  },
  {
    id: 'c3ba10', n: 10, title: 'Celebratory Notes', emoji: '🎵', topic: 'Singing celebration songs',
    c1: '#eab308', c2: '#ef4444',
    desc: 'Birthdays, festivals, victories — sing the happy notes! A free Class 3 Arts lesson and quiz game from NCERT Bansuri chapter 10.',
    learn: {
      story: 'Happy birthday to YOU! Celebration songs turn smiles into music. Loud, soft, fast, slow — sing your joy! 🎵🎂',
      intro: 'Songs celebrate moments. Sing in tune, together, with actions.',
      points: [
        'Birthday songs wish joy.',
        'Clap along to keep beat.',
        'Loud-soft changes make songs fun.',
        'Thank the singers with applause.'
      ],
      words: ['song', 'sing', 'birthday', 'tune', 'clap', 'joy']
    },
    game: {
      type: 'quiz', title: 'Celebration Songs Quiz', instructions: 'Sing along and tap.',
      questions: [
        { vis: '🎂🎵', q: 'We sing on birthdays to…?', options: ['Cry', 'Wish joy', 'Sleep'], a: 1, hint: 'Joyful wishes!' },
        { vis: '👏🎵', q: 'Clapping during songs keeps the…?', options: ['Silence', 'Beat', 'Darkness'], a: 1, hint: 'Beat buddies!' },
        { vis: '🔊🔉', q: 'Loud then soft singing is…?', options: ['Boring', 'Fun dynamics', 'Wrong'], a: 1, hint: 'Fun and lively!' },
        { vis: '👫🎤', q: 'Group songs need singers to…?', options: ['Shout over', 'Sing together', 'Sleep'], a: 1, hint: 'Together tune!' },
        { vis: '👏👏', q: 'After a song, we give…?', options: ['Applause', 'Silence', 'Stones'], a: 0, hint: 'Clap clap!' },
        { vis: '🎵❤️', q: 'Songs carry our…?', options: ['Bags', 'Feelings', 'Shoes'], a: 1, hint: 'Heartfelt!' }
      ]
    }
  },
  {
    id: 'c3ba11', n: 11, title: 'Let Us Dance', emoji: '💃', topic: 'First dance moves',
    c1: '#ec4899', c2: '#f97316',
    desc: 'Step, spin, clap — your first dance class! A free Class 3 Arts lesson and quiz game from NCERT Bansuri chapter 11.',
    learn: {
      story: 'Music starts — left foot, right foot, SPIN! Dancing turns wiggles into art. Everybody dance! 💃',
      intro: 'Dance = steps + rhythm + expression. Warm up first, then move.',
      points: [
        'Warm up arms and legs first.',
        'Step to the beat of music.',
        'Faces show the dance mood.',
        'Practice makes moves smooth.'
      ],
      words: ['dance', 'step', 'spin', 'beat', 'move', 'music']
    },
    game: {
      type: 'quiz', title: 'Dance Quiz', instructions: 'Move and tap.',
      questions: [
        { vis: '🤸🎵', q: 'Before dancing, we…?', options: ['Sleep', 'Warm up', 'Eat ice cream'], a: 1, hint: 'Warm muscles!' },
        { vis: '👣🥁', q: 'Dance steps follow the…?', options: ['Wind', 'Music beat', 'Clock'], a: 1, hint: 'Beat steps!' },
        { vis: '😄💃', q: 'A happy dance needs a…?', options: ['Sad face', 'Smiling face', 'Hidden face'], a: 1, hint: 'Smile shine!' },
        { vis: '🔄', q: 'A spin turns you…?', options: ['Straight only', 'Round and round', 'Backwards only'], a: 1, hint: 'Whirl round!' },
        { vis: '👫', q: 'Folk dances are danced…?', options: ['Alone always', 'In joyful groups', 'Never'], a: 1, hint: 'Group joy!' },
        { vis: '👏', q: 'After a dance show, audience…?', options: ['Leaves silently', 'Claps loudly', 'Sleeps'], a: 1, hint: 'Clap loud!' }
      ]
    }
  },
  {
    id: 'c3ba12', n: 12, title: 'Dance for Joy', emoji: '🕺', topic: 'Dancing feelings',
    c1: '#7c3aed', c2: '#06b6d4',
    desc: 'Happy feet, sad sway — dance every feeling! A free Class 3 Arts lesson and quiz game from NCERT Bansuri chapter 12.',
    learn: {
      story: 'Rain makes feet jump for JOY! Dance can laugh, cry and dream without a single word. Feel it, move it! 🕺🌧️',
      intro: 'Dance expresses feelings: jumps for joy, sways for calm, stomps for anger.',
      points: [
        'Jump high for happy dances.',
        'Sway slow for gentle moods.',
        'Stamp feet for strong feelings.',
        'End with a graceful bow.'
      ],
      words: ['joy', 'feeling', 'jump', 'sway', 'express', 'bow']
    },
    game: {
      type: 'quiz', title: 'Feelings Dance Quiz', instructions: 'Feel the beat and tap.',
      questions: [
        { vis: '😄⬆️', q: 'Joyful dance moves go…?', options: ['Down low', 'High and bouncy', 'Still'], a: 1, hint: 'Bounce with joy!' },
        { vis: '😌〰️', q: 'Calm dance sways…?', options: ['Fast jerks', 'Slow and smooth', 'Wild jumps'], a: 1, hint: 'Smooth and slow!' },
        { vis: '😠👣', q: 'Strong feelings stamp…?', options: ['Softly never', 'Feet firmly', 'Hands only'], a: 1, hint: 'Stamp strong!' },
        { vis: '🌧️💃', q: 'Dancing in first rain feels…?', options: ['Sad', 'Joyful', 'Angry'], a: 1, hint: 'Rain joy!' },
        { vis: '🙇', q: 'Dancers end shows with a…?', options: ['Bow', 'Run away', 'Shout'], a: 0, hint: 'Graceful bow!' },
        { vis: '🎭', q: 'Dance without words still…?', options: ['Says nothing', 'Tells feelings', 'Fails'], a: 1, hint: 'Feelings speak!' }
      ]
    }
  },
  {
    id: 'c3ba13', n: 13, title: 'I Play and Dance', emoji: '🤹', topic: 'Playing games with dance moves',
    c1: '#f59e0b', c2: '#16a34a',
    desc: 'Freeze dance, statue, rhythm games — play and move! A free Class 3 Arts play-dance sequence game from NCERT Bansuri chapter 13.',
    learn: {
      story: 'Music plays — DANCE! Music stops — FREEZE! Games with dance moves are double fun. Can you freeze like a statue? 🗿🎵',
      intro: 'Play-dance games mix rules with moves: freeze, follow, copy, lead.',
      points: [
        'Freeze dance: move on music, freeze on stop.',
        'Follow-the-leader copies moves.',
        'Statue game holds funny poses.',
        'Losing cheerfully keeps games fun.'
      ],
      words: ['play', 'freeze', 'follow', 'statue', 'rule', 'laugh']
    },
    game: {
      type: 'sequence', title: 'Freeze Dance in Order', instructions: 'Tap the game steps in order.',
      leftTitle: 'Game order', rightTitle: 'Tap the next step',
      steps: [
        { emoji: '⭕', text: 'Stand in a circle' },
        { emoji: '🎵', text: 'Music starts — dance!' },
        { emoji: '✋', text: 'Music stops — freeze!' },
        { emoji: '🗿', text: 'Hold a funny statue pose' },
        { emoji: '😂', text: 'Movers laugh, freezers win' },
        { emoji: '🔁', text: 'Play another round' }
      ]
    }
  },
  {
    id: 'c3ba14', n: 14, title: 'Dance with Nature', emoji: '🦚', topic: 'Dancing like animals and trees',
    c1: '#0ea5e9', c2: '#65a30d',
    desc: 'Sway like trees, hop like frogs, spread like peacocks! A free Class 3 Arts lesson and quiz game from NCERT Bansuri chapter 14.',
    learn: {
      story: 'The peacock fans its tail — dance like THAT! Trees sway, frogs hop, and you become nature in motion. 🦚🌳',
      intro: 'Nature dances inspire steps: sway, hop, flutter, spread.',
      points: [
        'Sway arms like tree branches.',
        'Hop small like happy frogs.',
        'Flutter hands like butterfly wings.',
        'Spread arms like a peacock fan.'
      ],
      words: ['nature', 'sway', 'hop', 'flutter', 'spread', 'inspire']
    },
    game: {
      type: 'quiz', title: 'Nature Dance Quiz', instructions: 'Move like nature and tap.',
      questions: [
        { vis: '🌳💨', q: 'Trees in wind…?', options: ['Stand stiff', 'Sway side to side', 'Jump'], a: 1, hint: 'Swaying branches!' },
        { vis: '🐸', q: 'Dance like a frog — you…?', options: ['Glide', 'Hop low', 'Spin fast'], a: 1, hint: 'Hoppy hops!' },
        { vis: '🦋', q: 'Butterfly hands…?', options: ['Clap hard', 'Flutter softly', 'Point'], a: 1, hint: 'Flutter by!' },
        { vis: '🦚', q: 'Proud peacock dancers…?', options: ['Hide arms', 'Spread arms wide', 'Sit'], a: 1, hint: 'Fan wide!' },
        { vis: '🌊', q: 'Waves dance by…?', options: ['Rolling in-out', 'Standing still', 'Jumping'], a: 0, hint: 'Roll and curl!' },
        { vis: '🐍', q: 'Snake dance moves…?', options: ['Straight march', 'Wavy and smooth', 'Stomps'], a: 1, hint: 'Slithery smooth!' }
      ]
    }
  },
  {
    id: 'c3ba15', n: 15, title: 'Explore', emoji: '🔍', topic: 'Exploring textures and sounds',
    c1: '#6366f1', c2: '#14b8a6',
    desc: 'Rough bark, smooth pebbles, tinkling bells — explore it all! A free Class 3 Arts lesson and quiz game from NCERT Bansuri chapter 15.',
    learn: {
      story: 'Detective cap ON! Rub the bark — rough! Tap the steel glass — ting! The world is full of textures and sounds. 🔍',
      intro: 'Explore with senses: touch textures, hear sounds, spot patterns.',
      points: [
        'Bark is rough; petals are soft.',
        'Steel tings; wood thuds.',
        'Collect safe interesting objects.',
        'Draw or describe what you find.'
      ],
      words: ['explore', 'texture', 'rough', 'smooth', 'sound', 'find']
    },
    game: {
      type: 'quiz', title: 'Explore Quiz', instructions: 'Sense and tap.',
      questions: [
        { vis: '🌳✋', q: 'Tree bark feels…?', options: ['Smooth glass', 'Rough', 'Wet soap'], a: 1, hint: 'Rough bark!' },
        { vis: '🌸✋', q: 'Rose petals feel…?', options: ['Rough sand', 'Soft silk', 'Hard stone'], a: 1, hint: 'Soft touch!' },
        { vis: '🥛🔔', q: 'A steel glass tapped goes…?', options: ['Thud', 'Ting', 'Splash'], a: 1, hint: 'Ting-ting!' },
        { vis: '🪵🥁', q: 'A wooden box tapped goes…?', options: ['Ting', 'Thud', 'Ring'], a: 1, hint: 'Dull thud!' },
        { vis: '🔍🍂', q: 'Good exploring means…?', options: ['Breaking things', 'Looking closely, kindly', 'Running past'], a: 1, hint: 'Look kindly!' },
        { vis: '🎒🪶', q: 'Safe souvenirs to collect?', options: ['Fallen feather', 'Bird eggs', 'Live insects'], a: 0, hint: 'Fallen things only!' }
      ]
    }
  },
  {
    id: 'c3ba16', n: 16, title: 'Imagine', emoji: '💭', topic: 'Imagining impossible pictures',
    c1: '#8b5cf6', c2: '#f472b6',
    desc: 'Fish that fly, suns that are blue — imagine anything! A free Class 3 Arts lesson and quiz game from NCERT Bansuri chapter 16.',
    learn: {
      story: 'Close your eyes — a purple elephant flies over a chocolate river! Imagination has no rules. Draw your wildest dream! 💭🐘',
      intro: 'Imagine impossible combos, then draw or act them.',
      points: [
        'Mix two real things into one dream.',
        'Impossible colours are allowed!',
        'Tell the story of your picture.',
        'Every idea deserves a try.'
      ],
      words: ['imagine', 'dream', 'impossible', 'idea', 'create', 'story']
    },
    game: {
      type: 'quiz', title: 'Imagine Quiz', instructions: 'Dream big and tap.',
      questions: [
        { vis: '🐟☁️', q: 'A flying fish is…?', options: ['Real daily', 'Imaginary fun', 'Scary'], a: 1, hint: 'Dreamy fun!' },
        { vis: '🟦☀️', q: 'A blue sun in art is…?', options: ['Wrong always', 'Fine in imagination', 'Boring'], a: 1, hint: 'Art allows!' },
        { vis: '🐘🪽', q: 'Elephant + wings = …?', options: ['Nothing', 'A new dream creature', 'A mistake'], a: 1, hint: 'Create anew!' },
        { vis: '🏞️🍫', q: 'A chocolate river shows…?', options: ['No ideas', 'Wild imagination', 'Sadness'], a: 1, hint: 'Yummy dreams!' },
        { vis: '📖💭', q: 'After drawing dreams, we…?', options: ['Hide them', 'Tell their story', 'Tear them'], a: 1, hint: 'Story time!' },
        { vis: '💡', q: 'New ideas need…?', options: ['A brave try', 'Permission never', 'Hiding'], a: 0, hint: 'Try it!' }
      ]
    }
  },
  {
    id: 'c3ba17', n: 17, title: 'Let’s Create', emoji: '🎨', topic: 'Making art step by step, in order',
    c1: '#ef4444', c2: '#f59e0b',
    desc: 'Idea, sketch, colour, show — create like a star! A free Class 3 Arts creation sequence game from NCERT Bansuri chapter 17.',
    learn: {
      story: 'Blank page? No fear! Think, sketch light, colour bright, and show the world. Every artist starts exactly here. 🎨',
      intro: 'Creating has steps: idea → sketch → colour → finish → share.',
      points: [
        'Think of one clear idea.',
        'Sketch lightly with a pencil.',
        'Colour inside, then background.',
        'Share and tell about your art.'
      ],
      words: ['create', 'idea', 'sketch', 'colour', 'finish', 'share']
    },
    game: {
      type: 'sequence', title: 'Create in Order', instructions: 'Tap the creation steps in order.',
      leftTitle: 'Art order', rightTitle: 'Tap the next step',
      steps: [
        { emoji: '💡', text: 'Think of one idea' },
        { emoji: '✏️', text: 'Sketch lightly in pencil' },
        { emoji: '🖍️', text: 'Colour the main picture' },
        { emoji: '🌈', text: 'Fill the background' },
        { emoji: '🖊️', text: 'Outline and finish' },
        { emoji: '🖼️', text: 'Show and tell your art' }
      ]
    }
  },
  {
    id: 'c3ba18', n: 18, title: 'Look Around', emoji: '👀', topic: 'Observing art in surroundings',
    c1: '#0ea5e9', c2: '#84cc16',
    desc: 'Patterns on grills, colours on trucks — art is everywhere! A free Class 3 Arts lesson and quiz game from NCERT Bansuri chapter 18.',
    learn: {
      story: 'Truck flowers, gate curls, sari borders — the street is a gallery! Open your eyes, art jumps out! 👀🌸',
      intro: 'Art lives around us: truck paintings, rangoli, wall designs, fabrics.',
      points: [
        'Trucks wear painted flowers and words.',
        'Gates curl into iron patterns.',
        'Sari borders repeat pretty motifs.',
        'Sketch one design you spot.'
      ],
      words: ['around', 'pattern', 'border', 'design', 'spot', 'street']
    },
    game: {
      type: 'quiz', title: 'Art Around Quiz', instructions: 'Spot art and tap.',
      questions: [
        { vis: '🚚🌸', q: 'Indian trucks often wear…?', options: ['Plain grey', 'Painted flowers', 'Nothing'], a: 1, hint: 'Flower power!' },
        { vis: '🚪🌀', q: 'Iron gates curl into…?', options: ['Straight bars only', 'Pretty patterns', 'Holes'], a: 1, hint: 'Curly art!' },
        { vis: '🥻', q: 'Sari edges repeat…?', options: ['Motifs', 'Blank space', 'Stains'], a: 0, hint: 'Border beauty!' },
        { vis: '🧱🎨', q: 'Village walls often show…?', options: ['Plain mud only', 'Painted designs', 'Posters only'], a: 1, hint: 'Wall stories!' },
        { vis: '🏮', q: 'Hanging lanterns add…?', options: ['Darkness', 'Festive colour', 'Noise'], a: 1, hint: 'Festive glow!' },
        { vis: '✏️👀', q: 'After spotting a design, an artist…?', options: ['Forgets it', 'Sketches it', 'Breaks it'], a: 1, hint: 'Sketch fast!' }
      ]
    }
  },
  {
    id: 'c3ba19', n: 19, title: 'Activities', emoji: '🧩', topic: 'Fun art activities sampler',
    c1: '#f97316', c2: '#a855f7',
    desc: 'Tear, paste, fold, mould — an activity buffet! A free Class 3 Arts lesson and quiz game from NCERT Bansuri chapter 19.',
    learn: {
      story: 'Tear paper clouds, paste a sun, fold a frog, mould a diya — one chapter, SO many activities! Which first? 🧩',
      intro: 'Try many crafts: tearing, pasting, folding, moulding, printing.',
      points: [
        'Tearing makes soft cloudy edges.',
        'Pasting joins pieces into pictures.',
        'Folding turns paper into toys.',
        'Clay moulds into pots and animals.'
      ],
      words: ['activity', 'tear', 'paste', 'fold', 'mould', 'craft']
    },
    game: {
      type: 'quiz', title: 'Activities Quiz', instructions: 'Pick the right craft and tap.',
      questions: [
        { vis: '📄✋', q: 'Soft cloud edges need…?', options: ['Scissors', 'Tearing', 'Burning'], a: 1, hint: 'Tear gently!' },
        { vis: '🖼️🧴', q: 'Joining paper pieces uses…?', options: ['Water', 'Glue paste', 'Tape never'], a: 1, hint: 'Sticky glue!' },
        { vis: '🐸📄', q: 'A jumping frog toy needs…?', options: ['Folding', 'Melting', 'Digging'], a: 0, hint: 'Fold it!' },
        { vis: '🏺🟤', q: 'Clay diyas are made by…?', options: ['Moulding', 'Tearing', 'Cutting'], a: 0, hint: 'Mould soft clay!' },
        { vis: '🥔🎨', q: 'Potato printing uses…?', options: ['Whole potato', 'Cut potato as stamp', 'Peel only'], a: 1, hint: 'Stamp it!' },
        { vis: '🧹', q: 'After crafts, tables need…?', options: ['More mess', 'Cleaning together', 'Paint'], a: 1, hint: 'Clean crew!' }
      ]
    }
  },
  {
    id: 'c3ba20', n: 20, title: 'Integrating All Art Forms', emoji: '🌟', topic: 'One show with all arts together',
    c1: '#eab308', c2: '#ec4899',
    desc: 'Paint the backdrop, sing the song, dance the story — GRAND FINALE! A free Class 3 Arts lesson and quiz game from NCERT Bansuri chapter 20.',
    learn: {
      story: 'Curtain up! Painted trees, singing birds, dancing peacocks — every art form joins ONE big show. Take a bow! 🌟🎭',
      intro: 'Big shows mix visual art, music, dance and theatre together.',
      points: [
        'Backdrops are painted scenery.',
        'Songs set the mood.',
        'Dances act out the story.',
        'Every helper deserves applause.'
      ],
      words: ['integrate', 'show', 'stage', 'backdrop', 'together', 'applause']
    },
    game: {
      type: 'quiz', title: 'Grand Show Quiz', instructions: 'Run the show and tap.',
      questions: [
        { vis: '🎨🌳', q: 'Painted stage trees are the…?', options: ['Costumes', 'Backdrop', 'Tickets'], a: 1, hint: 'Behind the actors!' },
        { vis: '🎵😊', q: 'Songs in a show set the…?', options: ['Mood', 'Chairs', 'Lights'], a: 0, hint: 'Feel the mood!' },
        { vis: '💃📖', q: 'Dances in a show…?', options: ['Waste time', 'Act out the story', 'Hide actors'], a: 1, hint: 'Story in steps!' },
        { vis: '🎭🗣️', q: 'Actors speak clear…?', options: ['Whispers only', 'Dialogues loudly', 'Nothing'], a: 1, hint: 'Loud and clear!' },
        { vis: '💡🎭', q: 'Stage lights help us…?', options: ['Sleep', 'See the actors', 'Leave'], a: 1, hint: 'Spotlight!' },
        { vis: '👏🌟', q: 'After the finale, everyone gets…?', options: ['Scolding', 'Applause', 'Homework'], a: 1, hint: 'Clap big!' }
      ]
    }
  }
];
window.CHAPTERS = window.BA3_CHAPTERS;
window.CHAPTER_SUBJECT = 'Class 3 Arts';
