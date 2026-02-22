"use client";
import { useState } from "react";
import { GMIDCard } from "@/components/gmid/GMIDCard";
import { GlassCard } from "@/components/gmid/GlassCard";
import { NeonBadge } from "@/components/gmid/NeonBadge";
import { XPBar } from "@/components/gmid/XPBar";

const RANKS = ["RECRUIT", "AGENT", "OPERATIVE", "PHANTOM", "LEGEND"] as const;
type Rank = typeof RANKS[number];

const RANK_META: Record<Rank, { color: string; req: string; perks: string[] }> = {
  RECRUIT:   { color: "#7a8fa6", req: "0 pts",     perks: ["Basic GMID Card", "Access to public quizzes", "Community forums"] },
  AGENT:     { color: "#00f5ff", req: "1,000 pts",  perks: ["Cyan card skin", "Event participation", "XP multiplier ×1.2"] },
  OPERATIVE: { color: "#bf00ff", req: "5,000 pts",  perks: ["Purple card skin", "Priority event slots", "XP multiplier ×1.5", "Custom badge"] },
  PHANTOM:   { color: "#ff6b00", req: "15,000 pts", perks: ["Orange card skin", "Exclusive CTF access", "XP multiplier ×2.0", "Phantom badge", "Leaderboard highlight"] },
  LEGEND:    { color: "#ffd700", req: "30,000 pts", perks: ["Gold card skin", "All access pass", "XP multiplier ×3.0", "Legend badge", "Hall of Fame entry", "Custom ID prefix"] },
};

const HISTORY = [
  { date: "2024-01-15", event: "Rank promoted to OPERATIVE",   icon: "▲", color: "var(--accent)" },
  { date: "2024-01-10", event: "Reached 15,000 total XP",       icon: "⬡", color: "var(--brand)" },
  { date: "2023-12-28", event: "Completed 50 quizzes milestone",icon: "◎", color: "var(--neon-green)" },
  { date: "2023-12-01", event: "Rank promoted to AGENT",        icon: "▲", color: "var(--brand)" },
  { date: "2023-11-20", event: "GMID Card issued: GN-2024-7741",icon: "◈", color: "var(--neon-orange)" },
];

