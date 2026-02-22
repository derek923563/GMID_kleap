"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { XPBar } from "./XPBar";

const NAV = [
  { href: "/user",            icon: "⬡",  label: "Dashboard" },
  { href: "/user/card",       icon: "◈",  label: "My GMID Card" },
  { href: "/user/rewards",    icon: "✦",  label: "Rewards" },
  { href: "/user/leaderboard",icon: "▲",  label: "Leaderboard" },
  { href: "/user/quiz",       icon: "◎",  label: "Quiz Hub" },
  { href: "/user/events",     icon: "◆",  label: "Events" },
  { href: "/user/profile",    icon: "◉",  label: "Profile" },
];

export function UserSidebar() {
  const path = usePathname();
  return (
    <aside className="sidebar">
      {/* Logo */}
      <div style={{ padding: "24px 20px 16px", borderBottom: "1px solid var(--border-neon)" }}>
        <Link href="/" style={{ textDecoration: "none" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 8,
              background: "linear-gradient(135deg, var(--brand), var(--accent))",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 0 20px var(--brand-glow)",
              flexShrink: 0,
            }}>
              <span style={{ fontFamily: "var(--font-display)", fontSize: 12, fontWeight: 900, color: "#060612" }}>GN</span>
            </div>
            <div>
              <p style={{ fontFamily: "var(--font-display)", fontSize: 13, fontWeight: 900, color: "var(--brand)", letterSpacing: "0.1em", lineHeight: 1 }}>GMID</p>
              <p style={{ fontSize: 9, color: "var(--text-muted)", letterSpacing: "0.15em", textTransform: "uppercase", marginTop: 2 }}>User Console</p>
            </div>
          </div>
        </Link>
      </div>

      {/* User mini-card */}
      <div style={{ padding: "16px 20px", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
          <div style={{
            width: 38, height: 38, borderRadius: 10,
            background: "linear-gradient(135deg, rgba(0,245,255,0.2), rgba(191,0,255,0.2))",
            border: "1px solid var(--border-neon)",
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0,
          }}>👤</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontFamily: "var(--font-display)", fontSize: 11, fontWeight: 700, color: "var(--text-primary)", letterSpacing: "0.05em", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>Ghost_Cipher</p>
            <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 2 }}>
              <span style={{ fontSize: 9, color: "var(--accent)", fontFamily: "var(--font-display)", letterSpacing: "0.1em" }}>OPERATIVE</span>
              <span style={{ fontSize: 9, color: "var(--text-dim)" }}>·</span>
              <span style={{ fontSize: 9, color: "var(--text-muted)", fontFamily: "var(--font-display)" }}>LVL 42</span>
            </div>
          </div>
        </div>
        <XPBar current={3200} max={5000} label={false} height={4} />
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4, fontSize: 9, color: "var(--text-dim)", fontFamily: "var(--font-display)", letterSpacing: "0.08em" }}>
          <span>3,200 XP</span><span>5,000 XP</span>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: "12px 12px", overflowY: "auto" }}>
        {NAV.map(({ href, icon, label }) => {
          const active = path === href || (href !== "/user" && path.startsWith(href));
          return (
            <Link key={href} href={href} style={{ textDecoration: "none", display: "block", marginBottom: 2 }}>
              <div style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "10px 12px", borderRadius: 8,
                background: active ? "var(--brand-dim)" : "transparent",
                border: `1px solid ${active ? "var(--border-neon)" : "transparent"}`,
                color: active ? "var(--brand)" : "var(--text-muted)",
                transition: "all 0.2s ease",
                position: "relative",
              }}>
                {active && <div style={{ position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)", width: 3, height: 20, background: "var(--brand)", borderRadius: "0 2px 2px 0", boxShadow: "0 0 8px var(--brand-glow)" }} />}
                <span style={{ fontSize: 14, width: 18, textAlign: "center", flexShrink: 0 }}>{icon}</span>
                <span style={{ fontSize: 12, fontFamily: "var(--font-display)", letterSpacing: "0.06em", fontWeight: active ? 700 : 400 }}>{label}</span>
                {active && <div style={{ marginLeft: "auto", width: 5, height: 5, borderRadius: "50%", background: "var(--brand)", boxShadow: "0 0 6px var(--brand-glow)" }} />}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div style={{ padding: "12px 20px", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--neon-green)", animation: "pulse-dot 1.5s ease-in-out infinite" }} />
          <span style={{ fontSize: 9, color: "var(--text-muted)", fontFamily: "var(--font-display)", letterSpacing: "0.12em" }}>SYSTEM ONLINE</span>
        </div>
        <Link href="/" style={{ textDecoration: "none" }}>
          <div style={{ fontSize: 10, color: "var(--text-dim)", fontFamily: "var(--font-display)", letterSpacing: "0.1em", cursor: "pointer", transition: "color 0.2s" }}>← BACK TO PORTAL</div>
        </Link>
      </div>
    </aside>
  );
}
