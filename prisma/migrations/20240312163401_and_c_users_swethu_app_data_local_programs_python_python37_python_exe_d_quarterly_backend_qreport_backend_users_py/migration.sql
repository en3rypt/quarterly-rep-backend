/*
  Warnings:

  - You are about to drop the `quarters` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `submissions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "submissions" DROP CONSTRAINT "submissions_quarter_year_fkey";

-- DropForeignKey
ALTER TABLE "submissions" DROP CONSTRAINT "submissions_userEmail_fkey";

-- DropTable
DROP TABLE "quarters";

-- DropTable
DROP TABLE "submissions";

-- DropTable
DROP TABLE "users";

-- CreateTable
CREATE TABLE "User" (
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "order" INTEGER NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("email")
);

-- CreateTable
CREATE TABLE "Submission" (
    "uuid" TEXT NOT NULL,
    "userEmail" TEXT NOT NULL,
    "quarter" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "objectURL" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "modifiedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Submission_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Quarter" (
    "quarter" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Quarter_pkey" PRIMARY KEY ("year","quarter")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Submission_uuid_key" ON "Submission"("uuid");

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_quarter_year_fkey" FOREIGN KEY ("quarter", "year") REFERENCES "Quarter"("quarter", "year") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
