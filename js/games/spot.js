/* Spot the Difference — find every differing tile between two emoji scenes.
   5 authored scenes, tap-to-find, -3s per wrong tap. */
GamePortal.register('spot', {
  title: 'Spot the Difference',
  emoji: '🔍',
  cat: 'puzzle',
  c1: '#7c3aed',
  c2: '#22d3ee',
  tags: ['spot', 'difference', 'puzzle', 'visual', 'attention', 'detective', 'kids', 'details', 'find', 'pairs'],
  rating: 4.7,
  plays: '0.5M',
  badge: 'Brain boost',
  controls: 'Find all the differences between the two pictures before time runs out!',
  desc: 'Two pictures look the same — but they are not! Tap every tile that differs between the beach, space, farm and underwater scenes. Five levels with more differences and less time. How sharp are your eyes?',
  play: function (stage, api) {
    var LEVELS = [
      {
        cols: 3, rows: 3, time: 60,
        scene: ['🏖️', '🐚', '🌴', '☀️', '🥥', '🏄', '🌊', '🦀', '⛱️'],
        diffs: [{ i: 1, e: '🐠' }, { i: 4, e: '🍉' }, { i: 7, e: '🥝' }]
      },
      {
        cols: 3, rows: 3, time: 50,
        scene: ['🚀', '⭐', '🌙', '🪐', '☄️', '🧑‍🚀', '✨', '🌍', '🛰️'],
        diffs: [{ i: 0, e: '🛸' }, { i: 3, e: '🌕' }, { i: 6, e: '💫' }]
      },
      {
        cols: 4, rows: 3, time: 50,
        scene: ['🐔', '🌻', '🐴', '🥕', '🍎', '🐷', '🐝', '🌾', '🚜', '🐶', '🥚', '🌳'],
        diffs: [{ i: 0, e: '🐓' }, { i: 5, e: '🐽' }, { i: 8, e: '🛞' }, { i: 10, e: '🐣' }]
      },
      {
        cols: 4, rows: 3, time: 45,
        scene: ['🐠', '🪸', '🐙', '🦈', '🌊', '🐬', '🦀', '🐡', '🐚', '🦞', '💧', '🤿'],
        diffs: [{ i: 2, e: '🦑' }, { i: 4, e: '🏝️' }, { i: 6, e: '🦂' }, { i: 9, e: '🦑' }, { i: 11, e: '🪸' }]
      },
      {
        cols: 4, rows: 3, time: 40,
        scene: ['🛏️', '🧸', '📚', '🌙', '🎁', '⏰', '🪥', '💡', '🕯️', '🧦', '🖼️', '🪟'],
        diffs: [{ i: 1, e: '🐻' }, { i: 3, e: '🌘' }, { i: 5, e: '⌚' }, { i: 7, e: '🔦' }, { i: 9, e: '🧤' }, { i: 11, e: '🚪' }]
      }
    ];
    var key = 'ph_spot_lvl';
    var unlocked = Math.min(LEVELS.length, Math.max(1, GamePortal.store.get(key, 1)));
    var level = 1;

    var wrap = document.createElement('div');
    wrap.className = 'quiz-wrap';
    wrap.dataset.level = '1';
    wrap.dataset.found = '0';
    wrap.dataset.total = '3';
    wrap.innerHTML =
      '<div class="lv-strip" id="so-levels"><span class="lv-strip-label">Level</span></div>' +
      '<div class="lv-goal" id="so-goal"></div>' +
      '<div class="math-top">' +
        '<span class="math-stat" id="so-prog">0 / 3 found</span>' +
        '<span class="math-stat">Time <b id="so-secs">60</b>s</span>' +
      '</div>' +
      '<div class="timer-bar"><div class="timer-fill" id="so-time"></div></div>' +
      '<div id="so-a" style="display:grid;gap:6px;justify-content:center;margin:10px 0 4px"></div>' +
      '<div id="so-b" style="display:grid;gap:6px;justify-content:center"></div>' +
      '<div class="math-fb" id="so-fb"></div>';
    stage.appendChild(wrap);

    var panelA = wrap.querySelector('#so-a');
    var panelB = wrap.querySelector('#so-b');
    var elProg = wrap.querySelector('#so-prog');
    var elSecs = wrap.querySelector('#so-secs');
    var elFill = wrap.querySelector('#so-time');
    var elGoal = wrap.querySelector('#so-goal');
    var elLevels = wrap.querySelector('#so-levels');
    var elFb = wrap.querySelector('#so-fb');

    var found = 0, total = 3, left = 60, TIME = 60;
    var alive = true, tick = null;

    function cfg() { return LEVELS[level - 1]; }

    function renderLevels() {
      var html = '<span class="lv-strip-label">Level</span>';
      for (var n = 1; n <= LEVELS.length; n++) {
        var cls = 'lv-btn' + (n === level ? ' on' : '') + (n > unlocked ? ' locked' : '');
        html += '<button type="button" class="' + cls + '" data-lv="' + n + '"' + (n > unlocked ? ' disabled' : '') + '>' + n + '</button>';
      }
      elLevels.innerHTML = html;
      elGoal.textContent = 'Level ' + level + ' — find ' + total + ' differences in ' + cfg().cols + '×' + cfg().rows + '!';
      wrap.dataset.level = String(level);
    }

    function hud() {
      elProg.textContent = found + ' / ' + total + ' found';
      elSecs.textContent = String(Math.max(0, Math.ceil(left)));
      elFill.style.width = Math.max(0, (left / TIME) * 100) + '%';
      wrap.dataset.found = String(found);
      wrap.dataset.total = String(total);
    }

    function buildPanels() {
      var c = cfg();
      var tmpl = 'repeat(' + c.cols + ', 54px)';
      panelA.style.gridTemplateColumns = tmpl;
      panelB.style.gridTemplateColumns = tmpl;
      var bMap = {};
      for (var d = 0; d < c.diffs.length; d++) {
        bMap[c.diffs[d].i] = c.diffs[d].e;
      }
      var htmlA = '', htmlB = '';
      for (var i = 0; i < c.scene.length; i++) {
        var eA = c.scene[i];
        var isDiff = bMap.hasOwnProperty(i);
        var eB = isDiff ? bMap[i] : eA;
        var st = 'width:54px;height:54px;font-size:26px;display:flex;align-items:center;justify-content:center;border-radius:12px';
        htmlA += '<button type="button" class="ans-btn" data-i="' + i + '" style="' + st + '">' + eA + '</button>';
        htmlB += '<button type="button" class="ans-btn" data-i="' + i + '"' + (isDiff ? ' data-diff="1"' : '') + ' style="' + st + '">' + eB + '</button>';
      }
      panelA.innerHTML = htmlA;
      panelB.innerHTML = htmlB;
    }

    function stopTimer() { if (tick) { clearInterval(tick); tick = null; } }
    function startTimer() {
      stopTimer();
      tick = setInterval(function () {
        if (!alive) return;
        left -= 0.1;
        if (left <= 0) { left = 0; hud(); fail(); return; }
        hud();
      }, 100);
    }

    function fail() {
      if (!alive) return;
      alive = false;
      stopTimer();
      api.gameOver({
        title: '⏰ Time’s up!',
        text: 'Level ' + level + ': you spotted ' + found + ' of ' + total + ' differences.',
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
          emoji: '👁️',
          title: 'Eagle Eyes!',
          text: 'You spotted every difference!'
        });
        return;
      }
      api.sfx('win');
      api.overlay({
        emoji: '👁️',
        title: 'Level ' + level + ' complete!',
        text: 'Next: find ' + LEVELS[level].diffs.length + ' differences in ' + LEVELS[level].cols + '×' + LEVELS[level].rows + ' — even trickier!',
        score: api.score,
        best: api.getBest(),
        onAgain: function () { api.clearOverlay(); level++; startLevel(level); }
      });
    }

    function startLevel(n) {
      level = Math.max(1, Math.min(LEVELS.length, n));
      api.clearOverlay();
      api.setScore(0);
      found = 0; total = cfg().diffs.length;
      TIME = cfg().time; left = TIME;
      alive = true;
      elFb.textContent = '';
      elFb.className = 'math-fb';
      buildPanels();
      renderLevels();
      hud();
      startTimer();
    }

    function onTile(e) {
      if (!alive) return;
      var b = e.target.closest('#so-b .ans-btn');
      if (!b || b.classList.contains('right')) return;
      if (b.dataset.diff === '1') {
        b.dataset.diff = '0';
        b.classList.add('right');
        found++;
        api.addScore(30);
        api.sfx('good');
        elFb.textContent = 'Nice eye! 🔍';
        elFb.className = 'math-fb ok';
        hud();
        if (found >= total) {
          levelClear();
        }
      } else {
        left = Math.max(0, left - 3);
        api.sfx('bad');
        b.classList.remove('wrong');
        void b.offsetWidth;
        b.classList.add('wrong');
        elFb.textContent = 'Same picture — 3s lost!';
        elFb.className = 'math-fb no';
        hud();
        if (left <= 0) fail();
      }
    }

    function onLevels(e) {
      var b = e.target.closest('.lv-btn');
      if (b && !b.classList.contains('locked') && !b.disabled) {
        var n = parseInt(b.dataset.lv, 10);
        if (n !== level && n <= unlocked) { api.sfx('click'); startLevel(n); }
      }
    }

    panelB.addEventListener('click', onTile);
    elLevels.addEventListener('click', onLevels);

    startLevel(1);

    return function () {
      alive = false;
      stopTimer();
      panelB.removeEventListener('click', onTile);
      elLevels.removeEventListener('click', onLevels);
    };
  }
});
