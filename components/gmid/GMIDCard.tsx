"use client";
import { useState } from "react";
import { XPBar } from "./XPBar";
import { NeonBadge } from "./NeonBadge";

interface GMIDCardProps {
  id?: string;
  name?: string;
  rank?: string;
  level?: number;
  points?: number;
  xpCurrent?: number;
  xpMax?: number;
  avatar?: string;
  flippable?: boolean;
}

const RANK_COLORS: Record<string, { text: string; glow: string; gradient: string }> = {
  RECRUIT:   { text: '#7a8fa6', glow: 'rgba(122,143,166,0.4)', gradient: 'linear-gradient(135deg, #1a2030, #0d1520)' },
  AGENT:     { text: '#00f5ff', glow: 'rgba(0,245,255,0.5)',   gradient: 'linear-gradient(135deg, #001a2e, #002a3a)' },
  OPERATIVE: { text: '#bf00ff', glow: 'rgba(191,0,255,0.5)',   gradient: 'linear-gradient(135deg, #1a0030, #0d0020)' },
  PHANTOM:   { text: '#ff6b00', glow: 'rgba(255,107,0,0.5)',   gradient: 'linear-gradient(135deg, #2a1000, #1a0800)' },
  LEGEND:    { text: '#ffd700', glow: 'rgba(255,215,0,0.6)',   gradient: 'linear-gradient(135deg, #2a2000, #1a1500)' },
};

