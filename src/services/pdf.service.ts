import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { promises as fs } from "fs";
import { Buffer } from "buffer";
import { UserService } from "./user.service";
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

  async createPDFHome(quarter: number, startate: string, enddate: string) {
    const pdfDoc = await PDFDocument.create();

    const imgBuffer = await fs.readFile("./assets/psg_logo.png");
    const psgLogo = await pdfDoc.embedPng(imgBuffer);
    const page = pdfDoc.addPage();
    const { width: pageWidth } = page.getSize();

    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    //title
    let fontSize = 18;
    let y = page.getHeight() - psgLogo.height;
    page.drawImage(psgLogo, {
      x: pageWidth / 2 - psgLogo.width / 3.3,
      y,
      width: 151.38,
      height: 200,
    });
    y = y - 50;
    const textWidth = font.widthOfTextAtSize(
      "PSG COLLEGE OF TECHNOLOGY",
      fontSize
    );

    page.drawText("PSG COLLEGE OF TECHNOLOGY", {
      x: pageWidth / 2 - textWidth / 2,
      y,
      size: fontSize,
      font: font,
      color: rgb(0, 0, 0),
    });

    //title
    fontSize = 32;
    y = y - 50;
    const qtextWidth = font.widthOfTextAtSize(
      "Quarterly Progress Report",
      fontSize
    );

    page.drawText("Quarterly Progress Report", {
      x: pageWidth / 2 - qtextWidth / 1.8,
      y,
      size: fontSize,
      font: fontBold,
      color: rgb(0, 0, 0),
    });

    //date
    fontSize = 16;
    y = y - 50;
    const dtextWidth = font.widthOfTextAtSize(
      "July 2024 to September 2024",
      fontSize
    );
    page.drawText("July 2024 to September 2024", {
      x: pageWidth / 2 - dtextWidth / 2,
      y,
      size: fontSize,
      font: font,
      color: rgb(0, 0, 0),
    });

    const pdfBytes = await pdfDoc.save();
    return Buffer.from(pdfBytes);
  }

  async mergeMinioPDFs(pdfBuffers: Buffer[]): Promise<Buffer> {
    const mergedPdf = await PDFDocument.create();

    for (const pdfBuffer of pdfBuffers) {
      const pdfDoc = await PDFDocument.load(pdfBuffer);
      const copiedPages = await mergedPdf.copyPages(
        pdfDoc,
        pdfDoc.getPageIndices()
      );
      copiedPages.forEach((page) => mergedPdf.addPage(page));
    }

    const mergedPdfBytes = await mergedPdf.save();
    return Buffer.from(mergedPdfBytes);
  }
}
