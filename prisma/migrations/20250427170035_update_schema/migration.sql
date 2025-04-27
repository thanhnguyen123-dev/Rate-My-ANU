/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[reviewId,userId]` on the table `Like` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Like` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_reviewId_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_courseCode_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_userId_fkey";

-- AlterTable
ALTER TABLE "Like" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Review" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "userAvatarUrl" TEXT,
ADD COLUMN     "userEmail" TEXT,
ADD COLUMN     "userName" TEXT;

-- DropTable
DROP TABLE "User";

-- CreateIndex
CREATE INDEX "Like_userId_idx" ON "Like"("userId");

-- CreateIndex
CREATE INDEX "Like_reviewId_idx" ON "Like"("reviewId");

-- CreateIndex
CREATE UNIQUE INDEX "Like_reviewId_userId_key" ON "Like"("reviewId", "userId");

-- CreateIndex
CREATE INDEX "Review_userId_idx" ON "Review"("userId");

-- CreateIndex
CREATE INDEX "Review_courseCode_idx" ON "Review"("courseCode");

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_courseCode_fkey" FOREIGN KEY ("courseCode") REFERENCES "Course"("courseCode") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "Review"("id") ON DELETE CASCADE ON UPDATE CASCADE;
