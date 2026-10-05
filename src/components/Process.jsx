import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(useGSAP);

const steps = [
  { num: '01', label: 'Briefing e alinhamento', desc: 'Entendo seu negócio, público e o que a página precisa comunicar.' },
  { num: '02', label: 'Direção visual e copy', desc: 'Defino estrutura, estética e textos para posicionar sua marca do jeito certo.' },
  { num: '03', label: 'Desenvolvimento', desc: 'Construo em código próprio, com performance, responsividade e acabamento premium.' },
  { num: '04', label: 'Integrações', desc: 'Conecto WhatsApp, CRM, métricas, formulários e automações quando necessário.' },
  { num: '05', label: 'Entrega e suporte', desc: 'Seu projeto entra no ar pronto para representar sua marca com nível alto.' },
];

export default function Process() {
  const containerRef = useRef(null);

  useGSAP(() => {
    // Initial state: put all cards in the sky
    gsap.set('.process-card', { y: '-100vh', opacity: 0, scale: 0.8, filter: 'blur(20px)' });
    // Except the very first one, which waits on screen
    gsap.set('.process-card-0', { y: 0, opacity: 1, scale: 1, filter: 'blur(0px)' });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
        pin: '.process-pinned'
      }
    });

    steps.forEach((_, i) => {
      // If it's not the first card, drop it from the sky
      if (i > 0) {
        tl.to(`.process-card-${i}`, { 
          y: 0, 
          opacity: 1, 
          scale: 1, 
          filter: 'blur(0px)',
          duration: 1, 
          ease: 'power2.out' 
        });
      }

      // If it's not the last card, sink it down and blur to make room for the next
      if (i < steps.length - 1) {
        tl.to(`.process-card-${i}`, { 
          opacity: 0, 
          scale: 0.9, 
          y: '20vh',
          filter: 'blur(15px)',
          duration: 0.8,
          ease: 'power2.in'
        }, '+=0.2'); // hold time before sinking
      }
    });
  }, { scope: containerRef });

  return (
    <section 
      id="processo" 
      ref={containerRef} 
      style={{ 
        height: '400vh', 
        position: 'relative', 
        background: 'var(--void)',
        width: '100%',
        maxWidth: '100vw',
        overflow: 'hidden',
        boxSizing: 'border-box'
      }}
    >
      {/* Soft gradient bridge from previous section */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '30vh',
        background: 'linear-gradient(to bottom, rgba(255,94,0,0.02) 0%, transparent 100%)',
        pointerEvents: 'none',
        zIndex: 1
      }} />

      <div 
        className="process-pinned"
        style={{
          position: 'absolute',
          top: 0,
          width: '100%',
          maxWidth: '100vw',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          boxSizing: 'border-box'
        }}
      >
        {/* Background ambient glow */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'min(800px, 90vw)',
          height: 'min(800px, 90vw)',
          background: 'radial-gradient(circle, rgba(255,94,0,0.06) 0%, transparent 70%)',
          zIndex: 0,
          pointerEvents: 'none'
        }} />

        {/* Massive Background Typography */}
        <div style={{
          position: 'absolute',
          zIndex: 1,
          width: '100%',
          maxWidth: '100vw',
          textAlign: 'center',
          pointerEvents: 'none',
          opacity: 1,
          overflow: 'hidden',
          boxSizing: 'border-box'
        }}>
          <h2 className="headline-brutal" style={{
            fontSize: 'clamp(2.5rem, 11vw, 10rem)',
            color: 'transparent',
            WebkitTextStroke: '1px rgba(255,255,255,0.08)',
            letterSpacing: '0.05em',
            margin: 0,
            lineHeight: 0.9,
            wordBreak: 'break-word',
            overflowWrap: 'break-word'
          }}>
            ENGENHARIA<br />
            <span style={{ color: 'rgba(255,94,0,0.05)', WebkitTextStroke: '0px' }}>DIVINA</span>
          </h2>
        </div>

        {/* Falling Cards Container */}
        <div 
          style={{ 
            position: 'relative', 
            zIndex: 10, 
            width: '100%', 
            maxWidth: '600px', 
            display: 'flex', 
            justifyContent: 'center',
            padding: '0 20px',
            boxSizing: 'border-box'
          }}
        >
          {steps.map((step, i) => (
            <div
              key={step.num}
              className={`process-card process-card-${i} glass-card`}
              style={{
                position: 'absolute',
                width: '100%',
                padding: 'clamp(24px, 5vw, 56px)',
                display: 'flex',
                flexDirection: 'column',
                gap: 'clamp(14px, 3vw, 24px)',
                background: 'linear-gradient(135deg, rgba(20,20,20,0.95) 0%, rgba(5,5,5,0.98) 100%)',
                boxShadow: '0 30px 60px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,94,0,0.2), inset 0 0 40px rgba(255,94,0,0.03)',
                transform: 'translateY(-100vh)',
                borderRadius: '16px',
                boxSizing: 'border-box'
              }}
            >
              <div style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: 'min(200px, 50vw)',
                height: 'min(200px, 50vw)',
                background: 'radial-gradient(circle, rgba(255, 94, 0, 0.08) 0%, transparent 70%)',
                pointerEvents: 'none',
              }} />

              <span className="label-mono" style={{ color: 'var(--amber)', fontSize: 'clamp(14px, 3vw, 16px)', textShadow: '0 0 20px rgba(255,94,0,0.5)' }}>
                / {step.num}
              </span>
              <h3
                className="headline-lg"
                style={{
                  fontSize: 'clamp(22px, 5vw, 32px)',
                  color: 'var(--titanium)',
                  lineHeight: 1.15,
                  letterSpacing: '-0.02em',
                  wordBreak: 'break-word',
                  margin: 0
                }}
              >
                {step.label}
              </h3>
              <p className="body-text" style={{ fontSize: 'clamp(14px, 3.2vw, 18px)', color: 'var(--zinc-tech)', margin: 0, lineHeight: 1.55 }}>
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
