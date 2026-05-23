"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  PASSING_SCORE,
  QUESTIONS,
  SESSIONS,
  VIDEO_COMPLETION_THRESHOLD,
  type Lang,
} from "@/lib/training-content";
import type {
  CertificateRecord,
  LearnerSummary,
  QuizAttempt,
  SessionProgress,
  UserProfile,
} from "@/lib/types";

type MePayload = {
  profile: UserProfile | null;
  progress: SessionProgress[];
  attempts: QuizAttempt[];
  certificates: CertificateRecord[];
  isAdmin: boolean;
};

async function readApiError(response: Response, fallback: string) {
  const text = await response.text();
  if (!text) return fallback;
  try {
    const data = JSON.parse(text) as { error?: string };
    return data.error || fallback;
  } catch {
    return text.slice(0, 500) || fallback;
  }
}

const emptyProfile = {
  employeeId: "",
  name: "",
  department: "",
  title: "",
  locationCountry: "",
  language: "en" as Lang,
};

export default function Home() {
  const { data: session, status } = useSession();
  const [me, setMe] = useState<MePayload | null>(null);
  const [profileForm, setProfileForm] = useState(emptyProfile);
  const [language, setLanguage] = useState<Lang>("en");
  const [active, setActive] = useState<"learn" | "quiz" | "result" | "admin">("learn");
  const [sessionIndex, setSessionIndex] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);
  const [quizStartedAt, setQuizStartedAt] = useState("");
  const [latestAttempt, setLatestAttempt] = useState<QuizAttempt | null>(null);
  const [adminLearners, setAdminLearners] = useState<LearnerSummary[]>([]);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  const loadMe = useCallback(async () => {
    const response = await fetch("/api/me");
    if (!response.ok) return;
    const data = (await response.json()) as MePayload;
    setMe(data);
    if (data.profile) {
      setLanguage(data.profile.language);
      setProfileForm({
        employeeId: data.profile.employeeId,
        name: data.profile.name,
        department: data.profile.department,
        title: data.profile.title,
        locationCountry: data.profile.locationCountry,
        language: data.profile.language,
      });
    } else if (session?.user) {
      setProfileForm((current) => ({ ...current, name: session.user?.name || "" }));
    }
  }, [session]);

  useEffect(() => {
    // Login state is external to this component; fetch the server-side learner record once it is available.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (status === "authenticated") void loadMe();
  }, [status, loadMe]);

  const progressBySession = useMemo(() => {
    return new Map((me?.progress || []).map((item) => [Number(item.sessionId), item]));
  }, [me]);
  const completedSessions = [...progressBySession.values()].filter((item) => item.completed).length;
  const allSessionsDone = completedSessions >= SESSIONS.en.length;
  const latestPassedAttempt = (me?.attempts || []).filter((item) => item.passed).at(-1);
  const certificate = (me?.certificates || []).at(-1);

  async function saveProfile() {
    setBusy(true);
    setMessage("");
    const response = await fetch("/api/profile", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(profileForm),
    });
    setBusy(false);
    if (!response.ok) {
      setMessage(await readApiError(response, "Profile save failed."));
      return;
    }
    await loadMe();
  }

  async function saveProgress(percent: number) {
    const response = await fetch("/api/progress/session", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ sessionId: sessionIndex, videoWatchPercent: percent }),
    });
    if (response.ok) await loadMe();
  }

  function startQuiz() {
    if (!allSessionsDone) {
      setMessage("Complete all six sessions and reach 90% viewing on each video first.");
      return;
    }
    setQuizAnswers(new Array(QUESTIONS[language].length).fill(-1));
    setQuizStartedAt(new Date().toISOString());
    setLatestAttempt(null);
    setActive("quiz");
    setMessage("");
  }

  async function submitQuiz() {
    setBusy(true);
    const response = await fetch("/api/quiz/attempt", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ language, answers: quizAnswers, startedAt: quizStartedAt }),
    });
    setBusy(false);
    if (!response.ok) {
      setMessage((await response.json()).error || "Quiz submission failed.");
      return;
    }
    const data = (await response.json()) as { attempt: QuizAttempt };
    setLatestAttempt(data.attempt);
    setActive("result");
    await loadMe();
  }

  async function issueCertificate(attemptId: string) {
    setBusy(true);
    const response = await fetch("/api/certificate", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ attemptId }),
    });
    setBusy(false);
    if (!response.ok) {
      setMessage((await response.json()).error || "Certificate generation failed.");
      return;
    }
    await loadMe();
  }

  async function loadAdmin() {
    setActive("admin");
    const response = await fetch("/api/admin/learners");
    if (response.ok) setAdminLearners((await response.json()).learners);
  }

  if (status === "loading") {
    return <div className="center-screen">Loading training portal...</div>;
  }

  if (!session) {
    return (
      <main className="gate">
        <section className="gate-panel">
          <div className="brand-kicker">MediGroup Asia</div>
          <h1>Code of Conduct Training</h1>
          <p>
            Sign in with Google to access the annual compliance programme, track completion, and
            receive a certificate after passing the final assessment.
          </p>
          <button className="primary-btn" onClick={() => signIn("google")}>
            Continue with Google
          </button>
        </section>
      </main>
    );
  }

  if (!me?.profile) {
    return (
      <main className="gate">
        <section className="profile-panel">
          <div className="brand-kicker">Learner profile</div>
          <h1>Confirm your employee details</h1>
          <div className="form-grid">
            <input
              value={profileForm.employeeId}
              onChange={(e) => setProfileForm({ ...profileForm, employeeId: e.target.value })}
              placeholder="Employee ID"
            />
            <input
              value={profileForm.name}
              onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
              placeholder="Full name"
            />
            <input value={session.user?.email || ""} disabled />
            <input
              value={profileForm.department}
              onChange={(e) => setProfileForm({ ...profileForm, department: e.target.value })}
              placeholder="Department"
            />
            <input
              value={profileForm.title}
              onChange={(e) => setProfileForm({ ...profileForm, title: e.target.value })}
              placeholder="Title"
            />
            <input
              value={profileForm.locationCountry}
              onChange={(e) =>
                setProfileForm({ ...profileForm, locationCountry: e.target.value })
              }
              placeholder="Location / Country"
            />
            <select
              value={profileForm.language}
              onChange={(e) =>
                setProfileForm({ ...profileForm, language: e.target.value as Lang })
              }
            >
              <option value="en">English</option>
              <option value="vi">Tiếng Việt</option>
            </select>
          </div>
          {message && <p className="error-text">{message}</p>}
          <button className="primary-btn" disabled={busy} onClick={saveProfile}>
            Save and start training
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className="portal">
      <aside className="sidebar">
        <div className="brand-block">
          <span>MediGroup</span>
          <strong>COC Training</strong>
        </div>
        <nav>
          <button className={active === "learn" ? "active" : ""} onClick={() => setActive("learn")}>
            Learning content
          </button>
          <button className={active === "quiz" ? "active" : ""} onClick={startQuiz}>
            Final quiz
          </button>
          {me.isAdmin && (
            <button className={active === "admin" ? "active" : ""} onClick={loadAdmin}>
              Admin dashboard
            </button>
          )}
        </nav>
        <div className="progress-box">
          <span>Progress</span>
          <strong>
            {completedSessions}/{SESSIONS.en.length} sessions
          </strong>
          <div className="track">
            <div style={{ width: `${Math.round((completedSessions / SESSIONS.en.length) * 100)}%` }} />
          </div>
        </div>
      </aside>

      <section className="workspace">
        <header className="topbar">
          <div>
            <strong>{me.profile.name}</strong>
            <span>{me.profile.department}</span>
          </div>
          <div className="top-actions">
            <select value={language} onChange={(e) => setLanguage(e.target.value as Lang)}>
              <option value="en">EN</option>
              <option value="vi">VI</option>
            </select>
            <button onClick={() => signOut()}>Sign out</button>
          </div>
        </header>
        {message && <div className="notice">{message}</div>}
        {active === "learn" && (
          <LearningView
            language={language}
            sessionIndex={sessionIndex}
            setSessionIndex={setSessionIndex}
            progressBySession={progressBySession}
            saveProgress={saveProgress}
            startQuiz={startQuiz}
          />
        )}
        {active === "quiz" && (
          <QuizView
            language={language}
            answers={quizAnswers}
            setAnswers={setQuizAnswers}
            submitQuiz={submitQuiz}
            busy={busy}
          />
        )}
        {active === "result" && (
          <ResultView
            attempt={latestAttempt}
            certificate={certificate || null}
            issueCertificate={issueCertificate}
            busy={busy}
            latestPassedAttempt={latestPassedAttempt || null}
          />
        )}
        {active === "admin" && <AdminView learners={adminLearners} />}
      </section>
    </main>
  );
}

