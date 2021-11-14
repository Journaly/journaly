-- DropForeignKey
ALTER TABLE "Auth" DROP CONSTRAINT "Auth_userId_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_threadId_fkey";

-- DropForeignKey
ALTER TABLE "CommentThanks" DROP CONSTRAINT "CommentThanks_authorId_fkey";

-- DropForeignKey
ALTER TABLE "CommentThanks" DROP CONSTRAINT "CommentThanks_commentId_fkey";

-- DropForeignKey
ALTER TABLE "InAppNotification" DROP CONSTRAINT "InAppNotification_triggeringUserId_fkey";

-- DropForeignKey
ALTER TABLE "InAppNotification" DROP CONSTRAINT "InAppNotification_userId_fkey";

-- DropForeignKey
ALTER TABLE "LanguageLearning" DROP CONSTRAINT "LanguageLearning_languageId_fkey";

-- DropForeignKey
ALTER TABLE "LanguageLearning" DROP CONSTRAINT "LanguageLearning_userId_fkey";

-- DropForeignKey
ALTER TABLE "LanguageNative" DROP CONSTRAINT "LanguageNative_languageId_fkey";

-- DropForeignKey
ALTER TABLE "LanguageNative" DROP CONSTRAINT "LanguageNative_userId_fkey";

-- DropForeignKey
ALTER TABLE "LanguageRelation" DROP CONSTRAINT "LanguageRelation_languageId_fkey";

-- DropForeignKey
ALTER TABLE "LanguageRelation" DROP CONSTRAINT "LanguageRelation_userId_fkey";

-- DropForeignKey
ALTER TABLE "MembershipSubscription" DROP CONSTRAINT "MembershipSubscription_userId_fkey";

-- DropForeignKey
ALTER TABLE "MembershipSubscriptionInvoice" DROP CONSTRAINT "MembershipSubscriptionInvoice_userId_fkey";

-- DropForeignKey
ALTER TABLE "MembershipSubscriptionInvoiceItem" DROP CONSTRAINT "MembershipSubscriptionInvoiceItem_invoiceId_fkey";

-- DropForeignKey
ALTER TABLE "NewFollowerNotification" DROP CONSTRAINT "NewFollowerNotification_followingUserId_fkey";

-- DropForeignKey
ALTER TABLE "NewFollowerNotification" DROP CONSTRAINT "NewFollowerNotification_notificationId_fkey";

-- DropForeignKey
ALTER TABLE "NewPostNotification" DROP CONSTRAINT "NewPostNotification_notificationId_fkey";

-- DropForeignKey
ALTER TABLE "NewPostNotification" DROP CONSTRAINT "NewPostNotification_postId_fkey";

-- DropForeignKey
ALTER TABLE "PendingNotification" DROP CONSTRAINT "PendingNotification_userId_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_headlineImageId_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_languageId_fkey";

-- DropForeignKey
ALTER TABLE "PostClap" DROP CONSTRAINT "PostClap_authorId_fkey";

-- DropForeignKey
ALTER TABLE "PostClap" DROP CONSTRAINT "PostClap_postId_fkey";

-- DropForeignKey
ALTER TABLE "PostClapNotification" DROP CONSTRAINT "PostClapNotification_notificationId_fkey";

-- DropForeignKey
ALTER TABLE "PostClapNotification" DROP CONSTRAINT "PostClapNotification_postClapId_fkey";

-- DropForeignKey
ALTER TABLE "PostComment" DROP CONSTRAINT "PostComment_authorId_fkey";

-- DropForeignKey
ALTER TABLE "PostComment" DROP CONSTRAINT "PostComment_postId_fkey";

-- DropForeignKey
ALTER TABLE "PostCommentNotification" DROP CONSTRAINT "PostCommentNotification_notificationId_fkey";

-- DropForeignKey
ALTER TABLE "PostCommentNotification" DROP CONSTRAINT "PostCommentNotification_postCommentId_fkey";

-- DropForeignKey
ALTER TABLE "PostCommentSubscription" DROP CONSTRAINT "PostCommentSubscription_postId_fkey";

-- DropForeignKey
ALTER TABLE "PostCommentSubscription" DROP CONSTRAINT "PostCommentSubscription_userId_fkey";

-- DropForeignKey
ALTER TABLE "PostCommentThanks" DROP CONSTRAINT "PostCommentThanks_authorId_fkey";

-- DropForeignKey
ALTER TABLE "PostTopic" DROP CONSTRAINT "PostTopic_postId_fkey";

-- DropForeignKey
ALTER TABLE "PostTopic" DROP CONSTRAINT "PostTopic_topicId_fkey";

-- DropForeignKey
ALTER TABLE "Prompt" DROP CONSTRAINT "Prompt_topicId_fkey";

