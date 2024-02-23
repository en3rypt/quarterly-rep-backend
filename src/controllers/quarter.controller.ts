import { Request, Response } from "express";
import { QuarterServices } from "../services/quarters.service";

const quarterServices = new QuarterServices()

export class QuarterController{
    async createQuarter(req: Request, res: Response){
        try{
            const {quarter, year, startDate, endDate} = req.body
            const quart = quarterServices.createQuarter(
                quarter,
                year,
                startDate,
                endDate
            )
            res.status(201).json(quart)
        }
        catch(error: any){
            res.status(400).json({message: error.message})
        }
    }

    async updateQuarter(req: Request, res:Response){
        try{
            const {year, quarter, endDate} = req.body
            const quart = await quarterServices.updateEndDate(year, quarter, endDate)
            res.status(200).json(quart)
        }
        catch(error: any){
            res.status(400).json({ message: error.message})
        }
    }

    async getQuarterByYearQuarter(req: Request, res: Response){
        try{
            const{year, quarter} = req.body
            const quart = await quarterServices.getQuarterByYearQuarter(year, quarter)
            res.status(200).json(quart)
        }
        catch(error: any){
            res.status(400).json({ message: error.message})
        }
    }

    async getQuarterByYear(req: Request, res: Response){
        try{
            const {year} = req.body
            const quart = await quarterServices.getQuarterByYear(year)
            res.status(200).json(quart)
        }
        catch(error: any){
            res.status(400).json({message : error.message})
        }
    }

    async getAllQuarters(req: Request, res:Response){
        try{
            const quart = await quarterServices.getAllQuarter()
            res.status(200).json(quart)
        }
        catch(error: any){
            res.status(400).json({message: error.message})
        }
    }
}