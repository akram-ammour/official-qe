-- AlterTable
ALTER TABLE `user` ADD COLUMN `Role` ENUM('USER', 'ADMIN') NOT NULL DEFAULT 'USER';
