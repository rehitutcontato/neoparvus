import { useState } from 'react';

const faqs = [
  {
    q: 'Por que o investimento começa em R$\u00A06.000?',
    a: 'Porque cada projeto é construído do zero, em código próprio, com estratégia de conversão real — não é uma template ajustada em algumas horas.',
  },
  {
    q: 'Qual o prazo de entrega?',
    a: 'Varia com o escopo, mas a prioridade é sempre entregar com agilidade sem sacrificar acabamento.',
  },
  {
    q: 'Terei controle total do domínio e código?',
    a: 'Sim. Você é dono de tudo — domínio, código-fonte e conteúdo.',
  },
  {
    q: 'Como funciona a integração com WhatsApp e CRM?',
    a: 'Conectamos formulários, automações e métricas para que nenhum lead qualificado se perca no caminho.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(-1);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section 
      id="faq" 
      className="section section-border" 
      style={{ 
        width: '100%', 
        maxWidth: '100vw', 
        overflow: 'hidden', 
        boxSizing: 'border-box' 
      }}
    >
      <div className="container" style={{ width: '100%', maxWidth: '100%', boxSizing: 'border-box' }}>
        <div style={{ maxWidth: '800px', width: '100%', margin: '0 auto', boxSizing: 'border-box' }}>
          <h2
            data-reveal
            className="headline-lg"
            style={{ 
              marginBottom: 'clamp(28px, 5vw, 48px)',
              fontSize: 'clamp(1.8rem, 5vw, 3rem)',
              wordBreak: 'break-word'
            }}
          >
            Perguntas frequentes
          </h2>

          <div>
            {faqs.map((faq, i) => {
              const isOpen = openIndex === i;

              return (
                <div
                  key={i}
                  data-reveal
                  data-reveal-delay={String(i)}
                  style={{
                    borderBottom: '1px solid var(--glass-border)',
                  }}
                >
                  <button
                    onClick={() => toggle(i)}
                    aria-expanded={isOpen}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '24px 0',
                      textAlign: 'left',
                      gap: '16px',
                      cursor: 'pointer',
                    }}
                  >
                    <span
                      style={{
                        fontSize: '15px',
                        fontWeight: 600,
                        color: 'var(--titanium)',
                        lineHeight: 1.4,
                        paddingRight: '16px',
                      }}
                    >
                      {faq.q}
                    </span>
                    <span
                      style={{
                        fontSize: '20px',
                        color: 'var(--zinc-tech)',
                        flexShrink: 0,
                        lineHeight: 1,
                        transition: 'transform 0.3s ease, color 0.3s ease',
                        transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                        ...(isOpen && { color: 'var(--amber)' }),
                      }}
                    >
                      +
                    </span>
                  </button>

                  <div
                    className={`faq-answer${isOpen ? ' open' : ''}`}
                  >
                    <p
                      className="body-sm"
                      style={{
                        paddingBottom: '24px',
                        paddingRight: '32px',
                      }}
                    >
                      {faq.a}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
