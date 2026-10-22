/* Typing Rush — learning */
GamePortal.register('typing', {
  title: 'Typing Rush',
  emoji: '⌨️',
  cat: 'learning',
  c1: '#141e30',
  c2: '#7b5cff',
  tags: ['typing', 'keyboard', 'words', 'learning', 'english', 'education'],
  rating: 4.8,
  plays: '1.9M',
  badge: 'Learning',
  controls: 'Type the word shown and press Space · Shift+Space skips',
  desc: 'Race the clock while typing real words. Builds keyboard fluency, spelling and focus — one word at a time.',
  play: function (stage, api) {
    var WORDS = [
      'cat','dog','sun','run','big','red','fun','jump','play','star','fish','bird','cake','milk','tree','frog','king','lamp','moon','rain',
      'apple','bread','chair','dance','earth','grape','house','juice','knife','lemon','music','night','ocean','piano','queen','river','sheep','table','tiger','uncle','violet','water','zebra','world','smart','light','happy','dream','cloud',
      'banana','garden','monkey','puzzle','rocket','silver','tablet','window','yellow','guitar','jungle','kitchen','lantern','mountain','nomad','orange','planet','quartz','rabbit','spider','thunder','unicorn','violet','whisper','xylophone','yogurt',
      'adventure','butterfly','chocolate','dinosaur','elephant','fantastic','hamburger','important','knowledge','labyrinth','mysterious','navigation','observatory','paragraph','quickly','remarkable','satellite','treasure','universe','velocity','wonderful'
    ];
    var LEVELS = [
      { goal: 10, time: 60 },
      { goal: 14, time: 80 },
      { goal: 18, time: 100 },
      { goal: 22, time: 120 },
      { goal: 26, time: 140 }
    ];
    var key = 'ph_typing_lvl';
    var unlocked = Math.min(LEVELS.length, Math.max(1, GamePortal.store.get(key, 1)));
    var level = 1;

    var TIME = LEVELS[0].time, GOAL = LEVELS[0].goal;
    var timeLeft = TIME, typed = 0, hits = 0, misses = 0, streak = 0, dead = false, word = '';
    var tick = null, startTime = 0;

    var wrap = document.createElement('div');
    wrap.className = 'type-wrap';
    wrap.dataset.level = '1';
    wrap.innerHTML =
      '<div class="lv-strip" id="ty-levels"><span class="lv-strip-label">Level</span></div>' +
      '<div class="lv-goal" id="ty-goal"></div>' +
      '<div class="type-stats">' +
        '<span>Words <b id="t-words">0</b></span>' +
        '<span>Streak <b id="t-streak">0</b></span>' +
        '<span>WPM <b id="t-wpm">0</b></span>' +
        '<span>Time <b id="t-time">60</b>s</span>' +
      '</div>' +
      '<div class="timer-bar" style="width:min(460px,92%)"><div class="timer-fill" id="t-fill"></div></div>' +
      '<div class="type-word" id="t-word"></div>' +
      '<input class="type-input" id="t-input" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="type here…" aria-label="Type the word">' +
      '<div class="type-stats"><span>Level <b id="t-lvl">1</b></span><span>Accuracy <b id="t-acc">100%</b></span></div>' +
      '<div class="hint">Press Space to submit · Shift+Space to skip</div>';
    stage.appendChild(wrap);

    var elWord = wrap.querySelector('#t-word');
    var elInput = wrap.querySelector('#t-input');
    var elWords = wrap.querySelector('#t-words');
    var elStreak = wrap.querySelector('#t-streak');
    var elWpm = wrap.querySelector('#t-wpm');
    var elTime = wrap.querySelector('#t-time');
    var elFill = wrap.querySelector('#t-fill');
    var elLvl = wrap.querySelector('#t-lvl');
    var elAcc = wrap.querySelector('#t-acc');
    var elGoal = wrap.querySelector('#ty-goal');
    var elLevels = wrap.querySelector('#ty-levels');

    function cfg() { return LEVELS[level - 1]; }
    function renderLevels() {
      var html = '<span class="lv-strip-label">Level</span>';
      for (var n = 1; n <= LEVELS.length; n++) {
        var cls = 'lv-btn' + (n === level ? ' on' : '') + (n > unlocked ? ' locked' : '');
        html += '<button type="button" class="' + cls + '" data-lv="' + n + '"' + (n > unlocked ? ' disabled' : '') + '>' + n + '</button>';
      }
      elLevels.innerHTML = html;
      elGoal.textContent = 'Type ' + cfg().goal + ' correct words to clear level ' + level + '!';
      elLvl.textContent = String(level);
      wrap.dataset.level = String(level);
    }

    function pickWord() {
      var lvl = level;
      var pool = WORDS.filter(function (w) {
        if (lvl === 1) return w.length <= 4;
        if (lvl === 2) return w.length >= 4 && w.length <= 6;
        if (lvl === 3) return w.length >= 5 && w.length <= 7;
        if (lvl === 4) return w.length >= 6 && w.length <= 9;
        return w.length >= 8;
      });
      if (!pool.length) pool = WORDS;
      var w;
      do { w = pool[Math.floor(Math.random() * pool.length)]; } while (w === word && pool.length > 1);
      word = w;
      elLvl.textContent = lvl;
      renderWord(elInput.value);
    }

    function renderWord(val) {
      var html = '';
      for (var i = 0; i < word.length; i++) {
        var ch = word[i];
        if (i < val.length) html += '<span class="' + (val[i].toLowerCase() === ch ? 'done' : 'bad') + '">' + ch + '</span>';
        else html += '<span>' + ch + '</span>';
      }
      elWord.innerHTML = html;
    }

    function stats() {
      var acc = typed + misses === 0 ? 100 : Math.round(hits / (hits + misses) * 100);
      elAcc.textContent = acc + '%';
      var mins = Math.max((Date.now() - startTime) / 60000, 1 / 60);
      elWpm.textContent = Math.round(typed / mins);
      elWords.textContent = typed;
      elStreak.textContent = streak;
    }

    function submit() {
      if (dead) return;
      var val = elInput.value.trim().toLowerCase();
      if (!val) return;
      typed++;
      var goalHit = false;
      if (val === word) {
        hits++;
        streak++;
        var bonus = Math.round((word.length * 10) * (1 + Math.min(2, streak * 0.1)));
        api.addScore(bonus);
        api.sfx('good');
        flash('#4ade80');
        goalHit = hits >= GOAL;
      } else {
        misses++;
        streak = 0;
        api.sfx('bad');
        flash('#ff7b9c');
      }
      elInput.value = '';
      stats();
      if (goalHit) { levelClear(); return; }
      pickWord();
    }

    function flash(color) {
      elWord.style.transition = 'none';
      elWord.style.color = color;
      setTimeout(function () {
        elWord.style.transition = 'color .5s';
        elWord.style.color = '';
      }, 180);
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
      elFill.style.width = (timeLeft / TIME * 100) + '%';
      stats();
    }

    function end() {
      if (dead) return;
      dead = true;
      clearInterval(tick);
      var acc = hits + misses === 0 ? 0 : Math.round(hits / (hits + misses) * 100);
      api.gameOver({
        title: 'Time up!',
        text: typed + ' words · ' + acc + '% accuracy · keep practising!',
        onAgain: function () { api.clearOverlay(); startLevel(level); }
      });
    }

    function levelClear() {
      dead = true;
      clearInterval(tick);
      if (level > unlocked) { unlocked = level; GamePortal.store.set(key, unlocked); }
      if (level >= LEVELS.length) {
        api.win({
          title: 'Typing Champion! 🏆',
          text: 'All ' + LEVELS.length + ' levels cleared — ' + api.score + ' points!'
        });
        return;
      }
      api.sfx('win');
      api.overlay({
        emoji: '⌨️',
        title: 'Level ' + level + ' complete!',
        text: 'Next: type ' + LEVELS[level].goal + ' correct words.',
        score: api.score,
        best: api.getBest(),
        onAgain: function () { api.clearOverlay(); level++; startLevel(level); }
      });
    }

    function startLevel(n) {
      level = Math.max(1, Math.min(LEVELS.length, n));
      api.clearOverlay();
      api.setScore(0);
      if (tick) { clearInterval(tick); tick = null; }
      typed = 0; hits = 0; misses = 0; streak = 0;
      dead = false;
      TIME = cfg().time;
      GOAL = cfg().goal;
      timeLeft = TIME;
      elInput.value = '';
      elTime.textContent = String(TIME);
      elFill.style.width = '100%';
      startTime = Date.now();
      renderLevels();
      pickWord();
      stats();
      setTimeout(function () { elInput.focus(); }, 60);
      tick = setInterval(loop, 100);
    }

    elInput.addEventListener('input', function () {
      if (dead) return;
      var v = elInput.value.toLowerCase();
      if (v === word) { submit(); return; }
      renderWord(elInput.value);
      if (v.length && word.indexOf(v) === 0) api.sfx('pop');
    });

    elInput.addEventListener('keydown', function (e) {
      if (dead) return;
      if (e.key === ' ') {
        e.preventDefault();
        if (e.shiftKey) { elInput.value = ''; streak = 0; pickWord(); renderWord(''); }
        else submit();
      }
      if (e.key === 'Enter') { e.preventDefault(); submit(); }
    });

    elLevels.addEventListener('click', function (e) {
      var b = e.target.closest ? e.target.closest('.lv-btn') : null;
      if (!b || b.disabled) return;
      var n = parseInt(b.getAttribute('data-lv'), 10);
      if (n !== level && n <= unlocked) { api.sfx('click'); startLevel(n); }
    });

    startLevel(1);

    return function () {
      dead = true;
      clearInterval(tick);
    };
  }
});
