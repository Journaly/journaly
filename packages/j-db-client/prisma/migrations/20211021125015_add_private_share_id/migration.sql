/*
  Warnings:

  - A unique constraint covering the columns `[privateShareId]` on the table `Post` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterEnum
ALTER TYPE "PostStatus" ADD VALUE 'PRIVATE';

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "privateShareId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Post.privateShareId_unique" ON "Post"("privateShareId");
