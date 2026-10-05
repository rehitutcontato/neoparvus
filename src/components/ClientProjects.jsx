import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CLIENT_PROJECTS } from '../data/clientProjectsData';
import './ClientProjects.css';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const TECH_STACK_MAP = {
  'marina-flores': ['Dark Luxury Botânica', 'Concierge WhatsApp', 'Rosas Colombianas', 'Next.js Fast', 'Zero Templates'],
  'isa-fogaca': ['Porsche 911 Showcase', 'Mídia Kit Interativo', 'Brutalist Supercar', 'Conversão 5 Dígitos', 'Zero PDF'],
  'parvus-automate': ['ESP32 FreeRTOS C++', 'Wokwi Simulator', 'Web Serial API', 'Express REST', 'Supabase SQL', 'White-Label'],
  'gc-semijoias': ['Vitrine Ouro 18k & Ródio', 'Checkout WhatsApp', '0% Taxa Marketplace', 'Certificado 1 Ano'],
  'sep-3d': ['Manufatura Aditiva', 'Resina & FDM', 'Kit Corporativo B2B', 'Orçamento 3 Passos'],
};

const MAIN_WA = 'https://wa.me/5519994656845?text=Ol%C3%A1%20Pablo%2C%20estou%20pronto%20para%20experimentar%20o%20novo%20na%20minha%20empresa.';

