"use client";
import { useState } from "react";
import { GlassCard } from "@/components/gmid/GlassCard";
import { NeonBadge } from "@/components/gmid/NeonBadge";
import { XPBar } from "@/components/gmid/XPBar";

const BADGES_EARNED = [
  { icon: "🌐", name: "Dark Web Navigator", color: "var(--brand)" },
  { icon: "🔐", name: "Cipher Master",      color: "var(--accent)" },
  { icon: "👻", name: "Ghost Protocol",     color: "var(--neon-green)" },
  { icon: "⚡", name: "Zero Day Hunter",    color: "#ffd700" },
];

const VERIFICATIONS = [
  { label: "Email Verified",    icon: "✉️", done: true },
  { label: "Identity Confirmed",icon: "🪪", done: true },
  { label: "2FA Enabled",       icon: "🔒", done: true },
  { label: "Phone Linked",      icon: "📱", done: false },
  { label: "GitHub Connected",  icon: "🐙", done: false },
];

// 7×10 activity grid (70 days)
const ACTIVITY_GRID = Array.from({ length: 70 }, (_, i) => ({
  active: Math.random() > 0.45,
  intensity: Math.floor(Math.random() * 4),
}));

export default function ProfilePage() {
  const [editing, setEditing] = useState(false);
  const [bio, setBio] = useState("Cybersecurity enthusiast. OSINT specialist. Ghostnett operative since 2023. Always watching, never seen.");

  return (
    <main style={{ padding: "32px 28px", position: "relative", zIndex: 2, fontFamily: "var(--font-sans)" }}>
      <div style={{ marginBottom: 28 }}>
        <p style={{ fontSize: 10, color: "var(--text-muted)", fontFamily: "var(--font-display)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 4 }}>Identity</p>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: 26, fontWeight: 900, color: "var(--text-primary)" }}>
          My <span className="neon-text">Profile</span>
        </h1>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "320px 1fr", gap: 24 }}>
        {/* Left: Avatar + info */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

          {/* Avatar card */}
          <GlassCard neonTop style={{ padding: 28, textAlign: "center" }}>
            <div style={{ position: "relative", display: "inline-block", marginBottom: 16 }}>
              <div style={{
                width: 90, height: 90, borderRadius: 22, margin: "0 auto",
                background: "linear-gradient(135deg, rgba(0,245,255,0.2), rgba(191,0,255,0.2))",
                border: "2px solid var(--border-neon)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 40, boxShadow: "0 0 30px var(--brand-glow)",
              }}>👤</div>
              <div style={{ position: "absolute", bottom: -4, right: -4, width: 22, height: 22, borderRadius: "50%", background: "var(--neon-green)", border: "2px solid var(--surface)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: 10 }}>✓</span>
              </div>
            </div>
            <p style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 900, color: "var(--text-primary)", letterSpacing: "0.06em", marginBottom: 4 }}>Ghost_Cipher</p>
            <p style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 12 }}>GN-2024-7741</p>
            <div style={{ display: "flex", justifyContent: "center", gap: 6, flexWrap: "wrap", marginBottom: 16 }}>
              <NeonBadge variant="purple">OPERATIVE</NeonBadge>
              <NeonBadge variant="cyan">LVL 42</NeonBadge>
              <NeonBadge variant="green">Verified</NeonBadge>
            </div>
            <div className="neon-divider" style={{ marginBottom: 14 }} />
            {editing ? (
              <div>
                <textarea value={bio} onChange={e => setBio(e.target.value)} style={{
                  width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-neon)",
                  borderRadius: 8, padding: "10px 12px", color: "var(--text-primary)", fontSize: 12,
                  fontFamily: "var(--font-sans)", resize: "none", outline: "none", lineHeight: 1.5,
                }} rows={4} />
                <button onClick={() => setEditing(false)} style={{ marginTop: 8, width: "100%", padding: "8px", borderRadius: 8, border: "1px solid var(--border-neon)", background: "var(--brand-dim)", color: "var(--brand)", fontFamily: "var(--font-display)", fontSize: 10, letterSpacing: "0.1em", cursor: "pointer" }}>SAVE BIO</button>
              </div>
            ) : (
              <div>
                <p style={{ fontSize: 12, color: "var(--text-muted)", lineHeight: 1.6, marginBottom: 10 }}>{bio}</p>
                <button onClick={() => setEditing(true)} style={{ padding: "6px 14px", borderRadius: 7, border: "1px solid rgba(255,255,255,0.1)", background: "transparent", color: "var(--text-dim)", fontFamily: "var(--font-display)", fontSize: 10, letterSpacing: "0.1em", cursor: "pointer" }}>EDIT BIO</button>
              </div>
            )}
          </GlassCard>

          {/* Verification badges */}
          <GlassCard style={{ padding: 22 }}>
            <p style={{ fontFamily: "var(--font-display)", fontSize: 11, letterSpacing: "0.15em", color: "var(--text-muted)", textTransform: "uppercase", marginBottom: 14 }}>Verification Status</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {VERIFICATIONS.map(v => (
                <div key={v.label} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 10px", borderRadius: 8, background: v.done ? "rgba(57,255,20,0.06)" : "rgba(255,255,255,0.02)", border: `1px solid ${v.done ? "rgba(57,255,20,0.2)" : "rgba(255,255,255,0.05)"}` }}>
                  <span style={{ fontSize: 16 }}>{v.icon}</span>
                  <span style={{ flex: 1, fontSize: 12, color: v.done ? "var(--text-primary)" : "var(--text-muted)" }}>{v.label}</span>
                  {v.done
                    ? <span style={{ fontSize: 11, color: "var(--neon-green)", fontFamily: "var(--font-display)" }}>✓</span>
                    : <button style={{ fontSize: 9, color: "var(--brand)", fontFamily: "var(--font-display)", background: "none", border: "1px solid var(--border-neon)", borderRadius: 4, padding: "2px 7px", cursor: "pointer", letterSpacing: "0.08em" }}>LINK</button>
                  }
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* Right: Stats + badges + activity */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

          {/* Stats grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
            {[
              { label: "Total Points",  val: "18,750", color: "var(--brand)" },
              { label: "Global Rank",   val: "#3",     color: "var(--accent)" },
              { label: "Level",         val: "42",     color: "var(--neon-green)" },
              { label: "Quizzes Done",  val: "142",    color: "var(--brand)" },
              { label: "Events Joined", val: "9",      color: "var(--neon-orange)" },
              { label: "Badges Earned", val: "4",      color: "#ffd700" },
            ].map(({ label, val, color }) => (
              <GlassCard key={label} style={{ padding: 16 }}>
                <p style={{ fontSize: 9, color: "var(--text-muted)", fontFamily: "var(--font-display)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 6 }}>{label}</p>
                <p style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 900, color }}>{val}</p>
              </GlassCard>
            ))}
          </div>

          {/* XP progress */}
          <GlassCard style={{ padding: 22 }}>
            <p style={{ fontFamily: "var(--font-display)", fontSize: 11, letterSpacing: "0.15em", color: "var(--text-muted)", textTransform: "uppercase", marginBottom: 14 }}>XP Progress — Level 42</p>
            <XPBar current={3200} max={5000} />
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, fontSize: 10, color: "var(--text-muted)", fontFamily: "var(--font-display)" }}>
              <span>3,200 / 5,000 XP</span>
              <span style={{ color: "var(--brand)" }}>1,800 XP to Level 43</span>
            </div>
          </GlassCard>

          {/* Earned badges */}
          <GlassCard style={{ padding: 22 }}>
            <p style={{ fontFamily: "var(--font-display)", fontSize: 11, letterSpacing: "0.15em", color: "var(--text-muted)", textTransform: "uppercase", marginBottom: 14 }}>Achievement Badges</p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              {BADGES_EARNED.map(b => (
                <div key={b.name} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                  <div style={{ width: 56, height: 56, borderRadius: 14, background: `${b.color}18`, border: `2px solid ${b.color}55`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, boxShadow: `0 0 16px ${b.color}33` }}>{b.icon}</div>
                  <p style={{ fontSize: 9, color: b.color, fontFamily: "var(--font-display)", letterSpacing: "0.06em", textAlign: "center", maxWidth: 64 }}>{b.name}</p>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Activity heatmap */}
          <GlassCard style={{ padding: 22 }}>
            <p style={{ fontFamily: "var(--font-display)", fontSize: 11, letterSpacing: "0.15em", color: "var(--text-muted)", textTransform: "uppercase", marginBottom: 14 }}>Activity — Last 70 Days</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(10, 1fr)", gap: 4 }}>
              {ACTIVITY_GRID.map((cell, i) => (
                <div key={i} style={{
                  aspectRatio: "1", borderRadius: 3,
                  background: cell.active
                    ? cell.intensity === 3 ? "var(--brand)"
                    : cell.intensity === 2 ? "rgba(0,245,255,0.6)"
                    : cell.intensity === 1 ? "rgba(0,245,255,0.3)"
                    : "rgba(0,245,255,0.12)"
                    : "rgba(255,255,255,0.05)",
                  boxShadow: cell.active && cell.intensity === 3 ? "0 0 6px var(--brand-glow)" : "none",
                }} />
              ))}
            </div>
            <div style={{ display: "flex", gap: 6, alignItems: "center", marginTop: 10 }}>
              <span style={{ fontSize: 9, color: "var(--text-dim)", fontFamily: "var(--font-display)" }}>Less</span>
              {["rgba(255,255,255,0.05)","rgba(0,245,255,0.12)","rgba(0,245,255,0.3)","rgba(0,245,255,0.6)","var(--brand)"].map((c, i) => (
                <div key={i} style={{ width: 12, height: 12, borderRadius: 2, background: c }} />
              ))}
              <span style={{ fontSize: 9, color: "var(--text-dim)", fontFamily: "var(--font-display)" }}>More</span>
            </div>
          </GlassCard>
        </div>
      </div>
    </main>
  );
}
