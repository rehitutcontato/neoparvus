import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Investment.css';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const WA_LINK = 'https://wa.me/5519994656845?text=Ol%C3%A1%20Pablo%2C%20compreendi%20a%20equa%C3%A7%C3%A3o%20de%20valor%20de%20R%24%206.000%20da%20Parvus%20Space%20e%20quero%20iniciar%20meu%20ecossistema.';

const milestones = [
  {
    step: 'ETAPA 01 // BREAK-EVEN',
    value: 'R$ 15.000',
    title: '1 ÚNICO CONTRATO DE ALTO VALOR',
    copy: 'Um único contrato comercial ou cliente de ticket médio recupera 100% do setup investido e já injeta R$ 9.000 de lucro líquido livre no seu caixa.',
    roiBadge: '2.5x RETORNO // PAYBACK IMEDIATO',
    highlight: 'Recuperação integral do investimento no 1º fechamento.',
    nodePercent: 12,
  },
  {
    step: 'ETAPA 02 // ALAVANCAGEM',
    value: 'R$ 50.000',
    title: 'A PLATAFORMA SE PAGA MÚLTIPLAS VEZES',
    copy: 'A autoridade de design editorial-tech e o carregamento instantâneo convertem visitantes frios em compradores qualificados sem hesitação.',
    roiBadge: '8.3x RETORNO // EXPANSÃO DE MARGEM',
    highlight: 'Posicionamento premium que elimina objeção de preço.',
    nodePercent: 38,
  },
  {
    step: 'ETAPA 03 // ESCALA PREVISÍVEL',
    value: 'R$ 200.000+',
    title: 'LUCRO LÍQUIDO PURO E OPERAÇÃO ATIVA',
    copy: 'O mesmo ecossistema digital continua captando e gerando negócios todos os meses, sem pagar mensalidades de plataformas ou comissões a intermediários.',
    roiBadge: '33.3x RETORNO // MÁQUINA DE RECEITA',
    highlight: 'Zero royalties ou custos recorrentes de hospedagem fechada.',
    nodePercent: 65,
  },
  {
    step: 'ETAPA 04 // PATRIMÔNIO DIGITAL',
    value: 'ESCALA EXPONENCIAL',
    title: 'VALUATION & ATIVO PERPÉTUO',
    copy: 'Isso não é um custo publicitário descartável. É um ativo de engenharia de software de alta performance incorporado ao valor de mercado da sua empresa.',
    roiBadge: 'ROI INFINITO // ATIVO DE VALUATION',
    highlight: 'Propriedade intelectual 100% sua com código fonte transferido.',
    nodePercent: 92,
  },
];

const roiPresets = [
  {
    label: '1 Fechamento',
    ticket: 'R$ 15.000',
    profit: 'R$ 9.000 líquido',
    roi: '2.5x',
    desc: 'Basta 1 contrato para liquidar o setup e lucrar.',
  },
  {
    label: '3 Fechamentos',
    ticket: 'R$ 30.000',
    profit: 'R$ 24.000 líquido',
    roi: '5.0x',
    desc: 'Operação acelerada no primeiro trimestre.',
  },
  {
    label: 'Escala 6 Meses',
    ticket: 'R$ 100.000+',
    profit: 'R$ 94.000+ líquido',
    roi: '16.6x',
    desc: 'O site transforma-se no seu canal comercial nº 1.',
  },
];

