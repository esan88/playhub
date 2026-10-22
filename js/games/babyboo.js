/* Baby Boo Peek-a-Boo — a gentle peek-a-boo game with Boo the baby ghost.
   5 nursery levels: tighter timers, more finds, more lights-out rounds. Kid-safe: giggles only. */
GamePortal.register('babyboo', {
  title: 'Baby Boo Peek-a-Boo',
  emoji: '🍼',
  cat: 'kids',
  c1: '#1e3a8a',
  c2: '#93c5fd',
  tags: ['baby', 'blue', 'horror', 'ghost', 'peekaboo', 'nursery', 'peek-a-boo', 'hide', 'kids', 'cute', 'tap', 'levels'],
  rating: 4.8,
  plays: '0.4M',
  badge: 'New',
  controls: 'Tap where Boo is hiding · beat each level goal · tap only',
  desc: 'Boo the baby ghost loves peek-a-boo in the moonlit nursery! Tap the curtain, box or blanket Boo hides behind. Clear 5 levels — each one asks for more finds in less time, with more lights-out rounds!',
  play: function (stage, api) {
    var COVERS = ['🪟', '📦', '🛏️', '🧸', '🚪', '🧺'];
    var LEVELS = [
      { time: 60, goal: 10, nightEvery: 5 },
      { time: 55, goal: 12, nightEvery: 4 },
      { time: 50, goal: 14, nightEvery: 4 },
      { time: 45, goal: 16, nightEvery: 3 },
      { time: 40, goal: 18, nightEvery: 3 }
    ];
    var key = 'ph_babyboo_lvl';
    var unlocked = Math.min(LEVELS.length, Math.max(1, GamePortal.store.get(key, 1)));
    var level = 1;

    var wrap = document.createElement('div');
    wrap.className = 'math-wrap';
    wrap.dataset.hide = '-1';
    wrap.dataset.found = '0';
    wrap.dataset.miss = '0';
    wrap.dataset.level = '1';
    wrap.innerHTML =
      '<div class="lv-strip" id="bb-levels"><span class="lv-strip-label">Level</span></div>' +
      '<div class="math-top"><span class="math-stat" id="bb-found">👻 0 found</span>' +
      '<span class="math-stat" id="bb-miss">🌙 0 miss</span></div>' +
      '<div class="lv-goal" id="bb-goal"></div>' +
      '<div class="timer-bar"><div class="timer-fill" id="bb-time"></div></div>' +
      '<div class="pg-grid" id="bb-grid" style="grid-template-columns:repeat(3,1fr)"></div>' +
      '<div class="hint" id="bb-hint">Where is Boo hiding?</div>';
    stage.appendChild(wrap);

    var grid = wrap.querySelector('#bb-grid');
    var elFound = wrap.querySelector('#bb-found');
    var elMiss = wrap.querySelector('#bb-miss');
    var elTime = wrap.querySelector('#bb-time');
    var elHint = wrap.querySelector('#bb-hint');
    var elGoal = wrap.querySelector('#bb-goal');
    var elLevels = wrap.querySelector('#bb-levels');
    var hide = -1, found = 0, miss = 0, left = LEVELS[0].time, TIME = LEVELS[0].time, GOAL = LEVELS[0].goal;
    var alive = true, busy = false, timer = null, nightTO = null;

    for (var i = 0; i < 6; i++) {
      var b = document.createElement('button');
      b.className = 'pg-spot';
      b.type = 'button';
      b.dataset.i = String(i);
      b.innerHTML = '<span class="pg-cover">' + COVERS[i] + '</span><span class="pg-bird">👻</span>';
      grid.appendChild(b);
    }

    function cfg() { return LEVELS[level - 1]; }
    function renderLevels() {
      var html = '<span class="lv-strip-label">Level</span>';
      for (var n = 1; n <= LEVELS.length; n++) {
        var cls = 'lv-btn' + (n === level ? ' on' : '') + (n > unlocked ? ' locked' : '');
        html += '<button type="button" class="' + cls + '" data-lv="' + n + '"' + (n > unlocked ? ' disabled' : '') + '>' + n + '</button>';
      }
      elLevels.innerHTML = html;
      elGoal.textContent = 'Find Boo ' + cfg().goal + ' times in ' + cfg().time + 's';
      wrap.dataset.level = String(level);
    }
    function hud() {
      elFound.textContent = '👻 ' + found + ' / ' + GOAL + ' found';
      elMiss.textContent = '🌙 ' + miss + ' miss';
      elTime.style.width = Math.max(0, (left / TIME) * 100) + '%';
      wrap.dataset.hide = String(hide);
      wrap.dataset.found = String(found);
      wrap.dataset.miss = String(miss);
      api.setScore(Math.max(0, found * 10 - miss * 2));
    }
    function newHide() {
      grid.querySelectorAll('.pg-open,.pg-no,.lit').forEach(function (s) {
        s.classList.remove('pg-open', 'pg-no', 'lit');
      });
      var next = Math.floor(Math.random() * 6);
      if (next === hide) next = (next + 3) % 6;
      hide = next;
      var ne = cfg().nightEvery;
      if (found > 0 && found % ne === 0) {
        wrap.classList.add('night');
        grid.children[hide].classList.add('lit');
        elHint.textContent = '🌙 Lights out! Follow the night-light glow…';
        if (nightTO) clearTimeout(nightTO);
        nightTO = setTimeout(function () {
          wrap.classList.remove('night');
          elHint.textContent = 'Where is Boo hiding?';
        }, Math.max(3000, 5000 - level * 400));
      } else {
        elHint.textContent = 'Where is Boo hiding?';
      }
      hud();
    }
    function stopTimer() { if (timer) { clearInterval(timer); timer = null; } }
    function startTimer() {
      stopTimer();
      timer = setInterval(function () {
        if (!alive) return;
        left--;
        hud();
        if (left <= 0) {
          alive = false;
          stopTimer();
          api.gameOver({
            title: '🌙 Nap time!',
            text: 'Level ' + level + ': you found Boo ' + found + ' of ' + GOAL + ' times with ' + miss + ' misses.',
            onAgain: function () { api.clearOverlay(); startLevel(level); }
          });
        }
      }, 1000);
    }
    function finishLevel() {
      alive = false;
      stopTimer();
      if (level > unlocked) { unlocked = level; GamePortal.store.set(key, unlocked); }
      if (level >= LEVELS.length) {
        api.win({
          title: 'Peek-a-Boo Star! 🌟',
          text: 'All ' + LEVELS.length + ' levels cleared — ' + api.score + ' points!'
        });
        return;
      }
      api.sfx('win');
      api.overlay({
        emoji: '🌟',
        title: 'Level ' + level + ' complete!',
        text: 'Next: find Boo ' + LEVELS[level].goal + ' times in ' + LEVELS[level].time + 's.',
        score: api.score,
        best: api.getBest(),
        onAgain: function () { api.clearOverlay(); level++; startLevel(level); }
      });
    }
    function startLevel(n) {
      level = Math.max(1, Math.min(LEVELS.length, n));
      api.clearOverlay();
      api.setScore(0);
      found = 0; miss = 0; alive = true; busy = false;
      TIME = cfg().time; GOAL = cfg().goal; left = TIME;
      wrap.classList.remove('night');
      if (nightTO) { clearTimeout(nightTO); nightTO = null; }
      renderLevels();
      newHide();
      startTimer();
    }

    grid.addEventListener('click', function (e) {
      if (!alive || busy) return;
      var b = e.target.closest('.pg-spot');
      if (!b) return;
      var i = parseInt(b.dataset.i, 10);
      if (i === hide) {
        busy = true;
        b.classList.add('pg-open');
        b.querySelector('.pg-bird').classList.add('boo-pop');
        found++;
        elHint.textContent = 'Peek-a-boo! Boo giggles! 💕';
        api.sfx('good');
        hud();
        if (found >= GOAL) { busy = false; finishLevel(); return; }
        setTimeout(function () {
          if (!alive) return;
          newHide();
          busy = false;
        }, Math.max(600, 900 - level * 60));
      } else {
        miss++;
        api.sfx('bad');
        b.classList.remove('pg-no');
        void b.offsetWidth;
        b.classList.add('pg-no');
        elHint.textContent = 'Boo is still hiding… try again!';
        hud();
      }
    });
    elLevels.addEventListener('click', function (e) {
      var lvb = e.target.closest('.lv-btn');
      if (lvb && !lvb.classList.contains('locked')) {
        var n = parseInt(lvb.dataset.lv, 10);
        if (n !== level && n <= unlocked) { api.sfx('click'); startLevel(n); }
      }
    });

    startLevel(1);

    return function () {
      alive = false;
      stopTimer();
      if (nightTO) { clearTimeout(nightTO); nightTO = null; }
    };
  }
});
