/* Glam Cuties — cute-face makeup studio with 5 levelled photo-day looks.
   Match each client's makeup request. Original characters and art (no third-party IP). */
GamePortal.register('glam', {
  title: 'Glam Cuties',
  emoji: '💄',
  cat: 'arts',
  c1: '#ff5d8f',
  c2: '#ffb3c9',
  tags: ['makeup', 'makeover', 'salon', 'princess', 'arts', 'fashion', 'cute', 'kids', 'casual', 'beauty', 'studio', 'levels'],
  rating: 4.8,
  plays: '0.4M',
  badge: 'New',
  controls: 'Tap the makeup that matches the request card · beat the look timer · tap only',
  desc: 'Berry the cutie is getting ready for photo day! Dab the blush, paint the lips, sweep the eyeshadow and add the accessory she asks for — before the timer runs out! Race through 5 photo-day levels with faster looks and tighter timers.',
  play: function (stage, api) {
    var GROUPS = [
      { slot: 'blush', noun: 'blush', label: '🌸 Blush', opts: [
        ['pink', '💗 Pink', '#ff9ebb'],
        ['peach', '🍑 Peach', '#ffb38a'],
        ['rose', '🌹 Rose', '#f06a8a']
      ] },
      { slot: 'lips', noun: 'lipstick', label: '💋 Lips', opts: [
        ['red', '❤️ Red', '#e63950'],
        ['pink', '💗 Pink', '#ff7fa5'],
        ['coral', '🪸 Coral', '#ff8c69']
      ] },
      { slot: 'shadow', noun: 'eyeshadow', label: '👁️ Shadow', opts: [
        ['purple', '💜 Purple', '#b388ff'],
        ['blue', '💙 Blue', '#7fb5ff'],
        ['gold', '✨ Gold', '#f2c14e']
      ] },
      { slot: 'extra', noun: '', label: '🎀 Accessory', opts: [
        ['bow', '🎀 Bow', '🎀'],
        ['star', '⭐ Star', '⭐'],
        ['flower', '🌼 Flower', '🌼'],
        ['heart', '💖 Heart', '💖']
      ] }
    ];
    var LEVELS = [
      { clients: 5, time: 25 },
      { clients: 5, time: 20 },
      { clients: 6, time: 16 },
      { clients: 6, time: 13 },
      { clients: 7, time: 10 }
    ];
    var SKIN = '#ffd7b5';
    var key = 'ph_glam_lvl';
    var unlocked = Math.min(LEVELS.length, Math.max(1, GamePortal.store.get(key, 1)));
    var level = 1;

    var wrap = document.createElement('div');
    wrap.className = 'fs-wrap';
    wrap.dataset.clients = '0';
    wrap.dataset.lives = '3';
    wrap.dataset.level = '1';
    wrap.innerHTML =
      '<div class="lv-strip" id="fs-levels"><span class="lv-strip-label">Level</span></div>' +
      '<div class="lv-goal" id="fs-goal"></div>' +
      '<div class="fs-left">' +
        '<div class="fs-need">' +
          '<div class="fs-need-title" id="fs-title">💄 Berry is ready… ❤️❤️❤️</div>' +
          '<div class="fs-need-tags" id="fs-tags"></div>' +
          '<div class="timer-bar"><div class="timer-fill" id="fs-time"></div></div>' +
        '</div>' +
        '<div class="fs-doll">' +
          '<svg viewBox="0 0 200 300" xmlns="http://www.w3.org/2000/svg">' +
            '<circle cx="100" cy="72" r="50" fill="#8b5a2b"/>' +
            '<circle cx="62" cy="86" r="10" fill="' + SKIN + '"/>' +
            '<circle cx="138" cy="86" r="10" fill="' + SKIN + '"/>' +
            '<circle cx="100" cy="82" r="42" fill="' + SKIN + '"/>' +
            '<path d="M58 66 q42 -30 84 0 q-6 -30 -42 -30 q-36 0 -42 30 z" fill="#8b5a2b"/>' +
            '<ellipse data-fill="shadow" cx="81" cy="70" rx="13" ry="8" fill="' + SKIN + '"/>' +
            '<ellipse data-fill="shadow" cx="119" cy="70" rx="13" ry="8" fill="' + SKIN + '"/>' +
            '<ellipse cx="81" cy="76" rx="9" ry="11" fill="#fff"/>' +
            '<ellipse cx="119" cy="76" rx="9" ry="11" fill="#fff"/>' +
            '<circle cx="82" cy="78" r="5" fill="#1f2430"/>' +
            '<circle cx="118" cy="78" r="5" fill="#1f2430"/>' +
            '<circle cx="84" cy="76" r="1.8" fill="#fff"/>' +
            '<circle cx="120" cy="76" r="1.8" fill="#fff"/>' +
            '<path d="M72 62 q9 -6 18 -2" stroke="#5b3a1e" stroke-width="3" fill="none" stroke-linecap="round"/>' +
            '<path d="M110 60 q9 -4 18 2" stroke="#5b3a1e" stroke-width="3" fill="none" stroke-linecap="round"/>' +
            '<path d="M97 88 q3 3 6 0" stroke="#c98a7d" stroke-width="2.5" fill="none" stroke-linecap="round"/>' +
            '<circle data-fill="blush" cx="68" cy="94" r="8" fill="' + SKIN + '" opacity=".6"/>' +
            '<circle data-fill="blush" cx="132" cy="94" r="8" fill="' + SKIN + '" opacity=".6"/>' +
            '<path data-fill="lips" d="M90 102 q10 -4 20 0 q-3 8 -10 8 q-7 0 -10 -8 z" fill="#d98880"/>' +
            '<path d="M100 124 L138 216 Q100 232 62 216 Z" fill="#ff8fb1"/>' +
            '<text id="fs-acc" x="100" y="26" font-size="26" text-anchor="middle"></text>' +
          '</svg>' +
        '</div>' +
        '<div class="fs-dots-row" id="fs-dots">⚪⚪⚪⚪⚪</div>' +
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

    var need = {}, pick = {}, lives = 3, clients = 0, busy = false, alive = true;
    var left = LEVELS[0].time, lookTimer = null;
    var elTitle = wrap.querySelector('#fs-title');
    var elTags = wrap.querySelector('#fs-tags');
    var elDots = wrap.querySelector('#fs-dots');
    var elAcc = wrap.querySelector('#fs-acc');
    var elTime = wrap.querySelector('#fs-time');
    var elLevels = wrap.querySelector('#fs-levels');
    var elGoal = wrap.querySelector('#fs-goal');
    var right = wrap.querySelector('.fs-right');

    function cfg() { return LEVELS[level - 1]; }

    function renderLevels() {
      var html = '<span class="lv-strip-label">Level</span>';
      for (var i = 1; i <= LEVELS.length; i++) {
        var cls = 'lv-btn' + (i === level ? ' on' : '') + (i > unlocked ? ' locked' : '');
        html += '<button type="button" class="' + cls + '" data-lv="' + i + '"' + (i > unlocked ? ' disabled' : '') + '>' + '★'.repeat(i <= unlocked ? Math.min(3, i) : 0) + i + '</button>';
      }
      elLevels.innerHTML = html;
      elGoal.textContent = 'Style ' + cfg().clients + ' clients before the timer runs out!';
    }
    function stopTimer() { if (lookTimer) { clearInterval(lookTimer); lookTimer = null; } }
    function tick() {
      if (!alive || busy) return;
      left -= 0.1;
      elTime.style.width = Math.max(0, (left / cfg().time) * 100) + '%';
      if (left <= 0) {
        stopTimer();
        lives--;
        api.sfx('bad');
        right.classList.remove('shake');
        void right.offsetWidth;
        right.classList.add('shake');
        hud();
        if (lives <= 0) { endFail(); return; }
        newOrder();
      }
    }
    function startTimer() {
      stopTimer();
      left = cfg().time;
      elTime.style.width = '100%';
      lookTimer = setInterval(tick, 100);
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
      setFill('blush', SKIN);
      setFill('shadow', SKIN);
      setFill('lips', '#d98880');
      elAcc.textContent = '';
    }
    function hud() {
      elTitle.textContent = '💄 Level ' + level + ' · Berry is ready… ' + '❤️'.repeat(Math.max(0, lives)) + '🖤'.repeat(Math.max(0, 3 - lives));
      elDots.textContent = '⭐'.repeat(clients) + '⚪'.repeat(Math.max(0, cfg().clients - clients));
      wrap.dataset.clients = String(clients);
      wrap.dataset.lives = String(lives);
      wrap.dataset.level = String(level);
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
      startTimer();
    }
    function endFail() {
      alive = false;
      stopTimer();
      api.gameOver({
        title: '💔 Oh no!',
        text: 'You finished ' + clients + ' of ' + cfg().clients + ' looks on level ' + level + '.'
      });
    }
    function finishLevel() {
      alive = false;
      stopTimer();
      if (level > unlocked) { unlocked = level; GamePortal.store.set(key, unlocked); }
      if (level >= LEVELS.length) {
        api.win({
          title: 'Glam Master! 👑',
          text: 'All ' + LEVELS.length + ' levels done — ' + api.score + ' points!'
        });
        return;
      }
      api.sfx('win');
      api.overlay({
        emoji: '📸',
        title: 'Level ' + level + ' complete!',
        text: 'Next: ' + LEVELS[level].clients + ' looks, ' + LEVELS[level].time + 's each. Ready?',
        score: api.score,
        best: api.getBest(),
        onAgain: function () {
          api.clearOverlay();
          level++;
          api.setScore(0);
          clients = 0; lives = 3; alive = true;
          renderLevels();
          hud();
          newOrder();
        }
      });
    }
    function startLevel(n) {
      level = Math.max(1, Math.min(LEVELS.length, n));
      api.clearOverlay();
      api.setScore(0);
      clients = 0; lives = 3; alive = true; busy = false;
      renderLevels();
      hud();
      newOrder();
    }
    function onClick(e) {
      var lvb = e.target.closest('.lv-btn');
      if (lvb && !lvb.classList.contains('locked')) {
        var n = parseInt(lvb.dataset.lv, 10);
        if (n !== level && n <= unlocked) { api.sfx('click'); startLevel(n); }
        return;
      }
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
        hud();
        if (lives <= 0) { endFail(); return; }
        startTimer();
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
        stopTimer();
        api.addScore(50);
        clients++;
        hud();
        api.sfx('win');
        if (clients >= cfg().clients) { busy = false; finishLevel(); return; }
        setTimeout(function () {
          if (!alive) return;
          newOrder();
          busy = false;
        }, 650);
      }
    }

    wrap.addEventListener('click', onClick);
    startLevel(1);

    return function () {
      alive = false;
      stopTimer();
    };
  }
});
