import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const items = [
  {
    num: '01',
    title: 'Código próprio & alta performance',
    desc: 'Zero templates lentos. Carregamento instantâneo, porque cada segundo de espera é orçamento de tráfego pago sendo queimado.',
  },
  {
    num: '02',
    title: 'Design editorial-tech',
    desc: 'Tipografia de revista internacional aplicada com clareza comercial — bonito o suficiente para reter, direto o suficiente para vender.',
  },
  {
    num: '03',
    title: 'Copywriting psicológico',
    desc: 'Cada frase existe para reduzir atrito e conduzir a uma decisão, não para preencher espaço.',
  },
  {
    num: '04',
    title: 'Automação & WhatsApp',
    desc: 'Do clique à conversa qualificada, sem fricção e sem seu time perdendo tempo filtrando curioso.',
  },
];

export default function Deliverables() {
  const wrapperRef = useRef(null);
  const canvasRef = useRef(null);
  const pinnedRef = useRef(null);
  const imagesRef = useRef([]);
  const sequenceRef = useRef({ frame: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const frameCount = 300;

  // Preload eclipse/sun sequence frames
  useEffect(() => {
    const images = [];
    let loadedCount = 0;

    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      const index = (i + 1).toString().padStart(4, '0');
      img.src = `/sequence_sun/frame_${index}.webp`;

      img.onload = () => {
        loadedCount++;
        if (loadedCount === 1 || loadedCount >= frameCount * 0.15) {
          setIsLoaded(true);
        }
      };

      img.onerror = () => {
        loadedCount++;
        if (loadedCount === 1) {
          setIsLoaded(true);
        }
      };

      images.push(img);
    }
    imagesRef.current = images;
  }, []);

  // Refresh ScrollTrigger when first frame becomes ready
  useEffect(() => {
    if (isLoaded) {
      ScrollTrigger.refresh();
    }
  }, [isLoaded]);

  useGSAP(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;

    const render = () => {
      const currentImg = imagesRef.current[sequenceRef.current.frame];
      if (!currentImg || !currentImg.complete) return;

      const hRatio = canvas.width / currentImg.width;
      const vRatio = canvas.height / currentImg.height;
      const ratio = Math.max(hRatio, vRatio);
      const centerX = (canvas.width - currentImg.width * ratio) / 2;
      const centerY = (canvas.height - currentImg.height * ratio) / 2;

      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(
        currentImg,
        0,
        0,
        currentImg.width,
        currentImg.height,
        centerX,
        centerY,
        currentImg.width * ratio,
        currentImg.height * ratio
      );
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      render();
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const isMobile = window.innerWidth < 768;
    const stackOffset = isMobile ? 18 : 26;

    // Card initial positions
    // Card 0 starts visible and in place
    gsap.set('.liquid-card-0', { y: 0, opacity: 1, scale: 1, zIndex: 1 });
    // Cards 1-3 start tucked below
    gsap.set('.liquid-card-1', { y: 150, opacity: 0, scale: 0.94, zIndex: 2 });
    gsap.set('.liquid-card-2', { y: 150, opacity: 0, scale: 0.94, zIndex: 3 });
    gsap.set('.liquid-card-3', { y: 150, opacity: 0, scale: 0.94, zIndex: 4 });

    // Main pinned scrollytelling timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapperRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.6,
        pin: '.deliverables-pinned',
      }
    });

    // 1. Scrub canvas sequence throughout the entire pinned scroll duration
    tl.to(sequenceRef.current, {
      frame: frameCount - 1,
      snap: 'frame',
      ease: 'none',
      duration: 10,
      onUpdate: render,
    }, 0);

    // 2. Apple-style card stacking transition
    // Card 1 enters and stacks over Card 0
    tl.to('.liquid-card-1', {
      y: stackOffset * 1,
      opacity: 1,
      scale: 1,
      duration: 2,
      ease: 'power2.out',
    }, 1.8);
    tl.to('.liquid-card-0', {
      scale: 0.98,
      opacity: 0.7,
      duration: 2,
      ease: 'power2.out',
    }, 1.8);

    // Card 2 enters and stacks over Card 1
    tl.to('.liquid-card-2', {
      y: stackOffset * 2,
      opacity: 1,
      scale: 1,
      duration: 2,
      ease: 'power2.out',
    }, 4.6);
    tl.to('.liquid-card-1', {
      scale: 0.98,
      opacity: 0.7,
      duration: 2,
      ease: 'power2.out',
    }, 4.6);
    tl.to('.liquid-card-0', {
      opacity: 0.45,
      duration: 2,
      ease: 'power2.out',
    }, 4.6);

    // Card 3 enters and stacks over Card 2
    tl.to('.liquid-card-3', {
      y: stackOffset * 3,
      opacity: 1,
      scale: 1,
      duration: 2,
      ease: 'power2.out',
    }, 7.4);
    tl.to('.liquid-card-2', {
      scale: 0.98,
      opacity: 0.7,
      duration: 2,
      ease: 'power2.out',
    }, 7.4);
    tl.to('.liquid-card-1', {
      opacity: 0.45,
      duration: 2,
      ease: 'power2.out',
    }, 7.4);
    tl.to('.liquid-card-0', {
      opacity: 0.25,
      duration: 2,
      ease: 'power2.out',
    }, 7.4);

    // Final hold: 9.4s to 10.0s allows reading the final stack before unpinning

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, { scope: wrapperRef });

  return (
    <section 
      ref={wrapperRef} 
      id="entregas" 
      className="section-border"
      style={{ 
        position: 'relative', 
        height: '420vh',
        background: 'var(--void)',
        width: '100%',
        maxWidth: '100vw',
        overflow: 'hidden',
        boxSizing: 'border-box'
      }}
    >
      {/* Pinned Scrollytelling Stage */}
      <div 
        ref={pinnedRef}
        className="deliverables-pinned"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: '100vh',
          width: '100%',
          maxWidth: '100vw',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxSizing: 'border-box'
        }}
      >
        {/* Ambient solar corona glow behind canvas */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'min(850px, 92vw)',
          height: 'min(850px, 92vw)',
          background: 'radial-gradient(circle, rgba(255,94,0,0.16) 0%, rgba(255,140,0,0.05) 45%, transparent 70%)',
          zIndex: 1,
          pointerEvents: 'none',
          filter: 'blur(40px)',
        }} />

        {/* Eclipse Sequence Canvas */}
        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            maxWidth: '100%',
            height: '100%',
            objectFit: 'cover',
            pointerEvents: 'none',
            opacity: isLoaded ? 0.75 : 0,
            transition: 'opacity 1s ease',
            mixBlendMode: 'screen',
            zIndex: 2,
          }}
        />

        {/* Content Overlay */}
        <div 
          className="container"
          style={{
            position: 'relative',
            zIndex: 10,
            width: '100%',
            maxWidth: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            paddingTop: '40px',
            paddingBottom: '40px',
            boxSizing: 'border-box'
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: '16px' }}>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'var(--amber)',
                background: 'rgba(255, 94, 0, 0.08)',
                padding: '5px 14px',
                borderRadius: '4px',
                border: '1px solid rgba(255, 94, 0, 0.25)',
                display: 'inline-block',
                maxWidth: '90vw',
                wordBreak: 'break-word',
                boxSizing: 'border-box'
              }}
            >
              CAPÍTULO 05 • O PADRÃO DA ENTREGA
            </span>
          </div>

          <h2
            className="headline-lg"
            style={{ 
              marginBottom: 'clamp(20px, 4.5vw, 56px)',
              textAlign: 'center',
              textShadow: '0 4px 40px rgba(0,0,0,0.8)',
              fontSize: 'clamp(1.4rem, 4vw, 2.5rem)',
              wordBreak: 'break-word',
              padding: '0 10px',
              boxSizing: 'border-box'
            }}
          >
            Não é só uma página. É posicionamento.
          </h2>

          <div style={{ 
            position: 'relative', 
            height: 'clamp(320px, 42vh, 380px)', 
            maxWidth: '800px', 
            margin: '0 auto', 
            width: '100%', 
            boxSizing: 'border-box' 
          }}>
            {items.map((item, index) => (
              <div
                key={item.num}
                className={`liquid-card liquid-card-${index}`}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  background: 'linear-gradient(135deg, rgba(20, 20, 24, 0.94) 0%, rgba(10, 10, 12, 0.98) 100%)',
                  backdropFilter: 'blur(30px) saturate(150%)',
                  WebkitBackdropFilter: 'blur(30px) saturate(150%)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  borderTop: '1px solid rgba(255, 94, 0, 0.35)',
                  boxShadow: '0 30px 60px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.1)',
                  borderRadius: 'clamp(16px, 3vw, 24px)',
                  padding: 'clamp(20px, 4vw, 40px)',
                  display: 'flex',
                  gap: 'clamp(14px, 3vw, 32px)',
                  alignItems: 'flex-start',
                  boxSizing: 'border-box',
                  zIndex: index + 1,
                  willChange: 'transform, opacity',
                }}
              >
                <span
                  className="label-mono"
                  style={{
                    color: 'var(--amber)',
                    fontSize: 'clamp(15px, 3vw, 18px)',
                    fontWeight: 700,
                    flexShrink: 0
                  }}
                >
                  {item.num}
                </span>
                <div style={{ minWidth: 0, flex: 1 }}>
                  <h3
                    style={{
                      fontSize: 'clamp(17px, 3.5vw, 22px)',
                      fontWeight: 700,
                      color: 'var(--titanium)',
                      marginBottom: '8px',
                      wordBreak: 'break-word'
                    }}
                  >
                    {item.title}
                  </h3>
                  <p className="body-text" style={{ fontSize: 'clamp(13px, 2.8vw, 16px)', margin: 0, lineHeight: 1.55 }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
