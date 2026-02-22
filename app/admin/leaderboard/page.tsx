"use client";
import { useState } from "react";
import { GlassCard } from "@/components/gmid/GlassCard";
import { NeonBadge } from "@/components/gmid/NeonBadge";

const INIT_PLAYERS = [
  { id: "GN-0012", name: "NullVector",   rank: "LEGEND",    pts: 24100, level: 58, featured: true,  suspended: false },
  { id: "GN-0089", name: "Vex_0",        rank: "PHANTOM",   pts: 21800, level: 54, featured: false, suspended: false },
  { id: "GN-7741", name: "Ghost_Cipher", rank: "OPERATIVE", pts: 18750, level: 42, featured: false, suspended: false },
  { id: "GN-1102", name: "Kr4ken",       rank: "OPERATIVE", pts: 17200, level: 40, featured: false, suspended: false },
  { id: "GN-1340", name: "Nyx_Protocol", rank: "OPERATIVE", pts: 15900, level: 38, featured: false, suspended: false },
  { id: "GN-2201", name: "DataWraith",   rank: "AGENT",     pts: 14300, level: 35, featured: false, suspended: false },
  { id: "GN-3310", name: "Specter_7",    rank: "AGENT",     pts: 12800, level: 31, featured: false, suspended: false },
  { id: "GN-4421", name: "VoidRunner",   rank: "RECRUIT",   pts: 2100,  level: 12, featured: false, suspended: true  },
];

const RANK_COLOR: Record<string, string> = {
  LEGEND: "#ffd700", PHANTOM: "var(--neon-orange)", OPERATIVE: "var(--accent)",
  AGENT: "var(--brand)", RECRUIT: "var(--text-muted)",
};

