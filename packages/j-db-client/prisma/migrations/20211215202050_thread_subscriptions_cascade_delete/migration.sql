-- DropForeignKey
ALTER TABLE "ThreadSubscription" DROP CONSTRAINT "ThreadSubscription_threadId_fkey";

-- DropForeignKey
ALTER TABLE "ThreadSubscription" DROP CONSTRAINT "ThreadSubscription_userId_fkey";

-- AddForeignKey
ALTER TABLE "ThreadSubscription" ADD CONSTRAINT "ThreadSubscription_threadId_fkey" FOREIGN KEY ("threadId") REFERENCES "Thread"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ThreadSubscription" ADD CONSTRAINT "ThreadSubscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
