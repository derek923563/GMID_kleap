"use client";
import { useState } from "react";
import { GlassCard } from "@/components/gmid/GlassCard";
import { NeonBadge } from "@/components/gmid/NeonBadge";
import { XPBar } from "@/components/gmid/XPBar";

const BADGES = [
  { id: 1, name: "Dark Web Navigator",  icon: "🌐", desc: "Completed 10 OSINT quizzes",       xp: 500,  earned: true,  rarity: "RARE",      color: "var(--brand)" },
  { id: 2, name: "Cipher Master",       icon: "🔐", desc: "Solved 5 cryptography challenges",  xp: 750,  earned: true,  rarity: "EPIC",      color: "var(--accent)" },
  { id: 3, name: "Ghost Protocol",      icon: "👻", desc: "Joined 3 covert operations",        xp: 300,  earned: true,  rarity: "UNCOMMON",  color: "var(--neon-green)" },
  { id: 4, name: "Zero Day Hunter",     icon: "⚡", desc: "Found a vulnerability in CTF",      xp: 1000, earned: true,  rarity: "LEGENDARY", color: "#ffd700" },
  { id: 5, name: "Network Phantom",     icon: "📡", desc: "Complete 20 network quizzes",       xp: 600,  earned: false, rarity: "RARE",      color: "var(--brand)",   progress: 14, total: 20 },
  { id: 6, name: "Social Engineer",     icon: "🎭", desc: "Win 5 social engineering events",   xp: 800,  earned: false, rarity: "EPIC",      color: "var(--accent)",  progress: 2,  total: 5 },
  { id: 7, name: "Leaderboard Legend",  icon: "🏆", desc: "Reach top 10 global ranking",       xp: 1500, earned: false, rarity: "LEGENDARY", color: "#ffd700",        progress: 18, total: 10 },
  { id: 8, name: "Streak Keeper",       icon: "🔥", desc: "Maintain 30-day login streak",      xp: 400,  earned: false, rarity: "UNCOMMON",  color: "var(--neon-green)", progress: 7, total: 30 },
  { id: 9, name: "Phantom Operative",   icon: "🕵️", desc: "Reach PHANTOM rank",               xp: 2000, earned: false, rarity: "LEGENDARY", color: "var(--neon-orange)", progress: 0, total: 1 },
];

const STORE = [
  { id: 1, name: "Neon Cyan Skin",    icon: "🎨", cost: 500,  type: "SKIN",   owned: true },
  { id: 2, name: "Purple Haze Skin",  icon: "🎨", cost: 750,  type: "SKIN",   owned: false },
  { id: 3, name: "Gold Elite Frame",  icon: "🖼️", cost: 1200, type: "FRAME",  owned: false },
  { id: 4, name: "Ghost Avatar",      icon: "👤", cost: 300,  type: "AVATAR", owned: true },
  { id: 5, name: "Phantom Title",     icon: "✦",  cost: 900,  type: "TITLE",  owned: false },
  { id: 6, name: "XP Boost ×2 (24h)",icon: "⚡", cost: 400,  type: "BOOST",  owned: false },
];

const RARITY_COLOR: Record<string, string> = {
  COMMON: "var(--text-muted)", UNCOMMON: "var(--neon-green)",
  RARE: "var(--brand)", EPIC: "var(--accent)", LEGENDARY: "#ffd700",
};