export function GMIDCard({
  id = 'GN-2024-7741',
  name = 'Ghost_Cipher',
  rank = 'OPERATIVE',
  level = 42,
  points = 18750,
  xpCurrent = 3200,
  xpMax = 5000,
  flippable = true,
}: GMIDCardProps) {
  const [flipped, setFlipped] = useState(false);
  const rc = RANK_COLORS[rank] || RANK_COLORS.AGENT;

  return (
    <div
      style={{ perspective: '1000px', width: '100%', maxWidth: 420, cursor: flippable ? 'pointer' : 'default' }}
      onClick={() => flippable && setFlipped(f => !f)}
    >
      <div style={{
        position: 'relative', width: '100%', paddingBottom: '58%',
        transformStyle: 'preserve-3d',
        transition: 'transform 0.7s cubic-bezier(0.4,0,0.2,1)',
        transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
      }}>
        {/* FRONT */}
        <div style={{
          position: 'absolute', inset: 0, backfaceVisibility: 'hidden',
          borderRadius: 16, overflow: 'hidden',
          background: rc.gradient,
          border: `1px solid ${rc.text}33`,
          boxShadow: `0 0 40px ${rc.glow}, 0 20px 60px rgba(0,0,0,0.6)`,
        }}>
          {/* Holo shimmer */}
          <div className="holo-shimmer" />
          {/* Scanline */}
          <div style={{ position: 'absolute', inset: 0, background: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.06) 3px, rgba(0,0,0,0.06) 4px)', pointerEvents: 'none' }} />
          {/* Corner accents */}
          <div style={{ position: 'absolute', top: 10, left: 10, width: 16, height: 16, borderTop: `2px solid ${rc.text}`, borderLeft: `2px solid ${rc.text}`, borderRadius: '3px 0 0 0' }} />
          <div style={{ position: 'absolute', top: 10, right: 10, width: 16, height: 16, borderTop: `2px solid ${rc.text}`, borderRight: `2px solid ${rc.text}`, borderRadius: '0 3px 0 0' }} />
          <div style={{ position: 'absolute', bottom: 10, left: 10, width: 16, height: 16, borderBottom: `2px solid ${rc.text}`, borderLeft: `2px solid ${rc.text}`, borderRadius: '0 0 0 3px' }} />
          <div style={{ position: 'absolute', bottom: 10, right: 10, width: 16, height: 16, borderBottom: `2px solid ${rc.text}`, borderRight: `2px solid ${rc.text}`, borderRadius: '0 0 3px 0' }} />

          <div style={{ padding: '20px 24px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: 8, letterSpacing: '0.3em', color: rc.text, opacity: 0.7, textTransform: 'uppercase', marginBottom: 2 }}>Ghostnett Identity</p>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 900, color: rc.text, textShadow: `0 0 16px ${rc.glow}`, letterSpacing: '0.1em' }}>GMID</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ width: 36, height: 36, borderRadius: 8, background: `${rc.text}22`, border: `1px solid ${rc.text}44`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: 12, fontWeight: 900, color: rc.text }}>GN</span>
                </div>
              </div>
            </div>

            {/* Avatar + Info */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ width: 52, height: 52, borderRadius: 12, background: `linear-gradient(135deg, ${rc.text}33, ${rc.text}11)`, border: `2px solid ${rc.text}66`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ fontSize: 22 }}>👤</span>
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 700, color: '#e8f4ff', letterSpacing: '0.05em', marginBottom: 3 }}>{name}</p>
                <div style={{ display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap' }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: 9, color: rc.text, letterSpacing: '0.15em', textTransform: 'uppercase', background: `${rc.text}18`, border: `1px solid ${rc.text}44`, borderRadius: 4, padding: '2px 7px' }}>{rank}</span>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: 9, color: '#7a8fa6', letterSpacing: '0.1em' }}>LVL {level}</span>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 900, color: rc.text, textShadow: `0 0 12px ${rc.glow}` }}>{points.toLocaleString()}</p>
                <p style={{ fontSize: 9, color: '#7a8fa6', fontFamily: 'var(--font-display)', letterSpacing: '0.1em' }}>POINTS</p>
              </div>
            </div>

            {/* XP Bar */}
            <div>
              <XPBar current={xpCurrent} max={xpMax} label={false} height={5} />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4, fontSize: 9, color: '#7a8fa6', fontFamily: 'var(--font-display)', letterSpacing: '0.08em' }}>
                <span>{xpCurrent.toLocaleString()} XP</span>
                <span>{xpMax.toLocaleString()} XP</span>
              </div>
            </div>

            {/* Footer */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: 9, color: '#7a8fa6', letterSpacing: '0.15em' }}>{id}</p>
              <p style={{ fontSize: 8, color: `${rc.text}66`, fontFamily: 'var(--font-display)', letterSpacing: '0.1em' }}>TAP TO FLIP</p>
            </div>
          </div>
        </div>

        {/* BACK */}
        <div style={{
          position: 'absolute', inset: 0, backfaceVisibility: 'hidden',
          transform: 'rotateY(180deg)',
          borderRadius: 16, overflow: 'hidden',
          background: 'linear-gradient(135deg, #0a0a1a, #060612)',
          border: `1px solid ${rc.text}33`,
          boxShadow: `0 0 40px ${rc.glow}, 0 20px 60px rgba(0,0,0,0.6)`,
        }}>
          <div className="holo-shimmer" />
          <div style={{ padding: '20px 24px', height: '100%', display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: 9, color: rc.text, letterSpacing: '0.2em', textTransform: 'uppercase' }}>Member Details</p>
              <span style={{ fontSize: 9, color: '#7a8fa6', fontFamily: 'var(--font-display)' }}>GHOSTNETT</span>
            </div>
            {/* Barcode */}
            <div style={{ display: 'flex', gap: 2, height: 40, alignItems: 'flex-end' }}>
              {Array.from({ length: 48 }).map((_, i) => (
                <div key={i} style={{ flex: 1, background: rc.text, opacity: Math.random() > 0.4 ? 0.8 : 0.2, height: `${40 + Math.random() * 20}%`, borderRadius: 1 }} />
              ))}
            </div>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: 9, color: '#7a8fa6', letterSpacing: '0.2em', textAlign: 'center' }}>{id}</p>
            <div className="neon-divider" />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {[['MEMBER', name], ['RANK', rank], ['LEVEL', `${level}`], ['POINTS', points.toLocaleString()]].map(([k, v]) => (
                <div key={k} style={{ background: `${rc.text}08`, border: `1px solid ${rc.text}22`, borderRadius: 6, padding: '6px 10px' }}>
                  <p style={{ fontSize: 8, color: '#7a8fa6', fontFamily: 'var(--font-display)', letterSpacing: '0.12em', marginBottom: 2 }}>{k}</p>
                  <p style={{ fontSize: 11, color: rc.text, fontFamily: 'var(--font-display)', fontWeight: 700 }}>{v}</p>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 'auto', textAlign: 'center' }}>
              <p style={{ fontSize: 8, color: `${rc.text}44`, fontFamily: 'var(--font-display)', letterSpacing: '0.15em' }}>GHOSTNETT IDENTITY PLATFORM — GMID v2.0</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
