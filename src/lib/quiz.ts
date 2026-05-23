import type { Lang } from "./training-content";
import { PASSING_SCORE, QUESTIONS } from "./training-content";

export function gradeQuiz(language: Lang, answers: number[]) {
  const questions = QUESTIONS[language];
  const score = questions.reduce((total, question, index) => {
    return total + (answers[index] === question.c ? 1 : 0);
  }, 0);
  const percentage = Math.round((score / questions.length) * 100);

  const tagTotals: Record<string, number> = {};
  const tagCorrect: Record<string, number> = {};
  questions.forEach((question, index) => {
    tagTotals[question.tag] = (tagTotals[question.tag] || 0) + 1;
    tagCorrect[question.tag] =
      (tagCorrect[question.tag] || 0) + (answers[index] === question.c ? 1 : 0);
  });

  const weakTopics =
    Object.keys(tagTotals)
      .filter((tag) => (tagCorrect[tag] || 0) / tagTotals[tag] < 0.5)
      .join(", ") || "None";

  return {
    score,
    percentage,
    passed: score >= PASSING_SCORE,
    weakTopics,
  };
}
