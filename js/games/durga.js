/* Navdurga Mahishasura Vadh — nine nights, nine forms, one golden trishul zone.
   Time the Strike inside the golden zone to melt Mahishasura's pride. Respectful, zero gore. */
GamePortal.register('durga', {
  title: 'Navdurga Mahishasura Vadh',
  emoji: '🔱',
  cat: 'arcade',
  c1: '#9f1239',
  c2: '#fbbf24',
  tags: ['durga', 'navratri', 'mahishasura', 'trishul', 'goddess', 'festival', 'devotional', 'india', 'timings', 'arcade', 'kids'],
  rating: 4.9,
  plays: '0.7M',
  badge: 'New',
  controls: 'Tap Strike when the trishul is inside the golden zone!',
  desc: 'Nine nights, nine forms — face Mahishasura as Shailaputri through Siddhidatri! Watch the trishul swing, tap Strike inside the golden zone to land the blow, and watch the demon\'s pride melt away. Three hearts, nine levels — Jai Ma Durga!',
  play: function (stage, api) {
    var LEVELS = [
      { form: 'Shailaputri',    need: 5,  speed: 0.50, width: 0.22, drift: 0,    feint: 0 },
      { form: 'Brahmacharini',  need: 5,  speed: 0.50, width: 0.20, drift: 0,    feint: 0 },
      { form: 'Chandraghanta',  need: 6,  speed: 0.70, width: 0.18, drift: 0,    feint: 0 },
      { form: 'Kushmanda',      need: 6,  speed: 0.70, width: 0.16, drift: 2000, feint: 0 },
      { form: 'Skandamata',     need: 7,  speed: 0.95, width: 0.15, drift: 0,    feint: 0 },
      { form: 'Katyayani',      need: 7,  speed: 0.95, width: 0.13, drift: 2000, feint: 0 },
      { form: 'Kaalratri',      need: 8,  speed: 1.20, width: 0.12, drift: 0,    feint: 2500 },
      { form: 'Mahagauri',      need: 8,  speed: 1.20, width: 0.10, drift: 2000, feint: 2500 },
      { form: 'Siddhidatri',    need: 10, speed: 1.50, width: 0.09, drift: 0,    feint: 2500 }
    ];
    var key = 'ph_durga_lvl';
    var unlocked = Math.min(LEVELS.length, Math.max(1, GamePortal.store.get(key, 1)));
    var level = 1;

    var oldStyle = document.getElementById('durga-style');
    if (oldStyle && oldStyle.parentNode) oldStyle.parentNode.removeChild(oldStyle);
    var styleEl = document.createElement('style');
    styleEl.id = 'durga-style';
    styleEl.textContent = '' +
      '.dvg{gap:9px}' +
      '.dvg .dv-form{color:#ffd166}' +
      '.dvg .dv-stage{' +
        'position:relative;width:min(560px,100%);height:206px;border-radius:18px;overflow:hidden;' +
        'background:radial-gradient(ellipse at 50% 130%,#5b1030 0%,#2b0816 55%,#15040c 100%);' +
        'border:2.5px solid rgba(251,191,36,.45);box-shadow:0 14px 32px rgba(0,0,0,.5),inset 0 0 44px rgba(159,18,57,.45);' +
      '}' +
      '.dvg .dv-durga,.dvg .dv-demon{' +
        'position:absolute;top:12px;font-size:46px;line-height:1;user-select:none;' +
        'filter:drop-shadow(0 5px 8px rgba(0,0,0,.5));' +
      '}' +
      '.dvg .dv-durga{left:7%;animation:dvBob 2.7s ease-in-out infinite}' +
      '.dvg .dv-lamp{position:absolute;top:-4px;right:-18px;font-size:16px;animation:dvBob 1.9s ease-in-out infinite reverse}' +
      '.dvg .dv-demon{right:7%;animation:dvBob 2.3s ease-in-out infinite reverse}' +
      '.dvg .dv-bull{position:absolute;top:-6px;right:-20px;font-size:15px;opacity:.9;animation:dvMorph 1.8s ease-in-out infinite}' +
      '@keyframes dvBob{50%{transform:translateY(-9px)}}' +
      '@keyframes dvMorph{0%,100%{opacity:.3;transform:scale(.85)}50%{opacity:1;transform:scale(1.18)}}' +
      '.dvg .dv-demon.dv-hurt{animation:dvHurt .5s ease}' +
      '@keyframes dvHurt{0%{transform:translateX(0) rotate(0)}30%{transform:translateX(28px) rotate(10deg);opacity:.5}100%{transform:translateX(0) rotate(0);opacity:1}}' +
      '.dvg .dv-demon.dv-swing{animation:dvSwing .44s ease}' +
      '@keyframes dvSwing{0%{transform:translateX(0)}30%{transform:translateX(-26px) rotate(-9deg)}100%{transform:translateX(0)}}' +
      '.dvg .dv-demon.dv-gone{opacity:.22;filter:grayscale(.7);transition:opacity .6s ease,filter .6s ease}' +
      '.dvg .dv-track{' +
        'position:absolute;left:6%;right:6%;bottom:32px;height:34px;border-radius:99px;' +
        'background:rgba(0,0,0,.45);border:2px solid rgba(255,255,255,.22);box-sizing:border-box;' +
      '}' +
      '.dvg .dv-zone{' +
        'position:absolute;top:-5px;bottom:-5px;border-radius:99px;transition:left .28s ease,box-shadow .3s ease;' +
        'background:linear-gradient(180deg,rgba(251,191,36,.9),rgba(251,191,36,.5));' +
        'box-shadow:0 0 18px rgba(251,191,36,.75);box-sizing:border-box;' +
      '}' +
      '.dvg .dv-zone.dv-drift{box-shadow:0 0 28px rgba(251,191,36,1);filter:brightness(1.3)}' +
      '.dvg .dv-zone.dv-feint{animation:dvFeint .42s ease}' +
      '@keyframes dvFeint{0%{box-shadow:0 0 6px rgba(251,191,36,.4)}50%{box-shadow:0 0 30px rgba(244,63,94,.95);background:linear-gradient(180deg,rgba(244,63,94,.9),rgba(244,63,94,.5))}100%{box-shadow:0 0 18px rgba(251,191,36,.75)}}' +
      '.dvg .dv-marker{' +
        'position:absolute;top:50%;left:50%;width:34px;height:34px;margin:-17px 0 0 -17px;' +
        'display:grid;place-items:center;font-size:20px;background:#9f1239;border:2.5px solid #fbbf24;' +
        'border-radius:50%;box-shadow:0 4px 12px rgba(0,0,0,.55);z-index:3;transform:translateX(-50%);transition:none;' +
      '}' +
      '.dvg .dv-marker.dv-thrust{animation:dvThrust .36s ease}' +
      '@keyframes dvThrust{0%{transform:translateX(-50%) scale(1)}30%{transform:translateX(-50%) scale(1.6) rotate(-24deg)}60%{transform:translateX(-50%) scale(.92) rotate(9deg)}100%{transform:translateX(-50%) scale(1)}}' +
      '.dvg .dv-stage.dv-shake{animation:dvShake .34s ease}' +
      '@keyframes dvShake{0%,100%{transform:translateX(0)}20%{transform:translateX(-9px)}40%{transform:translateX(8px)}60%{transform:translateX(-5px)}80%{transform:translateX(4px)}}' +
      '.dvg .dv-flash{position:absolute;inset:0;background:rgba(244,63,94,.5);opacity:0;pointer-events:none;z-index:5}' +
      '.dvg .dv-flash.on{animation:dvFlash .32s ease}' +
      '@keyframes dvFlash{0%{opacity:.85}100%{opacity:0}}' +
      '.dvg .dv-fx{position:absolute;right:9%;top:20%;width:2px;height:2px;pointer-events:none;z-index:4}' +
      '.dvg .dv-spark{position:absolute;left:0;top:0;font-size:17px;animation:dvSpark .85s ease-out forwards;pointer-events:none}' +
      '@keyframes dvSpark{0%{transform:translate(0,0) scale(.4);opacity:1}100%{transform:translate(var(--dx,20px),var(--dy,-20px)) scale(1.3);opacity:0}}' +
      '.dvg .dv-jai{' +
        'position:absolute;left:-8px;top:-8px;font-weight:900;font-size:19px;color:#fbbf24;white-space:nowrap;' +
        'text-shadow:0 2px 6px rgba(0,0,0,.65);animation:dvJai 1.05s ease-out forwards;pointer-events:none;' +
      '}' +
      '@keyframes dvJai{0%{transform:translateY(0) scale(.7);opacity:0}22%{opacity:1;transform:translateY(-12px) scale(1.15)}100%{transform:translateY(-54px) scale(1);opacity:0}}' +
      '.dvg .dv-hp{' +
        'position:relative;width:min(430px,94%);height:18px;border-radius:99px;overflow:hidden;' +
        'background:rgba(0,0,0,.42);border:2px solid rgba(251,191,36,.5);box-sizing:border-box;' +
      '}' +
      '.dvg .dv-hp-fill{height:100%;width:100%;background:linear-gradient(90deg,#9f1239,#f43f5e,#fbbf24);transition:width .45s ease}' +
      '.dvg .dv-hp-label{' +
        'position:absolute;left:0;right:0;top:0;bottom:0;display:grid;place-items:center;' +
        'font-size:9.5px;font-weight:900;letter-spacing:.16em;text-transform:uppercase;color:#fff;' +
        'text-shadow:0 1px 3px rgba(0,0,0,.8);pointer-events:none;' +
      '}' +
      '.dvg .dv-strike{' +
        'font-size:20px;padding:15px 46px;border:none;cursor:pointer;letter-spacing:.04em;' +
        'background:linear-gradient(135deg,#9f1239,#e11d48 55%,#fbbf24);' +
        'box-shadow:0 10px 26px rgba(159,18,57,.55);' +
      '}' +
      '.dvg .dv-strike:active{transform:scale(.95)}';
    document.head.appendChild(styleEl);

    var wrap = document.createElement('div');
    wrap.className = 'kg jm dvg';
    wrap.dataset.level = '1';
    wrap.dataset.hits = '0';
    wrap.dataset.need = String(LEVELS[0].need);
    wrap.dataset.hearts = '3';
    wrap.dataset.state = 'play';
    wrap.innerHTML =
      '<div class="lv-strip" id="dv-levels"><span class="lv-strip-label">Level</span></div>' +
      '<div class="lv-goal" id="dv-goal"></div>' +
      '<div class="math-top">' +
        '<span class="math-stat dv-form" id="dv-form">🔱 Shailaputri</span>' +
        '<span class="math-stat lives" id="dv-hearts">❤️❤️❤️</span>' +
        '<span class="math-stat" id="dv-hits">Strikes 0 / 5</span>' +
      '</div>' +
      '<div class="dv-hp" id="dv-hp">' +
        '<div class="dv-hp-fill" id="dv-hp-fill"></div>' +
        '<span class="dv-hp-label">Mahishasura\'s pride</span>' +
      '</div>' +
      '<div class="dv-stage" id="dv-scene" data-zone="0.390,0.610">' +
        '<div class="dv-durga">🔱<i class="dv-lamp">🪔</i></div>' +
        '<div class="dv-demon">👹<i class="dv-bull">🐂</i></div>' +
        '<div class="dv-fx"></div>' +
        '<div class="dv-flash"></div>' +
        '<div class="dv-track">' +
          '<div class="dv-zone" id="dv-zone"></div>' +
          '<div class="dv-marker" id="dv-marker" data-pos="0.500">🔱</div>' +
        '</div>' +
      '</div>' +
      '<button type="button" class="big-btn dv-strike" id="dv-strike">🔱 Strike!</button>' +
      '<div class="hint">Wait for the trishul marker to swing into the golden zone, then Strike! (Space works too)</div>';
    stage.appendChild(wrap);

    var elLevels = wrap.querySelector('#dv-levels');
    var elGoal = wrap.querySelector('#dv-goal');
    var elForm = wrap.querySelector('#dv-form');
    var elHearts = wrap.querySelector('#dv-hearts');
    var elHits = wrap.querySelector('#dv-hits');
    var elHpFill = wrap.querySelector('#dv-hp-fill');
    var scene = wrap.querySelector('#dv-scene');
    var zoneEl = wrap.querySelector('#dv-zone');
    var marker = wrap.querySelector('#dv-marker');
    var strikeBtn = wrap.querySelector('#dv-strike');
    var demon = wrap.querySelector('.dv-demon');
    var fx = wrap.querySelector('.dv-fx');
    var flash = wrap.querySelector('.dv-flash');

    var hits = 0, hearts = 3, need = LEVELS[0].need, state = 'play';
    var total = 0, alive = true;
    var pos = 0.5, dir = 1, last = 0, raf = 0;
    var zoneLo = 0.39, zoneHi = 0.61;
    var driftAcc = 0, feintAcc = 0;
    var timers = [];

    function cfg() { return LEVELS[level - 1]; }
    function later(fn, ms) {
      var t = setTimeout(function () {
        var i = timers.indexOf(t);
        if (i > -1) timers.splice(i, 1);
        fn();
      }, ms);
      timers.push(t);
      return t;
    }
    function anim(el, cls) {
      el.classList.remove(cls);
      void el.offsetWidth;
      el.classList.add(cls);
    }
    function renderLevels() {
      var html = '<span class="lv-strip-label">Level</span>';
      for (var n = 1; n <= LEVELS.length; n++) {
        var cls = 'lv-btn' + (n === level ? ' on' : '') + (n > unlocked ? ' locked' : '');
        html += '<button type="button" class="' + cls + '" data-lv="' + n + '"' + (n > unlocked ? ' disabled' : '') + '>' + n + '</button>';
      }
      elLevels.innerHTML = html;
      elGoal.textContent = 'Level ' + level + ' — ' + cfg().form + ': land ' + cfg().need + ' strikes!';
      wrap.dataset.level = String(level);
    }
    function hud() {
      elHits.textContent = 'Strikes ' + hits + ' / ' + need;
      var hs = '';
      for (var i = 0; i < 3; i++) hs += (i < hearts) ? '❤️' : '🤍';
      elHearts.textContent = hs;
      elHpFill.style.width = Math.max(0, ((need - hits) / need) * 100) + '%';
      wrap.dataset.hits = String(hits);
      wrap.dataset.hearts = String(hearts);
      wrap.dataset.need = String(need);
      wrap.dataset.state = state;
      wrap.dataset.level = String(level);
    }
    function setZone(lo) {
      var w = cfg().width;
      if (lo < 0.02) lo = 0.02;
      if (lo > 0.98 - w) lo = 0.98 - w;
      zoneLo = lo;
      zoneHi = lo + w;
      zoneEl.style.left = (zoneLo * 100) + '%';
      zoneEl.style.width = (w * 100) + '%';
      scene.dataset.zone = zoneLo.toFixed(3) + ',' + zoneHi.toFixed(3);
    }
    function driftZone() {
      setZone(zoneLo + (Math.random() < 0.5 ? -0.08 : 0.08));
      zoneEl.classList.add('dv-drift');
      later(function () { zoneEl.classList.remove('dv-drift'); }, 480);
    }
    function feintZone() {
      setZone(zoneLo + (Math.random() < 0.5 ? -0.1 : 0.1));
      anim(zoneEl, 'dv-feint');
    }
    function burst(n) {
      for (var i = 0; i < n; i++) {
        var s = document.createElement('span');
        s.className = 'dv-spark';
        s.textContent = (i % 3 === 0) ? '✨' : (i % 3 === 1 ? '🌟' : '💛');
        var a = (i / n) * Math.PI * 2 + Math.random() * 0.7;
        var d = 32 + Math.random() * 36;
        s.style.setProperty('--dx', (Math.cos(a) * d).toFixed(1) + 'px');
        s.style.setProperty('--dy', (Math.sin(a) * d - 14).toFixed(1) + 'px');
        fx.appendChild(s);
        (function (el) {
          later(function () { if (el.parentNode) el.parentNode.removeChild(el); }, 900);
        })(s);
      }
    }
    function float(text) {
      var s = document.createElement('span');
      s.className = 'dv-jai';
      s.textContent = text;
      fx.appendChild(s);
      later(function () { if (s.parentNode) s.parentNode.removeChild(s); }, 1100);
    }
    function doHit() {
      hits++;
      total += 20;
      api.setScore(total);
      api.sfx('good');
      hud();
      anim(marker, 'dv-thrust');
      burst(8);
      demon.classList.remove('dv-swing');
      anim(demon, 'dv-hurt');
      float('Jai!');
      if (hits >= need) levelClear();
    }
    function doMiss() {
      hearts--;
      api.sfx('bad');
      hud();
      anim(scene, 'dv-shake');
      anim(flash, 'on');
      demon.classList.remove('dv-hurt');
      anim(demon, 'dv-swing');
      float('Miss!');
      if (hearts <= 0) endGame();
    }
    function strike() {
      if (!alive || state !== 'play') return;
      var p = parseFloat(marker.dataset.pos);
      if (p >= zoneLo && p <= zoneHi) doHit();
      else doMiss();
    }
    function levelClear() {
      if (!alive) return;
      alive = false;
      if (level > unlocked) { unlocked = level; GamePortal.store.set(key, unlocked); }
      total += 80 * level;
      api.setScore(total);
      api.sfx('win');
      demon.classList.add('dv-gone');
      burst(14);
      float('Jai!');
      if (level >= LEVELS.length) {
        api.win({
          emoji: '🪔',
          title: 'Navdurga Vijay!',
          text: 'Mahishasura is defeated — Jai Ma Durga!'
        });
        return;
      }
      api.overlay({
        emoji: '🔱',
        title: 'Level ' + level + ' complete!',
        text: 'Next: ' + LEVELS[level].form + ' — land ' + LEVELS[level].need + ' strikes!',
        score: api.score,
        best: api.getBest(),
        onAgain: function () { api.clearOverlay(); level++; startLevel(level); }
      });
    }
    function endGame() {
      if (!alive) return;
      alive = false;
      state = 'over';
      hud();
      api.gameOver({
        title: '💔 The pride stands!',
        text: 'Level ' + level + ' — ' + cfg().form + ': ' + hits + ' of ' + need +
          ' strikes landed. Ma Durga\'s blessings — try again!',
        onAgain: function () { api.clearOverlay(); startLevel(level); }
      });
    }
    function startLevel(n) {
      level = Math.max(1, Math.min(LEVELS.length, n));
      api.clearOverlay();
      hits = 0;
      hearts = 3;
      need = cfg().need;
      state = 'play';
      alive = true;
      pos = 0.5;
      dir = 1;
      last = 0;
      driftAcc = 0;
      feintAcc = 0;
      demon.classList.remove('dv-gone', 'dv-hurt', 'dv-swing');
      elForm.textContent = '🔱 ' + cfg().form;
      setZone(0.5 - cfg().width / 2);
      renderLevels();
      hud();
      api.setScore(total);
    }
    function loop(ts) {
      raf = requestAnimationFrame(loop);
      if (!last) last = ts;
      var dt = Math.min(0.05, (ts - last) / 1000);
      last = ts;
      if (!alive) return;
      pos += dir * cfg().speed * dt;
      if (pos >= 1) { pos = 1; dir = -1; }
      else if (pos <= 0) { pos = 0; dir = 1; }
      marker.style.left = (pos * 100) + '%';
      marker.dataset.pos = pos.toFixed(3);
      driftAcc += dt * 1000;
      feintAcc += dt * 1000;
      if (cfg().drift && driftAcc >= cfg().drift) { driftAcc = 0; driftZone(); }
      if (cfg().feint && feintAcc >= cfg().feint) { feintAcc = 0; feintZone(); }
    }
    function onKey(e) {
      if (e.key !== ' ' && e.keyCode !== 32) return;
      if (!alive || state !== 'play') return;
      if (e.target === strikeBtn) return; /* native click on the focused Strike button handles it */
      e.preventDefault();
      strike();
    }
    function onStrike() { strike(); }
    function onStrip(e) {
      var b = e.target.closest ? e.target.closest('.lv-btn') : null;
      if (!b || b.disabled) return;
      var n = parseInt(b.getAttribute('data-lv'), 10);
      if (n !== level && n <= unlocked) { api.sfx('click'); startLevel(n); }
    }

    strikeBtn.addEventListener('click', onStrike);
    document.addEventListener('keydown', onKey);
    elLevels.addEventListener('click', onStrip);

    startLevel(1);
    raf = requestAnimationFrame(loop);

    return function () {
      alive = false;
      cancelAnimationFrame(raf);
      document.removeEventListener('keydown', onKey);
      strikeBtn.removeEventListener('click', onStrike);
      elLevels.removeEventListener('click', onStrip);
      for (var i = 0; i < timers.length; i++) clearTimeout(timers[i]);
      timers = [];
      if (styleEl && styleEl.parentNode) styleEl.parentNode.removeChild(styleEl);
    };
  }
});
