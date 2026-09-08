import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import GlassCard from './GlassCard';
import MediaKitDemo from './MediaKitDemo';
import EnterpriseDemo from './EnterpriseDemo';

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(useGSAP);

const WA_LINK = 'https://wa.me/5519994656845?text=Ol%C3%A1%20Pablo%2C%20estou%20pronto%20para%20experimentar%20o%20novo%20na%20minha%20empresa.';

const bulletStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  fontSize: '15px',
  color: 'var(--titanium-70)',
  marginBottom: '16px',
  letterSpacing: '-0.01em'
};

const dotStyle = {
  width: '6px',
  height: '6px',
  borderRadius: '50%',
  background: 'var(--amber)',
  flexShrink: 0,
  boxShadow: '0 0 10px var(--amber)'
};

export default function SolutionsGrid() {
  const sectionRef = useRef(null);
  const [entOpen, setEntOpen] = useState(false);
  const entRef = useRef(null);
  const [mkOpen, setMkOpen] = useState(false);
  const mkRef = useRef(null);

  // Auto-open if navigated via #enterprise, #midiakit or custom events
  useEffect(() => {
    const checkHash = () => {
      if (window.location.hash === '#enterprise' || window.location.hash === '#empresas') {
        setEntOpen(true);
        setTimeout(() => {
          entRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 300);
      } else if (window.location.hash === '#midiakit') {
        setMkOpen(true);
        setTimeout(() => {
          mkRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 300);
      }
    };
    checkHash();
    window.addEventListener('hashchange', checkHash);

    const handleCustomOpenMk = () => {
      setMkOpen(true);
      setTimeout(() => {
        mkRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 300);
    };
    window.addEventListener('open-midiakit', handleCustomOpenMk);

    const handleCustomOpenEnt = () => {
      setEntOpen(true);
      setTimeout(() => {
        entRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 300);
    };
    window.addEventListener('open-enterprise', handleCustomOpenEnt);

    return () => {
      window.removeEventListener('hashchange', checkHash);
      window.removeEventListener('open-midiakit', handleCustomOpenMk);
      window.removeEventListener('open-enterprise', handleCustomOpenEnt);
    };
  }, []);

  useGSAP(() => {
    // Header reveal (once: true with clearProps so it never gets stuck hidden)
    gsap.from('.gs-header-item', {
      y: 40,
      opacity: 0,
      stagger: 0.1,
      duration: 0.9,
      ease: 'power3.out',
      clearProps: 'all',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 85%',
        once: true,
      }
    });

    // Cards reveal
    gsap.from('.gs-card', {
      y: 60,
      opacity: 0,
      stagger: 0.15,
      duration: 1,
      ease: 'power3.out',
      clearProps: 'all',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        once: true,
      }
    });
  }, { scope: sectionRef });

  const handleExpandEnt = () => {
    setEntOpen((prev) => {
      const next = !prev;
      if (next) {
        setTimeout(() => {
          entRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 200);
      }
      return next;
    });
  };

  const handleExpandMK = () => {
    setMkOpen((prev) => {
      const next = !prev;
      if (next) {
        setTimeout(() => {
          mkRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 200);
      }
      return next;
    });
  };

  return (
    <section id="solucoes" ref={sectionRef} className="section" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Deep ambient glow */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '100vw',
        height: '100vw',
        maxWidth: '1200px',
        maxHeight: '1200px',
        background: 'radial-gradient(circle, rgba(255,94,0,0.03) 0%, transparent 60%)',
        zIndex: 0,
        pointerEvents: 'none'
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* ══ SECTION HEADER ══ */}
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <span
            className="gs-header-item"
            style={{
              display: 'inline-block',
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              fontWeight: 500,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--zinc-tech)',
              marginBottom: '24px',
              padding: '8px 20px',
              border: '1px solid var(--glass-border)',
              background: 'rgba(255, 94, 0, 0.04)',
            }}
          >
            02 / PORTFÓLIO & ATIVOS FUNCIONAIS
          </span>

          <h2
            className="gs-header-item headline-brutal"
            style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', marginBottom: '24px' }}
          >
            PROJETOS CONSTRUÍDOS PARA{' '}
            <span className="magma-text">IMPOR RESPEITO</span>
            <br />
            E FECHAR NEGÓCIOS.
          </h2>

          <p
            className="gs-header-item"
            style={{
              fontSize: '18px',
              lineHeight: 1.65,
              color: 'var(--zinc-tech)',
              maxWidth: '700px',
              margin: '0 auto',
            }}
          >
            Não mostramos mockups estáticos. Criamos ativos digitais vivos que posicionam marcas no topo da cadeia.
          </p>
        </div>

        {/* ══ CARDS GRID ══ */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '32px',
          }}
        >
          {/* ── Card 01: Empresas High-Ticket ── */}
          <div
            className="gs-card"
            style={{ transition: 'transform 0.4s ease', cursor: 'default' }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-10px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <GlassCard
              label="01 / PARA EMPRESAS HIGH-TICKET"
              style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '48px',
                background: 'linear-gradient(180deg, rgba(20,20,20,0.8) 0%, rgba(5,5,5,0.9) 100%)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05), 0 20px 40px rgba(0,0,0,0.5)'
              }}
            >
              <div>
                {/* Live Demo Badge */}
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '5px 14px',
                  borderRadius: '100px',
                  background: 'rgba(255, 94, 0, 0.12)',
                  border: '1px solid rgba(255, 94, 0, 0.4)',
                  marginBottom: '18px',
                  boxShadow: '0 0 15px rgba(255, 94, 0, 0.2)'
                }}>
                  <span style={{
                    width: '7px',
                    height: '7px',
                    borderRadius: '50%',
                    background: 'var(--amber)',
                    boxShadow: '0 0 10px var(--amber)',
                    display: 'inline-block'
                  }} />
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    letterSpacing: '0.1em',
                    color: 'var(--amber)',
                    fontWeight: 600,
                    textTransform: 'uppercase'
                  }}>
                    Demo Interativa Disponível
                  </span>
                </div>

                <h3
                  className="headline-lg"
                  style={{ marginBottom: '24px', lineHeight: 1.1 }}
                >
                  Uma presença que te faz parecer <span style={{ color: 'var(--amber)' }}>líder de categoria.</span>
                </h3>

                <p className="body-text" style={{ marginBottom: '40px', fontSize: '17px', color: 'var(--zinc-tech)' }}>
                  Estruturada para transformar tráfego pago e indicação em propostas
                  fechadas — com ancoragem de ticket, quebra imediata de objeções e
                  arquitetura de captação qualificada.
                </p>

                <ul style={{ marginBottom: '48px' }}>
                  <li style={bulletStyle}>
                    <span style={dotStyle} />
                    Ancoragem imediata de ticket alto
                  </li>
                  <li style={bulletStyle}>
                    <span style={dotStyle} />
                    Objeções aniquiladas antes da call
                  </li>
                  <li style={bulletStyle}>
                    <span style={dotStyle} />
                    Leads qualificados, eliminação de curiosos
                  </li>
                </ul>
              </div>

              <div>
                <button
                  onClick={handleExpandEnt}
                  className="btn-primary"
                  style={{
                    width: '100%',
                    textAlign: 'center',
                    justifyContent: 'center',
                    background: entOpen
                      ? 'rgba(255, 94, 0, 0.15)'
                      : 'linear-gradient(135deg, var(--amber) 0%, var(--tungsten) 100%)',
                    color: entOpen ? 'var(--amber)' : 'var(--void)',
                    fontWeight: 700,
                    borderColor: 'var(--amber)',
                    boxShadow: entOpen ? 'none' : '0 0 30px rgba(255, 94, 0, 0.3)',
                    cursor: 'pointer',
                    fontSize: '14px',
                    padding: '16px 20px',
                    transition: 'all 0.3s ease',
                  }}
                >
                  {entOpen ? '✕ Recolher Demo Corporativa' : '⚡ Abrir Demo Corporativa [Ao Vivo] ↓'}
                </button>

                <div style={{ marginTop: '14px', textAlign: 'center' }}>
                  <a
                    href="/enterprise"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '11px',
                      letterSpacing: '0.08em',
                      color: 'var(--zinc-tech)',
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      transition: 'color 0.2s ease',
                    }}
                    onMouseEnter={e => e.target.style.color = 'var(--amber)'}
                    onMouseLeave={e => e.target.style.color = 'var(--zinc-tech)'}
                  >
                    Ou ver em tela cheia (/enterprise) ↗
                  </a>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* ── Card 02: Criadores & Personalidades ── */}
          <div
            className="gs-card"
            style={{ transition: 'transform 0.4s ease', cursor: 'default' }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-10px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <GlassCard
              label="02 / PARA CRIADORES E PERSONALIDADES"
              style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '48px',
                background: 'linear-gradient(135deg, rgba(255, 94, 0, 0.08) 0%, rgba(5,5,5,0.9) 100%)',
                boxShadow: 'inset 0 1px 0 rgba(255,94,0,0.2), 0 20px 40px rgba(0,0,0,0.5)',
                position: 'relative',
              }}
            >
              <div>
                {/* Live Demo Badge */}
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '5px 14px',
                  borderRadius: '100px',
                  background: 'rgba(255, 94, 0, 0.12)',
                  border: '1px solid rgba(255, 94, 0, 0.4)',
                  marginBottom: '18px',
                  boxShadow: '0 0 15px rgba(255, 94, 0, 0.2)'
                }}>
                  <span style={{
                    width: '7px',
                    height: '7px',
                    borderRadius: '50%',
                    background: 'var(--amber)',
                    boxShadow: '0 0 10px var(--amber)',
                    display: 'inline-block'
                  }} />
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    letterSpacing: '0.1em',
                    color: 'var(--amber)',
                    fontWeight: 600,
                    textTransform: 'uppercase'
                  }}>
                    Demo Interativa Disponível
                  </span>
                </div>

                <h3
                  className="headline-lg"
                  style={{ marginBottom: '24px', lineHeight: 1.1 }}
                >
                  Sua marca muito além de um simples <span style={{ color: 'var(--amber)' }}>'link na bio'.</span>
                </h3>

                <p className="body-text" style={{ marginBottom: '40px', fontSize: '17px', color: 'var(--zinc-tech)' }}>
                  Uma central única de monetização — produtos, parcerias e mídia kit
                  de padrão internacional para fechar marcas maiores sem parecer que
                  você está começando agora.
                </p>

                <ul style={{ marginBottom: '48px' }}>
                  <li style={bulletStyle}>
                    <span style={dotStyle} />
                    Monetização e ecossistema centralizado
                  </li>
                  <li style={bulletStyle}>
                    <span style={dotStyle} />
                    Mídia kit de padrão internacional
                  </li>
                  <li style={bulletStyle}>
                    <span style={dotStyle} />
                    Autoridade de quem já chegou no topo
                  </li>
                </ul>
              </div>

              <div>
                <button
                  onClick={handleExpandMK}
                  className="btn-primary"
                  style={{
                    width: '100%',
                    textAlign: 'center',
                    justifyContent: 'center',
                    background: mkOpen
                      ? 'rgba(255, 94, 0, 0.15)'
                      : 'linear-gradient(135deg, var(--amber) 0%, var(--tungsten) 100%)',
                    color: mkOpen ? 'var(--amber)' : 'var(--void)',
                    fontWeight: 700,
                    borderColor: 'var(--amber)',
                    boxShadow: mkOpen ? 'none' : '0 0 30px rgba(255, 94, 0, 0.3)',
                    cursor: 'pointer',
                    fontSize: '14px',
                    padding: '16px 20px',
                    transition: 'all 0.3s ease',
                  }}
                >
                  {mkOpen ? '✕ Recolher Mídia Kit' : '⚡ Abrir Mídia Kit Interativo [Demo ao Vivo] ↓'}
                </button>

                <div style={{ marginTop: '14px', textAlign: 'center' }}>
                  <a
                    href="/midiakit"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '11px',
                      letterSpacing: '0.08em',
                      color: 'var(--zinc-tech)',
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      transition: 'color 0.2s ease',
                    }}
                    onMouseEnter={e => e.target.style.color = 'var(--amber)'}
                    onMouseLeave={e => e.target.style.color = 'var(--zinc-tech)'}
                  >
                    Ou ver em tela cheia (/midiakit) ↗
                  </a>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>

        {/* ══ ENTERPRISE DEMO (EXPANDABLE) ══ */}
        <div ref={entRef} id="enterprise">
          <EnterpriseDemo isOpen={entOpen} />
        </div>

        {/* ══ MEDIA KIT DEMO (EXPANDABLE) ══ */}
        <div ref={mkRef} id="midiakit">
          <MediaKitDemo isOpen={mkOpen} />
        </div>
      </div>
    </section>
  );
}
