"use client";
import { useState } from "react";
import { GlassCard } from "@/components/gmid/GlassCard";
import { NeonBadge } from "@/components/gmid/NeonBadge";
import { StatWidget } from "@/components/gmid/StatWidget";

const CHART_DATA: Record<string, number[]> = {
  Signups:  [42, 67, 55, 89, 74, 91, 63, 78, 85, 102, 94, 110],
  Quizzes:  [310, 420, 380, 510, 490, 620, 540, 580, 670, 720, 690, 810],
  Points:   [12400, 18200, 15600, 22100, 19800, 25400, 21300, 23800, 27600, 31200, 28900, 34500],
};
const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

const RANK_DIST = [
  { label: "LEGEND",    count: 12,  pct: 1,  color: "#ffd700" },
  { label: "PHANTOM",   count: 48,  pct: 4,  color: "var(--neon-orange)" },
  { label: "OPERATIVE", count: 187, pct: 15, color: "var(--accent)" },
  { label: "AGENT",     count: 412, pct: 33, color: "var(--brand)" },
  { label: "RECRUIT",   count: 588, pct: 47, color: "var(--text-muted)" },
];

const QUIZ_CATS = [
  { name: "OSINT",          completions: 3420, avgScore: 74, color: "var(--brand)" },
  { name: "Cryptography",   completions: 2180, avgScore: 61, color: "var(--accent)" },
  { name: "Networking",     completions: 2890, avgScore: 68, color: "var(--neon-green)" },
  { name: "Malware",        completions: 1540, avgScore: 55, color: "var(--neon-orange)" },
  { name: "Social Eng.",    completions: 1920, avgScore: 79, color: "#ffd700" },
];

const RETENTION = [100, 82, 71, 65, 60, 57, 54, 52, 50, 49, 48, 47, 46, 45];

