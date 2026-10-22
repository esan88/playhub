/* Snake */
GamePortal.register('snake', {
  title: 'Neon Snake',
  emoji: '🐍',
  cat: 'arcade',
  c1: '#062a3f',
  c2: '#00c2a8',
  tags: ['snake', 'classic', 'arcade', 'retro', 'skill'],
  rating: 4.7,
  plays: '1.4M',
  badge: 'Popular',
  controls: 'Arrow keys / WASD or swipe to steer · tap to pause',
  desc: 'Eat the glowing apples, grow longer and outmaneuver your own tail. Speed ramps up the longer you survive.',
  play: function (stage, api) {
    var COLS = 20, ROWS = 20, CELL = 20;
    var W = COLS * CELL, H = ROWS * CELL;
    var LEVELS = [
      { goal: 6, tick: 145 },
      { goal: 9, tick: 137 },
      { goal: 12, tick: 129 },
      { goal: 15, tick: 121 },
      { goal: 18, tick: 113 }
    ];
    var key = 'ph_snake_lvl';
    var unlocked = Math.min(LEVELS.length, Math.max(1, GamePortal.store.get(key, 1)));
    var level = 1;
    var wrap = document.createElement('div');
    wrap.className = 'canvas-wrap';
    wrap.dataset.level = '1';
    var lvStrip = document.createElement('div');
    lvStrip.className = 'lv-strip';
    lvStrip.id = 'sn-levels';
    wrap.appendChild(lvStrip);
    var goalEl = document.createElement('div');
    goalEl.className = 'lv-goal';
    goalEl.id = 'sn-goal';
    wrap.appendChild(goalEl);
    var canvas = document.createElement('canvas');
    canvas.className = 'game-canvas';
    wrap.appendChild(canvas);
    stage.appendChild(wrap);
    var ctx = api.fitCanvas(canvas, W, H);

    var snake, dir, nextDir, food, score, alive, paused, last, acc, speed, raf, eaten, GOAL;

    function reset() {
      snake = [{ x: 9, y: 10 }, { x: 8, y: 10 }, { x: 7, y: 10 }];
      dir = { x: 1, y: 0 };
      nextDir = dir;
      score = 0;
      eaten = 0;
      GOAL = cfg().goal;
      speed = cfg().tick;
      alive = true;
      paused = false;
      acc = 0;
      last = 0;
      api.setScore(0);
      placeFood();
    }

    function placeFood() {
      var free = [];
      for (var y = 0; y < ROWS; y++)
        for (var x = 0; x < COLS; x++) {
          var on = snake.some(function (s) { return s.x === x && s.y === y; });
          if (!on) free.push({ x: x, y: y });
        }
      food = free[Math.floor(Math.random() * free.length)] || { x: 0, y: 0 };
    }

    function cfg() { return LEVELS[level - 1]; }
    function renderLevels() {
      var html = '<span class="lv-strip-label">Level</span>';
      for (var n = 1; n <= LEVELS.length; n++) {
        var cls = 'lv-btn' + (n === level ? ' on' : '') + (n > unlocked ? ' locked' : '');
        html += '<button type="button" class="' + cls + '" data-lv="' + n + '"' + (n > unlocked ? ' disabled' : '') + '>' + n + '</button>';
      }
      lvStrip.innerHTML = html;
      goalEl.textContent = 'Eat ' + cfg().goal + ' apples to clear level ' + level + '!';
      wrap.dataset.level = String(level);
    }
    function startLevel(n) {
      level = Math.max(1, Math.min(LEVELS.length, n));
      api.clearOverlay();
      reset();
      renderLevels();
    }
    function levelClear() {
      alive = false;
      if (level > unlocked) { unlocked = level; GamePortal.store.set(key, unlocked); }
      api.sfx('win');
      if (level >= LEVELS.length) {
        api.win({
          title: 'Neon Snake Legend! 🐍',
          text: 'All ' + LEVELS.length + ' levels cleared — ' + api.score + ' points!'
        });
        return;
      }
      api.overlay({
        emoji: '🐍',
        title: 'Level ' + level + ' complete!',
        text: 'Next: eat ' + LEVELS[level].goal + ' apples.',
        score: api.score,
        best: api.getBest(),
        onAgain: function () { api.clearOverlay(); level++; startLevel(level); }
      });
    }

    function step() {
      dir = nextDir;
      var head = { x: snake[0].x + dir.x, y: snake[0].y + dir.y };
      if (head.x < 0 || head.y < 0 || head.x >= COLS || head.y >= ROWS ||
          snake.some(function (s) { return s.x === head.x && s.y === head.y; })) {
        alive = false;
        api.gameOver({
          title: 'Game Over',
          text: 'Level ' + level + ': you grew to ' + snake.length + ' segments.',
          onAgain: function () { api.clearOverlay(); startLevel(level); }
        });
        return;
      }
      snake.unshift(head);
      if (head.x === food.x && head.y === food.y) {
        eaten++;
        api.addScore(10);
        api.sfx('eat');
        if (speed > 70) speed -= 2.5;
        placeFood();
        if (eaten >= GOAL) { levelClear(); return; }
      } else {
        snake.pop();
      }
    }

    function draw() {
      ctx.fillStyle = '#12142e';
      ctx.fillRect(0, 0, W, H);
      ctx.strokeStyle = 'rgba(255,255,255,.045)';
      ctx.lineWidth = 1;
      for (var i = 1; i < COLS; i++) {
        ctx.beginPath(); ctx.moveTo(i * CELL + .5, 0); ctx.lineTo(i * CELL + .5, H); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(0, i * CELL + .5); ctx.lineTo(W, i * CELL + .5); ctx.stroke();
      }

      ctx.font = '15px serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('🍎', food.x * CELL + CELL / 2, food.y * CELL + CELL / 2 + 1);

      for (var s = snake.length - 1; s >= 0; s--) {
        var seg = snake[s];
        var t = s / snake.length;
        ctx.fillStyle = s === 0
          ? '#ffffff'
          : 'rgb(0,' + Math.round(194 - t * 110) + ',' + Math.round(168 - t * 80) + ')';
        var pad = s === 0 ? 1.5 : 2.5;
        roundRect(seg.x * CELL + pad, seg.y * CELL + pad, CELL - pad * 2, CELL - pad * 2, s === 0 ? 7 : 5);
        ctx.fill();
      }

      ctx.font = '13px system-ui';
      ctx.textAlign = 'left';
      ctx.fillStyle = '#9aa0c8';
      ctx.fillText(eaten + ' / ' + GOAL + ' apples', 8, 16);
      ctx.textAlign = 'center';

      if (paused) {
        ctx.fillStyle = 'rgba(8,9,22,.7)';
        ctx.fillRect(0, 0, W, H);
        ctx.fillStyle = '#fff';
        ctx.font = '700 24px system-ui';
        ctx.fillText('PAUSED', W / 2, H / 2);
        ctx.font = '14px system-ui';
        ctx.fillStyle = '#9aa0c8';
        ctx.fillText('press P or tap to resume', W / 2, H / 2 + 26);
      }
    }

    function roundRect(x, y, w, h, r) {
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.arcTo(x + w, y, x + w, y + h, r);
      ctx.arcTo(x + w, y + h, x, y + h, r);
      ctx.arcTo(x, y + h, x, y, r);
      ctx.arcTo(x, y, x + w, y, r);
      ctx.closePath();
    }

    function loop(ts) {
      raf = requestAnimationFrame(loop);
      if (!last) last = ts;
      var dt = ts - last;
      last = ts;
      if (alive && !paused) {
        acc += dt;
        while (acc >= speed) { acc -= speed; step(); if (!alive) break; }
      }
      draw();
    }

    function onKey(e) {
      var k = e.key.toLowerCase();
      var map = {
        arrowup: [0, -1], w: [0, -1],
        arrowdown: [0, 1], s: [0, 1],
        arrowleft: [-1, 0], a: [-1, 0],
        arrowright: [1, 0], d: [1, 0]
      };
      if (map[k]) {
        e.preventDefault();
        turn(map[k][0], map[k][1]);
      } else if (k === 'p' && alive) {
        paused = !paused;
        api.sfx('click');
      }
    }

    function turn(dx, dy) {
      var d = { x: dx, y: dy };
      if (d.x !== -dir.x || d.y !== -dir.y) nextDir = d;
      api.sfx('pop');
    }

    /* touch: swipe to steer, tap to pause */
    var tracking = false, moved = false, px = 0, py = 0;
    function onPointerDown(e) {
      if (e.button !== undefined && e.button !== 0) return;
      if (e.target && e.target.closest && e.target.closest('.lv-strip')) return;
      tracking = true;
      moved = false;
      px = e.clientX; py = e.clientY;
      if (wrap.setPointerCapture) { try { wrap.setPointerCapture(e.pointerId); } catch (err) {} }
    }
    function onPointerMove(e) {
      if (!tracking || moved) return;
      var dx = e.clientX - px, dy = e.clientY - py;
      if (Math.max(Math.abs(dx), Math.abs(dy)) < 24) return;
      moved = true;
      if (Math.abs(dx) > Math.abs(dy)) turn(dx > 0 ? 1 : -1, 0);
      else turn(0, dy > 0 ? 1 : -1);
    }
    function onPointerUp(e) {
      if (!tracking) return;
      tracking = false;
      if (!moved && alive && e.pointerType !== 'mouse') {
        paused = !paused;
        api.sfx('click');
      }
    }
    function onPointerCancel() { tracking = false; }

    lvStrip.addEventListener('click', function (e) {
      var b = e.target.closest ? e.target.closest('.lv-btn') : null;
      if (!b || b.disabled) return;
      var n = parseInt(b.getAttribute('data-lv'), 10);
      if (n !== level && n <= unlocked) { api.sfx('click'); startLevel(n); }
    });

    startLevel(1);
    draw();
    document.addEventListener('keydown', onKey);
    wrap.addEventListener('pointerdown', onPointerDown);
    wrap.addEventListener('pointermove', onPointerMove);
    wrap.addEventListener('pointerup', onPointerUp);
    wrap.addEventListener('pointercancel', onPointerCancel);
    raf = requestAnimationFrame(loop);

    return function () {
      cancelAnimationFrame(raf);
      document.removeEventListener('keydown', onKey);
      wrap.removeEventListener('pointerdown', onPointerDown);
      wrap.removeEventListener('pointermove', onPointerMove);
      wrap.removeEventListener('pointerup', onPointerUp);
      wrap.removeEventListener('pointercancel', onPointerCancel);
    };
  }
});
