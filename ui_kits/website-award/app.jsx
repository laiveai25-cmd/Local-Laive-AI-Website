/* Laive AI award site — app assembly + Tweaks. */
const { useState: useStateA, useCallback: useCallbackA } = React;

const AWARD_TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "glass": 8,
  "motion": true,
  "speed": 1,
  "headline": "gradient",
  "backdrop": "logo",
  "accent": "gold"
}/*EDITMODE-END*/;

function AwardApp() {
  const [t, setTweak] = useTweaks(AWARD_TWEAK_DEFAULTS);
  const [booking, setBooking] = useStateA(false);
  const onBook = useCallbackA(() => setBooking(true), []);

  const tweaks = {
    motion: t.motion,
    headline: t.headline === 'copper' ? 'copper' : 'gradient',
    backdrop: t.backdrop === 'aurora' ? 'aurora' : 'logo',
  };

  return (
    <div
      className={t.accent === 'copper' ? 'accent-copper' : ''}
      data-motion={t.motion ? 'on' : 'off'}
      style={{
        '--lgi': t.glass,
        '--mo': t.motion ? t.speed : 0,
        background: 'var(--ink-950)',
        minHeight: '100vh',
      }}>
      <AwardNav onBook={onBook} />
      <main>
        <AwardHero tweaks={tweaks} onBook={onBook} />
        <AwardProducts />
        <AwardWhy />
        <AwardStats />
        <AwardCompliance />
        <AwardProcess />
        <AwardQuote />
        <AwardContact onBook={onBook} />
      </main>
      <AwardFooter />
      <BookingModal open={booking} onClose={() => setBooking(false)} />

      <TweaksPanel>
        <TweakSection label="Hero" />
        <TweakRadio label="Headline word" value={tweaks.headline} options={['gradient', 'copper']}
          onChange={(v) => setTweak('headline', v)} />
        <TweakRadio label="Backdrop" value={tweaks.backdrop} options={['logo', 'aurora']}
          onChange={(v) => setTweak('backdrop', v)} />
        <TweakSection label="Glass" />
        <TweakSlider label="Glass intensity" value={t.glass} min={1} max={10} step={1}
          onChange={(v) => setTweak('glass', v)} />
        <TweakSection label="Motion" />
        <TweakToggle label="Motion" value={t.motion} onChange={(v) => setTweak('motion', v)} />
        <TweakSlider label="Speed" value={t.speed} min={0.4} max={2} step={0.1}
          onChange={(v) => setTweak('speed', v)} />
        <TweakSection label="Color" />
        <TweakRadio label="Accent" value={t.accent} options={['gold', 'copper']}
          onChange={(v) => setTweak('accent', v)} />
      </TweaksPanel>
    </div>
  );
}

window.AwardApp = AwardApp;
