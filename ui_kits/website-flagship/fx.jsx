/* Laive AI flagship — FX engine: smooth-scroll frame bus, cursor, HUD,
   progress, grain, reveal, magnetic, scramble, hooks, copy. */
const { useState, useEffect, useRef, useCallback } = React;

/* ================= Scroll frame bus (singleton) ================= */
const FsScroll = {
  raw: 0, y: 0, v: 0, ease: 0.11, subs: new Set(), running: false,
  start() {
    if (this.running) return;
    this.running = true;
    const loop = () => {
      this.raw = window.scrollY || 0;
      const prev = this.y;
      this.y += (this.raw - this.y) * this.ease;
      if (Math.abs(this.raw - this.y) < 0.05) this.y = this.raw;
      this.v = this.y - prev;
      this.subs.forEach((fn) => { try { fn(this.y, this.v, this.raw); } catch (e) {} });
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  },
};

function useScrollFrame(fn, deps = []) {
  useEffect(() => {
    FsScroll.start();
    FsScroll.subs.add(fn);
    return () => FsScroll.subs.delete(fn);
  }, deps); // eslint-disable-line
}

/* ---------- Offline-export image fallback ----------
   brand-fallback.js carries a base64 copy of every image this page loads via
   a *computed* src (Logo's `base+file`, client/partner `${slug}.png`, and the
   hero mark) — paths a static bundler can never discover because they don't
   exist as literal text until React assembles them at runtime. On normal
   hosting the real file always loads and this never fires (zero cost, the
   fallback script sits at low priority and is never even consulted). It only
   kicks in for a single-file/offline export, so that export is never missing
   a logo. */
function fsImgFallback(key) {
  return function onFsImgError(e) {
    const img = e.currentTarget;
    if (img.dataset.fsFallback) return;
    const apply = () => {
      const durl = window.FS_IMG_FALLBACK && window.FS_IMG_FALLBACK[key];
      if (durl) { img.dataset.fsFallback = '1'; img.src = durl; }
    };
    if (window.FS_IMG_FALLBACK) apply();
    else window.addEventListener('fs-fallback-ready', apply, { once: true });
  };
}

/* Cache an element's document-space top/height (refreshed on resize). */
function useMeasure(ref) {
  const m = useRef({ top: 0, h: 1 });
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const re = () => {
      const r = el.getBoundingClientRect();
      m.current = { top: r.top + window.scrollY, h: r.height };
    };
    re();
    const t1 = setTimeout(re, 350);
    const t2 = setTimeout(re, 1400);
    window.addEventListener('resize', re);
    window.addEventListener('load', re);
    return () => { clearTimeout(t1); clearTimeout(t2); window.removeEventListener('resize', re); window.removeEventListener('load', re); };
  }, []);
  return m;
}

const clamp01 = (n) => Math.max(0, Math.min(1, n));

/* ================= Reveal on scroll ================= */
function FadeIn({ as = 'div', delay = 0, style, className = '', children, ...rest }) {
  const ref = useRef(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setOn(true); io.disconnect(); }
    }, { threshold: 0.16 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const Tag = as;
  return (
    <Tag ref={ref} className={`fv ${on ? 'fv-on' : ''} ${className}`}
      style={{ '--d': `${delay}s`, ...style }} {...rest}>{children}</Tag>
  );
}

/* ================= Hooks ================= */
function useInViewFs(threshold = 0.4) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setInView(true); io.disconnect(); }
    }, { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function useCountUpFs(target, started, dur = 1500) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!started) return;
    let raf; const t0 = performance.now();
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / dur);
      setV(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [started, target, dur]);
  return v;
}

function useMediaFs(q) {
  const [m, setM] = useState(() => window.matchMedia(q).matches);
  useEffect(() => {
    const mq = window.matchMedia(q);
    const fn = () => setM(mq.matches);
    mq.addEventListener('change', fn);
    return () => mq.removeEventListener('change', fn);
  }, [q]);
  return m;
}

/* ================= Magnetic wrapper ================= */
function Magnetic({ strength = 0.32, children, className = '', style, ...rest }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(pointer: coarse)').matches) return;
    let raf = null, tx = 0, ty = 0, cx = 0, cy = 0;
    const loop = () => {
      cx += (tx - cx) * 0.16; cy += (ty - cy) * 0.16;
      el.style.transform = `translate3d(${cx.toFixed(2)}px, ${cy.toFixed(2)}px, 0)`;
      if (Math.abs(tx - cx) > 0.05 || Math.abs(ty - cy) > 0.05) raf = requestAnimationFrame(loop);
      else raf = null;
    };
    const move = (e) => {
      const r = el.getBoundingClientRect();
      const mx = e.clientX - (r.left + r.width / 2);
      const my = e.clientY - (r.top + r.height / 2);
      const range = Math.max(r.width, r.height) * 1.15;
      const d = Math.hypot(mx, my);
      if (d < range) { tx = mx * strength; ty = my * strength; }
      else { tx = 0; ty = 0; }
      if (!raf) loop();
    };
    const leave = () => { tx = 0; ty = 0; if (!raf) loop(); };
    window.addEventListener('pointermove', move, { passive: true });
    el.addEventListener('pointerleave', leave);
    return () => { window.removeEventListener('pointermove', move); el.removeEventListener('pointerleave', leave); if (raf) cancelAnimationFrame(raf); };
  }, [strength]);
  return <div ref={ref} className={`fs-mag ${className}`} style={style} {...rest}>{children}</div>;
}

