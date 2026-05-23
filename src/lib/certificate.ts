import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { put } from "@vercel/blob";

function escapePdfText(value: string) {
  return value
    .replace(/[^\x20-\x7E]/g, "")
    .replace(/\\/g, "\\\\")
    .replace(/\(/g, "\\(")
    .replace(/\)/g, "\\)");
}

function makePdfLine(text: string, x: number, y: number, size = 14) {
  return `BT /F1 ${size} Tf ${x} ${y} Td (${escapePdfText(text)}) Tj ET`;
}

export async function buildCertificatePdf(input: {
  name: string;
  email: string;
  score: number;
  percentage: number;
  issuedAt: string;
}) {
  const issuedDate = new Date(input.issuedAt).toLocaleDateString("en-GB");
  const lines = [
    makePdfLine("MEDIGROUP ASIA", 235, 760, 12),
    makePdfLine("Certificate of Completion", 155, 700, 30),
    makePdfLine("Code of Conduct Training", 210, 662, 15),
    makePdfLine("This is to certify that", 225, 595, 12),
    makePdfLine(input.name, 190, 548, 28),
    makePdfLine("has successfully completed the MediGroup Code of Conduct Training Programme", 82, 490),
    makePdfLine("comprising 6 learning sessions, required video viewing, and a final assessment.", 70, 468),
    makePdfLine(`Score: ${input.score} / 20 | ${input.percentage}%`, 210, 420, 16),
    makePdfLine(`Date of completion: ${issuedDate}`, 205, 365, 11),
    makePdfLine(input.email, 225, 345, 11),
  ].join("\n");

  const objects = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
    `<< /Length ${Buffer.byteLength(lines, "utf8")} >>\nstream\n${lines}\nendstream`,
  ];

  let pdf = "%PDF-1.4\n";
  const offsets = [0];
  objects.forEach((object, index) => {
    offsets.push(Buffer.byteLength(pdf, "utf8"));
    pdf += `${index + 1} 0 obj\n${object}\nendobj\n`;
  });
  const xrefOffset = Buffer.byteLength(pdf, "utf8");
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  offsets.slice(1).forEach((offset) => {
    pdf += `${String(offset).padStart(10, "0")} 00000 n \n`;
  });
  pdf += `trailer << /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`;

  return Buffer.from(pdf, "utf8");
}

export async function uploadCertificatePdf(fileName: string, pdf: Buffer) {
  const safeFileName = fileName.replace(/[^a-zA-Z0-9._-]/g, "_");
  const blobPath = `certificates/${safeFileName}`;

  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const blob = await put(blobPath, pdf, {
      access: "public",
      contentType: "application/pdf",
      token: process.env.BLOB_READ_WRITE_TOKEN,
      addRandomSuffix: false,
    });
    return blob.url;
  }

  const outputDir = path.join(process.cwd(), "public", "certificates");
  await mkdir(outputDir, { recursive: true });
  await writeFile(path.join(outputDir, safeFileName), pdf);
  return `/${blobPath}`;
}
