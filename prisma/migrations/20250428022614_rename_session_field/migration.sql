/*
  Warnings:

  - You are about to drop the column `sessions` on the `Course` table. All the data in the column will be lost.
  - The `description` column on the `Course` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `session` to the `Course` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Course" DROP COLUMN "sessions",
ADD COLUMN     "session" TEXT NOT NULL,
DROP COLUMN "description",
ADD COLUMN     "description" TEXT[];
