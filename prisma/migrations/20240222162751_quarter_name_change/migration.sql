/*
  Warnings:

  - You are about to drop the `Date` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Date";

-- CreateTable
CREATE TABLE "Quarters" (
    "quarter" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Quarters_pkey" PRIMARY KEY ("year","quarter")
);
