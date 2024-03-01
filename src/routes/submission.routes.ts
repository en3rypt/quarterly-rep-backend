import { Router } from "express";
import { SubmissionController } from "../controllers/submission.controller";
import upload from "../middleware/upload.middleware";

const submissionController = new SubmissionController();
const submissionRouter = Router();

submissionRouter.post("/", submissionController.createSubmission);
submissionRouter.get("/", submissionController.getSubmissions);
submissionRouter.get("/:uuid", submissionController.getSubmission);
submissionRouter.put("/:uuid", submissionController.uploadFiles);
submissionRouter.get(
  "/user/:year",
  submissionController.getSubmissionsByYearAndUser
);

submissionRouter.get(
  "/download/:uuid",
  submissionController.downloadSubmission
);

submissionRouter.get(
  "/:year/:quarter",
  submissionController.getSubmissionsByYearQuarter
);
submissionRouter.get(
  "/download/all/:year/:quarter",
  submissionController.downloadAllSubmissions
);
export default submissionRouter;
