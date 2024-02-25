import { Client } from "minio";
import { minioConfig } from "../config/minio.config";

export class MinioService {
  private readonly minioClient: Client;
  constructor() {
    this.minioClient = new Client(minioConfig);
  }

  private async streamToBuffer(stream: any): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const chunks: any[] = [];
      stream.on("data", (chunk: any) => chunks.push(chunk));
      stream.on("error", reject);
      stream.on("end", () => resolve(Buffer.concat(chunks)));
    });
  }

  public async uploadFile(
    bucketName: string,
    fileName: string,
    filePath: string
  ) {
    await this.minioClient.fPutObject(bucketName, fileName, filePath);
  }

  public async getFile(bucketName: string, fileName: string) {
    // return await this.minioClient.getObject(bucketName, fileName);
    try {
      const dataStream = await this.minioClient.getObject(bucketName, fileName);
      return await this.streamToBuffer(dataStream);
    } catch (error) {
      console.error("Error retrieving file from Minio:", error);
      throw error;
    }
  }

  public async removeFile(bucketName: string, fileName: string) {
    await this.minioClient.removeObject(bucketName, fileName);
  }

  public async generatePresignedUrl(
    bucketName: string,
    fileName: string,
    expiry: number
  ) {
    return await this.minioClient.presignedGetObject(
      bucketName,
      fileName,
      expiry
    );
  }

  public async listObjects(bucketName: string) {
    return await this.minioClient.listObjects(bucketName);
  }

  public async listBuckets() {
    return await this.minioClient.listBuckets();
  }

  public async removeBucket(bucketName: string) {
    return await this.minioClient.removeBucket(bucketName);
  }

  public async makeBucket(bucketName: string) {
    return await this.minioClient.makeBucket(bucketName);
  }

  public async bucketExists(bucketName: string) {
    return await this.minioClient.bucketExists(bucketName);
  }
}
