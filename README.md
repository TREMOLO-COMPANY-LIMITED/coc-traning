# MediGroup COC Training

Business-grade Code of Conduct e-learning portal built with Next.js.

## Features

- Google OAuth learner login via NextAuth.
- First-login profile registration with employee attributes.
- Six ordered COC learning sessions in English and Vietnamese.
- Google Drive video delivery through a backend video endpoint.
- 90% video viewing requirement per session.
- Fixed 20-question final quiz with 80% passing score.
- All quiz attempts retained.
- Certificate PDF generation to Vercel Blob after passing, with local fallback to `public/certificates`.
- Google Sheets-backed records for users, session progress, quiz attempts, and certificates.
- Admin dashboard protected by `ADMIN_EMAILS`, with CSV export.

## Setup

Copy `.env.example` to `.env.local` and configure:

- Google OAuth client: `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`
- NextAuth: `NEXTAUTH_URL`, `NEXTAUTH_SECRET`
- Admin allowlist: `ADMIN_EMAILS`
- Service account credentials: `GOOGLE_SERVICE_ACCOUNT_EMAIL`, `GOOGLE_PRIVATE_KEY`
- Records spreadsheet: `GOOGLE_SHEETS_ID`
- Vercel Blob for production certificates: `BLOB_READ_WRITE_TOKEN`
- Training videos: `TRAINING_VIDEO_1_DRIVE_FILE_ID` through `TRAINING_VIDEO_6_DRIVE_FILE_ID`

For Vercel, `GOOGLE_PRIVATE_KEY` can be set either as the raw JSON `private_key` value with escaped newlines, or as a base64-encoded private key. Base64 is safer in hosted environment variable UIs:

```bash
node -e "console.log(Buffer.from(process.env.GOOGLE_PRIVATE_KEY).toString('base64'))"
```

Then paste the base64 output into Vercel as `GOOGLE_PRIVATE_KEY`.

Share the Google Sheet and training video files with the service account email. In production, certificate PDFs are written to Vercel Blob and the Blob URL is recorded in Sheets. If `BLOB_READ_WRITE_TOKEN` is absent, local development writes PDFs to `public/certificates`. The app creates the expected sheet tabs and headers automatically when it first writes data.

If Google service account variables are absent, the app uses an in-memory development store so the UI can be exercised locally. Production should configure Sheets because Google Sheets is the intended system of record.

## Development

```bash
npm run dev
```

Open `http://localhost:3000`.

## Verification

```bash
npm run lint
npm run build
```
