/* Word Rescue — kid-safe hangman (no gallows): light up hidden words to guide a lost puppy home.
   5 levels of emoji-clued words: 3 letters up to 7-8 letters, 5 hearts per level. */
GamePortal.register('wordguess', {
  title: 'Word Rescue',
  emoji: '💡',
  cat: 'knowledge',
  c1: '#7c3aed',
  c2: '#fbbf24',
  tags: ['words', 'guess', 'hangman', 'letters', 'vocabulary', 'spelling', 'english', 'quiz', 'kids', 'reading', 'rescue'],
  rating: 4.8,
  plays: '0.5M',
  badge: 'Words',
  controls: 'Tap letters to reveal the hidden word — 5 wrong guesses allowed!',
  desc: 'A little puppy is lost in the woods — only words can light the way! Guess the hidden word letter by letter using the emoji clue. Five hearts, five levels of words from 3 letters to 8 letters. No gallows, just brains!',
  play: function (stage, api) {
    var HEARTS = 5;
    var LEVELS = [
      {
        goal: 'Level 1 — rescue with 4 three-letter words!',
        words: [
          { w: 'CAT', e: '🐱', c: 'Animal' },
          { w: 'SUN', e: '☀️', c: 'Nature' },
          { w: 'DOG', e: '🐶', c: 'Animal' },
          { w: 'BUS', e: '🚌', c: 'Vehicle' }
        ]
      },
      {
        goal: 'Level 2 — rescue with 4 four-letter words!',
        words: [
          { w: 'FISH', e: '🐟', c: 'Animal' },
          { w: 'CAKE', e: '🎂', c: 'Food' },
          { w: 'STAR', e: '⭐', c: 'Space' },
          { w: 'MILK', e: '🥛', c: 'Food' }
        ]
      },
      {
        goal: 'Level 3 — rescue with 5 five-letter words!',
        words: [
          { w: 'HORSE', e: '🐴', c: 'Animal' },
          { w: 'PIZZA', e: '🍕', c: 'Food' },
          { w: 'APPLE', e: '🍎', c: 'Food' },
          { w: 'CLOUD', e: '☁️', c: 'Nature' },
          { w: 'MOUSE', e: '🐭', c: 'Animal' }
        ]
      },
      {
        goal: 'Level 4 — rescue with 5 six-letter words!',
        words: [
          { w: 'ROCKET', e: '🚀', c: 'Space' },
          { w: 'TURTLE', e: '🐢', c: 'Animal' },
          { w: 'ORANGE', e: '🍊', c: 'Food' },
          { w: 'MONKEY', e: '🐵', c: 'Animal' },
          { w: 'RABBIT', e: '🐰', c: 'Animal' }
        ]
      },
      {
        goal: 'Level 5 — rescue with 5 seven and eight-letter words!',
        words: [
          { w: 'ELEPHANT', e: '🐘', c: 'Animal' },
          { w: 'PENGUIN', e: '🐧', c: 'Animal' },
          { w: 'DIAMOND', e: '💎', c: 'Things' },
          { w: 'RAINBOW', e: '🌈', c: 'Nature' },
          { w: 'BACKPACK', e: '🎒', c: 'Things' }
        ]
      }
    ];
    var key = 'ph_wordguess_lvl';
    var unlocked = Math.min(LEVELS.length, Math.max(1, GamePortal.store.get(key, 1)));
    var level = 1;
    var hearts = HEARTS, wordn = 0, over = false;
    var guessed = {};

    var wrap = document.createElement('div');
    wrap.className = 'quiz-wrap';
    wrap.style.justifyContent = 'flex-start';
    wrap.dataset.level = '1';
    wrap.dataset.word = '';
    wrap.dataset.hearts = String(HEARTS);
    wrap.dataset.wordn = '0';
    wrap.dataset.words = String(LEVELS[0].words.length);
    wrap.innerHTML =
      '<div class="lv-strip" id="wg-levels"><span class="lv-strip-label">Level</span></div>' +
      '<div class="lv-goal" id="wg-goal"></div>' +
      '<div class="q-card">' +
        '<div class="q-kicker">💡 Word Rescue</div>' +
        '<div class="q-text" id="wg-cat">🐱 Animal — 3 letters</div>' +
        '<div class="math-fb" id="wg-msg"></div>' +
      '</div>' +
      '<div class="math-top"><span class="math-stat lives hearts-row" id="wg-hearts">❤️❤️❤️❤️❤️</span></div>' +
      '<div class="slots" id="wg-word"></div>' +
      '<div class="tray" id="wg-keys"></div>' +
      '<div class="hint" id="wg-hint">Tap the letters hiding in the word — 5 wrong guesses and the light goes out!</div>';
    wrap.firstChild.style.marginTop = 'auto';
    wrap.lastChild.style.marginBottom = 'auto';
    stage.appendChild(wrap);

    var elLevels = wrap.querySelector('#wg-levels');
    var elGoal = wrap.querySelector('#wg-goal');
    var elCat = wrap.querySelector('#wg-cat');
    var elMsg = wrap.querySelector('#wg-msg');
    var elHearts = wrap.querySelector('#wg-hearts');
    var elWord = wrap.querySelector('#wg-word');
    var elKeys = wrap.querySelector('#wg-keys');
    var elHint = wrap.querySelector('#wg-hint');
    elMsg.style.height = 'auto';
    elMsg.style.minHeight = '26px';

    (function buildKeys() {
      var html = '';
      for (var i = 0; i < 26; i++) {
        var ch = String.fromCharCode(65 + i);
        html += '<button type="button" class="letter" data-l="' + ch + '">' + ch + '</button>';
      }
      elKeys.innerHTML = html;
    })();

    function repeat(s, n) {
      var out = '';
      for (var i = 0; i < n; i++) out += s;
      return out;
    }
    function cfg() { return LEVELS[level - 1]; }
    function cur() {
      var ws = cfg().words;
      return wordn >= 0 && wordn < ws.length ? ws[wordn] : null;
    }
    function renderLevels() {
      var html = '<span class="lv-strip-label">Level</span>';
      for (var n = 1; n <= LEVELS.length; n++) {
        var cls = 'lv-btn' + (n === level ? ' on' : '') + (n > unlocked ? ' locked' : '');
        html += '<button type="button" class="' + cls + '" data-lv="' + n + '"' + (n > unlocked ? ' disabled' : '') + '>' + n + '</button>';
      }
      elLevels.innerHTML = html;
      elGoal.textContent = cfg().goal;
    }
    function renderClue() {
      var w = cur();
      if (w) elCat.textContent = w.e + ' ' + w.c + ' — ' + w.w.length + ' letters';
    }
    function renderWord(revealAll) {
      var w = cur();
      if (!w) { elWord.innerHTML = ''; return; }
      var html = '', i, L, shown;
      for (i = 0; i < w.w.length; i++) {
        L = w.w.charAt(i);
        shown = !!revealAll || !!guessed[L];
        html += '<span class="slot' + (shown ? ' filled' : '') + '" data-l="' + L + '">' + (shown ? L : '_') + '</span>';
      }
      elWord.innerHTML = html;
    }
    function resetKeys() {
      var bs = elKeys.querySelectorAll('.letter'), i;
      for (i = 0; i < bs.length; i++) {
        bs[i].disabled = false;
        bs[i].className = 'letter';
        bs[i].style.background = '';
        bs[i].style.borderColor = '';
      }
    }
    function hud() {
      elHearts.textContent = hearts > 0 ? repeat('❤️', hearts) : '💔';
      var w = cur();
      wrap.dataset.level = String(level);
      wrap.dataset.word = w ? w.w : '';
      wrap.dataset.hearts = String(hearts);
      wrap.dataset.wordn = String(wordn);
      wrap.dataset.words = String(cfg().words.length);
    }
    function solved() {
      var w = cur(), i;
      if (!w) return false;
      for (i = 0; i < w.w.length; i++) if (!guessed[w.w.charAt(i)]) return false;
      return true;
    }
    function msg(text, ok) {
      elMsg.className = 'math-fb' + (ok ? ' ok' : ' no');
      elMsg.textContent = text;
    }

    function nextWord() {
      api.addScore(40);
      api.sfx('pop');
      if (wordn + 1 >= cfg().words.length) { levelClear(); return; }
      wordn++;
      guessed = {};
      resetKeys();
      renderClue();
      renderWord(false);
      msg('Nice! Next word…', true);
      hud();
    }
    function lose() {
      over = true;
      renderWord(true);
      hud();
      api.gameOver({
        title: '💔 Out of hearts!',
        text: 'The hidden word was ' + cur().w + ' ' + cur().e +
          ' — Level ' + level + ': word ' + (wordn + 1) + ' of ' + cfg().words.length + '.',
        onAgain: function () { api.clearOverlay(); startLevel(level); }
      });
    }
    function levelClear() {
      over = true;
      api.addScore(50);
      if (level > unlocked) { unlocked = level; GamePortal.store.set(key, unlocked); }
      if (level >= LEVELS.length) {
        api.win({ emoji: '🐕', title: 'Puppy Rescued!', text: 'Words lit the whole way home!' });
        return;
      }
      api.sfx('win');
      api.overlay({
        emoji: '🌟',
        title: 'Level ' + level + ' complete!',
        text: 'Next: ' + LEVELS[level].goal,
        score: api.score,
        best: api.getBest(),
        onAgain: function () { api.clearOverlay(); level++; startLevel(level); }
      });
    }

    function onKey(e) {
      if (over) return;
      var b = e.target.closest ? e.target.closest('.letter') : null;
      if (!b || b.disabled) return;
      var L = b.getAttribute('data-l');
      var w = cur();
      if (!w) return;
      if (w.w.indexOf(L) === -1) {
        b.disabled = true;
        b.className = 'letter wrong';
        b.style.background = '#ff4d8d';
        b.style.borderColor = '#fff';
        hearts--;
        api.sfx('bad');
        msg('No “' + L + '” here — ' + hearts + ' heart' + (hearts === 1 ? '' : 's') + ' left!', false);
        hud();
        if (hearts <= 0) lose();
        return;
      }
      guessed[L] = 1;
      b.disabled = true;
      b.className = 'letter used';
      renderWord(false);
      api.sfx('good');
      api.addScore(10);
      msg('Yes! “' + L + '” lights up the way.', true);
      hud();
      if (solved()) nextWord();
    }
    function onStrip(e) {
      var lvb = e.target.closest ? e.target.closest('.lv-btn') : null;
      if (lvb && !lvb.classList.contains('locked')) {
        var n = parseInt(lvb.getAttribute('data-lv'), 10);
        if (n !== level && n <= unlocked) { api.sfx('click'); startLevel(n); }
      }
    }

    function startLevel(n) {
      level = Math.max(1, Math.min(LEVELS.length, n));
      api.clearOverlay();
      api.setScore(0);
      hearts = HEARTS;
      wordn = 0;
      over = false;
      guessed = {};
      renderLevels();
      renderClue();
      resetKeys();
      renderWord(false);
      elMsg.className = 'math-fb';
      elMsg.textContent = '';
      hud();
      elHint.textContent = 'Tap the letters hiding in the word — ' + HEARTS + ' wrong guesses and the light goes out!';
    }

    elKeys.addEventListener('click', onKey);
    elLevels.addEventListener('click', onStrip);

    startLevel(1);

    return function () {
      over = true;
      elKeys.removeEventListener('click', onKey);
      elLevels.removeEventListener('click', onStrip);
    };
  }
});
