/* Whack-a-Mole */
GamePortal.register('whack', {
  title: 'Whack-a-Mole',
  emoji: '🔨',
  cat: 'casual',
  c1: '#5c3d2e',
  c2: '#f4a261',
  tags: ['whack', 'mole', 'reaction', 'casual', 'arcade', 'fun'],
  rating: 4.5,
  plays: '2.4M',
  badge: 'Fun',
  controls: 'Click / tap the moles before they duck · avoid the bombs',
  desc: 'Reaction reflexes at full speed. Bonk every mole that pops up, grab the golden ones, and never hit a bomb.',
  play: function (stage, api) {
    var LEVELS = [
      { goal: 10, pop: 1 },
      { goal: 15, pop: 0.9 },
      { goal: 20, pop: 0.8 },
      { goal: 25, pop: 0.7 },
      { goal: 30, pop: 0.6 }
    ];
    var key = 'ph_whack_lvl';
    var unlocked = Math.min(LEVELS.length, Math.max(1, GamePortal.store.get(key, 1)));
    var level = 1;
    var ROUND = 45;
    var timeLeft = ROUND, dead = false, streak = 0, tick = null, popTimer = null;
    var MOLES = ['🐹', '🐭', '🦫', '🦊', '🐰'];

    var wrap = document.createElement('div');
    wrap.className = 'whack';
    wrap.dataset.level = '1';
    wrap.innerHTML =
      '<div class="lv-strip" id="wk-levels"><span class="lv-strip-label">Level</span></div>' +
      '<div class="lv-goal" id="wk-goal"></div>' +
      '<div class="math-top">' +
        '<span class="math-stat">Streak <b id="w-streak">0</b></span>' +
        '<span class="math-stat">Whacked <b id="w-hit">0</b></span>' +
        '<span class="math-stat">Time <b id="w-time">45</b>s</span>' +
      '</div>' +
      '<div class="timer-bar" style="width:min(430px,92%)"><div class="timer-fill" id="w-fill"></div></div>' +
      '<div class="whack-grid" id="w-grid">' +
        Array(9).fill(0).map(function () {
          return '<div class="hole"><span class="mole">🐹</span></div>';
        }).join('') +
      '</div>' +
      '<div class="hint">🐹 mole +10 · ⭐ golden +40 · 💣 bomb −30</div>';
    stage.appendChild(wrap);

    var holes = Array.prototype.slice.call(wrap.querySelectorAll('.hole'));
    var elStreak = wrap.querySelector('#w-streak');
    var elHit = wrap.querySelector('#w-hit');
    var elTime = wrap.querySelector('#w-time');
    var elFill = wrap.querySelector('#w-fill');
    var elGoal = wrap.querySelector('#wk-goal');
    var elLevels = wrap.querySelector('#wk-levels');
    var hitCount = 0, current = null;

    function cfg() { return LEVELS[level - 1]; }
    function renderLevels() {
      var html = '<span class="lv-strip-label">Level</span>';
      for (var n = 1; n <= LEVELS.length; n++) {
        var cls = 'lv-btn' + (n === level ? ' on' : '') + (n > unlocked ? ' locked' : '');
        html += '<button type="button" class="' + cls + '" data-lv="' + n + '"' + (n > unlocked ? ' disabled' : '') + '>' + n + '</button>';
      }
      elLevels.innerHTML = html;
      elGoal.textContent = 'Whack ' + cfg().goal + ' moles to clear level ' + level + '!';
      wrap.dataset.level = String(level);
    }
    function stopTimers() {
      if (tick) { clearInterval(tick); tick = null; }
      if (popTimer) { clearTimeout(popTimer); popTimer = null; }
      holes.forEach(function (h) { if (h._t) { clearTimeout(h._t); h._t = null; } });
    }
    function startLevel(n) {
      level = Math.max(1, Math.min(LEVELS.length, n));
      api.clearOverlay();
      stopTimers();
      dead = false;
      timeLeft = ROUND;
      streak = 0;
      hitCount = 0;
      current = null;
      elStreak.textContent = '0';
      elHit.textContent = '0';
      elTime.textContent = String(ROUND);
      elFill.style.width = '100%';
      holes.forEach(function (h) { h.classList.remove('up', 'bonk'); });
      api.setScore(0);
      renderLevels();
      tick = setInterval(loop, 100);
      popUp();
    }
    function levelClear() {
      if (dead) return;
      dead = true;
      stopTimers();
      if (level > unlocked) { unlocked = level; GamePortal.store.set(key, unlocked); }
      api.sfx('win');
      if (level >= LEVELS.length) {
        api.win({
          title: 'Whack Champion! 🏆',
          text: 'All ' + LEVELS.length + ' levels cleared — ' + api.score + ' points!'
        });
        return;
      }
      api.overlay({
        emoji: '🔨',
        title: 'Level ' + level + ' complete!',
        text: 'Next: whack ' + LEVELS[level].goal + ' moles.',
        score: api.score,
        best: api.getBest(),
        onAgain: function () { api.clearOverlay(); level++; startLevel(level); }
      });
    }

    function hide(el) {
      el.classList.remove('up', 'bonk');
      if (current === el) current = null;
    }

    function popUp() {
      if (dead) return;
      var free = holes.filter(function (h) { return !h.classList.contains('up'); });
      if (free.length) {
        var hole = free[Math.floor(Math.random() * free.length)];
        var mole = hole.querySelector('.mole');
        var roll = Math.random();
        if (roll < 0.12) mole.textContent = '💣';
        else if (roll < 0.27) mole.textContent = '⭐';
        else mole.textContent = MOLES[Math.floor(Math.random() * MOLES.length)];
        hole.classList.remove('bonk');
        hole.classList.add('up');
        current = hole;

        var life = Math.max(520, 1050 - (ROUND - timeLeft) * 9);
        hole._t = setTimeout(function () {
          if (hole.classList.contains('up') && !hole.classList.contains('bonk')) {
            streak = 0;
            elStreak.textContent = streak;
            api.sfx('pop');
          }
          hide(hole);
        }, life);
      }
      var gap = Math.max(200, 520 - (ROUND - timeLeft) * 6);
      popTimer = setTimeout(popUp, (gap + Math.random() * 260) * cfg().pop);
    }

    function whack(hole) {
      if (dead || !hole.classList.contains('up')) return;
      var mole = hole.querySelector('.mole').textContent;
      clearTimeout(hole._t);
      hole.classList.add('bonk');
      current = null;
      setTimeout(function () { hide(hole); }, 160);

      if (mole === '💣') {
        streak = 0;
        api.addScore(-30);
        api.sfx('bad');
        elStreak.textContent = 0;
      } else {
        streak++;
        hitCount++;
        var pts = mole === '⭐' ? 40 : 10 + Math.min(30, streak);
        api.addScore(pts);
        elHit.textContent = hitCount;
        elStreak.textContent = streak;
        api.sfx(mole === '⭐' ? 'win' : 'good');
        if (hitCount >= cfg().goal) levelClear();
      }
    }

    holes.forEach(function (hole) {
      hole.addEventListener('pointerdown', function (e) {
        e.preventDefault();
        whack(hole);
      });
    });

    function loop() {
      if (dead) return;
      timeLeft -= 0.1;
      if (timeLeft <= 0) {
        timeLeft = 0;
        elTime.textContent = '0';
        elFill.style.width = '0%';
        end();
        return;
      }
      elTime.textContent = Math.ceil(timeLeft);
      elFill.style.width = (timeLeft / ROUND * 100) + '%';
    }

    function end() {
      if (dead) return;
      dead = true;
      stopTimers();
      api.gameOver({
        title: 'Time up!',
        text: 'Level ' + level + ': ' + hitCount + ' moles whacked with a best streak of ' + elStreak.textContent + '.',
        onAgain: function () { api.clearOverlay(); startLevel(level); }
      });
    }

    elLevels.addEventListener('click', function (e) {
      var b = e.target.closest ? e.target.closest('.lv-btn') : null;
      if (!b || b.disabled) return;
      var n = parseInt(b.getAttribute('data-lv'), 10);
      if (n !== level && n <= unlocked) { api.sfx('click'); startLevel(n); }
    });

    startLevel(1);

    return function () {
      dead = true;
      clearTimeout(popTimer);
      clearInterval(tick);
      holes.forEach(function (h) { clearTimeout(h._t); });
    };
  }
});
