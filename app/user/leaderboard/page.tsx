"use client";
import { useState } from "react";
import { GlassCard } from "@/components/gmid/GlassCard";
import { NeonBadge } from "@/components/gmid/NeonBadge";

const TABS = ["Overall", "Weekly", "Quiz", "Events"] as const;
type Tab = typeof TABS[number];

const PLAYERS = [
  { rank: 1,  name: "NullVector",    pts: 24100, level: 58, rank_label: "LEGEND",    streak: 21, badges: 12, color: "#ffd700" },
  { rank: 2,  name: "Vex_0",         pts: 21800, level: 54, rank_label: "PHANTOM",   streak: 14, badges: 9,  color: "var(--neon-orange)" },
  { rank: 3,  name: "Ghost_Cipher",  pts: 18750, level: 42, rank_label: "OPERATIVE", streak: 7,  badges: 7,  color: "var(--accent)", me: true },
  { rank: 4,  name: "Kr4ken",        pts: 17200, level: 40, rank_label: "OPERATIVE", streak: 5,  badges: 6,  color: "var(--accent)" },
  { rank: 5,  name: "Nyx_Protocol",  pts: 15900, level: 38, rank_label: "OPERATIVE", streak: 12, badges: 5,  color: "var(--accent)" },
  { rank: 6,  name: "DataWraith",    pts: 14300, level: 35, rank_label: "AGENT",     streak: 3,  badges: 4,  color: "var(--brand)" },
  { rank: 7,  name: "Specter_7",     pts: 12800, level: 31, rank_label: "AGENT",     streak: 8,  badges: 3,  color: "var(--brand)" },
  { rank: 8,  name: "VoidRunner",    pts: 11200, level: 28, rank_label: "AGENT",     streak: 2,  badges: 3,  color: "var(--brand)" },
  { rank: 9,  name: "Cipher_X",      pts: 9800,  level: 24, rank_label: "AGENT",     streak: 6,  badges: 2,  color: "var(--brand)" },
  { rank: 10, name: "PhantomByte",   pts: 8400,  level: 20, rank_label: "AGENT",     streak: 1,  badges: 2,  color: "var(--brand)" },
];

const RANK_MEDAL: Record<number, string> = { 1: "🥇", 2: "🥈", 3: "🥉" };

