import { requireAdmin } from "@/lib/api";
import { getStore } from "@/lib/store";

function csvValue(value: unknown) {
  return `"${String(value ?? "").replace(/"/g, '""')}"`;
}

export async function GET() {
  const auth = await requireAdmin();
  if ("error" in auth) return auth.error;

  const learners = await getStore().listLearners();
  const headers = [
    "employeeId",
    "name",
    "email",
    "department",
    "title",
    "locationCountry",
    "language",
    "completedSessions",
    "averageVideoWatchPercent",
    "latestScore",
    "latestPercentage",
    "latestPassed",
    "attemptCount",
    "weakTopics",
    "certificateUrl",
    "updatedAt",
  ];
  const rows = learners.map((item) => [
    item.profile.employeeId,
    item.profile.name,
    item.profile.email,
    item.profile.department,
    item.profile.title,
    item.profile.locationCountry,
    item.profile.language,
    item.completedSessions,
    item.averageVideoWatchPercent,
    item.latestScore ?? "",
    item.latestPercentage ?? "",
    item.latestPassed ?? "",
    item.attemptCount,
    item.weakTopics,
    item.certificateUrl,
    item.updatedAt,
  ]);
  const csv = [headers, ...rows].map((row) => row.map(csvValue).join(",")).join("\n");

  return new Response(csv, {
    headers: {
      "content-type": "text/csv; charset=utf-8",
      "content-disposition": `attachment; filename="medigroup-coc-learners.csv"`,
    },
  });
}
