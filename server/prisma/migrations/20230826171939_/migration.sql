/*
  Warnings:

  - You are about to alter the column `totalPoints` on the `points` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.

*/
-- AlterTable
ALTER TABLE `points` MODIFY `totalPoints` INTEGER NOT NULL DEFAULT 0;
