-- CreateEnum
CREATE TYPE "NotificationReadStatus" AS ENUM ('READ', 'UNREAD');

-- AlterTable
ALTER TABLE "InAppNotification" ADD COLUMN     "readStatus" "NotificationReadStatus" NOT NULL DEFAULT E'UNREAD';
