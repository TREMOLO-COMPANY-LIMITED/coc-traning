import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions, isAdminEmail } from "./auth";

export async function requireUser() {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;
  if (!email) {
    return { error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) };
  }
  return {
    session,
    user: {
      googleId: session.user?.id || email,
      name: session.user?.name || "",
      email,
    },
  };
}

export async function requireAdmin() {
  const result = await requireUser();
  if ("error" in result) return result;
  if (!isAdminEmail(result.user.email)) {
    return { error: NextResponse.json({ error: "Forbidden" }, { status: 403 }) };
  }
  return result;
}

export function jsonError(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

export function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  if (typeof error === "object" && error && "message" in error) {
    return String((error as { message?: unknown }).message);
  }
  return "Unexpected server error.";
}
