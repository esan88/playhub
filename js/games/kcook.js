/* Korean Cooking Lesson — an original step-by-step Korean recipe game.
   Dishes and characters are our own (cuisine is shared culture; no third-party IP). */
GamePortal.register('kcook', {
  title: 'Korean Cooking Lesson',
  emoji: '🍲',
  cat: 'girls',
  c1: '#dc2626',
  c2: '#fecaca',
  tags: ['korean', 'cooking', 'recipe', 'kitchen', 'kimbap', 'tteokbokki', 'bibimbap', 'hotteok', 'food', 'girls', 'lesson', 'seoul', 'levels'],
  rating: 4.9,
  plays: '0.2M',
  badge: 'New',
  controls: 'Read the recipe card · tap each ingredient it asks for · tap only',
  desc: 'Step into a cozy Seoul kitchen and learn 5 Korean dishes: kimbap, tteokbokki, bibimbap, hotteok and japchae. Follow the recipe card, tap the right ingredients in order and finish each dish before the timer — 3 hearts only!',
  play: function (stage, api) {
    var ING = {
      rice:     { e: '🍚', n: 'rice' },
      nori:     { e: '🟩', n: 'seaweed' },
      carrot:   { e: '🥕', n: 'carrot' },
      spinach:  { e: '🥬', n: 'spinach' },
      egg:      { e: '🥚', n: 'egg' },
      cake:     { e: '🍡', n: 'rice cake' },
      sauce:    { e: '🌶️', n: 'spicy sauce' },
      fishcake: { e: '🍥', n: 'fish cake' },
      onion:    { e: '🧅', n: 'green onion' },
      veggies:  { e: '🥦', n: 'veggies' },
      gochu:    { e: '🫙', n: 'gochujang' },
      sesame:   { e: '✨', n: 'sesame oil' },
      noodles:  { e: '🍜', n: 'glass noodles' },
      beef:     { e: '🥩', n: 'beef' },
      dough:    { e: '🫓', n: 'dough' },
      sugar:    { e: '🍬', n: 'sugar' },
      cinnamon: { e: '🪵', n: 'cinnamon' },
      butter:   { e: '🧈', n: 'butter' },
      seeds:    { e: '🌻', n: 'seeds' },
      mushroom: { e: '🍄', n: 'mushroom' },
      chips:    { e: '🧀', n: 'cheese' },
      soda:     { e: '🧃', n: 'juice box' },
      donut:    { e: '🍩', n: 'donut' },
      lolli:    { e: '🍭', n: 'lollipop' },
      grape:    { e: '🍇', n: 'grapes' },
      icecream: { e: '🍦', n: 'ice cream' }
    };
    var DECOYS = ['chips', 'soda', 'donut', 'lolli', 'grape', 'icecream'];
    var DISHES = [
      { n: 'Kimbap', e: '🍱', time: 50, steps: ['rice', 'nori', 'carrot', 'spinach', 'egg'] },
      { n: 'Tteokbokki', e: '🥘', time: 50, steps: ['cake', 'sauce', 'fishcake', 'onion', 'egg'] },
      { n: 'Bibimbap', e: '🥣', time: 55, steps: ['rice', 'egg', 'veggies', 'gochu', 'sesame', 'mushroom'] },
      { n: 'Hotteok', e: '🥞', time: 45, steps: ['dough', 'sugar', 'cinnamon', 'seeds', 'butter'] },
      { n: 'Japchae', e: '🍜', time: 55, steps: ['noodles', 'veggies', 'beef', 'sesame', 'onion'] }
    ];
    var key = 'ph_kcook_lvl';
    var unlocked = Math.min(DISHES.length, Math.max(1, GamePortal.store.get(key, 1)));
    var level = 1;

    var wrap = document.createElement('div');
    wrap.className = 'math-wrap kc-wrap';
    wrap.dataset.dish = '0';
    wrap.dataset.step = '0';
    wrap.dataset.hearts = '3';
    wrap.dataset.level = '1';
    wrap.innerHTML =
      '<div class="lv-strip" id="kc-levels"><span class="lv-strip-label">Dish</span></div>' +
      '<div class="lv-goal" id="kc-goal"></div>' +
      '<div class="math-top">' +
        '<span class="math-stat" id="kc-dish"></span>' +
        '<span class="math-stat" id="kc-hearts">❤️❤️❤️</span>' +
        '<span class="math-stat" id="kc-progress"></span>' +
      '</div>' +
      '<div class="timer-bar"><div class="timer-fill" id="kc-time"></div></div>' +
      '<div class="kc-prompt" id="kc-prompt"></div>' +
      '<div class="fs-opts kc-shelf" id="kc-shelf"></div>' +
      '<div class="hint" id="kc-hint">Follow the recipe card — tap every ingredient in order!</div>';
    stage.appendChild(wrap);

    var elDish = wrap.querySelector('#kc-dish');
    var elHearts = wrap.querySelector('#kc-hearts');
    var elProg = wrap.querySelector('#kc-progress');
    var elTime = wrap.querySelector('#kc-time');
    var elPrompt = wrap.querySelector('#kc-prompt');
    var elShelf = wrap.querySelector('#kc-shelf');
    var elHint = wrap.querySelector('#kc-hint');
    var elLevels = wrap.querySelector('#kc-levels');
    var elGoal = wrap.querySelector('#kc-goal');
    var step = 0, hearts = 3, left = DISHES[0].time, TIME = DISHES[0].time;
    var alive = true, busy = false, timer = null;

    function cfg() { return DISHES[level - 1]; }
    function renderLevels() {
      var html = '<span class="lv-strip-label">Dish</span>';
      for (var i = 1; i <= DISHES.length; i++) {
        var cls = 'lv-btn' + (i === level ? ' on' : '') + (i > unlocked ? ' locked' : '');
        html += '<button type="button" class="' + cls + '" data-lv="' + i + '"' + (i > unlocked ? ' disabled' : '') + '>' + i + '</button>';
      }
      elLevels.innerHTML = html;
      wrap.dataset.level = String(level);
      elGoal.textContent = 'Cook ' + cfg().e + ' ' + cfg().n + ' (' + level + '/' + DISHES.length + ')';
    }
    function shuffle(a) {
      for (var i = a.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var t = a[i]; a[i] = a[j]; a[j] = t;
      }
      return a;
    }
    function renderShelf() {
      var pool = shuffle(DECOYS.slice());
      var opts = cfg().steps.slice();
      opts.push(pool[0], pool[1]);
      opts = shuffle(opts);
      elShelf.innerHTML = opts.map(function (id) {
        return '<button type="button" class="fs-opt kc-ing" data-ing="' + id + '">' + ING[id].e + ' ' + ING[id].n + '</button>';
      }).join('');
    }
    function prompt() {
      var id = cfg().steps[step];
      var g = ING[id];
      elPrompt.innerHTML = '<span class="kc-pot">🍲</span><span class="kc-ask">Add <b>' + g.e + ' ' + g.n + '</b></span>';
      elDish.textContent = cfg().e + ' ' + cfg().n;
      elProg.textContent = 'Step ' + (step + 1) + ' / ' + cfg().steps.length;
      elHearts.textContent = '❤️'.repeat(Math.max(0, hearts)) + '🖤'.repeat(Math.max(0, 3 - hearts));
      elTime.style.width = Math.max(0, (left / TIME) * 100) + '%';
      wrap.dataset.dish = String(level - 1);
      wrap.dataset.step = String(step);
      wrap.dataset.hearts = String(hearts);
      api.setScore(step * 20);
    }
    function stopTimer() { if (timer) { clearInterval(timer); timer = null; } }
    function startTimer() {
      stopTimer();
      timer = setInterval(function () {
        if (!alive) return;
        left--;
        elTime.style.width = Math.max(0, (left / TIME) * 100) + '%';
        if (left <= 0) {
          alive = false;
          stopTimer();
          api.gameOver({
            title: '⏰ Kitchen closed!',
            text: 'Level ' + level + ' (' + cfg().n + '): step ' + (step + 1) + ' of ' + cfg().steps.length + '.',
            onAgain: function () { api.clearOverlay(); startLevel(level); }
          });
        }
      }, 1000);
    }
    function shake() {
      elShelf.classList.remove('shake');
      void elShelf.offsetWidth;
      elShelf.classList.add('shake');
    }
    function finishDish() {
      alive = false;
      busy = true;
      stopTimer();
      api.addScore(hearts * 15);
      if (level > unlocked) { unlocked = level; GamePortal.store.set(key, unlocked); }
      if (level >= DISHES.length) {
        api.win({
          title: 'Seoul Chef! 👩‍🍳',
          text: 'All ' + DISHES.length + ' dishes cooked — ' + api.score + ' points!'
        });
        return;
      }
      api.sfx('win');
      api.overlay({
        emoji: cfg().e,
        title: cfg().n + ' complete! ⭐',
        text: 'Next dish: ' + DISHES[level].e + ' ' + DISHES[level].n + ' — ' + DISHES[level].steps.length + ' steps, ' + DISHES[level].time + 's.',
        score: api.score,
        best: api.getBest(),
        onAgain: function () { api.clearOverlay(); level++; startLevel(level); }
      });
    }
    function startLevel(n) {
      level = Math.max(1, Math.min(DISHES.length, n));
      api.clearOverlay();
      api.setScore(0);
      step = 0; hearts = 3; alive = true; busy = false;
      TIME = cfg().time; left = TIME;
      renderLevels();
      renderShelf();
      prompt();
      startTimer();
    }
    function onTap(e) {
      if (!alive || busy) return;
      var b = e.target.closest('.kc-ing');
      if (!b) return;
      var want = cfg().steps[step];
      if (b.dataset.ing === want) {
        b.classList.add('on');
        b.disabled = true;
        step++;
        api.sfx('good');
        elHint.textContent = 'Sizzle! ' + ING[want].e + ' added.';
        if (step >= cfg().steps.length) { finishDish(); return; }
        prompt();
      } else {
        hearts--;
        api.sfx('bad');
        shake();
        elHint.textContent = 'Oops — the recipe says ' + ING[want].e + ' ' + ING[want].n + ' next!';
        prompt();
        if (hearts <= 0) {
          alive = false;
          stopTimer();
          api.gameOver({
            title: '😵 Dropped it!',
            text: 'Level ' + level + ' (' + cfg().n + '): you made it to step ' + (step + 1) + '.',
            onAgain: function () { api.clearOverlay(); startLevel(level); }
          });
        }
      }
    }
    elLevels.addEventListener('click', function (e) {
      var lvb = e.target.closest('.lv-btn');
      if (lvb && !lvb.classList.contains('locked')) {
        var n = parseInt(lvb.dataset.lv, 10);
        if (n !== level && n <= unlocked) { api.sfx('click'); startLevel(n); }
      }
    });
    elShelf.addEventListener('click', onTap);

    startLevel(1);

    return function () {
      alive = false;
      stopTimer();
    };
  }
});
