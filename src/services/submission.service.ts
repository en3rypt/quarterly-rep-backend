import { Submission } from "../interface/submission.interface";
import prisma from "../utils/db";
import { MinioService } from "./minio.service";
import { v4 as uuidv4 } from "uuid";
import { PDFService } from "./pdf.service";
import { promises as fs } from "fs";

export class SubmissionService {
  private readonly minioService;
  private readonly pdfService;
  private readonly bucketName;
  constructor() {
    this.minioService = new MinioService();
    this.pdfService = new PDFService();
    this.bucketName = process.env.MINIO_BUCKET_NAME ?? "local-submissions";
  }

  async createSubmission(
    userEmail: string,
    quarter: number,
    year: number,
    status: string
  ) {
    return await prisma.submission.create({
      data: {
        uuid: uuidv4(),
        userEmail,
        quarter,
        year,
        status,
        objectURL: "",
        modifiedAt: new Date(),
      },
    });
  }

  async getSubmission(uuid: string) {
    return await prisma.submission.findUnique({ where: { uuid } });
  }

  async getSubmissions() {
    return await prisma.submission.findMany();
  }

  async getSubmissionsByYearAndUser(year: number, userEmail: string) {
    return await prisma.submission.findMany({
      where: { year, userEmail },
    });
  }

  async updateSubmission(uuid: string, objecURL: string) {
    return await prisma.submission.update({
      where: { uuid },
      data: {
        objectURL: objecURL,
      },
    });
  }

  async deleteSubmission(uuid: string) {
    return await prisma.submission.delete({ where: { uuid } });
  }

  async downloadSubmission(uuid: string) {
    const submission = await this.getSubmission(uuid);
    if (!submission) {
      return undefined;
    }
    const fileName = submission.objectURL.split("/").pop() ?? "";
    const fileBuffer = await this.minioService.getFile(fileName);
    return fileBuffer;
  }

  async downloadAllSubmissions(year: number, quarter:number){
    const submissions = await prisma.submission.findMany({
      where: {
        year,
        quarter,
      },
      include: {
        user: true,
      },
    });
    const sortedSubmissions = submissions.filter(
      (submission) => submission.user.role === "Representative"
    ).sort(
      (a, b) => a.user.order - b.user.order
    );

  const pdfBuffers = await Promise.all(
    sortedSubmissions.map((submission) =>
      this.minioService.getFile(submission.objectURL)
    )
  );
  const outputFilePath = "Consolidated.pdf"
  this.pdfService.mergeMinioPDFs(pdfBuffers, outputFilePath)
  .then(() => console.log("PDFs merged successfully"))
  .catch((err) => console.error("Error merging PDFs:", err));
  }

  
  async uploadAndMergeFiles(uuid: string, files: Express.Multer.File[]) {
    try {
      //upload to minIO
      const mergedFileName = `${uuidv4()}.pdf`;
      const mergedFilePath = `uploads/${mergedFileName}`;

      await this.pdfService.mergePDFs(
        files.map((f) => f.path),
        mergedFilePath
      );

      const fileBuffer = await fs.readFile(mergedFilePath);

      await this.minioService.uploadFile(
        mergedFileName,
        fileBuffer,
        fileBuffer.length,
        "application/pdf"
      );

      //unlink all temp files in uploads folder
      await Promise.all([
        ...files.map((f) => fs.unlink(f.path)),
        fs.unlink(mergedFilePath),
      ]);

      const objectURL = `http://minio:9000/${this.bucketName}/${mergedFileName}`;

      //remove already existing file
      const existingSubmission = await this.getSubmission(uuid);
      if (existingSubmission && existingSubmission.objectURL !== "") {
        const existingFileName =
          existingSubmission.objectURL.split("/").pop() ?? "";
        await this.minioService.removeFile(this.bucketName, existingFileName);
      }

      //add new file to submission
      await this.updateSubmission(uuid, objectURL);

      return objectURL;
    } catch (error) {
      console.error("Error uploading and merging files:", error);
      throw error;
    }
  }

  async updateSubmissionByDetails(
    userEmail: string,
    year: number,
    quarter: number,
    data: Partial<Submission>
  ) {
    return await prisma.submission.updateMany({
      where: { userEmail, year, quarter },
      data,
    });
  }
}
