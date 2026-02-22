"use client";
import { useState } from "react";
import { GlassCard } from "@/components/gmid/GlassCard";
import { NeonBadge } from "@/components/gmid/NeonBadge";
import { StatWidget } from "@/components/gmid/StatWidget";

const USERS = [
  { id: "GN-2024-7741", name: "Ghost_Cipher",  rank: "OPERATIVE", level: 42, pts: 18750, joined: "Nov 20, 2023", status: "active",    lastSeen: "2m ago",  quizzes: 142, events: 9 },
  { id: "GN-2024-0012", name: "NullVector",    rank: "LEGEND",    level: 58, pts: 24100, joined: "Sep 5, 2023",  status: "active",    lastSeen: "5m ago",  quizzes: 310, events: 22 },
  { id: "GN-2024-0089", name: "Vex_0",         rank: "PHANTOM",   level: 54, pts: 21800, joined: "Oct 1, 2023",  status: "active",    lastSeen: "18m ago", quizzes: 278, events: 18 },
  { id: "GN-2024-1102", name: "Kr4ken",        rank: "OPERATIVE", level: 40, pts: 17200, joined: "Dec 3, 2023",  status: "active",    lastSeen: "1h ago",  quizzes: 198, events: 11 },
  { id: "GN-2024-1340", name: "Nyx_Protocol",  rank: "OPERATIVE", level: 38, pts: 15900, joined: "Dec 14, 2023",status: "active",    lastSeen: "2h ago",  quizzes: 167, events: 8 },
  { id: "GN-2024-2201", name: "DataWraith",    rank: "AGENT",     level: 35, pts: 14300, joined: "Jan 2, 2024",  status: "active",    lastSeen: "4h ago",  quizzes: 134, events: 6 },
  { id: "GN-2024-3310", name: "Specter_7",     rank: "AGENT",     level: 31, pts: 12800, joined: "Jan 9, 2024",  status: "pending",   lastSeen: "1d ago",  quizzes: 89,  events: 3 },
  { id: "GN-2024-4421", name: "VoidRunner",    rank: "RECRUIT",   level: 12, pts: 2100,  joined: "Feb 1, 2024",  status: "suspended", lastSeen: "3d ago",  quizzes: 14,  events: 1 },
  { id: "GN-2024-5530", name: "Cipher_X",      rank: "AGENT",     level: 24, pts: 9800,  joined: "Jan 20, 2024", status: "active",    lastSeen: "6h ago",  quizzes: 102, events: 5 },
  { id: "GN-2024-6641", name: "PhantomByte",   rank: "AGENT",     level: 20, pts: 8400,  joined: "Feb 5, 2024",  status: "active",    lastSeen: "12h ago", quizzes: 77,  events: 4 },
];

const RANK_COLOR: Record<string, string> = {
  LEGEND: "#ffd700", PHANTOM: "var(--neon-orange)", OPERATIVE: "var(--accent)",
  AGENT: "var(--brand)", RECRUIT: "var(--text-muted)",
};