function LearningView({
  language,
  sessionIndex,
  setSessionIndex,
  progressBySession,
  saveProgress,
  startQuiz,
}: {
  language: Lang;
  sessionIndex: number;
  setSessionIndex: (index: number) => void;
  progressBySession: Map<number, SessionProgress>;
  saveProgress: (percent: number) => Promise<void>;
  startQuiz: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoError, setVideoError] = useState<{ sessionIndex: number; message: string } | null>(
    null,
  );
  const session = SESSIONS[language][sessionIndex];
  const progress = progressBySession.get(sessionIndex);
  const maxUnlocked = Math.min(
    SESSIONS.en.length - 1,
    [...progressBySession.values()].filter((item) => item.completed).length,
  );
  const allDone = [...progressBySession.values()].filter((item) => item.completed).length >= 6;

  function handleVideoProgress() {
    const video = videoRef.current;
    if (!video?.duration || Number.isNaN(video.duration)) return;
    const percent = Math.round((video.currentTime / video.duration) * 100);
    if (percent >= VIDEO_COMPLETION_THRESHOLD && !(progress?.completed)) {
      void saveProgress(percent);
    }
  }

  return (
    <div className="learning-layout">
      <div className="session-list">
        {SESSIONS[language].map((item, index) => {
          const done = progressBySession.get(index)?.completed;
          const locked = index > maxUnlocked;
          return (
            <button
              key={item.tag}
              disabled={locked}
              className={index === sessionIndex ? "active" : ""}
              onClick={() => setSessionIndex(index)}
            >
              <span>{done ? "✓" : locked ? "🔒" : "▶"}</span>
              {item.tag}
            </button>
          );
        })}
      </div>
      <article className="content-card">
        <div className="eyebrow">{session.tag}</div>
        <h1>{session.title}</h1>
        <p className="muted">
          {session.desc} · {session.duration}
        </p>
        <video
          ref={videoRef}
          controls
          className="video"
          src={`/api/video/${sessionIndex}`}
          onTimeUpdate={handleVideoProgress}
          onEnded={() => void saveProgress(100)}
          onError={() =>
            setVideoError({
              sessionIndex,
              message: `Video could not be loaded. Check TRAINING_VIDEO_${sessionIndex + 1}_DRIVE_FILE_ID, Google Drive file sharing, and Google Drive API access.`,
            })
          }
        />
        {videoError?.sessionIndex === sessionIndex && (
          <p className="error-banner">{videoError.message}</p>
        )}
        <p className="video-note">
          Completion requires {VIDEO_COMPLETION_THRESHOLD}% viewing. Current recorded watch:{" "}
          {progress?.videoWatchPercent || 0}%.
        </p>
        <section className="key-card">
          <h2>Key points</h2>
          {session.keyPoints.map((item) => (
            <p key={item}>{item}</p>
          ))}
        </section>
        <section className="scenario-card">
          <h2>Scenario</h2>
          <p>{session.scenario.sit}</p>
          <details>
            <summary>Show guidance</summary>
            <p>{session.scenario.ans}</p>
          </details>
        </section>
        <div className="footer-actions">
          <button disabled={sessionIndex === 0} onClick={() => setSessionIndex(sessionIndex - 1)}>
            Previous
          </button>
          {sessionIndex < SESSIONS.en.length - 1 ? (
            <button
              disabled={!progress?.completed}
              className="primary-btn"
              onClick={() => setSessionIndex(sessionIndex + 1)}
            >
              Next session
            </button>
          ) : (
            <button disabled={!allDone} className="primary-btn" onClick={startQuiz}>
              Start final quiz
            </button>
          )}
        </div>
      </article>
    </div>
  );
}

