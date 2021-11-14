-- DropForeignKey
ALTER TABLE "NewFollowerNotification" DROP CONSTRAINT "NewFollowerNotification_notificationId_fkey";

-- DropForeignKey
ALTER TABLE "NewPostNotification" DROP CONSTRAINT "NewPostNotification_notificationId_fkey";

-- DropForeignKey
ALTER TABLE "PostClapNotification" DROP CONSTRAINT "PostClapNotification_notificationId_fkey";

-- DropForeignKey
ALTER TABLE "PostCommentNotification" DROP CONSTRAINT "PostCommentNotification_notificationId_fkey";

-- DropForeignKey
ALTER TABLE "ThreadCommentNotification" DROP CONSTRAINT "ThreadCommentNotification_notificationId_fkey";

-- DropForeignKey
ALTER TABLE "ThreadCommentThanksNotification" DROP CONSTRAINT "ThreadCommentThanksNotification_notificationId_fkey";

-- AddForeignKey
ALTER TABLE "ThreadCommentThanksNotification" ADD CONSTRAINT "ThreadCommentThanksNotification_notificationId_fkey" FOREIGN KEY ("notificationId") REFERENCES "InAppNotification"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ThreadCommentNotification" ADD CONSTRAINT "ThreadCommentNotification_notificationId_fkey" FOREIGN KEY ("notificationId") REFERENCES "InAppNotification"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostCommentNotification" ADD CONSTRAINT "PostCommentNotification_notificationId_fkey" FOREIGN KEY ("notificationId") REFERENCES "InAppNotification"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NewFollowerNotification" ADD CONSTRAINT "NewFollowerNotification_notificationId_fkey" FOREIGN KEY ("notificationId") REFERENCES "InAppNotification"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostClapNotification" ADD CONSTRAINT "PostClapNotification_notificationId_fkey" FOREIGN KEY ("notificationId") REFERENCES "InAppNotification"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NewPostNotification" ADD CONSTRAINT "NewPostNotification_notificationId_fkey" FOREIGN KEY ("notificationId") REFERENCES "InAppNotification"("id") ON DELETE CASCADE ON UPDATE CASCADE;
