/* Space Blaster — shoot falling meteors */
GamePortal.register('space', {
  title: 'Space Blaster',
  emoji: '🚀',
  cat: 'boys',
  c1: '#240046',
  c2: '#7b2cbf',
  tags: ['space', 'shooter', 'meteors', 'boys', 'arcade', 'action', 'kids', 'rocket'],
  rating: 4.6,
  plays: '0.6M',
  badge: 'New',
  controls: '← → to move · Space or 🔫 to fire · on-screen buttons for touch',
  desc: 'Defend the galaxy! Blast the falling meteors before they reach your rocket. Three hits and you are out.',
  play: function (stage, api) {
    var W = 360, H = 460, COLS = 7;
    var LEVELS = [
      { goal: 10, spd: 1 },
      { goal: 15, spd: 1.08 },
      { goal: 20, spd: 1.1664 },
      { goal: 26, spd: 1.259712 },
      { goal: 32, spd: 1.36048896 }
    ];
    var key = 'ph_space_lvl';
    var unlocked = Math.min(LEVELS.length, Math.max(1, GamePortal.store.get(key, 1)));
    var level = 1;
    var box = document.createElement('div');
    box.className = 'kg space';
    box.dataset.level = '1';
    var wrap = document.createElement('div');
    wrap.className = 'canvas-wrap';
    var canvas = document.createElement('canvas');
    canvas.className = 'game-canvas';
    wrap.appendChild(canvas);
    var ctl = document.createElement('div');
    ctl.className = 'kg-ctl';
    ctl.innerHTML =
      '<button data-ctl="left" aria-label="Move left">◀</button>' +
      '<button data-ctl="fire" aria-label="Fire">🔫</button>' +
      '<button data-ctl="right" aria-label="Move right">▶</button>';
    box.appendChild(wrap);
    var lvStrip = document.createElement('div');
    lvStrip.className = 'lv-strip';
    lvStrip.id = 'sp-levels';
    box.insertBefore(lvStrip, wrap);
    var goalEl = document.createElement('div');
    goalEl.className = 'lv-goal';
    goalEl.id = 'sp-goal';
    box.insertBefore(goalEl, wrap);
    box.appendChild(ctl);
    stage.appendChild(box);
    var ctx = api.fitCanvas(canvas, W, H);

    var xs = [];
    for (var i = 0; i < COLS; i++) xs.push(38 + i * 47);
    var ship, bullets, meteors, lives, score, kills, alive, cool, spawnT, inv, last, raf;

    function cfg() { return LEVELS[level - 1]; }
    function renderLevels() {
      var html = '<span class="lv-strip-label">Level</span>';
      for (var n = 1; n <= LEVELS.length; n++) {
        var cls = 'lv-btn' + (n === level ? ' on' : '') + (n > unlocked ? ' locked' : '');
        html += '<button type="button" class="' + cls + '" data-lv="' + n + '"' + (n > unlocked ? ' disabled' : '') + '>' + n + '</button>';
      }
      lvStrip.innerHTML = html;
      goalEl.textContent = 'Destroy ' + cfg().goal + ' meteors to clear level ' + level + '!';
      box.dataset.level = String(level);
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
          title: 'Galaxy Defender! 🌌',
          text: 'All ' + LEVELS.length + ' levels cleared — ' + api.score + ' points!'
        });
        return;
      }
      api.overlay({
        emoji: '🚀',
        title: 'Level ' + level + ' complete!',
        text: 'Next: destroy ' + LEVELS[level].goal + ' meteors.',
        score: api.score,
        best: api.getBest(),
        onAgain: function () { api.clearOverlay(); level++; startLevel(level); }
      });
    }

    function reset() {
      ship = 3;
      bullets = [];
      meteors = [];
      lives = 3;
      score = 0;
      kills = 0;
      alive = true;
      cool = 0;
      spawnT = 1.1;
      inv = 0;
      last = 0;
      api.setScore(0);
      canvas.dataset.lives = '3';
      canvas.dataset.x = String(xs[ship]);
      canvas.dataset.bullets = '0';
    }

    function move(dir) {
      if (!alive) return;
      var n = Math.max(0, Math.min(COLS - 1, ship + dir));
      if (n !== ship) { ship = n; canvas.dataset.x = String(xs[ship]); api.sfx('pop'); }
    }

    function fire() {
      if (!alive || cool > 0 || bullets.length >= 4) return;
      bullets.push({ x: xs[ship], y: 402 });
      cool = 0.28;
      canvas.dataset.bullets = String(bullets.length);
      api.sfx('pop');
    }

    function spawn() {
      meteors.push({
        col: Math.floor(Math.random() * COLS),
        y: -30,
        v: (125 + Math.min(160, score * 0.7)) * cfg().spd,
        e: Math.random() < 0.3 ? '☄️' : '🪨'
      });
    }

    function step(dt) {
      cool = Math.max(0, cool - dt);
      inv = Math.max(0, inv - dt);
      spawnT -= dt;
      if (spawnT <= 0) {
        spawn();
        spawnT = Math.max(0.5, 0.95 - score * 0.0012) + Math.random() * 0.3;
      }

      for (var b = bullets.length - 1; b >= 0; b--) {
        bullets[b].y -= 430 * dt;
        if (bullets[b].y < -10) bullets.splice(b, 1);
      }
      canvas.dataset.bullets = String(bullets.length);

      for (var m = meteors.length - 1; m >= 0; m--) {
        var o = meteors[m];
        o.y += o.v * dt;
        var mx = xs[o.col];
        var killed = false;
        for (var k = bullets.length - 1; k >= 0; k--) {
          if (Math.abs(bullets[k].x - mx) < 18 && Math.abs(bullets[k].y - o.y) < 18) {
            meteors.splice(m, 1);
            bullets.splice(k, 1);
            score += 10;
            kills++;
            api.setScore(score);
            api.sfx('good');
            killed = true;
            break;
          }
        }
        if (killed) {
          if (kills >= cfg().goal) { levelClear(); return; }
          continue;
        }
        if (o.y > 392) {
          if (o.col === ship && inv <= 0) {
            meteors.splice(m, 1);
            lives--;
            inv = 1.3;
            canvas.dataset.lives = String(Math.max(0, lives));
            api.sfx('bad');
            if (lives <= 0) {
              alive = false;
              api.gameOver({
                title: '☄️ Direct hit!',
                text: 'Level ' + level + ': you blasted ' + kills + ' meteors for ' + score + ' points.',
                onAgain: function () { api.clearOverlay(); startLevel(level); }
              });
              return;
            }
          } else if (o.y > H + 40) {
            meteors.splice(m, 1);
          }
        }
      }

      var lowest = -1, bestY = -1;
      meteors.forEach(function (o) {
        if (o.y < 380 && o.y > bestY) { bestY = o.y; lowest = o.col; }
      });
      box.dataset.meteor = String(lowest);
    }

    function draw() {
      if (!draw.sky) {
        draw.sky = ctx.createLinearGradient(0, 0, 0, H);
        draw.sky.addColorStop(0, '#0b0b2b');
        draw.sky.addColorStop(1, '#1c1043');
      }
      ctx.fillStyle = draw.sky;
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = 'rgba(255,255,255,.75)';
      for (var s = 0; s < 26; s++) {
        var sx = (s * 97) % W, sy = (s * 61) % H;
        ctx.fillRect(sx, sy, s % 5 === 0 ? 2 : 1, s % 5 === 0 ? 2 : 1);
      }

      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.font = '26px serif';
      meteors.forEach(function (o) { ctx.fillText(o.e, xs[o.col], o.y); });

      ctx.fillStyle = '#ffd166';
      bullets.forEach(function (b) { ctx.fillRect(b.x - 2, b.y - 8, 4, 14); });

      if (inv <= 0 || Math.floor(Date.now() / 130) % 2 === 0) {
        ctx.font = '36px serif';
        ctx.fillText('🚀', xs[ship], 414);
      }

      ctx.font = '16px system-ui';
      ctx.textAlign = 'left';
      ctx.fillStyle = '#ff6b9d';
      ctx.fillText('❤'.repeat(Math.max(0, lives)) + '🖤'.repeat(Math.max(0, 3 - lives)), 12, 20);
      if (!alive) {
        ctx.textAlign = 'center';
        ctx.font = '46px serif';
        ctx.fillText('💥', xs[ship], 400);
      }
    }

    function loop(ts) {
      raf = requestAnimationFrame(loop);
      if (!last) last = ts;
      var dt = Math.min(0.05, (ts - last) / 1000);
      last = ts;
      if (alive) step(dt);
      draw();
    }

    function onKey(e) {
      var k = e.key.toLowerCase();
      if (k === 'arrowleft' || k === 'a') { e.preventDefault(); move(-1); }
      else if (k === 'arrowright' || k === 'd') { e.preventDefault(); move(1); }
      else if (k === ' ' || k === 'arrowup' || k === 'w') { e.preventDefault(); fire(); }
    }

    ctl.querySelector('[data-ctl="left"]').addEventListener('pointerdown', function (e) { e.preventDefault(); move(-1); });
    ctl.querySelector('[data-ctl="right"]').addEventListener('pointerdown', function (e) { e.preventDefault(); move(1); });
    ctl.querySelector('[data-ctl="fire"]').addEventListener('pointerdown', function (e) { e.preventDefault(); fire(); });
    document.addEventListener('keydown', onKey);

    lvStrip.addEventListener('click', function (e) {
      var b = e.target.closest ? e.target.closest('.lv-btn') : null;
      if (!b || b.disabled) return;
      var n = parseInt(b.getAttribute('data-lv'), 10);
      if (n !== level && n <= unlocked) { api.sfx('click'); startLevel(n); }
    });

    startLevel(1);
    draw();
    raf = requestAnimationFrame(loop);

    return function () {
      cancelAnimationFrame(raf);
      document.removeEventListener('keydown', onKey);
    };
  }
});
