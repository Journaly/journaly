/*
  Warnings:

  - You are about to drop the column `postId` on the `PostClapNotification` table. All the data in the column will be lost.
  - You are about to drop the `ThreadNotification` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ThreadThanksNotification` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ThreadNotification" DROP CONSTRAINT "ThreadNotification_notificationId_fkey";

-- DropForeignKey
ALTER TABLE "ThreadNotification" DROP CONSTRAINT "ThreadNotification_threadId_fkey";

-- DropForeignKey
ALTER TABLE "ThreadThanksNotification" DROP CONSTRAINT "ThreadThanksNotification_notificationId_fkey";

-- DropForeignKey
ALTER TABLE "ThreadThanksNotification" DROP CONSTRAINT "ThreadThanksNotification_thanksId_fkey";

-- AlterTable
ALTER TABLE "PostClapNotification" DROP COLUMN "postId";

-- DropTable
DROP TABLE "ThreadNotification";

-- DropTable
DROP TABLE "ThreadThanksNotification";

-- CreateTable
CREATE TABLE "ThreadCommentThanksNotification" (
    "id" SERIAL NOT NULL,
    "thanksId" INTEGER NOT NULL,
    "notificationId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ThreadCommentNotification" (
    "id" SERIAL NOT NULL,
    "notificationId" INTEGER NOT NULL,
    "commentId" INTEGER NOT NULL,
    "threadId" INTEGER,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ThreadCommentThanksNotification" ADD FOREIGN KEY ("thanksId") REFERENCES "CommentThanks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ThreadCommentThanksNotification" ADD FOREIGN KEY ("notificationId") REFERENCES "InAppNotification"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ThreadCommentNotification" ADD FOREIGN KEY ("notificationId") REFERENCES "InAppNotification"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ThreadCommentNotification" ADD FOREIGN KEY ("commentId") REFERENCES "Comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ThreadCommentNotification" ADD FOREIGN KEY ("threadId") REFERENCES "Thread"("id") ON DELETE SET NULL ON UPDATE CASCADE;
