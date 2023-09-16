-- AlterTable
ALTER TABLE `module` ADD COLUMN `UserTitle` ENUM('Grandmaster', 'Master', 'Genius', 'Learner', 'Rookie', 'Noob') NOT NULL DEFAULT 'Noob';
