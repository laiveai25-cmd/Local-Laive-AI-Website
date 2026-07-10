/* Laive AI flagship — app assembly + Tweaks. */
const { useState: useStateA, useEffect: useEffectA, useCallback: useCallbackA } = React;

const FS_TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "motion": true,
  "speed": 1,
  "particles": 5,
  "cursor": true,
  "grain": true,
  "glass": 8,
  "accent": "gold"
}/*EDITMODE-END*/;

function FsApp() {
  const [t, setTweak] = useTweaks(FS_TWEAK_DEFAULTS);
  const [intro, setIntro] = useStateA({ revealed: false, gone: false, k: 0 });
  const [booking, setBooking] = useStateA(false);
  const [menu, setMenu] = useStateA(false);
  const mo = t.motion ? t.speed : 0;

  useEffectA(() => {
    window.__fsMo = mo;
    FsScroll.ease = mo === 0 ? 1 : 0.11;
  }, [mo]);

  const onBook = useCallbackA(() => setBooking(true), []);
  const replayIntro = useCallbackA(() => {
    window.scrollTo(0, 0);
    setIntro((s) => ({ revealed: false, gone: false, k: s.k + 1 }));
  }, []);

  return (
    <div
      className={t.accent === 'copper' ? 'accent-copper' : ''}
      data-motion={mo ? 'on' : 'off'}
      style={{ '--mo': mo || 1, '--lgi': t.glass, background: 'var(--ink-950)', minHeight: '100vh' }}>
      <FsNav onBook={onBook} onMenu={() => setMenu(true)} />
      <FsMenu open={menu} onClose={() => setMenu(false)} onBook={onBook} />
      <main>
        <FsHero introDone={intro.revealed} onBook={onBook} particles={t.particles} speed={mo} />
        <FsTicker items={['The products that make it happen']} solo ariaLabel="Laive AI outcomes" />
        <FsProducts onBook={onBook} />
        <FsWhy />
        <FsStats />
        <FsProcess />
        <FsClients />
        <FsPartners />
        <FsQuote />
        <FsTestimonials />
        <FsContact onBook={onBook} />
      </main>
      <FsFooter />
      <FsBookModal open={booking} onClose={() => setBooking(false)} />
      <FsCursor enabled={t.cursor && mo !== 0} />
      <FsGrain enabled={t.grain} />
      <FsProgress />
      <FsHud />
      <FsDock onBook={onBook} onMenu={() => setMenu(true)} />
      {!intro.gone && (
        <FsPreloader
          key={intro.k}
          onReveal={() => setIntro((s) => ({ ...s, revealed: true }))}
          onGone={() => setIntro((s) => ({ ...s, gone: true }))}
        />
      )}

      <TweaksPanel>
        <TweakSection label="Motion" />
        <TweakToggle label="Motion" value={t.motion} onChange={(v) => setTweak('motion', v)} />
        <TweakSlider label="Speed" value={t.speed} min={0.4} max={2} step={0.1} onChange={(v) => setTweak('speed', v)} />
        <TweakSlider label="Hero particles" value={t.particles} min={1} max={10} step={1} onChange={(v) => setTweak('particles', v)} />
        <TweakSection label="Atmosphere" />
        <TweakToggle label="Custom cursor" value={t.cursor} onChange={(v) => setTweak('cursor', v)} />
        <TweakToggle label="Film grain" value={t.grain} onChange={(v) => setTweak('grain', v)} />
        <TweakSlider label="Glass intensity" value={t.glass} min={1} max={10} step={1} onChange={(v) => setTweak('glass', v)} />
        <TweakSection label="Color" />
        <TweakRadio label="Accent" value={t.accent} options={['gold', 'copper']} onChange={(v) => setTweak('accent', v)} />
        <TweakSection label="Intro" />
        <TweakButton label="Replay intro" onClick={replayIntro} />
      </TweaksPanel>
    </div>
  );
}

window.FsApp = FsApp;
