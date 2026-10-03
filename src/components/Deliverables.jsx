import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(useGSAP);

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
  const imagesRef = useRef([]);
  const sequenceRef = useRef({ frame: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const frameCount = 300;

  // Preload images
  useEffect(() => {
    const images = [];
    let loadedCount = 0;

    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      const index = (i + 1).toString().padStart(4, '0');
      img.src = `/sequence_sun/frame_${index}.webp`;

      img.onload = () => {
        loadedCount++;
        if (loadedCount === 1 || loadedCount >= frameCount * 0.2) {
          setIsLoaded(true);
        }
      };
      images.push(img);
    }
    imagesRef.current = images;
  }, []);

  useGSAP(() => {
    if (!isLoaded) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');

    const render = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const img = imagesRef.current[sequenceRef.current.frame];
      if (!img || !img.complete) return;

      const hRatio = canvas.width / img.width;
      const vRatio = canvas.height / img.height;
      const ratio = Math.max(hRatio, vRatio);
      const centerX = (canvas.width - img.width * ratio) / 2;
      const centerY = (canvas.height - img.height * ratio) / 2;

      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(img, 0, 0, img.width, img.height, centerX, centerY, img.width * ratio, img.height * ratio);
    };

    render();
    window.addEventListener('resize', render);

    // 1. Canvas Scrub Animation
    gsap.to(sequenceRef.current, {
      frame: frameCount - 1,
      snap: 'frame',
      ease: 'none',
      scrollTrigger: {
        trigger: wrapperRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.5,
      },
      onUpdate: render,
    });

    // 2. Card Stacking Animation
    const cards = gsap.utils.toArray('.liquid-card');
    
    // Initial setup: cards are positioned below and invisible
    gsap.set(cards, { y: 200, opacity: 0, scale: 0.9 });

    cards.forEach((card, index) => {
      // Calculate stagger bounds based on scroll container height
      const startTrigger = `top+=${index * 800} top`; // Adjust spacing between cards
      const endTrigger = `top+=${(index + 1) * 800} top`;

      // Each card scrubs into place
      gsap.to(card, {
        y: index * 25, // Staggered stacking offset
        opacity: 1,
        scale: 1 - (cards.length - 1 - index) * 0.02, // Top card is 1, lower cards are slightly smaller
        ease: 'power2.out',
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: startTrigger,
          end: endTrigger,
          scrub: 1,
        }
      });
    });

    return () => {
      window.removeEventListener('resize', render);
    };
  }, { scope: wrapperRef, dependencies: [isLoaded] });

  return (
    <section 
      ref={wrapperRef} 
      id="entregas" 
      style={{ 
        position: 'relative',
        height: '400vh', // long scroll height for stacking
        background: 'var(--void)'
      }}
    >
      <div 
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          width: '100%',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            pointerEvents: 'none',
            opacity: isLoaded ? 0.7 : 0,
            transition: 'opacity 1s ease',
            mixBlendMode: 'screen'
          }}
        />

        {/* Content Overlay */}
        <div 
          className="container"
          style={{
            position: 'relative',
            zIndex: 10,
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            paddingTop: '80px',
            paddingBottom: '80px',
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
              }}
            >
              CAPÍTULO 05 • O PADRÃO DA ENTREGA
            </span>
          </div>

          <h2
            className="headline-lg"
            style={{ 
              marginBottom: '64px',
              textAlign: 'center',
              textShadow: '0 4px 40px rgba(0,0,0,0.8)'
            }}
          >
            Não é só uma página. É posicionamento.
          </h2>

          <div style={{ position: 'relative', height: '400px', maxWidth: '800px', margin: '0 auto', width: '100%' }}>
            {items.map((item) => (
              <div
                key={item.num}
                className="liquid-card"
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
                  borderRadius: '24px',
                  padding: '40px',
                  display: 'flex',
                  gap: '32px',
                  alignItems: 'flex-start',
                }}
              >
                <span
                  className="label-mono"
                  style={{
                    color: 'var(--amber)',
                    fontSize: '18px',
                    fontWeight: 700,
                  }}
                >
                  {item.num}
                </span>
                <div>
                  <h3
                    style={{
                      fontSize: '22px',
                      fontWeight: 700,
                      color: 'var(--titanium)',
                      marginBottom: '12px',
                    }}
                  >
                    {item.title}
                  </h3>
                  <p className="body-text" style={{ fontSize: '16px', margin: 0 }}>
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
