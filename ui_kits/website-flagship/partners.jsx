/* Laive AI flagship — strategic partners (alliance plaques).
   Distinct from the client marquee: three still, weighty glass plaques —
   platform / engineering / security — each with a white logo stage that
   colorizes on hover (Vendetta's white mark is inverted to read on white). */
const DSPn = window.LaiveAIDesignSystem_fa5676;

const FS_PARTNERS = [
  {
    slug: 'stellar', inv: false,
    name: 'Stellar Technologies', role: 'TECHNOLOGY PARTNER',
    text: 'Experts in Financial Services IT combining core banking, payment architectures, and fintech engineering with strict regulatory compliance.',
  },
  {
    slug: 'zoho', inv: false,
    name: 'Zoho', role: 'PLATFORM PARTNER',
    text: 'Your agents plug straight into the tools you already run — CRM, desk, and finance — built on the Zoho ecosystem.',
  },
  {
    slug: 'vendetta', inv: true,
    name: 'Vendetta Security', role: 'SECURITY PARTNER',
    text: 'Independent security eyes on every rollout. Your data, your guardrails — reviewed and verified.',
  },
];

function FsPartnerCard({ p, i, delay }) {
  return (
    <FadeIn delay={delay} className="ptn-cell">
      <article className="gl ptn-card" data-cursor="label" data-cursor-label={`0${i + 1}`}>
        <div className="ptn-stage">
          <img src={`assets/partners/${p.slug}.png`} alt={`${p.name} logo`} className={p.inv ? 'ptn-inv' : ''} loading="lazy" onError={fsImgFallback(`partners/${p.slug}`)} />
        </div>
        <div className="ptn-meta">
          <span className="ptn-idx">0{i + 1}</span>
          <i className="ptn-rule" aria-hidden="true"></i>
          <span className="ptn-role">{p.role}</span>
        </div>
        <h3 className="ptn-name">{p.name}</h3>
        <p className="ptn-text">{p.text}</p>
      </article>
    </FadeIn>
  );
}

function FsPartners() {
  const { SectionLabel } = DSPn;
  return (
    <section id="partners" data-hud="PARTNERS" data-screen-label="Partners" style={{ padding: 'var(--section-y) 0', scrollMarginTop: 70 }}>
      <div className="fs-wrap">
        <div className="sec-head" style={{ marginBottom: 44 }}>
          <FadeIn><SectionLabel>Our Partners</SectionLabel></FadeIn>
          <FadeIn delay={0.08}>
            <h2 className="sec-h2" style={{ maxWidth: 760 }}>
              We don&rsquo;t build <span className="text-gradient-gold">alone</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.16}>
            <p style={{ margin: 0, fontSize: 16, lineHeight: 1.65, color: 'var(--text-muted)', maxWidth: 540 }}>
              Platform, engineering, and security alliances — so every deployment lands
              with the right muscle behind it.
            </p>
          </FadeIn>
        </div>
        <div className="ptn-grid">
          {FS_PARTNERS.map((p, i) => <FsPartnerCard key={p.slug} p={p} i={i} delay={i * 0.09} />)}
        </div>
        <p className="ptn-swipe" aria-hidden="true"><i className="ln" style={{ transform: 'scaleX(-1)' }}></i>SWIPE<i className="ln"></i></p>
      </div>
    </section>
  );
}

Object.assign(window, { FsPartners });
