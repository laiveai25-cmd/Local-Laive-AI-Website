/* Laive AI flagship — preloader + hero particle flow-field canvas. */
const { useState: useStateC, useEffect: useEffectC, useRef: useRefC } = React;

/* ================= PRELOADER ================= */
function FsPreloader({ onReveal, onGone }) {
  const [n, setN] = useStateC(0);
  const [out, setOut] = useStateC(false);
  useEffectC(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      onReveal(); onGone();
      return;
    }
    let raf, t2, t3, t4;
    const t0 = performance.now();
    const DUR = 1350;
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / DUR);
      setN(Math.round((1 - Math.pow(1 - p, 2.4)) * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else {
        t2 = setTimeout(() => {
          setOut(true);
          t3 = setTimeout(onReveal, 300);
          t4 = setTimeout(onGone, 1000);
        }, 170);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, []);
  return (
    <div className={'pre' + (out ? ' pre-out' : '')} aria-hidden="true">
      <div className="pre-hex">
        <div className="pre-hex-in">
          <img src="../../assets/mark-gold.png" alt="" style={{ width: 62, display: 'block' }} onError={fsImgFallback('mark-gold')} />
        </div>
      </div>
      <div className="pre-count">{n}</div>
      <div className="pre-meta">
        LAIVEAI.COM<br />
        BUILT TO HELP YOU LEAD
      </div>
    </div>
  );
}

/* ================= HERO FLOW FIELD ================= */
/* Gold particle streams driven by a layered-sine flow field; the pointer
   repels particles. Trails via destination-out fade; additive strokes. */
function FsHeroCanvas({ density = 5, speed = 1 }) {
  const ref = useRefC(null);
  useEffectC(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext('2d');
    /* Ambient brand motion: the field flows whenever the Motion tweak is on.
       OS-level reduced-motion no longer freezes it (it still disables all
       entrance/transition animation via CSS) — it just gentles the speed.
       The Tweaks “Motion” toggle remains the full off-switch (speed === 0). */
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const mo = speed === 0 ? 0 : (reduced ? Math.min(speed, 0.55) : speed);
    let W = 0, H = 0, raf = 0, t = 0, visible = true, alive = true;
    let parts = [];
    const mouse = { x: -9999, y: -9999, tx: -9999, ty: -9999 };
    const PAL = ['247,214,74', '232,179,23', '232,179,23', '217,148,74', '176,106,46'];
    const rand = (a, b) => a + Math.random() * (b - a);
    const spawn = () => {
      const p = {
        x: rand(0, W), y: rand(0, H), px: 0, py: 0,
        sp: rand(0.35, 1.6),
        c: PAL[(Math.random() * PAL.length) | 0],
        a: rand(0.14, 0.6),
        w: rand(0.6, 1.6),
        life: rand(160, 560),
      };
      p.px = p.x; p.py = p.y;
      return p;
    };
    const resize = () => {
      W = cv.offsetWidth; H = cv.offsetHeight;
      const DPR = Math.min(window.devicePixelRatio || 1, 1.6);
      cv.width = Math.max(1, W * DPR); cv.height = Math.max(1, H * DPR);
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      const n = Math.min(850, Math.round((W * H) / 6200 * (density / 5)));
      parts = Array.from({ length: n }, spawn);
      ctx.clearRect(0, 0, W, H);
    };
    const field = (x, y) =>
      Math.sin(x * 0.0012 + t * 0.00022) * 1.9 +
      Math.cos(y * 0.0014 - t * 0.00017) * 1.7 +
      Math.sin((x + y) * 0.0005 + t * 0.0001) * 1.1;
    const step = (dt) => {
      t += dt;
      mouse.x += (mouse.tx - mouse.x) * 0.12;
      mouse.y += (mouse.ty - mouse.y) * 0.12;
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = 'rgba(0,0,0,0.075)';
      ctx.fillRect(0, 0, W, H);
      ctx.globalCompositeOperation = 'lighter';
      const k = (dt / 16.7) * (mo || 1);
      for (const p of parts) {
        const ang = field(p.x, p.y);
        let vx = Math.cos(ang) * p.sp;
        let vy = Math.sin(ang) * p.sp * 0.85;
        const dx = p.x - mouse.x, dy = p.y - mouse.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 24025) {
          const d = Math.sqrt(d2) || 1;
          const f = ((155 - d) / 155) * 2.8;
          vx += (dx / d) * f; vy += (dy / d) * f;
        }
        p.px = p.x; p.py = p.y;
        p.x += vx * k; p.y += vy * k;
        if (--p.life < 0 || p.x < -24 || p.x > W + 24 || p.y < -24 || p.y > H + 24) {
          Object.assign(p, spawn());
          continue;
        }
        ctx.strokeStyle = `rgba(${p.c},${p.a})`;
        ctx.lineWidth = p.w;
        ctx.beginPath();
        ctx.moveTo(p.px, p.py);
        ctx.lineTo(p.x, p.y);
        ctx.stroke();
      }
    };
    /* warm-up so the field isn't empty on first paint */
    const warm = (frames) => { for (let i = 0; i < frames; i++) step(16.7); };

    resize();
    warm(70);
    if (mo === 0) {
      /* static frame only */
    } else {
      let last = performance.now();
      const loop = (now) => {
        if (!alive) return;
        raf = requestAnimationFrame(loop);
        const dt = Math.min(50, now - last);
        last = now;
        if (!visible || document.hidden) return;
        step(dt * mo);
      };
      raf = requestAnimationFrame(loop);
    }

    const onMove = (e) => {
      const r = cv.getBoundingClientRect();
      mouse.tx = e.clientX - r.left;
      mouse.ty = e.clientY - r.top;
    };
    const onLeave = () => { mouse.tx = -9999; mouse.ty = -9999; };
    const io = new IntersectionObserver(([en]) => { visible = en.isIntersecting; }, { threshold: 0 });
    io.observe(cv);
    window.addEventListener('pointermove', onMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);
    window.addEventListener('resize', resize);
    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('resize', resize);
    };
  }, [density, speed]);
  return <canvas ref={ref} className="hero-canvas" aria-hidden="true"></canvas>;
}

Object.assign(window, { FsPreloader, FsHeroCanvas });
