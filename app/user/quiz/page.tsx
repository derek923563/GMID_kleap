"use client";
import { useState } from "react";
import { GlassCard } from "@/components/gmid/GlassCard";
import { NeonBadge } from "@/components/gmid/NeonBadge";
import { XPBar } from "@/components/gmid/XPBar";

const CATEGORIES = [
  { id: "osint",   name: "OSINT",          icon: "🌐", count: 24, color: "var(--brand)",       difficulty: "MEDIUM" },
  { id: "crypto",  name: "Cryptography",   icon: "🔐", count: 18, color: "var(--accent)",      difficulty: "HARD" },
  { id: "network", name: "Networking",     icon: "📡", count: 31, color: "var(--neon-green)",  difficulty: "MEDIUM" },
  { id: "malware", name: "Malware Analysis",icon: "🦠", count: 15, color: "var(--neon-orange)", difficulty: "HARD" },
  { id: "social",  name: "Social Eng.",    icon: "🎭", count: 20, color: "var(--accent)",      difficulty: "EASY" },
  { id: "ctf",     name: "CTF Challenges", icon: "🏁", count: 12, color: "#ffd700",            difficulty: "EXPERT" },
];

const QUIZ_Q = [
  {
    q: "What does OSINT stand for?",
    opts: ["Open Source Intelligence", "Online Security Intelligence", "Operational Signal Intelligence", "Open System Integration"],
    correct: 0,
    explanation: "OSINT stands for Open Source Intelligence — the collection and analysis of data gathered from publicly available sources.",
    xp: 50,
  },
  {
    q: "Which protocol operates on port 443?",
    opts: ["HTTP", "FTP", "HTTPS", "SSH"],
    correct: 2,
    explanation: "HTTPS (HTTP Secure) operates on port 443 and uses TLS/SSL encryption to secure communications.",
    xp: 40,
  },
  {
    q: "What is a 'zero-day' vulnerability?",
    opts: ["A bug fixed in zero days", "An unknown exploit with no patch available", "A vulnerability discovered on day zero of deployment", "A low-severity security flaw"],
    correct: 1,
    explanation: "A zero-day vulnerability is a software flaw unknown to the vendor, meaning there are zero days of protection — no patch exists yet.",
    xp: 60,
  },
];

type Phase = "categories" | "quiz" | "result";

