import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class QuarterServices {
  async createQuarter(
    quarter: number,
    year: number,
    startDate: Date,
    endDate: Date
  ) {
    try {
      const quarters = prisma.quarter.create({
        data: {
          quarter,
          year,
          startDate,
          endDate,
        },
      });
      return quarters;
    } catch (error) {
      console.error(error);
    }
  }

  async updateEndDate(year: number, quarter: number, endDate: Date) {
    const existingQuarter = await prisma.quarter.findUnique({
      where: {
        year_quarter: {
          year,
          quarter,
        },
      },
    });

    if (!existingQuarter) {
      console.error(
        `Quarter with year ${year} and quarter ${quarter} not found.`
      );
      return null;
    }

    return await prisma.quarter.update({
      where: {
        year_quarter: {
          year,
          quarter,
        },
      },
      data: {
        endDate: new Date(endDate),
      },
    });
  }

  async getQuarterByYearQuarter(quarter: number, year: number) {
    return await prisma.quarter.findUnique({
      where: {
        year_quarter: {
          year,
          quarter,
        },
      },
    });
  }

  async getQuarterByYear(year: number) {
    return await prisma.quarter.findMany({
      where: { year },
      orderBy: {
        quarter: "asc",
      },
    });
  }

  async getAllQuarter() {
    //sort by startDate
    return await prisma.quarter.findMany({
      orderBy: {
        startDate: "asc",
      },
    });
  }
}
