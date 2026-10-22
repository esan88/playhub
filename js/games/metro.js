/* Metro Sprint — true-3D three-lane metro dash with 6 mission levels.
   Renders with the portal-vendored three.js (js/vendor/three.min.js, MIT);
   if WebGL/THREE is unavailable the full game logic still runs (auto mode).
   No third-party IP: own character, art and rules. */
GamePortal.register('metro', {
  title: 'Metro Sprint',
  emoji: '🛴',
  cat: 'arcade',
  c1: '#3730a3',
  c2: '#22d3ee',
  tags: ['runner', 'scooter', 'dodge', 'subway', 'surfers', 'surf', 'train', 'dash', 'arcade', 'boys', 'kids', 'endless', 'fast', 'levels', 'mission', '3d', 'three', 'webgl', 'graphics', 'city'],
  rating: 4.7,
  plays: '0.5M',
  badge: 'New',
  controls: '◀ ▶ switch lanes · ▲ / Space hop · ▼ roll · swipe on mobile',
  desc: 'Zip through the morning metro in glorious 3D! Weave between trains, hop the roadblocks, roll under the barriers and grab every coin across 6 sprint missions — each needs a longer dash at faster speeds. How far can you ride, scooter star?',
  play: function (stage, api) {
    var LEVELS = [
      { goal: 150, speed: 230, gap: 1.05 },
      { goal: 250, speed: 250, gap: 0.95 },
      { goal: 350, speed: 270, gap: 0.88 },
      { goal: 450, speed: 290, gap: 0.80 },
      { goal: 600, speed: 310, gap: 0.72 },
      { goal: 800, speed: 330, gap: 0.65 }
    ];
    var LX = [-2.1, 0, 2.1];
    var key = 'ph_metro_lvl';
    var unlocked = Math.min(LEVELS.length, Math.max(1, GamePortal.store.get(key, 1)));
    var level = 1;

    var oldStyle = document.getElementById('metrosprint-style');
    if (oldStyle && oldStyle.parentNode) oldStyle.parentNode.removeChild(oldStyle);
    var styleEl = document.createElement('style');
    styleEl.id = 'metrosprint-style';
    styleEl.textContent = '' +
      '.metrosprint{gap:8px}' +
      '.metrosprint .canvas-wrap{position:relative;width:min(460px,100%);border-radius:14px;overflow:hidden;background:#1e1b4b}' +
      '.metrosprint .canvas-wrap canvas{display:block;width:100%!important;height:auto;background:#1e1b4b}' +
      '.metrosprint .ms-fallback{color:#c7d2fe;font-size:12.5px;padding:6px 10px;text-align:center}' +
      '.metrosprint .ms-hud{display:flex;gap:12px;justify-content:center;font-size:13px;color:#e0e7ff;font-weight:700}';
    document.head.appendChild(styleEl);

    var box = document.createElement('div');
    box.className = 'kg metrosprint';
    box.dataset.lane = '1';
    box.dataset.level = '1';
    box.dataset.obs = '0';
    box.dataset.stars = '0';
    box.dataset.phase = 'play';
    var lvStrip = document.createElement('div');
    lvStrip.className = 'lv-strip';
    lvStrip.id = 'ms-levels';
    box.appendChild(lvStrip);
    var goalEl = document.createElement('div');
    goalEl.className = 'lv-goal';
    goalEl.id = 'ms-goal';
    box.appendChild(goalEl);
    var hudEl = document.createElement('div');
    hudEl.className = 'ms-hud';
    hudEl.id = 'ms-hud';
    box.appendChild(hudEl);
    var wrap = document.createElement('div');
    wrap.className = 'canvas-wrap';
    var canvas = document.createElement('canvas');
    canvas.className = 'game-canvas';
    canvas.width = 460;
    canvas.height = 300;
    canvas.setAttribute('data-air', '0');
    canvas.setAttribute('data-roll', '0');
    wrap.appendChild(canvas);
    box.appendChild(wrap);
    var ctl = document.createElement('div');
    ctl.className = 'kg-ctl';
    ctl.innerHTML = '<button type="button" data-mv="-1" aria-label="left">◀</button>' +
      '<button type="button" data-jump="1" aria-label="hop">⏫</button>' +
      '<button type="button" data-mv="1" aria-label="right">▶</button>';
    box.appendChild(ctl);
    stage.appendChild(box);

    var has3D = typeof THREE !== 'undefined';
    var renderer = null, scene = null, camera = null, player = null, board = null, bodyMesh = null;
    var geo = {}, mat = {};
    if (has3D) {
      try {
        scene = new THREE.Scene();
        scene.fog = new THREE.Fog(0x3730a3, 16, 56);
        camera = new THREE.PerspectiveCamera(58, 460 / 300, 0.1, 130);
        camera.position.set(0, 4.15, 6.9);
        camera.lookAt(0, 1.2, -10);
        renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: false });
        renderer.setPixelRatio(1);
        renderer.setSize(460, 300, false);
        renderer.setClearColor(0x1e1b4b, 1);
        var hemi = new THREE.HemisphereLight(0x9db4ff, 0x312e81, 0.95);
        scene.add(hemi);
        var dir = new THREE.DirectionalLight(0xffffff, 0.65);
        dir.position.set(4, 10, 6);
        scene.add(dir);
        geo.ground = new THREE.PlaneGeometry(15, 170);
        mat.ground = new THREE.MeshLambertMaterial({ color: 0x241c5e });
        var ground = new THREE.Mesh(geo.ground, mat.ground);
        ground.rotation.x = -Math.PI / 2;
        ground.position.z = -60;
        scene.add(ground);
        geo.stripe = new THREE.BoxGeometry(0.09, 0.02, 160);
        mat.stripe = new THREE.MeshBasicMaterial({ color: 0x22d3ee, transparent: true, opacity: 0.55 });
        var sx = [-3.15, -1.05, 1.05, 3.15];
        for (var si = 0; si < 4; si++) {
          var stripe = new THREE.Mesh(geo.stripe, mat.stripe);
          stripe.position.set(sx[si], 0.02, -60);
          scene.add(stripe);
        }
        geo.tie = new THREE.BoxGeometry(7.6, 0.06, 0.26);
        mat.tie = new THREE.MeshLambertMaterial({ color: 0x4c1d95 });
        geo.tower = new THREE.BoxGeometry(2.4, 1, 2.4);
        mat.towerA = new THREE.MeshLambertMaterial({ color: 0x312e81 });
        mat.towerB = new THREE.MeshLambertMaterial({ color: 0x1e1b4b });
        mat.towerC = new THREE.MeshLambertMaterial({ color: 0x4c1d95 });
        geo.board = new THREE.BoxGeometry(0.95, 0.13, 1.7);
        mat.board = new THREE.MeshLambertMaterial({ color: 0x22d3ee });
        geo.body = new THREE.BoxGeometry(0.56, 0.9, 0.46);
        mat.body = new THREE.MeshLambertMaterial({ color: 0xfde68a });
        geo.head = new THREE.SphereGeometry(0.27, 10, 8);
        mat.head = new THREE.MeshLambertMaterial({ color: 0xfca5a5 });
        geo.train = new THREE.BoxGeometry(1.78, 2.15, 7.6);
        geo.trainTop = new THREE.BoxGeometry(1.5, 0.5, 7.0);
        mat.trainA = new THREE.MeshLambertMaterial({ color: 0xef4444 });
        mat.trainB = new THREE.MeshLambertMaterial({ color: 0xf59e0b });
        mat.trainC = new THREE.MeshLambertMaterial({ color: 0x10b981 });
        mat.trainTop = new THREE.MeshLambertMaterial({ color: 0x0f172a });
        geo.wall = new THREE.BoxGeometry(1.72, 2.3, 0.55);
        mat.wall = new THREE.MeshLambertMaterial({ color: 0xf43f5e });
        geo.low = new THREE.BoxGeometry(1.66, 0.74, 0.5);
        mat.low = new THREE.MeshLambertMaterial({ color: 0xf97316 });
        geo.barTop = new THREE.BoxGeometry(1.8, 0.45, 0.34);
        geo.barPost = new THREE.BoxGeometry(0.16, 1.2, 0.16);
        mat.bar = new THREE.MeshLambertMaterial({ color: 0xeab308 });
        geo.coin = new THREE.CylinderGeometry(0.34, 0.34, 0.08, 12);
        mat.coin = new THREE.MeshBasicMaterial({ color: 0xfbbf24 });
        player = new THREE.Group();
        board = new THREE.Mesh(geo.board, mat.board);
        board.position.y = 0.09;
        player.add(board);
        bodyMesh = new THREE.Mesh(geo.body, mat.body);
        bodyMesh.position.y = 0.62;
        player.add(bodyMesh);
        var head = new THREE.Mesh(geo.head, mat.head);
        head.position.y = 1.3;
        player.add(head);
        player.position.set(0, 0, 0);
        scene.add(player);
      } catch (e) {
        has3D = false;
        renderer = null;
        scene = null;
      }
    }
    if (!has3D) {
      var fb = document.createElement('div');
      fb.className = 'ms-fallback';
      fb.textContent = '3D view unavailable on this device — dash on in auto mode!';
      wrap.appendChild(fb);
    }

    var lane = 1, px = 0, py = 0, vy = 0, air = 0, rollT = 0;
    var phase = 'play', dist = 0, speed = 0, spawnT = 0, scoreNext = 1;
    var obs = 0, starN = 0, goal = LEVELS[0].goal;
    var objs = [], ties = [], towers = [], raf = 0, last = 0, dead = false, scenery = false;

    function addTies() {
      if (!has3D) return;
      for (var i = 0; i < 22; i++) {
        var t = new THREE.Mesh(geo.tie, mat.tie);
        t.position.set(0, 0.04, -i * 6.5 + 10);
        scene.add(t);
        ties.push(t);
      }
      for (var j = 0; j < 12; j++) {
        var h = 3 + (j % 4) * 1.4;
        var g = geo.tower.clone();
        g.scale(1, h, 1);
        var mL = [mat.towerA, mat.towerB, mat.towerC][j % 3];
        var tw = new THREE.Mesh(g, mL);
        tw.position.set(j % 2 === 0 ? -6.4 : 6.4, h / 2, -j * 12 + 8);
        scene.add(tw);
        towers.push(tw);
      }
    }

    function clearObjs() {
      for (var i = 0; i < objs.length; i++) {
        scene && scene.remove(objs[i].mesh);
        if (objs[i].mesh && objs[i].mesh.geometry && objs[i].ownGeo && objs[i].mesh.geometry.dispose) objs[i].mesh.geometry.dispose();
      }
      objs = [];
    }

    function spawnCoinRow(ln, z0) {
      if (!has3D) { objs.push({ type: 'coin', lane: ln, mesh: null, z: z0, ownGeo: false }); return; }
      for (var i = 0; i < 5; i++) {
        var c = new THREE.Mesh(geo.coin, mat.coin);
        c.rotation.x = Math.PI / 2;
        c.position.set(LX[ln], 1.05, z0 - i * 2.1);
        scene.add(c);
        objs.push({ type: 'coin', lane: ln, mesh: c, z: z0 - i * 2.1, ownGeo: false, checked: false });
      }
    }

    function spawnPattern() {
      var zBase = -74;
      var two = Math.random() < (0.22 + level * 0.06);
      var lanes = [0, 1, 2];
      var blocked = [];
      var pick = Math.floor(Math.random() * 3);
      blocked.push(lanes.splice(pick, 1)[0]);
      if (two) blocked.push(lanes.splice(Math.floor(Math.random() * lanes.length), 1)[0]);
      var free = lanes[Math.floor(Math.random() * lanes.length)];
      var w = Math.random();
      var big = level >= 3 ? 0.16 + level * 0.02 : 0.10;
      for (var i = 0; i < blocked.length; i++) {
        var ln = blocked[i];
        var r = Math.random();
        var type = r < big ? 'train' : (r < big + 0.30 ? 'wall' : (r < big + 0.58 ? 'low' : 'bar'));
        if (!has3D) { objs.push({ type: type, lane: ln, mesh: null, z: zBase - i * 3, ownGeo: false, checked: false }); continue; }
        var mesh = null, ownGeo = false;
        if (type === 'train') {
          mesh = new THREE.Group();
          var col = [mat.trainA, mat.trainB, mat.trainC][Math.floor(Math.random() * 3)];
          var b = new THREE.Mesh(geo.train, col);
          b.position.y = 1.15;
          mesh.add(b);
          var top = new THREE.Mesh(geo.trainTop, mat.trainTop);
          top.position.y = 2.35;
          mesh.add(top);
        } else if (type === 'wall') {
          mesh = new THREE.Mesh(geo.wall, mat.wall);
          mesh.position.y = 1.18;
        } else if (type === 'low') {
          mesh = new THREE.Mesh(geo.low, mat.low);
          mesh.position.y = 0.38;
          var stripeS = new THREE.Mesh(geo.low, mat.bar);
          stripeS.scale.set(0.5, 0.28, 1.04);
          stripeS.position.y = 0.06;
          mesh.add(stripeS);
        } else {
          mesh = new THREE.Group();
          var topB = new THREE.Mesh(geo.barTop, mat.bar);
          topB.position.y = 1.32;
          mesh.add(topB);
          var p1 = new THREE.Mesh(geo.barPost, mat.bar);
          p1.position.set(-0.82, 0.62, 0);
          mesh.add(p1);
          var p2 = new THREE.Mesh(geo.barPost, mat.bar);
          p2.position.set(0.82, 0.62, 0);
          mesh.add(p2);
        }
        mesh.position.set(LX[ln], mesh.position.y || 0, zBase - i * 4);
        scene.add(mesh);
        objs.push({ type: type, lane: ln, mesh: mesh, z: zBase - i * 4, ownGeo: ownGeo, checked: false });
      }
      if (Math.random() < 0.85) spawnCoinRow(free, zBase - 14 - Math.random() * 6);
    }

    function moveLane(d) {
      if (phase !== 'run') return;
      var n = lane + d;
      if (n < 0 || n > 2) return;
      lane = n;
      box.dataset.lane = String(lane);
      api.sfx('click');
    }

    function jump() {
      if (phase !== 'run' || air) return;
      air = 1;
      vy = 8.6;
      canvas.setAttribute('data-air', '1');
      api.sfx('pop');
    }

    function roll() {
      if (phase !== 'run' || air) return;
      rollT = 0.68;
      canvas.setAttribute('data-roll', '1');
      api.sfx('flip');
    }

    function crash() {
      if (phase !== 'run') return;
      phase = 'over';
      box.dataset.phase = 'over';
      if (raf) { cancelAnimationFrame(raf); raf = 0; }
      api.sfx('bad');
      api.gameOver({
        title: 'Oops — crashed!',
        text: 'You dashed ' + Math.floor(dist) + 'm of ' + goal + 'm on mission ' + level + '. Try again!',
        onAgain: function () {
          api.clearOverlay();
          startLevel(level);
        }
      });
    }

    function levelClear() {
      phase = 'over';
      box.dataset.phase = 'over';
      if (raf) { cancelAnimationFrame(raf); raf = 0; }
      if (level > unlocked) {
        unlocked = level;
        GamePortal.store.set(key, unlocked);
      }
      api.sfx('win');
      if (level >= LEVELS.length) {
        api.win({ emoji: '🛴', title: 'Metro Legend!', text: 'All 6 missions cleared — ' + Math.floor(dist) + 'm of pure city flow!' });
        return;
      }
      api.overlay({
        emoji: '🏁',
        title: 'Level ' + level + ' complete!',
        text: 'Dashed ' + Math.floor(dist) + 'm — next mission: ' + LEVELS[level].goal + 'm at top speed!',
        onAgain: function () {
          api.clearOverlay();
          level++;
          startLevel(level);
        }
      });
    }

    function renderStrip() {
      var html = '<span class="lv-strip-label">Mission</span>';
      for (var n = 1; n <= LEVELS.length; n++) {
        var cls = n === level ? 'lv-btn on' : (n > unlocked ? 'lv-btn locked' : 'lv-btn');
        html += '<button type="button" class="' + cls + '" data-lv="' + n + '"' + (n > unlocked ? ' disabled' : '') + '>' + n + '</button>';
      }
      lvStrip.innerHTML = html;
    }

    function updateHud() {
      hudEl.textContent = '🛴 ' + Math.floor(dist) + 'm / ' + goal + 'm · 🪙 ' + starN + ' · 🚧 ' + obs;
    }

    function loop(t) {
      raf = requestAnimationFrame(loop);
      if (phase !== 'run') return;
      var dt = last ? Math.min(0.05, (t - last) / 1000) : 0.016;
      last = t;
      var cfg = LEVELS[level - 1];
      speed = cfg.speed / 46 + Math.min(2.4, dist / 130);
      dist += speed * dt;
      box.dataset.dist = String(Math.floor(dist));
      while (dist >= scoreNext) {
        api.addScore(1);
        scoreNext++;
      }
      if (dist >= goal) { updateHud(); levelClear(); return; }
      spawnT -= dt;
      if (spawnT <= 0) {
        spawnPattern();
        spawnT = cfg.gap + Math.random() * 0.35;
      }
      px += (LX[lane] - px) * Math.min(1, 11 * dt);
      if (air) {
        vy -= 23 * dt;
        py += vy * dt;
        if (py <= 0) {
          py = 0;
          vy = 0;
          air = 0;
          canvas.setAttribute('data-air', '0');
        }
      }
      if (rollT > 0) {
        rollT -= dt;
        if (rollT <= 0) canvas.setAttribute('data-roll', '0');
      }
      for (var i = objs.length - 1; i >= 0; i--) {
        var o = objs[i];
        o.z += speed * dt;
        if (o.mesh) o.mesh.position.z = o.z;
        if (o.type === 'coin' && o.mesh) o.mesh.rotation.y += 5 * dt;
        if (o.z > 9) {
          if (!o.checked && o.type !== 'coin') {
            o.checked = true;
            obs++;
            box.dataset.obs = String(obs);
          }
          if (o.mesh) scene.remove(o.mesh);
          objs.splice(i, 1);
          continue;
        }
        var sameLane = Math.abs(px - LX[o.lane]) < 1.15;
        var band = o.z > -1.15 && o.z < 1.15;
        if (!band) continue;
        if (o.type === 'coin') {
          if (sameLane && py < 2.1) {
            starN++;
            box.dataset.stars = String(starN);
            api.addScore(10);
            api.sfx('eat');
            if (o.mesh) scene.remove(o.mesh);
            objs.splice(i, 1);
          }
          continue;
        }
        if (!sameLane || o.checked) continue;
        o.checked = true;
        if (o.type === 'low') {
          if (py > 0.85) {
            obs++;
            box.dataset.obs = String(obs);
            api.addScore(2);
          } else {
            crash();
            return;
          }
        } else if (o.type === 'bar') {
          if (rollT > 0) {
            obs++;
            box.dataset.obs = String(obs);
            api.addScore(2);
          } else {
            crash();
            return;
          }
        } else {
          crash();
          return;
        }
      }
      if (has3D && scene) {
        for (var t2 = 0; t2 < ties.length; t2++) {
          ties[t2].position.z += speed * dt;
          if (ties[t2].position.z > 12) ties[t2].position.z -= 22 * 6.5;
        }
        for (var w2 = 0; w2 < towers.length; w2++) {
          towers[w2].position.z += speed * dt;
          if (towers[w2].position.z > 14) towers[w2].position.z -= 12 * 12;
        }
        player.position.x = px;
        player.position.y = py + 0.02;
        var lean = (LX[lane] - px) * 0.22;
        player.rotation.z = -lean;
        var squash = rollT > 0 ? 0.45 : 1;
        bodyMesh.scale.y += (squash - bodyMesh.scale.y) * Math.min(1, 14 * dt);
        bodyMesh.position.y = 0.62 * bodyMesh.scale.y + 0.1;
        camera.position.x += (px * 0.42 - camera.position.x) * Math.min(1, 5 * dt);
        camera.lookAt(px * 0.3, 1.15, -9);
        renderer.render(scene, camera);
      }
      updateHud();
    }

    function startLevel(n) {
      if (raf) { cancelAnimationFrame(raf); raf = 0; }
      clearObjs();
      level = n;
      var cfg = LEVELS[n - 1];
      goal = cfg.goal;
      lane = 1;
      px = 0;
      py = 0;
      vy = 0;
      air = 0;
      rollT = 0;
      dist = 0;
      scoreNext = 1;
      obs = 0;
      starN = 0;
      spawnT = 0.4;
      last = 0;
      phase = 'run';
      box.dataset.level = String(n);
      box.dataset.lane = '1';
      box.dataset.obs = '0';
      box.dataset.stars = '0';
      box.dataset.phase = 'run';
      box.dataset.goal = String(goal);
      canvas.setAttribute('data-air', '0');
      canvas.setAttribute('data-roll', '0');
      if (has3D && player) {
        player.position.x = 0;
        player.position.y = 0.02;
        player.rotation.z = 0;
        camera.position.x = 0;
        camera.lookAt(0, 1.15, -9);
      }
      goalEl.textContent = 'Goal: dash ' + goal + 'm';
      renderStrip();
      updateHud();
      if (!scenery) {
        scenery = true;
        addTies();
      }
      raf = requestAnimationFrame(loop);
    }

    function onKey(e) {
      var k = e.key;
      if (k === 'ArrowLeft' || k === 'a' || k === 'A') { moveLane(-1); e.preventDefault(); }
      else if (k === 'ArrowRight' || k === 'd' || k === 'D') { moveLane(1); e.preventDefault(); }
      else if (k === 'ArrowUp' || k === 'w' || k === 'W' || k === ' ') { jump(); e.preventDefault(); }
      else if (k === 'ArrowDown' || k === 's' || k === 'S') { roll(); e.preventDefault(); }
    }
    document.addEventListener('keydown', onKey);

    var tX = 0, tY = 0;
    function onTouchStart(e) {
      if (!e.touches || !e.touches[0]) return;
      tX = e.touches[0].clientX;
      tY = e.touches[0].clientY;
    }
    function onTouchEnd(e) {
      var t = e.changedTouches && e.changedTouches[0];
      if (!t) return;
      var dx = t.clientX - tX, dy = t.clientY - tY;
      if (Math.abs(dx) > 28 && Math.abs(dx) > Math.abs(dy)) moveLane(dx > 0 ? 1 : -1);
      else if (dy < -28) jump();
      else if (dy > 28) roll();
    }
    wrap.addEventListener('touchstart', onTouchStart, { passive: true });
    wrap.addEventListener('touchend', onTouchEnd, { passive: true });

    function onCtl(e) {
      var b = e.target;
      if (!b || !b.getAttribute) return;
      var mv = b.getAttribute('data-mv');
      if (mv) { moveLane(parseInt(mv, 10)); return; }
      if (b.getAttribute('data-jump')) jump();
    }
    ctl.addEventListener('click', onCtl);

    function onStrip(e) {
      var b = e.target;
      if (!b || !b.getAttribute) return;
      var n = parseInt(b.getAttribute('data-lv'), 10);
      if (!n || b.disabled || n > unlocked || n === level) return;
      api.sfx('flip');
      startLevel(n);
    }
    lvStrip.addEventListener('click', onStrip);

    window.__metroTest = {
      lane: function () { return lane; },
      dist: function () { return dist; },
      goal: function () { return goal; },
      phase: function () { return phase; },
      level: function () { return level; },
      setDist: function (n) { dist = n; },
      crash: function () { crash(); }
    };

    startLevel(1);

    return function cleanup() {
      dead = true;
      phase = 'over';
      if (raf) { cancelAnimationFrame(raf); raf = 0; }
      document.removeEventListener('keydown', onKey);
      wrap.removeEventListener('touchstart', onTouchStart);
      wrap.removeEventListener('touchend', onTouchEnd);
      ctl.removeEventListener('click', onCtl);
      lvStrip.removeEventListener('click', onStrip);
      if (renderer) {
        renderer.dispose();
        renderer = null;
      }
      if (oldStyle && oldStyle.parentNode) oldStyle.parentNode.removeChild(oldStyle);
      if (styleEl && styleEl.parentNode) styleEl.parentNode.removeChild(styleEl);
      try { delete window.__metroTest; } catch (err) { window.__metroTest = undefined; }
      scene = null;
      camera = null;
      objs = [];
      ties = [];
      towers = [];
    };
  }
});
