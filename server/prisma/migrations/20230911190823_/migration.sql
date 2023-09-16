/*
  Warnings:

  - Added the required column `moduleId` to the `SousModule` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `sousmodule` ADD COLUMN `moduleId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `SousModule` ADD CONSTRAINT `SousModule_moduleId_fkey` FOREIGN KEY (`moduleId`) REFERENCES `Module`(`Id`) ON DELETE RESTRICT ON UPDATE CASCADE;
