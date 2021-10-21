-- AlterEnum
ALTER TYPE "PostStatus" ADD VALUE 'PRIVATE';

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "privateShareLink" TEXT;
