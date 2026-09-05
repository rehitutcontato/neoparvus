import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import GlassCard from './GlassCard';

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

  useGSAP(() => {
    // Premium Reveal: Scale up and unblur
    gsap.from('.gs-card', {
      y: 120,
      scale: 0.9,
      opacity: 0,
      filter: 'blur(10px)',
      stagger: 0.2,
      duration: 1.5,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        end: 'top 30%',
        scrub: 1,
      }
    });
  }, { scope: sectionRef });

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
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <h2 className="headline-brutal" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}>
            NÃO VENDEMOS SITES.<br />
            <span className="magma-text">VENDEMOS STATUS.</span>
          </h2>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '32px',
          }}
        >
          {/* Card — Empresas */}
          <div className="gs-card" style={{ transition: 'transform 0.4s ease', cursor: 'default' }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-10px)'} onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
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

              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                style={{ alignSelf: 'flex-start', width: '100%', textAlign: 'center', justifyContent: 'center' }}
              >
                Expandir minha empresa ↗
              </a>
            </GlassCard>
          </div>

          {/* Card — Criadores */}
          <div className="gs-card" style={{ transition: 'transform 0.4s ease', cursor: 'default' }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-10px)'} onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
            <GlassCard
              label="02 / PARA CRIADORES E PERSONALIDADES"
              style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '48px',
                background: 'linear-gradient(135deg, rgba(255, 94, 0, 0.08) 0%, rgba(5,5,5,0.9) 100%)',
                boxShadow: 'inset 0 1px 0 rgba(255,94,0,0.2), 0 20px 40px rgba(0,0,0,0.5)'
              }}
            >
              <div>
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

              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                style={{ alignSelf: 'flex-start', width: '100%', textAlign: 'center', justifyContent: 'center' }}
              >
                Elevar meu status ↗
              </a>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
}
