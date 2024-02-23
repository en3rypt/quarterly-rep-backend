-- CreateTable
CREATE TABLE "User" (
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("email")
);

-- CreateTable
CREATE TABLE "Object" (
    "uuid" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "Object_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Submission" (
    "quarter" INTEGER NOT NULL,
    "uuid" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "uid" TEXT NOT NULL,
    "objectId" TEXT NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "Submission_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Quarters" (
    "quarter" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Quarters_pkey" PRIMARY KEY ("year","quarter")
);

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_uid_fkey" FOREIGN KEY ("uid") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_objectId_fkey" FOREIGN KEY ("objectId") REFERENCES "Object"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
