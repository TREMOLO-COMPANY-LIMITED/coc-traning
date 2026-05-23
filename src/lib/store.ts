import { randomUUID } from "crypto";
import {
  CertificateRecord,
  LearnerSummary,
  QuizAttempt,
  SessionProgress,
  UserProfile,
} from "./types";
import { getSheetsClient, getSpreadsheetId, hasGoogleServiceConfig } from "./google";

type SheetName = "Users" | "SessionProgress" | "QuizAttempts" | "Certificates";

const HEADERS: Record<SheetName, string[]> = {
  Users: [
    "googleId",
    "employeeId",
    "name",
    "email",
    "department",
    "title",
    "locationCountry",
    "language",
    "createdAt",
    "updatedAt",
  ],
  SessionProgress: [
    "email",
    "sessionId",
    "videoWatchPercent",
    "completed",
    "completedAt",
    "updatedAt",
  ],
  QuizAttempts: [
    "attemptId",
    "email",
    "language",
    "score",
    "percentage",
    "passed",
    "answersJson",
    "weakTopics",
    "startedAt",
    "submittedAt",
  ],
  Certificates: [
    "certificateId",
    "email",
    "attemptId",
    "score",
    "percentage",
    "issuedAt",
    "driveFileUrl",
  ],
};

type Row = Record<string, string>;

export interface TrainingStore {
  getUser(email: string): Promise<UserProfile | null>;
  getLearnerData(email: string): Promise<{
    profile: UserProfile | null;
    progress: SessionProgress[];
    attempts: QuizAttempt[];
    certificates: CertificateRecord[];
  }>;
  upsertUser(profile: UserProfile): Promise<UserProfile>;
  listUsers(): Promise<UserProfile[]>;
  listProgress(email?: string): Promise<SessionProgress[]>;
  upsertSessionProgress(progress: SessionProgress): Promise<SessionProgress>;
  listAttempts(email?: string): Promise<QuizAttempt[]>;
  appendAttempt(attempt: QuizAttempt): Promise<QuizAttempt>;
  listCertificates(email?: string): Promise<CertificateRecord[]>;
  appendCertificate(record: CertificateRecord): Promise<CertificateRecord>;
  listLearners(): Promise<LearnerSummary[]>;
}

function now() {
  return new Date().toISOString();
}

function toRow(headers: string[], item: Record<string, unknown>) {
  return headers.map((header) => String(item[header] ?? ""));
}

function rowsToObjects(headers: string[], values: string[][]): Row[] {
  return values.map((row) =>
    Object.fromEntries(headers.map((header, index) => [header, row[index] ?? ""])),
  );
}

function parseBool(value: string | boolean) {
  return value === true || String(value).toLowerCase() === "true" || value === "Pass";
}

function parseProgress(row: Row): SessionProgress {
  return {
    email: row.email,
    sessionId: row.sessionId,
    videoWatchPercent: Number(row.videoWatchPercent || 0),
    completed: parseBool(row.completed),
    completedAt: row.completedAt,
    updatedAt: row.updatedAt,
  };
}

function parseAttempt(row: Row): QuizAttempt {
  return {
    attemptId: row.attemptId,
    email: row.email,
    language: row.language === "vi" ? "vi" : "en",
    score: Number(row.score || 0),
    percentage: Number(row.percentage || 0),
    passed: parseBool(row.passed),
    answersJson: row.answersJson,
    weakTopics: row.weakTopics,
    startedAt: row.startedAt,
    submittedAt: row.submittedAt,
  };
}

function parseCertificate(row: Row): CertificateRecord {
  return {
    certificateId: row.certificateId,
    email: row.email,
    attemptId: row.attemptId,
    score: Number(row.score || 0),
    percentage: Number(row.percentage || 0),
    issuedAt: row.issuedAt,
    driveFileUrl: row.driveFileUrl,
  };
}

function parseUser(row: Row): UserProfile {
  return {
    googleId: row.googleId,
    employeeId: row.employeeId,
    name: row.name,
    email: row.email,
    department: row.department,
    title: row.title,
    locationCountry: row.locationCountry,
    language: row.language === "vi" ? "vi" : "en",
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  };
}

class SheetsStore implements TrainingStore {
  private ensuredSheets = new Set<SheetName>();

