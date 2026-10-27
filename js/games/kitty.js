/* Kitty Care Day — a gentle virtual-pet day loop with Mochi the kitty.
   5 cosy days: tap the care steps in the hinted order before the timer runs out. */
GamePortal.register('kitty', {
  title: 'Kitty Care Day',
  emoji: '🐱',
  cat: 'arts',
  c1: '#f59e0b',
  c2: '#fda4af',
  tags: ['kitty', 'cat', 'pet', 'care', 'feed', 'play', 'arts', 'cute', 'animals', 'kind', 'daily', 'nurture'],
  rating: 4.8,
  plays: '0.4M',
  badge: 'Caring',
  controls: 'Tap the right care action to keep Mochi happy — feed, bath, play, brush and tuck in!',
  desc: 'Mochi the kitty needs a caring friend! Feed her a tasty treat, wash off the mud, play with yarn, brush her soft fur and tuck her in for a nap — all before the day ends. Five cosy days of kitty care for gentle gamers.',
  play: function (stage, api) {
    var ACTIONS = {
      feed: { e: '🍗', n: 'feed' },
      bath: { e: '🛁', n: 'bath' },
      play: { e: '🧶', n: 'play' },
      brush: { e: '😻', n: 'brush' },
      sleep: { e: '🌙', n: 'sleep' }
    };
    var KEYS = ['feed', 'bath', 'play', 'brush', 'sleep'];
    var LEVELS = [
      { steps: ['feed', 'play', 'sleep'], time: 50 },
      { steps: ['feed', 'bath', 'play', 'sleep'], time: 50 },
      { steps: ['feed', 'bath', 'brush', 'sleep'], time: 45 },
      { steps: ['feed', 'bath', 'play', 'brush', 'sleep'], time: 45 },
      { steps: ['play', 'feed', 'bath', 'brush', 'sleep'], time: 40 }
    ];
    var MOODS = ['🙂', '😺', '😸', '😻', '🥰', '😻'];
    var SAD = '🙀';
    var HAPPY0 = 70;
    var key = 'ph_kitty_lvl';
    var unlocked = Math.min(LEVELS.length, Math.max(1, GamePortal.store.get(key, 1)));
    var level = 1;

    var wrap = document.createElement('div');
    wrap.className = 'quiz-wrap';
    wrap.dataset.level = '1';
    wrap.dataset.step = '0';
    wrap.dataset.steps = '3';
    wrap.dataset.happy = '70';
    wrap.innerHTML =
      '<div class="lv-strip" id="ki-levels"><span class="lv-strip-label">Level</span></div>' +
      '<div class="lv-goal" id="ki-goal"></div>' +
      '<div class="math-top">' +
        '<span class="math-stat" id="ki-hnum">❤️ 70</span>' +
        '<span class="math-stat" id="ki-count">Step 0 / 3</span>' +
        '<span class="math-stat">Time <b id="ki-secs">50</b>s</span>' +
      '</div>' +
      '<div class="timer-bar"><div class="timer-fill" id="ki-time"></div></div>' +
      '<div class="timer-bar"><div class="timer-fill" id="ki-happy"></div></div>' +
      '<div class="q-card">' +
        '<div class="q-kicker">Mochi the kitty</div>' +
        '<div id="ki-cat" style="font-size:64px;line-height:1;filter:drop-shadow(0 6px 12px rgba(0,0,0,.2))">🙂</div>' +
        '<div class="q-text" id="ki-steps"></div>' +
        '<div class="math-fb" id="ki-hint" data-need="feed" style="margin-top:8px"></div>' +
      '</div>' +
      '<div class="ans-grid" id="ki-actions" style="grid-template-columns:repeat(3,minmax(86px,120px))"></div>' +
      '<div class="hint" id="ki-note">Tap each care action in the right order — keep Mochi happy!</div>';
    stage.appendChild(wrap);

    var elLevels = wrap.querySelector('#ki-levels');
    var elGoal = wrap.querySelector('#ki-goal');
    var elHnum = wrap.querySelector('#ki-hnum');
    var elCount = wrap.querySelector('#ki-count');
    var elSecs = wrap.querySelector('#ki-secs');
    var elTime = wrap.querySelector('#ki-time');
    var elHappy = wrap.querySelector('#ki-happy');
    var elCat = wrap.querySelector('#ki-cat');
    var elSteps = wrap.querySelector('#ki-steps');
    var elHint = wrap.querySelector('#ki-hint');
    var elActions = wrap.querySelector('#ki-actions');

    var actHtml = '';
    for (var a = 0; a < KEYS.length; a++) {
      actHtml += '<button type="button" class="ans-btn" data-step="' + KEYS[a] + '">' +
        '<span style="display:block;font-size:28px;line-height:1.15">' + ACTIONS[KEYS[a]].e + '</span>' +
        '<span style="display:block;font-size:14px">' + ACTIONS[KEYS[a]].n + '</span></button>';
    }
    elActions.innerHTML = actHtml;

    var order = [], step = 0, happy = HAPPY0;
    var left = LEVELS[0].time, TIME = LEVELS[0].time;
    var alive = true, tick = null, moodTO = null, markTO = null;

    function cfg() { return LEVELS[level - 1]; }

    function shuffle(a) {
      for (var i = a.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var t = a[i]; a[i] = a[j]; a[j] = t;
      }
      return a;
    }

    function buildOrder() {
      var src = cfg().steps.slice();
      if (level === 1) return src;
      return shuffle(src);
    }

    function renderLevels() {
      var html = '<span class="lv-strip-label">Level</span>';
      for (var n = 1; n <= LEVELS.length; n++) {
        var cls = 'lv-btn' + (n === level ? ' on' : '') + (n > unlocked ? ' locked' : '');
        html += '<button type="button" class="' + cls + '" data-lv="' + n + '"' + (n > unlocked ? ' disabled' : '') + '>' + n + '</button>';
      }
      elLevels.innerHTML = html;
      elGoal.textContent = 'Level ' + level + ' — care for Mochi through ' + order.length + ' steps before bedtime!';
      wrap.dataset.level = String(level);
    }

    function renderSteps() {
      var parts = [];
      for (var i = 0; i < order.length; i++) {
        if (i < step) parts.push(order[i] + ' ✓');
        else if (i === step) parts.push(order[i] + ' ⏳');
        else parts.push(order[i]);
      }
      elSteps.textContent = parts.join(' · ');
    }

    function renderHint(txt) {
      var need = order[step] || '';
      elHint.setAttribute('data-need', need);
      if (txt) { elHint.textContent = txt; return; }
      if (!need) { elHint.textContent = 'All done — Mochi is so happy! 💕'; return; }
      elHint.textContent = (step === 0 ? 'First: ' : 'Next: ') + ACTIONS[need].n + '!';
    }

    function setMood(m) { elCat.textContent = m; }

    function moodBack() {
      if (moodTO) clearTimeout(moodTO);
      moodTO = setTimeout(function () {
        moodTO = null;
        if (!alive) return;
        setMood(MOODS[Math.min(step, MOODS.length - 1)]);
      }, 800);
    }

    function clearWrong() {
      if (markTO) clearTimeout(markTO);
      markTO = setTimeout(function () {
        markTO = null;
        if (!alive) return;
        var bs = elActions.querySelectorAll('.ans-btn');
        for (var i = 0; i < bs.length; i++) bs[i].classList.remove('wrong');
      }, 1600);
    }

    function hud() {
      wrap.dataset.level = String(level);
      wrap.dataset.step = String(step);
      wrap.dataset.steps = String(order.length);
      wrap.dataset.happy = String(happy);
      wrap.dataset.order = order.join(',');
      elHnum.textContent = '❤️ ' + happy;
      elCount.textContent = 'Step ' + Math.min(step, order.length) + ' / ' + order.length;
      elSecs.textContent = String(Math.max(0, left));
      elHappy.style.width = happy + '%';
      elTime.style.width = Math.max(0, (left / TIME) * 100) + '%';
    }

    function stopTimer() { if (tick) { clearInterval(tick); tick = null; } }
    function startTimer() {
      stopTimer();
      elTime.style.width = '100%';
      tick = setInterval(function () {
        if (!alive) return;
        left--;
        if (left <= 0) { left = 0; hud(); fail('time'); return; }
        hud();
      }, 1000);
    }

    function fail(reason) {
      if (!alive) return;
      alive = false;
      stopTimer();
      api.gameOver({
        title: reason === 'happy' ? '😿 Mochi is sad!' : '⏰ Bedtime!',
        text: reason === 'happy'
          ? 'Level ' + level + ": Mochi's happiness ran out at step " + (step + 1) + ' of ' + order.length + '.'
          : 'Level ' + level + ': you finished ' + step + ' of ' + order.length + ' care steps.',
        onAgain: function () { api.clearOverlay(); startLevel(level); }
      });
    }

    function levelClear() {
      alive = false;
      stopTimer();
      api.addScore(Math.max(0, Math.round(left)));
      if (level > unlocked) { unlocked = level; GamePortal.store.set(key, unlocked); }
      if (level >= LEVELS.length) {
        api.win({
          emoji: '😻',
          title: 'Best Kitty Friend!',
          text: 'Mochi had the happiest week!'
        });
        return;
      }
      api.sfx('win');
      api.overlay({
        emoji: '🐱',
        title: 'Level ' + level + ' complete!',
        text: 'Next: ' + LEVELS[level].steps.length + ' care steps in ' + LEVELS[level].time + 's — more cuddles coming!',
        score: api.score,
        best: api.getBest(),
        onAgain: function () { api.clearOverlay(); level++; startLevel(level); }
      });
    }

    function startLevel(n) {
      level = Math.max(1, Math.min(LEVELS.length, n));
      api.clearOverlay();
      api.setScore(0);
      order = buildOrder();
      step = 0;
      happy = HAPPY0;
      alive = true;
      TIME = cfg().time;
      left = TIME;
      if (moodTO) { clearTimeout(moodTO); moodTO = null; }
      if (markTO) { clearTimeout(markTO); markTO = null; }
      var bs = elActions.querySelectorAll('.ans-btn');
      for (var i = 0; i < bs.length; i++) {
        bs[i].classList.remove('right');
        bs[i].classList.remove('wrong');
      }
      elActions.classList.remove('shake');
      setMood(MOODS[0]);
      renderLevels();
      renderSteps();
      renderHint();
      hud();
      startTimer();
    }

    function onAction(e) {
      if (!alive) return;
      var b = e.target.closest('[data-step]');
      if (!b) return;
      var picked = b.dataset.step;
      var need = order[step] || '';
      if (picked === need) {
        api.sfx('good');
        happy = Math.min(100, happy + 8);
        step++;
        b.classList.remove('wrong');
        b.classList.add('right');
        api.addScore(20);
        setMood(MOODS[Math.min(step, MOODS.length - 1)]);
        renderSteps();
        renderHint();
        hud();
        if (step >= order.length) levelClear();
        return;
      }
      api.sfx('bad');
      happy = Math.max(0, happy - 10);
      elActions.classList.remove('shake');
      void elActions.offsetWidth;
      elActions.classList.add('shake');
      b.classList.remove('wrong');
      void b.offsetWidth;
      b.classList.add('wrong');
      setMood(SAD);
      moodBack();
      clearWrong();
      renderHint('Try the ' + ACTIONS[need].n + '!');
      hud();
      if (happy <= 0) fail('happy');
    }

    function onLevels(e) {
      var b = e.target.closest('.lv-btn');
      if (b && !b.classList.contains('locked') && !b.disabled) {
        var n = parseInt(b.dataset.lv, 10);
        if (n !== level && n <= unlocked) { api.sfx('click'); startLevel(n); }
      }
    }

    elLevels.addEventListener('click', onLevels);
    elActions.addEventListener('click', onAction);

    startLevel(1);

    return function () {
      alive = false;
      stopTimer();
      if (moodTO) { clearTimeout(moodTO); moodTO = null; }
      if (markTO) { clearTimeout(markTO); markTO = null; }
      elLevels.removeEventListener('click', onLevels);
      elActions.removeEventListener('click', onAction);
    };
  }
});
