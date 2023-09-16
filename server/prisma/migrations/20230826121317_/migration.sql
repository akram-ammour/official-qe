/*
  Warnings:

  - A unique constraint covering the columns `[userId,moduleId]` on the table `Points` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `points` DROP FOREIGN KEY `Points_moduleId_fkey`;

-- DropForeignKey
ALTER TABLE `points` DROP FOREIGN KEY `Points_userId_fkey`;

-- AlterTable
ALTER TABLE `points` ADD COLUMN `currentTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `totalPoints` BIGINT NOT NULL DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX `Points_userId_moduleId_key` ON `Points`(`userId`, `moduleId`);

-- AddForeignKey
ALTER TABLE `Points` ADD CONSTRAINT `Points_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`Id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Points` ADD CONSTRAINT `Points_moduleId_fkey` FOREIGN KEY (`moduleId`) REFERENCES `Module`(`Id`) ON DELETE CASCADE ON UPDATE CASCADE;
