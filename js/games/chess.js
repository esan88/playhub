GamePortal.register('chess', {
  title: 'Kids Chess',
  emoji: '♟️',
  cat: 'learning',
  c1: '#475569',
  c2: '#fbbf24',
  tags: ['chess', 'strategy', 'board', 'brain', 'thinking', 'moves', 'king', 'queen', 'knight', 'education', 'kids', 'tactics'],
  rating: 4.9,
  plays: '0.5M',
  badge: 'Brain boost',
  controls: 'Tap a piece, then a highlighted square — beat the computer!',
  desc: 'Real chess against a friendly computer opponent! Move every piece the proper way, castle, promote pawns and watch for check. Five opponents from a waddling Duck to a cunning Dragon — can you checkmate them all?',
  play: function (stage, api) {
    var LEVELS = [
      { name: 'Duck', goal: 'Level 1 — checkmate the Duck (easy)!', mode: 'random', jitter: 0, depth: 0, pst: false },
      { name: 'Cat', goal: 'Level 2 — beat the clever Cat!', mode: 'greedy', jitter: 15, depth: 0, pst: false },
      { name: 'Fox', goal: 'Level 3 — outsmart the Fox!', mode: 'search', jitter: 10, depth: 1, pst: false },
      { name: 'Wolf', goal: 'Level 4 — outplay the Wolf!', mode: 'search', jitter: 0, depth: 2, pst: false },
      { name: 'Dragon', goal: 'Level 5 — conquer the Dragon!', mode: 'search', jitter: 5, depth: 2, pst: true }
    ];
    var KN = [[-2, -1], [-2, 1], [-1, -2], [-1, 2], [1, -2], [1, 2], [2, -1], [2, 1]];
    var BISH = [[-1, -1], [-1, 1], [1, -1], [1, 1]];
    var ROOKD = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    var ALLD = [[-1, -1], [-1, 1], [1, -1], [1, 1], [-1, 0], [1, 0], [0, -1], [0, 1]];
    var MAT = { P: 100, N: 320, B: 330, R: 500, Q: 900, K: 0 };
    var GLY = { K: '♚', Q: '♛', R: '♜', B: '♝', N: '♞', P: '♟' };
    var FILES = 'abcdefgh';
    var key = 'ph_chess_lvl';
    var unlocked = Math.min(LEVELS.length, Math.max(1, GamePortal.store.get(key, 1)));
    var level = 1;
    var alive = true;
    var brd, turn, castling, epSq, moveCount, selSq, legalTargets, lastF, lastT, state, cpuBusy, cpuTO, nodes;

    var style = document.createElement('style');
    style.id = 'chess-style';
    style.textContent =
      '.chb{display:grid;grid-template-columns:repeat(8,1fr);max-width:336px;margin:8px auto;border-radius:10px;overflow:hidden;border:3px solid #475569}' +
      '.ch-cell{border:none;padding:0;aspect-ratio:1;font-size:25px;cursor:pointer;position:relative;line-height:1;font-family:serif}' +
      '.ch-cell.lt{background:#f1f5f9}' +
      '.ch-cell.dk{background:#94a3b8}' +
      '.ch-cell.wp{color:#f8fafc;text-shadow:0 1px 2px #0f172a,0 0 2px #0f172a}' +
      '.ch-cell.bp{color:#0f172a;text-shadow:0 0 1px #f8fafc}' +
      '.ch-cell.lm{background-image:linear-gradient(rgba(250,204,21,.45),rgba(250,204,21,.45))}' +
      '.ch-cell.sel{background-image:linear-gradient(rgba(34,197,94,.5),rgba(34,197,94,.5))}' +
      '.ch-cell.dst::after{content:"";position:absolute;left:50%;top:50%;width:26%;height:26%;transform:translate(-50%,-50%);background:rgba(15,23,42,.35);border-radius:50%}' +
      '.ch-cell.cap{outline:4px solid rgba(239,68,68,.85);outline-offset:-4px}' +
      '.ch-cell:disabled{cursor:default}';
    document.head.appendChild(style);

    var wrap = document.createElement('div');
    wrap.className = 'kg jm chg';
    wrap.dataset.level = '1';
    wrap.dataset.turn = 'w';
    wrap.dataset.moves = '0';
    wrap.dataset.state = 'play';
    wrap.dataset.incheck = '0';
    wrap.innerHTML =
      '<div class="lv-strip" id="ch-levels"><span class="lv-strip-label">Level</span></div>' +
      '<div class="lv-goal" id="ch-goal"></div>' +
      '<div class="math-top"><span class="math-stat" id="ch-moves">Move 1</span>' +
      '<span class="math-stat" id="ch-vs">vs Duck</span></div>' +
      '<div class="chb" id="ch-board"></div>' +
      '<div class="hint" id="ch-status">Your move — White</div>';
    stage.appendChild(wrap);

    var boardEl = wrap.querySelector('#ch-board');
    var elGoal = wrap.querySelector('#ch-goal');
    var elStatus = wrap.querySelector('#ch-status');
    var elMoves = wrap.querySelector('#ch-moves');
    var elVs = wrap.querySelector('#ch-vs');
    var elLevels = wrap.querySelector('#ch-levels');
    var prevTest = window.__chessTest;

    function isW(p) { return !!p && p === p.toUpperCase(); }
    function other(s) { return s === 'w' ? 'b' : 'w'; }
    function sqIdx(sq) { return (parseInt(sq.charAt(1), 10) - 1) * 8 + FILES.indexOf(sq.charAt(0)); }
    function alg(i) { return FILES.charAt(i & 7) + String((i >> 3) + 1); }

    function initialBoard() {
      var back = 'RNBQKBNR';
      var b = [];
      for (var i = 0; i < 64; i++) b.push('');
      for (var f = 0; f < 8; f++) {
        b[f] = back.charAt(f);
        b[8 + f] = 'P';
        b[48 + f] = 'p';
        b[56 + f] = back.charAt(f).toLowerCase();
      }
      return b;
    }

    function attacked(r, c, by) {
      var w = (by === 'w');
      var i, rr, cc, p;
      rr = r + (w ? -1 : 1);
      for (cc = c - 1; cc <= c + 1; cc += 2) {
        if (rr < 0 || rr > 7 || cc < 0 || cc > 7) continue;
        p = brd[rr * 8 + cc];
        if (p && isW(p) === w && p.toUpperCase() === 'P') return true;
      }
      for (i = 0; i < 8; i++) {
        rr = r + KN[i][0]; cc = c + KN[i][1];
        if (rr < 0 || rr > 7 || cc < 0 || cc > 7) continue;
        p = brd[rr * 8 + cc];
        if (p && isW(p) === w && p.toUpperCase() === 'N') return true;
      }
      for (var dr = -1; dr <= 1; dr++) {
        for (var dc = -1; dc <= 1; dc++) {
          if (!dr && !dc) continue;
          rr = r + dr; cc = c + dc;
          if (rr < 0 || rr > 7 || cc < 0 || cc > 7) continue;
          p = brd[rr * 8 + cc];
          if (p && isW(p) === w && p.toUpperCase() === 'K') return true;
        }
      }
      for (i = 0; i < 8; i++) {
        var dir = i < 4 ? BISH[i] : ROOKD[i - 4];
        rr = r + dir[0]; cc = c + dir[1];
        while (rr >= 0 && rr <= 7 && cc >= 0 && cc <= 7) {
          p = brd[rr * 8 + cc];
          if (p) {
            if (isW(p) === w) {
              var pu = p.toUpperCase();
              if (pu === 'Q' || (i < 4 && pu === 'B') || (i >= 4 && pu === 'R')) return true;
            }
            break;
          }
          rr += dir[0]; cc += dir[1];
        }
      }
      return false;
    }

    function kingSq(side) {
      var k = side === 'w' ? 'K' : 'k';
      for (var i = 0; i < 64; i++) if (brd[i] === k) return i;
      return -1;
    }
    function inCheck(side) {
      var k = kingSq(side);
      if (k < 0) return false;
      return attacked(k >> 3, k & 7, other(side));
    }
    function addPawnMove(ms, f, t, r1) {
      var last = isW(brd[f]) ? 7 : 0;
      ms.push({ f: f, t: t, c: brd[t] ? 1 : 0, e: 0, ca: 0, pr: r1 === last ? 1 : 0 });
    }
    function genCastle(ms, w) {
      if (w) {
        if (castling.wk && !brd[5] && !brd[6] && brd[7] === 'R' &&
          !attacked(0, 4, 'b') && !attacked(0, 5, 'b') && !attacked(0, 6, 'b')) ms.push({ f: 4, t: 6, c: 0, e: 0, ca: 1, pr: 0 });
        if (castling.wq && !brd[3] && !brd[2] && !brd[1] && brd[0] === 'R' &&
          !attacked(0, 4, 'b') && !attacked(0, 3, 'b') && !attacked(0, 2, 'b')) ms.push({ f: 4, t: 2, c: 0, e: 0, ca: 2, pr: 0 });
      } else {
        if (castling.bk && !brd[61] && !brd[62] && brd[63] === 'r' &&
          !attacked(7, 4, 'w') && !attacked(7, 5, 'w') && !attacked(7, 6, 'w')) ms.push({ f: 60, t: 62, c: 0, e: 0, ca: 1, pr: 0 });
        if (castling.bq && !brd[59] && !brd[58] && !brd[57] && brd[56] === 'r' &&
          !attacked(7, 4, 'w') && !attacked(7, 3, 'w') && !attacked(7, 2, 'w')) ms.push({ f: 60, t: 58, c: 0, e: 0, ca: 2, pr: 0 });
      }
    }
    function genMoves() {
      var ms = [];
      var side = turn;
      for (var i = 0; i < 64; i++) {
        var p = brd[i];
        if (!p) continue;
        var w = isW(p);
        if ((side === 'w') !== w) continue;
        var r = i >> 3, c = i & 7, u = p.toUpperCase();
        if (u === 'P') {
          var dir = w ? 1 : -1;
          var r1 = r + dir;
          if (r1 >= 0 && r1 < 8 && !brd[r1 * 8 + c]) {
            addPawnMove(ms, i, r1 * 8 + c, r1);
            var startR = w ? 1 : 6;
            var r2 = r + 2 * dir;
            if (r === startR && !brd[r2 * 8 + c]) ms.push({ f: i, t: r2 * 8 + c, c: 0, e: 0, ca: 0, pr: 0 });
          }
          for (var dcx = -1; dcx <= 1; dcx += 2) {
            var cc2 = c + dcx;
            if (cc2 < 0 || cc2 > 7 || r1 < 0 || r1 > 7) continue;
            var ti = r1 * 8 + cc2;
            var tp = brd[ti];
            if (tp && isW(tp) !== w) addPawnMove(ms, i, ti, r1);
            else if (!tp && ti === epSq) ms.push({ f: i, t: ti, c: 1, e: 1, ca: 0, pr: 0 });
          }
        } else if (u === 'N') {
          for (var k = 0; k < 8; k++) {
            var nr = r + KN[k][0], nc = c + KN[k][1];
            if (nr < 0 || nr > 7 || nc < 0 || nc > 7) continue;
            var t2 = nr * 8 + nc;
            var p2 = brd[t2];
            if (p2 && isW(p2) === w) continue;
            ms.push({ f: i, t: t2, c: p2 ? 1 : 0, e: 0, ca: 0, pr: 0 });
          }
        } else if (u === 'K') {
          for (var kd = 0; kd < 8; kd++) {
            var kn = r + ALLD[kd][0], kc = c + ALLD[kd][1];
            if (kn < 0 || kn > 7 || kc < 0 || kc > 7) continue;
            var tk = kn * 8 + kc;
            var pk = brd[tk];
            if (pk && isW(pk) === w) continue;
            ms.push({ f: i, t: tk, c: pk ? 1 : 0, e: 0, ca: 0, pr: 0 });
          }
          genCastle(ms, w);
        } else {
          var dirs = u === 'B' ? BISH : (u === 'R' ? ROOKD : ALLD);
          for (var d = 0; d < dirs.length; d++) {
            var rr2 = r + dirs[d][0], cc3 = c + dirs[d][1];
            while (rr2 >= 0 && rr2 <= 7 && cc3 >= 0 && cc3 <= 7) {
              var t3 = rr2 * 8 + cc3;
              var p3 = brd[t3];
              if (!p3) {
                ms.push({ f: i, t: t3, c: 0, e: 0, ca: 0, pr: 0 });
              } else {
                if (isW(p3) !== w) ms.push({ f: i, t: t3, c: 1, e: 0, ca: 0, pr: 0 });
                break;
              }
              rr2 += dirs[d][0]; cc3 += dirs[d][1];
            }
          }
        }
      }
      return ms;
    }
    function make(m) {
      var undo = { cap: brd[m.t], cw: castling.wk, cq: castling.wq, cbk: castling.bk, cbq: castling.bq, ep: epSq };
      var mover = brd[m.f];
      var w = isW(mover);
      brd[m.t] = mover;
      brd[m.f] = '';
      if (m.e) {
        var capIdx = m.t + (w ? -8 : 8);
        undo.cap = brd[capIdx];
        brd[capIdx] = '';
      }
      if (m.pr) brd[m.t] = w ? 'Q' : 'q';
      if (m.ca) {
        if (w) {
          if (m.ca === 1) { brd[5] = brd[7]; brd[7] = ''; }
          else { brd[3] = brd[0]; brd[0] = ''; }
        } else {
          if (m.ca === 1) { brd[61] = brd[63]; brd[63] = ''; }
          else { brd[59] = brd[56]; brd[56] = ''; }
        }
      }
      if (mover === 'K') { castling.wk = false; castling.wq = false; }
      if (mover === 'k') { castling.bk = false; castling.bq = false; }
      if (m.f === 0 || m.t === 0) castling.wq = false;
      if (m.f === 7 || m.t === 7) castling.wk = false;
      if (m.f === 56 || m.t === 56) castling.bq = false;
      if (m.f === 63 || m.t === 63) castling.bk = false;
      epSq = -1;
      if (mover.toUpperCase() === 'P' && Math.abs(m.t - m.f) === 16) epSq = (m.f + m.t) / 2;
      turn = other(turn);
      return undo;
    }
    function unmake(m, undo) {
      var w = isW(brd[m.t]);
      var orig = m.pr ? (w ? 'P' : 'p') : brd[m.t];
      turn = other(turn);
      brd[m.f] = orig;
      brd[m.t] = '';
      if (m.e) brd[m.t + (w ? -8 : 8)] = undo.cap;
      else if (undo.cap) brd[m.t] = undo.cap;
      if (m.ca) {
        if (w) {
          if (m.ca === 1) { brd[7] = brd[5]; brd[5] = ''; }
          else { brd[0] = brd[3]; brd[3] = ''; }
        } else {
          if (m.ca === 1) { brd[63] = brd[61]; brd[61] = ''; }
          else { brd[56] = brd[59]; brd[59] = ''; }
        }
      }
      castling.wk = undo.cw; castling.wq = undo.cq;
      castling.bk = undo.cbk; castling.bq = undo.cbq;
      epSq = undo.ep;
    }
    function legalMoves() {
      var ms = genMoves(), out = [];
      for (var i = 0; i < ms.length; i++) {
        var u = make(ms[i]);
        var mover = other(turn);
        var ok = !inCheck(mover);
        unmake(ms[i], u);
        if (ok) out.push(ms[i]);
      }
      return out;
    }
    function legalFrom(sq) {
      var ms = legalMoves(), out = [];
      for (var i = 0; i < ms.length; i++) if (ms[i].f === sq) out.push(ms[i]);
      return out;
    }
    function insufficient() {
      var pieces = [], bishops = [];
      for (var i = 0; i < 64; i++) {
        var p = brd[i];
        if (!p) continue;
        var u = p.toUpperCase();
        if (u === 'K') continue;
        pieces.push(u);
        if (u === 'B') bishops.push(i);
      }
      if (!pieces.length) return true;
      if (pieces.length === 1 && (pieces[0] === 'B' || pieces[0] === 'N')) return true;
      if (pieces.length === bishops.length && bishops.length >= 1) {
        var col = -1;
        for (var b = 0; b < bishops.length; b++) {
          var cc = ((bishops[b] >> 3) + (bishops[b] & 7)) % 2;
          if (col === -1) col = cc;
          else if (cc !== col) return false;
        }
        return true;
      }
      return false;
    }
    function evalWhite(usePST) {
      var s = 0;
      for (var i = 0; i < 64; i++) {
        var p = brd[i];
        if (!p) continue;
        var u = p.toUpperCase(), v = MAT[u];
        if (usePST) v += pstVal(u, i >> 3, i & 7, isW(p));
        s += isW(p) ? v : -v;
      }
      return s;
    }
    function pstVal(u, r, c, w) {
      var rr = w ? r : 7 - r;
      if (u === 'P') return rr * 10 + (c === 3 || c === 4 ? 4 : 0);
      var center = (3.5 - Math.abs(r - 3.5)) + (3.5 - Math.abs(c - 3.5));
      if (u === 'N' || u === 'B') return center * 3;
      if (u === 'R' || u === 'Q') return center;
      return -center * 2;
    }
    function order(ms) {
      ms.sort(function (a, b) {
        function sc(m) {
          if (!m.c) return 0;
          var vic = brd[m.t] ? MAT[brd[m.t].toUpperCase()] : 100;
          var atk = brd[m.f] ? MAT[brd[m.f].toUpperCase()] : 100;
          return vic * 10 - atk;
        }
        return sc(b) - sc(a);
      });
    }
    function negamax(depth, alpha, beta, usePST) {
      nodes++;
      if (depth === 0 || nodes > 400000) return turn === 'w' ? evalWhite(usePST) : -evalWhite(usePST);
      var ms = legalMoves();
      if (!ms.length) return inCheck(turn) ? -90000 : 0;
      order(ms);
      var best = -1000000;
      for (var i = 0; i < ms.length; i++) {
        var u = make(ms[i]);
        var sc = -negamax(depth - 1, -beta, -alpha, usePST);
        unmake(ms[i], u);
        if (sc > best) best = sc;
        if (best > alpha) alpha = best;
        if (alpha >= beta) break;
      }
      return best;
    }
    function chooseMove() {
      var ms = legalMoves();
      if (!ms.length) return null;
      var cfgL = LEVELS[level - 1];
      var i, u, sc;
      if (cfgL.mode === 'random') {
        var caps = [];
        for (i = 0; i < ms.length; i++) if (ms[i].c) caps.push(ms[i]);
        if (caps.length && Math.random() < 0.6) return caps[Math.floor(Math.random() * caps.length)];
        return ms[Math.floor(Math.random() * ms.length)];
      }
      if (cfgL.mode === 'greedy') {
        var bestG = null, scG = -1000000;
        for (i = 0; i < ms.length; i++) {
          u = make(ms[i]);
          sc = -evalWhite(false) + (Math.random() * 2 - 1) * cfgL.jitter;
          unmake(ms[i], u);
          if (sc > scG) { scG = sc; bestG = ms[i]; }
        }
        return bestG;
      }
      nodes = 0;
      order(ms);
      var bestS = null, scS = -1000000;
      for (i = 0; i < ms.length; i++) {
        u = make(ms[i]);
        sc = -negamax(cfgL.depth - 1, -1000000, 1000000, cfgL.pst);
        unmake(ms[i], u);
        sc += (Math.random() * 2 - 1) * cfgL.jitter;
        if (sc > scS) { scS = sc; bestS = ms[i]; }
      }
      return bestS || ms[0];
    }

    function renderStrip() {
      var html = '<span class="lv-strip-label">Level</span>';
      for (var n = 1; n <= LEVELS.length; n++) {
        var cls = 'lv-btn' + (n === level ? ' on' : '') + (n > unlocked ? ' locked' : '');
        html += '<button type="button" class="' + cls + '" data-lv="' + n + '"' + (n > unlocked ? ' disabled' : '') + '>' + n + '</button>';
      }
      elLevels.innerHTML = html;
      wrap.dataset.level = String(level);
    }
    function renderBoard() {
      var html = '';
      for (var r = 7; r >= 0; r--) {
        for (var c = 0; c < 8; c++) {
          var i = r * 8 + c;
          var p = brd[i];
          var cls = 'ch-cell ' + (((r + c) % 2) ? 'dk' : 'lt');
          if (i === lastF || i === lastT) cls += ' lm';
          if (i === selSq) cls += ' sel';
          var legal = legalTargets.indexOf(i) >= 0;
          if (legal) cls += (p ? ' cap' : ' dst');
          if (p) cls += isW(p) ? ' wp' : ' bp';
          var attr = ' data-sq="' + alg(i) + '"';
          if (p) attr += ' data-piece="' + p + '"';
          if (legal) attr += ' data-legal="1"';
          if (i === selSq) attr += ' data-sel="1"';
          html += '<button type="button" class="' + cls + '"' + attr + (state !== 'play' ? ' disabled' : '') + '>' + (p ? GLY[p.toUpperCase()] : '') + '</button>';
        }
      }
      boardEl.innerHTML = html;
      wrap.dataset.turn = turn;
      wrap.dataset.moves = String(moveCount);
      wrap.dataset.state = state;
      wrap.dataset.incheck = inCheck(turn) ? '1' : '0';
      elMoves.textContent = 'Move ' + (Math.floor(moveCount / 2) + 1);
      elVs.textContent = 'vs ' + LEVELS[level - 1].name;
    }
    function updateStatus() {
      if (state !== 'play') return;
      if (turn === 'w') {
        elStatus.textContent = inCheck('w') ? '⚠️ Check! Move your king to safety.' : 'Your move — White';
      } else {
        elStatus.textContent = 'The ' + LEVELS[level - 1].name + ' (Black) is thinking…';
      }
    }
    function updateScore() {
      api.setScore(Math.max(0, evalWhite(false)));
    }
    function finishLevel() {
      state = 'over';
      renderBoard();
      if (level > unlocked) { unlocked = level; GamePortal.store.set(key, unlocked); }
      if (level >= LEVELS.length) {
        api.win({
          emoji: '♛',
          title: 'Chess Champion!',
          text: 'You checkmated the Dragon — ' + api.score + ' points!'
        });
        return;
      }
      api.sfx('win');
      var nextName = LEVELS[level].name;
      api.overlay({
        emoji: '♟️',
        title: 'Level ' + level + ' complete!',
        text: 'Checkmate! Next opponent: the ' + nextName + '.',
        score: api.score,
        best: api.getBest(),
        onAgain: function () { api.clearOverlay(); level++; startLevel(level); }
      });
    }
    function lose(cause) {
      state = 'over';
      renderBoard();
      var t = '♚ Checkmate!';
      var x = 'The ' + LEVELS[level - 1].name + ' wins this time — try again!';
      if (cause === 'stale') {
        t = 'Draw — stalemate!';
        x = 'No legal moves left, but no check either. Try again!';
      } else if (cause === 'draw') {
        t = 'Draw!';
        x = 'Not enough pieces left to checkmate. Try a new game!';
      }
      api.gameOver({
        title: t,
        text: x,
        onAgain: function () { api.clearOverlay(); startLevel(level); }
      });
    }
    function endCheck() {
      var ms = legalMoves();
      if (!ms.length) {
        if (inCheck(turn)) {
          if (turn === 'b') finishLevel();
          else lose('mate');
        } else lose('stale');
        return true;
      }
      if (insufficient()) { lose('draw'); return true; }
      return false;
    }
    function applyQuiet(m) {
      make(m);
      moveCount++;
      lastF = m.f;
      lastT = m.t;
      selSq = -1;
      legalTargets = [];
      api.sfx(m.c ? 'good' : 'flip');
      updateScore();
      renderBoard();
      if (endCheck()) return;
      updateStatus();
    }
    function doMove(m) {
      applyQuiet(m);
      if (state === 'play' && turn === 'b' && alive) {
        cpuBusy = true;
        updateStatus();
        renderBoard();
        cpuTO = setTimeout(function () {
          cpuTO = null;
          if (!alive || state !== 'play') return;
          var mv = chooseMove();
          cpuBusy = false;
          if (!mv) { endCheck(); return; }
          applyQuiet(mv);
          updateStatus();
        }, 300);
      }
    }
    function select(i) {
      selSq = i;
      legalTargets = [];
      var lm = legalFrom(i);
      for (var j = 0; j < lm.length; j++) legalTargets.push(lm[j].t);
      api.sfx('click');
      renderBoard();
      if (!lm.length) elStatus.textContent = 'That piece has no legal moves.';
    }
    function startLevel(n) {
      level = Math.max(1, Math.min(LEVELS.length, n));
      api.clearOverlay();
      api.setScore(0);
      if (cpuTO) { clearTimeout(cpuTO); cpuTO = null; }
      brd = initialBoard();
      turn = 'w';
      castling = { wk: true, wq: true, bk: true, bq: true };
      epSq = -1;
      moveCount = 0;
      selSq = -1;
      legalTargets = [];
      lastF = -1;
      lastT = -1;
      state = 'play';
      cpuBusy = false;
      alive = true;
      renderStrip();
      elGoal.textContent = LEVELS[level - 1].goal;
      renderBoard();
      updateStatus();
    }

    boardEl.addEventListener('click', function (e) {
      if (!alive || state !== 'play' || turn !== 'w' || cpuBusy) return;
      var b = e.target.closest ? e.target.closest('[data-sq]') : null;
      if (!b) return;
      var idx = sqIdx(b.getAttribute('data-sq'));
      if (selSq >= 0) {
        var lm = legalFrom(selSq);
        for (var i = 0; i < lm.length; i++) {
          if (lm[i].t === idx) { doMove(lm[i]); return; }
        }
        if (brd[idx] && isW(brd[idx])) { select(idx); return; }
        selSq = -1;
        legalTargets = [];
        api.sfx('click');
        renderBoard();
        return;
      }
      if (brd[idx] && isW(brd[idx])) select(idx);
    });
    elLevels.addEventListener('click', function (e) {
      var lvb = e.target.closest('.lv-btn');
      if (lvb && !lvb.classList.contains('locked')) {
        var n = parseInt(lvb.dataset.lv, 10);
        if (n !== level && n <= unlocked) { api.sfx('click'); startLevel(n); }
      }
    });

    window.__chessTest = {
      movesFrom: function (sq) {
        var lm = legalFrom(sqIdx(sq));
        var out = [];
        for (var k = 0; k < lm.length; k++) out.push(alg(lm[k].t));
        return out;
      },
      applyUci: function (u) {
        if (!alive || !u || u.length < 4) return false;
        var from = sqIdx(u.slice(0, 2));
        var to = sqIdx(u.slice(2, 4));
        var lm = legalMoves();
        for (var k = 0; k < lm.length; k++) {
          if (lm[k].f === from && lm[k].t === to) {
            applyQuiet(lm[k]);
            return true;
          }
        }
        return false;
      },
      status: function () {
        var ms = legalMoves();
        return {
          turn: turn,
          check: inCheck(turn),
          checkmate: !ms.length && inCheck(turn),
          stalemate: !ms.length && !inCheck(turn),
          insufficient: insufficient()
        };
      }
    };

    startLevel(1);

    return function () {
      alive = false;
      if (cpuTO) { clearTimeout(cpuTO); cpuTO = null; }
      if (style && style.parentNode) style.parentNode.removeChild(style);
      if (prevTest === undefined) { try { delete window.__chessTest; } catch (err) { window.__chessTest = undefined; } }
      else window.__chessTest = prevTest;
    };
  }
});
