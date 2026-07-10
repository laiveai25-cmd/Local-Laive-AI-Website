/* Laive AI flagship — Nav, menu overlay, hero, kinetic ticker. */
const { useState: useStateH, useEffect: useEffectH, useRef: useRefH } = React;
const DSH = window.LaiveAIDesignSystem_fa5676;
const Icon = window.FsIcon;
const FS_ASSET = '../../assets/';

/* ================= NAV ================= */
function FsNav({ onBook, onMenu }) {
  const { Logo, Button } = DSH;
  const [scrolled, setScrolled] = useStateH(false);
  const sRef = useRefH(false);
  useScrollFrame((y, v, raw) => {
    const on = raw > 40;
    if (on !== sRef.current) { sRef.current = on; setScrolled(on); }
  });
  return (
    <header className={'fs-nav' + (scrolled ? ' scrolled' : '')}>
      <div className="fs-nav-bg" aria-hidden="true"></div>
      <a href="#top" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <Logo base={FS_ASSET} variant="gold" layout="mark" size={30} onError={fsImgFallback('mark-gold')} />
        <span style={{ fontFamily: 'var(--font-display)', fontSize: 13, letterSpacing: '0.1em', color: 'var(--text-strong)' }}>LAIVE&nbsp;AI</span>
      </a>
      <nav className="nav-links">
        {FS_COPY.links.map(([l, h]) => (
          <a key={l} href={h} className="navlink"><Scramble text={l.toUpperCase()} /></a>
        ))}
      </nav>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <Magnetic strength={0.25}>
          <Button size="sm" onClick={onBook} iconRight={<Icon name="arrow-right" size={14} />}>Book a demo</Button>
        </Magnetic>
        <button className="nav-menu-btn" onClick={onMenu} aria-label="Open menu" style={{
          background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: 99, width: 44, height: 44, alignItems: 'center', justifyContent: 'center',
          color: 'var(--text)', cursor: 'pointer',
        }}>
          <Icon name="menu" size={17} />
        </button>
      </div>
    </header>
  );
}

/* ================= MENU OVERLAY ================= */
function FsMenu({ open, onClose, onBook }) {
  const { Button } = DSH;
  useEffectH(() => {
    if (!open) return;
    const fn = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', fn);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', fn); document.body.style.overflow = ''; };
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="menu-veil" role="dialog" aria-modal="true" aria-label="Menu">
      <button onClick={onClose} aria-label="Close menu" style={{
        position: 'absolute', top: 20, right: 22, width: 44, height: 44, borderRadius: 99,
        background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.14)',
        display: 'grid', placeItems: 'center', color: 'var(--text)', cursor: 'pointer',
      }}>
        <Icon name="x" size={18} />
      </button>
      <nav style={{ display: 'flex', flexDirection: 'column' }}>
        {FS_COPY.links.map(([l, h], i) => (
          <a key={l} href={h} className="menu-link" style={{ '--d': `${0.06 + i * 0.07}s` }} onClick={onClose}>
            <span className="idx">0{i + 1}</span>{l}
          </a>
        ))}
      </nav>
      <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap', alignItems: 'center', marginTop: 38 }}>
        <Button onClick={() => { onClose(); onBook(); }} iconRight={<Icon name="arrow-right" size={15} />}>Book a demo</Button>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.12em', color: 'var(--text-muted)' }}>{FS_COPY.contact.mail}</span>
      </div>
    </div>
  );
}

