"use client";
import { UserSidebar } from "@/components/gmid/UserSidebar";
import { CyberBackground } from "@/components/gmid/CyberBackground";
import { GlassCard } from "@/components/gmid/GlassCard";
import { StatWidget } from "@/components/gmid/StatWidget";
import { XPBar } from "@/components/gmid/XPBar";
import { NeonBadge } from "@/components/gmid/NeonBadge";
import { GMIDCard } from "@/components/gmid/GMIDCard";
import Link from "next/link";

const MISSIONS = [
  { label: "Complete 3 quizzes", done: true,  xp: 150 },
  { label: "Join an active event", done: true,  xp: 200 },
  { label: "Reach top 50 leaderboard", done: false, xp: 300 },
  { label: "Earn a new badge", done: false, xp: 100 },
];

const ACTIVITY = [
  { icon: "⬡", text: "Completed Cryptography Quiz",   xp: "+120 XP",  time: "2m ago",  color: "var(--brand)" },
  { icon: "◆", text: "Joined Operation Blackout",      xp: "+200 XP",  time: "1h ago",  color: "var(--neon-green)" },
  { icon: "★", text: "Unlocked: Dark Web Navigator",   xp: "+50 XP",   time: "3h ago",  color: "var(--neon-orange)" },
  { icon: "▲", text: "Climbed to rank #18",            xp: "",         time: "5h ago",  color: "var(--accent)" },
  { icon: "⬡", text: "Completed OSINT Basics Quiz",    xp: "+90 XP",   time: "1d ago",  color: "var(--brand)" },
];

const UPCOMING = [
  { name: "Operation Blackout",  type: "MISSION",  time: "48h left",  color: "var(--neon-green)" },
  { name: "Cyber Trivia Night",  type: "QUIZ",     time: "Tomorrow",  color: "var(--brand)" },
  { name: "Ghost Hunt CTF",      type: "CTF",      time: "3 days",    color: "var(--accent)" },
];

const TOP3 = [
  { rank: 1, name: "NullVector",   pts: 24100, rank_label: "LEGEND" },
  { rank: 2, name: "Vex_0",        pts: 21800, rank_label: "PHANTOM" },
  { rank: 3, name: "Ghost_Cipher", pts: 18750, rank_label: "OPERATIVE", me: true },
];

