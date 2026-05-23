import { NextResponse } from "next/server";
import { getErrorMessage, requireUser } from "@/lib/api";
import { buildCertificatePdf, uploadCertificatePdf } from "@/lib/certificate";
import { getStore, makeCertificate } from "@/lib/store";

export async function POST(request: Request) {
  const auth = await requireUser();
  if ("error" in auth) return auth.error;

  try {
    const { attemptId } = await request.json();
    const store = getStore();
    const profile = await store.getUser(auth.user.email);
    const attempt = (await store.listAttempts(auth.user.email)).find(
      (item) => item.attemptId === attemptId,
    );

    if (!profile || !attempt || !attempt.passed) {
      return NextResponse.json({ error: "A passed attempt is required." }, { status: 400 });
    }

    const issuedAt = new Date().toISOString();
    const pdf = await buildCertificatePdf({
      name: profile.name,
      email: profile.email,
      score: attempt.score,
      percentage: attempt.percentage,
      issuedAt,
    });
    const fileName = `MediGroup_COC_${profile.email}_${attempt.attemptId}.pdf`;
    const driveFileUrl = await uploadCertificatePdf(fileName, pdf);
    const certificate = makeCertificate({
      email: profile.email,
      attemptId: attempt.attemptId,
      score: attempt.score,
      percentage: attempt.percentage,
      driveFileUrl,
    });

    await store.appendCertificate(certificate);
    return NextResponse.json({ certificate });
  } catch (error) {
    return NextResponse.json({ error: getErrorMessage(error) }, { status: 500 });
  }
}
