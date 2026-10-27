/* Lulu Star Fairy — a kind little angel-fairy across 3 sparkle levels.
   Original character and art (not affiliated with any talking-character franchise). */
GamePortal.register('fairy', {
  title: 'Lulu Star Fairy',
  emoji: '🧚',
  cat: 'arts',
  c1: '#8b5cf6',
  c2: '#f0abfc',
  tags: ['fairy', 'angel', 'talking angel', 'angels', 'wings', 'talking', 'lullaby', 'arts', 'kids', 'cute', 'sing', 'levels'],
  rating: 4.9,
  plays: '0.4M',
  badge: 'New',
  controls: 'Tap the wand for sparkles (more per level) · lullaby · type words for Lulu to echo',
  desc: 'Meet Lulu, the littlest star fairy in the sky! Tap her wand for sparkles, sing a lullaby together, and type anything — Lulu echoes it back in her twinkly voice. Grow her magic across 3 levels — the wand sparkles harder each time!',
  play: function (stage, api) {
    var LEVELS = [
      { goal: 25, wand: 1, song: 2, nap: 2, label: 'First Spark' },
      { goal: 40, wand: 2, song: 3, nap: 2, label: 'Glow' },
      { goal: 60, wand: 3, song: 4, nap: 3, label: 'Starlight' }
    ];
    var key = 'ph_fairy_lvl';
    var unlocked = Math.min(LEVELS.length, Math.max(1, GamePortal.store.get(key, 1)));
    var level = 1;

    var wrap = document.createElement('div');
    wrap.className = 'talk-wrap';
    wrap.dataset.sparks = '0';
    wrap.dataset.level = '1';
    wrap.innerHTML =
      '<div class="lv-strip" id="lu-levels"><span class="lv-strip-label">Level</span></div>' +
      '<div class="hearts-row" id="lu-sparks">✨ 0 / ' + LEVELS[0].goal + '</div>' +
      '<div class="lv-goal" id="lu-goal"></div>' +
      '<div class="talk-char fairy-float" id="lu-char">' +
        '<svg viewBox="0 0 200 210" xmlns="http://www.w3.org/2000/svg">' +
          '<ellipse cx="52" cy="120" rx="26" ry="44" fill="#c4b5fd" opacity=".75" transform="rotate(-24 52 120)"/>' +
          '<ellipse cx="148" cy="120" rx="26" ry="44" fill="#c4b5fd" opacity=".75" transform="rotate(24 148 120)"/>' +
          '<ellipse cx="100" cy="30" rx="26" ry="9" fill="none" stroke="#ffd166" stroke-width="6"/>' +
          '<path d="M100 62 L126 158 Q100 172 74 158 Z" fill="#f0abfc"/>' +
          '<path d="M100 62 L126 158 Q100 172 74 158 Z" fill="none" stroke="#c026d3" stroke-width="2" opacity=".4"/>' +
          '<circle cx="100" cy="52" r="26" fill="#ffd7b5"/>' +
          '<circle cx="60" cy="52" r="22" fill="#f9a8d4"/>' +
          '<ellipse cx="91" cy="52" rx="6" ry="7.5" fill="#fff"/>' +
          '<ellipse cx="109" cy="52" rx="6" ry="7.5" fill="#fff"/>' +
          '<circle cx="92" cy="54" r="3.4" fill="#1f2430"/>' +
          '<circle cx="108" cy="54" r="3.4" fill="#1f2430"/>' +
          '<circle cx="93" cy="53" r="1.2" fill="#fff"/>' +
          '<circle cx="109" cy="53" r="1.2" fill="#fff"/>' +
          '<circle cx="82" cy="60" r="5" fill="#ff9ebb" opacity=".6"/>' +
          '<circle cx="118" cy="60" r="5" fill="#ff9ebb" opacity=".6"/>' +
          '<path id="lu-mouth" class="talk-mouth" d="M93 64 q7 6 14 0 q-2 7 -7 7 q-5 0 -7 -7 z" fill="#7c2d3e"/>' +
          '<rect x="126" y="96" width="10" height="52" rx="5" fill="#92400e" transform="rotate(24 131 110)"/>' +
          '<text x="146" y="100" font-size="26" text-anchor="middle">⭐</text>' +
        '</svg>' +
      '</div>' +
      '<div class="talk-bubble" id="lu-bubble">Twinkle! I am Lulu! Tap my wand! ✨</div>' +
      '<div class="talk-btns">' +
        '<button class="big-btn" id="lu-wand">🪄 Wand</button>' +
        '<button class="big-btn" id="lu-song">🎵 Lullaby</button>' +
        '<button class="big-btn" id="lu-nap">🌙 Nap</button>' +
      '</div>' +
      '<div class="talk-row">' +
        '<input class="talk-input" id="lu-input" maxlength="60" placeholder="Type words for Lulu…" aria-label="Words for Lulu to say">' +
        '<button class="big-btn" id="lu-say">🗣️ Say</button>' +
      '</div>' +
      '<div class="hint">Lulu echoes your words in her twinkly voice (sound on!)</div>';
    stage.appendChild(wrap);

    var sparks = 0, alive = true, cool = 0;
    var elSparks = wrap.querySelector('#lu-sparks');
    var elGoal = wrap.querySelector('#lu-goal');
    var elLevels = wrap.querySelector('#lu-levels');
    var bubble = wrap.querySelector('#lu-bubble');
    var mouth = wrap.querySelector('#lu-mouth');
    var charBox = wrap.querySelector('#lu-char');
    var input = wrap.querySelector('#lu-input');

    function cfg() { return LEVELS[level - 1]; }
    function renderLevels() {
      var html = '<span class="lv-strip-label">Level</span>';
      for (var n = 1; n <= LEVELS.length; n++) {
        var cls = 'lv-btn' + (n === level ? ' on' : '') + (n > unlocked ? ' locked' : '');
        html += '<button type="button" class="' + cls + '" data-lv="' + n + '"' + (n > unlocked ? ' disabled' : '') + '>' + n + '</button>';
      }
      elLevels.innerHTML = html;
      elGoal.textContent = cfg().label + ' — collect ' + cfg().goal + ' sparkles (wand +' + cfg().wand + ')';
      wrap.dataset.level = String(level);
    }
    function hud() {
      elSparks.textContent = '✨ ' + sparks + ' / ' + cfg().goal;
      wrap.dataset.sparks = String(sparks);
      api.setScore(sparks * 4);
    }
    function chomp(ms) {
      mouth.classList.remove('talking');
      void mouth.getBBox;
      mouth.classList.add('talking');
      setTimeout(function () { mouth.classList.remove('talking'); }, ms || 2000);
    }
    function speak(text) {
      bubble.textContent = text + ' ✨';
      chomp(Math.min(4000, 900 + text.length * 45));
      try {
        if (!('speechSynthesis' in window)) return;
        var u = new SpeechSynthesisUtterance(text.slice(0, 60));
        u.pitch = 2.0;
        u.rate = 1.0;
        u.lang = 'en-US';
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(u);
      } catch (e) {}
    }
    function burst(n) {
      var count = 4 + n * 2;
      for (var i = 0; i < count; i++) {
        var s = document.createElement('span');
        s.className = 'spark';
        s.textContent = '✨';
        s.style.left = (30 + Math.random() * 40) + '%';
        s.style.top = '38%';
        charBox.style.position = 'relative';
        charBox.appendChild(s);
        (function (el) { setTimeout(function () { el.remove(); }, 850); })(s);
      }
    }
    function add(n) {
      if (!alive) return;
      sparks += n;
      hud();
      if (sparks >= cfg().goal) finishLevel();
    }
    function finishLevel() {
      alive = false;
      if (level > unlocked) { unlocked = level; GamePortal.store.set(key, unlocked); }
      if (level >= LEVELS.length) {
        speak('We did it, star friend');
        api.win({
          title: 'Star Friend! 🌟',
          text: 'All 3 levels done — Lulu collected everything with you! ' + api.score + ' points.'
        });
        return;
      }
      api.sfx('win');
      api.overlay({
        emoji: '🌟',
        title: LEVELS[level].label + ' complete!',
        text: 'Next: ' + LEVELS[level].label + ' — wand +' + LEVELS[level].wand + ' sparkles!',
        score: api.score,
        best: api.getBest(),
        onAgain: function () { api.clearOverlay(); level++; startLevel(level); }
      });
    }
    function startLevel(n) {
      level = Math.max(1, Math.min(LEVELS.length, n));
      api.clearOverlay();
      api.setScore(0);
      sparks = 0; alive = true;
      bubble.textContent = 'Level ' + level + ': ' + cfg().label + '! Tap my wand! ✨';
      renderLevels();
      hud();
    }
    wrap.querySelector('#lu-wand').addEventListener('click', function () {
      if (!alive) return;
      var now = Date.now();
      if (now - cool < 500) return;
      cool = now;
      burst(cfg().wand);
      bubble.textContent = 'Sparkles everywhere! +' + cfg().wand + ' ✨';
      api.sfx('pop');
      chomp(900);
      add(cfg().wand);
    });
    wrap.querySelector('#lu-song').addEventListener('click', function () {
      if (!alive) return;
      bubble.textContent = 'Twinkle twinkle, close your eyes… 🎵';
      chomp(3600);
      try {
        var notes = [523, 523, 784, 784, 880, 880, 784];
        notes.forEach(function (f, i) { GamePortal.sound.tone(f, 0.28, 'sine', 0.1, i * 0.3); });
      } catch (e) {}
      add(cfg().song);
      wrap.dataset.song = '1';
    });
    wrap.querySelector('#lu-nap').addEventListener('click', function () {
      if (!alive) return;
      bubble.textContent = 'Yaaawn… that was cozy. 🌙';
      api.sfx('flip');
      chomp(1200);
      add(cfg().nap);
    });
    wrap.querySelector('#lu-say').addEventListener('click', function () {
      if (!alive) return;
      var t = input.value.trim();
      api.sfx('click');
      speak(t || 'Laaa luuu luuu!');
    });
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') { e.preventDefault(); wrap.querySelector('#lu-say').click(); }
      e.stopPropagation();
    });
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
      try { if ('speechSynthesis' in window) window.speechSynthesis.cancel(); } catch (e) {}
    };
  }
});