function QuizView({
  language,
  answers,
  setAnswers,
  submitQuiz,
  busy,
}: {
  language: Lang;
  answers: number[];
  setAnswers: (answers: number[]) => void;
  submitQuiz: () => Promise<void>;
  busy: boolean;
}) {
  const questions = QUESTIONS[language];
  const complete = answers.length === questions.length && answers.every((answer) => answer >= 0);

  return (
    <article className="content-card">
      <div className="eyebrow">Final assessment</div>
      <h1>Code of Conduct Quiz</h1>
      <p className="muted">
        Fixed order assessment. Passing score: {PASSING_SCORE}/{questions.length}.
      </p>
      <div className="quiz-stack">
        {questions.map((question, questionIndex) => (
          <section className="question-card" key={`${question.tag}-${questionIndex}`}>
            <span>{question.tag}</span>
            <h2>
              {questionIndex + 1}. {question.text}
            </h2>
            {question.opts.map((option, optionIndex) => {
              const chosen = answers[questionIndex] === optionIndex;
              const answered = answers[questionIndex] >= 0;
              const correct = question.c === optionIndex;
              return (
                <button
                  key={option}
                  className={chosen ? "chosen" : ""}
                  onClick={() => {
                    const next = [...answers];
                    next[questionIndex] = optionIndex;
                    setAnswers(next);
                  }}
                >
                  {option}
                  {answered && correct && <strong> Correct</strong>}
                </button>
              );
            })}
            {answers[questionIndex] >= 0 && <p className="explanation">{question.exp}</p>}
          </section>
        ))}
      </div>
      <div className="footer-actions">
        <span>
          Answered {answers.filter((answer) => answer >= 0).length}/{questions.length}
        </span>
        <button disabled={!complete || busy} className="primary-btn" onClick={submitQuiz}>
          Submit assessment
        </button>
      </div>
    </article>
  );
}

