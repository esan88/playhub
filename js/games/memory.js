/* Memory Match — learning */
GamePortal.register('memory', {
  title: 'Memory Match',
  emoji: '🃏',
  cat: 'learning',
  c1: '#7b2ff7',
  c2: '#f107a3',
  tags: ['memory', 'matching', 'pairs', 'learning', 'kids', 'brain'],
  rating: 4.8,
  plays: '3.6M',
  badge: 'Top rated',
  controls: 'Click two cards to flip them · match the pairs',
  desc: 'Flip cards two at a time and find every matching pair. A friendly workout for your short-term memory.',
  play: function (stage, api) {
    var EMOJI = ['🍎','🍌','🍇','🍉','🍓','🥕','🌻','⚽','🚀','🎈','🐳','🦋','🎁','🎲','🧠','⭐'];
    var LEVELS = [
      { pairs: 6, cols: 4 },
      { pairs: 8, cols: 4 },
      { pairs: 10, cols: 4 },
      { pairs: 12, cols: 4 }
    ];
    var level = 0, moves = 0, matched = 0, lock = false, first = null, timer = null, sec = 0, dead = false;

    var wrap = document.createElement('div');
    wrap.className = 'mem-wrap';
    wrap.innerHTML =
      '<div class="mem-top">' +
        '<span>Level <b id="mem-lvl">1</b></span>' +
        '<span>Moves <b id="mem-moves">0</b></span>' +
        '<span>Time <b id="mem-time">0s</b></span>' +
        '<span>Pairs <b id="mem-pairs">0/0</b></span>' +
      '</div>' +
      '<div class="mem-grid" id="mem-grid"></div>';
    stage.appendChild(wrap);

    var grid = wrap.querySelector('#mem-grid');
    var elMoves = wrap.querySelector('#mem-moves');
    var elTime = wrap.querySelector('#mem-time');
    var elPairs = wrap.querySelector('#mem-pairs');
    var elLvl = wrap.querySelector('#mem-lvl');

    function shuffle(a) {
      for (var i = a.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var t = a[i]; a[i] = a[j]; a[j] = t;
      }
      return a;
    }

    function build() {
      dead = false;
      lock = false;
      first = null;
      moves = 0;
      matched = 0;
      sec = 0;
      var cfg = LEVELS[Math.min(level, LEVELS.length - 1)];
      elMoves.textContent = '0';
      elTime.textContent = '0s';
      elLvl.textContent = (level + 1);
      elPairs.textContent = '0/' + cfg.pairs;

      var picks = shuffle(EMOJI.slice()).slice(0, cfg.pairs);
      var deck = shuffle(picks.concat(picks));
      grid.style.setProperty('--cols', cfg.cols);
      grid.innerHTML = deck.map(function (e) {
        return '<button class="mem-card" type="button">' +
          '<span class="mem-inner">' +
            '<span class="mem-face mem-front">?</span>' +
            '<span class="mem-face mem-back">' + e + '</span>' +
          '</span></button>';
      }).join('');

      clearInterval(timer);
      timer = setInterval(function () {
        if (dead) return;
        sec++;
        elTime.textContent = sec + 's';
      }, 1000);
    }

    function flip(card) {
      if (lock || card === first || card.classList.contains('done') || card.classList.contains('flipped')) return;
      card.classList.add('flipped');
      api.sfx('flip');

      if (!first) { first = card; return; }

      moves++;
      elMoves.textContent = moves;
      var a = first, b = card;
      first = null;

      var match = a.querySelector('.mem-back').textContent === b.querySelector('.mem-back').textContent;
      if (match) {
        lock = true;
        setTimeout(function () {
          a.classList.add('done'); b.classList.add('done');
          a.classList.remove('flipped'); b.classList.remove('flipped');
          lock = false;
          matched++;
          var cfg = LEVELS[Math.min(level, LEVELS.length - 1)];
          elPairs.textContent = matched + '/' + cfg.pairs;
          api.addScore(100);
          api.sfx('good');
          if (matched >= cfg.pairs) finish(cfg);
        }, 330);
      } else {
        lock = true;
        api.sfx('bad');
        setTimeout(function () {
          a.classList.remove('flipped');
          b.classList.remove('flipped');
          lock = false;
        }, 750);
      }
    }

    function finish(cfg) {
      dead = true;
      clearInterval(timer);
      var bonus = Math.max(0, 60 - moves) * 15 + Math.max(0, 90 - sec) * 5 + (level + 1) * 100;
      api.addScore(bonus);
      var lastLevel = level >= LEVELS.length - 1;
      if (lastLevel) {
        api.win({
          emoji: '🏆',
          title: 'Master memory!',
          text: 'You cleared every board in ' + moves + ' moves and ' + sec + ' seconds.'
        });
      } else {
        api.overlay({
          emoji: '🧠',
          title: 'Board cleared!',
          text: 'Level ' + (level + 1) + ' done in ' + moves + ' moves, ' + sec + 's. Next board has ' +
                LEVELS[level + 1].pairs + ' pairs.',
          score: api.score,
          best: api.getBest(),
          onAgain: function () {
            api.clearOverlay();
            level++;
            build();
          }
        });
      }
    }

    grid.addEventListener('click', function (e) {
      var card = e.target.closest('.mem-card');
      if (card) flip(card);
    });

    build();

    return function () {
      dead = true;
      clearInterval(timer);
    };
  }
});