export default function ClientProjects() {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const [activeProjectId, setActiveProjectId] = useState(CLIENT_PROJECTS[0].id);
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeEmbed, setActiveEmbed] = useState(null);
  const [stageDeviceMode, setStageDeviceMode] = useState('desktop'); // 'desktop' | 'mobile'
  const [modalDeviceMode, setModalDeviceMode] = useState('desktop');
  const [iframeLoading, setIframeLoading] = useState(true);
  const [stageIframeLoading, setStageIframeLoading] = useState(true);

  const activeProject = CLIENT_PROJECTS.find(p => p.id === activeProjectId) || CLIENT_PROJECTS[0];

  // Filter projects for the vault grid
  const filteredProjects = activeCategory === 'all'
    ? CLIENT_PROJECTS
    : CLIENT_PROJECTS.filter(p => p.category === activeCategory);

  const handleSelectProject = (projectId) => {
    if (projectId === activeProjectId) return;
    setStageIframeLoading(true);
    setActiveProjectId(projectId);

    // Smooth subtle bounce into stage on desktop
    if (stageRef.current && window.innerWidth >= 900) {
      gsap.fromTo(
        stageRef.current,
        { opacity: 0.7, y: 12 },
        { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' }
      );
    }
  };

  const handleSelectFromVault = (projectId) => {
    handleSelectProject(projectId);
    if (stageRef.current) {
      const y = stageRef.current.getBoundingClientRect().top + window.pageYOffset - 90;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const openEmbed = (project) => {
    setIframeLoading(true);
    setModalDeviceMode('desktop');
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
      stagger: 0.12,
      ease: 'power3.out',
      clearProps: 'all',
    });

    // Spotlight stage reveal
    gsap.from('.clients-spotlight-stage', {
      scrollTrigger: {
        trigger: '.clients-spotlight-stage',
        start: 'top 85%',
        once: true,
      },
      y: 40,
      opacity: 0,
      duration: 0.9,
      ease: 'power3.out',
      clearProps: 'all',
    });

    // Vault cards reveal
    gsap.from('.vault-card', {
      scrollTrigger: {
        trigger: '.clients-vault-grid',
        start: 'top 88%',
        once: true,
      },
      y: 35,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out',
      clearProps: 'all',
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="trabalhos" className="clients-section">
      <div 
        className="clients-ambient-glow" 
        style={{
          background: `radial-gradient(ellipse at center, ${activeProject.accentGhost} 0%, transparent 70%)`
        }}
      />

      <div className="clients-container">
        {/* ══ HEADER ══ */}
        <header className="clients-header">
          <div className="clients-conduit-line" />

          <div className="clients-chapter-tag">
            <span>CAPÍTULO 06 • EVIDÊNCIA DE MERCADO // PORTFÓLIO DE ATIVOS</span>
          </div>

          <div className="clients-badge-wrap">
            <span className="clients-live-dot" />
            <span className="clients-badge-text">CLUSTER OPERACIONAL // SISTEMAS DE ALTO VALOR NO AR</span>
          </div>

          <h2 className="clients-title">
            Nossos Clientes são{' '}
            <span className="text-gradient-magma">Nossos Maiores Ativos.</span>
          </h2>

          <p className="clients-subtitle">
            Empresas comuns compram templates e sofrem para justificar o preço. Líderes de mercado contratam engenharia proprietária que constrói autoridade instantânea e atrai capital qualificado. Abaixo estão ecossistemas reais em produção contínua.
          </p>

          {/* Quick HUD Metrics */}
          <div className="clients-hud-stats">
            <div className="clients-hud-pill">
              <span className="clients-hud-pill-highlight">5 / 5</span>
              <span>Ativos Auditados</span>
            </div>
            <div className="clients-hud-pill">
              <span className="clients-hud-pill-highlight">0%</span>
              <span>Templates Genéricos</span>
            </div>
            <div className="clients-hud-pill">
              <span className="clients-hud-pill-highlight">&lt; 0.72s</span>
              <span>Velocidade de Carga</span>
            </div>
            <div className="clients-hud-pill">
              <span className="clients-hud-pill-highlight">Concierge 1-a-1</span>
              <span>Filtro de Alto Ticket</span>
            </div>
            <div className="clients-hud-pill">
              <span className="clients-hud-pill-highlight">Valuation</span>
              <span>Ativo Perpétuo</span>
            </div>
          </div>
        </header>

        {/* ══ ASSET COMMAND STRIP (SELECTOR) ══ */}
        <div className="asset-command-strip">
          <div className="command-strip-label">
            <span>SELECIONE UM ATIVO PARA INSPEÇÃO:</span>
          </div>

          <div className="command-strip-items">
            {CLIENT_PROJECTS.map((project, index) => {
              const isSelected = project.id === activeProjectId;
              return (
                <button
                  key={project.id}
                  type="button"
                  onClick={() => handleSelectProject(project.id)}
                  className={`command-asset-tab ${isSelected ? 'active' : ''}`}
                  style={{
                    '--tab-accent': project.accentColor,
                    '--tab-ghost': project.accentGhost,
                    '--tab-border': project.accentBorder,
                  }}
                >
                  <span className="asset-tab-index">0{index + 1}</span>
                  <div className="asset-tab-info">
                    <span className="asset-tab-name">{project.name}</span>
                    <span className="asset-tab-multiplier">{project.ticketMultiplier.split(' ')[0]} {project.ticketMultiplier.split(' ')[1] || ''}</span>
                  </div>
                  <span
                    className="asset-tab-dot"
                    style={{
                      background: isSelected ? project.accentColor : 'rgba(255,255,255,0.2)',
                      boxShadow: isSelected ? `0 0 10px ${project.accentColor}` : 'none',
                    }}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* ══ THE EXECUTIVE SPOTLIGHT STAGE (O PALCO PRINCIPAL) ══ */}
        <div 
          ref={stageRef}
          className="clients-spotlight-stage"
          style={{
            '--spotlight-accent': activeProject.accentColor,
            '--spotlight-ghost': activeProject.accentGhost,
            '--spotlight-border': activeProject.accentBorder,
          }}
        >
          {/* Top Stage Bar */}
          <div className="stage-top-bar">
            <div className="stage-top-left">
              <span className="stage-asset-live-indicator">
                <span className="clients-live-dot" style={{ background: activeProject.accentColor, boxShadow: `0 0 10px ${activeProject.accentColor}` }} />
                <span>ATIVO AUDITADO NO AR</span>
              </span>
              <span className="stage-separator">•</span>
              <span className="stage-origin-text">{activeProject.location}</span>
            </div>

            <div className="stage-top-right">
              <span className="stage-badge-category" style={{ color: activeProject.accentColor, background: activeProject.accentGhost, borderColor: activeProject.accentBorder }}>
                {activeProject.categoryBadge}
              </span>
            </div>
          </div>

          <div className="stage-layout-grid">
            {/* ══ COLUMN 1: O DOSSIÊ ESTRATÉGICO ══ */}
            <div className="stage-dossier-column">
              <div className="dossier-header">
                <h3 className="dossier-client-name">{activeProject.name}</h3>
                <p className="dossier-client-tagline">{activeProject.tagline}</p>
              </div>

              {/* Tese de Posicionamento High-Ticket */}
              <div className="dossier-thesis-card">
                <div className="thesis-card-header">
                  <span className="thesis-card-icon">💎</span>
                  <span className="thesis-card-label">TESE DE VALOR &amp; POSICIONAMENTO HIGH-TICKET</span>
                </div>
                <p className="thesis-card-text">{activeProject.highTicketThesis}</p>
                <div className="thesis-multiplier-tag">
                  <span className="multiplier-bullet">✦</span>
                  <span>{activeProject.ticketMultiplier}</span>
                </div>
              </div>

              {/* O Desafio de Mercado vs A Solução Parvus */}
              <div className="dossier-challenge-solution">
                <div className="dossier-cs-box challenge">
                  <div className="dossier-cs-title">O Desafio no Modelo Tradicional</div>
                  <p className="dossier-cs-desc">{activeProject.challenge}</p>
                </div>

                <div className="dossier-cs-box solution">
                  <div className="dossier-cs-title" style={{ color: activeProject.accentColor }}>
                    A Engenharia Proprietária Parvus
                  </div>
                  <p className="dossier-cs-desc">{activeProject.solution}</p>
                </div>
              </div>

              {/* Métricas Auditadas */}
              <div className="dossier-metrics-grid">
                {activeProject.metrics.map((m, idx) => (
                  <div key={idx} className="dossier-metric-item">
                    <span className="dossier-metric-value" style={{ color: idx === 0 ? activeProject.accentColor : 'var(--titanium)' }}>
                      {m.value}
                    </span>
                    <span className="dossier-metric-label">{m.label}</span>
                    <span className="dossier-metric-detail">{m.detail}</span>
                  </div>
                ))}
              </div>

              {/* Depoimento / Percepção de Valor */}
              {activeProject.executiveQuote && (
                <div className="dossier-quote-box">
                  <p className="dossier-quote-text">{activeProject.executiveQuote}</p>
                  <span className="dossier-quote-author">— Síntese de Posicionamento Executivo</span>
                </div>
              )}

              {/* Tech Stack Strip */}
              {TECH_STACK_MAP[activeProject.id] && (
                <div className="dossier-tech-strip">
                  <span className="dossier-tech-label">ARQUITETURA:</span>
                  <div className="dossier-tech-pills">
                    {TECH_STACK_MAP[activeProject.id].map((tech, i) => (
                      <span key={i} className="dossier-tech-pill">{tech}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* Executive Actions */}
              <div className="dossier-action-bar">
                <button
                  type="button"
                  className="dossier-btn-primary"
                  onClick={() => openEmbed(activeProject)}
                  style={{
                    background: activeProject.accentColor,
                    borderColor: activeProject.accentColor,
                    color: '#000',
                    boxShadow: `0 0 25px ${activeProject.accentGhost}`,
                  }}
                >
                  <span>⚡ Expandir no Simulador (Tela Cheia)</span>
                </button>

                <a
                  href={activeProject.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="dossier-btn-secondary"
                >
                  <span>Acessar Ativo Oficial ↗</span>
                </a>

                <a
                  href={`https://wa.me/5519994656845?text=Ol%C3%A1%20Pablo%2C%20analisei%20o%20case%20de%20${encodeURIComponent(activeProject.name)}%20e%20gostaria%20de%20desenvolver%20um%20ativo%20com%20posicionamento%20similar.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="dossier-btn-whatsapp"
                  title="Falar sobre um ativo similar no WhatsApp"
                >
                  <span>Solicitar Ativo Similar 💬</span>
                </a>
              </div>
            </div>

            {/* ══ COLUMN 2: O WORKSTATION DIGITAL INTERATIVO (IFRAME EM TEMPO REAL) ══ */}
            <div className="stage-viewport-column">
              <div className="stage-workstation-frame">
                {/* Browser Device Bar */}
                <div className="workstation-chrome-bar">
                  <div className="browser-dots">
                    <span className="browser-dot red" />
                    <span className="browser-dot yellow" />
                    <span className="browser-dot green" />
                  </div>

                  <div className="workstation-address-capsule" title={activeProject.url}>
                    <span className="address-lock">🔒</span>
                    <span className="address-domain">{activeProject.url.replace('https://', '').replace('/', '')}</span>
                    <span className="address-ping">ping: 22ms</span>
                  </div>

                  {/* Device Switcher (Desktop / Mobile) */}
                  <div className="workstation-device-switch">
                    <button
                      type="button"
                      className={`device-btn ${stageDeviceMode === 'desktop' ? 'active' : ''}`}
                      onClick={() => setStageDeviceMode('desktop')}
                      title="Modo Desktop"
                    >
                      🖥️
                    </button>
                    <button
                      type="button"
                      className={`device-btn ${stageDeviceMode === 'mobile' ? 'active' : ''}`}
                      onClick={() => setStageDeviceMode('mobile')}
                      title="Modo iPhone Mobile"
                    >
                      📱
                    </button>
                    <button
                      type="button"
                      className="device-btn expand-btn"
                      onClick={() => openEmbed(activeProject)}
                      title="Expandir para Tela Cheia"
                    >
                      ⛶
                    </button>
                  </div>
                </div>

                {/* Viewport Canvas Stage */}
                <div className={`workstation-canvas-container ${stageDeviceMode === 'mobile' ? 'is-mobile-frame' : 'is-desktop-frame'}`}>
                  {stageIframeLoading && (
                    <div className="workstation-loading-screen">
                      <div className="embed-spinner" style={{ borderTopColor: activeProject.accentColor }} />
                      <span className="workstation-loading-label">Carregando ativo de {activeProject.name}...</span>
                    </div>
                  )}

                  <iframe
                    key={`${activeProject.id}-${stageDeviceMode}`}
                    src={activeProject.url}
                    className="workstation-iframe"
                    title={`Visualização de ${activeProject.name}`}
                    loading="lazy"
                    onLoad={() => setStageIframeLoading(false)}
                  />

                  {/* Mobile Frame Top Speaker Notch (Decor) */}
                  {stageDeviceMode === 'mobile' && (
                    <div className="mobile-dynamic-island" />
                  )}
                </div>

                {/* Bottom Frame Status Bar */}
                <div className="workstation-bottom-bar">
                  <div className="workstation-status-left">
                    <span className="workstation-pulse-dot" style={{ background: activeProject.accentColor }} />
                    <span>Ambiente Interativo Ativo • Role e explore a aplicação</span>
                  </div>
                  <div className="workstation-status-right">
                    <button
                      type="button"
                      onClick={() => openEmbed(activeProject)}
                      className="workstation-theater-link"
                    >
                      Abrir Modo Teatro ↗
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ══ THE ASSET VAULT (O ACERVO COMPLETO DE CASOS EM BENTO GRID) ══ */}
        <div className="clients-vault-section">
          <div className="vault-section-header">
            <div className="vault-header-left">
              <span className="vault-eyebrow">COFRE DE ATIVOS DIGITAIS</span>
              <h3 className="vault-title">Explore os 5 Ecossistemas em Produção</h3>
            </div>

            {/* Filter Tabs */}
            <div className="vault-filters">
              <button
                className={`vault-filter-btn ${activeCategory === 'all' ? 'active' : ''}`}
                onClick={() => setActiveCategory('all')}
              >
                Todos ({CLIENT_PROJECTS.length})
              </button>
              <button
                className={`vault-filter-btn ${activeCategory === 'alto-padrao' ? 'active' : ''}`}
                onClick={() => setActiveCategory('alto-padrao')}
              >
                👑 Luxo Botânico
              </button>
              <button
                className={`vault-filter-btn ${activeCategory === 'creator' ? 'active' : ''}`}
                onClick={() => setActiveCategory('creator')}
              >
                🏎️ Supercarros &amp; Creator
              </button>
              <button
                className={`vault-filter-btn ${activeCategory === 'deep-tech' ? 'active' : ''}`}
                onClick={() => setActiveCategory('deep-tech')}
              >
                ⚡ Deep-Tech IA
              </button>
              <button
                className={`vault-filter-btn ${activeCategory === 'vitrine' ? 'active' : ''}`}
                onClick={() => setActiveCategory('vitrine')}
              >
                💎 Alta Joalheria
              </button>
              <button
                className={`vault-filter-btn ${activeCategory === '3d' ? 'active' : ''}`}
                onClick={() => setActiveCategory('3d')}
              >
                ⚙️ B2B Industrial
              </button>
            </div>
          </div>

          <div className="clients-vault-grid">
            {filteredProjects.map((project, idx) => {
              const isCurrent = project.id === activeProjectId;
              return (
                <article
                  key={project.id}
                  className={`vault-card ${isCurrent ? 'is-spotlight-active' : ''}`}
                  style={{
                    '--vault-accent': project.accentColor,
                    '--vault-ghost': project.accentGhost,
                    '--vault-border': project.accentBorder,
                  }}
                >
                  <div className="vault-card-top">
                    <span className="vault-card-category" style={{ color: project.accentColor, background: project.accentGhost, borderColor: project.accentBorder }}>
                      {project.categoryBadge}
                    </span>
                    <span className="vault-card-origin">{project.location.split('•')[0]}</span>
                  </div>

                  <div className="vault-card-body">
                    <h4 className="vault-card-name">{project.name}</h4>
                    <p className="vault-card-tagline">{project.tagline}</p>
                    
                    <div className="vault-card-thesis">
                      <span className="vault-thesis-highlight">Alavanca de Valor:</span>
                      <p>{project.ticketMultiplier}</p>
                    </div>

                    <div className="vault-card-metrics-strip">
                      {project.metrics.slice(0, 2).map((m, i) => (
                        <div key={i} className="vault-mini-metric">
                          <span className="mini-metric-val">{m.value}</span>
                          <span className="mini-metric-lbl">{m.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="vault-card-footer">
                    <button
                      type="button"
                      className="vault-btn-focus"
                      onClick={() => handleSelectFromVault(project.id)}
                    >
                      <span>{isCurrent ? '✦ Ativo no Palco' : 'Inspecionar no Palco ↑'}</span>
                    </button>

                    <button
                      type="button"
                      className="vault-btn-embed"
                      onClick={() => openEmbed(project)}
                      title="Testar no Simulador"
                    >
                      ⚡ Testar Embed
                    </button>

                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="vault-link-direct"
                      title="Abrir Site Oficial"
                    >
                      ↗
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* ══ HIGH-TICKET MANIFESTO ANCHOR ══ */}
        <div className="clients-manifesto-banner">
          <div className="manifesto-banner-glow" />
          <div className="manifesto-banner-content">
            <div className="manifesto-text-wrap">
              <span className="manifesto-eyebrow">EQUAÇÃO DE VALOR EXECUTIVA</span>
              <h3 className="manifesto-headline">
                Se o seu contrato médio é de 5 ou 6 dígitos, sua presença digital deve fechar a venda antes da proposta.
              </h3>
              <p className="manifesto-sub">
                Não cobramos por horas ou por templates descartáveis. Arquitetamos ativos de código proprietário que conferem poder de ancoragem imediato e transformam visitantes em clientes qualificados.
              </p>
            </div>

            <div className="manifesto-action-wrap">
              <a
                href={MAIN_WA}
                target="_blank"
                rel="noopener noreferrer"
                className="manifesto-cta-btn"
              >
                <span>Construir Nosso Próximo Ativo ↗</span>
              </a>
              <span className="manifesto-guarantee-note">✦ Founder-Led · Conversa Direta com Engenharia</span>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          INTERACTIVE FULLSCREEN BROWSER SIMULATOR MODAL (THEATER)
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
                  <span className="browser-dot red" onClick={closeEmbed} style={{ cursor: 'pointer' }} title="Fechar" />
                  <span className="browser-dot yellow" />
                  <span className="browser-dot green" />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '12px',
                      fontWeight: 700,
                      color: activeEmbed.accentColor,
                    }}
                  >
                    {activeEmbed.name}
                  </span>
                  <span className="hide-mobile" style={{ color: 'var(--zinc-dark)' }}>|</span>
                  <span className="hide-mobile" style={{ fontSize: '11px', color: 'var(--zinc-tech)' }}>
                    {activeEmbed.categoryBadge}
                  </span>
                </div>
              </div>

              <div className="embed-chrome-center">
                <div className="embed-address-pill">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span>🔒</span>
                    <span style={{ color: 'var(--titanium)' }}>{activeEmbed.url}</span>
                  </div>
                  <span className="browser-ping">ping: 18ms</span>
                </div>
              </div>

              <div className="embed-chrome-right">
                <div className="embed-device-switcher">
                  <button
                    className={`embed-device-btn ${modalDeviceMode === 'desktop' ? 'active' : ''}`}
                    onClick={() => setModalDeviceMode('desktop')}
                    title="Visualização Desktop"
                  >
                    🖥️ Desktop
                  </button>
                  <button
                    className={`embed-device-btn ${modalDeviceMode === 'mobile' ? 'active' : ''}`}
                    onClick={() => setModalDeviceMode('mobile')}
                    title="Visualização Mobile"
                  >
                    📱 iPhone
                  </button>
                </div>

                <a
                  href={activeEmbed.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="preview-action-btn secondary"
                  style={{ padding: '6px 12px', fontSize: '11px' }}
                >
                  Abrir Guia ↗
                </a>

                <button
                  type="button"
                  className="embed-close-btn"
                  onClick={closeEmbed}
                  aria-label="Fechar modal"
                >
                  ✕ Fechar
                </button>
              </div>
            </div>

            {/* Modal Viewport Area */}
            <div className="embed-modal-viewport">
              <div className={`embed-iframe-wrapper ${modalDeviceMode === 'mobile' ? 'mobile-view' : ''}`}>
                {iframeLoading && (
                  <div className="embed-loading-shim">
                    <div className="embed-spinner" style={{ borderTopColor: activeEmbed.accentColor }} />
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '12px',
                        color: 'var(--zinc-tech)',
                        letterSpacing: '0.08em',
                      }}
                    >
                      CONECTANDO AO SERVIDOR DE {activeEmbed.name.toUpperCase()}...
                    </span>
                  </div>
                )}
                <iframe
                  src={activeEmbed.url}
                  className="embed-iframe"
                  title={`Simulador interativo de ${activeEmbed.name}`}
                  onLoad={() => setIframeLoading(false)}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="embed-modal-footer">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span className="clients-live-dot" style={{ background: activeEmbed.accentColor }} />
                <span>Ambiente Sandbox Interativo • Conexão Segura SSL</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <span className="hide-mobile">Pressione ESC para fechar</span>
                <a
                  href={`https://wa.me/5519994656845?text=Ol%C3%A1%20Pablo%2C%20gostei%20muito%20da%20solu%C3%A7%C3%A3o%20de%20${encodeURIComponent(activeEmbed.name)}%20e%20quero%20um%20ativo%20similar.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: activeEmbed.accentColor, textDecoration: 'none', fontWeight: 600 }}
                >
                  Quero um ativo como este ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
