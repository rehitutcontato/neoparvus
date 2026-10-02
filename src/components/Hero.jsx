import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Eclipse from './Eclipse';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const WA_LINK = 'https://wa.me/5519994656845?text=Ol%C3%A1%20Pablo%2C%20estou%20pronto%20para%20experimentar%20o%20novo%20na%20minha%20empresa.';

export default function Hero() {
  const containerRef = useRef(null);
  const eclipseRef = useRef(null);
  const contentRef = useRef(null);

  useGSAP(() => {
    // Initial Staggered Reveal
    gsap.from('.hero-reveal', {
      y: 45,
      opacity: 0,
      filter: 'blur(10px)',
      duration: 1.4,
      stagger: 0.12,
      ease: 'power3.out',
      delay: 0.2,
      clearProps: 'filter',
    });

    // Subtle scroll parallax
    gsap.to(contentRef.current, {
      y: -100,
      opacity: 0.2,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom 40%',
        scrub: true,
      },
    });

    gsap.to(eclipseRef.current, {
      scale: 1.2,
      y: 80,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });
  }, { scope: containerRef });

  const handleOpenDemo = (type) => {
    if (type === 'enterprise') {
      window.dispatchEvent(new CustomEvent('open-enterprise'));
    } else {
      window.dispatchEvent(new CustomEvent('open-midiakit'));
    }
    const target = document.querySelector('#solucoes');
    if (target) {
      const y = target.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

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
        paddingTop: '110px',
        paddingBottom: '60px',
      }}
    >
      {/* Background Eclipse & Solar Corona */}
      <div
        ref={eclipseRef}
        style={{
          position: 'absolute',
          top: '48%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      >
        <Eclipse />
      </div>

      {/* Main Content Overlay */}
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
          width: '100%',
          maxWidth: '1100px',
        }}
      >
        {/* Top HUD Status Bar */}
        <div
          className="hero-reveal"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            padding: '6px 18px',
            borderRadius: '100px',
            background: 'rgba(10, 10, 10, 0.8)',
            border: '1px solid var(--glass-border)',
            backdropFilter: 'blur(20px)',
            marginBottom: '28px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
          }}
        >
          <span
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: '#22c55e',
              boxShadow: '0 0 10px #22c55e',
              display: 'inline-block',
            }}
          />
          <span
            className="label-mono"
            style={{
              fontSize: '11px',
              color: 'var(--titanium)',
              letterSpacing: '0.12em',
              fontWeight: 600,
            }}
          >
            FOUNDER-LED STUDIO · 2026
          </span>
          <span style={{ color: 'var(--zinc-dark)' }}>·</span>
          <span
            className="label-mono"
            style={{
              fontSize: '11px',
              color: 'var(--zinc-tech)',
              letterSpacing: '0.08em',
            }}
          >
            DISPONÍVEL PARA NOVOS ATIVOS
          </span>
        </div>

        {/* Tactical Sub-tag */}
        <p
          className="label-mono hero-reveal"
          style={{
            marginBottom: '20px',
            letterSpacing: '0.22em',
            fontSize: '12px',
            color: 'var(--amber)',
            textShadow: '0 0 20px rgba(255, 94, 0, 0.4)',
            fontWeight: 600,
          }}
        >
          ESTRATÉGIA · DESIGN DE IMPACTO · ENGENHARIA PRÓPRIA
        </p>

        {/* Main Brutalist Headline */}
        <h1
          className="headline-xl hero-reveal headline-brutal"
          style={{
            maxWidth: '1000px',
            marginBottom: '24px',
            fontSize: 'clamp(3rem, 7.5vw, 6.2rem)',
            lineHeight: 1.02,
            letterSpacing: '-0.035em',
            textShadow: '0 4px 30px rgba(0, 0, 0, 0.8)',
          }}
        >
          A PORTA PARA A EXPANSÃO<br />
          <span className="magma-text">DA SUA MARCA.</span>
        </h1>

        {/* High-Ticket Manifesto Sub-headline */}
        <p
          className="body-text hero-reveal"
          style={{
            maxWidth: '720px',
            marginBottom: '32px',
            fontSize: 'clamp(16px, 2vw, 19px)',
            lineHeight: 1.7,
            color: 'var(--titanium-70)',
          }}
        >
          Você está pronto para experimentar o novo na sua empresa? Construímos 
          ativos digitais implacáveis que não apenas informam, mas{' '}
          <strong style={{ color: 'var(--titanium)', fontWeight: 600 }}>
            convertem status em faturamento real.
          </strong>
        </p>

        {/* CTAs Group */}
        <div
          className="hero-reveal"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '16px',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '28px',
          }}
        >
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{
              padding: '18px 44px',
              fontSize: '15px',
              textTransform: 'uppercase',
              fontWeight: 800,
              boxShadow: '0 0 45px rgba(255, 94, 0, 0.3)',
              borderRadius: 'var(--radius-sm)',
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
              e.currentTarget.style.boxShadow = '0 0 70px rgba(255, 94, 0, 0.5)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = '0 0 45px rgba(255, 94, 0, 0.3)';
            }}
          >
            Abrir as portas ↗
          </a>

          <a
            href="#solucoes"
            className="btn-secondary"
            style={{
              padding: '18px 40px',
              fontSize: '15px',
              textTransform: 'uppercase',
              fontWeight: 600,
              borderRadius: 'var(--radius-sm)',
              borderColor: 'rgba(255, 255, 255, 0.12)',
              background: 'rgba(10, 10, 10, 0.5)',
              backdropFilter: 'blur(10px)',
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'var(--amber)';
              e.currentTarget.style.color = 'var(--titanium)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
              e.currentTarget.style.color = 'var(--titanium-50)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            Explorar ativos ↓
          </a>
        </div>

        {/* Live Interactive Demo Quick Launchers */}
        <div
          className="hero-reveal"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '12px',
            justifyContent: 'center',
            marginBottom: '48px',
          }}
        >
          <button
            type="button"
            onClick={() => handleOpenDemo('enterprise')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '7px 16px',
              borderRadius: '100px',
              background: 'rgba(255, 94, 0, 0.08)',
              border: '1px solid rgba(255, 94, 0, 0.25)',
              color: 'var(--amber)',
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              transition: 'all 0.25s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(255, 94, 0, 0.18)';
              e.currentTarget.style.borderColor = 'var(--amber)';
              e.currentTarget.style.boxShadow = '0 0 20px rgba(255, 94, 0, 0.25)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(255, 94, 0, 0.08)';
              e.currentTarget.style.borderColor = 'rgba(255, 94, 0, 0.25)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <span>⚡ Demo B2B Corporativa</span>
            <span style={{ fontSize: '12px' }}>↓</span>
          </button>

          <button
            type="button"
            onClick={() => handleOpenDemo('midiakit')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '7px 16px',
              borderRadius: '100px',
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              color: 'var(--titanium-70)',
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              transition: 'all 0.25s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
              e.currentTarget.style.borderColor = 'var(--titanium)';
              e.currentTarget.style.color = 'var(--titanium)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
              e.currentTarget.style.color = 'var(--titanium-70)';
            }}
          >
            <span>⚡ Demo Mídia Kit Interativo</span>
            <span style={{ fontSize: '12px' }}>↓</span>
          </button>
        </div>

        {/* 3 Industrial Trust & Proof Bento Cards */}
        <div
          className="hero-reveal"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '16px',
            width: '100%',
            maxWidth: '880px',
          }}
        >
          {/* Card 1 */}
          <div
            className="glass-card"
            style={{
              padding: '24px',
              textAlign: 'left',
              background: 'linear-gradient(180deg, rgba(18, 18, 20, 0.7) 0%, rgba(8, 8, 10, 0.85) 100%)',
              transition: 'all 0.35s ease',
              cursor: 'default',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-6px)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
              e.currentTarget.style.boxShadow = '0 16px 36px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.1)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = 'var(--glass-border)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <span
              className="label-mono"
              style={{
                marginBottom: '8px',
                display: 'block',
                color: 'var(--amber)',
                fontSize: '10px',
                fontWeight: 600,
              }}
            >
              01 / ARQUITETURA
            </span>
            <span
              style={{
                fontSize: '18px',
                fontWeight: 600,
                color: 'var(--titanium)',
                display: 'block',
                marginBottom: '6px',
                letterSpacing: '-0.01em',
              }}
            >
              Código Próprio.
            </span>
            <p
              className="body-sm"
              style={{ fontSize: '13px', margin: 0, color: 'var(--zinc-tech)' }}
            >
              Zero templates lentos. Velocidade instantânea e autonomia total.
            </p>
          </div>

          {/* Card 2 */}
          <div
            className="glass-card"
            style={{
              padding: '24px',
              textAlign: 'left',
              background: 'linear-gradient(180deg, rgba(18, 18, 20, 0.7) 0%, rgba(8, 8, 10, 0.85) 100%)',
              transition: 'all 0.35s ease',
              cursor: 'default',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-6px)';
              e.currentTarget.style.borderColor = 'rgba(255, 94, 0, 0.3)';
              e.currentTarget.style.boxShadow = '0 16px 36px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 94, 0, 0.2)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = 'var(--glass-border)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <span
              className="label-mono"
              style={{
                marginBottom: '8px',
                display: 'block',
                color: 'var(--amber)',
                fontSize: '10px',
                fontWeight: 600,
              }}
            >
              02 / ANCORAGEM
            </span>
            <span
              style={{
                fontSize: '18px',
                fontWeight: 700,
                color: 'var(--titanium)',
                display: 'block',
                marginBottom: '6px',
                letterSpacing: '-0.01em',
              }}
            >
              A partir de R$ 6.000
            </span>
            <p
              className="body-sm"
              style={{ fontSize: '13px', margin: 0, color: 'var(--zinc-tech)' }}
            >
              O ativo se paga no primeiro contrato de alto valor fechado.
            </p>
          </div>

          {/* Card 3 */}
          <div
            className="glass-card"
            style={{
              padding: '24px',
              textAlign: 'left',
              background: 'linear-gradient(180deg, rgba(18, 18, 20, 0.7) 0%, rgba(8, 8, 10, 0.85) 100%)',
              transition: 'all 0.35s ease',
              cursor: 'default',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-6px)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
              e.currentTarget.style.boxShadow = '0 16px 36px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.1)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = 'var(--glass-border)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <span
              className="label-mono"
              style={{
                marginBottom: '8px',
                display: 'block',
                color: 'var(--amber)',
                fontSize: '10px',
                fontWeight: 600,
              }}
            >
              03 / EXCLUSIVIDADE
            </span>
            <span
              style={{
                fontSize: '18px',
                fontWeight: 600,
                color: 'var(--titanium)',
                display: 'block',
                marginBottom: '6px',
                letterSpacing: '-0.01em',
              }}
            >
              Operação Founder-Led
            </span>
            <p
              className="body-sm"
              style={{ fontSize: '13px', margin: 0, color: 'var(--zinc-tech)' }}
            >
              Sem gerentes ou intermediários. Você fala direto com quem programa.
            </p>
          </div>
        </div>
      </div>

      {/* Subtle Bottom Ambient Gradient Fade */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '140px',
          background: 'linear-gradient(to top, var(--void) 0%, transparent 100%)',
          zIndex: 5,
          pointerEvents: 'none',
        }}
      />
    </section>
  );
}
