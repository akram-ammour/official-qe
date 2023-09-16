-- CreateTable
CREATE TABLE `Cours` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `moduleId` INTEGER NOT NULL,

    UNIQUE INDEX `Cours_title_key`(`title`),
    INDEX `Cours_moduleId_fkey`(`moduleId`),
    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `exam` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `Year` INTEGER NOT NULL,
    `Session` ENUM('N', 'R', 'E') NOT NULL,
    `ModuleId` INTEGER NOT NULL,

    INDEX `Exam_ModuleId_fkey`(`ModuleId`),
    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `module` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `Semester` ENUM('SEMESTER1', 'SEMESTER2') NOT NULL,
    `Title` VARCHAR(191) NOT NULL,
    `Icon` VARCHAR(191) NOT NULL,
    `Year` ENUM('FIRST', 'SECOND', 'THIRD', 'FOURTH', 'FIFTH') NOT NULL,
    `color` ENUM('RED', 'BLUE', 'GREEN', 'PURPLE', 'BLACK', 'YELLOW', 'ORANGE', 'LIGHTBLUE') NOT NULL DEFAULT 'RED',

    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `options` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `questionId` INTEGER NOT NULL,
    `Choice` VARCHAR(191) NOT NULL,
    `Value` BOOLEAN NOT NULL,

    INDEX `Options_questionId_fkey`(`questionId`),
    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `points` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `totalPoints` BIGINT NOT NULL,
    `userId` INTEGER NOT NULL,
    `moduleId` INTEGER NOT NULL,

    INDEX `Points_moduleId_fkey`(`moduleId`),
    INDEX `Points_userId_fkey`(`userId`),
    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `question` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `Text` VARCHAR(191) NOT NULL,
    `CasClinique` VARCHAR(191) NULL,
    `Number` INTEGER NOT NULL,
    `CoursId` INTEGER NOT NULL,
    `ExamId` INTEGER NOT NULL,
    `Image` VARCHAR(191) NULL,
    `ParentId` INTEGER NULL,

    INDEX `Question_CoursId_fkey`(`CoursId`),
    INDEX `Question_ExamId_fkey`(`ExamId`),
    INDEX `Question_ParentId_fkey`(`ParentId`),
    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `Fname` VARCHAR(191) NOT NULL,
    `Lname` VARCHAR(191) NOT NULL,
    `Email` VARCHAR(191) NOT NULL,
    `Password` VARCHAR(191) NOT NULL,
    `Plan` ENUM('FIRST', 'SECOND', 'THIRD', 'FOURTH', 'FIFTH') NOT NULL,
    `Semester1` BOOLEAN NOT NULL DEFAULT true,
    `Semester2` BOOLEAN NOT NULL DEFAULT false,
    `Subscription` ENUM('FREE', 'PAID', 'PLUS') NOT NULL DEFAULT 'FREE',

    UNIQUE INDEX `User_Email_key`(`Email`),
    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usercourseanswer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `questionId` INTEGER NOT NULL,
    `coursId` INTEGER NOT NULL,

    INDEX `UserCourseAnswer_coursId_fkey`(`coursId`),
    INDEX `UserCourseAnswer_questionId_fkey`(`questionId`),
    INDEX `UserCourseAnswer_userId_fkey`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usercourseprogress` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `coursId` INTEGER NOT NULL,
    `questionId` INTEGER NOT NULL,
    `isCorrect` BOOLEAN NOT NULL,

    INDEX `UserCourseProgress_coursId_fkey`(`coursId`),
    INDEX `UserCourseProgress_questionId_fkey`(`questionId`),
    INDEX `UserCourseProgress_userId_fkey`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `userexamanswer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `questionId` INTEGER NOT NULL,
    `examId` INTEGER NOT NULL,

    INDEX `UserExamAnswer_examId_fkey`(`examId`),
    INDEX `UserExamAnswer_questionId_fkey`(`questionId`),
    INDEX `UserExamAnswer_userId_fkey`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `userexamprogress` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `examId` INTEGER NOT NULL,
    `questionId` INTEGER NOT NULL,
    `isCorrect` BOOLEAN NOT NULL,

    INDEX `UserExamProgress_examId_fkey`(`examId`),
    INDEX `UserExamProgress_questionId_fkey`(`questionId`),
    INDEX `UserExamProgress_userId_fkey`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_optionstousercourseanswer` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_optionstousercourseanswer_AB_unique`(`A`, `B`),
    INDEX `_optionstousercourseanswer_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_optionstouserexamanswer` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_optionstouserexamanswer_AB_unique`(`A`, `B`),
    INDEX `_optionstouserexamanswer_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Cours` ADD CONSTRAINT `Cours_moduleId_fkey` FOREIGN KEY (`moduleId`) REFERENCES `module`(`Id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `exam` ADD CONSTRAINT `Exam_ModuleId_fkey` FOREIGN KEY (`ModuleId`) REFERENCES `module`(`Id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `options` ADD CONSTRAINT `Options_questionId_fkey` FOREIGN KEY (`questionId`) REFERENCES `question`(`Id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `points` ADD CONSTRAINT `Points_moduleId_fkey` FOREIGN KEY (`moduleId`) REFERENCES `module`(`Id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `points` ADD CONSTRAINT `Points_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`Id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `question` ADD CONSTRAINT `Question_CoursId_fkey` FOREIGN KEY (`CoursId`) REFERENCES `Cours`(`Id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `question` ADD CONSTRAINT `Question_ExamId_fkey` FOREIGN KEY (`ExamId`) REFERENCES `exam`(`Id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `question` ADD CONSTRAINT `Question_ParentId_fkey` FOREIGN KEY (`ParentId`) REFERENCES `question`(`Id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `usercourseanswer` ADD CONSTRAINT `UserCourseAnswer_questionId_fkey` FOREIGN KEY (`questionId`) REFERENCES `question`(`Id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `usercourseanswer` ADD CONSTRAINT `UserCourseAnswer_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`Id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `userexamanswer` ADD CONSTRAINT `UserExamAnswer_questionId_fkey` FOREIGN KEY (`questionId`) REFERENCES `question`(`Id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `userexamanswer` ADD CONSTRAINT `UserExamAnswer_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`Id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_optionstousercourseanswer` ADD CONSTRAINT `_optionstousercourseanswer_A_fkey` FOREIGN KEY (`A`) REFERENCES `options`(`Id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_optionstousercourseanswer` ADD CONSTRAINT `_optionstousercourseanswer_B_fkey` FOREIGN KEY (`B`) REFERENCES `usercourseanswer`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_optionstouserexamanswer` ADD CONSTRAINT `_optionstouserexamanswer_A_fkey` FOREIGN KEY (`A`) REFERENCES `options`(`Id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_optionstouserexamanswer` ADD CONSTRAINT `_optionstouserexamanswer_B_fkey` FOREIGN KEY (`B`) REFERENCES `userexamanswer`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
