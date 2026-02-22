"use client";
import { AdminSidebar } from "@/components/gmid/AdminSidebar";
import { CyberBackground } from "@/components/gmid/CyberBackground";
import { GlassCard } from "@/components/gmid/GlassCard";
import { StatWidget } from "@/components/gmid/StatWidget";
import { NeonBadge } from "@/components/gmid/NeonBadge";
import Link from "next/link";

const RECENT_USERS = [
  { name: "Kr4ken",       rank: "OPERATIVE", joined: "2m ago",  status: "active" },
  { name: "Nyx_Protocol", rank: "AGENT",     joined: "14m ago", status: "active" },
  { name: "DataWraith",   rank: "AGENT",     joined: "1h ago",  status: "active" },
  { name: "Specter_7",    rank: "RECRUIT",   joined: "2h ago",  status: "pending" },
  { name: "VoidRunner",   rank: "RECRUIT",   joined: "3h ago",  status: "suspended" },
];

const ALERTS = [
  { type: "warn",  msg: "CDN latency spike detected — 340ms avg",         time: "5m ago" },
  { type: "info",  msg: "Operation Blackout: 45/50 slots filled",          time: "12m ago" },
  { type: "warn",  msg: "3 accounts flagged for suspicious activity",      time: "1h ago" },
  { type: "ok",    msg: "Weekly leaderboard snapshot saved successfully",  time: "2h ago" },
  { type: "info",  msg: "Quiz Builder: 2 new quizzes pending review",      time: "3h ago" },
];

const WEEK_DATA = [42, 67, 55, 89, 74, 91, 63];
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const maxW = Math.max(...WEEK_DATA);

const RANK_DIST = [
  { label: "LEGEND",    count: 12,  color: "#ffd700",           pct: 1 },
  { label: "PHANTOM",   count: 48,  color: "var(--neon-orange)", pct: 4 },
  { label: "OPERATIVE", count: 187, color: "var(--accent)",      pct: 15 },
  { label: "AGENT",     count: 412, color: "var(--brand)",       pct: 33 },
  { label: "RECRUIT",   count: 588, color: "var(--text-muted)",  pct: 47 },
];

