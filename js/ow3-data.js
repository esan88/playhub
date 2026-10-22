/* PlayHub — Our Wondrous World Class 3 chapter content
   Source: NCERT Our Wondrous World, The World Around Us Textbook for Class 3 (Reprint 2026-27), Chapters 1–12.
   Each chapter: story + learning card + one interactive game (quiz | match | sequence). */
window.OW3_CHAPTERS = [
  {
    id: 'c3ow1', n: 1, title: 'Family and Friends', emoji: '👪', topic: 'Who is in my family',
    c1: '#ec4899', c2: '#f97316',
    desc: 'Grandparents, parents, siblings and friends — who is who? A free Class 3 EVS lesson and quiz game from NCERT Our Wondrous World chapter 1.',
    learn: {
      story: 'Riya draws her family tree — Dadi with stories, Papa with jokes, and her best friend next door. Every family is special! 🌳',
      intro: 'A family is people who live together and care for each other. Friends are the family we choose.',
      points: [
        'Parents, grandparents and children make a family.',
        'Elders guide us; we respect and help them.',
        'Siblings are brothers and sisters.',
        'Good neighbours become good friends.'
      ],
      words: ['family', 'parents', 'grandparents', 'sibling', 'friend', 'respect']
    },
    game: {
      type: 'quiz', title: 'Family and Friends Quiz', instructions: 'Think about family and tap the answer.',
      questions: [
        { vis: '👵👴', q: 'Who are grandparents?', options: ['Parents’ parents', 'Cousins', 'Teachers'], a: 0, hint: 'Your parents’ mother and father!' },
        { vis: '👧👦', q: 'Your mother’s son is your…?', options: ['Uncle', 'Brother', 'Father'], a: 1, hint: 'Same parents — brother!' },
        { vis: '🤝', q: 'How should we treat elders?', options: ['Ignore them', 'Respect and help', 'Shout'], a: 1, hint: 'Respect and help!' },
        { vis: '🏠❤️', q: 'What makes a happy family?', options: ['Big TV', 'Love and care', 'Many cars'], a: 1, hint: 'Love and care!' },
        { vis: '👭', q: 'A best friend is…?', options: ['A stranger', 'Someone who shares and cares', 'A teacher'], a: 1, hint: 'Shares and cares!' },
        { vis: '👪', q: 'Who cooks, cleans and cares at home?', options: ['Only mother', 'Family members together', 'Guests'], a: 1, hint: 'Everyone helps together!' }
      ]
    }
  },
  {
    id: 'c3ow2', n: 2, title: 'Going to the Mela', emoji: '🎪', topic: 'A fair visit in order',
    c1: '#f59e0b', c2: '#ef4444',
    desc: 'Swings, stalls and sweets — plan the perfect mela trip! A free Class 3 EVS mela-trip sequence game from NCERT Our Wondrous World chapter 2.',
    learn: {
      story: 'The village mela is here! Giant wheel, toy stalls, jalebis — but a fun trip needs a plan. Let’s order the day! 🎡',
      intro: 'A mela is a fair with rides, shops, food and shows. Plan the visit step by step.',
      points: [
        'Decide the day and who is coming.',
        'Carry water, money and a cap.',
        'Rides first, shopping next, food last.',
        'Stay with elders and stay safe.'
      ],
      words: ['mela', 'fair', 'ride', 'stall', 'plan', 'safe']
    },
    game: {
      type: 'sequence', title: 'Mela Trip in Order', instructions: 'Tap the mela trip steps in order.',
      leftTitle: 'Trip order', rightTitle: 'Tap the next step',
      steps: [
        { emoji: '🗓️', text: 'Fix the day and call friends' },
        { emoji: '🎒', text: 'Pack water, cap and money' },
        { emoji: '🛺', text: 'Travel to the mela ground' },
        { emoji: '🎡', text: 'Enjoy the rides first' },
        { emoji: '🍬', text: 'Eat sweets and snacks' },
        { emoji: '🏠', text: 'Return home happily' }
      ]
    }
  },
  {
    id: 'c3ow3', n: 3, title: 'Celebrating Festivals', emoji: '🪔', topic: 'Festivals and how we celebrate',
    c1: '#a855f7', c2: '#eab308',
    desc: 'Diwali lamps, Holi colours, Eid hugs — festivals of joy! A free Class 3 EVS lesson and matching game from NCERT Our Wondrous World chapter 3.',
    learn: {
      story: 'Lamps glow, colours fly, hugs go around! Every festival has lights, sweets and together-time. Which festival is YOUR favourite? 🪔',
      intro: 'Festivals celebrate harvest, seasons, stories and togetherness.',
      points: [
        'Diwali lights diyas; Holi plays with colours.',
        'Eid shares hugs and sevaiyan; Christmas brings gifts.',
        'Every festival shares sweets and smiles.',
        'We greet elders and visit friends.'
      ],
      words: ['festival', 'Diwali', 'Holi', 'Eid', 'sweet', 'celebrate']
    },
    game: {
      type: 'match', title: 'Festival Matching!', instructions: 'Tap a festival word, then tap its picture.',
      pairs: [
        ['Diwali', '🪔'], ['Holi', '🎨'], ['Eid', '🌙'],
        ['Christmas', '🎄'], ['Pongal', '🍚'], ['Rakhi', '🧵']
      ]
    }
  },
  {
    id: 'c3ow4', n: 4, title: 'Getting to Know Plants', emoji: '🌱', topic: 'Parts of a plant',
    c1: '#16a34a', c2: '#0ea5e9',
    desc: 'Roots, stems, leaves, flowers — meet every plant part! A free Class 3 EVS lesson and matching game from NCERT Our Wondrous World chapter 4.',
    learn: {
      story: 'Chintu the seed wakes up underground! Roots dig down, stem climbs up, leaves wave hello. A plant is born! 🌱',
      intro: 'A plant has roots, stem, leaves, flowers and fruits. Each part has a job.',
      points: [
        'Roots hold the plant and drink water.',
        'The stem carries water up to leaves.',
        'Leaves cook food using sunlight.',
        'Flowers turn into fruits with seeds.'
      ],
      words: ['root', 'stem', 'leaf', 'flower', 'seed', 'plant']
    },
    game: {
      type: 'match', title: 'Plant Parts Matching!', instructions: 'Tap a plant-part word, then tap its picture.',
      pairs: [
        ['Root', '🥕'], ['Stem', '🎋'], ['Leaf', '🍃'],
        ['Flower', '🌸'], ['Seed', '🫘'], ['Tree', '🌳']
      ]
    }
  },
  {
    id: 'c3ow5', n: 5, title: 'Plants and Animals Live Together', emoji: '🦜', topic: 'How plants and animals help each other',
    c1: '#65a30d', c2: '#14b8a6',
    desc: 'Birds nest in trees, bees kiss flowers — nature’s teamwork! A free Class 3 EVS lesson and quiz game from NCERT Our Wondrous World chapter 5.',
    learn: {
      story: 'The mango tree hosts a parrot family, bees visit every flower, and the cow rests in its shade. Plants and animals are neighbours AND helpers! 🦜',
      intro: 'Plants give food, shade and homes. Animals spread seeds and help flowers.',
      points: [
        'Birds build nests on tree branches.',
        'Bees carry pollen from flower to flower.',
        'Cows eat grass; elephants eat leaves.',
        'Fallen seeds grow into new plants.'
      ],
      words: ['nest', 'pollen', 'shade', 'seed', 'together', 'help']
    },
    game: {
      type: 'quiz', title: 'Living Together Quiz', instructions: 'Spot nature’s teamwork and tap the answer.',
      questions: [
        { vis: '🐦🌳', q: 'Where do most birds build nests?', options: ['In water', 'On trees', 'Underground'], a: 1, hint: 'Branches hold safe nests!' },
        { vis: '🐝🌸', q: 'Bees visit flowers for…?', options: ['Nectar', 'Shade', 'Sleep'], a: 0, hint: 'Sweet nectar!' },
        { vis: '🐄🌾', q: 'What does a cow eat?', options: ['Grass', 'Stones', 'Fish'], a: 0, hint: 'Green grass!' },
        { vis: '🌳🐘', q: 'The elephant rests in the tree’s…?', options: ['Flowers', 'Shade', 'Roots'], a: 1, hint: 'Cool shade!' },
        { vis: '🌰🌱', q: 'A fallen seed can…?', options: ['Fly away', 'Grow a new plant', 'Melt'], a: 1, hint: 'New plant power!' },
        { vis: '🦜🥭', q: 'Parrots eat mangoes and drop…?', options: ['Seeds that grow', 'Stones', 'Nothing'], a: 0, hint: 'Dropped seeds sprout!' }
      ]
    }
  },
  {
    id: 'c3ow6', n: 6, title: 'Living in Harmony', emoji: '🕊️', topic: 'Caring for people, animals, nature',
    c1: '#0ea5e9', c2: '#84cc16',
    desc: 'Care for people, animals and trees — live in harmony! A free Class 3 EVS lesson and quiz game from NCERT Our Wondrous World chapter 6.',
    learn: {
      story: 'The class feeds birds, waters saplings and helps Grandma cross the road. When everyone cares, the whole world smiles! 🕊️',
      intro: 'Harmony means living kindly with people, animals and nature.',
      points: [
        'Feed birds and give animals water.',
        'Water plants and do not pluck flowers.',
        'Help elders, friends and neighbours.',
        'Keep voices soft near sleeping babies and animals.'
      ],
      words: ['harmony', 'care', 'kind', 'share', 'protect', 'soft']
    },
    game: {
      type: 'quiz', title: 'Harmony Quiz', instructions: 'Choose the kind, caring answer.',
      questions: [
        { vis: '🐦🍚', q: 'A thirsty sparrow visits. You…?', options: ['Chase it', 'Give water and grains', 'Ignore'], a: 1, hint: 'Care for birds!' },
        { vis: '🌷', q: 'In the park, pretty flowers. You…?', options: ['Pluck them all', 'Smell and leave them', 'Trample'], a: 1, hint: 'Leave flowers for all!' },
        { vis: '👵🛣️', q: 'Grandma wants to cross the road. You…?', options: ['Run ahead', 'Hold her hand', 'Shout'], a: 1, hint: 'Help elders!' },
        { vis: '🌱💧', q: 'The school sapling looks dry. You…?', options: ['Water it', 'Break it', 'Forget'], a: 0, hint: 'Water it!' },
        { vis: '🐶', q: 'A street puppy is hurt. You…?', options: ['Kick it', 'Tell an elder, get help', 'Laugh'], a: 1, hint: 'Get help fast!' },
        { vis: '🤫🐱', q: 'Near a sleeping cat, you…?', options: ['Shout loudly', 'Stay soft and quiet', 'Clap'], a: 1, hint: 'Soft and quiet!' }
      ]
    }
  },
  {
    id: 'c3ow7', n: 7, title: 'Water – A Precious Gift', emoji: '💧', topic: 'Saving every drop of water',
    c1: '#0284c7', c2: '#06b6d4',
    desc: 'Every drop counts! Where water comes from and how to save it. A free Class 3 EVS lesson and quiz game from NCERT Our Wondrous World chapter 7.',
    learn: {
      story: 'Drip… drip… the tap cries! Rains fill rivers, rivers fill our homes. Water is precious — waste not a drop! 💧',
      intro: 'We get water from rain, rivers, wells and taps. Saving water saves life.',
      points: [
        'Rain fills rivers, lakes and wells.',
        'Turn off taps while brushing.',
        'Use a bucket, not a pipe, to bathe.',
        'Fix leaking taps quickly.'
      ],
      words: ['water', 'rain', 'river', 'tap', 'save', 'drop']
    },
    game: {
      type: 'quiz', title: 'Save Water Quiz', instructions: 'Choose the water-saving answer.',
      questions: [
        { vis: '🌧️', q: 'Where does river water mainly come from?', options: ['Shops', 'Rain', 'Trucks'], a: 1, hint: 'Rain fills rivers!' },
        { vis: '🚰🪥', q: 'While brushing, the tap should be…?', options: ['Full on', 'Off', 'Leaking'], a: 1, hint: 'Off while brushing!' },
        { vis: '🪣🚿', q: 'Which bath saves water?', options: ['Long shower', 'Bucket bath', 'Pipe bath'], a: 1, hint: 'Bucket bath!' },
        { vis: '💧🔧', q: 'A tap keeps dripping. You…?', options: ['Ignore it', 'Tell an elder to fix it', 'Drink from it'], a: 1, hint: 'Fix leaks fast!' },
        { vis: '🌊', q: 'Most of Earth’s water is in…?', options: ['Seas and oceans', 'Glasses', 'Tanks'], a: 0, hint: 'Vast oceans!' },
        { vis: '🪴', q: 'Best time to water plants?', options: ['Hot noon', 'Morning or evening', 'Midnight storm'], a: 1, hint: 'Cool hours save water!' }
      ]
    }
  },
  {
    id: 'c3ow8', n: 8, title: 'Food We Eat', emoji: '🍛', topic: 'Foods and where they come from',
    c1: '#f97316', c2: '#eab308',
    desc: 'Roti from wheat, dal from farms — follow food to your plate! A free Class 3 EVS lesson and matching game from NCERT Our Wondrous World chapter 8.',
    learn: {
      story: 'Breakfast idli, lunch dal-roti, dinner khichdi! Every bite travelled from farm to market to kitchen. Yum — thank the farmer! 🍛',
      intro: 'We eat cereals, pulses, vegetables, fruits and milk. Farmers grow them.',
      points: [
        'Roti comes from wheat; rice from paddy.',
        'Dal gives us protein to grow strong.',
        'Vegetables and fruits give vitamins.',
        'Milk comes from cows and buffaloes.'
      ],
      words: ['food', 'wheat', 'rice', 'dal', 'milk', 'farmer']
    },
    game: {
      type: 'match', title: 'Food Matching!', instructions: 'Tap a food word, then tap its picture.',
      pairs: [
        ['Roti', '🫓'], ['Rice', '🍚'], ['Dal', '🍲'],
        ['Milk', '🥛'], ['Mango', '🥭'], ['Carrot', '🥕']
      ]
    }
  },
  {
    id: 'c3ow9', n: 9, title: 'Staying Healthy and Happy', emoji: '😄', topic: 'Healthy habits every day',
    c1: '#ef4444', c2: '#f59e0b',
    desc: 'Brush, bathe, play, sleep — happy habits for a healthy you! A free Class 3 EVS lesson and quiz game from NCERT Our Wondrous World chapter 9.',
    learn: {
      story: 'Sunny wakes at sunrise — brush, bath, breakfast, play! Healthy habits are superpowers you use every day. 💪',
      intro: 'Clean body, good food, play and sleep keep us healthy and happy.',
      points: [
        'Brush teeth twice and bathe daily.',
        'Eat fresh food; wash hands before eating.',
        'Play outside every day.',
        'Sleep early for 8–9 hours.'
      ],
      words: ['healthy', 'brush', 'bathe', 'play', 'sleep', 'habit']
    },
    game: {
      type: 'quiz', title: 'Healthy Habits Quiz', instructions: 'Pick the healthy habit.',
      questions: [
        { vis: '🪥', q: 'How often should we brush?', options: ['Once a week', 'Twice daily', 'Never'], a: 1, hint: 'Morning and night!' },
        { vis: '🧼🍛', q: 'Before eating, we must…?', options: ['Wash hands', 'Run fast', 'Watch TV'], a: 0, hint: 'Clean hands, safe tummy!' },
        { vis: '⚽', q: 'Best daily exercise?', options: ['Napping', 'Playing outside', 'Sitting long'], a: 1, hint: 'Play outside!' },
        { vis: '😴🌙', q: 'Children should sleep…?', options: ['Very late', 'Early, 8–9 hours', '2 hours'], a: 1, hint: 'Early and long!' },
        { vis: '🍬🍬🍬', q: 'Too many sweets cause…?', options: ['Strong teeth', 'Tooth decay', 'Tall height'], a: 1, hint: 'Cavities attack!' },
        { vis: '💧🏃', q: 'After playing in the sun, drink…?', options: ['Cola only', 'Clean water', 'Nothing'], a: 1, hint: 'Water first!' }
      ]
    }
  },
  {
    id: 'c3ow10', n: 10, title: 'This World of Things', emoji: '🏺', topic: 'What things are made of',
    c1: '#8b5cf6', c2: '#ec4899',
    desc: 'Clay pots, wooden chairs, steel glasses — what is everything made of? A free Class 3 EVS lesson and matching game from NCERT Our Wondrous World chapter 10.',
    learn: {
      story: 'Look around your room — pot, chair, book, spoon! Every single thing is made of SOME material. Let’s become material detectives! 🔍',
      intro: 'Things are made of materials: clay, wood, metal, glass, paper, cloth, plastic.',
      points: [
        'Pots are made of clay; chairs of wood.',
        'Glasses can be steel or glass.',
        'Books are paper; shirts are cloth.',
        'Same thing can use many materials.'
      ],
      words: ['clay', 'wood', 'metal', 'glass', 'paper', 'cloth']
    },
    game: {
      type: 'match', title: 'Material Matching!', instructions: 'Tap a material word, then tap a thing made of it.',
      pairs: [
        ['Clay', '🏺'], ['Wood', '🪑'], ['Metal', '🔑'],
        ['Glass', '🥛'], ['Paper', '📖'], ['Cloth', '👕']
      ]
    }
  },
  {
    id: 'c3ow11', n: 11, title: 'Making Things', emoji: '🏺', topic: 'How a potter makes a pot, in order',
    c1: '#b45309', c2: '#f59e0b',
    desc: 'Wet clay, spin, shape, bake — follow the potter’s steps! A free Class 3 EVS pot-making sequence game from NCERT Our Wondrous World chapter 11.',
    learn: {
      story: 'Mini watches Appooppan the potter — wet clay, pound, shape, dry, bake! A soft lump becomes a strong pot. Magic of hands! 🏺',
      intro: 'Potters shape clay into pots, diyas and kulhads. Each step comes in order.',
      points: [
        'Clay is mixed with water till soft.',
        'Pounding removes air bubbles.',
        'The wheel shapes the wet clay.',
        'Sun-dry, then bake to make it strong.'
      ],
      words: ['potter', 'clay', 'wheel', 'shape', 'dry', 'bake']
    },
    game: {
      type: 'sequence', title: 'Pot-Making in Order', instructions: 'Tap the potter’s steps in order.',
      leftTitle: 'Pot order', rightTitle: 'Tap the next step',
      steps: [
        { emoji: '🟤', text: 'Take clay and add water' },
        { emoji: '👊', text: 'Pound out air bubbles' },
        { emoji: '🌀', text: 'Shape clay on the wheel' },
        { emoji: '☀️', text: 'Dry the pot in the sun' },
        { emoji: '🔥', text: 'Bake it in the kiln' },
        { emoji: '🏺', text: 'Strong pot is ready!' }
      ]
    }
  },
  {
    id: 'c3ow12', n: 12, title: 'Taking Charge of Waste', emoji: '♻️', topic: 'Segregate waste in order',
    c1: '#16a34a', c2: '#65a30d',
    desc: 'Wet, dry, recycle — become a waste warrior! A free Class 3 EVS waste-segregation sequence game from NCERT Our Wondrous World chapter 12.',
    learn: {
      story: 'Peels here, paper there! Kabir sorts waste like a superhero — wet in green, dry in blue, and the park stays clean. ♻️🦸',
      intro: 'Waste must be separated: wet waste rots into compost; dry waste can be recycled.',
      points: [
        'Fruit peels go in the green wet bin.',
        'Paper and plastic go in the blue dry bin.',
        'Wet waste becomes compost for plants.',
        'Say no to littering — use dustbins!'
      ],
      words: ['waste', 'wet', 'dry', 'bin', 'compost', 'recycle']
    },
    game: {
      type: 'sequence', title: 'Sort Waste in Order', instructions: 'Tap the waste-warrior steps in order.',
      leftTitle: 'Warrior steps', rightTitle: 'Tap the next step',
      steps: [
        { emoji: '🧺', text: 'Collect waste in one basket' },
        { emoji: '🟢', text: 'Put peels in the green bin' },
        { emoji: '🔵', text: 'Put paper in the blue bin' },
        { emoji: '🌱', text: 'Make compost from wet waste' },
        { emoji: '♻️', text: 'Send dry waste to recycle' },
        { emoji: '🌳', text: 'Enjoy a clean green park' }
      ]
    }
  }
];
window.CHAPTERS = window.OW3_CHAPTERS;
window.CHAPTER_SUBJECT = 'Class 3 EVS';
