/* Word Scramble — vocabulary */
GamePortal.register('scramble', {
  title: 'Word Scramble',
  emoji: '🔤',
  cat: 'learning',
  c1: '#1d3557',
  c2: '#e63946',
  tags: ['words', 'spelling', 'vocabulary', 'english', 'learning', 'language', 'kids'],
  rating: 4.7,
  plays: '1.3M',
  badge: 'Language',
  controls: 'Click letters in order to build the word · click a slot to send a letter back',
  desc: 'Unjumble the letters before the clock runs out. Longer words and tricky categories unlock as you go.',
  play: function (stage, api) {
    var WORDS = [
      { w: 'cat', c: 'Animals' }, { w: 'dog', c: 'Animals' }, { w: 'fish', c: 'Animals' }, { w: 'frog', c: 'Animals' },
      { w: 'bear', c: 'Animals' }, { w: 'duck', c: 'Animals' }, { w: 'deer', c: 'Animals' }, { w: 'goat', c: 'Animals' },
      { w: 'zebra', c: 'Animals' }, { w: 'tiger', c: 'Animals' }, { w: 'horse', c: 'Animals' }, { w: 'mouse', c: 'Animals' },
      { w: 'rabbit', c: 'Animals' }, { w: 'monkey', c: 'Animals' }, { w: 'turtle', c: 'Animals' }, { w: 'pigeon', c: 'Animals' },
      { w: 'giraffe', c: 'Animals' }, { w: 'dolphin', c: 'Animals' }, { w: 'penguin', c: 'Animals' }, { w: 'elephant', c: 'Animals' },
      { w: 'spider', c: 'Animals' }, { w: 'octopus', c: 'Animals' }, { w: 'donkey', c: 'Animals' }, { w: 'parrot', c: 'Animals' },

      { w: 'apple', c: 'Food' }, { w: 'bread', c: 'Food' }, { w: 'juice', c: 'Food' }, { w: 'pizza', c: 'Food' },
      { w: 'cookie', c: 'Food' }, { w: 'carrot', c: 'Food' }, { w: 'banana', c: 'Food' }, { w: 'orange', c: 'Food' },
      { w: 'popcorn', c: 'Food' }, { w: 'pancake', c: 'Food' }, { w: 'noodles', c: 'Food' }, { w: 'cheese', c: 'Food' },
      { w: 'chocolate', c: 'Food' }, { w: 'sandwich', c: 'Food' }, { w: 'pineapple', c: 'Food' }, { w: 'broccoli', c: 'Food' },

      { w: 'red', c: 'Colours' }, { w: 'blue', c: 'Colours' }, { w: 'gold', c: 'Colours' }, { w: 'green', c: 'Colours' },
      { w: 'black', c: 'Colours' }, { w: 'white', c: 'Colours' }, { w: 'brown', c: 'Colours' }, { w: 'pink', c: 'Colours' },
      { w: 'purple', c: 'Colours' }, { w: 'silver', c: 'Colours' }, { w: 'yellow', c: 'Colours' }, { w: 'violet', c: 'Colours' },

      { w: 'sun', c: 'Nature' }, { w: 'river', c: 'Nature' }, { w: 'cloud', c: 'Nature' }, { w: 'storm', c: 'Nature' },
      { w: 'forest', c: 'Nature' }, { w: 'island', c: 'Nature' }, { w: 'rainbow', c: 'Nature' }, { w: 'volcano', c: 'Nature' },
      { w: 'thunder', c: 'Nature' }, { w: 'glacier', c: 'Nature' }, { w: 'mountain', c: 'Nature' }, { w: 'waterfall', c: 'Nature' },

      { w: 'book', c: 'School' }, { w: 'pencil', c: 'School' }, { w: 'ruler', c: 'School' }, { w: 'eraser', c: 'School' },
      { w: 'number', c: 'School' }, { w: 'lesson', c: 'School' }, { w: 'teacher', c: 'School' }, { w: 'backpack', c: 'School' },
      { w: 'notebook', c: 'School' }, { w: 'library', c: 'School' }, { w: 'spelling', c: 'School' },

      { w: 'moon', c: 'Space' }, { w: 'comet', c: 'Space' }, { w: 'planet', c: 'Space' }, { w: 'rocket', c: 'Space' },
      { w: 'galaxy', c: 'Space' }, { w: 'meteor', c: 'Space' }, { w: 'gravity', c: 'Space' }, { w: 'orbit', c: 'Space' },
      { w: 'telescope', c: 'Space' }, { w: 'satellite', c: 'Space' }
    ];

    var LEVELS = [
      { len: 3, goal: 6, time: 75 },
      { len: 4, goal: 8, time: 85 },
      { len: 5, goal: 10, time: 95 },
      { len: 6, goal: 12, time: 105 },
      { len: 7, goal: 14, time: 115 }
    ];
    var key = 'ph_scramble_lvl';
    var unlocked = Math.min(LEVELS.length, Math.max(1, GamePortal.store.get(key, 1)));
    var level = 1;

    var TIME = LEVELS[0].time, GOAL = LEVELS[0].goal;
    var timeLeft = TIME, dead = false, lock = false, tick = null, nextTO = null;
    var word = '', cat = '', tray = [], slots = [], done = 0, streak = 0, hintUsed = false;

    var wrap = document.createElement('div');
    wrap.className = 'scramble';
    wrap.dataset.level = '1';
    wrap.innerHTML =
      '<div class="lv-strip" id="sc-levels"><span class="lv-strip-label">Level</span></div>' +
      '<div class="lv-goal" id="sc-goal"></div>' +
      '<div class="quiz-top">' +
        '<span class="math-stat">Words <b id="sc-done">0</b></span>' +
        '<span class="math-stat">Streak <b id="sc-streak">0</b></span>' +
        '<span class="math-stat">Time <b id="sc-time">75</b>s</span>' +
      '</div>' +
      '<div class="timer-bar" style="width:min(520px,94%)"><div class="timer-fill" id="sc-fill"></div></div>' +
      '<div class="q-card" style="padding:16px 22px">' +
        '<div class="q-kicker" id="sc-cat">Animals</div>' +
        '<div class="q-text">Unscramble the word</div>' +
      '</div>' +
      '<div class="slots" id="sc-slots"></div>' +
      '<div class="tray" id="sc-tray"></div>' +
      '<div class="scramble-actions">' +
        '<button class="ghost-btn" id="sc-hint">💡 Reveal a letter</button>' +
        '<button class="ghost-btn" id="sc-shuffle">🔀 Shuffle</button>' +
      '</div>' +
      '<div class="math-fb" id="sc-fb"></div>';
    stage.appendChild(wrap);

    var elSlots = wrap.querySelector('#sc-slots');
    var elTray = wrap.querySelector('#sc-tray');
    var elCat = wrap.querySelector('#sc-cat');
    var elFb = wrap.querySelector('#sc-fb');
    var elDone = wrap.querySelector('#sc-done');
    var elStreak = wrap.querySelector('#sc-streak');
    var elTime = wrap.querySelector('#sc-time');
    var elFill = wrap.querySelector('#sc-fill');
    var elGoal = wrap.querySelector('#sc-goal');
    var elLevels = wrap.querySelector('#sc-levels');

    function cfg() { return LEVELS[level - 1]; }
    function renderLevels() {
      var html = '<span class="lv-strip-label">Level</span>';
      for (var n = 1; n <= LEVELS.length; n++) {
        var cls = 'lv-btn' + (n === level ? ' on' : '') + (n > unlocked ? ' locked' : '');
        html += '<button type="button" class="' + cls + '" data-lv="' + n + '"' + (n > unlocked ? ' disabled' : '') + '>' + n + '</button>';
      }
      elLevels.innerHTML = html;
      elGoal.textContent = 'Build ' + cfg().goal + ' words of ' + cfg().len + ' letters to clear level ' + level + '!';
      wrap.dataset.level = String(level);
    }

    function shuffle(a) {
      for (var i = a.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var t = a[i]; a[i] = a[j]; a[j] = t;
      }
      return a;
    }

    function levelPool() {
      var len = cfg().len;
      var pool = WORDS.filter(function (x) { return x.w.length === len; });
      if (!pool.length) pool = WORDS.filter(function (x) { return x.w.length >= len; });
      return pool.length ? pool : WORDS;
    }

    function newWord() {
      lock = false;
      var pool = levelPool();
      var pick = pool[Math.floor(Math.random() * pool.length)];
      word = pick.w;
      cat = pick.c;

      var letters = word.split('');
      var scr;
      var guard = 0;
      do { scr = shuffle(letters.slice()); guard++; } while (scr.join('') === word && guard < 30);

      tray = scr.map(function (ch, i) { return { id: i, ch: ch, used: false }; });
      slots = letters.map(function () { return -1; });
      hintUsed = false;
      elCat.textContent = cat;
      elSlots.setAttribute('data-word', word);
      elFb.textContent = '';
      elFb.className = 'math-fb';
      render();
    }

    function render() {
      elSlots.innerHTML = slots.map(function (ti, i) {
        var ch = ti >= 0 ? tray[ti].ch : '';
        return '<button class="slot' + (ch ? ' filled' : '') + '" data-i="' + i + '">' + (ch || '&nbsp;') + '</button>';
      }).join('');
      elTray.innerHTML = tray.map(function (t, i) {
        return '<button class="letter' + (t.used ? ' used' : '') + '" data-t="' + i + '">' + t.ch + '</button>';
      }).join('');
    }

    function fillSlot(slotIdx) {
      if (lock || dead) return;
      var free = tray.findIndex(function (t) { return !t.used; });
      if (free === -1) return;
      tray[free].used = true;
      slots[slotIdx] = free;
      api.sfx('pop');
      render();
      if (slots.every(function (s) { return s >= 0; })) check();
    }

    function emptySlot(slotIdx) {
      if (lock || dead || slots[slotIdx] === -1) return;
      tray[slots[slotIdx]].used = false;
      slots[slotIdx] = -1;
      api.sfx('flip');
      render();
    }

    function check() {
      var built = slots.map(function (ti) { return tray[ti].ch; }).join('');
      if (built === word) {
        lock = true;
        done++;
        streak++;
        var pts = word.length * 25 + Math.min(150, streak * 20);
        api.addScore(pts);
        timeLeft = Math.min(TIME, timeLeft + 4);
        elDone.textContent = done;
        elStreak.textContent = streak;
        elFb.textContent = '✓ ' + word.toUpperCase() + ' +' + pts;
        elFb.className = 'math-fb ok';
        api.sfx('good');
        if (done >= GOAL) { levelClear(); return; }
        nextTO = setTimeout(function () { nextTO = null; if (!dead) newWord(); }, 750);
      } else {
        streak = 0;
        elStreak.textContent = 0;
        timeLeft = Math.max(0, timeLeft - 5);
        elFb.textContent = '✗ Not quite — try again';
        elFb.className = 'math-fb no';
        api.sfx('bad');
        elSlots.classList.add('shake');
        slots.forEach(function (ti) { if (ti >= 0) tray[ti].used = false; });
        slots = slots.map(function () { return -1; });
        setTimeout(function () {
          elSlots.classList.remove('shake');
          render();
        }, 380);
      }
    }

    function hint() {
      if (lock || dead || hintUsed) {
        if (hintUsed) { elFb.textContent = 'Only one hint per word!'; elFb.className = 'math-fb no'; }
        return;
      }
      for (var i = 0; i < slots.length; i++) {
        if (slots[i] >= 0) continue;
        var need = word[i];
        var idx = tray.findIndex(function (t) { return !t.used && t.ch === need; });
        if (idx >= 0) {
          hintUsed = true;
          tray[idx].used = true;
          slots[i] = idx;
          api.sfx('good');
          render();
          if (slots.every(function (s) { return s >= 0; })) check();
          return;
        }
      }
      elFb.textContent = 'No hint available for this one!';
      elFb.className = 'math-fb no';
    }

    elTray.addEventListener('click', function (e) {
      var b = e.target.closest('.letter');
      if (!b) return;
      var t = tray[+b.dataset.t];
      if (t.used) return;
      var empty = slots.indexOf(-1);
      if (empty === -1) return;
      t.used = true;
      slots[empty] = +b.dataset.t;
      api.sfx('pop');
      render();
      if (slots.every(function (s) { return s >= 0; })) check();
    });

    elSlots.addEventListener('click', function (e) {
      var b = e.target.closest('.slot');
      if (b) emptySlot(+b.dataset.i);
    });

    wrap.querySelector('#sc-hint').onclick = hint;
    wrap.querySelector('#sc-shuffle').onclick = function () {
      if (lock || dead) return;
      var free = shuffle(tray.filter(function (t) { return !t.used; }));
      var fi = 0;
      tray = tray.map(function (t) { return t.used ? t : free[fi++]; });
      api.sfx('flip');
      render();
    };

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
    }

    function end() {
      if (dead) return;
      dead = true;
      clearInterval(tick);
      api.gameOver({
        title: "Time's up!",
        text: 'Level ' + level + ': ' + done + ' of ' + GOAL + ' words unscrambled.',
        onAgain: function () { api.clearOverlay(); startLevel(level); }
      });
    }

    function levelClear() {
      dead = true;
      clearInterval(tick);
      if (nextTO) { clearTimeout(nextTO); nextTO = null; }
      if (level > unlocked) { unlocked = level; GamePortal.store.set(key, unlocked); }
      if (level >= LEVELS.length) {
        api.win({
          title: 'Word Wizard! 🔤',
          text: 'All ' + LEVELS.length + ' levels cleared — ' + api.score + ' points!'
        });
        return;
      }
      api.sfx('win');
      api.overlay({
        emoji: '🌟',
        title: 'Level ' + level + ' complete!',
        text: 'Next: build ' + LEVELS[level].goal + ' words of ' + LEVELS[level].len + ' letters.',
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
      if (nextTO) { clearTimeout(nextTO); nextTO = null; }
      dead = false;
      lock = false;
      done = 0;
      streak = 0;
      hintUsed = false;
      TIME = cfg().time;
      GOAL = cfg().goal;
      timeLeft = TIME;
      elDone.textContent = '0';
      elStreak.textContent = '0';
      elTime.textContent = String(TIME);
      elFill.style.width = '100%';
      renderLevels();
      newWord();
      tick = setInterval(loop, 100);
    }

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
