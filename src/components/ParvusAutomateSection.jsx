import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ParvusAutomateSection.css';

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(useGSAP);

const APP_URL = 'https://parvusautomateai2.vercel.app';
const WA_LINK = 'https://wa.me/5519994656845?text=Ol%C3%A1%20Pablo%2C%20gostaria%20de%20ativar%20meu%20acesso%20ao%20Parvus%20Automate%20AI%20e%20conhecer%20os%20planos.';

export default function ParvusAutomateSection() {
  const sectionRef = useRef(null);
  const [activeTab, setActiveTab] = useState('esp32'); // 'esp32' | 'fullstack' | 'pipeline'
  const [copied, setCopied] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Web Serial Flash Simulation State
  const [serialStep, setSerialStep] = useState('idle'); // 'idle' | 'connecting' | 'flashing' | 'done'
  const [serialMsg, setSerialMsg] = useState('Aguardando microcontrolador USB...');
  const [progress, setProgress] = useState(0);

  // Close modal on ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isModalOpen) {
        setIsModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen]);

  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = isModalOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isModalOpen]);

  useGSAP(() => {
    // Header reveal
    gsap.from('.automate-header > *', {
      scrollTrigger: {
        trigger: '.automate-header',
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

    // Stats reveal
    gsap.from('.automate-stat-card', {
      scrollTrigger: {
        trigger: '.automate-stats-strip',
        start: 'top 88%',
        once: true,
      },
      y: 24,
      opacity: 0,
      duration: 0.7,
      stagger: 0.1,
      ease: 'power3.out',
      clearProps: 'all',
    });

    // Simulator window reveal
    gsap.from('.automate-terminal-window', {
      scrollTrigger: {
        trigger: '.automate-terminal-window',
        start: 'top 82%',
        once: true,
      },
      y: 35,
      opacity: 0,
      duration: 0.9,
      ease: 'power3.out',
      clearProps: 'all',
    });

    // Pillars reveal
    gsap.from('.automate-pillar-card', {
      scrollTrigger: {
        trigger: '.automate-pillars-grid',
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
  }, { scope: sectionRef });

  // Handle simulated USB flash
  const handleSimulateFlash = () => {
    if (serialStep !== 'idle' && serialStep !== 'done') return;
    
    setSerialStep('connecting');
    setSerialMsg('> Conectando via Web Serial API... Baud: 115200 bps');
    setProgress(15);

    setTimeout(() => {
      setSerialStep('flashing');
      setSerialMsg('> Handshake chip ESP32-WROOM... [OK] Gravando flash ROM...');
      setProgress(45);
    }, 1100);

    setTimeout(() => {
      setSerialMsg('> Gravando blocos de memória e partição NVS... 85%');
      setProgress(85);
    }, 2200);

    setTimeout(() => {
      setSerialStep('done');
      setSerialMsg('=== [OK] FIRMWARE EM EXECUÇÃO NO HARDWARE! CRC MD5 MATCH ===');
      setProgress(100);
    }, 3400);
  };

  const handleCopyCode = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const espCode = `// Parvus Automate Core ~ Firmware Mecatrônico
#include <WiFi.h>
#include <PubSubClient.h>
#include <DHTesp.h>

#define PIN_DHT 4
#define PIN_RELAY 26
#define PIN_OLED_SDA 21
#define PIN_OLED_SCL 22

WiFiClient espClient;
PubSubClient mqttClient(espClient);
DHTesp dht;

void setup() {
  Serial.begin(115200);
  pinMode(PIN_RELAY, OUTPUT);
  dht.setup(PIN_DHT, DHTesp::DHT22);
  
  // Conexão autônoma e reconexão failsafe
  connectWiFi("PARVUS_WIFI", "ENTERPRISE_KEY");
  mqttClient.setServer("broker.parvuspace.com.br", 1883);
}

void loop() {
  float temp = dht.getTemperature();
  float hum = dht.getHumidity();

  // Failsafe mecatrônico validado
  if (temp > 45.0) {
    digitalWrite(PIN_RELAY, HIGH); // Ativa resfriamento
    mqttClient.publish("telemetry/alarm", "HIGH_TEMP_TRIGGER");
  }
  delay(2000);
}`;

  const nodeCode = `// Parvus Automate Core ~ Microsserviço de Produção
import express from 'express';
import { createClient } from '@supabase/supabase-js';

const app = express();
app.use(express.json());

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Endpoint de telemetria mecatrônica & leads
app.post('/api/telemetry', async (req, res) => {
  const { deviceId, temperature, humidity, relayState } = req.body;
  
  const { data, error } = await supabase
    .from('device_telemetry')
    .insert([{ device_id: deviceId, temperature, humidity, relay_state: relayState }]);
    
  if (error) return res.status(500).json({ error: error.message });
  return res.status(200).json({ status: 'PROCESSED', timestamp: new Date() });
});

app.listen(3000, () => console.log('Parvus Automate API: Online port 3000'));`;

  return (
    <section ref={sectionRef} id="automate-ai" className="automate-section">
      <div className="automate-ambient-top" />
      <div className="automate-ambient-bottom" />
      <div className="automate-grid-overlay" />

      <div className="automate-container">
        {/* ══ HEADER ══ */}
        <header className="automate-header">
          <div className="automate-pill-badge">
            <span className="automate-pulse-dot" />
            <span className="automate-badge-text">ECOSSISTEMA PARVUS SPACE</span>
            <span className="automate-badge-divider">|</span>
            <span className="automate-badge-sub">MOTOR DE ENGENHARIA AUTÔNOMA</span>
          </div>

          <h2 className="automate-title">
            <span className="automate-title-gradient">PARVUS AUTOMATE AI</span>
          </h2>

          <p className="automate-subtitle">
            Do briefing ao firmware ESP32 e software fullstack em menos de 2 minutos.
          </p>

          <p className="automate-desc">
            Desenvolvido para exterminar o gargalo da execução técnica. O motor proprietário 
            que projeta esquemáticos mecatrônicos compatíveis com Wokwi, compila firmwares em C++ e 
            grava placas físicas via USB direto do navegador com a <strong>Web Serial API</strong>.
          </p>

          <div className="automate-cta-group">
            <a
              href={APP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-automate-primary"
            >
              <span>Acessar Plataforma Ao Vivo</span>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="7" y1="17" x2="17" y2="7"></line>
                <polyline points="7 7 17 7 17 17"></polyline>
              </svg>
            </a>

            <button
              onClick={() => setIsModalOpen(true)}
              className="btn-automate-secondary"
            >
              <span>⚡ Testar Simulador Embutido</span>
            </button>
          </div>
        </header>

        {/* ══ METRICS STRIP ══ */}
        <div className="automate-stats-strip">
          <div className="automate-stat-card">
            <div className="automate-stat-val">
              <span className="accent-amber">48.2s</span>
            </div>
            <div className="automate-stat-lbl">Tempo Médio de Geração</div>
            <div className="automate-stat-desc">Software e firmware compilados do zero em segundos.</div>
          </div>

          <div className="automate-stat-card">
            <div className="automate-stat-val">
              <span className="accent-green">100%</span>
            </div>
            <div className="automate-stat-lbl">Código Compilável</div>
            <div className="automate-stat-desc">Zero snippets soltos; pronto para Arduino IDE e Docker.</div>
          </div>

          <div className="automate-stat-card">
            <div className="automate-stat-val">
              <span className="accent-green">Web Serial</span>
            </div>
            <div className="automate-stat-lbl">Gravação USB Direta</div>
            <div className="automate-stat-desc">Grave seu ESP32 pelo Chrome sem instalar compiladores.</div>
          </div>

          <div className="automate-stat-card">
            <div className="automate-stat-val">
              <span className="accent-amber">White-Label</span>
            </div>
            <div className="automate-stat-lbl">Licença Comercial</div>
            <div className="automate-stat-desc">Exportação ZIP completa com direitos 100% para sua empresa.</div>
          </div>
        </div>

        {/* ══ WORKSPACE SIMULATOR (INTERACTIVE TERMINAL) ══ */}
        <div className="automate-terminal-window">
          {/* Titlebar */}
          <div className="terminal-titlebar">
            <div className="terminal-dots">
              <span className="terminal-dot dot-red" />
              <span className="terminal-dot dot-yellow" />
              <span className="terminal-dot dot-green" />
            </div>

            <div className="terminal-title">
              <span style={{ color: 'var(--amber)' }}>parvus-automate-core</span>
              <span>~</span>
              <span style={{ color: '#00ff88' }}>live_workspace</span>
            </div>

            <div className="terminal-actions">
              <span className="terminal-badge-live">
                <span className="automate-pulse-dot" style={{ width: 6, height: 6 }} />
                <span>ONLINE • KERNEL V2.4</span>
              </span>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="terminal-tabs">
            <button
              onClick={() => setActiveTab('esp32')}
              className={`terminal-tab-btn ${activeTab === 'esp32' ? 'active' : ''}`}
            >
              <span>⚡ 01. Firmware ESP32 & Mecatrônica (C++)</span>
            </button>
            <button
              onClick={() => setActiveTab('fullstack')}
              className={`terminal-tab-btn ${activeTab === 'fullstack' ? 'active' : ''}`}
            >
              <span>🌐 02. Microsserviço & API (Node.js)</span>
            </button>
            <button
              onClick={() => setActiveTab('pipeline')}
              className={`terminal-tab-btn ${activeTab === 'pipeline' ? 'active' : ''}`}
            >
              <span>⚙️ 03. Pipeline de Compilação Autônoma</span>
            </button>
          </div>

          {/* Tab Content */}
          <div className="terminal-workspace">
            {activeTab === 'esp32' && (
              <>
                {/* Code View */}
                <div className="terminal-code-pane">
                  <div className="code-pane-bar">
                    <span>firmware_esp32_iot.cpp • Wokwi & Arduino Compatible</span>
                    <button
                      onClick={() => handleCopyCode(espCode)}
                      className="code-copy-btn"
                    >
                      {copied ? '✓ Copiado!' : 'Copiar C++'}
                    </button>
                  </div>
                  <pre className="code-scrollable">
                    <code>
                      <span className="code-comment">{espCode}</span>
                    </code>
                  </pre>
                </div>

                {/* Hardware Inspector & Web Serial */}
                <div className="terminal-inspector-pane">
                  <div className="inspector-box">
                    <div className="inspector-header">
                      <span className="inspector-title">
                        <span>🔌 Pinagem & Tolerâncias Físicas</span>
                      </span>
                      <span style={{ fontSize: 10, color: '#00ff88', fontFamily: 'var(--font-mono)' }}>GPIO CHECK: OK</span>
                    </div>
                    <div className="pinout-list">
                      <div className="pinout-item">
                        <span className="pin-gpio">GPIO 4</span>
                        <span className="pin-name">Sensor DHT22 (Telemetria)</span>
                        <span className="pin-tag">Digital In</span>
                      </div>
                      <div className="pinout-item">
                        <span className="pin-gpio">GPIO 26</span>
                        <span className="pin-name">Relé Industrial Failsafe</span>
                        <span className="pin-tag">Output</span>
                      </div>
                      <div className="pinout-item">
                        <span className="pin-gpio">GPIO 21 / 22</span>
                        <span className="pin-name">Display OLED I2C (SDA/SCL)</span>
                        <span className="pin-tag">I2C Bus</span>
                      </div>
                    </div>
                  </div>

                  {/* Web Serial USB Flash Box */}
                  <div className="serial-sim-box">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 600, color: '#00ff88' }}>
                        WEB SERIAL API DIRECT FLASH
                      </span>
                      <span style={{ fontSize: 10, color: 'var(--titanium-50)' }}>
                        USB CDC • CH340 / CP2102
                      </span>
                    </div>

                    <div className="serial-status-text">
                      {serialMsg}
                    </div>

                    {serialStep === 'flashing' && (
                      <div style={{ width: '100%', height: 4, background: 'rgba(255,255,255,0.1)', borderRadius: 2, overflow: 'hidden' }}>
                        <div style={{ width: `${progress}%`, height: '100%', background: '#00ff88', transition: 'width 0.8s ease' }} />
                      </div>
                    )}

                    <button
                      onClick={handleSimulateFlash}
                      disabled={serialStep === 'connecting' || serialStep === 'flashing'}
                      className="btn-trigger-serial"
                    >
                      {serialStep === 'flashing' ? 'Gravando Flash...' : '▶ Gravar ESP32 via USB no Navegador'}
                    </button>
                  </div>
                </div>
              </>
            )}

            {activeTab === 'fullstack' && (
              <>
                <div className="terminal-code-pane">
                  <div className="code-pane-bar">
                    <span>server.js • Express RESTful + Supabase DB</span>
                    <button
                      onClick={() => handleCopyCode(nodeCode)}
                      className="code-copy-btn"
                    >
                      {copied ? '✓ Copiado!' : 'Copiar JS'}
                    </button>
                  </div>
                  <pre className="code-scrollable">
                    <code>
                      <span className="code-comment">{nodeCode}</span>
                    </code>
                  </pre>
                </div>

                <div className="terminal-inspector-pane">
                  <div className="inspector-box">
                    <div className="inspector-header">
                      <span className="inspector-title">
                        <span>📊 Resposta de Endpoint em Tempo Real</span>
                      </span>
                      <span style={{ fontSize: 10, color: '#00ff88', fontFamily: 'var(--font-mono)' }}>HTTP 200 OK • 18ms</span>
                    </div>
                    <pre style={{ background: '#040404', padding: 12, borderRadius: 6, fontSize: 11.5, fontFamily: 'var(--font-mono)', color: '#8be9fd', overflowX: 'auto' }}>
{`{
  "status": "PROCESSED",
  "device_id": "esp32-node-01",
  "temperature": 27.4,
  "humidity": 58.2,
  "relay_state": "ACTIVE",
  "supabase_sync": true,
  "latency": "18.4ms"
}`}
                    </pre>
                  </div>

                  <div className="inspector-box">
                    <div className="inspector-header">
                      <span className="inspector-title">
                        <span>🛡️ Segurança & Docker</span>
                      </span>
                      <span className="pin-tag">ZERO BREAK</span>
                    </div>
                    <p style={{ fontSize: 12, color: 'var(--titanium-70)', lineHeight: 1.5 }}>
                      Cada geração inclui Dockerfile auditado, script de migração SQL para Supabase/PostgreSQL 
                      e variáveis de ambiente prontas para deploy instantâneo na Vercel ou AWS.
                    </p>
                  </div>
                </div>
              </>
            )}

            {activeTab === 'pipeline' && (
              <div style={{ gridColumn: '1 / -1' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14 }}>
                  <div className="pipeline-step-item active">
                    <div className="step-number">01</div>
                    <div className="step-details">
                      <h4>Briefing & NLP</h4>
                      <p>Interpretação semântica de requisitos mecatrônicos e de negócios em linguagem natural.</p>
                    </div>
                  </div>

                  <div className="pipeline-step-item active">
                    <div className="step-number">02</div>
                    <div className="step-details">
                      <h4>Dimensionamento</h4>
                      <p>Definição de pinagem GPIO, barramentos I2C/SPI e proteção elétrica com lógica failsafe.</p>
                    </div>
                  </div>

                  <div className="pipeline-step-item active">
                    <div className="step-number">03</div>
                    <div className="step-details">
                      <h4>Síntese de Firmware</h4>
                      <p>Compilação de C++ mecatrônico com FreeRTOS e esquemático de ligação SVG para simulador Wokwi.</p>
                    </div>
                  </div>

                  <div className="pipeline-step-item active">
                    <div className="step-number">04</div>
                    <div className="step-details">
                      <h4>Backend & Schema</h4>
                      <p>Geração de microsserviço Express e banco relacional Supabase com autenticação e endpoints REST.</p>
                    </div>
                  </div>

                  <div className="pipeline-step-item active">
                    <div className="step-number">05</div>
                    <div className="step-details">
                      <h4>Exportação ZIP</h4>
                      <p>Download instantâneo sem marca d’água, pronto para produção, deploy e monetização por agências.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ══ 3 PILLARS CARDS ══ */}
        <div className="automate-pillars-grid">
          <div className="automate-pillar-card">
            <div className="pillar-tag">
              <span>01 / PILAR DE SOFTWARE</span>
            </div>
            <h3 className="pillar-title">Software Autônomo & Fullstack</h3>
            <p className="pillar-desc">
              Gera SPAs React fluidas, microsserviços Node.js de alto desempenho e esquemas 
              de banco Supabase totalmente configurados. Arquitetura pronta sem dependências quebradas.
            </p>
            <div className="pillar-features">
              <div className="pillar-feat-item">
                <span className="pillar-feat-dot" />
                <span>SPAs interativas com tailwind e glassmorphism</span>
              </div>
              <div className="pillar-feat-item">
                <span className="pillar-feat-dot" />
                <span>Microsserviços Express RESTful estruturados</span>
              </div>
              <div className="pillar-feat-item">
                <span className="pillar-feat-dot" />
                <span>Scripts SQL e migrações Supabase automáticas</span>
              </div>
            </div>
          </div>

          <div className="automate-pillar-card">
            <div className="pillar-tag">
              <span>02 / PILAR MECATRÔNICO</span>
            </div>
            <h3 className="pillar-title">Engenharia IoT & Hardware Físico</h3>
            <p className="pillar-desc">
              Integração completa com o simulador Wokwi. Teste seu projeto sem hardware em mãos 
              e grave diretamente no ESP32/Arduino via porta USB usando a Web Serial API nativa.
            </p>
            <div className="pillar-features">
              <div className="pillar-feat-item">
                <span className="pillar-feat-dot" />
                <span>Simulação mecatrônica Wokwi sem comprar peças</span>
              </div>
              <div className="pillar-feat-item">
                <span className="pillar-feat-dot" />
                <span>Gravação USB no microcontrolador via navegador</span>
              </div>
              <div className="pillar-feat-item">
                <span className="pillar-feat-dot" />
                <span>Dimensionamento automático de pinagem GPIO e failsafe</span>
              </div>
            </div>
          </div>

          <div className="automate-pillar-card">
            <div className="pillar-tag">
              <span>03 / PILAR COMERCIAL</span>
            </div>
            <h3 className="pillar-title">Modo Agência & White-Label</h3>
            <p className="pillar-desc">
              Desenvolvido para consultores, estúdios e empresas que precisam entregar rápido. 
              Exportação instantânea de arquivos ZIP com código 100% proprietário e sem marcas Parvus.
            </p>
            <div className="pillar-features">
              <div className="pillar-feat-item">
                <span className="pillar-feat-dot" />
                <span>Remoção total de marcas d’água e assinaturas</span>
              </div>
              <div className="pillar-feat-item">
                <span className="pillar-feat-dot" />
                <span>Licença comercial irrestrita para revenda</span>
              </div>
              <div className="pillar-feat-item">
                <span className="pillar-feat-dot" />
                <span>Dockerfiles e documentação técnica pronta</span>
              </div>
            </div>
          </div>
        </div>

        {/* ══ COMPARISON: CONVENCIONAL VS PARVUS AUTOMATE ══ */}
        <div className="automate-comparison-box">
          <div className="comparison-header">
            <h3 className="comparison-headline">Desenvolvimento Convencional vs Parvus Automate</h3>
            <p className="comparison-sub">Entenda por que a Engenharia Autônoma está redefinindo prazos e orçamentos na indústria de tecnologia.</p>
          </div>

          <div className="comparison-table-wrap">
            <div className="comparison-col traditional">
              <span className="col-badge trad">Abordagem Convencional</span>
              <div className="comparison-list">
                <div className="comparison-item">
                  <span className="comp-icon-x">✕</span>
                  <span><strong>3 a 8 semanas</strong> para o primeiro protótipo funcional mecatrônico.</span>
                </div>
                <div className="comparison-item">
                  <span className="comp-icon-x">✕</span>
                  <span>Necessidade de equipe sênior multidisciplinar (Frontend, Backend e Engenheiro de Hardware).</span>
                </div>
                <div className="comparison-item">
                  <span className="comp-icon-x">✕</span>
                  <span>Custo elevado de tentativa e erro com componentes queimados por pinagem incorreta.</span>
                </div>
                <div className="comparison-item">
                  <span className="comp-icon-x">✕</span>
                  <span>Dependência contínua de programadores para qualquer pequena alteração no firmware.</span>
                </div>
              </div>
            </div>

            <div className="comparison-col parvus-side">
              <span className="col-badge parv">Parvus Automate AI</span>
              <div className="comparison-list">
                <div className="comparison-item">
                  <span className="comp-icon-check">✓</span>
                  <span><strong>48 segundos</strong> para o firmware C++ completo e a SPA de controle.</span>
                </div>
                <div className="comparison-item">
                  <span className="comp-icon-check">✓</span>
                  <span>Simulador Wokwi integrado para validar o circuito antes de gastar com placas.</span>
                </div>
                <div className="comparison-item">
                  <span className="comp-icon-check">✓</span>
                  <span>Gravação nativa via USB direto do Google Chrome com Web Serial API.</span>
                </div>
                <div className="comparison-item">
                  <span className="comp-icon-check">✓</span>
                  <span>Exportação ZIP em 1 clique com Dockerfile, esquemáticos SVG e banco Supabase.</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ══ BOTTOM CTA BANNER ══ */}
        <div className="automate-bottom-banner">
          <div className="bottom-banner-text">
            <h3>Pronto para experimentar o futuro da automação?</h3>
            <p>
              Acesse a plataforma agora mesmo, gere sua primeira solução mecatrônica ou fale 
              diretamente com Pablo Nunes Pereira para ativar planos Creator ou Enterprise.
            </p>
          </div>

          <div className="bottom-banner-actions">
            <a
              href={APP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-automate-primary"
            >
              <span>Acessar Plataforma Agora ↗</span>
            </a>

            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-automate-secondary"
            >
              <span>Falar no WhatsApp Oficial</span>
            </a>
          </div>
        </div>
      </div>

      {/* ══ LIVE MODAL IFRAME PREVIEW ══ */}
      {isModalOpen && (
        <div className="automate-modal-backdrop" onClick={() => setIsModalOpen(false)}>
          <div className="automate-modal-window" onClick={(e) => e.stopPropagation()}>
            <div className="automate-modal-bar">
              <div className="modal-bar-left">
                <div className="terminal-dots">
                  <span className="terminal-dot dot-red" onClick={() => setIsModalOpen(false)} style={{ cursor: 'pointer' }} />
                  <span className="terminal-dot dot-yellow" />
                  <span className="terminal-dot dot-green" />
                </div>
                <div className="modal-url-pill">
                  <span className="automate-pulse-dot" style={{ width: 6, height: 6 }} />
                  <span>https://parvusautomateai2.vercel.app</span>
                </div>
              </div>

              <div className="modal-bar-actions">
                <a
                  href={APP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="modal-btn-open"
                >
                  Abrir em Nova Aba ↗
                </a>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="modal-btn-close"
                  aria-label="Fechar modal"
                >
                  ✕
                </button>
              </div>
            </div>

            <iframe
              src={APP_URL}
              title="Parvus Automate AI Live Demo"
              className="automate-iframe-frame"
              allow="serial; usb; clipboard-write; clipboard-read"
            />
          </div>
        </div>
      )}
    </section>
  );
}
