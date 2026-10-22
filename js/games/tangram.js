GamePortal.register('tangram', {
  title: 'Shape Fit',
  emoji: '📐',
  cat: 'puzzle',
  c1: '#be185d',
  c2: '#fbbf24',
  tags: ['shapes', 'tangram', 'puzzle', 'geometry', 'fit', 'silhouette', 'kids', 'spatial', 'brain', 'fun'],
  rating: 4.7,
  plays: '0.3M',
  badge: 'Fun',
  controls: 'Tap a shape, then tap where it fits on the shadow!',
  desc: 'Seven shapes, one shadow — puzzle magic! Look at the grey shadow and fit every coloured piece into place: triangles, squares and the sneaky parallelogram. Five silhouettes from 3 pieces up to the full star set.',
  play: function (stage, api) {
    var COLORS = ['#f43f5e', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#ec4899', '#14b8a6'];
    var LEVELS = [
      {
        pieces: [
          { id: 'a', w: 90, h: 90, d: 'M0,0 L90,0 L0,90 Z' },
          { id: 'b', w: 40, h: 40, d: 'M0,0 L40,0 L0,40 Z' },
          { id: 'c', w: 100, h: 30, d: 'M0,0 L100,0 L100,30 L0,30 Z' }
        ],
        slots: [
          { dx: 70, dy: 40, need: 'a' },
          { dx: 158, dy: 42, need: 'b' },
          { dx: 45, dy: 152, need: 'c' }
        ]
      },
      {
        pieces: [
          { id: 'a', w: 70, h: 70, d: 'M0,0 L70,0 L70,70 L0,70 Z' },
          { id: 'b', w: 50, h: 50, d: 'M0,0 L50,0 L50,50 L0,50 Z' },
          { id: 'c', w: 26, h: 26, d: 'M0,26 L13,0 L26,26 Z' },
          { id: 'd', w: 26, h: 26, d: 'M0,26 L13,0 L26,26 Z' }
        ],
        slots: [
          { dx: 85, dy: 110, need: 'a' },
          { dx: 95, dy: 55, need: 'b' },
          { dx: 96, dy: 27, need: 'c' },
          { dx: 119, dy: 27, need: 'd' }
        ]
      },
      {
        pieces: [
          { id: 'a', w: 80, h: 70, d: 'M0,0 L80,0 L80,70 L0,70 Z' },
          { id: 'b', w: 120, h: 60, d: 'M0,60 L120,60 L60,0 Z' },
          { id: 'c', w: 26, h: 50, d: 'M0,0 L26,0 L26,50 L0,50 Z' },
          { id: 'd', w: 24, h: 24, d: 'M0,0 L24,0 L24,24 L0,24 Z' },
          { id: 'e', w: 18, h: 34, d: 'M0,0 L18,0 L18,34 L0,34 Z' }
        ],
        slots: [
          { dx: 70, dy: 110, need: 'a' },
          { dx: 50, dy: 50, need: 'b' },
          { dx: 82, dy: 130, need: 'c' },
          { dx: 122, dy: 132, need: 'd' },
          { dx: 153, dy: 30, need: 'e' }
        ]
      },
      {
        pieces: [
          { id: 'a', w: 100, h: 100, d: 'M0,0 L100,0 L0,100 Z' },
          { id: 'b', w: 40, h: 40, d: 'M40,0 L40,40 L0,20 Z' },
          { id: 'c', w: 14, h: 14, d: 'M0,0 L14,0 L14,14 L0,14 Z' },
          { id: 'd', w: 30, h: 30, d: 'M0,30 L30,0 L30,30 Z' },
          { id: 'e', w: 30, h: 30, d: 'M0,0 L30,0 L30,30 Z' },
          { id: 'f', w: 60, h: 20, d: 'M0,20 L40,0 L60,0 L20,20 Z' }
        ],
        slots: [
          { dx: 40, dy: 70, need: 'a' },
          { dx: 140, dy: 92, need: 'b' },
          { dx: 62, dy: 88, need: 'c' },
          { dx: 76, dy: 38, need: 'd' },
          { dx: 78, dy: 142, need: 'e' },
          { dx: 55, dy: 192, need: 'f' }
        ]
      },
      {
        pieces: [
          { id: 'a', w: 60, h: 60, d: 'M0,0 L60,0 L60,60 L0,60 Z' },
          { id: 'b', w: 60, h: 60, d: 'M0,60 L60,60 L30,0 Z' },
          { id: 'c', w: 60, h: 60, d: 'M0,0 L60,0 L30,60 Z' },
          { id: 'd', w: 60, h: 60, d: 'M60,0 L60,60 L0,30 Z' },
          { id: 'e', w: 60, h: 60, d: 'M0,0 L0,60 L60,30 Z' },
          { id: 'f', w: 30, h: 30, d: 'M0,0 L30,0 L30,30 L0,30 Z' },
          { id: 'g', w: 50, h: 48, d: 'M0,48 L40,4 L50,12 L10,48 Z' }
        ],
        slots: [
          { dx: 90, dy: 90, need: 'a' },
          { dx: 90, dy: 30, need: 'b' },
          { dx: 90, dy: 150, need: 'c' },
          { dx: 30, dy: 90, need: 'd' },
          { dx: 150, dy: 90, need: 'e' },
          { dx: 60, dy: 60, need: 'f' },
          { dx: 152, dy: 152, need: 'g' }
        ]
      }
    ];
    var key = 'ph_tangram_lvl';
    var unlocked = Math.min(LEVELS.length, Math.max(1, GamePortal.store.get(key, 1)));
    var level = 1;
    var alive = true;
    var sel = null;
    var placedCount = 0;
    var closed = false;

    var style = document.createElement('style');
    style.id = 'tangram-style';
    style.textContent =
      '.tang-svg{max-width:100%;background:#fdf2f8;border-radius:14px}' +
      '.tang-slot{fill:#cbd5e1;cursor:pointer}' +
      '.tang-slot:hover{fill:#94a3b8}' +
      '.tang-placed{pointer-events:none}' +
      '.tang-shake{animation:tangShake .3s}' +
      '@keyframes tangShake{0%,100%{transform:translateX(0)}25%{transform:translateX(-5px)}75%{transform:translateX(5px)}}' +
      '.tang-snap{animation:tangSnap .3s ease-out}' +
      '@keyframes tangSnap{0%{opacity:0;transform:scale(.4)}100%{opacity:1;transform:scale(1)}}' +
      '.tang-tray-btn{border:2px solid #f9a8d4;border-radius:10px;background:#fff;padding:4px;cursor:pointer;margin:3px}' +
      '.tang-tray-btn.on{outline:3px solid #be185d;background:#fce7f3}' +
      '.tang-tray-btn.gone{visibility:hidden}';
    document.head.appendChild(style);

    var wrap = document.createElement('div');
    wrap.className = 'quiz-wrap tangg';
    wrap.dataset.level = '1';
    wrap.dataset.placed = '0';
    wrap.dataset.total = '3';
    wrap.innerHTML =
      '<div class="lv-strip" id="tg-levels"><span class="lv-strip-label">Level</span></div>' +
      '<div class="lv-goal" id="tg-goal"></div>' +
      '<div style="text-align:center"><svg id="tg-board" class="tang-svg" viewBox="0 0 240 240" width="260" height="260"></svg></div>' +
      '<div class="math-top" style="justify-content:center"><span class="math-stat" id="tg-prog">Placed 0 / 3</span></div>' +
      '<div id="tg-tray" style="text-align:center;min-height:52px"></div>' +
      '<div class="hint" id="tg-hint">Tap a shape, then tap its spot on the shadow.</div>';
    stage.appendChild(wrap);

    var board = wrap.querySelector('#tg-board');
    var tray = wrap.querySelector('#tg-tray');
    var elGoal = wrap.querySelector('#tg-goal');
    var elProg = wrap.querySelector('#tg-prog');
    var elHint = wrap.querySelector('#tg-hint');
    var elLevels = wrap.querySelector('#tg-levels');
    var ns = 'http://www.w3.org/2000/svg';

    function cfg() { return LEVELS[level - 1]; }
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
      elProg.textContent = 'Placed ' + placedCount + ' / ' + cfg().slots.length;
      wrap.dataset.placed = String(placedCount);
      wrap.dataset.total = String(cfg().slots.length);
      api.setScore(Math.max(0, (level - 1) * 100 + placedCount * 25));
    }
    function colorFor(id) {
      var ps = cfg().pieces;
      for (var i = 0; i < ps.length; i++) if (ps[i].id === id) return COLORS[i % COLORS.length];
      return '#333';
    }
    function renderBoard() {
      board.innerHTML = '';
      var c = cfg();
      var i, s, p;
      for (i = 0; i < c.slots.length; i++) {
        s = c.slots[i];
        p = document.createElementNS(ns, 'path');
        var pi = 0;
        for (var k = 0; k < c.pieces.length; k++) if (c.pieces[k].id === s.need) pi = k;
        p.setAttribute('d', c.pieces[pi].d);
        p.setAttribute('transform', 'translate(' + s.dx + ',' + s.dy + ')');
        p.setAttribute('class', 'tang-slot');
        p.setAttribute('data-slot', String(i));
        p.setAttribute('data-need', s.need);
        board.appendChild(p);
      }
      hud();
    }
    function renderTray() {
      tray.innerHTML = '';
      var c = cfg();
      for (var i = 0; i < c.pieces.length; i++) {
        var pc = c.pieces[i];
        var b = document.createElement('button');
        b.type = 'button';
        b.className = 'tang-tray-btn';
        b.setAttribute('data-id', pc.id);
        b.innerHTML = '<svg viewBox="0 0 ' + pc.w + ' ' + pc.h + '" width="40" height="40"><path d="' + pc.d + '" fill="' + COLORS[i % COLORS.length] + '" stroke="#fff" stroke-width="2"/></svg>';
        tray.appendChild(b);
      }
    }
    function finishLevel() {
      if (level > unlocked) { unlocked = level; GamePortal.store.set(key, unlocked); }
      if (level >= LEVELS.length) {
        api.win({
          emoji: '🏅',
          title: 'Shape Master!',
          text: 'The full star set fits like a glove — ' + api.score + ' points!'
        });
        return;
      }
      api.sfx('win');
      api.overlay({
        emoji: '🧩',
        title: 'Level ' + level + ' complete!',
        text: 'Every shape snapped in! A bigger shadow is next.',
        score: api.score,
        best: api.getBest(),
        onAgain: function () { api.clearOverlay(); level++; startLevel(level); }
      });
    }
    function startLevel(n) {
      level = Math.max(1, Math.min(LEVELS.length, n));
      api.clearOverlay();
      api.setScore(0);
      sel = null;
      placedCount = 0;
      alive = true;
      renderStrip();
      elGoal.textContent = 'Level ' + level + ' — fit ' + cfg().slots.length + ' shapes into the shadow!';
      elHint.textContent = 'Tap a shape below, then tap its spot on the shadow.';
      renderBoard();
      renderTray();
    }

    tray.addEventListener('click', function (e) {
      if (!alive) return;
      var b = e.target.closest('[data-id]');
      if (!b) return;
      sel = b.getAttribute('data-id');
      api.sfx('click');
      var btns = tray.querySelectorAll('[data-id]');
      for (var i = 0; i < btns.length; i++) {
        if (btns[i].getAttribute('data-id') === sel) btns[i].classList.add('on');
        else btns[i].classList.remove('on');
      }
      elHint.textContent = 'Now tap the shadow spot for that shape.';
    });
    board.addEventListener('click', function (e) {
      if (!alive) return;
      var t = e.target.closest ? e.target.closest('[data-slot]') : null;
      if (!t) return;
      if (!t.getAttribute('data-need')) return;
      if (!sel) {
        elHint.textContent = 'Pick a shape from the tray first!';
        api.sfx('bad');
        return;
      }
      if (t.getAttribute('data-need') !== sel) {
        api.sfx('bad');
        t.classList.remove('tang-shake');
        t.classList.add('tang-shake');
        elHint.textContent = 'That shape does not fit there — try another spot!';
        return;
      }
      var c = cfg();
      var pi = 0;
      for (var k = 0; k < c.pieces.length; k++) if (c.pieces[k].id === sel) pi = k;
      var pc = c.pieces[pi];
      var s = t.getAttribute('transform');
      var np = document.createElementNS(ns, 'path');
      np.setAttribute('d', pc.d);
      np.setAttribute('transform', s);
      np.setAttribute('class', 'tang-placed tang-snap');
      np.setAttribute('fill', COLORS[pi % COLORS.length]);
      np.setAttribute('stroke', '#ffffff');
      np.setAttribute('stroke-width', '2');
      board.appendChild(np);
      t.removeAttribute('data-need');
      t.classList.remove('tang-slot');
      t.setAttribute('fill', 'transparent');
      var gone = tray.querySelector('[data-id="' + sel + '"]');
      if (gone) { gone.classList.add('gone'); gone.classList.remove('on'); }
      sel = null;
      placedCount++;
      api.sfx('good');
      elHint.textContent = 'Snap! ' + placedCount + ' of ' + c.slots.length + ' in place.';
      hud();
      if (placedCount >= c.slots.length) { alive = false; setTimeout(function () { if (!closed) finishLevel(); }, 450); }
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
      closed = true;
      if (style && style.parentNode) style.parentNode.removeChild(style);
    };
  }
});
