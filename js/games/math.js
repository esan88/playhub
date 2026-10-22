/* Math Sprint — learning */
GamePortal.register('math', {
  title: 'Math Sprint',
  emoji: '➕',
  cat: 'learning',
  c1: '#0f4c81',
  c2: '#00b4d8',
  tags: ['math', 'arithmetic', 'learning', 'numbers', 'education', 'quiz'],
  rating: 4.9,
  plays: '2.8M',
  badge: 'Featured',
  controls: 'Click the right answer or press keys 1–4',
  desc: 'Sixty seconds of rapid-fire arithmetic. Add, subtract, multiply and divide — the faster you answer, the higher your streak climbs.',
  play: function (stage, api) {
    var ROUND = 60;
    var LEVELS = [
      { goal: 10 },
      { goal: 12 },
      { goal: 14 },
      { goal: 16 },
      { goal: 18 }
    ];
    var key = 'ph_math_lvl';
    var unlocked = Math.min(LEVELS.length, Math.max(1, GamePortal.store.get(key, 1)));
    var level = 1;
    var timeLeft = ROUND, streak = 0, best = 0, correct = 0, wrong = 0;
    var answer = 0, options = [], dead = false, tick = null;

    var wrap = document.createElement('div');
    wrap.className = 'math-wrap';
    wrap.dataset.level = '1';
    wrap.innerHTML =
      '<div class="lv-strip" id="mt-levels"><span class="lv-strip-label">Level</span></div>' +
      '<div class="lv-goal" id="mt-goal"></div>' +
      '<div class="math-top">' +
        '<span class="math-stat">Streak <b id="m-streak">0</b></span>' +
        '<span class="math-stat">Level <b id="m-lvl">1</b></span>' +
        '<span class="math-stat">Right <b id="m-right">0</b></span>' +
        '<span class="math-stat">Time <b id="m-time">60</b>s</span>' +
      '</div>' +
      '<div class="timer-bar"><div class="timer-fill" id="m-fill"></div></div>' +
      '<div class="equation" id="m-eq">8 + 7 = ?</div>' +
      '<div class="math-answers" id="m-answers"></div>' +
      '<div class="math-fb" id="m-fb"></div>' +
      '<div class="hint">Tip: correct answers build a streak multiplier</div>';
    stage.appendChild(wrap);

    var elEq = wrap.querySelector('#m-eq');
    var elAns = wrap.querySelector('#m-answers');
    var elFb = wrap.querySelector('#m-fb');
    var elStreak = wrap.querySelector('#m-streak');
    var elLvl = wrap.querySelector('#m-lvl');
    var elRight = wrap.querySelector('#m-right');
    var elTime = wrap.querySelector('#m-time');
    var elFill = wrap.querySelector('#m-fill');
    var elGoal = wrap.querySelector('#mt-goal');
    var elLevels = wrap.querySelector('#mt-levels');

    function rnd(a, b) { return a + Math.floor(Math.random() * (b - a + 1)); }

    function cfg() { return LEVELS[level - 1]; }
    function renderLevels() {
      var html = '<span class="lv-strip-label">Level</span>';
      for (var n = 1; n <= LEVELS.length; n++) {
        var cls = 'lv-btn' + (n === level ? ' on' : '') + (n > unlocked ? ' locked' : '');
        html += '<button type="button" class="' + cls + '" data-lv="' + n + '"' + (n > unlocked ? ' disabled' : '') + '>' + n + '</button>';
      }
      elLevels.innerHTML = html;
      elGoal.textContent = 'Answer ' + cfg().goal + ' correctly to clear level ' + level + '!';
      elLvl.textContent = level;
      wrap.dataset.level = String(level);
    }
    function levelClear() {
      dead = true;
      clearInterval(tick);
      if (level > unlocked) { unlocked = level; GamePortal.store.set(key, unlocked); }
      if (level >= LEVELS.length) {
        api.win({
          title: 'Math Master! 🏆',
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
      timeLeft = ROUND; streak = 0; best = 0; correct = 0; wrong = 0;
      dead = false;
      clearInterval(tick);
      elStreak.textContent = '0';
      elRight.textContent = '0';
      elTime.textContent = String(ROUND);
      elFill.style.width = '100%';
      elFb.textContent = '';
      elFb.className = 'math-fb';
      renderLevels();
      makeQuestion();
      tick = setInterval(loop, 100);
    }

    function makeQuestion() {
      var a, b, op;
      if (level === 1) {
        op = Math.random() < 0.5 ? '+' : '−';
        a = rnd(1, 10); b = rnd(1, 10);
      } else if (level === 2) {
        op = Math.random() < 0.5 ? '+' : '−';
        a = rnd(2, 20); b = rnd(1, 20);
      } else if (level === 3) {
        op = Math.random() < 0.5 ? '+' : '−';
        a = rnd(5, 50); b = rnd(2, 50);
      } else if (level === 4) {
        op = '×';
        a = rnd(2, 5); b = rnd(1, 12);
      } else {
        op = Math.random() < 0.5 ? '×' : '÷';
        if (op === '÷') { b = rnd(2, 12); a = rnd(2, 12) * b; }
        else { a = rnd(2, 12); b = rnd(2, 12); }
      }
      if (op === '−' && b > a) { var t = a; a = b; b = t; }

      answer = op === '+' ? a + b : op === '−' ? a - b : op === '×' ? a * b : a / b;

      var set = [answer];
      var guard = 0;
      while (set.length < 4 && guard++ < 60) {
        var delta = rnd(1, 9) * (Math.random() < .5 ? -1 : 1);
        var v = answer + delta;
        if (v !== answer && set.indexOf(v) === -1) set.push(v);
      }
      while (set.length < 4) set.push(answer + set.length * 3);
      options = set.sort(function () { return Math.random() - 0.5; });

      elEq.textContent = a + ' ' + op + ' ' + b + ' = ?';
      elAns.innerHTML = options.map(function (v, i) {
        return '<button class="ans-btn" data-v="' + v + '"><span class="hint" style="display:block;font-size:11px;margin-bottom:2px">' + (i + 1) + '</span>' + v + '</button>';
      }).join('');
    }

    function pick(v) {
      if (dead) return;
      if (v === answer) {
        correct++;
        streak++;
        best = Math.max(best, streak);
        var mult = 1 + Math.floor(streak / 4) * 0.5;
        api.addScore(Math.round(40 * mult));
        elFb.textContent = streak >= 4 ? '🔥 streak x' + mult : 'Correct!';
        elFb.className = 'math-fb ok';
        api.sfx('good');
        elStreak.textContent = streak;
        elRight.textContent = correct;
        if (correct >= cfg().goal) { levelClear(); return; }
        makeQuestion();
      } else {
        wrong++;
        streak = 0;
        timeLeft = Math.max(0, timeLeft - 2);
        elFb.textContent = '−2 seconds!';
        elFb.className = 'math-fb no';
        api.sfx('bad');
        elStreak.textContent = streak;
        elRight.textContent = correct;
        makeQuestion();
      }
    }

    function end() {
      if (dead) return;
      dead = true;
      clearInterval(tick);
      api.gameOver({
        title: "Time's up!",
        text: correct + ' correct · ' + wrong + ' missed · best streak ' + best,
        onAgain: function () { api.clearOverlay(); startLevel(level); }
      });
    }

    function loop() {
      if (dead) return;
      timeLeft -= 0.1;
      if (timeLeft <= 0) { timeLeft = 0; elTime.textContent = '0'; elFill.style.width = '0%'; end(); return; }
      elTime.textContent = Math.ceil(timeLeft);
      elFill.style.width = (timeLeft / ROUND * 100) + '%';
    }

    function onKey(e) {
      if (dead) return;
      var n = parseInt(e.key, 10);
      if (n >= 1 && n <= 4 && options[n - 1] !== undefined) pick(options[n - 1]);
      if (e.key === 'Enter' || e.key === ' ') e.preventDefault();
    }

    elAns.addEventListener('click', function (e) {
      var b = e.target.closest('.ans-btn');
      if (b) pick(parseInt(b.dataset.v, 10));
    });
    document.addEventListener('keydown', onKey);
    elLevels.addEventListener('click', function (e) {
      var b = e.target.closest ? e.target.closest('.lv-btn') : null;
      if (!b || b.disabled) return;
      var n = parseInt(b.getAttribute('data-lv'), 10);
      if (n !== level && n <= unlocked) { api.sfx('click'); startLevel(n); }
    });

    startLevel(1);

    return function () {
      dead = true;
      clearInterval(tick);
      document.removeEventListener('keydown', onKey);
    };
  }
});
