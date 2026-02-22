"use client";
import { useState } from "react";
import { GlassCard } from "@/components/gmid/GlassCard";
import { NeonBadge } from "@/components/gmid/NeonBadge";
import { XPBar } from "@/components/gmid/XPBar";

const EVENTS = [
  { id: 1, name: "Operation Blackout",    type: "MISSION",  status: "LIVE",     slots: 45, maxSlots: 50, xp: 500,  pts: 200, ends: "48h left",   joined: true,  color: "var(--neon-green)",  icon: "🕵️", desc: "Infiltrate the simulated dark web network and extract target data without detection. Requires OSINT skills." },
  { id: 2, name: "Cyber Trivia Night",    type: "QUIZ",     status: "UPCOMING", slots: 12, maxSlots: 100,xp: 200,  pts: 80,  ends: "Tomorrow",   joined: true,  color: "var(--brand)",       icon: "🧠", desc: "Weekly trivia event covering cybersecurity, hacking history, and tech culture. Open to all ranks." },
  { id: 3, name: "Ghost Hunt CTF",        type: "CTF",      status: "UPCOMING", slots: 8,  maxSlots: 30, xp: 1000, pts: 500, ends: "3 days",     joined: false, color: "var(--accent)",      icon: "🏁", desc: "Capture The Flag competition. Solve challenges across web, crypto, forensics, and reverse engineering." },
  { id: 4, name: "OSINT Deep Dive",       type: "WORKSHOP", status: "UPCOMING", slots: 22, maxSlots: 40, xp: 350,  pts: 150, ends: "5 days",     joined: false, color: "var(--neon-orange)", icon: "🔍", desc: "Guided workshop on advanced OSINT techniques. Led by LEGEND-rank operatives. Limited seats." },
  { id: 5, name: "Network Siege",         type: "MISSION",  status: "ENDED",    slots: 50, maxSlots: 50, xp: 400,  pts: 180, ends: "Ended",      joined: true,  color: "var(--text-dim)",    icon: "📡", desc: "Network penetration simulation. Completed event — results archived." },
  { id: 6, name: "Phantom Protocol",      type: "CTF",      status: "ENDED",    slots: 30, maxSlots: 30, xp: 800,  pts: 350, ends: "Ended",      joined: false, color: "var(--text-dim)",    icon: "👻", desc: "Advanced CTF for PHANTOM+ ranks. Completed event." },
];

const STATUS_COLOR: Record<string, string> = {
  LIVE: "var(--neon-green)", UPCOMING: "var(--brand)", ENDED: "var(--text-dim)",
};

