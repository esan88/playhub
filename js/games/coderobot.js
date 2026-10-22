GamePortal.register('coderobot', {
  title: 'Code the Robot',
  emoji: '🤖',
  cat: 'learning',
  c1: '#334155',
  c2: '#22d3ee',
  tags: ['coding', 'robot', 'programming', 'sequence', 'commands', 'algorithm', 'stem', 'logic', 'kids', 'learn', 'steps'],
  rating: 4.9,
  plays: '0.5M',
  badge: 'New',
  controls: 'Build a plan of commands, then press Run to guide the robot to the star!',
  desc: 'Bolt the robot needs a program to reach the golden star! Tap commands — step forward, turn left, turn right — to build his plan, then hit Run and watch him go. Bump a wall and he stops, so edit your code and try again. Five missions from 3 commands to 12.',
  play: function (stage, api) {
    var LEVELS = [
      { cols: 5, rows: 5, start: [4, 0], face: 1, star: [4, 3], rocks: [[0, 0], [1, 4]], sol: 'F,F,F' },
      { cols: 5, rows: 5, start: [4, 1], face: 0, star: [2, 3], rocks: [[1, 1], [3, 2], [0, 4]], sol: 'F,F,R,F,F' },
      { cols: 6, rows: 6, start: [5, 0], face: 1, star: [3, 3], rocks: [[4, 4], [2, 1], [5, 5], [0, 3]], sol: 'F,F,L,F,F,R,F' },
      { cols: 6, rows: 6, start: [0, 4], face: 2, star: [4, 1], rocks: [[1, 1], [3, 3], [0, 0], [5, 5], [2, 5]], sol: 'F,F,R,F,F,F,L,F,F' },
      { cols: 7, rows: 7, start: [6, 6], face: 0, star: [6, 3], rocks: [[4, 5], [1, 1], [5, 0], [2, 3], [0, 6], [4, 1]], sol: 'F,F,F,L,F,F,L,F,F,F,R,F' }
    ];
    var NAMES = { F: '▶ Step', L: '↺ Left', R: '↻ Right' };
    var DR = [-1, 0, 1, 0];
    var DC = [0, 1, 0, -1];
    var key = 'ph_coderobot_lvl';
    var unlocked = Math.min(LEVELS.length, Math.max(1, GamePortal.store.get(key, 1)));
    var level = 1;
    var alive = true;
    var closed = false;

    var style = document.createElement('style');
    style.id = 'coderobot-style';
    style.textContent =
      '.cr-grid{position:relative;display:grid;gap:4px;background:#0f172a;padding:8px;border-radius:14px;max-width:340px;margin:8px auto}' +
      '.cr-cell{background:#1e293b;border-radius:7px;aspect-ratio:1;display:flex;align-items:center;justify-content:center;font-size:19px}' +
      '.cr-robot{position:absolute;z-index:2;pointer-events:none;transition:left .36s linear,top .36s linear;text-align:center}' +
      '.cr-botface{font-size:20px;line-height:1.05}' +
      '.cr-arrow{display:block;font-size:10px;color:#22d3ee;transition:transform .28s}' +
      '.cr-chip{display:inline-block;margin:3px;padding:5px 9px;background:#1e293b;color:#e2e8f0;border-radius:9px;font-size:13px;cursor:pointer;border:1px solid #334155}' +
      '.cr-chip:hover{border-color:#22d3ee}' +
      '.cr-tool{padding:8px 15px;font-size:16px}' +
      '.cr-shake{animation:crShake .3s}' +
      '@keyframes crShake{0%,100%{transform:translateX(0)}25%{transform:translateX(-5px)}75%{transform:translateX(5px)}}' +
      '.cr-got{filter:grayscale(.3) drop-shadow(0 0 6px #fbbf24)}';
    document.head.appendChild(style);

    var wrap = document.createElement('div');
    wrap.className = 'kg jm crg';
    wrap.dataset.level = '1';
    wrap.dataset.cmds = '0';
    wrap.dataset.phase = 'edit';
    wrap.dataset.done = '0';
    wrap.innerHTML =
      '<div class="lv-strip" id="cr-levels"><span class="lv-strip-label">Level</span></div>' +
      '<div class="lv-goal" id="cr-goal"></div>' +
      '<div class="math-top"><span class="math-stat" id="cr-move">🤖 Ready</span>' +
      '<span class="math-stat" id="cr-queueinfo">Plan: 0 / 16</span></div>' +
      '<div id="cr-grid"></div>' +
      '<div id="cr-queue" style="text-align:center;min-height:34px"></div>' +
      '<div id="cr-tools" style="text-align:center;margin-top:4px">' +
      '<button type="button" class="ans-btn cr-tool" data-cmd="F">▶ Step</button> ' +
      '<button type="button" class="ans-btn cr-tool" data-cmd="L">↺ Left</button> ' +
      '<button type="button" class="ans-btn cr-tool" data-cmd="R">↻ Right</button></div>' +
      '<div style="text-align:center;margin-top:8px">' +
      '<button type="button" class="big-btn" id="cr-run" style="padding:9px 30px;margin-right:8px">▶ Run</button>' +
      '<button type="button" class="ans-btn" id="cr-clear" style="padding:9px 18px">Clear</button></div>' +
      '<div class="hint" id="cr-status">Tap commands to plan Bolt\'s path to the ⭐.</div>';
    stage.appendChild(wrap);

    var gridEl = wrap.querySelector('#cr-grid');
    var queueEl = wrap.querySelector('#cr-queue');
    var elMove = wrap.querySelector('#cr-move');
    var elQInfo = wrap.querySelector('#cr-queueinfo');
    var elGoal = wrap.querySelector('#cr-goal');
    var elStatus = wrap.querySelector('#cr-status');
    var elLevels = wrap.querySelector('#cr-levels');
    var elRun = wrap.querySelector('#cr-run');
    var elClear = wrap.querySelector('#cr-clear');
    var queue = [];
    var rr = 0, rc = 0, face = 0, got = false;
    var runTO = null, doneTO = null;

    function cfg() { return LEVELS[level - 1]; }
    function renderStrip() {
      var html = '<span class="lv-strip-label">Level</span>';
      for (var n = 1; n <= LEVELS.length; n++) {
        var cls = 'lv-btn' + (n === level ? ' on' : '') + (n > unlocked ? ' locked' : '');
        html += '<button type="button" class="' + cls + '" data-lv="' + n + '"' + (n > unlocked ? ' disabled' : '') + '>' + n + '</button>';
      }
      elLevels.innerHTML = html;
      wrap.dataset.level = String(level);
    }
    function hud() {
      wrap.dataset.cmds = String(queue.length);
      wrap.dataset.done = got ? '1' : '0';
      elQInfo.textContent = 'Plan: ' + queue.length + ' / 16';
      api.setScore(Math.max(0, (level - 1) * 100 + (got ? 50 : 0)));
    }
    function isRock(r, c) {
      var rocks = cfg().rocks;
      for (var i = 0; i < rocks.length; i++) if (rocks[i][0] === r && rocks[i][1] === c) return true;
      return false;
    }
    function renderGrid() {
      var c = cfg();
      gridEl.innerHTML = '';
      gridEl.setAttribute('data-solution', c.sol);
      gridEl.style.gridTemplateColumns = 'repeat(' + c.cols + ',1fr)';
      var wpc = (340 - 16 - (c.cols - 1) * 4) / c.cols;
      gridEl.style.maxWidth = '340px';
      for (var r = 0; r < c.rows; r++) {
        for (var col = 0; col < c.cols; col++) {
          var cell = document.createElement('div');
          cell.className = 'cr-cell';
          cell.setAttribute('data-r', String(r));
          cell.setAttribute('data-c', String(col));
          if (isRock(r, col)) cell.textContent = '🪨';
          if (r === c.star[0] && col === c.star[1]) { cell.textContent = '⭐'; cell.setAttribute('data-star', '1'); }
          gridEl.appendChild(cell);
        }
      }
      var bot = document.createElement('div');
      bot.className = 'cr-robot';
      bot.id = 'cr-robot';
      bot.innerHTML = '<span class="cr-arrow" id="cr-arrow">▲</span><span class="cr-botface">🤖</span>';
      gridEl.appendChild(bot);
      placeRobot(false);
    }
    function placeRobot(animate) {
      var c = cfg();
      var bot = wrap.querySelector('#cr-robot');
      var arrow = wrap.querySelector('#cr-arrow');
      if (!bot) return;
      if (!animate) bot.style.transition = 'none';
      var olds = gridEl.querySelectorAll('[data-rob]');
      for (var oi = 0; oi < olds.length; oi++) olds[oi].removeAttribute('data-rob');
      bot.style.width = (100 / c.cols) + '%';
      bot.style.height = (100 / c.rows) + '%';
      bot.style.left = (rc * 100 / c.cols) + '%';
      bot.style.top = (rr * 100 / c.rows) + '%';
      if (arrow) arrow.style.transform = 'rotate(' + (face * 90) + 'deg)';
      if (!animate) { void bot.offsetWidth; bot.style.transition = ''; }
      var rb = gridEl.querySelector('[data-r="' + rr + '"][data-c="' + rc + '"]');
      if (rb) rb.setAttribute('data-rob', '1');
    }
    function renderQueue() {
      var html = '';
      for (var i = 0; i < queue.length; i++) {
        html += '<span class="cr-chip" data-rem="' + i + '" title="Tap to remove">' + NAMES[queue[i]] + '</span>';
      }
      queueEl.innerHTML = html;
      hud();
    }
    function setPhase(p) {
      wrap.dataset.phase = p;
      elRun.disabled = (p !== 'edit');
    }
    function status(txt) { elStatus.textContent = txt; elMove.textContent = txt; }
    function finishLevel() {
      if (level > unlocked) { unlocked = level; GamePortal.store.set(key, unlocked); }
      if (level >= LEVELS.length) {
        api.win({
          emoji: '🏁',
          title: 'Junior Coder!',
          text: 'Every mission solved — you think like a programmer!'
        });
        return;
      }
      api.sfx('win');
      api.overlay({
        emoji: '🤖',
        title: 'Level ' + level + ' complete!',
        text: 'Bolt reached the star! Next mission needs a smarter plan.',
        score: api.score,
        best: api.getBest(),
        onAgain: function () { api.clearOverlay(); level++; startLevel(level); }
      });
    }
    function startLevel(n) {
      level = Math.max(1, Math.min(LEVELS.length, n));
      api.clearOverlay();
      api.setScore(0);
      if (runTO) { clearTimeout(runTO); runTO = null; }
      if (doneTO) { clearTimeout(doneTO); doneTO = null; }
      var c = cfg();
      rr = c.start[0]; rc = c.start[1]; face = c.face; got = false;
      queue = [];
      alive = true;
      wrap.dataset.phase = 'edit';
      wrap.dataset.done = '0';
      renderStrip();
      elGoal.textContent = 'Level ' + level + ' — reach the star in ' + c.sol.split(',').length + ' commands!';
      renderGrid();
      renderQueue();
      setPhase('edit');
      status('Tap commands to plan Bolt\'s path to the ⭐.');
    }

    wrap.querySelector('#cr-tools').addEventListener('click', function (e) {
      if (!alive || wrap.dataset.phase !== 'edit') return;
      var b = e.target.closest('[data-cmd]');
      if (!b) return;
      if (queue.length >= 16) { api.sfx('bad'); status('Plan full — remove a command first.'); return; }
      queue.push(b.getAttribute('data-cmd'));
      api.sfx('click');
      renderQueue();
      status('Added ' + NAMES[b.getAttribute('data-cmd')] + ' — ' + queue.length + ' in plan.');
    });
    queueEl.addEventListener('click', function (e) {
      if (!alive || wrap.dataset.phase !== 'edit') return;
      var chip = e.target.closest('[data-rem]');
      if (!chip) return;
      var qi = parseInt(chip.getAttribute('data-rem'), 10);
      queue.splice(qi, 1);
      api.sfx('click');
      renderQueue();
      status('Removed a command — ' + queue.length + ' left.');
    });
    elClear.addEventListener('click', function () {
      if (!alive || wrap.dataset.phase !== 'edit') return;
      queue = [];
      api.sfx('click');
      renderQueue();
      status('Plan cleared — start fresh!');
    });
    elRun.addEventListener('click', function () {
      if (!alive || wrap.dataset.phase !== 'edit') return;
      if (!queue.length) { api.sfx('bad'); status('Add at least one command first!'); return; }
      api.sfx('flip');
      setPhase('run');
      status('🤖 vrooom! Running plan…');
      runStep(0);
    });
    function runStep(i) {
      if (!alive) return;
      if (i >= queue.length) {
        setPhase('edit');
        status(got ? '⭐ Mission complete!' : 'Plan used up — Bolt stopped. Edit and Run again!');
        return;
      }
      runTO = setTimeout(function () {
        if (!alive) return;
        var cmd = queue[i];
        if (cmd === 'L') { face = (face + 3) % 4; placeRobot(true); api.sfx('click'); }
        else if (cmd === 'R') { face = (face + 1) % 4; placeRobot(true); api.sfx('click'); }
        else {
          var nr = rr + DR[face];
          var nc = rc + DC[face];
          var c = cfg();
          var bad = nr < 0 || nr >= c.rows || nc < 0 || nc >= c.cols || isRock(nr, nc);
          if (bad) {
            api.sfx('bad');
            gridEl.classList.remove('cr-shake');
            void gridEl.offsetWidth;
            gridEl.classList.add('cr-shake');
            setPhase('edit');
            status('💥 Wall ahead! Edit your plan and Run again.');
            return;
          }
          rr = nr; rc = nc;
          placeRobot(true);
          api.sfx('pop');
          if (rr === c.star[0] && rc === c.star[1] && !got) {
            got = true;
            var starCell = gridEl.querySelector('[data-star]');
            if (starCell) { starCell.textContent = '🏆'; starCell.setAttribute('data-got', '1'); starCell.classList.add('cr-got'); }
            var bot = wrap.querySelector('#cr-robot');
            if (bot) { bot.style.transition = 'none'; bot.style.transform = 'scale(1.25)'; }
            hud();
            api.sfx('eat');
            setPhase('run');
            status('⭐ Mission complete! Bolt found the star!');
            doneTO = setTimeout(function () {
              if (!alive) return;
              setPhase('done');
              finishLevel();
            }, 700);
            return;
          }
        }
        runStep(i + 1);
      }, 420);
    }
    elLevels.addEventListener('click', function (e) {
      var lvb = e.target.closest('.lv-btn');
      if (lvb && !lvb.classList.contains('locked')) {
        var n = parseInt(lvb.dataset.lv, 10);
        if (n !== level && n <= unlocked) { api.sfx('click'); startLevel(n); }
      }
    });

    startLevel(1);

    return function () {
      alive = false;
      closed = true;
      if (runTO) { clearTimeout(runTO); runTO = null; }
      if (doneTO) { clearTimeout(doneTO); doneTO = null; }
      if (style && style.parentNode) style.parentNode.removeChild(style);
    };
  }
});
