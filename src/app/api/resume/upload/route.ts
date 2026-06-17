import { NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";
import { randomUUID } from "crypto";
import { requireUser } from "@/lib/auth/require-user";
import { extractTextFromPdf } from "@/lib/utils/pdf-parser";
import { resumeEmbeddingService } from "@/lib/services/ai/resume-embedding.service";

export async function POST(req: Request) {
  let user: { userId: string; role: string };

  try {
    user = await requireUser();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await req.formData();

    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "No file uploaded" },
        { status: 400 }
      );
    }

    if (file.type !== "application/pdf") {
      return NextResponse.json(
        { error: "Only PDF files are allowed" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const fileName = `${randomUUID()}.pdf`;

    const uploadDir = path.join(
      process.cwd(),
      "public/uploads/resumes"
    );

    const filePath = path.join(uploadDir, fileName);

    await writeFile(filePath, buffer);

    const publicPath = `/uploads/resumes/${fileName}`;

    let embeddingStored = false;

    try {
      const text = await extractTextFromPdf(buffer);
      if (text.length > 0) {
        await resumeEmbeddingService.generateAndStore(user.userId, text);
        embeddingStored = true;
      }
    } catch (embeddingError) {
      console.error("[RESUME_EMBEDDING_ERROR]", embeddingError);
    }

    return NextResponse.json({ path: publicPath, embeddingStored });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Upload failed" },
      { status: 500 }
    );
  }
}
