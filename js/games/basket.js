/* Basket Shot — stop the power meter inside the green zone */
GamePortal.register('basket', {
  title: 'Basket Shot',
  emoji: '🏀',
  cat: 'boys',
  c1: '#b85c1e',
  c2: '#f4a261',
  tags: ['basketball', 'sports', 'boys', 'arcade', 'kids', 'shoot', 'timing'],
  rating: 4.6,
  plays: '0.4M',
  badge: 'New',
  controls: 'Space / ↑ / tap the court when the power bar is inside the green zone',
  desc: 'Stop the swinging power meter inside the green zone to sink the shot. Three misses and the buzzer sounds!',
  play: function (stage, api) {
    var LEVELS = [
      { goal: 8, spd: 1 },
      { goal: 12, spd: 1.08 },
      { goal: 16, spd: 1.1664 },
      { goal: 20, spd: 1.259712 },
      { goal: 24, spd: 1.36048896 }
    ];
    var key = 'ph_basket_lvl';
    var unlocked = Math.min(LEVELS.length, Math.max(1, GamePortal.store.get(key, 1)));
    var level = 1;
    var wrap = document.createElement('div');
    wrap.className = 'quiz-wrap bs-wrap';
    wrap.dataset.level = '1';
    wrap.innerHTML =
      '<div class="lv-strip" id="bs-levels"><span class="lv-strip-label">Level</span></div>' +
      '<div class="lv-goal" id="bs-goal"></div>' +
      '<div class="math-top">' +
        '<span class="math-stat">🎯 Made <b id="bs-made">0</b></span>' +
        '<span class="math-stat">❤️ <b id="bs-miss">❤️❤️❤️</b></span>' +
        '<span class="math-stat">🔥 Streak <b id="bs-streak">0</b></span>' +
      '</div>' +
      '<div class="bs-hoop">' +
        '<div class="bs-board"></div><div class="bs-rim"></div><div class="bs-net"></div>' +
        '<div class="bs-ball" id="bs-ball">🏀</div>' +
      '</div>' +
      '<div class="bs-meter">' +
        '<div class="bs-fill" id="bs-fill"></div>' +
        '<div class="bs-zone" id="bs-zone"></div>' +
      '</div>' +
      '<div class="hint">Press Space or tap the court when the bar is inside the green zone!</div>';
    stage.appendChild(wrap);

    var elFill = wrap.querySelector('#bs-fill');
    var elZone = wrap.querySelector('#bs-zone');
    var elBall = wrap.querySelector('#bs-ball');
    var elMade = wrap.querySelector('#bs-made');
    var elMiss = wrap.querySelector('#bs-miss');
    var elStreak = wrap.querySelector('#bs-streak');
    var elGoal = wrap.querySelector('#bs-goal');
    var elLevels = wrap.querySelector('#bs-levels');

    var RANGE = 140, CENTER = 70, MAXH = 66;
    var t, p, half, frozen, over, made, misses, streak, last, raf, shotT, releaseT;

    function cfg() { return LEVELS[level - 1]; }
    function renderLevels() {
      var html = '<span class="lv-strip-label">Level</span>';
      for (var n = 1; n <= LEVELS.length; n++) {
        var cls = 'lv-btn' + (n === level ? ' on' : '') + (n > unlocked ? ' locked' : '');
        html += '<button type="button" class="' + cls + '" data-lv="' + n + '"' + (n > unlocked ? ' disabled' : '') + '>' + n + '</button>';
      }
      elLevels.innerHTML = html;
      elGoal.textContent = 'Sink ' + cfg().goal + ' shots to clear level ' + level + '!';
      wrap.dataset.level = String(level);
    }
    function startLevel(n) {
      level = Math.max(1, Math.min(LEVELS.length, n));
      api.clearOverlay();
      reset();
      renderLevels();
    }
    function levelClear() {
      over = true;
      if (level > unlocked) { unlocked = level; GamePortal.store.set(key, unlocked); }
      api.sfx('win');
      if (level >= LEVELS.length) {
        api.win({
          title: 'Buzzer Beater Legend! 🏆',
          text: 'All ' + LEVELS.length + ' levels cleared — ' + api.score + ' points!'
        });
        return;
      }
      api.overlay({
        emoji: '🏀',
        title: 'Level ' + level + ' complete!',
        text: 'Next: sink ' + LEVELS[level].goal + ' shots.',
        score: api.score,
        best: api.getBest(),
        onAgain: function () { api.clearOverlay(); level++; startLevel(level); }
      });
    }

    function reset() {
      t = 0;
      p = CENTER;
      half = 26;
      frozen = false;
      over = false;
      made = 0;
      misses = 0;
      streak = 0;
      last = 0;
      shotT = 0;
      releaseT = 0;
      elMade.textContent = '0';
      elMiss.textContent = '❤️❤️❤️';
      elStreak.textContent = '0';
      elFill.style.width = (p / RANGE * 100) + '%';
      elBall.style.transform = 'translate(-50%,0)';
      paintZone();
      api.setScore(0);
      wrap.dataset.power = String(CENTER);
    }

    function paintZone() {
      elZone.style.left = ((CENTER - half) / RANGE * 100) + '%';
      elZone.style.width = (half * 2 / RANGE * 100) + '%';
      wrap.dataset.zone = (CENTER - half) + ',' + (CENTER + half);
    }

    function shoot() {
      if (over || frozen) return;
      frozen = true;
      shotT = 0.6;
      api.sfx('click');
      elBall.style.transform = 'translate(-50%,-218px) scale(1.08)';
    }

    function resolve() {
      var good = p >= CENTER - half && p <= CENTER + half;
      elBall.style.transform = 'translate(-50%,0) scale(1)';
      if (over) return;
      if (good) {
        made++;
        var swish = Math.abs(p - CENTER) <= half * 0.5;
        streak++;
        api.addScore(swish ? 3 : 2);
        if (streak % 3 === 0) api.addScore(2);
        elMade.textContent = String(made);
        elStreak.textContent = String(streak);
        api.sfx(swish ? 'win' : 'good');
        half = Math.max(15, 26 - made * 1.4);
        paintZone();
        if (made >= cfg().goal) { levelClear(); return; }
      } else {
        misses++;
        streak = 0;
        elStreak.textContent = '0';
        elMiss.textContent = '❤️'.repeat(Math.max(0, 3 - misses)) + '🖤'.repeat(misses);
        api.sfx('bad');
        if (misses >= 3) {
          over = true;
          api.gameOver({
            title: '🥲 Buzzer beater!',
            text: 'Level ' + level + ': you made ' + made + ' shots for ' + api.score + ' points.',
            onAgain: function () { api.clearOverlay(); startLevel(level); }
          });
          return;
        }
      }
      releaseT = 0.32;
    }

    function step(dt) {
      if (shotT > 0) {
        shotT -= dt;
        if (shotT <= 0) resolve();
        return;
      }
      if (releaseT > 0) {
        releaseT -= dt;
        if (releaseT <= 0 && !over) frozen = false;
        return;
      }
      if (over) return;
      t += dt;
      p = CENTER + Math.sin(t * ((2.7 + made * 0.18) * cfg().spd)) * MAXH;
      elFill.style.width = (p / RANGE * 100) + '%';
      wrap.dataset.power = p.toFixed(1);
    }

    function loop(ts) {
      raf = requestAnimationFrame(loop);
      if (!last) last = ts;
      var dt = Math.min(0.05, (ts - last) / 1000);
      last = ts;
      step(dt);
    }

    function onKey(e) {
      var k = e.key.toLowerCase();
      if (k === ' ' || k === 'arrowup' || k === 'w') { e.preventDefault(); shoot(); }
    }

    wrap.addEventListener('pointerdown', function (e) {
      if (e.target.closest ? e.target.closest('.lv-btn') : null) return;
      e.preventDefault();
      shoot();
    });
    document.addEventListener('keydown', onKey);

    elLevels.addEventListener('click', function (e) {
      var b = e.target.closest ? e.target.closest('.lv-btn') : null;
      if (!b || b.disabled) return;
      var n = parseInt(b.getAttribute('data-lv'), 10);
      if (n !== level && n <= unlocked) { api.sfx('click'); startLevel(n); }
    });

    startLevel(1);
    raf = requestAnimationFrame(loop);

    return function () {
      over = true;
      cancelAnimationFrame(raf);
      document.removeEventListener('keydown', onKey);
    };
  }
});
