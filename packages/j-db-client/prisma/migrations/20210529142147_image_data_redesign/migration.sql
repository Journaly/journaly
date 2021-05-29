/*
  Warnings:

  - You are about to drop the `Image` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[headlineImageId]` on the table `Post` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `headlineImageId` to the `Post` table without a default value. This is not possible if the table is not empty.

*/

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "headlineImageId" INTEGER;

-- CreateTable
CREATE TABLE "HeadlineImage" (
    "id" SERIAL NOT NULL,
    "smallSize" TEXT NOT NULL,
    "largeSize" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- Backfill all existing images to new HeadlineImage table
ALTER TABLE "HeadlineImage" ADD COLUMN "tempPostId" INTEGER;

INSERT INTO "HeadlineImage" (
  "smallSize",
  "largeSize",
  "tempPostId"
)(
  SELECT "smallSize", "largeSize", "postId"
  FROM "Image"
  WHERE "postId" IS NOT NULL
);

WITH sq AS (
  SELECT *
  FROM "HeadlineImage"
)
UPDATE "Post"
SET "headlineImageId" = sq."id"
FROM sq
WHERE "Post".id = sq."tempPostId";

-- Backfill posts that previously used default image

INSERT INTO "HeadlineImage" (
  "smallSize",
  "largeSize",
  "tempPostId"
)
SELECT
  'https://d2ieewwzq5w1x7.cloudfront.net/post-image/f24ad1f4-c934-4e5b-b183-19358856e2ce-small' AS "smallSize",
  'https://d2ieewwzq5w1x7.cloudfront.net/post-image/f24ad1f4-c934-4e5b-b183-19358856e2ce-large' AS "largeSize",
  "id" AS "tempPostId"
FROM "Post"
WHERE "Post"."headlineImageId" IS NULL;

WITH sq AS (
  SELECT *
  FROM "HeadlineImage"
)
UPDATE "Post"
SET "headlineImageId" = sq."id"
FROM sq
WHERE "Post".id = sq."tempPostId";

ALTER TABLE "HeadlineImage" DROP COLUMN "tempPostId";

-- Add Null Constraint
ALTER TABLE "Post" ALTER COLUMN     "headlineImageId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Post.headlineImageId_unique" ON "Post"("headlineImageId");

-- AddForeignKey
ALTER TABLE "Post" ADD FOREIGN KEY ("headlineImageId") REFERENCES "HeadlineImage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_postId_fkey";

-- DropTable
DROP TABLE "Image";

-- DropEnum
DROP TYPE "ImageRole";
