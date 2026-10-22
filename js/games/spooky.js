/* Giggle Manor — a silly (never scary) ghost hide-and-seek with a flashlight.
   5 levels: tighter torch, faster giggles, bigger goals. Kid-safe: giggles and stars only. */
GamePortal.register('spooky', {
  title: 'Giggle Manor',
  emoji: '👻',
  cat: 'kids',
  c1: '#4c1d95',
  c2: '#a78bfa',
  tags: ['ghost', 'spooky', 'horror', 'haunted', 'hide', 'seek', 'kids', 'flashlight', 'cute', 'manor', 'levels'],
  rating: 4.7,
  plays: '0.3M',
  badge: 'New',
  controls: 'Move the flashlight · tap the door Giggles hides behind · beat each level goal',
  desc: 'Giggles the baby ghost loves hide-and-seek in the old manor! Sweep your flashlight across the dark rooms and catch Giggles before the lights come on. Five levels — the torch shrinks and Giggles gets quicker!',
  play: function (stage, api) {
    var LEVELS = [
      { time: 90, goal: 12, delay: 750, rad: 95 },
      { time: 80, goal: 15, delay: 650, rad: 90 },
      { time: 70, goal: 18, delay: 560, rad: 82 },
      { time: 60, goal: 22, delay: 480, rad: 74 },
      { time: 55, goal: 26, delay: 420, rad: 66 }
    ];
    var key = 'ph_spooky_lvl';
    var unlocked = Math.min(LEVELS.length, Math.max(1, GamePortal.store.get(key, 1)));
    var level = 1;

    var wrap = document.createElement('div');
    wrap.className = 'math-wrap';
    wrap.dataset.room = '-1';
    wrap.dataset.found = '0';
    wrap.dataset.miss = '0';
    wrap.dataset.level = '1';
    wrap.innerHTML =
      '<div class="lv-strip" id="sp-levels"><span class="lv-strip-label">Level</span></div>' +
      '<div class="math-top"><span class="math-stat" id="sp-found">👻 0 found</span>' +
      '<span class="math-stat" id="sp-miss">🕸️ 0 miss</span></div>' +
      '<div class="lv-goal" id="sp-goal"></div>' +
      '<div class="timer-bar"><div class="timer-fill" id="sp-time"></div></div>' +
      '<div class="sp-room" id="sp-room">' +
        '<div class="sp-doors" id="sp-doors"></div>' +
        '<div class="sp-torch" id="sp-torch"></div>' +
      '</div>' +
      '<div class="hint">Shine the light · tap where you hear “hee hee!”</div>';
    stage.appendChild(wrap);

    var room = wrap.querySelector('#sp-room');
    var doorsEl = wrap.querySelector('#sp-doors');
    var torch = wrap.querySelector('#sp-torch');
    var elFound = wrap.querySelector('#sp-found');
    var elMiss = wrap.querySelector('#sp-miss');
    var elTime = wrap.querySelector('#sp-time');
    var elGoal = wrap.querySelector('#sp-goal');
    var elLevels = wrap.querySelector('#sp-levels');
    var room_i = -1, found = 0, miss = 0, left = LEVELS[0].time, TIME = LEVELS[0].time, GOAL = LEVELS[0].goal;
    var alive = true, busy = false, timer = null;

    for (var i = 0; i < 6; i++) {
      var d = document.createElement('button');
      d.className = 'sp-door';
      d.type = 'button';
      d.dataset.i = String(i);
      d.textContent = '🚪';
      doorsEl.appendChild(d);
    }
    var doors = Array.prototype.slice.call(doorsEl.children);

    function cfg() { return LEVELS[level - 1]; }
    function renderLevels() {
      var html = '<span class="lv-strip-label">Level</span>';
      for (var n = 1; n <= LEVELS.length; n++) {
        var cls = 'lv-btn' + (n === level ? ' on' : '') + (n > unlocked ? ' locked' : '');
        html += '<button type="button" class="' + cls + '" data-lv="' + n + '"' + (n > unlocked ? ' disabled' : '') + '>' + n + '</button>';
      }
      elLevels.innerHTML = html;
      elGoal.textContent = 'Catch Giggles ' + cfg().goal + ' times in ' + cfg().time + 's';
      wrap.dataset.level = String(level);
    }
    function hud() {
      elFound.textContent = '👻 ' + found + ' / ' + GOAL + ' found';
      elMiss.textContent = '🕸️ ' + miss + ' miss';
      elTime.style.width = Math.max(0, (left / TIME) * 100) + '%';
      wrap.dataset.room = String(room_i);
      wrap.dataset.found = String(found);
      wrap.dataset.miss = String(miss);
      api.setScore(found * 10);
    }
    function newHide() {
      doors.forEach(function (x) { x.textContent = '🚪'; x.classList.remove('caught'); });
      var next = Math.floor(Math.random() * doors.length);
      if (next === room_i) next = (next + 3) % doors.length;
      room_i = next;
      hud();
    }
    function moveTorch(clientX, clientY) {
      var r = room.getBoundingClientRect();
      var x = Math.max(0, Math.min(r.width, clientX - r.left));
      var y = Math.max(0, Math.min(r.height, clientY - r.top));
      var rad = cfg().rad;
      torch.style.background = 'radial-gradient(circle ' + rad + 'px at ' + x + 'px ' + y + 'px,transparent 0,transparent 55%,rgba(5,5,20,.88) 100%)';
      room.dataset.tx = String(Math.round(x));
      room.dataset.ty = String(Math.round(y));
    }
    room.addEventListener('pointermove', function (e) { moveTorch(e.clientX, e.clientY); });
    room.addEventListener('pointerdown', function (e) { moveTorch(e.clientX, e.clientY); });

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
            title: '🌙 Lights on!',
            text: 'Level ' + level + ': you caught Giggles ' + found + ' of ' + GOAL + ' times.',
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
          title: 'Giggle Champion! 👻',
          text: 'All ' + LEVELS.length + ' levels cleared — ' + api.score + ' points!'
        });
        return;
      }
      api.sfx('win');
      api.overlay({
        emoji: '🎉',
        title: 'Level ' + level + ' complete!',
        text: 'Next: catch Giggles ' + LEVELS[level].goal + ' times in ' + LEVELS[level].time + 's — smaller torch!',
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

    doorsEl.addEventListener('click', function (e) {
      if (!alive || busy) return;
      var b = e.target.closest('.sp-door');
      if (!b) return;
      var i = parseInt(b.dataset.i, 10);
      if (i === room_i) {
        busy = true;
        b.textContent = '👻';
        b.classList.add('caught');
        found++;
        api.sfx('good');
        hud();
        if (found >= GOAL) { busy = false; finishLevel(); return; }
        setTimeout(function () {
          if (!alive) return;
          newHide();
          busy = false;
        }, cfg().delay);
      } else {
        miss++;
        api.sfx('bad');
        b.textContent = '🕸️';
        setTimeout(function () { if (b.textContent === '🕸️') b.textContent = '🚪'; }, 500);
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
    };
  }
});
