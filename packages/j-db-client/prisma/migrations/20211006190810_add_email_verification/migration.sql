-- CreateEnum
CREATE TYPE "EmailVerificationStatus" AS ENUM ('PENDING', 'VERIFIED');

-- AlterTable
ALTER TABLE "Auth" ADD COLUMN     "emailVerificationToken" TEXT,
ADD COLUMN     "emailVerificationStatus" "EmailVerificationStatus" NOT NULL DEFAULT E'PENDING';