/* ================= Scramble-in text (hover) ================= */
function Scramble({ text, className = '', style, ...rest }) {
  const ref = useRef(null);
  const run = useCallback(() => {
    const el = ref.current;
    if (!el || el._busy || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    el._busy = true;
    const CH = 'X#/<>+*-01';
    let f = 0;
    const total = Math.max(8, text.length * 1.8);
    const iv = setInterval(() => {
      f++;
      const reveal = Math.floor((f / total) * text.length);
      el.textContent = text.split('').map((c, i) =>
        c === ' ' ? ' ' : (i < reveal ? c : CH[(Math.random() * CH.length) | 0])
      ).join('');
      if (f >= total) { clearInterval(iv); el.textContent = text; el._busy = false; }
    }, 26);
  }, [text]);
  return <span ref={ref} className={className} style={style} onMouseEnter={run} {...rest}>{text}</span>;
}

/* ================= Custom cursor ================= */
function FsCursor({ enabled = true }) {
  const dotRef = useRef(null), ringRef = useRef(null), labRef = useRef(null);
  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    const dot = dotRef.current, ring = ringRef.current, lab = labRef.current;
    if (!enabled || !fine || !dot || !ring) return;
    document.documentElement.classList.add('fs-cursor-on');
    let mx = -100, my = -100, rx = -100, ry = -100, pressed = false, raf = 0, shown = false;
    const onMove = (e) => {
      mx = e.clientX; my = e.clientY;
      if (!shown) { shown = true; dot.style.opacity = 1; ring.style.opacity = 1; }
      const t = e.target;
      let mode = 'base', text = '';
      if (t && t.closest) {
        const interactive = t.closest('a, button, [role="button"], input, textarea, select, label');
        const tagged = t.closest('[data-cursor]');
        if (interactive) {
          mode = interactive.matches('input, textarea, select') ? 'text' : 'link';
        } else if (tagged) {
          mode = tagged.dataset.cursor || 'label';
          text = tagged.dataset.cursorLabel || '';
        }
      }
      ring.dataset.mode = mode;
      if (lab) lab.textContent = text;
    };
    const loop = () => {
      raf = requestAnimationFrame(loop);
      rx += (mx - rx) * 0.17; ry += (my - ry) * 0.17;
      const s = pressed ? 0.82 : 1;
      dot.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;
      ring.style.transform = `translate3d(${rx.toFixed(1)}px, ${ry.toFixed(1)}px, 0) translate(-50%, -50%) scale(${s})`;
    };
    const down = () => { pressed = true; };
    const up = () => { pressed = false; };
    const out = (e) => { if (!e.relatedTarget) { dot.style.opacity = 0; ring.style.opacity = 0; shown = false; } };
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerdown', down);
    window.addEventListener('pointerup', up);
    document.addEventListener('pointerout', out);
    raf = requestAnimationFrame(loop);
    return () => {
      document.documentElement.classList.remove('fs-cursor-on');
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', down);
      window.removeEventListener('pointerup', up);
      document.removeEventListener('pointerout', out);
      cancelAnimationFrame(raf);
    };
  }, [enabled]);
  if (!enabled) return null;
  return (
    <React.Fragment>
      <div ref={ringRef} className="cur-ring" aria-hidden="true"><span ref={labRef} className="cur-label"></span></div>
      <div ref={dotRef} className="cur-dot" aria-hidden="true"></div>
    </React.Fragment>
  );
}

/* ================= Scroll progress hairline ================= */
function FsProgress() {
  const ref = useRef(null);
  const dims = useRef({ max: 1 });
  useEffect(() => {
    const re = () => { dims.current.max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight); };
    re();
    const t = setTimeout(re, 600);
    window.addEventListener('resize', re);
    window.addEventListener('load', re);
    return () => { clearTimeout(t); window.removeEventListener('resize', re); window.removeEventListener('load', re); };
  }, []);
  useScrollFrame((y, v, raw) => {
    if (ref.current) ref.current.style.transform = `scaleX(${clamp01(raw / dims.current.max).toFixed(4)})`;
  });
  return <div ref={ref} className="fs-progress" aria-hidden="true"></div>;
}

