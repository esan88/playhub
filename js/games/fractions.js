GamePortal.register('fractions', {
  title: 'Fraction Pizza',
  emoji: '🍕',
  cat: 'learning',
  c1: '#ea580c',
  c2: '#fbbf24',
  tags: ['fractions', 'pizza', 'math', 'parts', 'halves', 'quarters', 'numbers', 'learning', 'kids', 'food', 'education'],
  rating: 4.8,
  plays: '0.4M',
  badge: 'Learning',
  controls: 'Tap slices to eat exactly the target fraction, then press Check!',
  desc: 'Dinner is served! Each pizza is cut into equal slices — the order asks for a fraction like 1/2 or 3/4. Tap the right number of slices, watch the fraction readout, then press Check. Five levels of yummy fraction practice!',
  play: function (stage, api) {
    var LEVELS = [
      [[2, 1], [4, 1], [4, 3], [4, 2], [2, 1]],
      [[4, 3], [6, 2], [6, 4], [4, 1], [6, 3]],
      [[6, 5], [6, 3], [8, 6], [8, 2], [6, 1]],
      [[8, 7], [8, 3], [8, 4], [8, 5], [8, 1]],
      [[10, 5], [12, 7], [12, 9], [10, 3], [12, 4]]
    ];
    var key = 'ph_fractions_lvl';
    var unlocked = Math.min(LEVELS.length, Math.max(1, GamePortal.store.get(key, 1)));
    var level = 1;
    var alive = true;

    var wrap = document.createElement('div');
    wrap.className = 'kg jm frg';
    wrap.dataset.level = '1';
    wrap.dataset.qi = '0';
    wrap.dataset.eaten = '0';
    wrap.dataset.n = '2';
    wrap.dataset.target = '1';
    wrap.innerHTML =
      '<div class="lv-strip" id="fr-levels"><span class="lv-strip-label">Level</span></div>' +
      '<div class="lv-goal" id="fr-goal"></div>' +
      '<div class="fr-stage" style="text-align:center;margin:8px 0">' +
      '<svg id="fr-pizza" viewBox="0 0 200 200" width="230" height="230" style="max-width:100%"></svg>' +
      '</div>' +
      '<div class="math-top" style="justify-content:center;gap:14px">' +
      '<span class="math-stat" id="fr-readout">0 / 2</span>' +
      '<span class="math-stat" id="fr-prog">Order 1 / 5</span></div>' +
      '<div style="text-align:center;margin-top:10px"><button type="button" class="ans-btn" id="fr-check" style="padding:10px 28px;font-size:17px">Check!</button></div>' +
      '<div class="hint" id="fr-hint">Tap slices to eat them.</div>';
    stage.appendChild(wrap);

    var svg = wrap.querySelector('#fr-pizza');
    var elGoal = wrap.querySelector('#fr-goal');
    var elRead = wrap.querySelector('#fr-readout');
    var elProg = wrap.querySelector('#fr-prog');
    var elHint = wrap.querySelector('#fr-hint');
    var elLevels = wrap.querySelector('#fr-levels');
    var elCheck = wrap.querySelector('#fr-check');
    var q = 0, eaten = 0, N = 2, TARGET = 1;

    function gcd(a, b) { while (b) { var t = a % b; a = b; b = t; } return a; }
    function cfg() { return LEVELS[level - 1][q]; }
    function wedge(n, i) {
      var r = 88, c = 100;
      var a1 = (i * 2 * Math.PI) / n - Math.PI / 2;
      var a2 = ((i + 1) * 2 * Math.PI) / n - Math.PI / 2;
      var x1 = Math.round((c + r * Math.cos(a1)) * 100) / 100;
      var y1 = Math.round((c + r * Math.sin(a1)) * 100) / 100;
      var x2 = Math.round((c + r * Math.cos(a2)) * 100) / 100;
      var y2 = Math.round((c + r * Math.sin(a2)) * 100) / 100;
      var large = (2 * Math.PI) / n > Math.PI ? 1 : 0;
      return 'M100,100 L' + x1 + ',' + y1 + ' A' + r + ',' + r + ' 0 ' + large + ' 1 ' + x2 + ',' + y2 + ' Z';
    }
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
      var g = gcd(eaten, N);
      var txt = eaten + ' / ' + N;
      if (eaten > 0 && g > 1) txt += '  =  ' + (eaten / g) + ' / ' + (N / g);
      elRead.textContent = txt;
      elProg.textContent = 'Order ' + (q + 1) + ' / ' + LEVELS[level - 1].length;
      wrap.dataset.qi = String(q);
      wrap.dataset.eaten = String(eaten);
      wrap.dataset.n = String(N);
      wrap.dataset.target = String(TARGET);
      api.setScore(Math.max(0, (level - 1) * 100 + q * 20 + eaten * 2));
    }
    function renderPizza() {
      svg.innerHTML = '';
      var ns = 'http://www.w3.org/2000/svg';
      for (var i = 0; i < N; i++) {
        var p = document.createElementNS(ns, 'path');
        p.setAttribute('d', wedge(N, i));
        p.setAttribute('data-i', String(i));
        p.setAttribute('class', 'fr-slice');
        p.setAttribute('fill', '#ef4444');
        p.setAttribute('stroke', '#7f1d1d');
        p.setAttribute('stroke-width', '1.5');
        svg.appendChild(p);
      }
      var cheese = document.createElementNS(ns, 'circle');
      cheese.setAttribute('cx', '100'); cheese.setAttribute('cy', '100'); cheese.setAttribute('r', '10');
      cheese.setAttribute('fill', 'none'); cheese.setAttribute('stroke', 'rgba(0,0,0,0.08)');
      svg.appendChild(cheese);
    }
    function syncSlices() {
      var paths = svg.querySelectorAll('[data-i]');
      for (var i = 0; i < paths.length; i++) {
        paths[i].setAttribute('fill', i < eaten ? '#fdba74' : '#ef4444');
        if (i < eaten) paths[i].classList.add('fr-eat'); else paths[i].classList.remove('fr-eat');
      }
    }
    function renderQuestion() {
      var c = cfg();
      N = c[0]; TARGET = c[1]; eaten = 0;
      renderPizza();
      var tn = gcd(TARGET, N);
      elGoal.textContent = 'Level ' + level + ' — eat ' + (TARGET / tn) + ' / ' + (N / tn) + ' of the pizza (order ' + (q + 1) + ' of ' + LEVELS[level - 1].length + ')!';
      elHint.textContent = 'How many slices is ' + (TARGET / tn) + ' / ' + (N / tn) + '? Tap them, then Check!';
      syncSlices();
      hud();
    }
    function finishLevel() {
      if (level > unlocked) { unlocked = level; GamePortal.store.set(key, unlocked); }
      if (level >= LEVELS.length) {
        api.win({
          emoji: '👨‍🍳',
          title: 'Fraction Chef!',
          text: 'Every pizza order perfect — ' + api.score + ' points!'
        });
        return;
      }
      api.sfx('win');
      api.overlay({
        emoji: '🍕',
        title: 'Level ' + level + ' complete!',
        text: 'Yum! Next level has bigger fraction orders.',
        score: api.score,
        best: api.getBest(),
        onAgain: function () { api.clearOverlay(); level++; startLevel(level); }
      });
    }
    function startLevel(n) {
      level = Math.max(1, Math.min(LEVELS.length, n));
      api.clearOverlay();
      api.setScore(0);
      q = 0;
      alive = true;
      renderStrip();
      renderQuestion();
    }

    svg.addEventListener('click', function (e) {
      if (!alive) return;
      var t = e.target;
      if (!t.getAttribute || t.getAttribute('data-i') === null) return;
      var i = parseInt(t.getAttribute('data-i'), 10);
      if (i < eaten) { eaten = i; }
      else { eaten = i + 1; api.sfx('pop'); }
      syncSlices();
      elHint.textContent = 'You ate ' + eaten + ' of ' + N + ' slices.';
      hud();
    });
    elCheck.addEventListener('click', function () {
      if (!alive) return;
      if (eaten === TARGET) {
        api.sfx('good');
        elHint.textContent = 'Correct — that is ' + eaten + '/' + N + '! 🎉';
        q++;
        if (q >= LEVELS[level - 1].length) { alive = false; finishLevel(); return; }
        renderQuestion();
      } else {
        api.sfx('bad');
        if (eaten < TARGET) elHint.textContent = 'Almost — eat ' + (TARGET - eaten) + ' more slice' + (TARGET - eaten === 1 ? '' : 's') + '!';
        else elHint.textContent = 'Too many — put back ' + (eaten - TARGET) + ' slice' + (eaten - TARGET === 1 ? '' : 's') + '!';
      }
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
    };
  }
});
