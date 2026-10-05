import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(useGSAP);

const WA_LINK = 'https://wa.me/5519994656845?text=Ol%C3%A1%20Pablo%2C%20estou%20pronto%20para%20experimentar%20o%20novo%20na%20minha%20empresa.';
const INSTA_LINK = 'https://instagram.com/parvuspace';

export default function CTAFinal() {
  const sectionRef = useRef(null);
  const btnRef = useRef(null);
  const btnWrapperRef = useRef(null);

  useGSAP(() => {
    gsap.from('.cta-reveal', {
      y: 40,
      opacity: 0,
      stagger: 0.15,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        end: 'top 50%',
        scrub: 1,
      }
    });

    // Magnetic Button Effect
    const xTo = gsap.quickTo(btnRef.current, "x", { duration: 0.4, ease: "power3" });
    const yTo = gsap.quickTo(btnRef.current, "y", { duration: 0.4, ease: "power3" });

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = btnWrapperRef.current.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      xTo(x * 0.3);
      yTo(y * 0.3);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    const wrapper = btnWrapperRef.current;
    if (wrapper) {
      wrapper.addEventListener("mousemove", handleMouseMove);
      wrapper.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (wrapper) {
        wrapper.removeEventListener("mousemove", handleMouseMove);
        wrapper.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="section"
      style={{
        position: 'relative',
        overflow: 'hidden',
        padding: 'clamp(80px, 12vw, 160px) 0',
        width: '100%',
        maxWidth: '100vw',
        boxSizing: 'border-box'
      }}
    >
      {/* Background radial glow */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'min(600px, 90vw)',
          height: 'min(600px, 90vw)',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255, 94, 0, 0.1) 0%, transparent 60%)',
          pointerEvents: 'none',
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 2, width: '100%', maxWidth: '100%', boxSizing: 'border-box' }}>
        <div
          style={{
            maxWidth: '1000px',
            width: '100%',
            margin: '0 auto',
            textAlign: 'center',
            boxSizing: 'border-box'
          }}
        >
          <h2
            className="headline-brutal cta-reveal"
            style={{ 
              marginBottom: '32px',
              fontSize: 'clamp(2.1rem, 6.5vw, 6rem)',
              wordBreak: 'break-word',
              overflowWrap: 'break-word',
              lineHeight: 1.15
            }}
          >
            A PORTA PARA O <span className="magma-text">NOVO</span><br/>
            ESTÁ ABERTA.
          </h2>

          <p
            className="body-text cta-reveal"
            style={{
              marginBottom: '48px',
              maxWidth: '600px',
              margin: '0 auto 56px',
              fontSize: 'clamp(15px, 3.8vw, 20px)',
              lineHeight: 1.6,
              wordBreak: 'break-word',
              padding: '0 10px'
            }}
          >
            Você está a uma decisão de distância de ter uma presença implacável que 
            <strong style={{ color: 'var(--titanium)', fontWeight: 600 }}> converte status em faturamento real. </strong>
          </p>

          <div 
            className="cta-reveal" 
            style={{ 
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '24px',
              width: '100%',
              boxSizing: 'border-box'
            }}
          >
            <div ref={btnWrapperRef} style={{ display: 'inline-block', padding: '8px', width: '100%', maxWidth: '460px', boxSizing: 'border-box' }}>
              <a
                ref={btnRef}
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                  maxWidth: '100%',
                  padding: 'clamp(16px, 4vw, 24px) clamp(20px, 5vw, 64px)',
                  fontSize: 'clamp(14px, 3.5vw, 18px)',
                  background: 'var(--titanium)',
                  color: 'var(--void)',
                  border: 'none',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.02em',
                  boxShadow: '0 0 50px rgba(255, 94, 0, 0.2), 0 0 100px rgba(255, 94, 0, 0.1)',
                  boxSizing: 'border-box',
                  textAlign: 'center',
                  whiteSpace: 'normal',
                  wordBreak: 'break-word'
                }}
                onMouseEnter={e => {
                  e.target.style.background = '#fff';
                  e.target.style.transform = 'scale(1.02)';
                  e.target.style.boxShadow = '0 0 80px rgba(255, 94, 0, 0.4), 0 0 160px rgba(255, 94, 0, 0.2)';
                }}
                onMouseLeave={e => {
                  e.target.style.background = 'var(--titanium)';
                  e.target.style.transform = 'scale(1)';
                  e.target.style.boxShadow = '0 0 50px rgba(255, 94, 0, 0.2), 0 0 100px rgba(255, 94, 0, 0.1)';
                }}
              >
                Atravessar a porta no WhatsApp ↗
              </a>
            </div>

            <a
              href={INSTA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '13px',
                fontWeight: 600,
                color: 'var(--zinc-tech)',
                letterSpacing: '0.05em',
                textDecoration: 'underline',
                textUnderlineOffset: '4px',
                transition: 'color 0.2s ease',
                textAlign: 'center',
                padding: '0 10px'
              }}
              onMouseEnter={e => e.target.style.color = 'var(--amber)'}
              onMouseLeave={e => e.target.style.color = 'var(--zinc-tech)'}
            >
              Ou acompanhe pelo @parvuspace ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
