/* Peek-a-Pigeon — a pigeon hides in the park. 5 levels of seek-and-flutter.
   Original concept and art (no third-party IP). */
GamePortal.register('pigeon', {
  title: 'Peek-a-Pigeon',
  emoji: '🐦',
  cat: 'kids',
  c1: '#0d9488',
  c2: '#a7f3d0',
  tags: ['pigeon', 'hide', 'hidden', 'objects', 'seek', 'tap', 'kids', 'casual', 'find', 'bird', 'levels'],
  rating: 4.6,
  plays: '0.3M',
  badge: 'New',
  controls: 'Tap the bush where the pigeon hides · beat each level goal · tap only',
  desc: 'A cheeky pigeon is hiding in the park! Watch the bushes, tap the right one and it will flutter away. Clear 5 levels — each one gives you less time and asks for more finds.',
  play: function (stage, api) {
    var COVERS = ['🌳', '🌳', '🌲', '🌳', '🗑️', '📦', '🌳', '🌲', '🛝', '🌳', '📦', '🌲'];
    var LEVELS = [
      { time: 60, goal: 8 },
      { time: 50, goal: 10 },
      { time: 45, goal: 12 },
      { time: 40, goal: 14 },
      { time: 35, goal: 16 }
    ];
    var key = 'ph_pigeon_lvl';
    var unlocked = Math.min(LEVELS.length, Math.max(1, GamePortal.store.get(key, 1)));
    var level = 1;

    var wrap = document.createElement('div');
    wrap.className = 'math-wrap';
    wrap.dataset.hide = '-1';
    wrap.dataset.found = '0';
    wrap.dataset.miss = '0';
    wrap.dataset.level = '1';
    wrap.innerHTML =
      '<div class="lv-strip" id="pg-levels"><span class="lv-strip-label">Level</span></div>' +
      '<div class="math-top"><span class="math-stat" id="pg-found">🐦 0 found</span>' +
      '<span class="math-stat" id="pg-miss">❌ 0 miss</span></div>' +
      '<div class="lv-goal" id="pg-goal"></div>' +
      '<div class="timer-bar"><div class="timer-fill" id="pg-time"></div></div>' +
      '<div class="pg-grid" id="pg-grid"></div>' +
      '<div class="hint">Tap the hiding spot — the pigeon coos when you are close… just kidding, guess!</div>';
    stage.appendChild(wrap);

    var grid = wrap.querySelector('#pg-grid');
    var elFound = wrap.querySelector('#pg-found');
    var elMiss = wrap.querySelector('#pg-miss');
    var elTime = wrap.querySelector('#pg-time');
    var elGoal = wrap.querySelector('#pg-goal');
    var elLevels = wrap.querySelector('#pg-levels');
    var hide = -1, found = 0, miss = 0, left = LEVELS[0].time, TIME = LEVELS[0].time, GOAL = LEVELS[0].goal;
    var alive = true, busy = false, timer = null;

    for (var i = 0; i < 12; i++) {
      var b = document.createElement('button');
      b.className = 'pg-spot';
      b.type = 'button';
      b.dataset.i = String(i);
      b.innerHTML = '<span class="pg-cover">' + COVERS[i] + '</span><span class="pg-bird">🐦</span>';
      grid.appendChild(b);
    }
    var spots = Array.prototype.slice.call(grid.children);

    function cfg() { return LEVELS[level - 1]; }
    function renderLevels() {
      var html = '<span class="lv-strip-label">Level</span>';
      for (var n = 1; n <= LEVELS.length; n++) {
        var cls = 'lv-btn' + (n === level ? ' on' : '') + (n > unlocked ? ' locked' : '');
        html += '<button type="button" class="' + cls + '" data-lv="' + n + '"' + (n > unlocked ? ' disabled' : '') + '>' + n + '</button>';
      }
      elLevels.innerHTML = html;
      elGoal.textContent = 'Find ' + cfg().goal + ' pigeons in ' + cfg().time + 's';
      wrap.dataset.level = String(level);
    }
    function hud() {
      elFound.textContent = '🐦 ' + found + ' / ' + GOAL + ' found';
      elMiss.textContent = '❌ ' + miss + ' miss';
      elTime.style.width = Math.max(0, (left / TIME) * 100) + '%';
      wrap.dataset.hide = String(hide);
      wrap.dataset.found = String(found);
      wrap.dataset.miss = String(miss);
      api.setScore(Math.max(0, found * 10 - miss * 2));
    }
    function newHide() {
      grid.querySelectorAll('.pg-open,.pg-no').forEach(function (s) {
        s.classList.remove('pg-open', 'pg-no');
      });
      var next = Math.floor(Math.random() * spots.length);
      if (next === hide) next = (next + 5) % spots.length;
      hide = next;
      hud();
    }
    function finishLevel() {
      alive = false;
      stopTimer();
      if (level > unlocked) { unlocked = level; GamePortal.store.set(key, unlocked); }
      if (level >= LEVELS.length) {
        api.win({
          title: 'Pigeon Master! 🏆',
          text: 'All ' + LEVELS.length + ' levels cleared — ' + api.score + ' points!'
        });
        return;
      }
      api.sfx('win');
      api.overlay({
        emoji: '🕊️',
        title: 'Level ' + level + ' complete!',
        text: 'Next: find ' + LEVELS[level].goal + ' in ' + LEVELS[level].time + ' seconds.',
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
      renderLevels();
      newHide();
      startTimer();
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
            title: '🐦 Time!',
            text: 'Level ' + level + ': you found ' + found + ' of ' + GOAL + ' with ' + miss + ' misses.',
            onAgain: function () { api.clearOverlay(); startLevel(level); }
          });
        }
      }, 1000);
    }
    function onTap(e) {
      if (!alive || busy) return;
      var b = e.target.closest('.pg-spot');
      if (!b) return;
      var i = parseInt(b.dataset.i, 10);
      if (i === hide) {
        busy = true;
        b.classList.add('pg-open');
        found++;
        api.sfx('good');
        hud();
        if (found >= GOAL) { busy = false; finishLevel(); return; }
        setTimeout(function () {
          if (!alive) return;
          newHide();
          busy = false;
        }, 650);
      } else {
        miss++;
        api.sfx('bad');
        b.classList.remove('pg-no');
        void b.offsetWidth;
        b.classList.add('pg-no');
        hud();
      }
    }
    elLevels.addEventListener('click', function (e) {
      var lvb = e.target.closest('.lv-btn');
      if (lvb && !lvb.classList.contains('locked')) {
        var n = parseInt(lvb.dataset.lv, 10);
        if (n !== level && n <= unlocked) { api.sfx('click'); startLevel(n); }
      }
    });
    grid.addEventListener('click', onTap);
    startLevel(1);

    return function () {
      alive = false;
      stopTimer();
    };
  }
});
