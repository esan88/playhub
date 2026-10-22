/* Maze Explorer — guide Astro the rocket through generated mazes to the star.
   Original characters and art: not based on, affiliated with or inspired by
   any existing show. */
GamePortal.register('maze', {
  title: 'Maze Explorer',
  emoji: '🧭',
  cat: 'puzzle',
  c1: '#059669',
  c2: '#fbbf24',
  tags: ['maze', 'explore', 'puzzle', 'navigate', 'brain', 'adventure', 'space', 'stars', 'kids', 'path'],
  rating: 4.8,
  plays: '0.6M',
  badge: 'Adventure',
  controls: 'Use the arrow keys or the on-screen buttons to reach the star!',
  desc: 'Guide Astro through twisting mazes to the golden star! Collect sparkle gems for bonus points and clear 5 mazes from gentle 7×7 grids to twisty 17×17 labyrinths. Arrow keys or touch buttons — no time pressure on the first maze.',
  play: function (stage, api) {
    var S = 360;
    var LEVELS = [
      { cols: 7, rows: 7, time: 0, gems: 0 },
      { cols: 9, rows: 7, time: 60, gems: 1 },
      { cols: 11, rows: 11, time: 75, gems: 2 },
      { cols: 13, rows: 13, time: 90, gems: 3 },
      { cols: 17, rows: 17, time: 110, gems: 3 }
    ];
    var key = 'ph_maze_lvl';
    var unlocked = Math.min(LEVELS.length, Math.max(1, GamePortal.store.get(key, 1)));
    var level = 1;

    var box = document.createElement('div');
    box.className = 'kg jm';
    box.dataset.level = '1';
    box.dataset.moves = '0';
    box.dataset.time = '0';
    box.dataset.gems = '0';

    var lvStrip = document.createElement('div');
    lvStrip.className = 'lv-strip';
    lvStrip.id = 'mz-levels';
    box.appendChild(lvStrip);
    var goalEl = document.createElement('div');
    goalEl.className = 'lv-goal';
    goalEl.id = 'mz-goal';
    box.appendChild(goalEl);

    var top = document.createElement('div');
    top.className = 'math-top';
    top.innerHTML = '<span class="math-stat" id="mz-moves">👣 0 moves</span>' +
      '<span class="math-stat" id="mz-gems">💎 0</span>';
    box.appendChild(top);

    var bar = document.createElement('div');
    bar.className = 'timer-bar';
    bar.innerHTML = '<div class="timer-fill" id="mz-time"></div>';
    box.appendChild(bar);

    var wrap = document.createElement('div');
    wrap.className = 'canvas-wrap';
    var canvas = document.createElement('canvas');
    canvas.className = 'game-canvas';
    wrap.appendChild(canvas);
    box.appendChild(wrap);

    var ctl = document.createElement('div');
    ctl.className = 'kg-ctl';
    ctl.innerHTML = '<button data-mv="up" aria-label="move up">⬆</button>' +
      '<button data-mv="left" aria-label="move left">⬅</button>' +
      '<button data-mv="down" aria-label="move down">⬇</button>' +
      '<button data-mv="right" aria-label="move right">➡</button>';
    box.appendChild(ctl);
    stage.appendChild(box);

    var ctx = api.fitCanvas(canvas, S, S);
    var elLevels = box.querySelector('#mz-levels');
    var elGoal = box.querySelector('#mz-goal');
    var elMoves = box.querySelector('#mz-moves');
    var elGems = box.querySelector('#mz-gems');
    var elTime = box.querySelector('#mz-time');

    var grid = [], cols = 7, rows = 7, cw = S / 7, ch = S / 7;
    var px = 1, py = 1, gx = 5, gy = 5, gems = [], got = 0;
    var moves = 0, left = 0, TIME = 0, alive = true, running = false;
    var timer = null, raf = 0, last = 0, t = 0;

    function cfg() { return LEVELS[level - 1]; }
    function shuffle(a) {
      for (var i = a.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = a[i]; a[i] = a[j]; a[j] = tmp;
      }
      return a;
    }
    function genMaze(c, r) {
      var g = [], y, x;
      for (y = 0; y < r; y++) {
        g[y] = [];
        for (x = 0; x < c; x++) g[y][x] = 1;
      }
      g[1][1] = 0;
      var stack = [[1, 1]];
      while (stack.length) {
        var top = stack[stack.length - 1];
        var dirs = shuffle([[2, 0], [-2, 0], [0, 2], [0, -2]]);
        var carved = false;
        for (var d = 0; d < dirs.length; d++) {
          var nx = top[0] + dirs[d][0], ny = top[1] + dirs[d][1];
          if (nx > 0 && ny > 0 && nx < c - 1 && ny < r - 1 && g[ny][nx] === 1) {
            g[ny][nx] = 0;
            g[top[1] + dirs[d][1] / 2][top[0] + dirs[d][0] / 2] = 0;
            stack.push([nx, ny]);
            carved = true;
            break;
          }
        }
        if (!carved) stack.pop();
      }
      return g;
    }
    function goalText() {
      var g = cfg();
      var s = 'Level ' + level + ' — reach the ⭐ in the ' + g.cols + '×' + g.rows + ' maze';
      if (g.gems > 0) s += ' (collect 💎 for points)';
      return s;
    }
    function nextText() {
      var g = LEVELS[level];
      var s = 'Next: reach the ⭐ in the ' + g.cols + '×' + g.rows + ' maze.';
      if (g.gems > 0) s += ' Grab the 💎 too!';
      return s;
    }
    function renderLevels() {
      var html = '<span class="lv-strip-label">Level</span>';
      for (var n = 1; n <= LEVELS.length; n++) {
        var cls = 'lv-btn' + (n === level ? ' on' : '') + (n > unlocked ? ' locked' : '');
        html += '<button type="button" class="' + cls + '" data-lv="' + n + '"' + (n > unlocked ? ' disabled' : '') + '>' + n + '</button>';
      }
      elLevels.innerHTML = html;
      elGoal.textContent = goalText();
      box.dataset.level = String(level);
    }
    function hud() {
      elMoves.textContent = '👣 ' + moves + ' moves';
      elGems.textContent = '💎 ' + got;
      if (TIME > 0) {
        elTime.style.width = Math.max(0, (left / TIME) * 100) + '%';
        elTime.parentNode.style.display = '';
      } else {
        elTime.style.width = '0%';
        elTime.parentNode.style.display = 'none';
      }
      box.dataset.moves = String(moves);
      box.dataset.time = String(Math.max(0, Math.ceil(left)));
      box.dataset.gems = String(got);
    }
    function stopTimer() { if (timer) { clearInterval(timer); timer = null; } }
    function startTimer() {
      stopTimer();
      if (TIME <= 0) return;
      timer = setInterval(function () {
        if (!alive) return;
        left--;
        hud();
        if (left <= 0) {
          left = 0;
          hud();
          die();
        }
      }, 1000);
    }
    function stopLoop() { if (raf) { cancelAnimationFrame(raf); raf = 0; } }
    function startLevel(n) {
      level = Math.max(1, Math.min(LEVELS.length, n));
      api.clearOverlay();
      api.setScore(0);
      alive = true;
      running = true;
      cols = cfg().cols;
      rows = cfg().rows;
      cw = S / cols;
      ch = S / rows;
      grid = genMaze(cols, rows);
      px = 1; py = 1;
      gx = cols - 2; gy = rows - 2;
      moves = 0; got = 0;
      gems = [];
      var open = [], y, x;
      for (y = 1; y < rows - 1; y++) {
        for (x = 1; x < cols - 1; x++) {
          if (grid[y][x] === 0 && !(x === px && y === py) && !(x === gx && y === gy)) open.push([x, y]);
        }
      }
      shuffle(open);
      for (var i = 0; i < cfg().gems && i < open.length; i++) gems.push(open[i]);
      TIME = cfg().time;
      left = TIME;
      last = 0;
      renderLevels();
      hud();
      startTimer();
    }
    function die() {
      if (!running) return;
      running = false;
      alive = false;
      stopTimer();
      api.gameOver({
        title: '⏰ Time is up!',
        text: 'Level ' + level + ': you made ' + moves + ' moves and found ' + got + ' gems.',
        onAgain: function () { api.clearOverlay(); startLevel(level); }
      });
    }
    function levelClear() {
      if (!running) return;
      running = false;
      alive = false;
      stopTimer();
      api.addScore(50);
      if (level > unlocked) { unlocked = level; GamePortal.store.set(key, unlocked); }
      api.sfx('win');
      if (level >= LEVELS.length) {
        api.win({
          emoji: '🏆',
          title: 'Maze Master!',
          text: 'You conquered every maze!'
        });
        return;
      }
      api.overlay({
        emoji: '🧭',
        title: 'Level ' + level + ' complete!',
        text: nextText(),
        score: api.score,
        best: api.getBest(),
        onAgain: function () { api.clearOverlay(); level++; startLevel(level); }
      });
    }
    function gemAt(x, y) {
      for (var i = 0; i < gems.length; i++) {
        if (gems[i][0] === x && gems[i][1] === y) return i;
      }
      return -1;
    }
    function tryMove(dx, dy) {
      if (!alive || !running) return;
      var nx = px + dx, ny = py + dy;
      if (nx < 0 || ny < 0 || ny >= rows || nx >= cols || grid[ny][nx] === 1) {
        api.sfx('click');
        return;
      }
      px = nx; py = ny;
      moves++;
      var gi = gemAt(px, py);
      if (gi >= 0) {
        gems.splice(gi, 1);
        got++;
        api.sfx('eat');
        api.addScore(20);
      }
      hud();
      if (px === gx && py === gy) {
        levelClear();
      }
    }
    function rr(x, y, w, h, r) {
      if (r > w / 2) r = w / 2;
      if (r > h / 2) r = h / 2;
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.arcTo(x + w, y, x + w, y + h, r);
      ctx.arcTo(x + w, y + h, x, y + h, r);
      ctx.arcTo(x, y + h, x, y, r);
      ctx.arcTo(x, y, x + w, y, r);
      ctx.closePath();
    }
    function draw() {
      ctx.fillStyle = '#0d1b2a';
      ctx.fillRect(0, 0, S, S);

      var fs = Math.max(13, Math.floor(Math.min(cw, ch) * 0.82));

      for (var y = 0; y < rows; y++) {
        for (var x = 0; x < cols; x++) {
          if (grid[y][x] === 1) {
            ctx.fillStyle = (x === 0 || y === 0 || x === cols - 1 || y === rows - 1) ? '#064e3b' : '#059669';
            rr(x * cw + 0.6, y * ch + 0.6, cw - 1.2, ch - 1.2, Math.min(cw, ch) * 0.28);
            ctx.fill();
          }
        }
      }

      ctx.font = fs + 'px serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      var pulse = 1 + Math.sin(t * 4) * 0.06;
      ctx.save();
      ctx.translate(gx * cw + cw / 2, gy * ch + ch / 2);
      ctx.scale(pulse, pulse);
      ctx.fillText('⭐', 0, 0);
      ctx.restore();

      for (var g = 0; g < gems.length; g++) {
        ctx.fillText('💎', gems[g][0] * cw + cw / 2, gems[g][1] * ch + ch / 2);
      }

      ctx.fillText('🚀', px * cw + cw / 2, py * ch + ch / 2);

      ctx.font = 'bold 12px sans-serif';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'top';
      ctx.fillStyle = 'rgba(255,255,255,.85)';
      var hudTxt = 'L' + level + '  👣 ' + moves + '  💎 ' + got;
      if (TIME > 0) hudTxt += '  ⏱ ' + Math.max(0, Math.ceil(left)) + 's';
      ctx.fillText(hudTxt, 8, 7);
    }
    function loop(ts) {
      raf = requestAnimationFrame(loop);
      if (!last) last = ts;
      t += Math.min(0.05, (ts - last) / 1000);
      last = ts;
      draw();
    }
    function onKey(e) {
      var k = e.key ? e.key.toLowerCase() : '';
      if (k === 'arrowup' || k === 'w') { e.preventDefault(); tryMove(0, -1); }
      else if (k === 'arrowdown' || k === 's') { e.preventDefault(); tryMove(0, 1); }
      else if (k === 'arrowleft' || k === 'a') { e.preventDefault(); tryMove(-1, 0); }
      else if (k === 'arrowright' || k === 'd') { e.preventDefault(); tryMove(1, 0); }
    }
    function onCtl(e) {
      var m = e.target.closest ? e.target.closest('[data-mv]') : null;
      if (!m) return;
      var d = m.getAttribute('data-mv');
      if (d === 'up') tryMove(0, -1);
      else if (d === 'down') tryMove(0, 1);
      else if (d === 'left') tryMove(-1, 0);
      else if (d === 'right') tryMove(1, 0);
    }
    function onLvClick(e) {
      var lvb = e.target.closest ? e.target.closest('.lv-btn') : null;
      if (lvb && !lvb.classList.contains('locked')) {
        var n = parseInt(lvb.getAttribute('data-lv'), 10);
        if (n !== level && n <= unlocked) { api.sfx('click'); startLevel(n); }
      }
    }

    elLevels.addEventListener('click', onLvClick);
    ctl.addEventListener('click', onCtl);
    document.addEventListener('keydown', onKey);

    startLevel(1);
    raf = requestAnimationFrame(loop);

    return function () {
      alive = false;
      running = false;
      stopLoop();
      stopTimer();
      elLevels.removeEventListener('click', onLvClick);
      ctl.removeEventListener('click', onCtl);
      document.removeEventListener('keydown', onKey);
    };
  }
});
