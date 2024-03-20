import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { promises as fs } from "fs";
import { Buffer } from "buffer";
import prisma from "../utils/db";
import { formatDateString, toRoman } from "../utils/common.utils";
import { UserService } from "./user.service";
import quarterRouter from "../routes/quarter.routes";
import { Submission } from "../interface/submission.interface";
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

  async createPDFHome(
    quarter: number,
    startate: Date,
    enddate: Date,
    year: number
  ) {
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
    const qtextWidth = font.widthOfTextAtSize("Quarterly Report", fontSize);

    page.drawText("Quarterly Report", {
      x: pageWidth / 2 - qtextWidth / 1.8,
      y,
      size: fontSize,
      font: fontBold,
      color: rgb(0, 0, 0),
    });

    // Quartet
    fontSize = 16;
    y = y - 50;
    const quarterLine = "Quarter - " + toRoman(quarter);
    const qutextWidth = font.widthOfTextAtSize(quarterLine, fontSize);
    page.drawText(quarterLine, {
      x: pageWidth / 2 - qutextWidth / 2,
      y,
      size: fontSize,
      font: font,
      color: rgb(0, 0, 0),
    });

    //date
    fontSize = 16;
    y = y - 50;
    let quarterMapping: { [key: number]: string } = {
      1: "January - March",
      2: "April - June",
      3: "July - September",
      4: "October - December",
    };

    const dateline = `${quarterMapping[quarter]} ${year}`;
    const dtextWidth = font.widthOfTextAtSize(dateline, fontSize);
    page.drawText(dateline, {
      x: pageWidth / 2 - dtextWidth / 2,
      y,
      size: fontSize,
      font: font,
      color: rgb(0, 0, 0),
    });

    const pdfBytes = await pdfDoc.save();
    return Buffer.from(pdfBytes);
  }

  async createPDFIndex(
    sortedSubmissions: ({
      user: {
        email: string;
        password: string;
        department: string;
        role: string;
        order: number;
        resetToken: string | null;
      };
    } & {
      uuid: string;
      userEmail: string;
      quarter: number;
      year: number;
      objectURL: string;
      status: string;
      modifiedAt: Date;
    })[]
  ) {
    const pdfDoc = await PDFDocument.create();

    const page = pdfDoc.addPage();
    const { width: pageWidth } = page.getSize();

    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    let fontSize = 16;
    let y = page.getHeight();
    y = y - 50;
    const textWidth = font.widthOfTextAtSize(
      "PSG COLLEGE OF TECHNOLOGY - COIMBATORE - 4",
      fontSize
    );

    page.drawText("PSG COLLEGE OF TECHNOLOGY - COIMBATORE - 4", {
      x: pageWidth / 2 - textWidth / 2,
      y,
      size: fontSize,
      font: fontBold,
      color: rgb(0, 0, 0),
    });

    // fontSize = 14;
    // y = y - 25;
    // const dateline = formatDateString(startDate, endDate);
    // const dtextWidth = font.widthOfTextAtSize(dateline, fontSize);
    // page.drawText(dateline, {
    //   x: pageWidth / 2 - dtextWidth / 2,
    //   y,
    //   size: fontSize,
    //   font: fontBold,
    //   color: rgb(0, 0, 0),
    // });

    y = y - 30;
    const htextWidth = font.widthOfTextAtSize("INDEX", fontSize);

    page.drawText("INDEX", {
      x: pageWidth / 2 - htextWidth / 2,
      y,
      size: fontSize,
      font: fontBold,
      color: rgb(0, 0, 0),
    });

    y = y - 40;

    const ltextWidth = font.widthOfTextAtSize("List of Reports", fontSize);

    page.drawText("List of Reports", {
      x: pageWidth / 2 - ltextWidth / 2,
      y,
      size: fontSize,
      font: fontBold,
      color: rgb(0, 0, 0),
    });

    let cou = 1;
    for (const submission of sortedSubmissions) {
      if (cou === 1) {
        y = y - 50;
      } else {
        y = y - 25;
      }

      fontSize = 12;
      const str = `${cou}. ${submission.user.department}`;
      let itextWidth = font.widthOfTextAtSize(str, fontSize);

      page.drawText(str, {
        x: 50,
        y,
        size: fontSize,
        font: font,
        color: rgb(0, 0, 0),
      });
      cou = cou + 1;
    }
    const pdfBytes = await pdfDoc.save();
    return Buffer.from(pdfBytes);
  }

  async createPDFLeaf(name: string) {
    const pdfDoc = await PDFDocument.create();

    const page = pdfDoc.addPage();
    const { width: pageWidth } = page.getSize();

    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    let fontSize = 32;
    let y = page.getHeight();
    const textWidth = font.widthOfTextAtSize(name, fontSize);

    page.drawText(name, {
      x: pageWidth / 2 - textWidth / 2,
      y: y / 2 - 32,
      size: fontSize,
      font: fontBold,
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
