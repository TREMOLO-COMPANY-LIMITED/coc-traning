import { google } from "googleapis";

const SCOPES = [
  "https://www.googleapis.com/auth/spreadsheets",
  "https://www.googleapis.com/auth/drive",
  "https://www.googleapis.com/auth/drive.file",
];

export function hasGoogleServiceConfig() {
  return Boolean(
    process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL &&
      process.env.GOOGLE_PRIVATE_KEY &&
      process.env.GOOGLE_SHEETS_ID,
  );
}

function normalizePrivateKey(value?: string) {
  if (!value) return "";
  const trimmed = value.trim();

  if (trimmed.includes("-----BEGIN PRIVATE KEY-----")) {
    return trimmed.replace(/^"|"$/g, "").replace(/\\n/g, "\n");
  }

  try {
    const decoded = Buffer.from(trimmed, "base64").toString("utf8").trim();
    if (decoded.includes("-----BEGIN PRIVATE KEY-----")) {
      return decoded.replace(/\\n/g, "\n");
    }
  } catch {
    // Keep the original value so the auth library can surface a concrete error.
  }

  return trimmed.replace(/^"|"$/g, "").replace(/\\n/g, "\n");
}

export function getGoogleAuth() {
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = normalizePrivateKey(process.env.GOOGLE_PRIVATE_KEY);

  if (!clientEmail || !privateKey) {
    throw new Error("Google service account credentials are not configured.");
  }

  return new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: SCOPES,
  });
}

export function getSheetsClient() {
  return google.sheets({ version: "v4", auth: getGoogleAuth() });
}

export function getDriveClient() {
  return google.drive({ version: "v3", auth: getGoogleAuth() });
}

export function getSpreadsheetId() {
  const spreadsheetId = process.env.GOOGLE_SHEETS_ID;
  if (!spreadsheetId) throw new Error("GOOGLE_SHEETS_ID is not configured.");
  return spreadsheetId;
}
