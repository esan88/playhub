/* Bunny Bakery — build each cake to match the order ticket */
GamePortal.register('cake', {
  title: 'Bunny Bakery',
  emoji: '🐰',
  cat: 'girls',
  c1: '#f78fb3',
  c2: '#c8f2ee',
  tags: ['cake', 'bakery', 'cooking', 'girls', 'casual', 'kids', 'baking', 'sweet'],
  rating: 4.7,
  plays: '0.3M',
  badge: 'New',
  controls: 'Click the ingredients that match the order ticket · tap only',
  desc: 'The bunny customers are waiting! Match the base, frosting and topping on every ticket. Bake across 5 levels — serve 7 cakes to become the Master Baker!',
  play: function (stage, api) {
    var GROUPS = [
      { slot: 'base', noun: 'base', label: '🥣 Cake base', opts: [
        ['vanilla', '🟡 Vanilla', '#fde68a'],
        ['choco', '🟤 Chocolate', '#92400e'],
        ['strawberry', '🍓 Strawberry', '#fb7185'],
        ['redvelvet', '❤️ Red velvet', '#e11d48']
      ] },
      { slot: 'frost', noun: 'frosting', label: '🍧 Frosting', opts: [
        ['white', '🤍 White', '#f8fafc'],
        ['pink', '🌸 Pink', '#f9a8d4'],
        ['choco', '🍫 Choco', '#78350f'],
        ['mint', '🌿 Mint', '#86efac']
      ] },
      { slot: 'top', noun: '', label: '⭐ Topping', opts: [
        ['cherry', '🍒 Cherry', '🍒'],
        ['candle', '🕯️ Candle', '🕯️'],
        ['star', '⭐ Star', '⭐']
      ] }
    ];
    var NEUTRAL = '#3f4157';
    var LEVELS = [
      { goal: 3, slots: 3 },
      { goal: 4, slots: 4 },
      { goal: 5, slots: 5 },
      { goal: 6, slots: 6 },
      { goal: 7, slots: 7 }
    ];
    var key = 'ph_cake_lvl';
    var unlocked = Math.min(LEVELS.length, Math.max(1, GamePortal.store.get(key, 1)));
    var level = 1;

    var wrap = document.createElement('div');
    wrap.className = 'cy-wrap';
    wrap.dataset.orders = '0';
    wrap.dataset.level = '1';
    wrap.style.flexWrap = 'wrap';
    wrap.innerHTML =
      '<div class="lv-strip" id="cy-levels" style="width:100%"><span class="lv-strip-label">Level</span></div>' +
      '<div class="lv-goal" id="cy-goal" style="width:100%"></div>' +
      '<div class="cy-left">' +
        '<div class="cy-need">' +
          '<div class="cy-need-title" id="cy-title">🐰 Order ticket · ❤️❤️❤️</div>' +
          '<div class="cy-need-tags" id="cy-tags"></div>' +
        '</div>' +
        '<div class="cy-stage">' +
          '<div class="cy-cake">' +
            '<div class="cy-top" id="cy-top"></div>' +
            '<div class="cy-layer" id="cy-frost" style="width:152px;background:' + NEUTRAL + '"></div>' +
            '<div class="cy-layer" id="cy-b1" style="width:178px;background:' + NEUTRAL + '"></div>' +
            '<div class="cy-layer" id="cy-b2" style="width:194px;background:' + NEUTRAL + '"></div>' +
            '<div class="cy-plate"></div>' +
          '</div>' +
          '<div class="cy-dots-row" id="cy-dots">⚪⚪⚪⚪⚪⚪</div>' +
        '</div>' +
      '</div>' +
      '<div class="cy-right">' +
        GROUPS.map(function (g) {
          return '<div class="cy-group"><h5>' + g.label + '</h5><div class="cy-opts">' +
            g.opts.map(function (o) {
              var mark = g.slot === 'top'
                ? '<span class="cy-mini">' + o[2] + '</span>'
                : '<span class="cy-swatch" style="--sw:' + o[2] + '"></span>';
              return '<button class="cy-opt" data-slot="' + g.slot + '" data-val="' + o[0] + '">' + mark + o[1] + '</button>';
            }).join('') +
          '</div></div>';
        }).join('') +
      '</div>';
    stage.appendChild(wrap);

    var need = {}, pick = {}, lives = 3, orders = 0, busy = false, alive = true;
    var orderFilled = 0, ordTO = null;
    var elTitle = wrap.querySelector('#cy-title');
    var elTags = wrap.querySelector('#cy-tags');
    var elDots = wrap.querySelector('#cy-dots');
    var elTop = wrap.querySelector('#cy-top');
    var elFrost = wrap.querySelector('#cy-frost');
    var elB1 = wrap.querySelector('#cy-b1');
    var elB2 = wrap.querySelector('#cy-b2');
    var elGoal = wrap.querySelector('#cy-goal');
    var elLevels = wrap.querySelector('#cy-levels');
    var right = wrap.querySelector('.cy-right');

    function cfg() { return LEVELS[level - 1]; }
    function renderLevels() {
      var html = '<span class="lv-strip-label">Level</span>';
      for (var n = 1; n <= LEVELS.length; n++) {
        var cls = 'lv-btn' + (n === level ? ' on' : '') + (n > unlocked ? ' locked' : '');
        html += '<button type="button" class="' + cls + '" data-lv="' + n + '"' + (n > unlocked ? ' disabled' : '') + '>' + n + '</button>';
      }
      elLevels.innerHTML = html;
      elGoal.textContent = 'Serve ' + cfg().goal + ' cakes with ' + cfg().slots + ' decoration slots each to clear level ' + level + '!';
      wrap.dataset.level = String(level);
    }

    function group(slot) {
      return GROUPS.filter(function (g) { return g.slot === slot; })[0];
    }

    function clearPicks() {
      Object.keys(pick).forEach(function (k) { delete pick[k]; });
      wrap.querySelectorAll('.cy-opt').forEach(function (b) { b.classList.remove('on'); });
      elFrost.style.background = NEUTRAL;
      elB1.style.background = NEUTRAL;
      elB2.style.background = NEUTRAL;
      elTop.textContent = '';
    }

    function hud() {
      var slots = cfg().slots;
      elTitle.textContent = '🐰 Order ticket' + (slots > 3 ? ' · 🎨 ' + orderFilled + '/' + slots : '') + ' · ' + '❤️'.repeat(Math.max(0, lives)) + '🖤'.repeat(Math.max(0, 3 - lives));
      elDots.textContent = '⭐'.repeat(orders) + '⚪'.repeat(Math.max(0, cfg().goal - orders));
      wrap.dataset.orders = String(orders);
      wrap.dataset.lives = String(lives);
    }

    function newOrder() {
      need = {};
      orderFilled = 0;
      GROUPS.forEach(function (g) {
        need[g.slot] = g.opts[Math.floor(Math.random() * g.opts.length)][0];
      });
      clearPicks();
      elTags.innerHTML = GROUPS.map(function (g) {
        var o = g.opts.filter(function (x) { return x[0] === need[g.slot]; })[0];
        return '<span data-need-slot="' + g.slot + '" data-need-val="' + need[g.slot] + '">' +
          o[1] + (g.noun ? ' ' + g.noun : '') + '</span>';
      }).join('');
    }

    function nextPass() {
      Object.keys(pick).forEach(function (k) { delete pick[k]; });
      wrap.querySelectorAll('.cy-opt').forEach(function (b) { b.classList.remove('on'); });
      api.sfx('flip');
      hud();
    }

    function apply(slot, color) {
      if (slot === 'base') { elB1.style.background = color; elB2.style.background = color; }
      else if (slot === 'frost') elFrost.style.background = color;
      else elTop.textContent = color;
    }

    function onClick(e) {
      if (!alive || busy) return;
      var b = e.target.closest('.cy-opt');
      if (!b) return;
      var slot = b.dataset.slot;
      var val = b.dataset.val;
      if (pick[slot] === val) return;
      if (val !== need[slot]) {
        lives--;
        api.sfx('bad');
        right.classList.remove('shake');
        void right.offsetWidth;
        right.classList.add('shake');
        clearPicks();
        orderFilled = 0;
        hud();
        if (lives <= 0) {
          alive = false;
          api.gameOver({
            title: '💔 Order failed!',
            text: 'You served ' + orders + ' of ' + cfg().goal + ' cakes for ' + api.score + ' points.',
            onAgain: function () { api.clearOverlay(); startLevel(level); }
          });
        }
        return;
      }
      pick[slot] = val;
      b.classList.add('on');
      api.sfx('pop');
      var g = group(slot);
      var o = g.opts.filter(function (x) { return x[0] === val; })[0];
      apply(slot, o[2]);
      orderFilled++;
      if (orderFilled >= cfg().slots) {
        busy = true;
        api.addScore(50 + (cfg().slots - 3) * 25);
        orders++;
        hud();
        api.sfx('win');
        if (orders >= cfg().goal) { levelClear(); return; }
        if (ordTO) clearTimeout(ordTO);
        ordTO = setTimeout(function () {
          ordTO = null;
          if (!alive) return;
          newOrder();
          busy = false;
        }, 650);
        return;
      }
      hud();
      if (Object.keys(pick).length === 3) nextPass();
    }

    function levelClear() {
      alive = false;
      busy = true;
      if (ordTO) { clearTimeout(ordTO); ordTO = null; }
      if (level > unlocked) { unlocked = level; GamePortal.store.set(key, unlocked); }
      if (level >= LEVELS.length) {
        api.win({
          title: 'Master Baker! 🍰',
          text: 'All ' + LEVELS.length + ' levels cleared — ' + api.score + ' points!'
        });
        return;
      }
      api.sfx('win');
      api.overlay({
        emoji: '🎂',
        title: 'Level ' + level + ' complete!',
        text: 'Next: serve ' + LEVELS[level].goal + ' cakes with ' + LEVELS[level].slots + ' slots each.',
        score: api.score,
        best: api.getBest(),
        onAgain: function () { api.clearOverlay(); level++; startLevel(level); }
      });
    }

    function startLevel(n) {
      level = Math.max(1, Math.min(LEVELS.length, n));
      api.clearOverlay();
      api.setScore(0);
      if (ordTO) { clearTimeout(ordTO); ordTO = null; }
      orders = 0;
      orderFilled = 0;
      lives = 3;
      busy = false;
      alive = true;
      renderLevels();
      newOrder();
      hud();
    }

    wrap.addEventListener('click', onClick);
    elLevels.addEventListener('click', function (e) {
      var b = e.target.closest ? e.target.closest('.lv-btn') : null;
      if (!b || b.disabled) return;
      var n = parseInt(b.getAttribute('data-lv'), 10);
      if (n !== level && n <= unlocked) { api.sfx('click'); startLevel(n); }
    });

    startLevel(1);

    return function () {};
  }
});
