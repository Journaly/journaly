/*
  Warnings:

  - A unique constraint covering the columns `[userId,type,postId,triggeringUserId]` on the table `InAppNotification` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "InAppNotification.userId_type_postId_triggeringUserId_unique" ON "InAppNotification"("userId", "type", "postId", "triggeringUserId");