export default function Investment() {
  const containerRef = useRef(null);
  const [activeSim, setActiveSim] = useState(0);

  useGSAP(() => {
    // Responsive check for desktop pinning vs mobile flow
    const mm = gsap.matchMedia();

    mm.add('(min-width: 821px)', () => {
      // Beam line starts at 0%
      gsap.set('.invest-beam-line', { height: '0%' });
      
      // Milestones start softly visible as blueprints (never an empty black void)
      gsap.set('.invest-milestone-card', { opacity: 0.28, y: 15, scale: 0.98 });
      gsap.set('.invest-node-glow', { scale: 0.5, opacity: 0 });
      gsap.set('.invest-connector-line', { scaleX: 0, transformOrigin: 'left center' });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.5,
          pin: '.invest-pinned',
        }
      });

      // 1. Ascent Energy Beam travels up the spine smoothly
      tl.to('.invest-beam-line', {
        height: '100%',
        duration: 4,
        ease: 'none',
      }, 0);

      // 2. Milestones ignite sequentially without dead space
      const cards = gsap.utils.toArray('.invest-milestone-card');
      const nodes = gsap.utils.toArray('.invest-node-glow');
      const connectors = gsap.utils.toArray('.invest-connector-line');

      cards.forEach((card, i) => {
        // First card starts immediately at 0.15 (zero wait time!)
        const startAt = 0.15 + (i * 0.95);

        // Beam sensor node lights up
        if (nodes[i]) {
          tl.to(nodes[i], {
            scale: 1.4,
            opacity: 1,
            duration: 0.35,
            ease: 'back.out(2)',
          }, startAt);
        }

        // Connector line fires towards card
        if (connectors[i]) {
          tl.to(connectors[i], {
            scaleX: 1,
            duration: 0.35,
            ease: 'power2.out',
          }, startAt + 0.1);
        }

        // Card enters active spotlight focus
        tl.to(card, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.55,
          ease: 'power2.out',
          onStart: () => card.classList.add('active-focus'),
        }, startAt + 0.15);

        // Previous card recedes into solid background presence
        if (i > 0) {
          tl.to(cards[i - 1], {
            opacity: 0.65,
            scale: 0.985,
            duration: 0.4,
            onComplete: () => cards[i - 1].classList.remove('active-focus'),
          }, startAt);
        }
      });
    });

    mm.add('(max-width: 820px)', () => {
      // Mobile smooth card entry
      gsap.utils.toArray('.invest-milestone-card').forEach((card) => {
        gsap.fromTo(card, 
          { opacity: 0.3, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            }
          }
        );
      });
    });

    return () => mm.revert();
  }, { scope: containerRef });

  return (
    <section id="investimento" ref={containerRef} className="invest-section">
      <div className="invest-pinned">
        {/* Background ambient lighting */}
        <div className="invest-ambient-glow" />
        <div className="invest-grid-lines" />
        <div className="invest-vignette" />

        {/* Top Chapter Tag */}
        <div className="invest-top-tag-wrap">
          <div className="invest-chapter-tag">
            <span className="chapter-ping-dot" />
            <span>CAPÍTULO 07 • A EQUAÇÃO DE VALOR & ALAVANCAGEM</span>
          </div>
        </div>

        <div className="invest-container">
          <div className="invest-stage">
            {/* ══════════════════════════════════════════════════════════════
                LEFT: 6K ANCHOR CARD (PERMANENTLY VISIBLE, EXECUTIVE SUITE)
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

                {/* ── Interactive ROI Presets Simulator ── */}
                <div className="anchor-sim-box">
                  <div className="anchor-sim-label">
                    <span>SIMULADOR DE PAYBACK REAL:</span>
                    <span className="anchor-sim-roi">{roiPresets[activeSim].roi} ROI</span>
                  </div>
                  
                  <div className="anchor-sim-tabs">
                    {roiPresets.map((preset, idx) => (
                      <button
                        key={idx}
                        type="button"
                        className={`anchor-sim-tab ${activeSim === idx ? 'active' : ''}`}
                        onClick={() => setActiveSim(idx)}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>

                  <div className="anchor-sim-readout">
                    <div className="sim-readout-col">
                      <span className="sim-meta">Faturamento</span>
                      <span className="sim-val highlight">{roiPresets[activeSim].ticket}</span>
                    </div>
                    <div className="sim-readout-col">
                      <span className="sim-meta">Resultado</span>
                      <span className="sim-val green">{roiPresets[activeSim].profit}</span>
                    </div>
                  </div>
                  <div className="sim-desc-text">
                    ⚡ {roiPresets[activeSim].desc}
                  </div>
                </div>

                <div className="anchor-divider" />

                <div className="anchor-specs-list">
                  <div className="anchor-spec-item">
                    <span className="anchor-spec-check">✓</span>
                    <span>Código 100% de sua propriedade (Sem lock-in)</span>
                  </div>
                  <div className="anchor-spec-item">
                    <span className="anchor-spec-check">✓</span>
                    <span>Zero mensalidades ou taxas ocultas de plataforma</span>
                  </div>
                  <div className="anchor-spec-item">
                    <span className="anchor-spec-check">✓</span>
                    <span>Design mecatrônico & editorial de alto luxo</span>
                  </div>
                  <div className="anchor-spec-item">
                    <span className="anchor-spec-check">✓</span>
                    <span>Entrega rápida viabilizada pelo Parvus Automate</span>
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

                <div className="anchor-footer-note">
                  🔒 Garantia de Entrega &middot; Contrato PJ com NF &middot; Suporte Pablo Parvus
                </div>
              </div>
            </div>

            {/* ══════════════════════════════════════════════════════════════
                CENTER: THE ASCENT BEAM (CHART SPINE & SENSOR NODES)
                ══════════════════════════════════════════════════════════════ */}
            <div className="invest-beam-track">
              {/* Vertical Guide Track */}
              <div className="invest-beam-rail">
                <div className="invest-beam-line">
                  <div className="invest-beam-head" />
                </div>
              </div>

              {/* Sensor Nodes along the rail */}
              {milestones.map((m, i) => (
                <div 
                  key={i} 
                  className={`invest-beam-node-wrap node-${i}`}
                  style={{ bottom: `${m.nodePercent}%` }}
                >
                  <div className="invest-node-glow" />
                  <div className="invest-node-core" />
                  <div className="invest-connector-line" />
                </div>
              ))}
            </div>

            {/* ══════════════════════════════════════════════════════════════
                RIGHT: MILESTONES LADDER (HIGH-IMPACT CARDS)
                ══════════════════════════════════════════════════════════════ */}
            <div className="invest-milestones-pane">
              {milestones.map((m, i) => (
                <div key={i} className={`invest-milestone-card card-${i}`}>
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
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════
            BOTTOM HUD COMPARATIVE BAR
            ══════════════════════════════════════════════════════════════ */}
        <div className="invest-hud-bottom">
          <div className="invest-hud-pill">
            <span className="hud-label">AGÊNCIA CONVENCIONAL:</span>
            <span className="invest-hud-val amber">R$ 120.000+/ANO (LENTA & DEPENDENTE)</span>
          </div>

          <div className="invest-hud-pill">
            <span className="hud-label">PARVUS SPACE:</span>
            <span className="invest-hud-val green">R$ 6.000 (ATIVO PERPÉTUO PROPRIETÁRIO)</span>
          </div>

          <div className="invest-hud-pill">
            <span className="hud-label">RETORNO SOBRE O SETUP:</span>
            <span className="invest-hud-val green">2.5X A 33.3X+ COMPROVADO</span>
          </div>
        </div>
      </div>
    </section>
  );
}
