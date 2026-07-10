/* Laive AI award site — Why, Stats, Process, Compliance, Quote, Contact, Modal, Footer. */
const { useState: useStateS, useEffect: useEffectS, useRef: useRefS } = React;
const DSS = window.LaiveAIDesignSystem_fa5676;

/* ================= WHY CHOOSE ================= */
function AwardWhy() {
  const { SectionLabel, Icon } = DSS;
  return (
    <section id="why" style={{ position: 'relative', padding: 'var(--section-y) 0' }}>
      <div aria-hidden className="bg-dots" style={{ position: 'absolute', inset: 0, opacity: 0.45 }} />
      <div className="award-wrap" style={{ position: 'relative' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, alignItems: 'center', textAlign: 'center', marginBottom: 48 }}>
          <Reveal><SectionLabel>Why Choose Laive AI</SectionLabel></Reveal>
          <Reveal delay={0.08}>
            <h2 style={{ margin: 0, fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 'clamp(30px, 4vw, 50px)', letterSpacing: '-0.02em', color: 'var(--text-strong)', maxWidth: 760 }}>
              The right AI to help you <span className="text-gradient-gold">dominate your industry</span>
            </h2>
          </Reveal>
        </div>
        <div className="why-grid2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
          {LAIVE_COPY.reasons.map((r, i) => (
            <Reveal key={r.index} delay={i * 0.08} className="lg lg-clear" style={{ padding: 30, borderRadius: 24, display: 'flex', gap: 20, alignItems: 'flex-start' }}>
              <span style={{ width: 48, height: 53, flex: '0 0 auto', display: 'grid', placeItems: 'center', clipPath: 'var(--hex-clip)', background: 'var(--accent-soft-2)', border: '1px solid var(--border-strong)', color: 'var(--accent)' }}>
                <Icon name={r.icon} size={21} />
              </span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 20, color: 'var(--accent)' }}>{r.index}.</span>
                  <h3 style={{ margin: 0, fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 19, color: 'var(--text-strong)' }}>{r.title}</h3>
                </div>
                <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.6, color: 'var(--text-muted)' }}>{r.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================= STATS ================= */
function AwardStats() {
  const [ref, inView] = useInView(0.5);
  const roi = useCountUp(60, inView, 1600);
  const items = [
    { big: `${roi}%`, label: 'Return on investment', sub: 'Realized by clients — up to 50–60%' },
    { big: '24/7', label: 'Always-on operation', sub: 'Agents that never sleep, never churn' },
    { big: '0', label: 'Hiring burden', sub: 'New capability, no new headcount' },
  ];
  return (
    <section ref={ref} style={{ padding: 'calc(var(--section-y) * 0.7) 0' }}>
      <div className="award-wrap">
        <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18 }}>
          {items.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.1} className="lg lg-clear" style={{ padding: '38px 34px', borderRadius: 26, display: 'flex', flexDirection: 'column', gap: 10 }}>
              <span className="copper-3d" style={{ fontSize: 'clamp(54px, 5.6vw, 84px)', lineHeight: 1 }}>{s.big}</span>
              <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 17, color: 'var(--text-strong)' }}>{s.label}</span>
              <span style={{ fontSize: 13.5, color: 'var(--text-muted)' }}>{s.sub}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================= PROCESS ================= */
