/* Brain Busters — general knowledge trivia */
GamePortal.register('trivia', {
  title: 'Brain Busters',
  emoji: '🧠',
  cat: 'knowledge',
  c1: '#3a0ca3',
  c2: '#4cc9f0',
  tags: ['trivia', 'quiz', 'knowledge', 'science', 'facts', 'questions', 'education'],
  rating: 4.8,
  plays: '3.1M',
  badge: 'Quiz',
  controls: 'Pick the right answer before the clock runs out',
  desc: 'Sixty seconds of mixed questions across science, nature, space and the world. Fast answers earn time bonuses.',
  play: function (stage, api) {
    var Q = [
      { c: 'Nature', q: 'How many legs does a spider have?', a: ['6', '8', '10', '4'], k: 1 },
      { c: 'Space', q: 'Which planet is known as the Red Planet?', a: ['Venus', 'Jupiter', 'Mars', 'Saturn'], k: 2 },
      { c: 'Animals', q: 'What is a baby dog called?', a: ['Kitten', 'Puppy', 'Calf', 'Chick'], k: 1 },
      { c: 'Science', q: 'What gas do plants breathe in?', a: ['Oxygen', 'Helium', 'Carbon dioxide', 'Nitrogen'], k: 2 },
      { c: 'Body', q: 'How many bones are in an adult human body?', a: ['106', '186', '206', '306'], k: 2 },
      { c: 'Geography', q: 'What is the largest ocean on Earth?', a: ['Atlantic', 'Indian', 'Arctic', 'Pacific'], k: 3 },
      { c: 'Space', q: 'What is the closest star to Earth?', a: ['The Sun', 'Sirius', 'Polaris', 'Alpha Centauri'], k: 0 },
      { c: 'Animals', q: 'Which animal is known as the ship of the desert?', a: ['Horse', 'Camel', 'Donkey', 'Llama'], k: 1 },
      { c: 'Science', q: 'Water freezes at what temperature Celsius?', a: ['0°C', '10°C', '32°C', '-10°C'], k: 0 },
      { c: 'Food', q: 'Which fruit is traditionally used to make guacamole?', a: ['Tomato', 'Avocado', 'Cucumber', 'Lime'], k: 1 },
      { c: 'Geography', q: 'Which is the longest river in the world?', a: ['Amazon', 'Nile', 'Yangtze', 'Danube'], k: 1 },
      { c: 'Nature', q: 'What is the largest land animal?', a: ['Rhinoceros', 'Hippopotamus', 'African elephant', 'Giraffe'], k: 2 },
      { c: 'Science', q: 'What force pulls objects toward the ground?', a: ['Friction', 'Magnetism', 'Gravity', 'Inertia'], k: 2 },
      { c: 'Space', q: 'How many moons does Earth have?', a: ['0', '1', '2', '4'], k: 1 },
      { c: 'Body', q: 'What organ pumps blood around the body?', a: ['Lungs', 'Liver', 'Brain', 'Heart'], k: 3 },
      { c: 'Animals', q: 'Which is the fastest land animal?', a: ['Cheetah', 'Lion', 'Horse', 'Gazelle'], k: 0 },
      { c: 'Science', q: 'What is H₂O commonly known as?', a: ['Salt', 'Water', 'Sugar', 'Oxygen'], k: 1 },
      { c: 'Geography', q: 'Which country has the most people?', a: ['USA', 'India', 'China', 'Indonesia'], k: 2 },
      { c: 'Food', q: 'Which of these is a dairy product?', a: ['Bread', 'Cheese', 'Pasta', 'Rice'], k: 1 },
      { c: 'Nature', q: 'What do bees collect from flowers?', a: ['Sand', 'Nectar', 'Sap', 'Pollen dust only'], k: 1 },
      { c: 'Science', q: 'Which instrument is used to see very small things?', a: ['Telescope', 'Microscope', 'Barometer', 'Thermostat'], k: 1 },
      { c: 'Space', q: 'Which planet is famous for its rings?', a: ['Mars', 'Mercury', 'Saturn', 'Neptune'], k: 2 },
      { c: 'History', q: 'Who is credited with discovering gravity with an apple?', a: ['Newton', 'Einstein', 'Galileo', 'Tesla'], k: 0 },
      { c: 'Body', q: 'How many senses do humans famously have?', a: ['3', '5', '7', '9'], k: 1 },
      { c: 'Animals', q: 'What is the largest fish in the sea?', a: ['Great white shark', 'Whale shark', 'Tuna', 'Marlin'], k: 1 },
      { c: 'Geography', q: 'Which continent is the Sahara Desert on?', a: ['Asia', 'Africa', 'Australia', 'South America'], k: 1 },
      { c: 'Science', q: 'What colour does a mixture of red and blue make?', a: ['Green', 'Purple', 'Orange', 'Brown'], k: 1 },
      { c: 'Food', q: 'Which grain is used to make sushi rice?', a: ['Wheat', 'Barley', 'Rice', 'Oats'], k: 2 },
      { c: 'Nature', q: 'What is a group of wolves called?', a: ['Flock', 'Pack', 'Swarm', 'Herd'], k: 1 },
      { c: 'Space', q: 'What protects Earth from the Sun’s radiation?', a: ['The Moon', 'Clouds', 'The ozone layer', 'Comets'], k: 2 },
      { c: 'Body', q: 'What do we use to breathe?', a: ['Stomach', 'Lungs', 'Kidneys', 'Skin'], k: 1 },
      { c: 'Animals', q: 'Which animal lives in Antarctica?', a: ['Penguin', 'Polar bear', 'Walrus', 'Seal fish'], k: 0 },
      { c: 'Science', q: 'Sound travels fastest through…', a: ['Vacuum', 'Air', 'Water', 'Steel'], k: 3 },
      { c: 'Geography', q: 'What is the capital of Japan?', a: ['Kyoto', 'Osaka', 'Tokyo', 'Sapporo'], k: 2 },
      { c: 'Maths', q: 'Which shape has three sides?', a: ['Square', 'Triangle', 'Pentagon', 'Circle'], k: 1 },
      { c: 'Nature', q: 'Butterflies taste with their…', a: ['Wings', 'Feet', 'Antennae', 'Eyes'], k: 1 },
      { c: 'Science', q: 'Which metal is liquid at room temperature?', a: ['Lead', 'Mercury', 'Iron', 'Copper'], k: 1 },
      { c: 'Space', q: 'How long does light from the Sun take to reach Earth?', a: ['8 seconds', '8 minutes', '8 hours', '8 days'], k: 1 },
      { c: 'Food', q: 'Which spice gives curry its yellow colour?', a: ['Paprika', 'Turmeric', 'Cinnamon', 'Basil'], k: 1 },
      { c: 'Body', q: 'How many chambers does a human heart have?', a: ['2', '3', '4', '5'], k: 2 }
    ];

    var LEVELS = [
      { goal: 8 },
      { goal: 10 },
      { goal: 12 },
      { goal: 14 },
      { goal: 16 }
    ];
    var key = 'ph_trivia_lvl';
    var unlocked = Math.min(LEVELS.length, Math.max(1, GamePortal.store.get(key, 1)));
    var level = 1;
    var ROUND = 60;
    var timeLeft = ROUND, dead = false, lock = false, tick = null, asked = [], qi = 0, right = 0, wrong = 0;

    var wrap = document.createElement('div');
    wrap.className = 'quiz-wrap';
    wrap.dataset.level = '1';
    wrap.innerHTML =
      '<div class="lv-strip" id="tr-levels"><span class="lv-strip-label">Level</span></div>' +
      '<div class="lv-goal" id="tr-goal"></div>' +
      '<div class="quiz-top">' +
        '<span class="math-stat">Right <b id="b-ok">0</b></span>' +
        '<span class="math-stat">Wrong <b id="b-no">0</b></span>' +
        '<span class="math-stat">Time <b id="b-time">60</b>s</span>' +
      '</div>' +
      '<div class="timer-bar" style="width:min(520px,94%)"><div class="timer-fill" id="b-fill"></div></div>' +
      '<div class="q-card"><div class="q-kicker" id="b-cat">Science</div><div class="q-text" id="b-q"></div></div>' +
      '<div class="ans-grid one" id="b-ans"></div>';
    stage.appendChild(wrap);

    var elQ = wrap.querySelector('#b-q');
    var elCat = wrap.querySelector('#b-cat');
    var elAns = wrap.querySelector('#b-ans');
    var elOk = wrap.querySelector('#b-ok');
    var elNo = wrap.querySelector('#b-no');
    var elTime = wrap.querySelector('#b-time');
    var elFill = wrap.querySelector('#b-fill');
    var elGoal = wrap.querySelector('#tr-goal');
    var elLevels = wrap.querySelector('#tr-levels');

    function shuffle(a) {
      for (var i = a.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var t = a[i]; a[i] = a[j]; a[j] = t;
      }
      return a;
    }

    function cfg() { return LEVELS[level - 1]; }
    function renderLevels() {
      var html = '<span class="lv-strip-label">Level</span>';
      for (var n = 1; n <= LEVELS.length; n++) {
        var cls = 'lv-btn' + (n === level ? ' on' : '') + (n > unlocked ? ' locked' : '');
        html += '<button type="button" class="' + cls + '" data-lv="' + n + '"' + (n > unlocked ? ' disabled' : '') + '>' + n + '</button>';
      }
      elLevels.innerHTML = html;
      elGoal.textContent = 'Answer ' + cfg().goal + ' correctly to clear level ' + level + '!';
      wrap.dataset.level = String(level);
    }
    function levelClear() {
      dead = true;
      clearInterval(tick);
      if (level > unlocked) { unlocked = level; GamePortal.store.set(key, unlocked); }
      if (level >= LEVELS.length) {
        api.win({
          title: 'Brain Buster Champ! 🧠',
          text: 'All ' + LEVELS.length + ' levels cleared — ' + api.score + ' points!'
        });
        return;
      }
      api.sfx('win');
      api.overlay({
        title: 'Level ' + level + ' complete!',
        text: 'Next: answer ' + LEVELS[level].goal + ' correctly to clear level ' + (level + 1) + '.',
        score: api.score,
        best: api.getBest(),
        onAgain: function () { api.clearOverlay(); level++; startLevel(level); }
      });
    }
    function startLevel(n) {
      level = Math.max(1, Math.min(LEVELS.length, n));
      api.clearOverlay();
      api.setScore(0);
      timeLeft = ROUND; dead = false; lock = false;
      asked = []; qi = 0; right = 0; wrong = 0;
      clearInterval(tick);
      elOk.textContent = '0';
      elNo.textContent = '0';
      elTime.textContent = String(ROUND);
      elFill.style.width = '100%';
      renderLevels();
      next();
      tick = setInterval(loop, 100);
    }

    function next() {
      lock = false;
      if (!asked.length) asked = Q.slice();
      var idx = Math.floor(Math.random() * asked.length);
      var q = asked.splice(idx, 1)[0];
      qi++;
      elCat.textContent = q.c;
      elQ.textContent = q.q;
      var opts = q.a.map(function (t, i) { return { t: t, k: i === q.k }; });
      elAns.innerHTML = shuffle(opts).map(function (o) {
        return '<button class="ans-btn" data-ok="' + (o.k ? 1 : 0) + '">' + o.t + '</button>';
      }).join('');
    }

    function choose(btn) {
      if (lock || dead) return;
      lock = true;
      var ok = btn.dataset.ok === '1';
      var btns = elAns.querySelectorAll('.ans-btn');
      btns.forEach(function (b) {
        b.disabled = true;
        if (b.dataset.ok === '1') b.classList.add('right');
      });
      if (ok) {
        right++;
        timeLeft = Math.min(ROUND, timeLeft + 3);
        api.addScore(100 + Math.max(0, Math.round(timeLeft)));
        elOk.textContent = right;
        api.sfx('good');
        btn.classList.add('right');
        if (right >= cfg().goal) { levelClear(); return; }
      } else {
        wrong++;
        btn.classList.add('wrong');
        elNo.textContent = wrong;
        api.sfx('bad');
      }
      setTimeout(function () { if (!dead) next(); }, 650);
    }

    function loop() {
      if (dead) return;
      timeLeft -= 0.1;
      if (timeLeft <= 0) { timeLeft = 0; elTime.textContent = '0'; elFill.style.width = '0%'; end(); return; }
      elTime.textContent = Math.ceil(timeLeft);
      elFill.style.width = (timeLeft / ROUND * 100) + '%';
    }

    function end() {
      if (dead) return;
      dead = true;
      clearInterval(tick);
      api.gameOver({
        title: "Time's up!",
        text: right + ' right · ' + wrong + ' wrong · you answered ' + qi + ' questions.',
        onAgain: function () { api.clearOverlay(); startLevel(level); }
      });
    }

    elAns.addEventListener('click', function (e) {
      var b = e.target.closest('.ans-btn');
      if (b) choose(b);
    });
    elLevels.addEventListener('click', function (e) {
      var b = e.target.closest ? e.target.closest('.lv-btn') : null;
      if (!b || b.disabled) return;
      var n = parseInt(b.getAttribute('data-lv'), 10);
      if (n !== level && n <= unlocked) { api.sfx('click'); startLevel(n); }
    });

    startLevel(1);

    return function () { dead = true; clearInterval(tick); };
  }
});
