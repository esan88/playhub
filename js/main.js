/* PlayHub portal: grid, search, categories, hero, modal + HUD */
(function () {
  'use strict';

  var GP = window.GamePortal;
  var $ = function (s) { return document.querySelector(s); };

  var CATS = [
    { id: 'all', label: 'All', emoji: '✨' },
    { id: 'learning', label: 'Learning', emoji: '📚' },
    { id: 'class1', label: 'Class 1 Maths', emoji: '🧮' },
    { id: 'kids', label: 'Kids', emoji: '🧒' },
    { id: 'boys', label: 'For Boys', emoji: '🏎️' },
    { id: 'girls', label: 'For Girls', emoji: '🎀' },
    { id: 'knowledge', label: 'Knowledge', emoji: '🌍' },
    { id: 'arcade', label: 'Arcade', emoji: '👾' },
    { id: 'puzzle', label: 'Puzzle', emoji: '🧠' },
    { id: 'casual', label: 'Casual', emoji: '🎈' },
    { id: 'olympiad', label: 'Olympiad', emoji: '🏆' }
  ];

  var state = { cat: 'all', q: '' };
  var activeId = null;
  var cleanup = null;
  var crashGuard = false;

  /* extra games shown in a shelf even though their primary cat differs */
  var AUD = {
    boys: ['snake', 'breakout', 'flappy', 'tictactoe', 'g2048', 'whack'],
    girls: ['memory', 'flags', 'trivia', 'scramble', 'clock', 'counting'],
    kids: ['basket', 'carrush', 'dinodash', 'space', 'baker', 'starcatch', 'dressup', 'cake', 'unicorn', 'chess', 'touchtype', 'sudoku', 'coderobot', 'durga', 'ravandahan'],
    arcade: ['space', 'carrush', 'dinodash', 'unicorn', 'starcatch'],
    casual: ['dressup', 'cake'],
    learning: ['jm1', 'jm2', 'jm3', 'jm4', 'jm5', 'jm6', 'jm7', 'jm8', 'jm9', 'jm10', 'jm11', 'jm12', 'jm13']
  };

  /* ================= cards ================= */
  function cardHTML(g, compact) {
    return '' +
      '<a class="card" data-id="' + g.id + '" href="#play-' + g.id + '" aria-label="Play ' + g.title + '">' +
        '<span class="thumb" style="--c1:' + g.c1 + ';--c2:' + g.c2 + '">' +
          '<span class="blob b1"></span><span class="blob b2"></span>' +
          '<span class="thumb-emoji">' + g.emoji + '</span>' +
          '<span class="thumb-play">▶</span>' +
          (!compact && g.badge ? '<span class="badge">' + g.badge + '</span>' : '') +
        '</span>' +
        (compact ? '' :
        '<span class="card-meta">' +
          '<span class="card-title">' + g.title + '</span>' +
          '<span class="card-sub">' + catLabel(g.cat) + ' · ★ ' + g.rating.toFixed(1) + '</span>' +
        '</span>') +
      '</a>';
  }

  function catLabel(id) {
    var c = CATS.filter(function (x) { return x.id === id; })[0];
    return c ? c.label : id;
  }

  function matches(g) {
    if (state.cat !== 'all' && g.cat !== state.cat) {
      var extra = AUD[state.cat];
      if (!extra || extra.indexOf(g.id) === -1) return false;
    }
    if (!state.q) return true;
    var hay = (g.title + ' ' + g.desc + ' ' + g.tags.join(' ') + ' ' + catLabel(g.cat) + ' ' + g.id).toLowerCase();
    var words = state.q.split(/\s+/);
    for (var wi = 0; wi < words.length; wi++) {
      if (words[wi] && hay.indexOf(words[wi]) === -1) return false;
    }
    return true;
  }

  function renderSug() {
    var sug = document.getElementById('search-sug');
    if (!sug) return;
    var q = (state.q || '').trim();
    var modalOpen = !document.getElementById('modal').hidden;
    if (!q || modalOpen) { sug.hidden = true; sug.innerHTML = ''; return; }
    var list = GP.all().filter(matches).slice(0, 6);
    if (!list.length) { sug.hidden = true; sug.innerHTML = ''; return; }
    sug.innerHTML = list.map(function (g) {
      return '<button type="button" class="sug-item" data-id="' + g.id + '">' +
        '<span class="sug-emoji">' + g.emoji + '</span>' +
        '<span class="sug-title">' + g.title + '</span>' +
        '<span class="sug-cat">' + catLabel(g.cat) + '</span></button>';
    }).join('');
    sug.hidden = false;
  }

  function renderGrid() {
    var list = GP.all().filter(matches);
    var grid = $('#grid');
    grid.innerHTML = list.map(function (g) { return cardHTML(g); }).join('');
    $('#empty').hidden = list.length > 0;
    $('#game-count').textContent = list.length + ' game' + (list.length === 1 ? '' : 's');
    $('#grid-title').textContent = state.q
      ? 'Results for “' + state.q + '”'
      : (state.cat === 'all' ? 'All games' : catLabel(state.cat) + ' games');
    renderSug();
  }

  function renderRecent() {
    var ids = GP.store.get('ph_recent', []);
    var list = ids.map(GP.get).filter(Boolean).slice(0, 8);
    $('#recent-section').hidden = list.length === 0;
    $('#recent-grid').innerHTML = list.map(function (g) { return cardHTML(g, true); }).join('');
  }

  function pushRecent(id) {
    var ids = GP.store.get('ph_recent', []).filter(function (x) { return x !== id; });
    ids.unshift(id);
    GP.store.set('ph_recent', ids.slice(0, 8));
  }

  /* ================= categories / hero / footer ================= */
  function updateCatBar() {
    var bar = document.querySelector('.cats-bar');
    var cats = $('#cats');
    if (!bar || !cats) return;
    var max = cats.scrollWidth - cats.clientWidth;
    if (max > 2) {
      bar.classList.add('cats-scroll');
      if (cats.scrollLeft > 2) bar.classList.add('cats-l'); else bar.classList.remove('cats-l');
      if (cats.scrollLeft < max - 2) bar.classList.add('cats-r'); else bar.classList.remove('cats-r');
    } else {
      bar.classList.remove('cats-scroll');
      bar.classList.remove('cats-l');
      bar.classList.remove('cats-r');
    }
  }

  function centerActiveCat() {
    var cats = $('#cats');
    if (!cats) return;
    if (cats.scrollWidth - cats.clientWidth <= 2) return; /* wrapping layout: nothing to scroll */
    var on = cats.querySelector('.pill-btn.on');
    if (!on) return;
    var max = cats.scrollWidth - cats.clientWidth;
    var left = on.offsetLeft - (cats.clientWidth - on.offsetWidth) / 2;
    if (left < 0) left = 0;
    if (left > max) left = max;
    cats.scrollLeft = left;
    updateCatBar();
  }

  function renderCats() {
    $('#cats').innerHTML = CATS.map(function (c) {
      return '<a class="pill-btn' + (c.id === state.cat ? ' on' : '') + '" data-cat="' + c.id + '" href="#cat-' + c.id + '">' +
        '<span>' + c.emoji + '</span>' + c.label + '</a>';
    }).join('');
    $('#footer-cats').innerHTML = CATS.map(function (c) {
      return '<a class="chip" data-cat="' + c.id + '" href="#cat-' + c.id + '">' + c.label + '</a>';
    }).join('');
    centerActiveCat();
    updateCatBar();
  }

  function renderHero() {
    var g = GP.get('snake') || GP.all()[0];
    if (!g) return;
    $('#hero').hidden = false;
    $('#hero').style.setProperty('--c1', g.c1);
    $('#hero').style.setProperty('--c2', g.c2);
    $('#hero-emoji').textContent = g.emoji;
    $('#hero-title').textContent = g.title;
    $('#hero-desc').textContent = g.desc;
    $('#hero-meta').textContent = '★ ' + g.rating.toFixed(1) + ' · ' + g.tags.join(' · ');
    $('#hero-play').onclick = function () { openGame(g.id); };
  }

  function renderFooter() {
    $('#year').textContent = new Date().getFullYear();
    $('#footer-top').innerHTML = GP.all().slice(0, 6).map(function (g) {
      return '<a class="chip" data-id="' + g.id + '" href="#play-' + g.id + '">' + g.emoji + ' ' + g.title + '</a>';
    }).join('');
  }

  function renderChapStars() {
    var cards = document.querySelectorAll('[data-chap-stars]');
    for (var i = 0; i < cards.length; i++) {
      var st = GP.store.get('ph_stars_' + cards[i].getAttribute('data-chap-stars'), 0) || 0;
      if (st > 3) st = 3;
      if (st < 0) st = 0;
      var slot = cards[i].querySelector('.chap-stars');
      if (slot) slot.textContent = '★★★'.slice(0, st) + '☆☆☆'.slice(0, 3 - st);
    }
  }

  /* ================= URL state (shareable category / game links) ================= */
  function setHash(h) {
    var want = h ? '#' + h : '';
    if (location.hash === want) return;
    if (h) { location.hash = h; return; }
    try { history.replaceState(null, '', location.pathname + location.search); }
    catch (e) { /* file:// may block replaceState — leaving the hash is harmless */ }
  }

  function applyHash() {
    var h = location.hash || '';
    if (h.indexOf('#play-') === 0) {
      var gid = h.slice(6);
      if (GP.get(gid)) { if (activeId !== gid) openGame(gid); }
      else if (activeId) closeGame();
    } else if (h.indexOf('#cat-') === 0) {
      var cid = h.slice(5);
      var ok = CATS.some(function (c) { return c.id === cid; });
      if (ok && state.cat !== cid) { state.cat = cid; renderCats(); renderGrid(); }
      if (activeId) closeGame(true);
    } else if (activeId) {
      closeGame();
    }
  }

  function syncSearchUrl() {
    try {
      history.replaceState(null, '', location.pathname +
        (state.q ? '?q=' + encodeURIComponent(state.q) : '') + (location.hash || ''));
    } catch (e) { /* ignore on file:// */ }
  }

  /* ================= modal + HUD ================= */
  function hudApi() {
    return {
      setScore: function (v) { $('#hud-score').textContent = v; },
      setBest: function (v) { $('#hud-best').textContent = v; },
      overlay: function (o) {
        var again = o.onAgain;
        $('#stage').insertAdjacentHTML('beforeend',
          '<div class="go-overlay">' +
            '<div class="go-card">' +
              '<div class="go-emoji">' + (o.emoji || '🏁') + '</div>' +
              '<h3>' + o.title + '</h3>' +
              (o.text ? '<p>' + o.text + '</p>' : '') +
              '<div class="go-scores">' +
                '<div><span>Score</span><b>' + o.score + '</b></div>' +
                '<div><span>Best</span><b>' + o.best + '</b></div>' +
              '</div>' +
              '<div class="go-btns">' +
                '<button class="btn btn-primary" data-go="again">↻ Play again</button>' +
                '<button class="btn btn-ghost" data-go="back">← All games</button>' +
              '</div>' +
            '</div>' +
          '</div>');
        var ov = $('#stage .go-overlay');
        ov.querySelector('[data-go="again"]').onclick = function () {
          GP.sound.play('click');
          if (again) again(); else restart();
        };
        ov.querySelector('[data-go="back"]').onclick = function () { closeGame(); };
      },
      clearOverlay: function () {
        var ov = $('#stage .go-overlay');
        if (ov) ov.remove();
      }
    };
  }

  function openGame(id) {
    var g = GP.get(id);
    if (!g) return;
    if (activeId) stopGame();

    activeId = id;
    pushRecent(id);
    renderRecent();

    $('#m-title').textContent = g.title;
    $('#m-ico').textContent = g.emoji;
    $('#m-sub').textContent = catLabel(g.cat);
    $('#m-desc').textContent = g.desc;
    $('#m-controls').textContent = g.controls;
    $('#m-rating').textContent = g.rating.toFixed(1);
    $('#m-stars').textContent = stars(g.rating);
    $('#m-plays').textContent = g.plays + ' plays';
    $('#m-tags').innerHTML = g.tags.map(function (t) {
      return '<button class="chip" data-q="' + t + '">' + t + '</button>';
    }).join('');

    var rel = GP.all().filter(function (x) { return x.id !== id; }).slice(0, 6);
    $('#m-related').innerHTML = rel.map(function (x) { return cardHTML(x, true); }).join('');

    $('#modal').hidden = false;
    document.body.classList.add('modal-open');
    startGame();
    setHash('play-' + id);
    $('#m-close').focus();
  }

  function stars(r) {
    var full = Math.round(r);
    return '★★★★★'.slice(0, full) + '☆☆☆☆☆'.slice(0, 5 - full);
  }

  var stageScaler = null, stageRO = null;

  function startGame() {
    var g = GP.get(activeId);
    var stage = $('#stage');
    stopScaler();
    stage.innerHTML = '';
    stageScaler = document.createElement('div');
    stageScaler.className = 'stage-scaler';
    stage.appendChild(stageScaler);
    crashGuard = false;
    var api = GP.makeApi(activeId, stageScaler, hudApi());
    cleanup = g.play(stageScaler, api) || null;
    startScaler(stage, stageScaler);
    stage.focus && stage.focus();
  }

  /* Scale a game up to fill its stage. Games render at a fixed natural size
     (often a few hundred px), so on a large modal they looked tiny. We measure
     the content and apply a CSS transform to grow it to the available space.
     Cap the upscale so pixel-art / text stays crisp; always allow downscale.
     CSS transforms are reflected in DOM coordinates, so pointer/touch hit-testing
     (offsetX, bounding rect) keeps working unchanged. */
  function startScaler(stage, host) {
    var MAX_UP = 2.5;
    var probe = document.createElement('div');
    probe.style.cssText = 'position:absolute;visibility:hidden;pointer-events:none;' +
      'left:-99999px;top:0;width:max-content;height:max-content;display:inline-block;';
    document.body.appendChild(probe);
    function apply() {
      if (!host || !host.parentNode) return;
      var kids = host.children;
      var nw = 0, nh = 0, i;
      for (i = 0; i < kids.length; i++) {
        var k = kids[i];
        // measure the game's natural (intrinsic) size: clone into a max-content
        // container. The host fills the stage via position:absolute, so its layout
        // children stretch and measuring them in place would always give ratio 1.
        var clone = k.cloneNode(true);
        probe.innerHTML = '';
        probe.appendChild(clone);
        var r = probe.getBoundingClientRect();
        nw = Math.max(nw, r.width);
        nh = Math.max(nh, r.height);
      }
      if (!nw || !nh) return;
      var aw = stage.clientWidth, ah = stage.clientHeight;
      if (!aw || !ah) return;
      var s = Math.min(aw / nw, ah / nh, MAX_UP);
      if (s > 0.01 && Math.abs(s - 1) > 0.02) {
        host.style.transform = 'scale(' + s.toFixed(4) + ')';
      } else {
        host.style.transform = '';
      }
    }
    // wait a frame so the game has laid itself out before measuring
    requestAnimationFrame(function () { requestAnimationFrame(apply); });
    if (window.ResizeObserver) {
      stageRO = new ResizeObserver(function () { apply(); });
      stageRO.observe(stage);
    }
    window.addEventListener('resize', apply);
    stageScaler._applyScale = apply;
    stageScaler._detach = function () {
      window.removeEventListener('resize', apply);
      if (probe && probe.parentNode) probe.parentNode.removeChild(probe);
      if (stageRO) { try { stageRO.disconnect(); } catch (e) {} stageRO = null; }
    };
  }
  function stopScaler() {
    if (stageScaler && stageScaler._detach) { try { stageScaler._detach(); } catch (e) {} }
    stageScaler = null;
  }

  /* If an uncaught error fires while a game is running, stop the game and
     show a restart overlay instead of letting the error flood the console
     (raf-first loops would otherwise error every frame until the tab dies). */
  function containCrash(msg) {
    if (!activeId || crashGuard) return;
    crashGuard = true;
    try { stopGame(); } catch (e) {}
    GP.sound.play('bad');
    hudApi().overlay({
      emoji: '🛠️',
      title: 'Game paused',
      text: 'The game hit a snag, so it was paused to keep your browser safe. Tap Play again to restart.' +
        (msg ? ' (' + msg + ')' : ''),
      score: 0,
      best: GP.store.get('ph_best_' + activeId, 0),
      onAgain: function () { restart(); }
    });
  }

  function stopGame() {
    if (typeof cleanup === 'function') { try { cleanup(); } catch (e) {} }
    cleanup = null;
    stopScaler();
    $('#stage').innerHTML = '';
  }

  function restart() { if (activeId) { stopGame(); startGame(); } }

  /* ---- maximize: try real fullscreen, else CSS-expanded fallback ---- */
  var maxBtn = null, maxTarget = null;
  function fullscreenEl() {
    return document.fullscreenElement || document.webkitFullscreenElement || null;
  }
  function rescaleActive() {
    if (stageScaler && stageScaler._applyScale) {
      requestAnimationFrame(function () { stageScaler._applyScale(); });
    }
  }
  function toggleMax() {
    if (!maxTarget) return;
    if (fullscreenEl()) {
      var ex = document.exitFullscreen || document.webkitExitFullscreen;
      if (ex) ex.call(document);
      return;
    }
    var req = maxTarget.requestFullscreen || maxTarget.webkitRequestFullscreen;
    if (req) {
      var p = req.call(maxTarget);
      if (p && p.catch) p.catch(function () { document.body.classList.add('maxed'); rescaleActive(); });
      else document.body.classList.add('maxed');
    } else {
      document.body.classList.add('maxed');
    }
    rescaleActive();
  }
  function onFsChange() {
    document.body.classList.toggle('maxed', !!fullscreenEl());
    if (maxBtn) maxBtn.textContent = fullscreenEl() ? '🗗' : '⛶';
    rescaleActive();
  }
  function initMax() {
    maxBtn = document.getElementById('m-max');
    maxTarget = document.querySelector('#modal .modal-card');
    if (!maxBtn || !maxTarget) return;
    maxBtn.onclick = toggleMax;
    document.addEventListener('fullscreenchange', onFsChange);
    document.addEventListener('webkitfullscreenchange', onFsChange);
  }

  function closeGame(keepHash) {
    stopGame();
    activeId = null;
    if (fullscreenEl()) {
      var ex2 = document.exitFullscreen || document.webkitExitFullscreen;
      if (ex2) ex2.call(document);
    }
    document.body.classList.remove('maxed');
    if (maxBtn) maxBtn.textContent = '⛶';
    $('#modal').hidden = true;
    document.body.classList.remove('modal-open');
    if (!keepHash) setHash('');
  }

  /* ================= events ================= */
  function bind() {
    document.addEventListener('click', function (e) {
      var card = e.target.closest('[data-id]');
      if (card) {
        e.preventDefault();
        var inModal = !!card.closest('.modal');
        if (!inModal || card.closest('#m-related')) openGame(card.dataset.id);
        return;
      }
      var pill = e.target.closest('[data-cat]');
      if (pill) {
        e.preventDefault();
        state.cat = pill.dataset.cat;
        renderCats(); renderGrid();
        setHash('cat-' + state.cat);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      var chip = e.target.closest('[data-q]');
      if (chip) {
        e.preventDefault();
        state.q = chip.dataset.q;
        state.cat = 'all';
        $('#search').value = state.q;
        closeGame();
        renderCats(); renderGrid();
        syncSearchUrl();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });

    $('#search').addEventListener('input', function (e) {
      state.q = e.target.value.trim().toLowerCase();
      renderGrid();
      syncSearchUrl();
    });
    var sugEl = document.getElementById('search-sug');
    if (sugEl) {
      /* keep focus when picking a suggestion (mousedown fires before blur) */
      sugEl.addEventListener('mousedown', function (e) {
        if (e.target.closest('.sug-item')) e.preventDefault();
      });
      $('#search').addEventListener('blur', function () {
        setTimeout(function () { if (sugEl) { sugEl.hidden = true; sugEl.innerHTML = ''; } }, 200);
      });
      $('#search').addEventListener('keydown', function (e) {
        if (e.key === 'Escape') { sugEl.hidden = true; sugEl.innerHTML = ''; }
        else if (e.key === 'Enter') {
          var first = sugEl.querySelector('.sug-item');
          if (first) { e.preventDefault(); first.click(); }
        }
      });
    }
    $('#reset-search').onclick = function () {
      state.q = ''; state.cat = 'all';
      $('#search').value = '';
      renderCats(); renderGrid();
      setHash(''); syncSearchUrl();
    };

    $('#random-btn').onclick = function () {
      var all = GP.all();
      openGame(all[Math.floor(Math.random() * all.length)].id);
    };

    $('#sound-toggle').onclick = function () {
      var muted = GP.sound.toggle();
      $('#sound-icon').textContent = muted ? '🔇' : '🔊';
    };
    $('#sound-icon').textContent = GP.sound.muted ? '🔇' : '🔊';

    /* shared Home action: close any game, reset search + category, scroll to top */
    function goHome(e) {
      if (e) e.preventDefault();
      closeGame();
      state.q = ''; state.cat = 'all'; $('#search').value = '';
      renderCats(); renderGrid();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    $('#brand-home').onclick = goHome;
    $('#topnav-home').onclick = goHome;
    $('#brand-foot').onclick = goHome;

    $('#m-close').onclick = closeGame;
    $('#m-home').onclick = restart;
    initMax();
    $('#modal-backdrop').onclick = closeGame;

    $('#clear-recent').onclick = function () {
      GP.store.set('ph_recent', []);
      renderRecent();
    };

    var catsEl = $('#cats');
    if (catsEl && catsEl.addEventListener) {
      catsEl.addEventListener('scroll', updateCatBar, false);
      window.addEventListener('resize', updateCatBar, false);
    }

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && activeId) closeGame();
    });

    window.addEventListener('hashchange', applyHash);

    window.addEventListener('error', function (e) {
      var t = e && e.target;
      if (t && t !== window && (t.src || t.href)) return; /* resource load failure (ads/fonts) — ignore */
      containCrash(e && e.message ? String(e.message).slice(0, 80) : '');
    });
    window.addEventListener('unhandledrejection', function () {
      containCrash('unexpected promise error');
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    var q0 = new URLSearchParams(location.search).get('q');
    if (q0) {
      state.q = q0.trim().toLowerCase();
      $('#search').value = q0.trim();
    }
    renderCats();
    renderGrid();
    renderRecent();
    renderHero();
    renderFooter();
    renderChapStars();
    bind();
    applyHash();
  });
})();
