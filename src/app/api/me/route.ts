import { NextResponse } from "next/server";
import { getErrorMessage, requireUser } from "@/lib/api";
import { isAdminEmail } from "@/lib/auth";
import { getStore } from "@/lib/store";

export async function GET() {
  const auth = await requireUser();
  if ("error" in auth) return auth.error;

  try {
    const store = getStore();
    const { profile, progress, attempts, certificates } = await store.getLearnerData(
      auth.user.email,
    );

    return NextResponse.json({
      user: auth.user,
      profile,
      progress,
      attempts,
      certificates,
      isAdmin: isAdminEmail(auth.user.email),
    });
  } catch (error) {
    return NextResponse.json({ error: getErrorMessage(error) }, { status: 500 });
  }
}
