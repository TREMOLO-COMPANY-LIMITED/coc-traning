import { NextResponse } from "next/server";
import { requireUser } from "@/lib/api";
import { getGoogleAuth } from "@/lib/google";
import { getSessionVideoFileId, SESSIONS } from "@/lib/training-content";

export const runtime = "nodejs";

export async function GET(
  request: Request,
  context: { params: Promise<{ sessionId: string }> },
) {
  const auth = await requireUser();
  if ("error" in auth) return auth.error;

  const { sessionId } = await context.params;
  const index = Number(sessionId);
  if (!Number.isInteger(index) || index < 0 || index >= SESSIONS.en.length) {
    return NextResponse.json({ error: "Invalid sessionId." }, { status: 400 });
  }

  const fileId = getSessionVideoFileId(index);
  if (!fileId) {
    return NextResponse.json({ error: "Video file is not configured." }, { status: 404 });
  }

  const client = getGoogleAuth();
  const { token } = await client.getAccessToken();
  const range = request.headers.get("range");
  const driveResponse = await fetch(
    `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`,
    {
      headers: {
        authorization: `Bearer ${token}`,
        ...(range ? { range } : {}),
      },
    },
  );

  if (!driveResponse.ok) {
    console.error(
      `Video ${index + 1} failed to load from Google Drive. Status: ${driveResponse.status}. Check TRAINING_VIDEO_${index + 1}_DRIVE_FILE_ID and service account sharing.`,
    );
  }

  return new Response(driveResponse.body, {
    status: driveResponse.status,
    headers: {
      "content-type": driveResponse.headers.get("content-type") || "video/mp4",
      "content-length": driveResponse.headers.get("content-length") || "",
      "content-range": driveResponse.headers.get("content-range") || "",
      "accept-ranges": "bytes",
    },
  });
}
