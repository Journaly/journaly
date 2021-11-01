/*
  Warnings:

  - Changed the type of `type` on the `PendingNotification` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/

-- Re-name "NotificationType" to "EmailNotificationType", manual SQL to address above warning.
CREATE TYPE "EmailNotificationType" AS ENUM ('THREAD_COMMENT', 'POST_COMMENT', 'THREAD_COMMENT_THANKS', 'NEW_POST', 'POST_CLAP');

ALTER TABLE "PendingNotification" ALTER COLUMN "type" TYPE VARCHAR(255);

DROP TYPE IF EXISTS "NotificationType" CASCADE;

ALTER TABLE "PendingNotification"
  ALTER COLUMN "type" TYPE "EmailNotificationType"
  USING ("type"::"EmailNotificationType");

-- CreateEnum
CREATE TYPE "InAppNotificationType" AS ENUM ('THREAD_COMMENT', 'POST_COMMENT', 'THREAD_COMMENT_THANKS', 'NEW_POST', 'POST_CLAP');

-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "status" SET DEFAULT E'DRAFT';

-- CreateTable
CREATE TABLE "InAppNotification" (
    "id" SERIAL NOT NULL,
    "type" "InAppNotificationType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "bumpedAt" TIMESTAMP(3),
    "postId" INTEGER,
    "userId" INTEGER NOT NULL,
    "triggeringUserId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ThreadThanksNotification" (
    "id" SERIAL NOT NULL,
    "thanksId" INTEGER NOT NULL,
    "notificationId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ThreadNotification" (
    "id" SERIAL NOT NULL,
    "notificationId" INTEGER NOT NULL,
    "threadId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PostCommentNotification" (
    "id" SERIAL NOT NULL,
    "notificationId" INTEGER NOT NULL,
    "postCommentId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NewFollowerNotification" (
    "id" SERIAL NOT NULL,
    "notificationId" INTEGER NOT NULL,
    "followingUserId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PostClapNotification" (
    "id" SERIAL NOT NULL,
    "notificationId" INTEGER NOT NULL,
    "postId" INTEGER NOT NULL,
    "postClapId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "InAppNotification" ADD FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InAppNotification" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InAppNotification" ADD FOREIGN KEY ("triggeringUserId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ThreadThanksNotification" ADD FOREIGN KEY ("thanksId") REFERENCES "CommentThanks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ThreadThanksNotification" ADD FOREIGN KEY ("notificationId") REFERENCES "InAppNotification"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ThreadNotification" ADD FOREIGN KEY ("notificationId") REFERENCES "InAppNotification"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ThreadNotification" ADD FOREIGN KEY ("threadId") REFERENCES "Thread"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostCommentNotification" ADD FOREIGN KEY ("notificationId") REFERENCES "InAppNotification"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostCommentNotification" ADD FOREIGN KEY ("postCommentId") REFERENCES "PostComment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NewFollowerNotification" ADD FOREIGN KEY ("notificationId") REFERENCES "InAppNotification"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NewFollowerNotification" ADD FOREIGN KEY ("followingUserId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostClapNotification" ADD FOREIGN KEY ("notificationId") REFERENCES "InAppNotification"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostClapNotification" ADD FOREIGN KEY ("postClapId") REFERENCES "PostClap"("id") ON DELETE CASCADE ON UPDATE CASCADE;
