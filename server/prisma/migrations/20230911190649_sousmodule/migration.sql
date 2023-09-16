-- AlterTable
ALTER TABLE `cours` ADD COLUMN `sousModuleId` INTEGER NULL;

-- CreateTable
CREATE TABLE `SousModule` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `Icon` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Cours` ADD CONSTRAINT `Cours_sousModuleId_fkey` FOREIGN KEY (`sousModuleId`) REFERENCES `SousModule`(`Id`) ON DELETE SET NULL ON UPDATE CASCADE;
