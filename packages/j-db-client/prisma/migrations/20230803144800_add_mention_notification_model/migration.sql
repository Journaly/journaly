-- AlterEnum
ALTER TYPE "InAppNotificationType" ADD VALUE 'MENTION';

-- DropIndex
DROP INDEX "user_handle_trgm_idx";

-- CreateTable
CREATE TABLE "MentionNotification" (
    "id" SERIAL NOT NULL,
    "notificationId" INTEGER NOT NULL,
    "commentId" INTEGER,
    "postCommentId" INTEGER,

    CONSTRAINT "MentionNotification_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MentionNotification" ADD CONSTRAINT "MentionNotification_notificationId_fkey" FOREIGN KEY ("notificationId") REFERENCES "InAppNotification"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MentionNotification" ADD CONSTRAINT "MentionNotification_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MentionNotification" ADD CONSTRAINT "MentionNotification_postCommentId_fkey" FOREIGN KEY ("postCommentId") REFERENCES "PostComment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
