import { useRef, useEffect, useState } from 'react';

/**
 * AmbientVideo — Background video loop for secondary sections
 * 
 * Plays a short ambient loop (4-6s) behind content with low opacity.
 * Auto-pauses when out of viewport for performance.
 * Respects prefers-reduced-motion.
 * 
 * Drop your loop video into /public/ as .webm (< 2MB ideal)
 * 
 * Props:
 *  - src: path to the video file (e.g., "/textures-loop.webm")
 *  - opacity: background opacity (default: 0.15)
 *  - blendMode: CSS mix-blend-mode (default: "screen")
 *  - children: content to render on top
 */
export default function AmbientVideo({
  src,
  opacity = 0.15,
  blendMode = 'screen',
  children,
  style = {},
}) {
  const videoRef = useRef(null);
  const sectionRef = useRef(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false
  );

  // Check reduced motion
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = (e) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Pause/play based on viewport visibility
  useEffect(() => {
    if (prefersReducedMotion || !videoRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          videoRef.current?.play().catch(() => {});
        } else {
          videoRef.current?.pause();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  return (
    <div
      ref={sectionRef}
      style={{
        position: 'relative',
        overflow: 'hidden',
        ...style,
      }}
    >
      {/* Video background */}
      {src && !prefersReducedMotion && (
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="metadata"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity,
            mixBlendMode: blendMode,
            pointerEvents: 'none',
            zIndex: 0,
          }}
        >
          <source src={src} type={src.endsWith('.mp4') ? 'video/mp4' : 'video/webm'} />
        </video>
      )}

      {/* Content on top */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </div>
    </div>
  );
}
