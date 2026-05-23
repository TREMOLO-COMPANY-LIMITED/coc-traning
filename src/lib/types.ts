import type { Lang } from "./training-content";

export type UserProfile = {
  googleId: string;
  employeeId: string;
  name: string;
  email: string;
  department: string;
  title: string;
  locationCountry: string;
  language: Lang;
  createdAt: string;
  updatedAt: string;
};

export type SessionProgress = {
  email: string;
  sessionId: string;
  videoWatchPercent: number;
  completed: boolean;
  completedAt: string;
  updatedAt: string;
};

export type QuizAttempt = {
  attemptId: string;
  email: string;
  language: Lang;
  score: number;
  percentage: number;
  passed: boolean;
  answersJson: string;
  weakTopics: string;
  startedAt: string;
  submittedAt: string;
};

export type CertificateRecord = {
  certificateId: string;
  email: string;
  attemptId: string;
  score: number;
  percentage: number;
  issuedAt: string;
  driveFileUrl: string;
};

export type LearnerSummary = {
  profile: UserProfile;
  completedSessions: number;
  averageVideoWatchPercent: number;
  latestScore: number | null;
  latestPercentage: number | null;
  latestPassed: boolean | null;
  attemptCount: number;
  weakTopics: string;
  certificateUrl: string;
  updatedAt: string;
};