export default function CardPage() {
  const [rank, setRank] = useState<Rank>("OPERATIVE");
  const meta = RANK_META[rank];

  return (
    <main style={{ padding: "32px 28px", position: "relative", zIndex: 2, fontFamily: "var(--font-sans)" }}>
      <div style={{ marginBottom: 28 }}>
        <p style={{ fontSize: 10, color: "var(--text-muted)", fontFamily: "var(--font-display)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 4 }}>Identity</p>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: 26, fontWeight: 900, color: "var(--text-primary)" }}>
          My <span className="neon-text">GMID Card</span>
        </h1>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 24 }}>
        {/* Left: Card + Rank selector */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

          {/* Card display */}
          <GlassCard neonTop style={{ padding: 32, display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
            <GMIDCard rank={rank} flippable={true} />
            <p style={{ fontSize: 10, color: "var(--text-dim)", fontFamily: "var(--font-display)", letterSpacing: "0.15em" }}>TAP CARD TO FLIP • VIEW BACK DETAILS</p>
          </GlassCard>

          {/* Rank selector */}
          <GlassCard style={{ padding: 22 }}>
            <p style={{ fontFamily: "var(--font-display)", fontSize: 11, letterSpacing: "0.15em", color: "var(--text-muted)", textTransform: "uppercase", marginBottom: 14 }}>Rank Tier Preview</p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {RANKS.map(r => (
                <button key={r} onClick={() => setRank(r)} style={{
                  padding: "8px 14px", borderRadius: 8, border: `1px solid ${rank === r ? RANK_META[r].color : "rgba(255,255,255,0.08)"}`,
                  background: rank === r ? `${RANK_META[r].color}18` : "rgba(255,255,255,0.03)",
                  color: rank === r ? RANK_META[r].color : "var(--text-muted)",
                  fontFamily: "var(--font-display)", fontSize: 10, letterSpacing: "0.12em", cursor: "pointer",
                  boxShadow: rank === r ? `0 0 12px ${RANK_META[r].color}44` : "none",
                  transition: "all 0.2s",
                }}>{r}</button>
              ))}
            </div>
          </GlassCard>

          {/* Card history */}
          <GlassCard style={{ padding: 22 }}>
            <p style={{ fontFamily: "var(--font-display)", fontSize: 11, letterSpacing: "0.15em", color: "var(--text-muted)", textTransform: "uppercase", marginBottom: 16 }}>Card History</p>
            <div style={{ position: "relative", paddingLeft: 20 }}>
              <div style={{ position: "absolute", left: 7, top: 0, bottom: 0, width: 1, background: "linear-gradient(180deg, var(--brand), var(--accent), transparent)" }} />
              {HISTORY.map((h, i) => (
                <div key={i} style={{ position: "relative", marginBottom: 16, paddingLeft: 16 }}>
                  <div style={{ position: "absolute", left: -13, top: 4, width: 8, height: 8, borderRadius: "50%", background: h.color, boxShadow: `0 0 8px ${h.color}` }} />
                  <p style={{ fontSize: 12, color: "var(--text-primary)", marginBottom: 2 }}>{h.event}</p>
                  <p style={{ fontSize: 10, color: "var(--text-dim)", fontFamily: "var(--font-display)", letterSpacing: "0.08em" }}>{h.date}</p>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* Right: Rank info + actions */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

          {/* Current rank info */}
          <GlassCard variant="purple" neonTop style={{ padding: 22 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <p style={{ fontFamily: "var(--font-display)", fontSize: 11, letterSpacing: "0.15em", color: "var(--text-muted)", textTransform: "uppercase" }}>Current Rank</p>
              <NeonBadge variant="purple">OPERATIVE</NeonBadge>
            </div>
            <div style={{ textAlign: "center", padding: "16px 0", borderBottom: "1px solid rgba(255,255,255,0.06)", marginBottom: 16 }}>
              <p style={{ fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 900, color: meta.color, textShadow: `0 0 24px ${meta.color}88`, letterSpacing: "0.1em" }}>{rank}</p>
              <p style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 4 }}>Required: {meta.req}</p>
            </div>
            <p style={{ fontFamily: "var(--font-display)", fontSize: 10, letterSpacing: "0.12em", color: "var(--text-muted)", textTransform: "uppercase", marginBottom: 10 }}>Rank Perks</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {meta.perks.map((p, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 5, height: 5, borderRadius: "50%", background: meta.color, boxShadow: `0 0 6px ${meta.color}`, flexShrink: 0 }} />
                  <span style={{ fontSize: 12, color: "var(--text-primary)" }}>{p}</span>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* XP to next rank */}
          <GlassCard style={{ padding: 22 }}>
            <p style={{ fontFamily: "var(--font-display)", fontSize: 11, letterSpacing: "0.15em", color: "var(--text-muted)", textTransform: "uppercase", marginBottom: 14 }}>Progress to PHANTOM</p>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "var(--text-muted)", marginBottom: 8 }}>
              <span style={{ fontFamily: "var(--font-display)" }}>18,750 pts</span>
              <span style={{ fontFamily: "var(--font-display)", color: "var(--neon-orange)" }}>15,000 pts needed</span>
            </div>
            <XPBar current={18750} max={30000} color="var(--neon-orange)" />
            <p style={{ fontSize: 10, color: "var(--text-dim)", marginTop: 8, fontFamily: "var(--font-display)", letterSpacing: "0.08em" }}>11,250 pts remaining</p>
          </GlassCard>

          {/* Card stats */}
          <GlassCard style={{ padding: 22 }}>
            <p style={{ fontFamily: "var(--font-display)", fontSize: 11, letterSpacing: "0.15em", color: "var(--text-muted)", textTransform: "uppercase", marginBottom: 14 }}>Card Stats</p>
            {[
              { label: "Member ID",    val: "GN-2024-7741",  color: "var(--brand)" },
              { label: "Issued",       val: "Nov 20, 2023",  color: "var(--text-primary)" },
              { label: "Verified",     val: "✓ Confirmed",   color: "var(--neon-green)" },
              { label: "Card Version", val: "GMID v2.0",     color: "var(--text-primary)" },
              { label: "Total Points", val: "18,750",        color: "var(--accent)" },
              { label: "Level",        val: "42",            color: "var(--brand)" },
            ].map(({ label, val, color }) => (
              <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                <span style={{ fontSize: 11, color: "var(--text-muted)", fontFamily: "var(--font-display)", letterSpacing: "0.08em" }}>{label}</span>
                <span style={{ fontSize: 12, color, fontFamily: "var(--font-display)", fontWeight: 600 }}>{val}</span>
              </div>
            ))}
          </GlassCard>

          {/* Actions */}
          <GlassCard style={{ padding: 22 }}>
            <p style={{ fontFamily: "var(--font-display)", fontSize: 11, letterSpacing: "0.15em", color: "var(--text-muted)", textTransform: "uppercase", marginBottom: 14 }}>Card Actions</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {[
                { label: "Download Card (PNG)",  icon: "↓", color: "var(--brand)" },
                { label: "Share Card Link",       icon: "◈", color: "var(--accent)" },
                { label: "Request Verification", icon: "✓", color: "var(--neon-green)" },
              ].map(({ label, icon, color }) => (
                <button key={label} style={{
                  display: "flex", alignItems: "center", gap: 10, padding: "10px 14px",
                  borderRadius: 8, border: `1px solid ${color}33`, background: `${color}0d`,
                  color, fontFamily: "var(--font-display)", fontSize: 11, letterSpacing: "0.08em",
                  cursor: "pointer", transition: "all 0.2s", width: "100%",
                }}>
                  <span style={{ fontSize: 14 }}>{icon}</span>{label}
                </button>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </main>
  );
}
