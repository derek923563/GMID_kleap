"use client";
import { ReactNode } from "react";
interface StatWidgetProps {
  label: string;
  value: string | number;
  sub?: string;
  icon?: ReactNode;
  color?: "cyan" | "purple" | "green" | "orange";
  trend?: number;
}
export function StatWidget({ label, value, sub, icon, color = "cyan", trend }: StatWidgetProps) {
  const colors = {
    cyan:   { text: 'var(--brand)',       glow: 'var(--brand-glow)',   border: 'var(--border-neon)',   bg: 'var(--brand-dim)' },
    purple: { text: 'var(--accent)',      glow: 'var(--accent-glow)',  border: 'var(--border-purple)', bg: 'var(--accent-dim)' },
    green:  { text: 'var(--neon-green)',  glow: 'rgba(57,255,20,0.4)', border: 'rgba(57,255,20,0.2)',  bg: 'var(--neon-green-dim)' },
    orange: { text: 'var(--neon-orange)', glow: 'rgba(255,107,0,0.4)', border: 'rgba(255,107,0,0.2)', bg: 'rgba(255,107,0,0.1)' },
  };
  const c = colors[color];
  return (
    <div className="stat-widget glass-card" style={{ borderColor: c.border }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${c.text}, transparent)` }} />
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: 10, fontFamily: 'var(--font-display)', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 8 }}>{label}</p>
          <p style={{ fontSize: 28, fontFamily: 'var(--font-display)', fontWeight: 900, color: c.text, textShadow: `0 0 20px ${c.glow}`, lineHeight: 1 }}>{value}</p>
          {sub && <p style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 6 }}>{sub}</p>}
          {trend !== undefined && (
            <p style={{ fontSize: 11, marginTop: 4, color: trend >= 0 ? 'var(--neon-green)' : 'var(--neon-pink)' }}>
              {trend >= 0 ? '▲' : '▼'} {Math.abs(trend)}% this week
            </p>
          )}
        </div>
        {icon && (
          <div style={{ width: 44, height: 44, borderRadius: 10, background: c.bg, border: `1px solid ${c.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}
