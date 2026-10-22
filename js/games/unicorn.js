/* Unicorn Catch — gallop and gather falling stars */
GamePortal.register('unicorn', {
  title: 'Unicorn Catch',
  emoji: '🦄',
  cat: 'girls',
  c1: '#5b21b6',
  c2: '#f0abfc',
  tags: ['girls', 'unicorn', 'catch', 'arcade', 'casual', 'fun', 'kids', 'rainbow'],
  rating: 4.7,
  plays: '0.6M',
  badge: 'New',
  controls: '← → to move · tap the left or right side',
  desc: 'Starlight is falling from the sky! Waddle the unicorn across the meadow and catch points of stars before the storm clouds get you. Clear 5 levels — each one asks for more starlight, faster!',
  play: function (stage, api) {
    var W = 420, H = 520;
    var LEVELS = [
      { goal: 100, spawn: 34, speed: 1, rainbow: 0.25, cloud: 0.3 },
      { goal: 200, spawn: 31, speed: 1.1, rainbow: 0.25, cloud: 0.3 },
      { goal: 320, spawn: 28, speed: 1.2, rainbow: 0.22, cloud: 0.3 },
      { goal: 450, spawn: 25, speed: 1.3, rainbow: 0.2, cloud: 0.32 },
      { goal: 600, spawn: 22, speed: 1.4, rainbow: 0.2, cloud: 0.32 }
    ];
    var key = 'ph_unicorn_lvl';
    var unlocked = Math.min(LEVELS.length, Math.max(1, GamePortal.store.get(key, 1)));
    var level = 1;

    var wrap = document.createElement('div');
    wrap.className = 'canvas-wrap';
    wrap.dataset.level = '1';
    var elLevels = document.createElement('div');
    elLevels.className = 'lv-strip';
    elLevels.id = 'un-levels';
    elLevels.innerHTML = '<span class="lv-strip-label">Level</span>';
    var elGoal = document.createElement('div');
    elGoal.className = 'lv-goal';
    elGoal.id = 'un-goal';
    wrap.appendChild(elLevels);
    wrap.appendChild(elGoal);
    var canvas = document.createElement('canvas');
    canvas.className = 'game-canvas';
    wrap.appendChild(canvas);
    stage.appendChild(wrap);
    var ctx = api.fitCanvas(canvas, W, H);

    var uni, items, lives, frames, raf;
    var running = true;
    var TARGET = LEVELS[0].goal;

    function cfg() { return LEVELS[level - 1]; }
    function renderLevels() {
      var html = '<span class="lv-strip-label">Level</span>';
      for (var n = 1; n <= LEVELS.length; n++) {
        var cls = 'lv-btn' + (n === level ? ' on' : '') + (n > unlocked ? ' locked' : '');
        html += '<button type="button" class="' + cls + '" data-lv="' + n + '"' + (n > unlocked ? ' disabled' : '') + '>' + n + '</button>';
      }
      elLevels.innerHTML = html;
      elGoal.textContent = 'Catch ' + cfg().goal + ' points of starlight!';
      wrap.dataset.level = String(level);
    }

    function move(dirn) {
      if (!running) return;
      uni.x = Math.max(30, Math.min(W - 30, uni.x + dirn * 46));
      api.sfx('click');
    }

    function hurt() {
      if (!running) return;
      lives--;
      api.sfx('bad');
      if (lives <= 0) {
        running = false;
        api.gameOver({
          title: 'Storm cloud! ⛈️',
          text: 'Level ' + level + ': you caught ' + api.score + ' of ' + TARGET + ' points.',
          onAgain: function () { api.clearOverlay(); startLevel(level); }
        });
      }
    }

    function levelClear() {
      running = false;
      if (level > unlocked) { unlocked = level; GamePortal.store.set(key, unlocked); }
      if (level >= LEVELS.length) {
        api.win({
          title: 'Rainbow Complete! 🌈',
          text: 'All ' + LEVELS.length + ' levels cleared — ' + api.score + ' points!'
        });
        return;
      }
      api.sfx('win');
      api.overlay({
        emoji: '🌟',
        title: 'Level ' + level + ' complete!',
        text: 'Next: catch ' + LEVELS[level].goal + ' points of starlight.',
        score: api.score,
        best: api.getBest(),
        onAgain: function () { api.clearOverlay(); level++; startLevel(level); }
      });
    }

    function step() {
      frames++;
      var c = cfg();
      if (frames % Math.max(16, c.spawn - Math.floor(api.score / 30)) === 0) {
        var cloud = Math.random() < c.cloud;
        items.push({
          x: 30 + Math.random() * (W - 60),
          y: -20,
          v: (3 + Math.random() * 2.6) * c.speed + Math.min(3, api.score / 60),
          e: cloud ? '🌩️' : (Math.random() < c.rainbow ? '🌈' : '⭐'),
          cloud: cloud
        });
      }

      items.forEach(function (o) { o.y += o.v; });
      items = items.filter(function (o) { return o.y < H + 30; });

      items.forEach(function (o) {
        if (!running) return;
        if (!o.got && Math.abs(o.x - uni.x) < 34 && o.y > H - 86 && o.y < H - 34) {
          o.got = true;
          if (o.cloud) {
            hurt();
          } else {
            api.addScore(o.e === '🌈' ? 25 : 10);
            api.sfx('pop');
            if (api.score >= TARGET) levelClear();
          }
        }
      });
      items = items.filter(function (o) { return !o.got; });

      canvas.dataset.x = Math.round(uni.x);
      canvas.dataset.lives = lives;
      canvas.dataset.score = api.score;
    }

    function draw() {
      if (!draw.sky) {
        draw.sky = ctx.createLinearGradient(0, 0, 0, H);
        draw.sky.addColorStop(0, '#312e81');
        draw.sky.addColorStop(.55, '#7c3aed');
        draw.sky.addColorStop(1, '#c4b5fd');
      }
      ctx.fillStyle = draw.sky;
      ctx.fillRect(0, 0, W, H);

      ctx.fillStyle = 'rgba(255,255,255,.75)';
      for (var i = 0; i < 26; i++) {
        var sx = (i * 97) % W;
        var sy = (i * 61) % (H - 140);
        var tw = 1 + ((i + Math.floor(frames / 8)) % 3);
        ctx.fillRect(sx, sy, tw, tw);
      }

      ctx.fillStyle = '#fcd34d';
      ctx.beginPath();
      ctx.arc(340, 56, 22, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#312e81';
      ctx.beginPath();
      ctx.arc(330, 50, 20, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#86efac';
      ctx.beginPath();
      ctx.ellipse(W / 2, H + 40, W * 0.75, 76, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#6ee7b7';
      ctx.beginPath();
      ctx.ellipse(W / 2, H + 58, W * 0.7, 74, 0, 0, Math.PI * 2);
      ctx.fill();

      items.forEach(function (o) {
        ctx.font = (o.cloud ? '30px' : '26px') + ' serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(o.e, o.x, o.y);
      });

      ctx.font = '44px serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('🦄', uni.x, H - 58);

      ctx.font = '15px serif';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      ctx.fillText('❤️'.repeat(Math.max(0, lives)), 10, 18);
      ctx.textAlign = 'right';
      ctx.fillText(api.score + ' / ' + TARGET, W - 10, 18);
    }

    function startLevel(n) {
      level = Math.max(1, Math.min(LEVELS.length, n));
      api.clearOverlay();
      TARGET = cfg().goal;
      uni = { x: W / 2 };
      items = [];
      lives = 3; frames = 0;
      running = true;
      api.setScore(0);
      renderLevels();
    }

    function loop() {
      raf = requestAnimationFrame(loop);
      if (running) step();
      draw();
    }

    function onKeyDown(e) {
      if (['ArrowLeft', 'ArrowRight'].indexOf(e.code) !== -1) e.preventDefault();
      if (e.code === 'ArrowLeft' || e.code === 'KeyA') move(-1);
      if (e.code === 'ArrowRight' || e.code === 'KeyD') move(1);
    }
    function onTap(e) {
      e.preventDefault();
      if (!running) return;
      var r = canvas.getBoundingClientRect();
      move(e.clientX - r.left < r.width / 2 ? -1 : 1);
    }

    elLevels.addEventListener('click', function (e) {
      var b = e.target.closest ? e.target.closest('.lv-btn') : null;
      if (!b || b.disabled) return;
      var n = parseInt(b.getAttribute('data-lv'), 10);
      if (n !== level && n <= unlocked) { api.sfx('click'); startLevel(n); }
    });

    startLevel(1);
    draw();
    document.addEventListener('keydown', onKeyDown);
    canvas.addEventListener('pointerdown', onTap);
    raf = requestAnimationFrame(loop);

    return function () {
      running = false;
      cancelAnimationFrame(raf);
      document.removeEventListener('keydown', onKeyDown);
      canvas.removeEventListener('pointerdown', onTap);
    };
  }
});