export default function RewardsPage() {
  const [tab, setTab] = useState<"achievements" | "store">("achievements");
  const [filter, setFilter] = useState<"all" | "earned" | "locked">("all");

  const filtered = BADGES.filter(b =>
    filter === "all" ? true : filter === "earned" ? b.earned : !b.earned
  );

  return (
    <main style={{ padding: "32px 28px", position: "relative", zIndex: 2, fontFamily: "var(--font-sans)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28, flexWrap: "wrap", gap: 12 }}>
        <div>
          <p style={{ fontSize: 10, color: "var(--text-muted)", fontFamily: "var(--font-display)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 4 }}>Gamification</p>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: 26, fontWeight: 900, color: "var(--text-primary)" }}>
            Rewards & <span className="neon-text">Achievements</span>
          </h1>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <NeonBadge variant="cyan">4 Earned</NeonBadge>
          <NeonBadge variant="orange">18,750 pts</NeonBadge>
        </div>
      </div>

      {/* Summary row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 24 }}>
        {[
          { label: "Badges Earned",  val: "4",     sub: "of 9 total",    color: "var(--brand)" },
          { label: "Total XP Earned",val: "1,550", sub: "from badges",   color: "var(--accent)" },
          { label: "Rarest Badge",   val: "LEGENDARY", sub: "Zero Day Hunter", color: "#ffd700" },
          { label: "Next Badge",     val: "70%",   sub: "Network Phantom", color: "var(--neon-green)" },
        ].map(({ label, val, sub, color }) => (
          <GlassCard key={label} style={{ padding: 18 }}>
            <p style={{ fontSize: 9, color: "var(--text-muted)", fontFamily: "var(--font-display)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 6 }}>{label}</p>
            <p style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 900, color }}>{val}</p>
            <p style={{ fontSize: 10, color: "var(--text-dim)", marginTop: 3 }}>{sub}</p>
          </GlassCard>
        ))}
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 4, marginBottom: 20, background: "rgba(255,255,255,0.03)", borderRadius: 10, padding: 4, width: "fit-content" }}>
        {(["achievements", "store"] as const).map(t => (
          <button key={t} onClick={() => setTab(t)} style={{
            padding: "8px 20px", borderRadius: 8, border: "none",
            background: tab === t ? "var(--brand-dim)" : "transparent",
            color: tab === t ? "var(--brand)" : "var(--text-muted)",
            fontFamily: "var(--font-display)", fontSize: 11, letterSpacing: "0.1em",
            textTransform: "uppercase", cursor: "pointer", transition: "all 0.2s",
            boxShadow: tab === t ? "0 0 12px var(--brand-glow)" : "none",
          }}>{t}</button>
        ))}
      </div>

      {tab === "achievements" && (
        <>
          {/* Filter */}
          <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
            {(["all", "earned", "locked"] as const).map(f => (
              <button key={f} onClick={() => setFilter(f)} style={{
                padding: "6px 14px", borderRadius: 6, border: `1px solid ${filter === f ? "var(--border-neon)" : "rgba(255,255,255,0.08)"}`,
                background: filter === f ? "var(--brand-dim)" : "transparent",
                color: filter === f ? "var(--brand)" : "var(--text-muted)",
                fontFamily: "var(--font-display)", fontSize: 10, letterSpacing: "0.1em",
                textTransform: "uppercase", cursor: "pointer", transition: "all 0.2s",
              }}>{f}</button>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            {filtered.map(b => (
              <GlassCard key={b.id} style={{
                padding: 20, opacity: b.earned ? 1 : 0.7,
                border: b.earned ? `1px solid ${b.color}33` : "1px solid rgba(255,255,255,0.06)",
                boxShadow: b.earned ? `0 0 20px ${b.color}18` : "none",
                transition: "all 0.3s",
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                  <div style={{
                    width: 52, height: 52, borderRadius: 12,
                    background: b.earned ? `${b.color}18` : "rgba(255,255,255,0.04)",
                    border: `1px solid ${b.earned ? b.color + "44" : "rgba(255,255,255,0.08)"}`,
                    display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24,
                    filter: b.earned ? "none" : "grayscale(1)",
                  }}>{b.icon}</div>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
                    <span style={{ fontSize: 9, fontFamily: "var(--font-display)", letterSpacing: "0.1em", color: RARITY_COLOR[b.rarity], background: `${RARITY_COLOR[b.rarity]}18`, border: `1px solid ${RARITY_COLOR[b.rarity]}33`, borderRadius: 4, padding: "2px 6px" }}>{b.rarity}</span>
                    {b.earned && <span style={{ fontSize: 9, color: "var(--neon-green)", fontFamily: "var(--font-display)" }}>✓ EARNED</span>}
                  </div>
                </div>
                <p style={{ fontFamily: "var(--font-display)", fontSize: 13, fontWeight: 700, color: b.earned ? "var(--text-primary)" : "var(--text-muted)", marginBottom: 4, letterSpacing: "0.04em" }}>{b.name}</p>
                <p style={{ fontSize: 11, color: "var(--text-dim)", marginBottom: 12, lineHeight: 1.4 }}>{b.desc}</p>
                {!b.earned && b.progress !== undefined && (
                  <div style={{ marginBottom: 8 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 9, color: "var(--text-dim)", fontFamily: "var(--font-display)", marginBottom: 4 }}>
                      <span>Progress</span><span>{b.progress}/{b.total}</span>
                    </div>
                    <XPBar current={b.progress!} max={b.total!} color={b.color} height={4} label={false} />
                  </div>
                )}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 11, color: "var(--neon-green)", fontFamily: "var(--font-display)", fontWeight: 700 }}>+{b.xp} XP</span>
                  {!b.earned && <span style={{ fontSize: 9, color: "var(--text-dim)", fontFamily: "var(--font-display)", letterSpacing: "0.08em" }}>LOCKED</span>}
                </div>
              </GlassCard>
            ))}
          </div>
        </>
      )}

      {tab === "store" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {STORE.map(item => (
            <GlassCard key={item.id} style={{ padding: 20, border: item.owned ? "1px solid var(--border-neon)" : "1px solid rgba(255,255,255,0.06)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                <div style={{ width: 52, height: 52, borderRadius: 12, background: "rgba(0,245,255,0.08)", border: "1px solid var(--border-neon)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>{item.icon}</div>
                <NeonBadge variant={item.owned ? "green" : "cyan"}>{item.type}</NeonBadge>
              </div>
              <p style={{ fontFamily: "var(--font-display)", fontSize: 13, fontWeight: 700, color: "var(--text-primary)", marginBottom: 4 }}>{item.name}</p>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 14 }}>
                <span style={{ fontFamily: "var(--font-display)", fontSize: 14, fontWeight: 900, color: "var(--brand)" }}>{item.cost} pts</span>
                <button style={{
                  padding: "7px 14px", borderRadius: 7,
                  border: `1px solid ${item.owned ? "var(--neon-green)" : "var(--brand)"}`,
                  background: item.owned ? "var(--neon-green-dim)" : "var(--brand-dim)",
                  color: item.owned ? "var(--neon-green)" : "var(--brand)",
                  fontFamily: "var(--font-display)", fontSize: 10, letterSpacing: "0.1em", cursor: "pointer",
                }}>{item.owned ? "EQUIPPED" : "PURCHASE"}</button>
              </div>
            </GlassCard>
          ))}
        </div>
      )}
    </main>
  );
}
