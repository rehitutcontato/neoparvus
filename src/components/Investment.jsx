import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Investment.css';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const WA_LINK = 'https://wa.me/5519994656845?text=Ol%C3%A1%20Pablo%2C%20compreendi%20a%20equa%C3%A7%C3%A3o%20de%20valor%20de%20R%24%206.000%20da%20Parvus%20Space%20e%20quero%20iniciar%20meu%20ecossistema.';

const milestones = [
  {
    step: 'ETAPA 01',
    tabLabel: '01. R$ 15k',
    value: 'R$ 15.000',
    title: '1 ÚNICO CONTRATO DE ALTO VALOR',
    copy: 'Um único contrato comercial ou cliente de ticket médio recupera 100% do setup investido e já injeta R$ 9.000 de lucro líquido livre no seu caixa.',
    roiBadge: '2.5x RETORNO // PAYBACK IMEDIATO',
    highlight: 'Recuperação integral do investimento no 1º fechamento.',
    paybackSummary: '+R$ 9.000 LÍQUIDO // 2.5X RETORNO',
  },
  {
    step: 'ETAPA 02',
    tabLabel: '02. R$ 50k',
    value: 'R$ 50.000',
    title: 'A PLATAFORMA SE PAGA MÚLTIPLAS VEZES',
    copy: 'A autoridade de design editorial-tech e o carregamento instantâneo convertem visitantes frios em compradores qualificados sem hesitação.',
    roiBadge: '8.3x RETORNO // EXPANSÃO DE MARGEM',
    highlight: 'Posicionamento premium que elimina objeção de preço.',
    paybackSummary: '+R$ 44.000 LÍQUIDO // 8.3X RETORNO',
  },
  {
    step: 'ETAPA 03',
    tabLabel: '03. R$ 200k+',
    value: 'R$ 200.000+',
    title: 'LUCRO LÍQUIDO PURO E ESCALA PREVISÍVEL',
    copy: 'O mesmo ecossistema digital continua gerando negócios todos os meses, sem pagar mensalidades de plataformas ou comissões a intermediários.',
    roiBadge: '33.3x RETORNO // MÁQUINA DE RECEITA',
    highlight: 'Zero royalties ou custos recorrentes de hospedagem fechada.',
    paybackSummary: '+R$ 194.000 LÍQUIDO // 33.3X RETORNO',
  },
  {
    step: 'ETAPA 04',
    tabLabel: '04. ESCALA',
    value: 'ESCALA EXPONENCIAL',
    title: 'VALUATION & ATIVO PERPÉTUO',
    copy: 'Isso não é uma despesa descartável de tráfego. É um ativo de engenharia de software de alta performance incorporado ao patrimônio da sua empresa.',
    roiBadge: 'ROI INFINITO // ATIVO DE VALUATION',
    highlight: 'Propriedade intelectual 100% sua com código fonte transferido.',
    paybackSummary: 'VALUATION PERPÉTUO // ROI INFINITO',
  },
];

