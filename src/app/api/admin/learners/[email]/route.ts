import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/api";
import { getStore } from "@/lib/store";

export async function GET(
  _request: Request,
  context: { params: Promise<{ email: string }> },
) {
  const auth = await requireAdmin();
  if ("error" in auth) return auth.error;

  const { email } = await context.params;
  const decodedEmail = decodeURIComponent(email);
  const store = getStore();
  const profile = await store.getUser(decodedEmail);

  if (!profile) {
    return NextResponse.json({ error: "Learner not found." }, { status: 404 });
  }

  return NextResponse.json({
    profile,
    progress: await store.listProgress(decodedEmail),
    attempts: await store.listAttempts(decodedEmail),
    certificates: await store.listCertificates(decodedEmail),
  });
}
