import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Eclipse from './Eclipse';

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(useGSAP);

const WA_LINK = 'https://wa.me/5519994656845?text=Ol%C3%A1%20Pablo%2C%20estou%20pronto%20para%20experimentar%20o%20novo%20na%20minha%20empresa.';

export default function Hero() {
  const containerRef = useRef(null);
  const eclipseRef = useRef(null);
  const contentRef = useRef(null);

  useGSAP(() => {
    // Premium Initial Reveal
    gsap.from('.hero-reveal', {
      y: 60,
      scale: 0.95,
      opacity: 0,
      filter: 'blur(12px)',
      duration: 1.8,
      stagger: 0.15,
      ease: 'power3.out',
      delay: 0.3
    });

    // Scroll Scrubbing
    gsap.to(contentRef.current, {
      y: -150,
      opacity: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      }
    });

    gsap.to(eclipseRef.current, {
      scale: 1.15,
      y: 100,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      }
    });
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        paddingTop: '100px',
        paddingBottom: '80px',
      }}
    >
      {/* Eclipse background */}
      <div
        ref={eclipseRef}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -55%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 0,
        }}
      >
        <Eclipse />
      </div>

      {/* Content overlay */}
      <div
        ref={contentRef}
        className="container"
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        {/* Monospace labels */}
        <div
          className="hide-mobile hero-reveal"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            maxWidth: '700px',
            marginBottom: '280px',
          }}
          className="hide-mobile"
        >
          <span className="label-mono">FOUNDER LED · 2026</span>
          <span className="label-mono" style={{ fontStyle: 'italic' }}>BUILT FOR PERCEPTION</span>
        </div>

        {/* Mobile spacer */}
        <div className="hide-desktop" style={{ height: '200px' }} />

        {/* Sub-tag */}
        <p
          className="label-mono hero-reveal"
          style={{
            marginBottom: '24px',
            letterSpacing: '0.2em',
            fontSize: '12px',
          }}
        >
          ESTRATÉGIA, DESIGN E ENGENHARIA
        </p>

        {/* Main Headline */}
        <h1
          className="headline-xl hero-reveal headline-brutal"
          style={{
            maxWidth: '1000px',
            marginBottom: '28px',
            textShadow: '0 0 80px rgba(255, 255, 255, 0.1)',
            fontSize: 'clamp(3.5rem, 8vw, 6.5rem)',
            lineHeight: 1.05
          }}
        >
          A PORTA PARA A EXPANSÃO<br />
          <span className="magma-text" style={{ textShadow: '0 0 40px rgba(255, 94, 0, 0.3)' }}>DA SUA MARCA.</span>
        </h1>

        {/* Sub-headline */}
        <p
          className="body-text hero-reveal"
          style={{
            maxWidth: '680px',
            marginBottom: '16px',
            fontSize: '19px',
            lineHeight: 1.7,
            color: 'var(--zinc-tech)'
          }}
        >
          Você está pronto para experimentar o novo para sua empresa? Construímos 
          ativos digitais implacáveis que não apenas informam, mas{' '}
          <strong style={{ color: 'var(--titanium)', fontWeight: 600 }}>
            convertem status em faturamento real.
          </strong>
        </p>



        {/* CTAs */}
        <div
          className="hero-reveal"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '24px',
            justifyContent: 'center',
            marginBottom: '64px',
            marginTop: '32px'
          }}
        >
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{ 
              padding: '20px 48px', 
              fontSize: '16px',
              textTransform: 'uppercase',
              fontWeight: 800,
              boxShadow: '0 0 40px rgba(255, 94, 0, 0.2)'
            }}
            onMouseEnter={e => {
              e.target.style.transform = 'scale(1.02)';
              e.target.style.background = '#fff';
              e.target.style.color = '#000';
              e.target.style.boxShadow = '0 0 60px rgba(255, 94, 0, 0.4)';
            }}
            onMouseLeave={e => {
              e.target.style.transform = 'scale(1)';
              e.target.style.background = 'var(--void)';
              e.target.style.color = 'var(--titanium)';
              e.target.style.boxShadow = '0 0 40px rgba(255, 94, 0, 0.2)';
            }}
          >
            Abrir as portas ↗
          </a>
          <a 
            href="#solucoes" 
            className="btn-secondary"
            style={{ 
              padding: '20px 48px', 
              fontSize: '16px',
              textTransform: 'uppercase',
              fontWeight: 600,
              borderColor: 'rgba(255,255,255,0.1)'
            }}
          >
            Explorar ativos ↓
          </a>
        </div>

        {/* Glass info cards */}
        <div
          className="hero-reveal"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '16px',
            width: '100%',
            maxWidth: '560px',
          }}
        >
          <div className="glass-card" style={{ transition: 'transform 0.4s ease, box-shadow 0.4s ease', cursor: 'default' }} onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)'; }} onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
            <span
              className="label-mono"
              style={{ marginBottom: '8px', display: 'block', color: 'var(--zinc-tech)' }}
            >
              CÓDIGO PRÓPRIO
            </span>
            <span style={{
              fontSize: '20px',
              fontWeight: 500,
              color: 'var(--titanium-90)',
              letterSpacing: '-0.01em',
            }}>
              Zero templates.
            </span>
          </div>

          <div className="glass-card" style={{ transition: 'transform 0.4s ease, box-shadow 0.4s ease', cursor: 'default' }} onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,94,0,0.2)'; }} onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
            <span
              className="label-mono"
              style={{ marginBottom: '8px', display: 'block', color: 'var(--zinc-tech)' }}
            >
              INVESTIMENTO A PARTIR DE
            </span>
            <span style={{
              fontSize: '24px',
              fontWeight: 700,
              color: 'var(--titanium)',
              letterSpacing: '-0.02em',
              textShadow: '0 0 40px rgba(255, 94, 0, 0.2), 0 0 80px rgba(255, 94, 0, 0.08)',
            }}>
              R$ 6.000
            </span>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '200px',
          background: 'linear-gradient(to top, #000 0%, transparent 100%)',
          zIndex: 5,
          pointerEvents: 'none',
        }}
      />
    </section>
  );
}
