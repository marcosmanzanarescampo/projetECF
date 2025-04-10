/*
  Warnings:

  - You are about to drop the column `created_by` on the `Event` table. All the data in the column will be lost.
  - Added the required column `event_createdBy` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_created_by_fkey";

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "created_by",
ADD COLUMN     "event_createdBy" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_event_createdBy_fkey" FOREIGN KEY ("event_createdBy") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
