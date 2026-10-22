/* Sky Hopper (flappy-style) */
GamePortal.register('flappy', {
  title: 'Sky Hopper',
  emoji: '🐤',
  cat: 'arcade',
  c1: '#1b3fa0',
  c2: '#4cc9f0',
  tags: ['flappy', 'fly', 'arcade', 'reflex', 'casual'],
  rating: 4.5,
  plays: '2.1M',
  badge: 'Trending',
  controls: 'Click, tap or press Space to flap',
  desc: 'Guide a fearless little bird through the gaps in the pipes. One tap, one flap — how far can you go?',
  play: function (stage, api) {
    var W = 420, H = 560;
    var LEVELS = [
      { goal: 4, gap: 165, speed: 2.4 },
      { goal: 7, gap: 156, speed: 2.52 },
      { goal: 10, gap: 147, speed: 2.64 },
      { goal: 14, gap: 138, speed: 2.76 },
      { goal: 18, gap: 129, speed: 2.88 }
    ];
    var key = 'ph_flappy_lvl';
    var unlocked = Math.min(LEVELS.length, Math.max(1, GamePortal.store.get(key, 1)));
    var level = 1;
    var wrap = document.createElement('div');
    wrap.className = 'canvas-wrap';
    wrap.dataset.level = '1';
    var lvStrip = document.createElement('div');
    lvStrip.className = 'lv-strip';
    lvStrip.id = 'fl-levels';
    lvStrip.style.zIndex = '6';
    wrap.appendChild(lvStrip);
    var goalEl = document.createElement('div');
    goalEl.className = 'lv-goal';
    goalEl.id = 'fl-goal';
    goalEl.style.zIndex = '6';
    wrap.appendChild(goalEl);
    var canvas = document.createElement('canvas');
    canvas.className = 'game-canvas';
    wrap.appendChild(canvas);
    stage.appendChild(wrap);
    var ctx = api.fitCanvas(canvas, W, H);

    var bird, pipes, speed, gravity, frames, started, raf, clouds, groundX, passed;

    function reset() {
      bird = { x: 110, y: H / 2, vy: 0, r: 14, rot: 0 };
      pipes = [];
      speed = cfg().speed;
      gravity = 0.42;
      frames = 0;
      passed = 0;
      started = false;
      running = true;
      groundX = 0;
      api.setScore(0);
      clouds = [
        { x: 60, y: 70, s: 1.1 }, { x: 240, y: 150, s: .8 },
        { x: 350, y: 40, s: .65 }, { x: 170, y: 240, s: .55 }
      ];
      showTap();
    }

    function showTap() {
      if (tapEl) { tapEl.remove(); tapEl = null; }
      var el = document.createElement('div');
      el.className = 'flappy-tap';
      el.innerHTML = '<div><div class="big">Tap to flap ✦</div><p class="hint" style="margin-top:8px">click, tap or press Space</p></div>';
      el.addEventListener('click', function () { flap(); });
      stage.appendChild(el);
      tapEl = el;
    }
    var tapEl = null;

    function flap() {
      if (!tapEl) return;
      tapEl.remove();
      tapEl = null;
      started = true;
      bird.vy = -7.4;
      api.sfx('click');
    }

    function spawn() {
      var gap = cfg().gap - Math.min(45, api.score * 2);
      var topH = 60 + Math.random() * (H - gap - 200);
      pipes.push({ x: W + 20, top: topH, gap: gap, w: 62, scored: false });
    }

    function step() {
      if (!started) return;
      bird.vy += gravity;
      bird.y += bird.vy;
      bird.rot = Math.max(-.5, Math.min(1.1, bird.vy / 14));

      if (frames % 95 === 1) spawn();

      pipes.forEach(function (p) { p.x -= speed; });
      pipes = pipes.filter(function (p) { return p.x + p.w > -30; });

      pipes.forEach(function (p) {
        if (!p.scored && p.x + p.w < bird.x) {
          p.scored = true;
          passed++;
          api.addScore(1);
          speed = Math.min(4.6, speed + 0.05);
          api.sfx('good');
          if (passed >= cfg().goal) levelClear();
        }
        var hitX = bird.x + bird.r > p.x && bird.x - bird.r < p.x + p.w;
        var hitY = bird.y - bird.r < p.top || bird.y + bird.r > p.top + p.gap;
        if (hitX && hitY) die();
      });

      if (bird.y + bird.r > H - 40 || bird.y - bird.r < 0) die();
      groundX = (groundX - speed) % 40;
    }

    function die() {
      if (!running) return;
      running = false;
      bird.vy = 8;
      api.gameOver({
        title: 'Bonk!',
        text: 'Level ' + level + ': you passed ' + api.score + ' pipe' + (api.score === 1 ? '' : 's') + '.',
        onAgain: function () { api.clearOverlay(); startLevel(level); }
      });
    }

    function draw() {
      if (!draw.sky) {
        draw.sky = ctx.createLinearGradient(0, 0, 0, H);
        draw.sky.addColorStop(0, '#5fc7ff');
        draw.sky.addColorStop(.6, '#bfeaff');
        draw.sky.addColorStop(1, '#ffe9b8');
      }
      ctx.fillStyle = draw.sky;
      ctx.fillRect(0, 0, W, H);

      ctx.fillStyle = 'rgba(255,255,255,.75)';
      clouds.forEach(function (c) {
        var cx = ((c.x - (frames * 0.12 * c.s)) % (W + 120) + W + 120) % (W + 120) - 60;
        blob(cx, c.y, 26 * c.s);
        blob(cx + 24 * c.s, c.y + 5, 20 * c.s);
        blob(cx - 24 * c.s, c.y + 6, 18 * c.s);
      });

      pipes.forEach(function (p) {
        drawPipe(p.x, 0, p.w, p.top, true);
        drawPipe(p.x, p.top + p.gap, p.w, H - (p.top + p.gap), false);
      });

      ctx.fillStyle = '#3fae5a';
      ctx.fillRect(0, H - 40, W, 40);
      ctx.fillStyle = '#2e8a46';
      ctx.fillRect(0, H - 40, W, 8);
      ctx.fillStyle = 'rgba(0,0,0,.12)';
      for (var i = 0; i < W / 40 + 2; i++) ctx.fillRect(groundX + i * 40, H - 32, 20, 4);

      ctx.save();
      ctx.translate(bird.x, bird.y);
      ctx.rotate(bird.rot);
      ctx.font = '28px serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('🐤', 0, 1);
      ctx.restore();
    }

    function blob(x, y, r) {
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.arc(x + r * .8, y + r * .2, r * .75, 0, Math.PI * 2);
      ctx.arc(x - r * .8, y + r * .25, r * .7, 0, Math.PI * 2);
      ctx.fill();
    }

    function drawPipe(x, y, w, h, top) {
      if (h <= 0) return;
      var grad = ctx.createLinearGradient(x, 0, x + w, 0);
      grad.addColorStop(0, '#2e9e5b');
      grad.addColorStop(.35, '#57d184');
      grad.addColorStop(1, '#1f7a44');
      ctx.fillStyle = grad;
      roundRect(x, top ? y - 0 : y, w, h, 4);
      ctx.fill();
      var capY = top ? y + h - 22 : y;
      ctx.fillStyle = '#35b16a';
      roundRect(x - 5, capY, w + 10, 22, 5);
      ctx.fill();
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

    function cfg() { return LEVELS[level - 1]; }
    function renderLevels() {
      var html = '<span class="lv-strip-label">Level</span>';
      for (var n = 1; n <= LEVELS.length; n++) {
        var cls = 'lv-btn' + (n === level ? ' on' : '') + (n > unlocked ? ' locked' : '');
        html += '<button type="button" class="' + cls + '" data-lv="' + n + '"' + (n > unlocked ? ' disabled' : '') + '>' + n + '</button>';
      }
      lvStrip.innerHTML = html;
      goalEl.textContent = 'Pass ' + cfg().goal + ' pipes to clear level ' + level + '!';
      wrap.dataset.level = String(level);
    }
    function startLevel(n) {
      level = Math.max(1, Math.min(LEVELS.length, n));
      api.clearOverlay();
      reset();
      renderLevels();
    }
    function levelClear() {
      if (!running) return;
      running = false;
      if (level > unlocked) { unlocked = level; GamePortal.store.set(key, unlocked); }
      api.sfx('win');
      if (level >= LEVELS.length) {
        api.win({
          title: 'Sky Hopper Ace! 🐤',
          text: 'All ' + LEVELS.length + ' levels cleared — ' + api.score + ' points!'
        });
        return;
      }
      api.overlay({
        emoji: '🐤',
        title: 'Level ' + level + ' complete!',
        text: 'Next: pass ' + LEVELS[level].goal + ' pipes.',
        score: api.score,
        best: api.getBest(),
        onAgain: function () { api.clearOverlay(); level++; startLevel(level); }
      });
    }

    var running = true;
    function loop() {
      raf = requestAnimationFrame(loop);
      if (!running) return;
      frames++;
      step();
      draw();
    }

    function onTap(e) {
      e.preventDefault();
      if (!running) return;
      if (tapEl) { flap(); return; }
      bird.vy = -7.4;
      api.sfx('pop');
    }
    function onKey(e) {
      if (e.code === 'Space' || e.key === 'ArrowUp') {
        e.preventDefault();
        if (!running) return;
        if (tapEl) { flap(); return; }
        bird.vy = -7.4;
        api.sfx('pop');
      }
    }

    lvStrip.addEventListener('click', function (e) {
      var b = e.target.closest ? e.target.closest('.lv-btn') : null;
      if (!b || b.disabled) return;
      var n = parseInt(b.getAttribute('data-lv'), 10);
      if (n !== level && n <= unlocked) { api.sfx('click'); startLevel(n); }
    });

    startLevel(1);
    draw();
    canvas.addEventListener('pointerdown', onTap);
    document.addEventListener('keydown', onKey);
    raf = requestAnimationFrame(loop);

    return function () {
      running = false;
      cancelAnimationFrame(raf);
      canvas.removeEventListener('pointerdown', onTap);
      document.removeEventListener('keydown', onKey);
      if (tapEl) tapEl.remove();
    };
  }
});
