/* Laive AI flagship — Cal.com booking embed.
   Routing form: forms/b4eacc5f-a4ff-4d82-bd1d-35a22ea58364, namespace "inqui".
   Themed dark + Laive gold. Graceful loader + "open in new tab" fallback if
   the embed is blocked (offline preview, CSP, ad-blockers). */
const { useEffect: useEffectCal, useRef: useRefCal, useState: useStateCal } = React;

const FS_CAL = {
  namespace: 'inqui',
  calLink: 'forms/b4eacc5f-a4ff-4d82-bd1d-35a22ea58364',
  url: 'https://cal.com/forms/b4eacc5f-a4ff-4d82-bd1d-35a22ea58364',
  brand: '#E8B317',
};

/* Official Cal.com embed bootstrap — injects app.cal.com/embed/embed.js once. */
function ensureCal() {
  if (window.Cal && window.Cal.loaded) return window.Cal;
  (function (C, A, L) {
    let p = function (a, ar) { a.q.push(ar); };
    let d = C.document;
    C.Cal = C.Cal || function () {
      let cal = C.Cal; let ar = arguments;
      if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement('script')).src = A; cal.loaded = true; }
      if (ar[0] === L) {
        const api = function () { p(api, arguments); };
        const namespace = ar[1];
        api.q = api.q || [];
        if (typeof namespace === 'string') { cal.ns[namespace] = cal.ns[namespace] || api; p(cal.ns[namespace], ar); p(cal, ['initNamespace', namespace]); }
        else { p(cal, ar); }
        return;
      }
      p(cal, ar);
    };
  })(window, 'https://app.cal.com/embed/embed.js', 'init');
  return window.Cal;
}

function FsCalInline() {
  const boxRef = useRefCal(null);
  const [status, setStatus] = useStateCal('loading'); // loading | ready | slow
  useEffectCal(() => {
    let ready = false;
    const markReady = () => { if (!ready) { ready = true; setStatus('ready'); } };
    try {
      const Cal = ensureCal();
      Cal('init', FS_CAL.namespace, { origin: 'https://cal.com' });
      const ns = Cal.ns[FS_CAL.namespace];
      ns('inline', {
        elementOrSelector: boxRef.current,
        calLink: FS_CAL.calLink,
        config: { layout: 'month_view', theme: 'dark' },
      });
      ns('ui', {
        theme: 'dark',
        cssVarsPerTheme: { dark: { 'cal-brand': FS_CAL.brand } },
        hideEventTypeDetails: false,
        layout: 'month_view',
      });
      ns('on', { action: 'linkReady', callback: markReady });
    } catch (e) {
      setStatus('slow');
    }
    // Fallback readiness: if an iframe mounts, reveal it (in case linkReady is missed).
    const watch = setInterval(() => {
      if (boxRef.current && boxRef.current.querySelector('iframe')) { clearInterval(watch); markReady(); }
    }, 400);
    const slow = setTimeout(() => { if (!ready) setStatus('slow'); }, 7000);
    return () => { clearInterval(watch); clearTimeout(slow); };
  }, []);

  const Icon = window.FsIcon;
  return (
    <div style={{ position: 'relative', width: '100%', minHeight: 'min(72vh, 620px)' }}>
      <div ref={boxRef} style={{ width: '100%', minHeight: 'min(72vh, 620px)', borderRadius: 16, overflow: 'hidden' }}></div>
      {status !== 'ready' && (
        <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', padding: 20 }}>
          <div className="gl" style={{ borderRadius: 22, padding: '30px 34px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, textAlign: 'center', maxWidth: 380 }}>
            {status === 'loading' ? (
              <React.Fragment>
                <span className="cal-spin" aria-hidden="true"></span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.18em', color: 'var(--text-muted)' }}>PREPARING SECURE CALENDAR…</span>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <span style={{ width: 58, height: 64, display: 'grid', placeItems: 'center', clipPath: 'var(--hex-clip)', background: 'var(--grad-gold)', color: 'var(--text-on-gold)', boxShadow: 'var(--glow-gold)' }}>
                  <Icon name="arrow-up-right" size={26} />
                </span>
                <span style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--text)' }}>Open the live booking calendar to pick a time with the Laive AI team.</span>
                <a href={FS_CAL.url} target="_blank" rel="noopener noreferrer" style={{
                  display: 'inline-flex', alignItems: 'center', gap: 10, padding: '13px 22px', borderRadius: 99,
                  background: 'var(--grad-gold)', color: 'var(--text-on-gold)', fontWeight: 600, fontSize: 14.5,
                  boxShadow: 'var(--glow-gold)',
                }}>Open booking page <Icon name="arrow-up-right" size={16} /></a>
              </React.Fragment>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

Object.assign(window, { ensureCal, FsCalInline, FS_CAL });
