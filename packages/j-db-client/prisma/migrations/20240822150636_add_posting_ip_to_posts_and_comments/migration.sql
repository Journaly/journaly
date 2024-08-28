-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "postingIpAddress" TEXT;

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "postingIpAddress" TEXT;

-- AlterTable
ALTER TABLE "PostComment" ADD COLUMN     "postingIpAddress" TEXT;