export default function AdminAnalyticsPage() {
  const [chartMetric, setChartMetric] = useState<"Signups"|"Quizzes"|"Points">("Signups");
  const data = CHART_DATA[chartMetric];
  const maxVal = Math.max(...data);

  // Donut chart segments (simplified arc representation)
  const total = RANK_DIST.reduce((s, r) => s + r.count, 0);

  return (
    <main style={{ padding: "32px 28px", position: "relative", zIndex: 2, fontFamily: "var(--font-sans)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28, flexWrap: "wrap", gap: 12 }}>
        <div>
          <p style={{ fontSize: 10, color: "var(--text-muted)", fontFamily: "var(--font-display)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 4 }}>Admin</p>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: 26, fontWeight: 900, color: "var(--text-primary)" }}>
            Analytics <span className="neon-text-purple">Dashboard</span>
          </h1>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <NeonBadge variant="green" pulse>Live Data</NeonBadge>
          <span style={{ fontSize: 10, color: "var(--text-muted)", fontFamily: "var(--font-display)", letterSpacing: "0.1em", alignSelf: "center" }}>Updated 2m ago</span>
        </div>
      </div>

      {/* KPI row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 24 }}>
        <StatWidget label="Total Members"  value="1,247" sub="+14 today"     icon="◉" color="cyan"   trend={8} />
        <StatWidget label="Monthly Active" value="891"   sub="71% of total"  icon="◎" color="green"  trend={5} />
        <StatWidget label="Total XP Given" value="2.4M"  sub="+180K this mo" icon="▲" color="purple" trend={12} />
        <StatWidget label="Quiz Completions"value="12.4K" sub="+890 this week" icon="⬡" color="orange" trend={9} />
      </div>

      {/* Main charts row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 20, marginBottom: 20 }}>

        {/* Bar chart */}
        <GlassCard neonTop style={{ padding: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 10 }}>
            <p style={{ fontFamily: "var(--font-display)", fontSize: 11, letterSpacing: "0.15em", color: "var(--text-muted)", textTransform: "uppercase" }}>Monthly Trend — 2024</p>
            <div style={{ display: "flex", gap: 6 }}>
              {(["Signups","Quizzes","Points"] as const).map(m => (
                <button key={m} onClick={() => setChartMetric(m)} style={{ padding: "5px 12px", borderRadius: 6, border: `1px solid ${chartMetric === m ? "var(--border-neon)" : "rgba(255,255,255,0.08)"}`, background: chartMetric === m ? "var(--brand-dim)" : "transparent", color: chartMetric === m ? "var(--brand)" : "var(--text-muted)", fontFamily: "var(--font-display)", fontSize: 9, letterSpacing: "0.1em", cursor: "pointer" }}>{m}</button>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 160 }}>
            {data.map((v, i) => (
              <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 5, height: "100%", justifyContent: "flex-end" }}>
                <span style={{ fontSize: 8, color: "var(--brand)", fontFamily: "var(--font-display)" }}>{v >= 1000 ? `${(v/1000).toFixed(0)}K` : v}</span>
                <div style={{ width: "100%", borderRadius: "4px 4px 0 0", background: `linear-gradient(180deg, var(--brand), rgba(0,245,255,0.25))`, height: `${(v/maxVal)*100}%`, boxShadow: "0 0 8px var(--brand-glow)", minHeight: 4, transition: "height 0.4s ease" }} />
                <span style={{ fontSize: 8, color: "var(--text-dim)", fontFamily: "var(--font-display)" }}>{MONTHS[i]}</span>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Rank distribution donut */}
        <GlassCard variant="purple" neonTop style={{ padding: 24 }}>
          <p style={{ fontFamily: "var(--font-display)", fontSize: 11, letterSpacing: "0.15em", color: "var(--text-muted)", textTransform: "uppercase", marginBottom: 20 }}>Rank Distribution</p>
          {/* Visual donut via stacked bars */}
          <div style={{ display: "flex", height: 16, borderRadius: 8, overflow: "hidden", marginBottom: 20, gap: 2 }}>
            {RANK_DIST.map(r => (
              <div key={r.label} style={{ flex: r.pct, background: r.color, boxShadow: `0 0 8px ${r.color}66` }} />
            ))}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {RANK_DIST.map(r => (
              <div key={r.label} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 10, height: 10, borderRadius: 2, background: r.color, boxShadow: `0 0 6px ${r.color}`, flexShrink: 0 }} />
                <span style={{ fontFamily: "var(--font-display)", fontSize: 10, color: r.color, letterSpacing: "0.08em", flex: 1 }}>{r.label}</span>
                <span style={{ fontSize: 11, color: "var(--text-primary)", fontFamily: "var(--font-display)", fontWeight: 700 }}>{r.count}</span>
                <span style={{ fontSize: 10, color: "var(--text-muted)", fontFamily: "var(--font-display)", width: 32, textAlign: "right" }}>{r.pct}%</span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 16, padding: "10px 14px", borderRadius: 8, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}>
            <p style={{ fontSize: 10, color: "var(--text-muted)", fontFamily: "var(--font-display)", letterSpacing: "0.08em" }}>Total Members</p>
            <p style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 900, color: "var(--accent)" }}>{total.toLocaleString()}</p>
          </div>
        </GlassCard>
      </div>

      {/* Bottom row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>

        {/* Quiz category performance */}
        <GlassCard style={{ padding: 24 }}>
          <p style={{ fontFamily: "var(--font-display)", fontSize: 11, letterSpacing: "0.15em", color: "var(--text-muted)", textTransform: "uppercase", marginBottom: 20 }}>Quiz Category Performance</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {QUIZ_CATS.map(c => (
              <div key={c.name}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                  <span style={{ fontFamily: "var(--font-display)", fontSize: 11, color: c.color, letterSpacing: "0.08em" }}>{c.name}</span>
                  <div style={{ display: "flex", gap: 12 }}>
                    <span style={{ fontSize: 10, color: "var(--text-muted)", fontFamily: "var(--font-display)" }}>{c.completions.toLocaleString()} plays</span>
                    <span style={{ fontSize: 10, color: c.color, fontFamily: "var(--font-display)", fontWeight: 700 }}>{c.avgScore}% avg</span>
                  </div>
                </div>
                <div className="progress-track">
                  <div className="progress-fill" style={{ width: `${(c.completions / 3420) * 100}%`, background: c.color, boxShadow: `0 0 8px ${c.color}66` }} />
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Retention curve */}
        <GlassCard style={{ padding: 24 }}>
          <p style={{ fontFamily: "var(--font-display)", fontSize: 11, letterSpacing: "0.15em", color: "var(--text-muted)", textTransform: "uppercase", marginBottom: 20 }}>User Retention — Day Cohort</p>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 5, height: 120, marginBottom: 12 }}>
            {RETENTION.map((v, i) => (
              <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4, height: "100%", justifyContent: "flex-end" }}>
                <div style={{ width: "100%", borderRadius: "3px 3px 0 0", background: `linear-gradient(180deg, var(--accent), rgba(191,0,255,0.2))`, height: `${v}%`, boxShadow: "0 0 6px var(--accent-glow)", minHeight: 3 }} />
                <span style={{ fontSize: 7, color: "var(--text-dim)", fontFamily: "var(--font-display)" }}>D{i+1}</span>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 14px", borderRadius: 8, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}>
            <div>
              <p style={{ fontSize: 9, color: "var(--text-muted)", fontFamily: "var(--font-display)", letterSpacing: "0.1em" }}>Day 1 Retention</p>
              <p style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 900, color: "var(--neon-green)" }}>82%</p>
            </div>
            <div style={{ textAlign: "right" }}>
              <p style={{ fontSize: 9, color: "var(--text-muted)", fontFamily: "var(--font-display)", letterSpacing: "0.1em" }}>Day 14 Retention</p>
              <p style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 900, color: "var(--accent)" }}>45%</p>
            </div>
          </div>
        </GlassCard>
      </div>
    </main>
  );
}
