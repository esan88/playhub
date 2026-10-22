/* Star Catcher — sweep the basket, catch stars, dodge rocks */
GamePortal.register('starcatch', {
  title: 'Star Catcher',
  emoji: '⭐',
  cat: 'girls',
  c1: '#7c3aed',
  c2: '#c4b5fd',
  tags: ['girls', 'stars', 'catch', 'night', 'arcade', 'sky', 'kids', 'fun', 'cute'],
  rating: 4.6,
  plays: '1.6M',
  badge: 'For girls',
  controls: 'Drag your finger/mouse, or press ← and → to move the basket',
  desc: 'Stars and rocks tumble from the glittery night sky. Fill your basket with stars — but let three stars slip and the show is over!',
  play: function (stage, api) {
    var W = 420, H = 560, BY = H - 66;
    var LEVELS = [
      { goal: 10, spd: 1 },
      { goal: 14, spd: 1.1 },
      { goal: 18, spd: 1.21 },
      { goal: 22, spd: 1.331 },
      { goal: 28, spd: 1.4641 }
    ];
    var key = 'ph_starcatch_lvl';
    var unlocked = Math.min(LEVELS.length, Math.max(1, GamePortal.store.get(key, 1)));
    var level = 1;
    var wrap = document.createElement('div');
    wrap.className = 'canvas-wrap';
    wrap.dataset.level = '1';
    var canvas = document.createElement('canvas');
    canvas.className = 'game-canvas';
    wrap.appendChild(canvas);
    stage.appendChild(wrap);
    var lvStrip = document.createElement('div');
    lvStrip.className = 'lv-strip';
    lvStrip.id = 'st-levels';
    stage.insertBefore(lvStrip, wrap);
    var goalEl = document.createElement('div');
    goalEl.className = 'lv-goal';
    goalEl.id = 'st-goal';
    stage.insertBefore(goalEl, wrap);
    var ctx = api.fitCanvas(canvas, W, H);

    var bx = W / 2, items = [], floaters = [], frames = 0, lives = 3, caught = 0, speed, running = true, raf;
    var skyStars = [];
    for (var i = 0; i < 40; i++) skyStars.push({ x: Math.random() * W, y: Math.random() * (H - 120), r: Math.random() * 1.6 + .5, tw: Math.random() * 6.28 });

    function setLives() {
      var el = wrap.parentNode ? wrap.parentNode.querySelector('#sc-lives') : null;
      if (el) el.textContent = '❤️'.repeat(lives) + '🖤'.repeat(3 - lives);
    }

    function cfg() { return LEVELS[level - 1]; }
    function renderLevels() {
      var html = '<span class="lv-strip-label">Level</span>';
      for (var n = 1; n <= LEVELS.length; n++) {
        var cls = 'lv-btn' + (n === level ? ' on' : '') + (n > unlocked ? ' locked' : '');
        html += '<button type="button" class="' + cls + '" data-lv="' + n + '"' + (n > unlocked ? ' disabled' : '') + '>' + n + '</button>';
      }
      lvStrip.innerHTML = html;
      goalEl.textContent = 'Catch ' + cfg().goal + ' stars to clear level ' + level + '!';
      wrap.dataset.level = String(level);
    }
    function startLevel(n) {
      level = Math.max(1, Math.min(LEVELS.length, n));
      api.clearOverlay();
      running = true;
      reset();
      lives = 3;
      setLives();
      renderLevels();
    }
    function levelClear() {
      if (!running) return;
      running = false;
      if (level > unlocked) { unlocked = level; GamePortal.store.set(key, unlocked); }
      api.sfx('win');
      if (level >= LEVELS.length) {
        api.win({
          title: 'Star Collector! 🌟',
          text: 'All ' + LEVELS.length + ' levels cleared — ' + api.score + ' points!'
        });
        return;
      }
      api.overlay({
        emoji: '⭐',
        title: 'Level ' + level + ' complete!',
        text: 'Next: catch ' + LEVELS[level].goal + ' stars.',
        score: api.score,
        best: api.getBest(),
        onAgain: function () { api.clearOverlay(); level++; startLevel(level); }
      });
    }

    function reset() {
      items = []; floaters = []; frames = 0;
      caught = 0;
      bx = W / 2;
      api.setScore(0);
      canvas.dataset.x = bx;
    }

    function addFloater(x, y, text, color) {
      floaters.push({ x: x, y: y, text: text, color: color, life: 46 });
    }

    function lose(reason) {
      lives--;
      setLives();
      api.sfx('bad');
      addFloater(bx, BY - 40, reason, '#fb7185');
      if (lives <= 0) die();
    }

    function die() {
      if (!running) return;
      running = false;
      api.gameOver({
        title: 'The stars went to sleep 🌙',
        text: 'Level ' + level + ': you caught ' + caught + ' star' + (caught === 1 ? '' : 's') + ' tonight.',
        onAgain: function () { api.clearOverlay(); startLevel(level); }
      });
    }

    function spawn() {
      var star = Math.random() < 0.72;
      items.push({
        x: 30 + Math.random() * (W - 60),
        y: -24,
        rock: !star,
        vy: speed + Math.random() * 1.4,
        spin: Math.random() * 6.28
      });
    }

    function step() {
      frames++;
      speed = Math.min(6.4, 2.8 + api.score * 0.014) * cfg().spd;

      if (frames % Math.max(26, (52 - api.score / 4) / cfg().spd) === 1) spawn();

      items.forEach(function (it) { it.y += it.vy; it.spin += 0.08; });
      items.forEach(function (it) {
        var near = it.y > BY - 26 && it.y < BY + 18 && Math.abs(it.x - bx) < 42;
        if (near && !it.dead) {
          it.dead = true;
          if (it.rock) lose('🪨 Ouch!');
          else {
            caught++;
            api.addScore(10);
            api.sfx('good');
            addFloater(it.x, it.y - 16, '+10', '#fde68a');
          }
          return;
        }
        if (it.y > H - 40 && !it.dead) {
          it.dead = true;
          if (!it.rock) lose('⭐ Missed!');
        }
      });
      items = items.filter(function (it) { return !it.dead && it.y < H + 30; });

      floaters.forEach(function (f) { f.y -= 0.8; f.life--; });
      floaters = floaters.filter(function (f) { return f.life > 0; });

      canvas.dataset.x = bx.toFixed(0);

      if (caught >= cfg().goal) levelClear();
    }

    function draw() {
      if (!draw.sky) {
        draw.sky = ctx.createLinearGradient(0, 0, 0, H);
        draw.sky.addColorStop(0, '#1e1b4b');
        draw.sky.addColorStop(.6, '#4c1d95');
        draw.sky.addColorStop(1, '#7c3aed');
      }
      ctx.fillStyle = draw.sky;
      ctx.fillRect(0, 0, W, H);

      /* moon */
      ctx.fillStyle = '#fef3c7';
      ctx.beginPath();
      ctx.arc(64, 66, 26, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#1e1b4b';
      ctx.beginPath();
      ctx.arc(74, 58, 22, 0, Math.PI * 2);
      ctx.fill();

      /* twinkles */
      skyStars.forEach(function (s) {
        var a = 0.4 + 0.6 * Math.abs(Math.sin(frames * 0.03 + s.tw));
        ctx.globalAlpha = a;
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;

      /* items */
      items.forEach(function (it) {
        ctx.save();
        ctx.translate(it.x, it.y);
        if (!it.rock) ctx.rotate(Math.sin(it.spin) * 0.5);
        ctx.font = (it.rock ? 30 : 30) + 'px serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(it.rock ? '🪨' : '⭐', 0, 0);
        ctx.restore();
      });

      /* basket */
      ctx.fillStyle = '#b45309';
      ctx.beginPath();
      ctx.moveTo(bx - 42, BY - 12);
      ctx.lineTo(bx + 42, BY - 12);
      ctx.lineTo(bx + 30, BY + 20);
      ctx.lineTo(bx - 30, BY + 20);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = '#92400e';
      ctx.fillRect(bx - 44, BY - 18, 88, 8);
      ctx.strokeStyle = 'rgba(255,255,255,.35)';
      ctx.lineWidth = 2;
      for (var k = -1; k <= 1; k++) {
        ctx.beginPath();
        ctx.moveTo(bx + k * 22, BY - 10);
        ctx.lineTo(bx + k * 16, BY + 18);
        ctx.stroke();
      }
      /* handle */
      ctx.strokeStyle = '#b45309';
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.arc(bx, BY - 14, 26, Math.PI, 0);
      ctx.stroke();

      /* floaters */
      floaters.forEach(function (f) {
        ctx.globalAlpha = Math.min(1, f.life / 20);
        ctx.fillStyle = f.color;
        ctx.font = 'bold 20px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(f.text, f.x, f.y);
      });
      ctx.globalAlpha = 1;
    }

    function loop() {
      raf = requestAnimationFrame(loop);
      if (!running) return;
      step();
      draw();
    }

    function move(dir) {
      if (!running) return;
      bx = Math.max(46, Math.min(W - 46, bx + dir * 26));
      canvas.dataset.x = bx;
    }
    function onKey(e) {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') { e.preventDefault(); move(-1); }
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') { e.preventDefault(); move(1); }
    }
    function onMove(e) {
      if (!running) return;
      var rect = canvas.getBoundingClientRect();
      bx = Math.max(46, Math.min(W - 46, (e.clientX - rect.left) / rect.width * W));
      canvas.dataset.x = bx.toFixed(0);
    }

    /* HUD lives pill above the canvas */
    var hud = document.createElement('div');
    hud.className = 'math-stat sc-hud';
    hud.innerHTML = 'Lives <b id="sc-lives">❤️❤️❤️</b>';
    stage.insertBefore(hud, wrap);

    lvStrip.addEventListener('click', function (e) {
      var b = e.target.closest ? e.target.closest('.lv-btn') : null;
      if (!b || b.disabled) return;
      var n = parseInt(b.getAttribute('data-lv'), 10);
      if (n !== level && n <= unlocked) { api.sfx('click'); startLevel(n); }
    });

    startLevel(1);
    draw();
    canvas.addEventListener('pointerdown', onMove);
    canvas.addEventListener('pointermove', onMove);
    document.addEventListener('keydown', onKey);
    raf = requestAnimationFrame(loop);

    return function () {
      running = false;
      cancelAnimationFrame(raf);
      canvas.removeEventListener('pointerdown', onMove);
      canvas.removeEventListener('pointermove', onMove);
      document.removeEventListener('keydown', onKey);
    };
  }
});
