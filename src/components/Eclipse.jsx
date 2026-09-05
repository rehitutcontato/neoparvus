import { useEffect, useRef } from 'react';

const ECLIPSE_CSS = {
  wrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    userSelect: 'none',
  },
  corona: {
    position: 'absolute',
    width: '650px',
    height: '650px',
    borderRadius: '50%',
    background: `
      radial-gradient(circle, transparent 30%, rgba(255, 94, 0, 0.0) 40%, rgba(255, 94, 0, 0.12) 50%, rgba(255, 140, 0, 0.08) 60%, transparent 72%),
      conic-gradient(from 0deg, rgba(255, 94, 0, 0.15), rgba(255, 140, 0, 0.08), rgba(255, 94, 0, 0.2), rgba(255, 140, 0, 0.05), rgba(255, 94, 0, 0.15))
    `,
    filter: 'blur(30px)',
    animation: 'coronaRotate 60s linear infinite, subtlePulse 4s ease-in-out infinite',
    zIndex: 1,
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
  },
  coronaInner: {
    position: 'absolute',
    width: '520px',
    height: '520px',
    borderRadius: '50%',
    background: `
      radial-gradient(circle, transparent 35%, rgba(255, 94, 0, 0.2) 48%, rgba(255, 140, 0, 0.12) 55%, transparent 68%)
    `,
    filter: 'blur(18px)',
    animation: 'coronaRotate 40s linear infinite reverse, subtlePulse 3s ease-in-out infinite 1s',
    zIndex: 2,
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
  },
  flares: {
    position: 'absolute',
    width: '700px',
    height: '700px',
    borderRadius: '50%',
    background: `
      conic-gradient(from 45deg, transparent 0deg, rgba(255, 94, 0, 0.08) 20deg, transparent 40deg,
        transparent 80deg, rgba(255, 140, 0, 0.06) 100deg, transparent 120deg,
        transparent 180deg, rgba(255, 94, 0, 0.1) 200deg, transparent 220deg,
        transparent 280deg, rgba(255, 140, 0, 0.07) 300deg, transparent 320deg)
    `,
    filter: 'blur(40px)',
    animation: 'coronaRotate 80s linear infinite',
    zIndex: 0,
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
  },
  core: {
    position: 'relative',
    width: '380px',
    height: '380px',
    borderRadius: '50%',
    background: `radial-gradient(circle at 40% 35%, #111 0%, #050505 40%, #000 100%)`,
    boxShadow: `
      inset 0 0 60px rgba(0, 0, 0, 1),
      0 0 60px rgba(255, 94, 0, 0.2),
      0 0 120px rgba(255, 94, 0, 0.1),
      0 0 200px rgba(255, 140, 0, 0.06)
    `,
    zIndex: 3,
    animation: 'pulseGlow 6s ease-in-out infinite',
  },
  rimLight: {
    position: 'absolute',
    inset: '-3px',
    borderRadius: '50%',
    background: `conic-gradient(from 200deg, transparent 0deg, rgba(255, 94, 0, 0.6) 30deg, rgba(255, 140, 0, 0.4) 60deg, transparent 120deg, transparent 180deg, rgba(255, 94, 0, 0.2) 240deg, transparent 300deg)`,
    filter: 'blur(4px)',
    zIndex: 2,
  },
  ambientGlow: {
    position: 'absolute',
    width: '900px',
    height: '900px',
    borderRadius: '50%',
    background: `radial-gradient(circle, rgba(255, 94, 0, 0.04) 0%, rgba(255, 140, 0, 0.02) 30%, transparent 60%)`,
    zIndex: -1,
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    pointerEvents: 'none',
  },
};

/* ── Responsive overrides ── */
const mobileOverrides = {
  corona: { width: '400px', height: '400px' },
  coronaInner: { width: '320px', height: '320px' },
  flares: { width: '440px', height: '440px' },
  core: { width: '240px', height: '240px' },
  ambientGlow: { width: '550px', height: '550px' },
};

export default function Eclipse() {
  const wrapperRef = useRef(null);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  const getStyle = (key) => {
    const base = ECLIPSE_CSS[key];
    const mobile = isMobile ? mobileOverrides[key] : undefined;
    return mobile ? { ...base, ...mobile } : base;
  };

  // Parallax on mousemove
  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper || isMobile) return;

    let ticking = false;

    const handleMouseMove = (e) => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const cx = window.innerWidth / 2;
        const cy = window.innerHeight / 2;
        const dx = (e.clientX - cx) / cx;
        const dy = (e.clientY - cy) / cy;

        wrapper.style.transform = `translate(${dx * 8}px, ${dy * 6}px)`;
        ticking = false;
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isMobile]);

  return (
    <div
      ref={wrapperRef}
      style={ECLIPSE_CSS.wrapper}
      aria-hidden="true"
    >
      {/* Ambient glow */}
      <div style={getStyle('ambientGlow')} />

      {/* Outer flares */}
      <div style={getStyle('flares')} />

      {/* Outer corona */}
      <div style={getStyle('corona')} />

      {/* Inner corona */}
      <div style={getStyle('coronaInner')} />

      {/* Core monolith */}
      <div style={getStyle('core')}>
        {/* Rim light */}
        <div style={ECLIPSE_CSS.rimLight} />
      </div>
    </div>
  );
}
