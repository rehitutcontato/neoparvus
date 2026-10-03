import { useState, useEffect } from 'react';

const WA_LINK = 'https://wa.me/5519994656845?text=Ol%C3%A1%20Pablo%2C%20estou%20pronto%20para%20experimentar%20o%20novo%20na%20minha%20empresa.';

const navLinks = [
  { label: 'SOLUÇÕES', href: '#solucoes' },
  { label: 'AUTOMATE AI', href: '#automate-ai', isNew: true },
  { label: 'CASES REAIS', href: '#trabalhos' },
  { label: 'DEMO B2B', href: '#enterprise' },
  { label: 'MÍDIA KIT', href: '#midiakit' },
  { label: 'ENTREGAS', href: '#entregas' },
  { label: 'SOBRE', href: '#sobre' },
  { label: 'INSTAGRAM', href: 'https://instagram.com/parvuspace' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          background: scrolled ? 'rgba(0, 0, 0, 0.7)' : 'rgba(0, 0, 0, 0.3)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: `1px solid ${scrolled ? 'rgba(255,255,255,0.06)' : 'transparent'}`,
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '72px',
        }}>
          {/* Logo */}
          <a
            href="#"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '14px',
              fontWeight: 600,
              letterSpacing: '0.06em',
              color: 'var(--titanium)',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
            aria-label="Parvus Space — Início"
          >
            PARVUS <span style={{ color: 'var(--zinc-tech)', fontWeight: 400 }}>/</span> SPACE
          </a>

          {/* Desktop Nav */}
          <nav
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '28px',
            }}
            className="hide-mobile"
            aria-label="Navegação principal"
          >
            {navLinks.map(({ label, href, isNew }) => (
              <a
                key={href}
                href={href}
                onClick={() => {
                  if (href === '#midiakit') {
                    window.dispatchEvent(new CustomEvent('open-midiakit'));
                  } else if (href === '#enterprise') {
                    window.dispatchEvent(new CustomEvent('open-enterprise'));
                  }
                }}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  fontWeight: 500,
                  letterSpacing: '0.12em',
                  color: isNew ? 'var(--amber)' : 'var(--zinc-tech)',
                  transition: 'color 0.2s ease',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--titanium)'}
                onMouseLeave={e => e.currentTarget.style.color = isNew ? 'var(--amber)' : 'var(--zinc-tech)'}
              >
                {isNew && (
                  <span style={{
                    width: '5px',
                    height: '5px',
                    borderRadius: '50%',
                    background: 'var(--amber)',
                    boxShadow: '0 0 6px var(--amber)',
                  }} />
                )}
                {label}
              </a>
            ))}

            {/* CTA */}
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.08em',
                color: 'var(--titanium)',
                padding: '8px 20px',
                border: '1px solid rgba(255,255,255,0.2)',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={e => {
                e.target.style.borderColor = 'var(--amber)';
                e.target.style.boxShadow = '0 0 20px rgba(255, 94, 0, 0.15)';
              }}
              onMouseLeave={e => {
                e.target.style.borderColor = 'rgba(255,255,255,0.2)';
                e.target.style.boxShadow = 'none';
              }}
            >
              [ INICIAR ↗ ]
            </a>
          </nav>

          {/* Mobile Hamburger */}
          <button
            className="hide-desktop"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={menuOpen}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '5px',
              padding: '8px',
              zIndex: 110,
            }}
          >
            <span style={{
              display: 'block',
              width: '22px',
              height: '1.5px',
              background: 'var(--titanium)',
              transition: 'all 0.3s ease',
              transform: menuOpen ? 'translateY(3.25px) rotate(45deg)' : 'none',
              transformOrigin: 'center',
            }} />
            <span style={{
              display: 'block',
              width: '22px',
              height: '1.5px',
              background: 'var(--titanium)',
              transition: 'all 0.3s ease',
              opacity: menuOpen ? 0 : 1,
            }} />
            <span style={{
              display: 'block',
              width: menuOpen ? '22px' : '15px',
              height: '1.5px',
              background: 'var(--titanium)',
              transition: 'all 0.3s ease',
              transform: menuOpen ? 'translateY(-3.25px) rotate(-45deg)' : 'none',
              transformOrigin: 'center',
            }} />
          </button>
        </div>
      </header>

      {/* Mobile Nav Overlay */}
      <nav
        className="hide-desktop"
        aria-label="Navegação mobile"
        style={{
          position: 'fixed',
          inset: 0,
          top: '72px',
          zIndex: 99,
          background: 'rgba(0, 0, 0, 0.95)',
          backdropFilter: 'blur(30px)',
          WebkitBackdropFilter: 'blur(30px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '40px',
          transform: menuOpen ? 'translateY(0)' : 'translateY(-120%)',
          transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {navLinks.map(({ label, href, isNew }) => (
          <a
            key={href}
            href={href}
            onClick={() => {
              closeMenu();
              if (href === '#midiakit') {
                window.dispatchEvent(new CustomEvent('open-midiakit'));
              } else if (href === '#enterprise') {
                window.dispatchEvent(new CustomEvent('open-enterprise'));
              }
            }}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '18px',
              fontWeight: 500,
              letterSpacing: '0.12em',
              color: isNew ? 'var(--amber)' : 'var(--titanium)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            {isNew && (
              <span style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: 'var(--amber)',
                boxShadow: '0 0 8px var(--amber)',
              }} />
            )}
            {label}
          </a>
        ))}
        <a
          href={WA_LINK}
          target="_blank"
          rel="noopener noreferrer"
          onClick={closeMenu}
          className="btn-primary"
          style={{ marginTop: '16px' }}
        >
          Iniciar Projeto ↗
        </a>
      </nav>
    </>
  );
}