export default function LeaderboardPage() {
  const [tab, setTab] = useState<Tab>("Overall");

  return (
    <main style={{ padding: "32px 28px", position: "relative", zIndex: 2, fontFamily: "var(--font-sans)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28, flexWrap: "wrap", gap: 12 }}>
        <div>
          <p style={{ fontSize: 10, color: "var(--text-muted)", fontFamily: "var(--font-display)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 4 }}>Rankings</p>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: 26, fontWeight: 900, color: "var(--text-primary)" }}>
            Global <span className="neon-text">Leaderboard</span>
          </h1>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <NeonBadge variant="cyan">Your Rank: #3</NeonBadge>
          <NeonBadge variant="green" pulse>Live</NeonBadge>
        </div>
      </div>

      {/* Podium */}
      <GlassCard neonTop style={{ padding: 28, marginBottom: 24 }}>
        <p style={{ fontFamily: "var(--font-display)", fontSize: 11, letterSpacing: "0.15em", color: "var(--text-muted)", textTransform: "uppercase", marginBottom: 24, textAlign: "center" }}>Top 3 Operatives</p>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "center", gap: 16 }}>
          {/* 2nd */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            <div style={{ width: 52, height: 52, borderRadius: 14, background: "rgba(192,192,192,0.15)", border: "2px solid #c0c0c0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>👤</div>
            <p style={{ fontFamily: "var(--font-display)", fontSize: 12, color: "#c0c0c0", fontWeight: 700 }}>Vex_0</p>
            <p style={{ fontSize: 11, color: "var(--text-muted)", fontFamily: "var(--font-display)" }}>21,800</p>
            <div style={{ width: 80, height: 60, background: "linear-gradient(180deg, rgba(192,192,192,0.15), rgba(192,192,192,0.05))", border: "1px solid rgba(192,192,192,0.3)", borderRadius: "6px 6px 0 0", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontFamily: "var(--font-display)", fontSize: 20, color: "#c0c0c0" }}>2</span>
            </div>
          </div>
          {/* 1st */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            <div style={{ fontSize: 24 }}>👑</div>
            <div style={{ width: 60, height: 60, borderRadius: 16, background: "rgba(255,215,0,0.2)", border: "2px solid #ffd700", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, boxShadow: "0 0 24px rgba(255,215,0,0.4)" }}>👤</div>
            <p style={{ fontFamily: "var(--font-display)", fontSize: 13, color: "#ffd700", fontWeight: 900 }}>NullVector</p>
            <p style={{ fontSize: 11, color: "var(--text-muted)", fontFamily: "var(--font-display)" }}>24,100</p>
            <div style={{ width: 80, height: 90, background: "linear-gradient(180deg, rgba(255,215,0,0.2), rgba(255,215,0,0.05))", border: "1px solid rgba(255,215,0,0.4)", borderRadius: "6px 6px 0 0", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 20px rgba(255,215,0,0.2)" }}>
              <span style={{ fontFamily: "var(--font-display)", fontSize: 24, color: "#ffd700" }}>1</span>
            </div>
          </div>
          {/* 3rd */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            <div style={{ width: 52, height: 52, borderRadius: 14, background: "rgba(0,245,255,0.15)", border: "2px solid var(--brand)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, boxShadow: "0 0 16px var(--brand-glow)" }}>👤</div>
            <p style={{ fontFamily: "var(--font-display)", fontSize: 12, color: "var(--brand)", fontWeight: 700 }}>Ghost_Cipher <span style={{ fontSize: 9 }}>(you)</span></p>
            <p style={{ fontSize: 11, color: "var(--text-muted)", fontFamily: "var(--font-display)" }}>18,750</p>
            <div style={{ width: 80, height: 45, background: "linear-gradient(180deg, rgba(0,245,255,0.15), rgba(0,245,255,0.05))", border: "1px solid rgba(0,245,255,0.3)", borderRadius: "6px 6px 0 0", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontFamily: "var(--font-display)", fontSize: 18, color: "var(--brand)" }}>3</span>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 4, marginBottom: 20, background: "rgba(255,255,255,0.03)", borderRadius: 10, padding: 4, width: "fit-content" }}>
        {TABS.map(t => (
          <button key={t} onClick={() => setTab(t)} style={{
            padding: "8px 18px", borderRadius: 8, border: "none",
            background: tab === t ? "var(--brand-dim)" : "transparent",
            color: tab === t ? "var(--brand)" : "var(--text-muted)",
            fontFamily: "var(--font-display)", fontSize: 11, letterSpacing: "0.1em",
            cursor: "pointer", transition: "all 0.2s",
          }}>{t}</button>
        ))}
      </div>

      {/* Full table */}
      <GlassCard style={{ padding: 0, overflow: "hidden" }}>
        <table className="cyber-table">
          <thead>
            <tr>
              <th>Rank</th><th>Operative</th><th>Tier</th>
              <th>Points</th><th>Level</th><th>Streak</th><th>Badges</th>
            </tr>
          </thead>
          <tbody>
            {PLAYERS.map(p => (
              <tr key={p.rank} style={{ background: p.me ? "var(--brand-dim)" : undefined }}>
                <td>
                  <span style={{ fontFamily: "var(--font-display)", fontSize: 14, fontWeight: 900, color: p.rank <= 3 ? ["#ffd700","#c0c0c0","#cd7f32"][p.rank-1] : "var(--text-muted)" }}>
                    {RANK_MEDAL[p.rank] || `#${p.rank}`}
                  </span>
                </td>
                <td>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 32, height: 32, borderRadius: 8, background: `${p.color}18`, border: `1px solid ${p.color}44`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>👤</div>
                    <span style={{ fontSize: 13, color: p.me ? "var(--brand)" : "var(--text-primary)", fontWeight: p.me ? 700 : 400 }}>{p.name}{p.me && " (you)"}</span>
                  </div>
                </td>
                <td><span style={{ fontSize: 11, fontFamily: "var(--font-display)", color: p.color, letterSpacing: "0.08em" }}>{p.rank_label}</span></td>
                <td><span style={{ fontFamily: "var(--font-display)", fontSize: 13, fontWeight: 700, color: "var(--text-primary)" }}>{p.pts.toLocaleString()}</span></td>
                <td><span style={{ fontFamily: "var(--font-display)", fontSize: 12, color: "var(--text-muted)" }}>{p.level}</span></td>
                <td><span style={{ fontSize: 12, color: "var(--neon-orange)" }}>🔥 {p.streak}d</span></td>
                <td><span style={{ fontFamily: "var(--font-display)", fontSize: 12, color: "var(--text-muted)" }}>{p.badges}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </GlassCard>
    </main>
  );
}
