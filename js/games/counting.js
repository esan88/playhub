/* Counting Crew — first numbers for little kids */
GamePortal.register('counting', {
  title: 'Counting Crew',
  emoji: '🔢',
  cat: 'kids',
  c1: '#ff6b6b',
  c2: '#ffd93d',
  tags: ['counting', 'numbers', 'kids', 'preschool', 'math', 'learning', 'fun'],
  rating: 4.8,
  plays: '1.1M',
  badge: 'For kids',
  controls: 'Count the objects and tap the right number',
  desc: 'Count stars, fruit, animals and balloons. Friendly rounds that teach numbers 1 to 15 with time bonuses for right answers.',
  play: function (stage, api) {
    var SETS = [
      ['🍎', '🍌', '🍇', '🍓', '🍪'],
      ['⭐', '🎈', '🦋', '🐠', '🚗'],
      ['🌼', '🐝', '🐸', '🚀', '🎁'],
      ['🐱', '🐰', '🐼', '🦁', '🐵'],
      ['🍬', '🧁', '🍭', '🍩', '🍉']
    ];
    var LEVELS = [
      { max: 5, goal: 8 },
      { max: 10, goal: 10 },
      { max: 15, goal: 12 },
      { max: 20, goal: 14 },
      { max: 25, goal: 16 }
    ];
    var key = 'ph_counting_lvl';
    var unlocked = Math.min(LEVELS.length, Math.max(1, GamePortal.store.get(key, 1)));
    var level = 1;
    var ROUND = 75;
    var timeLeft = ROUND, dead = false, lock = false, tick = null;
    var count = 0, correct = 0, streak = 0;

    var wrap = document.createElement('div');
    wrap.className = 'quiz-wrap';
    wrap.dataset.level = '1';
    wrap.innerHTML =
      '<div class="lv-strip" id="cn-levels"><span class="lv-strip-label">Level</span></div>' +
      '<div class="lv-goal" id="cn-goal"></div>' +
      '<div class="quiz-top">' +
        '<span class="math-stat">Level <b id="n-lvl">1</b></span>' +
        '<span class="math-stat">Streak <b id="n-streak">0</b></span>' +
        '<span class="math-stat">Time <b id="n-time">75</b>s</span>' +
      '</div>' +
      '<div class="timer-bar" style="width:min(520px,94%)"><div class="timer-fill" id="n-fill"></div></div>' +
      '<div class="q-card">' +
        '<div class="q-kicker">How many are there?</div>' +
        '<div class="q-count-row" id="n-items"></div>' +
      '</div>' +
      '<div class="ans-grid" id="n-ans"></div>' +
      '<div class="math-fb" id="n-fb"></div>';
    stage.appendChild(wrap);

    var elItems = wrap.querySelector('#n-items');
    var elAns = wrap.querySelector('#n-ans');
    var elFb = wrap.querySelector('#n-fb');
    var elLvl = wrap.querySelector('#n-lvl');
    var elStreak = wrap.querySelector('#n-streak');
    var elTime = wrap.querySelector('#n-time');
    var elFill = wrap.querySelector('#n-fill');
    var elGoal = wrap.querySelector('#cn-goal');
    var elLevels = wrap.querySelector('#cn-levels');

    function rnd(a, b) { return a + Math.floor(Math.random() * (b - a + 1)); }

    function cfg() { return LEVELS[level - 1]; }
    function renderLevels() {
      var html = '<span class="lv-strip-label">Level</span>';
      for (var n = 1; n <= LEVELS.length; n++) {
        var cls = 'lv-btn' + (n === level ? ' on' : '') + (n > unlocked ? ' locked' : '');
        html += '<button type="button" class="' + cls + '" data-lv="' + n + '"' + (n > unlocked ? ' disabled' : '') + '>' + n + '</button>';
      }
      elLevels.innerHTML = html;
      elGoal.textContent = 'Answer ' + cfg().goal + ' correctly to clear level ' + level + '!';
      elLvl.textContent = level;
      wrap.dataset.level = String(level);
    }
    function levelClear() {
      dead = true;
      clearInterval(tick);
      if (level > unlocked) { unlocked = level; GamePortal.store.set(key, unlocked); }
      if (level >= LEVELS.length) {
        api.win({
          title: 'Counting Champ! 🏆',
          text: 'All ' + LEVELS.length + ' levels cleared — ' + api.score + ' points!'
        });
        return;
      }
      api.sfx('win');
      api.overlay({
        title: 'Level ' + level + ' complete!',
        text: 'Next: answer ' + LEVELS[level].goal + ' correctly to clear level ' + (level + 1) + '.',
        score: api.score,
        best: api.getBest(),
        onAgain: function () { api.clearOverlay(); level++; startLevel(level); }
      });
    }
    function startLevel(n) {
      level = Math.max(1, Math.min(LEVELS.length, n));
      api.clearOverlay();
      api.setScore(0);
      timeLeft = ROUND; dead = false; lock = false;
      correct = 0; streak = 0;
      clearInterval(tick);
      elStreak.textContent = '0';
      elTime.textContent = String(ROUND);
      elFill.style.width = '100%';
      renderLevels();
      question();
      tick = setInterval(loop, 100);
    }

    function question() {
      lock = false;
      var set = SETS[rnd(0, SETS.length - 1)];
      var emoji = set[rnd(0, set.length - 1)];
      count = rnd(1, cfg().max);
      elItems.textContent = Array(count + 1).join(emoji);
      elFb.textContent = '';
      elFb.className = 'math-fb';

      var opts = [count];
      var optMax = Math.max(15, cfg().max);
      var guard = 0;
      while (opts.length < 4 && guard++ < 60) {
        var v = count + rnd(-3, 3);
        if (v >= 1 && v <= optMax && opts.indexOf(v) === -1) opts.push(v);
      }
      while (opts.length < 4) {
        var extra = rnd(1, optMax);
        if (opts.indexOf(extra) === -1) opts.push(extra);
      }
      elAns.innerHTML = opts.sort(function () { return Math.random() - 0.5; }).map(function (v) {
        return '<button class="ans-btn" data-v="' + v + '">' + v + '</button>';
      }).join('');
    }

    function answer(v, btn) {
      if (lock || dead) return;
      lock = true;
      var ok = v === count;
      elAns.querySelectorAll('.ans-btn').forEach(function (b) {
        b.disabled = true;
        if (+b.dataset.v === count) b.classList.add('right');
      });

      if (ok) {
        correct++;
        streak++;
        var bonus = 60 + count * 5 + Math.min(90, streak * 10);
        api.addScore(bonus);
        timeLeft = Math.min(ROUND, timeLeft + 2);
        elStreak.textContent = streak;
        elFb.textContent = '✓ Yes! ' + count + ' things — +' + bonus;
        elFb.className = 'math-fb ok';
        api.sfx('good');
        if (correct >= cfg().goal) { levelClear(); return; }
        setTimeout(function () { if (!dead) question(); }, 750);
      } else {
        streak = 0;
        elStreak.textContent = 0;
        btn.classList.add('wrong');
        elFb.textContent = '✗ Count again… there are ' + count;
        elFb.className = 'math-fb no';
        api.sfx('bad');
        setTimeout(function () { if (!dead) question(); }, 1500);
      }
    }

    function loop() {
      if (dead) return;
      timeLeft -= 0.1;
      if (timeLeft <= 0) {
        timeLeft = 0;
        elTime.textContent = '0';
        elFill.style.width = '0%';
        end();
        return;
      }
      elTime.textContent = Math.ceil(timeLeft);
      elFill.style.width = (timeLeft / ROUND * 100) + '%';
    }

    function end() {
      if (dead) return;
      dead = true;
      clearInterval(tick);
      api.gameOver({ title: 'Well done!', text: 'You counted correctly ' + correct + ' times.', onAgain: function () { api.clearOverlay(); startLevel(level); } });
    }

    elAns.addEventListener('click', function (e) {
      var b = e.target.closest('.ans-btn');
      if (b) answer(+b.dataset.v, b);
    });
    elLevels.addEventListener('click', function (e) {
      var b = e.target.closest ? e.target.closest('.lv-btn') : null;
      if (!b || b.disabled) return;
      var n = parseInt(b.getAttribute('data-lv'), 10);
      if (n !== level && n <= unlocked) { api.sfx('click'); startLevel(n); }
    });

    startLevel(1);

    return function () { dead = true; clearInterval(tick); };
  }
});
