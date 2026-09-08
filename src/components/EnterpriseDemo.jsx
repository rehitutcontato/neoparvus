import { useRef, useEffect, useState } from 'react';
import enterpriseData from '../data/enterpriseData.json';
import './EnterpriseDemo.css';

const { statusBar, hero, hotspots, mechanism, qualifier, footer, whatsapp } = enterpriseData;

const BASE_WA_LINK = `https://wa.me/${whatsapp.number}?text=${encodeURIComponent(whatsapp.message)}`;

/* ── Animated Indicator Card ── */
function AnimatedIndicator({ indicator, delay = 0 }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="ent-indicator"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
      }}
    >
      <div className="ent-indicator-value">{indicator.value}</div>
      <div className="ent-indicator-label">{indicator.label}</div>
      <div className="ent-indicator-desc">{indicator.description}</div>
    </div>
  );
}

export default function EnterpriseDemo({ isOpen }) {
  const [activeHotspot, setActiveHotspot] = useState(hotspots[0]?.id || null);

  // Stepper state
  const [currentStep, setCurrentStep] = useState(0); // 0 = step 1, 1 = step 2, 2 = result
  const [selectedFaturamento, setSelectedFaturamento] = useState('');
  const [selectedDesafio, setSelectedDesafio] = useState('');

  const handleSelectOption = (option) => {
    if (currentStep === 0) {
      setSelectedFaturamento(option);
      setCurrentStep(1);
    } else if (currentStep === 1) {
      setSelectedDesafio(option);
      setCurrentStep(2);
    }
  };

  const handleResetStepper = () => {
    setCurrentStep(0);
    setSelectedFaturamento('');
    setSelectedDesafio('');
  };

  const dynamicWaLink = `https://wa.me/${whatsapp.number}?text=${encodeURIComponent(
    `Olá Pablo, realizei o teste de triagem C-Level na demo da Parvus.\n\n` +
    `• Porte Anual: ${selectedFaturamento}\n` +
    `• Desafio Principal: ${selectedDesafio}\n\n` +
    `Gostaria de agendar uma reunião executiva para discutir nossa infraestrutura.`
  )}`;

  return (
    <div className={`ent-demo ${isOpen ? 'ent-open' : ''}`}>
      <div className="ent-inner ent-grid-bg">

        {/* ══ 1. TERMINAL STATUS BAR ══ */}
        <div className="ent-status-bar">
          <div className="ent-status-left">
            <span className="ent-status-pulse" />
            <span>{statusBar.left.label}</span>
            <span className="ent-status-divider" />
            <span style={{ color: '#22c55e' }}>{statusBar.left.status}</span>
            <span className="ent-status-divider" />
            <span>LATÊNCIA {statusBar.left.latency}</span>
          </div>

          <div className="ent-status-center">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <span>{statusBar.center.url}</span>
            <span className="ent-ssl-badge">SSL ATIVO</span>
          </div>

          <div className="ent-status-right">
            <span>{statusBar.right.label}</span>
          </div>
        </div>

        {/* ══ 2. HERO SECTION ══ */}
        <div className="ent-hero">
          <div className="ent-hero-badge">{hero.badge}</div>
          <h2 className="ent-hero-headline">{hero.headline}</h2>
          <p className="ent-hero-subtitle">{hero.subtitle}</p>

          {/* Bento Bar — 3 Indicadores */}
          <div className="ent-bento-bar">
            {hero.indicators.map((ind, i) => (
              <AnimatedIndicator key={ind.id} indicator={ind} delay={i * 150} />
            ))}
          </div>
        </div>

        {/* ══ 3. HOTSPOTS INTERATIVOS ══ */}
        <div className="ent-hotspots-section">
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <span className="ent-section-label">ARQUITETURA DE CONVERSÃO</span>
            <h3 className="ent-section-title">
              Engenharia de autoridade para{' '}
              <span style={{ color: 'var(--amber)' }}>grandes contratos.</span>
            </h3>
          </div>

          <div className="ent-hotspots-grid">
            {hotspots.map((hs) => {
              const isActive = activeHotspot === hs.id;
              return (
                <div
                  key={hs.id}
                  className={`ent-hotspot-card ${isActive ? 'ent-hotspot-active' : ''}`}
                  onClick={() => setActiveHotspot(isActive ? null : hs.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setActiveHotspot(isActive ? null : hs.id);
                    }
                  }}
                >
                  <div className="ent-hotspot-number">{hs.number}</div>
                  <div className="ent-hotspot-content">
                    <div className="ent-hotspot-title">{hs.title}</div>
                    <div className="ent-hotspot-desc">{hs.description}</div>
                    <div className="ent-hotspot-hint">
                      {isActive ? '▲ Clique para recolher' : '▼ Clique para ver a engenharia'}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── DIVIDER ── */}
        <div className="ent-divider" />

        {/* ══ 4. MECANISMO PROPRIETÁRIO ══ */}
        <div className="ent-framework">
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <span className="ent-section-label">{mechanism.sectionLabel}</span>
            <h3 className="ent-section-title">{mechanism.sectionTitle}</h3>
          </div>

          <div className="ent-framework-grid">
            {mechanism.steps.map((step) => (
              <div key={step.id} className="ent-framework-step">
                <div className="ent-step-number">{step.number}</div>
                <div className="ent-step-card">
                  <div className="ent-step-title">{step.title}</div>
                  <div className="ent-step-desc">{step.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── DIVIDER ── */}
        <div className="ent-divider" />

        {/* ══ 5. STEPPER DE QUALIFICAÇÃO C-LEVEL ══ */}
        <div className="ent-stepper-section">
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <span className="ent-section-label">{qualifier.sectionLabel}</span>
            <h3 className="ent-section-title">{qualifier.sectionTitle}</h3>
          </div>

          <div className="ent-stepper-container">
            {/* Progress Dots */}
            <div className="ent-stepper-progress">
              <div className={`ent-stepper-progress-dot ${currentStep >= 0 ? 'ent-progress-active' : ''}`} />
              <div className={`ent-stepper-progress-dot ${currentStep >= 1 ? 'ent-progress-active' : ''}`} />
              <div className={`ent-stepper-progress-dot ${currentStep >= 2 ? 'ent-progress-active' : ''}`} />
            </div>

            {/* Step 1: Faturamento */}
            {currentStep === 0 && (
              <div className="ent-step-content ent-step-enter" key="step-0">
                <div className="ent-step-label">ETAPA 01 DE 02 · DIMENSIONAMENTO</div>
                <h4 className="ent-step-question">{qualifier.steps[0].question}</h4>
                <div className="ent-options-grid">
                  {qualifier.steps[0].options.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      className="ent-option-btn"
                      onClick={() => handleSelectOption(opt)}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Desafio */}
            {currentStep === 1 && (
              <div className="ent-step-content ent-step-enter" key="step-1">
                <div className="ent-step-label">ETAPA 02 DE 02 · GARGALO ESTRATÉGICO</div>
                <h4 className="ent-step-question">{qualifier.steps[1].question}</h4>
                <div className="ent-options-grid">
                  {qualifier.steps[1].options.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      className="ent-option-btn"
                      onClick={() => handleSelectOption(opt)}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Resultado Dinâmico */}
            {currentStep === 2 && (
              <div className="ent-step-content ent-result ent-step-enter" key="step-2">
                <div className="ent-result-icon">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--amber)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h4 className="ent-result-title">{qualifier.result.title}</h4>
                <p className="ent-result-subtitle">{qualifier.result.subtitle}</p>

                <div className="ent-result-data">
                  <div className="ent-result-chip">
                    <span style={{ color: 'var(--zinc-tech)' }}>PORTE:</span>
                    <span>{selectedFaturamento}</span>
                  </div>
                  <div className="ent-result-chip">
                    <span style={{ color: 'var(--zinc-tech)' }}>DESAFIO:</span>
                    <span>{selectedDesafio}</span>
                  </div>
                </div>

                <div>
                  <a
                    href={dynamicWaLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ent-result-cta"
                  >
                    {qualifier.result.ctaLabel}
                  </a>
                </div>

                <div className="ent-stepper-reset">
                  <button type="button" className="ent-reset-btn" onClick={handleResetStepper}>
                    ↺ Refazer Triagem
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ══ 6. CTA FOOTER ══ */}
        <div className="ent-cta-footer">
          <p className="ent-cta-anchor-text">{footer.anchorText}</p>
          <a
            href={BASE_WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="ent-cta-primary"
          >
            {footer.ctaLabel}
          </a>
        </div>

      </div>
    </div>
  );
}
