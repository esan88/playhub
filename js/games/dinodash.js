/* Dino Dash — endless runner, jump the cacti */
GamePortal.register('dinodash', {
  title: 'Dino Dash',
  emoji: '🦖',
  cat: 'adventure',
  c1: '#386641',
  c2: '#a7c957',
  tags: ['dino', 'runner', 'jump', 'boys', 'arcade', 'kids', 'endless', 'desert'],
  rating: 4.5,
  plays: '0.5M',
  badge: 'New',
  controls: 'Space / ↑ to jump · tap the screen on mobile',
  desc: 'Help the little dino dash across the desert. Jump over the cacti — the run gets faster with every step.',
  play: function (stage, api) {
    var W = 400, H = 260, GROUND = 214;
    var LEVELS = [
      { goal: 120, speed: 255 },
      { goal: 200, speed: 280 },
      { goal: 300, speed: 305 },
      { goal: 450, speed: 330 },
      { goal: 600, speed: 355 }
    ];
    var key = 'ph_dinodash_lvl';
    var unlocked = Math.min(LEVELS.length, Math.max(1, GamePortal.store.get(key, 1)));
    var level = 1;
    var box = document.createElement('div');
    box.className = 'kg dinodash';
    box.dataset.level = '1';
    var wrap = document.createElement('div');
    wrap.className = 'canvas-wrap';
    var canvas = document.createElement('canvas');
    canvas.className = 'game-canvas';
    wrap.appendChild(canvas);
    box.appendChild(wrap);
    var lvStrip = document.createElement('div');
    lvStrip.className = 'lv-strip';
    lvStrip.id = 'dd-levels';
    box.insertBefore(lvStrip, wrap);
    var goalEl = document.createElement('div');
    goalEl.className = 'lv-goal';
    goalEl.id = 'dd-goal';
    box.insertBefore(goalEl, wrap);
    stage.appendChild(box);
    var ctx = api.fitCanvas(canvas, W, H);

    var dino, obs, score, alive, vy, jumpT, spawnT, scAcc, speed, last, raf, GOAL;

    function cfg() { return LEVELS[level - 1]; }
    function renderLevels() {
      var html = '<span class="lv-strip-label">Level</span>';
      for (var n = 1; n <= LEVELS.length; n++) {
        var cls = 'lv-btn' + (n === level ? ' on' : '') + (n > unlocked ? ' locked' : '');
        html += '<button type="button" class="' + cls + '" data-lv="' + n + '"' + (n > unlocked ? ' disabled' : '') + '>' + n + '</button>';
      }
      lvStrip.innerHTML = html;
      goalEl.textContent = 'Run ' + cfg().goal + 'm to clear level ' + level + '!';
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
          title: 'Dino Legend! 🦖',
          text: 'All ' + LEVELS.length + ' levels cleared — ' + api.score + ' points!'
        });
        return;
      }
      api.overlay({
        emoji: '🦖',
        title: 'Level ' + level + ' complete!',
        text: 'Next: run ' + LEVELS[level].goal + 'm.',
        score: api.score,
        best: api.getBest(),
        onAgain: function () { api.clearOverlay(); level++; startLevel(level); }
      });
    }

    function reset() {
      dino = { x: 66, y: GROUND - 46 };
      obs = [];
      score = 0;
      alive = true;
      vy = 0;
      jumpT = 0;
      spawnT = 1.2;
      scAcc = 0;
      speed = cfg().speed;
      GOAL = cfg().goal;
      last = 0;
      api.setScore(0);
      canvas.dataset.air = '0';
      box.dataset.obs = '0';
    }

    function jump() {
      if (!alive || dino.y >= GROUND - 46 - 1) {
        vy = -830;
        jumpT = 1;
        api.sfx('pop');
      }
    }

    function step(dt) {
      canvas.dataset.air = dino.y < GROUND - 46 - 1 ? '1' : '0';
      speed = cfg().speed + Math.min(210, score * 0.5);

      if (dino.y < GROUND - 46 || vy < 0) {
        vy += 2600 * dt;
        dino.y += vy * dt;
        if (dino.y >= GROUND - 46) { dino.y = GROUND - 46; vy = 0; }
      }

      scAcc += dt * 22;
      if (scAcc >= 1) {
        var p = Math.floor(scAcc);
        scAcc -= p;
        score += p;
        api.setScore(score);
      }

      spawnT -= dt;
      if (spawnT <= 0) {
        obs.push({ x: W + 20, h: 34 + Math.random() * 14, w: 26 });
        spawnT = Math.max(0.85, 1.5 - score * 0.0015) + Math.random() * 0.7;
        box.dataset.obs = String(obs.length);
      }

      for (var i = obs.length - 1; i >= 0; i--) {
        var o = obs[i];
        o.x -= speed * dt;
        var dx = o.x - dino.x, dw = 34;
        if (dx < dw - 6 && dx + o.w > 6 && dino.y + 44 > GROUND - o.h + 6) {
          alive = false;
          api.sfx('bad');
          api.gameOver({
            title: '🌵 Ouch!',
            text: 'Level ' + level + ': you ran ' + score + ' metres before bumping into a cactus.',
            onAgain: function () { api.clearOverlay(); startLevel(level); }
          });
          return;
        }
        if (o.x + o.w < 0) {
          obs.splice(i, 1);
          score += 10;
          api.setScore(score);
          api.sfx('good');
        }
      }
      box.dataset.obs = String(obs.length);
      if (score >= GOAL) levelClear();
    }

    function draw() {
      if (!draw.sky) {
        draw.sky = ctx.createLinearGradient(0, 0, 0, H);
        draw.sky.addColorStop(0, '#8ecae6');
        draw.sky.addColorStop(1, '#e9f5db');
      }
      ctx.fillStyle = draw.sky;
      ctx.fillRect(0, 0, W, H);
      ctx.font = '34px serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('☀️', 350, 44);
      ctx.fillStyle = '#d9c087';
      ctx.fillRect(0, GROUND, W, H - GROUND);
      ctx.fillStyle = '#c2a366';
      ctx.fillRect(0, GROUND, W, 5);
      ctx.fillStyle = 'rgba(120,90,40,.4)';
      for (var g = 0; g < 5; g++) {
        var gx = ((g * 90 - score * 6) % (W + 90) + W + 90) % (W + 90) - 20;
        ctx.fillRect(gx, GROUND + 26 + (g % 3) * 14, 16, 4);
      }
      ctx.font = '44px serif';
      ctx.fillText('🦖', dino.x + 17, GROUND - 24);
      ctx.font = '34px serif';
      obs.forEach(function (o) { ctx.fillText('🌵', o.x + o.w / 2, GROUND - o.h / 2); });
      if (!alive) {
        ctx.font = '40px serif';
        ctx.fillText('💥', dino.x + 20, GROUND - 70);
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
      if (k === ' ' || k === 'arrowup' || k === 'w') { e.preventDefault(); jump(); }
    }

    wrap.addEventListener('pointerdown', function (e) { e.preventDefault(); jump(); });
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
