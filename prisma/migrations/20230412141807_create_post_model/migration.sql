/*
  Warnings:

  - A unique constraint covering the columns `[phone]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `gender` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('Masculino', 'Feminino', 'Homoafetivo', 'Transsexual', 'Bissexual', 'Outros');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "gender" "Gender" NOT NULL,
ADD COLUMN     "imageUrl" TEXT,
ADD COLUMN     "phone" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "partners" TEXT NOT NULL,
    "contribution" TEXT,
    "sharedCosts" TEXT,
    "about" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_phone_key" ON "users"("phone");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
