/* Style Studio — style the client to match the order card */
GamePortal.register('dressup', {
  title: 'Style Studio',
  emoji: '👗',
  cat: 'arts',
  c1: '#ff5d8f',
  c2: '#ffc2d4',
  tags: ['dressup', 'fashion', 'arts', 'casual', 'kids', 'style', 'clothes'],
  rating: 4.8,
  plays: '0.3M',
  badge: 'New',
  controls: 'Click the pieces that match the order card · tap only',
  desc: 'A client walks in with a style card! Pick the hair, dress, shoes and accessory that match. Style looks across 5 levels — finish 7 to become a Style Star!',
  play: function (stage, api) {
    var GROUPS = [
      { slot: 'hair', noun: 'hair', label: '💇 Hair', opts: [
        ['gold', '💛 Gold', '#f5c542'],
        ['brown', '🟤 Brown', '#8b5a2b'],
        ['black', '⚫ Black', '#1f2430']
      ] },
      { slot: 'dress', noun: 'dress', label: '👗 Dress', opts: [
        ['pink', '🌸 Pink', '#ff8fb1'],
        ['red', '❤️ Red', '#ef4444'],
        ['blue', '💙 Blue', '#60a5fa']
      ] },
      { slot: 'shoes', noun: 'shoes', label: '👠 Shoes', opts: [
        ['red', '❤️ Red', '#ef4444'],
        ['white', '🤍 White', '#f1f5f9'],
        ['gold', '🥇 Gold', '#ffd166']
      ] },
      { slot: 'extra', noun: '', label: '✨ Accessory', opts: [
        ['bow', '🎀 Bow', '🎀'],
        ['crown', '👑 Crown', '👑'],
        ['flower', '🌸 Flower', '🌸'],
        ['gem', '💎 Gem', '💎']
      ] }
    ];
    var NEUTRAL = '#6b7280';
    var LEVELS = [
      { goal: 3, lives: 3, penalty: 0 },
      { goal: 4, lives: 3, penalty: 5 },
      { goal: 5, lives: 2, penalty: 10 },
      { goal: 6, lives: 2, penalty: 15 },
      { goal: 7, lives: 2, penalty: 20 }
    ];
    var key = 'ph_dressup_lvl';
    var unlocked = Math.min(LEVELS.length, Math.max(1, GamePortal.store.get(key, 1)));
    var level = 1;

    var wrap = document.createElement('div');
    wrap.className = 'fs-wrap';
    wrap.dataset.orders = '0';
    wrap.dataset.level = '1';
    wrap.style.flexWrap = 'wrap';
    wrap.innerHTML =
      '<div class="lv-strip" id="du-levels" style="width:100%"><span class="lv-strip-label">Level</span></div>' +
      '<div class="lv-goal" id="du-goal" style="width:100%"></div>' +
      '<div class="fs-left">' +
        '<div class="fs-need">' +
          '<div class="fs-need-title" id="fs-title">👗 Style the client… ❤️❤️❤️</div>' +
          '<div class="fs-need-tags" id="fs-tags"></div>' +
        '</div>' +
        '<div class="fs-doll">' +
          '<svg viewBox="0 0 200 300" xmlns="http://www.w3.org/2000/svg">' +
            '<rect x="86" y="212" width="11" height="54" rx="5" fill="#ffd7b5"/>' +
            '<rect x="103" y="212" width="11" height="54" rx="5" fill="#ffd7b5"/>' +
            '<rect data-fill="shoes" x="79" y="262" width="23" height="14" rx="6" fill="' + NEUTRAL + '"/>' +
            '<rect data-fill="shoes" x="98" y="262" width="23" height="14" rx="6" fill="' + NEUTRAL + '"/>' +
            '<path data-fill="dress" d="M100 94 L138 216 Q100 232 62 216 Z" fill="' + NEUTRAL + '"/>' +
            '<rect x="59" y="106" width="12" height="72" rx="6" fill="#ffd7b5" transform="rotate(14 65 110)"/>' +
            '<rect x="129" y="106" width="12" height="72" rx="6" fill="#ffd7b5" transform="rotate(-14 135 110)"/>' +
            '<circle data-fill="hair" cx="100" cy="58" r="41" fill="' + NEUTRAL + '"/>' +
            '<circle cx="100" cy="66" r="34" fill="#ffd7b5"/>' +
            '<path data-fill="hair" d="M66 54 q34 -28 68 0 q-9 -24 -34 -24 q-25 0 -34 24 z" fill="' + NEUTRAL + '"/>' +
            '<circle cx="89" cy="66" r="4" fill="#1f2430"/>' +
            '<circle cx="111" cy="66" r="4" fill="#1f2430"/>' +
            '<path d="M90 80 q10 9 20 0" stroke="#1f2430" stroke-width="3.5" fill="none" stroke-linecap="round"/>' +
            '<text id="fs-acc" x="100" y="22" font-size="25" text-anchor="middle"></text>' +
          '</svg>' +
        '</div>' +
        '<div class="fs-dots-row" id="fs-dots">⚪⚪⚪⚪⚪⚪</div>' +
      '</div>' +
      '<div class="fs-right">' +
        GROUPS.map(function (g) {
          return '<div class="fs-group"><h5>' + g.label + '</h5><div class="fs-opts">' +
            g.opts.map(function (o) {
              var mark = g.slot === 'extra'
                ? '<span class="fs-mini">' + o[2] + '</span>'
                : '<span class="fs-swatch" style="--sw:' + o[2] + '"></span>';
              return '<button class="fs-opt" data-slot="' + g.slot + '" data-val="' + o[0] + '">' + mark + o[1] + '</button>';
            }).join('') +
          '</div></div>';
        }).join('') +
      '</div>';
    stage.appendChild(wrap);

    var need = {}, pick = {}, lives = 3, orders = 0, busy = false, alive = true;
    var ordTO = null;
    var elTitle = wrap.querySelector('#fs-title');
    var elTags = wrap.querySelector('#fs-tags');
    var elDots = wrap.querySelector('#fs-dots');
    var elAcc = wrap.querySelector('#fs-acc');
    var elGoal = wrap.querySelector('#du-goal');
    var elLevels = wrap.querySelector('#du-levels');
    var right = wrap.querySelector('.fs-right');

    function cfg() { return LEVELS[level - 1]; }
    function renderLevels() {
      var html = '<span class="lv-strip-label">Level</span>';
      for (var n = 1; n <= LEVELS.length; n++) {
        var cls = 'lv-btn' + (n === level ? ' on' : '') + (n > unlocked ? ' locked' : '');
        html += '<button type="button" class="' + cls + '" data-lv="' + n + '"' + (n > unlocked ? ' disabled' : '') + '>' + n + '</button>';
      }
      elLevels.innerHTML = html;
      elGoal.textContent = 'Style ' + cfg().goal + ' looks to clear level ' + level + '!';
      wrap.dataset.level = String(level);
    }

    function group(slot) {
      return GROUPS.filter(function (g) { return g.slot === slot; })[0];
    }

    function setFill(slot, color) {
      wrap.querySelectorAll('[data-fill="' + slot + '"]').forEach(function (el) {
        el.setAttribute('fill', color);
      });
    }

    function clearPicks() {
      Object.keys(pick).forEach(function (k) { delete pick[k]; });
      wrap.querySelectorAll('.fs-opt').forEach(function (b) { b.classList.remove('on'); });
      setFill('hair', NEUTRAL);
      setFill('dress', NEUTRAL);
      setFill('shoes', NEUTRAL);
      elAcc.textContent = '';
    }

    function hud() {
      elTitle.textContent = '👗 Style the client… ' + '❤️'.repeat(Math.max(0, lives)) + '🖤'.repeat(Math.max(0, 3 - lives));
      elDots.textContent = '⭐'.repeat(orders) + '⚪'.repeat(Math.max(0, cfg().goal - orders));
      wrap.dataset.orders = String(orders);
      wrap.dataset.lives = String(lives);
    }

    function newOrder() {
      need = {};
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

    function onClick(e) {
      if (!alive || busy) return;
      var b = e.target.closest('.fs-opt');
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
        if (cfg().penalty) api.setScore(Math.max(0, api.score - cfg().penalty));
        hud();
        if (lives <= 0) {
          alive = false;
          api.gameOver({
            title: '💔 Out of looks!',
            text: 'You finished ' + orders + ' of ' + cfg().goal + ' looks for ' + api.score + ' points.',
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
      if (slot === 'extra') elAcc.textContent = o[2];
      else setFill(slot, o[2]);
      if (Object.keys(pick).length === 4) {
        busy = true;
        api.addScore(50);
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
      }
    }

    function levelClear() {
      alive = false;
      busy = true;
      if (ordTO) { clearTimeout(ordTO); ordTO = null; }
      if (level > unlocked) { unlocked = level; GamePortal.store.set(key, unlocked); }
      if (level >= LEVELS.length) {
        api.win({
          title: 'Style Star! ⭐',
          text: 'All ' + LEVELS.length + ' levels cleared — ' + api.score + ' points!'
        });
        return;
      }
      api.sfx('win');
      api.overlay({
        emoji: '👗',
        title: 'Level ' + level + ' complete!',
        text: 'Next: style ' + LEVELS[level].goal + ' looks.',
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
      lives = cfg().lives;
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
