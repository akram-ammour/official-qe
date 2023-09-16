/*
  Warnings:

  - A unique constraint covering the columns `[RefreshToken]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `RefreshToken` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_RefreshToken_key` ON `User`(`RefreshToken`);
