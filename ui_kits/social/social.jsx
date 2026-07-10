/* Laive AI — Social media post templates. Native 1080px canvases,
   scaled into a gallery. Exports SocialApp to window. */
const { Logo, Button, Icon, Badge, SectionLabel } = window.LaiveAIDesignSystem_fa5676;
const B = '../../assets/';

/* Frame: renders a native-size canvas scaled to a preview width. */
function Frame({ w = 1080, h = 1080, preview = 380, label, children }) {
  const scale = preview / w;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={{ width: preview, height: h * scale, borderRadius: 16, overflow: 'hidden', boxShadow: 'var(--shadow-lg)', border: '1px solid var(--border)' }}>
        <div style={{ width: w, height: h, transform: `scale(${scale})`, transformOrigin: 'top left' }}>{children}</div>
      </div>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-subtle)' }}>{label} · {w}×{h}</span>
    </div>
  );
}

const halo = { position: 'absolute', inset: 0, backgroundImage: 'var(--grad-halo)' };
const grid = { position: 'absolute', inset: 0, opacity: 0.5 };
const base = { position: 'relative', width: '100%', height: '100%', background: 'var(--ink-950)', overflow: 'hidden', fontFamily: 'var(--font-body)', color: 'var(--text)' };

/* 1 — QUOTE / STATEMENT */
function QuotePost() {
  return (
    <div style={base}>
      <div style={halo} /><div className="bg-grid" style={grid} />
      <div style={{ position: 'relative', height: '100%', padding: 90, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Logo base={B} variant="gold" layout="mark" size={72} />
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 22, letterSpacing: '0.28em', color: 'var(--accent)' }}>IT'S 2026</span>
        </div>
        <div>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 100, color: 'var(--accent-soft-2)', lineHeight: 0.6 }}>“</span>
          <h1 style={{ margin: '10px 0 0', fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 76, lineHeight: 1.06, letterSpacing: '-0.02em', color: 'var(--text-strong)' }}>
            AI adoption is <span className="text-gradient-gold">no longer optional.</span>
          </h1>
          <p style={{ marginTop: 30, fontSize: 30, color: 'var(--text-muted)', lineHeight: 1.5, maxWidth: 760 }}>The question isn't <em>if</em> AI will reshape your market — it's who moves first.</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ width: 44, height: 48, clipPath: 'var(--hex-clip)', background: 'var(--grad-gold)' }} />
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 24, letterSpacing: '0.08em' }}>laiveai.com</span>
        </div>
      </div>
    </div>
  );
}

/* 2 — PRODUCT SPOTLIGHT */
function ProductPost() {
  const caps = ['Lead qualification & routing', 'Inbound & outbound engagement', 'Appointment scheduling', 'CRM updates & sales insights'];
  return (
    <div style={base}>
      <div style={halo} />
      <div style={{ position: 'relative', height: '100%', padding: 90, display: 'flex', flexDirection: 'column', gap: 40 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            <span style={{ width: 82, height: 92, clipPath: 'var(--hex-clip)', background: 'var(--grad-gold)', display: 'grid', placeItems: 'center', color: 'var(--text-on-gold)', boxShadow: 'var(--glow-gold)' }}><Icon name="bot" size={44} /></span>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, letterSpacing: '0.22em', color: 'var(--accent)' }}>AI PRODUCT · 01</div>
              <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 52, color: 'var(--text-strong)' }}>Laive Engage</div>
            </div>
          </div>
          <Logo base={B} variant="gold" layout="mark" size={66} />
        </div>
        <p style={{ margin: 0, fontSize: 32, lineHeight: 1.5, color: 'var(--text-muted)' }}>AI sales agents that engage prospects, qualify leads, and drive conversions — <strong style={{ color: 'var(--text)' }}>around the clock.</strong></p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginTop: 'auto' }}>
          {caps.map((c) => (
            <div key={c} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '24px 26px', borderRadius: 18, background: 'var(--glass-bg-2)', border: '1px solid var(--glass-border)', fontSize: 25 }}>
              <span style={{ color: 'var(--accent)', display: 'flex' }}><Icon name="check" size={26} /></span>{c}
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 24, letterSpacing: '0.08em', color: 'var(--text-muted)' }}>laiveai.com</span>
          <span style={{ padding: '18px 34px', borderRadius: 14, background: 'var(--grad-gold)', color: 'var(--text-on-gold)', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 26, boxShadow: 'var(--shadow-3d-gold)' }}>Book a demo →</span>
        </div>
      </div>
    </div>
  );
}

