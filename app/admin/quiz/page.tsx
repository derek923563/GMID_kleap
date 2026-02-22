"use client";
import { useState } from "react";
import { GlassCard } from "@/components/gmid/GlassCard";
import { NeonBadge } from "@/components/gmid/NeonBadge";

interface Question { id: number; q: string; opts: string[]; correct: number; xp: number; difficulty: string; }
interface Quiz { id: number; title: string; category: string; status: "PUBLISHED" | "DRAFT"; questions: Question[]; }

const INIT_QUIZZES: Quiz[] = [
  { id: 1, title: "OSINT Fundamentals",    category: "OSINT",       status: "PUBLISHED", questions: [
    { id: 1, q: "What does OSINT stand for?", opts: ["Open Source Intelligence","Online Security Intelligence","Operational Signal Intelligence","Open System Integration"], correct: 0, xp: 50, difficulty: "EASY" },
    { id: 2, q: "Which tool is commonly used for OSINT?", opts: ["Metasploit","Maltego","Burp Suite","Wireshark"], correct: 1, xp: 60, difficulty: "MEDIUM" },
  ]},
  { id: 2, title: "Cryptography Basics",   category: "Cryptography",status: "PUBLISHED", questions: [
    { id: 1, q: "What is a Caesar cipher?", opts: ["A hash function","A substitution cipher","A block cipher","A stream cipher"], correct: 1, xp: 40, difficulty: "EASY" },
  ]},
  { id: 3, title: "Network Recon",         category: "Networking",  status: "DRAFT",     questions: [] },
];

const BLANK_Q: Omit<Question, "id"> = { q: "", opts: ["", "", "", ""], correct: 0, xp: 50, difficulty: "MEDIUM" };

