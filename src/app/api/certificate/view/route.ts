import { get } from "@vercel/blob";
import { NextResponse } from "next/server";
import { getErrorMessage, requireUser } from "@/lib/api";

export async function GET(request: Request) {
  const auth = await requireUser();
  if ("error" in auth) return auth.error;

  const { searchParams } = new URL(request.url);
  const pathname = searchParams.get("pathname");

  if (!pathname) {
    return NextResponse.json({ error: "Missing certificate pathname." }, { status: 400 });
  }

  try {
    const result = await get(pathname, {
      access: "private",
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    if (!result || result.statusCode !== 200 || !result.stream) {
      return NextResponse.json({ error: "Certificate not found." }, { status: 404 });
    }

    return new Response(result.stream, {
      headers: {
        "content-type": result.blob.contentType || "application/pdf",
        "content-disposition": `inline; filename="${pathname.split("/").at(-1) || "certificate.pdf"}"`,
        "cache-control": "private, no-store",
      },
    });
  } catch (error) {
    return NextResponse.json({ error: getErrorMessage(error) }, { status: 500 });
  }
}
