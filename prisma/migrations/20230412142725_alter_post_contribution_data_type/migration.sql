/*
  Warnings:

  - The `contribution` column on the `Post` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "contribution",
ADD COLUMN     "contribution" DOUBLE PRECISION;
