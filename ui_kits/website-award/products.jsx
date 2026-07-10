/* Laive AI award site — Products: scroll-pinned horizontal stack (desktop),
   expand-on-scroll cards (mobile). */
const { useState: useStateP, useEffect: useEffectP, useRef: useRefP } = React;
const DSP = window.LaiveAIDesignSystem_fa5676;

/* ---------- shared card body ---------- */
function ProductCardBody({ p, expanded = true, big = false }) {
  const { Icon } = DSP;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: big ? 20 : 14, height: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16 }}>
        <span style={{
          width: big ? 56 : 46, height: big ? 62 : 51, display: 'grid', placeItems: 'center',
          clipPath: 'var(--hex-clip)', background: 'var(--accent-soft-2)',
          border: '1px solid var(--border-strong)', color: 'var(--accent)', flex: '0 0 auto',
        }}>
          <Icon name={p.icon} size={big ? 26 : 21} />
        </span>
        <span aria-hidden className="copper-3d" style={{ fontSize: big ? 'clamp(64px, 7vw, 96px)' : 54, lineHeight: 1 }}>{p.index}</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: 20, letterSpacing: 'var(--ls-label)', textTransform: 'uppercase', color: 'var(--accent)' }}>{p.tag}</span>
        <h3 style={{ margin: 0, fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: big ? 'clamp(28px, 2.8vw, 40px)' : 24, letterSpacing: '-0.02em', color: 'var(--text-strong)' }}>{p.name}</h3>
        <p style={{ margin: 0, fontSize: big ? 16 : 14.5, lineHeight: 1.6, color: 'var(--text-muted)', maxWidth: 480 }}>{p.lead}</p>
      </div>
      <div style={{
        overflow: 'hidden',
        maxHeight: expanded ? 400 : 0,
        opacity: expanded ? 1 : 0,
        transition: 'max-height 0.6s var(--ease-out), opacity 0.5s var(--ease-out)',
        display: 'flex', flexDirection: 'column', gap: 16, marginTop: 'auto',
      }}>
        <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'grid', gridTemplateColumns: big ? '1fr 1fr' : '1fr', gap: '10px 22px' }}>
          {p.caps.map((c) => (
            <li key={c} style={{ display: 'flex', gap: 9, alignItems: 'flex-start', fontSize: 14, color: 'var(--text)', lineHeight: 1.45 }}>
              <span style={{ color: 'var(--accent)', display: 'flex', marginTop: 2 }}><Icon name="check" size={15} /></span>{c}
            </li>
          ))}
        </ul>
        <div style={{
          alignSelf: 'flex-start', display: 'inline-flex', alignItems: 'center', gap: 8,
          padding: '9px 16px', borderRadius: 999,
          background: 'var(--accent-soft)', border: '1px solid var(--border-strong)',
          fontFamily: 'var(--font-mono)', fontSize: 12.5, color: 'var(--accent-hover)',
        }}>
          <Icon name="trending-up" size={14} />{p.outcome}
        </div>
      </div>
    </div>
  );
}

