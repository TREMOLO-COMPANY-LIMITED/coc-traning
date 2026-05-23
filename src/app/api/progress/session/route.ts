import { NextResponse } from "next/server";
import { requireUser } from "@/lib/api";
import { getStore } from "@/lib/store";
import { SESSIONS, VIDEO_COMPLETION_THRESHOLD } from "@/lib/training-content";

export async function POST(request: Request) {
  const auth = await requireUser();
  if ("error" in auth) return auth.error;

  const body = await request.json();
  const sessionId = Number(body.sessionId);
  const videoWatchPercent = Math.max(0, Math.min(100, Number(body.videoWatchPercent || 0)));

  if (!Number.isInteger(sessionId) || sessionId < 0 || sessionId >= SESSIONS.en.length) {
    return NextResponse.json({ error: "Invalid sessionId." }, { status: 400 });
  }

  const completed = videoWatchPercent >= VIDEO_COMPLETION_THRESHOLD;
  const timestamp = new Date().toISOString();
  const progress = await getStore().upsertSessionProgress({
    email: auth.user.email,
    sessionId: String(sessionId),
    videoWatchPercent,
    completed,
    completedAt: completed ? timestamp : "",
    updatedAt: timestamp,
  });

  return NextResponse.json({ progress });
}
