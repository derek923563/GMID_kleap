"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  { href: "/admin",             icon: "⬡",  label: "Control Center", section: null },
  { href: "/admin/users",       icon: "◉",  label: "User Management", section: "MANAGE" },
  { href: "/admin/events",      icon: "◆",  label: "Events", section: null },
  { href: "/admin/quiz",        icon: "◎",  label: "Quiz Builder", section: null },
  { href: "/admin/leaderboard", icon: "▲",  label: "Leaderboard", section: null },
  { href: "/admin/analytics",   icon: "◈",  label: "Analytics", section: "INSIGHTS" },
];

export function AdminSidebar() {
  const path = usePathname();
  let lastSection: string | null = "";
  return (
    <aside className="sidebar" style={{ borderRightColor: "var(--border-purple)" }}>
      {/* Logo */}
      <div style={{ padding: "24px 20px 16px", borderBottom: "1px solid var(--border-purple)" }}>
        <Link href="/" style={{ textDecoration: "none" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 8,
              background: "linear-gradient(135deg, var(--accent), #ff0080)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 0 20px var(--accent-glow)",
              flexShrink: 0,
            }}>
              <span style={{ fontFamily: "var(--font-display)", fontSize: 12, fontWeight: 900, color: "#fff" }}>GN</span>
            </div>
            <div>
              <p style={{ fontFamily: "var(--font-display)", fontSize: 13, fontWeight: 900, color: "var(--accent)", letterSpacing: "0.1em", lineHeight: 1 }}>GMID</p>
              <p style={{ fontSize: 9, color: "var(--text-muted)", letterSpacing: "0.15em", textTransform: "uppercase", marginTop: 2 }}>Admin Console</p>
            </div>
          </div>
        </Link>
      </div>

      {/* Admin badge */}
      <div style={{ padding: "12px 20px", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 38, height: 38, borderRadius: 10,
            background: "linear-gradient(135deg, rgba(191,0,255,0.25), rgba(255,0,128,0.15))",
            border: "1px solid var(--border-purple)",
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0,
          }}>🛡️</div>
          <div>
            <p style={{ fontFamily: "var(--font-display)", fontSize: 11, fontWeight: 700, color: "var(--text-primary)", letterSpacing: "0.05em" }}>GhostAdmin</p>
            <span style={{ fontSize: 9, color: "var(--accent)", fontFamily: "var(--font-display)", letterSpacing: "0.1em", background: "var(--accent-dim)", border: "1px solid rgba(191,0,255,0.3)", borderRadius: 4, padding: "1px 6px" }}>SUPERADMIN</span>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: "12px 12px", overflowY: "auto" }}>
        {NAV.map(({ href, icon, label, section }) => {
          const active = path === href || (href !== "/admin" && path.startsWith(href));
          const showSection = section && section !== lastSection;
          if (section) lastSection = section;
          return (
            <div key={href}>
              {showSection && (
                <p style={{ fontSize: 8, color: "var(--text-dim)", fontFamily: "var(--font-display)", letterSpacing: "0.2em", textTransform: "uppercase", padding: "10px 12px 4px" }}>{section}</p>
              )}
              <Link href={href} style={{ textDecoration: "none", display: "block", marginBottom: 2 }}>
                <div style={{
                  display: "flex", alignItems: "center", gap: 10,
                  padding: "10px 12px", borderRadius: 8,
                  background: active ? "var(--accent-dim)" : "transparent",
                  border: `1px solid ${active ? "var(--border-purple)" : "transparent"}`,
                  color: active ? "var(--accent)" : "var(--text-muted)",
                  transition: "all 0.2s ease",
                  position: "relative",
                }}>
                  {active && <div style={{ position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)", width: 3, height: 20, background: "var(--accent)", borderRadius: "0 2px 2px 0", boxShadow: "0 0 8px var(--accent-glow)" }} />}
                  <span style={{ fontSize: 14, width: 18, textAlign: "center", flexShrink: 0 }}>{icon}</span>
                  <span style={{ fontSize: 12, fontFamily: "var(--font-display)", letterSpacing: "0.06em", fontWeight: active ? 700 : 400 }}>{label}</span>
                  {active && <div style={{ marginLeft: "auto", width: 5, height: 5, borderRadius: "50%", background: "var(--accent)", boxShadow: "0 0 6px var(--accent-glow)" }} />}
                </div>
              </Link>
            </div>
          );
        })}
      </nav>

      {/* System status */}
      <div style={{ padding: "12px 20px", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        {[
          { label: "API", ok: true }, { label: "DB", ok: true }, { label: "CDN", ok: false },
        ].map(({ label, ok }) => (
          <div key={label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
            <span style={{ fontSize: 9, color: "var(--text-dim)", fontFamily: "var(--font-display)", letterSpacing: "0.12em" }}>{label}</span>
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <div style={{ width: 5, height: 5, borderRadius: "50%", background: ok ? "var(--neon-green)" : "var(--neon-orange)", animation: "pulse-dot 1.5s ease-in-out infinite" }} />
              <span style={{ fontSize: 9, color: ok ? "var(--neon-green)" : "var(--neon-orange)", fontFamily: "var(--font-display)" }}>{ok ? "OK" : "WARN"}</span>
            </div>
          </div>
        ))}
        <Link href="/" style={{ textDecoration: "none" }}>
          <div style={{ fontSize: 10, color: "var(--text-dim)", fontFamily: "var(--font-display)", letterSpacing: "0.1em", marginTop: 8, cursor: "pointer" }}>← BACK TO PORTAL</div>
        </Link>
      </div>
    </aside>
  );
}
