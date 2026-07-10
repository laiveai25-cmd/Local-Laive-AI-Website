/* Laive AI award site — shared hooks, helpers, copy. */
const { useState, useEffect, useRef, useCallback } = React;

/* ---------- Reveal on scroll ---------- */
function Reveal({ as = 'div', delay = 0, style, className = '', children, ...rest }) {
  const ref = useRef(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setOn(true); io.disconnect(); }
    }, { threshold: 0.18 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const Tag = as;
  return (
    <Tag ref={ref} className={`rv ${on ? 'rv-on' : ''} ${className}`}
      style={{ '--d': `${delay}s`, ...style }} {...rest}>{children}</Tag>
  );
}

/* ---------- Count-up ---------- */
function useCountUp(target, started, dur = 1400) {
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

function useInView(threshold = 0.4) {
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

/* ---------- Media query ---------- */
function useMedia(q) {
  const [m, setM] = useState(() => window.matchMedia(q).matches);
  useEffect(() => {
    const mq = window.matchMedia(q);
    const fn = () => setM(mq.matches);
    mq.addEventListener('change', fn);
    return () => mq.removeEventListener('change', fn);
  }, [q]);
  return m;
}

/* ---------- Mouse parallax (returns setter-driven style) ---------- */
function useParallax(strength = 20) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = null, tx = 0, ty = 0, cx = 0, cy = 0;
    const onMove = (e) => {
      tx = (e.clientX / window.innerWidth - 0.5) * 2;
      ty = (e.clientY / window.innerHeight - 0.5) * 2;
      if (!raf) loop();
    };
    const loop = () => {
      cx += (tx - cx) * 0.06; cy += (ty - cy) * 0.06;
      el.style.transform = `translate3d(${(cx * strength).toFixed(2)}px, ${(cy * strength).toFixed(2)}px, 0)`;
      if (Math.abs(tx - cx) > 0.001 || Math.abs(ty - cy) > 0.001) raf = requestAnimationFrame(loop);
      else raf = null;
    };
    window.addEventListener('pointermove', onMove);
    return () => { window.removeEventListener('pointermove', onMove); if (raf) cancelAnimationFrame(raf); };
  }, [strength]);
  return ref;
}

/* ---------- Copy ---------- */
const LAIVE_COPY = {
  products: [
    {
      index: '01', icon: 'bot', name: 'Laive Engage', tag: 'AI Sales Agents',
      lead: 'Bespoke AI agents that engage prospects, qualify leads, and book meetings — around the clock.',
      caps: ['Lead qualification & routing', 'Inbound & outbound engagement', 'Appointment scheduling', 'CRM updates & sales insights'],
      outcome: 'Faster sales cycles. Higher conversion.',
    },
    {
      index: '02', icon: 'headset', name: 'Laive Assist', tag: 'AI Support Agents',
      lead: 'Always-on customer support that resolves, escalates intelligently, and improves with every ticket.',
      caps: ['24/7 customer support', 'Ticket handling & resolution', 'Intelligent escalation to humans', 'Continuous learning'],
      outcome: 'Lower support costs. Faster responses.',
    },
    {
      index: '03', icon: 'workflow', name: 'Laive Automation Suite', tag: 'Process Automation',
      lead: 'AI-powered workflows that connect systems, data, and teams — eliminating manual work and bottlenecks.',
      caps: ['End-to-end process automation', 'System & API integrations', 'Data orchestration & handoffs', 'Intelligent decision logic'],
      outcome: 'Greater efficiency. Fewer errors.',
    },
  ],
  reasons: [
    { icon: 'target', index: '01', title: 'Outcome-driven, not tool-driven', text: 'We start with your business goals, then design the right AI workflows to achieve them.' },
    { icon: 'user-minus', index: '02', title: 'Zero hiring burden', text: 'AI-driven capability without recruiting new talent — and up to 50–60% ROI.' },
    { icon: 'shield-check', index: '03', title: 'Risk-managed deployment', text: 'Architecture, security, and integration handled end-to-end.' },
    { icon: 'sliders-horizontal', index: '04', title: 'Tailored to you', text: 'Not one-size-fits-all. Every solution is built around your operations.' },
  ],
  steps: [
    { icon: 'search', title: 'Discover', text: 'Stakeholder interviews, workflow & data audits, roadmap design.' },
    { icon: 'pen-tool', title: 'Design & Build', text: 'Architecture, logic & UI development, data pipelines & integration.' },
    { icon: 'rocket', title: 'Deploy', text: 'Rigorous testing, pilot & gradual rollout, training & onboarding.' },
    { icon: 'repeat', title: 'Optimize', text: 'Real-time tracking, feedback & error handling, incremental enhancements.' },
  ],
  frameworks: ['EU AI Act', 'IEEE 7000 Series', 'NIST AI RMF', 'ISO/IEC 42001'],
};

Object.assign(window, { Reveal, useCountUp, useInView, useMedia, useParallax, LAIVE_COPY });
