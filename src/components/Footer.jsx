import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(useGSAP);

export default function Footer() {
  const footerRef = useRef(null);

  useGSAP(() => {
    gsap.from('.footer-content', {
      y: 30,
      opacity: 0,
      scrollTrigger: {
        trigger: footerRef.current,
        start: 'top 95%',
        end: 'bottom 90%',
        scrub: 1,
      }
    });
  }, { scope: footerRef });

  return (
    <footer
      ref={footerRef}
      style={{
        padding: '32px 0',
        borderTop: '1px solid var(--glass-border)',
        width: '100%',
        maxWidth: '100vw',
        overflow: 'hidden',
        boxSizing: 'border-box'
      }}
    >
      <div
        className="container footer-content"
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          width: '100%',
          maxWidth: '100%',
          boxSizing: 'border-box'
        }}
      >
        <p
          className="label-mono"
          style={{ fontSize: '10px' }}
        >
          PARVUS SPACE — Presença digital pensada para gerar percepção de valor.
        </p>
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <a
            href="https://instagram.com/parvuspace"
            target="_blank"
            rel="noopener noreferrer"
            className="label-mono"
            style={{
              fontSize: '11px',
              color: 'var(--zinc-tech)',
              transition: 'color 0.2s ease',
              textDecoration: 'none'
            }}
            onMouseEnter={e => e.target.style.color = 'var(--amber)'}
            onMouseLeave={e => e.target.style.color = 'var(--zinc-tech)'}
          >
            @PARVUSPACE ↗
          </a>
          <p
            style={{
              fontSize: '11px',
              color: 'var(--zinc-dark)',
              fontFamily: 'var(--font-mono)',
            }}
          >
            © 2026
          </p>
        </div>
      </div>
    </footer>
  );
}
