import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(useGSAP);

export default function OpeningDoor() {
  const containerRef = useRef(null);
  
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
        pin: '.door-pinned'
      }
    });

    // 1. Open the doors
    tl.to('.door-left', { xPercent: -100, duration: 2 }, 0)
      .to('.door-right', { xPercent: 100, duration: 2 }, 0)
      
      // 2. Reveal text 1
      .to('.door-text-1', { opacity: 1, y: 0, duration: 1 }, 1.5)
      .to('.door-text-1', { opacity: 0, y: -40, duration: 1 }, 2.5)
      
      // 3. Reveal text 2
      .to('.door-text-2', { opacity: 1, y: 0, duration: 1 }, 3)
      .to('.door-text-2', { opacity: 0, y: -40, duration: 1 }, 4)

      // 4. Reveal text 3 (Stays till end)
      .to('.door-text-3', { opacity: 1, y: 0, duration: 1 }, 4.5)
      
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="section-border" style={{ position: 'relative', height: '400vh', background: 'var(--void)' }}>
      <div 
        className="door-pinned" 
        style={{ 
          position: 'absolute', 
          top: 0, 
          height: '100vh', 
          width: '100%', 
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {/* Glow behind doors */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '800px',
          height: '800px',
          background: 'radial-gradient(circle, rgba(255,94,0,0.15) 0%, transparent 60%)',
          zIndex: 1
        }} />

        {/* Text Container */}
        <div className="container" style={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', alignItems: 'center' }}>
          <h2 className="door-text-1 headline-md" style={{ position: 'absolute', left: 0, right: 0, opacity: 0, transform: 'translateY(40px)', color: 'var(--zinc-tech)', textAlign: 'center' }}>
            O que separa sua marca do próximo nível...
          </h2>
          <h2 className="door-text-2 headline-lg" style={{ position: 'absolute', left: 0, right: 0, opacity: 0, transform: 'translateY(40px)', textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
            Não é mais orçamento de tráfego.
          </h2>
          <h2 className="door-text-3 headline-xl magma-text headline-brutal" style={{ position: 'absolute', left: 0, right: 0, opacity: 0, transform: 'translateY(40px)', textAlign: 'center', display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '0.4em', color: 'var(--titanium)', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '16px' }}>É apenas um:</span>
            POSICIONAMENTO IMPECÁVEL.
          </h2>
        </div>

        {/* The Doors */}
        <div className="door-left" style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: '50vw', background: 'var(--obsidian)', borderRight: '1px solid rgba(255,255,255,0.05)', zIndex: 10 }} />
        <div className="door-right" style={{ position: 'absolute', top: 0, bottom: 0, right: 0, width: '50vw', background: 'var(--obsidian)', borderLeft: '1px solid rgba(255,255,255,0.05)', zIndex: 10 }} />
      </div>
    </section>
  );
}
