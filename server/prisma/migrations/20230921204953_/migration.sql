-- CreateTable
CREATE TABLE `User` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `Fname` VARCHAR(191) NOT NULL,
    `Lname` VARCHAR(191) NOT NULL,
    `Email` VARCHAR(191) NOT NULL,
    `Password` VARCHAR(191) NOT NULL,
    `Plan` ENUM('FIRST', 'SECOND', 'THIRD', 'FOURTH', 'FIFTH') NOT NULL,
    `Semester1` BOOLEAN NOT NULL DEFAULT true,
    `Semester2` BOOLEAN NOT NULL DEFAULT false,
    `Subscription` ENUM('FREE', 'PAID', 'PLUS') NOT NULL DEFAULT 'FREE',
    `FullName` VARCHAR(191) NULL,
    `RefreshToken` VARCHAR(191) NULL,
    `Date1` DATETIME(3) NULL,
    `Date2` DATETIME(3) NULL,
    `Role` ENUM('USER', 'ADMIN') NOT NULL DEFAULT 'USER',

    UNIQUE INDEX `User_Email_key`(`Email`),
    UNIQUE INDEX `User_RefreshToken_key`(`RefreshToken`),
    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Module` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `Year` ENUM('FIRST', 'SECOND', 'THIRD', 'FOURTH', 'FIFTH') NOT NULL,
    `Semester` ENUM('SEMESTER1', 'SEMESTER2') NOT NULL,
    `Title` VARCHAR(191) NOT NULL,
    `Icon` VARCHAR(191) NOT NULL,
    `color` ENUM('RED', 'BLUE', 'GREEN', 'PURPLE', 'BLACK', 'YELLOW', 'ORANGE', 'LIGHTBLUE') NOT NULL DEFAULT 'RED',
    `isFree` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Points` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `totalPoints` INTEGER NOT NULL DEFAULT 0,
    `userId` INTEGER NOT NULL,
    `moduleId` INTEGER NOT NULL,
    `currentTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Points_userId_moduleId_key`(`userId`, `moduleId`),
    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SousModule` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `Icon` VARCHAR(191) NOT NULL,
    `moduleId` INTEGER NOT NULL,

    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Cours` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `moduleId` INTEGER NOT NULL,
    `sousModuleId` INTEGER NULL,

    UNIQUE INDEX `Cours_title_key`(`title`),
    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Exam` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `Year` INTEGER NOT NULL,
    `Session` ENUM('N', 'R', 'E') NOT NULL,
    `ModuleId` INTEGER NOT NULL,
    `isDifferent` BOOLEAN NOT NULL DEFAULT false,
    `Title` VARCHAR(191) NULL,
    `Description` LONGTEXT NULL,

    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Question` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `Text` VARCHAR(191) NOT NULL,
    `CasClinique` VARCHAR(191) NULL,
    `Number` INTEGER NOT NULL,
    `CoursId` INTEGER NOT NULL,
    `ExamId` INTEGER NOT NULL,
    `Image` VARCHAR(191) NULL,
    `ParentId` INTEGER NULL,

    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Options` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `questionId` INTEGER NOT NULL,
    `Choice` VARCHAR(191) NOT NULL,
    `Value` BOOLEAN NOT NULL,

    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserExamAnswer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `examId` INTEGER NOT NULL,
    `questionId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserCourseAnswer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `coursId` INTEGER NOT NULL,
    `questionId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserCourseProgress` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `coursId` INTEGER NOT NULL,
    `questionId` INTEGER NOT NULL,
    `isCorrect` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserExamProgress` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `examId` INTEGER NOT NULL,
    `questionId` INTEGER NOT NULL,
    `isCorrect` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Comment` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `Message` VARCHAR(191) NOT NULL,
    `userId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `questionId` INTEGER NOT NULL,

    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Like` (
    `userId` INTEGER NOT NULL,
    `commentsId` INTEGER NOT NULL,

    PRIMARY KEY (`userId`, `commentsId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_OptionsToUserExamAnswer` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_OptionsToUserExamAnswer_AB_unique`(`A`, `B`),
    INDEX `_OptionsToUserExamAnswer_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_OptionsToUserCourseAnswer` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_OptionsToUserCourseAnswer_AB_unique`(`A`, `B`),
    INDEX `_OptionsToUserCourseAnswer_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Points` ADD CONSTRAINT `Points_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`Id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Points` ADD CONSTRAINT `Points_moduleId_fkey` FOREIGN KEY (`moduleId`) REFERENCES `Module`(`Id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SousModule` ADD CONSTRAINT `SousModule_moduleId_fkey` FOREIGN KEY (`moduleId`) REFERENCES `Module`(`Id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cours` ADD CONSTRAINT `Cours_moduleId_fkey` FOREIGN KEY (`moduleId`) REFERENCES `Module`(`Id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cours` ADD CONSTRAINT `Cours_sousModuleId_fkey` FOREIGN KEY (`sousModuleId`) REFERENCES `SousModule`(`Id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Exam` ADD CONSTRAINT `Exam_ModuleId_fkey` FOREIGN KEY (`ModuleId`) REFERENCES `Module`(`Id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Question` ADD CONSTRAINT `Question_CoursId_fkey` FOREIGN KEY (`CoursId`) REFERENCES `Cours`(`Id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Question` ADD CONSTRAINT `Question_ExamId_fkey` FOREIGN KEY (`ExamId`) REFERENCES `Exam`(`Id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Question` ADD CONSTRAINT `Question_ParentId_fkey` FOREIGN KEY (`ParentId`) REFERENCES `Question`(`Id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Options` ADD CONSTRAINT `Options_questionId_fkey` FOREIGN KEY (`questionId`) REFERENCES `Question`(`Id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserExamAnswer` ADD CONSTRAINT `UserExamAnswer_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`Id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserExamAnswer` ADD CONSTRAINT `UserExamAnswer_examId_fkey` FOREIGN KEY (`examId`) REFERENCES `Exam`(`Id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserExamAnswer` ADD CONSTRAINT `UserExamAnswer_questionId_fkey` FOREIGN KEY (`questionId`) REFERENCES `Question`(`Id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserCourseAnswer` ADD CONSTRAINT `UserCourseAnswer_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`Id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserCourseAnswer` ADD CONSTRAINT `UserCourseAnswer_coursId_fkey` FOREIGN KEY (`coursId`) REFERENCES `Cours`(`Id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserCourseAnswer` ADD CONSTRAINT `UserCourseAnswer_questionId_fkey` FOREIGN KEY (`questionId`) REFERENCES `Question`(`Id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserCourseProgress` ADD CONSTRAINT `UserCourseProgress_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`Id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserCourseProgress` ADD CONSTRAINT `UserCourseProgress_coursId_fkey` FOREIGN KEY (`coursId`) REFERENCES `Cours`(`Id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserCourseProgress` ADD CONSTRAINT `UserCourseProgress_questionId_fkey` FOREIGN KEY (`questionId`) REFERENCES `Question`(`Id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserExamProgress` ADD CONSTRAINT `UserExamProgress_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`Id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserExamProgress` ADD CONSTRAINT `UserExamProgress_examId_fkey` FOREIGN KEY (`examId`) REFERENCES `Exam`(`Id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserExamProgress` ADD CONSTRAINT `UserExamProgress_questionId_fkey` FOREIGN KEY (`questionId`) REFERENCES `Question`(`Id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`Id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_questionId_fkey` FOREIGN KEY (`questionId`) REFERENCES `Question`(`Id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Like` ADD CONSTRAINT `Like_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`Id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Like` ADD CONSTRAINT `Like_commentsId_fkey` FOREIGN KEY (`commentsId`) REFERENCES `Comment`(`Id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_OptionsToUserExamAnswer` ADD CONSTRAINT `_OptionsToUserExamAnswer_A_fkey` FOREIGN KEY (`A`) REFERENCES `Options`(`Id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_OptionsToUserExamAnswer` ADD CONSTRAINT `_OptionsToUserExamAnswer_B_fkey` FOREIGN KEY (`B`) REFERENCES `UserExamAnswer`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_OptionsToUserCourseAnswer` ADD CONSTRAINT `_OptionsToUserCourseAnswer_A_fkey` FOREIGN KEY (`A`) REFERENCES `Options`(`Id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_OptionsToUserCourseAnswer` ADD CONSTRAINT `_OptionsToUserCourseAnswer_B_fkey` FOREIGN KEY (`B`) REFERENCES `UserCourseAnswer`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
