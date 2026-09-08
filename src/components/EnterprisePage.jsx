import EnterpriseDemo from './EnterpriseDemo';
import Footer from './Footer';

export default function EnterprisePage() {
  return (
    <div className="volcanic-dust" style={{ minHeight: '100vh', background: 'var(--void)' }}>
      {/* Top minimal header */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          background: 'rgba(0, 0, 0, 0.8)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid var(--glass-border)',
          padding: '16px 24px',
        }}
      >
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <a
            href="/"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              letterSpacing: '0.08em',
              color: 'var(--zinc-tech)',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => e.target.style.color = 'var(--titanium)'}
            onMouseLeave={e => e.target.style.color = 'var(--zinc-tech)'}
          >
            ← Voltar para Parvus Space
          </a>

          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              letterSpacing: '0.12em',
              color: 'var(--amber)',
              textTransform: 'uppercase',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: 'var(--amber)',
                boxShadow: '0 0 10px var(--amber)',
              }}
            />
            Sede Digital Corporativa / Live Demo
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ padding: '60px 0 100px' }}>
        <div className="container">
          <EnterpriseDemo isOpen={true} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
