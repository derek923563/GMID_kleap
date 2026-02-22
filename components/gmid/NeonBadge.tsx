"use client";
import { ReactNode } from "react";
interface NeonBadgeProps {
  children: ReactNode;
  variant?: "cyan" | "purple" | "green" | "orange" | "pink";
  pulse?: boolean;
  size?: "sm" | "md";
}
export function NeonBadge({ children, variant = "cyan", pulse = false, size = "sm" }: NeonBadgeProps) {
  const cls = `badge-${variant}`;
  const sz = size === "md" ? { padding: '4px 14px', fontSize: '11px' } : {};
  return (
    <span className={cls} style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', ...sz }}>
      {pulse && (
        <span style={{ width: 6, height: 6, borderRadius: '50%',
          background: variant === 'cyan' ? 'var(--brand)' : variant === 'purple' ? 'var(--accent)' : variant === 'green' ? 'var(--neon-green)' : variant === 'orange' ? 'var(--neon-orange)' : 'var(--neon-pink)',
          display: 'inline-block', animation: 'pulse-dot 1.5s ease-in-out infinite' }} />
      )}
      {children}
    </span>
  );
}