  private async ensureSheet(sheetName: SheetName) {
    if (this.ensuredSheets.has(sheetName)) return;

    const sheets = getSheetsClient();
    const spreadsheetId = getSpreadsheetId();
    const meta = await sheets.spreadsheets.get({ spreadsheetId });
    const exists = meta.data.sheets?.some((sheet) => sheet.properties?.title === sheetName);

    if (!exists) {
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId,
        requestBody: {
          requests: [{ addSheet: { properties: { title: sheetName } } }],
        },
      });
    }

    const headerRange = `${sheetName}!1:1`;
    const header = await sheets.spreadsheets.values.get({ spreadsheetId, range: headerRange });
    if (!header.data.values?.[0]?.length) {
      await sheets.spreadsheets.values.update({
        spreadsheetId,
        range: headerRange,
        valueInputOption: "RAW",
        requestBody: { values: [HEADERS[sheetName]] },
      });
    }

    this.ensuredSheets.add(sheetName);
  }

  private async ensureSheets(sheetNames: SheetName[]) {
    for (const sheetName of sheetNames) {
      await this.ensureSheet(sheetName);
    }
  }

  private async read(sheetName: SheetName): Promise<Row[]> {
    await this.ensureSheet(sheetName);
    const sheets = getSheetsClient();
    const result = await sheets.spreadsheets.values.get({
      spreadsheetId: getSpreadsheetId(),
      range: `${sheetName}!A2:Z`,
    });
    return rowsToObjects(HEADERS[sheetName], (result.data.values as string[][]) || []);
  }

  private async append(sheetName: SheetName, item: Record<string, unknown>) {
    await this.ensureSheet(sheetName);
    await getSheetsClient().spreadsheets.values.append({
      spreadsheetId: getSpreadsheetId(),
      range: `${sheetName}!A:Z`,
      valueInputOption: "RAW",
      insertDataOption: "INSERT_ROWS",
      requestBody: { values: [toRow(HEADERS[sheetName], item)] },
    });
  }

  private async updateRow(sheetName: SheetName, rowIndex: number, item: Record<string, unknown>) {
    await getSheetsClient().spreadsheets.values.update({
      spreadsheetId: getSpreadsheetId(),
      range: `${sheetName}!A${rowIndex}:Z${rowIndex}`,
      valueInputOption: "RAW",
      requestBody: { values: [toRow(HEADERS[sheetName], item)] },
    });
  }

  async getUser(email: string) {
    const user = (await this.listUsers()).find((item) => sameEmail(item.email, email));
    return user || null;
  }

  async getLearnerData(email: string) {
    const sheetNames: SheetName[] = ["Users", "SessionProgress", "QuizAttempts", "Certificates"];
    await this.ensureSheets(sheetNames);

    const result = await getSheetsClient().spreadsheets.values.batchGet({
      spreadsheetId: getSpreadsheetId(),
      ranges: sheetNames.map((sheetName) => `${sheetName}!A2:Z`),
    });
    const rows = Object.fromEntries(
      sheetNames.map((sheetName, index) => [
        sheetName,
        rowsToObjects(
          HEADERS[sheetName],
          (result.data.valueRanges?.[index]?.values as string[][]) || [],
        ),
      ]),
    ) as Record<SheetName, Row[]>;

    return {
      profile:
        rows.Users.map(parseUser).find((item) => sameEmail(item.email, email)) || null,
      progress: rows.SessionProgress.map(parseProgress).filter((item) =>
        sameEmail(item.email, email),
      ),
      attempts: rows.QuizAttempts.map(parseAttempt).filter((item) =>
        sameEmail(item.email, email),
      ),
      certificates: rows.Certificates.map(parseCertificate).filter((item) =>
        sameEmail(item.email, email),
      ),
    };
  }

  async upsertUser(profile: UserProfile) {
    const rows = await this.read("Users");
    const index = rows.findIndex((row) => sameEmail(row.email, profile.email));
    if (index >= 0) {
      const existing = parseUser(rows[index]);
      const next = { ...profile, createdAt: existing.createdAt || profile.createdAt };
      await this.updateRow("Users", index + 2, next);
      return next;
    }
    await this.append("Users", profile);
    return profile;
  }

  async listUsers() {
    return (await this.read("Users")).map(parseUser).filter((user) => user.email);
  }

  async listProgress(email?: string) {
    return (await this.read("SessionProgress"))
      .map(parseProgress)
      .filter((item) => !email || sameEmail(item.email, email));
  }

  async upsertSessionProgress(progress: SessionProgress) {
    const rows = await this.read("SessionProgress");
    const index = rows.findIndex(
      (row) => sameEmail(row.email, progress.email) && row.sessionId === progress.sessionId,
    );
    if (index >= 0) await this.updateRow("SessionProgress", index + 2, progress);
    else await this.append("SessionProgress", progress);
    return progress;
  }

  async listAttempts(email?: string) {
    return (await this.read("QuizAttempts"))
      .map(parseAttempt)
      .filter((item) => !email || sameEmail(item.email, email));
  }

  async appendAttempt(attempt: QuizAttempt) {
    await this.append("QuizAttempts", attempt);
    return attempt;
  }

  async listCertificates(email?: string) {
    return (await this.read("Certificates"))
      .map(parseCertificate)
      .filter((item) => !email || sameEmail(item.email, email));
  }

  async appendCertificate(record: CertificateRecord) {
    await this.append("Certificates", record);
    return record;
  }

  async listLearners() {
    return summarizeLearners(
      await this.listUsers(),
      await this.listProgress(),
      await this.listAttempts(),
      await this.listCertificates(),
    );
  }
}

