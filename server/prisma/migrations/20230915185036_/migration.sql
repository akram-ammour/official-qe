/*
  Warnings:

  - You are about to drop the column `ParentId` on the `comment` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `comment` DROP FOREIGN KEY `Comment_ParentId_fkey`;

-- AlterTable
ALTER TABLE `comment` DROP COLUMN `ParentId`;
