/* Laive AI flagship — pinned horizontal product reel + live agent demos. */
const { useState: useStateP, useEffect: useEffectP, useRef: useRefP } = React;
const DSP = window.LaiveAIDesignSystem_fa5676;
const Icon = window.FsIcon;

const DEMO_HEADS = {
  engage: 'LAIVE ENGAGE — SDR AGENT',
  assist: 'LAIVE ASSIST — SUPPORT QUEUE',
  auto: 'AUTOMATION SUITE — WORKFLOW',
};

/* ---------- Engage: live chat ---------- */
const ENGAGE_SCRIPT = [
  { t: 'in', text: 'This looks interesting. Can you show me how it works?' },
  { t: 'typing' },
  { t: 'out', text: 'Of course. A couple quick questions so I can tailor the demo\u2014which CRM are you using, and does Tuesday at 10:00 work?' },
  { t: 'in', text: 'We\u2019re on HubSpot. Tuesday is perfect.' },
  { t: 'typing' },
  { t: 'out', text: 'Done! I\u2019ve booked your demo and qualified your inquiry for the sales team.' },
  { t: 'chip', text: 'MEETING BOOKED — TUE 10:00' },
  { t: 'chip', text: 'CRM UPDATED — LEAD QUALIFIED' },
];
const ENGAGE_DURS = [600, 1500, 950, 2000, 1400, 950, 2100, 1300, 900, 3600];

function EngageDemo({ active }) {
  const [count, setCount] = useStateP(0);
  useEffectP(() => {
    if (!active) return;
    if ((window.__fsMo ?? 1) === 0 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCount(ENGAGE_SCRIPT.length);
      return;
    }
    const t = setTimeout(() => {
      setCount((c) => (c >= ENGAGE_SCRIPT.length ? 0 : c + 1));
    }, ENGAGE_DURS[Math.min(count, ENGAGE_DURS.length - 1)]);
    return () => clearTimeout(t);
  }, [active, count]);
  const shown = ENGAGE_SCRIPT.slice(0, count);
  return (
    <div className="demo-body" style={{ justifyContent: 'flex-end', height: 330 }}>
      {shown.map((m, i) => {
        if (m.t === 'typing') {
          if (i !== shown.length - 1) return null;
          return <span key={i} className="msg in typing"><i></i><i></i><i></i></span>;
        }
        if (m.t === 'chip') {
          return <span key={i} className="msg chip"><Icon name="check" size={13} />{m.text}</span>;
        }
        return <span key={i} className={`msg ${m.t}`}>{m.text}</span>;
      })}
    </div>
  );
}

/* ---------- Assist: ticket queue ---------- */
const ASSIST_TKTS = [
  { id: 'TKT-4821', text: 'Where is my order?', seq: { 1: 'working', 2: 'resolved' } },
  { id: 'TKT-4822', text: 'Duplicate charge — refund request', seq: { 2: 'working', 4: 'resolved' } },
  { id: 'TKT-4823', text: 'Complex contract question', seq: { 3: 'working', 5: 'escalated' } },
];
const STATUS_LABEL = { queued: 'QUEUED', working: 'RESOLVING', resolved: 'RESOLVED', escalated: 'TO HUMAN' };

function AssistDemo({ active }) {
  const [tick, setTick] = useStateP(0);
  useEffectP(() => {
    if (!active) return;
    if ((window.__fsMo ?? 1) === 0 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setTick(6);
      return;
    }
    const t = setTimeout(() => setTick((c) => (c >= 8 ? 0 : c + 1)), tick === 8 ? 3000 : 1150);
    return () => clearTimeout(t);
  }, [active, tick]);
  const statusOf = (tkt) => {
    let s = 'queued';
    Object.keys(tkt.seq).forEach((k) => { if (tick >= Number(k)) s = tkt.seq[k]; });
    return s;
  };
  return (
    <div className="demo-body" style={{ height: 330, justifyContent: 'center', gap: 13 }}>
      {ASSIST_TKTS.map((tkt) => {
        const s = statusOf(tkt);
        return (
          <div key={tkt.id} className={'tkt' + (s === 'resolved' ? ' done' : '')}>
            <Icon name={s === 'escalated' ? 'user' : 'message-circle'} size={15} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <span>{tkt.text}</span>
              <span className="tkt-id">{tkt.id}</span>
            </div>
            <span className={`tkt-status ${s}`}>{STATUS_LABEL[s]}</span>
          </div>
        );
      })}
      <p style={{ margin: '6px 2px 0', fontFamily: 'var(--font-mono)', fontSize: 10.5, letterSpacing: '0.14em', color: 'var(--text-subtle)' }}>
        ESCALATIONS ARRIVE WITH FULL CONTEXT ATTACHED
      </p>
    </div>
  );
}

