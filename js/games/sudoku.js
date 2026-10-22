/* Kids Sudoku — small friendly logic grids: 4×4 with 1-4, then 6×6 with 1-6.
   Pass-only puzzle (no timer, no fail): fill every row, box and column with no repeats. */
GamePortal.register('sudoku', {
  title: 'Kids Sudoku',
  emoji: '🔢',
  cat: 'puzzle',
  c1: '#1d4ed8',
  c2: '#fbbf24',
  tags: ['sudoku', 'numbers', 'puzzle', 'logic', 'brain', 'grid', 'kids', 'math', 'thinking', 'education'],
  rating: 4.8,
  plays: '0.4M',
  badge: 'Brain boost',
  controls: 'Tap an empty square, then tap a number — fill every row, box and column!',
  desc: 'Classic sudoku made small and friendly! Fill the 4×4 grids with numbers 1 to 4, then try bigger 6×6 grids with 1 to 6. Every row, column and coloured box needs each number exactly once — no repeats allowed!',
  play: function (stage, api) {
    /* rows = authored puzzle (0 = empty), sol = its unique solution (oracle for data-need).
       Uniqueness of every puzzle verified with a backtracking solver. */
    var LEVELS = [
      { goal: 'Level 1 — fill the 4×4 grid with numbers 1 to 4!', size: 4, rows: ['0020', '0014', '0340', '4000'], sol: ['1423', '3214', '2341', '4132'] },
      { goal: 'Level 2 — fill the 4×4 grid with numbers 1 to 4!', size: 4, rows: ['0000', '4120', '0000', '0410'], sol: ['2341', '4123', '1234', '3412'] },
      { goal: 'Level 3 — fill the 4×4 grid with numbers 1 to 4!', size: 4, rows: ['0004', '0010', '0300', '0020'], sol: ['1234', '3412', '2341', '4123'] },
      { goal: 'Level 4 — fill the 6×6 grid with numbers 1 to 6!', size: 6, rows: ['100200', '000000', '005001', '000040', '060000', '530104'], sol: ['154236', '623415', '345621', '216543', '461352', '532164'] },
      { goal: 'Level 5 — fill the 6×6 grid with numbers 1 to 6!', size: 6, rows: ['060000', '050400', '001000', '000600', '002010', '000050'], sol: ['264135', '153462', '621543', '435621', '542316', '316254'] }
    ];
    var GIVENS = [6, 5, 4, 10, 8];
    var BG = 'rgba(255,255,255,.10)';
    var RED = '#ff4d8d';
    var key = 'ph_sudoku_lvl';
    var unlocked = Math.min(LEVELS.length, Math.max(1, GamePortal.store.get(key, 1)));
    var level = 1;

    var wrap = document.createElement('div');
    wrap.className = 'kg jm';
    wrap.dataset.level = '1';
    wrap.dataset.filled = '0';
    wrap.dataset.size = '4';
    wrap.innerHTML =
      '<div class="lv-strip" id="sd-levels"><span class="lv-strip-label">Level</span></div>' +
      '<div class="lv-goal" id="sd-goal"></div>' +
      '<div class="math-top"><span class="math-stat" id="sd-prog">Filled 0 / 16</span></div>' +
      '<div id="sd-grid"></div>' +
      '<div class="kg-ctl" id="sd-pad" style="flex-wrap:wrap;justify-content:center"></div>' +
      '<div class="hint" id="sd-hint">Tap an empty square, then tap a number</div>';
    stage.appendChild(wrap);

    var elLevels = wrap.querySelector('#sd-levels');
    var elGoal = wrap.querySelector('#sd-goal');
    var elProg = wrap.querySelector('#sd-prog');
    var elHint = wrap.querySelector('#sd-hint');
    var grid = wrap.querySelector('#sd-grid');
    var pad = wrap.querySelector('#sd-pad');

    var board = [], sel = null, over = false, wrongCount = 0, filled = 0;

    function cfg() { return LEVELS[level - 1]; }
    function boxOf(r, c) {
      if (cfg().size === 4) return Math.floor(r / 2) * 2 + Math.floor(c / 2);
      return Math.floor(r / 2) * 2 + Math.floor(c / 3);
    }
    function isGiven(r, c) { return board[r][c].getAttribute('data-given') === '1'; }

    function renderLevels() {
      var html = '<span class="lv-strip-label">Level</span>';
      for (var n = 1; n <= LEVELS.length; n++) {
        var cls = 'lv-btn' + (n === level ? ' on' : '') + (n > unlocked ? ' locked' : '');
        html += '<button type="button" class="' + cls + '" data-lv="' + n + '"' + (n > unlocked ? ' disabled' : '') + '>' + n + '</button>';
      }
      elLevels.innerHTML = html;
      elGoal.textContent = cfg().goal;
      wrap.dataset.level = String(level);
    }

    function buildGrid() {
      var N = cfg().size;
      var boxW = N === 4 ? 2 : 3;
      var r, c, d, b;
      sel = null;
      board = [];
      grid.innerHTML = '';
      grid.style.display = 'grid';
      grid.style.gridTemplateColumns = 'repeat(' + N + ',1fr)';
      grid.style.gap = '4px';
      grid.style.padding = '6px';
      grid.style.borderRadius = '16px';
      grid.style.background = 'rgba(255,255,255,.10)';
      grid.style.width = 'min(' + (N === 4 ? '330px' : '360px') + ', 96%)';
      for (r = 0; r < N; r++) {
        board[r] = [];
        for (c = 0; c < N; c++) {
          d = cfg().rows[r].charAt(c);
          b = document.createElement('button');
          b.type = 'button';
          b.setAttribute('data-r', String(r));
          b.setAttribute('data-c', String(c));
          b.style.boxSizing = 'border-box';
          b.style.aspectRatio = '1';
          b.style.borderRadius = '9px';
          b.style.display = 'flex';
          b.style.alignItems = 'center';
          b.style.justifyContent = 'center';
          b.style.fontWeight = '800';
          b.style.fontSize = N === 4 ? '26px' : '20px';
          b.style.color = '#fff';
          b.style.background = BG;
          b.style.border = '2px solid rgba(255,255,255,.22)';
          if (c > 0 && c % boxW === 0) b.style.borderLeft = '3px solid rgba(255,255,255,.55)';
          if (r > 0 && r % 2 === 0) b.style.borderTop = '3px solid rgba(255,255,255,.55)';
          if (d === '0') {
            b.setAttribute('data-need', cfg().sol[r].charAt(c));
            b.textContent = '';
          } else {
            b.className = 'hint';
            b.setAttribute('data-given', '1');
            b.textContent = d;
            b.style.background = '#ffd166';
            b.style.color = '#3b2a00';
            b.style.borderColor = '#fff';
            b.style.fontWeight = '900';
          }
          grid.appendChild(b);
          board[r][c] = b;
        }
      }
    }

    function buildPad() {
      var N = cfg().size, html = '', n;
      for (n = 1; n <= N; n++) html += '<button type="button" data-n="' + n + '">' + n + '</button>';
      html += '<button type="button" data-n="0" id="sd-erase">🧽 Erase</button>';
      pad.innerHTML = html;
    }

    function setWrong(r, c, on) {
      var cell = board[r][c];
      if (isGiven(r, c)) return;
      if (on) {
        cell.classList.add('wrong');
        cell.style.background = RED;
        cell.style.borderColor = '#fff';
      } else {
        cell.classList.remove('wrong');
        cell.style.background = BG;
      }
    }

    /* live duplicate check: a non-given cell turns red when its value repeats in its row, column or box */
    function checkWrong() {
      var N = cfg().size, r, c, i, v, k, seen, list;
      var pairs = {};
      var wrong = 0;
      for (r = 0; r < N; r++) for (c = 0; c < N; c++) setWrong(r, c, false);

      for (r = 0; r < N; r++) {
        seen = {};
        for (c = 0; c < N; c++) {
          v = board[r][c].textContent;
          if (v) (seen[v] = seen[v] || []).push([r, c]);
        }
        for (k in seen) {
          if (seen.hasOwnProperty(k) && seen[k].length > 1) {
            for (i = 0; i < seen[k].length; i++) setWrong(seen[k][i][0], seen[k][i][1], true);
          }
        }
      }
      for (c = 0; c < N; c++) {
        seen = {};
        for (r = 0; r < N; r++) {
          v = board[r][c].textContent;
          if (v) (seen[v] = seen[v] || []).push([r, c]);
        }
        for (k in seen) {
          if (seen.hasOwnProperty(k) && seen[k].length > 1) {
            for (i = 0; i < seen[k].length; i++) setWrong(seen[k][i][0], seen[k][i][1], true);
          }
        }
      }
      for (r = 0; r < N; r++) {
        for (c = 0; c < N; c++) {
          v = board[r][c].textContent;
          if (!v) continue;
          list = boxOf(r, c) + '|' + v;
          (pairs[list] = pairs[list] || []).push([r, c]);
        }
      }
      for (k in pairs) {
        if (pairs.hasOwnProperty(k) && pairs[k].length > 1) {
          for (i = 0; i < pairs[k].length; i++) setWrong(pairs[k][i][0], pairs[k][i][1], true);
        }
      }
      for (r = 0; r < N; r++) for (c = 0; c < N; c++) if (board[r][c].classList.contains('wrong')) wrong++;
      wrongCount = wrong;
    }

    function updateProgress() {
      var N = cfg().size, r, c, count = 0;
      for (r = 0; r < N; r++) for (c = 0; c < N; c++) if (board[r][c].textContent) count++;
      filled = count;
      wrap.dataset.filled = String(filled);
      wrap.dataset.size = String(N);
      elProg.textContent = 'Filled ' + filled + ' / ' + (N * N);
    }

    function select(cell) {
      if (sel && sel !== cell) { sel.style.outline = ''; sel.style.outlineOffset = ''; }
      sel = cell;
      cell.style.outline = '3px solid #ffd166';
      cell.style.outlineOffset = '1px';
      api.sfx('click');
    }

    function onCell(e) {
      if (over) return;
      var b = e.target.closest ? e.target.closest('button') : null;
      if (!b || b.getAttribute('data-r') === null) return;
      if (b.getAttribute('data-given') === '1') { api.sfx('click'); return; }
      if (b === sel) return;
      select(b);
    }

    function onPad(e) {
      if (over) return;
      var b = e.target.closest ? e.target.closest('button') : null;
      if (!b || b.getAttribute('data-n') === null) return;
      var n = parseInt(b.getAttribute('data-n'), 10);
      if (!sel) {
        elHint.textContent = 'Tap an empty square first, then tap a number!';
        api.sfx('click');
        return;
      }
      var N = cfg().size;
      var before = filled;
      if (n === 0) {
        if (!sel.textContent) return;
        sel.textContent = '';
        api.sfx('pop');
      } else {
        sel.textContent = String(n);
        api.sfx('pop');
      }
      updateProgress();
      if (filled > before) api.addScore(2);
      checkWrong();
      if (filled === N * N && wrongCount === 0) levelClear();
    }

    function onStrip(e) {
      var lvb = e.target.closest ? e.target.closest('.lv-btn') : null;
      if (lvb && !lvb.classList.contains('locked')) {
        var n = parseInt(lvb.getAttribute('data-lv'), 10);
        if (n !== level && n <= unlocked) { api.sfx('click'); startLevel(n); }
      }
    }

    function levelClear() {
      over = true;
      if (level > unlocked) { unlocked = level; GamePortal.store.set(key, unlocked); }
      api.addScore(100);
      if (level >= LEVELS.length) {
        api.win({ emoji: '🧠', title: 'Sudoku Star!', text: 'Every row, box and column complete!' });
        return;
      }
      api.sfx('win');
      api.overlay({
        emoji: '⭐',
        title: 'Level ' + level + ' complete!',
        text: 'Next: ' + LEVELS[level].goal,
        score: api.score,
        best: api.getBest(),
        onAgain: function () { api.clearOverlay(); level++; startLevel(level); }
      });
    }

    function startLevel(n) {
      level = Math.max(1, Math.min(LEVELS.length, n));
      api.clearOverlay();
      api.setScore(0);
      over = false;
      wrongCount = 0;
      renderLevels();
      buildGrid();
      buildPad();
      updateProgress();
      checkWrong();
      elHint.textContent = 'Tap an empty square, then tap a number';
      elHint.title = GIVENS[level - 1] + ' given numbers';
    }

    grid.addEventListener('click', onCell);
    pad.addEventListener('click', onPad);
    elLevels.addEventListener('click', onStrip);

    startLevel(1);

    return function () {
      over = true;
      grid.removeEventListener('click', onCell);
      pad.removeEventListener('click', onPad);
      elLevels.removeEventListener('click', onStrip);
    };
  }
});
