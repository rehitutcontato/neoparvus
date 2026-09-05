const WA_LINK = 'https://wa.me/5519994656845?text=Ol%C3%A1%20Pablo%2C%20estou%20pronto%20para%20experimentar%20o%20novo%20na%20minha%20empresa.';

const socialLinks = [
  { label: 'WhatsApp', href: WA_LINK },
  { label: 'Instagram', href: 'https://instagram.com/parvuspace' },
  { label: 'YouTube', href: 'https://youtube.com/@pabloveros' },
];

export default function About() {
  return (
    <section id="sobre" className="section section-border" style={{ position: 'relative' }}>
      <div className="container">
        <div 
          data-reveal 
          className="glass-card" 
          style={{ 
            maxWidth: '1000px', 
            margin: '0 auto', 
            padding: '64px',
            display: 'flex',
            flexDirection: 'column',
            gap: '40px',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Subtle flare inside card */}
          <div style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '300px',
            height: '300px',
            background: 'radial-gradient(circle, rgba(255, 94, 0, 0.05) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />

          {/* Name & meta */}
          <div>
            <h2
              className="headline-md"
              style={{ marginBottom: '16px' }}
            >
              Founder Led Operation
            </h2>
            <p
              className="label-mono"
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '12px',
                alignItems: 'center',
              }}
            >
              <span style={{ color: 'var(--amber)' }}>PABLO VEROS</span>
              <span style={{ color: 'var(--zinc-dark)' }}>·</span>
              <span>Engenharia & Design</span>
              <span style={{ color: 'var(--zinc-dark)' }}>·</span>
              <span>São Paulo, Brasil</span>
            </p>
          </div>

          {/* Bio */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
            <p
              className="body-text"
              style={{ fontSize: '18px', fontWeight: 500, color: 'var(--titanium)' }}
            >
              Você fala direto comigo. Não existe gerente de conta ou júnior entre a sua ideia e o
              código que sobe no ar.
            </p>
            <p
              className="body-sm"
              style={{ fontSize: '16px' }}
            >
              Sou um engenheiro que também pensa em posicionamento de marca, porque código limpo 
              sem percepção de valor não sustenta preço alto. Construo para fundadores e criadores no 
              Brasil, EUA e Europa que não têm tempo para amadorismo.
            </p>
          </div>

          <div style={{ height: '1px', background: 'var(--glass-border)', width: '100%' }} />

          {/* Social links */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '32px',
              alignItems: 'center',
            }}
          >
            {socialLinks.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '13px',
                  fontWeight: 600,
                  letterSpacing: '0.04em',
                  color: 'var(--titanium-70)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'all 0.2s ease',
                  textTransform: 'uppercase'
                }}
                onMouseEnter={e => {
                  e.target.style.color = 'var(--amber)';
                  e.target.style.textShadow = '0 0 15px rgba(255, 94, 0, 0.3)';
                }}
                onMouseLeave={e => {
                  e.target.style.color = 'var(--titanium-70)';
                  e.target.style.textShadow = 'none';
                }}
              >
                {label} <span style={{ fontSize: '11px' }}>↗</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
