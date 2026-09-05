import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const milestones = [
  { value: 'R$ 15.000', copy: '1 único contrato de alto valor.' },
  { value: 'R$ 50.000', copy: 'A página já se pagou múltiplas vezes.' },
  { value: 'R$ 200.000+', copy: 'Daqui pra frente, é puro lucro líquido.' },
  { value: 'ESCALA', copy: 'Isso não é uma despesa. É alavancagem.' }
];

export default function Investment() {
  const containerRef = useRef(null);

  useGSAP(() => {
    // Hide chart line and milestones initially
    gsap.set('.invest-chart-line', { height: '0%' });
    gsap.set('.invest-milestone', { opacity: 0, y: 100 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
        pin: '.invest-pinned',
      }
    });

    // 1. Fade out subtitles
    tl.to('.invest-sub', { opacity: 0, duration: 0.4 }, 0);

    // 2. Shrink and move the 6k price to bottom left
    tl.to('.invest-price', {
      scale: 0.25,
      x: '-30vw',
      y: '35vh',
      color: '#52525B', // zinc-dark
      textShadow: 'none',
      duration: 1.5,
      ease: 'power2.inOut'
    }, 0);

    // 3. Grow chart line
    tl.to('.invest-chart-line', {
      height: '75vh',
      duration: 2.5,
      ease: 'none'
    }, 1);

    // 4. Reveal milestones sequentially as the line grows
    const milestoneElements = gsap.utils.toArray('.invest-milestone');
    milestoneElements.forEach((m, i) => {
      const startTime = 1.2 + (i * 0.6);
      
      tl.to(m, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power2.out'
      }, startTime);

      // Push previous up and fade
      if (i > 0) {
        tl.to(milestoneElements[i - 1], {
          opacity: 0.2,
          y: -40,
          scale: 0.9,
          duration: 0.5,
          filter: 'blur(4px)'
        }, startTime);
      }
    });

  }, { scope: containerRef });

  return (
    <section id="investimento" ref={containerRef} style={{ height: '400vh', position: 'relative', background: 'var(--void)' }}>
      <div 
        className="invest-pinned"
        style={{
          position: 'absolute',
          top: 0,
          width: '100%',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden'
        }}
      >
        {/* Background glow */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(255, 94, 0, 0.05) 0%, transparent 60%)',
          pointerEvents: 'none',
        }} />

        {/* The 6k Price (Starts huge, shrinks to corner) */}
        <div style={{ position: 'absolute', zIndex: 10, textAlign: 'center' }}>
          <p className="invest-sub label-mono" style={{ marginBottom: '24px', letterSpacing: '0.1em' }}>
            POR QUE
          </p>
          <h2
            className="invest-price headline-brutal"
            style={{
              fontSize: 'clamp(5rem, 12vw, 10rem)',
              color: 'var(--amber)',
              textShadow: '0 0 60px rgba(255,94,0,0.4), 0 0 120px rgba(255,94,0,0.2)',
              margin: 0,
              lineHeight: 1,
              transformOrigin: 'center center'
            }}
          >
            R$ 6.000
          </h2>
          <p className="invest-sub label-mono" style={{ marginTop: '24px', letterSpacing: '0.1em' }}>
            É O PONTO DE PARTIDA, NÃO O TETO.
          </p>
        </div>

        {/* The Chart Line */}
        <div 
          className="invest-chart-line"
          style={{
            position: 'absolute',
            bottom: '10vh',
            left: '20vw', /* Aligns near where the 6k shrinks to */
            width: '4px',
            background: 'linear-gradient(to top, rgba(255,94,0,0.1), var(--amber), #FFD700)',
            boxShadow: '0 0 20px var(--amber), 0 0 40px rgba(255,94,0,0.5)',
            borderRadius: '4px',
            transformOrigin: 'bottom center',
            zIndex: 5
          }}
        />

        {/* Milestones Container */}
        <div style={{
          position: 'absolute',
          left: '25vw', /* Right of the line */
          bottom: '15vh',
          height: '70vh',
          width: '60vw',
          display: 'flex',
          flexDirection: 'column-reverse',
          justifyContent: 'space-between',
          zIndex: 6
        }}>
          {milestones.map((m, i) => (
            <div key={i} className="invest-milestone" style={{ position: 'absolute', bottom: `${i * 22}%` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                <div style={{ width: '40px', height: '1px', background: 'var(--amber)', opacity: 0.5 }} />
                <div>
                  <h3 className="headline-brutal" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', margin: 0, color: 'var(--titanium)' }}>
                    {m.value}
                  </h3>
                  <p className="body-text" style={{ fontSize: '18px', color: 'var(--amber)', fontWeight: 500, marginTop: '8px' }}>
                    {m.copy}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
