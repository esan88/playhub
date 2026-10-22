/* PlayHub — Khel Yoga Class 3 Physical Education chapter content
   Source: NCERT Khel Yoga, Physical Education and Well-being Textbook for Class 3 (Reprint 2026-27), Chapters 1–7.
   Each chapter: story + learning card + one interactive game (quiz | match | sequence). */
window.KY3_CHAPTERS = [
  {
    id: 'c3ky1', n: 1, title: 'Throwing and Catching', emoji: '🤾', topic: 'Throw far, catch safe',
    c1: '#ef4444', c2: '#f97316',
    desc: 'Throw straight, watch the ball, catch softly! A free Class 3 PE lesson and quiz game from NCERT Khel Yoga chapter 1.',
    learn: {
      story: 'Aim at the wall — whoosh! The ball flies straight. Eyes on the ball, hands ready — CATCH! Throwing and catching is super fun! 🤾',
      intro: 'Throw with one hand, step forward, follow through. Catch with soft hands and eyes open.',
      points: [
        'Stand sideways and aim before throwing.',
        'Step forward as you release the ball.',
        'Watch the ball all the way in.',
        'Catch with soft, cupped hands.'
      ],
      words: ['throw', 'catch', 'aim', 'ball', 'hands', 'watch']
    },
    game: {
      type: 'quiz', title: 'Throw and Catch Quiz', instructions: 'Play smart and tap the answer.',
      questions: [
        { vis: '🤾', q: 'Before throwing, you should…?', options: ['Close eyes', 'Aim at target', 'Throw backwards'], a: 1, hint: 'Aim first!' },
        { vis: '👁️⚽', q: 'While catching, eyes must…?', options: ['Look away', 'Watch the ball', 'Close'], a: 1, hint: 'Eyes on the ball!' },
        { vis: '🤲', q: 'Catch with…?', options: ['Stiff fingers', 'Soft cupped hands', 'Elbows'], a: 1, hint: 'Soft hands!' },
        { vis: '🦶➡️', q: 'While throwing, step…?', options: ['Backwards', 'Forward', 'Nowhere'], a: 1, hint: 'Step into the throw!' },
        { vis: '🎯', q: 'Throwing practice needs a…?', options: ['Target', 'High wall only', 'Crowd'], a: 0, hint: 'Aim at a target!' },
        { vis: '🤝', q: 'After the game, players…?', options: ['Fight', 'Shake hands', 'Leave angry'], a: 1, hint: 'Sporty handshake!' }
      ]
    }
  },
  {
    id: 'c3ky2', n: 2, title: 'Kicking and Receiving', emoji: '⚽', topic: 'Kick straight, stop softly',
    c1: '#16a34a', c2: '#0ea5e9',
    desc: 'Kick with the side of your foot, stop with a soft touch! A free Class 3 PE lesson and quiz game from NCERT Khel Yoga chapter 2.',
    learn: {
      story: 'GOAL! Foot meets ball — thump! Stop a rolling ball with the inside of your foot, soft as a pillow. Kickers rule! ⚽',
      intro: 'Kick with the inside of the foot for aim. Receive by cushioning the ball.',
      points: [
        'Kick with the inside of the foot.',
        'Look at the ball while kicking.',
        'Receive with a soft foot touch.',
        'Pass to friends, don’t hog the ball.'
      ],
      words: ['kick', 'receive', 'foot', 'pass', 'goal', 'soft']
    },
    game: {
      type: 'quiz', title: 'Kick and Receive Quiz', instructions: 'Play fair and tap the answer.',
      questions: [
        { vis: '🦶⚽', q: 'Best foot part for aiming?', options: ['Toe always', 'Inside of foot', 'Heel'], a: 1, hint: 'Inside foot aims!' },
        { vis: '👁️⚽', q: 'While kicking, look at the…?', options: ['Sky', 'Ball', 'Crowd'], a: 1, hint: 'Eyes on ball!' },
        { vis: '🛑⚽', q: 'To stop a rolling ball, use a…?', options: ['Hard kick', 'Soft foot touch', 'Hand grab'], a: 1, hint: 'Soft pillow touch!' },
        { vis: '🤝⚽', q: 'In football, hogging the ball is…?', options: ['Great', 'Unfair — pass!', 'Required'], a: 1, hint: 'Pass to friends!' },
        { vis: '🥅', q: 'Goals are scored by kicking…?', options: ['Out of field', 'Into the net', 'Up high only'], a: 1, hint: 'Into the net!' },
        { vis: '👟', q: 'Play football wearing…?', options: ['Slippers', 'Sports shoes', 'Barefoot on stones'], a: 1, hint: 'Safe shoes!' }
      ]
    }
  },
  {
    id: 'c3ky3', n: 3, title: 'Strike the Ball', emoji: '🏏', topic: 'Batting basics in order',
    c1: '#f59e0b', c2: '#ef4444',
    desc: 'Stance, swing, hit — strike it like a champ! A free Class 3 PE batting sequence game from NCERT Khel Yoga chapter 3.',
    learn: {
      story: 'Bat up, eyes on the bowler… SWING — crack! The ball soars! Great batting is steps in order. 🏏',
      intro: 'Batting: stance, grip, watch, swing, follow-through, run.',
      points: [
        'Stand sideways with knees bent.',
        'Hold the bat firmly with both hands.',
        'Watch the ball till it comes close.',
        'Swing through and run fast.'
      ],
      words: ['bat', 'ball', 'stance', 'swing', 'run', 'watch']
    },
    game: {
      type: 'sequence', title: 'Batting Steps in Order', instructions: 'Tap the batting steps in order.',
      leftTitle: 'Batting order', rightTitle: 'Tap the next step',
      steps: [
        { emoji: '🧍', text: 'Stand sideways, knees bent' },
        { emoji: '🏏', text: 'Grip the bat with both hands' },
        { emoji: '👁️', text: 'Watch the bowler and ball' },
        { emoji: '💥', text: 'Swing the bat and hit' },
        { emoji: '🏃', text: 'Run fast between wickets' },
        { emoji: '🎉', text: 'Cheer your runs!' }
      ]
    }
  },
  {
    id: 'c3ky4', n: 4, title: 'Little Steps', emoji: '👣', topic: 'Athletics: walking, running, jumping',
    c1: '#0ea5e9', c2: '#84cc16',
    desc: 'Walk tall, run fast, jump far — little steps, big fun! A free Class 3 PE lesson and matching game from NCERT Khel Yoga chapter 4.',
    learn: {
      story: 'On your marks… GO! Walk like a soldier, run like the wind, jump like a frog. Little steps win big races! 🏃',
      intro: 'Athletics = walking, running, jumping, throwing. Warm up first.',
      points: [
        'Walk tall with swinging arms.',
        'Run on toes, pump arms.',
        'Jump with both feet together.',
        'Warm up before, cool down after.'
      ],
      words: ['walk', 'run', 'jump', 'race', 'warm', 'fast']
    },
    game: {
      type: 'match', title: 'Move It Matching!', instructions: 'Tap an action word, then tap its picture.',
      pairs: [
        ['Run', '🏃'], ['Jump', '🤾'], ['Walk', '🚶'],
        ['Swim', '🏊'], ['Hop', '🐸'], ['Spin', '🌀']
      ]
    }
  },
  {
    id: 'c3ky5', n: 5, title: 'Local and Traditional Games', emoji: '🪁', topic: 'Kho-kho, kabaddi, gilli-danda',
    c1: '#8b5cf6', c2: '#ec4899',
    desc: 'Kho-kho chase, kabaddi raid, gilli-danda whack! A free Class 3 PE lesson and quiz game from NCERT Khel Yoga chapter 5.',
    learn: {
      story: 'Grandma’s games beat phone games! Kho-kho chase, kabaddi “kabaddi-kabaddi”, gilli flying high — our very own treasures! 🪁',
      intro: 'Traditional games need no costly gear — just friends and open space.',
      points: [
        'Kho-kho: chase and touch to win.',
        'Kabaddi: raid chanting “kabaddi”.',
        'Gilli-danda: flick the small stick far.',
        'Pitthu, marbles and kites are classics too.'
      ],
      words: ['kho-kho', 'kabaddi', 'gilli', 'chase', 'raid', 'traditional']
    },
    game: {
      type: 'quiz', title: 'Traditional Games Quiz', instructions: 'Play desi and tap the answer.',
      questions: [
        { vis: '🏃‍♂️👉', q: 'In kho-kho, chasers must…?', options: ['Fly', 'Touch runners', 'Hide'], a: 1, hint: 'Touch and win!' },
        { vis: '🗣️', q: 'Kabaddi raiders chant…?', options: ['Hello', 'Kabaddi-kabaddi', 'Bye'], a: 1, hint: 'One-breath chant!' },
        { vis: '🥢', q: 'Gilli-danda flicks the…?', options: ['Big ball', 'Small gilli stick', 'Shoe'], a: 1, hint: 'Little gilli flies!' },
        { vis: '🪁', q: 'Kites fly best in…?', options: ['Rain', 'Breezy wind', 'Storm'], a: 1, hint: 'Breezy skies!' },
        { vis: '🔮', q: 'Marbles are played…?', options: ['On fingertips flick', 'With bats', 'In water'], a: 0, hint: 'Flick and strike!' },
        { vis: '👫', q: 'Traditional games teach us to…?', options: ['Play alone', 'Play together fairly', 'Quit fast'], a: 1, hint: 'Together fun!' }
      ]
    }
  },
  {
    id: 'c3ky6', n: 6, title: 'Yoga for Daily Life', emoji: '🧘', topic: 'Daily yoga routine in order',
    c1: '#f97316', c2: '#eab308',
    desc: 'Breathe, stretch, shine — yoga every morning! A free Class 3 PE yoga routine sequence game from NCERT Khel Yoga chapter 6.',
    learn: {
      story: 'Sunrise yoga! Stretch tall like a tree, breathe deep like the sea. Five minutes daily keeps wiggles away! 🧘🌅',
      intro: 'Yoga = poses + breathing + calm mind. Practice daily, gently.',
      points: [
        'Start with prayer and calm sitting.',
        'Breathe in slow, breathe out slow.',
        'Stretch gently — never force.',
        'End lying still and smiling.'
      ],
      words: ['yoga', 'breathe', 'stretch', 'pose', 'calm', 'daily']
    },
    game: {
      type: 'sequence', title: 'Morning Yoga in Order', instructions: 'Tap the yoga routine in order.',
      leftTitle: 'Yoga order', rightTitle: 'Tap the next step',
      steps: [
        { emoji: '🧎', text: 'Sit calmly and join hands' },
        { emoji: '🌬️', text: 'Breathe in and out slowly' },
        { emoji: '🌳', text: 'Stand tall in tree pose' },
        { emoji: '🙆', text: 'Stretch arms to the sky' },
        { emoji: '🧘', text: 'Sit and meditate a minute' },
        { emoji: '😊', text: 'Smile — yoga done!' }
      ]
    }
  },
  {
    id: 'c3ky7', n: 7, title: 'Yogic Practices (Yoga Sadhana)', emoji: '🕉️', topic: 'Yoga practice and good habits',
    c1: '#7c3aed', c2: '#0ea5e9',
    desc: 'Practice daily, eat right, sleep well — yoga way of life! A free Class 3 PE lesson and quiz game from NCERT Khel Yoga chapter 7.',
    learn: {
      story: 'Yoga isn’t just poses — it’s kind words, fresh food, early sleep. Sadhana means happy practice every single day! 🕉️',
      intro: 'Sadhana = regular practice. Yoga plus good habits keeps body and mind strong.',
      points: [
        'Practice a little every day.',
        'Eat fresh, chew slowly.',
        'Sleep early and wake early.',
        'Speak kindly to everyone.'
      ],
      words: ['practice', 'habit', 'fresh', 'sleep', 'kind', 'daily']
    },
    game: {
      type: 'quiz', title: 'Yoga Life Quiz', instructions: 'Live the yoga way and tap.',
      questions: [
        { vis: '📅🧘', q: 'Sadhana means…?', options: ['One-day show', 'Daily happy practice', 'No practice'], a: 1, hint: 'Every day!' },
        { vis: '🍎', q: 'Yoga food is…?', options: ['Stale junk', 'Fresh and light', 'Only sweets'], a: 1, hint: 'Fresh fuel!' },
        { vis: '😴🌙', q: 'Yoga sleep means…?', options: ['Late nights', 'Early to bed', 'No sleep'], a: 1, hint: 'Early rest!' },
        { vis: '🗣️❤️', q: 'Yoga speech is…?', options: ['Rude shouts', 'Kind words', 'Lies'], a: 1, hint: 'Kind always!' },
        { vis: '🧘⏱️', q: 'Start yoga practice with…?', options: ['Hard poses', 'A few minutes daily', 'Full day'], a: 1, hint: 'Little daily!' },
        { vis: '😊', q: 'Yoga finally gives a…?', options: ['Frown', 'Calm smile', 'Headache'], a: 1, hint: 'Calm and smile!' }
      ]
    }
  }
];
window.CHAPTERS = window.KY3_CHAPTERS;
window.CHAPTER_SUBJECT = 'Class 3 Sports';