function AwardProcess() {
  const { SectionLabel, Icon } = DSS;
  return (
    <section id="process" style={{ padding: 'var(--section-y) 0' }}>
      <div className="award-wrap">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 44 }}>
          <Reveal><SectionLabel>How We Work</SectionLabel></Reveal>
          <Reveal delay={0.08}>
            <h2 style={{ margin: 0, fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 'clamp(30px, 4vw, 50px)', letterSpacing: '-0.02em', color: 'var(--text-strong)' }}>
              A clear, proven process
            </h2>
          </Reveal>
        </div>
        <div className="process-grid4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
          {LAIVE_COPY.steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.1} className="lg" style={{ padding: 26, borderRadius: 22, display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ width: 44, height: 48, display: 'grid', placeItems: 'center', clipPath: 'var(--hex-clip)', background: 'var(--accent-soft-2)', border: '1px solid var(--border-strong)', color: 'var(--accent)' }}>
                  <Icon name={s.icon} size={19} />
                </span>
                <span className="copper-3d" style={{ fontSize: 30 }}>{'0' + (i + 1)}</span>
              </div>
              <h3 style={{ margin: 0, fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 18, color: 'var(--text-strong)' }}>{s.title}</h3>
              <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.6, color: 'var(--text-muted)' }}>{s.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================= COMPLIANCE STRIP ================= */
function AwardCompliance() {
  const items = [...LAIVE_COPY.frameworks, ...LAIVE_COPY.frameworks];
  const cell = (f, k) => (
    <span key={k} style={{ display: 'inline-flex', alignItems: 'center', gap: 18, padding: '0 34px', fontFamily: 'var(--font-mono)', fontSize: 15, letterSpacing: '0.06em', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
      <span aria-hidden style={{ width: 11, height: 12, clipPath: 'var(--hex-clip)', background: 'var(--accent)', opacity: 0.75, flex: '0 0 auto' }} />
      {f}
    </span>
  );
  return (
    <section aria-label="AI governance frameworks" style={{ padding: '10px 0 calc(var(--section-y) * 0.5)' }}>
      <div className="award-wrap" style={{ textAlign: 'center', marginBottom: 20 }}>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: 11, letterSpacing: 'var(--ls-label)', textTransform: 'uppercase', color: 'var(--text-subtle)' }}>
          Governed by recognised AI frameworks
        </span>
      </div>
      <div className="marq" style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '18px 0' }}>
        <div className="marq-track">
          {[0, 1].map((half) => (
            <div key={half} aria-hidden={half === 1} style={{ display: 'flex' }}>
              {items.map((f, k) => cell(f, `${half}-${k}`))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================= QUOTE ================= */
function AwardQuote() {
  return (
    <section style={{ padding: 'var(--section-y) 0', position: 'relative', overflow: 'hidden' }}>
      <div aria-hidden style={{ position: 'absolute', inset: 0, backgroundImage: 'var(--grad-halo)', opacity: 0.7 }} />
      <div className="award-wrap" style={{ position: 'relative', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 26 }}>
        <Reveal>
          <span aria-hidden className="copper-3d" style={{ fontSize: 90, lineHeight: 0.6, display: 'block', transform: 'translateY(18px)' }}>&ldquo;</span>
        </Reveal>
        <Reveal delay={0.1}>
          <blockquote style={{ margin: 0, fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 'clamp(34px, 5.4vw, 72px)', letterSpacing: '-0.025em', lineHeight: 1.08, color: 'var(--text-strong)', maxWidth: 900 }}>
            AI is <span className="text-gradient-gold">underhyped.</span>
          </blockquote>
        </Reveal>
        <Reveal delay={0.2}>
          <cite style={{ fontStyle: 'normal', fontFamily: 'var(--font-mono)', fontSize: 14, color: 'var(--text-muted)' }}>
            — Eric Schmidt, former CEO, Google
          </cite>
        </Reveal>
        <Reveal delay={0.3}>
          <p style={{ margin: 0, fontSize: 16.5, lineHeight: 1.65, color: 'var(--text-muted)', maxWidth: 560 }}>
            The question isn&rsquo;t <em>if</em> AI will reshape your market — it&rsquo;s <strong style={{ color: 'var(--text)' }}>who moves first.</strong>
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ================= CONTACT / CTA ================= */
function AwardContact({ onBook }) {
  const { SectionLabel, Button, Icon } = DSS;
  const rows = [
    ['phone', '+234 903 877 0939'],
    ['mail', 'info@laiveai.com'],
    ['map-pin', '6a Surame Rd, City Centre, Kaduna, Nigeria'],
  ];
  return (
    <section id="contact" style={{ padding: 'calc(var(--section-y) * 0.6) 0 var(--section-y)' }}>
      <div className="award-wrap">
        <Reveal className="lg lg-gold lg-live" style={{ borderRadius: 32 }}>
          <div className="contact-grid2" style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr' }}>
            <div style={{ padding: 'clamp(30px, 4vw, 54px)', display: 'flex', flexDirection: 'column', gap: 20 }}>
              <SectionLabel>Contact Us For A Quick Demo</SectionLabel>
              <h2 style={{ margin: 0, fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 'clamp(30px, 3.6vw, 46px)', letterSpacing: '-0.02em', color: 'var(--text-strong)' }}>
                It&rsquo;s 2026. AI adoption is no longer optional.
              </h2>
              <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: 16, lineHeight: 1.65, maxWidth: 520 }}>
                Tell us where your operation loses money, time, or accuracy — we&rsquo;ll show you exactly what AI can recover, in a 30-minute demo.
              </p>
              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 6 }}>
                <Button size="lg" onClick={onBook} iconRight={<Icon name="arrow-right" size={18} />}>Book a demo</Button>
                <Button size="lg" variant="outline" as="a" href="mailto:hassan@laiveai.com">Email us</Button>
              </div>
            </div>
            <div style={{ padding: 'clamp(30px, 4vw, 54px)', borderLeft: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: 18, justifyContent: 'center', background: 'rgba(0,0,0,0.18)' }}>
              {rows.map(([ic, t]) => (
                <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 15, color: 'var(--text)' }}>
                  <span style={{ width: 38, height: 42, flex: '0 0 auto', display: 'grid', placeItems: 'center', clipPath: 'var(--hex-clip)', background: 'var(--accent-soft)', border: '1px solid var(--border)', color: 'var(--accent)' }}>
                    <Icon name={ic} size={16} />
                  </span>
                  {t}
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ================= BOOKING MODAL (prototype) ================= */
function BookingModal({ open, onClose }) {
  const { Button, Icon, Input, SectionLabel } = DSS;
  const [sent, setSent] = useStateS(false);
  const [product, setProduct] = useStateS('Laive Engage');
  useEffectS(() => {
    if (!open) return;
    const fn = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', fn);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', fn); document.body.style.overflow = ''; };
  }, [open, onClose]);
  useEffectS(() => { if (open) setSent(false); }, [open]);
  if (!open) return null;
  const options = ['Laive Engage', 'Laive Assist', 'Laive Automation Suite', 'Not sure yet'];
  return (
    <div className="modal-veil" role="dialog" aria-modal="true" aria-label="Book a demo" style={{
      position: 'fixed', inset: 0, zIndex: 200, display: 'grid', placeItems: 'center', padding: 20,
      background: 'rgba(7,6,5,0.55)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)',
    }} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="lg lg-gold modal-card" style={{ width: 'min(480px, 100%)', borderRadius: 28, padding: 'clamp(26px, 4vw, 40px)', boxSizing: 'border-box' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 18 }}>
          <SectionLabel>Book A Demo</SectionLabel>
          <button onClick={onClose} aria-label="Close" style={{ background: 'none', border: '1px solid var(--border-soft)', borderRadius: 99, width: 34, height: 34, display: 'grid', placeItems: 'center', color: 'var(--text-muted)', cursor: 'pointer' }}>
            <Icon name="x" size={16} />
          </button>
        </div>
        {sent ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 14, padding: '26px 0 10px' }}>
            <span style={{ width: 62, height: 68, display: 'grid', placeItems: 'center', clipPath: 'var(--hex-clip)', background: 'var(--grad-gold)', color: 'var(--text-on-gold)', boxShadow: 'var(--glow-gold)' }}>
              <Icon name="check" size={30} />
            </span>
            <h3 style={{ margin: 0, fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 24, color: 'var(--text-strong)' }}>Request received</h3>
            <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: 14.5, lineHeight: 1.6 }}>We&rsquo;ll reach out within one business day to schedule your 30-minute demo.</p>
            <Button style={{ marginTop: 8 }} onClick={onClose}>Done</Button>
          </div>
        ) : (
          <form style={{ display: 'flex', flexDirection: 'column', gap: 15 }} onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
            <h3 style={{ margin: '0 0 2px', fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 24, letterSpacing: '-0.01em', color: 'var(--text-strong)' }}>
              See your operation, AI-powered.
            </h3>
            <Input label="Full name" placeholder="Ada Obi" icon={<Icon name="user" size={16} />} required />
            <Input label="Work email" type="email" placeholder="you@company.com" icon={<Icon name="mail" size={16} />} required />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-muted)' }}>I&rsquo;m interested in</span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {options.map((o) => (
                  <button key={o} type="button" onClick={() => setProduct(o)} style={{
                    cursor: 'pointer', padding: '8px 14px', borderRadius: 99, fontSize: 13, fontFamily: 'var(--font-body)',
                    background: product === o ? 'var(--accent-soft-2)' : 'rgba(255,255,255,0.04)',
                    border: `1px solid ${product === o ? 'var(--border-strong)' : 'var(--border-soft)'}`,
                    color: product === o ? 'var(--accent-hover)' : 'var(--text-muted)',
                    transition: 'all var(--dur-fast) var(--ease-out)',
                  }}>{o}</button>
                ))}
              </div>
            </div>
            <Button as="button" full size="lg" iconRight={<Icon name="arrow-right" size={17} />}>Connect with us today</Button>
            <p style={{ margin: 0, fontSize: 12, color: 'var(--text-subtle)', textAlign: 'center' }}>Prototype — no data is sent.</p>
          </form>
        )}
      </div>
    </div>
  );
}

/* ================= FOOTER ================= */
function AwardFooter() {
  const { Logo } = DSS;
  return (
    <footer style={{ borderTop: '1px solid var(--border)', padding: '44px 0 40px', background: 'var(--ink-950)' }}>
      <div className="award-wrap foot-grid" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 22, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Logo base={'../../assets/'} variant="gold" layout="mark" size={30} />
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 13, letterSpacing: '0.08em', color: 'var(--text-strong)' }}>LAIVE&nbsp;AI</span>
        </div>
        <span style={{ fontSize: 13.5, color: 'var(--text-muted)' }}>Built to help you lead. Powered by data. Driven by AI.</span>
        <span style={{ fontSize: 13, color: 'var(--text-subtle)' }}>© 2026 Laive AI · Kaduna, Nigeria · laiveai.com</span>
      </div>
    </footer>
  );
}

Object.assign(window, { AwardWhy, AwardStats, AwardProcess, AwardCompliance, AwardQuote, AwardContact, BookingModal, AwardFooter });
