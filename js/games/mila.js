/* Mila & Bramble — an original forest picnic catch game.
   Mila (a little explorer) and Bramble (her big friendly bear) are original
   characters: not based on, affiliated with or inspired by any existing show. */
GamePortal.register('mila', {
  title: 'Mila & Bramble',
  emoji: '🧺',
  cat: 'kids',
  c1: '#059669',
  c2: '#a7f3d0',
  tags: ['bear', 'forest', 'picnic', 'catch', 'friends', 'nature', 'kids', 'girls', 'boys', 'basket', 'levels', 'bramble'],
  rating: 4.8,
  plays: '0.3M',
  badge: 'New',
  controls: '◀ ▶ / arrow keys / pointer to slide the basket · catch treats, dodge the ick',
  desc: 'Mila and Bramble the bear are packing a forest picnic! Slide the basket under falling berries, apples and mushrooms — but dodge the wasps and rainclouds. Clear 5 sunny levels for the biggest picnic ever!',
  play: function (stage, api) {
    var W = 400, H = 300, BASKET_Y = 258;
    var LEVELS = [
      { goal: 8, speed: 110, gap: 1.0 },
      { goal: 10, speed: 130, gap: 0.9 },
      { goal: 12, speed: 155, gap: 0.8 },
      { goal: 15, speed: 180, gap: 0.7 },
      { goal: 18, speed: 205, gap: 0.6 }
    ];
    var GOOD = ['🫐', '🍎', '🌰', '🍄', '🍐', '🍓'];
    var BAD = ['🐝', '🌧️'];
    var key = 'ph_mila_lvl';
    var unlocked = Math.min(LEVELS.length, Math.max(1, GamePortal.store.get(key, 1)));
    var level = 1;

    var box = document.createElement('div');
    box.className = 'kg metrosprint milapic';
    box.dataset.caught = '0';
    box.dataset.miss = '0';
    box.dataset.level = '1';
    box.dataset.hearts = '3';
    var wrap = document.createElement('div');
    wrap.className = 'canvas-wrap';
    var canvas = document.createElement('canvas');
    canvas.className = 'game-canvas';
    wrap.appendChild(canvas);
    box.appendChild(wrap);
    var lvStrip = document.createElement('div');
    lvStrip.className = 'lv-strip';
    lvStrip.id = 'ml-levels';
    box.insertBefore(lvStrip, wrap);
    var goalEl = document.createElement('div');
    goalEl.className = 'lv-goal';
    goalEl.id = 'ml-goal';
    box.insertBefore(goalEl, wrap);
    var ctl = document.createElement('div');
    ctl.className = 'kg-ctl';
    ctl.innerHTML = '<button data-mv="-1" aria-label="left">◀</button>' +
      '<span class="ml-heart" id="ml-hearts" style="align-self:center;font-weight:800">❤️❤️❤️</span>' +
      '<button data-mv="1" aria-label="right">▶</button>';
    box.appendChild(ctl);
    stage.appendChild(box);
    var ctx = api.fitCanvas(canvas, W, H);

    var basketX = W / 2, items = [], caught = 0, miss = 0, hearts = 3;
    var alive = true, spawnT, grace = 3, raf, last, dead = false;
    var elHearts = ctl.querySelector('#ml-hearts');
    var elGoal = goalEl;
    var elLevels = lvStrip;

    function cfg() { return LEVELS[level - 1]; }
    function renderLevels() {
      var html = '<span class="lv-strip-label">Level</span>';
      for (var i = 1; i <= LEVELS.length; i++) {
        var cls = 'lv-btn' + (i === level ? ' on' : '') + (i > unlocked ? ' locked' : '');
        html += '<button type="button" class="' + cls + '" data-lv="' + i + '"' + (i > unlocked ? ' disabled' : '') + '>' + i + '</button>';
      }
      elLevels.innerHTML = html;
      elGoal.textContent = 'Pack ' + cfg().goal + ' treats for the picnic!';
      box.dataset.level = String(level);
    }
    function hud() {
      elHearts.textContent = '❤️'.repeat(Math.max(0, hearts)) + '🖤'.repeat(Math.max(0, 3 - hearts));
      box.dataset.caught = String(caught);
      box.dataset.miss = String(miss);
      box.dataset.hearts = String(hearts);
      api.setScore(Math.max(0, caught * 10 - miss * 2));
    }
    function reset() {
      items = []; caught = 0; miss = 0; hearts = 3;
      basketX = W / 2; alive = true; spawnT = 0.6; grace = 3;
      api.setScore(0);
      renderLevels();
      hud();
    }
    function startLevel(n) {
      level = Math.max(1, Math.min(LEVELS.length, n));
      api.clearOverlay();
      reset();
    }
    function move(d) {
      if (!alive) return;
      basketX = Math.max(34, Math.min(W - 34, basketX + d));
      box.dataset.bx = String(Math.round(basketX));
      api.sfx('click');
    }
    function spawn() {
      var isGood = grace > 0 || Math.random() < 0.66;
      if (grace > 0) grace--;
      var x = grace >= 0 && isGood && caught === 0 && miss === 0 && items.length === 0
        ? basketX
        : 30 + Math.random() * (W - 60);
      items.push({ x: x, y: -18, good: isGood, e: isGood ? GOOD[Math.floor(Math.random() * GOOD.length)] : BAD[Math.floor(Math.random() * BAD.length)] });
    }
    function badCaught() {
      hearts--;
      api.sfx('bad');
      hud();
      if (hearts <= 0) {
        alive = false;
        api.gameOver({
          title: '😵 Oh no!',
          text: 'Level ' + level + ': you packed ' + caught + ' of ' + cfg().goal + ' treats.',
          onAgain: function () { api.clearOverlay(); reset(); }
        });
      }
    }
    function finishLevel() {
      alive = false;
      if (level > unlocked) { unlocked = level; GamePortal.store.set(key, unlocked); }
      if (level >= LEVELS.length) {
        api.win({
          title: 'Picnic Champion! 🧺',
          text: 'All 5 levels packed — ' + api.score + ' points for Mila & Bramble!'
        });
        return;
      }
      api.sfx('win');
      api.overlay({
        emoji: '🧺',
        title: 'Level ' + level + ' packed!',
        text: 'Next: gather ' + LEVELS[level].goal + ' treats — faster falls!',
        score: api.score,
        best: api.getBest(),
        onAgain: function () { api.clearOverlay(); level++; reset(); }
      });
    }
    function step(dt) {
      spawnT -= dt;
      if (spawnT <= 0) {
        spawn();
        spawnT = Math.max(0.4, cfg().gap - caught * 0.015) + Math.random() * 0.35;
      }
      for (var i = items.length - 1; i >= 0; i--) {
        var it = items[i];
        it.y += cfg().speed * dt;
        if (it.y >= BASKET_Y - 14 && it.y <= BASKET_Y + 22 && Math.abs(it.x - basketX) < 36) {
          items.splice(i, 1);
          if (it.good) {
            caught++;
            api.sfx('good');
            hud();
            if (caught >= cfg().goal) { finishLevel(); return; }
          } else {
            badCaught();
            if (!alive) return;
          }
        } else if (it.y > H + 20) {
          items.splice(i, 1);
          if (it.good) { miss++; hud(); }
        }
      }
    }
    function draw() {
      if (!draw.sky) {
        draw.sky = ctx.createLinearGradient(0, 0, 0, H);
        draw.sky.addColorStop(0, '#bfe9ff');
        draw.sky.addColorStop(1, '#e8f8e4');
      }
      ctx.fillStyle = draw.sky;
      ctx.fillRect(0, 0, W, H);
      ctx.font = '30px serif';
      ctx.textAlign = 'left';
      ctx.fillText('🌳', 6, 34);
      ctx.fillText('🌲', 330, 34);
      ctx.fillStyle = '#7ec98f';
      ctx.beginPath();
      ctx.ellipse(W / 2, H + 26, W, 44, 0, 0, Math.PI * 2);
      ctx.fill();
      items.forEach(function (it) {
        ctx.font = '26px serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(it.e, it.x, it.y);
      });
      ctx.font = '34px serif';
      ctx.fillText('🧺', basketX, BASKET_Y + 6);
      ctx.font = '26px serif';
      ctx.fillText('🧸', basketX - 40, H - 16);
      ctx.font = '14px sans-serif';
      ctx.fillStyle = '#14532d';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'top';
      ctx.fillText('L' + level + '  🧺 ' + caught + '/' + cfg().goal + '   ❌ ' + miss, 10, 8);
      if (!alive) {
        ctx.font = '36px serif';
        ctx.textAlign = 'center';
        ctx.fillText('💤', basketX, BASKET_Y - 34);
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
      if (k === 'arrowleft' || k === 'a') { e.preventDefault(); move(-38); }
      else if (k === 'arrowright' || k === 'd') { e.preventDefault(); move(38); }
    }
    elLevels.addEventListener('click', function (e) {
      var lvb = e.target.closest('.lv-btn');
      if (lvb && !lvb.classList.contains('locked')) {
        var n = parseInt(lvb.dataset.lv, 10);
        if (n !== level && n <= unlocked) { api.sfx('click'); startLevel(n); }
      }
    });
    ctl.addEventListener('click', function (e) {
      var m = e.target.closest('[data-mv]');
      if (m) move(parseInt(m.dataset.mv, 10) * 38);
    });
    wrap.addEventListener('pointerdown', function (e) {
      var r = canvas.getBoundingClientRect();
      basketX = Math.max(34, Math.min(W - 34, (e.clientX - r.left) / r.width * W));
      box.dataset.bx = String(Math.round(basketX));
    });
    wrap.addEventListener('pointermove', function (e) {
      if (e.pointerType === 'mouse' && e.buttons === 0) return;
      var r = canvas.getBoundingClientRect();
      basketX = Math.max(34, Math.min(W - 34, (e.clientX - r.left) / r.width * W));
      box.dataset.bx = String(Math.round(basketX));
    });
    document.addEventListener('keydown', onKey);
    startLevel(1);
    raf = requestAnimationFrame(loop);
    return function () {
      alive = false;
      dead = true;
      cancelAnimationFrame(raf);
      document.removeEventListener('keydown', onKey);
    };
  }
});
