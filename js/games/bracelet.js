/* Friendship Bracelets — watch a bead pattern, then thread it back from memory.
   Original craft theme; palette and patterns are our own. */
GamePortal.register('bracelet', {
  title: 'Friendship Bracelets',
  emoji: '📿',
  cat: 'arts',
  c1: '#c026d3',
  c2: '#67e8f9',
  tags: ['bracelet', 'friendship', 'pattern', 'beads', 'memory', 'arts', 'craft', 'colour', 'design', 'gifts', 'creative'],
  rating: 4.8,
  plays: '0.2M',
  badge: 'Creative',
  controls: 'Watch the bracelet pattern, then thread the beads in the same order!',
  desc: 'Design friendship bracelets! A pattern flashes on screen — remember it and thread the beads in exactly the same order. Longer patterns, more colours and fewer chances as you go: five levels from 4 beads to a 12-bead masterpiece.',
  play: function (stage, api) {
    var COLORS = [
      { n: 'Pink',      hex: '#ff7eb6' },
      { n: 'Lilac',     hex: '#c084fc' },
      { n: 'Mint',      hex: '#5eead4' },
      { n: 'Sunny',     hex: '#fde047' },
      { n: 'Coral',     hex: '#fb7185' },
      { n: 'Starlight', hex: '#67e8f9' }
    ];
    var LEVELS = [
      { len: 4,  colors: 2, speed: 500, name: 'stripey',   pattern: [0, 1, 0, 1] },
      { len: 6,  colors: 3, speed: 450, name: 'twins',     pattern: [0, 0, 1, 1, 2, 2] },
      { len: 8,  colors: 4, speed: 400, name: 'zigzag',    pattern: [0, 1, 2, 0, 1, 2, 0, 1] },
      { len: 10, colors: 5, speed: 350, name: 'rainbow',   pattern: [0, 1, 2, 3, 4, 4, 3, 2, 1, 0] },
      { len: 12, colors: 6, speed: 300, name: 'starlight', pattern: [5, 0, 1, 2, 3, 4, 4, 3, 2, 1, 0, 5] }
    ];
    var key = 'ph_bracelet_lvl';
    var unlocked = Math.min(LEVELS.length, Math.max(1, GamePortal.store.get(key, 1)));
    var level = 1;

    var wrap = document.createElement('div');
    wrap.className = 'quiz-wrap';
    wrap.dataset.level = '1';
    wrap.dataset.step = '0';
    wrap.dataset.phase = 'demo';
    wrap.dataset.hearts = '3';
    wrap.dataset.pattern = '0,1,0,1';
    wrap.innerHTML =
      '<div class="lv-strip" id="br-levels"><span class="lv-strip-label">Level</span></div>' +
      '<div class="lv-goal" id="br-goal"></div>' +
      '<div class="math-top">' +
        '<span class="math-stat" id="br-hearts">❤️❤️❤️</span>' +
        '<span class="math-stat" id="br-phase">👀 Watch…</span>' +
      '</div>' +
      '<div class="q-card" style="max-width:520px">' +
        '<div class="q-kicker">Pattern to remember</div>' +
        '<div id="br-preview" style="display:flex;gap:7px;flex-wrap:wrap;justify-content:center;align-items:center;min-height:34px"></div>' +
        '<div class="q-kicker" style="margin-top:14px">Your bracelet</div>' +
        '<div id="br-made" style="display:flex;gap:7px;flex-wrap:wrap;justify-content:center;align-items:center;min-height:34px"></div>' +
        '<div class="math-fb" id="br-fb" style="margin-top:10px"></div>' +
      '</div>' +
      '<div class="ans-grid" id="br-beads" style="grid-template-columns:repeat(auto-fit,minmax(104px,150px))"></div>' +
      '<div class="hint" id="br-hint">Watch the pattern, then thread it back!</div>';
    stage.appendChild(wrap);

    var elPreview = wrap.querySelector('#br-preview');
    var elMade = wrap.querySelector('#br-made');
    var elBeads = wrap.querySelector('#br-beads');
    var elHearts = wrap.querySelector('#br-hearts');
    var elPhase = wrap.querySelector('#br-phase');
    var elFb = wrap.querySelector('#br-fb');
    var elHint = wrap.querySelector('#br-hint');
    var elGoal = wrap.querySelector('#br-goal');
    var elLevels = wrap.querySelector('#br-levels');

    var MADE_EMPTY = '<span style="color:#8a8fb0;font-size:13px;font-weight:700">Your beads land here</span>';
    var GONE = '<span style="color:#8a8fb0;font-size:13px;font-weight:700">💭 It vanished — remember it!</span>';

    var pattern = [], made = [];
    var step = 0, hearts = 3, phase = 'demo';
    var demoTimers = [];
    var alive = true;

    function cfg() { return LEVELS[level - 1]; }

    function beadHtml(c) {
      return '<span class="br-bead" data-color="' + c + '" style="display:inline-block;width:26px;height:26px;border-radius:50%;background:' +
        COLORS[c].hex + ';border:3px solid rgba(255,255,255,.85);box-sizing:border-box;box-shadow:0 3px 8px rgba(0,0,0,.3)"></span>';
    }

    function renderLevels() {
      var html = '<span class="lv-strip-label">Level</span>';
      for (var n = 1; n <= LEVELS.length; n++) {
        var cls = 'lv-btn' + (n === level ? ' on' : '') + (n > unlocked ? ' locked' : '');
        html += '<button type="button" class="' + cls + '" data-lv="' + n + '"' + (n > unlocked ? ' disabled' : '') + '>' + n + '</button>';
      }
      elLevels.innerHTML = html;
      elGoal.textContent = 'Level ' + level + ' — remember the ' + cfg().len + '-bead ' + cfg().name + ' pattern!';
      wrap.dataset.level = String(level);
    }

    function renderPalette() {
      var html = '';
      for (var i = 0; i < cfg().colors; i++) {
        html += '<button type="button" class="ans-btn br-chip" data-color="' + i + '" aria-label="' + COLORS[i].n + '">' +
          '<span style="display:block;width:30px;height:30px;border-radius:50%;background:' + COLORS[i].hex +
          ';border:3px solid #fff;box-sizing:border-box;margin:0 auto 6px;box-shadow:0 3px 8px rgba(0,0,0,.3)"></span>' +
          COLORS[i].n + '</button>';
      }
      elBeads.innerHTML = html;
    }

    function renderMade() {
      if (!made.length) { elMade.innerHTML = MADE_EMPTY; return; }
      var h = '';
      for (var i = 0; i < made.length; i++) h += beadHtml(made[i]);
      elMade.innerHTML = h;
    }

    function hud() {
      elHearts.textContent = '❤️'.repeat(Math.max(0, hearts)) + '🖤'.repeat(Math.max(0, 3 - hearts));
      wrap.dataset.level = String(level);
      wrap.dataset.step = String(step);
      wrap.dataset.phase = phase;
      wrap.dataset.hearts = String(hearts);
      wrap.dataset.pattern = pattern.join(',');
      api.setScore(step * 10);
    }

    function shake(el) {
      el.classList.remove('shake');
      void el.offsetWidth;
      el.classList.add('shake');
    }

    function clearDemo() {
      for (var i = 0; i < demoTimers.length; i++) clearTimeout(demoTimers[i]);
      demoTimers = [];
    }

    function runDemo() {
      clearDemo();
      phase = 'demo';
      step = 0;
      made = [];
      elMade.innerHTML = MADE_EMPTY;
      elPreview.innerHTML = '';
      elFb.textContent = '';
      elFb.className = 'math-fb';
      elPhase.textContent = '👀 Watch…';
      elHint.textContent = 'Watch the pattern…';
      hud();
      var i = 0;
      function tick() {
        if (!alive) return;
        if (i >= pattern.length) {
          elPreview.innerHTML = GONE;
          phase = 'replay';
          elPhase.textContent = '🎯 Your turn!';
          elHint.textContent = 'Now thread ' + pattern.length + ' beads in the same order!';
          hud();
          return;
        }
        elPreview.insertAdjacentHTML('beforeend', beadHtml(pattern[i]));
        api.sfx('pop');
        i++;
        demoTimers.push(setTimeout(tick, cfg().speed));
      }
      demoTimers.push(setTimeout(tick, 450));
    }

    function levelClear() {
      alive = false;
      clearDemo();
      if (level > unlocked) { unlocked = level; GamePortal.store.set(key, unlocked); }
      if (level >= LEVELS.length) {
        api.win({ emoji: '💖', title: 'Bracelet Designer!', text: 'You made a masterpiece — ready to gift!' });
        return;
      }
      api.sfx('win');
      api.overlay({
        emoji: '📿',
        title: 'Level ' + level + ' complete!',
        text: 'Next: a ' + LEVELS[level].len + '-bead ' + LEVELS[level].name + ' pattern with ' + LEVELS[level].colors + ' colours.',
        score: api.score,
        best: api.getBest(),
        onAgain: function () { api.clearOverlay(); level++; startLevel(level); }
      });
    }

    function fail() {
      alive = false;
      clearDemo();
      api.gameOver({
        title: '💔 The bracelet broke!',
        text: 'Level ' + level + ': you threaded ' + step + ' of ' + pattern.length + ' beads.',
        onAgain: function () { api.clearOverlay(); startLevel(level); }
      });
    }

    function startLevel(n) {
      level = Math.max(1, Math.min(LEVELS.length, n));
      api.clearOverlay();
      api.setScore(0);
      clearDemo();
      alive = true;
      hearts = 3;
      step = 0;
      phase = 'demo';
      pattern = cfg().pattern.slice();
      made = [];
      renderLevels();
      renderPalette();
      renderMade();
      hud();
      runDemo();
    }

    function onTap(e) {
      if (!alive || phase !== 'replay') return;
      var b = e.target && e.target.closest ? e.target.closest('.br-chip') : null;
      if (!b) return;
      var c = parseInt(b.getAttribute('data-color'), 10);
      var want = pattern[step];
      if (c === want) {
        made.push(c);
        step++;
        api.sfx('good');
        elFb.textContent = 'Nice! ' + step + ' / ' + pattern.length;
        elFb.className = 'math-fb ok';
        renderMade();
        hud();
        if (step >= pattern.length) levelClear();
      } else {
        hearts--;
        api.sfx('bad');
        elFb.textContent = 'Oops — watch the pattern again!';
        elFb.className = 'math-fb no';
        elHint.textContent = '💔 Wrong bead — one heart gone. Watch closely!';
        shake(elBeads);
        hud();
        if (hearts <= 0) { fail(); return; }
        runDemo();
      }
    }

    function onLv(e) {
      var lvb = e.target && e.target.closest ? e.target.closest('.lv-btn') : null;
      if (lvb && !lvb.classList.contains('locked') && !lvb.disabled) {
        var n = parseInt(lvb.getAttribute('data-lv'), 10);
        if (n !== level && n <= unlocked) { api.sfx('click'); startLevel(n); }
      }
    }

    elBeads.addEventListener('click', onTap);
    elLevels.addEventListener('click', onLv);

    startLevel(1);

    return function () {
      alive = false;
      clearDemo();
      elBeads.removeEventListener('click', onTap);
      elLevels.removeEventListener('click', onLv);
    };
  }
});
