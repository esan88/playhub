/* Math Arena — learning: race duel vs a CPU owl.
   You (🏃) vs the owl (🦉): every correct answer pushes your racer forward,
   every wrong answer or timeout lets the owl gain. First to 5 wins the heat. */
GamePortal.register('arena', {
  title: 'Math Arena',
  emoji: '🏁',
  cat: 'learning',
  c1: '#dc2626',
  c2: '#fbbf24',
  tags: ['math', 'race', 'arena', 'duel', 'arithmetic', 'numbers', 'speed', 'competition', 'kids', 'learning', 'quiz'],
  rating: 4.8,
  plays: '1.1M',
  badge: 'Race',
  controls: 'Click the answer or press keys 1–4 — beat the owl to the finish line!',
  desc: 'Race a clever owl across the track! Every right sum pushes your racer forward — a wrong one lets the owl gain ground. First to 5 wins the heat. Clear 5 levels from easy adds to tricky times tables!',
  play: function (stage, api) {
    var GOAL = 5;
    var LEVELS = [
      { time: 12, theme: 'easy adds and takes away within 10' },
      { time: 12, theme: 'sums within 20' },
      { time: 10, theme: 'times tables from 2 to 5' },
      { time: 10, theme: 'times tables up to 10 and exact division' },
      { time: 10, theme: 'mixed sums within 50 and times/divide within 12' }
    ];
    var key = 'ph_arena_lvl';
    var unlocked = Math.min(LEVELS.length, Math.max(1, GamePortal.store.get(key, 1)));
    var level = 1;

    var wrap = document.createElement('div');
    wrap.className = 'math-wrap';
    wrap.dataset.level = '1';
    wrap.dataset.you = '0';
    wrap.dataset.cpu = '0';
    wrap.dataset.correct = '0';
    wrap.innerHTML =
      '<div class="lv-strip" id="ar-levels"><span class="lv-strip-label">Level</span></div>' +
      '<div class="lv-goal" id="ar-goal"></div>' +
      '<div class="math-top">' +
        '<span class="math-stat">First to <b>5</b></span>' +
        '<span class="math-stat">⏱ <b id="ar-sec">12</b>s</span>' +
      '</div>' +
      '<div style="display:flex;flex-direction:column;gap:6px;width:min(440px,94%)">' +
        '<div style="display:flex;align-items:center;gap:8px">' +
          '<span style="font-size:20px;min-width:28px;text-align:center">🏃</span>' +
          '<div class="timer-bar" style="flex:1;width:auto"><div class="timer-fill" id="ar-you" style="width:0%"></div></div>' +
          '<b class="math-stat" id="ar-you-n" style="padding:3px 10px">0</b>' +
        '</div>' +
        '<div style="display:flex;align-items:center;gap:8px">' +
          '<span style="font-size:20px;min-width:28px;text-align:center">🦉</span>' +
          '<div class="timer-bar" style="flex:1;width:auto"><div class="timer-fill" id="ar-cpu" style="width:0%;background:linear-gradient(90deg,#f97316,#fbbf24)"></div></div>' +
          '<b class="math-stat" id="ar-cpu-n" style="padding:3px 10px">0</b>' +
        '</div>' +
      '</div>' +
      '<div class="timer-bar"><div class="timer-fill" id="ar-tfill" style="width:100%"></div></div>' +
      '<div class="equation" id="ar-q">?</div>' +
      '<div class="ans-grid" id="ar-opts"></div>' +
      '<div class="math-fb" id="ar-fb"></div>' +
      '<div class="hint">Tip: a wrong answer lets the owl fly ahead!</div>';
    stage.appendChild(wrap);

    var elQ = wrap.querySelector('#ar-q');
    var elOpts = wrap.querySelector('#ar-opts');
    var elFb = wrap.querySelector('#ar-fb');
    var elYou = wrap.querySelector('#ar-you');
    var elCpu = wrap.querySelector('#ar-cpu');
    var elYouN = wrap.querySelector('#ar-you-n');
    var elCpuN = wrap.querySelector('#ar-cpu-n');
    var elTfill = wrap.querySelector('#ar-tfill');
    var elSec = wrap.querySelector('#ar-sec');
    var elGoal = wrap.querySelector('#ar-goal');
    var elLevels = wrap.querySelector('#ar-levels');

    var you = 0, cpu = 0, correct = 0;
    var opts = [], k = 0;
    var TIME = LEVELS[0].time, timeLeft = TIME;
    var alive = true, dead = false, lock = false;
    var qTick = null, fbTO = null;

    function rnd(a, b) { return a + Math.floor(Math.random() * (b - a + 1)); }

    function cfg() { return LEVELS[level - 1]; }
    function renderLevels() {
      var html = '<span class="lv-strip-label">Level</span>';
      for (var n = 1; n <= LEVELS.length; n++) {
        var cls = 'lv-btn' + (n === level ? ' on' : '') + (n > unlocked ? ' locked' : '');
        html += '<button type="button" class="' + cls + '" data-lv="' + n + '"' + (n > unlocked ? ' disabled' : '') + '>' + n + '</button>';
      }
      elLevels.innerHTML = html;
      elGoal.textContent = 'Beat the owl — first to 5 correct answers!';
      wrap.dataset.level = String(level);
    }
    function hud() {
      elYouN.textContent = String(you);
      elCpuN.textContent = String(cpu);
      elYou.style.width = Math.min(100, (you / GOAL) * 100) + '%';
      elCpu.style.width = Math.min(100, (cpu / GOAL) * 100) + '%';
      wrap.dataset.you = String(you);
      wrap.dataset.cpu = String(cpu);
      wrap.dataset.correct = String(correct);
      api.setScore(correct * 10);
    }
    function stopQ() { if (qTick) { clearInterval(qTick); qTick = null; } }
    function startQ() {
      stopQ();
      qTick = setInterval(function () {
        if (!alive || dead) return;
        timeLeft -= 0.1;
        if (timeLeft <= 0) {
          timeLeft = 0;
          elTfill.style.width = '0%';
          elSec.textContent = '0';
          onTimeout();
          return;
        }
        elTfill.style.width = (timeLeft / TIME * 100) + '%';
        elSec.textContent = String(Math.ceil(timeLeft));
      }, 100);
    }
    function clearFb() { if (fbTO) { clearTimeout(fbTO); fbTO = null; } }

    function makeQuestion() {
      var a, b, op, ans, r = Math.random();
      if (level === 1) {
        if (r < 0.5) { op = '+'; a = rnd(1, 9); b = rnd(1, 10 - a); }
        else { op = '−'; a = rnd(2, 10); b = rnd(1, a - 1); }
      } else if (level === 2) {
        if (r < 0.5) { op = '+'; a = rnd(1, 15); b = rnd(1, 20 - a); }
        else { op = '−'; a = rnd(2, 20); b = rnd(1, a - 1); }
      } else if (level === 3) {
        op = '×'; a = rnd(2, 5); b = rnd(2, 10);
      } else if (level === 4) {
        if (r < 0.5) { op = '×'; a = rnd(2, 10); b = rnd(2, 10); }
        else { op = '÷'; b = rnd(2, 10); a = rnd(2, 10) * b; }
      } else {
        if (r < 0.25) { op = '+'; a = rnd(1, 40); b = rnd(1, 50 - a); }
        else if (r < 0.5) { op = '−'; a = rnd(2, 50); b = rnd(1, a - 1); }
        else if (r < 0.75) { op = '×'; a = rnd(2, 12); b = rnd(2, 12); }
        else { op = '÷'; b = rnd(2, 12); a = rnd(2, 12) * b; }
      }
      ans = op === '+' ? a + b : op === '−' ? a - b : op === '×' ? a * b : a / b;

      var set = [ans];
      var guard = 0;
      while (set.length < 4 && guard++ < 80) {
        var delta = rnd(1, 9) * (Math.random() < 0.5 ? -1 : 1);
        var v = ans + delta;
        if (v >= 0 && set.indexOf(v) === -1) set.push(v);
      }
      while (set.length < 4) {
        var f = ans + 3;
        while (set.indexOf(f) !== -1) f++;
        set.push(f);
      }
      for (var i = set.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var t = set[i]; set[i] = set[j]; set[j] = t;
      }
      opts = set;
      k = set.indexOf(ans);

      elQ.textContent = a + ' ' + op + ' ' + b + ' = ?';
      var html = '';
      for (var i2 = 0; i2 < set.length; i2++) {
        html += '<button type="button" class="ans-btn" data-i="' + i2 + '" data-correct="' + (i2 === k ? '1' : '0') + '">' + set[i2] + '</button>';
      }
      elOpts.innerHTML = html;

      TIME = cfg().time;
      timeLeft = TIME;
      elTfill.style.width = '100%';
      elSec.textContent = String(TIME);
      startQ();
    }

    function lockBtns() {
      var btns = elOpts.querySelectorAll('.ans-btn');
      for (var i = 0; i < btns.length; i++) {
        btns[i].disabled = true;
        if (btns[i].getAttribute('data-correct') === '1') btns[i].classList.add('right');
      }
      return btns;
    }
    function next() {
      fbTO = null;
      if (dead || !alive) return;
      lock = false;
      elFb.textContent = '';
      elFb.className = 'math-fb';
      makeQuestion();
    }
    function pick(i) {
      if (lock || dead) return;
      var btns = elOpts.querySelectorAll('.ans-btn');
      var btn = btns[i];
      if (!btn) return;
      lock = true;
      stopQ();
      lockBtns();
      if (i === k) {
        you++;
        correct = you;
        api.sfx('good');
        hud();
        if (you >= GOAL) { levelClear(); return; }
        elFb.textContent = 'Nice! You pull ahead! 🏃';
        elFb.className = 'math-fb ok';
        fbTO = setTimeout(next, 700);
      } else {
        btn.classList.add('wrong');
        cpu++;
        api.sfx('bad');
        hud();
        if (cpu >= GOAL) { lose(); return; }
        elFb.textContent = 'Oops — the owl gains ground! 🦉';
        elFb.className = 'math-fb no';
        fbTO = setTimeout(next, 800);
      }
    }
    function onTimeout() {
      if (lock || dead) return;
      lock = true;
      stopQ();
      lockBtns();
      cpu++;
      api.sfx('bad');
      hud();
      if (cpu >= GOAL) { lose(); return; }
      elFb.textContent = "Time's up — the owl gains! 🦉";
      elFb.className = 'math-fb no';
      fbTO = setTimeout(next, 900);
    }
    function lose() {
      dead = true;
      stopQ();
      clearFb();
      api.gameOver({
        title: '🦉 The owl wins!',
        text: 'The owl reached ' + GOAL + ' first — you finished with ' + you + '. Try again!',
        onAgain: function () { api.clearOverlay(); startLevel(level); }
      });
    }
    function levelClear() {
      dead = true;
      stopQ();
      clearFb();
      if (level > unlocked) { unlocked = level; GamePortal.store.set(key, unlocked); }
      if (level >= LEVELS.length) {
        api.win({ emoji: '🏆', title: 'Arena Champion!', text: 'You won every race!' });
        return;
      }
      api.sfx('win');
      api.overlay({
        emoji: '🏁',
        title: 'Level ' + level + ' complete!',
        text: 'You beat the owl ' + you + '–' + cpu + '! Next: ' + LEVELS[level].theme + '.',
        score: api.score,
        best: api.getBest(),
        onAgain: function () { api.clearOverlay(); level++; startLevel(level); }
      });
    }
    function startLevel(n) {
      level = Math.max(1, Math.min(LEVELS.length, n));
      api.clearOverlay();
      api.setScore(0);
      alive = true; dead = false; lock = false;
      you = 0; cpu = 0; correct = 0;
      clearFb();
      stopQ();
      elFb.textContent = '';
      elFb.className = 'math-fb';
      renderLevels();
      hud();
      makeQuestion();
    }

    function onOptsClick(e) {
      var b = e.target.closest ? e.target.closest('.ans-btn') : null;
      if (b) pick(parseInt(b.dataset.i, 10));
    }
    function onLvClick(e) {
      var lvb = e.target.closest ? e.target.closest('.lv-btn') : null;
      if (lvb && !lvb.classList.contains('locked') && !lvb.disabled) {
        var n = parseInt(lvb.dataset.lv, 10);
        if (n !== level && n <= unlocked) { api.sfx('click'); startLevel(n); }
      }
    }
    function onKey(e) {
      if (dead) return;
      var n = parseInt(e.key, 10);
      if (n >= 1 && n <= 4) pick(n - 1);
    }

    elOpts.addEventListener('click', onOptsClick);
    elLevels.addEventListener('click', onLvClick);
    document.addEventListener('keydown', onKey);

    startLevel(1);

    return function () {
      alive = false;
      dead = true;
      stopQ();
      clearFb();
      elOpts.removeEventListener('click', onOptsClick);
      elLevels.removeEventListener('click', onLvClick);
      document.removeEventListener('keydown', onKey);
    };
  }
});
