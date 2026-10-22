/* PlayHub — Science Olympiad (Grade 1) content
   Chapters follow the SOF / NSO Class-1 syllabus:
   Living & Non-living Things · Plants · Animals · Human Beings & Their Needs ·
   Good Habits & Safety Rules · Air and Water · Weather and The Sky (+ reasoning)
   Fields (pipe-separated, no pipes inside text):
     cards : 'Keyword|Explanation'
     quiz  : 'Question|opt1|opt2|opt3|opt4|correctIndex|why'
     tf    : 'Statement|T or F|why'
     pairs : 'Left|Right'
     odd   : 'A|B|C|D|oddIndex|why'                                              */
window.SCIENCE = {
  subject: 'Science',
  grade: 'Grade 1',
  book: 'SOF NSO syllabus',
  chapters: [
    { id: 'living', n: 'Living and Non-Living Things', e: '🌱', c1: '#10b981', c2: '#6ee7b7',
      cards: [
        'Living thing|Something that is born, grows, eats and breathes',
        'Non-living thing|Something that is not alive. It never grows or breathes',
        'Needs|Living things need air, water, food and shelter',
        'Grow|All living things get bigger as they grow',
        'Plants|Living things that stay in one place and make food from sunlight',
        'Breathe|Animals and people take in air to stay alive'
      ],
      quiz: [
        'Which of these is a living thing?|Stone|Spoon|Ant|Table|2|An ant moves and eats food, so it is alive.',
        'Which of these is NOT a living thing?|Fish|Frog|Chair|Bird|2|A chair is made of wood or metal and never lives.',
        'What do all living things need?|Air, water and food|Toys and games|Paint and paper|Sand only|0|Living things need air, water and food to live.',
        'Plants are living things because they|grow and need water|are very hard|are always green|make a loud sound|0|Plants grow and need water, air and sunlight.',
        'Which one grows by itself?|A stone|A teddy bear|A seedling|A plastic cup|2|A seedling is a young plant. It grows every day.',
        'A car is a|living thing|non-living thing|plant|animal|1|A car does not breathe, eat or grow.',
        'Which of these can move on its own?|Table|Ball|Fish|Mug|2|A fish swims by itself in water.',
        'A rock does not|eat food|breathe air|drink water|do any of these|3|A rock is non-living, so it does none of these.'
      ],
      tf: [
        'A dog is a living thing.|T|Dogs breathe, eat and grow.',
        'A stone needs food to stay alive.|F|A stone is non-living and needs nothing.',
        'Plants need air and water to live.|T|Just like animals, plants need air and water.',
        'A toy car is a living thing.|F|A toy car is made of plastic and never lives.',
        'A fish can move from place to place.|T|Fish swim to find food.',
        'A table can grow like a plant.|F|Tables are non-living and never grow.'
      ],
      pairs: [
        'Rose|Plant',
        'Tiger|Animal',
        'Chair|Non-living thing',
        'Air and water|Needs of living things',
        'Sunlight|Plants make food with it',
        'Grow|All living things do this'
      ],
      odd: [
        'Dog|Cat|Cow|Table|3|A table is non-living. The others are animals.',
        'Rose|Mango plant|Grass|Chair|3|A chair is not a plant.',
        'Stone|Iron|Wood|Fish|3|A fish is alive. The others are non-living.',
        'Fish|Bird|Snake|Ball|3|A ball does not live. The others are animals.',
        'Chair|Table|Book|Frog|3|A frog is a living thing. The rest are non-living.'
      ]
    },

    { id: 'plants', n: 'Plants Around Us', e: '🌿', c1: '#22c55e', c2: '#a3e635',
      cards: [
        'Root|The part that drinks water from the soil',
        'Stem|Holds the plant up and carries water to the leaves',
        'Leaf|Makes food for the plant using sunlight',
        'Flower|The colourful part that can turn into a fruit',
        'Fruit|Protects the seeds inside it',
        'Plant needs|Sunlight, water, air and soil'
      ],
      quiz: [
        'Which part drinks water from the soil?|Roots|Leaves|Flowers|Fruits|0|Roots hold the plant and suck up water.',
        'What colour are most leaves?|Green|Black|White|Blue|0|Green leaves make food for the plant.',
        'Which part holds the plant straight up?|Stem|Root|Flower|Seed|0|The stem works like the backbone of a plant.',
        'Plants make their food using|sunlight|moonlight|lamplight|starlight|0|Sunlight helps leaves make food.',
        'Which of these do plants NOT need?|Water|Sunlight|Milk|Air|2|Milk is a drink for animals, not plants.',
        'A flower can turn into a|fruit|stone|chair|cloud|0|After pollination, flowers grow into fruits.',
        'Seeds are found inside|fruits|soil|rocks|clouds|0|Apple seeds hide inside the apple.',
        'The part of a plant hidden under the soil is the|root|flower|fruit|bud|0|Roots grow underground to drink water.'
      ],
      tf: [
        'Plants need sunlight to grow.|T|Sunlight helps plants make their food.',
        'Plants can drink milk.|F|Plants drink water through their roots.',
        'Roots hold the plant in the soil.|T|Roots grip the soil tightly.',
        'Flowers can become fruits.|T|Many flowers grow into fruits with seeds.',
        'A plant can grow without air and water.|F|Every plant needs air and water.',
        'Leaves are usually green.|T|Green leaves contain chlorophyll.'
      ],
      pairs: [
        'Root|Drinks water from soil',
        'Stem|Carries water up the plant',
        'Leaf|Makes food with sunlight',
        'Flower|Becomes a fruit',
        'Fruit|Holds the seeds',
        'Soil|Holds the roots'
      ],
      odd: [
        'Root|Stem|Leaf|Goat|3|A goat is an animal, not a part of a plant.',
        'Rose|Lotus|Sunflower|Carrot|3|A carrot is a root vegetable. The others are flowers.',
        'Mango|Apple|Banana|Potato|3|A potato grows under the ground. The others are fruits.',
        'Water|Sunlight|Air|Milk|3|Milk is not a need of plants.',
        'Seed|Flower|Fruit|Table|3|A table is not part of a plant.'
      ]
    },

    { id: 'seeds', n: 'Seeds and How Plants Grow', e: '🌱', c1: '#84cc16', c2: '#facc15',
      cards: [
        'Seed|A tiny baby plant waiting to grow',
        'Germinate|When a seed starts to sprout',
        'Sprout|The first baby shoot that comes out of a seed',
        'Seedling|A very young plant with a few leaves',
        'Soil|The earth where roots live and drink water',
        'Seed needs|Water, air, warmth and soil to sprout'
      ],
      quiz: [
        'What does a seed need to sprout?|Water and warmth|Ice and darkness|Soap and oil|Sand only|0|Seeds need water, air and warmth to wake up.',
        'Where do roots grow?|Down into the soil|Up into the sky|On the clouds|Inside the fridge|0|Roots grow downwards to find water.',
        'A baby plant that just sprouted is a|seedling|stone|cloud|egg|0|A seedling is a young plant.',
        'Which is the first part to come out of a seed?|The root|The flower|The fruit|The thorn|0|The root comes out first to drink water.',
        'To grow well, plants need|sunlight, water and air|chocolate and chips|milk and curd|juice only|0|Plants need sunlight, water, air and soil.',
        'Sunflowers turn their faces towards the|sun|moon|TV|wall|0|Sunflowers follow the sun during the day.',
        'We plant seeds in|soil|soap|plastic bags|pillows|0|Soil gives seeds a home to grow.',
        'Seeds can travel by|wind and water|sound only|colour only|shadows|0|Light seeds fly in the wind and some float on water.'
      ],
      tf: [
        'A seed needs water to sprout.|T|Water wakes the sleeping seed up.',
        'Seeds can grow in a closed steel box without air.|F|Seeds need air to sprout.',
        'Roots grow downwards into the soil.|T|Roots always dive down.',
        'Plants need only candy to grow.|F|Plants need soil, water and sunlight.',
        'Sunlight helps plants make food.|T|Leaves use sunlight to cook food.',
        'A seedling is a very young plant.|T|Seedlings grow into big plants.'
      ],
      pairs: [
        'Seed|Baby plant',
        'Root|Grows downwards',
        'Sprout|First shoot of a plant',
        'Water|Seeds need this to sprout',
        'Soil|Home of the roots',
        'Wind|Carries light seeds away'
      ],
      odd: [
        'Seed|Sprout|Seedling|Bread|3|Bread is food. The others are stages of a growing plant.',
        'Root|Stem|Leaf|Pot|3|A pot holds a plant but is not part of it.',
        'Water|Sunlight|Air|Candy|3|Candy is not a need of plants.',
        'Mango seed|Bean seed|Pea seed|Stone|3|A stone is not a seed.',
        'Down|Into the soil|Towards water|Into the sky|3|Roots grow down, never up.'
      ]
    },

    { id: 'food', n: 'Food From Plants', e: '🍎', c1: '#f59e0b', c2: '#f97316',
      cards: [
        'Fruits we eat|Apples, mangoes, bananas and oranges come from plants',
        'Vegetables|Potatoes, carrots and spinach are parts of plants we eat',
        'Grains|Wheat and rice grow in fields and feed the world',
        'Spices|Chillies, turmeric and cumin come from plants',
        'Herbs|Soft green plants like mint used for flavour',
        'Parts we eat|Roots, stems, leaves, flowers, fruits and seeds are all eaten'
      ],
      quiz: [
        'Which of these is used to make bread?|Wheat|Plastic|Iron|Sand|0|Wheat is ground into flour for bread.',
        'A potato grows|under the ground|on a tree|in the sea|in the sky|0|Potatoes grow on roots under the soil.',
        'Which part of the plant do we eat in a carrot?|Root|Flower|Fruit|Seed|0|The carrot is a root that stores food.',
        'Which of these is a fruit?|Spinach|Tomato|Potato|Onion|1|Tomatoes grow from flowers and hold seeds.',
        'Rice and wheat are|grains|metals|stones|plastics|0|Grains give us energy to play.',
        'Which plant gives us sugar?|Sugarcane|Cactus|Fern|Grass|0|Juice from sugarcane is boiled to make sugar.',
        'Bananas grow on a|banana plant|rose bush|cactus|pine cone|0|The banana plant is a big soft plant.',
        'Which of these grows high on a tree?|Coconut|Potato|Carrot|Onion|0|Coconuts grow on tall coconut palms.'
      ],
      tf: [
        'We eat parts of many different plants.|T|Grains, fruits and vegetables all come from plants.',
        'Rice and wheat are grains.|T|Grains grow in big farm fields.',
        'Carrots grow under the ground.|T|The edible part is a root.',
        'Chillies come from metal plants.|F|Chillies are fruits of a plant.',
        'Fruits protect the seeds inside.|T|Seeds hide safely in fruits.',
        'We should eat fruits and vegetables every day.|T|They keep us strong and healthy.'
      ],
      pairs: [
        'Wheat|Makes flour for bread',
        'Sugarcane|Used to make sugar',
        'Carrot|A root we eat',
        'Tomato|A fruit we eat',
        'Mint|A herb used for flavour',
        'Rice|A grain from fields'
      ],
      odd: [
        'Apple|Mango|Banana|Brick|3|A brick is not food from a plant.',
        'Potato|Carrot|Beetroot|Table|3|A table is not a vegetable.',
        'Wheat|Rice|Maize|Plastic|3|Plastic is not a grain.',
        'Leaf we eat|Stem we eat|Root we eat|Stone|3|A stone cannot be eaten.',
        'Mint|Coriander|Turmeric|Iron|3|Iron is a metal, not a plant.'
      ]
    },

    { id: 'animals', n: 'Animals Around Us', e: '🐾', c1: '#f97316', c2: '#fbbf24',
      cards: [
        'Pet animals|Animals that live with us at home like dogs and cats',
        'Farm animals|Animals kept by farmers like cows, hens and goats',
        'Wild animals|Animals that live in forests like lions and tigers',
        'Water animals|Animals that live in water like fish and frogs',
        'Herbivore|An animal that eats only plants, like a cow',
        'Carnivore|An animal that eats other animals, like a lion'
      ],
      quiz: [
        'Which animal is kept as a pet at home?|Dog|Lion|Tiger|Elephant|0|Dogs are friendly pets that guard our homes.',
        'Where do lions live?|In the forest|In our house|In the kitchen|In the bathtub|0|Lions are wild animals of the forest.',
        'Which animal gives us milk?|Cow|Parrot|Crocodile|Snake|0|Cow milk is rich and healthy.',
        'A cow mostly eats|grass|meat|stones|plastic|0|Cows are herbivores.',
        'Which of these lives in water?|Fish|Goat|Hen|Cow|0|Fish live and breathe in water.',
        'Which bird is famous for copying words?|Parrot|Eagle|Pigeon|Owl|0|Parrots copy the words they hear.',
        'Horses are kept on|farms|underwater|inside TVs|in cupboards|0|Farmers keep horses on farms.',
        'Which animal is called the best friend of people?|Dog|Crocodile|Shark|Lion|0|Dogs are loyal and love people.'
      ],
      tf: [
        'Cats are pet animals.|T|Many families keep cats at home.',
        'Lions live in the kitchen.|F|Lions live in forests.',
        'Fish live in water.|T|Fish breathe through gills in water.',
        'A cow gives us milk.|T|Cows give fresh milk every day.',
        'Snakes have wings and fly like birds.|F|Snakes crawl on the ground.',
        'Farm animals live on farms.|T|Cows, hens and goats live on farms.'
      ],
      pairs: [
        'Dog|Pet animal',
        'Cow|Farm animal',
        'Lion|Wild animal',
        'Fish|Water animal',
        'Rabbit|Eats grass',
        'Hen|Gives eggs'
      ],
      odd: [
        'Lion|Tiger|Elephant|Chair|3|A chair is not an animal.',
        'Dog|Cat|Rabbit|Rose|3|A rose is a plant, not an animal.',
        'Fish|Frog|Crocodile|Eagle|3|An eagle flies in the sky. The others live in water.',
        'Cow|Goat|Sheep|Lion|3|A lion hunts animals. The others are farm animals.',
        'Hen|Eagle|Parrot|Goat|3|A goat cannot fly. The others are birds.'
      ]
    },

    { id: 'ahomes', n: 'Animal Homes and Food', e: '🏠', c1: '#14b8a6', c2: '#67e8f9',
      cards: [
        'Habitat|The natural home of an animal',
        'Nest|A home that birds build from twigs and straw',
        'Den|The home of lions, foxes and bears',
        'Burrow|A hole dug in the ground by rabbits and rats',
        'Herbivore|An animal that eats only plants',
        'Hive|The wax home where bees live and make honey'
      ],
      quiz: [
        'Where do birds build their homes?|Nest|Den|Burrow|Shell|0|Birds weave twigs into a cosy nest.',
        'A rabbit lives in a|burrow|tree|pond|nest|0|Rabbits dig safe holes in the ground.',
        'Which animal eats only plants?|Cow|Lion|Tiger|Eagle|0|Cows are herbivores.',
        'A lion lives in a|den|nest|hive|shell|0|A den is a safe shelter for lions.',
        'Where do fish live?|In water|In a nest|In a burrow|On a roof|0|Fish live in ponds, lakes and seas.',
        'Bees live in a|hive|den|burrow|cave|0|Bees build wax hives and make honey.',
        'A frog eats|insects|stones|wood|sand|0|Frogs catch flies with their long tongues.',
        'Which animal makes honey?|Honeybee|Cow|Dog|Parrot|0|Honeybees collect nectar to make honey.'
      ],
      tf: [
        'Birds build nests to lay their eggs.|T|Eggs stay safe inside the nest.',
        'A fish lives in a tree.|F|Fish live in water.',
        'Lions eat grass like cows.|F|Lions are carnivores.',
        'Bees live in a hive.|T|A hive is a busy bee home.',
        'A rabbit digs a burrow.|T|Burrows keep rabbits safe.',
        'Snakes live in water only.|F|Snakes live on land and in water.'
      ],
      pairs: [
        'Bird|Nest',
        'Lion|Den',
        'Rabbit|Burrow',
        'Bee|Hive',
        'Cow|Eats grass',
        'Tiger|Eats meat'
      ],
      odd: [
        'Nest|Den|Burrow|Banana|3|A banana is food, not a home.',
        'Cow|Goat|Rabbit|Lion|3|A lion eats meat. The others eat plants.',
        'Hive|Nest|Den|Spoon|3|A spoon is not an animal home.',
        'Grass|Leaves|Fruit|Stone|3|A stone is not food for animals.',
        'Herbivore|Carnivore|Omnivore|Table|3|A table is not an animal.'
      ]
    },

    { id: 'babies', n: 'Animal Babies', e: '🐣', c1: '#ec4899', c2: '#f9a8d4',
      cards: [
        'Chick|A baby hen or chicken',
        'Calf|A baby cow',
        'Puppy|A baby dog',
        'Kitten|A baby cat',
        'Tadpole|A baby frog that lives in water',
        'Caterpillar|The baby of a butterfly that eats leaves'
      ],
      quiz: [
        'What is a baby cow called?|Calf|Puppy|Chick|Kitten|0|A baby cow is a calf.',
        'A baby dog is a|puppy|kitten|calf|chick|0|Puppies love to play.',
        'What does a hen sit on?|Eggs|Milk|Grass|Stones|0|Baby chicks come out of eggs.',
        'A baby frog starts life as a|tadpole|puppy|calf|chick|0|Tadpoles live in water and grow legs later.',
        'Which animal grows from a caterpillar?|Butterfly|Cow|Dog|Fish|0|A caterpillar wraps up and becomes a butterfly.',
        'A baby cat is called a|kitten|puppy|calf|foal|0|Kittens grow into cats.',
        'Which baby animal lives in water at first?|Frog|Dog|Cow|Hen|0|Frog babies hatch in ponds.',
        'A baby horse is a|foal|calf|puppy|chick|0|A foal can stand up soon after birth.'
      ],
      tf: [
        'A baby dog is called a puppy.|T|Puppies grow into dogs.',
        'A baby cow is called a kitten.|F|A baby cow is a calf.',
        'Baby chicks hatch from eggs.|T|Chicks peck out of their shells.',
        'A tadpole is a baby frog.|T|Tadpoles grow into frogs.',
        'Kittens grow into cows.|F|Kittens grow into cats.',
        'Many baby animals look like small copies of their parents.|T|A calf looks like a small cow.'
      ],
      pairs: [
        'Cow|Calf',
        'Hen|Chick',
        'Dog|Puppy',
        'Cat|Kitten',
        'Horse|Foal',
        'Frog|Tadpole'
      ],
      odd: [
        'Puppy|Kitten|Calf|Table|3|A table is not a baby animal.',
        'Chick|Duckling|Calf|Seed|3|A seed is a baby plant.',
        'Tadpole|Caterpillar|Puppy|Stone|3|A stone is not alive.',
        'Foal|Fawn|Kitten|Nest|3|A nest is a home, not a baby.',
        'Baby cat|Baby dog|Baby cow|Baby car|3|Cars are not animals.'
      ]
    },

    { id: 'body', n: 'My Body', e: '🧍', c1: '#6366f1', c2: '#a5b4fc',
      cards: [
        'Skeleton|All the bones inside your body that give it shape',
        'Muscles|Bodies use muscles to bend, lift and run',
        'Heart|Pumps blood around your body all day and night',
        'Lungs|Help you breathe air in and out',
        'Brain|The boss of your body. It helps you think and learn',
        'Senses|Sight, hearing, smell, taste and touch'
      ],
      quiz: [
        'How many senses do we have?|5|3|7|10|0|We see, hear, smell, taste and touch.',
        'Which organ pumps blood?|Heart|Brain|Lungs|Stomach|0|The heart works like a strong pump.',
        'We breathe with our|lungs|knees|toes|hair|0|Lungs take in oxygen from the air.',
        'What is the boss of our body?|Brain|Heart|Hand|Foot|0|The brain controls everything we do.',
        'Which sense helps you smell a flower?|Smell|Sight|Taste|Touch|0|Your nose helps you smell.',
        'We see with our|eyes|ears|nose|tongue|0|Eyes detect light and help us see.',
        'Babies have more bones than|grown-ups|trees|robots|nobody|0|Babies have about 300 bones. Grown-ups have 206.',
        'Food is chewed with our|teeth|fingers|ears|eyes|0|Teeth cut and grind our food.'
      ],
      tf: [
        'The heart pumps blood in our body.|T|The heart never stops pumping.',
        'We hear with our eyes.|F|We hear with our ears.',
        'The brain helps us think.|T|The brain is the boss of the body.',
        'Lungs help us breathe.|T|We breathe in and out all day.',
        'Bones give shape to our body.|T|Bones work like the frame of a house.',
        'The tongue helps us see colours.|F|The tongue helps us taste food.'
      ],
      pairs: [
        'Eyes|See',
        'Ears|Hear',
        'Nose|Smell',
        'Tongue|Taste',
        'Skin|Touch',
        'Heart|Pumps blood'
      ],
      odd: [
        'Eyes|Ears|Nose|Knee|3|A knee is not a sense organ.',
        'Heart|Lungs|Brain|Apple|3|An apple is food, not part of our body.',
        'See|Hear|Smell|Run|3|Running is an action, not a sense.',
        'Bone|Muscle|Blood|Stone|3|A stone is not part of our body.',
        'Head|Arms|Legs|Banana|3|A banana is not a body part.'
      ]
    },

    { id: 'clean', n: 'Keeping Clean and Healthy', e: '🧼', c1: '#06b6d4', c2: '#67e8f9',
      cards: [
        'Bathing|Cleans your body and washes germs away',
        'Brushing|Twice a day keeps teeth strong and clean',
        'Germs|Tiny things that can make you sick',
        'Balanced food|A meal with grains, vegetables, fruits and milk',
        'Exercise|Playing and stretching keeps your body strong',
        'Nails|Trim them so dirt cannot hide underneath'
      ],
      quiz: [
        'How many times should we brush our teeth?|Twice a day|Once a year|Never|Only when it hurts|0|Morning and night brushing keeps teeth healthy.',
        'Which of these keeps us clean?|Bathing|Sleeping late|Watching TV|Eating chips|0|A daily bath removes sweat and germs.',
        'Germs can make us|sick|taller|faster|bluer|0|Germs spread illness, so we wash our hands.',
        'Before eating, we should|wash our hands|play in mud|lick our fingers|share towels|0|Clean hands keep food safe.',
        'Which food helps make strong bones?|Milk|Cold drinks|Chips|Candy|0|Milk has calcium for strong bones.',
        'Daily exercise makes our body|strong and fit|weak|sleepy all day|dirty|0|Playing games is great exercise.',
        'We should cut our|nails|toys|televisions|shoes|0|Long nails hide dirt and germs.',
        'Which is a healthy habit?|Sleeping early|Skipping baths|Eating only candy|Biting nails|0|A good night of sleep keeps you fresh.'
      ],
      tf: [
        'We should bathe every day.|T|A daily bath keeps us fresh.',
        'Germs can make us fall sick.|T|Washing hands removes germs.',
        'Eating only chips makes us healthy.|F|We need fruits, vegetables and grains too.',
        'We should wash hands before eating.|T|Clean hands keep food safe.',
        'Brushing teeth twice a day is good.|T|It stops toothaches.',
        'Using other people towels can spread germs.|T|Everyone should use their own towel.'
      ],
      pairs: [
        'Brushing teeth|Keeps teeth clean',
        'Bathing|Keeps the body fresh',
        'Cutting nails|Stops dirt hiding',
        'Washing hands|Removes germs before meals',
        'Milk|Builds strong bones',
        'Playing outside|Keeps us fit'
      ],
      odd: [
        'Bathing|Brushing|Washing hands|Watching TV|3|Watching TV is not a cleaning habit.',
        'Fruits|Vegetables|Milk|Candy|3|Too much candy is not healthy food.',
        'Germs|Dirt|Dust|Soap|3|Soap cleans us. The others make us dirty or sick.',
        'Sleep|Exercise|Playing|Biting nails|3|Biting nails is a bad habit.',
        'Milk|Eggs|Fruits|Plastic|3|Plastic is not food.'
      ]
    },

    { id: 'safety', n: 'Good Habits and Safety Rules', e: '🛡️', c1: '#ef4444', c2: '#fca5a5',
      cards: [
        'Traffic lights|Red means stop, amber means wait, green means go',
        'Zebra crossing|White stripes on the road where people should cross',
        'Helmet|Protects your head when you ride a bike',
        'Emergency numbers|100 police, 101 fire, 102 ambulance',
        'Stranger safety|Never go anywhere with someone you do not know',
        'Good habits|Saying please and thank you, sharing and being kind'
      ],
      quiz: [
        'What does a red traffic light mean?|Stop|Go fast|Dance|Sleep|0|Red means stop and wait.',
        'Where should we cross the road?|At a zebra crossing|Anywhere|With eyes closed|Behind a wall|0|Zebra crossings keep walkers safe.',
        'Which number do we dial for fire?|101|100|102|108|0|Dial 101 when there is a fire.',
        'The ambulance number is|102|100|101|199|0|Ambulances take sick people to hospital.',
        'We wear a helmet to protect our|head|stomach|elbow|ankle|0|Helmets protect your head if you fall.',
        'At a green light you should|look both ways, then cross|close your eyes|run blindly|sit down|0|Green means go, but always look first.',
        'A stranger offers you candy. You should|say no and tell an adult|go with them|keep it secret|follow them|0|Never go with strangers. Tell a grown-up.',
        'Which of these is a good habit?|Saying thank you|Throwing trash|Pushing in line|Shouting always|0|Good manners make people happy.'
      ],
      tf: [
        'Red traffic light means stop.|T|Stop and wait for green.',
        'We should cross a busy road with our eyes closed.|F|We look both ways before crossing.',
        'Helmets protect our head.|T|Always wear a helmet on a bike.',
        'We should go anywhere with a stranger.|F|Never go with strangers.',
        'Green light means we can go.|T|Go only after checking the road.',
        'We should say please and thank you.|T|Good habits make us kind.'
      ],
      pairs: [
        'Red light|Stop',
        'Green light|Go',
        'Zebra crossing|Safe place to cross',
        'Helmet|Protects your head',
        'Fire|Dial 101',
        'Ambulance|Dial 102'
      ],
      odd: [
        'Stop|Wait|Look carefully|Run into traffic|3|Running into traffic is dangerous.',
        'Police number|Fire number|Ambulance number|Lucky number|3|A lucky number is not an emergency number.',
        'Helmet|Seat belt|Safety shoes|Birthday cap|3|A birthday cap does not protect you.',
        'Please|Thank you|Sorry|Shout at others|3|Shouting at others is a bad habit.',
        'Hold hands while crossing|Look both ways|Cross at the zebra crossing|Play on the road|3|Playing on the road is unsafe.'
      ]
    },

    { id: 'air', n: 'Air', e: '💨', c1: '#0ea5e9', c2: '#bae6fd',
      cards: [
        'Air|A gas all around us that we cannot see',
        'Wind|Air moving from one place to another',
        'Oxygen|The gas we breathe in to stay alive',
        'Breathing|Taking air in and out of your lungs',
        'Kite|A toy that flies because of the wind',
        'Air takes up space|An inflated balloon is full of air'
      ],
      quiz: [
        'What do we breathe in to stay alive?|Air|Water|Milk|Juice|0|Air has the oxygen our body needs.',
        'Which of these flies because of air?|Kite|Car|Boat|Table|0|Wind pushes kites up into the sky.',
        'We cannot see|air|water|a book|a chair|0|Air is a gas that is invisible.',
        'Air is moved by|wind|glue|stone|paint|0|Wind is air that moves.',
        'Which gas do we breathe OUT?|Carbon dioxide|Helium|Neon|Ozone|0|Our body uses oxygen and gives out carbon dioxide.',
        'An inflated balloon is full of|air|water|juice|stones|0|Air fills the balloon and takes up space.',
        'Which of these needs air to burn?|A candle|A rock|A spoon|A shoe|0|Fire needs air to keep burning.',
        'Smoke from burning trash makes the air|unclean|tastier|better to drink|greener|0|Smoke pollutes the air, so we should not burn trash.'
      ],
      tf: [
        'Air is everywhere around us.|T|We live in a sea of air.',
        'We can see air easily like a ball.|F|Air is invisible.',
        'Wind is air that moves.|T|Moving air is called wind.',
        'Plants and people both need air.|T|Every living thing needs air.',
        'Burning trash in the open makes the air dirty.|T|Smoke is bad for our lungs.',
        'A balloon without air becomes flat.|T|Air puffs it up, so without air it sags.'
      ],
      pairs: [
        'Wind|Moving air',
        'Oxygen|Gas we breathe in',
        'Carbon dioxide|Gas we breathe out',
        'Balloon|Filled with air',
        'Kite|Flies in the wind',
        'Lungs|Breathe air'
      ],
      odd: [
        'Oxygen|Carbon dioxide|Nitrogen|Water|3|Water is a liquid. The others are gases in the air.',
        'Wind|Breeze|Air|Rock|3|A rock is solid, not air.',
        'Kite|Balloon|Pinwheel|Chair|3|A chair does not fly in the wind.',
        'Breathe in|Breathe out|Respire|Drink water|3|Drinking is not breathing.',
        'Invisible|No colour|No smell|Heavy like iron|3|Air is very light, not heavy like iron.'
      ]
    },

    { id: 'water', n: 'Water', e: '💧', c1: '#3b82f6', c2: '#93c5fd',
      cards: [
        'Water cycle|Water travels from the ground to the sky and back',
        'Evaporation|Heat turns water into vapour that rises up',
        'Rain|Water falling from clouds',
        'Condensation|Vapour cools and turns into tiny water drops',
        'Safe drinking water|Water that is clean and free of germs',
        'Save water|Turn off the tap and fix leaking taps'
      ],
      quiz: [
        'Water changes into vapour when it gets|hot|cold|frozen|dark|0|Heat makes water evaporate.',
        'Where does rain come from?|Clouds|Buckets|Pipes|Ponds|0|Tiny drops join in clouds and fall as rain.',
        'Which of these is safe to drink?|Clean boiled water|Pond water|Drain water|Sea water|0|Clean boiled water has no germs.',
        'The sun heats sea water and it rises as|water vapour|ice|sand|milk|0|This is called evaporation.',
        'Water freezes at|0 degrees Celsius|100 degrees|50 degrees|10 degrees|0|At 0 degrees water turns into ice.',
        'Which of these is a source of water?|River|Road|Wall|Roof|0|Rivers, lakes and wells give us water.',
        'To save water we should|turn off the tap|leave taps running|play with the hose|waste it|0|Every drop counts.',
        'Clouds are made of tiny|water drops|sand grains|sugar crystals|salt|0|Tiny water drops float high in the sky.'
      ],
      tf: [
        'Water becomes vapour when it heats up.|T|This is evaporation.',
        'We should drink dirty drain water.|F|Dirty water has germs that make us sick.',
        'Ice is frozen water.|T|Water turns to ice when it freezes.',
        'Rain comes from clouds.|T|Clouds drop water as rain.',
        'Wasting water is a good habit.|F|We should save water.',
        'The water cycle moves water around the Earth.|T|Water goes up and comes down again.'
      ],
      pairs: [
        'Evaporation|Water turns into vapour',
        'Rain|Water falls from clouds',
        'Ice|Frozen water',
        'Boiling|Kills germs in water',
        'Tap|Turn it off to save water',
        'Well|A source of water'
      ],
      odd: [
        'River|Pond|Lake|Wall|3|A wall is not a source of water.',
        'Ice|Snow|Vapour|Milk|3|Milk is not water.',
        'Drink clean water|Boil water|Save water|Wash with muddy water|3|Muddy water has germs.',
        'Sun|Cloud|Rain|Table|3|A table is not part of the water cycle.',
        'Water vapour|Cloud|Rain|Stone|3|A stone is not made of water.'
      ]
    },

    { id: 'weather', n: 'Weather and Seasons', e: '🌦️', c1: '#8b5cf6', c2: '#d8b4fe',
      cards: [
        'Seasons|Summer, monsoon, winter and spring come every year',
        'Monsoon|The rainy season that fills our fields and wells',
        'Thermometer|A tool that measures how hot or cold it is',
        'Raincoat|Keeps you dry when it rains',
        'Weather forecast|A report that tells what the weather will be like',
        'Cloudy|When clouds cover the sky'
      ],
      quiz: [
        'Which instrument measures temperature?|Thermometer|Telescope|Microscope|Compass|0|A thermometer shows how hot or cold it is.',
        'What do we wear when it rains?|Raincoat|Wool cap|Sun hat|Gloves|0|A raincoat keeps water off you.',
        'Which season brings lots of rain?|Monsoon|Winter|Summer|Spring|0|The monsoon is the rainy season.',
        'Snow falls in|winter|summer|monsoon|spring|0|Winter can be cold enough for snow.',
        'What comes out on a sunny day?|The sun|A comet|A meteor|Saturn|0|Sunny days are bright with sunshine.',
        'A weather forecast tells us about|the weather tomorrow|a story|a song|a game|0|Forecasts help us plan our day.',
        'When it is very hot, we should drink|water|sand|soap|oil|0|Water keeps us cool and hydrated.',
        'We use a thermometer to see how|hot or cold it is|sweet it is|loud it is|bright a colour is|0|Thermometers read the temperature.'
      ],
      tf: [
        'A thermometer tells us the temperature.|T|It measures hot and cold.',
        'We wear woolen clothes in summer.|F|We wear woolens in winter.',
        'The monsoon is the rainy season.|T|Rain fills rivers and fields.',
        'Weather forecast predicts the weather.|T|It tells what tomorrow will be like.',
        'Snow falls in winter.|T|Winter is the coldest season.',
        'A sun hat is best in heavy rain.|F|A raincoat is better when it rains.'
      ],
      pairs: [
        'Summer|Hot weather',
        'Winter|Cold weather',
        'Monsoon|Rainy season',
        'Thermometer|Measures temperature',
        'Raincoat|Worn when it rains',
        'Woolen clothes|Worn in winter'
      ],
      odd: [
        'Hot|Cold|Warm|Rainy|3|Rainy describes wetness. The others describe temperature.',
        'Summer|Winter|Monsoon|Monday|3|Monday is a day, not a season.',
        'Thermometer|Raincoat|Umbrella|Scissors|3|Scissors are not used for weather.',
        'Winter|Rainy|Summer|Night|3|Night is a time of day, not a season.',
        'Cloudy|Sunny|Snowy|Salty|3|Salty describes taste, not weather.'
      ]
    },

    { id: 'sky', n: 'Sun, Moon and Stars', e: '🌙', c1: '#7c3aed', c2: '#c4b5fd',
      cards: [
        'The Sun|A star that gives us light and heat',
        'The Moon|Reflects sunlight and changes shape each month',
        'Moon phases|New moon, crescent, half moon and full moon',
        'Stars|Burning balls of gas far, far away',
        'Day and night|The Earth spins around, giving us day and night',
        'Planets|Worlds that travel around the Sun. Earth is one'
      ],
      quiz: [
        'What gives us light during the day?|The Sun|The Moon|A cloud|A rainbow|0|The Sun is our daytime star.',
        'The Moon shines with|reflected sunlight|its own fire|electricity|candles|0|The Moon bounces sunlight towards us.',
        'How long does the Moon take to circle Earth?|About 28 days|About 3 days|About 100 days|About a year|0|A month is about one moon cycle.',
        'What makes day and night?|The Earth spinning|Clouds moving|The Sun sleeping|Wind blowing|0|Earth turns once in about 24 hours.',
        'Which planet do we live on?|Earth|Mars|Jupiter|Venus|0|Earth is our home in space.',
        'Stars look small because they are|very far away|very tiny|made of paper|sleeping|0|Stars are huge but super far away.',
        'On full moon night the Moon looks like|a bright circle|a black square|a blue line|a rainbow|0|The whole face of the Moon is lit.',
        'The Sun is a|star|planet|moon|comet|0|The Sun is the closest star to Earth.'
      ],
      tf: [
        'The Sun is a star.|T|It is the closest star to us.',
        'The Moon makes its own light.|F|It reflects the light of the Sun.',
        'The Earth spins to give us day and night.|T|One spin makes one day.',
        'Stars are tiny like grains of sand.|F|Stars are giant balls of burning gas.',
        'We live on a planet called Earth.|T|Earth is the third planet from the Sun.',
        'The Sun rises in the east.|T|It sets in the west.'
      ],
      pairs: [
        'Sun|Gives light and heat',
        'Moon|Reflects sunlight',
        'Earth|Our planet',
        'Stars|Far away burning balls',
        'Day|Our side faces the Sun',
        'Night|Our side turns away from the Sun'
      ],
      odd: [
        'Mercury|Venus|Mars|Moon|3|The Moon circles Earth. The others are planets.',
        'Morning|Evening|Night|Blue|3|Blue is a colour, not a time of day.',
        'The Sun|A star|The Moon|A television|3|A television is not a light in the sky.',
        'East|West|North|Banana|3|A banana is not a direction.',
        'Planet|Star|Moon|Cloud|3|A cloud is a weather thing, not a space object.'
      ]
    },

    { id: 'reason', n: 'Reasoning Challenge', e: '🧩', c1: '#f43f5e', c2: '#fda4af',
      cards: [
        'Odd one out|Find the thing that does not belong with the others',
        'Pattern|Shapes or colours that repeat in the same order',
        'Analogy|Finding pairs that go together, like hand and glove',
        'Ranking test|Putting things in order from first to last',
        'Grouping|Putting similar things together in one box',
        'Look carefully|Good reasoners observe first and answer second'
      ],
      quiz: [
        'In the pattern red, blue, red, blue... what comes next?|Red|Green|Yellow|Black|0|The pattern repeats red and blue.',
        'Which word does not belong?|Apple|Mango|Banana|Chair|3|Chair is not a fruit.',
        'If cat is to kitten, then cow is to...|Calf|Puppy|Chick|Foal|0|Baby cows are called calves.',
        'Which shape has three sides?|Triangle|Circle|Square|Oval|0|A triangle has 3 sides and 3 corners.',
        'Tom is taller than Ron. Who is shorter?|Ron|Tom|Both|Nobody|0|If Tom is taller, Ron must be shorter.',
        'The child who finishes a race first is the|winner|helper|viewer|sitter|0|First place belongs to the winner.',
        'Find the odd one: rose, lotus, sunflower, mango.|Mango|Rose|Lotus|Sunflower|0|Mango is a fruit. The others are flowers.',
        'Pattern: circle, square, circle, square... next is|Circle|Triangle|Star|Heart|0|The shapes take turns.'
      ],
      tf: [
        'In the group dog, cat, cow, table, the odd one is table.|T|A table is not an animal.',
        'A pattern repeats in the same order.|T|That is what makes a pattern.',
        'Rose, lotus and mango are all flowers.|F|Mango is a fruit.',
        'Analogy means comparing two pairs of things.|T|Like hand is to glove, foot is to sock.',
        'Lined up from shortest to tallest, the shortest child is first.|T|Shortest first, tallest last.',
        'Odd one out means pick the one that matches.|F|It means pick the one that does NOT match.'
      ],
      pairs: [
        'Odd one out|The one that does not belong',
        'Pattern|Something that repeats',
        'Analogy|Two pairs that go together',
        'Ranking|Putting things in order',
        'Grouping|Putting similar things together',
        'Winner|The one who finishes first'
      ],
      odd: [
        'Dog|Cat|Cow|Table|3|Table is not an animal.',
        'Rose|Lotus|Sunflower|Mango|3|Mango is a fruit, not a flower.',
        'Circle|Square|Triangle|Apple|3|Apple is not a shape.',
        'Red|Blue|Green|Dog|3|Dog is not a colour.',
        'Cow|One|Two|Three|0|Cow is not a number.'
      ]
    }
  ],

  /* classification data for the Sort It game: 'BinA,BinB|Item:binIdx|...' */
  sorts: {
    living: 'Living,Non-living|Dog:0|Ant:0|Rose:0|Stone:1|Chair:1|Clock:1',
    plants: 'Part of a plant,Not a part|Stem:0|Leaf:0|Root:0|Spoon:1|Ring:1|Shoe:1',
    seeds: 'Seed,Not a seed|Bean:0|Pea:0|Wheat grain:0|Rock:1|Marble:1|Button:1',
    food: 'Fruit,Vegetable|Mango:0|Apple:0|Banana:0|Potato:1|Carrot:1|Onion:1',
    animals: 'Farm animal,Wild animal|Cow:0|Hen:0|Goat:0|Lion:1|Tiger:1|Elephant:1',
    ahomes: 'Eats plants,Eats meat|Cow:0|Rabbit:0|Goat:0|Lion:1|Tiger:1|Eagle:1',
    babies: 'Baby animal,Grown-up animal|Calf:0|Puppy:0|Chick:0|Cow:1|Dog:1|Hen:1',
    body: 'Inside my body,Outside my body|Heart:0|Lungs:0|Brain:0|Hand:1|Leg:1|Foot:1',
    clean: 'Healthy habit,Bad habit|Bathing:0|Brushing:0|Washing hands:0|Biting nails:1|Skipping baths:1|Eating only chips:1',
    safety: 'Safe thing,Dangerous thing|Hold hands to cross:0|Wear a helmet:0|Wait for green light:0|Run on the road:1|Play with fire:1|Talk to strangers:1',
    air: 'Gas,Liquid or solid|Air:0|Oxygen:0|Carbon dioxide:0|Water:1|Stone:1|Juice:1',
    water: 'Save water,Waste water|Drink clean water:0|Boil water:0|Keep the tap closed:0|Leave the tap running:1|Play with muddy water:1|Wash with dirty water:1',
    weather: 'Clothes for a hot day,Clothes for a cold day|T-shirt:0|Sun hat:0|Sandals:0|Sweater:1|Wool cap:1|Woolen socks:1',
    sky: 'Planet,Not a planet|Earth:0|Mars:0|Venus:0|Moon:1|Star:1|Cloud:1',
    reason: 'Shape,Not a shape|Circle:0|Square:0|Triangle:0|Apple:1|Cat:1|Table:1'
  }
};