function ResultView({
  attempt,
  certificate,
  issueCertificate,
  busy,
  latestPassedAttempt,
}: {
  attempt: QuizAttempt | null;
  certificate: CertificateRecord | null;
  issueCertificate: (attemptId: string) => Promise<void>;
  busy: boolean;
  latestPassedAttempt: QuizAttempt | null;
}) {
  const currentAttempt = attempt || latestPassedAttempt;
  if (!currentAttempt) return <div className="content-card">No completed attempt yet.</div>;

  return (
    <article className="result-card">
      <div className={currentAttempt.passed ? "score-ring" : "score-ring fail"}>
        <strong>{currentAttempt.score}</strong>
        <span>/20</span>
      </div>
      <h1>{currentAttempt.passed ? "Passed" : "Re-training required"}</h1>
      <p>
        Score {currentAttempt.score}/20 ({currentAttempt.percentage}%). Passing requires{" "}
        {PASSING_SCORE}/20.
      </p>
      {currentAttempt.weakTopics && <p>Weak topics: {currentAttempt.weakTopics}</p>}
      {currentAttempt.passed && (
        <div className="footer-actions center">
          {certificate ? (
            <a className="primary-btn" href={certificate.driveFileUrl} target="_blank">
              Open certificate
            </a>
          ) : (
            <button
              className="primary-btn"
              disabled={busy}
              onClick={() => issueCertificate(currentAttempt.attemptId)}
            >
              Generate certificate
            </button>
          )}
        </div>
      )}
    </article>
  );
}

function AdminView({ learners }: { learners: LearnerSummary[] }) {
  return (
    <article className="content-card admin-card">
      <div className="admin-head">
        <div>
          <div className="eyebrow">Admin</div>
          <h1>Learner progress</h1>
        </div>
        <a className="secondary-btn" href="/api/admin/export">
          Export CSV
        </a>
      </div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Department</th>
              <th>Progress</th>
              <th>Score</th>
              <th>Attempts</th>
              <th>Certificate</th>
            </tr>
          </thead>
          <tbody>
            {learners.map((learner) => (
              <tr key={learner.profile.email}>
                <td>
                  <strong>{learner.profile.name}</strong>
                  <span>{learner.profile.email}</span>
                </td>
                <td>{learner.profile.department}</td>
                <td>
                  {learner.completedSessions}/6 · {learner.averageVideoWatchPercent}% avg
                </td>
                <td>
                  {learner.latestScore === null
                    ? "Not attempted"
                    : `${learner.latestScore}/20 (${learner.latestPassed ? "Pass" : "Fail"})`}
                </td>
                <td>{learner.attemptCount}</td>
                <td>
                  {learner.certificateUrl ? (
                    <a href={learner.certificateUrl} target="_blank">
                      Open
                    </a>
                  ) : (
                    "None"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </article>
  );
}
