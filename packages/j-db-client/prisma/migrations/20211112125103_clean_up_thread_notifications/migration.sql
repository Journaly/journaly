/*
  Warnings:

  - You are about to drop the column `threadId` on the `ThreadCommentNotification` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ThreadCommentNotification" DROP CONSTRAINT "ThreadCommentNotification_threadId_fkey";

-- AlterTable
ALTER TABLE "ThreadCommentNotification" DROP COLUMN "threadId";