class MemoryStore implements TrainingStore {
  users = new Map<string, UserProfile>();
  progress = new Map<string, SessionProgress>();
  attempts: QuizAttempt[] = [];
  certificates: CertificateRecord[] = [];

  async getUser(email: string) {
    return this.users.get(email.toLowerCase()) || null;
  }

  async getLearnerData(email: string) {
    return {
      profile: await this.getUser(email),
      progress: await this.listProgress(email),
      attempts: await this.listAttempts(email),
      certificates: await this.listCertificates(email),
    };
  }

  async upsertUser(profile: UserProfile) {
    this.users.set(profile.email.toLowerCase(), profile);
    return profile;
  }

  async listUsers() {
    return [...this.users.values()];
  }

  async listProgress(email?: string) {
    return [...this.progress.values()].filter((item) => !email || sameEmail(item.email, email));
  }

  async upsertSessionProgress(progress: SessionProgress) {
    this.progress.set(`${progress.email.toLowerCase()}:${progress.sessionId}`, progress);
    return progress;
  }

  async listAttempts(email?: string) {
    return this.attempts.filter((item) => !email || sameEmail(item.email, email));
  }

  async appendAttempt(attempt: QuizAttempt) {
    this.attempts.push(attempt);
    return attempt;
  }

  async listCertificates(email?: string) {
    return this.certificates.filter((item) => !email || sameEmail(item.email, email));
  }

  async appendCertificate(record: CertificateRecord) {
    this.certificates.push(record);
    return record;
  }

  async listLearners() {
    return summarizeLearners(
      await this.listUsers(),
      await this.listProgress(),
      await this.listAttempts(),
      await this.listCertificates(),
    );
  }
}

function sameEmail(a: string, b: string) {
  return a.toLowerCase() === b.toLowerCase();
}

function summarizeLearners(
  users: UserProfile[],
  progress: SessionProgress[],
  attempts: QuizAttempt[],
  certificates: CertificateRecord[],
): LearnerSummary[] {
  return users.map((profile) => {
    const userProgress = progress.filter((item) => sameEmail(item.email, profile.email));
    const userAttempts = attempts
      .filter((item) => sameEmail(item.email, profile.email))
      .sort((a, b) => b.submittedAt.localeCompare(a.submittedAt));
    const latest = userAttempts[0];
    const cert = certificates
      .filter((item) => sameEmail(item.email, profile.email))
      .sort((a, b) => b.issuedAt.localeCompare(a.issuedAt))[0];
    const average =
      userProgress.length === 0
        ? 0
        : Math.round(
            userProgress.reduce((sum, item) => sum + item.videoWatchPercent, 0) /
              userProgress.length,
          );

    return {
      profile,
      completedSessions: userProgress.filter((item) => item.completed).length,
      averageVideoWatchPercent: average,
      latestScore: latest?.score ?? null,
      latestPercentage: latest?.percentage ?? null,
      latestPassed: latest?.passed ?? null,
      attemptCount: userAttempts.length,
      weakTopics: latest?.weakTopics || "",
      certificateUrl: cert?.driveFileUrl || "",
      updatedAt: latest?.submittedAt || profile.updatedAt,
    };
  });
}

const globalStore = globalThis as typeof globalThis & { __trainingStore?: TrainingStore };

export function getStore(): TrainingStore {
  if (!globalStore.__trainingStore) {
    globalStore.__trainingStore = hasGoogleServiceConfig() ? new SheetsStore() : new MemoryStore();
  }
  return globalStore.__trainingStore;
}

export function makeProfile(input: Omit<UserProfile, "createdAt" | "updatedAt">): UserProfile {
  const timestamp = now();
  return { ...input, createdAt: timestamp, updatedAt: timestamp };
}

export function makeAttempt(input: Omit<QuizAttempt, "attemptId" | "submittedAt">): QuizAttempt {
  return { ...input, attemptId: randomUUID(), submittedAt: now() };
}

export function makeCertificate(
  input: Omit<CertificateRecord, "certificateId" | "issuedAt">,
): CertificateRecord {
  return { ...input, certificateId: randomUUID(), issuedAt: now() };
}
