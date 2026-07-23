/* Laive AI flagship — Why (spotlight cards), Stats, Process (beam), Quote (scrub). */
const { useState: useStateS, useEffect: useEffectS, useRef: useRefS } = React;
const DSS2 = window.LaiveAIDesignSystem_fa5676;
const Icon = window.FsIcon;

/* ================= WHY — spotlight cards ================= */
function FsSpotCard({ r, delay }) {
  const ref = useRefS(null);
  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    el.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    el.style.setProperty('--my', `${e.clientY - rect.top}px`);
    if ((window.__fsMo ?? 1) === 0) return;
    const MAX = 9;
    el.style.setProperty('--ry', `${((px - 0.5) * 2 * MAX).toFixed(2)}deg`);
    el.style.setProperty('--rx', `${(-(py - 0.5) * 2 * MAX).toFixed(2)}deg`);
  };
  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty('--rx', '0deg');
    el.style.setProperty('--ry', '0deg');
  };
  return (
    <FadeIn delay={delay} style={{ height: '100%' }}>
      <div ref={ref} className="spot" onMouseMove={onMove} onMouseLeave={onLeave}
        data-cursor="label" data-cursor-label={r.i}>
        <div className="spot-in">
          <div className="spot-row">
            <span className="spot-ic"><Icon name={r.icon} size={22} /></span>
            <span className="spot-num">{r.i}</span>
          </div>
          <h3 className="spot-title">{r.title}</h3>
          <p className="spot-text">{r.text}</p>
        </div>
      </div>
    </FadeIn>
  );
}

function FsWhy() {
  const { SectionLabel } = DSS2;
  return (
    <section id="why" data-hud="WHY LAIVE" data-screen-label="Why Laive" style={{ padding: 'var(--section-y) 0', scrollMarginTop: 70 }}>
      <div className="fs-wrap">
        <div className="sec-head" style={{ alignItems: 'center', textAlign: 'center', marginBottom: 52 }}>
          <FadeIn><SectionLabel>Why Choose Laive AI</SectionLabel></FadeIn>
          <FadeIn delay={0.08}>
            <h2 className="sec-h2" style={{ maxWidth: 780, margin: '0 auto' }}>
              The right AI to help you <span className="text-gradient-gold">dominate your industry</span>
            </h2>
          </FadeIn>
        </div>
        <div className="why-grid">
          {FS_COPY.reasons.map((r, i) => <FsSpotCard key={r.i} r={r} delay={i * 0.07} />)}
        </div>
      </div>
    </section>
  );
}

/* ================= STATS ================= */
function FsStats() {
  const { SectionLabel } = DSS2;
  const [ref, inView] = useInViewFs(0.4);
  const roi = useCountUpFs(60, inView, 1700);
  const rows = [
    ['24/7', 'Always-on operation', 'Agents that never sleep, never churn, never call in sick.'],
    ['0', 'New hires required', 'New capability with zero recruiting burden.'],
    ['4', 'Governance frameworks', 'EU AI Act · IEEE 7000 · NIST AI RMF · ISO/IEC 42001'],
  ];
  return (
    <section id="numbers" ref={ref} data-hud="NUMBERS" data-screen-label="Numbers" style={{ padding: 'var(--section-y) 0 0', scrollMarginTop: 70 }}>
      <div className="fs-wrap stats-grid" style={{ marginBottom: 'clamp(40px, 6vh, 70px)' }}>
        <FadeIn>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <SectionLabel>The Numbers</SectionLabel>
            <span className="stat-mega text-3d-copper">{roi}%</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12.5, letterSpacing: '0.16em', color: 'var(--text-muted)', maxWidth: 420, lineHeight: 1.9 }}>
              UP TO 50–60% RETURN ON INVESTMENT, REALIZED BY CLIENTS
            </span>
          </div>
        </FadeIn>
        <div>
          {rows.map(([v, t, s], i) => (
            <FadeIn key={t} delay={i * 0.09}>
              <div className="stat-row">
                <span className="v">{v}</span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                  <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 17, color: 'var(--text-strong)' }}>{t}</span>
                  <span style={{ fontSize: 13.5, color: 'var(--text-muted)' }}>{s}</span>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
      <FadeIn>
        <div style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
          <FsTicker small items={[...FS_COPY.frameworks, ...FS_COPY.frameworks]} ariaLabel="AI governance frameworks" />
        </div>
      </FadeIn>
    </section>
  );
}

