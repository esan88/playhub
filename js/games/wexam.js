/* World Exam Challenge — flagship timed mock exam for kids.
   5 exam tiers · 4 rounds x 4 questions = 16 per exam · pass with 10 correct.
   Rounds: 🧮 Number World · 🔬 Science Lab · 📖 Word Wizard · 🌍 World Around Us */
GamePortal.register('wexam', {
  title: 'World Exam Challenge',
  emoji: '🏅',
  cat: 'olympiad',
  c1: '#7c3aed',
  c2: '#fbbf24',
  tags: ['exam', 'world', 'competition', 'quiz', 'test', 'olympiad', 'math', 'science', 'english', 'gk', 'knowledge', 'challenge', 'kids', 'ages'],
  rating: 4.9,
  plays: '0.5M',
  badge: 'Exam',
  controls: 'Click the right answer before the timer runs out · clear all 5 exam levels',
  desc: 'A friendly world exam for kids up to age 10! Four fun rounds — Number World, Science Lab, Word Wizard and World Around Us — with timed questions, streaks, medals, a world rank and a certificate. Warm up from Junior to the World Final!',
  play: function (stage, api) {
    var ROUNDS = ['🧮 Number World', '🔬 Science Lab', '📖 Word Wizard', '🌍 World Around Us'];
    var LEVELS = [
      { name: 'Junior Explorer (ages 5–7)', time: 15 },
      { name: 'Junior Champion (ages 6–8)', time: 15 },
      { name: 'Senior Explorer (ages 8–9)', time: 12 },
      { name: 'Senior Champion (ages 9–10)', time: 12 },
      { name: 'World Final (age 10)', time: 10 }
    ];
    var PASS = 10;
    var TOTAL = 16;

    /* ---------- question bank: 5 exams x 4 rounds x 4 questions ---------- */
    var BANK = [
      [ /* ---- 1. Junior Explorer (ages 5–7) ---- */
        [
          { q: 'What is 2 + 3?', a: ['4', '5', '6', '7'], k: 1 },
          { q: 'What is 4 + 4?', a: ['6', '7', '8', '9'], k: 2 },
          { q: 'How many sides does a triangle have?', a: ['3', '4', '5', '6'], k: 0 },
          { q: 'What is 10 - 4?', a: ['5', '6', '7', '8'], k: 1 }
        ],
        [
          { q: 'How many legs does a spider have?', a: ['6', '8', '10', '12'], k: 1 },
          { q: 'Which animal says “moo”?', a: ['Cow', 'Sheep', 'Duck', 'Cat'], k: 0 },
          { q: 'What is a baby dog called?', a: ['Kitten', 'Puppy', 'Chick', 'Calf'], k: 1 },
          { q: 'Which of these is a fruit?', a: ['Carrot', 'Potato', 'Apple', 'Bread'], k: 2 }
        ],
        [
          { q: 'Which word rhymes with “cat”?', a: ['Dog', 'Hat', 'Sun', 'Bed'], k: 1 },
          { q: 'Which word is the opposite of “big”?', a: ['Huge', 'Small', 'Tall', 'Wide'], k: 1 },
          { q: 'Which of these is a noun (a naming word)?', a: ['Run', 'Jump', 'Dog', 'Fast'], k: 2 },
          { q: 'What is the plural of “dog”?', a: ['Dogs', 'Doges', 'Dogies', 'Doggies'], k: 0 }
        ],
        [
          { q: 'What colour do you get when you mix red and white?', a: ['Orange', 'Purple', 'Pink', 'Brown'], k: 2 },
          { q: 'How many days are there in one week?', a: ['5', '6', '7', '8'], k: 2 },
          { q: 'Which of these is a pet?', a: ['Lion', 'Tiger', 'Hamster', 'Shark'], k: 2 },
          { q: 'What do we use to see?', a: ['Ears', 'Eyes', 'Nose', 'Hands'], k: 1 }
        ]
      ],
      [ /* ---- 2. Junior Champion (ages 6–8) ---- */
        [
          { q: 'What is 7 + 5?', a: ['10', '11', '12', '13'], k: 2 },
          { q: 'What is 15 - 6?', a: ['7', '8', '9', '10'], k: 2 },
          { q: 'What is 3 × 4?', a: ['7', '10', '12', '14'], k: 2 },
          { q: 'What is half of 20?', a: ['2', '5', '10', '20'], k: 2 }
        ],
        [
          { q: 'Which planet do we live on?', a: ['Mars', 'Earth', 'Venus', 'Jupiter'], k: 1 },
          { q: 'What gas do people need to breathe?', a: ['Oxygen', 'Helium', 'Neon', 'Smoke'], k: 0 },
          { q: 'Which part of your body helps you hear?', a: ['Eyes', 'Ears', 'Nose', 'Tongue'], k: 1 },
          { q: 'Water turns into ice when it gets…', a: ['Hot', 'Cold', 'Bright', 'Loud'], k: 1 }
        ],
        [
          { q: 'Which of these words is spelled correctly?', a: ['Becaus', 'Because', 'Becose', 'Becues'], k: 1 },
          { q: 'What is the plural of “cat”?', a: ['Cats', 'Cates', 'Caties', 'Catses'], k: 0 },
          { q: 'Which of these words is a verb?', a: ['Sing', 'Blue', 'Softly', 'Chair'], k: 0 },
          { q: 'Which word is the opposite of “happy”?', a: ['Glad', 'Joyful', 'Sad', 'Cheerful'], k: 2 }
        ],
        [
          { q: 'What is the capital of France?', a: ['Rome', 'Paris', 'Madrid', 'Berlin'], k: 1 },
          { q: 'How many months are there in a year?', a: ['10', '11', '12', '13'], k: 2 },
          { q: 'Which is the biggest planet in our solar system?', a: ['Earth', 'Jupiter', 'Mars', 'Venus'], k: 1 },
          { q: 'Which animal is known as “man’s best friend”?', a: ['Cat', 'Dog', 'Horse', 'Rabbit'], k: 1 }
        ]
      ],
      [ /* ---- 3. Senior Explorer (ages 8–9) ---- */
        [
          { q: 'What is 6 × 7?', a: ['36', '42', '48', '56'], k: 1 },
          { q: 'What is 100 - 37?', a: ['53', '63', '67', '73'], k: 1 },
          { q: 'What is 144 ÷ 12?', a: ['10', '11', '12', '14'], k: 2 },
          { q: 'What is 25 + 38?', a: ['53', '63', '73', '83'], k: 1 }
        ],
        [
          { q: 'Which gas do plants take in to make their food?', a: ['Oxygen', 'Carbon dioxide', 'Nitrogen', 'Helium'], k: 1 },
          { q: 'What is at the centre of our solar system?', a: ['The Sun', 'Earth', 'The Moon', 'Mars'], k: 0 },
          { q: 'Which force pulls objects toward the Earth?', a: ['Gravity', 'Friction', 'Magnetism', 'Steam'], k: 0 },
          { q: 'Ice is which state of matter?', a: ['Solid', 'Liquid', 'Gas', 'Plasma'], k: 0 }
        ],
        [
          { q: 'Which word is an adjective?', a: ['Quickly', 'Beautiful', 'Running', 'Table'], k: 1 },
          { q: 'What is the past tense of “go”?', a: ['Goed', 'Gone', 'Went', 'Going'], k: 2 },
          { q: 'What is the plural of “leaf”?', a: ['Leafs', 'Leaves', 'Leafes', 'Leafe'], k: 1 },
          { q: 'Which of these is a compound word?', a: ['Sunshine', 'Sunny', 'Sun', 'Shine'], k: 0 }
        ],
        [
          { q: 'Which is the largest ocean on Earth?', a: ['Atlantic', 'Pacific', 'Indian', 'Arctic'], k: 1 },
          { q: 'Which continent is the Sahara Desert on?', a: ['Asia', 'Africa', 'South America', 'Australia'], k: 1 },
          { q: 'Which country is home to the kangaroo?', a: ['India', 'Australia', 'Brazil', 'Egypt'], k: 1 },
          { q: 'What is the tallest mountain in the world?', a: ['K2', 'Mount Everest', 'Kangchenjunga', 'Mont Blanc'], k: 1 }
        ]
      ],
      [ /* ---- 4. Senior Champion (ages 9–10) ---- */
        [
          { q: 'What is 12 × 12?', a: ['124', '144', '142', '132'], k: 1 },
          { q: 'What is 3/4 of 20?', a: ['12', '15', '16', '18'], k: 1 },
          { q: 'What is 250 ÷ 5?', a: ['40', '45', '50', '60'], k: 2 },
          { q: 'What is 19 + 27?', a: ['36', '46', '56', '47'], k: 1 }
        ],
        [
          { q: 'What is the chemical symbol for gold?', a: ['Gd', 'Go', 'Au', 'Ag'], k: 2 },
          { q: 'Which planet is famous for its rings?', a: ['Mars', 'Saturn', 'Mercury', 'Venus'], k: 1 },
          { q: 'At what temperature does water boil in Celsius?', a: ['50°C', '90°C', '100°C', '120°C'], k: 2 },
          { q: 'Which of these is a mammal?', a: ['Dolphin', 'Shark', 'Turtle', 'Crocodile'], k: 0 }
        ],
        [
          { q: 'Which word is the opposite of “expand”?', a: ['Shrink', 'Grow', 'Stretch', 'Widen'], k: 0 },
          { q: 'What is the plural of “child”?', a: ['Childs', 'Children', 'Childes', 'Childrens'], k: 1 },
          { q: 'Which mark ends a question?', a: ['Period', 'Comma', 'Question mark', 'Colon'], k: 2 },
          { q: 'Which of these words is an adverb?', a: ['Quick', 'Quickly', 'Quicker', 'Quickness'], k: 1 }
        ],
        [
          { q: 'Which is the smallest country in the world by area?', a: ['Monaco', 'Vatican City', 'San Marino', 'Malta'], k: 1 },
          { q: 'Which line splits Earth into the Northern and Southern hemispheres?', a: ['The Equator', 'The Prime Meridian', 'The Tropic of Cancer', 'The International Date Line'], k: 0 },
          { q: 'Which gas makes up most of Earth’s atmosphere?', a: ['Oxygen', 'Carbon dioxide', 'Nitrogen', 'Hydrogen'], k: 2 },
          { q: 'Who wrote the play “Romeo and Juliet”?', a: ['Charles Dickens', 'William Shakespeare', 'Mark Twain', 'Jane Austen'], k: 1 }
        ]
      ],
      [ /* ---- 5. World Final (age 10) ---- */
        [
          { q: 'What is 15 × 14?', a: ['190', '200', '210', '220'], k: 2 },
          { q: 'What is 144 ÷ 16?', a: ['7', '8', '9', '12'], k: 2 },
          { q: 'What is 25% of 80?', a: ['15', '20', '25', '40'], k: 1 },
          { q: 'What is 7 squared?', a: ['42', '49', '56', '63'], k: 1 }
        ],
        [
          { q: 'Which part of a cell holds the DNA?', a: ['Nucleus', 'Cell membrane', 'Cytoplasm', 'Cell wall'], k: 0 },
          { q: 'What is the chemical symbol for sodium?', a: ['So', 'Sd', 'Na', 'N'], k: 2 },
          { q: 'Which of these is a poor conductor of electricity?', a: ['Copper', 'Rubber', 'Iron', 'Aluminium'], k: 1 },
          { q: 'How many bones are in an adult human body?', a: ['106', '186', '206', '306'], k: 2 }
        ],
        [
          { q: 'Which word is a synonym for “difficult”?', a: ['Challenging', 'Simple', 'Easy', 'Careless'], k: 0 },
          { q: 'What is the comparative form of “good”?', a: ['Gooder', 'More good', 'Better', 'Best'], k: 2 },
          { q: 'Which sentence is grammatically correct?', a: ['He don’t have a book.', 'He doesn’t have a book.', 'He not have a book.', 'He doesn’t having a book.'], k: 1 },
          { q: 'Which word is an adverb in “The fox ran quickly”?', a: ['The', 'Fox', 'Ran', 'Quickly'], k: 3 }
        ],
        [
          { q: 'What is the capital of Australia?', a: ['Sydney', 'Melbourne', 'Canberra', 'Perth'], k: 2 },
          { q: 'Which country is called “the Land of the Rising Sun”?', a: ['China', 'Japan', 'Thailand', 'South Korea'], k: 1 },
          { q: 'Which is the largest island in the world?', a: ['Greenland', 'Madagascar', 'Borneo', 'New Guinea'], k: 0 },
          { q: 'Which continent has the most countries?', a: ['Africa', 'Asia', 'Europe', 'South America'], k: 0 }
        ]
      ]
    ];

    var key = 'ph_wexam_lvl';
    var unlocked = Math.min(LEVELS.length, Math.max(1, GamePortal.store.get(key, 1)));
    var level = 1;

    var wrap = document.createElement('div');
    wrap.className = 'quiz-wrap';
    wrap.dataset.level = '1';
    wrap.dataset.q = '0';
    wrap.dataset.correct = '0';
    wrap.dataset.round = '0';
    wrap.dataset.streak = '0';
    wrap.innerHTML =
      '<div class="lv-strip" id="we-levels"><span class="lv-strip-label">Level</span></div>' +
      '<div class="lv-goal" id="we-goal"></div>' +
      '<div class="math-top">' +
        '<span class="math-stat" id="we-prog">Round 1/4 · Question 1/16</span>' +
        '<span class="math-stat" id="we-streak">🔥 Streak 0</span>' +
      '</div>' +
      '<div class="timer-bar"><div class="timer-fill" id="we-time"></div></div>' +
      '<div class="q-card">' +
        '<div class="q-kicker" id="we-round">🧮 Number World</div>' +
        '<div class="q-text" id="we-q"></div>' +
      '</div>' +
      '<div class="ans-grid" id="we-opts"></div>' +
      '<div class="math-fb" id="we-fb"></div>';
    stage.appendChild(wrap);

    var elLevels = wrap.querySelector('#we-levels');
    var elGoal = wrap.querySelector('#we-goal');
    var elProg = wrap.querySelector('#we-prog');
    var elStreak = wrap.querySelector('#we-streak');
    var elTime = wrap.querySelector('#we-time');
    var elRound = wrap.querySelector('#we-round');
    var elQ = wrap.querySelector('#we-q');
    var elOpts = wrap.querySelector('#we-opts');
    var elFb = wrap.querySelector('#we-fb');

    var deck = [];
    var qi = 0, correct = 0, streak = 0, score = 0;
    var TIME = LEVELS[0].time, timeLeft = TIME;
    var dead = false, lock = false;
    var tick = null, advTO = null;

    function shuffle(a) {
      for (var i = a.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var t = a[i]; a[i] = a[j]; a[j] = t;
      }
      return a;
    }
    function cfg() { return LEVELS[level - 1]; }
    function medalOf(n) { return n >= 15 ? '🥇' : (n >= 13 ? '🥈' : '🥉'); }

    function renderLevels() {
      var html = '<span class="lv-strip-label">Level</span>';
      for (var n = 1; n <= LEVELS.length; n++) {
        var cls = 'lv-btn' + (n === level ? ' on' : '') + (n > unlocked ? ' locked' : '');
        html += '<button type="button" class="' + cls + '" data-lv="' + n + '"' + (n > unlocked ? ' disabled' : '') + '>' + n + '</button>';
      }
      elLevels.innerHTML = html;
      elGoal.textContent = cfg().name + ' — answer 10 of 16 correctly to pass!';
      wrap.dataset.level = String(level);
    }

    function hud() {
      elProg.textContent = 'Round ' + (Math.floor(qi / 4) + 1) + '/4 · Question ' + (qi + 1) + '/' + TOTAL;
      elStreak.textContent = '🔥 Streak ' + streak;
      wrap.dataset.q = String(qi);
      wrap.dataset.correct = String(correct);
      wrap.dataset.round = String(Math.floor(qi / 4));
      wrap.dataset.streak = String(streak);
    }

    function stopTimer() {
      if (tick) { clearInterval(tick); tick = null; }
    }
    function startTimer() {
      stopTimer();
      timeLeft = TIME;
      elTime.style.width = '100%';
      tick = setInterval(function () {
        if (dead) { stopTimer(); return; }
        timeLeft -= 0.1;
        if (timeLeft <= 0) {
          timeLeft = 0;
          elTime.style.width = '0%';
          stopTimer();
          onTimeout();
          return;
        }
        elTime.style.width = (timeLeft / TIME) * 100 + '%';
      }, 100);
    }

    function buildDeck() {
      deck = [];
      for (var r = 0; r < 4; r++) {
        var round = BANK[level - 1][r].slice();
        shuffle(round);
        for (var i = 0; i < round.length; i++) deck.push({ q: round[i], r: r });
      }
    }

    function rightAnswer() {
      var btns = elOpts.querySelectorAll('.ans-btn');
      for (var i = 0; i < btns.length; i++) {
        if (btns[i].getAttribute('data-correct') === '1') return btns[i].textContent;
      }
      return '';
    }
    function lockButtons() {
      var btns = elOpts.querySelectorAll('.ans-btn');
      for (var i = 0; i < btns.length; i++) {
        btns[i].disabled = true;
        if (btns[i].getAttribute('data-correct') === '1') btns[i].classList.add('right');
      }
    }

    function showQuestion() {
      lock = false;
      var item = deck[qi];
      var q = item.q;
      elRound.textContent = ROUNDS[item.r];
      elQ.textContent = q.q;
      elFb.textContent = '';
      elFb.className = 'math-fb';
      var opts = [];
      for (var i = 0; i < q.a.length; i++) opts.push({ t: q.a[i], ok: i === q.k });
      shuffle(opts);
      var html = '';
      for (var j = 0; j < opts.length; j++) {
        html += '<button type="button" class="ans-btn" data-i="' + j + '"' +
          (opts[j].ok ? ' data-correct="1"' : '') + '>' + opts[j].t + '</button>';
      }
      elOpts.innerHTML = html;
      hud();
      startTimer();
    }

    function scheduleNext(ms) {
      if (advTO) clearTimeout(advTO);
      advTO = setTimeout(function () {
        advTO = null;
        if (dead) return;
        qi++;
        if (qi >= TOTAL) { endExam(); return; }
        showQuestion();
      }, ms);
    }

    function answer(btn) {
      if (lock || dead) return;
      lock = true;
      stopTimer();
      var ok = btn.getAttribute('data-correct') === '1';
      lockButtons();
      if (ok) {
        correct++;
        streak++;
        var pts = 10 + (streak >= 3 ? 5 : 0);
        score += pts;
        api.setScore(score);
        api.sfx('good');
        elFb.textContent = '✓ +' + pts + (streak >= 3 ? ' streak bonus!' : ' correct!');
        elFb.className = 'math-fb ok';
      } else {
        btn.classList.add('wrong');
        streak = 0;
        api.sfx('bad');
        elFb.textContent = '✗ It was ' + rightAnswer();
        elFb.className = 'math-fb no';
      }
      hud();
      scheduleNext(800);
    }

    function onTimeout() {
      if (lock || dead) return;
      lock = true;
      stopTimer();
      streak = 0;
      api.sfx('bad');
      lockButtons();
      elFb.textContent = '⏰ Time’s up! It was ' + rightAnswer();
      elFb.className = 'math-fb no';
      hud();
      scheduleNext(900);
    }

    function endExam() {
      dead = true;
      stopTimer();
      if (correct >= PASS) levelClear();
      else failExam();
    }

    function levelClear() {
      if (level > unlocked) { unlocked = level; GamePortal.store.set(key, unlocked); }
      api.sfx('win');
      if (level >= LEVELS.length) {
        api.win({
          emoji: '🏆',
          title: 'World Exam Champion!',
          text: 'You conquered all 5 exams — ' + correct + '/' + TOTAL + ' on the World Final!'
        });
        return;
      }
      var m = medalOf(correct);
      var flavor = m === '🥇' ? 'Gold medal — superb!'
        : (m === '🥈' ? 'Silver medal — great work!' : 'Bronze medal — well done!');
      api.overlay({
        emoji: m,
        title: 'Level ' + level + ' complete!',
        text: m + ' You answered ' + correct + '/' + TOTAL + ' correctly — ' + flavor +
          ' Next: ' + LEVELS[level].name + ' — answer 10 of 16 correctly to pass!',
        score: api.score,
        best: api.getBest(),
        onAgain: function () { api.clearOverlay(); level++; startLevel(level); }
      });
    }

    function failExam() {
      api.gameOver({
        title: '📖 Exam finished!',
        text: 'You answered ' + correct + ' of 16 correctly — need ' + PASS + '. Try again!',
        onAgain: function () { api.clearOverlay(); startLevel(level); }
      });
    }

    function startLevel(n) {
      level = Math.max(1, Math.min(LEVELS.length, n));
      api.clearOverlay();
      api.setScore(0);
      dead = false;
      lock = false;
      qi = 0; correct = 0; streak = 0; score = 0;
      TIME = cfg().time;
      timeLeft = TIME;
      stopTimer();
      if (advTO) { clearTimeout(advTO); advTO = null; }
      buildDeck();
      renderLevels();
      showQuestion();
    }

    function onOpts(e) {
      e.stopPropagation();
      var b = e.target.closest ? e.target.closest('.ans-btn') : null;
      if (b) answer(b);
    }
    function onLevels(e) {
      e.stopPropagation();
      var b = e.target.closest ? e.target.closest('.lv-btn') : null;
      if (!b || b.disabled || b.classList.contains('locked')) return;
      var n = parseInt(b.getAttribute('data-lv'), 10);
      if (n !== level && n <= unlocked) { api.sfx('click'); startLevel(n); }
    }
    /* the root box carries dataset.q — stop clicks inside the exam from
       bubbling to the portal's document-level [data-q] search-chip handler */
    function onWrap(e) { e.stopPropagation(); }
    function onKey(e) {
      if (dead || lock) return;
      var t = e.target;
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA')) return;
      if (e.key !== '1' && e.key !== '2' && e.key !== '3' && e.key !== '4') return;
      var btns = elOpts.querySelectorAll('.ans-btn');
      var b = btns[parseInt(e.key, 10) - 1];
      if (!b) return;
      e.preventDefault();
      answer(b);
    }

    wrap.addEventListener('click', onWrap);
    elOpts.addEventListener('click', onOpts);
    elLevels.addEventListener('click', onLevels);
    document.addEventListener('keydown', onKey);

    startLevel(1);

    return function () {
      dead = true;
      lock = true;
      stopTimer();
      if (advTO) { clearTimeout(advTO); advTO = null; }
      wrap.removeEventListener('click', onWrap);
      elOpts.removeEventListener('click', onOpts);
      elLevels.removeEventListener('click', onLevels);
      document.removeEventListener('keydown', onKey);
    };
  }
});
