/*
  Warnings:

  - Made the column `Date1` on table `user` required. This step will fail if there are existing NULL values in that column.
  - Made the column `Date2` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `user` MODIFY `Date1` DATETIME(3) NOT NULL,
    MODIFY `Date2` DATETIME(3) NOT NULL;
