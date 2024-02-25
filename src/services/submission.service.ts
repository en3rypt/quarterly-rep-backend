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

  // async uploadFile(uuid: string, file: Express.Multer.File) {
  //   const objectURL = await this.minioService.uploadFile(uuid, file);
  //   const submission = await prisma.submission.update({
  //     where: { uuid },
  //     data: { objectURL },
  //   });
  //   return submission;
  // }

  async uploadAndMergeFiles(uuid: string, files: Express.Multer.File[]) {
    try {
      const submissionFiles = await Promise.all(
        files.map(async (file) => ({
          originalFilename: file.originalname,
          tempFilePath: file.path,
        }))
      );

      const mergedFileName = `${uuidv4()}.pdf`;
      const mergedFilePath = `uploads/${mergedFileName}`;

      await this.pdfService.mergePDFs(
        submissionFiles.map((f) => f.tempFilePath),
        mergedFilePath
      );

      const fileBuffer = await fs.readFile(mergedFilePath);

      await this.minioService.uploadFile(
        mergedFileName,
        fileBuffer,
        fileBuffer.length,
        "application/pdf"
      );

      await Promise.all(submissionFiles.map((f) => fs.unlink(f.tempFilePath)));
      await fs.unlink(mergedFilePath);

      const objectURL = `http://minio:9000/${this.bucketName}/${mergedFileName}`;

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
