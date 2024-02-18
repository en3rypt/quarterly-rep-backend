-- CreateTable
CREATE TABLE "User" (
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("username")
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
CREATE TABLE "Date" (
    "quarter" INTEGER NOT NULL,
    "startDate" TEXT NOT NULL,
    "endDate" TEXT NOT NULL,

    CONSTRAINT "Date_pkey" PRIMARY KEY ("quarter")
);

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_uid_fkey" FOREIGN KEY ("uid") REFERENCES "User"("username") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_objectId_fkey" FOREIGN KEY ("objectId") REFERENCES "Object"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
