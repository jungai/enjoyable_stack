-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" BIGINT NOT NULL,
    "updatedAt" BIGINT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
