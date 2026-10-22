/* 2048 Merge */
GamePortal.register('g2048', {
  title: '2048 Merge',
  emoji: '🔢',
  cat: 'puzzle',
  c1: '#2d2a4a',
  c2: '#ff9f1c',
  tags: ['2048', 'numbers', 'merge', 'puzzle', 'tiles', 'math'],
  rating: 4.6,
  plays: '4.2M',
  badge: 'Addictive',
  controls: 'Arrow keys, WASD or swipe to slide all tiles',
  desc: 'Slide matching numbers together to build 2048. Simple rules, brutally deep strategy — plan two moves ahead. Clear 5 levels: merge 128, 256, 512, 1024 and finally 2048!',
  play: function (stage, api) {
    var N = 4, PAD = 9, GAP = 9;
    var LEVELS = [
      { goal: 128 },
      { goal: 256 },
      { goal: 512 },
      { goal: 1024 },
      { goal: 2048 }
    ];
    var key = 'ph_g2048_lvl';
    var unlocked = Math.min(LEVELS.length, Math.max(1, GamePortal.store.get(key, 1)));
    var level = 1;
    var grid, tiles, idSeq, cell, boardW, over = false, busy = false;
    var TARGET = LEVELS[0].goal;

    var wrap = document.createElement('div');
    wrap.className = 'g2048-wrap';
    wrap.dataset.level = '1';
    wrap.innerHTML =
      '<div class="lv-strip" id="g2048-levels"><span class="lv-strip-label">Level</span></div>' +
      '<div class="lv-goal" id="g2048-goal"></div>' +
      '<div class="g2048-info">Score <b id="g-s">0</b> · Tiles <b id="g-n">2</b> · Merge to <b>2048</b></div>' +
      '<div class="g2048-board" id="g-board">' +
        Array(16).fill('<div class="g2048-cell"></div>').join('') +
      '</div>' +
      '<div class="hint">Arrow keys / WASD · swipe on touch</div>';
    stage.appendChild(wrap);

    var boardEl = wrap.querySelector('#g-board');
    var elS = wrap.querySelector('#g-s');
    var elN = wrap.querySelector('#g-n');
    var elGoal = wrap.querySelector('#g2048-goal');
    var elLevels = wrap.querySelector('#g2048-levels');

    function cfg() { return LEVELS[level - 1]; }
    function renderLevels() {
      var html = '<span class="lv-strip-label">Level</span>';
      for (var n = 1; n <= LEVELS.length; n++) {
        var cls = 'lv-btn' + (n === level ? ' on' : '') + (n > unlocked ? ' locked' : '');
        html += '<button type="button" class="' + cls + '" data-lv="' + n + '"' + (n > unlocked ? ' disabled' : '') + '>' + n + '</button>';
      }
      elLevels.innerHTML = html;
      elGoal.textContent = 'Merge a ' + cfg().goal + ' tile to clear level ' + level + '!';
      wrap.dataset.level = String(level);
    }

    function measure() {
      boardW = boardEl.clientWidth || 340;
      cell = (boardW - PAD * 2 - GAP * (N - 1)) / N;
    }

    function pos(r, c) {
      return { x: PAD + c * (cell + GAP), y: PAD + r * (cell + GAP) };
    }

    function tileClass(v) { return 'g2048-tile t' + (v <= 2048 ? v : 'big'); }

    function makeTile(r, c, v) {
      var t = { id: ++idSeq, r: r, c: c, v: v };
      var el = document.createElement('div');
      el.className = tileClass(v) + ' pop';
      el.textContent = v;
      var p = pos(r, c);
      el.style.left = '0px';
      el.style.top = '0px';
      el.style.transform = 'translate(' + p.x + 'px,' + p.y + 'px)';
      boardEl.appendChild(el);
      t.el = el;
      tiles.push(t);
      grid[r][c] = t;
      return t;
    }

    function place(t, r, c) {
      t.r = r; t.c = c;
      var p = pos(r, c);
      t.el.style.transform = 'translate(' + p.x + 'px,' + p.y + 'px)';
      grid[r][c] = t;
    }

    function spawn() {
      var free = [];
      for (var r = 0; r < N; r++)
        for (var c = 0; c < N; c++) if (!grid[r][c]) free.push([r, c]);
      if (!free.length) return;
      var spot = free[Math.floor(Math.random() * free.length)];
      makeTile(spot[0], spot[1], Math.random() < 0.9 ? 2 : 4);
      elN.textContent = tiles.length;
    }

    function maxTile() {
      var m = 0;
      for (var i = 0; i < tiles.length; i++) if (tiles[i].v > m) m = tiles[i].v;
      return m;
    }

    function canMove() {
      for (var r = 0; r < N; r++)
        for (var c = 0; c < N; c++) {
          var t = grid[r][c];
          if (!t) return true;
          if (r + 1 < N && grid[r + 1][c] && grid[r + 1][c].v === t.v) return true;
          if (c + 1 < N && grid[r][c + 1] && grid[r][c + 1].v === t.v) return true;
        }
      return false;
    }

    function levelClear() {
      over = true;
      if (level > unlocked) { unlocked = level; GamePortal.store.set(key, unlocked); }
      if (level >= LEVELS.length) {
        api.win({
          emoji: '👑',
          title: '2048 reached!',
          text: 'Brilliant! All ' + LEVELS.length + ' levels cleared — ' + api.score + ' points!'
        });
        return;
      }
      api.sfx('win');
      api.overlay({
        emoji: '🌟',
        title: 'Level ' + level + ' complete!',
        text: 'Next: merge a ' + LEVELS[level].goal + ' tile.',
        score: api.score,
        best: api.getBest(),
        onAgain: function () { api.clearOverlay(); level++; startLevel(level); }
      });
    }

    function move(dir) {
      if (over || busy) return;
      busy = true;
      var moved = false;
      var gained = 0;
      var removed = [];
      var vertical = dir === 'up' || dir === 'down';
      var reverse = dir === 'down' || dir === 'right';

      for (var i = 0; i < N; i++) {
        var line = [];
        for (var j = 0; j < N; j++) {
          var r = vertical ? (reverse ? N - 1 - j : j) : i;
          var c = vertical ? i : (reverse ? N - 1 - j : j);
          var t = grid[r][c];
          if (t) line.push(t);
        }

        var out = [];
        line.forEach(function (t) {
          var prev = out[out.length - 1];
          if (prev && prev.v === t.v && !prev.merged) {
            prev.v *= 2;
            prev.merged = true;
            gained += prev.v;
            removed.push({ t: t, surv: prev });
          } else {
            out.push(t);
          }
        });

        for (var k = 0; k < N; k++) {
          var rr = vertical ? (reverse ? N - 1 - k : k) : i;
          var cc = vertical ? i : (reverse ? N - 1 - k : k);
          grid[rr][cc] = null;
          var tile = out[k] || null;
          if (tile) {
            if (tile.r !== rr || tile.c !== cc) moved = true;
            place(tile, rr, cc);
          }
        }
      }

      removed.forEach(function (m) {
        moved = true;
        var el = m.t.el;
        var p = pos(m.surv.r, m.surv.c);
        el.style.transition = 'transform .1s ease-in, opacity .12s ease-in';
        el.style.transform = 'translate(' + p.x + 'px,' + p.y + 'px) scale(.45)';
        el.style.opacity = '0';
        tiles = tiles.filter(function (x) { return x !== m.t; });
        setTimeout(function () { el.remove(); }, 150);
      });

      var mergedTiles = tiles.filter(function (t) { return t.merged; });
      if (mergedTiles.length) {
        setTimeout(function () {
          mergedTiles.forEach(function (t) {
            t.merged = false;
            t.el.textContent = t.v;
            t.el.className = tileClass(t.v) + ' pop';
          });
        }, 100);
      }

      if (!moved) { busy = false; api.sfx('bad'); return; }

      api.addScore(gained);
      api.sfx(gained ? 'good' : 'pop');
      elN.textContent = tiles.length;

      setTimeout(function () {
        spawn();
        var mt = maxTile();
        if (mt >= TARGET) {
          levelClear();
        } else if (!canMove()) {
          over = true;
          api.gameOver({
            title: 'No more moves',
            text: 'Level ' + level + ': you merged up to ' + mt + '.',
            onAgain: function () { api.clearOverlay(); startLevel(level); }
          });
        }
        busy = false;
      }, 140);
    }

    function startLevel(n) {
      level = Math.max(1, Math.min(LEVELS.length, n));
      api.clearOverlay();
      TARGET = cfg().goal;
      measure();
      boardEl.querySelectorAll('.g2048-tile').forEach(function (el) { el.remove(); });
      grid = [];
      for (var r = 0; r < N; r++) { grid.push([null, null, null, null]); }
      tiles = [];
      idSeq = 0;
      api.setScore(0);
      spawn();
      spawn();
      over = false;
      busy = false;
      renderLevels();
    }

    function onKey(e) {
      var map = {
        ArrowUp: 'up', ArrowDown: 'down', ArrowLeft: 'left', ArrowRight: 'right',
        w: 'up', s: 'down', a: 'left', d: 'right',
        W: 'up', S: 'down', A: 'left', D: 'right'
      };
      var dir = map[e.key];
      if (!dir) return;
      e.preventDefault();
      move(dir);
    }

    var sx = 0, sy = 0, pid = null;
    function onSwipeDown(e) {
      if (e.button !== undefined && e.button !== 0) return;
      pid = e.pointerId;
      sx = e.clientX; sy = e.clientY;
      if (boardEl.setPointerCapture) { try { boardEl.setPointerCapture(e.pointerId); } catch (err) {} }
    }
    function onSwipeUp(e) {
      if (pid === null || e.pointerId !== pid) return;
      pid = null;
      var dx = e.clientX - sx;
      var dy = e.clientY - sy;
      if (Math.max(Math.abs(dx), Math.abs(dy)) < 24) return;
      move(Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? 'right' : 'left') : (dy > 0 ? 'down' : 'up'));
    }
    function onSwipeCancel() { pid = null; }

    elLevels.addEventListener('click', function (e) {
      var b = e.target.closest ? e.target.closest('.lv-btn') : null;
      if (!b || b.disabled) return;
      var n = parseInt(b.getAttribute('data-lv'), 10);
      if (n !== level && n <= unlocked) { api.sfx('click'); startLevel(n); }
    });

    document.addEventListener('keydown', onKey);
    boardEl.addEventListener('pointerdown', onSwipeDown);
    boardEl.addEventListener('pointerup', onSwipeUp);
    boardEl.addEventListener('pointercancel', onSwipeCancel);
    var onResize = function () {
      measure();
      tiles.forEach(function (t) { place(t, t.r, t.c); });
    };
    window.addEventListener('resize', onResize);

    startLevel(1);
    var scoreWatch = setInterval(function () { elS.textContent = api.score; }, 120);

    return function () {
      over = true;
      document.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
      boardEl.removeEventListener('pointerdown', onSwipeDown);
      boardEl.removeEventListener('pointerup', onSwipeUp);
      boardEl.removeEventListener('pointercancel', onSwipeCancel);
      clearInterval(scoreWatch);
    };
  }
});
