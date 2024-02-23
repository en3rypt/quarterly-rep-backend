import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export class QuarterServices{
    async createQuarter(quarter: number,year: number, startDate: Date, endDate: Date){
        try{
            const quarters = prisma.quarters.create({
                data : {
                    quarter,
                    year,
                    startDate,
                    endDate
                },
            })
            console.log('Quarter Created')
            return quarters
        }
        catch(error){
            console.error(error)
        }
    }

    async updateEndDate(quarter: number, year: number, endDate: Date){
        return await prisma.quarters.update({
            where: {
                year_quarter: {
                  year, 
                  quarter,
                }
              },
              data: { 
                endDate 
              }
        })
    }

    async getQuarterByYearQuarter(quarter: number, year: number){
        return await prisma.quarters.findUnique({ where: {
            year_quarter: {
                year,
                quarter
            }
        } 
    });
    }

    async getQuarterByYear(year: number){
        return await prisma.quarters.findMany({where : {year}})
    }

    async getAllQuarter(){
        return await prisma.quarters.findMany()
    }
}