export default function QuizPage() {
  const [phase, setPhase] = useState<Phase>("categories");
  const [selected, setSelected] = useState<string | null>(null);
  const [qIndex, setQIndex] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [totalXP, setTotalXP] = useState(0);

  const q = QUIZ_Q[qIndex];

  function startQuiz(id: string) { setSelected(id); setPhase("quiz"); setQIndex(0); setPicked(null); setRevealed(false); setScore(0); setTotalXP(0); }
  function handlePick(i: number) { if (revealed) return; setPicked(i); }
  function handleReveal() {
    if (picked === null) return;
    setRevealed(true);
    if (picked === q.correct) { setScore(s => s + 1); setTotalXP(x => x + q.xp); }
  }
  function handleNext() {
    if (qIndex + 1 >= QUIZ_Q.length) { setPhase("result"); return; }
    setQIndex(i => i + 1); setPicked(null); setRevealed(false);
  }

  const cat = CATEGORIES.find(c => c.id === selected);

  return (
    <main style={{ padding: "32px 28px", position: "relative", zIndex: 2, fontFamily: "var(--font-sans)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28, flexWrap: "wrap", gap: 12 }}>
        <div>
          <p style={{ fontSize: 10, color: "var(--text-muted)", fontFamily: "var(--font-display)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 4 }}>Knowledge</p>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: 26, fontWeight: 900, color: "var(--text-primary)" }}>
            Quiz <span className="neon-text">Hub</span>
          </h1>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <NeonBadge variant="orange">🔥 7-day streak</NeonBadge>
          <NeonBadge variant="cyan">142 quizzes done</NeonBadge>
        </div>
      </div>

      {phase === "categories" && (
        <>
          {/* Streak banner */}
          <GlassCard variant="purple" neonTop style={{ padding: 20, marginBottom: 24, display: "flex", alignItems: "center", gap: 20 }}>
            <div style={{ fontSize: 36 }}>🔥</div>
            <div style={{ flex: 1 }}>
              <p style={{ fontFamily: "var(--font-display)", fontSize: 14, fontWeight: 700, color: "var(--neon-orange)", letterSpacing: "0.06em" }}>7-Day Streak Active!</p>
              <p style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 3 }}>Complete a quiz today to keep your streak. Bonus: +50 XP on next quiz.</p>
            </div>
            <div style={{ textAlign: "right" }}>
              <p style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 900, color: "var(--neon-orange)" }}>×1.5</p>
              <p style={{ fontSize: 9, color: "var(--text-muted)", fontFamily: "var(--font-display)", letterSpacing: "0.1em" }}>XP MULTIPLIER</p>
            </div>
          </GlassCard>

          <p style={{ fontFamily: "var(--font-display)", fontSize: 11, letterSpacing: "0.15em", color: "var(--text-muted)", textTransform: "uppercase", marginBottom: 16 }}>Select Category</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            {CATEGORIES.map(c => (
              <GlassCard key={c.id} style={{ padding: 22, cursor: "pointer", border: `1px solid ${c.color}22`, transition: "all 0.2s" }}
                onClick={() => startQuiz(c.id)}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                  <div style={{ width: 48, height: 48, borderRadius: 12, background: `${c.color}18`, border: `1px solid ${c.color}44`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>{c.icon}</div>
                  <span style={{ fontSize: 9, fontFamily: "var(--font-display)", letterSpacing: "0.1em", color: c.color, background: `${c.color}18`, border: `1px solid ${c.color}33`, borderRadius: 4, padding: "2px 7px" }}>{c.difficulty}</span>
                </div>
                <p style={{ fontFamily: "var(--font-display)", fontSize: 14, fontWeight: 700, color: "var(--text-primary)", marginBottom: 4 }}>{c.name}</p>
                <p style={{ fontSize: 11, color: "var(--text-muted)" }}>{c.count} questions</p>
                <div style={{ marginTop: 14, display: "flex", justifyContent: "flex-end" }}>
                  <span style={{ fontSize: 10, color: c.color, fontFamily: "var(--font-display)", letterSpacing: "0.1em" }}>START →</span>
                </div>
              </GlassCard>
            ))}
          </div>
        </>
      )}

      {phase === "quiz" && (
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          {/* Progress */}
          <GlassCard style={{ padding: 18, marginBottom: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 18 }}>{cat?.icon}</span>
                <span style={{ fontFamily: "var(--font-display)", fontSize: 12, color: cat?.color, letterSpacing: "0.1em" }}>{cat?.name}</span>
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <span style={{ fontFamily: "var(--font-display)", fontSize: 11, color: "var(--text-muted)" }}>Q {qIndex + 1} / {QUIZ_Q.length}</span>
                <NeonBadge variant="cyan">+{q.xp} XP</NeonBadge>
              </div>
            </div>
            <XPBar current={qIndex} max={QUIZ_Q.length} color={cat?.color} height={4} label={false} />
          </GlassCard>

          {/* Question */}
          <GlassCard neonTop style={{ padding: 28, marginBottom: 16 }}>
            <p style={{ fontFamily: "var(--font-display)", fontSize: 9, letterSpacing: "0.2em", color: "var(--text-muted)", textTransform: "uppercase", marginBottom: 12 }}>Question {qIndex + 1}</p>
            <p style={{ fontSize: 18, color: "var(--text-primary)", lineHeight: 1.5, fontWeight: 500 }}>{q.q}</p>
          </GlassCard>

          {/* Options */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
            {q.opts.map((opt, i) => {
              let bg = "rgba(255,255,255,0.03)";
              let border = "rgba(255,255,255,0.08)";
              let color = "var(--text-primary)";
              if (revealed) {
                if (i === q.correct) { bg = "rgba(57,255,20,0.1)"; border = "rgba(57,255,20,0.4)"; color = "var(--neon-green)"; }
                else if (i === picked && i !== q.correct) { bg = "rgba(255,0,80,0.1)"; border = "rgba(255,0,80,0.4)"; color = "#ff0050"; }
              } else if (picked === i) { bg = "var(--brand-dim)"; border = "var(--border-neon)"; color = "var(--brand)"; }
              return (
                <button key={i} onClick={() => handlePick(i)} style={{
                  display: "flex", alignItems: "center", gap: 14, padding: "14px 18px",
                  borderRadius: 10, border: `1px solid ${border}`, background: bg, color,
                  cursor: revealed ? "default" : "pointer", transition: "all 0.2s", textAlign: "left",
                  fontFamily: "var(--font-sans)", fontSize: 14,
                }}>
                  <div style={{ width: 28, height: 28, borderRadius: 7, border: `1px solid ${border}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-display)", fontSize: 11, flexShrink: 0, color }}>
                    {["A","B","C","D"][i]}
                  </div>
                  {opt}
                  {revealed && i === q.correct && <span style={{ marginLeft: "auto", fontSize: 16 }}>✓</span>}
                  {revealed && i === picked && i !== q.correct && <span style={{ marginLeft: "auto", fontSize: 16 }}>✗</span>}
                </button>
              );
            })}
          </div>

          {/* Explanation */}
          {revealed && (
            <GlassCard style={{ padding: 18, marginBottom: 16, border: "1px solid rgba(0,245,255,0.2)", background: "rgba(0,245,255,0.05)" }}>
              <p style={{ fontSize: 9, fontFamily: "var(--font-display)", letterSpacing: "0.15em", color: "var(--brand)", marginBottom: 6 }}>EXPLANATION</p>
              <p style={{ fontSize: 13, color: "var(--text-primary)", lineHeight: 1.5 }}>{q.explanation}</p>
            </GlassCard>
          )}

          <div style={{ display: "flex", gap: 10 }}>
            {!revealed ? (
              <button onClick={handleReveal} disabled={picked === null} style={{
                flex: 1, padding: "13px", borderRadius: 10, border: "1px solid var(--border-neon)",
                background: picked !== null ? "var(--brand-dim)" : "rgba(255,255,255,0.03)",
                color: picked !== null ? "var(--brand)" : "var(--text-dim)",
                fontFamily: "var(--font-display)", fontSize: 12, letterSpacing: "0.1em", cursor: picked !== null ? "pointer" : "not-allowed",
              }}>SUBMIT ANSWER</button>
            ) : (
              <button onClick={handleNext} style={{
                flex: 1, padding: "13px", borderRadius: 10, border: "1px solid var(--border-neon)",
                background: "var(--brand-dim)", color: "var(--brand)",
                fontFamily: "var(--font-display)", fontSize: 12, letterSpacing: "0.1em", cursor: "pointer",
              }}>{qIndex + 1 >= QUIZ_Q.length ? "SEE RESULTS" : "NEXT QUESTION →"}</button>
            )}
            <button onClick={() => setPhase("categories")} style={{
              padding: "13px 18px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.08)",
              background: "transparent", color: "var(--text-muted)",
              fontFamily: "var(--font-display)", fontSize: 12, cursor: "pointer",
            }}>QUIT</button>
          </div>
        </div>
      )}

      {phase === "result" && (
        <div style={{ maxWidth: 520, margin: "0 auto" }}>
          <GlassCard neonTop style={{ padding: 36, textAlign: "center" }}>
            <div style={{ fontSize: 56, marginBottom: 16 }}>{score === QUIZ_Q.length ? "🏆" : score >= QUIZ_Q.length / 2 ? "⭐" : "💀"}</div>
            <p style={{ fontFamily: "var(--font-display)", fontSize: 11, letterSpacing: "0.2em", color: "var(--text-muted)", textTransform: "uppercase", marginBottom: 8 }}>Quiz Complete</p>
            <p style={{ fontFamily: "var(--font-display)", fontSize: 36, fontWeight: 900, color: "var(--brand)", marginBottom: 4 }}>{score}/{QUIZ_Q.length}</p>
            <p style={{ fontSize: 14, color: "var(--text-muted)", marginBottom: 24 }}>{score === QUIZ_Q.length ? "Perfect score! Outstanding!" : score >= 2 ? "Great work, operative." : "Keep training, recruit."}</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 28 }}>
              <div style={{ background: "rgba(57,255,20,0.08)", border: "1px solid rgba(57,255,20,0.2)", borderRadius: 10, padding: 16 }}>
                <p style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 900, color: "var(--neon-green)" }}>+{totalXP}</p>
                <p style={{ fontSize: 10, color: "var(--text-muted)", fontFamily: "var(--font-display)", letterSpacing: "0.1em" }}>XP EARNED</p>
              </div>
              <div style={{ background: "rgba(0,245,255,0.08)", border: "1px solid rgba(0,245,255,0.2)", borderRadius: 10, padding: 16 }}>
                <p style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 900, color: "var(--brand)" }}>{Math.round((score / QUIZ_Q.length) * 100)}%</p>
                <p style={{ fontSize: 10, color: "var(--text-muted)", fontFamily: "var(--font-display)", letterSpacing: "0.1em" }}>ACCURACY</p>
              </div>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => startQuiz(selected!)} style={{ flex: 1, padding: "12px", borderRadius: 10, border: "1px solid var(--border-neon)", background: "var(--brand-dim)", color: "var(--brand)", fontFamily: "var(--font-display)", fontSize: 11, letterSpacing: "0.1em", cursor: "pointer" }}>RETRY</button>
              <button onClick={() => setPhase("categories")} style={{ flex: 1, padding: "12px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.1)", background: "transparent", color: "var(--text-muted)", fontFamily: "var(--font-display)", fontSize: 11, letterSpacing: "0.1em", cursor: "pointer" }}>CATEGORIES</button>
            </div>
          </GlassCard>
        </div>
      )}
    </main>
  );
}
