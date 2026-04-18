/* =========================================================
   CodeLogs — site orchestration
   ========================================================= */

const prefersReduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

// ---------- Small SVG marks (nav, footer) ----------
document.querySelectorAll('#nav-dots, #foot-dots').forEach(g => {
  renderLogoSvg(g, { fill: '#0373fe', scale: 0.9 });
});
document.querySelectorAll('.proc-dots').forEach(g => {
  renderLogoSvg(g, { fill: g.getAttribute('fill') || '#0373fe', scale: 0.9 });
});

// Process icon rotation — each with a different phase
document.querySelectorAll('.proc-dots').forEach((g, i) => {
  g.style.transformOrigin = '0 0';
  g.style.animation = `spin${i} ${14 + i * 2}s linear infinite`;
  const style = document.createElement('style');
  style.textContent = `@keyframes spin${i}{to{transform:rotate(360deg)}}`;
  document.head.appendChild(style);
});

// ---------- Clock ----------
(function clock() {
  const el = document.getElementById('clock');
  if (!el) return;
  function tick() {
    const now = new Date();
    // IST offset +5:30 from UTC
    const istMs = now.getTime() + (330 + now.getTimezoneOffset()) * 60000;
    const ist = new Date(istMs);
    const hh = String(ist.getHours()).padStart(2, '0');
    const mm = String(ist.getMinutes()).padStart(2, '0');
    const ss = String(ist.getSeconds()).padStart(2, '0');
    el.textContent = `${hh}:${mm}:${ss} IST`;
  }
  tick();
  setInterval(tick, 1000);
})();

// ---------- Reveal on scroll ----------
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.01, rootMargin: '0px 0px -5% 0px' });
document.querySelectorAll('[data-reveal]').forEach(el => io.observe(el));
// Safety fallback: anything still hidden after 2.5s gets revealed
setTimeout(() => {
  document.querySelectorAll('[data-reveal]:not(.in)').forEach(el => el.classList.add('in'));
}, 2500);

