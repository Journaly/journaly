-- DropForeignKey
ALTER TABLE "CommentThanks" DROP CONSTRAINT "CommentThanks_commentId_fkey";

-- DropForeignKey
ALTER TABLE "NewFollowerNotification" DROP CONSTRAINT "NewFollowerNotification_followingUserId_fkey";

-- DropForeignKey
ALTER TABLE "NewPostNotification" DROP CONSTRAINT "NewPostNotification_postId_fkey";

-- DropForeignKey
ALTER TABLE "PostClapNotification" DROP CONSTRAINT "PostClapNotification_postClapId_fkey";

-- DropForeignKey
ALTER TABLE "PostCommentNotification" DROP CONSTRAINT "PostCommentNotification_postCommentId_fkey";

-- DropForeignKey
ALTER TABLE "ThreadCommentNotification" DROP CONSTRAINT "ThreadCommentNotification_commentId_fkey";

-- DropForeignKey
ALTER TABLE "ThreadCommentThanksNotification" DROP CONSTRAINT "ThreadCommentThanksNotification_thanksId_fkey";

-- AddForeignKey
ALTER TABLE "CommentThanks" ADD CONSTRAINT "CommentThanks_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ThreadCommentThanksNotification" ADD CONSTRAINT "ThreadCommentThanksNotification_thanksId_fkey" FOREIGN KEY ("thanksId") REFERENCES "CommentThanks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ThreadCommentNotification" ADD CONSTRAINT "ThreadCommentNotification_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostCommentNotification" ADD CONSTRAINT "PostCommentNotification_postCommentId_fkey" FOREIGN KEY ("postCommentId") REFERENCES "PostComment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NewFollowerNotification" ADD CONSTRAINT "NewFollowerNotification_followingUserId_fkey" FOREIGN KEY ("followingUserId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostClapNotification" ADD CONSTRAINT "PostClapNotification_postClapId_fkey" FOREIGN KEY ("postClapId") REFERENCES "PostClap"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NewPostNotification" ADD CONSTRAINT "NewPostNotification_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
