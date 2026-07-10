/* Laive AI award site — Nav + Hero. */
const { useState: useStateH, useEffect: useEffectH, useRef: useRefH } = React;
const DSH = window.LaiveAIDesignSystem_fa5676;

const ASSET = '../../assets/';

/* ================= NAV ================= */
function AwardNav({ onBook }) {
  const { Logo, Button, Icon } = DSH;
  const [scrolled, setScrolled] = useStateH(false);
  useEffectH(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    fn();
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);
  const links = [['Products', '#products'], ['Why Laive', '#why'], ['Process', '#process'], ['Contact', '#contact']];
  return (
    <div style={{ position: 'fixed', top: 14, left: 0, right: 0, zIndex: 90, display: 'flex', justifyContent: 'center', padding: '0 16px', pointerEvents: 'none' }}>
      <header className="lg" style={{
        pointerEvents: 'auto',
        display: 'flex', alignItems: 'center', gap: 26,
        borderRadius: 999, padding: '9px 12px 9px 20px',
        maxWidth: 860, width: '100%',
        boxShadow: scrolled
          ? '0 18px 50px -16px rgba(0,0,0,0.85), inset 0 1px 0 rgba(255,255,255,0.22)'
          : '0 10px 34px -18px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.18)',
        transition: 'box-shadow var(--dur-slow) var(--ease-out)',
      }}>
        <a href="#top" style={{ display: 'flex', alignItems: 'center', gap: 11, flex: '0 0 auto' }}>
          <Logo base={ASSET} variant="gold" layout="mark" size={30} />
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 13, letterSpacing: '0.08em', color: 'var(--text-strong)' }}>LAIVE&nbsp;AI</span>
        </a>
        <nav className="nav-links-desk" style={{ display: 'flex', alignItems: 'center', gap: 26, flex: 1, justifyContent: 'center' }}>
          {links.map(([l, h]) => (
            <a key={l} href={h} className="navlink" style={{ fontSize: 13.5, fontWeight: 500, color: 'var(--text-muted)' }}>{l}</a>
          ))}
        </nav>
        <div style={{ marginLeft: 'auto', flex: '0 0 auto' }}>
          <Button size="sm" onClick={onBook} iconRight={<Icon name="arrow-right" size={14} />}>Book a demo</Button>
        </div>
      </header>
    </div>
  );
}

/* ================= Static headline ================= */

/* ================= Hero backdrop ================= */
function Orb({ size, top, left, right, bottom, hue = 'copper', blur = 0, delay = 0, opacity = 1 }) {
  const grads = {
    copper: 'radial-gradient(circle at 32% 28%, #E8B377 0%, #C07B3A 34%, #6B3A18 72%, #3A1E0B 100%)',
    gold: 'radial-gradient(circle at 32% 28%, #F7D64A 0%, #E8B317 40%, #7A5A0A 78%, #3A2B05 100%)',
    ink: 'radial-gradient(circle at 32% 28%, #4A443C 0%, #2C2925 45%, #131110 100%)',
  };
  return (
    <div className="hero-orb hero-orb-float" style={{
      width: size, height: size, top, left, right, bottom, opacity,
      background: grads[hue],
      boxShadow: 'inset -14px -20px 40px rgba(0,0,0,0.55), inset 8px 10px 30px rgba(255,255,255,0.25), 0 40px 80px -30px rgba(0,0,0,0.8)',
      filter: blur ? `blur(${blur}px)` : 'none',
      animationDelay: `${delay}s`,
    }} />
  );
}

