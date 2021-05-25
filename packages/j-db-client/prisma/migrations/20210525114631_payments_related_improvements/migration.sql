/*
  Warnings:

  - You are about to drop the column `lastFourCardNumbers` on the `MembershipSubscription` table. All the data in the column will be lost.
  - You are about to drop the column `cardBrand` on the `MembershipSubscription` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "MembershipSubscription" DROP COLUMN "lastFourCardNumbers",
DROP COLUMN "cardBrand",
ADD COLUMN     "nextBillingDate" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "lastFourCardNumbers" TEXT,
ADD COLUMN     "cardBrand" TEXT;