export default function AdminLeaderboardPage() {
  const [players, setPlayers] = useState(INIT_PLAYERS);
  const [selected, setSelected] = useState<string | null>(null);
  const [adjAmt, setAdjAmt] = useState("");
  const [showReset, setShowReset] = useState(false);

  const detail = players.find(p => p.id === selected);

  function toggleFeature(id: string) { setPlayers(ps => ps.map(p => p.id === id ? { ...p, featured: !p.featured } : p)); }
  function toggleSuspend(id: string) { setPlayers(ps => ps.map(p => p.id === id ? { ...p, suspended: !p.suspended } : p)); }
  function adjustPoints(id: string, delta: number) { setPlayers(ps => ps.map(p => p.id === id ? { ...p, pts: Math.max(0, p.pts + delta) } : p)); }
  function applyCustomAdj(id: string, sign: 1 | -1) {
    const n = parseInt(adjAmt);
    if (isNaN(n)) return;
    adjustPoints(id, sign * n); setAdjAmt("");
  }

  const sorted = [...players].sort((a, b) => b.pts - a.pts);

  return (
    <main style={{ padding: "32px 28px", position: "relative", zIndex: 2, fontFamily: "var(--font-sans)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28, flexWrap: "wrap", gap: 12 }}>
        <div>
          <p style={{ fontSize: 10, color: "var(--text-muted)", fontFamily: "var(--font-display)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 4 }}>Admin</p>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: 26, fontWeight: 900, color: "var(--text-primary)" }}>
            Leaderboard <span className="neon-text-purple">Controls</span>
          </h1>
        </div>
        <button onClick={() => setShowReset(true)} style={{ padding: "10px 20px", borderRadius: 9, border: "1px solid rgba(255,0,80,0.4)", background: "rgba(255,0,80,0.1)", color: "#ff0050", fontFamily: "var(--font-display)", fontSize: 11, letterSpacing: "0.1em", cursor: "pointer" }}>⚠ WEEKLY RESET</button>
      </div>

      {/* Reset confirm modal */}
      {showReset && (
        <GlassCard style={{ padding: 28, marginBottom: 24, border: "1px solid rgba(255,0,80,0.3)", background: "rgba(255,0,80,0.06)" }}>
          <p style={{ fontFamily: "var(--font-display)", fontSize: 14, fontWeight: 700, color: "#ff0050", marginBottom: 8 }}>⚠ Confirm Weekly Leaderboard Reset</p>
          <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 20 }}>This will archive the current leaderboard snapshot and reset all weekly scores. All-time points are preserved. This action cannot be undone.</p>
          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={() => setShowReset(false)} style={{ padding: "10px 24px", borderRadius: 9, border: "1px solid rgba(255,0,80,0.5)", background: "rgba(255,0,80,0.15)", color: "#ff0050", fontFamily: "var(--font-display)", fontSize: 11, letterSpacing: "0.1em", cursor: "pointer" }}>CONFIRM RESET</button>
            <button onClick={() => setShowReset(false)} style={{ padding: "10px 24px", borderRadius: 9, border: "1px solid rgba(255,255,255,0.1)", background: "transparent", color: "var(--text-muted)", fontFamily: "var(--font-display)", fontSize: 11, letterSpacing: "0.1em", cursor: "pointer" }}>CANCEL</button>
          </div>
        </GlassCard>
      )}

      <div style={{ display: "grid", gridTemplateColumns: selected ? "1fr 320px" : "1fr", gap: 20 }}>
        {/* Leaderboard table */}
        <GlassCard style={{ padding: 0, overflow: "hidden" }}>
          <div style={{ padding: "14px 20px", borderBottom: "1px solid var(--border-subtle)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <p style={{ fontFamily: "var(--font-display)", fontSize: 11, letterSpacing: "0.15em", color: "var(--text-muted)", textTransform: "uppercase" }}>Global Rankings</p>
            <NeonBadge variant="green" pulse>Live</NeonBadge>
          </div>
          <table className="cyber-table">
            <thead><tr><th>#</th><th>Operative</th><th>Rank</th><th>Points</th><th>Level</th><th>Featured</th><th>Status</th><th>Controls</th></tr></thead>
            <tbody>
              {sorted.map((p, i) => (
                <tr key={p.id} style={{ background: selected === p.id ? "var(--accent-dim)" : p.suspended ? "rgba(255,0,80,0.04)" : undefined, opacity: p.suspended ? 0.7 : 1, cursor: "pointer" }}
                  onClick={() => setSelected(selected === p.id ? null : p.id)}>
                  <td>
                    <span style={{ fontFamily: "var(--font-display)", fontSize: 13, fontWeight: 900, color: i === 0 ? "#ffd700" : i === 1 ? "#c0c0c0" : i === 2 ? "#cd7f32" : "var(--text-muted)" }}>#{i+1}</span>
                  </td>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ width: 32, height: 32, borderRadius: 8, background: `${RANK_COLOR[p.rank]}18`, border: `1px solid ${RANK_COLOR[p.rank]}44`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>👤</div>
                      <div>
                        <span style={{ fontSize: 13, color: "var(--text-primary)" }}>{p.name}</span>
                        {p.featured && <span style={{ marginLeft: 6, fontSize: 10 }}>⭐</span>}
                      </div>
                    </div>
                  </td>
                  <td><span style={{ fontSize: 11, fontFamily: "var(--font-display)", color: RANK_COLOR[p.rank], letterSpacing: "0.08em" }}>{p.rank}</span></td>
                  <td><span style={{ fontFamily: "var(--font-display)", fontSize: 13, fontWeight: 700, color: "var(--text-primary)" }}>{p.pts.toLocaleString()}</span></td>
                  <td><span style={{ fontFamily: "var(--font-display)", fontSize: 12, color: "var(--text-muted)" }}>{p.level}</span></td>
                  <td>
                    <button onClick={e => { e.stopPropagation(); toggleFeature(p.id); }} style={{ padding: "4px 10px", borderRadius: 5, border: `1px solid ${p.featured ? "rgba(255,215,0,0.4)" : "rgba(255,255,255,0.08)"}`, background: p.featured ? "rgba(255,215,0,0.1)" : "transparent", color: p.featured ? "#ffd700" : "var(--text-dim)", fontFamily: "var(--font-display)", fontSize: 9, cursor: "pointer" }}>{p.featured ? "★ ON" : "☆ OFF"}</button>
                  </td>
                  <td>
                    <NeonBadge variant={p.suspended ? "pink" : "green"}>{p.suspended ? "SUSPENDED" : "ACTIVE"}</NeonBadge>
                  </td>
                  <td onClick={e => e.stopPropagation()}>
                    <div style={{ display: "flex", gap: 5 }}>
                      <button className="action-btn action-btn-cyan" onClick={() => setSelected(p.id)}>Adjust</button>
                      <button className="action-btn action-btn-orange" onClick={() => toggleSuspend(p.id)}>{p.suspended ? "Restore" : "Suspend"}</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </GlassCard>

        {/* Adjustment panel */}
        {detail && (
          <GlassCard variant="purple" neonTop style={{ padding: 24, height: "fit-content" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
              <p style={{ fontFamily: "var(--font-display)", fontSize: 11, letterSpacing: "0.15em", color: "var(--text-muted)", textTransform: "uppercase" }}>Point Adjustment</p>
              <button onClick={() => setSelected(null)} style={{ background: "none", border: "none", color: "var(--text-dim)", cursor: "pointer", fontSize: 16 }}>✕</button>
            </div>
            <div style={{ textAlign: "center", marginBottom: 20 }}>
              <div style={{ width: 56, height: 56, borderRadius: 14, background: `${RANK_COLOR[detail.rank]}18`, border: `2px solid ${RANK_COLOR[detail.rank]}55`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, margin: "0 auto 10px" }}>👤</div>
              <p style={{ fontFamily: "var(--font-display)", fontSize: 15, fontWeight: 900, color: "var(--text-primary)" }}>{detail.name}</p>
              <p style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 900, color: "var(--accent)", marginTop: 6 }}>{detail.pts.toLocaleString()}</p>
              <p style={{ fontSize: 10, color: "var(--text-muted)", fontFamily: "var(--font-display)", letterSpacing: "0.1em" }}>CURRENT POINTS</p>
            </div>
            <div className="neon-divider" style={{ marginBottom: 16 }} />
            <p style={{ fontSize: 10, color: "var(--text-muted)", fontFamily: "var(--font-display)", letterSpacing: "0.1em", marginBottom: 10 }}>QUICK ADJUST</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 16 }}>
              {[100, 250, 500, 1000].map(n => (
                <div key={n} style={{ display: "flex", gap: 4 }}>
                  <button onClick={() => adjustPoints(detail.id, n)} style={{ flex: 1, padding: "8px 4px", borderRadius: 7, border: "1px solid rgba(57,255,20,0.3)", background: "rgba(57,255,20,0.08)", color: "var(--neon-green)", fontFamily: "var(--font-display)", fontSize: 10, cursor: "pointer" }}>+{n}</button>
                  <button onClick={() => adjustPoints(detail.id, -n)} style={{ flex: 1, padding: "8px 4px", borderRadius: 7, border: "1px solid rgba(255,0,80,0.3)", background: "rgba(255,0,80,0.08)", color: "#ff0050", fontFamily: "var(--font-display)", fontSize: 10, cursor: "pointer" }}>-{n}</button>
                </div>
              ))}
            </div>
            <p style={{ fontSize: 10, color: "var(--text-muted)", fontFamily: "var(--font-display)", letterSpacing: "0.1em", marginBottom: 8 }}>CUSTOM AMOUNT</p>
            <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
              <input type="number" value={adjAmt} onChange={e => setAdjAmt(e.target.value)} placeholder="Enter points..."
                style={{ flex: 1, padding: "8px 12px", borderRadius: 8, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "var(--text-primary)", fontFamily: "var(--font-sans)", fontSize: 13, outline: "none" }} />
              <button onClick={() => applyCustomAdj(detail.id, 1)} style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid rgba(57,255,20,0.3)", background: "rgba(57,255,20,0.08)", color: "var(--neon-green)", fontFamily: "var(--font-display)", fontSize: 11, cursor: "pointer" }}>+</button>
              <button onClick={() => applyCustomAdj(detail.id, -1)} style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid rgba(255,0,80,0.3)", background: "rgba(255,0,80,0.08)", color: "#ff0050", fontFamily: "var(--font-display)", fontSize: 11, cursor: "pointer" }}>-</button>
            </div>
            <button onClick={() => toggleSuspend(detail.id)} style={{ width: "100%", padding: "10px", borderRadius: 9, border: `1px solid ${detail.suspended ? "rgba(57,255,20,0.4)" : "rgba(255,0,80,0.4)"}`, background: detail.suspended ? "rgba(57,255,20,0.08)" : "rgba(255,0,80,0.1)", color: detail.suspended ? "var(--neon-green)" : "#ff0050", fontFamily: "var(--font-display)", fontSize: 11, letterSpacing: "0.1em", cursor: "pointer" }}>
              {detail.suspended ? "RESTORE FROM LEADERBOARD" : "REMOVE FROM LEADERBOARD"}
            </button>
          </GlassCard>
        )}
      </div>
    </main>
  );
}
