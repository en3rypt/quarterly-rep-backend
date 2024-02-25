import PDFMerge from "pdf-merge";
import { promises as fs } from "fs";

export class PDFService {
  async mergePDFs(filePaths: string[], outputPath: string): Promise<void> {
    try {
      const buffer = await PDFMerge(filePaths, { output: outputPath });

      // Success! Do something with the merged PDF buffer
      console.log("PDF merge successful!");

      // Optionally, save the merged PDF to the filesystem:
      await fs.writeFile(outputPath, buffer);
    } catch (error) {
      console.error("PDF merge failed:", error);
      // Handle the error appropriately (e.g., throw an exception)
    }
  }
}
