/* Laive AI — Website UI kit. All sections + the interactive app.
   Exports SiteApp to window for index.html to mount. */
const { useState } = React;
const { Logo, Button, Badge, Icon, GlassCard, SectionLabel, ProductCard, StatBlock, FeatureItem, Input } =
  window.LaiveAIDesignSystem_fa5676;

const B = '../../assets/';
const gold = 'var(--accent)';

const wrap = { maxWidth: 1200, margin: '0 auto', padding: '0 var(--gutter)' };

/* ---------------- NAV ---------------- */
function Nav({ onNav }) {
  const links = ['Products', 'Why Laive', 'Process', 'Contact'];
  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 50,
      background: 'rgba(12,11,10,0.6)',
      backdropFilter: 'blur(18px) saturate(130%)', WebkitBackdropFilter: 'blur(18px) saturate(130%)',
      borderBottom: '1px solid var(--border)',
    }}>
      <div style={{ ...wrap, display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72 }}>
        <a href="#top" onClick={(e) => { e.preventDefault(); onNav('top'); }} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Logo base={B} variant="gold" layout="mark" size={38} />
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 15, letterSpacing: '0.06em', color: 'var(--text-strong)' }}>LAIVE&nbsp;AI</span>
        </a>
        <nav style={{ display: 'flex', alignItems: 'center', gap: 30 }} className="nav-links">
          {links.map((l) => (
            <a key={l} href={'#' + l} onClick={(e) => { e.preventDefault(); onNav(l.toLowerCase().replace(' ', '')); }}
              style={{ fontSize: 14, color: 'var(--text-muted)', fontWeight: 500 }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}>{l}</a>
          ))}
        </nav>
        <Button size="sm" iconRight={<Icon name="arrow-right" size={15} />} onClick={() => onNav('contact')}>Book a demo</Button>
      </div>
    </header>
  );
}