/* ================= Side HUD (section index) ================= */
function FsHud() {
  const [cur, setCur] = useState({ i: 1, name: 'HERO', total: 7 });
  useEffect(() => {
    const secs = Array.from(document.querySelectorAll('[data-hud]'));
    if (!secs.length) return;
    const io = new IntersectionObserver((ents) => {
      ents.forEach((e) => {
        if (e.isIntersecting) {
          const i = secs.indexOf(e.target);
          setCur({ i: i + 1, name: e.target.dataset.hud, total: secs.length });
        }
      });
    }, { rootMargin: '-46% 0px -46% 0px', threshold: 0 });
    secs.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);
  const pad = (n) => String(n).padStart(2, '0');
  return (
    <div className="fs-hud" aria-hidden="true">
      <span className="hud-cur">{pad(cur.i)}</span>
      <span className="hud-line"></span>
      <span>{pad(cur.total)}</span>
      <span className="hud-name">{cur.name}</span>
    </div>
  );
}

/* ================= Grain ================= */
function FsGrain({ enabled = true }) {
  if (!enabled) return null;
  return <div className="fs-grain" aria-hidden="true"></div>;
}

/* ================= Copy ================= */
const FS_COPY = {
  links: [['Products', '#products'], ['Why Laive', '#why'], ['Numbers', '#numbers'], ['Process', '#process'], ['Partners', '#partners'], ['Contact', '#contact']],
  products: [
    {
      i: '01', key: 'engage', icon: 'bot', tag: 'AI SALES AGENTS', name: 'Laive Engage',
      lead: 'Bespoke AI sales agents that engage prospects, qualify leads, and book meetings — around the clock.',
      caps: ['Inbound & outbound engagement', 'Lead qualification & routing', 'Appointment scheduling', 'CRM updates & sales insights'],
      outcome: 'Faster sales cycles. Higher conversion.',
    },
    {
      i: '02', key: 'assist', icon: 'headset', tag: 'AI SUPPORT AGENTS', name: 'Laive Assist',
      lead: 'Always-on support that resolves tickets, escalates intelligently, and learns from every interaction.',
      caps: ['24/7 customer support', 'Ticket handling & resolution', 'Intelligent human escalation', 'Continuous learning'],
      outcome: 'Lower support costs. Faster responses.',
    },
    {
      i: '03', key: 'auto', icon: 'workflow', tag: 'PROCESS AUTOMATION', name: 'Laive Automation Suite',
      lead: 'AI-powered workflows that connect your systems, data, and teams — removing manual work and bottlenecks.',
      caps: ['End-to-end process automation', 'System & API integration', 'Data orchestration & handoffs', 'Intelligent decision logic'],
      outcome: 'Greater efficiency. Fewer errors.',
    },
  ],
  reasons: [
    { icon: 'target', i: '01', title: 'Outcome-driven, not tool-driven', text: 'We start with your business goals, then design the right AI workflows to achieve them. Outcome as a Service — nothing less.' },
    { icon: 'user-minus', i: '02', title: 'Zero hiring burden', text: 'New capability without new headcount. Your AI workforce scales up and down with demand.' },
    { icon: 'shield-check', i: '03', title: 'Risk-managed deployment', text: 'Architecture, security, and integration handled end-to-end — governed by recognised AI frameworks.' },
    { icon: 'sliders-horizontal', i: '04', title: 'Tailored to you', text: 'Not one-size-fits-all. Every agent and workflow is built around your real operations.' },
  ],
  steps: [
    { icon: 'search', title: 'Discover', text: 'Stakeholder interviews, workflow & data audits, roadmap design. We find where you lose money, time, and accuracy.' },
    { icon: 'pen-tool', title: 'Design & Build', text: 'Architecture, agent logic & UI development, data pipelines and deep integration with your stack.' },
    { icon: 'rocket', title: 'Deploy', text: 'Rigorous testing, pilot & gradual rollout, training & onboarding. Nothing ships until it performs.' },
    { icon: 'repeat', title: 'Optimize', text: 'Real-time tracking, feedback & error handling, incremental enhancements — your agents keep getting better.' },
  ],
  frameworks: ['EU AI Act', 'IEEE 7000 Series', 'NIST AI RMF', 'ISO/IEC 42001'],
  contact: { phone: '07064397303', mail: 'info@laiveai.com', addr: 'Abuja, Nigeria' },
};

Object.assign(window, {
  FsScroll, useScrollFrame, useMeasure, clamp01,
  FadeIn, useInViewFs, useCountUpFs, useMediaFs,
  Magnetic, Scramble, FsCursor, FsProgress, FsHud, FsGrain, FS_COPY,
});
