GamePortal.register('ravandahan', {
  title: 'Ravan Dahan',
  emoji: '🏹',
  cat: 'arcade',
  c1: '#7c2d12',
  c2: '#fbbf24',
  tags: ['ravan', 'dussehra', 'vijayadashami', 'ram', 'effigy', 'burn', 'festival', 'arrow', 'bow', 'fireworks', 'india', 'kids'],
  rating: 4.8,
  plays: '0.6M',
  badge: 'New',
  controls: 'Lock the aim, lock the power, release the arrow — burn all ten heads!',
  desc: 'Dussehra night! Ravana\'s ten-headed effigy sways in the breeze. Tap Shoot once to lock the arrow\'s angle, again to lock its power, and watch it fly — hit every head to set the effigy ablaze in a shower of fireworks. Ravan dahan! Victory of good over evil.',
  play: function (stage, api) {
    var LEVELS = [
      { arrows: 15, sweep: 30, sway: 0, swayMs: 2400, wind: 0 },
      { arrows: 14, sweep: 50, sway: 1.6, swayMs: 2600, wind: 0 },
      { arrows: 13, sweep: 60, sway: 1.9, swayMs: 2100, wind: 0.06 },
      { arrows: 12, sweep: 85, sway: 2.6, swayMs: 1500, wind: -0.06 },
      { arrows: 11, sweep: 120, sway: 2.6, swayMs: 1350, wind: 0.06 }
    ];
    var HEADS = 10;
    var X0 = 8, Y0 = 86;
    var HX0 = 54, HX1 = 88, HY0 = 22, HY1 = 62;
    var COLW = (HX1 - HX0) / 5, ROWH = (HY1 - HY0) / 2;
    var KANG = 155, TAN75 = 3.7320508, FLIGHT = 600;
    var SPARKS = ['#fbbf24', '#f97316', '#ef4444', '#fff7ed', '#fcd34d'];
    var key = 'ph_ravandahan_lvl';
    var unlocked = Math.min(LEVELS.length, Math.max(1, GamePortal.store.get(key, 1)));
    var level = 1;

    var CSS = [
      '.rdg{color:#fff}',
      '.rdg .lv-goal{font-size:13.5px}',
      '.rdg .math-stat{font-size:13.5px}',
      '.rdg .rd-scene{position:relative;width:min(520px,96%);aspect-ratio:16/9;border-radius:18px;overflow:hidden;box-sizing:border-box;border:2px solid rgba(255,255,255,.16);background:linear-gradient(180deg,#141040 0%,#2e1065 42%,#7c2d12 90%,#451a03 100%);box-shadow:0 14px 34px rgba(0,0,0,.45)}',
      '.rdg .rd-star{position:absolute;width:3px;height:3px;border-radius:50%;background:#fff;opacity:.85;animation:rdTwk 2.6s ease-in-out infinite}',
      '@keyframes rdTwk{50%{opacity:.15;transform:scale(.55)}}',
      '.rdg .rd-moon{position:absolute;right:5%;top:7%;font-size:clamp(18px,4.6vw,30px);line-height:1;filter:drop-shadow(0 0 12px rgba(255,220,120,.55));animation:rdFloat 4.2s ease-in-out infinite}',
      '@keyframes rdFloat{50%{transform:translateY(-6px)}}',
      '.rdg .rd-wind{position:absolute;left:3%;top:4%;font-size:11.5px;font-weight:800;color:#e0e7ff;background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.25);border-radius:99px;padding:3px 9px;z-index:3}',
      '.rdg .rd-ground{position:absolute;left:0;right:0;top:92%;bottom:0;background:linear-gradient(180deg,#92400e,#451a03)}',
      '.rdg .rd-effigy{position:absolute;left:0;top:0;right:0;bottom:0;will-change:transform}',
      '.rdg .rd-effigy.rd-collapse{animation:rdCollapse 1s ease-in forwards}',
      '@keyframes rdCollapse{0%{opacity:1;transform:translateY(0) rotate(0)}30%{transform:translateY(2%) rotate(6deg)}100%{transform:translateY(28%) rotate(17deg);opacity:0}}',
      '.rdg .rd-body{position:absolute;left:56%;top:62%;width:30%;height:30%;box-sizing:border-box;border-radius:16px 16px 6px 6px;background:linear-gradient(180deg,#b45309,#7c2d12);border:2px solid #fbbf24;box-shadow:0 8px 18px rgba(0,0,0,.4)}',
      '.rdg .rd-body::after{content:"";position:absolute;left:8%;right:8%;top:34%;height:14%;border-radius:6px;background:rgba(251,191,36,.85)}',
      '.rdg .rd-stand{position:absolute;left:60%;top:89%;width:22%;height:4%;border-radius:6px;background:#451a03}',
      '.rdg .rd-heads{position:absolute;left:54%;top:22%;width:34%;height:40%;display:grid;grid-template-columns:repeat(5,1fr);grid-template-rows:repeat(2,1fr)}',
      '.rdg .rd-head{position:relative;display:grid;place-items:center;font-size:clamp(15px,4vw,25px);line-height:1;filter:drop-shadow(0 3px 4px rgba(0,0,0,.45))}',
      '.rdg .rd-head .rd-fire{position:absolute;left:0;top:0;right:0;bottom:0;display:grid;place-items:center;opacity:0;font-size:.9em;animation:rdFlame .45s ease-in-out infinite alternate}',
      '@keyframes rdFlame{from{transform:scale(.9) translateY(1px)}to{transform:scale(1.1) translateY(-2px)}}',
      '.rdg .rd-head[data-burned="1"] .rd-fire{opacity:1}',
      '.rdg .rd-head[data-burned="1"]{animation:rdBurn 1.15s ease forwards;pointer-events:none}',
      '@keyframes rdBurn{0%{transform:none;opacity:1}18%{transform:scale(1.18) rotate(-7deg);opacity:1}36%{transform:scale(1.04) rotate(7deg);opacity:1}54%{transform:scale(1.1) rotate(-4deg) translateY(6%);opacity:1}100%{transform:translateY(340%) rotate(42deg) scale(.55);opacity:0}}',
      '.rdg .rd-archer{position:absolute;left:3.5%;top:76%;font-size:clamp(22px,5.4vw,34px);line-height:1;filter:drop-shadow(0 4px 6px rgba(0,0,0,.45));z-index:3}',
      '.rdg .rd-aim{position:absolute;left:8%;top:86%;width:38%;height:4px;margin-top:-2px;border-radius:99px;background:linear-gradient(90deg,rgba(251,191,36,.05),rgba(251,191,36,.95));transform-origin:0 50%;pointer-events:none;z-index:4;transition:opacity .15s}',
      '.rdg .rd-scene[data-lock="1"] .rd-aim{opacity:.3}',
      '.rdg .rd-aimv{position:absolute;right:-4px;top:50%;font-size:11.5px;font-weight:800;color:#fde68a;white-space:nowrap;text-shadow:0 1px 3px rgba(0,0,0,.65)}',
      '.rdg .rd-arrow{position:absolute;left:0;top:0;display:none;width:26px;height:5px;border-radius:3px;background:linear-gradient(90deg,rgba(251,191,36,0),#fbbf24);pointer-events:none;z-index:6;will-change:transform}',
      '.rdg .rd-arrow::after{content:"";position:absolute;right:-4px;top:-3px;border-left:9px solid #fbbf24;border-top:5.5px solid transparent;border-bottom:5.5px solid transparent}',
      '.rdg .rd-spark{position:absolute;width:8px;height:8px;border-radius:50%;pointer-events:none;z-index:7;animation:rdSpark .6s ease-out forwards}',
      '@keyframes rdSpark{0%{transform:translate(-50%,-50%) scale(1.2);opacity:1}100%{transform:translate(calc(-50% + var(--tx)),calc(-50% + var(--ty))) scale(.2);opacity:0}}',
      '.rdg .rd-dust{position:absolute;width:26px;height:14px;margin-left:-13px;margin-top:-7px;border-radius:50%;background:radial-gradient(circle,rgba(196,156,100,.9),rgba(120,90,50,0));pointer-events:none;z-index:5;animation:rdDust .55s ease-out forwards}',
      '@keyframes rdDust{0%{transform:scale(.4);opacity:.95}100%{transform:scale(2.4) translateY(-16px);opacity:0}}',
      '.rdg .rd-fw{position:absolute;width:10px;height:10px;border-radius:50%;pointer-events:none;z-index:8;animation:rdFw .95s ease-out forwards}',
      '@keyframes rdFw{0%{transform:translate(-50%,-50%) scale(.4);opacity:1}70%{opacity:1}100%{transform:translate(calc(-50% + var(--tx)),calc(-50% + var(--ty))) scale(.15);opacity:0}}',
      '.rdg .rd-scene.rd-shake{animation:rdShake .45s ease}',
      '@keyframes rdShake{0%,100%{transform:translateX(0)}25%{transform:translateX(-7px)}50%{transform:translateX(6px)}75%{transform:translateX(-4px)}}',
      '.rdg .rd-pbar{position:relative;width:min(300px,84%);height:20px;box-sizing:border-box;border-radius:99px;background:rgba(255,255,255,.12);border:2px solid rgba(255,255,255,.25);overflow:hidden}',
      '.rdg .rd-fill{position:absolute;left:0;top:0;bottom:0;width:0;background:linear-gradient(90deg,#f97316,#fbbf24);transition:width .06s linear}',
      '.rdg .rd-plab{position:absolute;left:0;right:0;top:0;bottom:0;display:grid;place-items:center;font-size:11.5px;font-weight:900;color:#fff;text-shadow:0 1px 2px rgba(0,0,0,.5)}',
      '.rdg #rd-shoot{min-width:200px;padding:13px 30px;font-size:18px;border:none;cursor:pointer}',
      '.rdg #rd-shoot.rd-busy{opacity:.65;filter:saturate(.7)}'
    ].join('');

    var stale = document.getElementById('rd-style');
    if (stale && stale.parentNode) stale.parentNode.removeChild(stale);
    var styleEl = document.createElement('style');
    styleEl.id = 'rd-style';
    styleEl.textContent = CSS;
    document.head.appendChild(styleEl);

    var box = document.createElement('div');
    box.className = 'kg jm rdg';
    box.dataset.level = '1';
    box.dataset.phase = 'aim';
    box.dataset.state = 'play';
    box.dataset.arrows = String(LEVELS[0].arrows);
    box.dataset.heads = String(HEADS);
    box.dataset.aim = '15';
    box.dataset.pow = '0';
    box.dataset.wind = '0';
    box.innerHTML =
      '<div class="lv-strip" id="rd-levels"><span class="lv-strip-label">Level</span></div>' +
      '<div class="lv-goal" id="rd-goal"></div>' +
      '<div class="math-top">' +
        '<span class="math-stat" id="rd-arrows">🏹 Arrows ' + LEVELS[0].arrows + '</span>' +
        '<span class="math-stat" id="rd-hits">🔥 Heads burned 0 / ' + HEADS + '</span>' +
      '</div>' +
      '<div class="rd-scene" id="rd-scene" data-solution="aim:45,pow:60">' +
        '<div class="rd-star" style="left:10%;top:14%"></div>' +
        '<div class="rd-star" style="left:22%;top:8%;animation-delay:.6s"></div>' +
        '<div class="rd-star" style="left:34%;top:18%;animation-delay:1.1s"></div>' +
        '<div class="rd-star" style="left:47%;top:10%;animation-delay:.3s"></div>' +
        '<div class="rd-star" style="left:58%;top:16%;animation-delay:1.6s"></div>' +
        '<div class="rd-star" style="left:70%;top:7%;animation-delay:.9s"></div>' +
        '<div class="rd-star" style="left:83%;top:22%;animation-delay:1.9s"></div>' +
        '<div class="rd-star" style="left:91%;top:13%;animation-delay:.45s"></div>' +
        '<div class="rd-star" style="left:16%;top:27%;animation-delay:1.35s"></div>' +
        '<div class="rd-moon">🌕</div>' +
        '<div class="rd-wind" id="rd-windlbl">🌬️ calm</div>' +
        '<div class="rd-ground"></div>' +
        '<div class="rd-effigy" id="rd-effigy">' +
          '<div class="rd-heads" id="rd-heads"></div>' +
          '<div class="rd-body"></div>' +
          '<div class="rd-stand"></div>' +
        '</div>' +
        '<div class="rd-archer">🧝</div>' +
        '<div class="rd-aim" id="rd-aim"><span class="rd-aimv" id="rd-aimv">15°</span></div>' +
        '<div class="rd-arrow" id="rd-arrow"></div>' +
      '</div>' +
      '<div class="rd-pbar" id="rd-power"><div class="rd-fill" id="rd-pfill"></div><span class="rd-plab" id="rd-plab">0</span></div>' +
      '<button type="button" class="big-btn" id="rd-shoot">🏹 Shoot</button>' +
      '<div class="hint" id="rd-hint"></div>';
    stage.appendChild(box);

    var elLevels = box.querySelector('#rd-levels');
    var elGoal = box.querySelector('#rd-goal');
    var elArrows = box.querySelector('#rd-arrows');
    var elHits = box.querySelector('#rd-hits');
    var scene = box.querySelector('#rd-scene');
    var headsEl = box.querySelector('#rd-heads');
    var effigy = box.querySelector('#rd-effigy');
    var aimEl = box.querySelector('#rd-aim');
    var aimvEl = box.querySelector('#rd-aimv');
    var arrowEl = box.querySelector('#rd-arrow');
    var fillEl = box.querySelector('#rd-pfill');
    var plabEl = box.querySelector('#rd-plab');
    var btn = box.querySelector('#rd-shoot');
    var hint = box.querySelector('#rd-hint');
    var windLbl = box.querySelector('#rd-windlbl');

    for (var i = 0; i < HEADS; i++) {
      var hd = document.createElement('div');
      hd.className = 'rd-head';
      hd.setAttribute('data-head', String(i));
      hd.innerHTML = '<span>👹</span><span class="rd-fire">🔥</span>';
      headsEl.appendChild(hd);
    }

    var alive = true, phase = 'aim', arrows = LEVELS[0].arrows, headsLeft = HEADS;
    var aimAng = 15, aimDir = 1, powVal = 0, powDir = 1;
    var lockedAng = 15, lockedPow = 0, swayOff = 0, SW = 520, SH = 292;
    var raf = 0, lastTs = 0, t0 = 0, fly = null, flyT0 = 0;
    var timers = [];
    var burned = [];
    for (i = 0; i < HEADS; i++) burned.push(false);

    function clock() {
      return (window.performance && performance.now) ? performance.now() : Date.now();
    }
    function cfg() { return LEVELS[level - 1]; }
    function later(fn, ms) {
      var id = setTimeout(function () {
        var k = timers.indexOf(id);
        if (k >= 0) timers.splice(k, 1);
        fn();
      }, ms);
      timers.push(id);
      return id;
    }
    function tanOf(deg) { return Math.tan(deg * Math.PI / 180); }
    function measure() {
      SW = scene.clientWidth || SW;
      SH = scene.clientHeight || SH;
    }
    function swayAt(ts) {
      var c = cfg();
      if (!c.sway || !c.swayMs) return 0;
      return Math.sin(((ts - t0) / c.swayMs) * Math.PI * 2) * c.sway;
    }
    function headCenter(idx, off) {
      var c = idx % 5, r = Math.floor(idx / 5);
      return { x: HX0 + COLW * (c + 0.5) + off, y: HY0 + ROWH * (r + 0.5) };
    }
    function nearestHead(x, y, off) {
      var best = -1, bd = 1e9;
      for (var i = 0; i < HEADS; i++) {
        if (burned[i]) continue;
        var hc = headCenter(i, off);
        var d = (hc.x - x) * (hc.x - x) + (hc.y - y) * (hc.y - y);
        if (d < bd) { bd = d; best = i; }
      }
      return best;
    }

    function renderLevels() {
      var html = '<span class="lv-strip-label">Level</span>';
      for (var n = 1; n <= LEVELS.length; n++) {
        var cls = 'lv-btn' + (n === level ? ' on' : '') + (n > unlocked ? ' locked' : '');
        html += '<button type="button" class="' + cls + '" data-lv="' + n + '"' + (n > unlocked ? ' disabled' : '') + '>' + n + '</button>';
      }
      elLevels.innerHTML = html;
      elGoal.textContent = 'Level ' + level + ' — burn all ' + HEADS + ' heads with ' + cfg().arrows + ' arrows!';
      box.dataset.level = String(level);
    }
    function hud() {
      elArrows.textContent = '🏹 Arrows ' + arrows;
      elHits.textContent = '🔥 Heads burned ' + (HEADS - headsLeft) + ' / ' + HEADS;
      box.dataset.arrows = String(arrows);
      box.dataset.heads = String(headsLeft);
    }
    function renderAim() {
      var a = Math.round(aimAng);
      aimEl.style.transform = 'rotate(' + (-aimAng) + 'deg)';
      aimvEl.style.transform = 'translateY(-50%) rotate(' + aimAng + 'deg)';
      aimvEl.textContent = a + '°';
      box.dataset.aim = String(a);
    }
    function renderPow() {
      var p = Math.round(powVal);
      fillEl.style.width = p + '%';
      plabEl.textContent = String(p);
      box.dataset.pow = String(p);
    }
    function lockFx(on) {
      if (on) scene.setAttribute('data-lock', '1');
      else scene.removeAttribute('data-lock');
    }
    function clearParticles() {
      var old = scene.querySelectorAll('.rd-spark,.rd-fw,.rd-dust');
      for (var i = 0; i < old.length; i++) {
        if (old[i].parentNode) old[i].parentNode.removeChild(old[i]);
      }
    }
    function trackRemoval(el, ms) {
      later(function () { if (el && el.parentNode) el.parentNode.removeChild(el); }, ms);
    }
    function burst(x, y, n) {
      for (var i = 0; i < n; i++) {
        var d = document.createElement('div');
        d.className = 'rd-spark';
        var ang = Math.random() * Math.PI * 2;
        var dist = 16 + Math.random() * 34;
        d.style.left = (x * SW / 100) + 'px';
        d.style.top = (y * SH / 100) + 'px';
        d.style.background = SPARKS[i % SPARKS.length];
        d.style.setProperty('--tx', (Math.cos(ang) * dist).toFixed(1) + 'px');
        d.style.setProperty('--ty', (Math.sin(ang) * dist).toFixed(1) + 'px');
        scene.appendChild(d);
        trackRemoval(d, 700);
      }
    }
    function dust(x) {
      var d = document.createElement('div');
      d.className = 'rd-dust';
      d.style.left = (x * SW / 100) + 'px';
      d.style.top = (92 * SH / 100) + 'px';
      scene.appendChild(d);
      trackRemoval(d, 650);
    }
    function fireworks() {
      for (var i = 0; i < 11; i++) {
        var d = document.createElement('div');
        d.className = 'rd-fw';
        var x = 12 + Math.random() * 76;
        var y = 10 + Math.random() * 48;
        var ang = Math.random() * Math.PI * 2;
        var dist = 28 + Math.random() * 58;
        d.style.left = (x * SW / 100) + 'px';
        d.style.top = (y * SH / 100) + 'px';
        d.style.background = SPARKS[i % SPARKS.length];
        d.style.animationDelay = (i * 0.06) + 's';
        d.style.setProperty('--tx', (Math.cos(ang) * dist).toFixed(1) + 'px');
        d.style.setProperty('--ty', (Math.sin(ang) * dist).toFixed(1) + 'px');
        scene.appendChild(d);
        trackRemoval(d, 1500);
      }
    }
    function shake() {
      scene.classList.remove('rd-shake');
      void scene.offsetWidth;
      scene.classList.add('rd-shake');
    }

    function startLevel(n) {
      level = Math.max(1, Math.min(LEVELS.length, n));
      api.clearOverlay();
      api.setScore(0);
      phase = 'aim';
      alive = true;
      arrows = cfg().arrows;
      headsLeft = HEADS;
      aimAng = 15; aimDir = 1;
      powVal = 0; powDir = 1;
      lockedAng = 15; lockedPow = 0;
      fly = null;
      swayOff = 0;
      for (var i = 0; i < HEADS; i++) burned[i] = false;
      var hds = headsEl.querySelectorAll('.rd-head');
      for (i = 0; i < hds.length; i++) {
        hds[i].removeAttribute('data-burned');
        hds[i].classList.remove('rd-burn');
      }
      effigy.classList.remove('rd-collapse');
      effigy.style.transform = '';
      arrowEl.style.display = 'none';
      clearParticles();
      lockFx(false);
      btn.classList.remove('rd-busy');
      btn.textContent = '🏹 Shoot';
      windLbl.textContent = cfg().wind === 0 ? '🌬️ calm' : (cfg().wind > 0 ? '🌬️ drift →' : '🌬️ drift ←');
      box.dataset.state = 'play';
      box.dataset.wind = String(Math.round(cfg().wind * 100));
      box.dataset.phase = 'aim';
      hint.textContent = '🎯 Tap Shoot to lock the arrow\'s angle!';
      measure();
      t0 = clock();
      lastTs = 0;
      renderLevels();
      hud();
      renderAim();
      renderPow();
    }

    function onShoot() {
      if (!alive || phase === 'fly' || phase === 'done') return;
      if (phase === 'aim') {
        lockedAng = aimAng;
        api.sfx('click');
        phase = 'power';
        box.dataset.phase = 'power';
        powVal = 0; powDir = 1;
        renderPow();
        lockFx(true);
        btn.textContent = '⚡ Lock power!';
        hint.textContent = '⚡ Power meter running — tap Shoot to release!';
      } else if (phase === 'power') {
        lockedPow = powVal;
        api.sfx('flip');
        launch();
      }
    }

    function launch() {
      phase = 'fly';
      box.dataset.phase = 'fly';
      arrows--;
      hud();
      box.dataset.aim = String(Math.round(lockedAng));
      box.dataset.pow = String(Math.round(lockedPow));
      measure();
      var p = lockedPow / 100;
      var eX0 = X0 + p * 90;
      var windOff = cfg().wind * eX0;
      var endX = eX0 + windOff;
      var H = KANG * (0.6 + 0.006 * lockedPow) * (tanOf(lockedAng) / TAN75);
      var arrivalY = Y0 - H;
      var off = swayOff;
      var hit = endX >= HX0 + off && endX <= HX1 + off && arrivalY >= HY0 && arrivalY <= HY1;
      var head = hit ? nearestHead(endX, arrivalY, off) : -1;
      if (head < 0) hit = false;
      var vY = hit ? arrivalY : 92;
      if (vY < 4) vY = 4;
      var arcH = 12 + Math.max(0, Y0 - arrivalY) * 0.4;
      if (arcH < 14) arcH = 14;
      fly = { eX0: eX0, windOff: windOff, endX: endX, arrivalY: arrivalY, vY: vY, arcH: arcH, hit: hit, head: head };
      flyT0 = clock();
      arrowEl.style.display = 'block';
      btn.classList.add('rd-busy');
      btn.textContent = '🏹 Flying…';
      hint.textContent = '🏹 The arrow soars…';
    }

    function stepFly(ts) {
      var f = fly;
      if (!f) return;
      var u = (ts - flyT0) / FLIGHT;
      if (u < 0) u = 0;
      if (u > 1) u = 1;
      var x = X0 + (f.eX0 - X0) * u + f.windOff * u * u;
      var y = Y0 + (f.vY - Y0) * u - f.arcH * 4 * u * (1 - u);
      var dx = (f.eX0 - X0) + f.windOff * 2 * u;
      var dy = (f.vY - Y0) - f.arcH * 4 * (1 - 2 * u);
      var rot = Math.atan2(dy * SH / 100, dx * SW / 100) * 180 / Math.PI;
      arrowEl.style.transform = 'translate(' + (x * SW / 100) + 'px,' + (y * SH / 100) + 'px) translate(-50%,-50%) rotate(' + rot + 'deg)';
      if (u >= 1) resolveShot();
    }

    function resolveShot() {
      arrowEl.style.display = 'none';
      var f = fly;
      fly = null;
      if (f && f.hit) burnHead(f.head);
      else if (f) missShot(f);
      if (headsLeft <= 0) { collapseAndClear(); return; }
      if (arrows <= 0) {
        phase = 'done';
        box.dataset.phase = 'done';
        box.dataset.state = 'over';
        btn.classList.add('rd-busy');
        later(doGameOver, 550);
        return;
      }
      phase = 'aim';
      box.dataset.phase = 'aim';
      btn.classList.remove('rd-busy');
      btn.textContent = '🏹 Shoot';
    }

    function burnHead(idx) {
      var c = headCenter(idx, swayOff);
      var el = headsEl.querySelector('[data-head="' + idx + '"]');
      if (el) {
        el.setAttribute('data-burned', '1');
        el.classList.add('rd-burn');
      }
      burned[idx] = true;
      headsLeft--;
      api.sfx('eat');
      api.addScore(100);
      burst(c.x, c.y, 7);
      shake();
      hint.textContent = '🔥 Whoosh — a head catches fire!';
      hud();
    }

    function missShot(f) {
      api.sfx('bad');
      dust(f.endX > 97 ? 97 : (f.endX < 2 ? 2 : f.endX));
      if (f.arrivalY < HY0) hint.textContent = '💨 Over the top — lower the angle!';
      else if (f.endX > HX1 + swayOff) hint.textContent = '💨 Too far — ease off the power!';
      else if (f.endX < HX0 + swayOff) hint.textContent = '💨 Too short — more power!';
      else hint.textContent = '💨 Missed the heads — try again!';
    }

    function collapseAndClear() {
      phase = 'done';
      box.dataset.phase = 'done';
      effigy.classList.add('rd-collapse');
      shake();
      fireworks();
      hint.textContent = '🎆 Ravan dahan — the effigy falls!';
      later(doLevelClear, 950);
    }

    function doLevelClear() {
      if (level > unlocked) { unlocked = level; GamePortal.store.set(key, unlocked); }
      api.addScore(arrows * 25);
      if (level >= LEVELS.length) {
        api.win({
          emoji: '🎆',
          title: 'Dussehra Darshan!',
          text: 'Ten heads burn — Ravan dahan complete!'
        });
        return;
      }
      api.sfx('win');
      api.overlay({
        emoji: '🌟',
        title: 'Level ' + level + ' complete!',
        text: 'Next: burn all ' + HEADS + ' heads with ' + LEVELS[level].arrows + ' arrows.',
        score: api.score,
        best: api.getBest(),
        onAgain: function () { api.clearOverlay(); level++; startLevel(level); }
      });
    }

    function doGameOver() {
      api.gameOver({
        title: '🏹 Out of arrows!',
        text: 'Level ' + level + ': burned ' + (HEADS - headsLeft) + ' of ' + HEADS + ' heads. Aim true and try again!',
        onAgain: function () { api.clearOverlay(); startLevel(level); }
      });
    }

    function tick(ts) {
      if (!alive) return;
      raf = requestAnimationFrame(tick);
      if (!lastTs) lastTs = ts;
      var dt = Math.min(0.05, (ts - lastTs) / 1000);
      lastTs = ts;
      if (phase !== 'done') {
        swayOff = swayAt(ts);
        effigy.style.transform = 'translateX(' + (swayOff * SW / 100).toFixed(2) + 'px)';
      }
      if (phase === 'aim') {
        aimAng += aimDir * cfg().sweep * dt;
        if (aimAng >= 75) { aimAng = 75; aimDir = -1; }
        if (aimAng <= 15) { aimAng = 15; aimDir = 1; }
        renderAim();
      } else if (phase === 'power') {
        powVal += powDir * 90 * dt;
        if (powVal >= 100) { powVal = 100; powDir = -1; }
        if (powVal <= 0) { powVal = 0; powDir = 1; }
        renderPow();
      } else if (phase === 'fly') {
        stepFly(ts);
      }
    }

    function onLevels(e) {
      var b = e.target.closest ? e.target.closest('.lv-btn') : null;
      if (!b || b.disabled) return;
      var n = parseInt(b.getAttribute('data-lv'), 10);
      if (n !== level && n <= unlocked) { api.sfx('click'); startLevel(n); }
    }

    btn.addEventListener('click', onShoot);
    elLevels.addEventListener('click', onLevels);

    startLevel(1);
    raf = requestAnimationFrame(tick);

    return function () {
      alive = false;
      if (raf) { cancelAnimationFrame(raf); raf = 0; }
      for (var i = 0; i < timers.length; i++) clearTimeout(timers[i]);
      timers.length = 0;
      btn.removeEventListener('click', onShoot);
      elLevels.removeEventListener('click', onLevels);
      if (styleEl && styleEl.parentNode) styleEl.parentNode.removeChild(styleEl);
    };
  }
});
