const { PDFDocument, StandardFonts, rgb } = require("pdf-lib");
const fs = require("fs");

async function createPdf() {
  const pdfDoc = await PDFDocument.create();

  const psgLogo = await pdfDoc.embedPng(
    fs.readFileSync("./assets/psg_logo.png")
  );
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
  const qarteretextWidth = font.widthOfTextAtSize("Quarter - II", fontSize);
  page.drawText("Quarter - II", {
    x: pageWidth / 2 - qarteretextWidth / 2,
    y,
    size: fontSize,
    font: font,
    color: rgb(0, 0, 0),
  });

  //date
  fontSize = 16;
  y = y - 20;
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

  // Path: index.js

  fs.writeFileSync("output.pdf", pdfBytes);
  return Buffer.from(pdfBytes);
}

createPdf();
