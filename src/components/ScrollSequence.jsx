import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * ScrollSequence — Canvas-based scrollytelling component (Apple method)
 * 
 * Renders a sequence of image frames synced to scroll position.
 * Drop your .webp frames into /public/sequence/ named as:
 *   frame_0001.webp, frame_0002.webp, ... frame_0090.webp
 * 
 * Props:
 *  - frameCount: number of frames in the sequence (default: 90)
 *  - framePath: path pattern function (default: /sequence/frame_XXXX.webp)
 *  - scrollHeight: height of scroll container in vh (default: 300)
 *  - overlay: array of { text, position } objects for scrolling copy
 */

const DEFAULT_OVERLAY = [
  { text: 'Engenharia sem concessões.', position: 0 },
  { text: 'Posicionamento de comando.', position: 1 },
  { text: 'Ativos construídos para dominar.', position: 2 },
];

export default function ScrollSequence({
  frameCount = 90,
  framePath = (index) => `/sequence/frame_${(index + 1).toString().padStart(4, '0')}.webp`,
  scrollHeight = 300,
  overlayTexts = DEFAULT_OVERLAY,
}) {
  const canvasRef = useRef(null);
  const wrapperRef = useRef(null);
  const imagesRef = useRef([]);
  const sequenceRef = useRef({ frame: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check for reduced motion preference
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);

    const handler = (e) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Preload images
  useEffect(() => {
    if (prefersReducedMotion) return;

    const images = [];
    let loadedCount = 0;

    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = framePath(i);

      img.onload = () => {
        loadedCount++;
        // Consider loaded once first frame + 50% are ready
        if (loadedCount === 1 || loadedCount >= frameCount * 0.5) {
          setIsLoaded(true);
        }
      };

      img.onerror = () => {
        // Silently skip missing frames
        loadedCount++;
      };

      images.push(img);
    }

    imagesRef.current = images;
  }, [frameCount, framePath, prefersReducedMotion]);

  // Render frame to canvas
  useEffect(() => {
    if (prefersReducedMotion || !isLoaded) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    const render = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const img = imagesRef.current[sequenceRef.current.frame];
      if (!img || !img.complete) return;

      // Draw in "cover" mode, centered
      const hRatio = canvas.width / img.width;
      const vRatio = canvas.height / img.height;
      const ratio = Math.max(hRatio, vRatio);

      const centerX = (canvas.width - img.width * ratio) / 2;
      const centerY = (canvas.height - img.height * ratio) / 2;

      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(
        img,
        0, 0, img.width, img.height,
        centerX, centerY, img.width * ratio, img.height * ratio,
      );
    };

    // GSAP ScrollTrigger animation
    const tween = gsap.to(sequenceRef.current, {
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

    // Initial render + resize handler
    render();
    window.addEventListener('resize', render);

    return () => {
      tween.kill();
      ScrollTrigger.getAll().forEach(st => st.kill());
      window.removeEventListener('resize', render);
    };
  }, [isLoaded, frameCount, prefersReducedMotion]);

  // Reduced motion fallback: static frame with CSS eclipse
  if (prefersReducedMotion) {
    return null; // Falls back to the CSS Eclipse component
  }

  return (
    <div
      ref={wrapperRef}
      id="scroll-wrapper"
      style={{
        position: 'relative',
        height: `${scrollHeight}vh`,
        background: 'var(--void)',
      }}
    >
      {/* Sticky canvas container */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        <canvas
          ref={canvasRef}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            pointerEvents: 'none',
            opacity: isLoaded ? 0.85 : 0,
            transition: 'opacity 0.8s ease',
          }}
        />

        {/* Top & bottom vignette for readability */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, #000 0%, transparent 25%, transparent 75%, #000 100%)',
            pointerEvents: 'none',
          }}
        />
      </div>

      {/* Scrolling copy overlay */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          marginTop: `-${scrollHeight}vh`,
          pointerEvents: 'none',
        }}
      >
        {overlayTexts.map((item, i) => (
          <div
            key={i}
            style={{
              height: `${scrollHeight / overlayTexts.length}vh`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0 24px',
            }}
          >
            <h2
              style={{
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                fontWeight: 600,
                color: 'var(--titanium)',
                textAlign: 'center',
                letterSpacing: '-0.03em',
                lineHeight: 1.1,
                maxWidth: '800px',
                textShadow: '0 2px 40px rgba(0,0,0,0.8)',
              }}
            >
              {item.text}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}
