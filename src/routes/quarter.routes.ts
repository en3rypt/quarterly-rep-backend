import { Router } from "express";
import { QuarterController } from "../controllers/quarter.controller";
import { QuarterServices } from "../services/quarters.service";

const quarterController = new QuarterController();
const quarterRouter = Router()

quarterRouter.post("/", quarterController.createQuarter)
quarterRouter.put("/", quarterController.updateQuarter)
quarterRouter.get("/:year/:quarter",quarterController.getQuarterByYearQuarter)
quarterRouter.get("/:year",quarterController.getQuarterByYear)
quarterRouter.get("/",quarterController.getAllQuarters)