/* 3 — STAT */
function StatPost() {
  return (
    <div style={base}>
      <div className="bg-copper-grain" style={{ position: 'absolute', inset: 0, opacity: 0.28 }} />
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(70% 60% at 50% 45%, rgba(232,179,23,0.22), transparent 65%)' }} />
      <div style={{ position: 'relative', height: '100%', padding: 90, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: 24 }}>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: 24, letterSpacing: '0.26em', color: 'var(--accent)' }}>OUTCOME AS A SERVICE</span>
        <div className="text-3d-copper" style={{ fontFamily: 'var(--font-display)', fontSize: 300, lineHeight: 0.9 }}>60%</div>
        <h2 style={{ margin: 0, fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 56, letterSpacing: '-0.02em', color: 'var(--text-strong)' }}>ROI realized</h2>
        <p style={{ margin: 0, fontSize: 30, color: 'var(--text-muted)', maxWidth: 720 }}>Clients realize up to 50–60% return — with zero hiring burden.</p>
        <div style={{ position: 'absolute', bottom: 70, display: 'flex', alignItems: 'center', gap: 16 }}>
          <Logo base={B} variant="gold" layout="mark" size={48} />
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 22, letterSpacing: '0.08em', color: 'var(--text-muted)' }}>laiveai.com</span>
        </div>
      </div>
    </div>
  );
}

/* 4 — ANNOUNCEMENT (3D logo hero) */
function AnnouncementPost() {
  return (
    <div style={base}>
      <div style={halo} /><div className="bg-dots" style={grid} />
      <div style={{ position: 'relative', height: '100%', padding: 90, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: 40 }}>
        <div style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', inset: '-20%', background: 'radial-gradient(circle, rgba(232,179,23,0.3), transparent 62%)' }} />
          <Logo base={B} variant="3d" layout="mark" size={360} style={{ position: 'relative', filter: 'drop-shadow(0 30px 50px rgba(0,0,0,0.6))' }} />
        </div>
        <h1 style={{ margin: 0, fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 68, lineHeight: 1.05, letterSpacing: '-0.02em', color: 'var(--text-strong)' }}>Built to help you <span className="text-gradient-gold">lead.</span></h1>
        <p style={{ margin: 0, fontSize: 30, color: 'var(--text-muted)' }}>Powered by data. Driven by AI.</p>
      </div>
    </div>
  );
}

/* 5 — STORY (vertical) */
function StoryPost() {
  return (
    <div style={base}>
      <div style={halo} /><div className="bg-grid" style={grid} />
      <div style={{ position: 'relative', height: '100%', padding: 90, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <Logo base={B} variant="gold" layout="mark" size={80} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 30 }}>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 26, letterSpacing: '0.24em', color: 'var(--accent)' }}>AI-NATIVE IT FIRM</span>
          <h1 style={{ margin: 0, fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 92, lineHeight: 1.04, letterSpacing: '-0.02em', color: 'var(--text-strong)' }}>AI that makes you <span className="text-gradient-gold">more money.</span></h1>
          <p style={{ margin: 0, fontSize: 34, color: 'var(--text-muted)', lineHeight: 1.5 }}>Save time. Reduce errors. Sell smarter — 24/7, no HR hassle.</p>
        </div>
        <div style={{ padding: '30px 0', textAlign: 'center', borderRadius: 20, background: 'var(--grad-gold)', color: 'var(--text-on-gold)', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 36, boxShadow: 'var(--shadow-3d-gold)' }}>Book a demo →</div>
      </div>
    </div>
  );
}

function SocialApp() {
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', padding: 'var(--gutter)' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 36 }}>
          <SectionLabel>Social Media Templates</SectionLabel>
          <h1 style={{ margin: 0, fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 38, letterSpacing: '-0.02em', color: 'var(--text-strong)' }}>Ready-to-post, on-brand</h1>
          <p style={{ margin: 0, color: 'var(--text-muted)', maxWidth: 620 }}>Square (1080×1080) feed posts and a 1080×1920 story. Each is a native-size canvas — screenshot/export at full size.</p>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 30, alignItems: 'flex-start' }}>
          <Frame label="Statement"><QuotePost /></Frame>
          <Frame label="Product spotlight"><ProductPost /></Frame>
          <Frame label="Stat"><StatPost /></Frame>
          <Frame label="Announcement"><AnnouncementPost /></Frame>
          <Frame w={1080} h={1920} preview={280} label="Story"><StoryPost /></Frame>
        </div>
      </div>
    </div>
  );
}

window.SocialApp = SocialApp;
