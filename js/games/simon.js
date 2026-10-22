/* Simon Says — learning */
GamePortal.register('simon', {
  title: 'Simon Says',
  emoji: '🎵',
  cat: 'learning',
  c1: '#2b1055',
  c2: '#7597de',
  tags: ['simon', 'sequence', 'memory', 'learning', 'brain', 'colors'],
  rating: 4.7,
  plays: '1.5M',
  badge: 'Brain boost',
  controls: 'Watch the pads light up, then repeat the sequence by clicking them',
  desc: 'A classic test of working memory: watch the colour sequence grow longer each round, then repeat it exactly. Clear 5 levels — each needs more rounds with faster flashes!',
  play: function (stage, api) {
    var LEVELS = [
      { rounds: 3, interval: 60 },
      { rounds: 5, interval: 55 },
      { rounds: 7, interval: 50 },
      { rounds: 9, interval: 45 },
      { rounds: 11, interval: 40 }
    ];
    var key = 'ph_simon_lvl';
    var unlocked = Math.min(LEVELS.length, Math.max(1, GamePortal.store.get(key, 1)));
    var level = 1;
    var seq = [], input = [], round = 0, showing = false, dead = false;
    var padTimers = [];
    var GOAL = LEVELS[0].rounds;

    var wrap = document.createElement('div');
    wrap.className = 'simon';
    wrap.dataset.level = '1';
    wrap.innerHTML =
      '<div class="lv-strip" id="si-levels"><span class="lv-strip-label">Level</span></div>' +
      '<div class="lv-goal" id="si-goal"></div>' +
      '<div class="simon-info">Round <b id="s-round">0</b> · Sequence length <b id="s-len">0</b> · Best round <b id="s-best">0</b></div>' +
      '<div class="simon-pad-grid" id="s-grid">' +
        '<button class="simon-pad sp0" data-i="0" aria-label="red"></button>' +
        '<button class="simon-pad sp1" data-i="1" aria-label="yellow"></button>' +
        '<button class="simon-pad sp3" data-i="3" aria-label="blue"></button>' +
        '<button class="simon-pad sp2" data-i="2" aria-label="green"></button>' +
      '</div>' +
      '<div class="simon-status" id="s-status">Press Start</div>' +
      '<button class="big-btn" id="s-start">Start ▶</button>';
    stage.appendChild(wrap);

    var grid = wrap.querySelector('#s-grid');
    var status = wrap.querySelector('#s-status');
    var btn = wrap.querySelector('#s-start');
    var elRound = wrap.querySelector('#s-round');
    var elLen = wrap.querySelector('#s-len');
    var elBest = wrap.querySelector('#s-best');
    var elGoal = wrap.querySelector('#si-goal');
    var elLevels = wrap.querySelector('#si-levels');
    var pads = Array.prototype.slice.call(grid.querySelectorAll('.simon-pad'));
    var best = 0;

    var TONES = [329.63, 261.63, 220.0, 164.81];

    function cfg() { return LEVELS[level - 1]; }
    function renderLevels() {
      var html = '<span class="lv-strip-label">Level</span>';
      for (var n = 1; n <= LEVELS.length; n++) {
        var cls = 'lv-btn' + (n === level ? ' on' : '') + (n > unlocked ? ' locked' : '');
        html += '<button type="button" class="' + cls + '" data-lv="' + n + '"' + (n > unlocked ? ' disabled' : '') + '>' + n + '</button>';
      }
      elLevels.innerHTML = html;
      elGoal.textContent = 'Repeat ' + cfg().rounds + ' rounds to clear level ' + level + '!';
      wrap.dataset.level = String(level);
    }

    function lit(i, ms) {
      var p = pads[i];
      p.classList.add('lit');
      GamePortal.sound.tone(TONES[i], (ms || 300) / 1000, 'sine', 0.16);
      padTimers.push(setTimeout(function () { p.classList.remove('lit'); }, ms || 300));
    }

    function addStep() {
      seq.push(Math.floor(Math.random() * 4));
      input = [];
      elRound.textContent = round;
      elLen.textContent = seq.length;
      showSeq();
    }

    function showSeq() {
      showing = true;
      status.textContent = '👀 Watch…';
      btn.disabled = true;
      btn.style.opacity = .4;
      var i = 0;
      var gap = Math.max(360, 700 - (level - 1) * 50 - round * 30);
      var step = function () {
        if (dead) return;
        if (i >= seq.length) {
          showing = false;
          status.textContent = '🎯 Your turn!';
          btn.disabled = false;
          btn.style.opacity = 1;
          btn.textContent = '↻ Restart';
          return;
        }
        lit(seq[i], Math.min(420, gap - 90));
        i++;
        padTimers.push(setTimeout(step, gap));
      };
      padTimers.push(setTimeout(step, 550));
    }

    function levelClear() {
      dead = true;
      if (level > unlocked) { unlocked = level; GamePortal.store.set(key, unlocked); }
      if (level >= LEVELS.length) {
        api.win({
          title: 'Sequence Master! 🎵',
          text: 'All ' + LEVELS.length + ' levels cleared — ' + api.score + ' points!'
        });
        return;
      }
      api.sfx('win');
      api.overlay({
        emoji: '🌟',
        title: 'Level ' + level + ' complete!',
        text: 'Next: repeat ' + LEVELS[level].rounds + ' rounds with faster flashes.',
        score: api.score,
        best: api.getBest(),
        onAgain: function () { api.clearOverlay(); level++; startLevel(level); }
      });
    }

    function press(i) {
      if (showing || dead || !seq.length) return;
      lit(i, 220);
      input.push(i);
      var idx = input.length - 1;
      if (input[idx] !== seq[idx]) {
        dead = true;
        status.textContent = '💥 Missed at step ' + (idx + 1);
        api.sfx('bad');
        best = Math.max(best, round);
        api.gameOver({
          title: 'Sequence broken',
          text: 'Level ' + level + ': you reached round ' + round + ' of ' + GOAL + '.',
          onAgain: function () { api.clearOverlay(); startLevel(level); }
        });
        return;
      }
      if (input.length === seq.length) {
        showing = true;
        api.addScore(round * 50 + 50);
        api.sfx('win');
        status.textContent = '✅ Round complete!';
        round++;
        best = Math.max(best, round);
        elBest.textContent = best;
        if (round > GOAL) {
          padTimers.push(setTimeout(function () { if (!dead) levelClear(); }, 900));
          return;
        }
        padTimers.push(setTimeout(function () { if (!dead) addStep(); }, 900));
      }
    }

    function startLevel(n) {
      level = Math.max(1, Math.min(LEVELS.length, n));
      api.clearOverlay();
      padTimers.forEach(clearTimeout);
      padTimers = [];
      dead = false;
      showing = false;
      seq = [];
      input = [];
      round = 1;
      GOAL = cfg().rounds;
      api.setScore(0);
      status.textContent = '👀 Watch…';
      btn.textContent = '↻ Restart';
      elBest.textContent = best;
      renderLevels();
      addStep();
    }

    grid.addEventListener('click', function (e) {
      var p = e.target.closest('.simon-pad');
      if (p) press(parseInt(p.dataset.i, 10));
    });
    btn.addEventListener('click', function () { GamePortal.sound.play('click'); startLevel(level); });

    elLevels.addEventListener('click', function (e) {
      var b = e.target.closest ? e.target.closest('.lv-btn') : null;
      if (!b || b.disabled) return;
      var n = parseInt(b.getAttribute('data-lv'), 10);
      if (n !== level && n <= unlocked) { api.sfx('click'); startLevel(n); }
    });

    startLevel(1);

    return function () {
      dead = true;
      padTimers.forEach(clearTimeout);
    };
  }
});