// ---------- Custom cursor ----------
(function cursor() {
  if (matchMedia('(max-width: 900px)').matches) return;
  const ring = document.createElement('div'); ring.className = 'cur';
  const dot = document.createElement('div'); dot.className = 'cur-dot';
  document.body.append(ring, dot);
  let tx = innerWidth / 2, ty = innerHeight / 2;
  let rx = tx, ry = ty;
  addEventListener('mousemove', e => { tx = e.clientX; ty = e.clientY; dot.style.transform = `translate(${tx}px,${ty}px) translate(-50%,-50%)`; });
  (function loop() {
    rx += (tx - rx) * 0.18;
    ry += (ty - ry) * 0.18;
    ring.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`;
    requestAnimationFrame(loop);
  })();
  document.querySelectorAll('a, button, .work__row').forEach(a => {
    a.addEventListener('mouseenter', () => ring.classList.add('hover'));
    a.addEventListener('mouseleave', () => ring.classList.remove('hover'));
  });
})();

// ---------- Particle logo (hero + contact) ----------
class LogoField {
  constructor(canvas, opts = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.dpr = Math.min(devicePixelRatio || 1, 2);
    this.opts = Object.assign({
      particles: 600,
      palette: ['#0373fe', '#0373fe', '#0373fe', '#0373fe', '#f05828', '#31d1fe', '#16205b'],
      formStrength: 0.08,
      drift: 0.35,
      damping: 0.88,
      mouseRepel: 120,
      mouseForce: 0.9,
      scatter: false,
      rotate: 0.0005,
      glow: true,
      glowColor: 'rgba(3,115,254,0.22)',
      density: 1
    }, opts);

    this.particles = [];
    this.mx = -9999; this.my = -9999;
    this.t = 0;
    this.resize();

    addEventListener('resize', () => this.resize());
    if (!opts.passive) {
      canvas.parentElement.addEventListener('mousemove', e => {
        const r = canvas.getBoundingClientRect();
        this.mx = e.clientX - r.left;
        this.my = e.clientY - r.top;
      });
      canvas.parentElement.addEventListener('mouseleave', () => {
        this.mx = -9999; this.my = -9999;
      });
    }
    this.loop = this.loop.bind(this);
    requestAnimationFrame(this.loop);
  }

  resize() {
    const r = this.canvas.getBoundingClientRect();
    this.w = r.width; this.h = r.height;
    this.canvas.width = this.w * this.dpr;
    this.canvas.height = this.h * this.dpr;
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    this.rebuildTargets();
  }

  rebuildTargets() {
    // Logo box sized to fit the canvas (maintain 399:463 ratio -> roughly square)
    const aspect = 399 / 463;
    let W, H;
    // Fit the logo into ~62% of min dim, centered
    const minDim = Math.min(this.w, this.h);
    H = minDim * 0.72;
    W = H * aspect;
    this.cx = this.w / 2;
    this.cy = this.h / 2;
    this.logoR = H / 2; // half logo height in px

    // Build target points — distribute particles across dots proportional to area
    const dots = window.CODELOGS_DOTS;
    const areas = dots.map(d => d.r * d.r);
    const totalA = areas.reduce((a, b) => a + b, 0);
    const total = Math.round(this.opts.particles * this.opts.density);
    this.targets = [];
    dots.forEach((d, i) => {
      const n = Math.max(4, Math.round(total * (areas[i] / totalA)));
      const rPx = d.r * this.logoR;
      const dxPx = d.x * this.logoR * 0.92; // slight horizontal tuck
      const dyPx = d.y * this.logoR;
      for (let k = 0; k < n; k++) {
        // Disk sampling
        const a = Math.random() * Math.PI * 2;
        const rr = Math.sqrt(Math.random()) * rPx;
        this.targets.push({
          tx: dxPx + Math.cos(a) * rr,
          ty: dyPx + Math.sin(a) * rr,
          rBase: 0.4 + Math.random() * 1.4,
          dotIdx: i
        });
      }
    });

    // Create / reassign particles
    if (this.particles.length !== this.targets.length) {
      this.particles = this.targets.map((t, i) => {
        const start = this.opts.scatter
          ? { x: (Math.random() - 0.5) * this.w * 1.5, y: (Math.random() - 0.5) * this.h * 1.5 }
          : { x: t.tx + (Math.random() - 0.5) * 40, y: t.ty + (Math.random() - 0.5) * 40 };
        const pal = this.opts.palette;
        return {
          x: start.x, y: start.y,
          vx: 0, vy: 0,
          tx: t.tx, ty: t.ty,
          r: t.rBase,
          dotIdx: t.dotIdx,
          color: pal[Math.floor(Math.random() * pal.length)]
        };
      });
    } else {
      this.particles.forEach((p, i) => {
        p.tx = this.targets[i].tx;
        p.ty = this.targets[i].ty;
        p.r = this.targets[i].rBase;
      });
    }
  }

  loop() {
    this.t += 1;
    const { ctx, w, h } = this;
    ctx.clearRect(0, 0, w, h);

    // Slow overall rotation of target field
    const ang = this.t * this.opts.rotate;
    const cosA = Math.cos(ang), sinA = Math.sin(ang);

    // Breathing scale
    const breath = 1 + Math.sin(this.t * 0.012) * 0.025;

    for (const p of this.particles) {
      // target in world coords (centered)
      const rtx = (p.tx * cosA - p.ty * sinA) * breath + this.cx;
      const rty = (p.tx * sinA + p.ty * cosA) * breath + this.cy;

      // Formation spring
      const dx = rtx - p.x;
      const dy = rty - p.y;
      p.vx += dx * this.opts.formStrength;
      p.vy += dy * this.opts.formStrength;

      // Mouse repulsion
      const mdx = p.x - this.mx;
      const mdy = p.y - this.my;
      const md2 = mdx * mdx + mdy * mdy;
      const R = this.opts.mouseRepel;
      if (md2 < R * R) {
        const d = Math.sqrt(md2) || 1;
        const f = (1 - d / R) * this.opts.mouseForce;
        p.vx += (mdx / d) * f * 6;
        p.vy += (mdy / d) * f * 6;
      }

      // Tiny drift
      p.vx += (Math.random() - 0.5) * this.opts.drift;
      p.vy += (Math.random() - 0.5) * this.opts.drift;

      // Damping
      p.vx *= this.opts.damping;
      p.vy *= this.opts.damping;

      p.x += p.vx;
      p.y += p.vy;
    }

    // Draw
    if (this.opts.glow) {
      ctx.globalCompositeOperation = 'multiply';
      for (const p of this.particles) {
        const r = p.r * 3.2;
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r);
        grad.addColorStop(0, this.opts.glowColor);
        grad.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalCompositeOperation = 'source-over';
    }

    for (const p of this.particles) {
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    }

    requestAnimationFrame(this.loop);
  }
}

// Expose a setter so tweaks can change particle count live
LogoField.prototype.setCount = function(n) {
  this.opts.particles = n;
  this.particles = [];
  this.rebuildTargets();
};

// Hero logo — scattered start, mouse reactive
const heroCanvas = document.getElementById('logoCanvas');
if (heroCanvas) {
  const initN = (window.__TWEAKS && window.__TWEAKS.particles) || 750;
  const initGlow = (window.__TWEAKS && 'glow' in window.__TWEAKS) ? !!window.__TWEAKS.glow : true;
  window.__heroField = new LogoField(heroCanvas, {
    particles: prefersReduced ? 240 : initN,
    scatter: true,
    formStrength: prefersReduced ? 0.2 : 0.04,
    damping: 0.9,
    mouseRepel: 140,
    mouseForce: 1.2,
    drift: 0.5,
    rotate: 0,
    glow: initGlow
  });
}

// Contact logo — passive, slower rotate (on dark bg)
const contactCanvas = document.getElementById('contactCanvas');
if (contactCanvas) {
  new LogoField(contactCanvas, {
    particles: 420,
    passive: true,
    scatter: false,
    formStrength: 0.05,
    damping: 0.88,
    drift: 0.2,
    rotate: -0.0008,
    glow: false,
    palette: ['#0373fe', '#0373fe', '#31d1fe', '#31d1fe', '#f05828', '#a3a8f4']
  });
}

// ---------- Ambient starfield ----------
(function ambient() {
  const c = document.getElementById('ambient');
  if (!c) return;
  const ctx = c.getContext('2d');
  const dpr = Math.min(devicePixelRatio || 1, 2);
  let w, h, dots;

  function resize() {
    w = innerWidth; h = innerHeight;
    c.width = w * dpr; c.height = h * dpr;
    c.style.width = w + 'px'; c.style.height = h + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const density = (window.__TWEAKS && typeof window.__TWEAKS.ambient === 'number') ? window.__TWEAKS.ambient : 1;
    const count = prefersReduced ? 40 : Math.round((w * h) / 22000 * density);
    dots = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.2 + 0.2,
      vx: (Math.random() - 0.5) * 0.08,
      vy: (Math.random() - 0.5) * 0.08,
      a: Math.random() * 0.6 + 0.2,
      ph: Math.random() * Math.PI * 2
    }));
  }
  resize(); addEventListener('resize', resize);
  window.__ambientSetDensity = function() { resize(); };

  let scrollY = 0;
  addEventListener('scroll', () => scrollY = window.scrollY, { passive: true });

  let t = 0;
  (function loop() {
    t += 1;
    ctx.clearRect(0, 0, w, h);
    const off = scrollY * 0.05;
    for (const d of dots) {
      d.x += d.vx; d.y += d.vy;
      if (d.x < -20) d.x = w + 20; if (d.x > w + 20) d.x = -20;
      if (d.y < -20) d.y = h + 20; if (d.y > h + 20) d.y = -20;
      const flick = 0.7 + Math.sin(t * 0.03 + d.ph) * 0.3;
      ctx.fillStyle = `rgba(3,115,254,${d.a * flick * 0.35})`;
      ctx.beginPath();
      ctx.arc(d.x, (d.y - off) % h, d.r, 0, Math.PI * 2);
      ctx.fill();
    }
    requestAnimationFrame(loop);
  })();
})();

// ---------- Smooth scroll for in-page anchors ----------
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    if (id.length < 2) return;
    const el = document.querySelector(id);
    if (!el) return;
    e.preventDefault();
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 60, behavior: 'smooth' });
  });
});
