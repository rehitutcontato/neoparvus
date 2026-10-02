import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CLIENT_PROJECTS } from '../data/clientProjectsData';
import './ClientProjects.css';

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(useGSAP);

export default function ClientProjects() {
  const sectionRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeEmbed, setActiveEmbed] = useState(null);
  const [deviceMode, setDeviceMode] = useState('desktop'); // 'desktop' | 'mobile'
  const [iframeLoading, setIframeLoading] = useState(true);

  // Filter projects
  const filteredProjects = activeCategory === 'all'
    ? CLIENT_PROJECTS
    : CLIENT_PROJECTS.filter(p => p.category === activeCategory);

  const openEmbed = (project) => {
    setIframeLoading(true);
    setActiveEmbed(project);
  };

  const closeEmbed = () => {
    setActiveEmbed(null);
    setIframeLoading(true);
  };

  // Close embed modal on ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && activeEmbed) {
        closeEmbed();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeEmbed]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (activeEmbed) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeEmbed]);

  useGSAP(() => {
    // Header reveal
    gsap.from('.clients-header > *', {
      scrollTrigger: {
        trigger: '.clients-header',
        start: 'top 85%',
        once: true,
      },
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out',
      clearProps: 'all',
    });

    // Cards reveal
    gsap.from('.client-card', {
      scrollTrigger: {
        trigger: '.clients-grid',
        start: 'top 85%',
        once: true,
      },
      y: 40,
      opacity: 0,
      duration: 0.9,
      stagger: 0.18,
      ease: 'power3.out',
      clearProps: 'all',
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="trabalhos" className="clients-section">
      <div className="clients-ambient-glow" />

      <div className="clients-container">
        {/* ══ HEADER ══ */}
        <header className="clients-header">
          <div className="clients-badge-wrap">
            <span className="clients-live-dot" />
            <span className="clients-badge-text">CASES REAIS EM PRODUÇÃO</span>
          </div>

          <h2 className="clients-title">
            Projetos Reais.{' '}
            <span className="text-gradient-magma">Resultados no Ar.</span>
          </h2>

          <p className="clients-subtitle">
            Conheça empresas, marcas de prestígio e criadores que confiaram na Parvus Space para substituir templates genéricos por ecossistemas digitais proprietários de altíssima conversão.
          </p>

          {/* Quick HUD Metrics */}
          <div className="clients-hud-stats">
            <div className="clients-hud-pill">
              <span className="clients-hud-pill-highlight">4 / 4</span>
              <span>Clientes em Produção</span>
            </div>
            <div className="clients-hud-pill">
              <span className="clients-hud-pill-highlight">0%</span>
              <span>Templates Prontos</span>
            </div>
            <div className="clients-hud-pill">
              <span className="clients-hud-pill-highlight">&lt; 0.8s</span>
              <span>Velocidade de Carga</span>
            </div>
            <div className="clients-hud-pill">
              <span className="clients-hud-pill-highlight">WhatsApp Direct</span>
              <span>Zero Atrito Comercial</span>
            </div>
          </div>

          {/* Category Filter Tabs */}
          <div className="clients-filters">
            <button
              className={`clients-filter-btn ${activeCategory === 'all' ? 'active' : ''}`}
              onClick={() => setActiveCategory('all')}
            >
              Todos os Cases ({CLIENT_PROJECTS.length})
            </button>
            <button
              className={`clients-filter-btn ${activeCategory === 'alto-padrao' ? 'active' : ''}`}
              onClick={() => setActiveCategory('alto-padrao')}
            >
              Alto Luxo & Varejo
            </button>
            <button
              className={`clients-filter-btn ${activeCategory === 'creator' ? 'active' : ''}`}
              onClick={() => setActiveCategory('creator')}
            >
              Creator & Supercarros
            </button>
            <button
              className={`clients-filter-btn ${activeCategory === 'vitrine' ? 'active' : ''}`}
              onClick={() => setActiveCategory('vitrine')}
            >
              Vitrine Semijoias
            </button>
            <button
              className={`clients-filter-btn ${activeCategory === '3d' ? 'active' : ''}`}
              onClick={() => setActiveCategory('3d')}
            >
              Manufatura 3D
            </button>
          </div>
        </header>

        {/* ══ CASES GRID ══ */}
        <div className="clients-grid">
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              className="client-card"
              style={{
                '--card-accent': project.accentColor,
                '--card-accent-ghost': project.accentGhost,
                '--card-accent-border': project.accentBorder,
              }}
            >
              {/* Browser Chrome Header */}
              <div className="client-card-browser-bar">
                <div className="browser-dots">
                  <span className="browser-dot red" />
                  <span className="browser-dot yellow" />
                  <span className="browser-dot green" />
                </div>

                <div className="browser-address" title={project.url}>
                  <span>🔒</span>
                  <span>{project.url.replace('https://', '')}</span>
                </div>

                <span className="browser-status-tag">
                  <span className="clients-live-dot" style={{ width: '5px', height: '5px' }} />
                  ONLINE
                </span>
              </div>

              {/* Visual Preview / Hero Banner */}
              <div
                className="client-card-preview"
                style={{
                  background: `linear-gradient(135deg, ${project.accentGhost} 0%, rgba(10, 10, 10, 0.95) 100%)`,
                }}
              >
                <div className="client-card-preview-content">
                  <span
                    className="client-preview-badge"
                    style={{
                      background: project.accentGhost,
                      color: project.accentColor,
                      border: `1px solid ${project.accentBorder}`,
                    }}
                  >
                    {project.categoryBadge}
                  </span>
                  <h3 className="client-preview-name">{project.name}</h3>
                  <p className="client-preview-tagline">{project.tagline}</p>
                </div>

                {/* Hover Quick Actions */}
                <div className="client-preview-hover-action">
                  <button
                    className="preview-action-btn primary"
                    onClick={() => openEmbed(project)}
                  >
                    ⚡ Testar Embed ao Vivo
                  </button>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="preview-action-btn secondary"
                  >
                    Site Oficial ↗
                  </a>
                </div>
              </div>

              {/* Card Body */}
              <div className="client-card-body">
                {/* Location / History */}
                <div className="client-origin-bar">
                  <span className="client-origin-icon">📍</span>
                  <span>{project.location}</span>
                </div>

                {/* Challenge & Solution */}
                <div className="client-challenge-solution">
                  <div className="client-cs-box">
                    <div className="client-cs-label">O Desafio de Mercado</div>
                    <div className="client-cs-text">{project.challenge}</div>
                  </div>

                  <div className="client-cs-box">
                    <div className="client-cs-label" style={{ color: project.accentColor }}>
                      A Arquitetura Parvus
                    </div>
                    <div className="client-cs-text">{project.solution}</div>
                  </div>
                </div>

                {/* Deliverables Checklist */}
                <div>
                  <div className="client-cs-label" style={{ marginBottom: '8px' }}>
                    Entregáveis em Produção
                  </div>
                  <div className="client-deliverables-wrap">
                    {project.deliverables.slice(0, 4).map((deliv, idx) => (
                      <span key={idx} className="client-deliverable-pill">
                        {deliv}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Metrics Grid */}
                <div className="client-metrics-grid">
                  {project.metrics.map((metric, idx) => (
                    <div key={idx} className="client-metric-cell">
                      <div className="client-metric-val">{metric.value}</div>
                      <div className="client-metric-lbl">{metric.label} • {metric.detail}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer Actions */}
              <footer className="client-card-footer">
                <button
                  className="client-footer-btn-primary"
                  onClick={() => openEmbed(project)}
                >
                  ⚡ Testar Prévia Interativa (Embed)
                </button>

                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="client-footer-link-external"
                >
                  Visitar Website Oficial ↗
                </a>
              </footer>
            </article>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          INTERACTIVE BROWSER SIMULATOR MODAL (EMBED)
         ═══════════════════════════════════════════════════════════════ */}
      {activeEmbed && (
        <div
          className="embed-modal-backdrop"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeEmbed();
          }}
          role="dialog"
          aria-modal="true"
          aria-label={`Simulador do site ${activeEmbed.name}`}
        >
          <div className="embed-modal-window">
            {/* Modal Chrome Bar */}
            <div className="embed-modal-chrome">
              <div className="embed-chrome-left">
                <div className="browser-dots">
                  <span className="browser-dot red" onClick={closeEmbed} style={{ cursor: 'pointer' }} />
                  <span className="browser-dot yellow" />
                  <span className="browser-dot green" />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '12px',
                      fontWeight: 700,
                      color: 'var(--titanium)',
                    }}
                  >
                    {activeEmbed.name}
                  </span>
                  <span className="browser-status-tag" style={{ fontSize: '9px', padding: '2px 6px' }}>
                    AO VIVO
                  </span>
                </div>
              </div>

              {/* URL Bar */}
              <div className="embed-chrome-center">
                <div className="embed-address-pill">
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span>🔒</span>
                    <span>{activeEmbed.url}</span>
                  </span>
                  <span style={{ color: 'var(--zinc-tech)', fontSize: '10px' }}>HTTPS</span>
                </div>
              </div>

              {/* Right Controls: Device Mode + External + Close */}
              <div className="embed-chrome-right">
                <div className="embed-device-switcher">
                  <button
                    className={`embed-device-btn ${deviceMode === 'desktop' ? 'active' : ''}`}
                    onClick={() => setDeviceMode('desktop')}
                    title="Visualizar em Desktop"
                  >
                    🖥️ Desktop
                  </button>
                  <button
                    className={`embed-device-btn ${deviceMode === 'mobile' ? 'active' : ''}`}
                    onClick={() => setDeviceMode('mobile')}
                    title="Visualizar em Mobile"
                  >
                    📱 Mobile
                  </button>
                </div>

                <a
                  href={activeEmbed.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="preview-action-btn secondary"
                  style={{ padding: '6px 12px', fontSize: '11px' }}
                >
                  Abrir Nova Aba ↗
                </a>

                <button
                  className="embed-close-btn"
                  onClick={closeEmbed}
                  aria-label="Fechar prévia"
                >
                  ✕ Fechar
                </button>
              </div>
            </div>

            {/* Modal Viewport Area */}
            <div className="embed-modal-viewport">
              <div className={`embed-iframe-wrapper ${deviceMode === 'mobile' ? 'mobile-view' : ''}`}>
                {iframeLoading && (
                  <div className="embed-loading-shim">
                    <div className="embed-spinner" />
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '12px',
                        color: 'var(--titanium-70)',
                        letterSpacing: '0.08em',
                      }}
                    >
                      Carregando ecossistema de {activeEmbed.name}...
                    </span>
                  </div>
                )}

                <iframe
                  src={activeEmbed.url}
                  title={`Demonstração interativa ao vivo de ${activeEmbed.name}`}
                  className="embed-iframe"
                  onLoad={() => setIframeLoading(false)}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                />
              </div>
            </div>

            {/* Modal Footer Info */}
            <div className="embed-modal-footer">
              <span>
                Simulador de Navegação Parvus Space • {activeEmbed.name} ({activeEmbed.location})
              </span>
              <span>
                Pressione <kbd style={{ padding: '2px 6px', background: '#222', borderRadius: '4px' }}>ESC</kbd> para sair
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
