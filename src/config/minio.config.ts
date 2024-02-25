import * as dotenv from "dotenv";
dotenv.config();

export const minioConfig = {
  region: process.env.MINIO_REGION || "auto",
  endPoint: process.env.MINIO_ENDPOINT || "localhost:9000",
  port: parseInt(process.env.MINIO_PORT || "9000"),
  useSSL: process.env.MINIO_USE_SSL === "true",
  accessKey: process.env.MINIO_ROOT_USER || "minio",
  secretKey: process.env.MINIO_SECRET_PASSWORD || "minio123",
};
