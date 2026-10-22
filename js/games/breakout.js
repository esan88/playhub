/* Breakout / Brick Blaster */
GamePortal.register('breakout', {
  title: 'Brick Blaster',
  emoji: '🧱',
  cat: 'arcade',
  c1: '#3d1d5c',
  c2: '#ff7a45',
  tags: ['breakout', 'bricks', 'arcade', 'paddle', 'classic'],
  rating: 4.6,
  plays: '980K',
  badge: 'Hot',
  controls: 'Move the mouse / touch to steer · click to launch · Space to launch too',
  desc: 'Smash every brick with a bouncing ball and a paddle. Clear the wall to reach the next, faster level.',
  play: function (stage, api) {
    var W = 480, H = 460;
    var wrap = document.createElement('div');
    wrap.className = 'canvas-wrap';
    var canvas = document.createElement('canvas');
    canvas.className = 'game-canvas';
    wrap.appendChild(canvas);
    stage.appendChild(wrap);
    var ctx = api.fitCanvas(canvas, W, H);

    var paddle, ball, bricks, level, lives, running, raf, launched;
    var BRICK_ROWS = 5, BRICK_COLS = 8, BW = 52, BH = 18, PAD = 6, TOP = 46;
    var COLORS = ['#ff4d8d', '#ff7a45', '#ffd166', '#06d6a0', '#4cc9f0'];

    function makeBricks() {
      bricks = [];
      for (var r = 0; r < BRICK_ROWS; r++)
        for (var c = 0; c < BRICK_COLS; c++)
          bricks.push({
            x: (W - (BRICK_COLS * (BW + PAD) - PAD)) / 2 + c * (BW + PAD),
            y: TOP + r * (BH + PAD),
            alive: true,
            color: COLORS[(r + level) % COLORS.length],
            points: (BRICK_ROWS - r) * 10
          });
    }

    function reset(full) {
      if (full) { level = 1; lives = 3; api.setScore(0); }
      paddle = { w: 92, h: 12, x: W / 2 - 46, y: H - 34 };
      ball = { x: W / 2, y: H - 46, r: 7, vx: 0, vy: 0, speed: 5 + level * 0.5 };
      launched = false;
      makeBricks();
    }

    function launch() {
      if (launched || !running) return;
      launched = true;
      var a = (-Math.PI / 2) + (Math.random() * 0.7 - 0.35);
      ball.vx = Math.cos(a) * ball.speed;
      ball.vy = Math.sin(a) * ball.speed;
      api.sfx('click');
    }

    function loop() {
      raf = requestAnimationFrame(loop);
      if (!running) return;

      if (launched) {
        ball.x += ball.vx;
        ball.y += ball.vy;

        if (ball.x - ball.r < 0) { ball.x = ball.r; ball.vx *= -1; api.sfx('pop'); }
        if (ball.x + ball.r > W) { ball.x = W - ball.r; ball.vx *= -1; api.sfx('pop'); }
        if (ball.y - ball.r < 0) { ball.y = ball.r; ball.vy *= -1; api.sfx('pop'); }

        if (ball.vy > 0 &&
            ball.y + ball.r >= paddle.y &&
            ball.y - ball.r <= paddle.y + paddle.h &&
            ball.x >= paddle.x && ball.x <= paddle.x + paddle.w) {
          var hit = (ball.x - (paddle.x + paddle.w / 2)) / (paddle.w / 2);
          var ang = -Math.PI / 2 + hit * 1.05;
          var sp = Math.min(Math.sqrt(ball.vx * ball.vx + ball.vy * ball.vy) * 1.02, 11);
          ball.vx = Math.cos(ang) * sp;
          ball.vy = Math.sin(ang) * sp;
          ball.y = paddle.y - ball.r;
          api.sfx('click');
        }

        for (var i = 0; i < bricks.length; i++) {
          var b = bricks[i];
          if (!b.alive) continue;
          if (ball.x + ball.r > b.x && ball.x - ball.r < b.x + BW &&
              ball.y + ball.r > b.y && ball.y - ball.r < b.y + BH) {
            b.alive = false;
            api.addScore(b.points);
            api.sfx('eat');
            var overlapX = Math.min(ball.x + ball.r - b.x, b.x + BW - (ball.x - ball.r));
            var overlapY = Math.min(ball.y + ball.r - b.y, b.y + BH - (ball.y - ball.r));
            if (overlapX < overlapY) ball.vx *= -1; else ball.vy *= -1;
            break;
          }
        }

        if (bricks.every(function (b) { return !b.alive; })) {
          running = false;
          level++;
          api.sfx('win');
          api.overlay({
            emoji: '🎉',
            title: 'Level cleared!',
            text: 'Get ready for level ' + level + ' — the ball gets faster.',
            score: api.score,
            best: api.getBest(),
            onAgain: function () {
              api.clearOverlay();
              reset(false);
              running = true;
              draw();
            }
          });
          return;
        }

        if (ball.y - ball.r > H) {
          lives--;
          if (lives <= 0) {
            running = false;
            api.gameOver({ title: 'Out of balls', text: 'You reached level ' + level + '.' });
            return;
          }
          api.sfx('bad');
          launched = false;
          ball.x = W / 2; ball.y = H - 46; ball.vx = 0; ball.vy = 0;
        }
      } else {
        ball.x = paddle.x + paddle.w / 2;
        ball.y = paddle.y - ball.r - 1;
      }

      draw();
    }

    function draw() {
      ctx.fillStyle = '#12142e';
      ctx.fillRect(0, 0, W, H);

      ctx.font = '700 13px system-ui';
      ctx.fillStyle = '#9aa0c8';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      ctx.fillText('LEVEL ' + level, 14, 20);
      ctx.textAlign = 'right';
      ctx.fillText('● '.repeat(lives).trim(), W - 14, 20);

      bricks.forEach(function (b) {
        if (!b.alive) return;
        ctx.fillStyle = b.color;
        roundRect(b.x, b.y, BW, BH, 5);
        ctx.fill();
        ctx.fillStyle = 'rgba(255,255,255,.22)';
        roundRect(b.x, b.y, BW, 5, 5);
        ctx.fill();
      });

      ctx.fillStyle = '#fff';
      roundRect(paddle.x, paddle.y, paddle.w, paddle.h, 6);
      ctx.fill();
      ctx.fillStyle = '#ff4d8d';
      roundRect(paddle.x, paddle.y, paddle.w, 5, 5);
      ctx.fill();

      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
      ctx.fillStyle = '#ffd166';
      ctx.fill();

      if (!launched && running) {
        ctx.textAlign = 'center';
        ctx.fillStyle = 'rgba(255,255,255,.75)';
        ctx.font = '600 15px system-ui';
        ctx.fillText('click or press Space to launch', W / 2, H - 8);
      }
    }

    function roundRect(x, y, w, h, r) {
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.arcTo(x + w, y, x + w, y + h, r);
      ctx.arcTo(x + w, y + h, x, y + h, r);
      ctx.arcTo(x, y + h, x, y, r);
      ctx.arcTo(x, y, x + w, y, r);
      ctx.closePath();
    }

    function move(e) {
      var rect = canvas.getBoundingClientRect();
      var cx = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
      var scale = W / rect.width;
      var x = cx * scale - paddle.w / 2;
      paddle.x = Math.max(0, Math.min(W - paddle.w, x));
    }

    function onMove(e) { if (running) move(e); }
    function onClick() { launch(); }
    function onKey(e) {
      if (e.code === 'Space') { e.preventDefault(); launch(); }
      if (e.key === 'ArrowLeft') paddle.x = Math.max(0, paddle.x - 26);
      if (e.key === 'ArrowRight') paddle.x = Math.min(W - paddle.w, paddle.x + 26);
    }

    reset(true);
    running = true;
    draw();
    canvas.addEventListener('mousemove', onMove);
    canvas.addEventListener('touchmove', function (e) { e.preventDefault(); onMove(e); }, { passive: false });
    canvas.addEventListener('click', onClick);
    canvas.addEventListener('touchstart', function (e) { e.preventDefault(); onMove(e); launch(); }, { passive: false });
    document.addEventListener('keydown', onKey);
    raf = requestAnimationFrame(loop);

    return function () {
      cancelAnimationFrame(raf);
      canvas.removeEventListener('mousemove', onMove);
      canvas.removeEventListener('click', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }
});
