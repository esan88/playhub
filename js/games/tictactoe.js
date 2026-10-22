/* Tic-Tac-Toe vs AI */
GamePortal.register('tictactoe', {
  title: 'Tic-Tac-Toe AI',
  emoji: '⭕',
  cat: 'puzzle',
  c1: '#14532d',
  c2: '#4cc9f0',
  tags: ['tic tac toe', 'noughts', 'crosses', 'ai', 'strategy', 'puzzle', 'xox'],
  rating: 4.4,
  plays: '1.1M',
  badge: 'Puzzle',
  controls: 'Click a cell to place your X · beat each level AI',
  desc: 'Climb 5 levels of AI: from random moves to an unbeatable minimax master. Win to clear each level — draws and losses make you retry it.',
  play: function (stage, api) {
    var LEVELS = [
      { name: 'Random' },
      { name: 'Watcher' },
      { name: 'Blocker' },
      { name: 'Strategist' },
      { name: 'Unbeatable' }
    ];
    var key = 'ph_tictactoe_lvl';
    var unlocked = Math.min(LEVELS.length, Math.max(1, GamePortal.store.get(key, 1)));
    var level = 1;
    var board = Array(9).fill(''), human = 'X', ai = 'O', turn = 'X', over = false;
    var wins = 0, draws = 0, losses = 0, thinking = false, thinkTO = null;

    var wrap = document.createElement('div');
    wrap.className = 'ttt';
    wrap.dataset.level = '1';
    wrap.innerHTML =
      '<div class="lv-strip" id="ttt-levels"><span class="lv-strip-label">Level</span></div>' +
      '<div class="lv-goal" id="ttt-goal"></div>' +
      '<div class="ttt-board" id="t-board"></div>' +
      '<div class="simon-status" id="t-status">Your move — you are X</div>' +
      '<div class="ttt-score">' +
        '<span>Wins <b id="t-w">0</b></span>' +
        '<span>Draws <b id="t-d">0</b></span>' +
        '<span>Losses <b id="t-l">0</b></span>' +
      '</div>';
    stage.appendChild(wrap);

    var boardEl = wrap.querySelector('#t-board');
    var status = wrap.querySelector('#t-status');
    var elW = wrap.querySelector('#t-w'), elD = wrap.querySelector('#t-d'), elL = wrap.querySelector('#t-l');
    var elGoal = wrap.querySelector('#ttt-goal');
    var elLevels = wrap.querySelector('#ttt-levels');

    var LINES = [
      [0,1,2],[3,4,5],[6,7,8],
      [0,3,6],[1,4,7],[2,5,8],
      [0,4,8],[2,4,6]
    ];

    function cfg() { return LEVELS[level - 1]; }
    function renderLevels() {
      var html = '<span class="lv-strip-label">Level</span>';
      for (var n = 1; n <= LEVELS.length; n++) {
        var cls = 'lv-btn' + (n === level ? ' on' : '') + (n > unlocked ? ' locked' : '');
        html += '<button type="button" class="' + cls + '" data-lv="' + n + '"' + (n > unlocked ? ' disabled' : '') + '>' + n + '</button>';
      }
      elLevels.innerHTML = html;
      elGoal.textContent = 'Beat the level ' + level + ' AI (' + cfg().name + ') to clear!';
      wrap.dataset.level = String(level);
    }

    function winner(b) {
      for (var i = 0; i < LINES.length; i++) {
        var l = LINES[i];
        if (b[l[0]] && b[l[0]] === b[l[1]] && b[l[0]] === b[l[2]]) return { p: b[l[0]], line: l };
      }
      if (b.every(function (c) { return c; })) return { p: 'draw', line: null };
      return null;
    }

    function render(winLine) {
      boardEl.innerHTML = board.map(function (c, i) {
        var cls = 'ttt-cell' + (c === 'X' ? ' x' : c === 'O' ? ' o' : '') + (winLine && winLine.indexOf(i) !== -1 ? ' win' : '');
        return '<button class="' + cls + '" data-i="' + i + '">' + (c || '') + '</button>';
      }).join('');
    }

    function minimax(b, me, depth) {
      var w = winner(b);
      if (w) {
        if (w.p === ai) return 10 - depth;
        if (w.p === human) return depth - 10;
        return 0;
      }
      var bestScore = me === ai ? -Infinity : Infinity;
      for (var i = 0; i < 9; i++) {
        if (b[i]) continue;
        b[i] = me;
        var s = minimax(b, me === ai ? human : ai, depth + 1);
        b[i] = '';
        bestScore = me === ai ? Math.max(bestScore, s) : Math.min(bestScore, s);
      }
      return bestScore;
    }

    function bestMove() {
      var empty = board.map(function (c, i) { return c ? -1 : i; }).filter(function (i) { return i >= 0; });
      if (level >= 5) {
        var bs = -Infinity, mv = empty[0];
        empty.forEach(function (i) {
          board[i] = ai;
          var s = minimax(board, human, 0);
          board[i] = '';
          if (s > bs) { bs = s; mv = i; }
        });
        return mv;
      }
      var winsNow = empty.filter(function (i) {
        board[i] = ai; var w = winner(board); board[i] = ''; return !!w && w.p === ai;
      });
      if (level >= 2 && winsNow.length) return winsNow[0];
      if (level >= 3) {
        var blocks = empty.filter(function (i) {
          board[i] = human; var w = winner(board); board[i] = ''; return !!w && w.p === human;
        });
        if (blocks.length) return blocks[0];
      }
      if (level >= 4) {
        if (board[4] === '') return 4;
        var corners = [0, 2, 6, 8].filter(function (i) { return board[i] === ''; });
        if (corners.length) return corners[Math.floor(Math.random() * corners.length)];
      }
      return empty[Math.floor(Math.random() * empty.length)];
    }

    function levelClear() {
      if (level > unlocked) { unlocked = level; GamePortal.store.set(key, unlocked); }
      if (level >= LEVELS.length) {
        api.win({
          title: 'AI Mastered! 🏆',
          text: 'All ' + LEVELS.length + ' levels cleared — ' + api.score + ' points!'
        });
        return;
      }
      api.sfx('win');
      api.overlay({
        emoji: '🏆',
        title: 'Level ' + level + ' complete!',
        text: 'Next: beat the level ' + (level + 1) + ' AI (' + LEVELS[level].name + ').',
        score: api.score,
        best: api.getBest(),
        onAgain: function () { api.clearOverlay(); level++; startLevel(level); }
      });
    }

    function finish(w) {
      over = true;
      render(w.line);
      if (w.p === 'draw') {
        draws++;
        elD.textContent = draws;
        api.addScore(25);
        status.textContent = 'It’s a draw!';
        api.gameOver({
          title: 'Draw on level ' + level,
          text: 'Nobody wins — beat the AI to clear the level.',
          onAgain: function () { api.clearOverlay(); startLevel(level); }
        });
      } else if (w.p === human) {
        wins++;
        elW.textContent = wins;
        api.addScore(75 + 25 * level);
        status.textContent = 'You win!';
        levelClear();
      } else {
        losses++;
        elL.textContent = losses;
        status.textContent = 'AI wins.';
        api.gameOver({
          title: 'The AI wins',
          text: 'Level ' + level + ': block its line and strike back!',
          onAgain: function () { api.clearOverlay(); startLevel(level); }
        });
      }
    }

    function startLevel(n) {
      level = Math.max(1, Math.min(LEVELS.length, n));
      api.clearOverlay();
      if (thinkTO) { clearTimeout(thinkTO); thinkTO = null; }
      board = Array(9).fill('');
      over = false;
      thinking = false;
      turn = 'X';
      api.setScore(0);
      render(null);
      status.textContent = 'Your move — you are X';
      renderLevels();
    }

    function aiMove() {
      thinking = true;
      status.textContent = '🤖 Thinking…';
      if (thinkTO) clearTimeout(thinkTO);
      thinkTO = setTimeout(function () {
        thinkTO = null;
        if (over) return;
        var m = bestMove();
        board[m] = ai;
        thinking = false;
        var w = winner(board);
        render(w && w.line);
        if (w) { finish(w); return; }
        turn = human;
        status.textContent = 'Your move — you are X';
        api.sfx('pop');
      }, 320);
    }

    boardEl.addEventListener('click', function (e) {
      var cell = e.target.closest('.ttt-cell');
      if (!cell || over || thinking || turn !== human) return;
      var i = +cell.dataset.i;
      if (board[i]) return;
      board[i] = human;
      api.sfx('click');
      var w = winner(board);
      render(w && w.line);
      if (w) { finish(w); return; }
      turn = ai;
      aiMove();
    });

    elLevels.addEventListener('click', function (e) {
      var b = e.target.closest ? e.target.closest('.lv-btn') : null;
      if (!b || b.disabled) return;
      var n = parseInt(b.getAttribute('data-lv'), 10);
      if (n !== level && n <= unlocked) { api.sfx('click'); startLevel(n); }
    });

    startLevel(1);

    return function () {
      over = true;
      if (thinkTO) { clearTimeout(thinkTO); thinkTO = null; }
    };
  }
});
