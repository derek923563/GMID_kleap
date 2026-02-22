"use client";
import { ReactNode } from "react";
interface GlassCardProps {
  children: ReactNode;
  className?: string;
  variant?: "cyan" | "purple" | "subtle";
  neonTop?: boolean;
  corners?: boolean;
  onClick?: () => void;
}
export function GlassCard({ children, className = "", variant = "cyan", neonTop = false, corners = false, onClick }: GlassCardProps) {
  const base = variant === "purple" ? "glass-card-purple" : variant === "subtle" ? "glass-card-subtle" : "glass-card";
  return (
    <div className={`${base} relative ${className}`} onClick={onClick} style={{ cursor: onClick ? 'pointer' : undefined }}>
      {neonTop && (
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
          background: variant === 'purple'
            ? 'linear-gradient(90deg, transparent, var(--accent), transparent)'
            : 'linear-gradient(90deg, transparent, var(--brand), transparent)' }} />
      )}
      {corners && (
        <>
          <div className="corner-tl" style={variant === 'purple' ? { borderColor: 'var(--accent)' } : {}} />
          <div className="corner-tr" style={variant === 'purple' ? { borderColor: 'var(--accent)' } : {}} />
          <div className="corner-bl" style={variant === 'purple' ? { borderColor: 'var(--accent)' } : {}} />
          <div className="corner-br" style={variant === 'purple' ? { borderColor: 'var(--accent)' } : {}} />
        </>
      )}
      {children}
    </div>
  );
}
