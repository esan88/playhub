/* PlayHub — Looking Around Class 3 EVS chapter content
   Source: NCERT Looking Around, Environmental Studies for Class 3 (rationalised), Chapters 1–24.
   Each chapter: story + learning card + one interactive game (quiz | match | sequence). */
window.LA3_CHAPTERS = [
  {
    id: 'c3la1', n: 1, title: 'Poonam’s Day Out', emoji: '🚌', topic: 'A fun day out with family',
    c1: '#f59e0b', c2: '#ef4444',
    desc: 'Pack your bag and join Poonam’s day out! A free Class 3 EVS lesson and quiz game from NCERT Looking Around chapter 1.',
    learn: {
      story: 'Sunday! Poonam packs biscuits, water and a cap — the family bus is leaving for a day out. What will she see first? 🚌',
      intro: 'A day out needs planning: where, with whom, what to carry, and how to stay safe.',
      points: [
        'Carry water, food, cap and a bag.',
        'Stay with elders in crowds.',
        'Watch plants, animals and people around.',
        'Share what you saw when you return.'
      ],
      words: ['outing', 'pack', 'bus', 'family', 'safe', 'watch']
    },
    game: {
      type: 'quiz', title: 'Day Out Quiz', instructions: 'Plan well and tap the answer.',
      questions: [
        { vis: '🎒💧🧢', q: 'What should Poonam pack?', options: ['Water, cap, food', 'Only toys', 'Nothing'], a: 0, hint: 'Water, cap and food!' },
        { vis: '👪🎪', q: 'In a crowd, children must…?', options: ['Run ahead', 'Stay with elders', 'Hide'], a: 1, hint: 'Stay close to elders!' },
        { vis: '🚌', q: 'The family travels by…?', options: ['Bus', 'Boat only', 'Rocket'], a: 0, hint: 'Bus day out!' },
        { vis: '👀🌳', q: 'On an outing we should…?', options: ['Sleep all day', 'Watch nature around', 'Litter'], a: 1, hint: 'Eyes open for nature!' },
        { vis: '🗑️', q: 'After snacks, wrappers go…?', options: ['On the ground', 'In a dustbin', 'In pockets forever'], a: 1, hint: 'Dustbin power!' },
        { vis: '🏠🌙', q: 'After the day out, Poonam…?', options: ['Shares stories at home', 'Forgets everything', 'Cries'], a: 0, hint: 'Stories for family!' }
      ]
    }
  },
  {
    id: 'c3la2', n: 2, title: 'The Plant Fairy', emoji: '🧚', topic: 'Magical world of plants',
    c1: '#16a34a', c2: '#84cc16',
    desc: 'Wave the plant fairy’s wand — seeds, flowers, fruits! A free Class 3 EVS lesson and matching game from NCERT Looking Around chapter 2.',
    learn: {
      story: 'Ting! The Plant Fairy touches a seed — sprout, leaves, buds, FLOWERS! Every plant is her magic spell. 🧚🌸',
      intro: 'Plants grow from seeds. They give flowers, fruits, shade and air.',
      points: [
        'Seeds sprout into baby plants.',
        'Flowers bloom, then fruits follow.',
        'Trees give shade and homes to birds.',
        'Water and sunlight help plants grow.'
      ],
      words: ['fairy', 'seed', 'sprout', 'bloom', 'shade', 'grow']
    },
    game: {
      type: 'match', title: 'Plant Magic Matching!', instructions: 'Tap a plant word, then tap its picture.',
      pairs: [
        ['Seed', '🌰'], ['Flower', '🌷'], ['Fruit', '🍑'],
        ['Leaf', '🌿'], ['Root', '🥔'], ['Bamboo', '🎍']
      ]
    }
  },
  {
    id: 'c3la3', n: 3, title: 'Water O’ Water!', emoji: '💦', topic: 'Uses and sources of water',
    c1: '#0284c7', c2: '#06b6d4',
    desc: 'Splash! Where water comes from and how we use it. A free Class 3 EVS lesson and quiz game from NCERT Looking Around chapter 3.',
    learn: {
      story: 'Splash goes the bucket! Water for drinking, bathing, cooking, plants — where does it all come from? Let’s follow the pipes! 💦',
      intro: 'Water comes from taps, wells, rivers and rain. We use it all day.',
      points: [
        'Drink clean water to stay healthy.',
        'Wells, rivers and taps give water.',
        'Plants and animals need water too.',
        'Never waste a single drop.'
      ],
      words: ['water', 'drink', 'well', 'river', 'tap', 'use']
    },
    game: {
      type: 'quiz', title: 'Water Quiz', instructions: 'Think splashy and tap the answer.',
      questions: [
        { vis: '🚰', q: 'Home water usually comes from a…?', options: ['Tap', 'Toy', 'Book'], a: 0, hint: 'Turn the tap!' },
        { vis: '🍚💧', q: 'Rice needs lots of ___ to cook.', options: ['Sand', 'Water', 'Oil only'], a: 1, hint: 'Water cooks rice!' },
        { vis: '🐘💧', q: 'Animals need water to…?', options: ['Fly', 'Live and drink', 'Sleep only'], a: 1, hint: 'All need a drink!' },
        { vis: '🌧️🪣', q: 'Catching rain in buckets is…?', options: ['Wasteful', 'Smart saving', 'Naughty'], a: 1, hint: 'Save rain!' },
        { vis: '🚿⏱️', q: 'A quick bath saves…?', options: ['Soap', 'Water', 'Time only'], a: 1, hint: 'Less water flows!' },
        { vis: '🌊🏞️', q: 'Which is a natural source?', options: ['Cooler', 'River', 'Bucket'], a: 1, hint: 'Flowing river!' }
      ]
    }
  },
  {
    id: 'c3la4', n: 4, title: 'Our First School', emoji: '🏫', topic: 'People and rooms in school',
    c1: '#8b5cf6', c2: '#0ea5e9',
    desc: 'Teachers, friends, library, playground — explore school! A free Class 3 EVS lesson and quiz game from NCERT Looking Around chapter 4.',
    learn: {
      story: 'Ding-dong! First day jitters melt away — the teacher smiles, friends wave, and the library smells of new books. School is fun! 🏫',
      intro: 'School has classrooms, teachers, helpers, a library and a playground.',
      points: [
        'The teacher teaches new things daily.',
        'The library lends storybooks.',
        'Friends play and learn together.',
        'Helpers keep school clean and safe.'
      ],
      words: ['school', 'teacher', 'classroom', 'library', 'friend', 'learn']
    },
    game: {
      type: 'quiz', title: 'My School Quiz', instructions: 'Look around school and tap the answer.',
      questions: [
        { vis: '📚', q: 'Who teaches in class?', options: ['Driver', 'Teacher', 'Cook'], a: 1, hint: 'Teacher teaches!' },
        { vis: '📚', q: 'Where do we borrow storybooks?', options: ['Canteen', 'Library', 'Playground'], a: 1, hint: 'Lovely library!' },
        { vis: '⚽🏃', q: 'Where do children play?', options: ['Roof edge', 'Playground', 'Well'], a: 1, hint: 'Playground fun!' },
        { vis: '🧹', q: 'Who keeps school clean?', options: ['Helpers', 'Nobody', 'Birds'], a: 0, hint: 'Thank the helpers!' },
        { vis: '🔔', q: 'The bell tells us…?', options: ['To sleep', 'Class time and breaks', 'To shout'], a: 1, hint: 'Time to move!' },
        { vis: '🎒', q: 'School bag should carry…?', options: ['Bricks', 'Books and tiffin', 'Water only'], a: 1, hint: 'Books and tiffin!' }
      ]
    }
  },
  {
    id: 'c3la5', n: 5, title: 'Chhotu’s House', emoji: '🏠', topic: 'Different houses people live in',
    c1: '#b45309', c2: '#f59e0b',
    desc: 'Huts, flats, bungalows — every house is a home! A free Class 3 EVS lesson and quiz game from NCERT Looking Around chapter 5.',
    learn: {
      story: 'Chhotu’s little house has one room, a courtyard and a laughing parrot. Big or small — home is where love lives! 🏠🦜',
      intro: 'Houses differ: huts, flats, bungalows. Every house has rooms for living, cooking, bathing.',
      points: [
        'A house protects us from sun and rain.',
        'Rooms: bedroom, kitchen, bathroom.',
        'Houses use brick, mud, wood or cement.',
        'Keep your home clean and airy.'
      ],
      words: ['house', 'home', 'room', 'kitchen', 'roof', 'door']
    },
    game: {
      type: 'quiz', title: 'Houses Quiz', instructions: 'Peek inside and tap the answer.',
      questions: [
        { vis: '🏠🌧️', q: 'A house protects us from…?', options: ['Sun and rain', 'Books', 'Sleep'], a: 0, hint: 'Shelter power!' },
        { vis: '🍳', q: 'Cooking happens in the…?', options: ['Bathroom', 'Kitchen', 'Balcony'], a: 1, hint: 'Kitchen cooking!' },
        { vis: '🛖🏢', q: 'A hut and a flat are…?', options: ['Same size', 'Different houses', 'Not houses'], a: 1, hint: 'Different but homes!' },
        { vis: '🧱', q: 'Strong houses use…?', options: ['Paper only', 'Brick and cement', 'Leaves only'], a: 1, hint: 'Brick strong!' },
        { vis: '🚪', q: 'We enter through the…?', options: ['Window', 'Door', 'Chimney'], a: 1, hint: 'Knock knock — door!' },
        { vis: '🧹🏠', q: 'A good home is…?', options: ['Dirty', 'Clean and airy', 'Dark'], a: 1, hint: 'Clean and airy!' }
      ]
    }
  },
  {
    id: 'c3la6', n: 6, title: 'Foods We Eat', emoji: '🥗', topic: 'Meals through the day',
    c1: '#f97316', c2: '#eab308',
    desc: 'Breakfast, lunch, dinner — yummy meals all day! A free Class 3 EVS lesson and matching game from NCERT Looking Around chapter 6.',
    learn: {
      story: 'Morning poha, noon dal-chawal, night roti-sabzi! Tummy rumbles on time — meals keep the engine running! 🍽️',
      intro: 'We eat three meals: breakfast, lunch and dinner, plus healthy snacks.',
      points: [
        'Breakfast starts the day’s energy.',
        'Lunch is the midday meal.',
        'Dinner should be light and early.',
        'Milk, fruits and veggies every day.'
      ],
      words: ['breakfast', 'lunch', 'dinner', 'meal', 'snack', 'tummy']
    },
    game: {
      type: 'match', title: 'Meal Matching!', instructions: 'Tap a food word, then tap its picture.',
      pairs: [
        ['Salad', '🥗'], ['Noodles', '🍜'], ['Curry', '🥘'],
        ['Cheese', '🧀'], ['Donut', '🍩'], ['Melon', '🍉']
      ]
    }
  },
  {
    id: 'c3la7', n: 7, title: 'Saying without Speaking', emoji: '🤟', topic: 'Talking with actions and signs',
    c1: '#ec4899', c2: '#8b5cf6',
    desc: 'Hands talk, faces smile — speak without a sound! A free Class 3 EVS lesson and quiz game from NCERT Looking Around chapter 7.',
    learn: {
      story: 'Meena can’t hear, but her hands dance with meaning! A wave says hello, a smile says happy. Words aren’t the only way! 🤟😊',
      intro: 'We speak with gestures, faces and signs. Everyone can communicate.',
      points: [
        'A wave means hello; a nod means yes.',
        'Smiles show happiness; frowns show worry.',
        'Hands make signs for those who can’t hear.',
        'Be patient and kind with everyone.'
      ],
      words: ['speak', 'sign', 'smile', 'nod', 'wave', 'kind']
    },
    game: {
      type: 'quiz', title: 'Signs Quiz', instructions: 'Read the silent message and tap.',
      questions: [
        { vis: '👋', q: 'A friendly wave means…?', options: ['Go away', 'Hello', 'Stop'], a: 1, hint: 'Hello wave!' },
        { vis: '😊', q: 'A big smile shows…?', options: ['Anger', 'Happiness', 'Fear'], a: 1, hint: 'Happy face!' },
        { vis: '👍', q: 'Thumbs up means…?', options: ['Bad', 'Good / yes', 'Sleep'], a: 1, hint: 'Good job!' },
        { vis: '🤟', q: 'Hand signs help people who…?', options: ['Can’t hear well', 'Can’t walk', 'Can’t see colours'], a: 0, hint: 'Hands that talk!' },
        { vis: '🚫', q: 'Shaking head side to side means…?', options: ['Yes', 'No', 'Maybe dance'], a: 1, hint: 'No-no!' },
        { vis: '🫶', q: 'With friends who speak differently, be…?', options: ['Rude', 'Patient and kind', 'Absent'], a: 1, hint: 'Kind always!' }
      ]
    }
  },
  {
    id: 'c3la8', n: 8, title: 'Flying High', emoji: '🦅', topic: 'Birds that fly high',
    c1: '#0ea5e9', c2: '#6366f1',
    desc: 'Eagles soar, penguins waddle — meet high flyers! A free Class 3 EVS lesson and matching game from NCERT Looking Around chapter 8.',
    learn: {
      story: 'Flap! The eagle climbs past clouds while the penguin waves from the ice. Wings, feathers, beaks — birds are built to fly! 🦅',
      intro: 'Birds have wings, feathers and beaks. Most fly; some swim or run.',
      points: [
        'Wings and light bones help birds fly.',
        'Beaks differ: parrots crack seeds, eagles tear.',
        'Penguins swim; ostriches run fast.',
        'Nests keep eggs and chicks safe.'
      ],
      words: ['fly', 'wings', 'feather', 'beak', 'nest', 'soar']
    },
    game: {
      type: 'match', title: 'Birds Matching!', instructions: 'Tap a bird word, then tap its picture.',
      pairs: [
        ['Eagle', '🦅'], ['Owl', '🦉'], ['Duck', '🦆'],
        ['Penguin', '🐧'], ['Hen', '🐔'], ['Dove', '🕊️']
      ]
    }
  },
  {
    id: 'c3la9', n: 9, title: 'It’s Raining', emoji: '🌧️', topic: 'Rain, clouds and rainbows',
    c1: '#0284c7', c2: '#7c3aed',
    desc: 'Pitter-patter! Clouds, raincoats and rainbows. A free Class 3 EVS lesson and quiz game from NCERT Looking Around chapter 9.',
    learn: {
      story: 'Dark clouds gather… pitter-patter SPLASH! Paper boats race, frogs sing, and a rainbow paints the sky! 🌈',
      intro: 'Rain comes from dark clouds. It fills rivers, helps farms, and ends with rainbows.',
      points: [
        'Dark clouds bring rain.',
        'Wear raincoats and carry umbrellas.',
        'Rain helps crops grow.',
        'Sun + rain together make a rainbow.'
      ],
      words: ['rain', 'cloud', 'umbrella', 'rainbow', 'puddle', 'monsoon']
    },
    game: {
      type: 'quiz', title: 'Rain Quiz', instructions: 'Dance in the rain and tap the answer.',
      questions: [
        { vis: '☁️⬛', q: 'Which clouds bring rain?', options: ['White fluffy', 'Dark heavy', 'No clouds'], a: 1, hint: 'Dark and heavy!' },
        { vis: '☔', q: 'In rain we carry an…?', options: ['Fan', 'Umbrella', 'Kite'], a: 1, hint: 'Stay dry!' },
        { vis: '🌾🌧️', q: 'Rain helps…?', options: ['Crops grow', 'Books dry', 'Fires burn'], a: 0, hint: 'Farms drink rain!' },
        { vis: '🌈', q: 'A rainbow needs…?', options: ['Night only', 'Sun and rain', 'Snow'], a: 1, hint: 'Sunshine + showers!' },
        { vis: '🐸', q: 'Who sings happiest in rain?', options: ['Frogs', 'Lions', 'Camels'], a: 0, hint: 'Croak croak!' },
        { vis: '⛵🌧️', q: 'Best rain game?', options: ['Paper boats', 'Video games', 'Hide and seek'], a: 0, hint: 'Sail boats!' }
      ]
    }
  },
  {
    id: 'c3la10', n: 10, title: 'What is Cooking', emoji: '🍳', topic: 'How food is cooked',
    c1: '#ef4444', c2: '#f59e0b',
    desc: 'Boil, fry, steam — what’s cooking in the kitchen? A free Class 3 EVS lesson and quiz game from NCERT Looking Around chapter 10.',
    learn: {
      story: 'Hiss goes the cooker, sizzle goes the pan! Cooked food tastes yummy and keeps germs away. But careful — kitchen is for elders! 🍳',
      intro: 'Cooking uses heat: boiling, frying, steaming, roasting. Utensils help cook.',
      points: [
        'Boiling cooks in hot water.',
        'Frying cooks in hot oil.',
        'Cooked food is safe to eat.',
        'Children must not touch fire or hot vessels.'
      ],
      words: ['cook', 'boil', 'fry', 'steam', 'heat', 'kitchen']
    },
    game: {
      type: 'quiz', title: 'Cooking Quiz', instructions: 'Smell the spices and tap the answer.',
      questions: [
        { vis: '♨️🍚', q: 'Rice is cooked by…?', options: ['Freezing', 'Boiling', 'Drying'], a: 1, hint: 'Bubbling boil!' },
        { vis: '🍳', q: 'Pakoras are made by…?', options: ['Frying in oil', 'Soaking in water', 'Baking in sun'], a: 0, hint: 'Sizzling oil!' },
        { vis: '♨️🥟', q: 'Mom makes soft idlis by…?', options: ['Steaming', 'Burning', 'Chilling'], a: 0, hint: 'Gentle steam!' },
        { vis: '🔥🚫🧒', q: 'Near fire, children must…?', options: ['Play close', 'Stay away, let elders cook', 'Touch vessels'], a: 1, hint: 'Safety first!' },
        { vis: '🍲', q: 'Cooked food is…?', options: ['Unsafe always', 'Safe and tasty', 'Bitter always'], a: 1, hint: 'Yummy and safe!' },
        { vis: '🥘', q: 'Dal simmers in a…?', options: ['Bucket', 'Pot', 'Glass'], a: 1, hint: 'Big pot!' }
      ]
    }
  },
  {
    id: 'c3la11', n: 11, title: 'From Here to There', emoji: '🚌', topic: 'Vehicles on land, water and air',
    c1: '#f97316', c2: '#0ea5e9',
    desc: 'Bus, boat or aeroplane — pick your ride! A free Class 3 EVS lesson and matching game from NCERT Looking Around chapter 11.',
    learn: {
      story: 'Toot-toot! The bus honks, the boat floats, the plane zooms past clouds. Land, water, sky — vehicles go everywhere! ✈️',
      intro: 'Vehicles move on land, water and air. Choose the right ride for the trip.',
      points: [
        'Buses, trains and cycles run on land.',
        'Boats and ships float on water.',
        'Aeroplanes fly in the sky.',
        'Bullock carts are slow village rides.'
      ],
      words: ['vehicle', 'land', 'water', 'air', 'travel', 'ride']
    },
    game: {
      type: 'match', title: 'Vehicles Matching!', instructions: 'Tap a vehicle word, then tap its picture.',
      pairs: [
        ['Bus', '🚌'], ['Train', '🚂'], ['Boat', '⛵'],
        ['Aeroplane', '✈️'], ['Bullock cart', '🐂'], ['Bicycle', '🚲']
      ]
    }
  },
  {
    id: 'c3la12', n: 12, title: 'Work We Do', emoji: '🩺', topic: 'People and their work',
    c1: '#8b5cf6', c2: '#ec4899',
    desc: 'Doctors heal, farmers grow, teachers teach! A free Class 3 EVS lesson and quiz game from NCERT Looking Around chapter 12.',
    learn: {
      story: 'Morning parade of workers — doctor with bag, farmer with plough, teacher with books. Every work helps everyone! 🩺🌾',
      intro: 'Every worker helps society. Respect all work equally.',
      points: [
        'Doctors treat the sick.',
        'Farmers grow our food.',
        'Teachers teach us new things.',
        'No work is big or small.'
      ],
      words: ['work', 'doctor', 'farmer', 'teacher', 'help', 'respect']
    },
    game: {
      type: 'quiz', title: 'Workers Quiz', instructions: 'Match work to worker and tap.',
      questions: [
        { vis: '🩺💊', q: 'Who treats sick people?', options: ['Doctor', 'Driver', 'Pilot'], a: 0, hint: 'Doctor heals!' },
        { vis: '🌾🚜', q: 'Who grows our food?', options: ['Singer', 'Farmer', 'Dancer'], a: 1, hint: 'Farmer feeds!' },
        { vis: '📚', q: 'Who teaches in school?', options: ['Cook', 'Teacher', 'Guard'], a: 1, hint: 'Teacher teaches!' },
        { vis: '✉️', q: 'Who brings our letters?', options: ['Postman', 'Pilot', 'Actor'], a: 0, hint: 'Postman posts!' },
        { vis: '🧹', q: 'Who sweeps the streets?', options: ['Sweeper', 'Singer', 'Player'], a: 0, hint: 'Sweeper sweeps!' },
        { vis: '🤝', q: 'All work is…?', options: ['Only some good', 'Equally worthy', 'Useless'], a: 1, hint: 'Respect all!' }
      ]
    }
  },
  {
    id: 'c3la13', n: 13, title: 'Sharing Our Feeling', emoji: '✋', topic: 'Five senses and touch',
    c1: '#ec4899', c2: '#f59e0b',
    desc: 'See, hear, smell, taste, touch — five sense superpowers! A free Class 3 EVS lesson and quiz game from NCERT Looking Around chapter 13.',
    learn: {
      story: 'Blindfold on! Is it rough or smooth, sweet or sour? Fingers, nose and tongue become detectives. Touch and tell! ✋',
      intro: 'Five senses: eyes see, ears hear, nose smells, tongue tastes, skin feels.',
      points: [
        'Eyes see colours and shapes.',
        'Ears hear loud and soft sounds.',
        'Nose smells sweet and stinky.',
        'Skin feels hot, cold, rough, smooth.'
      ],
      words: ['sense', 'see', 'hear', 'smell', 'taste', 'touch']
    },
    game: {
      type: 'quiz', title: 'Senses Quiz', instructions: 'Use your senses and tap the answer.',
      questions: [
        { vis: '👀🌈', q: 'We see colours with…?', options: ['Ears', 'Eyes', 'Nose'], a: 1, hint: 'Eyes see!' },
        { vis: '👂🔔', q: 'We hear the bell with…?', options: ['Ears', 'Hands', 'Tongue'], a: 0, hint: 'Ears hear!' },
        { vis: '👃🌸', q: 'Sweet flower smell sensed by…?', options: ['Eyes', 'Nose', 'Skin'], a: 1, hint: 'Nose knows!' },
        { vis: '👅🍋', q: 'Sour lemon tasted by…?', options: ['Tongue', 'Ears', 'Hair'], a: 0, hint: 'Tongue tastes!' },
        { vis: '✋🧊', q: 'Ice feels ___ to skin.', options: ['Hot', 'Cold', 'Nothing'], a: 1, hint: 'Brrr — cold!' },
        { vis: '5️⃣', q: 'How many senses do we have?', options: ['3', '5', '10'], a: 1, hint: 'Count: five!' }
      ]
    }
  },
  {
    id: 'c3la14', n: 14, title: 'The Story of Food', emoji: '🌾', topic: 'From farm to plate, in order',
    c1: '#65a30d', c2: '#eab308',
    desc: 'Plough, sow, harvest, cook — follow food’s long journey! A free Class 3 EVS food-journey sequence game from NCERT Looking Around chapter 14.',
    learn: {
      story: 'A grain’s adventure: sown in mud, kissed by rain, cut golden, ground to flour, baked to roti — onto YOUR plate! 🌾🍽️',
      intro: 'Food travels: farm → market → kitchen → plate. Thank everyone in the chain.',
      points: [
        'Farmers plough and sow seeds.',
        'Crops grow, ripen and get harvested.',
        'Grains go to markets in trucks.',
        'Cooking turns grain into meals.'
      ],
      words: ['farm', 'sow', 'harvest', 'market', 'grain', 'plate']
    },
    game: {
      type: 'sequence', title: 'Food’s Journey in Order', instructions: 'Tap food’s trip from farm to plate.',
      leftTitle: 'Food order', rightTitle: 'Tap the next step',
      steps: [
        { emoji: '🚜', text: 'Farmer ploughs the field' },
        { emoji: '🌱', text: 'Seeds are sown in soil' },
        { emoji: '🌾', text: 'Crop ripens and is harvested' },
        { emoji: '🚚', text: 'Grains travel to market' },
        { emoji: '🍳', text: 'Cooking at home' },
        { emoji: '🍽️', text: 'Eat together happily' }
      ]
    }
  },
  {
    id: 'c3la15', n: 15, title: 'Making Pots', emoji: '🏺', topic: 'Clay pots and the potter',
    c1: '#b45309', c2: '#ef4444',
    desc: 'Spin the wheel — diyas, kulhads and matkas! A free Class 3 EVS lesson and quiz game from NCERT Looking Around chapter 15.',
    learn: {
      story: 'Round and round spins the potter’s wheel — a lump of clay rises into a shining matka! Clap for the potter! 🏺',
      intro: 'Potters make pots, diyas and toys from clay. Clay comes from the earth.',
      points: [
        'Clay is soft earth mixed with water.',
        'The wheel shapes pots evenly.',
        'Diyas light up Diwali nights.',
        'Baked clay becomes hard and strong.'
      ],
      words: ['potter', 'clay', 'wheel', 'diya', 'matka', 'bake']
    },
    game: {
      type: 'quiz', title: 'Pots Quiz', instructions: 'Shape answers and tap.',
      questions: [
        { vis: '🟤💧', q: 'Pots are made from…?', options: ['Clay', 'Cotton', 'Glass'], a: 0, hint: 'Earthy clay!' },
        { vis: '🌀', q: 'What shapes the pot evenly?', options: ['Hammer', 'Potter’s wheel', 'Spoon'], a: 1, hint: 'Spinning wheel!' },
        { vis: '🪔', q: 'Small clay lamps are…?', options: ['Diyas', 'Bulbs', 'Torches'], a: 0, hint: 'Diwali diyas!' },
        { vis: '🏺💧', q: 'A matka keeps water…?', options: ['Hot', 'Cool', 'Dirty'], a: 1, hint: 'Cool and sweet!' },
        { vis: '🔥🏺', q: 'Baking makes clay…?', options: ['Soft', 'Hard and strong', 'Wet'], a: 1, hint: 'Fire hardens!' },
        { vis: '🐘🏺', q: 'Elephants store water in…?', options: ['Ponds and pots', 'Glasses only', 'Bottles only'], a: 0, hint: 'Ponds work!' }
      ]
    }
  },
  {
    id: 'c3la16', n: 16, title: 'Games We Play', emoji: '🏏', topic: 'Indoor and outdoor games',
    c1: '#f97316', c2: '#84cc16',
    desc: 'Cricket, kho-kho, chess, kites — play them all! A free Class 3 EVS lesson and matching game from NCERT Looking Around chapter 16.',
    learn: {
      story: 'Evening bell! Bats swing, kites soar, chess brains battle. Outdoor games make bodies strong, indoor games make minds sharp! 🏏',
      intro: 'Outdoor games need open space; indoor games need a room and focus.',
      points: [
        'Cricket and football are outdoor team games.',
        'Chess and carrom are indoor games.',
        'Kho-kho and kabaddi need speed.',
        'Play safe and include everyone.'
      ],
      words: ['game', 'outdoor', 'indoor', 'team', 'play', 'safe']
    },
    game: {
      type: 'match', title: 'Games Matching!', instructions: 'Tap a game word, then tap its picture.',
      pairs: [
        ['Cricket', '🏏'], ['Football', '⚽'], ['Hopscotch', '🤸'],
        ['Chess', '♟️'], ['Kite', '🪁'], ['Marbles', '🔮']
      ]
    }
  },
  {
    id: 'c3la17', n: 17, title: 'Here comes a Letter', emoji: '✉️', topic: 'A letter’s journey, in order',
    c1: '#0ea5e9', c2: '#8b5cf6',
    desc: 'Stamp, postbox, train, postman — a letter travels far! A free Class 3 EVS letter-journey sequence game from NCERT Looking Around chapter 17.',
    learn: {
      story: 'A letter to Grandma begins its adventure! Envelope, stamp, red postbox, rumbling train — ring the bell, postman’s here! ✉️🚂',
      intro: 'Letters carry news across miles. Stamps pay for the journey.',
      points: [
        'Write neatly with full address.',
        'Seal it in an envelope.',
        'Stick a stamp for postage.',
        'Postmen deliver on foot or cycle.'
      ],
      words: ['letter', 'envelope', 'stamp', 'postbox', 'postman', 'address']
    },
    game: {
      type: 'sequence', title: 'Letter’s Trip in Order', instructions: 'Tap the letter’s journey in order.',
      leftTitle: 'Letter order', rightTitle: 'Tap the next step',
      steps: [
        { emoji: '✍️', text: 'Write letter with address' },
        { emoji: '✉️', text: 'Seal it in an envelope' },
        { emoji: '🎟️', text: 'Stick a postage stamp' },
        { emoji: '📮', text: 'Drop it in the red postbox' },
        { emoji: '🚂', text: 'Mail train carries it far' },
        { emoji: '🚴', text: 'Postman cycles to the door' }
      ]
    }
  },
  {
    id: 'c3la18', n: 18, title: 'A House Like This', emoji: '⛺', topic: 'Houses in different places',
    c1: '#14b8a6', c2: '#0ea5e9',
    desc: 'Houseboats float, tents pop, igloos shine! A free Class 3 EVS lesson and quiz game from NCERT Looking Around chapter 18.',
    learn: {
      story: 'Srinagar’s houseboat bobs, desert tents flap, snowy igloos glow! People build homes that suit their weather. ⛺🛶',
      intro: 'Houses match climate and place: stilt houses in floods, tents for travel.',
      points: [
        'Houseboats float on Kashmir lakes.',
        'Tents are homes that travel.',
        'Igloos are built from ice blocks.',
        'Stilt houses stand above flood water.'
      ],
      words: ['houseboat', 'tent', 'igloo', 'stilt', 'climate', 'home']
    },
    game: {
      type: 'quiz', title: 'Houses Quiz', instructions: 'Match home to place and tap.',
      questions: [
        { vis: '🛶🏠', q: 'Floating homes on lakes are…?', options: ['Igloos', 'Houseboats', 'Flats'], a: 1, hint: 'Bobbing houseboats!' },
        { vis: '⛺', q: 'Travellers sleep in…?', options: ['Tents', 'Palaces', 'Caves only'], a: 0, hint: 'Pop-up tents!' },
        { vis: '🧊🏠', q: 'Homes of ice blocks are…?', options: ['Huts', 'Igloos', 'Flats'], a: 1, hint: 'Icy igloos!' },
        { vis: '🌊🏠', q: 'In flood areas, houses stand on…?', options: ['Wheels', 'Stilts', 'Sand'], a: 1, hint: 'Tall stilts!' },
        { vis: '🏜️⛺', q: 'Desert travellers use…?', options: ['Houseboats', 'Tents', 'Igloos'], a: 1, hint: 'Desert tents!' },
        { vis: '🏠❤️', q: 'Every house, big or small, is a…?', options: ['Shop', 'Home', 'School'], a: 1, hint: 'Sweet home!' }
      ]
    }
  },
  {
    id: 'c3la19', n: 19, title: 'Our Friends-Animals', emoji: '🐄', topic: 'Animals that help us',
    c1: '#65a30d', c2: '#16a34a',
    desc: 'Cows give milk, dogs guard, horses run! A free Class 3 EVS lesson and matching game from NCERT Looking Around chapter 19.',
    learn: {
      story: 'Moo says the cow, bow-wow says the pup! Animals give milk, guard homes and carry loads. They are our oldest friends! 🐄🐕',
      intro: 'Domestic animals live with us and help us. Wild animals live in forests.',
      points: [
        'Cows and buffaloes give milk.',
        'Dogs guard our homes.',
        'Horses and bullocks pull carts.',
        'Feed pets and keep them clean.'
      ],
      words: ['animal', 'cow', 'dog', 'horse', 'milk', 'friend']
    },
    game: {
      type: 'match', title: 'Animal Friends Matching!', instructions: 'Tap an animal word, then tap its picture.',
      pairs: [
        ['Dog', '🐕'], ['Cat', '🐈'], ['Cow', '🐄'],
        ['Horse', '🐎'], ['Elephant', '🐘'], ['Monkey', '🐒']
      ]
    }
  },
  {
    id: 'c3la20', n: 20, title: 'Drop by Drop', emoji: '🌧️', topic: 'The water cycle journey, in order',
    c1: '#0284c7', c2: '#14b8a6',
    desc: 'Evaporate, cloud, rain, river — ride the water cycle! A free Class 3 EVS water-cycle sequence game from NCERT Looking Around chapter 20.',
    learn: {
      story: 'Dewdrop evaporates UP, becomes a cloud, rains DOWN, joins the river, and reaches the sea — round and round forever! 💧🔄',
      intro: 'Water cycles: sun lifts it up, clouds carry it, rain brings it down.',
      points: [
        'Sun heats sea water into vapour.',
        'Vapour cools into clouds.',
        'Clouds shower rain on land.',
        'Rivers carry water back to sea.'
      ],
      words: ['cycle', 'evaporate', 'cloud', 'rain', 'river', 'sea']
    },
    game: {
      type: 'sequence', title: 'Water Cycle in Order', instructions: 'Tap the water’s journey in order.',
      leftTitle: 'Cycle order', rightTitle: 'Tap the next step',
      steps: [
        { emoji: '☀️', text: 'Sun heats the sea' },
        { emoji: '♨️', text: 'Water rises as vapour' },
        { emoji: '☁️', text: 'Vapour becomes clouds' },
        { emoji: '🌧️', text: 'Clouds rain on land' },
        { emoji: '🏞️', text: 'Rivers flow to the sea' },
        { emoji: '🌊', text: 'Sea fills again — repeat!' }
      ]
    }
  },
  {
    id: 'c3la21', n: 21, title: 'Families can be Different', emoji: '👪', topic: 'Big, small and different families',
    c1: '#ec4899', c2: '#a855f7',
    desc: 'Joint or nuclear, near or far — every family is lovely! A free Class 3 EVS lesson and quiz game from NCERT Looking Around chapter 21.',
    learn: {
      story: 'Ravi lives with ten people, Sara with three, and Uncle’s family video-calls from far away. Different sizes, same love! 👪',
      intro: 'Families differ in size and shape. Small, big, joint — all are families.',
      points: [
        'Small family: parents + children.',
        'Joint family: grandparents, uncles, cousins too.',
        'Family members care for each other.',
        'Single parents make strong families too.'
      ],
      words: ['family', 'small', 'joint', 'cousin', 'uncle', 'love']
    },
    game: {
      type: 'quiz', title: 'Families Quiz', instructions: 'Celebrate every family and tap.',
      questions: [
        { vis: '👪', q: 'Parents + children = ?', options: ['Joint family', 'Small family', 'No family'], a: 1, hint: 'Small and sweet!' },
        { vis: '👵👴👨👩👧👦', q: 'Grandparents + uncles + cousins = ?', options: ['Small family', 'Joint family', 'School'], a: 1, hint: 'Big joint!' },
        { vis: '👧👦', q: 'Your aunt’s children are your…?', options: ['Cousins', 'Teachers', 'Neighbours'], a: 0, hint: 'Cousin crew!' },
        { vis: '📱👵', q: 'Far-away family stays close by…?', options: ['Letters only', 'Calls and video', 'Never talking'], a: 1, hint: 'Video hugs!' },
        { vis: '❤️🏠', q: 'What matters most in a family?', options: ['Big house', 'Love and care', 'Many cars'], a: 1, hint: 'Love wins!' },
        { vis: '👪', q: 'A mother raising kids alone makes a…?', options: ['Broken home', 'Strong family', 'Not family'], a: 1, hint: 'Strong and loving!' }
      ]
    }
  },
  {
    id: 'c3la22', n: 22, title: 'Left-Right', emoji: '🧭', topic: 'Directions: left, right, front, back',
    c1: '#f59e0b', c2: '#0ea5e9',
    desc: 'Left hand up! Maps, turns and treasure hunts. A free Class 3 EVS lesson and quiz game from NCERT Looking Around chapter 22.',
    learn: {
      story: 'Treasure map says: two steps left, turn right, dig! Left and right are secret codes for finding your way. 🗺️',
      intro: 'Left and right depend on which way you face. Maps show directions.',
      points: [
        'Raise your writing hand — often the right.',
        'Left is the other side.',
        'Turn around: left and right swap!',
        'Follow map arrows step by step.'
      ],
      words: ['left', 'right', 'turn', 'map', 'direction', 'face']
    },
    game: {
      type: 'quiz', title: 'Left-Right Quiz', instructions: 'Face the right way and tap.',
      questions: [
        { vis: '✋', q: 'Most children write with the ___ hand.', options: ['Right', 'Left always', 'Both always'], a: 0, hint: 'Usually right!' },
        { vis: '↩️', q: 'This arrow points…?', options: ['Right', 'Left', 'Up'], a: 1, hint: 'Curving left!' },
        { vis: '↪️', q: 'This arrow points…?', options: ['Left', 'Right', 'Down'], a: 1, hint: 'Curving right!' },
        { vis: '🔄', q: 'After a full U-turn, your left becomes…?', options: ['Still left side of road', 'Your right side', 'Up'], a: 1, hint: 'Sides swap!' },
        { vis: '🗺️⬆️', q: 'On most maps, up means…?', options: ['South', 'North', 'West'], a: 1, hint: 'North is up!' },
        { vis: '🏫➡️🏞️', q: 'School is to the RIGHT of the park. Park is to the ___ of school.', options: ['Right', 'Left', 'Top'], a: 1, hint: 'Opposite sides!' }
      ]
    }
  },
  {
    id: 'c3la23', n: 23, title: 'A Beautiful Cloth', emoji: '👗', topic: 'From cotton to colourful cloth',
    c1: '#a855f7', c2: '#ec4899',
    desc: 'Cotton balls to rainbow sarees — weave the story! A free Class 3 EVS lesson and quiz game from NCERT Looking Around chapter 23.',
    learn: {
      story: 'Fluffy cotton, spinning wheel, clacking loom — threads dance into cloth, dyed pink, yellow, blue! Wear the rainbow! 🧵🌈',
      intro: 'Cloth comes from cotton, silk or wool. Spinning makes yarn; looms weave cloth.',
      points: [
        'Cotton grows as white fluff on plants.',
        'Spinning twists fluff into yarn.',
        'Looms weave yarn into cloth.',
        'Tailors stitch cloth into dresses.'
      ],
      words: ['cloth', 'cotton', 'yarn', 'loom', 'weave', 'stitch']
    },
    game: {
      type: 'quiz', title: 'Cloth Quiz', instructions: 'Thread the answers and tap.',
      questions: [
        { vis: '🌿☁️', q: 'Cotton grows as…?', options: ['White fluff', 'Red balls', 'Blue stones'], a: 0, hint: 'Soft white fluff!' },
        { vis: '🧶', q: 'Spun cotton thread is called…?', options: ['Rope only', 'Yarn', 'Wire'], a: 1, hint: 'Yarn!' },
        { vis: '🏭🧵', q: 'Cloth is woven on a…?', options: ['Loom', 'Pan', 'Bucket'], a: 0, hint: 'Clacking loom!' },
        { vis: '👗✂️', q: 'Who stitches dresses?', options: ['Potter', 'Tailor', 'Driver'], a: 1, hint: 'Tailor snips!' },
        { vis: '🐑🧶', q: 'Woollen sweaters come from…?', options: ['Cotton', 'Sheep wool', 'Plastic'], a: 1, hint: 'Baa baa wool!' },
        { vis: '🌈👕', q: 'Cloth gets colours from…?', options: ['Mud only', 'Dyes', 'Water only'], a: 1, hint: 'Dip in dye!' }
      ]
    }
  },
  {
    id: 'c3la24', n: 24, title: 'Web of Life', emoji: '🕸️', topic: 'How living things depend on each other',
    c1: '#16a34a', c2: '#0ea5e9',
    desc: 'Plants feed goats, goats feed us — one big life web! A free Class 3 EVS lesson and quiz game from NCERT Looking Around chapter 24.',
    learn: {
      story: 'Pull one thread — the whole web trembles! Grass feeds the goat, the goat gives milk, leftovers feed the soil. All connected! 🕸️',
      intro: 'Living things depend on each other for food and shelter. This is the web of life.',
      points: [
        'Plants make food from sun and soil.',
        'Plant-eaters eat plants; flesh-eaters eat animals.',
        'Fallen leaves feed the soil.',
        'Breaking one link shakes the web.'
      ],
      words: ['web', 'depend', 'food', 'soil', 'link', 'life']
    },
    game: {
      type: 'quiz', title: 'Web of Life Quiz', instructions: 'Trace the threads and tap.',
      questions: [
        { vis: '🌱🐐', q: 'The goat eats…?', options: ['Plants', 'Stones', 'Fish'], a: 0, hint: 'Green plants!' },
        { vis: '🌞🌱', q: 'Plants cook food using…?', options: ['Moonlight', 'Sunlight', 'Torch'], a: 1, hint: 'Sun power!' },
        { vis: '🦁🦌', q: 'The lion eats…?', options: ['Grass only', 'Other animals', 'Fruits only'], a: 1, hint: 'Hunter lion!' },
        { vis: '🍂🌱', q: 'Fallen dry leaves…?', options: ['Feed the soil', 'Harm plants', 'Do nothing'], a: 0, hint: 'Soil food!' },
        { vis: '🕸️✂️', q: 'If all plants vanish, animals will…?', options: ['Celebrate', 'Go hungry', 'Fly'], a: 1, hint: 'No food!' },
        { vis: '🐝🌸🍎', q: 'Bees help flowers, flowers give fruits. This shows…?', options: ['A fight', 'Living together', 'Magic'], a: 1, hint: 'Together web!' }
      ]
    }
  }
];
window.CHAPTERS = window.LA3_CHAPTERS;
window.CHAPTER_SUBJECT = 'Class 3 EVS';
