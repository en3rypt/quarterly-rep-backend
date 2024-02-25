import { Router } from "express";
import { SubmissionController } from "../controllers/submission.controller";
import upload from "../middleware/upload.middleware";

const submissionController = new SubmissionController();
const submissionRouter = Router();

submissionRouter.post("/", submissionController.createSubmission);
submissionRouter.get("/", submissionController.getSubmissions);
submissionRouter.get("/:uuid", submissionController.getSubmission);
submissionRouter.put("/:uuid", submissionController.uploadFiles);
export default submissionRouter;
