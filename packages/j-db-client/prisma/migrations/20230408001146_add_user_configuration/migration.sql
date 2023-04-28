-- CreateEnum
CREATE TYPE "DigestEmailConfiguration" AS ENUM ('DAILY', 'WEEKLY', 'OFF');

-- CreateTable
CREATE TABLE "UserConfiguration" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "digestEmail" "DigestEmailConfiguration" NOT NULL DEFAULT E'DAILY',

    CONSTRAINT "UserConfiguration_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserConfiguration_userId_key" ON "UserConfiguration"("userId");

-- AddForeignKey
ALTER TABLE "UserConfiguration" ADD CONSTRAINT "UserConfiguration_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- Backfill:
--   Create record for every user in User Configuration table,
--   'digestEmail' column defaults to 'DAILY'.
INSERT INTO "UserConfiguration" (
	"userId"
) (
	SELECT id
	FROM "User"
	WHERE id IS NOT NULL
);
