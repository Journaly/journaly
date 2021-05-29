/*
  Warnings:

  - You are about to drop the `Image` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[headlineImageId]` on the table `Post` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `headlineImageId` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_postId_fkey";

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "headlineImageId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Image";

-- DropEnum
DROP TYPE "ImageRole";

-- CreateTable
CREATE TABLE "HeadlineImage" (
    "id" SERIAL NOT NULL,
    "smallSize" TEXT NOT NULL,
    "largeSize" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Post.headlineImageId_unique" ON "Post"("headlineImageId");

-- AddForeignKey
ALTER TABLE "Post" ADD FOREIGN KEY ("headlineImageId") REFERENCES "HeadlineImage"("id") ON DELETE CASCADE ON UPDATE CASCADE;
