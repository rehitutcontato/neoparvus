import { useEffect, useRef, useState } from 'react';

export default function Eclipse() {
  const wrapperRef = useRef(null);
  const coreRef = useRef(null);
  const flaresRef = useRef(null);
  const [isMobile, setIsMobile] = useState(() => 
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Smooth mouse parallax with 3D tilt
  useEffect(() => {
    if (isMobile) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let animId;

    const handleMouseMove = (e) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      targetX = (e.clientX - cx) / cx;
      targetY = (e.clientY - cy) / cy;
    };

    const updateParallax = () => {
      // Lerp for butter-smooth movement
      currentX += (targetX - currentX) * 0.06;
      currentY += (targetY - currentY) * 0.06;

      if (wrapperRef.current) {
        wrapperRef.current.style.transform = `translate(${currentX * 18}px, ${currentY * 14}px)`;
      }
      if (coreRef.current) {
        coreRef.current.style.transform = `perspective(1000px) rotateY(${currentX * 12}deg) rotateX(${-currentY * 10}deg)`;
      }
      if (flaresRef.current) {
        flaresRef.current.style.transform = `translate(-50%, -50%) translate(${currentX * -10}px, ${currentY * -8}px)`;
      }

      animId = requestAnimationFrame(updateParallax);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    animId = requestAnimationFrame(updateParallax);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, [isMobile]);

  const coreSize = isMobile ? '190px' : '420px';
  const coronaSize = isMobile ? '300px' : '720px';
  const innerCoronaSize = isMobile ? '240px' : '560px';
  const ambientSize = isMobile ? '340px' : '980px';

  return (
    <div
      ref={wrapperRef}
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        maxWidth: '100%',
        height: '100%',
        pointerEvents: 'none',
        userSelect: 'none',
        willChange: 'transform',
        overflow: 'hidden',
      }}
      aria-hidden="true"
    >
      {/* 1. Deep Ambient Cosmic Magma Glow */}
      <div
        style={{
          position: 'absolute',
          width: ambientSize,
          height: ambientSize,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255, 94, 0, 0.12) 0%, rgba(255, 140, 0, 0.05) 35%, transparent 68%)',
          filter: 'blur(60px)',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 0,
        }}
      />

      {/* 2. Anamorphic Cinematic Lens Flare Beam */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          width: isMobile ? '100%' : '1200px',
          maxWidth: '100%',
          height: '2px',
          background: 'linear-gradient(90deg, transparent 0%, rgba(255, 94, 0, 0.1) 15%, rgba(255, 140, 0, 0.5) 45%, #FFFFFF 50%, rgba(255, 140, 0, 0.5) 55%, rgba(255, 94, 0, 0.1) 85%, transparent 100%)',
          boxShadow: '0 0 24px rgba(255, 94, 0, 0.7), 0 0 60px rgba(255, 140, 0, 0.4)',
          zIndex: 1,
          opacity: 0.85,
          filter: 'blur(0.5px)',
        }}
      />

      {/* 3. Outer Rotating Solar Corona */}
      <div
        style={{
          position: 'absolute',
          width: coronaSize,
          height: coronaSize,
          borderRadius: '50%',
          background: `
            radial-gradient(circle, transparent 32%, rgba(255, 94, 0, 0.02) 42%, rgba(255, 94, 0, 0.22) 52%, rgba(255, 140, 0, 0.12) 62%, transparent 75%),
            conic-gradient(from 0deg, rgba(255, 94, 0, 0.22), rgba(255, 140, 0, 0.1), rgba(255, 94, 0, 0.28), rgba(255, 42, 0, 0.08), rgba(255, 140, 0, 0.2), rgba(255, 94, 0, 0.22))
          `,
          filter: 'blur(36px)',
          animation: 'coronaRotate 50s linear infinite, subtlePulse 5s ease-in-out infinite',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 2,
        }}
      />

      {/* 4. Multi-Faceted Corona Flares */}
      <div
        ref={flaresRef}
        style={{
          position: 'absolute',
          width: coronaSize,
          height: coronaSize,
          borderRadius: '50%',
          background: `
            conic-gradient(from 30deg, transparent 0deg, rgba(255, 94, 0, 0.14) 25deg, transparent 50deg,
              transparent 80deg, rgba(255, 140, 0, 0.12) 110deg, transparent 130deg,
              transparent 175deg, rgba(255, 94, 0, 0.18) 205deg, transparent 235deg,
              transparent 270deg, rgba(255, 140, 0, 0.14) 300deg, transparent 330deg)
          `,
          filter: 'blur(28px)',
          animation: 'coronaRotate 75s linear infinite reverse',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 3,
        }}
      />

      {/* 5. Inner Solar Ring (Sharp & Radiant) */}
      <div
        style={{
          position: 'absolute',
          width: innerCoronaSize,
          height: innerCoronaSize,
          borderRadius: '50%',
          background: `
            radial-gradient(circle, transparent 40%, rgba(255, 94, 0, 0.35) 50%, rgba(255, 160, 0, 0.2) 58%, transparent 68%)
          `,
          filter: 'blur(16px)',
          animation: 'coronaRotate 30s linear infinite, subtlePulse 3.5s ease-in-out infinite 0.5s',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 4,
        }}
      />

      {/* 6. Core Obsidian Monolith Sphere */}
      <div
        ref={coreRef}
        style={{
          position: 'relative',
          width: coreSize,
          height: coreSize,
          borderRadius: '50%',
          background: 'radial-gradient(circle at 35% 30%, #1e1e24 0%, #0a0a0d 45%, #000000 85%)',
          boxShadow: `
            inset 0 0 80px rgba(0, 0, 0, 1),
            inset 0 0 30px rgba(255, 94, 0, 0.15),
            0 0 70px rgba(255, 94, 0, 0.35),
            0 0 140px rgba(255, 94, 0, 0.18),
            0 0 240px rgba(255, 140, 0, 0.1)
          `,
          zIndex: 5,
          animation: 'pulseGlow 5s ease-in-out infinite',
          transition: 'transform 0.15s ease-out',
        }}
      >
        {/* White-Hot Incandescent Crescent Rim Light */}
        <div
          style={{
            position: 'absolute',
            inset: '-2px',
            borderRadius: '50%',
            background: `conic-gradient(
              from 215deg,
              transparent 0deg,
              rgba(255, 255, 255, 0.95) 20deg,
              rgba(255, 160, 0, 0.85) 45deg,
              rgba(255, 94, 0, 0.5) 75deg,
              transparent 120deg,
              transparent 230deg,
              rgba(255, 94, 0, 0.3) 280deg,
              transparent 330deg
            )`,
            filter: 'blur(3px)',
            zIndex: 6,
          }}
        />

        {/* Inner Eclipse Shading & Micro-Texture */}
        <div
          style={{
            position: 'absolute',
            inset: '3px',
            borderRadius: '50%',
            background: 'radial-gradient(circle at 45% 45%, #050505 0%, #000000 100%)',
            zIndex: 7,
          }}
        />
      </div>
    </div>
  );
}
