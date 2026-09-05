import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(useGSAP);

export default function ProblemSection() {
  const wrapperRef = useRef(null);
  const canvasRef = useRef(null);
  const textContainerRef = useRef(null);
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
      img.src = `/sequence_macro/frame_${index}.webp`;

      img.onload = () => {
        loadedCount++;
        if (loadedCount === 1 || loadedCount >= frameCount * 0.2) {
          setIsLoaded(true);
        }
      };
      
      img.onerror = () => {
        loadedCount++;
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

    // 1. Canvas Scrub Animation + Pinning
    gsap.to(sequenceRef.current, {
      frame: frameCount - 1,
      snap: 'frame',
      ease: 'none',
      scrollTrigger: {
        trigger: wrapperRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.5,
        pin: '.pinned-content',
      },
      onUpdate: render,
    });

    // 2. Cinematic Narrative Timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapperRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
      }
    });

    // Helper: Fade In -> Hold -> Fade Out
    const animateScene = (selector, holdOffset = "+=1") => {
      tl.to(selector, { opacity: 1, y: 0, duration: 1 })
        .to(selector, { opacity: 0, y: -40, duration: 1 }, holdOffset);
    };

    animateScene('.scene-1');
    animateScene('.scene-2');
    animateScene('.scene-3');
    animateScene('.scene-4');
    
    // Scene 5 just fades in and stays until section unpins
    tl.to('.scene-5', { opacity: 1, y: 0, duration: 1 });

    return () => {
      window.removeEventListener('resize', render);
    };
  }, [isLoaded]);

  return (
    <section ref={wrapperRef} className="section-border" style={{ position: 'relative', height: '600vh', background: 'var(--void)' }}>
      {/* Pinned Container */}
      <div 
        className="pinned-content"
        style={{
          position: 'absolute',
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
            opacity: isLoaded ? 0.3 : 0,
            transition: 'opacity 1s ease',
            mixBlendMode: 'screen'
          }}
        />

        {/* Cinematic Scenes Container */}
        <div className="container" ref={textContainerRef} style={{ position: 'relative', zIndex: 10, height: '100vh' }}>
          
          {/* SCENE 1: Brutalist Magma Headline */}
          <div className="scene-text scene-1" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', left: 0, right: 0, margin: '0 auto' }}>
            <h2 className="headline-brutal magma-text" style={{ textAlign: 'center' }}>
              O preço que você cobra<br/>começa antes da<br/>sua proposta.
            </h2>
          </div>

          {/* SCENE 2: Editorial Left Aligned */}
          <div className="scene-text scene-2" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', height: '100%', left: 0, right: 0, margin: '0 auto' }}>
            <h2 className="headline-lg" style={{ maxWidth: '800px', textAlign: 'left', lineHeight: 1.3 }}>
              Existe uma distância enorme entre ter um site bonitinho feito em template e ter um <span style={{ color: 'var(--amber)' }}>ativo digital de alta conversão.</span>
            </h2>
          </div>

          {/* SCENE 3: The Contrast */}
          <div className="scene-text scene-3" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', left: 0, right: 0, margin: '0 auto' }}>
            <h2 className="headline-lg" style={{ textAlign: 'center', maxWidth: '900px' }}>
              <span style={{ color: 'var(--zinc-dark)' }}>A primeira opção comunica esforço.</span>
              <br/><br/>
              <span className="magma-text" style={{ fontSize: '1.2em' }}>A segunda comunica resultado.</span>
            </h2>
          </div>

          {/* SCENE 4: Glassmorphism Floating Text */}
          <div className="scene-text scene-4" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', height: '100%', left: 0, right: 0, margin: '0 auto' }}>
            <div style={{ maxWidth: '500px', textAlign: 'left', padding: '40px', background: 'rgba(10, 10, 10, 0.4)', backdropFilter: 'blur(30px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px', boxShadow: '0 30px 60px rgba(0,0,0,0.5)' }}>
              <p className="body-text" style={{ fontSize: '24px', fontWeight: 500, margin: 0, color: 'var(--titanium)' }}>
                Clientes de alto valor não leem sua página — <span style={{ color: 'var(--amber)' }}>eles a sentem em três segundos</span>, e decidem ali se seu preço faz sentido.
              </p>
            </div>
          </div>

          {/* SCENE 5: The Final Blow */}
          <div className="scene-text scene-5" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', left: 0, right: 0, margin: '0 auto' }}>
            <h2 className="headline-lg" style={{ textAlign: 'center', maxWidth: '1000px' }}>
              <span style={{ fontSize: '0.6em', color: 'var(--titanium-70)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Uma presença que parece amadora não é neutra:</span>
              <br/><br/>
              <span className="magma-text headline-brutal" style={{ display: 'block', fontSize: 'clamp(2rem, 6vw, 4.5rem)' }}>Ela ativamente reduz<br/>o que você pode cobrar.</span>
            </h2>
          </div>

        </div>
      </div>
    </section>
  );
}