/* ---------- desktop: pinned horizontal stack ---------- */
function ProductsPinned() {
  const { SectionLabel } = DSP;
  const secRef = useRefP(null);
  const cardRefs = useRefP([]);
  const barRef = useRefP(null);
  const [active, setActive] = useStateP(0);
  const activeRef = useRefP(0);

  useEffectP(() => {
    let raf = null;
    const update = () => {
      raf = null;
      const el = secRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      const prog = Math.min(1, Math.max(0, -r.top / total));
      const cardW = Math.min(720, window.innerWidth * 0.6);
      const step = cardW + 48;
      const S = prog * 2 * step;

      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        const raw = i * step - S;
        let x, scale, opacity;
        if (raw >= 0) {
          x = raw;
          scale = 1 - Math.min(raw / step, 2) * 0.035;
          opacity = 1 - Math.min(raw / (step * 2.4), 1) * 0.45;
        } else {
          const d = -raw / step;
          x = raw * 0.14;
          scale = 1 - d * 0.055;
          opacity = 1 - d * 0.22;
        }
        card.style.width = cardW + 'px';
        card.style.marginLeft = -cardW / 2 + 'px';
        card.style.transform = `translate3d(${x.toFixed(1)}px, 0, 0) scale(${scale.toFixed(3)})`;
        card.style.opacity = Math.max(0, opacity).toFixed(3);
      });
      if (barRef.current) barRef.current.style.width = (prog * 100).toFixed(1) + '%';

      const next = Math.min(2, Math.max(0, Math.round(S / step)));
      if (next !== activeRef.current) { activeRef.current = next; setActive(next); }
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const cardW = Math.min(720, window.innerWidth * 0.6);

  return (
    <section id="products" ref={secRef} style={{ position: 'relative', height: '340vh' }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div aria-hidden style={{ position: 'absolute', inset: 0, backgroundImage: 'var(--grad-halo)', opacity: 0.6 }} />
        <div className="award-wrap" style={{ width: '100%', boxSizing: 'border-box', position: 'relative', marginBottom: 30 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 24, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <SectionLabel>Our AI Products</SectionLabel>
              <h2 style={{ margin: 0, fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 'clamp(30px, 3.6vw, 48px)', letterSpacing: '-0.02em', color: 'var(--text-strong)' }}>
                Three ways we put AI to work
              </h2>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--text-muted)' }}>
                0{active + 1} <span style={{ color: 'var(--text-subtle)' }}>/ 03</span>
              </span>
              <div style={{ width: 130, height: 2, background: 'rgba(255,255,255,0.12)', borderRadius: 2, overflow: 'hidden' }}>
                <div ref={barRef} style={{ width: '0%', height: '100%', background: 'var(--grad-gold)' }} />
              </div>
            </div>
          </div>
        </div>

        <div style={{ position: 'relative', height: 'min(60vh, 560px)' }}>
          {LAIVE_COPY.products.map((p, i) => (
            <div key={p.index} ref={(el) => { cardRefs.current[i] = el; }} className="lg lg-gold pcard" style={{
              position: 'absolute', top: 0, left: '50%', height: '100%',
              width: cardW, marginLeft: -cardW / 2, boxSizing: 'border-box',
              padding: 'clamp(26px, 3vw, 44px)',
              transform: `translate3d(${i * (cardW + 48)}px, 0, 0)`,
              willChange: 'transform, opacity',
              zIndex: 10 + i,
              borderRadius: 30,
            }}>
              <ProductCardBody p={p} big expanded={i === active} />
            </div>
          ))}
        </div>

        <div className="award-wrap" style={{ width: '100%', boxSizing: 'border-box', marginTop: 26, display: 'flex', justifyContent: 'center', gap: 10 }}>
          {[0, 1, 2].map((i) => (
            <span key={i} style={{
              width: i === active ? 26 : 8, height: 8, borderRadius: 99,
              background: i === active ? 'var(--accent)' : 'rgba(255,255,255,0.18)',
              transition: 'all var(--dur-base) var(--ease-out)',
            }} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- mobile: expand one at a time on scroll ---------- */
function ProductsMobile() {
  const { SectionLabel } = DSP;
  const refs = useRefP([]);
  const [active, setActive] = useStateP(0);

  useEffectP(() => {
    let raf = null;
    const update = () => {
      raf = null;
      const mid = window.innerHeight / 2;
      let best = 0, bestD = Infinity;
      refs.current.forEach((el, i) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        const d = Math.abs(r.top + r.height / 2 - mid);
        if (d < bestD) { bestD = d; best = i; }
      });
      setActive(best);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); if (raf) cancelAnimationFrame(raf); };
  }, []);

  return (
    <section id="products" style={{ padding: 'var(--section-y) 0' }}>
      <div className="award-wrap" style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 34 }}>
        <SectionLabel>Our AI Products</SectionLabel>
        <h2 style={{ margin: 0, fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 'clamp(30px, 7vw, 40px)', letterSpacing: '-0.02em', color: 'var(--text-strong)' }}>
          Three ways we put AI to work
        </h2>
      </div>
      <div className="award-wrap" style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        {LAIVE_COPY.products.map((p, i) => (
          <div key={p.index} ref={(el) => { refs.current[i] = el; }} className="lg lg-gold" style={{
            padding: 24, borderRadius: 24,
            transform: active === i ? 'scale(1)' : 'scale(0.975)',
            transition: 'transform 0.5s var(--ease-out)',
          }}>
            <ProductCardBody p={p} expanded={active === i} />
          </div>
        ))}
      </div>
    </section>
  );
}

function AwardProducts() {
  const desk = useMedia('(min-width: 861px)');
  return desk ? <ProductsPinned /> : <ProductsMobile />;
}

Object.assign(window, { AwardProducts });