/* ---------- Automation: BPMN before → during → after ----------
   Three very distinct sub-slides on one card. Desktop: driven by the pinned
   reel's scroll (phase prop). Stacked/mobile: self-cycles; tabs jump. */
const AUTO_NODES = [
  ['zap', 'TRIGGER'], ['database', 'EXTRACT'], ['plug', 'SYNC'], ['trending-up', 'REPORT'],
];
const AUTO_LOG = [
  'invoice_2381.pdf received',
  'fields parsed — 0 errors',
  'pushed to ERP + CRM',
  'summary sent to finance',
];

/* Mini swimlane BPMN (viewBox 560×252, 3 lanes). mode 'before' = dim manual
   mess · mode 'during' = same flow + gold AI-opportunity scan overlays. */
const BP_W = 72, BP_H = 26;
const BP_TASKS = [
  { id: 'n1', x: 52,  y: 37,  label: 'DOWNLOAD PDF',  hot: true },
  { id: 'n2', x: 140, y: 37,  label: 'RE-TYPE DATA',  hot: true },
  { id: 'n3', x: 272, y: 37,  label: 'EMAIL TO OPS',  hot: false },
  { id: 'n4', x: 272, y: 117, label: 'MATCH TO PO',   hot: true },
  { id: 'n5', x: 408, y: 117, label: 'APPROVE & FWD', hot: false },
  { id: 'n6', x: 356, y: 197, label: 'KEY INTO ERP',  hot: true },
  { id: 'n7', x: 452, y: 197, label: 'SEND SUMMARY',  hot: true },
];
const BP_EDGES = [
  'M37 50 H49', 'M124 50 H137', 'M212 50 H224', 'M253 50 H269',
  'M308 63 V114', 'M344 130 H360', 'M389 130 H405',
  'M444 143 V184 H392 V194', 'M428 210 H449', 'M524 210 H534',
];
const BP_LOOPS = [
  { d: 'M240 37 V20 H176 V34', tag: ['MISSING INFO', 208, 15] },
  { d: 'M376 117 V96 H176 V66', tag: ['REWORK', 292, 92] },
];
const BP_DIAMONDS = [
  { cx: 240, cy: 50, label: 'COMPLETE?' },
  { cx: 376, cy: 130, label: 'PO MATCH?' },
];
const BP_LANES = [['SALES', 20], ['OPERATIONS', 100], ['FINANCE', 180]];