/* ================= PROCESS — scroll beam ================= */
function FsProcess() {
  const { SectionLabel } = DSS2;
  const wrapRef = useRefS(null);
  const fillRef = useRefS(null);
  const stepRefs = useRefS([]);
  const m = useMeasure(wrapRef);
  const onStates = useRefS([false, false, false, false]);

  useScrollFrame((y) => {
    const el = wrapRef.current;
    if (!el) return;
    const vh = window.innerHeight;
    const p = clamp01((y + vh * 0.72 - m.current.top) / Math.max(1, m.current.h));
    if (fillRef.current) fillRef.current.style.transform = `scaleY(${p.toFixed(4)})`;
    FS_COPY.steps.forEach((_, i) => {
      const on = p > (i + 0.35) / 4;
      if (on !== onStates.current[i]) {
        onStates.current[i] = on;
        const node = stepRefs.current[i];
        if (node) node.classList.toggle('on', on);
      }
    });
  });

  return (
    <section id="process" data-hud="PROCESS" data-screen-label="Process" style={{ padding: 'var(--section-y) 0', scrollMarginTop: 70 }}>
      <div className="fs-wrap proc-grid">
        <div className="proc-left">
          <div className="sec-head">
            <FadeIn><SectionLabel>How We Work</SectionLabel></FadeIn>
            <FadeIn delay={0.08}><h2 className="sec-h2">A clear, proven process</h2></FadeIn>
            <FadeIn delay={0.16}>
              <p style={{ margin: 0, fontSize: 16, lineHeight: 1.65, color: 'var(--text-muted)', maxWidth: 420 }}>
                From first audit to continuous optimization — we carry the risk of implementation so you keep the upside.
              </p>
            </FadeIn>
          </div>
        </div>
        <div className="proc-steps" ref={wrapRef}>
          <div className="proc-beam" aria-hidden="true"><div className="proc-fill" ref={fillRef}></div></div>
          {FS_COPY.steps.map((s, i) => (
            <div key={s.title} className="proc-step" ref={(el) => { stepRefs.current[i] = el; }}>
              <span className="proc-node" aria-hidden="true"></span>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 8 }}>
                <span className="text-3d-copper" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(26px, 2.6vw, 36px)' }}>0{i + 1}</span>
                <h3 style={{ margin: 0, fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 'clamp(19px, 2vw, 24px)', color: 'var(--text-strong)' }}>{s.title}</h3>
                <span style={{ marginLeft: 'auto', color: 'var(--accent)', display: 'inline-flex' }}><Icon name={s.icon} size={18} /></span>
              </div>
              <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.65, color: 'var(--text-muted)', maxWidth: 520 }}>{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================= CLIENTS — logo marquee ================= */
const FS_CLIENTS = [
  ['aerofocus', 'AeroFocus'], ['alxal', 'ALXAL'], ['ocean', 'Ocean'],
  ['jdaniya', 'J Daniya Luxury Textile'], ['flybird', 'Flybird'], ['vision', 'Vision Concept Aviation'],
  ['yoshi', 'Yoshi Football Academy'], ['house10', 'House 10 Apartments'], ['smn', 'SMN Motorsport'],
];

function FsClientRow({ items }) {
  const trackRef = useRefS(null);
  const stRef = useRefS({ x: 0, w: 0, last: 0, paused: false });

  useEffectS(() => {
    const track = trackRef.current;
    if (!track) return;
    const st = stRef.current;
    const n = items.length;
    /* Seamless loop distance = offset from the 1st chip to the 1st chip of the
       duplicate half (includes the inter-chip gap, so it's exact). */
    const measure = () => {
      const chips = track.children;
      if (chips.length > n) st.w = chips[n].offsetLeft - chips[0].offsetLeft;
    };
    measure();
    const t1 = setTimeout(measure, 400);
    const t2 = setTimeout(measure, 1500);
    window.addEventListener('resize', measure);
    track.querySelectorAll('img').forEach((img) => {
      if (!img.complete) img.addEventListener('load', measure, { once: true });
    });

    let raf = 0;
    const loop = (now) => {
      raf = requestAnimationFrame(loop);
      const dt = Math.min(50, now - (st.last || now));
      st.last = now;
      /* Gated on the Motion tweak (window.__fsMo). Hover-pause + the Motion
         toggle are the pause mechanisms, so it stays lively by default. */
      const mo = window.__fsMo ?? 1;
      if (!mo || !st.w || st.paused) return;
      st.x -= 55 * mo * (dt / 1000);       /* px/sec, scaled by motion tweak */
      if (st.x <= -st.w) st.x += st.w;      /* wrap seamlessly */
      track.style.transform = `translate3d(${st.x.toFixed(2)}px,0,0)`;
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t1); clearTimeout(t2);
      window.removeEventListener('resize', measure);
    };
  }, [items]);

  const pause = (v) => () => { stRef.current.paused = v; };

  return (
    <div className="cl-strip">
      <div className="cl-marquee" onMouseEnter={pause(true)} onMouseLeave={pause(false)} onTouchEnd={pause(false)}>
        <div className="cl-track" ref={trackRef}>
          {[0, 1].map((half) => items.map(([slug, name], k) => (
            <div className="cl-chip" key={`${half}-${slug}-${k}`} aria-hidden={half === 1 ? true : undefined}>
              <img src={`assets/clients/${slug}.png`} alt={half === 0 ? name : ''} loading="lazy" onError={fsImgFallback(`clients/${slug}`)} />
            </div>
          )))}
        </div>
      </div>
    </div>
  );
}

function FsClients() {
  const { SectionLabel } = DSS2;
  return (
    <section id="clients" data-hud="CLIENTS" data-screen-label="Clients" style={{ padding: 'var(--section-y) 0', scrollMarginTop: 70 }}>
      <div className="fs-wrap">
        <div className="sec-head" style={{ marginBottom: 44 }}>
          <FadeIn><SectionLabel>Some of Our Clients</SectionLabel></FadeIn>
          <FadeIn delay={0.08}><h2 className="sec-h2">Teams that already moved first</h2></FadeIn>
        </div>
      </div>
      <FadeIn delay={0.14}>
        <FsClientRow items={FS_CLIENTS} />
      </FadeIn>
    </section>
  );
}

/* ================= QUOTE — scroll-scrubbed manifesto ================= */
const FS_QUOTE = "It's 2026. AI adoption is no longer optional. The question isn't if AI will reshape your market — it's who moves first.";
const FS_HL_FROM = FS_QUOTE.split(' ').length - 3; /* highlight "who moves first." */

function FsQuote() {
  const wrapRef = useRefS(null);
  const wordRefs = useRefS([]);
  const citeRef = useRefS(null);
  const m = useMeasure(wrapRef);
  const words = FS_QUOTE.split(' ');
  const lastN = useRefS(-1);

  useScrollFrame((y) => {
    const vh = window.innerHeight;
    const p = clamp01((y - m.current.top) / Math.max(1, m.current.h - vh));
    const n = Math.floor(p * (words.length + 4));
    if (n === lastN.current) return;
    lastN.current = n;
    words.forEach((_, i) => {
      const el = wordRefs.current[i];
      if (el) el.classList.toggle('on', i < n);
    });
    if (citeRef.current) citeRef.current.style.opacity = p > 0.88 ? 1 : 0;
  });

  return (
    <section className="quote-wrap" ref={wrapRef} data-hud="THE THESIS" data-screen-label="Thesis">
      <div className="quote-sticky">
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'var(--grad-halo)', opacity: 0.55, pointerEvents: 'none' }} aria-hidden="true"></div>
        <div className="fs-wrap" style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 34 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.24em', color: 'var(--accent)' }}>THE THESIS</span>
          <p className="qw">
            {words.map((w, i) => (
              <span key={i} ref={(el) => { wordRefs.current[i] = el; }}
                className={'w' + (i >= FS_HL_FROM ? ' hl' : '')}>{w}{' '}</span>
            ))}
          </p>
          <span ref={citeRef} style={{ fontFamily: 'var(--font-mono)', fontSize: 13, letterSpacing: '0.1em', color: 'var(--text-muted)', opacity: 0, transition: 'opacity 0.6s var(--ease-out)' }}>
            “AI IS UNDERHYPED.” — ERIC SCHMIDT, FORMER CEO, GOOGLE
          </span>
        </div>
      </div>
    </section>
  );
}

