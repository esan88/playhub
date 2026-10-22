/* Sharky Splash — an original baby-shark ocean game.
   Snappy the baby shark and every element here are original characters and art:
   not based on, affiliated with, endorsed by or inspired by any existing song,
   video, character or show. */
GamePortal.register('shark', {
  title: 'Sharky Splash',
  emoji: '🦈',
  cat: 'kids',
  c1: '#0369a1',
  c2: '#7dd3fc',
  tags: ['shark', 'baby shark', 'ocean', 'sea', 'fish', 'reef', 'swim', 'catch', 'dodge', 'jellyfish', 'kids', 'cute', 'levels', 'arcade'],
  rating: 4.7,
  plays: '0.4M',
  badge: 'New',
  controls: '◀ ▶ / arrow keys / pointer to swim · munch fish, dodge jellyfish',
  desc: 'Snappy the baby shark is exploring the sunny reef! Chomp the falling fish to fill your tummy before the timer runs out — but dodge the wobbly jellyfish. Clear 5 levels: more fish, less time and faster waves!',
  play: function (stage, api) {
    var W = 420, H = 395, SHY = H - 62;
    var LEVELS = [
      { goal: 8, time: 45, spd: 1 },
      { goal: 12, time: 42, spd: 1.1 },
      { goal: 16, time: 40, spd: 1.2 },
      { goal: 20, time: 37, spd: 1.35 },
      { goal: 24, time: 35, spd: 1.5 }
    ];
    var FISH = ['🐟', '🐠', '🐡'];
    var key = 'ph_shark_lvl';
    var unlocked = Math.min(LEVELS.length, Math.max(1, GamePortal.store.get(key, 1)));
    var level = 1;

    var box = document.createElement('div');
    box.className = 'kg jm';
    box.dataset.level = '1';
    box.dataset.caught = '0';
    box.dataset.hearts = '3';
    box.dataset.left = String(LEVELS[0].time);

    var lvStrip = document.createElement('div');
    lvStrip.className = 'lv-strip';
    lvStrip.id = 'sh-levels';
    box.appendChild(lvStrip);
    var goalEl = document.createElement('div');
    goalEl.className = 'lv-goal';
    goalEl.id = 'sh-goal';
    box.appendChild(goalEl);

    var top = document.createElement('div');
    top.className = 'math-top';
    top.innerHTML = '<span class="math-stat" id="sh-catch">🐟 0 / 8</span>' +
      '<span class="math-stat" id="sh-clock">⏱ 45s</span>';
    box.appendChild(top);

    var bar = document.createElement('div');
    bar.className = 'timer-bar';
    bar.innerHTML = '<div class="timer-fill" id="sh-time"></div>';
    box.appendChild(bar);

    var wrap = document.createElement('div');
    wrap.className = 'canvas-wrap';
    var canvas = document.createElement('canvas');
    canvas.className = 'game-canvas';
    wrap.appendChild(canvas);
    box.appendChild(wrap);

    var ctl = document.createElement('div');
    ctl.className = 'kg-ctl';
    ctl.innerHTML = '<button data-mv="-1" aria-label="swim left">◀</button>' +
      '<span id="sh-hearts" style="align-self:center;font-weight:800">❤️❤️❤️</span>' +
      '<button data-mv="1" aria-label="swim right">▶</button>';
    box.appendChild(ctl);
    stage.appendChild(box);

    var ctx = api.fitCanvas(canvas, W, H);
    var elCatch = box.querySelector('#sh-catch');
    var elClock = box.querySelector('#sh-clock');
    var elTime = box.querySelector('#sh-time');
    var elHearts = box.querySelector('#sh-hearts');

    var sx = W / 2, dir = -1, items = [], floaters = [], bubbles = [];
    var caught = 0, hearts = 3, left = LEVELS[0].time, TIME = 0, GOAL = 0;
    var running = false, spawnT = 0, grace = 3, invuln = 0;
    var frames = 0, t = 0, last = 0, raf = 0;

    for (var i = 0; i < 14; i++) {
      bubbles.push({
        x: Math.random() * W,
        y: Math.random() * H,
        r: 1 + Math.random() * 3,
        v: 9 + Math.random() * 18
      });
    }

    function cfg() { return LEVELS[level - 1]; }
    function renderLevels() {
      var html = '<span class="lv-strip-label">Level</span>';
      for (var n = 1; n <= LEVELS.length; n++) {
        var cls = 'lv-btn' + (n === level ? ' on' : '') + (n > unlocked ? ' locked' : '');
        html += '<button type="button" class="' + cls + '" data-lv="' + n + '"' + (n > unlocked ? ' disabled' : '') + '>' + n + '</button>';
      }
      lvStrip.innerHTML = html;
      goalEl.textContent = 'Chomp ' + cfg().goal + ' fish in ' + cfg().time + 's — dodge the jellyfish!';
      box.dataset.level = String(level);
    }
    function hud() {
      elCatch.textContent = '🐟 ' + caught + ' / ' + GOAL;
      elClock.textContent = '⏱ ' + Math.max(0, Math.ceil(left)) + 's';
      elTime.style.width = Math.max(0, (left / TIME) * 100) + '%';
      elHearts.textContent = '❤️'.repeat(Math.max(0, hearts)) + '🖤'.repeat(Math.max(0, 3 - hearts));
      box.dataset.caught = String(caught);
      box.dataset.hearts = String(hearts);
      box.dataset.left = String(Math.max(0, Math.ceil(left)));
      api.setScore(caught * 10);
    }
    function startLevel(n) {
      level = Math.max(1, Math.min(LEVELS.length, n));
      api.clearOverlay();
      running = true;
      items = []; floaters = [];
      caught = 0; hearts = 3; invuln = 0; grace = 3; spawnT = 0.35;
      TIME = cfg().time; GOAL = cfg().goal; left = TIME;
      sx = W / 2; dir = -1;
      api.setScore(0);
      renderLevels();
      hud();
    }
    function addFloater(x, y, text, color) {
      floaters.push({ x: x, y: y, text: text, color: color, life: 0.9 });
    }
    function levelClear() {
      if (!running) return;
      running = false;
      if (level > unlocked) { unlocked = level; GamePortal.store.set(key, unlocked); }
      api.sfx('win');
      if (level >= LEVELS.length) {
        api.win({
          title: 'Reef Champion! 🏆',
          text: 'All ' + LEVELS.length + ' levels cleared — ' + api.score + ' points!'
        });
        return;
      }
      api.overlay({
        emoji: '🦈',
        title: 'Level ' + level + ' complete!',
        text: 'Next: chomp ' + LEVELS[level].goal + ' fish in ' + LEVELS[level].time + 's.',
        score: api.score,
        best: api.getBest(),
        onAgain: function () { api.clearOverlay(); level++; startLevel(level); }
      });
    }
    function die(title, text) {
      if (!running) return;
      running = false;
      api.gameOver({
        title: title,
        text: text,
        onAgain: function () { api.clearOverlay(); startLevel(level); }
      });
    }
    function spawn() {
      var fish = grace > 0 || Math.random() < 0.74;
      if (grace > 0) grace--;
      var x = 30 + Math.random() * (W - 60);
      items.push({
        x: x, bx: x, y: -22,
        fish: fish,
        e: fish ? FISH[Math.floor(Math.random() * FISH.length)] : '',
        vy: (84 + Math.random() * 34) * cfg().spd,
        ph: Math.random() * 6.28,
        dead: false
      });
    }
    function step(dt) {
      frames++;
      t += dt;
      left -= dt;
      if (left <= 0) {
        left = 0;
        hud();
        die('⏰ The tide is out!', 'Level ' + level + ': you chomped ' + caught + ' of ' + GOAL + ' fish.');
        return;
      }
      if (invuln > 0) invuln -= dt;
      spawnT -= dt;
      if (spawnT <= 0) {
        spawn();
        spawnT = Math.max(0.34, 0.64 / cfg().spd);
      }

      for (var i = 0; i < items.length; i++) {
        var it = items[i];
        it.y += it.vy * dt;
        if (!it.fish) it.x = it.bx + Math.sin(t * 3 + it.ph) * 14;
        if (!it.dead && it.y > SHY - 30 && it.y < SHY + 26 && Math.abs(it.x - sx) < 44) {
          if (it.fish) {
            it.dead = true;
            caught++;
            api.sfx('good');
            addFloater(it.x, it.y - 20, '+10', '#fef08a');
            hud();
            if (caught >= GOAL) { levelClear(); return; }
          } else if (invuln <= 0) {
            it.dead = true;
            hearts--;
            invuln = 1.2;
            api.sfx('bad');
            addFloater(sx, SHY - 46, 'OUCH!', '#fb7185');
            hud();
            if (hearts <= 0) {
              die('🪼 Ouch!', 'The jellyfish got you at level ' + level + ' — you chomped ' + caught + ' fish.');
              return;
            }
          }
        }
        if (it.y > H - 6) it.dead = true;
      }
      items = items.filter(function (it2) { return !it2.dead; });

      for (var j = 0; j < floaters.length; j++) {
        floaters[j].y -= 34 * dt;
        floaters[j].life -= dt;
      }
      floaters = floaters.filter(function (f) { return f.life > 0; });

      for (var b = 0; b < bubbles.length; b++) {
        bubbles[b].y -= bubbles[b].v * dt;
        if (bubbles[b].y < -6) {
          bubbles[b].y = H + 6;
          bubbles[b].x = Math.random() * W;
        }
      }

      hud();
      canvas.dataset.x = sx.toFixed(0);
    }

    function drawSea() {
      if (!drawSea.grad) {
        drawSea.grad = ctx.createLinearGradient(0, 0, 0, H);
        drawSea.grad.addColorStop(0, '#7dd3fc');
        drawSea.grad.addColorStop(.55, '#0ea5e9');
        drawSea.grad.addColorStop(1, '#075985');
      }
      ctx.fillStyle = drawSea.grad;
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = '#fcd34d';
      ctx.fillRect(0, H - 22, W, 22);
      ctx.strokeStyle = '#166534';
      ctx.lineWidth = 5;
      ctx.lineCap = 'round';
      var weeds = [46, 118, 330, 386];
      for (var w = 0; w < weeds.length; w++) {
        var sway = Math.sin(t * 1.6 + w * 1.7) * 9;
        ctx.beginPath();
        ctx.moveTo(weeds[w], H - 20);
        ctx.quadraticCurveTo(weeds[w] + sway, H - 52, weeds[w] + sway * 1.6, H - 76 - (w % 2) * 16);
        ctx.stroke();
      }
    }

    function draw() {
      drawSea();

      ctx.fillStyle = 'rgba(255,255,255,.55)';
      for (var b = 0; b < bubbles.length; b++) {
        var bb = bubbles[b];
        ctx.beginPath();
        ctx.arc(bb.x, bb.y, bb.r, 0, Math.PI * 2);
        ctx.fill();
      }

      for (var i = 0; i < items.length; i++) {
        var it = items[i];
        if (it.fish) {
          ctx.save();
          ctx.translate(it.x, it.y);
          ctx.rotate(Math.sin(t * 5 + it.ph) * 0.22);
          ctx.font = '30px serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(it.e, 0, 0);
          ctx.restore();
        } else {
          ctx.save();
          ctx.translate(it.x, it.y);
          ctx.globalAlpha = 0.88;
          ctx.fillStyle = '#f0abfc';
          ctx.beginPath();
          ctx.arc(0, 0, 16, Math.PI, 0);
          ctx.closePath();
          ctx.fill();
          ctx.fillStyle = '#d946ef';
          ctx.fillRect(-16, -3, 32, 5);
          ctx.strokeStyle = '#f5d0fe';
          ctx.lineWidth = 3;
          for (var k = -1; k <= 1; k++) {
            ctx.beginPath();
            ctx.moveTo(k * 9, 3);
            ctx.quadraticCurveTo(k * 9 + Math.sin(t * 5 + k + it.ph) * 7, 17, k * 9, 30);
            ctx.stroke();
          }
          ctx.globalAlpha = 1;
          ctx.restore();
        }
      }

      var blink = invuln > 0 && Math.floor(frames / 4) % 2 === 0;
      ctx.save();
      ctx.translate(sx, SHY);
      if (dir > 0) ctx.scale(-1, 1);
      ctx.globalAlpha = blink ? 0.4 : 1;
      ctx.font = '46px serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('🦈', 0, 0);
      ctx.restore();

      for (var f = 0; f < floaters.length; f++) {
        var fl = floaters[f];
        ctx.globalAlpha = Math.min(1, fl.life / 0.4);
        ctx.fillStyle = fl.color;
        ctx.font = 'bold 20px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(fl.text, fl.x, fl.y);
      }
      ctx.globalAlpha = 1;
    }

    function loop(ts) {
      raf = requestAnimationFrame(loop);
      if (!last) last = ts;
      var dt = Math.min(0.05, (ts - last) / 1000);
      last = ts;
      if (running) step(dt);
      draw();
    }

    function move(d) {
      if (!running) return;
      sx = Math.max(40, Math.min(W - 40, sx + d));
      dir = d < 0 ? -1 : 1;
      canvas.dataset.x = sx.toFixed(0);
    }
    function onPointer(e) {
      if (!running) return;
      if (e.pointerType === 'mouse' && e.buttons === 0 && e.type === 'pointermove') return;
      var r = canvas.getBoundingClientRect();
      var nx = (e.clientX - r.left) / r.width * W;
      if (nx < sx) dir = -1;
      else if (nx > sx) dir = 1;
      sx = Math.max(40, Math.min(W - 40, nx));
      canvas.dataset.x = sx.toFixed(0);
    }
    function onKey(e) {
      var k = e.key ? e.key.toLowerCase() : '';
      if (k === 'arrowleft' || k === 'a') { e.preventDefault(); move(-30); }
      else if (k === 'arrowright' || k === 'd') { e.preventDefault(); move(30); }
    }

    lvStrip.addEventListener('click', function (e) {
      var lvb = e.target.closest ? e.target.closest('.lv-btn') : null;
      if (!lvb || lvb.disabled) return;
      var n = parseInt(lvb.getAttribute('data-lv'), 10);
      if (n !== level && n <= unlocked) { api.sfx('click'); startLevel(n); }
    });
    ctl.addEventListener('click', function (e) {
      var m = e.target.closest ? e.target.closest('[data-mv]') : null;
      if (m) move(parseInt(m.getAttribute('data-mv'), 10) * 34);
    });
    wrap.addEventListener('pointerdown', onPointer);
    wrap.addEventListener('pointermove', onPointer);
    document.addEventListener('keydown', onKey);

    startLevel(1);
    raf = requestAnimationFrame(loop);

    return function () {
      running = false;
      cancelAnimationFrame(raf);
      wrap.removeEventListener('pointerdown', onPointer);
      wrap.removeEventListener('pointermove', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }
});