export default function EventsPage() {
  const [filter, setFilter] = useState<"all" | "joined" | "available">("all");
  const [detail, setDetail] = useState<number | null>(null);
  const [joined, setJoined] = useState<Set<number>>(new Set([1, 2, 5]));

  const filtered = EVENTS.filter(e =>
    filter === "all" ? true : filter === "joined" ? joined.has(e.id) : !joined.has(e.id) && e.status !== "ENDED"
  );

  const detailEvent = EVENTS.find(e => e.id === detail);

  return (
    <main style={{ padding: "32px 28px", position: "relative", zIndex: 2, fontFamily: "var(--font-sans)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28, flexWrap: "wrap", gap: 12 }}>
        <div>
          <p style={{ fontSize: 10, color: "var(--text-muted)", fontFamily: "var(--font-display)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 4 }}>Operations</p>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: 26, fontWeight: 900, color: "var(--text-primary)" }}>
            Events <span className="neon-text">Tracker</span>
          </h1>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <NeonBadge variant="green" pulse>2 Live</NeonBadge>
          <NeonBadge variant="cyan">3 Joined</NeonBadge>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 24 }}>
        {[
          { label: "Events Joined",    val: "3",  color: "var(--brand)" },
          { label: "XP from Events",   val: "1,100", color: "var(--neon-green)" },
          { label: "Live Now",         val: "1",  color: "var(--neon-green)" },
          { label: "Upcoming",         val: "3",  color: "var(--accent)" },
        ].map(({ label, val, color }) => (
          <GlassCard key={label} style={{ padding: 18 }}>
            <p style={{ fontSize: 9, color: "var(--text-muted)", fontFamily: "var(--font-display)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 6 }}>{label}</p>
            <p style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 900, color }}>{val}</p>
          </GlassCard>
        ))}
      </div>

      {/* Filter */}
      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        {(["all", "joined", "available"] as const).map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{
            padding: "7px 16px", borderRadius: 7, border: `1px solid ${filter === f ? "var(--border-neon)" : "rgba(255,255,255,0.08)"}`,
            background: filter === f ? "var(--brand-dim)" : "transparent",
            color: filter === f ? "var(--brand)" : "var(--text-muted)",
            fontFamily: "var(--font-display)", fontSize: 10, letterSpacing: "0.1em",
            textTransform: "uppercase", cursor: "pointer", transition: "all 0.2s",
          }}>{f}</button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: detail ? "1fr 360px" : "1fr", gap: 20 }}>
        <div style={{ display: "grid", gridTemplateColumns: detail ? "1fr" : "repeat(2, 1fr)", gap: 16 }}>
          {filtered.map(e => (
            <GlassCard key={e.id} style={{
              padding: 22, cursor: "pointer",
              border: `1px solid ${detail === e.id ? e.color + "55" : e.color + "22"}`,
              opacity: e.status === "ENDED" ? 0.6 : 1,
              transition: "all 0.2s",
            }} onClick={() => setDetail(detail === e.id ? null : e.id)}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 11, background: `${e.color}18`, border: `1px solid ${e.color}44`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>{e.icon}</div>
                  <div>
                    <p style={{ fontFamily: "var(--font-display)", fontSize: 13, fontWeight: 700, color: "var(--text-primary)", letterSpacing: "0.04em" }}>{e.name}</p>
                    <p style={{ fontSize: 10, color: "var(--text-muted)", fontFamily: "var(--font-display)", letterSpacing: "0.1em", marginTop: 2 }}>{e.type}</p>
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
                  <NeonBadge variant={e.status === "LIVE" ? "green" : e.status === "UPCOMING" ? "cyan" : "pink"}>{e.status}</NeonBadge>
                  {joined.has(e.id) && <span style={{ fontSize: 9, color: "var(--neon-green)", fontFamily: "var(--font-display)" }}>✓ JOINED</span>}
                </div>
              </div>

              {/* Slot fill */}
              <div style={{ marginBottom: 12 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 9, color: "var(--text-dim)", fontFamily: "var(--font-display)", marginBottom: 4 }}>
                  <span>Slots</span><span style={{ color: e.color }}>{e.slots}/{e.maxSlots}</span>
                </div>
                <XPBar current={e.slots} max={e.maxSlots} color={e.color} height={4} label={false} />
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", gap: 12 }}>
                  <span style={{ fontSize: 11, color: "var(--neon-green)", fontFamily: "var(--font-display)", fontWeight: 700 }}>+{e.xp} XP</span>
                  <span style={{ fontSize: 11, color: "var(--brand)", fontFamily: "var(--font-display)" }}>+{e.pts} pts</span>
                </div>
                <span style={{ fontSize: 10, color: STATUS_COLOR[e.status], fontFamily: "var(--font-display)" }}>{e.ends}</span>
              </div>
            </GlassCard>
          ))}
        </div>

        {/* Detail panel */}
        {detailEvent && (
          <GlassCard variant="purple" neonTop style={{ padding: 24, height: "fit-content" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <p style={{ fontFamily: "var(--font-display)", fontSize: 11, letterSpacing: "0.15em", color: "var(--text-muted)", textTransform: "uppercase" }}>Event Details</p>
              <button onClick={() => setDetail(null)} style={{ background: "none", border: "none", color: "var(--text-dim)", cursor: "pointer", fontSize: 16 }}>✕</button>
            </div>
            <div style={{ fontSize: 36, marginBottom: 12, textAlign: "center" }}>{detailEvent.icon}</div>
            <p style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 900, color: "var(--text-primary)", marginBottom: 4, textAlign: "center" }}>{detailEvent.name}</p>
            <p style={{ fontSize: 12, color: "var(--text-muted)", textAlign: "center", marginBottom: 20, lineHeight: 1.5 }}>{detailEvent.desc}</p>
            <div className="neon-divider" style={{ marginBottom: 16 }} />
            {[
              { label: "Type",     val: detailEvent.type },
              { label: "Status",   val: detailEvent.status },
              { label: "Slots",    val: `${detailEvent.slots}/${detailEvent.maxSlots}` },
              { label: "XP Reward",val: `+${detailEvent.xp} XP` },
              { label: "Points",   val: `+${detailEvent.pts} pts` },
              { label: "Time",     val: detailEvent.ends },
            ].map(({ label, val }) => (
              <div key={label} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                <span style={{ fontSize: 11, color: "var(--text-muted)", fontFamily: "var(--font-display)", letterSpacing: "0.08em" }}>{label}</span>
                <span style={{ fontSize: 12, color: "var(--text-primary)", fontFamily: "var(--font-display)" }}>{val}</span>
              </div>
            ))}
            <button
              onClick={() => setJoined(prev => { const n = new Set(prev); n.has(detailEvent.id) ? n.delete(detailEvent.id) : n.add(detailEvent.id); return n; })}
              disabled={detailEvent.status === "ENDED"}
              style={{
                width: "100%", marginTop: 20, padding: "12px", borderRadius: 10,
                border: `1px solid ${joined.has(detailEvent.id) ? "rgba(255,0,80,0.4)" : "var(--border-neon)"}`,
                background: joined.has(detailEvent.id) ? "rgba(255,0,80,0.1)" : "var(--brand-dim)",
                color: joined.has(detailEvent.id) ? "#ff0050" : "var(--brand)",
                fontFamily: "var(--font-display)", fontSize: 12, letterSpacing: "0.1em",
                cursor: detailEvent.status === "ENDED" ? "not-allowed" : "pointer", opacity: detailEvent.status === "ENDED" ? 0.5 : 1,
              }}>{joined.has(detailEvent.id) ? "LEAVE EVENT" : "JOIN EVENT"}</button>
          </GlassCard>
        )}
      </div>
    </main>
  );
}