/* ---------------- HERO ---------------- */
function Hero() {
  return (
    <section id="top" style={{ position: 'relative', overflow: 'hidden', paddingTop: 70, paddingBottom: 80 }}>
      <div aria-hidden style={{ position: 'absolute', inset: 0, backgroundImage: 'var(--grad-halo)', pointerEvents: 'none' }} />
      <div aria-hidden className="bg-grid" style={{ position: 'absolute', inset: 0, opacity: 0.6, maskImage: 'radial-gradient(70% 60% at 50% 30%, #000, transparent)', WebkitMaskImage: 'radial-gradient(70% 60% at 50% 30%, #000, transparent)' }} />
      <div style={{ ...wrap, position: 'relative', display: 'grid', gridTemplateColumns: '1.15fr 0.85fr', gap: 40, alignItems: 'center' }} className="hero-grid">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <SectionLabel>AI-Native IT Advisory & Implementation</SectionLabel>
          <h1 style={{ margin: 0, fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 'clamp(38px, 5.4vw, 68px)', lineHeight: 1.04, letterSpacing: '-0.02em', color: 'var(--text-strong)' }}>
            AI that makes you <span className="text-gradient-gold">more money</span>, saves time & cuts errors.
          </h1>
          <p style={{ margin: 0, fontSize: 18, lineHeight: 1.6, color: 'var(--text-muted)', maxWidth: 520 }}>
            We design and deploy production-ready AI that integrates into real operations — so you operate faster, sell smarter, and support customers better. Outcome as a Service.
          </p>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <Button size="lg" iconRight={<Icon name="arrow-right" size={18} />}>Book a demo</Button>
            <Button size="lg" variant="glass">See our products</Button>
          </div>
          <div style={{ display: 'flex', gap: 34, marginTop: 12, flexWrap: 'wrap' }}>
            <StatBlock value="60" suffix="%" label="ROI realized" sub="Up to 50–60% return" />
            <StatBlock value="24/7" tone="copper" label="Always-on agents" />
            <StatBlock value="0" label="Hiring burden" tone="plain" />
          </div>
        </div>
        <div style={{ display: 'grid', placeItems: 'center' }}>
          <div style={{ position: 'relative' }}>
            <div aria-hidden style={{ position: 'absolute', inset: '-18%', background: 'radial-gradient(circle, rgba(232,179,23,0.28), transparent 62%)', filter: 'blur(10px)' }} />
            <Logo base={B} variant="3d" layout="mark" size={340} style={{ position: 'relative', filter: 'drop-shadow(0 30px 50px rgba(0,0,0,0.6))' }} />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- PRODUCTS ---------------- */
const PRODUCTS = [
  { index: '01', icon: 'bot', title: 'Laive Engage', description: 'AI agents that engage prospects, qualify leads, and drive conversions — around the clock.', capabilities: ['Lead qualification & routing', 'Inbound & outbound engagement', 'Appointment scheduling', 'CRM updates & sales insights'], outcomes: ['Faster sales cycles', 'Higher conversion'] },
  { index: '02', icon: 'headset', title: 'Laive Assist', description: 'Always-on customer support through AI agents that resolve, escalate intelligently, and improve over time.', capabilities: ['24/7 customer support', 'Ticket handling & resolution', 'Intelligent escalation to humans', 'Continuous learning'], outcomes: ['Lower support costs', 'Faster responses'] },
  { index: '03', icon: 'workflow', title: 'Laive Automation Suite', description: 'AI-powered workflows that connect systems, data, and teams — eliminating manual work and bottlenecks.', capabilities: ['End-to-end process automation', 'System & API integrations', 'Data orchestration & handoffs', 'Intelligent decision logic'], outcomes: ['Greater efficiency', 'Fewer errors'] },
];
function Products() {
  const [active, setActive] = useState(0);
  return (
    <section id="products" style={{ padding: 'var(--section-y) 0' }}>
      <div style={wrap}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 20, marginBottom: 40, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <SectionLabel>Our AI Products</SectionLabel>
            <h2 style={{ margin: 0, fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 'clamp(30px,4vw,46px)', letterSpacing: '-0.02em', color: 'var(--text-strong)' }}>Three ways we put AI to work</h2>
          </div>
          <p style={{ margin: 0, maxWidth: 340, color: 'var(--text-muted)', fontSize: 15 }}>Every product pairs concrete capabilities with a measurable business outcome.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 22 }} className="products-grid">
          {PRODUCTS.map((p, i) => (
            <div key={p.index} onMouseEnter={() => setActive(i)}>
              <ProductCard {...p} featured={active === i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- WHY CHOOSE ---------------- */
const REASONS = [
  { icon: 'target', index: '01.', title: 'Outcome-driven, not tool-driven', description: 'We start with your business goals, then design the right AI workflows to achieve them.' },
  { icon: 'user-minus', index: '02.', title: 'Zero hiring burden', description: 'Get AI-driven capabilities without recruiting new talent — and realize up to 50–60% ROI.' },
  { icon: 'shield-check', index: '03.', title: 'Risk-managed deployment', description: 'We handle architecture, security, and integration end-to-end.' },
  { icon: 'sliders-horizontal', index: '04.', title: 'Tailored to you', description: 'Not one-size-fits-all. Every solution is built around your operations.' },
];
function WhyChoose() {
  return (
    <section id="whylaive" style={{ padding: 'var(--section-y) 0', position: 'relative' }}>
      <div aria-hidden className="bg-dots" style={{ position: 'absolute', inset: 0, opacity: 0.5 }} />
      <div style={{ ...wrap, position: 'relative' }}>
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 14, alignItems: 'center', marginBottom: 44 }}>
          <SectionLabel>Why Choose Laive AI</SectionLabel>
          <h2 style={{ margin: 0, fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 'clamp(30px,4vw,46px)', letterSpacing: '-0.02em', color: 'var(--text-strong)', maxWidth: 720 }}>The right AI solutions to help you dominate your industry</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 18 }} className="why-grid">
          {REASONS.map((r) => <FeatureItem key={r.index} {...r} />)}
        </div>
      </div>
    </section>
  );
}

/* ---------------- PROCESS ---------------- */
const STEPS = [
  { icon: 'search', title: 'Discover', points: ['Stakeholder interviews', 'Workflow & data audits', 'Roadmap design'] },
  { icon: 'pen-tool', title: 'Design & Build', points: ['Architecture design', 'Logic & UI dev', 'Data pipelines & integration'] },
  { icon: 'rocket', title: 'Deploy', points: ['Rigorous testing', 'Pilot & gradual rollout', 'Training & onboarding'] },
  { icon: 'repeat', title: 'Optimize', points: ['Real-time tracking', 'Feedback & error handling', 'Incremental enhancements'] },
];
function Process() {
  return (
    <section id="process" style={{ padding: 'var(--section-y) 0' }}>
      <div style={wrap}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 40 }}>
          <SectionLabel>How We Work</SectionLabel>
          <h2 style={{ margin: 0, fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 'clamp(30px,4vw,46px)', letterSpacing: '-0.02em', color: 'var(--text-strong)' }}>A clear, proven process</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 18 }} className="process-grid">
          {STEPS.map((s, i) => (
            <GlassCard key={s.title} hover padding={24}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                <span style={{ width: 46, height: 50, display: 'grid', placeItems: 'center', clipPath: 'var(--hex-clip)', background: 'var(--accent-soft-2)', border: '1px solid var(--border-strong)', color: gold }}>
                  <Icon name={s.icon} size={20} />
                </span>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: 'var(--border-strong)' }}>{'0' + (i + 1)}</span>
              </div>
              <h3 style={{ margin: '0 0 12px', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 18, color: 'var(--text-strong)' }}>{s.title}</h3>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
                {s.points.map((p) => (
                  <li key={p} style={{ display: 'flex', gap: 8, fontSize: 13.5, color: 'var(--text-muted)' }}>
                    <span style={{ color: gold, flex: '0 0 auto', display: 'flex' }}><Icon name="check" size={14} /></span>{p}
                  </li>
                ))}
              </ul>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- CONTACT / CTA ---------------- */
function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <section id="contact" style={{ padding: 'var(--section-y) 0' }}>
      <div style={wrap}>
        <GlassCard tone="gold" padding={0} style={{ overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }} className="contact-grid">
            <div style={{ padding: 44, display: 'flex', flexDirection: 'column', gap: 18, position: 'relative' }}>
              <SectionLabel>Contact Us For A Quick Demo</SectionLabel>
              <h2 style={{ margin: 0, fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 'clamp(28px,3.4vw,40px)', letterSpacing: '-0.02em', color: 'var(--text-strong)' }}>It's 2026. AI adoption is no longer optional.</h2>
              <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: 15.5, lineHeight: 1.6 }}>The question isn't <em>if</em> AI will reshape your market — it's <strong style={{ color: 'var(--text)' }}>who moves first.</strong></p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 8 }}>
                {[['phone', '+234 903 877 0939'], ['mail', 'hassan@laiveai.com'], ['globe', 'laiveai.com'], ['map-pin', '6a Surame Rd, City Centre, Kaduna, Nigeria']].map(([ic, t]) => (
                  <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 14.5, color: 'var(--text)' }}>
                    <span style={{ color: gold, display: 'flex' }}><Icon name={ic} size={16} /></span>{t}
                  </div>
                ))}
              </div>
            </div>
            <div style={{ padding: 44, background: 'var(--surface)', borderLeft: '1px solid var(--border)' }}>
              {sent ? (
                <div style={{ height: '100%', minHeight: 300, display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                  <span style={{ width: 60, height: 66, display: 'grid', placeItems: 'center', clipPath: 'var(--hex-clip)', background: 'var(--grad-gold)', color: 'var(--text-on-gold)', boxShadow: 'var(--glow-gold)' }}><Icon name="check" size={30} /></span>
                  <h3 style={{ margin: 0, fontFamily: 'var(--font-heading)', color: 'var(--text-strong)' }}>Request received</h3>
                  <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: 14 }}>We'll reach out within one business day.</p>
                </div>
              ) : (
                <form style={{ display: 'flex', flexDirection: 'column', gap: 16 }} onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
                  <Input label="Full name" placeholder="Ada Obi" icon={<Icon name="user" size={16} />} required />
                  <Input label="Work email" type="email" placeholder="you@company.com" icon={<Icon name="mail" size={16} />} required />
                  <Input label="Company" placeholder="Acme Ltd" icon={<Icon name="building-2" size={16} />} />
                  <Button as="button" full iconRight={<Icon name="arrow-right" size={17} />}>Connect with us today</Button>
                </form>
              )}
            </div>
          </div>
        </GlassCard>
      </div>
      <footer style={{ ...wrap, marginTop: 70, paddingTop: 28, borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Logo base={B} variant="gold" layout="mark" size={30} />
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 13, letterSpacing: '0.06em', color: 'var(--text-muted)' }}>LAIVE&nbsp;AI</span>
        </div>
        <span style={{ fontSize: 13, color: 'var(--text-subtle)' }}>Built to help you lead — powered by data, driven by AI. © 2026 Laive AI.</span>
      </footer>
    </section>
  );
}

/* ---------------- APP ---------------- */
function SiteApp() {
  const onNav = (id) => {
    const el = document.getElementById(id === 'top' ? 'top' : id);
    if (el) window.scrollTo({ top: id === 'top' ? 0 : el.offsetTop - 72, behavior: 'smooth' });
  };
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <Nav onNav={onNav} />
      <Hero />
      <Products />
      <WhyChoose />
      <Process />
      <Contact />
    </div>
  );
}

window.SiteApp = SiteApp;
