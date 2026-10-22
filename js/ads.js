/* ============================================================
   PlayHub — Google AdSense slot manager
   ------------------------------------------------------------
   SETUP (5 ad blocks — see index.html for where each one sits):

   1. In AdSense (Ads → By site → + New ad unit) create these
      Display units and copy each unit's numeric slot id:

        AD_SLOTS.top     responsive leaderboard  → #ad-top    (under header, above hero)
        AD_SLOTS.mid     responsive banner       → #ad-mid    (above the game grid)
        AD_SLOTS.grid    responsive banner       → #ad-grid   (below the game grid)
        AD_SLOTS.side    300×250 rectangle       → #ad-side   (game-modal side panel)
        AD_SLOTS.anchor  anchor format unit      → #ad-anchor (sticky bottom, mobile)

   2. Paste your publisher id into AD_CLIENT ('ca-pub-…').

   3. Deploy over https:// and add the ads.txt line AdSense gives
      you to a file named ads.txt at the site root.

   While AD_CLIENT is empty (the default) every block renders as a
   labelled placeholder and NO external script is loaded, so the
   site keeps working offline and the test suites stay clean.
   ============================================================ */
(function () {
  'use strict';

  /* ======== paste your AdSense IDs here ======== */
  var AD_CLIENT = ''; // e.g. 'ca-pub-0123456789012345'
  var AD_SLOTS = {
    top: 0,    // slot id for #ad-top
    mid: 0,    // slot id for #ad-mid
    grid: 0,   // slot id for #ad-grid
    side: 0,   // slot id for #ad-side
    anchor: 0  // slot id for #ad-anchor
  };
  /* ============================================= */

  var on = !!AD_CLIENT;
  document.documentElement.setAttribute('data-ads', on ? 'on' : 'off');

  function show(name) {
    if (!on || !AD_SLOTS[name]) return; // stays a placeholder until configured
    var el = document.querySelector('.ad-slot[data-ad="' + name + '"]');
    if (!el) return;
    var ins = el.querySelector('ins.adsbygoogle');
    if (!ins || ins.getAttribute('data-ad-client')) return; // already live
    ins.setAttribute('data-ad-client', AD_CLIENT);
    ins.setAttribute('data-ad-slot', String(AD_SLOTS[name]));
    ins.setAttribute('data-ad-format',
      name === 'anchor' ? 'anchor' : (name === 'side' ? 'rectangle' : 'auto'));
    if (name === 'top' || name === 'mid' || name === 'grid') {
      ins.setAttribute('data-full-width-responsive', 'true');
    }
    ins.style.display = 'block';
    el.classList.add('ad-live');
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }

  if (on) {
    var s = document.createElement('script');
    s.async = true;
    s.crossOrigin = 'anonymous';
    s.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=' +
      encodeURIComponent(AD_CLIENT);
    document.head.appendChild(s);

    // static blocks: render right away (script is at end of body, DOM is ready)
    ['top', 'mid', 'grid', 'anchor'].forEach(show);

    // side panel block: push the first time the game modal opens —
    // an <ins> inside a display:hidden container does not fill correctly
    var modal = document.getElementById('modal');
    if (modal && AD_SLOTS.side) {
      var mo = new MutationObserver(function () {
        if (!modal.hidden) { mo.disconnect(); show('side'); }
      });
      mo.observe(modal, { attributes: true, attributeFilter: ['hidden'] });
    }
  }
})();
