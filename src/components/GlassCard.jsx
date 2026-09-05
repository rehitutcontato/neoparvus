export default function GlassCard({ label, title, children, style = {} }) {
  return (
    <div
      className="glass-card"
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: '320px',
        ...style,
      }}
    >
      {label && (
        <span className="label-mono" style={{ marginBottom: '20px' }}>
          {label}
        </span>
      )}

      <div style={{ flex: 1 }}>
        {title && (
          <h3
            className="headline-md"
            style={{ marginBottom: '16px' }}
          >
            {title}
          </h3>
        )}
        {children}
      </div>
    </div>
  );
}