export default function Investment() {
  const containerRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);
  const scrollTriggerRef = useRef(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add('(min-width: 821px)', () => {
      // Beam initial height
      gsap.set('.invest-beam-line', { height: '0%' });

      // Cards initial positions: Card 0 is visible, 1-3 are hidden
      gsap.set('.invest-spotlight-card', { opacity: 0, y: 25, pointerEvents: 'none' });
      gsap.set('.invest-spotlight-card.card-0', { opacity: 1, y: 0, pointerEvents: 'all' });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.4,
          pin: '.invest-pinned',
          onUpdate: (self) => {
            scrollTriggerRef.current = self;
            // Map scroll progress (0..1) to step index (0..3)
            const p = self.progress;
            let step = 0;
            if (p >= 0.72) step = 3;
            else if (p >= 0.45) step = 2;
            else if (p >= 0.20) step = 1;
            else step = 0;
            setActiveStep(step);
          }
        }
      });

      // 1. Ascent Beam travels smoothly
      tl.to('.invest-beam-line', {
        height: '100%',
        duration: 3,
        ease: 'none',
      }, 0);

      // 2. Step transitions between the 4 cards (clean, no overlap, fits 100vh)
      // Step 0 -> Step 1 (around t = 0.8)
      tl.to('.invest-spotlight-card.card-0', {
        opacity: 0,
        y: -25,
        duration: 0.35,
        ease: 'power2.in',
        pointerEvents: 'none',
      }, 0.7);
      tl.to('.invest-spotlight-card.card-1', {
        opacity: 1,
        y: 0,
        duration: 0.35,
        ease: 'power2.out',
        pointerEvents: 'all',
      }, 0.85);

      // Step 1 -> Step 2 (around t = 1.6)
      tl.to('.invest-spotlight-card.card-1', {
        opacity: 0,
        y: -25,
        duration: 0.35,
        ease: 'power2.in',
        pointerEvents: 'none',
      }, 1.5);
      tl.to('.invest-spotlight-card.card-2', {
        opacity: 1,
        y: 0,
        duration: 0.35,
        ease: 'power2.out',
        pointerEvents: 'all',
      }, 1.65);

      // Step 2 -> Step 3 (around t = 2.4)
      tl.to('.invest-spotlight-card.card-2', {
        opacity: 0,
        y: -25,
        duration: 0.35,
        ease: 'power2.in',
        pointerEvents: 'none',
      }, 2.3);
      tl.to('.invest-spotlight-card.card-3', {
        opacity: 1,
        y: 0,
        duration: 0.35,
        ease: 'power2.out',
        pointerEvents: 'all',
      }, 2.45);
    });

    mm.add('(max-width: 820px)', () => {
      // Mobile: standard vertical stack with clean scroll entrance
      gsap.utils.toArray('.invest-mobile-card').forEach((card) => {
        gsap.fromTo(card,
          { opacity: 0.3, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            }
          }
        );
      });
    });

    return () => mm.revert();
  }, { scope: containerRef });

  // Direct tab click navigation
  const handleTabClick = (index) => {
    setActiveStep(index);
    if (scrollTriggerRef.current && containerRef.current) {
      const st = scrollTriggerRef.current;
      const targetProgress = index === 0 ? 0.05 : index === 1 ? 0.35 : index === 2 ? 0.60 : 0.88;
      const scrollPos = st.start + (targetProgress * (st.end - st.start));
      window.scrollTo({ top: scrollPos, behavior: 'smooth' });
    }
  };

  return (
    <section id="investimento" ref={containerRef} className="invest-section">
      <div className="invest-pinned">
        {/* Background ambient lighting */}
        <div className="invest-ambient-glow" />
        <div className="invest-grid-lines" />
        <div className="invest-vignette" />

        {/* Top Chapter Tag (positioned cleanly under Navbar) */}
        <div className="invest-top-tag-wrap">
          <div className="invest-chapter-tag">
            <span className="chapter-ping-dot" />
            <span>CAPÍTULO 07 • A EQUAÇÃO DE VALOR & ALAVANCAGEM</span>
          </div>
        </div>

        <div className="invest-container">
          <div className="invest-stage">
            {/* ══════════════════════════════════════════════════════════════
                LEFT: 6K ANCHOR CARD (PERMANENTLY VISIBLE, COMPACT & LUXURIOUS)
                ══════════════════════════════════════════════════════════════ */}
            <div className="invest-anchor-pane">
              <div className="invest-anchor-card">
                <div className="anchor-header-pill">
                  <span className="anchor-pulse-dot" />
                  <span>PONTO ZERO // SETUP DA MÁQUINA</span>
                </div>

                <div className="anchor-pre-title">POR QUE</div>

                <div className="anchor-price-wrapper">
                  <div className="anchor-main-price">R$ 6.000</div>
                  <div className="anchor-badge-fixed">SETUP ÚNICO</div>
                </div>

                <div className="anchor-sub-title">
                  É O PONTO DE PARTIDA, NÃO O TETO.
                </div>

                {/* Dynamic Payback Readout connected to current active milestone */}
                <div className="anchor-dynamic-payback">
                  <div className="payback-label-row">
                    <span className="payback-meta">RETORNO ESTIMADO:</span>
                    <span className="payback-step-indicator">ETAPA 0{activeStep + 1}</span>
                  </div>
                  <div className="payback-value-text">
                    ⚡ {milestones[activeStep].paybackSummary}
                  </div>
                </div>

                <div className="anchor-divider" />

                <div className="anchor-specs-list">
                  <div className="anchor-spec-item">
                    <span className="anchor-spec-check">✓</span>
                    <span>Código 100% proprietário (Sem lock-in)</span>
                  </div>
                  <div className="anchor-spec-item">
                    <span className="anchor-spec-check">✓</span>
                    <span>Zero mensalidades ou taxas de terceiros</span>
                  </div>
                  <div className="anchor-spec-item">
                    <span className="anchor-spec-check">✓</span>
                    <span>Motor acelerador Parvus Automate</span>
                  </div>
                </div>

                <a
                  href={WA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="anchor-cta-btn"
                >
                  <span>Iniciar Projeto por R$ 6.000 ↗</span>
                </a>
              </div>
            </div>

            {/* ══════════════════════════════════════════════════════════════
                CENTER: ASCENT LASER BEAM (CHART SPINE)
                ══════════════════════════════════════════════════════════════ */}
            <div className="invest-beam-track">
              <div className="invest-beam-rail">
                <div className="invest-beam-line">
                  <div className="invest-beam-head" />
                </div>
              </div>

              {/* 4 Sensor nodes aligned with the 4 steps */}
              {[0, 1, 2, 3].map((idx) => (
                <div
                  key={idx}
                  className={`invest-beam-node-wrap node-${idx} ${activeStep >= idx ? 'active' : ''}`}
                  style={{ bottom: `${10 + idx * 27}%` }}
                >
                  <div className="invest-node-glow" />
                  <div className="invest-node-core" />
                  <div className="invest-connector-line" />
                </div>
              ))}
            </div>

            {/* ══════════════════════════════════════════════════════════════
                RIGHT: SPOTLIGHT MILESTONE STAGE (ELEVATOR DECK — NO CLIPPING)
                ══════════════════════════════════════════════════════════════ */}
            <div className="invest-spotlight-pane">
              {/* Step Selector Tabs */}
              <div className="spotlight-tabs-bar">
                {milestones.map((m, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`spotlight-tab ${activeStep === idx ? 'active' : ''}`}
                    onClick={() => handleTabClick(idx)}
                  >
                    <span className="tab-dot" />
                    <span>{m.tabLabel}</span>
                  </button>
                ))}
              </div>

              {/* Viewport Frame: only the active card is shown with generous space */}
              <div className="invest-spotlight-frame">
                {milestones.map((m, i) => (
                  <div
                    key={i}
                    className={`invest-spotlight-card card-${i} ${activeStep === i ? 'in-view' : ''}`}
                  >
                    <div className="spotlight-card-header">
                      <div className="milestone-step-tag">{m.step} // TRAJETÓRIA DE VALOR</div>
                      <div className="milestone-roi-badge">{m.roiBadge}</div>
                    </div>

                    <div className="spotlight-card-value">{m.value}</div>
                    <div className="spotlight-card-title">{m.title}</div>
                    <p className="spotlight-card-desc">{m.copy}</p>

                    <div className="spotlight-card-footer">
                      <span className="highlight-bolt">⚡</span>
                      <span>{m.highlight}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom Progress Tracker inside pane */}
              <div className="spotlight-footer-tracker">
                <div className="tracker-bars">
                  {milestones.map((_, idx) => (
                    <div
                      key={idx}
                      className={`tracker-bar-segment ${activeStep >= idx ? 'filled' : ''}`}
                      onClick={() => handleTabClick(idx)}
                    />
                  ))}
                </div>
                <div className="tracker-label">
                  ROLE PARA AVANÇAR PELA EQUAÇÃO (ETAPA {activeStep + 1} DE 4)
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════
            BOTTOM HUD COMPARATIVE SUMMARY (COMPACT & PROPORTIONAL)
            ══════════════════════════════════════════════════════════════ */}
        <div className="invest-hud-bottom">
          <div className="invest-hud-pill">
            <span className="hud-label">AGÊNCIA CONVENCIONAL:</span>
            <span className="invest-hud-val amber">R$ 120.000+/ANO (LENTA)</span>
          </div>

          <div className="invest-hud-pill">
            <span className="hud-label">PARVUS SPACE:</span>
            <span className="invest-hud-val green">R$ 6.000 (ATIVO PERPÉTUO)</span>
          </div>

          <div className="invest-hud-pill">
            <span className="hud-label">RETORNO SOBRE O SETUP:</span>
            <span className="invest-hud-val green">2.5X A 33.3X+ COMPROVADO</span>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          MOBILE FALLBACK LIST (Rendered only on < 820px)
          ══════════════════════════════════════════════════════════════ */}
      <div className="invest-mobile-list">
        {milestones.map((m, i) => (
          <div key={i} className="invest-mobile-card">
            <div className="milestone-step-tag">{m.step}</div>
            <div className="milestone-top-row">
              <div className="milestone-value">{m.value}</div>
              <div className="milestone-roi-badge">{m.roiBadge}</div>
            </div>
            <div className="milestone-sub">{m.title}</div>
            <p className="milestone-desc">{m.copy}</p>
            <div className="milestone-highlight-bar">
              <span className="highlight-bolt">⚡</span>
              <span>{m.highlight}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
