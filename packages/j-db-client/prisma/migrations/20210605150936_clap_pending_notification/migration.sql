-- AlterTable
ALTER TABLE "PendingNotification" ADD COLUMN     "postClapId" INTEGER;

-- AddForeignKey
ALTER TABLE "PendingNotification" ADD FOREIGN KEY ("postClapId") REFERENCES "PostClap"("id") ON DELETE SET NULL ON UPDATE CASCADE;
