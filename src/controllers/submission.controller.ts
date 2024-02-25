import { SubmissionStatus } from "../enums/submissionStatus.enum";
import { SubmissionService } from "../services/submission.service";
import { Request, Response } from "express";

const submissionService = new SubmissionService();
export class SubmissionController {
  async createSubmission(req: Request, res: Response) {
    try {
      const { email } = req.user || { email: "" };
      const year = parseInt(req.body.year, 10);
      const quarter = parseInt(req.body.quarter, 10);
      const submission = await submissionService.createSubmission(
        email,
        quarter,
        year,
        SubmissionStatus.PENDING
      );
      res.status(201).json(submission);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async getSubmission(req: Request, res: Response) {
    const { uuid } = req.params;
    const submission = await submissionService.getSubmission(uuid);
    res.status(200).json(submission);
  }

  async getSubmissions(req: Request, res: Response) {
    const submissions = await submissionService.getSubmissions();
    res.status(200).json(submissions);
  }

  async updateSubmission(req: Request, res: Response) {
    const { uuid } = req.params;
    const data = req.body;
    const submission = await submissionService.updateSubmission(uuid, data);
    res.status(200).json(submission);
  }

  async uploadFiles(req: Request, res: Response) {
    try {
      const { uuid } = req.params;
      console.log(
        "🚀 ~ SubmissionController ~ uploadFiles ~ req.files:",
        req.files
      );

      await submissionService.uploadAndMergeFiles(
        uuid,
        req.files as Express.Multer.File[]
      );
      res
        .status(200)
        .json({ message: "Files uploaded and merged successfully" });
    } catch (error) {
      console.error("Error in uploadFiles:", error);
      res.status(500).json({ error: "Upload failed" });
    }
  }
}
