"use client";
import { useState } from "react";
import { GlassCard } from "@/components/gmid/GlassCard";
import { NeonBadge } from "@/components/gmid/NeonBadge";
import { XPBar } from "@/components/gmid/XPBar";

type EventStatus = "LIVE" | "UPCOMING" | "ENDED" | "DRAFT";
interface Event {
  id: number; name: string; type: string; status: EventStatus;
  slots: number; maxSlots: number; xp: number; pts: number;
  date: string; color: string; icon: string;
}

const INIT_EVENTS: Event[] = [
  { id: 1, name: "Operation Blackout",  type: "MISSION",  status: "LIVE",     slots: 45, maxSlots: 50,  xp: 500,  pts: 200, date: "Ends in 48h",    color: "var(--neon-green)",  icon: "🕵️" },
  { id: 2, name: "Cyber Trivia Night",  type: "QUIZ",     status: "UPCOMING", slots: 12, maxSlots: 100, xp: 200,  pts: 80,  date: "Tomorrow 8PM",  color: "var(--brand)",       icon: "🧠" },
  { id: 3, name: "Ghost Hunt CTF",      type: "CTF",      status: "UPCOMING", slots: 8,  maxSlots: 30,  xp: 1000, pts: 500, date: "In 3 days",     color: "var(--accent)",      icon: "🏁" },
  { id: 4, name: "OSINT Deep Dive",     type: "WORKSHOP", status: "UPCOMING", slots: 22, maxSlots: 40,  xp: 350,  pts: 150, date: "In 5 days",     color: "var(--neon-orange)", icon: "🔍" },
  { id: 5, name: "Network Siege",       type: "MISSION",  status: "ENDED",    slots: 50, maxSlots: 50,  xp: 400,  pts: 180, date: "Jan 28, 2024",  color: "var(--text-dim)",    icon: "📡" },
  { id: 6, name: "Stealth Recon",       type: "CTF",      status: "DRAFT",    slots: 0,  maxSlots: 25,  xp: 600,  pts: 250, date: "TBD",          color: "var(--text-muted)",  icon: "👁️" },
];

const BLANK: Omit<Event, "id"> = { name: "", type: "MISSION", status: "DRAFT", slots: 0, maxSlots: 50, xp: 200, pts: 100, date: "", color: "var(--brand)", icon: "⬡" };
const STATUS_V: Record<EventStatus, "green"|"cyan"|"pink"|"orange"> = { LIVE: "green", UPCOMING: "cyan", ENDED: "pink", DRAFT: "orange" };