export default function AdminDashboard() {
  return (
    <div className="sidebar-layout" style={{ fontFamily: "var(--font-sans)" }}>
      <CyberBackground />
      <AdminSidebar />
      <main className="sidebar-content" style={{ padding: "32px 28px", position: "relative", zIndex: 2 }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 28, flexWrap: "wrap", gap: 12 }}>
          <div>
            <p style={{ fontSize: 10, color: "var(--text-muted)", fontFamily: "var(--font-display)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 4 }}>Ghostnett GMID</p>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: 26, fontWeight: 900, color: "var(--text-primary)" }}>
              Admin <span className="neon-text-purple">Control Center</span>
            </h1>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <NeonBadge variant="green" pulse>All Systems</NeonBadge>
            <NeonBadge variant="purple">SUPERADMIN</NeonBadge>
            <span style={{ fontSize: 10, color: "var(--text-muted)", fontFamily: "var(--font-display)", letterSpacing: "0.1em" }}>Last sync: 2m ago</span>
          </div>
        </div>

        {/* KPI row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 14, marginBottom: 24 }}>
          <StatWidget label="Total Members" value="1,247" sub="+14 today"   icon="◉" color="cyan"   trend={8} />
          <StatWidget label="Active Now"    value="342"   sub="27% online"  icon="◎" color="green"  />
          <StatWidget label="Total XP"      value="2.4M"  sub="all time"    icon="▲" color="purple" trend={12} />
          <StatWidget label="Quizzes Today" value="891"   sub="+12% vs avg" icon="⬡" color="orange" trend={12} />
          <StatWidget label="Live Events"   value="4"     sub="1 ending soon"icon="◆" color="cyan"  />
          <StatWidget label="Flagged"       value="3"     sub="needs review" icon="⚠" color="orange" />
        </div>

        {/* Main grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>

          {/* Weekly activity chart */}
          <GlassCard neonTop style={{ padding: 24 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <p style={{ fontFamily: "var(--font-display)", fontSize: 11, letterSpacing: "0.15em", color: "var(--text-muted)", textTransform: "uppercase" }}>Weekly Activity</p>
              <NeonBadge variant="cyan">Signups</NeonBadge>
            </div>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 120 }}>
              {WEEK_DATA.map((v, i) => (
                <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6, height: "100%", justifyContent: "flex-end" }}>
                  <span style={{ fontSize: 9, color: "var(--brand)", fontFamily: "var(--font-display)" }}>{v}</span>
                  <div style={{ width: "100%", borderRadius: "4px 4px 0 0", background: `linear-gradient(180deg, var(--brand), rgba(0,245,255,0.3))`, height: `${(v / maxW) * 100}%`, boxShadow: "0 0 8px var(--brand-glow)", transition: "height 0.5s ease", minHeight: 4 }} />
                  <span style={{ fontSize: 9, color: "var(--text-dim)", fontFamily: "var(--font-display)" }}>{DAYS[i]}</span>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Rank distribution */}
          <GlassCard variant="purple" neonTop style={{ padding: 24 }}>
            <p style={{ fontFamily: "var(--font-display)", fontSize: 11, letterSpacing: "0.15em", color: "var(--text-muted)", textTransform: "uppercase", marginBottom: 20 }}>Rank Distribution</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {RANK_DIST.map(r => (
                <div key={r.label}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, marginBottom: 4 }}>
                    <span style={{ fontFamily: "var(--font-display)", color: r.color, letterSpacing: "0.1em" }}>{r.label}</span>
                    <span style={{ color: "var(--text-muted)", fontFamily: "var(--font-display)" }}>{r.count} ({r.pct}%)</span>
                  </div>
                  <div className="progress-track">
                    <div className="progress-fill" style={{ width: `${r.pct}%`, background: r.color, boxShadow: `0 0 8px ${r.color}66` }} />
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* Bottom grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 20 }}>

          {/* Recent signups */}
          <GlassCard style={{ padding: 0, overflow: "hidden" }}>
            <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--border-subtle)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <p style={{ fontFamily: "var(--font-display)", fontSize: 11, letterSpacing: "0.15em", color: "var(--text-muted)", textTransform: "uppercase" }}>Recent Signups</p>
              <Link href="/admin/users" style={{ textDecoration: "none" }}>
                <span style={{ fontSize: 9, color: "var(--accent)", fontFamily: "var(--font-display)", letterSpacing: "0.1em" }}>MANAGE ALL →</span>
              </Link>
            </div>
            <table className="cyber-table">
              <thead><tr><th>Member</th><th>Rank</th><th>Joined</th><th>Status</th><th>Action</th></tr></thead>
              <tbody>
                {RECENT_USERS.map(u => (
                  <tr key={u.name}>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{ width: 30, height: 30, borderRadius: 7, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>👤</div>
                        <span style={{ fontSize: 13, color: "var(--text-primary)" }}>{u.name}</span>
                      </div>
                    </td>
                    <td><span style={{ fontSize: 11, fontFamily: "var(--font-display)", color: u.rank === "OPERATIVE" ? "var(--accent)" : u.rank === "AGENT" ? "var(--brand)" : "var(--text-muted)" }}>{u.rank}</span></td>
                    <td><span style={{ fontSize: 11, color: "var(--text-muted)" }}>{u.joined}</span></td>
                    <td>
                      <NeonBadge variant={u.status === "active" ? "green" : u.status === "pending" ? "orange" : "pink"}>
                        {u.status.toUpperCase()}
                      </NeonBadge>
                    </td>
                    <td>
                      <div style={{ display: "flex", gap: 5 }}>
                        <button className="action-btn action-btn-cyan" style={{ fontSize: 9 }}>View</button>
                        <button className="action-btn action-btn-orange" style={{ fontSize: 9 }}>Edit</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </GlassCard>

          {/* System alerts */}
          <GlassCard style={{ padding: 22 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <p style={{ fontFamily: "var(--font-display)", fontSize: 11, letterSpacing: "0.15em", color: "var(--text-muted)", textTransform: "uppercase" }}>System Alerts</p>
              <NeonBadge variant="orange">2 Warnings</NeonBadge>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {ALERTS.map((a, i) => (
                <div key={i} style={{ display: "flex", gap: 10, padding: "10px 12px", borderRadius: 8, background: a.type === "warn" ? "rgba(255,107,0,0.08)" : a.type === "ok" ? "rgba(57,255,20,0.06)" : "rgba(255,255,255,0.02)", border: `1px solid ${a.type === "warn" ? "rgba(255,107,0,0.2)" : a.type === "ok" ? "rgba(57,255,20,0.15)" : "rgba(255,255,255,0.05)"}` }}>
                  <span style={{ fontSize: 14, flexShrink: 0 }}>{a.type === "warn" ? "⚠️" : a.type === "ok" ? "✅" : "ℹ️"}</span>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 11, color: "var(--text-primary)", lineHeight: 1.4 }}>{a.msg}</p>
                    <p style={{ fontSize: 9, color: "var(--text-dim)", marginTop: 3, fontFamily: "var(--font-display)" }}>{a.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </main>
    </div>
  );
}