export default function AdminQuizPage() {
  const [quizzes, setQuizzes] = useState<Quiz[]>(INIT_QUIZZES);
  const [activeQuiz, setActiveQuiz] = useState<number>(1);
  const [showQForm, setShowQForm] = useState(false);
  const [qForm, setQForm] = useState<Omit<Question, "id">>(BLANK_Q);
  const [editQId, setEditQId] = useState<number | null>(null);
  const [newQuizTitle, setNewQuizTitle] = useState("");
  const [newQuizCat, setNewQuizCat] = useState("OSINT");

  const quiz = quizzes.find(q => q.id === activeQuiz)!;

  function saveQuestion() {
    if (!qForm.q.trim()) return;
    setQuizzes(qs => qs.map(q => q.id !== activeQuiz ? q : {
      ...q,
      questions: editQId !== null
        ? q.questions.map(qq => qq.id === editQId ? { ...qForm, id: editQId } : qq)
        : [...q.questions, { ...qForm, id: Date.now() }],
    }));
    setShowQForm(false); setEditQId(null); setQForm(BLANK_Q);
  }

  function deleteQuestion(qid: number) {
    setQuizzes(qs => qs.map(q => q.id !== activeQuiz ? q : { ...q, questions: q.questions.filter(qq => qq.id !== qid) }));
  }

  function togglePublish(id: number) {
    setQuizzes(qs => qs.map(q => q.id !== id ? q : { ...q, status: q.status === "PUBLISHED" ? "DRAFT" : "PUBLISHED" }));
  }

  function addQuiz() {
    if (!newQuizTitle.trim()) return;
    const nq: Quiz = { id: Date.now(), title: newQuizTitle, category: newQuizCat, status: "DRAFT", questions: [] };
    setQuizzes(qs => [...qs, nq]); setActiveQuiz(nq.id); setNewQuizTitle("");
  }

  const DIFF_COLOR: Record<string, string> = { EASY: "var(--neon-green)", MEDIUM: "var(--brand)", HARD: "var(--accent)", EXPERT: "#ffd700" };

  return (
    <main style={{ padding: "32px 28px", position: "relative", zIndex: 2, fontFamily: "var(--font-sans)" }}>
      <div style={{ marginBottom: 28 }}>
        <p style={{ fontSize: 10, color: "var(--text-muted)", fontFamily: "var(--font-display)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 4 }}>Admin</p>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: 26, fontWeight: 900, color: "var(--text-primary)" }}>
          Quiz <span className="neon-text-purple">Builder</span>
        </h1>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: 20 }}>
        {/* Quiz list panel */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <GlassCard style={{ padding: 18 }}>
            <p style={{ fontFamily: "var(--font-display)", fontSize: 10, letterSpacing: "0.15em", color: "var(--text-muted)", textTransform: "uppercase", marginBottom: 12 }}>New Quiz</p>
            <input value={newQuizTitle} onChange={e => setNewQuizTitle(e.target.value)} placeholder="Quiz title..."
              style={{ width: "100%", padding: "8px 12px", borderRadius: 8, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "var(--text-primary)", fontFamily: "var(--font-sans)", fontSize: 12, outline: "none", marginBottom: 8, boxSizing: "border-box" }} />
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 10 }}>
              {["OSINT","Cryptography","Networking","CTF"].map(c => (
                <button key={c} onClick={() => setNewQuizCat(c)} style={{ padding: "4px 9px", borderRadius: 5, border: `1px solid ${newQuizCat === c ? "var(--border-purple)" : "rgba(255,255,255,0.08)"}`, background: newQuizCat === c ? "var(--accent-dim)" : "transparent", color: newQuizCat === c ? "var(--accent)" : "var(--text-muted)", fontFamily: "var(--font-display)", fontSize: 9, cursor: "pointer" }}>{c}</button>
              ))}
            </div>
            <button onClick={addQuiz} style={{ width: "100%", padding: "8px", borderRadius: 8, border: "1px solid var(--border-purple)", background: "var(--accent-dim)", color: "var(--accent)", fontFamily: "var(--font-display)", fontSize: 10, letterSpacing: "0.1em", cursor: "pointer" }}>+ CREATE</button>
          </GlassCard>

          <GlassCard style={{ padding: 0, overflow: "hidden" }}>
            <div style={{ padding: "12px 16px", borderBottom: "1px solid var(--border-subtle)" }}>
              <p style={{ fontFamily: "var(--font-display)", fontSize: 10, letterSpacing: "0.15em", color: "var(--text-muted)", textTransform: "uppercase" }}>Quiz Library</p>
            </div>
            {quizzes.map(q => (
              <div key={q.id} onClick={() => setActiveQuiz(q.id)} style={{ padding: "12px 16px", borderBottom: "1px solid rgba(255,255,255,0.03)", cursor: "pointer", background: activeQuiz === q.id ? "var(--accent-dim)" : "transparent", transition: "background 0.2s" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
                  <p style={{ fontSize: 12, color: activeQuiz === q.id ? "var(--accent)" : "var(--text-primary)", fontWeight: activeQuiz === q.id ? 700 : 400 }}>{q.title}</p>
                  <NeonBadge variant={q.status === "PUBLISHED" ? "green" : "orange"}>{q.status === "PUBLISHED" ? "PUB" : "DRAFT"}</NeonBadge>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <span style={{ fontSize: 9, color: "var(--text-dim)", fontFamily: "var(--font-display)", letterSpacing: "0.08em" }}>{q.category}</span>
                  <span style={{ fontSize: 9, color: "var(--text-dim)", fontFamily: "var(--font-display)" }}>{q.questions.length}Q</span>
                </div>
              </div>
            ))}
          </GlassCard>
        </div>

        {/* Question editor */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {quiz && (
            <>
              <GlassCard neonTop style={{ padding: 20 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
                  <div>
                    <p style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 900, color: "var(--text-primary)" }}>{quiz.title}</p>
                    <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
                      <NeonBadge variant="cyan">{quiz.category}</NeonBadge>
                      <NeonBadge variant={quiz.status === "PUBLISHED" ? "green" : "orange"}>{quiz.status}</NeonBadge>
                      <span style={{ fontSize: 10, color: "var(--text-muted)", fontFamily: "var(--font-display)" }}>{quiz.questions.length} questions</span>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button onClick={() => togglePublish(quiz.id)} style={{ padding: "8px 16px", borderRadius: 8, border: `1px solid ${quiz.status === "PUBLISHED" ? "rgba(255,0,80,0.4)" : "rgba(57,255,20,0.4)"}`, background: quiz.status === "PUBLISHED" ? "rgba(255,0,80,0.1)" : "rgba(57,255,20,0.08)", color: quiz.status === "PUBLISHED" ? "#ff0050" : "var(--neon-green)", fontFamily: "var(--font-display)", fontSize: 10, letterSpacing: "0.1em", cursor: "pointer" }}>
                      {quiz.status === "PUBLISHED" ? "UNPUBLISH" : "PUBLISH"}
                    </button>
                    <button onClick={() => { setQForm(BLANK_Q); setEditQId(null); setShowQForm(true); }} style={{ padding: "8px 16px", borderRadius: 8, border: "1px solid var(--border-purple)", background: "var(--accent-dim)", color: "var(--accent)", fontFamily: "var(--font-display)", fontSize: 10, letterSpacing: "0.1em", cursor: "pointer" }}>+ ADD QUESTION</button>
                  </div>
                </div>
              </GlassCard>

              {/* Questions list */}
              {quiz.questions.length === 0 && (
                <GlassCard style={{ padding: 40, textAlign: "center" }}>
                  <p style={{ fontSize: 32, marginBottom: 12 }}>📝</p>
                  <p style={{ fontFamily: "var(--font-display)", fontSize: 13, color: "var(--text-muted)", letterSpacing: "0.1em" }}>No questions yet. Add your first question.</p>
                </GlassCard>
              )}

              {quiz.questions.map((qq, i) => (
                <GlassCard key={qq.id} style={{ padding: 20 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                    <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                      <div style={{ width: 28, height: 28, borderRadius: 7, background: "var(--brand-dim)", border: "1px solid var(--border-neon)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-display)", fontSize: 11, color: "var(--brand)", flexShrink: 0 }}>Q{i+1}</div>
                      <p style={{ fontSize: 14, color: "var(--text-primary)", fontWeight: 500 }}>{qq.q}</p>
                    </div>
                    <div style={{ display: "flex", gap: 6, alignItems: "center", flexShrink: 0 }}>
                      <span style={{ fontSize: 9, color: DIFF_COLOR[qq.difficulty], fontFamily: "var(--font-display)", background: `${DIFF_COLOR[qq.difficulty]}18`, border: `1px solid ${DIFF_COLOR[qq.difficulty]}33`, borderRadius: 4, padding: "2px 7px" }}>{qq.difficulty}</span>
                      <span style={{ fontSize: 10, color: "var(--neon-green)", fontFamily: "var(--font-display)" }}>+{qq.xp}XP</span>
                      <button className="action-btn action-btn-cyan" onClick={() => { const {id,...r}=qq; setQForm(r); setEditQId(qq.id); setShowQForm(true); }}>Edit</button>
                      <button className="action-btn action-btn-orange" onClick={() => deleteQuestion(qq.id)}>Del</button>
                    </div>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                    {qq.opts.map((opt, oi) => (
                      <div key={oi} style={{ padding: "8px 12px", borderRadius: 7, background: oi === qq.correct ? "rgba(57,255,20,0.08)" : "rgba(255,255,255,0.03)", border: `1px solid ${oi === qq.correct ? "rgba(57,255,20,0.3)" : "rgba(255,255,255,0.06)"}`, display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ fontFamily: "var(--font-display)", fontSize: 10, color: oi === qq.correct ? "var(--neon-green)" : "var(--text-dim)", width: 16 }}>{["A","B","C","D"][oi]}</span>
                        <span style={{ fontSize: 12, color: oi === qq.correct ? "var(--neon-green)" : "var(--text-muted)" }}>{opt}</span>
                        {oi === qq.correct && <span style={{ marginLeft: "auto", fontSize: 11, color: "var(--neon-green)" }}>✓</span>}
                      </div>
                    ))}
                  </div>
                </GlassCard>
              ))}

              {/* Question form */}
              {showQForm && (
                <GlassCard variant="purple" neonTop style={{ padding: 24 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 18 }}>
                    <p style={{ fontFamily: "var(--font-display)", fontSize: 11, letterSpacing: "0.15em", color: "var(--text-muted)", textTransform: "uppercase" }}>{editQId ? "Edit Question" : "New Question"}</p>
                    <button onClick={() => setShowQForm(false)} style={{ background: "none", border: "none", color: "var(--text-dim)", cursor: "pointer", fontSize: 16 }}>✕</button>
                  </div>
                  <div style={{ marginBottom: 14 }}>
                    <p style={{ fontSize: 10, color: "var(--text-muted)", fontFamily: "var(--font-display)", letterSpacing: "0.1em", marginBottom: 6 }}>QUESTION TEXT</p>
                    <textarea value={qForm.q} onChange={e => setQForm(f => ({ ...f, q: e.target.value }))} rows={2}
                      style={{ width: "100%", padding: "9px 12px", borderRadius: 8, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "var(--text-primary)", fontFamily: "var(--font-sans)", fontSize: 13, outline: "none", resize: "none", boxSizing: "border-box" }} />
                  </div>
                  <p style={{ fontSize: 10, color: "var(--text-muted)", fontFamily: "var(--font-display)", letterSpacing: "0.1em", marginBottom: 8 }}>OPTIONS (click to set correct)</p>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 14 }}>
                    {qForm.opts.map((opt, oi) => (
                      <div key={oi} style={{ display: "flex", gap: 6, alignItems: "center" }}>
                        <button onClick={() => setQForm(f => ({ ...f, correct: oi }))} style={{ width: 26, height: 26, borderRadius: 6, border: `1px solid ${qForm.correct === oi ? "var(--neon-green)" : "rgba(255,255,255,0.1)"}`, background: qForm.correct === oi ? "rgba(57,255,20,0.15)" : "transparent", color: qForm.correct === oi ? "var(--neon-green)" : "var(--text-dim)", fontFamily: "var(--font-display)", fontSize: 10, cursor: "pointer", flexShrink: 0 }}>{["A","B","C","D"][oi]}</button>
                        <input value={opt} onChange={e => setQForm(f => { const o=[...f.opts]; o[oi]=e.target.value; return {...f,opts:o}; })}
                          placeholder={`Option ${["A","B","C","D"][oi]}`}
                          style={{ flex: 1, padding: "7px 10px", borderRadius: 7, background: "rgba(255,255,255,0.04)", border: `1px solid ${qForm.correct === oi ? "rgba(57,255,20,0.3)" : "rgba(255,255,255,0.08)"}`, color: "var(--text-primary)", fontFamily: "var(--font-sans)", fontSize: 12, outline: "none" }} />
                      </div>
                    ))}
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
                    <div>
                      <p style={{ fontSize: 10, color: "var(--text-muted)", fontFamily: "var(--font-display)", letterSpacing: "0.1em", marginBottom: 6 }}>XP REWARD</p>
                      <input type="number" value={qForm.xp} onChange={e => setQForm(f => ({ ...f, xp: Number(e.target.value) }))}
                        style={{ width: "100%", padding: "8px 12px", borderRadius: 8, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "var(--text-primary)", fontFamily: "var(--font-sans)", fontSize: 13, outline: "none", boxSizing: "border-box" }} />
                    </div>
                    <div>
                      <p style={{ fontSize: 10, color: "var(--text-muted)", fontFamily: "var(--font-display)", letterSpacing: "0.1em", marginBottom: 6 }}>DIFFICULTY</p>
                      <div style={{ display: "flex", gap: 5 }}>
                        {["EASY","MEDIUM","HARD"].map(d => (
                          <button key={d} onClick={() => setQForm(f => ({ ...f, difficulty: d }))} style={{ flex: 1, padding: "7px 4px", borderRadius: 6, border: `1px solid ${qForm.difficulty === d ? DIFF_COLOR[d]+"66" : "rgba(255,255,255,0.08)"}`, background: qForm.difficulty === d ? `${DIFF_COLOR[d]}18` : "transparent", color: qForm.difficulty === d ? DIFF_COLOR[d] : "var(--text-muted)", fontFamily: "var(--font-display)", fontSize: 9, cursor: "pointer" }}>{d}</button>
                        ))}
                      </div>
                    </div>
                  </div>
                  <button onClick={saveQuestion} style={{ width: "100%", padding: "11px", borderRadius: 10, border: "1px solid var(--border-purple)", background: "var(--accent-dim)", color: "var(--accent)", fontFamily: "var(--font-display)", fontSize: 11, letterSpacing: "0.1em", cursor: "pointer" }}>
                    {editQId ? "SAVE QUESTION" : "ADD QUESTION"}
                  </button>
                </GlassCard>
              )}
            </>
          )}
        </div>
      </div>
    </main>
  );
}
