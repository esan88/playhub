/* Emoji Jigsaw — scrambled emoji-tile swap puzzle.
   Tap two tiles to swap them until the picture is back in order. */
GamePortal.register('jigsaw', {
  title: 'Emoji Jigsaw',
  emoji: '🧩',
  cat: 'puzzle',
  c1: '#ea580c',
  c2: '#facc15',
  tags: ['jigsaw', 'puzzle', 'tiles', 'swap', 'picture', 'brain', 'kids', 'fun', 'scene', 'complete'],
  rating: 4.7,
  plays: '0.4M',
  badge: 'Fun',
  controls: 'Tap two tiles to swap them — put the picture back together!',
  desc: 'A cute emoji picture has been all mixed up! Tap one tile, then another, to swap them until the scene is perfect. Five jigsaws from 3×3 up to 7×7 — with a move counter to beat.',
  play: function (stage, api) {
    var LEVELS = [
      {
        size: 3, time: 120,
        pic: ['🌞', '🌻', '🦋', '🐝', '🌷', '🐞', '🌳', '🌈', '☀️']
      },
      {
        size: 4, time: 150,
        pic: ['🌊', '🐟', '🐚', '⭐', '🐢', '🐬', '🪸', '🦀', '🐠', '🐡', '🐙', '🦈', '🌊', '⭐', '🌊', '🐚']
      },
      {
        size: 5, time: 180,
        pic: [
          '🚗', '🏠', '🌳', '🐱', '🐶',
          '🌞', '☁️', '☁️', '🌲', '🐦',
          '🌷', '🌺', '🛴', '🌷', '🌺',
          '🐕', '🐈', '🍎', '🐕', '🌈',
          '⚽', '🎈', '🎁', '⭐', '🌟'
        ]
      },
      {
        size: 6, time: 210,
        pic: [
          '🏰', '🐉', '🛡️', '👑', '🗡️', '🎩',
          '🧙', '✨', '✨', '🦄', '🌲', '🧑‍⚔️',
          '🏹', '🪄', '📜', '🕯️', '🍄', '🏰',
          '🌲', '🌲', '🧝', '💍', '🪨', '🐉',
          '🦅', '🐐', '⚔️', '🛡️', '👑', '✨',
          '🏰', '🌟', '✨', '🌲', '🦅', '🧙'
        ]
      },
      {
        size: 7, time: 240,
        pic: [
          '🌌', '🌌', '⭐', '🌙', '⭐', '🌌', '🌌',
          '🌌', '🪐', '🌌', '🌌', '🌌', '☄️', '🌌',
          '🚀', '🌌', '🛸', '🌍', '🛸', '🌌', '🛰️',
          '🌌', '⭐', '🌌', '🧑‍🚀', '🌌', '⭐', '🌌',
          '🌠', '🌌', '🌙', '🌌', '🌙', '🌌', '🌠',
          '🌌', '☄️', '🌌', '🌌', '🌌', '🪐', '🌌',
          '🌌', '🌌', '⭐', '🌟', '⭐', '🌌', '🌌'
        ]
      }
    ];
    var key = 'ph_jigsaw_lvl';
    var unlocked = Math.min(LEVELS.length, Math.max(1, GamePortal.store.get(key, 1)));
    var level = 1;

    var box = document.createElement('div');
    box.className = 'kg jm';
    box.dataset.level = '1';
    box.dataset.moves = '0';
    box.dataset.size = '3';
    box.innerHTML =
      '<div class="lv-strip" id="ji-levels"><span class="lv-strip-label">Level</span></div>' +
      '<div class="lv-goal" id="ji-goal"></div>' +
      '<div class="math-top"><span class="math-stat" id="ji-prog">Moves 0</span>' +
      '<span class="math-stat">Time <b id="ji-secs">120</b>s</span></div>' +
      '<div class="timer-bar"><div class="timer-fill" id="ji-time"></div></div>' +
      '<div id="ji-grid" style="display:grid;gap:4px;justify-content:center;margin:10px auto"></div>' +
      '<div class="kg-ctl" style="justify-content:center"><button type="button" id="ji-shuffle">🔀 Shuffle</button></div>';
    stage.appendChild(box);

    var grid = box.querySelector('#ji-grid');
    var elProg = box.querySelector('#ji-prog');
    var elSecs = box.querySelector('#ji-secs');
    var elFill = box.querySelector('#ji-time');
    var elGoal = box.querySelector('#ji-goal');
    var elLevels = box.querySelector('#ji-levels');
    var elShuffle = box.querySelector('#ji-shuffle');

    var tiles = [], size = 3, moves = 0;
    var sel = -1, left = 120, TIME = 120;
    var alive = true, tick = null;

    function cfg() { return LEVELS[level - 1]; }

    function renderLevels() {
      var html = '<span class="lv-strip-label">Level</span>';
      for (var n = 1; n <= LEVELS.length; n++) {
        var cls = 'lv-btn' + (n === level ? ' on' : '') + (n > unlocked ? ' locked' : '');
        html += '<button type="button" class="' + cls + '" data-lv="' + n + '"' + (n > unlocked ? ' disabled' : '') + '>' + n + '</button>';
      }
      elLevels.innerHTML = html;
      elGoal.textContent = 'Level ' + level + ' — solve the ' + size + '×' + size + ' jigsaw!';
      box.dataset.level = String(level);
      box.dataset.size = String(size);
    }

    function hud() {
      elProg.textContent = 'Moves ' + moves;
      elSecs.textContent = String(Math.max(0, Math.ceil(left)));
      elFill.style.width = Math.max(0, (left / TIME) * 100) + '%';
      box.dataset.moves = String(moves);
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
        text: 'Level ' + level + ': the jigsaw needed ' + moves + ' swaps so far.',
        onAgain: function () { api.clearOverlay(); startLevel(level); }
      });
    }

    function isSolved() {
      for (var i = 0; i < tiles.length; i++) {
        if (tiles[i] !== i) return false;
      }
      return true;
    }

    function shuffleTiles() {
      var i, j, t;
      for (i = tiles.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        t = tiles[i]; tiles[i] = tiles[j]; tiles[j] = t;
      }
      if (isSolved() && tiles.length > 1) {
        t = tiles[0]; tiles[0] = tiles[1]; tiles[1] = t;
      }
    }

    function renderGrid() {
      var cell = size >= 7 ? 40 : (size >= 6 ? 46 : (size >= 5 ? 52 : 58));
      var font = Math.round(cell * 0.58);
      grid.style.gridTemplateColumns = 'repeat(' + size + ', ' + cell + 'px)';
      var html = '';
      for (var slot = 0; slot < tiles.length; slot++) {
        var tid = tiles[slot];
        html += '<button type="button" class="ji-tile" data-pos="' + slot + '" data-need="' + tid + '"' +
          ' style="width:' + cell + 'px;height:' + cell + 'px;font-size:' + font + 'px;line-height:1;display:flex;align-items:center;justify-content:center;border-radius:10px;border:2px solid rgba(255,255,255,.28);background:rgba(255,255,255,.1);cursor:pointer">' +
          cfg().pic[tid] + '</button>';
      }
      grid.innerHTML = html;
    }

    function levelClear() {
      alive = false;
      stopTimer();
      api.addScore(100 + Math.max(0, Math.round(left)));
      if (level > unlocked) { unlocked = level; GamePortal.store.set(key, unlocked); }
      if (level >= LEVELS.length) {
        api.win({
          emoji: '🏅',
          title: 'Puzzle Champion!',
          text: 'You solved every jigsaw!'
        });
        return;
      }
      api.sfx('win');
      api.overlay({
        emoji: '🧩',
        title: 'Level ' + level + ' complete!',
        text: 'Next: a bigger ' + LEVELS[level].size + '×' + LEVELS[level].size + ' picture — ' + LEVELS[level].time + 's on the clock!',
        score: api.score,
        best: api.getBest(),
        onAgain: function () { api.clearOverlay(); level++; startLevel(level); }
      });
    }

    function startLevel(n) {
      level = Math.max(1, Math.min(LEVELS.length, n));
      api.clearOverlay();
      api.setScore(0);
      size = cfg().size;
      TIME = cfg().time; left = TIME;
      moves = 0; sel = -1; alive = true;
      tiles = [];
      for (var i = 0; i < size * size; i++) tiles.push(i);
      shuffleTiles();
      renderGrid();
      renderLevels();
      hud();
      startTimer();
    }

    function onGrid(e) {
      if (!alive) return;
      var b = e.target.closest('.ji-tile');
      if (!b) return;
      var pos = parseInt(b.dataset.pos, 10);
      var btns = grid.querySelectorAll('.ji-tile');
      if (sel < 0) {
        sel = pos;
        btns[pos].classList.add('on');
        btns[pos].style.borderColor = '#ffd166';
        btns[pos].style.boxShadow = '0 0 0 2px #ffd166';
        api.sfx('click');
        return;
      }
      if (sel === pos) {
        btns[pos].classList.remove('on');
        btns[pos].style.borderColor = '';
        btns[pos].style.boxShadow = '';
        sel = -1;
        return;
      }
      var a = tiles[sel], c = tiles[pos];
      tiles[sel] = c; tiles[pos] = a;
      moves++;
      sel = -1;
      api.sfx('flip');
      renderGrid();
      hud();
      if (isSolved()) {
        api.sfx('win');
        levelClear();
      }
    }

    function onLevels(e) {
      var b = e.target.closest('.lv-btn');
      if (b && !b.classList.contains('locked') && !b.disabled) {
        var n = parseInt(b.dataset.lv, 10);
        if (n !== level && n <= unlocked) { api.sfx('click'); startLevel(n); }
      }
    }

    function onShuffle() {
      if (!alive) return;
      api.sfx('flip');
      startLevel(level);
    }

    grid.addEventListener('click', onGrid);
    elLevels.addEventListener('click', onLevels);
    elShuffle.addEventListener('click', onShuffle);

    startLevel(1);

    return function () {
      alive = false;
      stopTimer();
      grid.removeEventListener('click', onGrid);
      elLevels.removeEventListener('click', onLevels);
      elShuffle.removeEventListener('click', onShuffle);
    };
  }
});
