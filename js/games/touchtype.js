/* Touch Typing Tutor — home-row to full-keyboard practice. No timer; accuracy matters. */
GamePortal.register('touchtype', {
  title: 'Touch Typing Tutor',
  emoji: '⌨️',
  cat: 'learning',
  c1: '#0891b2',
  c2: '#fbbf24',
  tags: ['typing', 'tutor', 'keyboard', 'touch typing', 'home row', 'fingers', 'accuracy', 'education', 'learn', 'skills', 'school'],
  rating: 4.8,
  plays: '0.9M',
  badge: 'Learning',
  controls: 'Type the glowing keys — accuracy beats speed!',
  desc: 'Learn touch typing step by step: start on the home row (F and J have bumps!), then top row, bottom row and finally real words. A big on-screen keyboard shows exactly which finger key to press. No clock — just steady practice for ages 6 and up.',
  play: function (stage, api) {
    var LEVELS = [
      { need: 90, lines: ['fff jjj fff jjj fjf jfj', 'ddd kkk ddd kkk dkd kdk', 'dad lad sad fad jak', 'jjf fjj dkd kdk'] },
      { need: 90, lines: ['add sad lad had', 'gash hash gash has', 'flag glad half flash', 'dash gash hash lash'] },
      { need: 88, lines: ['yyy uuu rrr eee', 'quiet type write', 'pretty quite typo', 'quote power wire port'] },
      { need: 88, lines: ['nnn mmm bbb vvv', 'van mix van mix', 'cave zone brave maze', 'move below cube zip'] },
      { need: 85, lines: ['cat dog sun run', 'fun the and you', 'big red hat map', 'jump play love star'] }
    ];
    var GOALS = [
      'Level 1 — home row practice (aim 90% accuracy)!',
      'Level 2 — home row + g,h (aim 90% accuracy)!',
      'Level 3 — top row practice (aim 88% accuracy)!',
      'Level 4 — bottom row practice (aim 88% accuracy)!',
      'Level 5 — easy words (aim 85% accuracy)!'
    ];
    var KB_ROWS = ['qwertyuiop', 'asdfghjkl', 'zxcvbnm'];
    var KB_BG = 'rgba(255,255,255,.12)';
    var key = 'ph_touchtype_lvl';
    var unlocked = Math.min(LEVELS.length, Math.max(1, GamePortal.store.get(key, 1)));
    var level = 1;
    var lineIdx = 0, pos = 0, typed = 0, miss = 0, alive = true;
    var flashTOs = [];

    var wrap = document.createElement('div');
    wrap.className = 'math-wrap';
    wrap.dataset.level = '1';
    wrap.dataset.line = '0';
    wrap.dataset.typed = '0';
    wrap.dataset.miss = '0';
    wrap.dataset.acc = '100';
    wrap.innerHTML =
      '<div class="lv-strip" id="tt-levels"><span class="lv-strip-label">Level</span></div>' +
      '<div class="lv-goal" id="tt-goal"></div>' +
      '<div class="type-stats">' +
        '<span id="tt-stats">Acc 100% · Typed 0</span>' +
        '<span id="tt-miss">❌ 0 misses</span>' +
      '</div>' +
      '<div class="type-word" id="tt-line"></div>' +
      '<div id="tt-kb" style="display:flex;flex-direction:column;gap:5px;align-items:center"></div>' +
      '<div class="hint">F and J have bumps — keep your fingers there!</div>';
    stage.appendChild(wrap);

    var elGoal = wrap.querySelector('#tt-goal');
    var elLevels = wrap.querySelector('#tt-levels');
    var elLine = wrap.querySelector('#tt-line');
    var elStats = wrap.querySelector('#tt-stats');
    var elMiss = wrap.querySelector('#tt-miss');
    var elKb = wrap.querySelector('#tt-kb');

    (function buildKb() {
      var html = '', r, i, row, btn;
      for (r = 0; r < KB_ROWS.length; r++) {
        row = KB_ROWS[r];
        html += '<div style="display:flex;gap:4px;justify-content:center">';
        for (i = 0; i < row.length; i++) {
          btn = row.charAt(i);
          html += '<button type="button" data-k="' + btn + '" style="min-width:34px;height:38px;border-radius:8px;font-weight:800;font-size:15px;color:#fff;background:' + KB_BG + ';border:2px solid rgba(255,255,255,.2);cursor:pointer;padding:0">' + btn + '</button>';
        }
        html += '</div>';
      }
      html += '<div style="display:flex;gap:4px;justify-content:center">' +
        '<button type="button" data-k=" " style="min-width:180px;height:34px;border-radius:8px;font-weight:700;font-size:13px;color:#fff;background:' + KB_BG + ';border:2px solid rgba(255,255,255,.2);cursor:pointer;padding:0">␣ space</button></div>';
      elKb.innerHTML = html;
    })();

    function cfg() { return LEVELS[level - 1]; }
    function drill() { return cfg().lines[lineIdx]; }
    function accNow() {
      return typed + miss === 0 ? 100 : Math.round(typed / (typed + miss) * 100);
    }
    function kbBtn(ch) {
      return elKb.querySelector('button[data-k="' + (ch === ' ' ? ' ' : ch) + '"]');
    }
    function clearHint() {
      var on = elKb.querySelector('button.hint');
      if (on) {
        on.classList.remove('hint');
        on.style.boxShadow = '';
        on.style.borderColor = 'rgba(255,255,255,.2)';
        on.style.background = KB_BG;
      }
    }
    function setHint(ch) {
      clearHint();
      if (!ch) return;
      var b = kbBtn(ch);
      if (b) {
        b.classList.add('hint');
        b.style.boxShadow = '0 0 12px #fbbf24';
        b.style.borderColor = '#fbbf24';
        b.style.background = 'rgba(251,191,36,.25)';
      }
    }
    function flashWrongKb(ch) {
      var b = kbBtn(ch);
      if (!b) return;
      b.style.background = '#ff4d8d';
      var to = setTimeout(function () { b.style.background = KB_BG; }, 180);
      flashTOs.push(to);
    }
    function clearFlashTOs() {
      for (var i = 0; i < flashTOs.length; i++) clearTimeout(flashTOs[i]);
      flashTOs = [];
    }
    function paintSpan(i, cls, color, bg) {
      var sp = elLine.querySelector('span[data-i="' + i + '"]');
      if (!sp) return;
      sp.className = cls || '';
      sp.style.color = color || '';
      sp.style.background = bg || '';
      sp.style.borderRadius = bg ? '4px' : '';
    }
    function highlightPos() {
      var d = drill();
      if (pos < d.length) {
        paintSpan(pos, 'on', '#14162b', '#fbbf24');
        setHint(d.charAt(pos));
      } else clearHint();
    }
    function renderLine() {
      var d = drill(), html = '', i, ch;
      for (i = 0; i < d.length; i++) {
        ch = d.charAt(i);
        html += '<span data-i="' + i + '">' + (ch === ' ' ? '&nbsp;' : ch) + '</span>';
      }
      elLine.innerHTML = html;
      elLine.dataset.drill = d;
      elLine.dataset.pos = '0';
      pos = 0;
      highlightPos();
    }
    function hud() {
      var acc = accNow();
      wrap.dataset.level = String(level);
      wrap.dataset.line = String(lineIdx);
      wrap.dataset.typed = String(typed);
      wrap.dataset.miss = String(miss);
      wrap.dataset.acc = String(acc);
      elStats.textContent = 'Acc ' + acc + '% · Typed ' + typed;
      elMiss.textContent = '❌ ' + miss + ' miss' + (miss === 1 ? '' : 'es');
      api.setScore(Math.max(0, typed * 10 - miss * 5));
    }
    function renderLevels() {
      var html = '<span class="lv-strip-label">Level</span>', n, cls;
      for (n = 1; n <= LEVELS.length; n++) {
        cls = 'lv-btn' + (n === level ? ' on' : '') + (n > unlocked ? ' locked' : '');
        html += '<button type="button" class="' + cls + '" data-lv="' + n + '"' + (n > unlocked ? ' disabled' : '') + '>' + n + '</button>';
      }
      elLevels.innerHTML = html;
      elGoal.textContent = GOALS[level - 1];
      wrap.dataset.level = String(level);
    }
    function finishLevel() {
      if (!alive) return;
      alive = false;
      clearHint();
      var acc = accNow();
      var need = cfg().need;
      if (acc >= need) levelClear(acc);
      else {
        api.gameOver({
          title: '⌨️ Keep practising!',
          text: 'Accuracy ' + acc + '% — need ' + need + '%. Try again!',
          onAgain: function () { api.clearOverlay(); startLevel(level); }
        });
      }
    }
    function levelClear(acc) {
      if (level > unlocked) { unlocked = level; GamePortal.store.set(key, unlocked); }
      if (level >= LEVELS.length) {
        api.win({
          emoji: '🏆',
          title: 'Typing Star!',
          text: 'Your fingers know the whole keyboard!'
        });
        return;
      }
      api.sfx('win');
      api.overlay({
        emoji: '⌨️',
        title: 'Level ' + level + ' complete!',
        text: 'Accuracy ' + acc + '% — next: ' + GOALS[level].replace(/^Level \d+ — /, ''),
        score: api.score,
        best: api.getBest(),
        onAgain: function () { api.clearOverlay(); level++; startLevel(level); }
      });
    }
    function nextLine() {
      lineIdx++;
      if (lineIdx >= cfg().lines.length) { hud(); finishLevel(); return; }
      wrap.dataset.line = String(lineIdx);
      renderLine();
    }
    function handleChar(ch) {
      if (!alive) return;
      var d = drill();
      if (pos >= d.length) return;
      if (ch === d.charAt(pos)) {
        api.sfx('pop');
        paintSpan(pos, 'right', '#4ade80', '');
        typed++;
        pos++;
        elLine.dataset.pos = String(pos);
        if (pos >= d.length) { hud(); nextLine(); return; }
        highlightPos();
      } else {
        api.sfx('bad');
        miss++;
        flashWrongKb(ch);
        paintSpan(pos, 'wrong on', '#ff7b9c', '#fbbf24');
        var to = setTimeout(function () { if (alive) highlightPos(); }, 180);
        flashTOs.push(to);
      }
      hud();
    }
    function startLevel(n) {
      level = Math.max(1, Math.min(LEVELS.length, n));
      api.clearOverlay();
      api.setScore(0);
      typed = 0; miss = 0; lineIdx = 0; pos = 0; alive = true;
      clearFlashTOs();
      renderLevels();
      renderLine();
      hud();
    }

    function onKeyDown(e) {
      if (!alive) return;
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      var k = e.key;
      if (k === ' ') { e.preventDefault(); handleChar(' '); return; }
      if (k && k.length === 1) {
        var ch = k.toLowerCase();
        if (ch >= 'a' && ch <= 'z') { e.preventDefault(); handleChar(ch); }
      }
    }
    document.addEventListener('keydown', onKeyDown, false);

    elKb.addEventListener('click', function (e) {
      var b = e.target.closest ? e.target.closest('button[data-k]') : null;
      if (!b) return;
      handleChar(b.getAttribute('data-k'));
    });
    elLevels.addEventListener('click', function (e) {
      var b = e.target.closest ? e.target.closest('.lv-btn') : null;
      if (!b || b.disabled || b.classList.contains('locked')) return;
      var n = parseInt(b.getAttribute('data-lv'), 10);
      if (n !== level && n <= unlocked) { api.sfx('click'); startLevel(n); }
    });

    startLevel(1);

    return function () {
      alive = false;
      document.removeEventListener('keydown', onKeyDown, false);
      clearFlashTOs();
      clearHint();
    };
  }
});
