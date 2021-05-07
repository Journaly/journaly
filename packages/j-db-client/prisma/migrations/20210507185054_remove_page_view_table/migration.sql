/*
  Warnings:

  - You are about to drop the `PageView` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PageView" DROP CONSTRAINT "PageView_userId_fkey";

-- DropTable
DROP TABLE "PageView";
