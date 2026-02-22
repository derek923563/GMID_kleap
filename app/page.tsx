"use client";
import Link from "next/link";
import { CyberBackground } from "@/components/gmid/CyberBackground";
import { NeonBadge } from "@/components/gmid/NeonBadge";
import { GlassCard } from "@/components/gmid/GlassCard";

const TICKER = [
  "Ghost_Cipher earned PHANTOM rank",
  "New event: Operation Blackout — 48h remaining",
  "NullVector completed the Cryptography quiz with 100%",
  "Weekly leaderboard reset in 2 days",
  "ShadowByte reached Level 50",
  "New achievement unlocked: Dark Web Navigator",
  "1,247 members online now",
  "Quiz streak record broken: 32 days by Vex_0",
];

const STATS = [
  { label: "Members",   value: "1,247", color: "var(--brand)" },
  { label: "Quizzes",   value: "4,891", color: "var(--accent)" },
  { label: "XP Earned", value: "2.4M",  color: "var(--neon-green)" },
  { label: "Events",    value: "4 Live",color: "var(--neon-orange)" },
];

export default function Home() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--surface)", color: "var(--text-primary)", fontFamily: "var(--font-sans)", overflow: "hidden" }}>
      <CyberBackground />

      {/* Animated rings */}
      <div style={{ position: "fixed", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none", zIndex: 1 }}>
        <div style={{ width: 700, height: 700, borderRadius: "50%", border: "1px solid rgba(0,245,255,0.05)", animation: "rotate-ring 20s linear infinite", position: "absolute" }} />
        <div style={{ width: 520, height: 520, borderRadius: "50%", border: "1px solid rgba(191,0,255,0.05)", animation: "rotate-ring 14s linear infinite reverse", position: "absolute" }} />
        <div style={{ width: 340, height: 340, borderRadius: "50%", border: "1px solid rgba(0,245,255,0.07)", animation: "rotate-ring 8s linear infinite", position: "absolute" }} />
      </div>

      {/* Ticker */}
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, height: 32, background: "rgba(6,6,18,0.95)", borderBottom: "1px solid var(--border-neon)", overflow: "hidden", display: "flex", alignItems: "center" }}>
        <div style={{ display: "flex", gap: 0, whiteSpace: "nowrap", animation: "ticker 40s linear infinite" }}>
          {[...TICKER, ...TICKER].map((t, i) => (
            <span key={i} style={{ fontSize: 10, color: "var(--text-muted)", fontFamily: "var(--font-display)", letterSpacing: "0.08em", paddingRight: 60 }}>
              <span style={{ color: "var(--brand)", marginRight: 8 }}>▸</span>{t}
            </span>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div style={{ position: "relative", zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh", padding: "60px 24px 40px" }}>

        {/* Logo */}
        <div className="animate-float-cyber" style={{ marginBottom: 32 }}>
          <div style={{ position: "relative", display: "inline-block" }}>
            <div style={{
              width: 96, height: 96, borderRadius: 24,
              background: "linear-gradient(135deg, var(--brand), #0080ff, var(--accent))",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 0 60px var(--brand-glow), 0 0 120px rgba(191,0,255,0.3)",
            }}>
              <span style={{ fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 900, color: "#060612" }}>GN</span>
            </div>
            <div style={{ position: "absolute", top: -2, left: -2, width: 14, height: 14, borderTop: "2px solid var(--brand)", borderLeft: "2px solid var(--brand)", borderRadius: "3px 0 0 0" }} />
            <div style={{ position: "absolute", top: -2, right: -2, width: 14, height: 14, borderTop: "2px solid var(--accent)", borderRight: "2px solid var(--accent)", borderRadius: "0 3px 0 0" }} />
            <div style={{ position: "absolute", bottom: -2, left: -2, width: 14, height: 14, borderBottom: "2px solid var(--accent)", borderLeft: "2px solid var(--accent)", borderRadius: "0 0 0 3px" }} />
            <div style={{ position: "absolute", bottom: -2, right: -2, width: 14, height: 14, borderBottom: "2px solid var(--brand)", borderRight: "2px solid var(--brand)", borderRadius: "0 0 3px 0" }} />
          </div>
        </div>

        {/* Title */}
        <div className="animate-fade-in-up" style={{ textAlign: "center", marginBottom: 12 }}>
          <p style={{ fontFamily: "var(--font-display)", fontSize: 10, letterSpacing: "0.4em", color: "var(--text-muted)", textTransform: "uppercase", marginBottom: 10 }}>Ghostnett Identity Platform</p>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(56px, 10vw, 88px)", fontWeight: 900, lineHeight: 1, letterSpacing: "0.05em" }}>
            <span style={{ color: "var(--text-primary)" }}>G</span>
            <span className="neon-text">M</span>
            <span style={{ color: "var(--text-primary)" }}>I</span>
            <span className="neon-text-purple">D</span>
          </h1>
          <p style={{ fontFamily: "var(--font-display)", fontSize: 13, color: "var(--text-muted)", letterSpacing: "0.3em", textTransform: "uppercase", marginTop: 8 }}>Ghostnett Member ID System</p>
        </div>

        {/* Tagline */}
        <p className="animate-fade-in-up delay-100" style={{ color: "var(--text-muted)", fontSize: 14, maxWidth: 480, textAlign: "center", lineHeight: 1.7, marginBottom: 28 }}>
          A gamified identity platform for the Ghostnett community. Track XP, earn achievements, compete on leaderboards, and manage your digital identity.
        </p>

        {/* Status badges */}
        <div className="animate-fade-in-up delay-200" style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center", marginBottom: 48 }}>
          <NeonBadge variant="green" pulse>System Online</NeonBadge>
          <NeonBadge variant="cyan">1,247 Members</NeonBadge>
          <NeonBadge variant="purple">v2.0 GMID</NeonBadge>
          <NeonBadge variant="orange">4 Events Live</NeonBadge>
        </div>

        {/* Live stats strip */}
        <div className="animate-fade-in-up delay-200" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 1, marginBottom: 48, width: "100%", maxWidth: 640, background: "var(--border-neon)", borderRadius: 12, overflow: "hidden", border: "1px solid var(--border-neon)" }}>
          {STATS.map(({ label, value, color }) => (
            <div key={label} style={{ background: "var(--surface-2)", padding: "14px 16px", textAlign: "center" }}>
              <p style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 900, color, textShadow: `0 0 16px ${color}88` }}>{value}</p>
              <p style={{ fontSize: 9, color: "var(--text-muted)", fontFamily: "var(--font-display)", letterSpacing: "0.12em", textTransform: "uppercase", marginTop: 3 }}>{label}</p>
            </div>
          ))}
        </div>

        {/* Console selector */}
        <div className="animate-fade-in-up delay-300" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, width: "100%", maxWidth: 640 }}>
          {/* User Console */}
          <Link href="/user" style={{ textDecoration: "none" }}>
            <GlassCard variant="cyan" corners neonTop className="animate-neon-pulse" style={{ padding: 28, cursor: "pointer", transition: "transform 0.3s ease", height: "100%" }}>
              <div style={{ marginBottom: 16 }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: "var(--brand-dim)", border: "1px solid var(--border-neon)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, marginBottom: 14 }}>⬡</div>
                <p style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 900, color: "var(--brand)", letterSpacing: "0.08em", marginBottom: 6 }}>USER CONSOLE</p>
                <p style={{ fontSize: 12, color: "var(--text-muted)", lineHeight: 1.6 }}>Dashboard, GMID card, rewards, leaderboard, quiz, events & profile.</p>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                {["GMID Card & XP", "Achievements", "Leaderboard", "Quiz Hub", "Events"].map(f => (
                  <div key={f} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: "var(--text-muted)" }}>
                    <span style={{ color: "var(--brand)", fontSize: 8 }}>▸</span>{f}
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 20, display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ fontFamily: "var(--font-display)", fontSize: 10, color: "var(--brand)", letterSpacing: "0.12em" }}>ENTER CONSOLE</span>
                <span style={{ color: "var(--brand)", fontSize: 12 }}>→</span>
              </div>
            </GlassCard>
          </Link>

          {/* Admin Console */}
          <Link href="/admin" style={{ textDecoration: "none" }}>
            <GlassCard variant="purple" corners neonTop className="animate-neon-pulse-purple" style={{ padding: 28, cursor: "pointer", transition: "transform 0.3s ease", height: "100%" }}>
              <div style={{ marginBottom: 16 }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: "var(--accent-dim)", border: "1px solid var(--border-purple)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, marginBottom: 14 }}>◈</div>
                <p style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 900, color: "var(--accent)", letterSpacing: "0.08em", marginBottom: 6 }}>ADMIN CONSOLE</p>
                <p style={{ fontSize: 12, color: "var(--text-muted)", lineHeight: 1.6 }}>Control center for user management, events, quizzes, and analytics.</p>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                {["User Management", "Event Builder", "Quiz Builder", "Leaderboard Controls", "Analytics"].map(f => (
                  <div key={f} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: "var(--text-muted)" }}>
                    <span style={{ color: "var(--accent)", fontSize: 8 }}>▸</span>{f}
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 20, display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ fontFamily: "var(--font-display)", fontSize: 10, color: "var(--accent)", letterSpacing: "0.12em" }}>ENTER CONSOLE</span>
                <span style={{ color: "var(--accent)", fontSize: 12 }}>→</span>
              </div>
            </GlassCard>
          </Link>
        </div>

        {/* Footer */}
        <p style={{ marginTop: 48, fontSize: 10, color: "var(--text-dim)", fontFamily: "var(--font-display)", letterSpacing: "0.2em", textAlign: "center" }}>GHOSTNETT IDENTITY PLATFORM — GMID v2.0 — ALL SYSTEMS NOMINAL</p>
      </div>
    </div>
  );
}