function BpmnMap({ mode, uid }) {
  const during = mode === 'during';
  const ink = (a) => `rgba(243,238,228,${a})`;
  const red = (a) => `rgba(229,83,61,${a})`;
  return (
    <svg viewBox="0 0 560 252" preserveAspectRatio="xMidYMid meet" aria-hidden="true"
      style={{ width: '100%', height: '100%', display: 'block' }}>
      <defs>
        <marker id={uid + 'a'} viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0 L8 4 L0 8 Z" fill={ink(0.38)}></path>
        </marker>
        <marker id={uid + 'r'} viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0 L8 4 L0 8 Z" fill={red(0.75)}></path>
        </marker>
        <linearGradient id={uid + 's'} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="rgba(232,179,23,0)"></stop>
          <stop offset="0.5" stopColor="rgba(232,179,23,0.30)"></stop>
          <stop offset="1" stopColor="rgba(232,179,23,0)"></stop>
        </linearGradient>
      </defs>
      <g opacity={during ? 0.5 : 1}>
        <line x1="0" y1="90" x2="560" y2="90" stroke={ink(0.08)} strokeWidth="1"></line>
        <line x1="0" y1="170" x2="560" y2="170" stroke={ink(0.08)} strokeWidth="1"></line>
        {BP_LANES.map(([l, y]) => (
          <text key={l} x="8" y={y} fontFamily="var(--font-mono)" fontSize="7" letterSpacing="2" fill={ink(0.4)}>{l}</text>
        ))}
        {BP_EDGES.map((d, i) => (
          <path key={i} d={d} fill="none" stroke={ink(0.25)} strokeWidth="1" markerEnd={`url(#${uid}a)`}></path>
        ))}
        {BP_LOOPS.map((l, i) => (
          <g key={i}>
            <path d={l.d} fill="none" stroke={red(0.55)} strokeWidth="1" strokeDasharray="4 3" markerEnd={`url(#${uid}r)`}></path>
            <text x={l.tag[1]} y={l.tag[2]} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="6.5" letterSpacing="1" fill={red(0.8)}>{l.tag[0]}</text>
          </g>
        ))}
        <circle cx="30" cy="50" r="7" fill={ink(0.06)} stroke={ink(0.45)} strokeWidth="1.4"></circle>
        <text x="30" y="71" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="6" letterSpacing="1" fill={ink(0.4)}>EMAIL IN</text>
        <circle cx="544" cy="210" r="7" fill={red(0.12)} stroke={red(0.65)} strokeWidth="1.6"></circle>
        <text x="544" y="231" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="6" letterSpacing="1" fill={ink(0.4)}>DAY 3</text>
        {BP_DIAMONDS.map((g) => (
          <g key={g.label}>
            <path d={`M${g.cx} ${g.cy - 13} L${g.cx + 13} ${g.cy} L${g.cx} ${g.cy + 13} L${g.cx - 13} ${g.cy} Z`}
              fill={ink(0.05)} stroke={ink(0.3)} strokeWidth="1"></path>
            <text x={g.cx} y={g.cy + 26} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="6.5" letterSpacing="1" fill={ink(0.42)}>{g.label}</text>
          </g>
        ))}
        {BP_TASKS.map((n) => (
          <g key={n.id}>
            <rect x={n.x} y={n.y} width={BP_W} height={BP_H} rx="6" fill={ink(0.05)} stroke={ink(0.3)} strokeWidth="1"></rect>
            <text x={n.x + BP_W / 2} y={n.y + 16.5} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="7.5" letterSpacing="0.5" fill={ink(0.62)}>{n.label}</text>
          </g>
        ))}
      </g>
      {during && (
        <g>
          {BP_TASKS.filter((n) => n.hot).map((n, i) => (
            <g key={n.id}>
              <rect className="bp-halo" style={{ animationDelay: `${i * 0.3}s` }}
                x={n.x - 3.5} y={n.y - 3.5} width={BP_W + 7} height={BP_H + 7} rx="9"
                fill="none" stroke="var(--accent)" strokeWidth="1"></rect>
              <rect x={n.x} y={n.y} width={BP_W} height={BP_H} rx="6"
                fill="rgba(232,179,23,0.13)" stroke="var(--accent)" strokeWidth="1.2"></rect>
              <text x={n.x + BP_W / 2} y={n.y + 16.5} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="7.5" letterSpacing="0.5" fill="var(--gold-100)">{n.label}</text>
              <rect x={n.x + BP_W - 13} y={n.y - 8} width="20" height="12" rx="3.5" fill="var(--accent)"></rect>
              <text x={n.x + BP_W - 3} y={n.y + 1.5} textAnchor="middle" fontFamily="var(--font-mono)" fontWeight="700" fontSize="7.5" fill="var(--text-on-gold)">AI</text>
            </g>
          ))}
          <g className="bp-beam"><rect x="-80" y="4" width="56" height="244" fill={`url(#${uid}s)`}></rect></g>
        </g>
      )}
    </svg>
  );
}

