/* PlayHub core: registry, storage, sound engine, shared game API */
(function () {
  'use strict';

  var GAMES = {};
  var ORDER = [];

  var LS = {
    get: function (key, fallback) {
      try {
        var raw = localStorage.getItem(key);
        return raw === null ? fallback : JSON.parse(raw);
      } catch (e) { return fallback; }
    },
    set: function (key, value) {
      try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) {}
    }
  };

  /* ---------- tiny WebAudio bleeps ---------- */
  var Sound = {
    ctx: null,
    muted: LS.get('ph_muted', false),
    ac: function () {
      if (this.muted) return null;
      if (!this.ctx) {
        var AC = window.AudioContext || window.webkitAudioContext;
        if (!AC) return null;
        try { this.ctx = new AC(); } catch (e) { return null; }
      }
      if (this.ctx.state === 'suspended' && this.ctx.resume) {
        var p = this.ctx.resume();
        if (p && p.catch) p.catch(function () {});
      }
      return this.ctx;
    },
    tone: function (freq, dur, type, vol, when) {
      var ctx = this.ac();
      if (!ctx) return;
      /* cap audio work: max 30 tone starts per second (protects audio thread) */
      var now = (window.performance && performance.now) ? performance.now() : Date.now();
      this._stamps = (this._stamps || []).filter(function (t) { return now - t < 1000; });
      if (this._stamps.length >= 30) return;
      this._stamps.push(now);
      var t = ctx.currentTime + (when || 0);
      var osc = ctx.createOscillator();
      var g = ctx.createGain();
      osc.type = type || 'square';
      osc.frequency.setValueAtTime(freq, t);
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(vol || 0.12, t + 0.01);
      g.gain.exponentialRampToValueAtTime(0.0001, t + (dur || 0.12));
      osc.connect(g); g.connect(ctx.destination);
      osc.onended = function () { try { osc.disconnect(); g.disconnect(); } catch (e) {} };
      osc.start(t); osc.stop(t + (dur || 0.12) + 0.02);
    },
    play: function (name) {
      if (this.muted) return;
      switch (name) {
        case 'click':  this.tone(660, 0.06, 'square', 0.08); break;
        case 'eat':    this.tone(880, 0.08, 'square', 0.12); this.tone(1320, 0.08, 'square', 0.08, 0.05); break;
        case 'good':   this.tone(784, 0.09, 'triangle', 0.14); this.tone(1046, 0.12, 'triangle', 0.12, 0.08); break;
        case 'bad':    this.tone(180, 0.22, 'sawtooth', 0.12); break;
        case 'win':    [523, 659, 784, 1046].forEach(function (f, i) { Sound.tone(f, 0.16, 'triangle', 0.13, i * 0.11); }); break;
        case 'lose':   [440, 370, 294, 220].forEach(function (f, i) { Sound.tone(f, 0.2, 'sawtooth', 0.12, i * 0.13); }); break;
        case 'pop':    this.tone(520, 0.05, 'sine', 0.1); break;
        case 'flip':   this.tone(440, 0.05, 'sine', 0.07); break;
        default:       this.tone(600, 0.07, 'square', 0.08);
      }
    },
    toggle: function () {
      this.muted = !this.muted;
      LS.set('ph_muted', this.muted);
      if (!this.muted) this.play('click');
      return this.muted;
    }
  };

  /* unlock audio inside the first real user gesture (iOS/Safari requirement) */
  function unlockAudio() {
    document.removeEventListener('pointerdown', unlockAudio, false);
    document.removeEventListener('keydown', unlockAudio, false);
    if (Sound.muted) return;
    var ctx = Sound.ac();
    if (ctx && ctx.state === 'suspended' && ctx.resume) {
      var p = ctx.resume();
      if (p && p.catch) p.catch(function () {});
    }
  }
  if (typeof document !== 'undefined' && document.addEventListener) {
    document.addEventListener('pointerdown', unlockAudio, false);
    document.addEventListener('keydown', unlockAudio, false);
  }

  /* ---------- shared per-game API given to every game ---------- */
  function makeApi(id, stage, hud) {
    var best = LS.get('ph_best_' + id, 0);
    var api = {
      id: id,
      stage: stage,
      score: 0,
      best: best,
      setScore: function (v) {
        api.score = v;
        hud.setScore(v);
        if (v > api.best) { api.best = v; LS.set('ph_best_' + id, v); hud.setBest(v); }
      },
      addScore: function (v) { api.setScore(Math.max(0, api.score + v)); },
      getBest: function () { return api.best; },
      gameOver: function (opt) {
        opt = opt || {};
        Sound.play('lose');
        var s = (opt.score === undefined) ? api.score : opt.score;
        if (s > api.best) { api.best = s; LS.set('ph_best_' + id, s); hud.setBest(s); }
        hud.overlay({
          title: opt.title || 'Game Over',
          text: opt.text || '',
          score: s,
          best: api.best,
          onAgain: opt.onAgain || null
        });
      },
      win: function (opt) {
        opt = opt || {};
        Sound.play('win');
        var s = (opt.score === undefined) ? api.score : opt.score;
        if (s > api.best) { api.best = s; LS.set('ph_best_' + id, s); hud.setBest(s); }
        hud.overlay({
          title: opt.title || 'You win!',
          text: opt.text || '',
          score: s,
          best: api.best,
          onAgain: opt.onAgain || null
        });
      },
      overlay: function (o) { hud.overlay(o); },
      clearOverlay: function () { hud.clearOverlay(); },
      sfx: function (n) { Sound.play(n); },
      /* fullscreen canvas helper: keeps canvas crisp & centered */
      fitCanvas: function (canvas, w, h) {
        var dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = w * dpr;
        canvas.height = h * dpr;
        canvas.style.width = w + 'px';
        canvas.style.height = h + 'px';
        var ctx = canvas.getContext('2d');
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        return ctx;
      }
    };
    hud.setBest(best);
    hud.setScore(0);
    return api;
  }

  window.GamePortal = {
    register: function (id, def) {
      def.id = id;
      GAMES[id] = def;
      ORDER.push(id);
    },
    all: function () { return ORDER.map(function (id) { return GAMES[id]; }); },
    get: function (id) { return GAMES[id] || null; },
    makeApi: makeApi,
    sound: Sound,
    store: LS
  };
})();
