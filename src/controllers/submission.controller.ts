import path from "path";
import { SubmissionStatus } from "../enums/submissionStatus.enum";
import { SubmissionService } from "../services/submission.service";
import { Request, Response } from "express";
import { promises as fs } from "fs";

const submissionService = new SubmissionService();
export class SubmissionController {
  async createSubmission(req: Request, res: Response) {
    try {
      const year = parseInt(req.body.year, 10);
      const quarter = parseInt(req.body.quarter, 10);
      const email = req.body.email;
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

  async getSubmissionsByYearAndUser(req: Request, res: Response) {
    const { year } = req.params;
    const { email } = req.user || { email: "" };
    const submissions = await submissionService.getSubmissionsByYearAndUser(
      parseInt(year, 10),
      email
    );
    res.status(200).json(submissions);
  }

  async getSubmissionsByYearQuarter(req: Request, res: Response) {
    const { year, quarter } = req.params;
    const submissions = await submissionService.getSubmissionsByYearQuarter(
      parseInt(year, 10),
      parseInt(quarter, 10)
    );
    res.status(200).json(submissions);
  }

  async downloadSubmission(req: Request, res: Response) {
    const { uuid } = req.params;
    const submission = await submissionService.getSubmission(uuid);
    if (!submission) {
      res.status(404).json({ message: "Submission not found" });
      return;
    }
    const file = await submissionService.downloadSubmission(uuid);
    // res.setHeader("Content-Disposition", `attachment; filename=${uuid}.pdf`);
    // res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Type", "application/octet-stream");
    res.status(200).send(file);
  }

  async downloadAllSubmissions(req: Request, res: Response) {
    try {
      const year = parseInt(req.params.year, 10);
      const quarter = parseInt(req.params.quarter, 10);
      const pdfBuffer = await submissionService.downloadAllSubmissions(
        year,
        quarter
      );
      res.setHeader("Content-Type", "application/octet-stream");
      res.status(200).send(pdfBuffer);
    } catch (error) {
      res.status(500).json({ error: "Unknown Error Occured" });
    }
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
