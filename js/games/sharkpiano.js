/* Baby Shark Piano — a gentle five-key melody memory game.
   All shark-family characters here are generic original stand-ins:
   not based on, affiliated with, endorsed by or inspired by any existing
   song, video, character or show. */
GamePortal.register('sharkpiano', {
  title: 'Baby Shark Piano',
  emoji: '🎹',
  cat: 'kids',
  c1: '#0ea5e9',
  c2: '#f472b6',
  tags: ['baby shark', 'shark', 'piano', 'music', 'song', 'memory', 'sequence', 'kids', 'sing', 'dance', 'family', 'toddler'],
  rating: 4.8,
  plays: '0.4M',
  badge: 'New',
  controls: 'Watch the keys light up, then tap the shark song back!',
  desc: 'Play the Baby Shark family song on a piano of five shark friends! Watch the keys glow, then tap the tune back from memory. Clear 5 levels from Baby Shark up to the whole family\'s speedy finale — ages 3 to 10.',
  play: function (stage, api) {
    var NAMES = ['Baby', 'Mama', 'Papa', 'Grandma', 'Grandpa'];
    var COLORS = [
      ['#0ea5e9', '#67e8f9'],
      ['#6366f1', '#a5b4fc'],
      ['#8b5cf6', '#c4b5fd'],
      ['#ec4899', '#f9a8d4'],
      ['#f43f5e', '#fda4af']
    ];
    var LEVELS = [
      { seq: [0, 0, 1, 1], speed: 400, name: 'Baby Shark tune' },
      { seq: [0, 0, 1, 1, 2, 2], speed: 380, name: 'Mama Shark tune' },
      { seq: [0, 0, 1, 1, 2, 2, 3, 3], speed: 340, name: 'Papa Shark tune' },
      { seq: [0, 0, 1, 1, 2, 2, 3, 3, 4, 4], speed: 300, name: 'Grandma & Grandpa tune' },
      { seq: [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 0, 1], speed: 240, name: 'Whole Family tune' }
    ];
    var key = 'ph_sharkpiano_lvl';
    var unlocked = Math.min(LEVELS.length, Math.max(1, GamePortal.store.get(key, 1)));
    var level = 1;

    var box = document.createElement('div');
    box.className = 'kg jm';
    box.dataset.level = '1';
    box.dataset.phase = 'demo';
    box.dataset.step = '0';
    box.dataset.hearts = '3';
    box.dataset.len = String(LEVELS[0].seq.length);
    box.innerHTML =
      '<div class="lv-strip" id="sp-levels"><span class="lv-strip-label">Level</span></div>' +
      '<div class="lv-goal" id="sp-goal"></div>' +
      '<div class="math-top">' +
      '<span class="math-stat" id="sp-hearts">❤️❤️❤️</span>' +
      '<span class="math-stat" id="sp-phase">Watch…</span></div>' +
      '<div id="sp-keys" class="jm-row" style="gap:10px"></div>' +
      '<span id="sp-replay" class="hint" style="position:absolute;left:-9999px;top:auto">0,0,1,1</span>';
    stage.appendChild(box);

    var elLevels = box.querySelector('#sp-levels');
    var elGoal = box.querySelector('#sp-goal');
    var elHearts = box.querySelector('#sp-hearts');
    var elPhase = box.querySelector('#sp-phase');
    var keysEl = box.querySelector('#sp-keys');
    var elReplay = box.querySelector('#sp-replay');

    var keyBtns = [];
    for (var i = 0; i < 5; i++) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'jm-opt';
      b.setAttribute('data-key', String(i));
      b.style.background = 'linear-gradient(135deg,' + COLORS[i][0] + ',' + COLORS[i][1] + ')';
      b.style.minWidth = '64px';
      b.style.borderColor = 'rgba(255,255,255,.5)';
      b.innerHTML = '<span style="font-size:34px;line-height:1">🦈</span>' +
        '<span style="font-size:12.5px">' + NAMES[i] + '</span>';
      keysEl.appendChild(b);
      keyBtns.push(b);
    }

    var alive = true, phase = 'demo', step = 0, hearts = 3;
    var seq = LEVELS[0].seq, SPEED = LEVELS[0].speed;
    var demoTO = null, tos = [];

    function later(fn, ms) {
      var id = setTimeout(fn, ms);
      tos.push(id);
      return id;
    }
    function cfg() { return LEVELS[level - 1]; }
    function renderLevels() {
      var html = '<span class="lv-strip-label">Level</span>';
      for (var n = 1; n <= LEVELS.length; n++) {
        var cls = 'lv-btn' + (n === level ? ' on' : '') + (n > unlocked ? ' locked' : '');
        html += '<button type="button" class="' + cls + '" data-lv="' + n + '"' + (n > unlocked ? ' disabled' : '') + '>' + n + '</button>';
      }
      elLevels.innerHTML = html;
      elGoal.textContent = 'Level ' + level + ' — tap back the ' + cfg().name + ' (' + seq.length + ' taps)!';
      box.dataset.level = String(level);
    }
    function sync() {
      elHearts.textContent = '❤️'.repeat(Math.max(0, hearts)) + '🖤'.repeat(Math.max(0, 3 - hearts));
      elPhase.textContent = phase === 'demo' ? 'Watch…' : 'Your turn!';
      box.dataset.phase = phase;
      box.dataset.step = String(step);
      box.dataset.hearts = String(hearts);
      box.dataset.len = String(seq.length);
      elReplay.textContent = seq.join(',');
    }
    function flash(k, ms) {
      var b = keyBtns[k];
      b.classList.add('ok');
      later(function () { b.classList.remove('ok'); }, ms || 240);
    }
    function clearDemo() {
      if (demoTO) { clearTimeout(demoTO); demoTO = null; }
    }
    function runDemo() {
      clearDemo();
      phase = 'demo';
      step = 0;
      sync();
      var i = 0;
      function tick() {
        if (!alive || phase !== 'demo') return;
        if (i >= seq.length) {
          phase = 'replay';
          step = 0;
          demoTO = null;
          sync();
          return;
        }
        flash(seq[i], Math.max(160, SPEED * 0.55));
        api.sfx('pop');
        i++;
        demoTO = later(tick, SPEED);
      }
      demoTO = later(tick, 450);
    }
    function fail() {
      alive = false;
      clearDemo();
      api.gameOver({
        title: '🎵 Oops!',
        text: 'Level ' + level + ': you got ' + step + ' of ' + seq.length + ' notes. Watch again!',
        onAgain: function () { api.clearOverlay(); startLevel(level); }
      });
    }
    function levelClear() {
      if (!alive) return;
      alive = false;
      clearDemo();
      if (level > unlocked) { unlocked = level; GamePortal.store.set(key, unlocked); }
      api.sfx('win');
      if (level >= LEVELS.length) {
        api.win({
          emoji: '🦈',
          title: 'Baby Shark Superstar!',
          text: 'You played the whole shark family song!'
        });
        return;
      }
      api.overlay({
        emoji: '🎹',
        title: 'Level ' + level + ' complete!',
        text: 'Next: the ' + LEVELS[level].name + ' (' + LEVELS[level].seq.length + ' taps, faster!).',
        score: api.score,
        best: api.getBest(),
        onAgain: function () { api.clearOverlay(); level++; startLevel(level); }
      });
    }
    function tap(k) {
      if (!alive || phase !== 'replay') return;
      flash(k, 220);
      api.sfx('pop');
      if (k === seq[step]) {
        step++;
        api.addScore(10);
        sync();
        if (step >= seq.length) levelClear();
      } else {
        hearts--;
        sync();
        api.sfx('bad');
        if (hearts <= 0) { fail(); return; }
        phase = 'demo';
        step = 0;
        sync();
        clearDemo();
        demoTO = later(runDemo, 650);
      }
    }
    function startLevel(n) {
      level = Math.max(1, Math.min(LEVELS.length, n));
      api.clearOverlay();
      api.setScore(0);
      alive = true;
      hearts = 3;
      step = 0;
      phase = 'demo';
      seq = cfg().seq;
      SPEED = cfg().speed;
      clearDemo();
      renderLevels();
      sync();
      runDemo();
    }

    function onKeysClick(e) {
      var kb = e.target.closest ? e.target.closest('[data-key]') : null;
      if (kb) tap(parseInt(kb.getAttribute('data-key'), 10));
    }
    function onLvClick(e) {
      var lvb = e.target.closest ? e.target.closest('.lv-btn') : null;
      if (lvb && !lvb.classList.contains('locked')) {
        var n = parseInt(lvb.getAttribute('data-lv'), 10);
        if (n !== level && n <= unlocked) { api.sfx('click'); startLevel(n); }
      }
    }
    function onKey(e) {
      var k = e.key;
      if (k >= '1' && k <= '5') tap(parseInt(k, 10) - 1);
    }
    keysEl.addEventListener('click', onKeysClick);
    elLevels.addEventListener('click', onLvClick);
    document.addEventListener('keydown', onKey);

    startLevel(1);

    return function () {
      alive = false;
      clearDemo();
      for (var i = 0; i < tos.length; i++) clearTimeout(tos[i]);
      tos = [];
      keysEl.removeEventListener('click', onKeysClick);
      elLevels.removeEventListener('click', onLvClick);
      document.removeEventListener('keydown', onKey);
    };
  }
});
