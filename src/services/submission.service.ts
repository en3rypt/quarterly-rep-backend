import { MinioService } from "./minio.service";

export class SubmissionService {
  private readonly minioService;

  constructor() {
    this.minioService = new MinioService();
  }
}
