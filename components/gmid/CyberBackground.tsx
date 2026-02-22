"use client";
export function CyberBackground() {
  return (
    <>
      <div className="cyber-grid" />
      <div className="scanline" />
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0,
        background: 'radial-gradient(ellipse 70% 50% at 50% -10%, rgba(0,245,255,0.08) 0%, transparent 70%)' }} />
    </>
  );
}