function HeroBackdrop({ variant }) {
  const pRef = useParallax(26);
  const pRef2 = useParallax(-14);
  return (
    <div aria-hidden style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'var(--grad-halo)' }} />
      <div className="bg-grid" style={{ position: 'absolute', inset: 0, opacity: 0.5, WebkitMaskImage: 'radial-gradient(75% 65% at 50% 32%, #000, transparent)', maskImage: 'radial-gradient(75% 65% at 50% 32%, #000, transparent)' }} />
      {variant === 'logo' ? (
        <React.Fragment>
          {/* static — no parallax, no float */}
          <div style={{ position: 'absolute', right: '6%', top: '50%', marginTop: 'max(-15vw, -215px)' }}>
            <img src={ASSET + 'mark-3d-copper.png'} alt="" style={{
              width: 'min(19vw, 280px)', display: 'block',
              filter: 'drop-shadow(0 60px 90px rgba(0,0,0,0.7)) drop-shadow(0 0 90px rgba(232,179,23,0.16))',
            }} />
          </div>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <div ref={pRef} style={{ position: 'absolute', inset: 0, willChange: 'transform' }}>
            <Orb size="clamp(280px, 30vw, 460px)" top="8%" right="8%" hue="gold" delay={0} />
            <Orb size="clamp(160px, 18vw, 280px)" bottom="14%" right="32%" hue="copper" delay={1.4} />
          </div>
          <div ref={pRef2} style={{ position: 'absolute', inset: 0, willChange: 'transform' }}>
            <Orb size="clamp(90px, 9vw, 140px)" top="24%" right="40%" hue="copper" blur={1} delay={0.8} />
            <Orb size="60px" bottom="30%" right="10%" hue="ink" blur={3} delay={2.2} opacity={0.85} />
          </div>
        </React.Fragment>
      )}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(7,6,5,0.25) 0%, rgba(7,6,5,0) 30%, rgba(7,6,5,0) 62%, var(--ink-950) 100%)' }} />
    </div>
  );
}

/* ================= HERO ================= */
function AwardHero({ tweaks, onBook }) {
  const { Button, Icon, SectionLabel } = DSH;
  const [hlOn, setHlOn] = useStateH(false);
  useEffectH(() => { const t = setTimeout(() => setHlOn(true), 120); return () => clearTimeout(t); }, []);
  const typedStyle = tweaks.headline === 'copper'
    ? { fontFamily: 'var(--font-display)', fontSize: '0.82em', letterSpacing: '-0.01em' }
    : {};
  const typedCls = tweaks.headline === 'copper' ? 'copper-3d' : 'text-gradient-gold';

  return (
    <section id="top" style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', overflow: 'hidden', paddingTop: 110 }}>
      <HeroBackdrop variant={tweaks.backdrop} />
      <div className="award-wrap" style={{ position: 'relative', width: '100%', boxSizing: 'border-box' }}>
        <div style={{ maxWidth: 880, display: 'flex', flexDirection: 'column', gap: 28 }}>
          <Reveal delay={0.05}><SectionLabel style={{ fontSize: 16 }}>An AI-Native IT Advisory &amp; Implementation Firm</SectionLabel></Reveal>
          <h1 className={hlOn ? 'hl-in' : ''} style={{
            margin: 0, fontFamily: 'var(--font-heading)', fontWeight: 800,
            fontSize: 'clamp(38px, 5.6vw, 76px)', lineHeight: 1.08,
            letterSpacing: '-0.03em', color: 'var(--text-strong)',
            position: 'relative',
          }}>
            AI that <span className={typedCls} style={typedStyle}>makes you more money</span>, saves time &amp; cuts errors.
          </h1>
          <Reveal delay={0.5}>
            <p style={{ margin: 0, fontSize: 'clamp(16px, 1.6vw, 19px)', lineHeight: 1.65, color: 'var(--text-muted)', maxWidth: 560 }}>
              We design and deploy production-ready AI agents and automations that plug into your real operations. Outcome as a Service — nothing less.
            </p>
          </Reveal>
          <Reveal delay={0.62} style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
            <Button size="lg" onClick={onBook} iconRight={<Icon name="arrow-right" size={18} />}>Book a demo</Button>
            <Button size="lg" variant="glass" as="a" href="#products">Explore the products</Button>
          </Reveal>
        </div>

        <Reveal delay={0.8} className="lg lg-live lg-clear hero-statbar" style={{
          marginTop: 'clamp(44px, 6vh, 76px)',
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
          borderRadius: 24,
        }}>
          {[
            ['50–60%', 'ROI realized by clients'],
            ['24/7', 'Agents that never clock out'],
            ['0', 'New hires required'],
          ].map(([v, l], i) => (
            <div key={l} style={{ padding: '26px 30px', borderLeft: i ? '1px solid rgba(255,255,255,0.09)' : 'none', display: 'flex', flexDirection: 'column', gap: 6 }}>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px, 2.6vw, 34px)', color: 'var(--accent)' }}>{v}</span>
              <span style={{ fontSize: 13.5, color: 'var(--text-muted)' }}>{l}</span>
            </div>
          ))}
        </Reveal>
      </div>

      <div className="scroll-hint" style={{ position: 'absolute', bottom: 22, left: '50%', marginLeft: -11, color: 'var(--text-subtle)' }}>
        <DSH.Icon name="chevron-down" size={22} />
      </div>
    </section>
  );
}

Object.assign(window, { AwardNav, AwardHero });
