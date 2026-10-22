/* Joyful Mathematics Class 1 — one interactive game per NCERT chapter (13 chapters) */
(function () {
  'use strict';

  /* ---------- scene builders ---------- */
  function rep(n, e) {
    var s = '';
    for (var i = 0; i < n; i++) s += '<span class="jm-e">' + e + '</span>';
    return s;
  }
  function grp(n, e) { return '<span class="jm-g">' + rep(n, e) + '</span>'; }
  function plus() { return '<span class="jm-plus">+</span>'; }
  function vs() { return '<span class="jm-plus">vs</span>'; }

  function twoGrp(a, ae, b, be) {
    return '<span class="jm-row">' + grp(a, ae) + plus() + grp(b, be) + '</span>';
  }
  function subGrp(n, e, take) {
    var s = '';
    for (var i = 0; i < n; i++) {
      s += '<span class="jm-e' + (i >= n - take ? ' jm-x' : '') + '">' + e + '</span>';
    }
    return '<span class="jm-row"><span class="jm-g">' + s + '</span></span>';
  }
  function repGroups(count, per, e) {
    var parts = [];
    for (var i = 0; i < count; i++) parts.push(grp(per, e));
    return '<span class="jm-row">' + parts.join(plus()) + '</span>';
  }
  function dots(k, n) {
    var s = '';
    for (var i = 0; i < n; i++) s += '<span class="jm-dot' + (i < k ? ' on' : '') + '"></span>';
    return '<span class="jm-dots">' + s + '</span>';
  }
  function boxes(t, ones, e) {
    var s = '';
    for (var i = 0; i < t; i++) s += '<span class="jm-e jm-box">📦</span>';
    if (ones > 0) s += '<span class="jm-plus">+</span>' + rep(ones, e);
    return '<span class="jm-row">' + s + '</span>';
  }
  function seqHtml(arr) {
    var s = '';
    for (var i = 0; i < arr.length; i++) s += '<span class="jm-si">' + arr[i] + '</span>';
    return '<span class="jm-seq">' + s + '</span>';
  }
  function numSeq(arr) {
    var s = '';
    for (var i = 0; i < arr.length; i++) s += '<span class="jm-si jm-sn">' + arr[i] + '</span>';
    return '<span class="jm-seq">' + s + '</span>';
  }
  function posScene(obj, style) {
    return '<span class="jm-pscene"><span class="jm-obj">' + obj + '</span>' +
      '<span class="jm-cat" style="' + style + '">🐱</span></span>';
  }
  function famRow(members) {
    var s = '';
    for (var i = 0; i < members.length; i++) {
      s += '<span class="jm-p" style="font-size:' + members[i].s + 'px">' + members[i].e + '</span>';
    }
    return '<span class="jm-fam">' + s + '</span>';
  }
  function barScene(a, b) {
    return '<span class="jm-lane">' +
      '<span class="jm-bl" style="width:' + a.w + 'px;background:' + a.c + '"></span>' +
      '<span class="jm-bl" style="width:' + b.w + 'px;background:' + b.c + '"></span></span>';
  }
  function money(list) {
    var s = '';
    for (var i = 0; i < list.length; i++) {
      var v = list[i];
      s += v >= 10
        ? '<span class="jm-note">₹' + v + '</span>'
        : '<span class="jm-coin">₹' + v + '</span>';
    }
    return '<span class="jm-m">' + s + '</span>';
  }
  function shuffle(arr) {
    var a = arr.slice(), i, j, t;
    for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  /* ---------- engine ---------- */
  function run(stage, api, def) {
    var dead = false, timer = null, qi = 0, right = 0, locked = false;
    var rounds = def.rounds;

    var root = document.createElement('div');
    root.className = 'game jm';
    stage.appendChild(root);

    function T(fn, ms) {
      if (timer) clearTimeout(timer);
      timer = setTimeout(function () { if (!dead) fn(); }, ms);
    }
    function cleanup() { dead = true; if (timer) { clearTimeout(timer); timer = null; } }

    function startScreen() {
      root.innerHTML =
        '<div class="jm-start start-screen">' +
          '<div class="jm-emo">' + def.emoji + '</div>' +
          '<div class="jm-chip">' + def.chapter + '</div>' +
          '<h3>' + def.title + '</h3>' +
          '<div class="jm-learn"><b>📖 What you will learn</b><ul><li>' +
            def.learn.join('</li><li>') +
          '</li></ul></div>' +
          '<button class="big-btn jm-go">▶ Start the game</button>' +
        '</div>';
      root.querySelector('.jm-go').onclick = function () {
        api.sfx('click');
        showRound();
      };
    }

    function progHtml() {
      return '<div class="jm-top">' +
        '<span class="jm-round">Round ' + (qi + 1) + ' / ' + rounds.length + '</span>' +
        '<span class="jm-bar"><span class="jm-fill" style="width:' +
          Math.round((qi) / rounds.length * 100) + '%"></span></span>' +
        '<span class="jm-pts">⭐ ' + (right * 10) + '</span>' +
      '</div>';
    }

    function showRound() {
      if (qi >= rounds.length) { finish(); return; }
      locked = false;
      var r = rounds[qi];
      var html = progHtml() +
        '<div class="jm-q">' + r.prompt + '</div>' +
        (r.scene ? '<div class="jm-scene">' + r.scene + '</div>' : '') +
        '<div class="jm-fb"></div>';

      if (r.type === 'order') {
        var n = r.items.length;
        var slots = '';
        for (var s = 0; s < n; s++) slots += '<span class="jm-slot" data-slot="' + s + '"></span>';
        html += '<div class="jm-seqrow">' + slots + '</div>';
        html += '<div class="jm-opts jm-opts-order">';
        var order = shuffle(r.items.map(function (it, i) { return i; }));
        for (var k = 0; k < order.length; k++) {
          var it = r.items[order[k]];
          html += '<button class="jm-opt jm-pick" data-ci="' + order[k] + '">' +
            '<span class="jm-oe">' + it.e + '</span><span class="jm-ot">' + it.t + '</span></button>';
        }
        html += '</div>';
      } else {
        html += '<div class="jm-opts' + (r.opts.length > 3 ? ' jm-opts-wide' : '') + '">';
        for (var i = 0; i < r.opts.length; i++) {
          var o = r.opts[i];
          html += '<button class="jm-opt" data-i="' + i + '"' + (o.s ? ' style="' + o.s + '"' : '') + '>' +
            (o.e ? '<span class="jm-oe"' + (o.es ? ' style="' + o.es + '"' : '') + '>' + o.e + '</span>' : '') +
            '<span class="jm-ot">' + o.t + '</span>' +
            (o.sub ? '<span class="jm-os">' + o.sub + '</span>' : '') +
          '</button>';
        }
        html += '</div>';
      }

      root.innerHTML = html;
      bindRound(r);
    }

    function bindRound(r) {
      var fb = root.querySelector('.jm-fb');
      var picks = root.querySelectorAll('.jm-opt');

      if (r.type === 'order') {
        var want = 0, hadError = false;
        for (var i = 0; i < picks.length; i++) {
          (function (btn) {
            btn.onclick = function () {
              if (locked || btn.classList.contains('used')) return;
              var ci = +btn.dataset.ci;
              if (ci === want) {
                btn.classList.add('used');
                api.sfx('pop');
                var slot = root.querySelector('.jm-slot[data-slot="' + want + '"]');
                slot.innerHTML = '<span class="jm-se">' + r.items[ci].e + '</span>' +
                  '<span class="jm-st">' + r.items[ci].t + '</span>';
                slot.classList.add('filled');
                want++;
                if (want === r.items.length) {
                  locked = true;
                  if (hadError) {
                    fb.textContent = 'Almost! The right order was shown step by step. 🌈';
                    fb.classList.add('bad');
                    T(next, 1900);
                  } else {
                    fb.textContent = '🌟 Perfect order!';
                    right++;
                    api.addScore(10);
                    api.sfx('good');
                    T(next, 1100);
                  }
                }
              } else {
                hadError = true;
                btn.classList.add('shake');
                api.sfx('bad');
                setTimeout(function () { btn.classList.remove('shake'); }, 380);
              }
            };
          })(picks[i]);
        }
        return;
      }

      for (var j = 0; j < picks.length; j++) {
        (function (btn) {
          btn.onclick = function () {
            if (locked) return;
            var o = r.opts[+btn.dataset.i];
            locked = true;
            if (o.ok) {
              btn.classList.add('ok');
              fb.textContent = '🌟 ' + (r.yay || 'Great job!');
              right++;
              api.addScore(10);
              api.sfx('good');
              T(next, 950);
            } else {
              btn.classList.add('no');
              var all = root.querySelectorAll('.jm-opt');
              for (var k = 0; k < all.length; k++) {
                if (r.opts[+all[k].dataset.i].ok) all[k].classList.add('ok');
              }
              var correct = null;
              for (var m = 0; m < r.opts.length; m++) if (r.opts[m].ok) correct = r.opts[m];
              fb.textContent = 'The answer is ' + ((correct && correct.t) || '') + ' ✏️';
              fb.classList.add('bad');
              api.sfx('bad');
              T(next, 1750);
            }
          };
        })(picks[j]);
      }
    }

    function next() { qi++; showRound(); }

    function finish() {
      var n = rounds.length;
      if (right === n) {
        api.win({ emoji: '🌟', title: 'Perfect score!', text: 'You got all ' + n + ' right. You are a Class 1 star!' });
      } else if (right >= Math.ceil(n / 2)) {
        api.win({ emoji: '🎉', title: 'Well done!', text: 'You got ' + right + ' out of ' + n + ' right. Keep learning!' });
      } else {
        api.gameOver({ title: 'Nice try!', text: 'You got ' + right + ' out of ' + n + '. Play again — you will do better!' });
      }
    }

    startScreen();
    return cleanup;
  }

  /* ---------- chapter registry ---------- */
  function def(d) {
    return function () { return d; };
  }

  function register(d) {
    GamePortal.register(d.id, {
      title: d.title,
      emoji: d.emoji,
      cat: 'class1',
      c1: d.c1,
      c2: d.c2,
      tags: d.tags,
      rating: d.rating,
      plays: d.plays,
      badge: 'Class 1',
      controls: d.controls || 'Tap the correct answer',
      desc: d.desc,
      play: function (stage, api) { return run(stage, api, d); }
    });
  }

  var BASE_TAGS = ['class 1', 'ncert', 'joyful maths', 'maths for kids'];

  /* ===== Chapter 1 — Finding the Furry Cat! (position words) ===== */
  register({
    id: 'jm1',
    chapter: 'Chapter 1 · Class 1 Maths',
    title: 'Finding the Furry Cat!',
    emoji: '🐱',
    c1: '#16324f', c2: '#2ec4b6',
    tags: ['chapter 1', 'positions', 'inside', 'outside', 'above', 'under'].concat(BASE_TAGS),
    rating: 4.8, plays: '6.4K',
    desc: 'The furry cat is hiding again! Find her and learn position words like on, under, inside, outside, above and below.',
    learn: ['Position words: on, under, above, below, inside, outside', 'Say exactly where things are with the right word'],
    rounds: [
      { prompt: 'Where is the cat?', scene: posScene('🛏️', 'left:50%;top:-8px;transform:translateX(-50%)'),
        opts: [{ t: 'on', ok: true }, { t: 'under' }, { t: 'inside' }, { t: 'above' }] },
      { prompt: 'Where is the cat?', scene: posScene('🛏️', 'left:50%;top:97%;transform:translateX(-50%)'),
        opts: [{ t: 'on' }, { t: 'under', ok: true }, { t: 'outside' }, { t: 'above' }] },
      { prompt: 'Where is the cat?', scene: posScene('🎒', 'left:50%;top:44%;transform:translateX(-50%);z-index:0'),
        opts: [{ t: 'on' }, { t: 'under' }, { t: 'inside', ok: true }, { t: 'outside' }] },
      { prompt: 'Where is the cat?', scene: posScene('🎒', 'left:calc(100% + 8px);bottom:0'),
        opts: [{ t: 'inside' }, { t: 'outside', ok: true }, { t: 'on' }, { t: 'under' }] },
      { prompt: 'Where is the cat?', scene: posScene('🪖', 'left:50%;top:-58px;transform:translateX(-50%)'),
        opts: [{ t: 'on' }, { t: 'above', ok: true }, { t: 'under' }, { t: 'below' }] },
      { prompt: 'Where is the cat?', scene: posScene('🌳', 'left:50%;top:100%;transform:translateX(-50%)'),
        opts: [{ t: 'above' }, { t: 'below', ok: true }, { t: 'inside' }, { t: 'on' }] }
    ]
  });

  /* ===== Chapter 2 — What is Long? What is Round? ===== */
  register({
    id: 'jm2',
    chapter: 'Chapter 2 · Class 1 Maths',
    title: 'What Is Long? What Is Round?',
    emoji: '📏',
    c1: '#3d2b56', c2: '#f98b4f',
    tags: ['chapter 2', 'shapes', 'long', 'round', 'roll', 'slide'].concat(BASE_TAGS),
    rating: 4.7, plays: '4.1K',
    desc: 'Look around, look around! Spot long and round things, and find out which objects roll and which ones slide.',
    learn: ['Long things and round things around you', 'Objects that roll and objects that slide'],
    controls: 'Tap the object with the right shape',
    rounds: [
      { prompt: 'Which one is ROUND?', opts: [
        { e: '⚽', t: 'Ball', ok: true }, { e: '✏️', t: 'Pencil' }, { e: '📦', t: 'Box' }] },
      { prompt: 'Which one is LONG?', opts: [
        { e: '✏️', t: 'Pencil', ok: true }, { e: '🍪', t: 'Cookie' }, { e: '⚽', t: 'Ball' }] },
      { prompt: 'Which object ROLLS on the floor?', opts: [
        { e: '⚽', t: 'Ball', ok: true }, { e: '🧃', t: 'Juice box' }, { e: '📕', t: 'Book' }] },
      { prompt: 'Which object SLIDES on the floor?', opts: [
        { e: '🧰', t: 'Matchbox', ok: true }, { e: '⚽', t: 'Ball' }, { e: '🍊', t: 'Orange' }] },
      { prompt: 'Which stick is LONGER?', scene: barScene(
          { w: 170, c: 'linear-gradient(90deg,#12b981,#4ade80)' },
          { w: 74, c: 'linear-gradient(90deg,#ef476f,#ff7b9c)' }),
        opts: [{ t: 'Green stick', ok: true }, { t: 'Red stick' }] },
      { prompt: 'Which shape is round, like a ball?', opts: [
        { e: '🔴', t: 'Circle', ok: true }, { e: '🟦', t: 'Square' }, { e: '🔺', t: 'Triangle' }] }
    ]
  });

  /* ===== Chapter 3 — Mango Treat (counting 1–9) ===== */
  register({
    id: 'jm3',
    chapter: 'Chapter 3 · Class 1 Maths',
    title: 'Mango Treat',
    emoji: '🥭',
    c1: '#5b2c1d', c2: '#ffb703',
    tags: ['chapter 3', 'counting', 'numbers', 'one more', 'birds'].concat(BASE_TAGS),
    rating: 4.9, plays: '5.7K',
    desc: 'The birds and animals are joining for a juicy mango! Count them and learn numbers 1 to 9 with one-more joins.',
    learn: ['Counting numbers 1 to 9', 'One more than a number'],
    rounds: [
      { prompt: 'How many birds are eating the mango?', scene: '<span class="jm-row">' + rep(4, '🐦') + '</span>',
        opts: [{ t: '3' }, { t: '4', ok: true }, { t: '5' }] },
      { prompt: 'How many birds are eating now?', scene: '<span class="jm-row">' + rep(9, '🐦') + '</span>',
        opts: [{ t: '8' }, { t: '9', ok: true }, { t: '10' }] },
      { prompt: '6 birds are eating. One more joins. How many now?',
        scene: twoGrp(6, '🐦', 1, '🐦'),
        opts: [{ t: '6' }, { t: '7', ok: true }, { t: '8' }] },
      { prompt: 'What is one more than 7?',
        opts: [{ t: '6' }, { t: '8', ok: true }, { t: '9' }], yay: 'One more than 7 is 8!' },
      { prompt: 'Which number comes BEFORE 6?',
        opts: [{ t: '4' }, { t: '5', ok: true }, { t: '7' }] },
      { prompt: 'What is one more than 3?',
        opts: [{ t: '2' }, { t: '3' }, { t: '4', ok: true }] }
    ]
  });

  /* ===== Chapter 4 — Dotty Bug & Making 10 ===== */
  register({
    id: 'jm4',
    chapter: 'Chapter 4 · Class 1 Maths',
    title: 'Dotty Bug Makes 10',
    emoji: '🐞',
    c1: '#7a1f2b', c2: '#ff4d8d',
    tags: ['chapter 4', 'making 10', 'number pairs', 'ladybug', 'bonds'].concat(BASE_TAGS),
    rating: 4.8, plays: '4.9K',
    desc: 'Dotty Bug counts her spots! Fill the empty dots, learn number pairs that make 10 — and 10 and some more makes 11, 12, 13…',
    learn: ['Number pairs that make 10 (and 5)', '10 and 4 is 14, 10 and 5 is 15…'],
    controls: 'Tap how many more are needed',
    rounds: [
      { prompt: 'Dotty has 7 dots. How many more dots to make 10?', scene: dots(7, 10),
        opts: [{ t: '2' }, { t: '3', ok: true }, { t: '4' }], yay: '7 and 3 make 10!' },
      { prompt: 'How many more dots to make 10?', scene: dots(4, 10),
        opts: [{ t: '5' }, { t: '6', ok: true }, { t: '7' }], yay: '4 and 6 make 10!' },
      { prompt: 'How many more dots to make 10?', scene: dots(9, 10),
        opts: [{ t: '0' }, { t: '1', ok: true }, { t: '2' }], yay: '9 and 1 make 10!' },
      { prompt: 'How many more dots to make 10?', scene: dots(5, 10),
        opts: [{ t: '4' }, { t: '5', ok: true }, { t: '6' }], yay: '5 and 5 make 10!' },
      { prompt: 'Show 3 fingers. How many more fingers make 5?', scene: dots(3, 5),
        opts: [{ t: '1' }, { t: '2', ok: true }, { t: '3' }], yay: '3 and 2 make 5!' },
      { prompt: '10 and 4 is…', scene: '<span class="jm-row"><span class="jm-ten">10</span>' +
          '<span class="jm-plus">+</span><span class="jm-ten">4</span></span>',
        opts: [{ t: '13' }, { t: '14', ok: true }, { t: '40' }], yay: '10 and 4 is 14!' }
    ]
  });

  /* ===== Chapter 5 — How Many? (add & take away) ===== */
  register({
    id: 'jm5',
    chapter: 'Chapter 5 · Class 1 Maths',
    title: 'How Many?',
    emoji: '➕',
    c1: '#123c6b', c2: '#4cc9f0',
    tags: ['chapter 5', 'addition', 'subtraction', 'altogether', 'left'].concat(BASE_TAGS),
    rating: 4.7, plays: '5.2K',
    desc: 'Going out with grandfather! Put two groups together to see how many altogether — and find how many are left when some go away.',
    learn: ['Adding two groups — how many altogether?', 'Taking away — how many are left?'],
    rounds: [
      { prompt: '4 children and 2 children — how many altogether?', scene: twoGrp(4, '🧒', 2, '🧒'),
        opts: [{ t: '5' }, { t: '6', ok: true }, { t: '7' }], yay: '4 + 2 = 6' },
      { prompt: '3 tops and 1 top — how many altogether?', scene: twoGrp(3, '🎾', 1, '🎾'),
        opts: [{ t: '3' }, { t: '4', ok: true }, { t: '5' }], yay: '3 + 1 = 4' },
      { prompt: '4 pencils and 3 pencils — how many altogether?', scene: twoGrp(4, '✏️', 3, '✏️'),
        opts: [{ t: '6' }, { t: '7', ok: true }, { t: '8' }], yay: '4 + 3 = 7' },
      { prompt: '6 frogs. 2 jumped away. How many are left?', scene: subGrp(6, '🐸', 2),
        opts: [{ t: '3' }, { t: '4', ok: true }, { t: '5' }], yay: '6 − 2 = 4' },
      { prompt: '7 balloons. 2 flew away. How many are left?', scene: subGrp(7, '🎈', 2),
        opts: [{ t: '4' }, { t: '5', ok: true }, { t: '6' }], yay: '7 − 2 = 5' },
      { prompt: '9 bananas. 6 were taken away. How many are left?', scene: subGrp(9, '🍌', 6),
        opts: [{ t: '2' }, { t: '3', ok: true }, { t: '4' }], yay: '9 − 6 = 3' }
    ]
  });

  /* ===== Chapter 6 — Vegetable Farm ===== */
  register({
    id: 'jm6',
    chapter: 'Chapter 6 · Class 1 Maths',
    title: 'Vegetable Farm',
    emoji: '🥕',
    c1: '#1d4a2c', c2: '#95d5b2',
    tags: ['chapter 6', 'addition', 'subtraction', 'vegetables', 'baskets'].concat(BASE_TAGS),
    rating: 4.6, plays: '3.8K',
    desc: 'Rumi and Shami fill their baskets with vegetables. Add the two baskets — then practise taking vegetables away!',
    learn: ['Adding baskets of vegetables up to 20', 'Subtracting with bigger numbers like 15 − 9'],
    rounds: [
      { prompt: '7 tomatoes and 5 tomatoes — how many altogether?', scene: twoGrp(7, '🍅', 5, '🍅'),
        opts: [{ t: '11' }, { t: '12', ok: true }, { t: '13' }], yay: '7 + 5 = 12' },
      { prompt: '9 carrots and 4 carrots — how many altogether?', scene: twoGrp(9, '🥕', 4, '🥕'),
        opts: [{ t: '12' }, { t: '13', ok: true }, { t: '14' }], yay: '9 + 4 = 13' },
      { prompt: '8 radishes and 8 radishes — how many altogether?', scene: twoGrp(8, '🥬', 8, '🥬'),
        opts: [{ t: '14' }, { t: '16', ok: true }, { t: '18' }], yay: '8 + 8 = 16' },
      { prompt: '15 − 9 = ?', opts: [{ t: '5' }, { t: '6', ok: true }, { t: '7' }], yay: '15 − 9 = 6' },
      { prompt: '16 − 4 = ?', opts: [{ t: '10' }, { t: '11' }, { t: '12', ok: true }], yay: '16 − 4 = 12' },
      { prompt: '13 − 3 = ?', opts: [{ t: '8' }, { t: '10', ok: true }, { t: '12' }], yay: '13 − 3 = 10' }
    ]
  });

  /* ===== Chapter 7 — Lina's Family (comparing) ===== */
  register({
    id: 'jm7',
    chapter: 'Chapter 7 · Class 1 Maths',
    title: "Lina's Family",
    emoji: '👪',
    c1: '#4a2c6b', c2: '#c77dff',
    tags: ['chapter 7', 'tallest', 'shortest', 'heavier', 'lighter', 'measure'].concat(BASE_TAGS),
    rating: 4.7, plays: '3.5K',
    desc: "Lina's family get together! Compare people and things — tallest, shortest, longest, heavier and lighter.",
    learn: ['Tallest and shortest, longest and shortest', 'Heavier and lighter, thicker and thinner'],
    controls: 'Tap the one the question asks for',
    rounds: [
      { prompt: 'Who is the TALLEST in Lina’s family?',
        scene: famRow([{ e: '👧', s: 34 }, { e: '🧔', s: 56 }, { e: '👵', s: 46 }, { e: '👦', s: 28 }]),
        opts: [{ e: '👧', t: 'Lina', es: 'font-size:26px' }, { e: '🧔', t: 'Papa', es: 'font-size:34px', ok: true },
               { e: '👵', t: 'Dadi', es: 'font-size:30px' }, { e: '👦', t: 'Brother', es: 'font-size:22px' }] },
      { prompt: 'Who is the SHORTEST in Lina’s family?',
        scene: famRow([{ e: '👧', s: 34 }, { e: '🧔', s: 56 }, { e: '👵', s: 46 }, { e: '👦', s: 28 }]),
        opts: [{ e: '👧', t: 'Lina', es: 'font-size:26px' }, { e: '🧔', t: 'Papa', es: 'font-size:34px' },
               { e: '👵', t: 'Dadi', es: 'font-size:30px' }, { e: '👦', t: 'Brother', es: 'font-size:22px', ok: true }] },
      { prompt: 'Which stick is LONGEST?', scene: barScene(
          { w: 180, c: 'linear-gradient(90deg,#12b981,#4ade80)' },
          { w: 80, c: 'linear-gradient(90deg,#ef476f,#ff7b9c)' }),
        opts: [{ t: 'Green stick', ok: true }, { t: 'Red stick' }] },
      { prompt: 'Which stick is SHORTEST?', scene: barScene(
          { w: 64, c: 'linear-gradient(90deg,#f97316,#fbbf24)' },
          { w: 150, c: 'linear-gradient(90deg,#4cc9f0,#4361ee)' }),
        opts: [{ t: 'Orange stick', ok: true }, { t: 'Blue stick' }] },
      { prompt: 'Which one is HEAVIER?', scene: '<span class="jm-row">' + grp(1, '🍎') + vs() + grp(1, '🪨') + '</span>',
        opts: [{ e: '🍎', t: 'Apple' }, { e: '🪨', t: 'Rock', ok: true }] },
      { prompt: 'Which one is LIGHTER?', scene: '<span class="jm-row">' + grp(1, '🪶') + vs() + grp(1, '🧱') + '</span>',
        opts: [{ e: '🪶', t: 'Feather', ok: true }, { e: '🧱', t: 'Brick' }] }
    ]
  });

  /* ===== Chapter 8 — Fun with Numbers (21–30, tens & ones) ===== */
  register({
    id: 'jm8',
    chapter: 'Chapter 8 · Class 1 Maths',
    title: 'Fun with Numbers',
    emoji: '📦',
    c1: '#6b3a12', c2: '#f4a261',
    tags: ['chapter 8', '21 to 30', 'tens and ones', 'counting', 'biggest number'].concat(BASE_TAGS),
    rating: 4.8, plays: '4.6K',
    desc: 'Simran packs oranges — every box holds 10! Count boxes and loose oranges to master numbers 21 to 30.',
    learn: ['Numbers 21 to 30 — tens and ones', 'Biggest and smallest numbers, counting backwards'],
    rounds: [
      { prompt: 'How many oranges in all?', scene: boxes(2, 1, '🍊'),
        opts: [{ t: '12' }, { t: '21', ok: true }, { t: '22' }], yay: '2 tens and 1 one is 21' },
      { prompt: 'How many oranges in all?', scene: boxes(2, 3, '🍊'),
        opts: [{ t: '13' }, { t: '23', ok: true }, { t: '32' }], yay: '2 tens and 3 ones is 23' },
      { prompt: 'How many oranges in all?', scene: boxes(2, 5, '🍊'),
        opts: [{ t: '25', ok: true }, { t: '15' }, { t: '28' }], yay: '2 tens and 5 ones is 25' },
      { prompt: '3 full boxes and no loose oranges. How many?', scene: boxes(3, 0, '🍊'),
        opts: [{ t: '3' }, { t: '30', ok: true }, { t: '33' }], yay: '3 tens is 30' },
      { prompt: 'Which is the BIGGEST number?', scene: numSeq(['16', '19', '11']),
        opts: [{ t: '16' }, { t: '19', ok: true }, { t: '11' }] },
      { prompt: 'Which number comes BEFORE 15?', opts: [{ t: '14', ok: true }, { t: '16' }, { t: '15' }],
        yay: 'Counting backwards: 14, 15!' }
    ]
  });

  /* ===== Chapter 9 — Utsav (patterns) ===== */
  register({
    id: 'jm9',
    chapter: 'Chapter 9 · Class 1 Maths',
    title: 'Utsav Patterns',
    emoji: '🎊',
    c1: '#6b1f4a', c2: '#ff70a6',
    tags: ['chapter 9', 'patterns', 'what comes next', 'rangoli', 'utsav'].concat(BASE_TAGS),
    rating: 4.9, plays: '3.2K',
    desc: 'Festivals are full of patterns! Watch colours, shapes and numbers repeat — and tap what comes next.',
    learn: ['Patterns with colours, shapes and numbers', 'What comes next in a pattern?'],
    controls: 'Tap what comes next in the pattern',
    rounds: [
      { prompt: 'What comes NEXT in the pattern?', scene: seqHtml(['🔴', '🟢', '🔴', '🟢', '🔴', '<span class="jm-ask">❓</span>']),
        opts: [{ e: '🟢', t: 'Green', ok: true }, { e: '🔴', t: 'Red' }, { e: '🟡', t: 'Yellow' }] },
      { prompt: 'What comes NEXT?', scene: seqHtml(['🔔', '🎀', '🔔', '🎀', '🔔', '<span class="jm-ask">❓</span>']),
        opts: [{ e: '🎀', t: 'Ribbon', ok: true }, { e: '🔔', t: 'Bell' }, { e: '⭐', t: 'Star' }] },
      { prompt: 'What number comes NEXT?', scene: numSeq(['2', '4', '6', '8', '❓']),
        opts: [{ t: '9' }, { t: '10', ok: true }, { t: '12' }], yay: 'Say it: 2, 4, 6, 8, 10!' },
      { prompt: 'What number comes NEXT?', scene: numSeq(['5', '10', '15', '❓']),
        opts: [{ t: '18' }, { t: '20', ok: true }, { t: '25' }], yay: 'Jumps of 5: 5, 10, 15, 20!' },
      { prompt: 'What comes NEXT?', scene: seqHtml(['⬛', '⚪', '⬛', '⚪', '⬛', '<span class="jm-ask">❓</span>']),
        opts: [{ e: '⚪', t: 'White', ok: true }, { e: '⬛', t: 'Black' }, { e: '🟨', t: 'Yellow' }] },
      { prompt: 'What comes NEXT?', scene: seqHtml(['🌸', '🌼', '🌸', '🌼', '🌸', '<span class="jm-ask">❓</span>']),
        opts: [{ e: '🌼', t: 'Yellow flower', ok: true }, { e: '🌸', t: 'Pink flower' }, { e: '🌺', t: 'Hibiscus' }] }
    ]
  });

  /* ===== Chapter 10 — How Do I Spend My Day? ===== */
  register({
    id: 'jm10',
    chapter: 'Chapter 10 · Class 1 Maths',
    title: 'How Do I Spend My Day?',
    emoji: '⏰',
    c1: '#152a5e', c2: '#f9c74f',
    tags: ['chapter 10', 'daily routine', 'morning', 'night', 'seasons', 'time'].concat(BASE_TAGS),
    rating: 4.6, plays: '3.9K',
    desc: "Pihu shares her day from morning to night! Put her routine in order and learn morning, afternoon, evening, night and seasons.",
    learn: ['Morning, afternoon, evening and night', 'Daily routine in order — and seasons'],
    controls: 'Tap the cards in the right order',
    rounds: [
      { type: 'order', prompt: 'Put Pihu’s morning in the right order — tap from first to last',
        items: [{ e: '🌅', t: 'Wake up' }, { e: '🛁', t: 'Bath' }, { e: '🥣', t: 'Breakfast' }, { e: '🏫', t: 'School' }] },
      { type: 'order', prompt: 'Put the evening and night in the right order',
        items: [{ e: '⚽', t: 'Play' }, { e: '🍽️', t: 'Dinner' }, { e: '📖', t: 'Story' }, { e: '🌙', t: 'Sleep' }] },
      { prompt: 'The moon and the stars are in the sky. What time is it?',
        opts: [{ e: '🌅', t: 'Morning' }, { e: '🌤️', t: 'Afternoon' }, { e: '🌙', t: 'Night', ok: true }] },
      { prompt: 'It is afternoon. What does Pihu do?',
        opts: [{ e: '🌙', t: 'Sleep' }, { e: '🍱', t: 'Have lunch', ok: true }, { e: '🌅', t: 'Wake up' }] },
      { prompt: 'What comes AFTER breakfast?',
        opts: [{ e: '🏫', t: 'Go to school', ok: true }, { e: '🌅', t: 'Wake up' }, { e: '🌙', t: 'Sleep' }] },
      { prompt: 'Which season brings snow?',
        opts: [{ e: '❄️', t: 'Winter', ok: true }, { e: '☀️', t: 'Summer' }, { e: '🌧️', t: 'Monsoon' }] }
    ]
  });

  /* ===== Chapter 11 — How Many Times? (equal groups) ===== */
  register({
    id: 'jm11',
    chapter: 'Chapter 11 · Class 1 Maths',
    title: 'How Many Times?',
    emoji: '🎠',
    c1: '#0b3d5c', c2: '#06d6a0',
    tags: ['chapter 11', 'equal groups', 'repeated addition', 'amusement park', 'times'].concat(BASE_TAGS),
    rating: 4.8, plays: '3.6K',
    desc: 'A day at the amusement park! Count equal groups on rides and plates — 2 + 2 + 2 + 2 means “4 times 2”.',
    learn: ['Adding equal groups — 2 + 2 + 2 + 2', '“How many times” repeated addition'],
    rounds: [
      { prompt: '4 horse swings, 2 children on each. How many children in all?', scene: repGroups(4, 2, '🧒'),
        opts: [{ t: '6' }, { t: '8', ok: true }, { t: '10' }], yay: '2 + 2 + 2 + 2 = 8' },
      { prompt: '3 bogies, 3 children in each. How many children in all?', scene: repGroups(3, 3, '🧒'),
        opts: [{ t: '6' }, { t: '9', ok: true }, { t: '12' }], yay: '3 + 3 + 3 = 9' },
      { prompt: '6 plates of jalebi, 3 pieces on each. How many pieces in all?', scene: repGroups(6, 3, '🍥'),
        opts: [{ t: '15' }, { t: '18', ok: true }, { t: '21' }], yay: '6 times 3 is 18' },
      { prompt: '5 wheel compartments, 4 children in each. How many children?', scene: repGroups(5, 4, '🧒'),
        opts: [{ t: '18' }, { t: '20', ok: true }, { t: '25' }], yay: '5 times 4 is 20' },
      { prompt: '5 times 3 = ?', opts: [{ t: '13' }, { t: '15', ok: true }, { t: '18' }],
        yay: '3 + 3 + 3 + 3 + 3 = 15' },
      { prompt: 'Each cycle has 2 wheels. How many wheels do 4 cycles have?', scene: rep(4, '🚲'),
        opts: [{ t: '6' }, { t: '8', ok: true }, { t: '10' }], yay: '2 + 2 + 2 + 2 = 8' }
    ]
  });

  /* ===== Chapter 12 — How Much Can We Spend? (money) ===== */
  register({
    id: 'jm12',
    chapter: 'Chapter 12 · Class 1 Maths',
    title: 'How Much Can We Spend?',
    emoji: '💰',
    c1: '#3c4f1c', c2: '#b7e4c7',
    tags: ['chapter 12', 'money', 'coins', 'notes', 'rupees', 'shopping'].concat(BASE_TAGS),
    rating: 4.7, plays: '4.3K',
    desc: 'Riya counts coins and Sahil counts notes! Add rupees together and find how much more you need to buy a toy.',
    learn: ['Coins ₹1, ₹2, ₹5, ₹10 and notes ₹10, ₹20, ₹50, ₹100', 'Finding the total amount'],
    rounds: [
      { prompt: 'How much money in all?', scene: money([5, 5, 5, 5]),
        opts: [{ t: '₹15' }, { t: '₹20', ok: true }, { t: '₹25' }], yay: '5 + 5 + 5 + 5 = ₹20' },
      { prompt: 'How much money in all?', scene: money([10, 20]),
        opts: [{ t: '₹20' }, { t: '₹30', ok: true }, { t: '₹40' }], yay: '10 + 20 = ₹30' },
      { prompt: 'How much money in all?', scene: money([1, 2, 5, 10]),
        opts: [{ t: '₹16' }, { t: '₹18', ok: true }, { t: '₹20' }], yay: '1 + 2 + 5 + 10 = ₹18' },
      { prompt: 'A ball costs ₹20. How many ₹5 coins make ₹20?',
        scene: '<span class="jm-row">' + money([5]) + '<span class="jm-plus">× ?</span>' + money([20]) + '</span>',
        opts: [{ t: '3' }, { t: '4', ok: true }, { t: '5' }], yay: '4 fives make 20!' },
      { prompt: 'A car costs ₹14. Riya has ₹10. How much more does she need?',
        scene: money([10]) + '<span class="jm-row"><span class="jm-plus">+ ? =</span>' + money([14]) + '</span>',
        opts: [{ t: '₹4', ok: true }, { t: '₹6' }, { t: '₹24' }] },
      { prompt: 'How much money in all?', scene: money([10, 20, 50]),
        opts: [{ t: '₹70' }, { t: '₹80', ok: true }, { t: '₹90' }], yay: '10 + 20 + 50 = ₹80' }
    ]
  });

  /* ===== Chapter 13 — So Many Toys (more / less / equal) ===== */
  register({
    id: 'jm13',
    chapter: 'Chapter 13 · Class 1 Maths',
    title: 'So Many Toys',
    emoji: '🧸',
    c1: '#5c1a72', c2: '#ffd166',
    tags: ['chapter 13', 'more than', 'less than', 'equal to', 'compare', 'toys'].concat(BASE_TAGS),
    rating: 4.8, plays: '4.0K',
    desc: 'So many toys, so many comparisons! Count two groups and choose more than, less than or equal to.',
    learn: ['More than, less than and equal to', 'Comparing groups and numbers'],
    controls: 'Tap <, > or = to compare',
    rounds: [
      { prompt: 'Dolls vs cars — which symbol fits?', scene: twoGrp(5, '🪆', 3, '🚗'),
        opts: [{ t: '<', sub: 'less than' }, { t: '>', sub: 'more than', ok: true }, { t: '=', sub: 'equal to' }] },
      { prompt: 'Elephants vs dolls — which symbol fits?', scene: twoGrp(2, '🐘', 4, '🪆'),
        opts: [{ t: '<', sub: 'less than', ok: true }, { t: '>', sub: 'more than' }, { t: '=', sub: 'equal to' }] },
      { prompt: 'Teddy bears vs elephants — which symbol fits?', scene: twoGrp(4, '🧸', 4, '🐘'),
        opts: [{ t: '<', sub: 'less than' }, { t: '>', sub: 'more than' }, { t: '=', sub: 'equal to', ok: true }] },
      { prompt: '7 vs 9 — which symbol fits?', scene: numSeq(['7', '9']),
        opts: [{ t: '<', sub: 'less than', ok: true }, { t: '>', sub: 'more than' }, { t: '=', sub: 'equal to' }] },
      { prompt: '8 vs 8 — which symbol fits?', scene: numSeq(['8', '8']),
        opts: [{ t: '<', sub: 'less than' }, { t: '>', sub: 'more than' }, { t: '=', sub: 'equal to', ok: true }] },
      { prompt: '10 vs 6 — which symbol fits?', scene: numSeq(['10', '6']),
        opts: [{ t: '<', sub: 'less than' }, { t: '>', sub: 'more than', ok: true }, { t: '=', sub: 'equal to' }] }
    ]
  });
})();
