/* Capital Quest — match every country to its capital city.
   5 levels x 8 questions, pass with 6 of 8, 12s (L1-2) / 10s (L3-5) per question. */
GamePortal.register('capital', {
  title: 'Capital Quest',
  emoji: '🗺️',
  cat: 'knowledge',
  c1: '#059669',
  c2: '#fbbf24',
  tags: ['capitals', 'countries', 'world', 'geography', 'gk', 'knowledge', 'map', 'quiz', 'travel', 'kids', 'education'],
  rating: 4.8,
  plays: '0.7M',
  badge: 'World',
  controls: 'Pick the capital city before the timer runs out',
  desc: 'Travel the world and name every capital! Match each country to its capital city, keep your streak alive and journey from famous capitals to the tricky World Final — five levels for ages 5 to 10.',
  play: function (stage, api) {
    var BANK = [
      [
        { c: 'France', p: 'Paris', e: '🇫🇷' },
        { c: 'Japan', p: 'Tokyo', e: '🇯🇵' },
        { c: 'Egypt', p: 'Cairo', e: '🇪🇬' },
        { c: 'Italy', p: 'Rome', e: '🇮🇹' },
        { c: 'Spain', p: 'Madrid', e: '🇪🇸' },
        { c: 'Germany', p: 'Berlin', e: '🇩🇪' },
        { c: 'United Kingdom', p: 'London', e: '🇬🇧' },
        { c: 'United States', p: 'Washington, D.C.', e: '🇺🇸' }
      ],
      [
        { c: 'Portugal', p: 'Lisbon', e: '🇵🇹' },
        { c: 'Netherlands', p: 'Amsterdam', e: '🇳🇱' },
        { c: 'Poland', p: 'Warsaw', e: '🇵🇱' },
        { c: 'Greece', p: 'Athens', e: '🇬🇷' },
        { c: 'Sweden', p: 'Stockholm', e: '🇸🇪' },
        { c: 'Norway', p: 'Oslo', e: '🇳🇴' },
        { c: 'Ireland', p: 'Dublin', e: '🇮🇪' },
        { c: 'Austria', p: 'Vienna', e: '🇦🇹' }
      ],
      [
        { c: 'India', p: 'New Delhi', e: '🇮🇳' },
        { c: 'China', p: 'Beijing', e: '🇨🇳' },
        { c: 'South Korea', p: 'Seoul', e: '🇰🇷' },
        { c: 'Thailand', p: 'Bangkok', e: '🇹🇭' },
        { c: 'Indonesia', p: 'Jakarta', e: '🇮🇩' },
        { c: 'Kenya', p: 'Nairobi', e: '🇰🇪' },
        { c: 'Nigeria', p: 'Abuja', e: '🇳🇬' },
        { c: 'Morocco', p: 'Rabat', e: '🇲🇦' }
      ],
      [
        { c: 'Canada', p: 'Ottawa', e: '🇨🇦' },
        { c: 'Mexico', p: 'Mexico City', e: '🇲🇽' },
        { c: 'Brazil', p: 'Brasília', e: '🇧🇷' },
        { c: 'Argentina', p: 'Buenos Aires', e: '🇦🇷' },
        { c: 'Peru', p: 'Lima', e: '🇵🇪' },
        { c: 'Australia', p: 'Canberra', e: '🇦🇺' },
        { c: 'New Zealand', p: 'Wellington', e: '🇳🇿' },
        { c: 'Fiji', p: 'Suva', e: '🇫🇯' }
      ],
      [
        { c: 'Switzerland', p: 'Bern', e: '🇨🇭' },
        { c: 'Vietnam', p: 'Hanoi', e: '🇻🇳' },
        { c: 'Chile', p: 'Santiago', e: '🇨🇱' },
        { c: 'Nepal', p: 'Kathmandu', e: '🇳🇵' },
        { c: 'Kazakhstan', p: 'Astana', e: '🇰🇿' },
        { c: 'Myanmar', p: 'Naypyidaw', e: '🇲🇲' },
        { c: 'Ethiopia', p: 'Addis Ababa', e: '🇪🇹' },
        { c: 'Uruguay', p: 'Montevideo', e: '🇺🇾' }
      ]
    ];
    var LEVELS = [
      { time: 12 },
      { time: 12 },
      { time: 10 },
      { time: 10 },
      { time: 10 }
    ];
    var GOAL = 6, TOTAL = 8;
    var ALL_CAPS = [];
    for (var bi = 0; bi < BANK.length; bi++) {
      for (var bj = 0; bj < BANK[bi].length; bj++) ALL_CAPS.push(BANK[bi][bj].p);
    }
    var key = 'ph_capital_lvl';
    var unlocked = Math.min(LEVELS.length, Math.max(1, GamePortal.store.get(key, 1)));
    var level = 1;
    var gen = 0;
    var answered = 0, correct = 0, streak = 0;
    var queue = [], current = null;
    var dead = false, lock = false;
    var tick = null, fbTO = null;
    var left = LEVELS[0].time, TIME = LEVELS[0].time;

    var wrap = document.createElement('div');
    wrap.className = 'quiz-wrap';
    wrap.dataset.level = '1';
    wrap.dataset.answered = '0';
    wrap.dataset.correct = '0';
    wrap.dataset.streak = '0';
    wrap.innerHTML =
      '<div class="lv-strip" id="cp-levels"><span class="lv-strip-label">Level</span></div>' +
      '<div class="lv-goal" id="cp-goal"></div>' +
      '<div class="quiz-top">' +
        '<span class="math-stat">Question <b id="cp-prog">1 / 8</b></span>' +
        '<span class="math-stat">Matched <b id="cp-ok">0</b></span>' +
        '<span class="math-stat">Streak <b id="cp-streak">0</b></span>' +
      '</div>' +
      '<div class="timer-bar"><div class="timer-fill" id="cp-time"></div></div>' +
      '<div class="q-card">' +
        '<div class="q-kicker" id="cp-kicker">Which capital city?</div>' +
        '<div class="q-flag" id="cp-flag">🗺️</div>' +
        '<div class="q-text" id="cp-country"></div>' +
      '</div>' +
      '<div class="ans-grid" id="cp-opts"></div>' +
      '<div class="math-fb" id="cp-fb"></div>';
    stage.appendChild(wrap);

    var elLevels = wrap.querySelector('#cp-levels');
    var elGoal = wrap.querySelector('#cp-goal');
    var elProg = wrap.querySelector('#cp-prog');
    var elOk = wrap.querySelector('#cp-ok');
    var elStreak = wrap.querySelector('#cp-streak');
    var elTime = wrap.querySelector('#cp-time');
    var elFlag = wrap.querySelector('#cp-flag');
    var elCountry = wrap.querySelector('#cp-country');
    var elOpts = wrap.querySelector('#cp-opts');
    var elFb = wrap.querySelector('#cp-fb');

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
      elGoal.textContent = 'Match ' + GOAL + ' of ' + TOTAL + ' capitals to clear level ' + level + '!';
      wrap.dataset.level = String(level);
    }
    function hud() {
      var shown = answered >= TOTAL ? TOTAL : answered + 1;
      elProg.textContent = shown + ' / ' + TOTAL;
      elOk.textContent = String(correct);
      elStreak.textContent = String(streak);
      elTime.style.width = Math.max(0, (left / TIME) * 100) + '%';
      wrap.dataset.level = String(level);
      wrap.dataset.answered = String(answered);
      wrap.dataset.correct = String(correct);
      wrap.dataset.streak = String(streak);
    }
    function stopTimer() { if (tick) { clearInterval(tick); tick = null; } }
    function startTimer() {
      stopTimer();
      tick = setInterval(function () {
        if (dead || lock) return;
        left -= 0.1;
        if (left <= 0) { left = 0; hud(); timeout(); return; }
        hud();
      }, 100);
    }
    function schedule(delay) {
      var g = gen;
      fbTO = setTimeout(function () {
        if (g !== gen) return;
        if (answered >= TOTAL) finish();
        else question();
      }, delay);
    }
    function question() {
      lock = false;
      if (!queue.length) queue = shuffle(BANK[level - 1].slice());
      current = queue.shift();
      elFlag.textContent = current.e;
      elCountry.textContent = current.c;
      var pool = ALL_CAPS.filter(function (p) { return p !== current.p; });
      var opts = shuffle(pool.slice()).slice(0, 3);
      opts.push(current.p);
      shuffle(opts);
      var html = '';
      for (var i = 0; i < opts.length; i++) {
        html += '<button type="button" class="ans-btn" data-i="' + i + '"' +
          (opts[i] === current.p ? ' data-correct="1"' : '') + '>' + opts[i] + '</button>';
      }
      elOpts.innerHTML = html;
      elFb.textContent = '';
      elFb.className = 'math-fb';
      left = TIME;
      hud();
      startTimer();
    }
    function lockButtons() {
      var btns = elOpts.querySelectorAll('.ans-btn');
      for (var i = 0; i < btns.length; i++) {
        btns[i].disabled = true;
        if (btns[i].getAttribute('data-correct') === '1') btns[i].classList.add('right');
      }
    }
    function answer(btn) {
      if (lock || dead) return;
      lock = true;
      stopTimer();
      var ok = btn.getAttribute('data-correct') === '1';
      lockButtons();
      answered++;
      if (ok) {
        correct++;
        streak++;
        api.addScore(streak >= 3 ? 15 : 10);
        api.sfx('good');
        elFb.textContent = '✓ ' + current.p + ' — capital of ' + current.c + '!';
        elFb.className = 'math-fb ok';
      } else {
        btn.classList.add('wrong');
        streak = 0;
        api.sfx('bad');
        elFb.textContent = '✗ The capital of ' + current.c + ' is ' + current.p + '.';
        elFb.className = 'math-fb no';
      }
      hud();
      schedule(800);
    }
    function timeout() {
      if (lock || dead) return;
      lock = true;
      stopTimer();
      lockButtons();
      answered++;
      streak = 0;
      api.sfx('bad');
      elFb.textContent = '⏱ Time up! The capital of ' + current.c + ' is ' + current.p + '.';
      elFb.className = 'math-fb no';
      hud();
      schedule(900);
    }
    function finish() {
      if (dead) return;
      dead = true;
      stopTimer();
      if (correct >= GOAL) levelClear();
      else fail();
    }
    function levelClear() {
      if (level > unlocked) { unlocked = level; GamePortal.store.set(key, unlocked); }
      api.sfx('win');
      if (level >= LEVELS.length) {
        api.win({
          emoji: '🌍',
          title: 'World Traveller!',
          text: 'You named every capital — ' + correct + '/' + TOTAL + ' on the World Mix!'
        });
        return;
      }
      api.overlay({
        emoji: '🏆',
        title: 'Level ' + level + ' complete!',
        text: 'Next: match ' + GOAL + ' of ' + TOTAL + ' capitals to clear level ' + (level + 1) + '!',
        score: api.score,
        best: api.getBest(),
        onAgain: function () { api.clearOverlay(); level++; startLevel(level); }
      });
    }
    function fail() {
      api.gameOver({
        title: '🧭 Journey over!',
        text: 'You matched ' + correct + ' of ' + TOTAL + ' capitals — need ' + GOAL + '. Try again!',
        onAgain: function () { api.clearOverlay(); startLevel(level); }
      });
    }
    function startLevel(n) {
      gen++;
      level = Math.max(1, Math.min(LEVELS.length, n));
      api.clearOverlay();
      api.setScore(0);
      answered = 0; correct = 0; streak = 0;
      dead = false; lock = false;
      stopTimer();
      if (fbTO) { clearTimeout(fbTO); fbTO = null; }
      TIME = cfg().time;
      left = TIME;
      queue = shuffle(BANK[level - 1].slice());
      elFb.textContent = '';
      elFb.className = 'math-fb';
      renderLevels();
      hud();
      question();
    }

    function onOpts(e) {
      var b = e.target.closest ? e.target.closest('.ans-btn') : null;
      if (b) answer(b);
    }
    function onLevels(e) {
      var b = e.target.closest ? e.target.closest('.lv-btn') : null;
      if (!b || b.disabled || b.classList.contains('locked')) return;
      var n = parseInt(b.getAttribute('data-lv'), 10);
      if (n !== level && n <= unlocked) { api.sfx('click'); startLevel(n); }
    }
    elOpts.addEventListener('click', onOpts);
    elLevels.addEventListener('click', onLevels);

    startLevel(1);

    return function () {
      dead = true;
      gen++;
      stopTimer();
      if (fbTO) { clearTimeout(fbTO); fbTO = null; }
      elOpts.removeEventListener('click', onOpts);
      elLevels.removeEventListener('click', onLevels);
    };
  }
});
