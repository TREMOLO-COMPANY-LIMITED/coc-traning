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

export function getGoogleAuth() {
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");

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
