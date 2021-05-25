/*
  Warnings:

  - You are about to drop the column `lastFourCardNumbers` on the `MembershipSubscription` table. All the data in the column will be lost.
  - You are about to drop the column `cardBrand` on the `MembershipSubscription` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "lastFourCardNumbers" TEXT,
ADD COLUMN     "cardBrand" TEXT;

-- Backfill Payment Info
WITH sq AS (
	SELECT *
	FROM "MembershipSubscription"
)
UPDATE "User"
SET
	"lastFourCardNumbers" = sq."lastFourCardNumbers",
	"cardBrand" = sq."cardBrand"
FROM sq
WHERE "User".id = sq."userId";

-- AlterTable
ALTER TABLE "MembershipSubscription" DROP COLUMN "lastFourCardNumbers",
DROP COLUMN "cardBrand",
ADD COLUMN     "nextBillingDate" TIMESTAMP(3);

-- Backfill nextBillingDate
UPDATE "MembershipSubscription" SET "nextBillingDate" = "expiresAt";
