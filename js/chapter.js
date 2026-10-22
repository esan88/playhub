/* PlayHub chapter player — learning cards + four engines (quiz, make10, sequence, match)
   for the Joyful Mathematics and Mridang English Class 1 chapter pages.
   Also drives the shared animation layer (entrances, confetti, count-ups). */
(function () {
  'use strict';

  var list = window.CHAPTERS || [];
  var id = window.CHAPTER_ID || '';
  var idx = -1, i;
  for (i = 0; i < list.length; i++) if (list[i].id === id) { idx = i; break; }
  if (idx < 0 || !document.getElementById) return;
  var ch = list[idx];
  var subject = window.CHAPTER_SUBJECT || 'Class 1 Maths';
  var total = list.length;

  function $(s) { return document.querySelector(s); }
  function el(tag, cls, html) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html !== undefined) e.innerHTML = html;
    return e;
  }
  function shuffle(a) {
    for (var k = a.length - 1; k > 0; k--) {
      var j = Math.floor(Math.random() * (k + 1)), t = a[k];
      a[k] = a[j]; a[j] = t;
    }
    return a;
  }
  function storeGet(k, fb) {
    try { if (window.GamePortal && GamePortal.store) return GamePortal.store.get(k, fb); } catch (e) {}
    return fb;
  }
  function storeSet(k, v) {
    try { if (window.GamePortal && GamePortal.store) GamePortal.store.set(k, v); } catch (e) {}
  }
  function sfx(n) {
    try { if (window.GamePortal && GamePortal.sound) GamePortal.sound.play(n); } catch (e) {}
  }
  function starsFor(n) { return '★★★'.slice(0, Math.max(0, Math.min(3, n))) + '☆☆☆'.slice(0, 3 - Math.max(0, Math.min(3, n))); }

  var raf = window.requestAnimationFrame || function (f) { return setTimeout(function () { f(Date.now()); }, 16); };
  function countUp(node, to, ms) {
    if (!node) return;
    node.setAttribute('data-v', String(to));
    var from = parseInt(node.getAttribute('data-c') || '0', 10) || 0;
    node.setAttribute('data-c', String(to));
    if (from === to || !ms) { node.textContent = String(to); return; }
    var t0 = null;
    function step(t) {
      if (t0 === null) t0 = t;
      var k = Math.min(1, (t - t0) / ms);
      k = 1 - Math.pow(1 - k, 3);
      node.textContent = String(Math.round(from + (to - from) * k));
      if (k < 1) raf(step);
      else node.textContent = String(to);
    }
    raf(step);
  }

  var CONF_COLORS = ['#ff4d8d', '#ffb703', '#12b981', '#5b3df5', '#06b6d4', '#f97316'];
  function confetti(container, x, y, n, mode) {
    if (!container) return;
    for (var k = 0; k < n; k++) {
      var p = document.createElement('span');
      p.className = 'confetti';
      var ang = (Math.PI * 2 * k) / n + Math.random() * 0.6;
      var dist = 36 + Math.random() * 64;
      var dx = Math.cos(ang) * dist, dy = Math.sin(ang) * dist;
      if (mode === 'rain') {
        p.style.left = (x + (Math.random() * n * 8 - n * 4)) + 'px';
        p.style.top = y + 'px';
        p.style.setProperty('--dx', (Math.random() * 90 - 45) + 'px');
        p.style.setProperty('--dy', (90 + Math.random() * 170) + 'px');
      } else {
        p.style.left = x + 'px';
        p.style.top = y + 'px';
        p.style.setProperty('--dx', dx + 'px');
        p.style.setProperty('--dy', dy + 'px');
      }
      p.style.setProperty('--rot', (Math.random() * 540 - 270) + 'deg');
      p.style.background = CONF_COLORS[k % CONF_COLORS.length];
      container.appendChild(p);
      (function (p) {
        setTimeout(function () { if (p.parentNode) p.parentNode.removeChild(p); }, 950);
      })(p);
    }
  }
  function burstAt(elm, n) {
    if (!elm || !arena) return;
    var r = elm.getBoundingClientRect(), ar = arena.getBoundingClientRect();
    confetti(arena, r.left - ar.left + r.width / 2, r.top - ar.top + r.height / 2, n || 10);
  }

  /* ---------- header / hero / learn card ---------- */
  document.title = 'Chapter ' + ch.n + ': ' + ch.title + ' — PlayHub ' + subject;
  var meta = document.querySelector('meta[name="description"]');
  if (meta) meta.setAttribute('content', ch.desc);

  var hero = document.getElementById('c-hero');
  hero.style.setProperty('--c1', ch.c1);
  hero.style.setProperty('--c2', ch.c2);
  document.getElementById('c-emo').textContent = ch.emoji;
  document.getElementById('c-badge').textContent = 'Chapter ' + ch.n + ' of ' + total;
  document.getElementById('c-title').textContent = ch.title;
  document.getElementById('c-topic').textContent = ch.topic;
  document.getElementById('c-pos').textContent = ch.n + ' / ' + total;

  var bestKey = 'ph_best_' + ch.id, starsKey = 'ph_stars_' + ch.id;

  function renderStats() {
    document.getElementById('c-stars').textContent = starsFor(storeGet(starsKey, 0));
    document.getElementById('c-best').textContent = 'Best score ' + storeGet(bestKey, 0);
  }
  renderStats();

  document.getElementById('c-intro').textContent = ch.learn.intro;
  var storyEl = document.getElementById('c-story');
  if (storyEl) {
    if (ch.learn.story) { storyEl.textContent = ch.learn.story; storyEl.hidden = false; }
    else storyEl.hidden = true;
  }
  var pts = document.getElementById('c-points');
  pts.innerHTML = '';
  for (i = 0; i < ch.learn.points.length; i++) pts.appendChild(el('li', '', ch.learn.points[i]));
  var wrd = document.getElementById('c-words');
  wrd.innerHTML = '';
  for (i = 0; i < ch.learn.words.length; i++) wrd.appendChild(el('span', 'c-word', ch.learn.words[i]));

  /* ---------- shared arena pieces ---------- */
  var startBox = document.getElementById('c-start');
  var arena = document.getElementById('c-arena');
  var result = document.getElementById('c-result');
  document.getElementById('c-gtitle').textContent = ch.game.title;
  document.getElementById('c-ginfo').textContent = ch.game.instructions;

  function showResult(score, stars, detail) {
    var best = storeGet(bestKey, 0);
    if (score > best) { storeSet(bestKey, score); best = score; }
    var prevStars = storeGet(starsKey, 0);
    if (stars > prevStars) storeSet(starsKey, stars);
    renderStats();

    var sHtml = starsFor(stars), spans = '';
    for (i = 0; i < 3; i++) {
      spans += '<span class="r-star' + (sHtml.charAt(i) === '☆' ? ' off' : '') + '" style="animation-delay:' + (i * 0.26).toFixed(2) + 's">' + sHtml.charAt(i) + '</span>';
    }
    document.getElementById('r-stars').innerHTML = spans;
    var rScore = document.getElementById('r-score');
    rScore.setAttribute('data-v', String(score));
    rScore.textContent = '0';
    document.getElementById('r-best').textContent = best;
    document.getElementById('r-detail').textContent = detail;
    arena.hidden = true;
    result.hidden = false;
    countUp(rScore, score, 750);
    if (result.getBoundingClientRect) confetti(result, result.clientWidth / 2, 6, 24, 'rain');
    result.scrollIntoView ? result.scrollIntoView({ block: 'nearest' }) : 0;
    sfx('win');
  }

  function resetAll() {
    result.hidden = true;
    arena.hidden = false;
    startGame();
  }
  document.getElementById('c-again').onclick = resetAll;

  function startGame() {
    arena.innerHTML = '';
    if (ch.game.type === 'quiz') startQuiz();
    else if (ch.game.type === 'make10') startMake10();
    else if (ch.game.type === 'sequence') startSequence();
    else if (ch.game.type === 'match') startMatch();
  }
  document.getElementById('c-go').onclick = function () {
    startBox.hidden = true;
    arena.hidden = false;
    sfx('click');
    startGame();
  };

  function hudRow(parts) {
    var hud = el('div', 'g-hud');
    for (var k = 0; k < parts.length; k++) {
      var s = el('span', 'g-hud-i');
      s.appendChild(el('b', '', parts[k][0]));
      s.appendChild(document.createTextNode(' ' + parts[k][1]));
      hud.appendChild(s);
    }
    return hud;
  }

  function visEl(vis) {
    var wrap = el('div', 'q-vis');
    vis.split('|').forEach(function (part, gi) {
      if (gi) wrap.appendChild(el('span', 'q-vs', 'vs'));
      part.trim().split(/\s+/).forEach(function (tok) {
        if (!tok) return;
        var s = el('span', 'q-tok', tok);
        s.onclick = function () {
          sfx('pop');
          s.classList.remove('q-pop');
          void s.offsetWidth;
          s.classList.add('q-pop');
          setTimeout(function () { s.classList.remove('q-pop'); }, 340);
        };
        wrap.appendChild(s);
      });
    });
    return wrap;
  }

  /* ---------- engine: quiz ---------- */
  function startQuiz() {
    var qs = ch.game.questions;
    var qi = 0, score = 0, streak = 0, right = 0, locked = false;

    var hud = hudRow([['0', 'score'], ['1', 'streak'], ['0 / ' + qs.length, 'done']]);
    var bar = el('div', 'q-bar');
    var barI = el('i');
    bar.appendChild(barI);
    var body = el('div', 'g-body');
    var foot = el('div', 'g-foot');
    arena.appendChild(hud); arena.appendChild(bar); arena.appendChild(body); arena.appendChild(foot);
    var hScore = hud.children[0].firstChild, hStreak = hud.children[1].firstChild, hDone = hud.children[2].firstChild;

    function render() {
      locked = false;
      foot.innerHTML = '';
      body.innerHTML = '';
      hDone.textContent = (qi + 1) + ' / ' + qs.length;
      barI.style.width = (qi / qs.length * 100) + '%';
      var q = qs[qi];
      if (q.vis) body.appendChild(visEl(q.vis));
      body.appendChild(el('p', 'q-text', q.q));
      var opts = el('div', 'q-opts');
      /* shuffle option order every round so the answer is not always in one place;
         the original option index travels on data-oi for scoring + highlight */
      var order = shuffle(q.options.map(function (o, k) { return k; }));
      for (var k = 0; k < order.length; k++) {
        (function (k) {
          var oi = order[k];
          var b = el('button', 'q-opt', q.options[oi]);
          b.type = 'button';
          b.setAttribute('data-oi', String(oi));
          b.onclick = function () { answer(oi, b, opts); };
          opts.appendChild(b);
        })(k);
      }
      body.appendChild(opts);
    }

    function answer(k, btn, opts) {
      if (locked) return;
      locked = true;
      var q = qs[qi];
      var all = opts.querySelectorAll('.q-opt');
      for (var k2 = 0; k2 < all.length; k2++) { all[k2].disabled = true; all[k2].classList.add('q-dim'); }
      var ok = k === q.a;
      if (ok) {
        right++; streak++;
        var gain = 10 + (streak % 3 === 0 ? 5 : 0);
        score += gain;
        btn.classList.remove('q-dim'); btn.classList.add('q-ok');
        sfx('good');
        burstAt(btn, 12);
      } else {
        streak = 0;
        var rightBtn = opts.querySelector('.q-opt[data-oi="' + q.a + '"]');
        if (rightBtn) { rightBtn.classList.remove('q-dim'); rightBtn.classList.add('q-ok'); }
        btn.classList.remove('q-dim'); btn.classList.add('q-no');
        sfx('bad');
      }
      barI.style.width = ((qi + 1) / qs.length * 100) + '%';
      countUp(hScore, score, 450);
      hStreak.textContent = streak;
      var fb = el('div', 'q-fb' + (ok ? ' ok' : ' no'));
      fb.appendChild(el('b', '', (ok ? '🎉 Correct! ' : '💡 Not quite. ') + (ok && streak > 1 ? 'Streak ' + streak + '! ' : '')));
      fb.appendChild(el('span', '', q.hint));
      var next = el('button', 'btn-go', qi + 1 < qs.length ? 'Next ▶' : 'See result ▶');
      next.type = 'button';
      next.onclick = function () {
        sfx('click');
        qi++;
        if (qi < qs.length) render();
        else {
          var ratio = right / qs.length;
          var stars = ratio >= 0.9 ? 3 : (ratio >= 0.7 ? 2 : 1);
          showResult(score, stars, right + ' of ' + qs.length + ' correct');
        }
      };
      fb.appendChild(next);
      foot.innerHTML = '';
      foot.appendChild(fb);
    }

    render();
  }

  /* ---------- engine: make 10 ---------- */
  function startMake10() {
    var tiles = shuffle(ch.game.tiles.slice());
    var target = ch.game.target || 10;
    var score = 0, mistakes = 0, pairs = tiles.length / 2, sel = null;

    var hud = hudRow([['0', 'score'], [String(pairs), 'pairs left']]);
    var board = el('div', 'm10-board');
    arena.appendChild(hud); arena.appendChild(board);
    var hScore = hud.children[0].firstChild, hPairs = hud.children[1].firstChild;

    function tap(tile) {
      if (tile.classList.contains('m10-gone')) return;
      if (!sel) {
        sel = tile; tile.classList.add('m10-sel'); sfx('click');
        return;
      }
      if (sel === tile) { sel.classList.remove('m10-sel'); sel = null; return; }
      var sum = parseInt(sel.getAttribute('data-v'), 10) + parseInt(tile.getAttribute('data-v'), 10);
      if (sum === target) {
        var a = sel, b = tile;
        sel = null;
        a.classList.remove('m10-sel');
        a.classList.add('m10-gone'); b.classList.add('m10-gone');
        score += 10; pairs--;
        countUp(hScore, score, 350); hPairs.textContent = pairs;
        sfx('good');
        burstAt(b, 10);
        if (pairs === 0) {
          var stars = mistakes === 0 ? 3 : (mistakes <= 2 ? 2 : 1);
          setTimeout(function () {
            showResult(score, stars, mistakes === 0 ? 'Perfect — no wrong taps!' : mistakes + ' wrong tap' + (mistakes === 1 ? '' : 's'));
          }, 350);
        }
      } else {
        mistakes++;
        sel.classList.remove('m10-sel');
        var a2 = sel, b2 = tile;
        sel = null;
        a2.style.animationDelay = ''; b2.style.animationDelay = '';
        a2.classList.add('m10-shake'); b2.classList.add('m10-shake');
        setTimeout(function () {
          a2.classList.remove('m10-shake'); b2.classList.remove('m10-shake');
        }, 400);
        sfx('bad');
      }
    }

    for (var k = 0; k < tiles.length; k++) {
      var t = el('button', 'm10-tile', String(tiles[k]));
      t.type = 'button';
      t.setAttribute('data-v', String(tiles[k]));
      t.style.animationDelay = (k * 0.045).toFixed(3) + 's';
      (function (t) { t.onclick = function () { tap(t); }; })(t);
      board.appendChild(t);
    }
    var tip = el('p', 'g-tip', ch.game.tip || 'Make pairs that add up to 10 · 1+9, 2+8, 3+7, 4+6, 5+5, 10+0');
    arena.appendChild(tip);
  }

  /* ---------- engine: sequence ---------- */
  function startSequence() {
    var steps = ch.game.steps;
    var next = 0, score = 0, mistakes = 0;

    var hud = hudRow([['0', 'score'], ['0 / ' + steps.length, 'placed']]);
    var wrap = el('div', 'seq-wrap');
    var slotsCol = el('div', 'seq-col');
    slotsCol.appendChild(el('h4', 'seq-h', ch.game.leftTitle || 'My day, in order'));
    var slots = el('div', 'seq-slots');
    slotsCol.appendChild(slots);
    var poolCol = el('div', 'seq-col');
    poolCol.appendChild(el('h4', 'seq-h', ch.game.rightTitle || 'Tap the next activity'));
    var pool = el('div', 'seq-pool');
    poolCol.appendChild(pool);
    wrap.appendChild(slotsCol); wrap.appendChild(poolCol);
    arena.appendChild(hud); arena.appendChild(wrap);
    var hScore = hud.children[0].firstChild, hDone = hud.children[1].firstChild;

    var order = [];
    for (var k = 0; k < steps.length; k++) order.push(k);
    shuffle(order);

    function place(chip) {
      if (parseInt(chip.getAttribute('data-i'), 10) === next) {
        next++;
        score += 10;
        countUp(hScore, score, 350);
        hDone.textContent = next + ' / ' + steps.length;
        chip.style.animationDelay = '';
        chip.classList.add('seq-placed');
        chip.onclick = null;
        slots.appendChild(chip);
        sfx('good');
        burstAt(chip, 8);
        if (next === steps.length) {
          var stars = mistakes === 0 ? 3 : (mistakes <= 2 ? 2 : 1);
          setTimeout(function () {
            showResult(score, stars, mistakes === 0 ? 'Perfect order!' : mistakes + ' wrong tap' + (mistakes === 1 ? '' : 's'));
          }, 350);
        }
      } else {
        mistakes++;
        chip.style.animationDelay = '';
        chip.classList.add('seq-shake');
        setTimeout(function () { chip.classList.remove('seq-shake'); }, 400);
        sfx('bad');
      }
    }

    for (var k2 = 0; k2 < order.length; k2++) {
      var st = steps[order[k2]];
      var chip = el('button', 'seq-chip', '<span class="seq-e">' + st.emoji + '</span><span>' + st.text + '</span>');
      chip.type = 'button';
      chip.setAttribute('data-i', String(order[k2]));
      chip.style.animationDelay = (k2 * 0.06).toFixed(3) + 's';
      (function (chip) { chip.onclick = function () { place(chip); }; })(chip);
      pool.appendChild(chip);
    }
  }

  /* ---------- engine: match (word ↔ picture) ---------- */
  function startMatch() {
    var pairs = ch.game.pairs;
    var tiles = [], k;
    for (k = 0; k < pairs.length; k++) {
      tiles.push({ key: k, text: pairs[k][0], side: 0 });
      tiles.push({ key: k, text: pairs[k][1], side: 1 });
    }
    shuffle(tiles);
    var score = 0, mistakes = 0, left = pairs.length, sel = null;

    var hud = hudRow([['0', 'score'], [String(left), 'pairs left']]);
    var board = el('div', 'match-board');
    arena.appendChild(hud); arena.appendChild(board);
    var hScore = hud.children[0].firstChild, hLeft = hud.children[1].firstChild;

    function tap(tile) {
      if (tile.classList.contains('m-done')) return;
      if (!sel) {
        sel = tile; tile.classList.add('m-sel'); sfx('click');
        return;
      }
      if (sel === tile) { sel.classList.remove('m-sel'); sel = null; return; }
      if (sel.getAttribute('data-k') === tile.getAttribute('data-k') &&
          sel.getAttribute('data-side') !== tile.getAttribute('data-side')) {
        var a = sel, b = tile;
        sel = null;
        a.classList.remove('m-sel');
        a.classList.add('m-done'); b.classList.add('m-done');
        score += 10; left--;
        countUp(hScore, score, 350); hLeft.textContent = left;
        sfx('good');
        burstAt(b, 10);
        if (left === 0) {
          var stars = mistakes === 0 ? 3 : (mistakes <= 2 ? 2 : 1);
          setTimeout(function () {
            showResult(score, stars, mistakes === 0 ? 'Perfect — no wrong taps!' : mistakes + ' wrong tap' + (mistakes === 1 ? '' : 's'));
          }, 400);
        }
      } else {
        mistakes++;
        sel.classList.remove('m-sel');
        var a2 = sel, b2 = tile;
        sel = null;
        a2.style.animationDelay = ''; b2.style.animationDelay = '';
        a2.classList.add('m-shake'); b2.classList.add('m-shake');
        setTimeout(function () {
          a2.classList.remove('m-shake'); b2.classList.remove('m-shake');
        }, 400);
        sfx('bad');
      }
    }

    for (k = 0; k < tiles.length; k++) {
      var t = el('button', 'mtile ' + (tiles[k].side ? 'mtile-e' : 'mtile-w'), tiles[k].text);
      t.type = 'button';
      t.setAttribute('data-k', String(tiles[k].key));
      t.setAttribute('data-side', String(tiles[k].side));
      t.style.animationDelay = (k * 0.045).toFixed(3) + 's';
      (function (t) { t.onclick = function () { tap(t); }; })(t);
      board.appendChild(t);
    }
    var tip = el('p', 'g-tip', 'Match every word with its picture · tap a word, then its picture');
    arena.appendChild(tip);
  }
})();
