"use client";
interface XPBarProps {
  current: number;
  max: number;
  label?: boolean;
  height?: number;
  color?: "cyan" | "purple" | "green";
}
export function XPBar({ current, max, label = true, height = 6, color = "cyan" }: XPBarProps) {
  const pct = Math.min(100, Math.round((current / max) * 100));
  const gradient = color === 'purple'
    ? 'linear-gradient(90deg, var(--accent), #ff0080)'
    : color === 'green'
    ? 'linear-gradient(90deg, var(--neon-green), #00f5ff)'
    : 'linear-gradient(90deg, var(--brand), var(--accent))';
  const glow = color === 'purple' ? 'var(--accent-glow)' : color === 'green' ? 'rgba(57,255,20,0.5)' : 'var(--brand-glow)';
  return (
    <div>
      {label && (
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-display)', letterSpacing: '0.08em' }}>
          <span>XP</span>
          <span style={{ color: 'var(--brand)' }}>{current.toLocaleString()} / {max.toLocaleString()}</span>
        </div>
      )}
      <div className="xp-bar-track" style={{ height }}>
        <div className="xp-bar-fill" style={{ '--xp-width': `${pct}%`, width: `${pct}%`, background: gradient, boxShadow: `0 0 12px ${glow}` } as React.CSSProperties} />
      </div>
    </div>
  );
}
