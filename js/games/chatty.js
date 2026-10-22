/* Mimi Chatty Cat — care for Mimi across 3 friendship levels; she talks back.
   Original character and art (not affiliated with any talking-cat franchise). */
GamePortal.register('chatty', {
  title: 'Mimi Chatty Cat',
  emoji: '🐱',
  cat: 'kids',
  c1: '#f59e0b',
  c2: '#fde68a',
  tags: ['talking', 'talking tom', 'tom', 'cat', 'pet', 'care', 'kids', 'cute', 'voice', 'kitten', 'chat', 'levels'],
  rating: 4.9,
  plays: '0.5M',
  badge: 'New',
  controls: 'Feed and pet Mimi · unlock yarn + bow at higher levels · type words for her to say back',
  desc: 'Meet Mimi, the chattiest kitten on the block! Feed her milk and fish, pet her soft head, and type anything — Mimi says it back in her squeaky little voice. Grow the friendship across 3 levels: earn hearts to unlock the yarn ball and bow!',
  play: function (stage, api) {
    var LEVELS = [
      { goal: 15, label: 'New Friend', unlocks: '' },
      { goal: 25, label: 'Playtime', unlocks: '🧶' },
      { goal: 35, label: 'Best Buddies', unlocks: '🧶🎀' }
    ];
    var key = 'ph_chatty_lvl';
    var unlocked = Math.min(LEVELS.length, Math.max(1, GamePortal.store.get(key, 1)));
    var level = 1;

    var wrap = document.createElement('div');
    wrap.className = 'talk-wrap';
    wrap.dataset.hearts = '0';
    wrap.dataset.level = '1';
    wrap.innerHTML =
      '<div class="lv-strip" id="tt-levels"><span class="lv-strip-label">Level</span></div>' +
      '<div class="hearts-row" id="tt-hearts">❤️ 0 / ' + LEVELS[0].goal + '</div>' +
      '<div class="lv-goal" id="tt-goal"></div>' +
      '<div class="talk-char">' +
        '<svg viewBox="0 0 200 190" xmlns="http://www.w3.org/2000/svg">' +
          '<path d="M55 55 L45 12 L88 38 Z" fill="#f5a54b"/>' +
          '<path d="M145 55 L155 12 L112 38 Z" fill="#f5a54b"/>' +
          '<path d="M58 46 L53 24 L76 38 Z" fill="#ffd7b5"/>' +
          '<path d="M142 46 L147 24 L124 38 Z" fill="#ffd7b5"/>' +
          '<circle cx="100" cy="105" r="62" fill="#f5a54b"/>' +
          '<path d="M78 60 q3 -8 6 0 M94 58 q3 -8 6 0 M122 60 q3 -8 6 0" stroke="#c97a1e" stroke-width="3" fill="none" stroke-linecap="round"/>' +
          '<ellipse cx="78" cy="105" rx="15" ry="18" fill="#fff"/>' +
          '<ellipse cx="122" cy="105" rx="15" ry="18" fill="#fff"/>' +
          '<circle cx="79" cy="108" r="8" fill="#1f2430"/>' +
          '<circle cx="121" cy="108" r="8" fill="#1f2430"/>' +
          '<circle cx="82" cy="105" r="2.6" fill="#fff"/>' +
          '<circle cx="124" cy="105" r="2.6" fill="#fff"/>' +
          '<circle cx="58" cy="128" r="9" fill="#ff9ebb" opacity=".55"/>' +
          '<circle cx="142" cy="128" r="9" fill="#ff9ebb" opacity=".55"/>' +
          '<path d="M96 128 q4 4 8 0" stroke="#7c4a12" stroke-width="3" fill="none" stroke-linecap="round"/>' +
          '<path id="tt-mouth" class="talk-mouth" d="M88 136 q12 10 24 0 q-4 12 -12 12 q-8 0 -12 -12 z" fill="#7c2d3e"/>' +
          '<ellipse cx="100" cy="146" rx="5" ry="3.4" fill="#ff8fa3"/>' +
          '<text id="tt-bow" x="150" y="40" font-size="22" text-anchor="middle"></text>' +
        '</svg>' +
      '</div>' +
      '<div class="talk-bubble" id="tt-bubble">Hi! I am Mimi! Pet me! 🐾</div>' +
      '<div class="talk-btns" id="tt-care">' +
        '<button class="big-btn" data-care="milk">🥛 Milk</button>' +
        '<button class="big-btn" data-care="fish">🐟 Fish</button>' +
        '<button class="big-btn" data-care="pet">🐾 Pet</button>' +
        '<button class="big-btn" data-care="yarn" id="tt-yarn" hidden>🧶 Yarn</button>' +
        '<button class="big-btn" data-care="bow" id="tt-bowbtn" hidden>🎀 Bow</button>' +
      '</div>' +
      '<div class="talk-row">' +
        '<input class="talk-input" id="tt-input" maxlength="60" placeholder="Type words for Mimi…" aria-label="Words for Mimi to say">' +
        '<button class="big-btn" id="tt-say">🗣️ Say</button>' +
      '</div>' +
      '<div class="hint">Mimi repeats your words in her squeaky voice (sound on!)</div>';
    stage.appendChild(wrap);

    var hearts = 0, alive = true, cool = 0, bowOn = false;
    var elHearts = wrap.querySelector('#tt-hearts');
    var elGoal = wrap.querySelector('#tt-goal');
    var elLevels = wrap.querySelector('#tt-levels');
    var bubble = wrap.querySelector('#tt-bubble');
    var mouth = wrap.querySelector('#tt-mouth');
    var elBow = wrap.querySelector('#tt-bow');
    var input = wrap.querySelector('#tt-input');

    function cfg() { return LEVELS[level - 1]; }
    function renderLevels() {
      var html = '<span class="lv-strip-label">Level</span>';
      for (var n = 1; n <= LEVELS.length; n++) {
        var cls = 'lv-btn' + (n === level ? ' on' : '') + (n > unlocked ? ' locked' : '');
        html += '<button type="button" class="' + cls + '" data-lv="' + n + '"' + (n > unlocked ? ' disabled' : '') + '>' + n + '</button>';
      }
      elLevels.innerHTML = html;
      elGoal.textContent = cfg().label + ' — earn ' + cfg().goal + ' hearts' +
        (cfg().unlocks ? ' · unlocks ' + cfg().unlocks : '');
      wrap.querySelector('#tt-yarn').hidden = cfg().unlocks.indexOf('🧶') === -1;
      wrap.querySelector('#tt-bowbtn').hidden = cfg().unlocks.indexOf('🎀') === -1;
      wrap.dataset.level = String(level);
    }
    function hud() {
      elHearts.textContent = '❤️ ' + hearts + ' / ' + cfg().goal;
      wrap.dataset.hearts = String(hearts);
      api.setScore(hearts * 4);
    }
    function chomp(ms) {
      mouth.classList.remove('talking');
      void mouth.getBBox;
      mouth.classList.add('talking');
      setTimeout(function () { mouth.classList.remove('talking'); }, ms || 2000);
    }
    function speak(text, pitch) {
      bubble.textContent = text;
      chomp(Math.min(4000, 900 + text.length * 45));
      try {
        if (!('speechSynthesis' in window)) return;
        var u = new SpeechSynthesisUtterance(text.slice(0, 60));
        u.pitch = pitch || 1.7;
        u.rate = 1.05;
        u.lang = 'en-US';
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(u);
      } catch (e) {}
    }
    function finishLevel() {
      alive = false;
      if (level > unlocked) { unlocked = level; GamePortal.store.set(key, unlocked); }
      if (level >= LEVELS.length) {
        speak('We are best buddies forever!', 1.8);
        api.win({
          title: 'Best Buddies! 💕',
          text: 'All 3 levels done — Mimi loves you! ' + api.score + ' points.'
        });
        return;
      }
      api.sfx('win');
      api.overlay({
        emoji: '💕',
        title: LEVELS[level].label + ' done!',
        text: LEVELS[level].unlocks
          ? 'Level ' + (level + 1) + ' unlocks ' + LEVELS[level].unlocks + ' — keep caring!'
          : 'Level ' + (level + 1) + ': ' + LEVELS[level].label + '.',
        score: api.score,
        best: api.getBest(),
        onAgain: function () { api.clearOverlay(); level++; startLevel(level); }
      });
    }
    function startLevel(n) {
      level = Math.max(1, Math.min(LEVELS.length, n));
      api.clearOverlay();
      api.setScore(0);
      hearts = 0; alive = true; bowOn = false;
      elBow.textContent = '';
      bubble.textContent = 'Level ' + level + ': ' + cfg().label + '! Care for me! 🐾';
      renderLevels();
      hud();
    }
    function care(kind) {
      if (!alive) return;
      var now = Date.now();
      if (now - cool < 500) return;
      cool = now;
      var gain = 1;
      if (kind === 'milk') { bubble.textContent = 'Slurp slurp! Yummy milk! 🥛'; api.sfx('eat'); }
      else if (kind === 'fish') { bubble.textContent = 'Nom nom! My favourite fish! 🐟'; api.sfx('eat'); }
      else if (kind === 'yarn') { bubble.textContent = 'Pounce! The yarn ball is the best! 🧶'; api.sfx('pop'); gain = 2; }
      else if (kind === 'bow') {
        bowOn = !bowOn;
        elBow.textContent = bowOn ? '🎀' : '';
        bubble.textContent = bowOn ? 'Do I look pretty? 🎀' : 'Bow off — back to zoomies!';
        api.sfx('pop'); gain = 2;
      }
      else { bubble.textContent = 'Purrrr… that tickles! 🐾'; api.sfx('pop'); }
      hearts += gain;
      chomp(1200);
      hud();
      if (hearts >= cfg().goal) finishLevel();
    }

    wrap.querySelectorAll('[data-care]').forEach(function (b) {
      b.addEventListener('click', function () { care(b.dataset.care); });
    });
    elLevels.addEventListener('click', function (e) {
      var lvb = e.target.closest('.lv-btn');
      if (lvb && !lvb.classList.contains('locked')) {
        var n = parseInt(lvb.dataset.lv, 10);
        if (n !== level && n <= unlocked) { api.sfx('click'); startLevel(n); }
      }
    });
    wrap.querySelector('#tt-say').addEventListener('click', function () {
      if (!alive) return;
      var t = input.value.trim();
      api.sfx('click');
      speak(t || 'Mee mew mew! Talk to me!', 1.7);
    });
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') { e.preventDefault(); wrap.querySelector('#tt-say').click(); }
      e.stopPropagation();
    });

    startLevel(1);
    return function () {
      alive = false;
      try { if ('speechSynthesis' in window) window.speechSynthesis.cancel(); } catch (e) {}
    };
  }
});
