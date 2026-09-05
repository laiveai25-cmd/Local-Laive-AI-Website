/* Laive AI flagship — Contact mega-CTA, booking modal, footer. */
const { useEffect: useEffectK, useRef: useRefK } = React;
const DSK = window.LaiveAIDesignSystem_fa5676;
const Icon = window.FsIcon;

/* ================= CONTACT ================= */
function FsContact({ onBook }) {
  const { SectionLabel, Button } = DSK;
  const rows = [
    ['phone', FS_COPY.contact.phone],
    ['mail', FS_COPY.contact.mail],
    ['map-pin', FS_COPY.contact.addr],
  ];
  return (
    <section id="contact" data-hud="CONTACT" data-screen-label="Contact" style={{ padding: 'var(--section-y) 0 calc(var(--section-y) * 0.7)', scrollMarginTop: 70, position: 'relative', overflow: 'hidden' }}>
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, backgroundImage: 'var(--grad-halo)', opacity: 0.5 }}></div>
      <div className="fs-wrap contact-grid" style={{ position: 'relative', display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: 'clamp(34px, 5vw, 80px)', alignItems: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 26 }}>
          <FadeIn><SectionLabel>Contact Us For A Quick Demo</SectionLabel></FadeIn>
          <h2 className="cta-h1">
            <span className="ht-line"><FadeIn as="span" style={{ display: 'inline-block' }} className="txt-stroke-gold">Move</FadeIn></span>
            <span className="ht-line"><FadeIn as="span" delay={0.12} style={{ display: 'inline-block' }} className="text-gradient-gold">first.</FadeIn></span>
          </h2>
          <FadeIn delay={0.2}>
            <p style={{ margin: 0, fontSize: 16.5, lineHeight: 1.65, color: 'var(--text-muted)', maxWidth: 520 }}>
              Tell us where your operation loses money, time, or accuracy — we&rsquo;ll show you
              exactly what AI can recover, in a 30-minute demo.
            </p>
          </FadeIn>
          <FadeIn delay={0.3} style={{ display: 'flex', gap: 26, alignItems: 'center', flexWrap: 'wrap' }}>
            <Magnetic strength={0.4}>
              <button className="cta-circle" onClick={onBook}>
                <span className="ic" style={{ display: 'inline-flex' }}><Icon name="arrow-up-right" size={26} /></span>
                Book a demo
              </button>
            </Magnetic>
            <Button variant="outline" size="lg" as="a" href={`mailto:${FS_COPY.contact.mail}`}>Email us</Button>
          </FadeIn>
        </div>
        <FadeIn delay={0.15} className="gl gl-gold" style={{ borderRadius: 28 }}>
          <div style={{ padding: 'clamp(26px, 3vw, 40px)', display: 'flex', flexDirection: 'column', gap: 20 }}>
            {rows.map(([ic, t]) => (
              <div key={t} className="contact-row">
                <span style={{ width: 40, height: 44, flex: '0 0 auto', display: 'grid', placeItems: 'center', clipPath: 'var(--hex-clip)', background: 'var(--accent-soft)', border: '1px solid var(--border)', color: 'var(--accent)' }}>
                  <Icon name={ic} size={16} />
                </span>
                <span style={{ fontSize: 14.5, lineHeight: 1.5 }}>{t}</span>
              </div>
            ))}
            <div style={{ borderTop: '1px solid var(--border)', paddingTop: 18, display: 'flex', alignItems: 'center', gap: 10, fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.14em', color: 'var(--text-muted)' }}>
              <i className="demo-dot live" aria-hidden="true" style={{ flex: '0 0 auto' }}></i>
              RESPONSE WITHIN ONE BUSINESS DAY
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ================= BOOKING MODAL — Cal.com embed ================= */
function FsBookModal({ open, onClose }) {
  const { SectionLabel, Logo } = DSK;
  const closeRef = useRefK(null);
  useEffectK(() => {
    if (!open) return;
    const fn = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', fn);
    document.body.style.overflow = 'hidden';
    const t = setTimeout(() => { if (closeRef.current) closeRef.current.focus(); }, 60);
    return () => { window.removeEventListener('keydown', fn); document.body.style.overflow = ''; clearTimeout(t); };
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="modal-veil" role="dialog" aria-modal="true" aria-label="Book a demo" style={{
      position: 'fixed', inset: 0, zIndex: 280, display: 'grid', placeItems: 'center', padding: 'clamp(12px, 3vw, 26px)',
      background: 'rgba(7,6,5,0.6)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
    }} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="gl gl-gold modal-card" style={{ width: 'min(940px, 100%)', display: 'flex', flexDirection: 'column', borderRadius: 28, boxSizing: 'border-box' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 15, padding: '18px clamp(18px, 3vw, 28px)', borderBottom: '1px solid var(--border)' }}>
          <span style={{ flex: '0 0 auto', display: 'inline-flex' }}><Logo base={FS_ASSET} variant="gold" layout="mark" size={34} onError={fsImgFallback('mark-gold')} /></span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 3, minWidth: 0 }}>
            <SectionLabel>Book a demo</SectionLabel>
            <h3 style={{ margin: 0, fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 'clamp(17px, 2vw, 21px)', letterSpacing: '-0.01em', color: 'var(--text-strong)' }}>See your operation, AI-powered.</h3>
          </div>
          <button ref={closeRef} onClick={onClose} aria-label="Close" style={{ marginLeft: 'auto', flex: '0 0 auto', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.14)', borderRadius: 99, width: 44, height: 44, display: 'grid', placeItems: 'center', color: 'var(--text)', cursor: 'pointer' }}>
            <Icon name="x" size={17} />
          </button>
        </div>
        <div style={{ flex: 1, minHeight: 0, overflow: 'auto', padding: 'clamp(10px, 2vw, 18px)' }}>
          <FsCalInline />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', padding: '12px clamp(18px, 3vw, 28px)', borderTop: '1px solid var(--border-soft)', fontFamily: 'var(--font-mono)', fontSize: 10.5, letterSpacing: '0.14em', color: 'var(--text-subtle)' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 9 }}><i className="demo-dot live" aria-hidden="true"></i>SECURE SCHEDULING · CAL.COM</span>
          <a href={FS_CAL.url} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)', display: 'inline-flex', alignItems: 'center', gap: 6 }}>OPEN IN NEW TAB <Icon name="arrow-up-right" size={13} /></a>
        </div>
      </div>
    </div>
  );
}

/* ================= FOOTER ================= */
function FsFooter() {
  const { Logo } = DSK;
  const Icon = window.FsIcon;
  return (
    <footer data-screen-label="Footer" style={{ borderTop: '1px solid var(--border)', background: 'var(--ink-950)', overflow: 'hidden' }}>
      <div className="fs-wrap" style={{ padding: 'clamp(40px, 6vh, 64px) clamp(22px, 4.5vw, 64px) 0', display: 'flex', justifyContent: 'space-between', gap: 30, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 320 }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Logo base={FS_ASSET} variant="gold" layout="mark" size={30} onError={fsImgFallback('mark-gold')} />
            <Logo base={FS_ASSET} variant="wordmark" size={62} onError={fsImgFallback('wordmark-gold')} />
          </span>
          <p style={{ margin: 0, fontSize: 14, lineHeight: 1.65, color: 'var(--text-muted)' }}>
            Built to help you lead. Powered by data. Driven by AI.
          </p>
          <a href="https://www.instagram.com/laiveai/" target="_blank" rel="noopener noreferrer" aria-label="Laive AI on Instagram"
            className="ig-badge-link" style={{ display: 'inline-flex', alignItems: 'center', gap: 12, width: 'fit-content' }}>
            <span className="ig-badge">
              <Icon name="instagram" size={22} />
            </span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, letterSpacing: '0.08em', color: 'var(--gold-100)' }}>@laiveai</span>
          </a>
        </div>
        <div style={{ display: 'flex', gap: 'clamp(40px, 6vw, 100px)', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, letterSpacing: '0.22em', color: 'var(--text-subtle)' }}>EXPLORE</span>
            {FS_COPY.links.map(([l, h]) => (
              <a key={l} href={h} className="navlink" style={{ fontFamily: 'var(--font-body)', fontSize: 14, letterSpacing: 0, width: 'fit-content' }}>{l}</a>
            ))}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, letterSpacing: '0.22em', color: 'var(--text-subtle)' }}>CONTACT</span>
            <a href={`mailto:${FS_COPY.contact.mail}`} className="navlink" style={{ fontFamily: 'var(--font-body)', fontSize: 14, letterSpacing: 0, width: 'fit-content' }}>{FS_COPY.contact.mail}</a>
            <span style={{ fontSize: 14, color: 'var(--text-muted)' }}>{FS_COPY.contact.phone}</span>
            <span style={{ fontSize: 13, color: 'var(--text-subtle)', maxWidth: 240, lineHeight: 1.6 }}>{FS_COPY.contact.addr}</span>
          </div>
        </div>
      </div>
      <div className="foot-word-wrap">
        <a href="#top" className="foot-word" aria-label="Back to top">LAIVE&nbsp;AI</a>
      </div>
      <div className="fs-wrap" style={{ borderTop: '1px solid rgba(255,255,255,0.06)', marginTop: 'clamp(26px, 4vh, 44px)', padding: '20px clamp(22px, 4.5vw, 64px) 24px', display: 'flex', justifyContent: 'space-between', gap: 14, flexWrap: 'wrap', fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.12em', color: 'var(--text-subtle)' }}>
        <span>© 2026 LAIVE AI — F2 Akoya Residences, Kado, Abuja, Nigeria</span>
        <span>OUTCOME AS A SERVICE</span>
        <span>LAIVEAI.COM</span>
      </div>
    </footer>
  );
}

Object.assign(window, { FsContact, FsBookModal, FsFooter });