export default function AdminEventsPage() {
  const [events, setEvents] = useState<Event[]>(INIT_EVENTS);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<Omit<Event, "id">>(BLANK);
  const [editId, setEditId] = useState<number | null>(null);

  function saveEvent() {
    if (!form.name.trim()) return;
    if (editId !== null) {
      setEvents(ev => ev.map(e => e.id === editId ? { ...form, id: editId } : e));
    } else {
      setEvents(ev => [...ev, { ...form, id: Date.now() }]);
    }
    setShowForm(false); setEditId(null); setForm(BLANK);
  }

  function deleteEvent(id: number) { setEvents(ev => ev.filter(e => e.id !== id)); }

  function startEdit(e: Event) {
    const { id, ...rest } = e;
    setForm(rest); setEditId(id); setShowForm(true);
  }

  return (
    <main style={{ padding: "32px 28px", position: "relative", zIndex: 2, fontFamily: "var(--font-sans)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28, flexWrap: "wrap", gap: 12 }}>
        <div>
          <p style={{ fontSize: 10, color: "var(--text-muted)", fontFamily: "var(--font-display)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 4 }}>Admin</p>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: 26, fontWeight: 900, color: "var(--text-primary)" }}>
            Event <span className="neon-text-purple">Manager</span>
          </h1>
        </div>
        <button onClick={() => { setForm(BLANK); setEditId(null); setShowForm(true); }} style={{ padding: "10px 20px", borderRadius: 9, border: "1px solid var(--border-purple)", background: "var(--accent-dim)", color: "var(--accent)", fontFamily: "var(--font-display)", fontSize: 11, letterSpacing: "0.1em", cursor: "pointer" }}>+ ADD EVENT</button>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 24 }}>
        {[
          { label: "Total Events",  val: events.length,                                  color: "var(--brand)" },
          { label: "Live Now",      val: events.filter(e => e.status === "LIVE").length,  color: "var(--neon-green)" },
          { label: "Upcoming",      val: events.filter(e => e.status === "UPCOMING").length, color: "var(--accent)" },
          { label: "Drafts",        val: events.filter(e => e.status === "DRAFT").length, color: "var(--neon-orange)" },
        ].map(({ label, val, color }) => (
          <GlassCard key={label} style={{ padding: 18 }}>
            <p style={{ fontSize: 9, color: "var(--text-muted)", fontFamily: "var(--font-display)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 6 }}>{label}</p>
            <p style={{ fontFamily: "var(--font-display)", fontSize: 26, fontWeight: 900, color }}>{val}</p>
          </GlassCard>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: showForm ? "1fr 380px" : "1fr", gap: 20 }}>
        {/* Event list */}
        <GlassCard style={{ padding: 0, overflow: "hidden" }}>
          <div style={{ padding: "14px 20px", borderBottom: "1px solid var(--border-subtle)" }}>
            <p style={{ fontFamily: "var(--font-display)", fontSize: 11, letterSpacing: "0.15em", color: "var(--text-muted)", textTransform: "uppercase" }}>All Events</p>
          </div>
          <table className="cyber-table">
            <thead><tr><th>Event</th><th>Type</th><th>Status</th><th>Slots</th><th>XP</th><th>Date</th><th>Actions</th></tr></thead>
            <tbody>
              {events.map(e => (
                <tr key={e.id}>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ width: 34, height: 34, borderRadius: 8, background: `${e.color}18`, border: `1px solid ${e.color}44`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>{e.icon}</div>
                      <span style={{ fontSize: 13, color: "var(--text-primary)", fontWeight: 500 }}>{e.name}</span>
                    </div>
                  </td>
                  <td><span style={{ fontSize: 10, fontFamily: "var(--font-display)", color: "var(--text-muted)", letterSpacing: "0.08em" }}>{e.type}</span></td>
                  <td><NeonBadge variant={STATUS_V[e.status]}>{e.status}</NeonBadge></td>
                  <td>
                    <div style={{ minWidth: 80 }}>
                      <div style={{ fontSize: 10, color: e.color, fontFamily: "var(--font-display)", marginBottom: 3 }}>{e.slots}/{e.maxSlots}</div>
                      <XPBar current={e.slots} max={e.maxSlots} color={e.color} height={3} label={false} />
                    </div>
                  </td>
                  <td><span style={{ fontSize: 11, color: "var(--neon-green)", fontFamily: "var(--font-display)" }}>+{e.xp}</span></td>
                  <td><span style={{ fontSize: 11, color: "var(--text-muted)" }}>{e.date}</span></td>
                  <td>
                    <div style={{ display: "flex", gap: 5 }}>
                      <button className="action-btn action-btn-cyan" onClick={() => startEdit(e)}>Edit</button>
                      <button className="action-btn action-btn-orange" onClick={() => deleteEvent(e.id)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </GlassCard>

        {/* Add/Edit form */}
        {showForm && (
          <GlassCard variant="purple" neonTop style={{ padding: 24, height: "fit-content" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
              <p style={{ fontFamily: "var(--font-display)", fontSize: 11, letterSpacing: "0.15em", color: "var(--text-muted)", textTransform: "uppercase" }}>{editId ? "Edit Event" : "New Event"}</p>
              <button onClick={() => setShowForm(false)} style={{ background: "none", border: "none", color: "var(--text-dim)", cursor: "pointer", fontSize: 16 }}>✕</button>
            </div>
            {([
              { label: "Event Name", key: "name", type: "text" },
              { label: "Date / Time", key: "date", type: "text" },
              { label: "Max Slots", key: "maxSlots", type: "number" },
              { label: "XP Reward", key: "xp", type: "number" },
              { label: "Points Reward", key: "pts", type: "number" },
            ] as const).map(({ label, key, type }) => (
              <div key={key} style={{ marginBottom: 14 }}>
                <p style={{ fontSize: 10, color: "var(--text-muted)", fontFamily: "var(--font-display)", letterSpacing: "0.1em", marginBottom: 6 }}>{label.toUpperCase()}</p>
                <input type={type} value={String((form as any)[key])} onChange={e => setForm(f => ({ ...f, [key]: type === "number" ? Number(e.target.value) : e.target.value }))}
                  style={{ width: "100%", padding: "9px 12px", borderRadius: 8, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "var(--text-primary)", fontFamily: "var(--font-sans)", fontSize: 13, outline: "none", boxSizing: "border-box" }} />
              </div>
            ))}
            <div style={{ marginBottom: 14 }}>
              <p style={{ fontSize: 10, color: "var(--text-muted)", fontFamily: "var(--font-display)", letterSpacing: "0.1em", marginBottom: 6 }}>TYPE</p>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {["MISSION","QUIZ","CTF","WORKSHOP"].map(t => (
                  <button key={t} onClick={() => setForm(f => ({ ...f, type: t }))} style={{ padding: "6px 12px", borderRadius: 6, border: `1px solid ${form.type === t ? "var(--border-purple)" : "rgba(255,255,255,0.08)"}`, background: form.type === t ? "var(--accent-dim)" : "transparent", color: form.type === t ? "var(--accent)" : "var(--text-muted)", fontFamily: "var(--font-display)", fontSize: 10, cursor: "pointer" }}>{t}</button>
                ))}
              </div>
            </div>
            <div style={{ marginBottom: 20 }}>
              <p style={{ fontSize: 10, color: "var(--text-muted)", fontFamily: "var(--font-display)", letterSpacing: "0.1em", marginBottom: 6 }}>STATUS</p>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {(["DRAFT","UPCOMING","LIVE","ENDED"] as EventStatus[]).map(s => (
                  <button key={s} onClick={() => setForm(f => ({ ...f, status: s }))} style={{ padding: "6px 12px", borderRadius: 6, border: `1px solid ${form.status === s ? "var(--border-neon)" : "rgba(255,255,255,0.08)"}`, background: form.status === s ? "var(--brand-dim)" : "transparent", color: form.status === s ? "var(--brand)" : "var(--text-muted)", fontFamily: "var(--font-display)", fontSize: 10, cursor: "pointer" }}>{s}</button>
                ))}
              </div>
            </div>
            <button onClick={saveEvent} style={{ width: "100%", padding: "12px", borderRadius: 10, border: "1px solid var(--border-purple)", background: "var(--accent-dim)", color: "var(--accent)", fontFamily: "var(--font-display)", fontSize: 12, letterSpacing: "0.1em", cursor: "pointer" }}>
              {editId ? "SAVE CHANGES" : "CREATE EVENT"}
            </button>
          </GlassCard>
        )}
      </div>
    </main>
  );
}
