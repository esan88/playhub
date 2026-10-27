/* Kitty Café — serve each kitty the treat it ordered before its patience runs out.
   Original café, menu and kitty customers: kid-friendly time management. */
GamePortal.register('cafe', {
  title: 'Kitty Café',
  emoji: '☕',
  cat: 'arts',
  c1: '#92400e',
  c2: '#fcd34d',
  tags: ['cafe', 'kitty', 'serve', 'orders', 'time', 'management', 'arts', 'cats', 'treats', 'restaurant', 'quick', 'cute'],
  rating: 4.7,
  plays: '0.3M',
  badge: 'Time fun',
  controls: 'Read each kitty\'s order and tap the matching treat before their patience runs out!',
  desc: 'Cats are queuing at your café! Each one dreams of a specific treat — tap it from the kitchen shelf to serve. Miss too many and the café closes for the day. Five busy days with faster, hungrier cats.',
  play: function (stage, api) {
    var TREATS = {
      fish:   { e: '🐟', n: 'fish' },
      milk:   { e: '🥛', n: 'milk' },
      cake:   { e: '🍰', n: 'cake' },
      cookie: { e: '🍪', n: 'cookie' },
      star:   { e: '⭐', n: 'star' }
    };
    var TKEYS = ['fish', 'milk', 'cake', 'cookie', 'star'];
    var FACES = ['🐱', '😺', '😸', '😻', '🐈'];
    var NAMES = ['Mochi', 'Luna', 'Biscuit', 'Pepper', 'Milo', 'Nala', 'Coco', 'Ginger', 'Socks', 'Tiger', 'Fifi', 'Pumpkin'];
    var MISSES = 3;
    var LEVELS = [
      { total: 4,  patience: 20000, max: 1, gap: 3000 },
      { total: 6,  patience: 18000, max: 2, gap: 3000 },
      { total: 8,  patience: 15000, max: 2, gap: 2800 },
      { total: 10, patience: 13000, max: 3, gap: 2600 },
      { total: 12, patience: 11000, max: 3, gap: 2400 }
    ];
    var key = 'ph_cafe_lvl';
    var unlocked = Math.min(LEVELS.length, Math.max(1, GamePortal.store.get(key, 1)));
    var level = 1;

    var wrap = document.createElement('div');
    wrap.className = 'kg jm';
    wrap.dataset.level = '1';
    wrap.dataset.served = '0';
    wrap.dataset.missed = '0';
    wrap.dataset.total = String(LEVELS[0].total);
    wrap.innerHTML =
      '<div class="lv-strip" id="ca-levels"><span class="lv-strip-label">Day</span></div>' +
      '<div class="lv-goal" id="ca-goal"></div>' +
      '<div class="math-top">' +
        '<span class="math-stat" id="ca-prog">Served 0 · Missed 0</span>' +
        '<span class="math-stat" id="ca-wait">🐱 0 waiting</span>' +
      '</div>' +
      '<div id="ca-cats" style="display:flex;flex-direction:column;gap:10px;width:min(470px,96%);min-height:58px"></div>' +
      '<div class="kg-ctl" id="ca-kitchen" style="flex-wrap:wrap;justify-content:center;max-width:min(470px,96%)"></div>' +
      '<div class="hint" id="ca-hint">Read the bubble, then tap that treat!</div>';
    stage.appendChild(wrap);

    var elCats = wrap.querySelector('#ca-cats');
    var elKitchen = wrap.querySelector('#ca-kitchen');
    var elProg = wrap.querySelector('#ca-prog');
    var elWait = wrap.querySelector('#ca-wait');
    var elHint = wrap.querySelector('#ca-hint');
    var elGoal = wrap.querySelector('#ca-goal');
    var elLevels = wrap.querySelector('#ca-levels');

    var cats = [], queue = [];
    var spawned = 0, served = 0, missed = 0;
    var arrival = null, since = 0;
    var alive = true;

    var kh = '';
    for (var i = 0; i < TKEYS.length; i++) {
      kh += '<button type="button" class="ca-treat" data-treat="' + TKEYS[i] + '">' +
        TREATS[TKEYS[i]].e +
        '<span class="ca-tname" style="display:block;font-size:12px;font-weight:800;line-height:1.1">' + TREATS[TKEYS[i]].n + '</span>' +
        '</button>';
    }
    elKitchen.innerHTML = kh;

    function cfg() { return LEVELS[level - 1]; }

    function renderLevels() {
      var html = '<span class="lv-strip-label">Day</span>';
      for (var n = 1; n <= LEVELS.length; n++) {
        var cls = 'lv-btn' + (n === level ? ' on' : '') + (n > unlocked ? ' locked' : '');
        html += '<button type="button" class="' + cls + '" data-lv="' + n + '"' + (n > unlocked ? ' disabled' : '') + '>' + n + '</button>';
      }
      elLevels.innerHTML = html;
      elGoal.textContent = 'Level ' + level + ' — serve ' + cfg().total + ' kitty orders (miss ≤ ' + (MISSES - 1) + ')!';
      wrap.dataset.level = String(level);
      wrap.dataset.total = String(cfg().total);
    }

    function hud() {
      elProg.textContent = 'Served ' + served + ' · Missed ' + missed;
      elWait.textContent = '🐱 ' + cats.length + ' waiting';
      wrap.dataset.level = String(level);
      wrap.dataset.served = String(served);
      wrap.dataset.missed = String(missed);
      wrap.dataset.total = String(cfg().total);
      api.setScore(Math.max(0, served * 10 - missed * 5));
    }

    function shake(el) {
      el.classList.remove('shake');
      void el.offsetWidth;
      el.classList.add('shake');
    }

    function buildQueue() {
      queue = [];
      var prev = -1;
      for (var i = 0; i < cfg().total; i++) {
        var t = Math.floor(Math.random() * TKEYS.length);
        if (t === prev) t = (t + 1) % TKEYS.length;
        prev = t;
        queue.push(TKEYS[t]);
      }
    }

    function stopArrival() { if (arrival) { clearInterval(arrival); arrival = null; } }
    function stopCats() { for (var i = 0; i < cats.length; i++) clearInterval(cats[i].timer); }
    function stopAll() { stopArrival(); stopCats(); }
    function clearCats() { stopCats(); cats = []; elCats.innerHTML = ''; }

    function startArrival() {
      stopArrival();
      since = 0;
      arrival = setInterval(function () {
        if (!alive) { stopArrival(); return; }
        since += 250;
        if (spawned >= cfg().total) { stopArrival(); return; }
        if (since < cfg().gap) return;
        if (cats.length >= cfg().max) return;
        spawnCat();
      }, 250);
    }

    function spawnCat() {
      if (spawned >= cfg().total) { stopArrival(); return; }
      var treat = queue[spawned];
      var idx = spawned;
      spawned++;
      since = 0;
      var c = {
        treat: treat,
        name: NAMES[idx % NAMES.length],
        face: FACES[idx % FACES.length],
        left: cfg().patience,
        total: cfg().patience,
        timer: null,
        el: null,
        fill: null
      };
      var row = document.createElement('div');
      row.className = 'ca-cat';
      row.setAttribute('data-treat', treat);
      row.setAttribute('data-name', c.name);
      row.style.cssText = 'display:flex;align-items:center;gap:9px;background:rgba(255,255,255,.1);border:1.5px solid rgba(255,255,255,.22);border-radius:14px;padding:8px 12px';
      row.innerHTML =
        '<span style="font-size:26px;line-height:1">' + c.face + '</span>' +
        '<span class="ca-name" style="font-weight:800;font-size:13.5px;min-width:70px;text-align:left">' + c.name + '</span>' +
        '<span class="ca-order" data-treat="' + treat + '" style="background:#fff;color:#14162b;border-radius:999px;padding:4px 13px;font-size:21px;font-weight:800;box-shadow:0 4px 10px rgba(0,0,0,.25)">' + TREATS[treat].e + '</span>' +
        '<div class="timer-bar" style="flex:1;min-width:70px"><div class="timer-fill"></div></div>';
      elCats.appendChild(row);
      c.el = row;
      c.fill = row.querySelector('.timer-fill');
      c.fill.style.width = '100%';
      c.timer = setInterval(function () { tickCat(c); }, 100);
      cats.push(c);
      if (spawned >= cfg().total) stopArrival();
      hud();
    }

    function removeCat(c) {
      clearInterval(c.timer);
      c.timer = null;
      var ix = cats.indexOf(c);
      if (ix >= 0) cats.splice(ix, 1);
      if (c.el && c.el.parentNode) c.el.parentNode.removeChild(c.el);
      c.el = null;
    }

    function tickCat(c) {
      if (!alive) { clearInterval(c.timer); c.timer = null; return; }
      c.left -= 100;
      if (c.left <= 0) { leaveCat(c); return; }
      c.fill.style.width = Math.max(0, (c.left / c.total) * 100) + '%';
      if (c.left / c.total < 0.35) c.fill.style.background = 'linear-gradient(90deg,#ff4d8d,#ff9fb6)';
    }

    function leaveCat(c) {
      var nm = c.name;
      removeCat(c);
      missed++;
      api.sfx('bad');
      elHint.textContent = '💨 ' + nm + ' got tired of waiting…';
      hud();
      if (missed >= MISSES) { fail(); return; }
      checkDone();
    }

    function checkDone() {
      if (!alive) return;
      if (spawned >= cfg().total && cats.length === 0) levelClear();
    }

    function checkFail() {
      if (!alive) return;
      if (missed >= MISSES) fail();
    }

    function levelClear() {
      alive = false;
      stopAll();
      if (level > unlocked) { unlocked = level; GamePortal.store.set(key, unlocked); }
      if (level >= LEVELS.length) {
        api.win({ emoji: '🏆', title: 'Café Champion!', text: 'Every kitty got its treat!' });
        return;
      }
      api.sfx('win');
      api.overlay({
        emoji: '☕',
        title: 'Level ' + level + ' complete!',
        text: 'Next day: ' + LEVELS[level].total + ' kitty orders with only ' + (LEVELS[level].patience / 1000) + 's of patience each.',
        score: api.score,
        best: api.getBest(),
        onAgain: function () { api.clearOverlay(); level++; startLevel(level); }
      });
    }

    function fail() {
      alive = false;
      stopAll();
      api.gameOver({
        title: '😿 Café closed!',
        text: 'Day ' + level + ': you served ' + served + ' of ' + cfg().total + ' orders with ' + missed + ' misses.',
        onAgain: function () { api.clearOverlay(); startLevel(level); }
      });
    }

    function startLevel(n) {
      level = Math.max(1, Math.min(LEVELS.length, n));
      api.clearOverlay();
      api.setScore(0);
      stopAll();
      clearCats();
      spawned = 0; served = 0; missed = 0;
      alive = true;
      buildQueue();
      renderLevels();
      hud();
      spawnCat();
      startArrival();
    }

    function onTap(e) {
      if (!alive) return;
      var b = e.target && e.target.closest ? e.target.closest('.ca-treat') : null;
      if (!b) return;
      var treat = b.getAttribute('data-treat');
      var match = null;
      for (var i = 0; i < cats.length; i++) {
        if (cats[i].treat === treat) { match = cats[i]; break; }
      }
      if (match) {
        var nm = match.name;
        removeCat(match);
        served++;
        api.sfx('good');
        elHint.textContent = TREATS[treat].e + ' for ' + nm + ' — yum! 😺';
        hud();
        checkDone();
      } else {
        missed++;
        api.sfx('bad');
        elHint.textContent = '💨 Nobody ordered ' + TREATS[treat].n + ' — watch the bubbles!';
        shake(elKitchen);
        hud();
        checkFail();
      }
    }

    function onLv(e) {
      var lvb = e.target && e.target.closest ? e.target.closest('.lv-btn') : null;
      if (lvb && !lvb.classList.contains('locked') && !lvb.disabled) {
        var n = parseInt(lvb.getAttribute('data-lv'), 10);
        if (n !== level && n <= unlocked) { api.sfx('click'); startLevel(n); }
      }
    }

    elKitchen.addEventListener('click', onTap);
    elLevels.addEventListener('click', onLv);

    startLevel(1);

    return function () {
      alive = false;
      stopAll();
      elKitchen.removeEventListener('click', onTap);
      elLevels.removeEventListener('click', onLv);
    };
  }
});
