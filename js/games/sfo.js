/* SFO olympiad hubs — Grade 1 chapter hub + 9 mini-game engines
   Shared factory: registers SFO Science (NSO) and SFO Mathematics (IMO). */
(function () {

  function registerHub(cfg) {
    GamePortal.register(cfg.id, {
      title: cfg.title,
      emoji: cfg.emoji,
      cat: 'olympiad',
      c1: cfg.c1,
      c2: cfg.c2,
      tags: cfg.tags,
      rating: cfg.rating,
      plays: cfg.plays,
      badge: cfg.badge,
      controls: cfg.controls,
      desc: cfg.desc,
      play: function (stage, api) {
        var SCI = cfg.content() || { chapters: [] };
    var chapters = SCI.chapters || [];
    var dead = false;
    var stopEngine = null;
    var view = { name: 'home', ci: 0, gi: 0 };

    var ENGINES = [
      { id: 'learn',   e: '📖', n: 'Learn Cards',    d: 'Flip through smart cards',        kind: 'learn' },
      { id: 'memory',  e: '🧠', n: 'Memory Match',   d: 'Flip cards, find every pair',     kind: 'memory' },
      { id: 'quiz',    e: '🎯', n: 'Quiz Quest',     d: 'Pick the right answer',           kind: 'quiz' },
      { id: 'tf',      e: '✅', n: 'True or False',  d: 'Tap the correct card',            kind: 'tf' },
      { id: 'match',   e: '🔗', n: 'Match Pairs',    d: 'Link the words together',         kind: 'match' },
      { id: 'whack',   e: '🔨', n: 'Whack the Answer', d: 'Bonk the answer as it pops up',  kind: 'whack' },
      { id: 'odd',     e: '🔍', n: 'Odd One Out',    d: 'Find what does not belong',       kind: 'odd' },
      { id: 'sort',    e: '🧺', n: 'Sort It!',       d: 'Drop items in the right basket',  kind: 'sort' },
      { id: 'bubbles', e: '🎈', n: 'Bubble Pop',     d: 'Pop the right bubble fast!',      kind: 'bubbles', fun: true }
    ];
    var CH_MAX = ENGINES.length * 3;

    /* ---------- helpers ---------- */
    function esc(s) {
      return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }
    function shuffle(a) {
      for (var i = a.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var t = a[i]; a[i] = a[j]; a[j] = t;
      }
      return a;
    }
    function starStr(n) { return '★★★'.slice(0, n) + '☆☆☆'.slice(0, 3 - n); }
    function livesStr(n) { return '❤️'.repeat(n) + '🖤'.repeat(3 - n); }
    function sKey(ch, g) { return 'ph_' + cfg.key + '_' + ch.id + '_' + g; }
    function getStars(ch, g) { return GamePortal.store.get(sKey(ch, g), 0); }
    function putStars(ch, g, s) {
      var old = getStars(ch, g);
      if (s > old) { GamePortal.store.set(sKey(ch, g), s); return s; }
      return old;
    }
    function chStars(ch) {
      var t = 0;
      ENGINES.forEach(function (g) { t += getStars(ch, g.id); });
      return t;
    }
    function totalStars() {
      var t = 0;
      chapters.forEach(function (ch) { t += chStars(ch); });
      return t;
    }
    function chDone(ch) {
      var n = 0;
      ENGINES.forEach(function (g) { if (getStars(ch, g.id) > 0) n++; });
      return n;
    }
    function starsFor(acc) { return acc >= 0.9 ? 3 : (acc >= 0.7 ? 2 : 1); }

    /* ---------- shell ---------- */
    stage.innerHTML = '';
    var root = document.createElement('div');
    root.className = 'sfo';
    stage.appendChild(root);

    function killEngine() {
      if (stopEngine) { try { stopEngine(); } catch (e) {} stopEngine = null; }
    }
    function go(name, ci, gi) {
      if (dead) return;
      killEngine();
      view = { name: name, ci: ci === undefined ? view.ci : ci, gi: gi === undefined ? view.gi : gi };
      render();
    }
    function render() {
      if (view.name === 'home') renderHome();
      else if (view.name === 'chapter') renderChapter();
      else renderGame();
      root.dataset.stage = view.name;
    }

    /* ---------- home: chapter list ---------- */
    function renderHome() {
      var got = totalStars();
      var max = chapters.length * CH_MAX;
      var done = chapters.filter(function (c) { return chDone(c) === ENGINES.length; }).length;
      var html =
        '<div class="sfo-scroll">' +
          '<div class="sfo-hero">' +
            '<span class="sfo-hero-emo">' + cfg.heroE + '</span>' +
            '<div><h2>' + esc(cfg.heroT) + '</h2>' +
            '<p>' + esc(SCI.grade || 'Grade 1') + ' · ' + chapters.length + ' chapters · ' + esc(SCI.book || '') + '</p></div>' +
          '</div>' +
          '<div class="sfo-prog"><div class="sfo-prog-fill" style="width:' + (max ? Math.round(got / max * 100) : 0) + '%"></div></div>' +
          '<div class="sfo-stats"><span>⭐ <b>' + got + '</b>/' + max + ' stars</span><span>🏁 <b>' + done + '</b>/' + chapters.length + ' chapters complete</span></div>' +
          '<div class="sfo-chapters">';
      chapters.forEach(function (ch, i) {
        var st = chStars(ch);
        html +=
          '<button class="sfo-ch" data-ch="' + i + '" style="--cc1:' + ch.c1 + ';--cc2:' + ch.c2 + '">' +
            '<span class="sfo-ch-emo">' + ch.e + '</span>' +
            '<span class="sfo-ch-n">' + esc(ch.n) + '</span>' +
            '<span class="sfo-ch-meta"><span class="sfo-mini-stars">' + starStr(Math.min(3, Math.round(st / ENGINES.length))) + '</span>' + st + '/' + CH_MAX + '</span>' +
          '</button>';
      });
      html += '</div></div>';
      root.innerHTML = html;

      root.querySelectorAll('[data-ch]').forEach(function (b) {
        b.onclick = function () { GamePortal.sound.play('click'); go('chapter', +b.dataset.ch); };
      });
    }

    /* ---------- chapter: game list ---------- */
    function renderChapter() {
      var ch = chapters[view.ci];
      if (!ch) { go('home'); return; }
      var html =
        '<div class="sfo-scroll">' +
          '<div class="sfo-topbar"><button class="sfo-back" data-back="home">← All chapters</button>' +
            '<span class="sfo-crumb">Chapter ' + (view.ci + 1) + '</span></div>' +
          '<div class="sfo-ch-head" style="--cc1:' + ch.c1 + ';--cc2:' + ch.c2 + '">' +
            '<span class="sfo-ch-head-emo">' + ch.e + '</span>' +
            '<div><h3>' + esc(ch.n) + '</h3><p>Choose a game · ⭐ ' + chStars(ch) + '/' + CH_MAX + '</p></div>' +
          '</div>' +
          '<div class="sfo-games">';
      ENGINES.forEach(function (g, i) {
        var st = getStars(ch, g.id);
        html +=
          '<button class="sfo-g' + (g.fun ? ' fun' : '') + '" data-g="' + i + '" data-kind="' + g.kind + '">' +
            '<span class="sfo-g-emo">' + g.e + '</span>' +
            '<span class="sfo-g-n">' + g.n + (g.fun ? ' <em class="sfo-fun-tag">FUN</em>' : '') + '</span>' +
            '<span class="sfo-g-d">' + g.d + '</span>' +
            '<span class="sfo-g-stars">' + (st ? starStr(st) : '☆☆☆') + '</span>' +
          '</button>';
      });
      html += '</div></div>';
      root.innerHTML = html;
      bindBacks();
      root.querySelectorAll('[data-g]').forEach(function (b) {
        b.onclick = function () { GamePortal.sound.play('click'); go('game', view.ci, +b.dataset.g); };
      });
    }

    function bindBacks() {
      root.querySelectorAll('[data-back]').forEach(function (b) {
        b.onclick = function () {
          GamePortal.sound.play('click');
          go(b.dataset.back === 'chapter' ? 'chapter' : 'home');
        };
      });
    }

    /* ---------- game screen shell ---------- */
    function renderGame() {
      var ch = chapters[view.ci];
      var g = ENGINES[view.gi];
      if (!ch || !g) { go('home'); return; }
      var html =
        '<div class="sfo-topbar"><button class="sfo-back" data-back="chapter">← ' + esc(ch.n) + '</button>' +
          '<span class="sfo-crumb">' + g.e + ' ' + g.n + '</span></div>' +
        '<div class="sfo-play" id="sfo-play"></div>';
      root.innerHTML = html;
      bindBacks();
      var area = root.querySelector('#sfo-play');
      var ctx = { finish: function (o) { finish(ch, g, o); } };
      var fn = { learn: engLearn, memory: engMemory, quiz: engQuiz, tf: engTF, match: engMatch, whack: engWhack, odd: engOdd, sort: engSort, bubbles: engBubbles }[g.kind];
      stopEngine = fn(area, ch, api, ctx) || null;
    }

    function finish(ch, g, o) {
      o = o || {};
      killEngine();
      var stars = Math.max(0, Math.min(3, o.stars || 0));
      if (stars) putStars(ch, g.id, stars);
      var area = root.querySelector('#sfo-play');
      if (!area) return;
      area.innerHTML =
        '<div class="sfo-end">' +
          '<div class="sfo-end-emo">' + (o.emoji || '🏆') + '</div>' +
          '<div class="sfo-end-stars">' + starStr(stars) + '</div>' +
          '<h3>' + esc(o.title || 'Well done!') + '</h3>' +
          (o.text ? '<p>' + esc(o.text) + '</p>' : '') +
          '<div class="sfo-end-btns">' +
            '<button class="big-btn" data-replay>↻ Play again</button>' +
            '<button class="ghost-btn" data-back="chapter">← Chapter games</button>' +
            '<button class="ghost-btn" data-back="home">🏠 All chapters</button>' +
          '</div>' +
        '</div>';
      if (o.win) GamePortal.sound.play('win'); else GamePortal.sound.play('good');
      bindBacks();
      var rp = area.querySelector('[data-replay]');
      if (rp) rp.onclick = function () { GamePortal.sound.play('click'); go('game', view.ci, view.gi); };
    }

    /* ================= engines ================= */

    /* ---- Learn: flip flashcards ---- */
    function engLearn(area, ch, api) {
      var cards = ch.cards.map(function (s) { var p = s.split('|'); return { k: p[0], v: p[1] }; });
      var i = 0, flipped = false, seen = 0, seenSet = {};

      function draw() {
        var c = cards[i];
        area.innerHTML =
          '<div class="sfo-learn">' +
            '<div class="sfo-flash"><div class="sfo-flip' + (flipped ? ' on' : '') + '" data-flip>' +
              '<div class="sfo-face sfo-front"><span class="sfo-kicker">Card ' + (i + 1) + ' of ' + cards.length + '</span>' +
                '<h3>' + esc(c.k) + '</h3><p class="sfo-hint">Tap the card to flip it</p></div>' +
              '<div class="sfo-face sfo-back"><span class="sfo-kicker">💡 Did you know?</span><p>' + esc(c.v) + '</p></div>' +
            '</div></div>' +
            '<div class="sfo-learn-bar">' +
              '<button class="ghost-btn" data-prev' + (i === 0 ? ' disabled' : '') + '>← Back</button>' +
              '<div class="sfo-dots">' + cards.map(function (_, n) {
                return '<i class="' + (n === i ? 'on' : (seenSet[n] ? 'seen' : '')) + '"></i>';
              }).join('') + '</div>' +
              '<button class="ghost-btn" data-next>' + (i === cards.length - 1 ? 'Finish ⭐' : 'Next →') + '</button>' +
            '</div>' +
            '<p class="sfo-learn-count">Learned <b>' + seen + '</b>/' + cards.length + '</p>' +
          '</div>';
        bind();
      }

      function markSeen() {
        if (!seenSet[i]) { seenSet[i] = 1; seen++; api.addScore(10); }
      }
      function bind() {
        var flip = area.querySelector('[data-flip]');
        flip.onclick = function () {
          flipped = !flipped;
          flip.classList.toggle('on', flipped);
          if (flipped) { markSeen(); GamePortal.sound.play('flip'); }
          var cnt = area.querySelector('.sfo-learn-count b');
          if (cnt) cnt.textContent = seen;
          var dots = area.querySelectorAll('.sfo-dots i');
          if (dots[i]) dots[i].className = flipped ? 'on' : 'seen';
        };
        var prev = area.querySelector('[data-prev]');
        prev.onclick = function () { if (i > 0) { i--; flipped = false; GamePortal.sound.play('click'); draw(); } };
        var next = area.querySelector('[data-next]');
        next.onclick = function () {
          GamePortal.sound.play('click');
          if (i < cards.length - 1) { i++; flipped = false; draw(); }
          else {
            finish(ch, { id: 'learn' }, {
              stars: seen === cards.length ? 3 : (seen >= Math.ceil(cards.length / 2) ? 2 : 1),
              title: 'Knowledge unlocked!',
              text: 'You learned ' + seen + ' of ' + cards.length + ' cards.',
              emoji: '📖',
              win: true
            });
          }
        };
      }

      draw();
      return function () {};
    }

    /* ---- Memory Match: flip and find pairs ---- */
    function engMemory(area, ch, api) {
      var pairs = ch.pairs.map(function (s) { return s.split('|'); });
      var cards = [];
      pairs.forEach(function (p, i) { cards.push({ t: p[0], id: i }); cards.push({ t: p[1], id: i }); });
      shuffle(cards);
      var open = [], done = {}, matched = 0, misses = 0, lock = false;

      function draw() {
        area.innerHTML =
          '<div class="sfo-mem-wrap">' +
            '<div class="quiz-top"><span class="math-stat">Pairs <b>' + matched + '</b>/' + pairs.length + '</span>' +
            '<span class="math-stat">Tries <b>' + (matched + misses) + '</b></span></div>' +
            '<div class="mem-grid sfo-mem" style="--cols:4">' + cards.map(function (c, n) {
              return '<button class="mem-card' + (done[c.id] ? ' done' : '') + '" data-n="' + n + '" data-pair="' + c.id + '">' +
                '<span class="mem-inner"><span class="mem-face mem-front">❓</span>' +
                '<span class="mem-face mem-back">' + esc(c.t) + '</span></span></button>';
            }).join('') + '</div>' +
            '<p class="sfo-hint">Flip two cards and find the matching pair</p>' +
          '</div>';
        area.querySelector('.sfo-mem').onclick = function (e) {
          var b = e.target.closest('.mem-card');
          if (!b || lock || dead || b.classList.contains('done') || b.classList.contains('flipped')) return;
          b.classList.add('flipped');
          GamePortal.sound.play('flip');
          open.push(b);
          if (open.length < 2) return;
          lock = true;
          var a = open[0], c = open[1];
          if (a.dataset.pair === c.dataset.pair) {
            matched++;
            api.addScore(20);
            GamePortal.sound.play('good');
            setTimeout(function () {
              if (dead) return;
              a.classList.add('done'); c.classList.add('done');
              a.classList.remove('flipped'); c.classList.remove('flipped');
              done[a.dataset.pair] = 1;
              open = []; lock = false;
              if (matched === pairs.length) {
                finish(ch, { id: 'memory' }, {
                  stars: misses <= 1 ? 3 : (misses <= 3 ? 2 : 1),
                  title: misses <= 1 ? 'Perfect memory!' : 'All pairs found!',
                  text: pairs.length + ' pairs in ' + (matched + misses) + ' tries.',
                  emoji: '🧠',
                  win: true
                });
              } else draw();
            }, 430);
          } else {
            misses++;
            GamePortal.sound.play('bad');
            setTimeout(function () {
              if (dead) return;
              a.classList.remove('flipped'); c.classList.remove('flipped');
              open = []; lock = false;
              draw();
            }, 780);
          }
        };
      }
      draw();
      return function () {};
    }

    /* ---- Quiz Quest: MCQ with 3 lives ---- */
    function engQuiz(area, ch, api) {
      var items = shuffle(ch.quiz.map(function (s) { return s.split('|'); }));
      var qi = 0, right = 0, lives = 3, lock = false;

      function head() {
        return '<div class="quiz-top">' +
          '<span class="math-stat">Lives <b class="lives">' + livesStr(lives) + '</b></span>' +
          '<span class="math-stat">Right <b>' + right + '</b></span>' +
          '<span class="math-stat">Q <b>' + Math.min(qi + 1, items.length) + '</b>/' + items.length + '</span>' +
        '</div>';
      }
      function draw() {
        var q = items[qi];
        var opts = shuffle(q.slice(1, 5).map(function (t, i) { return { t: t, ok: i === +q[5] }; }));
        area.innerHTML =
          '<div class="quiz-wrap">' + head() +
            '<div class="q-card"><div class="q-kicker">' + esc(ch.e + ' ' + ch.n) + '</div>' +
            '<div class="q-text">' + esc(q[0]) + '</div></div>' +
            '<div class="ans-grid">' + opts.map(function (o) {
              return '<button class="ans-btn" data-ok="' + (o.ok ? 1 : 0) + '">' + esc(o.t) + '</button>';
            }).join('') + '</div>' +
            '<div class="math-fb" id="sfo-fb"></div>' +
          '</div>';
        area.querySelector('.ans-grid').onclick = function (e) {
          var b = e.target.closest('.ans-btn');
          if (!b || lock || dead) return;
          lock = true;
          var ok = b.dataset.ok === '1';
          area.querySelectorAll('.ans-btn').forEach(function (x) {
            x.disabled = true;
            if (x.dataset.ok === '1') x.classList.add('right');
          });
          var fb = area.querySelector('#sfo-fb');
          if (ok) {
            right++;
            b.classList.add('right');
            fb.textContent = '✅ ' + (q[6] || 'Correct!');
            fb.className = 'math-fb ok';
            api.addScore(25);
            GamePortal.sound.play('good');
          } else {
            lives--;
            b.classList.add('wrong');
            fb.textContent = '❌ ' + (q[6] || 'Not quite.');
            fb.className = 'math-fb no';
            GamePortal.sound.play('bad');
            area.querySelector('.math-stat .lives').innerHTML = livesStr(Math.max(0, lives));
          }
          setTimeout(function () {
            if (dead) return;
            qi++;
            if (lives <= 0) return finishQuiz();
            if (qi >= items.length) return finishQuiz();
            lock = false;
            draw();
          }, 1400);
        };
      }
      function finishQuiz() {
        area.innerHTML = '';
        var acc = right / items.length;
        finish(ch, { id: 'quiz' }, {
          stars: right === 0 ? 1 : starsFor(acc),
          title: lives <= 0 ? 'Nice try!' : (acc >= 0.9 ? 'Superstar!' : acc >= 0.7 ? 'Well done!' : 'Keep practising!'),
          text: 'You got ' + right + ' of ' + items.length + ' right.',
          emoji: acc >= 0.9 ? '🏆' : '🌟',
          win: acc >= 0.7
        });
      }
      draw();
      return function () {};
    }

    /* ---- True or False ---- */
    function engTF(area, ch, api) {
      var items = shuffle(ch.tf.map(function (s) { return s.split('|'); }));
      var qi = 0, right = 0, lock = false;

      function draw() {
        var q = items[qi];
        area.innerHTML =
          '<div class="quiz-wrap">' +
            '<div class="quiz-top"><span class="math-stat">Right <b>' + right + '</b></span>' +
            '<span class="math-stat">Q <b>' + (qi + 1) + '</b>/' + items.length + '</span></div>' +
            '<div class="q-card"><div class="q-kicker">True or False?</div>' +
            '<div class="q-text">' + esc(q[0]) + '</div></div>' +
            '<div class="tf-grid">' +
              '<button class="tf-btn yes" data-ok="' + (q[1] === 'T' ? 1 : 0) + '">✅<span>True</span></button>' +
              '<button class="tf-btn no" data-ok="' + (q[1] === 'F' ? 1 : 0) + '">❌<span>False</span></button>' +
            '</div>' +
            '<div class="math-fb" id="sfo-fb"></div>' +
          '</div>';
        area.querySelector('.tf-grid').onclick = function (e) {
          var b = e.target.closest('.tf-btn');
          if (!b || lock || dead) return;
          lock = true;
          var ok = b.dataset.ok === '1';
          area.querySelectorAll('.tf-btn').forEach(function (x) {
            x.disabled = true;
            if (x.dataset.ok === '1') x.classList.add('right');
          });
          var fb = area.querySelector('#sfo-fb');
          if (ok) {
            right++;
            b.classList.add('right');
            fb.textContent = '✅ ' + (q[2] || 'Correct!');
            fb.className = 'math-fb ok';
            api.addScore(15);
            GamePortal.sound.play('good');
          } else {
            b.classList.add('wrong');
            fb.textContent = '❌ ' + (q[2] || 'Not quite.');
            fb.className = 'math-fb no';
            GamePortal.sound.play('bad');
          }
          setTimeout(function () {
            if (dead) return;
            qi++;
            if (qi >= items.length) {
              var acc = right / items.length;
              finish(ch, { id: 'tf' }, {
                stars: right === 0 ? 1 : starsFor(acc),
                title: acc >= 0.9 ? 'Perfect!' : acc >= 0.7 ? 'Well done!' : 'Keep practising!',
                text: 'You got ' + right + ' of ' + items.length + ' right.',
                emoji: '✅',
                win: acc >= 0.7
              });
              return;
            }
            lock = false;
            draw();
          }, 1400);
        };
      }
      draw();
      return function () {};
    }

    /* ---- Match Pairs ---- */
    function engMatch(area, ch, api) {
      var pairs = ch.pairs.map(function (s) { return s.split('|'); });
      var rights = shuffle(pairs.map(function (_, i) { return i; }));
      var sel = null, done = {}, hits = 0, misses = 0;

      function draw() {
        area.innerHTML =
          '<div class="sfo-match-wrap">' +
            '<div class="quiz-top"><span class="math-stat">Matched <b id="sfo-hit">' + hits + '</b>/' + pairs.length + '</span>' +
            '<span class="math-stat">Misses <b id="sfo-miss">' + misses + '</b></span></div>' +
            '<div class="sfo-match">' +
              '<div class="sfo-col">' + pairs.map(function (p, i) {
                return '<button class="sfo-chip' + (done[i] ? ' done' : '') + '" data-side="l" data-pair="' + i + '">' + esc(p[0]) + '</button>';
              }).join('') + '</div>' +
              '<div class="sfo-col">' + rights.map(function (i) {
                return '<button class="sfo-chip' + (done[i] ? ' done' : '') + '" data-side="r" data-pair="' + i + '">' + esc(pairs[i][1]) + '</button>';
              }).join('') + '</div>' +
            '</div>' +
            '<p class="sfo-hint">Tap a word on the left, then its partner on the right</p>' +
          '</div>';
        area.querySelector('.sfo-match').onclick = function (e) {
          var b = e.target.closest('.sfo-chip');
          if (!b || dead) return;
          var id = +b.dataset.pair;
          if (done[id]) return;
          if (!sel) {
            sel = b;
            b.classList.add('sel');
            GamePortal.sound.play('click');
            return;
          }
          if (sel === b) { sel.classList.remove('sel'); sel = null; return; }
          if (sel.dataset.pair === b.dataset.pair) {
            done[id] = 1;
            hits++;
            var hitEl = area.querySelector('#sfo-hit');
            if (hitEl) hitEl.textContent = hits;
            sel.classList.add('done'); sel.classList.remove('sel');
            b.classList.add('done');
            api.addScore(20);
            GamePortal.sound.play('good');
            sel = null;
            if (hits === pairs.length) {
              setTimeout(function () {
                if (dead) return;
                var acc = hits / (hits + misses);
                finish(ch, { id: 'match' }, {
                  stars: misses === 0 ? 3 : (misses <= 2 ? 2 : 1),
                  title: misses === 0 ? 'Perfect matching!' : 'All matched!',
                  text: pairs.length + ' pairs linked with ' + misses + ' ' + (misses === 1 ? 'miss' : 'misses') + '.',
                  emoji: '🔗',
                  win: true
                });
              }, 500);
            } else {
              setTimeout(function () { if (!dead) draw(); }, 350);
            }
          } else {
            misses++;
            var missEl = area.querySelector('#sfo-miss');
            if (missEl) missEl.textContent = misses;
            sel.classList.remove('sel');
            sel.classList.add('shake');
            b.classList.add('shake');
            var a = sel; sel = null;
            GamePortal.sound.play('bad');
            setTimeout(function () {
              if (dead) return;
              a.classList.remove('shake');
              b.classList.remove('shake');
            }, 360);
          }
        };
      }
      draw();
      return function () {};
    }

    /* ---- Whack the Answer: options pop up, bonk the right one ---- */
    function engWhack(area, ch, api) {
      var items = shuffle(ch.quiz.map(function (s) { return s.split('|'); }));
      var TOTAL = Math.min(6, items.length);
      var qi = 0, right = 0, lives = 3, lock = false, resolved = false, asked = 1, round = 0;
      var timers = [];

      function later(fn, ms) { var t = setTimeout(fn, ms); timers.push(t); return t; }

      function patchLives() {
        var lf = area.querySelector('.math-stat .lives');
        if (lf) lf.innerHTML = livesStr(Math.max(0, lives));
      }
      function fb(msg, cls) {
        var f = area.querySelector('#sfo-fb');
        if (f) { f.textContent = msg; f.className = 'math-fb ' + cls; }
      }
      function next() {
        if (dead) return;
        qi++;
        if (qi >= TOTAL) return over();
        draw();
      }
      function over() {
        if (dead) return;
        var acc = right / Math.max(1, asked);
        finish(ch, { id: 'whack' }, {
          stars: right === 0 ? 1 : starsFor(acc),
          title: lives <= 0 ? 'Out of lives!' : (acc >= 0.9 ? 'Hammer hero!' : acc >= 0.7 ? 'Well done!' : 'Keep practising!'),
          text: 'You whacked ' + right + ' of ' + asked + ' right answers.',
          emoji: '🔨',
          win: lives > 0
        });
      }

      function draw() {
        asked = qi + 1;
        resolved = false;
        lock = false;
        var myRound = ++round;
        var q = items[qi];
        var opts = shuffle(q.slice(1, 5).map(function (x, i) { return { t: x, ok: i === +q[5] }; }));
        area.innerHTML =
          '<div class="quiz-wrap sfo-whack-wrap">' +
            '<div class="quiz-top">' +
              '<span class="math-stat">Lives <b class="lives">' + livesStr(lives) + '</b></span>' +
              '<span class="math-stat">Right <b>' + right + '</b></span>' +
              '<span class="math-stat">Round <b>' + (qi + 1) + '</b>/' + TOTAL + '</span>' +
            '</div>' +
            '<div class="q-card sfo-wh-q"><div class="q-kicker">🔨 Whack the right answer</div>' +
            '<div class="q-text">' + esc(q[0]) + '</div></div>' +
            '<div class="sfo-whack-grid">' + opts.map(function (o) {
              return '<button class="sfo-wh" data-ok="' + (o.ok ? 1 : 0) + '">' +
                '<span class="sfo-wh-hole"></span><span class="sfo-wh-mole">' + esc(o.t) + '</span></button>';
            }).join('') + '</div>' +
            '<div class="math-fb" id="sfo-fb"></div>' +
          '</div>';

        area.querySelectorAll('.sfo-wh').forEach(function (b, n) {
          later(function () { if (myRound === round) b.classList.add('up'); }, 80 + n * 130);
        });

        area.querySelector('.sfo-whack-grid').onclick = function (e) {
          var b = e.target.closest('.sfo-wh');
          if (!b || lock || dead || b.classList.contains('down')) return;
          if (b.dataset.ok === '1') {
            lock = true; resolved = true;
            right++;
            b.classList.add('bonk');
            api.addScore(25);
            GamePortal.sound.play('good');
            fb('✅ ' + (q[6] || 'Correct!'), 'ok');
            later(next, 950);
          } else {
            b.classList.add('down');
            lives--;
            patchLives();
            GamePortal.sound.play('bad');
            fb('❌ Not that one — keep whacking!', 'no');
            if (lives <= 0) { lock = true; resolved = true; later(over, 750); }
          }
        };

        /* the right answer escapes if nobody whacks it */
        later(function () {
          if (dead || resolved || myRound !== round) return;
          resolved = true; lock = true;
          lives--;
          patchLives();
          GamePortal.sound.play('bad');
          fb('⏰ Too slow — it got away!', 'no');
          if (lives <= 0) later(over, 800); else later(next, 1000);
        }, 2700);
      }

      draw();
      return function () { timers.forEach(clearTimeout); timers = []; };
    }

    /* ---- Odd One Out (SOF reasoning style) ---- */
    function engOdd(area, ch, api) {
      var items = shuffle(ch.odd.map(function (s) { return s.split('|'); }));
      var qi = 0, right = 0, lock = false;

      function draw() {
        var q = items[qi];
        var opts = shuffle(q.slice(0, 4).map(function (t, i) { return { t: t, ok: i === +q[4] }; }));
        area.innerHTML =
          '<div class="quiz-wrap">' +
            '<div class="quiz-top"><span class="math-stat">Right <b>' + right + '</b></span>' +
            '<span class="math-stat">Q <b>' + (qi + 1) + '</b>/' + items.length + '</span></div>' +
            '<div class="q-card"><div class="q-kicker">Which one does not belong?</div>' +
            '<div class="q-text">' + opts.map(function (o, n) {
              return '<span class="sfo-odd-item' + (o.ok ? ' key' : '') + '">' + esc(o.t) + '</span>' + (n < 3 ? ' <span class="sfo-odd-sep">·</span> ' : '');
            }).join('') + '</div></div>' +
            '<div class="ans-grid">' + opts.map(function (o) {
              return '<button class="ans-btn" data-ok="' + (o.ok ? 1 : 0) + '">' + esc(o.t) + '</button>';
            }).join('') + '</div>' +
            '<div class="math-fb" id="sfo-fb"></div>' +
          '</div>';
        area.querySelector('.ans-grid').onclick = function (e) {
          var b = e.target.closest('.ans-btn');
          if (!b || lock || dead) return;
          lock = true;
          var ok = b.dataset.ok === '1';
          area.querySelectorAll('.ans-btn').forEach(function (x) {
            x.disabled = true;
            if (x.dataset.ok === '1') x.classList.add('right');
          });
          var fb = area.querySelector('#sfo-fb');
          if (ok) {
            right++;
            b.classList.add('right');
            fb.textContent = '✅ ' + (q[5] || 'Correct!');
            fb.className = 'math-fb ok';
            api.addScore(25);
            GamePortal.sound.play('good');
          } else {
            b.classList.add('wrong');
            fb.textContent = '❌ ' + (q[5] || 'Not quite.');
            fb.className = 'math-fb no';
            GamePortal.sound.play('bad');
          }
          setTimeout(function () {
            if (dead) return;
            qi++;
            if (qi >= items.length) {
              var acc = right / items.length;
              finish(ch, { id: 'odd' }, {
                stars: right === 0 ? 1 : starsFor(acc),
                title: acc >= 0.9 ? 'Sharp eyes!' : acc >= 0.7 ? 'Well done!' : 'Keep practising!',
                text: 'You got ' + right + ' of ' + items.length + ' right.',
                emoji: '🔍',
                win: acc >= 0.7
              });
              return;
            }
            lock = false;
            draw();
          }, 1500);
        };
      }
      draw();
      return function () {};
    }

    /* ---- Sort It!: tap an item, drop it in the right basket ---- */
    function engSort(area, ch, api) {
      var def = (SCI.sorts || {})[ch.id] || '';
      var parts = def ? def.split('|') : [];
      var bins = parts.length ? parts[0].split(',') : [];
      var items = shuffle(parts.slice(1).map(function (s) {
        var p = s.split(':');
        return { t: p[0], bin: +p[1], placed: false };
      }));
      var sel = null, placed = 0, misses = 0, counts = bins.map(function () { return 0; });

      function draw() {
        area.innerHTML =
          '<div class="sfo-sort">' +
            '<div class="quiz-top">' +
              '<span class="math-stat">Sorted <b id="sfo-pl">' + placed + '</b>/' + items.length + '</span>' +
              '<span class="math-stat">Misses <b id="sfo-ms">' + misses + '</b></span>' +
            '</div>' +
            '<div class="sfo-baskets">' + bins.map(function (b, i) {
              return '<button class="sfo-basket" data-bin="' + i + '">' +
                '<span class="sfo-bk-emo">' + (i === 0 ? '🧺' : '🪣') + '</span>' +
                '<span class="sfo-bk-name">' + esc(b) + '</span>' +
                '<b class="sfo-bk-n">' + counts[i] + '</b></button>';
            }).join('') + '</div>' +
            '<div class="sfo-pile">' + items.map(function (it, i) {
              if (it.placed) return '';
              return '<button class="sfo-item' + (sel === i ? ' sel' : '') + '" data-i="' + i + '" data-bin="' + it.bin + '">' +
                esc(it.t) + '</button>';
            }).join('') + '</div>' +
            '<p class="sfo-hint">Tap an item, then tap the basket it belongs in</p>' +
          '</div>';
        bind();
      }

      function bind() {
        var pile = area.querySelector('.sfo-pile');
        var baskets = area.querySelector('.sfo-baskets');
        pile.onclick = function (e) {
          var b = e.target.closest('.sfo-item');
          if (!b || dead) return;
          var i = +b.dataset.i;
          sel = (sel === i) ? null : i;
          GamePortal.sound.play('click');
          pile.querySelectorAll('.sfo-item').forEach(function (x) {
            x.classList.toggle('sel', +x.dataset.i === sel);
          });
        };
        baskets.onclick = function (e) {
          var bk = e.target.closest('.sfo-basket');
          if (!bk || dead) return;
          if (sel === null) {
            bk.classList.add('shake');
            GamePortal.sound.play('click');
            setTimeout(function () { if (!dead) bk.classList.remove('shake'); }, 360);
            return;
          }
          if (items[sel].bin === +bk.dataset.bin) {
            items[sel].placed = true;
            placed++;
            counts[+bk.dataset.bin]++;
            api.addScore(15);
            GamePortal.sound.play('good');
            sel = null;
            if (placed === items.length) {
              setTimeout(function () {
                if (dead) return;
                finish(ch, { id: 'sort' }, {
                  stars: misses === 0 ? 3 : (misses <= 2 ? 2 : 1),
                  title: misses === 0 ? 'Perfect sorting!' : 'Everything sorted!',
                  text: items.length + ' items binned with ' + misses + ' ' + (misses === 1 ? 'miss' : 'misses') + '.',
                  emoji: '🧺',
                  win: true
                });
              }, 420);
            } else draw();
          } else {
            misses++;
            var ms = area.querySelector('#sfo-ms');
            if (ms) ms.textContent = misses;
            bk.classList.add('shake');
            GamePortal.sound.play('bad');
            setTimeout(function () { if (!dead) bk.classList.remove('shake'); }, 360);
          }
        };
      }

      if (!items.length) {
        area.innerHTML = '<div class="sfo-hint" style="padding:30px">Nothing to sort here yet!</div>';
        return function () {};
      }
      draw();
      return function () {};
    }

    /* ---- Bubble Pop: fun arcade round ---- */
    function engBubbles(area, ch, api) {
      var items = shuffle(ch.quiz.map(function (s) { return s.split('|'); }));
      var TOTAL = Math.min(8, items.length);
      var qi = 0, right = 0, lives = 3, lock = false, asked = 1;
      var t = null;

      function draw() {
        asked = qi + 1;
        var q = items[qi];
        var opts = shuffle(q.slice(1, 5).map(function (x, i) { return { t: x, ok: i === +q[5] }; }));
        area.innerHTML =
          '<div class="sfo-bub">' +
            '<div class="quiz-top">' +
              '<span class="math-stat">Lives <b class="lives">' + livesStr(lives) + '</b></span>' +
              '<span class="math-stat">Popped <b>' + right + '</b></span>' +
              '<span class="math-stat">Round <b>' + (qi + 1) + '</b>/' + TOTAL + '</span>' +
            '</div>' +
            '<div class="q-card sfo-bub-q"><div class="q-text">' + esc(q[0]) + '</div></div>' +
            '<div class="sfo-field" id="sfo-field"></div>' +
          '</div>';
        var field = area.querySelector('#sfo-field');
        field.style.setProperty('--top', (field.clientHeight + 74) + 'px');
        var dur = Math.max(3.4, 5.6 - qi * 0.3);
        var slots = shuffle([4, 28, 52, 74]);
        opts.forEach(function (o, n) {
          var b = document.createElement('button');
          b.className = 'sfo-bub-btn' + (o.ok ? ' good' : '');
          b.dataset.ok = o.ok ? 1 : 0;
          b.textContent = o.t;
          b.style.left = slots[n] + '%';
          b.style.setProperty('--dur', dur + 's');
          b.onclick = function () { tap(b); };
          b.addEventListener('animationend', function () {
            if (b.dataset.ok === '1' && !lock && !dead) {
              lock = true;
              miss();
            }
          });
          field.appendChild(b);
        });
      }

      function tap(b) {
        if (lock || dead) return;
        lock = true;
        if (b.dataset.ok === '1') {
          right++;
          b.classList.add('pop');
          api.addScore(30);
          GamePortal.sound.play('good');
          t = setTimeout(next, 550);
        } else {
          b.classList.add('wrong');
          GamePortal.sound.play('bad');
          lives--;
          area.querySelector('.math-stat .lives').innerHTML = livesStr(Math.max(0, lives));
          if (lives <= 0) { t = setTimeout(over, 550); return; }
          t = setTimeout(next, 750);
        }
      }

      function miss() {
        lives--;
        area.querySelector('.math-stat .lives').innerHTML = livesStr(Math.max(0, lives));
        GamePortal.sound.play('bad');
        if (lives <= 0) { t = setTimeout(over, 400); return; }
        t = setTimeout(next, 550);
      }

      function next() {
        if (dead) return;
        qi++;
        if (qi >= TOTAL) return over();
        lock = false;
        draw();
      }

      function over() {
        if (dead) return;
        var acc = right / Math.max(1, asked);
        finish(ch, { id: 'bubbles' }, {
          stars: right === 0 ? 1 : starsFor(acc),
          title: lives <= 0 ? 'Out of lives!' : (acc >= 0.9 ? 'Bubble master!' : acc >= 0.7 ? 'Well done!' : 'Keep practising!'),
          text: 'You popped ' + right + ' correct bubbles.',
          emoji: '🎈',
          win: lives > 0
        });
      }

      draw();
      return function () { if (t) clearTimeout(t); };
    }

    /* ---------- start ---------- */
    render();

    return function () {
      dead = true;
      killEngine();
    };
  }
  });
  }

  /* ---- SFO Science — Grade 1 (SOF NSO) ---- */
  registerHub({
    id: 'sfo',
    key: 'sfo',
    title: 'SFO Science — Grade 1',
    emoji: '🔬',
    c1: '#0ea5e9',
    c2: '#22c55e',
    tags: ['science', 'olympiad', 'sfo', 'nso', 'sof', 'grade 1', 'grade-1', 'kids', 'learning', 'quiz', 'biology', 'experiment'],
    rating: 4.9,
    plays: '0.9M',
    badge: 'Grade 1',
    controls: 'Tap to choose answers · back arrows move between screens',
    desc: 'Science Olympiad practice for Grade 1 following the SOF/NSO syllabus: 15 chapters, each with 9 games — learn cards, memory match, quiz, true/false, matching, whack-the-answer, odd-one-out, sorting and bubble pop.',
    heroE: '🔬',
    heroT: 'Science Olympiad',
    content: function () { return window.SCIENCE; }
  });

  /* ---- SFO Mathematics — Grade 1 (SOF IMO) ---- */
  registerHub({
    id: 'sfm',
    key: 'sfm',
    title: 'SFO Mathematics — Grade 1',
    emoji: '🧮',
    c1: '#8b5cf6',
    c2: '#f59e0b',
    tags: ['math', 'mathematics', 'imo', 'olympiad', 'sfo', 'sof', 'grade 1', 'grade-1', 'kids', 'learning', 'quiz', 'numbers', 'addition', 'subtraction'],
    rating: 4.9,
    plays: '0.7M',
    badge: 'Grade 1',
    controls: 'Tap to choose answers · back arrows move between screens',
    desc: 'Mathematics Olympiad practice for Grade 1 following the SOF/IMO syllabus: 15 chapters, each with 9 games — learn cards, memory match, quiz, true/false, matching, whack-the-answer, odd-one-out, sorting and bubble pop.',
    heroE: '🧮',
    heroT: 'Mathematics Olympiad',
    content: function () { return window.MATHS; }
  });

})();