/* ================= TESTIMONIALS ================= */
const FS_TESTIMONIALS = [
  {
    q: 'Invoicing used to be something I had to sit down and do manually — every client, every month. Laive AI automated the whole thing. Now it just runs. I get my time back, the numbers are always right, and I look more professional to my clients without spending a fortune.',
    name: 'Engr. Abbas J', role: 'Founder — Alxal Nigeria Limited', ini: 'AJ',
  },
  {
    q: 'We used to lose real time on processing leads via WhatsApp. Laive AI put a system in place that handles most of it for us — quotes go out faster, and my team can focus on the customer instead of driving conversations.',
    name: 'Capt. Amir G', role: 'Deputy MD — Flybird', ini: 'AG', site: 'flybird.aero',
  },
  {
    q: 'Parents look at your website before they trust you with their child. Our old one didn’t do justice to what we do on the pitch. Laive AI rebuilt it properly — enquiries have gone up, we’re taken more seriously, and I didn’t have to break the bank to get there.',
    name: 'Coach Ahmad G', role: 'Founder & Head Coach — Yoshi Football Academy', ini: 'AG', site: 'yoshifa.com',
  },
];

function FsTestimonials() {
  const { SectionLabel } = DSS2;
  return (
    <section id="testimonials" data-hud="TESTIMONIALS" data-screen-label="Testimonials" style={{ padding: 'var(--section-y) 0', scrollMarginTop: 70 }}>
      <div className="fs-wrap">
        <div className="sec-head" style={{ alignItems: 'center', textAlign: 'center', marginBottom: 52 }}>
          <FadeIn><SectionLabel>What Clients Say</SectionLabel></FadeIn>
          <FadeIn delay={0.08}>
            <h2 className="sec-h2" style={{ maxWidth: 720, margin: '0 auto' }}>
              Results, <span className="text-gradient-gold">in their words</span>
            </h2>
          </FadeIn>
        </div>
        <div className="tst-grid">
          {FS_TESTIMONIALS.map((t, i) => (
            <FadeIn key={t.ini} delay={i * 0.09} style={{ height: '100%' }}>
              <figure className="gl tst-card">
                <span className="tst-mark" aria-hidden="true">“</span>
                <blockquote className="tst-text">{t.q}</blockquote>
                <figcaption className="tst-foot">
                  <span className="tst-ava" aria-hidden="true">{t.ini}</span>
                  <span style={{ display: 'flex', flexDirection: 'column', gap: 3, minWidth: 0 }}>
                    <span className="tst-name">{t.name}</span>
                    <span className="tst-role">{t.role}</span>
                    {t.site && (
                      <a className="tst-site" href={`https://${t.site}`} target="_blank" rel="noopener noreferrer">
                        {t.site} <Icon name="arrow-up-right" size={11} />
                      </a>
                    )}
                  </span>
                </figcaption>
              </figure>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { FsWhy, FsStats, FsProcess, FsClients, FsQuote, FsTestimonials });
