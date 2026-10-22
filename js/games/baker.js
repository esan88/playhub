/* Baker's Kitchen — remember the customer's ingredient order */
GamePortal.register('baker', {
  title: "Baker's Kitchen",
  emoji: '🧁',
  cat: 'girls',
  c1: '#fb7185',
  c2: '#fde68a',
  tags: ['girls', 'baking', 'cake', 'memory', 'sequence', 'cooking', 'kids', 'fun', 'learning'],
  rating: 4.7,
  plays: '1.3M',
  badge: 'For girls',
  controls: 'Watch the order light up then tap the bowls in the same sequence',
  desc: 'Little customers show you their dream cake. Remember the ingredient order, bake it back and level up — new rounds get faster and longer!',
  play: function (stage, api) {
    var POOL = ['🍓', '🍌', '🍫', '🥝', '🍒', '🍪'];
    var dead = false, phase = 'show', level = 1, lives = 3, scoreLvl = 0;
    var seq = [], shown = [], step = 0, timers = [];

    function later(fn, ms) { var t = setTimeout(fn, ms); timers.push(t); return t; }

    var wrap = document.createElement('div');
    wrap.className = 'quiz-wrap bk-wrap';
    wrap.innerHTML =
      '<div class="quiz-top">' +
        '<span class="math-stat">Level <b id="bk-lvl">1</b></span>' +
        '<span class="math-stat">Orders baked <b id="bk-made">0</b></span>' +
        '<span class="math-stat">Lives <b id="bk-lives">❤️❤️❤️</b></span>' +
      '</div>' +
      '<div class="q-card">' +
        '<div class="q-kicker">🧁 The customer wants...</div>' +
        '<div class="bk-order" id="bk-order">' + POOL.map(function (e) {
          return '<span class="bk-slot">' + e + '</span>';
        }).join('') + '</div>' +
        '<div class="bk-msg hint" id="bk-msg">Watch closely!</div>' +
      '</div>' +
      '<div class="bk-bowls" id="bk-bowls">' + POOL.map(function (e) {
        return '<button class="bk-bowl" data-ing="' + e + '">' + e + '</button>';
      }).join('') + '</div>' +
      '<div class="math-fb" id="bk-fb"></div>';
    stage.appendChild(wrap);

    var elOrder = wrap.querySelector('#bk-order');
    var elMsg = wrap.querySelector('#bk-msg');
    var elFb = wrap.querySelector('#bk-fb');
    var elLvl = wrap.querySelector('#bk-lvl');
    var elMade = wrap.querySelector('#bk-made');
    var elLives = wrap.querySelector('#bk-lives');

    function fb(msg, cls) { elFb.textContent = msg; elFb.className = 'math-fb ' + (cls || ''); }
    function setPhase(p) { phase = p; wrap.dataset.phase = p; }

    function newSeq(len) {
      var out = [];
      for (var i = 0; i < len; i++) out.push(POOL[Math.floor(Math.random() * POOL.length)]);
      return out;
    }

    function paintOrder(upto) {
      elOrder.innerHTML = seq.map(function (e, i) {
        return '<span class="bk-slot' + (i < upto ? ' made' : '') + '">' + e + '</span>';
      }).join('');
    }

    function show(replay) {
      if (dead) return;
      if (!replay) seq = newSeq(Math.min(7, 2 + level));
      step = 0;
      setPhase('show');
      paintOrder(0);
      elMsg.textContent = 'Watch closely...';
      fb('');
      var lit = Math.max(340, 640 - level * 35);
      var gap = Math.max(150, 240 - level * 10);
      var t = 400;
      seq.forEach(function (e, i) {
        later(function () {
          if (dead) return;
          var bowl = wrap.querySelector('.bk-bowl[data-ing="' + e + '"]');
          if (bowl) bowl.classList.add('lit');
          paintOrder(i);
          api.sfx('flip');
        }, t);
        later(function () {
          if (dead) return;
          var bowl = wrap.querySelector('.bk-bowl[data-ing="' + e + '"]');
          if (bowl) bowl.classList.remove('lit');
        }, t + lit);
        t += lit + gap;
      });
      later(function () {
        if (dead) return;
        setPhase('repeat');
        elMsg.textContent = 'Now tap the bowls in the same order!';
      }, t + 150);
    }

    function wrong(bowl) {
      lives--;
      elLives.textContent = '❤️'.repeat(Math.max(0, lives)) + '🖤'.repeat(3 - Math.max(0, lives));
      api.sfx('bad');
      bowl.classList.add('shake');
      later(function () { if (!dead) bowl.classList.remove('shake'); }, 400);
      if (lives <= 0) {
        setPhase('over');
        dead = true;
        api.gameOver({
          title: 'Order up! 🧁',
          text: 'You baked ' + scoreLvl + ' order' + (scoreLvl === 1 ? '' : 's') + ' — level ' + level + '.'
        });
        return;
      }
      fb('Oops! Watch the order again', 'no');
      later(function () { show(true); }, 900);
    }

    wrap.querySelector('#bk-bowls').addEventListener('click', function (e) {
      var b = e.target.closest('.bk-bowl');
      if (!b || dead || phase !== 'repeat') return;
      if (b.dataset.ing === seq[step]) {
        b.classList.add('lit');
        later(function () { if (!dead) b.classList.remove('lit'); }, 220);
        step++;
        api.sfx('good');
        if (step >= seq.length) {
          setPhase('baking');
          scoreLvl++;
          elMade.textContent = scoreLvl;
          var pts = level * 20;
          api.addScore(pts);
          fb('Yummy! +' + pts + ' points', 'ok');
          level++;
          elLvl.textContent = level;
          elMsg.textContent = 'Baking... 🍰';
          later(function () { show(false); }, 950);
        }
      } else {
        wrong(b);
      }
    });

    setPhase('show');
    wrap.dataset.phase = 'show';
    show(false);

    return function () {
      dead = true;
      timers.forEach(clearTimeout);
      timers = [];
    };
  }
});
