/*
  Warnings:

  - A unique constraint covering the columns `[privateShareId]` on the table `Post` will be added. If there are existing duplicate values, this will fail.

*/

-- Step 1: AlterEnum - Original SQL From Prisma That failed.
-- ALTER TYPE "PostStatus" ADD VALUE 'PRIVATE';

-- Step 1: AlterEnum - Manually Re-written SQL
ALTER TABLE "Post"
  ALTER COLUMN status TYPE VARCHAR(255);

DROP TYPE IF EXISTS "PostStatus" CASCADE;
CREATE TYPE "PostStatus" AS ENUM (
  'DRAFT',
  'PUBLISHED',
  'PRIVATE'
);

ALTER TABLE "Post"
  ALTER COLUMN status TYPE "PostStatus"
  USING (status::"PostStatus");

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "privateShareId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Post.privateShareId_unique" ON "Post"("privateShareId");
