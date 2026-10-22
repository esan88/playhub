/* Flag Quest — geography knowledge (locally drawn SVG flags) */
(function () {
  'use strict';

var F = [
  { n: 'France', d: 'V:#002395,#FFFFFF,#EF4135' },
  { n: 'Italy', d: 'V:#009246,#FFFFFF,#CE2B37' },
  { n: 'Ireland', d: 'V:#169B62,#FFFFFF,#FF883E' },
  { n: 'Belgium', d: 'V:#141414,#FDDA24,#EF3340' },
  { n: 'Romania', d: 'V:#002B7F,#FCD116,#CE1126' },
  { n: 'Chad', d: 'V:#002664,#FECB00,#C60C30' },
  { n: 'Mali', d: 'V:#14B53A,#FCD116,#CE1126' },
  { n: 'Nigeria', d: 'V:#008751,#FFFFFF,#008751' },
  { n: 'Mexico', d: 'V:#006847,#FFFFFF,#CE1126&C:30,20,3.5,#8b5a2b' },
  { n: 'Portugal', d: 'V:2:#046A38,3:#DA291C&C:24,20,4.5,#FFE900' },
  { n: 'Guinea', d: 'V:#CE1126,#FCD116,#009460' },
  { n: 'Ivory Coast', d: 'V:#F77F00,#FFFFFF,#009E60' },
  { n: 'Germany', d: 'H:#141414,#DD0000,#FFCE00' },
  { n: 'Russia', d: 'H:#FFFFFF,#0039A6,#D52B1E' },
  { n: 'Netherlands', d: 'H:#AE1C28,#FFFFFF,#21468B' },
  { n: 'Austria', d: 'H:#ED2939,#FFFFFF,#ED2939' },
  { n: 'Hungary', d: 'H:#CE2939,#FFFFFF,#477050' },
  { n: 'Poland', d: 'H:#FFFFFF,#DC143C' },
  { n: 'Indonesia', d: 'H:#FF0000,#FFFFFF' },
  { n: 'Ukraine', d: 'H:#005BBB,#FFD500' },
  { n: 'Bulgaria', d: 'H:#FFFFFF,#00966E,#D62612' },
  { n: 'Spain', d: 'H:1:#AA151B,2:#F1BF00,1:#AA151B' },
  { n: 'Thailand', d: 'H:1:#A51931,1:#F4F5F8,2:#2D2A4A,1:#F4F5F8,1:#A51931' },
  { n: 'Colombia', d: 'H:2:#FCD116,1:#003893,1:#CE1126' },
  { n: 'Argentina', d: 'H:#75AADB,#FFFFFF,#75AADB&C:30,20,3,#F6B40E' },
  { n: 'India', d: 'H:#FF9933,#FFFFFF,#138808&R:30,20,4,1.4,#000080' },
  { n: 'Egypt', d: 'H:#CE1126,#FFFFFF,#141414&C:30,20,3,#C09300' },
  { n: 'United Arab Emirates', d: 'H:#00732F,#FFFFFF,#141414&Q:0,0,15,40,#FF0000' },
  { n: 'Sweden', d: 'X:#006AA7,#FECC00' },
  { n: 'Denmark', d: 'X:#C8102E,#FFFFFF' },
  { n: 'Finland', d: 'X:#FFFFFF,#003580' },
  { n: 'Norway', d: 'X3:#BA0C2F,#FFFFFF,#00205B' },
  { n: 'Iceland', d: 'X3:#02529C,#FFFFFF,#DC1E35' },
  { n: 'Switzerland', d: 'S:#D52B1E&PX:30,20,22,7,#FFFFFF' },
  { n: 'Japan', d: 'S:#FFFFFF&C:30,20,9,#BC002D' },
  { n: 'Bangladesh', d: 'S:#006A4E&C:26,20,8,#F42A41' },
  { n: 'Turkey', d: 'S:#E30A17&C:24,20,7,#FFFFFF&C:26.5,20,5.6,#E30A17&ST:37,20,4.5,#FFFFFF' },
  { n: 'Vietnam', d: 'S:#DA251D&ST:30,20,9,#FFFF00' },
  { n: 'China', d: 'S:#DE2910&ST:13,13,5,#FFDE00&ST:21,5,1.9,#FFDE00&ST:24.5,9,1.9,#FFDE00&ST:24.5,14.5,1.9,#FFDE00&ST:21,18.5,1.9,#FFDE00' },
  { n: 'Brazil', d: 'S:#009C3B&D:30,20,34,24,#FFDF00&C:30,20,9,#002776' },
  { n: 'Canada', d: 'V:1:#FF0000,2:#FFFFFF,1:#FF0000&L:30,20,13,#FF0000' },
  { n: 'United Kingdom', d: 'S:#012169&SA:7,#FFFFFF&SA:3.4,#C8102E&PX:30,20,40,14,#FFFFFF&PX:30,20,40,8,#C8102E' },
  { n: 'Morocco', d: 'S:#C1272D&ST:30,20,8,#006233' },
  { n: 'Chile', d: 'H:1:#FFFFFF,1:#D52B1E&Q:0,0,20,20,#0039A6&ST:10,10,6,#FFFFFF' },
  { n: 'Czechia', d: 'H:2:#FFFFFF,1:#D7141A&TR:#11457E' },
  { n: 'United States', d: 'H13:#B22234,#FFFFFF&Q:0,0,26,21,#3C3B6E&SG:2,2,22,17,5,4,#FFFFFF' },
  { n: 'Greece', d: 'H9:#0D5EAF,#FFFFFF&Q:0,0,20,20,#0D5EAF&PX:10,10,20,6,#FFFFFF' }
];

/* ---------- tiny SVG flag builder ---------- */
function rect(x, y, w, h, c) {
  return '<rect x="' + x.toFixed(2) + '" y="' + y.toFixed(2) + '" width="' + w.toFixed(2) + '" height="' + h.toFixed(2) + '" fill="' + c + '"/>';
}
function circle(cx, cy, r, c) {
  return '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="' + c + '"/>';
}
function star(cx, cy, r, c) {
  var pts = [];
  for (var i = 0; i < 10; i++) {
    var rad = i % 2 ? r * 0.382 : r;
    var a = (i * 36 - 90) * Math.PI / 180;
    pts.push((cx + Math.cos(a) * rad).toFixed(2) + ',' + (cy + Math.sin(a) * rad).toFixed(2));
  }
  return '<polygon points="' + pts.join(' ') + '" fill="' + c + '"/>';
}

function stripes(dir, spec) {
  var toks = spec.split(','), vals = [], total = 0;
  toks.forEach(function (t) {
    var p = t.split(':');
    var wt = p.length > 1 ? parseFloat(p[0]) : 1;
    var col = p.length > 1 ? p[1] : p[0];
    vals.push({ w: wt, c: col });
    total += wt;
  });
  var out = '', pos = 0, span = dir === 'H' ? 40 : 60;
  vals.forEach(function (v) {
    var len = v.w / total * span;
    out += dir === 'H'
      ? rect(0, pos, 60, len + 0.4, v.c)
      : rect(pos, 0, len + 0.4, 40, v.c);
    pos += len;
  });
  return out;
}

function build(def) {
  var parts = def.split('&');
  var base = parts[0];
  var ci = base.indexOf(':');
  var kind = base.slice(0, ci);
  var spec = base.slice(ci + 1);
  var out = '';

  if (kind === 'V') out += stripes('V', spec);
  else if (kind === 'H') out += stripes('H', spec);
  else if (kind === 'H13' || kind === 'H9') {
    var n = +kind.slice(1), cols = spec.split(',');
    for (var i = 0; i < n; i++) out += rect(0, i * 40 / n, 60, 40 / n + 0.4, cols[i % 2]);
  } else if (kind === 'S') out += rect(0, 0, 60, 40, spec);
  else if (kind === 'X') {
    var p = spec.split(',');
    out += rect(0, 0, 60, 40, p[0]) + rect(15, 0, 8, 40, p[1]) + rect(0, 16, 60, 8, p[1]);
  } else if (kind === 'X3') {
    var q = spec.split(',');
    out += rect(0, 0, 60, 40, q[0]);
    out += rect(14, 0, 12, 40, q[1]) + rect(0, 14, 60, 12, q[1]);
    out += rect(16.5, 0, 7, 40, q[2]) + rect(0, 16.5, 60, 7, q[2]);
  }

  for (var e = 1; e < parts.length; e++) {
    var seg = parts[e].split(':');
    var type = seg[0];
    var a = seg.slice(1).join(':').split(',');
    var color = a[a.length - 1];
    var num = a.slice(0, -1).map(Number);

    if (type === 'C') out += circle(num[0], num[1], num[2], color);
    else if (type === 'R') out += '<circle cx="' + num[0] + '" cy="' + num[1] + '" r="' + num[2] + '" fill="none" stroke="' + color + '" stroke-width="' + num[3] + '"/>';
    else if (type === 'D') out += '<polygon points="' + num[0] + ',' + (num[1] - num[3] / 2) + ' ' + (num[0] + num[2] / 2) + ',' + num[1] + ' ' + num[0] + ',' + (num[1] + num[3] / 2) + ' ' + (num[0] - num[2] / 2) + ',' + num[1] + '" fill="' + color + '"/>';
    else if (type === 'ST') out += star(num[0], num[1], num[2], color);
    else if (type === 'SG') {
      var x0 = num[0], y0 = num[1], w = num[2], h = num[3], cols = num[4], rows = num[5];
      for (var r = 0; r < rows; r++)
        for (var c = 0; c < cols; c++)
          out += circle(x0 + (w / (cols + 1)) * (c + 1), y0 + (h / (rows + 1)) * (r + 1), 1.1, color);
    } else if (type === 'Q') out += rect(num[0], num[1], num[2], num[3], color);
    else if (type === 'TR') out += '<polygon points="0,0 30,20 0,40" fill="' + color + '"/>';
    else if (type === 'PX') {
      var cx = num[0], cy = num[1], arm = num[2] / 2, th = num[3] / 2;
      out += rect(cx - arm, cy - th, arm * 2, th * 2, color) + rect(cx - th, cy - arm, th * 2, arm * 2, color);
    } else if (type === 'SA') {
      var t = num[0];
      out += '<line x1="0" y1="0" x2="60" y2="40" stroke="' + color + '" stroke-width="' + t + '"/>' +
             '<line x1="60" y1="0" x2="0" y2="40" stroke="' + color + '" stroke-width="' + t + '"/>';
    } else if (type === 'L') {
      /* simplified maple leaf */
      var s = num[2] / 16, lx = num[0], ly = num[1];
      var pts = [[0,-8],[1.6,-3.2],[5.2,-5],[4.4,-0.6],[8.6,0.4],[5.4,3.2],[7.4,6],[2.6,5.2],[3,9.4],[0,6.6],[-3,9.4],[-2.6,5.2],[-7.4,6],[-5.4,3.2],[-8.6,0.4],[-4.4,-0.6],[-5.2,-5],[-1.6,-3.2]]
        .map(function (p) { return (lx + p[0] * s).toFixed(2) + ',' + (ly + p[1] * s).toFixed(2); }).join(' ');
      out += '<polygon points="' + pts + '" fill="' + color + '"/>';
    }
  }
  return '<svg viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg" role="img">' + out + '</svg>';
}


GamePortal.register('flags', {
  title: 'Flag Quest',
  emoji: '🚩',
  cat: 'knowledge',
  c1: '#0b3d91',
  c2: '#e63946',
  tags: ['flags', 'countries', 'geography', 'world', 'knowledge', 'quiz'],
  rating: 4.9,
  plays: '2.2M',
  badge: 'Knowledge',
  controls: 'Pick the country for the flag — or the flag for the country · 3 lives',
  desc: 'Over 45 hand-drawn flags to identify, plus reverse rounds where you pick the right flag. Keep your streak alive!',
  play: function (stage, api) {
    var LEVELS = [
      { goal: 8 },
      { goal: 10 },
      { goal: 12 },
      { goal: 14 },
      { goal: 16 }
    ];
    var key = 'ph_flags_lvl';
    var unlocked = Math.min(LEVELS.length, Math.max(1, GamePortal.store.get(key, 1)));
    var level = 1;
    var gen = 0;
    var lives = 3, streak = 0, correct = 0, dead = false, current = null, lock = false, mode = 0;

    var wrap = document.createElement('div');
    wrap.className = 'quiz-wrap';
    wrap.dataset.level = '1';
    wrap.innerHTML =
      '<div class="lv-strip" id="fg-levels"><span class="lv-strip-label">Level</span></div>' +
      '<div class="lv-goal" id="fg-goal"></div>' +
      '<div class="quiz-top">' +
        '<span class="math-stat">Lives <b class="lives" id="f-lives">❤️❤️❤️</b></span>' +
        '<span class="math-stat">Streak <b id="f-streak">0</b></span>' +
        '<span class="math-stat">Named <b id="f-ok">0</b></span>' +
      '</div>' +
      '<div class="q-card flag-card" id="f-card"></div>' +
      '<div class="ans-grid" id="f-ans"></div>' +
      '<div class="math-fb" id="f-fb"></div>';
    stage.appendChild(wrap);

    var elCard = wrap.querySelector('#f-card');
    var elAns = wrap.querySelector('#f-ans');
    var elLives = wrap.querySelector('#f-lives');
    var elStreak = wrap.querySelector('#f-streak');
    var elOk = wrap.querySelector('#f-ok');
    var elFb = wrap.querySelector('#f-fb');
    var elGoal = wrap.querySelector('#fg-goal');
    var elLevels = wrap.querySelector('#fg-levels');

    /* ---------- quiz ---------- */
    function shuffle(a) {
      for (var i = a.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var t = a[i]; a[i] = a[j]; a[j] = t;
      }
      return a;
    }

    function cfg() { return LEVELS[level - 1]; }
    function renderLevels() {
      var html = '<span class="lv-strip-label">Level</span>';
      for (var n = 1; n <= LEVELS.length; n++) {
        var cls = 'lv-btn' + (n === level ? ' on' : '') + (n > unlocked ? ' locked' : '');
        html += '<button type="button" class="' + cls + '" data-lv="' + n + '"' + (n > unlocked ? ' disabled' : '') + '>' + n + '</button>';
      }
      elLevels.innerHTML = html;
      elGoal.textContent = 'Identify ' + cfg().goal + ' flags to clear level ' + level + '!';
      wrap.dataset.level = String(level);
    }
    function levelClear() {
      dead = true;
      if (level > unlocked) { unlocked = level; GamePortal.store.set(key, unlocked); }
      if (level >= LEVELS.length) {
        api.win({
          title: 'Flag Champion! 🚩',
          text: 'All ' + LEVELS.length + ' levels cleared — ' + api.score + ' points!'
        });
        return;
      }
      api.sfx('win');
      api.overlay({
        title: 'Level ' + level + ' complete!',
        text: 'Next: identify ' + LEVELS[level].goal + ' flags to clear level ' + (level + 1) + '.',
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
      lives = 3; streak = 0; correct = 0; dead = false; lock = false; mode = 0;
      elLives.textContent = '❤️❤️❤️';
      elStreak.textContent = '0';
      elOk.textContent = '0';
      renderLevels();
      question();
    }

    function question() {
      lock = false;
      mode = 1 - mode;
      var pick = F[Math.floor(Math.random() * F.length)];
      current = pick;
      var others = shuffle(F.filter(function (d) { return d.n !== pick.n; })).slice(0, 3);

      if (mode === 0) {
        elCard.innerHTML = '<div class="q-kicker">Which country is this?</div>' +
          '<div class="flag-holder">' + build(pick.d) + '</div>';
        elAns.className = 'ans-grid';
        elAns.innerHTML = shuffle(others.concat([pick])).map(function (o) {
          return '<button class="ans-btn" data-n="' + o.n + '"' + (o.n === pick.n ? ' data-ok="1"' : '') + '>' + o.n + '</button>';
        }).join('');
      } else {
        elCard.innerHTML = '<div class="q-kicker">Which flag belongs to…</div>' +
          '<div class="q-text">' + pick.n + '</div>';
        elAns.className = 'ans-grid flag-opts';
        elAns.innerHTML = shuffle(others.concat([pick])).map(function (o) {
          return '<button class="ans-btn flag-btn" data-n="' + o.n + '"' + (o.n === pick.n ? ' data-ok="1"' : '') + '>' + build(o.d) + '</button>';
        }).join('');
      }
      elFb.textContent = '';
      elFb.className = 'math-fb';
    }

    function answer(btn) {
      if (lock || dead) return;
      lock = true;
      var ok = btn.dataset.ok === '1';
      elAns.querySelectorAll('.ans-btn').forEach(function (b) {
        b.disabled = true;
        if (b.dataset.ok === '1') b.classList.add('right');
      });

      if (ok) {
        correct++;
        streak++;
        api.addScore(100 + Math.min(200, streak * 25));
        elFb.textContent = '✓ ' + current.n + '!';
        elFb.className = 'math-fb ok';
        api.sfx('good');
      } else {
        btn.classList.add('wrong');
        lives--;
        streak = 0;
        elLives.textContent = '❤️'.repeat(lives) + '🖤'.repeat(3 - lives);
        elFb.textContent = '✗ It was ' + current.n;
        elFb.className = 'math-fb no';
        api.sfx('bad');
      }
      elStreak.textContent = streak;
      elOk.textContent = correct;

      if (ok && correct >= cfg().goal) { levelClear(); return; }

      if (lives <= 0) {
        dead = true;
        var g = gen;
        setTimeout(function () {
          if (g !== gen) return;
          api.gameOver({ title: 'No lives left', text: 'You identified ' + correct + ' flags. Geography champion?', onAgain: function () { api.clearOverlay(); startLevel(level); } });
        }, 900);
        return;
      }
      setTimeout(function () { if (!dead) question(); }, ok ? 800 : 1500);
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

  GamePortal.flagDefs = F;
  GamePortal.flagSVG = build;
})();