-- DropForeignKey
ALTER TABLE "SocialMedia" DROP CONSTRAINT "SocialMedia_userId_fkey";

-- DropForeignKey
ALTER TABLE "Thread" DROP CONSTRAINT "Thread_postId_fkey";

-- DropForeignKey
ALTER TABLE "ThreadCommentNotification" DROP CONSTRAINT "ThreadCommentNotification_commentId_fkey";

-- DropForeignKey
ALTER TABLE "ThreadCommentNotification" DROP CONSTRAINT "ThreadCommentNotification_notificationId_fkey";

-- DropForeignKey
ALTER TABLE "ThreadCommentThanksNotification" DROP CONSTRAINT "ThreadCommentThanksNotification_notificationId_fkey";

-- DropForeignKey
ALTER TABLE "ThreadCommentThanksNotification" DROP CONSTRAINT "ThreadCommentThanksNotification_thanksId_fkey";

-- DropForeignKey
ALTER TABLE "ThreadSubscription" DROP CONSTRAINT "ThreadSubscription_threadId_fkey";

-- DropForeignKey
ALTER TABLE "ThreadSubscription" DROP CONSTRAINT "ThreadSubscription_userId_fkey";

-- DropForeignKey
ALTER TABLE "TopicTranslation" DROP CONSTRAINT "TopicTranslation_topicId_fkey";

-- DropForeignKey
ALTER TABLE "UserBadge" DROP CONSTRAINT "UserBadge_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserInterest" DROP CONSTRAINT "UserInterest_topicId_fkey";

-- DropForeignKey
ALTER TABLE "UserInterest" DROP CONSTRAINT "UserInterest_userId_fkey";

-- AddForeignKey
ALTER TABLE "Auth" ADD CONSTRAINT "Auth_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LanguageLearning" ADD CONSTRAINT "LanguageLearning_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "Language"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LanguageLearning" ADD CONSTRAINT "LanguageLearning_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LanguageRelation" ADD CONSTRAINT "LanguageRelation_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "Language"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LanguageRelation" ADD CONSTRAINT "LanguageRelation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LanguageNative" ADD CONSTRAINT "LanguageNative_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "Language"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LanguageNative" ADD CONSTRAINT "LanguageNative_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SocialMedia" ADD CONSTRAINT "SocialMedia_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "Language"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_headlineImageId_fkey" FOREIGN KEY ("headlineImageId") REFERENCES "HeadlineImage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TopicTranslation" ADD CONSTRAINT "TopicTranslation_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserInterest" ADD CONSTRAINT "UserInterest_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserInterest" ADD CONSTRAINT "UserInterest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostTopic" ADD CONSTRAINT "PostTopic_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostTopic" ADD CONSTRAINT "PostTopic_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostClap" ADD CONSTRAINT "PostClap_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostClap" ADD CONSTRAINT "PostClap_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentThanks" ADD CONSTRAINT "CommentThanks_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentThanks" ADD CONSTRAINT "CommentThanks_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostCommentThanks" ADD CONSTRAINT "PostCommentThanks_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_threadId_fkey" FOREIGN KEY ("threadId") REFERENCES "Thread"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostComment" ADD CONSTRAINT "PostComment_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostComment" ADD CONSTRAINT "PostComment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Thread" ADD CONSTRAINT "Thread_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Prompt" ADD CONSTRAINT "Prompt_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ThreadSubscription" ADD CONSTRAINT "ThreadSubscription_threadId_fkey" FOREIGN KEY ("threadId") REFERENCES "Thread"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ThreadSubscription" ADD CONSTRAINT "ThreadSubscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostCommentSubscription" ADD CONSTRAINT "PostCommentSubscription_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostCommentSubscription" ADD CONSTRAINT "PostCommentSubscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MembershipSubscription" ADD CONSTRAINT "MembershipSubscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MembershipSubscriptionInvoice" ADD CONSTRAINT "MembershipSubscriptionInvoice_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MembershipSubscriptionInvoiceItem" ADD CONSTRAINT "MembershipSubscriptionInvoiceItem_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "MembershipSubscriptionInvoice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserBadge" ADD CONSTRAINT "UserBadge_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PendingNotification" ADD CONSTRAINT "PendingNotification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InAppNotification" ADD CONSTRAINT "InAppNotification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InAppNotification" ADD CONSTRAINT "InAppNotification_triggeringUserId_fkey" FOREIGN KEY ("triggeringUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ThreadCommentThanksNotification" ADD CONSTRAINT "ThreadCommentThanksNotification_thanksId_fkey" FOREIGN KEY ("thanksId") REFERENCES "CommentThanks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ThreadCommentThanksNotification" ADD CONSTRAINT "ThreadCommentThanksNotification_notificationId_fkey" FOREIGN KEY ("notificationId") REFERENCES "InAppNotification"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ThreadCommentNotification" ADD CONSTRAINT "ThreadCommentNotification_notificationId_fkey" FOREIGN KEY ("notificationId") REFERENCES "InAppNotification"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ThreadCommentNotification" ADD CONSTRAINT "ThreadCommentNotification_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostCommentNotification" ADD CONSTRAINT "PostCommentNotification_notificationId_fkey" FOREIGN KEY ("notificationId") REFERENCES "InAppNotification"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostCommentNotification" ADD CONSTRAINT "PostCommentNotification_postCommentId_fkey" FOREIGN KEY ("postCommentId") REFERENCES "PostComment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NewFollowerNotification" ADD CONSTRAINT "NewFollowerNotification_notificationId_fkey" FOREIGN KEY ("notificationId") REFERENCES "InAppNotification"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NewFollowerNotification" ADD CONSTRAINT "NewFollowerNotification_followingUserId_fkey" FOREIGN KEY ("followingUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostClapNotification" ADD CONSTRAINT "PostClapNotification_notificationId_fkey" FOREIGN KEY ("notificationId") REFERENCES "InAppNotification"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostClapNotification" ADD CONSTRAINT "PostClapNotification_postClapId_fkey" FOREIGN KEY ("postClapId") REFERENCES "PostClap"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NewPostNotification" ADD CONSTRAINT "NewPostNotification_notificationId_fkey" FOREIGN KEY ("notificationId") REFERENCES "InAppNotification"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NewPostNotification" ADD CONSTRAINT "NewPostNotification_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- RenameIndex
ALTER INDEX "Auth.userId_unique" RENAME TO "Auth_userId_key";

