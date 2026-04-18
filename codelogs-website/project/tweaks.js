/* =========================================================
   CodeLogs — Tweaks (in-page controls)
   ========================================================= */
(function () {
  const panel = document.getElementById('tweaks');
  if (!panel) return;

  const state = window.__TWEAKS || {};
  const TAGLINES = {
    ddd: ['<b class="em">Design.</b>', 'Develop. <span class="orange-accent">Deliver.</span>'],
    build: ['<b class="em">Build.</b>', 'Ship. <span class="orange-accent">Scale.</span>'],
    signal: ['<b class="em">Signal</b>', 'from the <span class="orange-accent">noise.</span>'],
    trusted: ['<b class="em">Trusted</b>', 'tech <span class="orange-accent">partner.</span>']
  };

  // ---------- Apply functions ----------
  function applyPrimary(v) {
    document.documentElement.style.setProperty('--primary', v);
    document.documentElement.style.setProperty('--primary-rgb', hexToRgb(v));
    // Update SVG mark fills
    document.querySelectorAll('#nav-dots circle, #foot-dots circle').forEach(c => c.setAttribute('fill', v));
  }
  function applyAccent(v) {
    document.documentElement.style.setProperty('--orange', v);
  }
  function applyParticles(v) {
    const n = parseInt(v, 10);
    if (window.__heroField && window.__heroField.setCount) window.__heroField.setCount(n);
  }
  function applyGlow(v) {
    if (window.__heroField) window.__heroField.opts.glow = !!v;
  }
  function applyAmbient(v) {
    document.documentElement.style.setProperty('--ambient-density', v);
    if (window.__ambientSetDensity) window.__ambientSetDensity(parseFloat(v));
  }
  function applyContactTheme(v) {
    document.body.setAttribute('data-contact-theme', v);
  }
  function applyTagline(v) {
    const lines = TAGLINES[v] || TAGLINES.ddd;
    const spans = document.querySelectorAll('.hero__title .display .line');
    if (spans[0]) spans[0].innerHTML = lines[0];
    if (spans[1]) spans[1].innerHTML = lines[1];
  }

  const APPLIERS = {
    primary: applyPrimary,
    accent: applyAccent,
    particles: applyParticles,
    glow: applyGlow,
    ambient: applyAmbient,
    contactTheme: applyContactTheme,
    tagline: applyTagline
  };

  function hexToRgb(hex) {
    const m = hex.replace('#', '').match(/.{1,2}/g);
    if (!m || m.length < 3) return '3,115,254';
    return m.slice(0, 3).map(x => parseInt(x, 16)).join(',');
  }

  // ---------- Initialize from state ----------
  function syncControls() {
    panel.querySelectorAll('[data-tw]').forEach(el => {
      const k = el.getAttribute('data-tw');
      if (!(k in state)) return;
      if (el.type === 'checkbox') el.checked = !!state[k];
      else el.value = state[k];
      const echo = panel.querySelector(`[data-echo="${k}"]`);
      if (echo) echo.textContent = state[k];
    });
  }
  function applyAll(skipTagline) {
    Object.keys(state).forEach(k => {
      if (skipTagline && k === 'tagline') return;
      if (APPLIERS[k]) APPLIERS[k](state[k]);
    });
  }

  // Wire controls
  panel.querySelectorAll('[data-tw]').forEach(el => {
    const k = el.getAttribute('data-tw');
    const ev = (el.type === 'range' || el.type === 'color') ? 'input' : 'change';
    el.addEventListener(ev, () => {
      let val;
      if (el.type === 'checkbox') val = el.checked;
      else if (el.type === 'range') val = parseFloat(el.value);
      else val = el.value;
      state[k] = val;
      if (APPLIERS[k]) APPLIERS[k](val);
      const echo = panel.querySelector(`[data-echo="${k}"]`);
      if (echo) echo.textContent = val;
      // Persist to disk via host
      try {
        window.parent.postMessage({ type: '__edit_mode_set_keys', edits: { [k]: val } }, '*');
      } catch (e) {}
    });
  });

  syncControls();
  applyAll(true);

  // ---------- Edit-mode protocol ----------
  window.addEventListener('message', e => {
    const d = e.data || {};
    if (d.type === '__activate_edit_mode') {
      panel.hidden = false;
      requestAnimationFrame(() => panel.classList.add('in'));
    } else if (d.type === '__deactivate_edit_mode') {
      panel.classList.remove('in');
      setTimeout(() => { panel.hidden = true; }, 280);
    }
  });
  try {
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
  } catch (e) {}
})();
