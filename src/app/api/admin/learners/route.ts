import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/api";
import { getStore } from "@/lib/store";

export async function GET(request: Request) {
  const auth = await requireAdmin();
  if ("error" in auth) return auth.error;

  const { searchParams } = new URL(request.url);
  const department = searchParams.get("department")?.toLowerCase();
  const title = searchParams.get("title")?.toLowerCase();
  const locationCountry = searchParams.get("locationCountry")?.toLowerCase();
  const language = searchParams.get("language")?.toLowerCase();

  const learners = (await getStore().listLearners()).filter((item) => {
    const profile = item.profile;
    return (
      (!department || profile.department.toLowerCase().includes(department)) &&
      (!title || profile.title.toLowerCase().includes(title)) &&
      (!locationCountry || profile.locationCountry.toLowerCase().includes(locationCountry)) &&
      (!language || profile.language.toLowerCase() === language)
    );
  });

  return NextResponse.json({ learners });
}
