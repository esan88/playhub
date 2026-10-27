/* Car Rush — dodge highway traffic */
GamePortal.register('carrush', {
  title: 'Car Rush',
  emoji: '🏎️',
  cat: 'adventure',
  c1: '#1d3557',
  c2: '#e63946',
  tags: ['car', 'racing', 'race', 'boys', 'speed', 'arcade', 'kids', 'drive'],
  rating: 4.7,
  plays: '0.5M',
  badge: 'New',
  controls: '← → or A D to change lanes · tap the left / right side of the road',
  desc: 'Weave through highway traffic at full speed. The longer you survive the faster the cars come.',
  play: function (stage, api) {
    var W = 360, H = 520;
    var LEVELS = [
      { goal: 300, speed: 240, gap: 1 },
      { goal: 450, speed: 265, gap: 0.92 },
      { goal: 600, speed: 290, gap: 0.84 },
      { goal: 800, speed: 315, gap: 0.76 },
      { goal: 1000, speed: 340, gap: 0.68 }
    ];
    var key = 'ph_carrush_lvl';
    var unlocked = Math.min(LEVELS.length, Math.max(1, GamePortal.store.get(key, 1)));
    var level = 1;
    var box = document.createElement('div');
    box.className = 'kg carrush';
    box.dataset.level = '1';
    var wrap = document.createElement('div');
    wrap.className = 'canvas-wrap';
    var canvas = document.createElement('canvas');
    canvas.className = 'game-canvas';
    wrap.appendChild(canvas);
    box.appendChild(wrap);
    var lvStrip = document.createElement('div');
    lvStrip.className = 'lv-strip';
    lvStrip.id = 'cr-levels';
    box.insertBefore(lvStrip, wrap);
    var goalEl = document.createElement('div');
    goalEl.className = 'lv-goal';
    goalEl.id = 'cr-goal';
    box.insertBefore(goalEl, wrap);
    var ctl = document.createElement('div');
    ctl.className = 'kg-ctl';
    ctl.innerHTML =
      '<button data-ctl="left" aria-label="Left lane">◀</button>' +
      '<button data-ctl="right" aria-label="Right lane">▶</button>';
    box.appendChild(ctl);
    stage.appendChild(box);
    var ctx = api.fitCanvas(canvas, W, H);

    var LANES = [65, 180, 295];
    var EMO = ['🚗', '🚙', '🚚', '🚌'];
    var lane, px, cars, score, alive, spawnT, scAcc, dash, speed, last, raf, dead, dist, GOAL;

    function cfg() { return LEVELS[level - 1]; }
    function renderLevels() {
      var html = '<span class="lv-strip-label">Level</span>';
      for (var n = 1; n <= LEVELS.length; n++) {
        var cls = 'lv-btn' + (n === level ? ' on' : '') + (n > unlocked ? ' locked' : '');
        html += '<button type="button" class="' + cls + '" data-lv="' + n + '"' + (n > unlocked ? ' disabled' : '') + '>' + n + '</button>';
      }
      lvStrip.innerHTML = html;
      goalEl.textContent = 'Drive ' + cfg().goal + 'm to clear level ' + level + '!';
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
          title: 'Rush Champion! 🏎️',
          text: 'All ' + LEVELS.length + ' levels cleared — ' + api.score + ' points!'
        });
        return;
      }
      api.overlay({
        emoji: '🏎️',
        title: 'Level ' + level + ' complete!',
        text: 'Next: drive ' + LEVELS[level].goal + 'm.',
        score: api.score,
        best: api.getBest(),
        onAgain: function () { api.clearOverlay(); level++; startLevel(level); }
      });
    }

    function reset() {
      lane = 1;
      px = LANES[1];
      cars = [];
      score = 0;
      dist = 0;
      alive = true;
      dead = false;
      spawnT = cfg().gap + 0.1;
      scAcc = 0;
      dash = 0;
      speed = cfg().speed;
      GOAL = cfg().goal;
      last = 0;
      api.setScore(0);
      canvas.dataset.lane = '1';
      box.dataset.cars = '0';
    }

    function move(dir) {
      if (!alive) return;
      var n = Math.max(0, Math.min(2, lane + dir));
      if (n !== lane) { lane = n; canvas.dataset.lane = String(n); api.sfx('pop'); }
    }

    function spawn() {
      var l = Math.floor(Math.random() * 3);
      if (cars.some(function (c) { return c.lane === l && c.y < 140; })) return;
      cars.push({ lane: l, y: -70, e: EMO[Math.floor(Math.random() * EMO.length)] });
      box.dataset.cars = String(cars.length);
    }

    function step(dt) {
      px += (LANES[lane] - px) * Math.min(1, dt * 13);
      speed = cfg().speed + Math.min(250, score * 0.55);
      dash = (dash + speed * dt) % 44;
      dist += dt * speed * 0.06;

      scAcc += dt * 20;
      if (scAcc >= 1) {
        var p = Math.floor(scAcc);
        scAcc -= p;
        score += p;
        api.setScore(score);
      }

      spawnT -= dt;
      if (spawnT <= 0) {
        spawn();
        spawnT = Math.max(cfg().gap * 0.42, cfg().gap - score * 0.0008) + Math.random() * 0.35;
      }

      for (var i = cars.length - 1; i >= 0; i--) {
        var c = cars[i];
        c.y += speed * dt;
        if (Math.abs(LANES[c.lane] - px) < 36 && Math.abs(c.y - (H - 80)) < 46) {
          alive = false;
          box.dataset.cars = String(cars.length);
          api.sfx('bad');
          api.gameOver({
            title: '💥 Crash!',
            text: 'Level ' + level + ': you scored ' + score + ' points. Try changing lanes earlier next time.',
            onAgain: function () { api.clearOverlay(); startLevel(level); }
          });
          return;
        }
        if (c.y > H + 80) {
          cars.splice(i, 1);
          score += 15;
          api.setScore(score);
          api.sfx('good');
        }
      }
      box.dataset.cars = String(cars.length);
      if (dist >= GOAL) levelClear();
    }

    function draw() {
      ctx.fillStyle = '#171a2f';
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = '#1f2340';
      ctx.fillRect(20, 0, W - 40, H);
      ctx.fillStyle = '#e8e8f0';
      ctx.fillRect(16, 0, 5, H);
      ctx.fillRect(W - 21, 0, 5, H);
      ctx.fillStyle = 'rgba(255,255,255,.7)';
      for (var d = -44 + dash; d < H; d += 44) {
        ctx.fillRect(LANES[0] + (LANES[1] - LANES[0]) / 2 - 3, d, 6, 24);
        ctx.fillRect(LANES[1] + (LANES[2] - LANES[1]) / 2 - 3, d, 6, 24);
      }
      ctx.font = '38px serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      cars.forEach(function (c) { ctx.fillText(c.e, LANES[c.lane], c.y); });
      ctx.save();
      var tilt = (LANES[lane] - px) * 0.06;
      ctx.translate(px, H - 80);
      ctx.rotate(Math.max(-0.3, Math.min(0.3, tilt)));
      ctx.fillText('🏎️', 0, 0);
      ctx.restore();
      ctx.font = '14px system-ui';
      ctx.textAlign = 'center';
      ctx.fillStyle = '#fff';
      ctx.fillText('L' + level + '  ' + Math.floor(dist) + 'm / ' + GOAL + 'm', W / 2, 26);
      if (!alive) {
        ctx.font = '54px serif';
        ctx.fillText('💥', px, H - 80 - 40);
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
    }

    function onPointer(e) {
      if (!alive) return;
      var r = canvas.getBoundingClientRect();
      move(e.clientX - r.left < r.width / 2 ? -1 : 1);
    }

    ctl.querySelector('[data-ctl="left"]').addEventListener('pointerdown', function (e) { e.preventDefault(); move(-1); });
    ctl.querySelector('[data-ctl="right"]').addEventListener('pointerdown', function (e) { e.preventDefault(); move(1); });
    wrap.addEventListener('pointerdown', onPointer);
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
      dead = true;
      cancelAnimationFrame(raf);
      document.removeEventListener('keydown', onKey);
    };
  }
});
