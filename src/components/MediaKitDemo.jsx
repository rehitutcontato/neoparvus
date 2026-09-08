import { useRef, useEffect, useState } from 'react';
import creatorData from '../data/creatorData.json';
import './MediaKitDemo.css';

const { profile, metrics, showcase, packages, whatsapp } = creatorData;

const WA_LINK = `https://wa.me/${whatsapp.number}?text=${encodeURIComponent(whatsapp.message)}`;

/* ── Animated Number Counter ── */
function AnimatedMetric({ value, label, delay = 0 }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="mk-metric-card"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
      }}
    >
      <div className="mk-metric-value">{value}</div>
      <div className="mk-metric-label">{label}</div>
    </div>
  );
}

/* ── Demographics Bar ── */
function DemoBar({ label, value, maxValue = 100 }) {
  const [animated, setAnimated] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setAnimated(true); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="mk-bar-group">
      <div className="mk-bar-label">
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div className="mk-bar-track">
        <div
          className="mk-bar-fill"
          style={{ width: animated ? `${(value / maxValue) * 100}%` : '0%' }}
        />
      </div>
    </div>
  );
}

/* ── Video Card ── */
function VideoCard({ item }) {
  return (
    <div className="mk-video-card">
      {item.thumbnail ? (
        <img
          className="mk-video-thumb"
          src={item.thumbnail}
          alt={item.title}
          loading="lazy"
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'flex';
          }}
        />
      ) : null}
      <div
        className="mk-video-placeholder"
        style={{ display: item.thumbnail ? 'none' : 'flex' }}
      >
        <div className="mk-video-placeholder-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--amber)' }}>
            <polygon points="5 3 19 12 5 21 5 3" fill="currentColor" />
          </svg>
        </div>
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '10px',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: 'var(--zinc-tech)',
        }}>
          {item.category}
        </span>
      </div>
      <div className="mk-video-overlay">
        <div className="mk-video-title">{item.title}</div>
        <div className="mk-video-brand">{item.brand}</div>
      </div>
    </div>
  );
}

/* ── Check Icon ── */
function CheckIcon() {
  return (
    <svg className="mk-package-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

/* ── Package Card ── */
function PackageCard({ pkg, featured = false }) {
  return (
    <div className={`mk-package-card${featured ? ' mk-package-card--featured' : ''}`}>
      <span className="mk-package-tier">{pkg.tier}</span>
      <h4 className="mk-package-name">{pkg.name}</h4>
      <p className="mk-package-desc">{pkg.description}</p>
      <ul className="mk-package-includes">
        {pkg.includes.map((item, i) => (
          <li key={i} className="mk-package-item">
            <CheckIcon />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   MAIN — MediaKitDemo
   ══════════════════════════════════════════════════════════════ */
export default function MediaKitDemo({ isOpen }) {
  return (
    <div className={`mk-demo${isOpen ? ' mk-open' : ''}`}>
      <div className="mk-inner">

        {/* ── DIVIDER TOP ── */}
        <div className="mk-divider" />

        {/* ── SECTION LABEL ── */}
        <div style={{ marginBottom: '48px' }}>
          <span className="mk-section-label">DEMO / MÍDIA KIT INTERATIVO</span>
          <h3 className="mk-section-title">
            Veja como um Mídia Kit{' '}
            <span style={{ color: 'var(--amber)' }}>de verdade</span>{' '}
            funciona.
          </h3>
        </div>

        {/* ══ 1. PROFILE & POSITIONING ══ */}
        <div className="mk-profile">
          <div className="mk-avatar-placeholder">
            {profile.name.charAt(0)}
          </div>
          <div className="mk-profile-info">
            <h3 className="mk-name">{profile.name}</h3>
            <p className="mk-tagline">{profile.tagline}</p>
            <p className="mk-location">{profile.location}</p>
            <div className="mk-niches">
              {profile.niches.map((n) => (
                <span key={n} className="mk-niche-badge">{n}</span>
              ))}
            </div>
          </div>
        </div>

        {/* ══ 2. METRICS DASHBOARD ══ */}
        <div style={{ marginBottom: '16px' }}>
          <span className="mk-section-label">MÉTRICAS DE AUTORIDADE</span>
        </div>

        <div className="mk-bento">
          <AnimatedMetric
            value={metrics.totalViews.value}
            label={metrics.totalViews.label}
            delay={0}
          />
          <AnimatedMetric
            value={metrics.peakReach.value}
            label={metrics.peakReach.label}
            delay={100}
          />
          <AnimatedMetric
            value={metrics.avgRetention.value}
            label={metrics.avgRetention.label}
            delay={200}
          />
          <AnimatedMetric
            value={metrics.engagementRate.value}
            label={metrics.engagementRate.label}
            delay={300}
          />

          {/* Demographics — Gender */}
          <div className="mk-demo-card">
            <div className="mk-demo-card-title">Demografia do Público</div>
            <div className="mk-demo-grid">
              <div>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  letterSpacing: '0.08em',
                  color: 'var(--titanium-50)',
                  marginBottom: '16px',
                  textTransform: 'uppercase',
                }}>
                  Gênero
                </div>
                {metrics.demographics.gender.map((g) => (
                  <DemoBar key={g.label} label={g.label} value={g.value} />
                ))}
              </div>
              <div>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  letterSpacing: '0.08em',
                  color: 'var(--titanium-50)',
                  marginBottom: '16px',
                  textTransform: 'uppercase',
                }}>
                  Faixa Etária
                </div>
                {metrics.demographics.ageGroups.map((a) => (
                  <DemoBar key={a.label} label={a.label} value={a.value} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ══ 3. VIDEO SHOWCASE ══ */}
        <div className="mk-showcase">
          <div style={{ marginBottom: '16px' }}>
            <span className="mk-section-label">VITRINE DE AÇÕES</span>
          </div>
          <h3 className="mk-section-title">
            Colaborações que{' '}
            <span style={{ color: 'var(--amber)' }}>geram resultado.</span>
          </h3>
          <div className="mk-video-grid">
            {showcase.map((item) => (
              <VideoCard key={item.id} item={item} />
            ))}
          </div>
        </div>

        {/* ══ 4. COMMERCIAL PACKAGES ══ */}
        <div className="mk-packages">
          <div style={{ marginBottom: '16px' }}>
            <span className="mk-section-label">PACOTES COMERCIAIS</span>
          </div>
          <h3 className="mk-section-title">
            Escolha o formato ideal para sua{' '}
            <span style={{ color: 'var(--amber)' }}>marca.</span>
          </h3>
          <div className="mk-packages-grid">
            {packages.map((pkg, i) => (
              <PackageCard
                key={pkg.id}
                pkg={pkg}
                featured={i === packages.length - 1}
              />
            ))}
          </div>
        </div>

        {/* ══ 5. COMMERCIAL CTA ══ */}
        <div className="mk-cta-bar">
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="mk-cta-btn"
          >
            Solicitar Disponibilidade de Data ↗
          </a>
        </div>

      </div>
    </div>
  );
}
