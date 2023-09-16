/*
  Warnings:

  - You are about to drop the column `Semester1Date` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `Semester2Date` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `Semester1Date`,
    DROP COLUMN `Semester2Date`,
    ADD COLUMN `Date1` DATETIME(3) NULL,
    ADD COLUMN `Date2` DATETIME(3) NULL;
