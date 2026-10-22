/* Time Teller — learning to read a clock */
GamePortal.register('clock', {
  title: 'Time Teller',
  emoji: '🕐',
  cat: 'kids',
  c1: '#006d77',
  c2: '#ff9f1c',
  tags: ['clock', 'time', 'telling time', 'kids', 'learning', 'math', 'hours'],
  rating: 4.9,
  plays: '860K',
  badge: 'For kids',
  controls: 'Read the clock and click the matching time · 3 lives',
  desc: 'From o’clock to half past, then quarters and five-minute steps. A gentle way for kids to master the analog clock.',
  play: function (stage, api) {
    var LEVELS = [
      { step: 60, goal: 6 },
      { step: 30, goal: 8 },
      { step: 15, goal: 10 },
      { step: 5, goal: 12 },
      { step: 1, goal: 14 }
    ];
    var key = 'ph_clock_lvl';
    var unlocked = Math.min(LEVELS.length, Math.max(1, GamePortal.store.get(key, 1)));
    var level = 1;
    var W = 320;
    var lives = 3, correct = 0, dead = false, lock = false, target = null;
    var gen = 0;

    var wrap = document.createElement('div');
    wrap.className = 'clock-wrap';
    wrap.dataset.level = '1';
    wrap.innerHTML =
      '<div class="lv-strip" id="cl-levels"><span class="lv-strip-label">Level</span></div>' +
      '<div class="lv-goal" id="cl-goal"></div>' +
      '<div class="quiz-top">' +
        '<span class="math-stat">Level <b id="c-lvl">1</b></span>' +
        '<span class="math-stat">Streak <b id="c-streak">0</b></span>' +
        '<span class="math-stat">Lives <b class="lives" id="c-lives">❤️❤️❤️</b></span>' +
      '</div>' +
      '<canvas class="game-canvas clock-canvas" id="c-canvas"></canvas>' +
      '<div class="ans-grid" id="c-ans"></div>' +
      '<div class="math-fb" id="c-fb"></div>';
    stage.appendChild(wrap);

    var canvas = wrap.querySelector('#c-canvas');
    var ctx = api.fitCanvas(canvas, W, W);
    var elAns = wrap.querySelector('#c-ans');
    var elFb = wrap.querySelector('#c-fb');
    var elLvl = wrap.querySelector('#c-lvl');
    var elLives = wrap.querySelector('#c-lives');
    var elStreak = wrap.querySelector('#c-streak');
    var elGoal = wrap.querySelector('#cl-goal');
    var elLevels = wrap.querySelector('#cl-levels');
    var streak = 0;

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
      if (level > unlocked) { unlocked = level; GamePortal.store.set(key, unlocked); }
      if (level >= LEVELS.length) {
        api.win({
          title: 'Time Master! 🕐',
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
      gen++;
      api.clearOverlay();
      api.setScore(0);
      lives = 3; correct = 0; streak = 0; dead = false; lock = false;
      elLives.textContent = '❤️❤️❤️';
      elStreak.textContent = '0';
      renderLevels();
      question();
    }

    function makeTime() {
      var h = rnd(1, 12), m, step = cfg().step;
      if (step === 60) m = 0;
      else if (step === 30) m = Math.random() < 0.5 ? 0 : 30;
      else if (step === 15) m = [0, 15, 30, 45][rnd(0, 3)];
      else if (step === 5) m = rnd(0, 11) * 5;
      else m = rnd(0, 59);
      return { h: h, m: m };
    }

    function fmt(t) {
      var mm = t.m < 10 ? '0' + t.m : '' + t.m;
      return t.h + ':' + mm;
    }

    function draw(t, flash) {
      ctx.clearRect(0, 0, W, W);
      var cx = W / 2, cy = W / 2, R = W / 2 - 16;

      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fillStyle = flash === 'ok' ? '#d7fbee' : flash === 'no' ? '#ffe1ea' : '#fff';
      ctx.fill();
      ctx.lineWidth = 8;
      ctx.strokeStyle = flash === 'ok' ? '#12b981' : flash === 'no' ? '#ff4d8d' : '#2b2f5a';
      ctx.stroke();

      for (var i = 0; i < 60; i++) {
        var ang = (i * 6 - 90) * Math.PI / 180;
        var big = i % 5 === 0;
        var r1 = R - (big ? 22 : 12);
        var r2 = R - 8;
        ctx.beginPath();
        ctx.moveTo(cx + Math.cos(ang) * r1, cy + Math.sin(ang) * r1);
        ctx.lineTo(cx + Math.cos(ang) * r2, cy + Math.sin(ang) * r2);
        ctx.strokeStyle = big ? '#2b2f5a' : 'rgba(43,47,90,.35)';
        ctx.lineWidth = big ? 4 : 1.6;
        ctx.stroke();
      }

      ctx.fillStyle = '#2b2f5a';
      ctx.font = '700 21px system-ui';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      for (var n = 1; n <= 12; n++) {
        var a = (n * 30 - 90) * Math.PI / 180;
        ctx.fillText(n, cx + Math.cos(a) * (R - 40), cy + Math.sin(a) * (R - 40));
      }

      hand(cx, cy, (t.h % 12 + t.m / 60) * 30 - 90, R * 0.5, 10, '#2b2f5a');
      hand(cx, cy, t.m * 6 - 90, R * 0.78, 6, '#e63946');

      ctx.beginPath();
      ctx.arc(cx, cy, 7, 0, Math.PI * 2);
      ctx.fillStyle = '#ff9f1c';
      ctx.fill();
    }

    function hand(cx, cy, deg, len, w, color) {
      var a = deg * Math.PI / 180;
      ctx.beginPath();
      ctx.moveTo(cx - Math.cos(a) * 12, cy - Math.sin(a) * 12);
      ctx.lineTo(cx + Math.cos(a) * len, cy + Math.sin(a) * len);
      ctx.strokeStyle = color;
      ctx.lineWidth = w;
      ctx.lineCap = 'round';
      ctx.stroke();
    }

    function question() {
      lock = false;
      target = makeTime();
      draw(target);
      canvas.setAttribute('data-time', fmt(target));
      elFb.textContent = '';
      elFb.className = 'math-fb';

      var opts = [target];
      var guard = 0;
      while (opts.length < 4 && guard++ < 80) {
        var t = makeTime();
        if (!opts.some(function (o) { return o.h === t.h && o.m === t.m; })) opts.push(t);
      }
      elAns.innerHTML = opts.sort(function () { return Math.random() - 0.5; }).map(function (t) {
        return '<button class="ans-btn" data-h="' + t.h + '" data-m="' + t.m + '">' + fmt(t) + '</button>';
      }).join('');
    }

    function answer(btn) {
      if (lock || dead) return;
      lock = true;
      var h = +btn.dataset.h, m = +btn.dataset.m;
      var ok = h === target.h && m === target.m;
      elAns.querySelectorAll('.ans-btn').forEach(function (b) {
        b.disabled = true;
        if (+b.dataset.h === target.h && +b.dataset.m === target.m) b.classList.add('right');
      });

      if (ok) {
        correct++;
        streak++;
        api.addScore(100 + level * 30 + Math.min(120, streak * 15));
        elStreak.textContent = streak;
        elFb.textContent = '✓ ' + fmt(target) + ' — level ' + level;
        elFb.className = 'math-fb ok';
        draw(target, 'ok');
        api.sfx('good');
        if (correct >= cfg().goal) { levelClear(); return; }
        setTimeout(function () { if (!dead) question(); }, 850);
      } else {
        lives--;
        streak = 0;
        elStreak.textContent = 0;
        elLives.textContent = '❤️'.repeat(lives) + '🖤'.repeat(3 - lives);
        elFb.textContent = '✗ It was ' + fmt(target);
        elFb.className = 'math-fb no';
        draw(target, 'no');
        api.sfx('bad');
        if (lives <= 0) {
          dead = true;
          var g = gen;
          setTimeout(function () {
            if (g !== gen) return;
            api.gameOver({ title: 'Out of lives', text: 'You read ' + correct + ' clocks correctly.', onAgain: function () { api.clearOverlay(); startLevel(level); } });
          }, 900);
          return;
        }
        setTimeout(function () { if (!dead) question(); }, 1400);
      }
    }

    elAns.addEventListener('click', function (e) {
      var b = e.target.closest('.ans-btn');
      if (b) answer(b);
    });
    elLevels.addEventListener('click', function (e) {
      var b = e.target.closest ? e.target.closest('.lv-btn') : null;
      if (!b || b.disabled) return;
      var n = parseInt(b.getAttribute('data-lv'), 10);
      if (n !== level && n <= unlocked) { api.sfx('click'); startLevel(n); }
    });

    startLevel(1);

    return function () { dead = true; };
  }
});
