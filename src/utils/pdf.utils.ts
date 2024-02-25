import PDFMerger from "pdf-merger-js";
import { promises as fs } from "fs";

export async function mergePDFs(filePaths: string[], outputPath: string) {
  const merger = new PDFMerger();

  for (const filePath of filePaths) {
    const fileBuffer = await fs.readFile(filePath);
    merger.add(fileBuffer);
  }

  const mergedPdfBuffer = await merger.saveAsBuffer();
  await fs.writeFile(outputPath, mergedPdfBuffer);
}
