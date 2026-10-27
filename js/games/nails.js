/* Nail Art Studio — run a salon and match each customer's dream polish pattern.
   5 levels: flat one-colour nails up to rainbow glam with a sticker. Serve to check. */
GamePortal.register('nails', {
  title: 'Nail Art Studio',
  emoji: '💅',
  cat: 'arts',
  c1: '#db2777',
  c2: '#f9a8d4',
  tags: ['nails', 'nail art', 'makeover', 'salon', 'design', 'arts', 'paint', 'fashion', 'colour', 'patterns', 'creative'],
  rating: 4.9,
  plays: '0.3M',
  badge: 'New',
  controls: 'Pick a polish colour, tap the nails to paint, then press Serve!',
  desc: 'Run your own nail salon! Each customer dreams of a specific polish pattern — match the colours on every nail, add a sticker on the fancy levels and serve the design to earn stars. Five levels from simple one-colour nails to full glam art.',
  play: function (stage, api) {
    var COLORS = [
      { name: 'Pink', hex: '#ff7fb6' },
      { name: 'Mint', hex: '#77f0d2' },
      { name: 'Lilac', hex: '#c4a7ff' },
      { name: 'Sunny', hex: '#ffd45e' },
      { name: 'Coral', hex: '#ff8a6b' },
      { name: 'Starlight', hex: '#bfe3ff' }
    ];
    var LEVELS = [
      { target: [0, 0, 0, 0, 0], sticker: '', time: 60, desc: 'all-pink' },
      { target: [0, 1, 0, 1, 0], sticker: '', time: 60, desc: 'pink-and-mint stripes' },
      { target: [2, 2, 3, 3, 3], sticker: '⭐', time: 70, desc: 'lilac & starry' },
      { target: [4, 0, 4, 0, 4], sticker: '💖', time: 70, desc: 'coral & hearts' },
      { target: [5, 1, 2, 3, 4], sticker: '🌈', time: 80, desc: 'rainbow glam' }
    ];
    var STICKERS = [
      { e: '⭐', n: 'Star' },
      { e: '💖', n: 'Hearts' },
      { e: '🌈', n: 'Rainbow' },
      { e: '🍓', n: 'Berry' }
    ];
    var NAIL_OFF = '#ffe6ee';
    var key = 'ph_nails_lvl';
    var unlocked = Math.min(LEVELS.length, Math.max(1, GamePortal.store.get(key, 1)));
    var level = 1;

    var wrap = document.createElement('div');
    wrap.className = 'quiz-wrap';
    wrap.dataset.level = '1';
    wrap.dataset.painted = '0';
    wrap.dataset.time = '60';
    wrap.innerHTML =
      '<div class="lv-strip" id="na-levels"><span class="lv-strip-label">Level</span></div>' +
      '<div class="lv-goal" id="na-goal"></div>' +
      '<div class="math-top">' +
        '<span class="math-stat" id="na-prog">0 / 5 painted</span>' +
        '<span class="math-stat">Time <b id="na-secs">60</b>s</span>' +
      '</div>' +
      '<div class="timer-bar"><div class="timer-fill" id="na-time"></div></div>' +
      '<div class="q-card">' +
        '<div class="q-kicker">Customer wants</div>' +
        '<div id="na-target" style="display:flex;gap:8px;align-items:center;justify-content:center;flex-wrap:wrap;min-height:34px"></div>' +
        '<div class="q-text" id="na-desc"></div>' +
        '<div id="na-hand" style="position:relative;display:flex;gap:10px;justify-content:center;margin-top:12px"></div>' +
      '</div>' +
      '<div class="fs-opts" id="na-palette" style="justify-content:center;max-width:min(470px,96%)"></div>' +
      '<div class="fs-opts" id="na-stickers" style="justify-content:center"></div>' +
      '<button type="button" class="big-btn" id="na-done">Serve! 💅</button>' +
      '<div class="math-fb" id="na-fb"></div>' +
      '<span id="na-mirror" style="display:none" data-target="0,0,0,0,0"></span>';
    stage.appendChild(wrap);

    var elLevels = wrap.querySelector('#na-levels');
    var elGoal = wrap.querySelector('#na-goal');
    var elProg = wrap.querySelector('#na-prog');
    var elSecs = wrap.querySelector('#na-secs');
    var elTime = wrap.querySelector('#na-time');
    var elTarget = wrap.querySelector('#na-target');
    var elDesc = wrap.querySelector('#na-desc');
    var hand = wrap.querySelector('#na-hand');
    var elPalette = wrap.querySelector('#na-palette');
    var elStickers = wrap.querySelector('#na-stickers');
    var elDone = wrap.querySelector('#na-done');
    var elFb = wrap.querySelector('#na-fb');
    var elMirror = wrap.querySelector('#na-mirror');

    var NAIL_STYLE = 'width:clamp(46px,13vw,60px);height:clamp(58px,16vw,74px);' +
      'border-radius:26px 26px 16px 16px/34px 34px 14px 14px;box-sizing:border-box;' +
      'border:3px solid rgba(255,255,255,.85);background:' + NAIL_OFF + ';' +
      'display:flex;align-items:center;justify-content:center;font-size:22px;cursor:pointer;' +
      'box-shadow:0 5px 12px rgba(0,0,0,.22);transition:transform .12s,background .18s;';
    var handHtml = '';
    for (var h = 0; h < 5; h++) {
      handHtml += '<button type="button" class="na-nail" data-nail="' + h + '" style="' + NAIL_STYLE + '"></button>';
    }
    handHtml += '<span id="na-badge" style="position:absolute;top:-18px;right:-2px;font-size:26px;line-height:1"></span>';
    hand.innerHTML = handHtml;
    var elBadge = hand.querySelector('#na-badge');

    var palHtml = '';
    for (var p = 0; p < COLORS.length; p++) {
      palHtml += '<button type="button" class="fs-opt na-paint" data-color="' + p + '">' +
        '<span class="fs-swatch" style="--sw:' + COLORS[p].hex + '"></span>' + COLORS[p].name + '</button>';
    }
    elPalette.innerHTML = palHtml;

    var stkHtml = '';
    for (var s = 0; s < STICKERS.length; s++) {
      stkHtml += '<button type="button" class="fs-opt na-stick" data-sticker="' + STICKERS[s].e + '">' +
        '<span class="fs-mini">' + STICKERS[s].e + '</span>' + STICKERS[s].n + '</button>';
    }
    elStickers.innerHTML = stkHtml;

    var painted = [-1, -1, -1, -1, -1];
    var sel = -1, sticker = '';
    var left = LEVELS[0].time, TIME = LEVELS[0].time;
    var alive = true, tick = null;

    function cfg() { return LEVELS[level - 1]; }

    function paintedCount() {
      var n = 0;
      for (var i = 0; i < painted.length; i++) if (painted[i] >= 0) n++;
      return n;
    }

    function renderLevels() {
      var html = '<span class="lv-strip-label">Level</span>';
      for (var n = 1; n <= LEVELS.length; n++) {
        var cls = 'lv-btn' + (n === level ? ' on' : '') + (n > unlocked ? ' locked' : '');
        html += '<button type="button" class="' + cls + '" data-lv="' + n + '"' + (n > unlocked ? ' disabled' : '') + '>' + n + '</button>';
      }
      elLevels.innerHTML = html;
      elGoal.textContent = 'Level ' + level + " — match the customer's " + cfg().desc + ' nails!';
      wrap.dataset.level = String(level);
    }

    function renderTarget() {
      var t = cfg();
      var html = '';
      for (var i = 0; i < t.target.length; i++) {
        html += '<span style="width:28px;height:28px;border-radius:50%;box-sizing:border-box;' +
          'border:3px solid rgba(20,22,43,.85);background:' + COLORS[t.target[i]].hex + '"></span>';
      }
      if (t.sticker) html += '<span style="font-size:22px;line-height:1">' + t.sticker + '</span>';
      elTarget.innerHTML = html;
      elDesc.textContent = t.desc + (t.sticker ? ' + ' + t.sticker + ' sticker' : '');
      elMirror.setAttribute('data-target', t.target.join(','));
      if (t.sticker) elMirror.setAttribute('data-sticker-target', t.sticker);
      else elMirror.removeAttribute('data-sticker-target');
      elStickers.style.display = t.sticker ? 'flex' : 'none';
    }

    function hud() {
      elProg.textContent = paintedCount() + ' / 5 painted';
      elSecs.textContent = String(Math.max(0, left));
      elTime.style.width = Math.max(0, (left / TIME) * 100) + '%';
      wrap.dataset.painted = String(paintedCount());
      wrap.dataset.time = String(Math.max(0, left));
    }

    function clearMarks() {
      var ns = hand.querySelectorAll('.na-nail');
      for (var i = 0; i < ns.length; i++) {
        ns[i].classList.remove('wrong');
        ns[i].classList.remove('shake');
        ns[i].style.outline = '';
      }
    }

    function clearRings() {
      var chips = wrap.querySelectorAll('.fs-opt');
      for (var i = 0; i < chips.length; i++) chips[i].classList.remove('on');
    }

    function resetHand() {
      clearMarks();
      var ns = hand.querySelectorAll('.na-nail');
      for (var i = 0; i < ns.length; i++) ns[i].style.background = NAIL_OFF;
      clearRings();
      elBadge.textContent = '';
    }

    function stopTimer() { if (tick) { clearInterval(tick); tick = null; } }
    function startTimer() {
      stopTimer();
      elTime.style.width = '100%';
      tick = setInterval(function () {
        if (!alive) return;
        left--;
        if (left <= 0) { left = 0; hud(); fail(); return; }
        hud();
      }, 1000);
    }

    function readTarget() {
      var raw = elMirror.getAttribute('data-target') || '';
      var bits = raw.split(',');
      var out = [];
      for (var i = 0; i < bits.length; i++) out.push(parseInt(bits[i], 10));
      return out;
    }

    function fail() {
      if (!alive) return;
      alive = false;
      stopTimer();
      api.gameOver({
        title: '⏰ Time’s up!',
        text: 'Level ' + level + ': ' + paintedCount() + ' of 5 nails painted.',
        onAgain: function () { api.clearOverlay(); startLevel(level); }
      });
    }

    function levelClear() {
      alive = false;
      stopTimer();
      api.addScore(Math.max(0, Math.round(left)));
      if (level > unlocked) { unlocked = level; GamePortal.store.set(key, unlocked); }
      if (level >= LEVELS.length) {
        api.win({
          emoji: '💅',
          title: 'Master Nail Artist!',
          text: 'Every customer left smiling!'
        });
        return;
      }
      api.sfx('win');
      api.overlay({
        emoji: '💅',
        title: 'Level ' + level + ' complete!',
        text: 'Next: ' + LEVELS[level].desc + ' — ' + LEVELS[level].time + 's on the clock.',
        score: api.score,
        best: api.getBest(),
        onAgain: function () { api.clearOverlay(); level++; startLevel(level); }
      });
    }

    function startLevel(n) {
      level = Math.max(1, Math.min(LEVELS.length, n));
      api.clearOverlay();
      api.setScore(0);
      painted = [-1, -1, -1, -1, -1];
      sel = -1;
      sticker = '';
      alive = true;
      TIME = cfg().time;
      left = TIME;
      elFb.textContent = '';
      elFb.className = 'math-fb';
      resetHand();
      renderTarget();
      renderLevels();
      hud();
      startTimer();
    }

    function onColor(e) {
      if (!alive) return;
      var b = e.target.closest('.na-paint');
      if (!b) return;
      sel = parseInt(b.dataset.color, 10);
      clearRings();
      b.classList.add('on');
      elFb.textContent = '';
      elFb.className = 'math-fb';
      api.sfx('click');
    }

    function onSticker(e) {
      if (!alive) return;
      var b = e.target.closest('.na-stick');
      if (!b) return;
      sticker = b.dataset.sticker;
      clearRings();
      b.classList.add('on');
      elBadge.textContent = sticker;
      clearMarks();
      elFb.textContent = '';
      elFb.className = 'math-fb';
      api.sfx('pop');
    }

    function onNail(e) {
      if (!alive) return;
      var b = e.target.closest('.na-nail');
      if (!b) return;
      if (sel < 0) {
        elFb.textContent = 'Pick a polish colour first! 💅';
        elFb.className = 'math-fb';
        api.sfx('click');
        return;
      }
      var n = parseInt(b.dataset.nail, 10);
      painted[n] = sel;
      clearMarks();
      b.style.background = COLORS[sel].hex;
      void b.offsetWidth;
      b.classList.add('shake');
      elFb.textContent = '';
      elFb.className = 'math-fb';
      api.sfx('pop');
      hud();
    }

    function onServe() {
      if (!alive) return;
      var need = readTarget();
      var want = elMirror.getAttribute('data-sticker-target') || '';
      var wrong = [];
      var ok = true;
      for (var i = 0; i < need.length; i++) {
        if (painted[i] !== need[i]) { wrong.push(i); ok = false; }
      }
      if (want && sticker !== want) ok = false;
      if (ok) {
        api.addScore(100);
        levelClear();
        return;
      }
      api.sfx('bad');
      clearMarks();
      var ns = hand.querySelectorAll('.na-nail');
      for (var w = 0; w < wrong.length; w++) {
        var el = ns[wrong[w]];
        el.classList.add('wrong');
        el.style.outline = '3px solid #ff4d8d';
        void el.offsetWidth;
        el.classList.add('shake');
      }
      var msg = 'Almost! Check the highlighted nails.';
      if (want && sticker !== want) {
        msg += ' Tap the ' + want + ' sticker!';
        elStickers.classList.remove('shake');
        void elStickers.offsetWidth;
        elStickers.classList.add('shake');
      }
      elFb.textContent = msg;
      elFb.className = 'math-fb no';
    }

    function onLevels(e) {
      var b = e.target.closest('.lv-btn');
      if (b && !b.classList.contains('locked') && !b.disabled) {
        var n = parseInt(b.dataset.lv, 10);
        if (n !== level && n <= unlocked) { api.sfx('click'); startLevel(n); }
      }
    }

    elPalette.addEventListener('click', onColor);
    elStickers.addEventListener('click', onSticker);
    hand.addEventListener('click', onNail);
    elDone.addEventListener('click', onServe);
    elLevels.addEventListener('click', onLevels);

    startLevel(1);

    return function () {
      alive = false;
      stopTimer();
      elPalette.removeEventListener('click', onColor);
      elStickers.removeEventListener('click', onSticker);
      hand.removeEventListener('click', onNail);
      elDone.removeEventListener('click', onServe);
      elLevels.removeEventListener('click', onLevels);
    };
  }
});
