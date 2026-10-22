/* PlayHub — Veena Class 3 Hindi chapter content
   Source: NCERT Veena, Kaksha 3 ke liye Hindi ki Pathyapustak (Reprint 2026-27), Chapters 1–18.
   Har path: kahani + learning card + ek interactive game (quiz | match | sequence). */
window.VE3_CHAPTERS = [
  {
    id: 'c3ve1', n: 1, title: 'सीखो', emoji: '📖', topic: 'Seekhne ki anandmayi kavita',
    c1: '#f59e0b', c2: '#ef4444',
    desc: 'Chidiya se seekho, phoolon se seekho — seekhna kabhi na chhodo! NCERT Veena kaksha 3 path 1 par muft Hindi lesson aur quiz game.',
    learn: {
      story: 'Chidiya chehchahati hai, phool muskuraate hain — sab kuchh kuchh sikhata hai! Aankhen kholo, Seekho kavita gungunao! 📖🐦',
      intro: 'Seekho kavita kehti hai — har din kuchh naya seekho. Prakriti sabse achchhi teacher hai.',
      points: [
        'Chidiya se meetha bolna seekho.',
        'Phoolon se muskuraana seekho.',
        'Roz kuchh naya seekhne ki aadat dalo.',
        'Seekhne mein kabhi sharmana nahin.'
      ],
      words: ['सीखो', 'चिड़िया', 'फूल', 'कविता', 'रोज़', 'नया']
    },
    game: {
      type: 'quiz', title: 'सीखो Quiz', instructions: 'Kavita yaad karo aur sahi uttar chuno.',
      questions: [
        { vis: '🐦', q: 'Chidiya humein kya sikhati hai?', options: ['Ladna', 'Meetha bolna', 'Sona'], a: 1, hint: 'Chehchahana = meetha bolna!' },
        { vis: '🌸', q: 'Phoolon se kya seekhen?', options: ['Rona', 'Muskuraana', 'Chhupna'], a: 1, hint: 'Phool muskuraate hain!' },
        { vis: '📅', q: 'Kab seekhna chahiye?', options: ['Roz', 'Kabhi nahin', 'Sirf tyoharon mein'], a: 0, hint: 'Roz kuchh naya!' },
        { vis: '🌳', q: 'Sabse achchhi teacher kaun?', options: ['Prakriti', 'Khilona', 'Takiya'], a: 0, hint: 'Prakriti sikhati hai!' },
        { vis: '💪', q: 'Seekhne mein kya nahin karna?', options: ['Koshish', 'Sharmana', 'Poochhna'], a: 1, hint: 'Sharmao mat, poochho!' },
        { vis: '🎒', q: 'School mein hum kya karte hain?', options: ['Sirf khelte', 'Seekhte aur khelte', 'Sote'], a: 1, hint: 'Seekho + khelo!' }
      ]
    }
  },
  {
    id: 'c3ve2', n: 2, title: 'चींटी', emoji: '🐜', topic: 'Mehnati cheenti ki duniya',
    c1: '#b45309', c2: '#84cc16',
    desc: 'Chhoti cheenti, badi mehnat — teamwork ka kamaal! NCERT Veena kaksha 3 path 2 par muft Hindi lesson aur matching game.',
    learn: {
      story: 'Lambi kataar, chhote kadam — cheentiyan dana dhoti hain, milkar ghar banati hain. Chhoti hokar bhi kitni badi seekh! 🐜',
      intro: 'Cheenti milkar kaam karti hai. Ekta mein taakat hai.',
      points: [
        'Cheentiyan kataar mein chalti hain.',
        'Milkar dana ikattha karti hain.',
        'Chhoti hokar bhi mehnati hain.',
        'Ekta se bade kaam aasaan.'
      ],
      words: ['चींटी', 'मेहनत', 'एकता', 'कतार', 'दाना', 'मिलकर']
    },
    game: {
      type: 'match', title: 'Keede-Makode Milao!', instructions: 'Shabd chuno, phir sahi tasveer chuno.',
      pairs: [
        ['चींटी', '🐜'], ['तितली', '🦋'], ['मक्खी', '🪰'],
        ['मकड़ी', '🕷️'], ['भौंरा', '🐝'], ['टिड्डा', '🦗']
      ]
    }
  },
  {
    id: 'c3ve3', n: 3, title: 'कितने पैर?', emoji: '🐾', topic: 'Janvaron ke pair gino',
    c1: '#0ea5e9', c2: '#65a30d',
    desc: 'Do pair, chaar pair, sau pair! Gino aur jano. NCERT Veena kaksha 3 path 3 par muft Hindi lesson aur quiz game.',
    learn: {
      story: 'Murgi ke do, gaay ke chaar, hazaar pairon wali railgaadi? Pair ginte jao — gin-ti mazedaar! 🐾',
      intro: 'Har janvar ke pair alag-alag hote hain. Ginkar batao kitne.',
      points: [
        'Chidiya ke do pair hote hain.',
        'Gaay-bhains ke chaar pair.',
        'Makdi ke aath pair hote hain.',
        'Ginkar hi sahi jawab milta hai.'
      ],
      words: ['पैर', 'गिनो', 'दो', 'चार', 'आठ', 'जानवर']
    },
    game: {
      type: 'quiz', title: 'कितने पैर Quiz', instructions: 'Pair gino aur sahi uttar chuno.',
      questions: [
        { vis: '🐔', q: 'Murgi ke kitne pair?', options: ['2', '4', '6'], a: 0, hint: 'Do pair wali murgi!' },
        { vis: '🐄', q: 'Gaay ke kitne pair?', options: ['2', '8', '4'], a: 2, hint: 'Chaar pair!' },
        { vis: '🕷️', q: 'Makdi ke kitne pair?', options: ['6', '8', '2'], a: 1, hint: 'Aath pair!' },
        { vis: '🐝', q: 'Madhumakkhi ke kitne pair?', options: ['4', '2', '6'], a: 2, hint: 'Chhe pair!' },
        { vis: '🐍', q: 'Saanp ke kitne pair?', options: ['0', '2', '4'], a: 0, hint: 'Pair hi nahin!' },
        { vis: '🐘', q: 'Haathi ke kitne pair?', options: ['3', '4', '5'], a: 1, hint: 'Chaar majboot pair!' }
      ]
    }
  },
  {
    id: 'c3ve4', n: 4, title: 'बया हमारी चिड़िया रानी!', emoji: '🐦', topic: 'Ghonsla banane wali baya',
    c1: '#f97316', c2: '#eab308',
    desc: 'Tinke laakar mahal banati! Baya chidiya ki mehnat. NCERT Veena kaksha 3 path 4 par muft Hindi lesson aur quiz game.',
    learn: {
      story: 'Unchi daali par latka mahal! Baya tinke laati, ande seyti, bachchon ki dekhbhaal karti. Mahadevi Verma ki pyari kavita! 🐦',
      intro: 'Baya mehnat se sundar ghonsla banati hai aur bachchon ko paalti hai.',
      points: [
        'Baya tinkon se ghonsla banati hai.',
        'Ghonsla unchi daali par latakta hai.',
        'Baya andon se bachche nikaalti hai.',
        'Hum chidiyon ko dana-pani dein.'
      ],
      words: ['बया', 'चिड़िया', 'घोंसला', 'तिनका', 'मेहनत', 'रानी']
    },
    game: {
      type: 'quiz', title: 'बया Quiz', instructions: 'Kavita yaad karo, uttar chuno.',
      questions: [
        { vis: '🐦🏠', q: 'Baya ghonsla kis se banati hai?', options: ['Eenton se', 'Tinkon se', 'Kagaz se'], a: 1, hint: 'Tinke laakar!' },
        { vis: '🌳', q: 'Ghonsla kahan latakta hai?', options: ['Zameen par', 'Unchi daali par', 'Paani mein'], a: 1, hint: 'Unchi daali!' },
        { vis: '🥚', q: 'Ghonsle mein baya kya rakhti hai?', options: ['Patthar', 'Ande', 'Khilone'], a: 1, hint: 'Nन्हen ande!' },
        { vis: '🐥', q: 'Andon se kya nikalta hai?', options: ['Machhli', 'Nanhi chidiya', 'Tataiya'], a: 1, hint: 'Nanhi chidiya!' },
        { vis: '🍚💧', q: 'Hum chidiyon ko kya dein?', options: ['Dana-pani', 'Kankad', 'Kuchh nahin'], a: 0, hint: 'Dana aur paani!' },
        { vis: '👑', q: 'Baya ko kya kehte hain?', options: ['Chidiya rani', 'Machhli rani', 'Titali rani'], a: 0, hint: 'Chidiya rani!' }
      ]
    }
  },
  {
    id: 'c3ve5', n: 5, title: 'आम का पेड़', emoji: '🥭', topic: 'Aam ke pedh ki kahani',
    c1: '#16a34a', c2: '#eab308',
    desc: 'Beej se pedh, phool se aam! Meethe aam ki kahani. NCERT Veena kaksha 3 path 5 par muft Hindi lesson aur matching game.',
    learn: {
      story: 'Chhoti guthli, dharti mein soyi — paanipeekar jaagi, pedh bani, phir ras bhare aam! pedh lagao, chhaon pao! 🥭',
      intro: 'Aam garmi ka raja phal hai. pedh humein phal, chhaon aur lakdi deta hai.',
      points: [
        'Guthli se aam ka pedh ugta hai.',
        ' pedh ko paani aur dhoop chahiye.',
        'Aam garmi mein pakte hain.',
        ' pedh lagana punya ka kaam hai.'
      ],
      words: ['आम', 'पेड़', 'गुठली', 'फल', 'छाँव', 'गर्मी']
    },
    game: {
      type: 'match', title: 'Pedh-Paudhe Milao!', instructions: 'Shabd chuno, phir sahi tasveer chuno.',
      pairs: [
        ['आम', '🥭'], ['पेड़', '🌳'], ['फूल', '🌸'],
        ['पत्ता', '🍃'], ['बीज', '🌰'], ['केला', '🍌']
      ]
    }
  },
  {
    id: 'c3ve6', n: 6, title: 'बीरबल की खिचड़ी', emoji: '🍲', topic: 'Birbal ki chaturai',
    c1: '#ef4444', c2: '#a855f7',
    desc: 'Akbar ka sawaal, Birbal ka kamaal! Hansi aur akal ki kahani. NCERT Veena kaksha 3 path 6 par muft Hindi lesson aur quiz game.',
    learn: {
      story: 'Sard raat, unchi handi, door aag — khichdi pakegi kaise? Birbal ki akal ne Badshah ko hansa diya! 👑😂',
      intro: 'Birbal apni buddhi se har mushkil aasaan kar dete the. Akal badi ya bhains?',
      points: [
        'Birbal Badshah Akbar ke mantri the.',
        'Mushkil ka hal akal se nikalo.',
        'Hansi-mazaak mein bhi seekh chhupi hai.',
        'Bado ka aadar karo.'
      ],
      words: ['बीरबल', 'खिचड़ी', 'अक्ल', 'बादशाह', 'कहानी', 'मज़ाक']
    },
    game: {
      type: 'quiz', title: 'बीरबल Quiz', instructions: 'Akal lagao, uttar chuno.',
      questions: [
        { vis: '👑', q: 'Birbal kis ke mantri the?', options: ['Raja Bhoj', 'Badshah Akbar', 'Sher Shah'], a: 1, hint: 'Akbar-Birbal jodi!' },
        { vis: '🍲', q: 'Kahani mein kya pak raha tha?', options: ['Dal', 'Khichdi', 'Kheer'], a: 1, hint: 'Khichdi!' },
        { vis: '🧠', q: 'Birbal mashhoor the apni…?', options: ['Taakat', 'Akal', 'Daulat'], a: 1, hint: 'Akalmand Birbal!' },
        { vis: '🔥🏺', q: 'Handi aag se door thi, isliye khichdi…?', options: ['Jaldi paki', 'Pak hi nahin sakti', 'Meethi bani'], a: 1, hint: 'Door ki aag!' },
        { vis: '😂', q: 'Kahani sunkar Badshah…?', options: ['Naraz hue', 'Hans pade', 'So gaye'], a: 1, hint: 'Hansna aaya!' },
        { vis: '💡', q: 'Mushkil ka hal nikalta hai…?', options: ['Gusse se', 'Akal se', 'Rone se'], a: 1, hint: 'Akal badi!' }
      ]
    }
  },
  {
    id: 'c3ve7', n: 7, title: 'मित्र को पत्र', emoji: '✉️', topic: 'Patra likhna seekho, kram se',
    c1: '#0ea5e9', c2: '#6366f1',
    desc: 'Pyara patra likho — shuruaat se ant tak! NCERT Veena kaksha 3 path 7 par muft Hindi patra sequence game.',
    learn: {
      story: 'Door rehne wale dost ko patra likho — haal-chaal, masti, pyaar! Patra dilon ko jodte hain. ✉️❤️',
      intro: 'Patra mein dinank, sambodhan, haal-chaal, baat aur naam likhte hain.',
      points: [
        'Sabse upar dinank likho.',
        'Pyare dost ko sambodhan likho.',
        'Apna haal-chaal batao.',
        'Ant mein apna naam likho.'
      ],
      words: ['पत्र', 'मित्र', 'दिनांक', 'पता', 'नाम', 'प्यार']
    },
    game: {
      type: 'sequence', title: 'Patra Kram Se', instructions: 'Patra ke charan kram se chuno.',
      leftTitle: 'Patra kram', rightTitle: 'Agla charan chuno',
      steps: [
        { emoji: '📅', text: 'Dinank likho' },
        { emoji: '👋', text: 'Pyare dost sambodhan' },
        { emoji: '✍️', text: 'Haal-chaal aur baat likho' },
        { emoji: '❤️', text: 'Pyaar bhara sandesh' },
        { emoji: '📮', text: 'Lifafe mein daalo' },
        { emoji: '🚴', text: 'Daakiya dwaar tak pahunchaye' }
      ]
    }
  },
  {
    id: 'c3ve8', n: 8, title: 'चतुर गीदड़', emoji: '🦊', topic: 'Chatur gidar ki kahani',
    c1: '#f97316', c2: '#b45309',
    desc: 'Gidar ki hoshiyari ke kisse! NCERT Veena kaksha 3 path 8 par muft Hindi lesson aur quiz game.',
    learn: {
      story: 'Sher ki dahaad, haathi ki chinghaad — par sabse tez chala chatur gidar ka dimaag! Hoshiyari se badi museebat talti hai. 🦊',
      intro: 'Gidar chatur janvar hai. Kahani sikhati hai — bala se akal badi.',
      points: [
        'Gidar apni akal se bachta hai.',
        'Takad se badi hoshiyari hai.',
        'Kahani se seekh milti hai.',
        'Doston ki madad karo.'
      ],
      words: ['गीदड़', 'चतुर', 'जंगल', 'अक्ल', 'कहानी', 'मुसीबत']
    },
    game: {
      type: 'quiz', title: 'गीदड़ Quiz', instructions: 'Hoshiyari se uttar chuno.',
      questions: [
        { vis: '🦊', q: 'Gidar mashhoor hai apni…?', options: ['Takad', 'Chaturai', 'Neend'], a: 1, hint: 'Chatur gidar!' },
        { vis: '🦁', q: 'Sher se gidar kaise bachta hai?', options: ['Daudkar', 'Akal se', 'Sokar'], a: 1, hint: 'Akal ka khel!' },
        { vis: '🌳', q: 'Kahani kahan ghati?', options: ['Sheher', 'Jungle', 'Samundar'], a: 1, hint: 'Jungle mein!' },
        { vis: '🧠💪', q: 'Badi kaun — bala ya akal?', options: ['Bala', 'Akal', 'Dono bekaar'], a: 1, hint: 'Akal badi!' },
        { vis: '📖', q: 'Kahaniyon se humein milti hai…?', options: ['Neend', 'Seekh', 'Bhookh'], a: 1, hint: 'Seekh bhari!' },
        { vis: '🤝', q: 'Museebat mein doston ka…?', options: ['Saath chhodo', 'Saath do', 'Hansao'], a: 1, hint: 'Saath nibhao!' }
      ]
    }
  },
  {
    id: 'c3ve9', n: 9, title: 'प्रकृति पर्व – फूलदेई', emoji: '🌸', topic: 'Phoolon ka tyohar Phooldei',
    c1: '#ec4899', c2: '#16a34a',
    desc: 'Phool, geet, khushi — Basant ka Phooldei parv! NCERT Veena kaksha 3 path 9 par muft Hindi lesson aur quiz game.',
    learn: {
      story: 'Basant aaya! Bachche tokri mein phool lekar dwar-dwar jaate, geet gaate — Phooldei mubarak! 🌸🧺',
      intro: 'Phooldei Uttarakhand ka phoolon wala tyohar hai. Prakriti ka dhanyavaad kehte hain.',
      points: [
        'Phooldei Basant ritu mein manaya jaata hai.',
        'Bachche phoolon se dwar sajaate hain.',
        'Lokgeet gaaye jaate hain.',
        'Prakriti ka shukriya ada karo.'
      ],
      words: ['फूलदेई', 'बसंत', 'फूल', 'त्योहार', 'गीत', 'प्रकृति']
    },
    game: {
      type: 'quiz', title: 'फूलदेई Quiz', instructions: 'Tyohar ki khushi mein uttar chuno.',
      questions: [
        { vis: '🌸', q: 'Phooldei kis ka tyohar hai?', options: ['Patangon', 'Phoolon', 'Diyon'], a: 1, hint: 'Phool-phool!' },
        { vis: '🌼🌷', q: 'Bachche tokri mein kya laate hain?', options: ['Patthar', 'Phool', 'Ret'], a: 1, hint: 'Rang-birange phool!' },
        { vis: '🚪🌸', q: 'Phoolon se kya sajaate hain?', options: ['Dwaar', 'Sadak', 'Khet'], a: 0, hint: 'Dwaar sajaao!' },
        { vis: '🎵', q: 'Phooldei mein gaaye jaate hain…?', options: ['Film gaane', 'Lokgeet', 'Kuchh nahin'], a: 1, hint: 'Meethe lokgeet!' },
        { vis: '🌱', q: 'Phooldei humein sikhata hai…?', options: ['Pedh kaatna', 'Prakriti se prem', 'Phool todna'], a: 1, hint: 'Prakriti prem!' },
        { vis: '🙏🌿', q: 'Ant mein hum kehte hain…?', options: ['Alvida', 'Dhanyavaad Prakriti', 'Kuchh nahin'], a: 1, hint: 'Shukriya!' }
      ]
    }
  },
  {
    id: 'c3ve10', n: 10, title: 'रस्साकशी', emoji: '🪢', topic: 'Rassakashi khel kram se',
    c1: '#ef4444', c2: '#f59e0b',
    desc: 'Kheencho! Jeet teamwork se milti hai. NCERT Veena kaksha 3 path 10 par muft Hindi khel sequence game.',
    learn: {
      story: 'Do dal, ek rassi — kheencham-kheenchi! Jeet taakat se nahin, ekjut hokar kheenchne se milti hai! 🪢💪',
      intro: 'Rassakashi mein do dal rassi kheenchti hain. Ekta aur niyam jeet dilate hain.',
      points: [
        'Do barabar dal banao.',
        'Rassi ko majbooti se pakdo.',
        'Ek saath milkar kheecho.',
        'Haar-jeet mein khushi manao.'
      ],
      words: ['रस्साकशी', 'रस्सी', 'दल', 'खींचो', 'जीत', 'खेल']
    },
    game: {
      type: 'sequence', title: 'Rassakashi Kram Se', instructions: 'Khel ke charan kram se chuno.',
      leftTitle: 'Khel kram', rightTitle: 'Agla charan chuno',
      steps: [
        { emoji: '👫', text: 'Do barabar dal banao' },
        { emoji: '🪢', text: 'Rassi beech se pakdo' },
        { emoji: '📏', text: 'Seema rekha kheecho' },
        { emoji: '📯', text: 'Seeti par kheenchna shuru' },
        { emoji: '💪', text: 'Milkar zor lagao' },
        { emoji: '🏆', text: 'Jeet ka jashn manao' }
      ]
    }
  },
  {
    id: 'c3ve11', n: 11, title: 'एक जादुई पिटारा', emoji: '🎩', topic: 'Jaadui pitaare ke ajoobe',
    c1: '#8b5cf6', c2: '#ec4899',
    desc: 'Pitaara khula — chamatkar hi chamatkar! NCERT Veena kaksha 3 path 11 par muft Hindi lesson aur matching game.',
    learn: {
      story: 'Purana sandook khula — andar khargosh, mithaas, taare! Jaadui pitaara sapnon se bhara hai. 🎩✨',
      intro: 'Kalpana se badi koi jaadu nahin. Pitaare mein achchhai ke uphaar hain.',
      points: [
        'Pitaare mein ajoobe chhupe hain.',
        'Kalpana se kahani banti hai.',
        'Achchhe kaam jaadu jaise lagte hain.',
        'Apna pitaara doston se baanto.'
      ],
      words: ['जादुई', 'पिटारा', 'अजूबा', 'कल्पना', 'उपहार', 'खुशी']
    },
    game: {
      type: 'match', title: 'Jaadu Milao!', instructions: 'Shabd chuno, phir sahi tasveer chuno.',
      pairs: [
        ['खरगोश', '🐰'], ['टोपी', '🎩'], ['तारा', '⭐'],
        ['मिठाई', '🍬'], ['गुब्बारा', '🎈'], ['तोहफ़ा', '🎁']
      ]
    }
  },
  {
    id: 'c3ve12', n: 12, title: 'अपना-अपना काम', emoji: '🧹', topic: 'Apna kaam khud karo',
    c1: '#0ea5e9', c2: '#16a34a',
    desc: 'Joota khud pehno, thaali khud uthao! NCERT Veena kaksha 3 path 12 par muft Hindi lesson aur quiz game.',
    learn: {
      story: 'Chintu ne thaali khud uthai, joota khud pehna — Mummy ne taali bajai! Apna kaam khud karne mein maza hai! 🧹😊',
      intro: 'Apne chhote kaam khud karo — bado ki madad bhi karo.',
      points: [
        'Bistar khud theek karo.',
        'Thaali khud uthao.',
        'Khilone jagah par rakho.',
        'Madad maangne mein sharm nahin.'
      ],
      words: ['काम', 'खुद', 'मदद', 'जिम्मेदारी', 'साफ़', 'अच्छा']
    },
    game: {
      type: 'quiz', title: 'अपना काम Quiz', instructions: 'Achchhi aadat chuno.',
      questions: [
        { vis: '🛏️', q: 'Subah uthkar pehle…?', options: ['Khelo', 'Bistar theek karo', 'So jao'], a: 1, hint: 'Bistar pehle!' },
        { vis: '🍽️', q: 'Khane ke baad thaali…?', options: ['Vahin chhodo', 'Khud uthao', 'Phenk do'], a: 1, hint: 'Khud uthao!' },
        { vis: '🧸📦', q: 'Khelne ke baad khilone…?', options: ['Bikher do', 'Jagah par rakho', 'Todo'], a: 1, hint: 'Jagah par!' },
        { vis: '👟', q: 'School ke joota…?', options: ['Mummy pehnaye', 'Khud pehno', 'Nange jao'], a: 1, hint: 'Khud pehno!' },
        { vis: '🤝', q: 'Bhaari kaam mein…?', options: ['Madad maango', 'Rona shuru', 'Chhodo'], a: 0, hint: 'Madad lo!' },
        { vis: '👏', q: 'Apna kaam karne par milti hai…?', options: ['Daant', 'Shabaashi', 'Saza'], a: 1, hint: 'Shabaash!' }
      ]
    }
  },
  {
    id: 'c3ve13', n: 13, title: 'पेड़ों की अम्मा ‘थिमक्का’', emoji: '🌳', topic: 'Thimmakka ne lagaye sainkadon pedh',
    c1: '#16a34a', c2: '#065f46',
    desc: 'Saalumarada Thimmakka — pedhon ki amma! NCERT Veena kaksha 3 path 13 par muft Hindi pedh sequence game.',
    learn: {
      story: 'Thimmakka ne sadak kinare peepal lagaye — paani diya, raksha ki. Aaj sainkadon pedh unki santaan hain! 🌳🙏',
      intro: 'Thimmakka ne apne jeevan mein sainkadon pedh lagaye. pedh lagana sabse bada daan hai.',
      points: [
        'Thimmakka Karnataka ki paryavaran mitra hain.',
        'Unhone sadak kinare pedh lagaye.',
        'Roz paani dekar pedhon ko paala.',
        'Hum bhi ek pedh lagayen.'
      ],
      words: ['पेड़', 'अम्मा', 'थिमक्का', 'पर्यावरण', 'पानी', 'लगाओ']
    },
    game: {
      type: 'sequence', title: 'Pedh Lagao Kram Se', instructions: 'Pedh lagane ke charan kram se chuno.',
      leftTitle: 'Ropan kram', rightTitle: 'Agla charan chuno',
      steps: [
        { emoji: '🕳️', text: 'Gaddha khodo' },
        { emoji: '🌱', text: 'Paudha lagao' },
        { emoji: '🟤', text: 'Mitti se dhanko' },
        { emoji: '💧', text: 'Roz paani do' },
        { emoji: '🛡️', text: 'Jaali se raksha karo' },
        { emoji: '🌳', text: 'Bada pedh — chhaon pao' }
      ]
    }
  },
  {
    id: 'c3ve14', n: 14, title: 'किसान की होशियारी', emoji: '🚜', topic: 'Hoshiyar kisan ki kahani',
    c1: '#65a30d', c2: '#eab308',
    desc: 'Mehnat + akal = khushhaal kisan! NCERT Veena kaksha 3 path 14 par muft Hindi lesson aur quiz game.',
    learn: {
      story: 'Sookha pada, par kisan ne himmat na haari — nayi vidhi, mehnat, bachat! Khet lehlaha utha. Hoshiyari jeet gayi! 🚜🌾',
      intro: 'Kisan annadata hai. Mehnat aur hoshiyari se mushkil aasaan hoti hai.',
      points: [
        'Kisan khet mein ann ugaata hai.',
        'Mehnat ka phal meetha hota hai.',
        'Hoshiyari se sankat talta hai.',
        'Ann ka ek dana bhi na vyarth karo.'
      ],
      words: ['किसान', 'खेत', 'मेहनत', 'होशियारी', 'फसल', 'अन्न']
    },
    game: {
      type: 'quiz', title: 'किसान Quiz', instructions: 'Khet ki samajh se uttar chuno.',
      questions: [
        { vis: '🚜', q: 'Ann ugaata hai…?', options: ['Dukaandaar', 'Kisan', 'Darzi'], a: 1, hint: 'Annadata kisan!' },
        { vis: '🌾', q: 'Fasal ke liye chahiye…?', options: ['Paani-dhoop-mehnat', 'Sirf neend', 'Khel'], a: 0, hint: 'Mehnat + prakriti!' },
        { vis: '🧠', q: 'Sankat mein kaam aati hai…?', options: ['Ghabrahat', 'Hoshiyari', 'Aalsi'], a: 1, hint: 'Hoshiyar bano!' },
        { vis: '🍚', q: 'Ann ka daana…?', options: ['Phenk do', 'Bachao, vyarth na karo', 'Kharab karo'], a: 1, hint: 'Ek dana keemat!' },
        { vis: '🐂', q: 'Khet jotne mein madad karta hai…?', options: ['Bail', 'Sher', 'Machhli'], a: 0, hint: 'Bail hamara mitra!' },
        { vis: '🌧️', q: 'Fasal ke liye varshah…?', options: ['Hanikarak', 'Vardaan', 'Bekaar'], a: 1, hint: 'Baarish vardaan!' }
      ]
    }
  },
  {
    id: 'c3ve15', n: 15, title: 'भारत', emoji: '🇮🇳', topic: 'Humaara pyaara Bharat',
    c1: '#ff9933', c2: '#138808',
    desc: 'Himalaya se Kanyakumari — Bharat mahaan! NCERT Veena kaksha 3 path 15 par muft Hindi lesson aur quiz game.',
    learn: {
      story: 'Barf se dhake parvat, lehlahate khet, rang-birange tyohar — Bharat anekta mein ekta hai! 🇮🇳',
      intro: 'Bharat humaara desh hai. Tiranga humaari shaan hai.',
      points: [
        'Rajdhani Dilli hai.',
        'Tirange mein kesariya, safed, hara hai.',
        'Anek bhashaen, ek Bharat.',
        'Desh se prem karo.'
      ],
      words: ['भारत', 'तिरंगा', 'देश', 'राजधानी', 'प्रेम', 'महान']
    },
    game: {
      type: 'quiz', title: 'भारत Quiz', instructions: 'Desh prem se uttar chuno.',
      questions: [
        { vis: '🇮🇳', q: 'Humaara rashtriya jhanda hai…?', options: ['Tiranga', 'Neela', 'Peela'], a: 0, hint: 'Tiranga shaan!' },
        { vis: '🏛️', q: 'Bharat ki rajdhani…?', options: ['Mumbai', 'Dilli', 'Jaipur'], a: 1, hint: 'Dilli dil walon ki!' },
        { vis: '🟧⬜🟩', q: 'Tirange ke rang…?', options: ['Laal-neela', 'Kesariya-safed-hara', 'Kaala-peela'], a: 1, hint: 'Teen rang!' },
        { vis: '🗣️', q: 'Bharat mein boli jaati hain…?', options: ['Ek bhasha', 'Anek bhashaen', 'Koi nahin'], a: 1, hint: 'Anekta mein ekta!' },
        { vis: '🏔️', q: 'Uttar mein raksha karta hai…?', options: ['Samundar', 'Himalaya', 'Registaan'], a: 1, hint: 'Himalaya prahari!' },
        { vis: '❤️🇮🇳', q: 'Desh ke liye hum…?', options: ['Ladein', 'Prem aur seva karein', 'Bhool jayen'], a: 1, hint: 'Seva bhav!' }
      ]
    }
  },
  {
    id: 'c3ve16', n: 16, title: 'चंद्रयान (संवाद)', emoji: '🚀', topic: 'Chandrayaan par samvaad',
    c1: '#0f172a', c2: '#7c3aed',
    desc: 'Chanda mama tak Bharat ka yaan! Samvaad mein vigyaan. NCERT Veena kaksha 3 path 16 par muft Hindi lesson aur quiz game.',
    learn: {
      story: '“Dekho! Rocket udaan bhare!” — bachche samvaad mein Chandrayaan ki kahani kehte hain. Vigyaan bhi, masti bhi! 🚀🌙',
      intro: 'Chandrayaan Bharat ka Chandrayaan hai. Samvaad mein baatcheet se seekho.',
      points: [
        'Chandrayaan Chaand par gaya.',
        'Vigyaan desh ko aage badhata hai.',
        'Samvaad mein sawaal-jawaab hote hain.',
        'Sapne dekho, mehnat karo.'
      ],
      words: ['चंद्रयान', 'चाँद', 'रॉकेट', 'संवाद', 'विज्ञान', 'सपना']
    },
    game: {
      type: 'quiz', title: 'चंद्रयान Quiz', instructions: 'Samvaad yaad karo, uttar chuno.',
      questions: [
        { vis: '🚀', q: 'Chandrayaan kahan gaya?', options: ['Mangal', 'Chaand', 'Suraj'], a: 1, hint: 'Chanda mama ke ghar!' },
        { vis: '🇮🇳🌙', q: 'Chandrayaan kis desh ka hai?', options: ['Bharat', 'Japan', 'Brazil'], a: 0, hint: 'Bharat ka garv!' },
        { vis: '💬', q: 'Samvaad mein hota hai…?', options: ['Ek bhashan', 'Baatcheet', 'Geet'], a: 1, hint: 'Baatcheet!' },
        { vis: '🔬', q: 'Vigyaan humein deta hai…?', options: ['Andhvishwas', 'Naya gyaan', 'Darr'], a: 1, hint: 'Gyaan ka ujala!' },
        { vis: '🌙🔍', q: 'Yaan Chaand par karta hai…?', options: ['Kheti', 'Khoj', 'Dukaan'], a: 1, hint: 'Khoj-khabar!' },
        { vis: '⭐', q: 'Bade sapne poore hote hain…?', options: ['Sone se', 'Mehnat se', 'Rone se'], a: 1, hint: 'Mehnat rang laati!' }
      ]
    }
  },
  {
    id: 'c3ve17', n: 17, title: 'बोलने वाली माँद', emoji: '🦊', topic: 'Bolne wali maand ki kahani',
    c1: '#b45309', c2: '#f97316',
    desc: 'Maand boli — suno kya kehti hai! NCERT Veena kaksha 3 path 17 par muft Hindi lesson aur quiz game.',
    learn: {
      story: 'Jungle mein ek maand — andar se aawaaz! Kaun bolta hai? Himmat karke dekho, kahani khud bolegi! 🦊👂',
      intro: 'Kahani mein kalpana aur masti hai. Darr ko himmat se jeeto.',
      points: [
        'Maand janvaron ka ghar hai.',
        'Aawaaz sunkar ghabrao mat.',
        'Himmat se sach jaano.',
        'Kahani doston ko sunao.'
      ],
      words: ['माँद', 'बोलना', 'हिम्मत', 'आवाज़', 'कहानी', 'जंगल']
    },
    game: {
      type: 'quiz', title: 'माँद Quiz', instructions: 'Dhyaan se sunkar uttar chuno.',
      questions: [
        { vis: '🕳️', q: 'Maand hoti hai…?', options: ['Pedh par', 'Zameen mein ghar', 'Aasmaan mein'], a: 1, hint: 'Zameen ke andar!' },
        { vis: '👂', q: 'Aawaaz sunkar pehle…?', options: ['Bhaago', 'Dhyaan se suno', 'Chillao'], a: 1, hint: 'Sunno dhyaan se!' },
        { vis: '💪', q: 'Sach jaanne ke liye chahiye…?', options: ['Darr', 'Himmat', 'Neend'], a: 1, hint: 'Himmatwala!' },
        { vis: '🦊', q: 'Maand mein rehte hain…?', options: ['Machhli', 'Janvar', 'Panchhi'], a: 1, hint: 'Janvaron ka ghar!' },
        { vis: '📖', q: 'Achchhi kahani…?', options: ['Daraati hai', 'Sikh bhi deti hai', 'Ubaati hai'], a: 1, hint: 'Seekh wali!' },
        { vis: '👫', q: 'Kahani sunkar…?', options: ['Bhool jao', 'Doston ko sunao', 'Phaad do'], a: 1, hint: 'Baanto khushi!' }
      ]
    }
  },
  {
    id: 'c3ve18', n: 18, title: 'हम अनेक किंतु एक', emoji: '🤝', topic: 'Anekta mein ekta',
    c1: '#ff9933', c2: '#138808',
    desc: 'Bhasha anek, vesh anek — par hum sab Bharatiya! NCERT Veena kaksha 3 path 18 par muft Hindi lesson aur quiz game.',
    learn: {
      story: 'Kashmir se Kanyakumari — topi, pagdi, dhoti, jeans! Vesh-bhasha alag, dil ek. Hum anek, kintu EK! 🤝🇮🇳',
      intro: 'Bharat mein anek bhasha, vesh, tyohar hain — phir bhi hum ek hain.',
      points: [
        'Anek bhashaen, ek desh.',
        'Har tyohar sabka tyohar.',
        'Miljul kar rehna seekho.',
        'Ekta mein hi shakti hai.'
      ],
      words: ['अनेक', 'एक', 'एकता', 'भाषा', 'त्योहार', 'मिलजुल']
    },
    game: {
      type: 'quiz', title: 'एकता Quiz', instructions: 'Ekta ke geet mein uttar chuno.',
      questions: [
        { vis: '🗣️🗣️', q: 'Bharat mein bhashaen…?', options: ['Ek', 'Anek', 'Zero'], a: 1, hint: 'Anek bhashaen!' },
        { vis: '🎉🎉', q: 'Tyoharon par hum…?', options: ['Ladte hain', 'Milkar manate hain', 'Chhupte hain'], a: 1, hint: 'Miljul kar!' },
        { vis: '👬', q: 'Dost chahe koi bhi ho…?', options: ['Bhed karo', 'Prem karo', 'Bhool jao'], a: 1, hint: 'Prem hi prem!' },
        { vis: '🇮🇳', q: 'Hum sab hain…?', options: ['Alag-alag desh', 'Ek Bharatiya', 'Ajnabi'], a: 1, hint: 'Ek Bharat!' },
        { vis: '💪👫', q: 'Shakti hai…?', options: ['Ladai mein', 'Ekta mein', 'Akelepan mein'], a: 1, hint: 'Ekta shakti!' },
        { vis: '🌈', q: 'Anek rang milkar banate hain…?', options: ['Kala', 'Indradhanush', 'Safed'], a: 1, hint: 'Indradhanush!' }
      ]
    }
  }
];
window.CHAPTERS = window.VE3_CHAPTERS;
window.CHAPTER_SUBJECT = 'Class 3 Hindi';