-- RenameIndex
ALTER INDEX "CommentThanks.authorId_commentId_unique" RENAME TO "CommentThanks_authorId_commentId_key";

-- RenameIndex
ALTER INDEX "InAppNotification.userId_type_postId_triggeringUserId_unique" RENAME TO "InAppNotification_userId_type_postId_triggeringUserId_key";

-- RenameIndex
ALTER INDEX "Language.name_dialect_unique" RENAME TO "Language_name_dialect_key";

-- RenameIndex
ALTER INDEX "LanguageLearning.userId_languageId_unique" RENAME TO "LanguageLearning_userId_languageId_key";

-- RenameIndex
ALTER INDEX "LanguageNative.userId_languageId_unique" RENAME TO "LanguageNative_userId_languageId_key";

-- RenameIndex
ALTER INDEX "LanguageRelation.userId_languageId_unique" RENAME TO "LanguageRelation_userId_languageId_key";

-- RenameIndex
ALTER INDEX "MembershipSubscription.stripeSubscriptionId_unique" RENAME TO "MembershipSubscription_stripeSubscriptionId_key";

-- RenameIndex
ALTER INDEX "MembershipSubscription.userId_unique" RENAME TO "MembershipSubscription_userId_key";

-- RenameIndex
ALTER INDEX "Post.headlineImageId_unique" RENAME TO "Post_headlineImageId_key";

-- RenameIndex
ALTER INDEX "Post.privateShareId_unique" RENAME TO "Post_privateShareId_key";

-- RenameIndex
ALTER INDEX "PostClap.authorId_postId_unique" RENAME TO "PostClap_authorId_postId_key";

-- RenameIndex
ALTER INDEX "PostCommentSubscription.userId_postId_unique" RENAME TO "PostCommentSubscription_userId_postId_key";

-- RenameIndex
ALTER INDEX "PostCommentThanks.authorId_postCommentId_unique" RENAME TO "PostCommentThanks_authorId_postCommentId_key";

-- RenameIndex
ALTER INDEX "PostTopic.postId_topicId_unique" RENAME TO "PostTopic_postId_topicId_key";

-- RenameIndex
ALTER INDEX "SocialMedia.userId_unique" RENAME TO "SocialMedia_userId_key";

-- RenameIndex
ALTER INDEX "ThreadSubscription.userId_threadId_unique" RENAME TO "ThreadSubscription_userId_threadId_key";

-- RenameIndex
ALTER INDEX "TopicTranslation.uiLanguage_topicId_unique" RENAME TO "TopicTranslation_uiLanguage_topicId_key";

-- RenameIndex
ALTER INDEX "User.email_unique" RENAME TO "User_email_key";

-- RenameIndex
ALTER INDEX "User.handle_unique" RENAME TO "User_handle_key";

-- RenameIndex
ALTER INDEX "UserBadge.userId_type_unique" RENAME TO "UserBadge_userId_type_key";

-- RenameIndex
ALTER INDEX "UserInterest.userId_topicId_unique" RENAME TO "UserInterest_userId_topicId_key";