export default function AdminUsersPage() {
  const [search, setSearch] = useState("");
  const [rankFilter, setRankFilter] = useState("ALL");
  const [selected, setSelected] = useState<string | null>(null);
  const [statuses, setStatuses] = useState<Record<string, string>>(
    Object.fromEntries(USERS.map(u => [u.id, u.status]))
  );

  const filtered = USERS.filter(u => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.id.includes(search);
    const matchRank = rankFilter === "ALL" || u.rank === rankFilter;
    return matchSearch && matchRank;
  });

  const detail = USERS.find(u => u.id === selected);

  function toggleStatus(id: string) {
    setStatuses(prev => ({ ...prev, [id]: prev[id] === "active" ? "suspended" : "active" }));
  }

  return (
    <main style={{ padding: "32px 28px", position: "relative", zIndex: 2, fontFamily: "var(--font-sans)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28, flexWrap: "wrap", gap: 12 }}>
        <div>
          <p style={{ fontSize: 10, color: "var(--text-muted)", fontFamily: "var(--font-display)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 4 }}>Admin</p>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: 26, fontWeight: 900, color: "var(--text-primary)" }}>
            User <span className="neon-text-purple">Management</span>
          </h1>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <NeonBadge variant="cyan">1,247 Total</NeonBadge>
          <NeonBadge variant="orange">3 Flagged</NeonBadge>
        </div>
      </div>

      {/* KPIs */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 24 }}>
        <StatWidget label="Total Members" value="1,247" sub="+14 today"    icon="◉" color="cyan"   trend={8} />
        <StatWidget label="Active Now"    value="342"   sub="27% online"   icon="◎" color="green"  />
        <StatWidget label="Suspended"     value="8"     sub="needs review" icon="⚠" color="orange" />
        <StatWidget label="Pending"       value="23"    sub="awaiting verify" icon="◈" color="purple" />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: selected ? "1fr 340px" : "1fr", gap: 20 }}>
        {/* Table */}
        <GlassCard style={{ padding: 0, overflow: "hidden" }}>
          {/* Toolbar */}
          <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--border-subtle)", display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
            <input
              value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search by name or ID..."
              style={{
                flex: 1, minWidth: 200, padding: "8px 14px", borderRadius: 8,
                background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)",
                color: "var(--text-primary)", fontFamily: "var(--font-sans)", fontSize: 13, outline: "none",
              }}
            />
            <div style={{ display: "flex", gap: 6 }}>
              {["ALL", "LEGEND", "PHANTOM", "OPERATIVE", "AGENT", "RECRUIT"].map(r => (
                <button key={r} onClick={() => setRankFilter(r)} style={{
                  padding: "6px 10px", borderRadius: 6,
                  border: `1px solid ${rankFilter === r ? "var(--border-purple)" : "rgba(255,255,255,0.08)"}`,
                  background: rankFilter === r ? "var(--accent-dim)" : "transparent",
                  color: rankFilter === r ? "var(--accent)" : "var(--text-muted)",
                  fontFamily: "var(--font-display)", fontSize: 9, letterSpacing: "0.1em", cursor: "pointer",
                }}>{r}</button>
              ))}
            </div>
          </div>

          <table className="cyber-table">
            <thead>
              <tr><th>Member</th><th>ID</th><th>Rank</th><th>Level</th><th>Points</th><th>Status</th><th>Last Seen</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {filtered.map(u => {
                const st = statuses[u.id];
                return (
                  <tr key={u.id} style={{ background: selected === u.id ? "var(--accent-dim)" : undefined, cursor: "pointer" }}
                    onClick={() => setSelected(selected === u.id ? null : u.id)}>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{ width: 32, height: 32, borderRadius: 8, background: `${RANK_COLOR[u.rank]}18`, border: `1px solid ${RANK_COLOR[u.rank]}44`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>👤</div>
                        <span style={{ fontSize: 13, color: "var(--text-primary)", fontWeight: 500 }}>{u.name}</span>
                      </div>
                    </td>
                    <td><span style={{ fontSize: 10, color: "var(--text-dim)", fontFamily: "var(--font-display)", letterSpacing: "0.08em" }}>{u.id}</span></td>
                    <td><span style={{ fontSize: 11, fontFamily: "var(--font-display)", color: RANK_COLOR[u.rank], letterSpacing: "0.08em" }}>{u.rank}</span></td>
                    <td><span style={{ fontFamily: "var(--font-display)", fontSize: 12, color: "var(--text-muted)" }}>{u.level}</span></td>
                    <td><span style={{ fontFamily: "var(--font-display)", fontSize: 12, fontWeight: 700, color: "var(--text-primary)" }}>{u.pts.toLocaleString()}</span></td>
                    <td>
                      <NeonBadge variant={st === "active" ? "green" : st === "pending" ? "orange" : "pink"}>
                        {st.toUpperCase()}
                      </NeonBadge>
                    </td>
                    <td><span style={{ fontSize: 11, color: "var(--text-muted)" }}>{u.lastSeen}</span></td>
                    <td onClick={e => e.stopPropagation()}>
                      <div style={{ display: "flex", gap: 5 }}>
                        <button className="action-btn action-btn-cyan" onClick={() => setSelected(u.id)}>View</button>
                        <button className="action-btn action-btn-orange" onClick={() => toggleStatus(u.id)}>
                          {st === "active" ? "Suspend" : "Restore"}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </GlassCard>

        {/* Detail panel */}
        {detail && (
          <GlassCard variant="purple" neonTop style={{ padding: 24, height: "fit-content" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
              <p style={{ fontFamily: "var(--font-display)", fontSize: 11, letterSpacing: "0.15em", color: "var(--text-muted)", textTransform: "uppercase" }}>User Detail</p>
              <button onClick={() => setSelected(null)} style={{ background: "none", border: "none", color: "var(--text-dim)", cursor: "pointer", fontSize: 16 }}>✕</button>
            </div>
            <div style={{ textAlign: "center", marginBottom: 20 }}>
              <div style={{ width: 64, height: 64, borderRadius: 16, background: `${RANK_COLOR[detail.rank]}18`, border: `2px solid ${RANK_COLOR[detail.rank]}55`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, margin: "0 auto 10px" }}>👤</div>
              <p style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 900, color: "var(--text-primary)" }}>{detail.name}</p>
              <p style={{ fontSize: 10, color: "var(--text-dim)", fontFamily: "var(--font-display)", marginTop: 3 }}>{detail.id}</p>
              <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 8 }}>
                <NeonBadge variant="purple">{detail.rank}</NeonBadge>
                <NeonBadge variant={statuses[detail.id] === "active" ? "green" : "pink"}>{statuses[detail.id].toUpperCase()}</NeonBadge>
              </div>
            </div>
            <div className="neon-divider" style={{ marginBottom: 16 }} />
            {[
              ["Level", detail.level], ["Points", detail.pts.toLocaleString()],
              ["Joined", detail.joined], ["Last Seen", detail.lastSeen],
              ["Quizzes", detail.quizzes], ["Events", detail.events],
            ].map(([k, v]) => (
              <div key={String(k)} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                <span style={{ fontSize: 11, color: "var(--text-muted)", fontFamily: "var(--font-display)", letterSpacing: "0.08em" }}>{k}</span>
                <span style={{ fontSize: 12, color: "var(--text-primary)", fontFamily: "var(--font-display)" }}>{v}</span>
              </div>
            ))}
            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 20 }}>
              <button onClick={() => toggleStatus(detail.id)} style={{ padding: "10px", borderRadius: 9, border: `1px solid ${statuses[detail.id] === "active" ? "rgba(255,0,80,0.4)" : "rgba(57,255,20,0.4)"}`, background: statuses[detail.id] === "active" ? "rgba(255,0,80,0.1)" : "rgba(57,255,20,0.08)", color: statuses[detail.id] === "active" ? "#ff0050" : "var(--neon-green)", fontFamily: "var(--font-display)", fontSize: 11, letterSpacing: "0.1em", cursor: "pointer" }}>
                {statuses[detail.id] === "active" ? "SUSPEND USER" : "RESTORE USER"}
              </button>
              <button style={{ padding: "10px", borderRadius: 9, border: "1px solid var(--border-purple)", background: "var(--accent-dim)", color: "var(--accent)", fontFamily: "var(--font-display)", fontSize: 11, letterSpacing: "0.1em", cursor: "pointer" }}>EDIT RANK / POINTS</button>
              <button style={{ padding: "10px", borderRadius: 9, border: "1px solid rgba(255,255,255,0.08)", background: "transparent", color: "var(--text-muted)", fontFamily: "var(--font-display)", fontSize: 11, letterSpacing: "0.1em", cursor: "pointer" }}>VIEW FULL HISTORY</button>
            </div>
          </GlassCard>
        )}
      </div>
    </main>
  );
}
