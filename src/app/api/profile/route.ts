import { NextResponse } from "next/server";
import { getErrorMessage, requireUser } from "@/lib/api";
import { makeProfile, getStore } from "@/lib/store";
import type { Lang } from "@/lib/training-content";

export async function POST(request: Request) {
  const auth = await requireUser();
  if ("error" in auth) return auth.error;

  const body = await request.json();
  const profile = makeProfile({
    googleId: auth.user.googleId,
    employeeId: String(body.employeeId || "").trim(),
    name: String(body.name || auth.user.name || "").trim(),
    email: auth.user.email,
    department: String(body.department || "").trim(),
    title: String(body.title || "").trim(),
    locationCountry: String(body.locationCountry || "").trim(),
    language: body.language === "vi" ? ("vi" as Lang) : ("en" as Lang),
  });

  if (!profile.employeeId || !profile.name || !profile.department || !profile.locationCountry) {
    return NextResponse.json({ error: "Missing required profile fields." }, { status: 400 });
  }

  try {
    const saved = await getStore().upsertUser(profile);
    return NextResponse.json({ profile: saved });
  } catch (error) {
    return NextResponse.json({ error: getErrorMessage(error) }, { status: 500 });
  }
}