/* ================= HERO ================= */
function FsHero({ introDone, onBook, particles, speed }) {
  const { SectionLabel, Button } = DSH;
  const contentRef = useRefH(null);
  const markRef = useRefH(null);
  const ptr = useRefH({ tx: 0, ty: 0, x: 0, y: 0 });
  const lastMark = useRefH({ m: '', c: '', o: '' });
  const t0Ref = useRefH(performance.now());

  useEffectH(() => {
    const fn = (e) => {
      ptr.current.tx = (e.clientX / window.innerWidth - 0.5) * 2;
      ptr.current.ty = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('pointermove', fn, { passive: true });
    return () => window.removeEventListener('pointermove', fn);
  }, []);

  useScrollFrame((y) => {
    const vh = window.innerHeight;
    if (y > vh * 1.3) return;
    const mo = window.__fsMo ?? 1;
    if (contentRef.current) {
      const c = mo ? `translate3d(0, ${(-y * 0.16).toFixed(1)}px, 0)` : 'none';
      const o = clamp01(1 - y / (vh * 0.9)).toFixed(3);
      if (c !== lastMark.current.c) { contentRef.current.style.transform = c; lastMark.current.c = c; }
      if (o !== lastMark.current.o) { contentRef.current.style.opacity = o; lastMark.current.o = o; }
    }
    const p = ptr.current;
    p.x += (p.tx - p.x) * 0.05;
    p.y += (p.ty - p.y) * 0.05;
    if (Math.abs(p.tx - p.x) < 0.002) p.x = p.tx;
    if (Math.abs(p.ty - p.y) < 0.002) p.y = p.ty;
    if (markRef.current) {
      let m;
      if (!mo) {
        m = 'none';
      } else {
        const el = (performance.now() - t0Ref.current) / 1000;
        const flo = Math.sin(el * (Math.PI * 2 / 8)) * 9 + 1; // matches old mark-float amplitude, single JS-driven source
        const sx = (p.x * 22);
        const sy = (y * 0.22) + flo + (p.y * 16);
        m = `translate3d(${sx.toFixed(1)}px, ${sy.toFixed(1)}px, 0)`;
      }
      if (m !== lastMark.current.m) { markRef.current.style.transform = m; lastMark.current.m = m; }
    }
  });

  const chips = [['50–60%', 'ROI'], ['24/7', 'OPERATION'], ['0', 'NEW HIRES']];
  return (
    <section id="top" className={'hero' + (introDone ? ' hero-on' : '')} data-hud="HERO" data-screen-label="Hero">
      <FsHeroCanvas density={particles} speed={speed} />
      <div className="hero-halo" aria-hidden="true"></div>
      <div className="hero-mark-pos" ref={markRef} aria-hidden="true">
        <div className="hero-mark-enter">
          {/* 1240px-wide, page-local copy (543 KB) — the 2000px master stays in /assets */}
          <img src="assets/mark-3d-hero.png" alt="" fetchpriority="high" decoding="async" onError={fsImgFallback('mark-3d-hero')} />
        </div>
      </div>
      <div className="fs-wrap" style={{ position: 'relative', width: '100%', boxSizing: 'border-box' }}>
        <div ref={contentRef} style={{ maxWidth: 1040, display: 'flex', flexDirection: 'column', gap: 30, willChange: 'transform' }}>
          <div className="hero-fadein" style={{ '--d': '0.02s' }}>
            <SectionLabel style={{ fontSize: 15 }}>AI-Native IT Advisory &amp; Implementation</SectionLabel>
          </div>
          <h1 className="hero-h1">
            <span className="ht-line"><span className="ht-w text-gradient-gold" style={{ '--d': '0.05s' }}>More revenue.</span></span>
            <span className="ht-line"><span className="ht-w txt-stroke-gold" style={{ '--d': '0.16s' }}>Less time.</span></span>
            <span className="ht-line"><span className="ht-w" style={{ '--d': '0.27s' }}>Fewer errors.</span></span>
          </h1>
          <div className="hero-fadein" style={{ '--d': '0.6s', maxWidth: 580 }}>
            <p style={{ margin: 0, fontSize: 'clamp(16px, 1.6vw, 19px)', lineHeight: 1.65, color: 'var(--text-muted)' }}>
              We design and deploy bespoke AI agents and automations that plug into your real operations.
              Outcome as a Service — nothing less.
            </p>
          </div>
          <div className="hero-fadein" style={{ '--d': '0.72s', display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
            <Magnetic>
              <Button size="lg" onClick={onBook} iconRight={<Icon name="arrow-right" size={18} />}>Book a demo</Button>
            </Magnetic>
            <Button size="lg" variant="glass" as="a" href="#products">Explore the products</Button>
          </div>
          <div className="hero-fadein" style={{ '--d': '0.84s', display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {chips.map(([v, l]) => (
              <span key={l} className="stat-chip"><i className="hexd" aria-hidden="true"></i><b>{v}</b>{l}</span>
            ))}
          </div>
        </div>
      </div>
      <div className="hero-meta hero-fadein" style={{ '--d': '1s', left: 'clamp(22px, 4.5vw, 64px)' }}>10.51°N&nbsp;&nbsp;7.42°E — KADUNA · NG</div>
      <div className="hero-meta hero-fadein" style={{ '--d': '1s', right: 'clamp(22px, 4.5vw, 64px)' }}>OUTCOME AS A SERVICE</div>
      <div className="hero-scrollhint hero-fadein" style={{ '--d': '1.1s' }} aria-hidden="true">
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9.5, letterSpacing: '0.3em', color: 'var(--text-subtle)' }}>SCROLL</span>
        <span className="line"></span>
      </div>
      <div className="hero-fade-btm" aria-hidden="true"></div>
    </section>
  );
}

/* ================= MOBILE DOCK — glass quick-bar (<940px) =================
   The desktop side-HUD, reborn as a thumb-reach dock: menu, live section
   readout, and the booking CTA. Shown via CSS only below 940px. */
function FsDock({ onBook, onMenu }) {
  const [sec, setSec] = useStateH({ i: 1, name: 'HERO' });
  const [on, setOn] = useStateH(false);
  const onRef = useRefH(false);
  useScrollFrame((y, v, raw) => {
    const show = raw > window.innerHeight * 0.5;
    if (show !== onRef.current) { onRef.current = show; setOn(show); }
  });
  useEffectH(() => {
    const secs = Array.from(document.querySelectorAll('[data-hud]'));
    if (!secs.length) return;
    const io = new IntersectionObserver((ents) => {
      ents.forEach((e) => {
        if (e.isIntersecting) setSec({ i: secs.indexOf(e.target) + 1, name: e.target.dataset.hud });
      });
    }, { rootMargin: '-46% 0px -46% 0px', threshold: 0 });
    secs.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);
  return (
    <nav className={'fs-dock' + (on ? ' on' : '')} aria-label="Quick actions">
      <button className="dock-btn" onClick={onMenu} aria-label="Open menu"><Icon name="menu" size={16} /></button>
      <div className="dock-hud" aria-hidden="true">
        <span className="dock-idx">{String(sec.i).padStart(2, '0')}</span>
        <span className="dock-name">{sec.name}</span>
      </div>
      <button className="dock-cta" onClick={onBook}>Book a demo<Icon name="arrow-up-right" size={14} /></button>
    </nav>
  );
}

/* ================= KINETIC TICKER ================= */
function FsTicker({ items, small = false, solo = false, ariaLabel }) {
  const trackRef = useRefH(null);
  const rowRef = useRefH(null);
  const st = useRefH({ x: 0, last: 0, w: 0 });
  const reduced = useRefH(window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  useEffectH(() => {
    const re = () => { if (rowRef.current) st.current.w = rowRef.current.offsetWidth; };
    re();
    const t = setTimeout(re, 700);
    window.addEventListener('resize', re);
    return () => { clearTimeout(t); window.removeEventListener('resize', re); };
  }, [items]);

  useScrollFrame((y, v) => {
    if (solo) return;
    const track = trackRef.current;
    if (!track) return;
    const s = st.current;
    const now = performance.now();
    const dt = Math.min(50, now - (s.last || now));
    s.last = now;
    const mo = reduced.current ? 0 : (window.__fsMo ?? 1);
    if (!mo || !s.w) { track.style.transform = 'none'; return; }
    const vel = (small ? 0.55 : 0.9) * mo + v * 0.5;
    s.x -= vel * (dt / 16.7);
    if (s.x <= -s.w) s.x += s.w;
    if (s.x > 0) s.x -= s.w;
    const skew = small ? 0 : Math.max(-12, Math.min(12, v * 0.45));
    track.style.transform = `translate3d(${s.x.toFixed(1)}px, 0, 0) skewX(${(-skew).toFixed(2)}deg)`;
  });

  if (solo) {
    return (
      <div className="tick tick-solo" aria-label={ariaLabel}>
        <span className="tick-item solid">{items[0]}</span>
      </div>
    );
  }

  return (
    <div className={'tick' + (small ? ' tick-sm' : '')} aria-label={ariaLabel} role={ariaLabel ? 'marquee' : undefined}>
      <div className="tick-track" ref={trackRef}>
        {[0, 1].map((half) => (
          <div key={half} ref={half === 0 ? rowRef : null} aria-hidden={half === 1} style={{ display: 'flex', alignItems: 'center' }}>
            {items.map((it, k) => (
              <span key={k} className={'tick-item' + (!small && k % 4 === 0 ? ' solid' : '')}>
                {it}<i className="tick-hex" aria-hidden="true"></i>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { FsNav, FsMenu, FsHero, FsTicker, FsDock });
