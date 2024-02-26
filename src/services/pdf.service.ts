// import PDFMerge from "pdf-merge";
// import { PDFDocument } from "pdf-lib";
// import { promises as fs } from "fs";

// export class PDFService {
//   async mergePDFs(filePaths: string[], outputPath: string): Promise<void> {
//     try {
//       const buffer = await PDFMerge(filePaths, { output: outputPath });

//       // Success! Do something with the merged PDF buffer
//       console.log("PDF merge successful!");

//       // Optionally, save the merged PDF to the filesystem:
//       await fs.writeFile(outputPath, buffer);
//     } catch (error) {
//       console.error("PDF merge failed:", error);
//       // Handle the error appropriately (e.g., throw an exception)
//     }
//   }
// }

import { PDFDocument } from "pdf-lib";
import { promises as fs } from "fs";

export class PDFService {
  async mergePDFs(
    pdfFilePaths: string[],
    outputFilePath: string
  ): Promise<void> {
    const mergedPdf = await PDFDocument.create();

    for (const filePath of pdfFilePaths) {
      const pdfBytes = await fs.readFile(filePath);
      const pdfDoc = await PDFDocument.load(pdfBytes);
      const copiedPages = await mergedPdf.copyPages(
        pdfDoc,
        pdfDoc.getPageIndices()
      );
      copiedPages.forEach((page) => mergedPdf.addPage(page));
    }

    const mergedPdfBytes = await mergedPdf.save();
    await fs.writeFile(outputFilePath, mergedPdfBytes);
  }
}
