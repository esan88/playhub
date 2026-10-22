/* Word Search — find hidden themed words in letter grids. Tap first & last letter of a word. */
GamePortal.register('wordsearch', {
  title: 'Word Search',
  emoji: '🔎',
  cat: 'puzzle',
  c1: '#166534',
  c2: '#fbbf24',
  tags: ['word search', 'words', 'puzzle', 'letters', 'find', 'vocabulary', 'english', 'grid', 'kids', 'reading'],
  rating: 4.7,
  plays: '0.6M',
  badge: 'Puzzle',
  controls: 'Tap the first and last letter of a hidden word!',
  desc: 'Letters hide in every direction! Tap a word\'s first letter, then its last letter, to circle it out — horizontal, vertical or diagonal, forwards or backwards. Five themed grids from Animals to Space.',
  play: function (stage, api) {
    var LEVELS = [
      { size: 8, theme: 'animal', words: ['CAT', 'DOG', 'FISH', 'BIRD', 'LION'], time: 0 },
      { size: 8, theme: 'food', words: ['CAKE', 'MILK', 'BREAD', 'APPLE', 'JUICE', 'RICE'], time: 0 },
      { size: 9, theme: 'school', words: ['BOOK', 'PEN', 'DESK', 'CHAIR', 'BOARD', 'BAG', 'RULER'], time: 180 },
      { size: 10, theme: 'space', words: ['SUN', 'MOON', 'STAR', 'PLANET', 'EARTH', 'COMET', 'ROCKET', 'GALAXY'], time: 150 },
      { size: 10, theme: 'mixed', words: ['TIGER', 'APPLE', 'CLOUD', 'PIANO', 'GREEN', 'HOUSE', 'WATER', 'MAGIC', 'DREAM'], time: 120 }
    ];
    var GOALS = [
      'Level 1 — find 5 hidden animal words!',
      'Level 2 — find 6 hidden food words!',
      'Level 3 — find 7 hidden school words!',
      'Level 4 — find 8 hidden space words!',
      'Level 5 — find 9 hidden mixed words!'
    ];
    var key = 'ph_wordsearch_lvl';
    var unlocked = Math.min(LEVELS.length, Math.max(1, GamePortal.store.get(key, 1)));
    var level = 1;

    var grid = [], placed = [], foundFlags = [], found = 0, total = 0;
    var left = 0, TIME = 0, alive = true, timer = null, sel = null, shakeTO = null;

    var wrap = document.createElement('div');
    wrap.className = 'quiz-wrap';
    wrap.dataset.level = '1';
    wrap.dataset.found = '0';
    wrap.dataset.total = '0';
    wrap.innerHTML =
      '<div class="lv-strip" id="ws-levels"><span class="lv-strip-label">Level</span></div>' +
      '<div class="lv-goal" id="ws-goal"></div>' +
      '<div class="math-top">' +
        '<span class="math-stat" id="ws-prog">Found 0 / 0</span>' +
      '</div>' +
      '<div class="timer-bar" id="ws-time" style="display:none"><div class="timer-fill"></div></div>' +
      '<div id="ws-grid" style="display:grid;gap:3px;width:min(430px,96%);background:rgba(255,255,255,.07);padding:7px;border-radius:14px"></div>' +
      '<div class="fs-opt" id="ws-list" style="display:flex;flex-wrap:wrap;gap:8px;justify-content:center;background:transparent;border:none;padding:0;cursor:default"></div>';
    stage.appendChild(wrap);

    var elGoal = wrap.querySelector('#ws-goal');
    var elLevels = wrap.querySelector('#ws-levels');
    var elGrid = wrap.querySelector('#ws-grid');
    var elList = wrap.querySelector('#ws-list');
    var elProg = wrap.querySelector('#ws-prog');
    var elTime = wrap.querySelector('#ws-time');
    var elFill = wrap.querySelector('.timer-fill');

    function cfg() { return LEVELS[level - 1]; }
    function cellBtn(r, c) { return elGrid.querySelector('button[data-r="' + r + '"][data-c="' + c + '"]'); }

    function tryPlace(g, word, dirs, size) {
      var tries, i, d, r, c, er, ec, ok, rr, cc, cells;
      for (tries = 0; tries < 250; tries++) {
        d = dirs[Math.floor(Math.random() * dirs.length)];
        r = Math.floor(Math.random() * size);
        c = Math.floor(Math.random() * size);
        er = r + d[0] * (word.length - 1);
        ec = c + d[1] * (word.length - 1);
        if (er < 0 || er >= size || ec < 0 || ec >= size) continue;
        ok = true;
        for (i = 0; i < word.length; i++) {
          rr = r + d[0] * i; cc = c + d[1] * i;
          if (g[rr][cc] && g[rr][cc] !== word.charAt(i)) { ok = false; break; }
        }
        if (!ok) continue;
        cells = [];
        for (i = 0; i < word.length; i++) {
          rr = r + d[0] * i; cc = c + d[1] * i;
          g[rr][cc] = word.charAt(i);
          cells.push(rr + ',' + cc);
        }
        return cells;
      }
      return null;
    }
    function buildGrid(size, words, lv) {
      var dirsFwd = [[0, 1], [1, 0], [1, 1]];
      var dirsAll = [[0, 1], [0, -1], [1, 0], [-1, 0], [1, 1], [1, -1], [-1, 1], [-1, -1]];
      var dirsBack = [[0, -1], [-1, 0], [1, -1], [-1, -1], [-1, 1]];
      var letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      var attempt, r, c, i, w, dirs, p, g, ps, ok;
      for (attempt = 0; attempt < 80; attempt++) {
        g = [];
        for (r = 0; r < size; r++) {
          g[r] = [];
          for (c = 0; c < size; c++) g[r][c] = '';
        }
        ps = [];
        ok = true;
        for (i = 0; i < words.length; i++) {
          w = words[i];
          dirs = lv >= 3 ? dirsAll : dirsFwd;
          if (lv === 5 && (i === 2 || i === 5 || i === 7)) dirs = dirsBack;
          p = tryPlace(g, w, dirs, size);
          if (!p) { ok = false; break; }
          ps.push({ word: w, cells: p });
        }
        if (!ok) continue;
        for (r = 0; r < size; r++) {
          for (c = 0; c < size; c++) {
            if (!g[r][c]) g[r][c] = letters.charAt(Math.floor(Math.random() * 26));
          }
        }
        return { g: g, placed: ps };
      }
      return null;
    }
    function sameSeq(a, b) {
      if (a.length !== b.length) return false;
      for (var i = 0; i < a.length; i++) if (a[i] !== b[i]) return false;
      return true;
    }
    function renderGrid() {
      var size = cfg().size, html = '', r, c;
      elGrid.style.gridTemplateColumns = 'repeat(' + size + ',1fr)';
      for (r = 0; r < size; r++) {
        for (c = 0; c < size; c++) {
          html += '<button type="button" data-r="' + r + '" data-c="' + c + '" style="aspect-ratio:1;display:grid;place-items:center;border-radius:8px;background:rgba(255,255,255,.1);border:2px solid rgba(255,255,255,.18);font-weight:800;font-size:clamp(13px,3.2vw,19px);color:#fff;cursor:pointer;padding:0">' + grid[r][c] + '</button>';
        }
      }
      elGrid.innerHTML = html;
    }
    function renderList() {
      var html = '', i, pl;
      for (i = 0; i < placed.length; i++) {
        pl = placed[i];
        html += '<button type="button" class="fs-opt" data-word="' + pl.word + '" data-cells="' + pl.cells[0] + ',' + pl.cells[pl.cells.length - 1] + '" style="cursor:pointer">' + pl.word + '</button>';
      }
      elList.innerHTML = html;
    }
    function hud() {
      elProg.textContent = 'Found ' + found + ' / ' + total;
      wrap.dataset.level = String(level);
      wrap.dataset.found = String(found);
      wrap.dataset.total = String(total);
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
    function stopTimer() { if (timer) { clearInterval(timer); timer = null; } }
    function startTimer() {
      stopTimer();
      if (!cfg().time) { elTime.style.display = 'none'; return; }
      elTime.style.display = '';
      TIME = cfg().time;
      left = TIME;
      elFill.style.width = '100%';
      timer = setInterval(function () {
        if (!alive) return;
        left--;
        elFill.style.width = Math.max(0, (left / TIME) * 100) + '%';
        if (left <= 0) {
          alive = false;
          stopTimer();
          api.gameOver({
            title: '⏰ Time up!',
            text: 'You found ' + found + ' of ' + total + ' words — try again!',
            onAgain: function () { api.clearOverlay(); startLevel(level); }
          });
        }
      }, 1000);
    }
    function levelClear() {
      alive = false;
      stopTimer();
      api.addScore(Math.max(0, left));
      if (level > unlocked) { unlocked = level; GamePortal.store.set(key, unlocked); }
      if (level >= LEVELS.length) {
        api.win({
          emoji: '🏆',
          title: 'Word Explorer!',
          text: 'You found every hidden word!'
        });
        return;
      }
      api.sfx('win');
      api.overlay({
        emoji: '🔎',
        title: 'Level ' + level + ' complete!',
        text: 'All ' + total + ' words found! Next: ' + GOALS[level].replace(/^Level \d+ — /, ''),
        score: api.score,
        best: api.getBest(),
        onAgain: function () { api.clearOverlay(); level++; startLevel(level); }
      });
    }
    function startLevel(n) {
      level = Math.max(1, Math.min(LEVELS.length, n));
      api.clearOverlay();
      api.setScore(0);
      found = 0;
      sel = null;
      alive = true;
      var built = buildGrid(cfg().size, cfg().words, level);
      grid = built.g;
      placed = built.placed;
      foundFlags = [];
      for (var i = 0; i < placed.length; i++) foundFlags.push(false);
      total = placed.length;
      renderLevels();
      renderGrid();
      renderList();
      hud();
      startTimer();
    }
    function clearSel() {
      if (sel) { sel.el.style.background = ''; sel.el.style.color = ''; sel = null; }
    }
    function shake() {
      elGrid.classList.remove('shake');
      void elGrid.offsetWidth;
      elGrid.classList.add('shake');
      if (shakeTO) clearTimeout(shakeTO);
      shakeTO = setTimeout(function () { elGrid.classList.remove('shake'); }, 400);
    }
    function tryMatch(a, b) {
      var dr = b.r - a.r, dc = b.c - a.c;
      var straight = (dr === 0 && dc !== 0) || (dc === 0 && dr !== 0) || (Math.abs(dr) === Math.abs(dc));
      if (!straight) { api.sfx('bad'); shake(); return; }
      var len = Math.max(Math.abs(dr), Math.abs(dc));
      var sr = dr === 0 ? 0 : (dr > 0 ? 1 : -1);
      var sc = dc === 0 ? 0 : (dc > 0 ? 1 : -1);
      var seq = [], i, j;
      for (i = 0; i <= len; i++) seq.push((a.r + sr * i) + ',' + (a.c + sc * i));
      var matched = -1, rev;
      for (i = 0; i < placed.length; i++) {
        if (foundFlags[i]) continue;
        rev = placed[i].cells.slice().reverse();
        if (sameSeq(seq, placed[i].cells) || sameSeq(seq, rev)) { matched = i; break; }
      }
      if (matched === -1) { api.sfx('bad'); shake(); return; }
      foundFlags[matched] = true;
      var cells = placed[matched].cells, btn;
      for (i = 0; i < cells.length; i++) {
        j = cells[i].split(',');
        btn = cellBtn(j[0], j[1]);
        if (btn) { btn.style.background = '#12b981'; btn.style.borderColor = '#eafff5'; }
      }
      var wb = elList.querySelector('button[data-word="' + placed[matched].word + '"]');
      if (wb) {
        wb.setAttribute('data-found', '1');
        wb.style.opacity = '.45';
        wb.style.textDecoration = 'line-through';
      }
      found++;
      api.addScore(20);
      api.sfx('good');
      hud();
      if (found >= total) levelClear();
    }

    elGrid.addEventListener('click', function (e) {
      if (!alive) return;
      var b = e.target.closest ? e.target.closest('button[data-r]') : null;
      if (!b) return;
      var r = parseInt(b.getAttribute('data-r'), 10);
      var c = parseInt(b.getAttribute('data-c'), 10);
      if (!sel) {
        sel = { r: r, c: c, el: b };
        b.style.background = '#fbbf24';
        b.style.color = '#14162b';
        api.sfx('click');
        return;
      }
      if (sel.r === r && sel.c === c) { clearSel(); return; }
      var a = sel;
      clearSel();
      tryMatch(a, { r: r, c: c });
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
      stopTimer();
      if (shakeTO) { clearTimeout(shakeTO); shakeTO = null; }
    };
  }
});