const BP_PHASES = ['BEFORE', 'DURING', 'AFTER'];

function AutoDemo({ active, phase, onJump }) {
  const controlled = typeof phase === 'number';
  const [ph, setPh] = useStateP(0);
  const [step, setStep] = useStateP(0);
  const manual = useRefP(false);
  const cur = controlled ? phase : ph;
  const still = () => (window.__fsMo ?? 1) === 0 || window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Self-running phase loop — stacked/mobile only (desktop is scroll-driven). */
  useEffectP(() => {
    if (controlled || !active) return;
    if (manual.current) return; /* manual jump wins — must precede the reduced-motion park */
    if (still()) { setPh(2); return; }
    const t = setTimeout(() => setPh((v) => (v + 1) % 3), cur === 2 ? 5600 : 3600);
    return () => clearTimeout(t);
  }, [controlled, active, cur]);

  /* AFTER: workflow pulse + log reveal (the kept invoice_2381 example). */
  useEffectP(() => {
    if (!active || cur !== 2) return;
    if (still()) { setStep(3); return; }
    const t = setTimeout(() => setStep((s) => (s + 1) % 4), step === 3 ? 2600 : 1350);
    return () => clearTimeout(t);
  }, [active, cur, step]);

  const jump = (i) => { manual.current = true; if (controlled) { if (onJump) onJump(i); } else { setPh(i); } };
  const cls = (i) => 'bp-layer' + (i === cur ? ' on' : i < cur ? ' past' : '');

  return (
    <div className="demo-body" style={{ height: 396, gap: 0 }}>
      <div className="bp-tabs" aria-label="Workflow phases">
        {BP_PHASES.map((t, i) => (
          <React.Fragment key={t}>
            {i > 0 && <span className="bp-arrow" aria-hidden="true"><Icon name="arrow-right" size={11} /></span>}
            <button type="button" aria-current={i === cur} className={'bp-tab' + (i === cur ? ' on' : '')} onClick={() => jump(i)}>
              <i className="hexd" aria-hidden="true"></i>{t}
            </button>
          </React.Fragment>
        ))}
      </div>
      <div className="bp-stage">
        <div className={cls(0)} aria-hidden={cur !== 0}>
          <div className="bp-head">
            <span style={{ color: 'var(--text-muted)' }}>TODAY — MANUAL PROCESS</span>
            <span style={{ color: 'var(--text-subtle)' }}>≈ 3 DAYS / INVOICE</span>
          </div>
          <div className="bp-svg"><BpmnMap mode="before" uid="bpb" /></div>
          <div className="bp-foot">
            <span className="bp-chip">11 STEPS</span>
            <span className="bp-chip">3 TEAMS</span>
            <span className="bp-chip bad">2 REWORK LOOPS</span>
          </div>
        </div>
        <div className={cls(1)} aria-hidden={cur !== 1}>
          <div className="bp-head">
            <span style={{ color: 'var(--accent)' }}>AI OPPORTUNITY SCAN</span>
            <span style={{ color: 'var(--text-subtle)' }}>LAIVE PROCESS AUDIT</span>
          </div>
          <div className="bp-svg"><BpmnMap mode="during" uid="bpd" /></div>
          <div className="bp-foot">
            <span className="bp-chip gold">5 AUTOMATION OPPORTUNITIES</span>
            <span className="bp-chip">SAME FLOW — SCANNED BY AI</span>
          </div>
        </div>
        <div className={cls(2)} aria-hidden={cur !== 2}>
          <div className="bp-head">
            <span style={{ color: 'var(--accent)' }}>REDESIGNED — LAIVE AUTOMATION</span>
            <span style={{ color: 'var(--text-subtle)' }}>≈ 4 MIN / INVOICE</span>
          </div>
          <div className="flow" style={{ flex: '0 0 auto' }}>
            <div className="flow-line" aria-hidden="true">
              <span className="flow-pulse" style={{ left: `${(step / 3) * 100}%` }}></span>
            </div>
            {AUTO_NODES.map(([ic, name], i) => (
              <div key={name} className={'flow-node' + (i <= step ? ' on' : '')}>
                <span className="flow-hex"><span className="flow-hex-in"><Icon name={ic} size={17} /></span></span>
                <span className="flow-name">{name}</span>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 7, marginTop: 12 }}>
            {AUTO_LOG.map((l, i) => (
              <span key={l} style={{
                fontFamily: 'var(--font-mono)', fontSize: 11.5, letterSpacing: '0.04em',
                color: i <= step ? 'var(--gold-200)' : 'var(--ink-500)',
                transition: 'color 0.4s',
              }}>
                <span style={{ color: i <= step ? 'var(--accent)' : 'var(--ink-600)' }}>→&nbsp;</span>{l}
              </span>
            ))}
          </div>
          <div className="bp-foot" style={{ marginTop: 'auto' }}>
            <span className="bp-chip gold">4 STEPS — 0 TOUCHES</span>
            <span className="bp-chip gold">3 DAYS → 4 MINUTES</span>
          </div>
        </div>
      </div>
    </div>
  );
}

const FS_DEMOS = { engage: EngageDemo, assist: AssistDemo, auto: AutoDemo };

/* ---------- Product panel ---------- */
function FsProductPanel({ p, i, active, onBook, phase, onJump }) {
  const { Button } = DSP;
  const Demo = FS_DEMOS[p.key];
  return (
    <article className="prod-panel" data-screen-label={p.name}>
      <span className="prod-num text-3d-copper" aria-hidden="true"
        style={{ transform: `translate3d(calc(var(--p, 0) * ${-(70 + i * 50)}px), 0, 0)` }}>{p.i}</span>
      <div className="fs-wrap prod-grid" style={{ boxSizing: 'border-box' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.22em', color: 'var(--accent)' }}>
            {p.i} / 03 — {p.tag}
          </span>
          <h3 className="prod-name">{p.name}</h3>
          <p style={{ margin: 0, fontSize: 'clamp(15px, 1.4vw, 17.5px)', lineHeight: 1.6, color: 'var(--text-muted)', maxWidth: 480 }}>{p.lead}</p>
          <div style={{ maxWidth: 460 }}>
            {p.caps.map((c) => (
              <div key={c} className="prod-cap"><i className="hexd" aria-hidden="true"></i><span>{c}</span></div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap', marginTop: 4 }}>
            <span className="outcome-pill"><span className="k">OUTCOME</span>{p.outcome}</span>
          </div>
          <div style={{ marginTop: 4 }}>
            <Button variant="glass" onClick={onBook} iconRight={<Icon name="arrow-right" size={15} />}>See it on your operation</Button>
          </div>
        </div>
        <div className="gl gl-live" style={{ borderRadius: 26 }}>
          <div className="demo-head">
            <i className={'demo-dot' + (active ? ' live' : '')} aria-hidden="true"></i>
            {p.key !== 'engage' && DEMO_HEADS[p.key]}
          </div>
          <Demo active={active} phase={phase} onJump={onJump} />
        </div>
      </div>
    </article>
  );
}

/* ---------- Pinned horizontal reel (desktop) ----------
   Scroll map: first half of the span slides the 3 panels across; the second
   half stays pinned on Automation Suite and steps its BPMN phases
   BEFORE → DURING → AFTER. */
const BP_SHIFT_END = 0.5;

function FsProductsPinned({ onBook }) {
  const { SectionLabel } = DSP;
  const wrapRef = useRefP(null);
  const trackRef = useRefP(null);
  const fillRef = useRefP(null);
  const m = useMeasure(wrapRef);
  const [active, setActive] = useStateP(0);
  const [phase, setPhase] = useStateP(0);
  const [vis, setVis] = useStateP(false);
  const aRef = useRefP(0);
  const phRef = useRefP(0);

  useEffectP(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVis(e.isIntersecting), { threshold: 0 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useScrollFrame((y) => {
    const track = trackRef.current;
    if (!track) return;
    const vh = window.innerHeight;
    const span = Math.max(1, m.current.h - vh);
    const p = clamp01((y - m.current.top) / span);
    const q = Math.min(1, p / BP_SHIFT_END);
    const shift = Math.max(0, track.scrollWidth - window.innerWidth);
    track.style.transform = `translate3d(${(-q * shift).toFixed(1)}px, 0, 0)`;
    track.style.setProperty('--p', q.toFixed(4));
    if (fillRef.current) fillRef.current.style.transform = `scaleX(${q.toFixed(4)})`;
    const idx = Math.min(2, Math.floor(q * 3));
    if (idx !== aRef.current) { aRef.current = idx; setActive(idx); }
    const ph = p <= BP_SHIFT_END ? 0 : Math.min(2, Math.floor(((p - BP_SHIFT_END) / (1 - BP_SHIFT_END)) * 3));
    if (ph !== phRef.current) { phRef.current = ph; setPhase(ph); }
  });

  /* Tab click → scroll the page into that phase's band. */
  const jumpPhase = (i) => {
    const vh = window.innerHeight;
    const span = Math.max(1, m.current.h - vh);
    const target = m.current.top + span * (BP_SHIFT_END + (1 - BP_SHIFT_END) * ((i + 0.35) / 3));
    window.scrollTo({ top: Math.round(target), behavior: 'smooth' });
  };

  return (
    <section id="products" ref={wrapRef} data-hud="PRODUCTS" data-screen-label="Products"
      style={{ height: '520vh', position: 'relative', scrollMarginTop: 0 }}>
      <div className="prod-sticky">
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 4, pointerEvents: 'none' }}>
          <div className="fs-wrap" style={{ paddingTop: 68, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', boxSizing: 'border-box' }}>
            <SectionLabel style={{ fontSize: 'clamp(15px, 1.6vw, 22px)', gap: 14 }}>Our AI Products</SectionLabel>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.2em', color: 'var(--text-subtle)' }}>KEEP SCROLLING</span>
          </div>
        </div>
        <div className="prod-track" ref={trackRef}>
          {FS_COPY.products.map((p, i) => (
            <FsProductPanel key={p.key} p={p} i={i} active={vis && active === i} onBook={onBook}
              phase={i === 2 ? phase : undefined} onJump={i === 2 ? jumpPhase : undefined} />
          ))}
        </div>
        <div className="prod-rail" aria-hidden="true">
          <span>0{active + 1}</span>
          <div className="prod-rail-bar"><div className="prod-rail-fill" ref={fillRef}></div></div>
          <span>03</span>
        </div>
      </div>
    </section>
  );
}

/* ---------- Stacked fallback (mobile) ---------- */
function FsProductStackItem({ p, i, onBook }) {
  const [ref, inView] = useInViewFs(0.35);
  return (
    <div ref={ref} style={{ padding: '30px 0' }}>
      <FadeIn>
        <FsProductPanelStatic p={p} i={i} active={inView} onBook={onBook} />
      </FadeIn>
    </div>
  );
}
function FsProductPanelStatic(props) {
  /* same panel content without 100vw sizing */
  return (
    <div style={{ position: 'relative' }}>
      <div className="prod-panel-st"><FsProductPanel {...props} /></div>
    </div>
  );
}
function FsProductsStack({ onBook }) {
  const { SectionLabel } = DSP;
  return (
    <section id="products" data-hud="PRODUCTS" data-screen-label="Products" style={{ padding: 'var(--section-y) 0', scrollMarginTop: 70 }}>
      <div className="fs-wrap"><SectionLabel>Our AI Products</SectionLabel></div>
      {FS_COPY.products.map((p, i) => <FsProductStackItem key={p.key} p={p} i={i} onBook={onBook} />)}
    </section>
  );
}

function FsProducts({ onBook }) {
  const narrow = useMediaFs('(max-width: 940px)');
  return narrow ? <FsProductsStack onBook={onBook} /> : <FsProductsPinned onBook={onBook} />;
}

Object.assign(window, { FsProducts, AutoDemo, BpmnMap });
