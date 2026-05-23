import { NextResponse } from "next/server";
import { requireUser } from "@/lib/api";
import { gradeQuiz } from "@/lib/quiz";
import { getStore, makeAttempt } from "@/lib/store";
import { QUESTIONS, SESSIONS, type Lang } from "@/lib/training-content";

export async function POST(request: Request) {
  const auth = await requireUser();
  if ("error" in auth) return auth.error;

  const store = getStore();
  const progress = await store.listProgress(auth.user.email);
  const completedSessions = progress.filter((item) => item.completed).length;
  if (completedSessions < SESSIONS.en.length) {
    return NextResponse.json({ error: "All sessions must be completed first." }, { status: 400 });
  }

  const body = await request.json();
  const language: Lang = body.language === "vi" ? "vi" : "en";
  const answers = Array.isArray(body.answers) ? body.answers.map(Number) : [];

  if (
    answers.length !== QUESTIONS[language].length ||
    answers.some((answer: number) => answer < 0)
  ) {
    return NextResponse.json({ error: "All quiz questions must be answered." }, { status: 400 });
  }

  const grade = gradeQuiz(language, answers);
  const attempt = makeAttempt({
    email: auth.user.email,
    language,
    score: grade.score,
    percentage: grade.percentage,
    passed: grade.passed,
    answersJson: JSON.stringify(answers),
    weakTopics: grade.weakTopics,
    startedAt: String(body.startedAt || new Date().toISOString()),
  });

  await store.appendAttempt(attempt);
  return NextResponse.json({ attempt });
}