export default function UserDashboard() {
  return (
    <div className="sidebar-layout" style={{ fontFamily: "var(--font-sans)" }}>
      <CyberBackground />
      <UserSidebar />
      <main className="sidebar-content" style={{ padding: "32px 28px", position: "relative", zIndex: 2 }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 28, flexWrap: "wrap", gap: 12 }}>
          <div>
            <p style={{ fontSize: 10, color: "var(--text-muted)", fontFamily: "var(--font-display)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 4 }}>Welcome back</p>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: 26, fontWeight: 900, color: "var(--text-primary)", letterSpacing: "0.05em" }}>
              Ghost_<span className="neon-text">Cipher</span>
            </h1>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <NeonBadge variant="green" pulse>Online</NeonBadge>
            <NeonBadge variant="purple">OPERATIVE</NeonBadge>
            <NeonBadge variant="orange">🔥 7-day streak</NeonBadge>
          </div>
        </div>

        {/* Stat row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 24 }}>
          <StatWidget label="Total Points" value="18,750" sub="+340 today" icon="◆" color="cyan" trend={12} />
          <StatWidget label="Current Level" value="42" sub="OPERATIVE rank" icon="⬡" color="purple" />
          <StatWidget label="XP Progress" value="3,200" sub="/ 5,000 to LVL 43" icon="▲" color="green" />
          <StatWidget label="Global Rank" value="#18" sub="Top 2% of members" icon="★" color="orange" trend={5} />
        </div>

        {/* Main grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 20, marginBottom: 20 }}>

          {/* Left col */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

            {/* GMID Card preview */}
            <GlassCard neonTop corners style={{ padding: 24 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
                <p style={{ fontFamily: "var(--font-display)", fontSize: 11, letterSpacing: "0.15em", color: "var(--text-muted)", textTransform: "uppercase" }}>My GMID Card</p>
                <Link href="/user/card" style={{ textDecoration: "none" }}>
                  <span style={{ fontSize: 10, color: "var(--brand)", fontFamily: "var(--font-display)", letterSpacing: "0.1em", cursor: "pointer" }}>VIEW FULL →</span>
                </Link>
              </div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <GMIDCard flippable={false} />
              </div>
            </GlassCard>

            {/* XP Progress */}
            <GlassCard style={{ padding: 24 }}>
              <p style={{ fontFamily: "var(--font-display)", fontSize: 11, letterSpacing: "0.15em", color: "var(--text-muted)", textTransform: "uppercase", marginBottom: 16 }}>XP Progress — Level 42 → 43</p>
              <XPBar current={3200} max={5000} />
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginTop: 16 }}>
                {[
                  { label: "This Week", val: "+1,240 XP", color: "var(--brand)" },
                  { label: "This Month", val: "+4,800 XP", color: "var(--accent)" },
                  { label: "All Time", val: "38,200 XP", color: "var(--neon-green)" },
                ].map(({ label, val, color }) => (
                  <div key={label} style={{ background: "rgba(255,255,255,0.03)", borderRadius: 8, padding: "10px 12px", border: "1px solid rgba(255,255,255,0.05)" }}>
                    <p style={{ fontSize: 9, color: "var(--text-muted)", fontFamily: "var(--font-display)", letterSpacing: "0.1em", marginBottom: 4 }}>{label}</p>
                    <p style={{ fontSize: 14, fontFamily: "var(--font-display)", fontWeight: 700, color }}>{val}</p>
                  </div>
                ))}
              </div>
            </GlassCard>

            {/* Activity feed */}
            <GlassCard style={{ padding: 24 }}>
              <p style={{ fontFamily: "var(--font-display)", fontSize: 11, letterSpacing: "0.15em", color: "var(--text-muted)", textTransform: "uppercase", marginBottom: 16 }}>Recent Activity</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {ACTIVITY.map((a, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 12px", borderRadius: 8, background: "rgba(255,255,255,0.02)", border: "1px solid transparent", transition: "all 0.2s" }}>
                    <div style={{ width: 32, height: 32, borderRadius: 8, background: `${a.color}18`, border: `1px solid ${a.color}33`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, flexShrink: 0 }}>{a.icon}</div>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: 13, color: "var(--text-primary)" }}>{a.text}</p>
                      <p style={{ fontSize: 10, color: "var(--text-muted)", marginTop: 2 }}>{a.time}</p>
                    </div>
                    {a.xp && <span style={{ fontSize: 11, fontFamily: "var(--font-display)", color: "var(--neon-green)", fontWeight: 700 }}>{a.xp}</span>}
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>

          {/* Right col */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

            {/* Daily missions */}
            <GlassCard variant="purple" neonTop style={{ padding: 22 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                <p style={{ fontFamily: "var(--font-display)", fontSize: 11, letterSpacing: "0.15em", color: "var(--text-muted)", textTransform: "uppercase" }}>Daily Missions</p>
                <NeonBadge variant="purple">2/4</NeonBadge>
              </div>
              <div style={{ marginBottom: 12 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "var(--text-muted)", fontFamily: "var(--font-display)", marginBottom: 5 }}>
                  <span>Progress</span><span style={{ color: "var(--accent)" }}>50%</span>
                </div>
                <div className="progress-track">
                  <div className="progress-fill" style={{ width: "50%", background: "linear-gradient(90deg, var(--accent), #ff0080)" }} />
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {MISSIONS.map((m, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 10px", borderRadius: 8, background: m.done ? "rgba(57,255,20,0.06)" : "rgba(255,255,255,0.02)", border: `1px solid ${m.done ? "rgba(57,255,20,0.2)" : "rgba(255,255,255,0.05)"}` }}>
                    <div style={{ width: 18, height: 18, borderRadius: 4, border: `2px solid ${m.done ? "var(--neon-green)" : "rgba(255,255,255,0.15)"}`, background: m.done ? "var(--neon-green-dim)" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      {m.done && <span style={{ fontSize: 10, color: "var(--neon-green)" }}>✓</span>}
                    </div>
                    <span style={{ fontSize: 12, color: m.done ? "var(--text-muted)" : "var(--text-primary)", textDecoration: m.done ? "line-through" : "none", flex: 1 }}>{m.label}</span>
                    <span style={{ fontSize: 10, color: "var(--neon-green)", fontFamily: "var(--font-display)" }}>+{m.xp}</span>
                  </div>
                ))}
              </div>
            </GlassCard>

            {/* Upcoming events */}
            <GlassCard style={{ padding: 22 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                <p style={{ fontFamily: "var(--font-display)", fontSize: 11, letterSpacing: "0.15em", color: "var(--text-muted)", textTransform: "uppercase" }}>Upcoming Events</p>
                <Link href="/user/events" style={{ textDecoration: "none" }}>
                  <span style={{ fontSize: 9, color: "var(--brand)", fontFamily: "var(--font-display)", letterSpacing: "0.1em" }}>ALL →</span>
                </Link>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {UPCOMING.map((e, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 8, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: e.color, boxShadow: `0 0 8px ${e.color}`, flexShrink: 0 }} />
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: 12, color: "var(--text-primary)" }}>{e.name}</p>
                      <p style={{ fontSize: 9, color: "var(--text-muted)", fontFamily: "var(--font-display)", letterSpacing: "0.08em", marginTop: 2 }}>{e.type}</p>
                    </div>
                    <span style={{ fontSize: 10, color: e.color, fontFamily: "var(--font-display)" }}>{e.time}</span>
                  </div>
                ))}
              </div>
            </GlassCard>

            {/* Mini leaderboard */}
            <GlassCard style={{ padding: 22 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                <p style={{ fontFamily: "var(--font-display)", fontSize: 11, letterSpacing: "0.15em", color: "var(--text-muted)", textTransform: "uppercase" }}>Top Ranks</p>
                <Link href="/user/leaderboard" style={{ textDecoration: "none" }}>
                  <span style={{ fontSize: 9, color: "var(--brand)", fontFamily: "var(--font-display)", letterSpacing: "0.1em" }}>FULL →</span>
                </Link>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {TOP3.map((u) => (
                  <div key={u.rank} className={u.me ? "lb-row me" : "lb-row"} style={{ background: u.me ? "var(--brand-dim)" : "rgba(255,255,255,0.02)", border: `1px solid ${u.me ? "var(--border-neon)" : "rgba(255,255,255,0.05)"}` }}>
                    <span style={{ fontFamily: "var(--font-display)", fontSize: 12, fontWeight: 900, color: u.rank === 1 ? "#ffd700" : u.rank === 2 ? "#c0c0c0" : "#cd7f32", width: 20, textAlign: "center" }}>#{u.rank}</span>
                    <span style={{ flex: 1, fontSize: 12, color: u.me ? "var(--brand)" : "var(--text-primary)" }}>{u.name}{u.me && " (you)"}</span>
                    <span style={{ fontSize: 11, fontFamily: "var(--font-display)", color: "var(--text-muted)" }}>{u.pts.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </div>
      </main>
    </div>
  );
}
