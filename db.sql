-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: localhost    Database: eqe2
-- ------------------------------------------------------
-- Server version	8.0.33

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `_optionstousercourseanswer`
--

DROP TABLE IF EXISTS `_optionstousercourseanswer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `_optionstousercourseanswer` (
  `A` int NOT NULL,
  `B` int NOT NULL,
  UNIQUE KEY `_OptionsToUserCourseAnswer_AB_unique` (`A`,`B`),
  KEY `_OptionsToUserCourseAnswer_B_index` (`B`),
  CONSTRAINT `_OptionsToUserCourseAnswer_A_fkey` FOREIGN KEY (`A`) REFERENCES `options` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `_OptionsToUserCourseAnswer_B_fkey` FOREIGN KEY (`B`) REFERENCES `usercourseanswer` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_optionstousercourseanswer`
--

LOCK TABLES `_optionstousercourseanswer` WRITE;
/*!40000 ALTER TABLE `_optionstousercourseanswer` DISABLE KEYS */;
INSERT INTO `_optionstousercourseanswer` VALUES (218,112),(219,112),(221,112),(222,112),(190,113),(196,113),(204,113),(209,113),(26,114),(1043,114),(1046,114),(31,115),(1047,115),(1049,115),(36,116),(1051,116),(1052,116),(43,117),(47,117),(51,117),(72,118),(78,118),(80,118),(82,118),(53,119),(57,119),(44,120),(64,120),(67,120),(77,121),(84,121),(85,121),(881,122),(886,123);
/*!40000 ALTER TABLE `_optionstousercourseanswer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `_optionstouserexamanswer`
--

DROP TABLE IF EXISTS `_optionstouserexamanswer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `_optionstouserexamanswer` (
  `A` int NOT NULL,
  `B` int NOT NULL,
  UNIQUE KEY `_OptionsToUserExamAnswer_AB_unique` (`A`,`B`),
  KEY `_OptionsToUserExamAnswer_B_index` (`B`),
  CONSTRAINT `_OptionsToUserExamAnswer_A_fkey` FOREIGN KEY (`A`) REFERENCES `options` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `_OptionsToUserExamAnswer_B_fkey` FOREIGN KEY (`B`) REFERENCES `userexamanswer` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_optionstouserexamanswer`
--

LOCK TABLES `_optionstouserexamanswer` WRITE;
/*!40000 ALTER TABLE `_optionstouserexamanswer` DISABLE KEYS */;
INSERT INTO `_optionstouserexamanswer` VALUES (872,83),(874,84);
/*!40000 ALTER TABLE `_optionstouserexamanswer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `_prisma_migrations`
--

DROP TABLE IF EXISTS `_prisma_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text COLLATE utf8mb4_unicode_ci,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` int unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_prisma_migrations`
--

LOCK TABLES `_prisma_migrations` WRITE;
/*!40000 ALTER TABLE `_prisma_migrations` DISABLE KEYS */;
INSERT INTO `_prisma_migrations` VALUES ('2566743e-cc25-42f9-95fa-337d537ad8fe','cd62df32fc0db48cacd8e44c8491103063c41a5e7d17b4e20306f2287bdf0c14','2023-08-16 11:44:49.141','20230816114449_',NULL,NULL,'2023-08-16 11:44:49.045',1),('28ffb6d4-c1e2-456e-9ecf-1a9904c71414','3db0c2e5ed783ea2c71eb00e095d5c7dcc28be528a4ed638949c008ebe8b92ba','2023-08-15 15:11:06.094','20230815151106_dates',NULL,NULL,'2023-08-15 15:11:06.040',1),('3125bf75-9c13-40d3-aaaa-88ddd478169c','8f503298af3c1ac67e0e78bc7996736bb84ee99bd90cb73646f25ae3173c9b68','2023-08-26 17:19:39.475','20230826171939_',NULL,NULL,'2023-08-26 17:19:39.416',1),('3949dc83-a013-4f40-ae73-50051245ecf6','e2e79f6129690820c34b7bcfd0620f3a81fa5e9fffa71d3276660bc2ca2be1b7','2023-09-15 18:50:36.554','20230915185036_',NULL,NULL,'2023-09-15 18:50:36.516',1),('398424f4-971f-433f-aed8-0350da593930','389cd4af3f23e09fdc16eb168025cc92fa2c38ef1b4d6fab03bc533d5a28db01','2023-08-17 20:54:26.393','20230817205426_',NULL,NULL,'2023-08-17 20:54:26.309',1),('525955d4-df14-4825-85d8-94d887b834e7','96c1ec6ad2d491f48099be1e0295cdcda9797683b45470edc3e9d0f33bb7c352','2023-08-02 14:56:42.965','20230802145642_',NULL,NULL,'2023-08-02 14:56:42.937',1),('6389f92e-3f8a-4e48-acf4-3c4a33cb6a0a','f73942772a9d4e94bbcf208209708a81ec7751df94aac9d5f2e673dd30537f7c','2023-08-16 11:22:29.291','20230816112229_',NULL,NULL,'2023-08-16 11:22:29.228',1),('69a6470c-0fa6-4431-9c9b-2378132c6627','32e8245cee26f1937c98cc5968c185f769705434ff96b063664a3d9bd5a392ef','2023-08-12 11:26:57.069','20230812112656_',NULL,NULL,'2023-08-12 11:26:56.901',1),('7df4bd51-262a-4b94-9cd1-e832aeb8069c','f71b53f7aee735315ae5bc85929f41736ed3e19e513139f6eb3430904e6a29ef','2023-08-02 14:33:50.425','20230802143349_',NULL,NULL,'2023-08-02 14:33:49.637',1),('7fde1fcd-ffde-448e-8813-91e6a4ca815b','d8ce5b55f5a552b375d063ee42d804f810032a6434b19a8773733f27d21cb7f9','2023-08-24 18:43:35.523','20230824184335_',NULL,NULL,'2023-08-24 18:43:35.505',1),('8ec11304-1d78-4f18-9559-c2e4994772dd','6b50f9cf180c4130dc372ec063b6f7e220c9c565f74d1ac83560e0dbf51582e6','2023-09-11 19:08:23.439','20230911190823_',NULL,NULL,'2023-09-11 19:08:23.405',1),('9b92df57-e2c1-41af-b4b3-f3822cdce61e','cc9eb7e474d6a49ff94d30548f1a36f65f15c7665e8e5d33104d7c3194f99b85','2023-08-24 18:42:17.156','20230824184217_ranks',NULL,NULL,'2023-08-24 18:42:17.118',1),('9ec7a399-66a9-4e15-8d55-432361d387f0','03694a1681632d3e90300575576543b60a38f882f54311eb967984cf0bd70679','2023-08-17 20:02:17.147','20230817200217_exam_description',NULL,NULL,'2023-08-17 20:02:17.076',1),('ac7ae68c-7c0f-41ea-9eb8-5abda737ea84','bb7bd2df5ecc043fefa4319849ee745ebfeb93a13763e832cc9c2b2ad251d13e','2023-09-11 19:06:49.701','20230911190649_sousmodule',NULL,NULL,'2023-09-11 19:06:49.630',1),('ae6e92c4-7a77-4363-b732-6e69a0e4d420','170bf3bef745eda9f26bd36b3cb3a86a5001df55225dd07ceda6af50c46dcf67','2023-08-26 12:13:17.311','20230826121317_',NULL,NULL,'2023-08-26 12:13:17.216',1),('bc12c863-7f7b-498b-a376-c9bd118010fe','0c2cd5dada690a56db7697f41073142728f0a19088cd0978961956d24a8d99b1','2023-08-16 11:38:51.599','20230816113851_',NULL,NULL,'2023-08-16 11:38:51.492',1),('dab18a8c-9c50-451a-b3a7-d9f42a72589d','d9348f027de09640f0192240f16d8d7dc06af8f41d28ebb6798878519814e928','2023-08-17 19:36:11.238','20230817193611_exceptionnal_exams',NULL,NULL,'2023-08-17 19:36:11.187',1),('de785eba-c25a-4b8e-bc48-d43b599ccdb2','fb649c82e05bfb8f81723e6ba8d0df9f80bc8a87720f936d452c3b2543431731','2023-08-10 13:47:43.096','20230810134743_',NULL,NULL,'2023-08-10 13:47:43.070',1),('e6e950b1-31f4-4674-9efd-b6fe146951ce','530e3f7085ddc556c43268b8d72831670ed4d5ce423c1463b92d97e9993056d3','2023-08-18 18:01:13.692','20230818180113_comments',NULL,NULL,'2023-08-18 18:01:13.179',1),('f30bc929-7164-4f18-8e1c-89e7f5ecfb79','315d456e5f670cf78002d8b03dbf1a9288ed9e3beafe5e06f817bc62ea462159','2023-08-18 18:03:05.126','20230818180304_',NULL,NULL,'2023-08-18 18:03:04.982',1),('fa6aee3e-0834-46a2-8032-d4b30779dae6','7f210b6bc2034703aa4cee7279f042f08cfec2b0c2134c9ea6c70aaf803be6f9','2023-08-10 11:28:35.065','20230810112835_',NULL,NULL,'2023-08-10 11:28:35.022',1);
/*!40000 ALTER TABLE `_prisma_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Message` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` int NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `questionId` int NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `Comment_userId_fkey` (`userId`),
  KEY `Comment_questionId_fkey` (`questionId`),
  CONSTRAINT `Comment_questionId_fkey` FOREIGN KEY (`questionId`) REFERENCES `question` (`Id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Comment_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cours`
--

DROP TABLE IF EXISTS `cours`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cours` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `moduleId` int NOT NULL,
  `sousModuleId` int DEFAULT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `Cours_title_key` (`title`),
  KEY `Cours_moduleId_fkey` (`moduleId`),
  KEY `Cours_sousModuleId_fkey` (`sousModuleId`),
  CONSTRAINT `Cours_moduleId_fkey` FOREIGN KEY (`moduleId`) REFERENCES `module` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Cours_sousModuleId_fkey` FOREIGN KEY (`sousModuleId`) REFERENCES `sousmodule` (`Id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=186 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cours`
--

LOCK TABLES `cours` WRITE;
/*!40000 ALTER TABLE `cours` DISABLE KEYS */;
INSERT INTO `cours` VALUES (1,'Cours introductif',2,NULL),(2,'G├®n├®ralit├®s sur le tube digestif',2,NULL),(3,'Phase buccale et oesophagienne',2,NULL),(4,'├ëtape gastrique',2,NULL),(5,'LÔÇÖ├®tape intestinale',2,NULL),(6,'Physiologie de la s├®cr├®tion biliaire',2,NULL),(7,'Physiologie de la motricit├® intestinale',2,NULL),(8,'L\'absorption intestinale',2,NULL),(9,'Physiologie colique',2,NULL),(10,'Physiologie h├®patique',2,NULL),(11,'Introduction sur la Physiologie respiratoire',2,NULL),(12,'La m├®canique ventilatoire',2,NULL),(13,'Les ├®changes gazeux respiratoires',2,NULL),(14,'Transport du gaz dans le sang',2,NULL),(15,'La bronchomotricit├®',2,NULL),(16,'La r├®gulation de la ventilation',2,NULL),(17,'Cycle cardiaque',2,NULL),(18,'D├®bit cardiaque',2,NULL),(19,'Activit├® ├®lectrique cardiaque',2,NULL),(20,'M├®canismes mol├®culaires de la contraction et du couplage excitation-contraction cardiaque',2,NULL),(21,'Vitesse circulatoire et volume sanguin',2,NULL),(47,'hemato',34,NULL),(48,'La vie du m├®dicament',14,NULL),(49,'Pharmacocin├®tique',14,NULL),(50,'Effets ind├®sirables des m├®dicaments et Pharmacovigilance',14,NULL),(51,'Les interactions m├®dicamenteuses',14,NULL),(52,'Les essais cliniques',14,NULL),(53,'Le suivi th├®rapeutique pharmacologique',14,NULL),(54,'Les r├¿gles g├®n├®rales de la prescription m├®dicamenteuse',14,NULL),(55,'M├®dicament et pathologie du foie',14,NULL),(56,'La prescription m├®dicamenteuse chez l\'enfant et le sujet ├óg├®',14,NULL),(57,'La prescription chez femme enceinte et allaitant',14,NULL),(58,'Anti├®pileptiques',14,NULL),(59,'Antid├®presseurs',14,NULL),(60,'Anxiolytiques',14,NULL),(61,'Anti-bacillaires',14,NULL),(62,'Bronchodilatateurs',14,NULL),(63,'Antitussifs',14,NULL),(64,'Prise en charge hygi├®no-di├®t├®tique et m├®dicamenteuse (les laxatifs)',14,NULL),(65,'Traitement de la maladie ulc├®reuse gastroduod├®nale',14,NULL),(66,'Antispasmodic',14,NULL),(67,'Rein et m├®dicaments',14,NULL),(68,'Les diur├®tiques',14,NULL),(69,'Les anti-inflammatoires',14,NULL),(70,'LÔÇÖinsulinoth├®rapie',14,NULL),(71,'Les antidiab├®tiques',14,NULL),(72,'Antibioth├®rapie - G├®n├®ralit├®s',14,NULL),(73,'B├¬ta-lactamines',14,NULL),(74,'Aminosides',14,NULL),(75,'Glycopeptides',14,NULL),(76,'Imidazol├®s',14,NULL),(77,'Quinolones',14,NULL),(78,'Cyclines',14,NULL),(79,'Macrolides',14,NULL),(80,'Sulfamides',14,NULL),(81,'Ph├®nicol├®s',14,NULL),(82,'Antiviraux',14,NULL),(83,'Antifongiques',14,NULL),(84,'Les antalgiques',14,NULL),(85,'Antithrombotiques 1',14,NULL),(86,'Antithrombotiques 2',14,NULL),(87,'Antithrombotiques 3',14,NULL),(88,'Les inhibiteurs du SRAA',14,NULL),(89,'Les hypolip├®miants',14,NULL),(90,'Les inhibiteurs calciques',14,NULL),(91,'B├®tabloquants',14,NULL),(92,'Anti-angoreux',14,NULL),(93,'Digitaliques',14,NULL),(94,'Moyens dÔÇÖexploration en neuroradiologie',16,NULL),(95,'Imagerie des AVC',16,NULL),(96,'Arbre d├®cisionnel des AVC',16,NULL),(97,'Traumatismes cr├ónio-enc├®phaliques',16,NULL),(98,'S├®miologie radiologique',16,NULL),(99,'Imagerie du tube digestif 1 - Techniques d\'exploration et s├®miologie ├®l├®mentaire',16,NULL),(100,'Imagerie du tube digestif 2',16,NULL),(101,'Imagerie du foie',16,NULL),(102,'Imagerie du pancr├®as',16,NULL),(103,'Imagerie des voies biliaires',16,NULL),(104,'Abdomen aigu',16,NULL),(105,'L\'exploration radiologique du thorax',16,NULL),(106,'Sd alv├®olaire et interstitiel + Sd bronchique et troubles de la ventilation',16,NULL),(107,'Syndrome pleural',16,NULL),(108,'Imagerie des tumeurs malignes broncho-pulmonaires + Les infections pulmonaires',16,NULL),(109,'Le m├®diastin normal et pathologique',16,NULL),(110,'Moyen de lÔÇÖexploration radiologique du coeur',16,NULL),(111,'Approche diagnostic dÔÇÖune l├®sion osseuse',16,NULL),(112,'Les tumeurs osseuses malignes',16,NULL),(113,'Les tumeurs osseuses b├®nignes',16,NULL),(114,'Les ost├®oarthrites 1 - les ost├®omy├®lites + les ost├®ites',16,NULL),(115,'Les ost├®oarthrites 2 - Les spondylodiscites',16,NULL),(116,'Exploration radiologique du rachis',16,NULL),(117,'Exploration radiologique de l\'appareil urinaire',16,NULL),(118,'Syndrome obstructif des voies urinaires',16,NULL),(119,'Syndrome de masse r├®nale',16,NULL),(120,'Exploration radiologique du pelvis f├®minin',16,NULL),(121,'Exploration radiobiologique dÔÇÖune masse pelvienne',16,NULL),(122,'Exploration radiologique du sein',16,NULL),(123,'Exploration radiologique du nodule du sein',16,NULL),(124,'Imagerie p├®diatrique - G├®n├®ralit├®s',16,NULL),(125,'Imagerie p├®diatrique ÔÇô Application',16,NULL),(126,'Introduction ├á lÔÇÖanatomie pathologique - Techniques en anatomie pathologique Partie 1',15,NULL),(127,'Techniques en anatomie pathologique - Partie 2',15,NULL),(128,'Introduction ├á la pathologie tumorale',15,NULL),(129,'G├®n├®ralit├®s sur les tumeurs b├®nignes',15,NULL),(130,'Bases fondamentales de lÔÇÖoncogen├¿se',15,NULL),(131,'Cellule canc├®reuse',15,NULL),(132,'M├®tastases',15,NULL),(133,'Stroma tumorale',15,NULL),(134,'Les amyloses',15,NULL),(135,'Les maladies de surcharges',15,NULL),(136,'Les processus inflammatoires',15,NULL),(137,'Les phases de lÔÇÖinflammation',15,NULL),(138,'LÔÇÖInflammation granulomateuse',15,NULL),(139,'LÔÇÖinflammation sp├®cifique',15,NULL),(140,'La cicatrisation',15,NULL),(141,'La pathologie circulatoire',15,NULL),(142,'Epid├®miologie des maladies infectieuses',13,NULL),(143,'Fi├¿vres typho├»des',13,NULL),(144,'Les m├®ningites infectieuses de l\'adulte',13,NULL),(145,'Infection par le virus de lÔÇÖimmunod├®ficience humaine',13,NULL),(146,'La m├®ningo-enc├®phalite tuberculeuse',13,NULL),(147,'Les infections associ├®es aux soins (IAS)',13,NULL),(148,'Rickettsiose - Fi├¿vre Q',13,NULL),(149,'AES',13,NULL),(150,'La rage humaine',13,NULL),(151,'La Brucellose',13,NULL),(152,'Le T├®tanos',13,NULL),(153,'Les infections ├á staphylocoques',13,NULL),(154,'Les infections ├á streptocoques',13,NULL),(155,'Le Chol├®ra',13,NULL),(156,'COVID-19',13,NULL),(157,'Les fi├¿vres persistantes',13,NULL),(158,'Leptospiroses',13,NULL),(159,'Toxico-infections alimentaires collectives (TIAC)',13,NULL),(160,'Borr├®lioses',13,NULL),(161,'Bilharziose uro-g├®nitale',13,NULL),(162,'Le paludisme',13,NULL),(163,'G├®n├®ralit├®s en parasitologies mycologie m├®dicale',13,NULL),(164,'Amibes et amibiases',13,NULL),(165,'Flagelloses digestives et urog├®nitales',13,NULL),(166,'Protozooses intestinales opportunistes',13,NULL),(167,'Paludisme ou Malaria',13,NULL),(168,'Leishmanioses',13,NULL),(169,'Toxoplasmoses',13,NULL),(170,'Les Trypanosomiases : Maladie du sommeil et maladie de Chagas',13,NULL),(171,'N├®matodes et n├®matodoses: Oxyure et trichoc├®phale',13,NULL),(172,'Helminthes ascaris trichine ankylostome',13,NULL),(173,'Syndrome de Larva migrans et N├®matodoses Tissulaires',13,NULL),(174,'N├®matodes et n├®matodoses :Anguillules',13,NULL),(175,'Plathelminthes : Teniasis et cysticerose',13,NULL),(176,'Plathelminthes: Echinococcoses humaines',13,NULL),(177,'Plathelminthes : Echinococcose alveolaire',13,NULL),(178,'Les Plathelminthes : Trematodes',13,NULL),(179,'les distomatoses et ectoparasites',13,NULL),(180,'Champignons filamenteux',13,NULL),(181,'Levures et levuroses',13,NULL),(182,'Autres les champignons inclassables , les champignons dimorphiques',13,NULL);
/*!40000 ALTER TABLE `cours` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `exam`
--

DROP TABLE IF EXISTS `exam`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `exam` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Year` int NOT NULL,
  `Session` enum('N','R','E') COLLATE utf8mb4_unicode_ci NOT NULL,
  `ModuleId` int NOT NULL,
  `Title` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `isDifferent` tinyint(1) NOT NULL DEFAULT '0',
  `Description` longtext COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`Id`),
  KEY `Exam_ModuleId_fkey` (`ModuleId`),
  CONSTRAINT `Exam_ModuleId_fkey` FOREIGN KEY (`ModuleId`) REFERENCES `module` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exam`
--

LOCK TABLES `exam` WRITE;
/*!40000 ALTER TABLE `exam` DISABLE KEYS */;
INSERT INTO `exam` VALUES (2,2021,'N',2,NULL,0,NULL),(3,2020,'N',2,NULL,0,NULL),(19,2019,'N',2,NULL,0,'something ig');
/*!40000 ALTER TABLE `exam` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `like`
--

DROP TABLE IF EXISTS `like`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `like` (
  `userId` int NOT NULL,
  `commentsId` int NOT NULL,
  PRIMARY KEY (`userId`,`commentsId`),
  KEY `Like_commentsId_fkey` (`commentsId`),
  CONSTRAINT `Like_commentsId_fkey` FOREIGN KEY (`commentsId`) REFERENCES `comment` (`Id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Like_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`Id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `like`
--

LOCK TABLES `like` WRITE;
/*!40000 ALTER TABLE `like` DISABLE KEYS */;
/*!40000 ALTER TABLE `like` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `module`
--

DROP TABLE IF EXISTS `module`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `module` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Year` enum('FIRST','SECOND','THIRD','FOURTH','FIFTH') COLLATE utf8mb4_unicode_ci NOT NULL,
  `Semester` enum('SEMESTER1','SEMESTER2') COLLATE utf8mb4_unicode_ci NOT NULL,
  `Title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Icon` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `color` enum('RED','BLUE','GREEN','PURPLE','BLACK','YELLOW','ORANGE','LIGHTBLUE') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'RED',
  `isFree` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `module`
--

LOCK TABLES `module` WRITE;
/*!40000 ALTER TABLE `module` DISABLE KEYS */;
INSERT INTO `module` VALUES (1,'FIRST','SEMESTER1','Anatomie 1','tibia','RED',1),(2,'SECOND','SEMESTER1','Physiologie 1','pulmonology','BLUE',1),(3,'FIRST','SEMESTER2','Anatomie 2','gastroenterology','RED',0),(4,'FIRST','SEMESTER1','Biochimie Fondamentale','science','PURPLE',0),(5,'FIRST','SEMESTER1','Sant├® publique','bar_chart_4_bars','YELLOW',0),(7,'SECOND','SEMESTER1','Anatomie 3','neurology','YELLOW',0),(8,'SECOND','SEMESTER2','anatomie 4','ophthalmology','BLUE',0),(9,'SECOND','SEMESTER2','Biochimie Clinique','science','PURPLE',0),(10,'SECOND','SEMESTER1','Microbiologie','microbiology','GREEN',0),(11,'FIRST','SEMESTER1','Tice & communication','computer','BLACK',0),(12,'SECOND','SEMESTER2','H├®matologie Fondamentale','hematology','RED',1),(13,'THIRD','SEMESTER1','Maladie Infectieuse - Parasitologie - mycologie','medical_mask','GREEN',0),(14,'THIRD','SEMESTER1','Pharmacologie','pill','BLUE',0),(15,'THIRD','SEMESTER1','Anatomie Pathologique','biotech','RED',1),(16,'THIRD','SEMESTER1','Radiologie Imagerie','radiology','BLACK',0),(19,'FIRST','SEMESTER2','Histologie 1','hematology','RED',1),(20,'FIRST','SEMESTER2','Biophysique','warning','RED',0),(21,'FIRST','SEMESTER2','TEC','cognition','RED',0),(22,'FIRST','SEMESTER2','Histoire de la medecine - Psychologie et sociologie','hourglass_top','RED',0),(23,'SECOND','SEMESTER1','S├®miologie 1','vital_signs','BLACK',0),(24,'SECOND','SEMESTER1','Histologie 2','hematology','PURPLE',0),(25,'FIRST','SEMESTER1','Biologie','genetics','RED',0),(26,'FIRST','SEMESTER1','Terminologie et Methodologie','match_word','RED',0),(27,'SECOND','SEMESTER1','Medex et Secourisme','ecg','LIGHTBLUE',0),(28,'SECOND','SEMESTER2','S├®miologie 2','urology','YELLOW',0),(29,'SECOND','SEMESTER2','Physiologie 2','nephrology','ORANGE',0),(30,'THIRD','SEMESTER2','Patho Digestive','gastroenterology','RED',0),(31,'THIRD','SEMESTER2','Patho Respiratoire','rib_cage','RED',1),(32,'THIRD','SEMESTER2','Patho Cardiaque','cardiology','RED',0),(33,'FOURTH','SEMESTER1','Neurologie - Neurochirurgie','neurology','YELLOW',0),(34,'FOURTH','SEMESTER1','H├®matologie - Oncologie','hematology','RED',0),(35,'FOURTH','SEMESTER1','Glandes endocrines et rev├¬tement cutan├®s','endocrinology','PURPLE',0),(36,'FOURTH','SEMESTER1','Maladie de l\'enfant','pediatrics','BLUE',0),(37,'FOURTH','SEMESTER2','Maladie de l\'appareil locomoteur','femur_alt','BLUE',0),(38,'FOURTH','SEMESTER2','Immunopath - G├®n├®tique - Maladie de syst├¿me','immunology','GREEN',0),(39,'FOURTH','SEMESTER2','Anapath','biotech','YELLOW',0),(40,'FIFTH','SEMESTER1','Gyneco Obst├®trique','gynecology','PURPLE',0),(41,'FIFTH','SEMESTER1','ORL - Maxillo - Ophtalmo','ent','LIGHTBLUE',0);
/*!40000 ALTER TABLE `module` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `options`
--

DROP TABLE IF EXISTS `options`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `options` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `questionId` int NOT NULL,
  `Choice` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Value` tinyint(1) NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `Options_questionId_fkey` (`questionId`),
  CONSTRAINT `Options_questionId_fkey` FOREIGN KEY (`questionId`) REFERENCES `question` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1117 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `options`
--

LOCK TABLES `options` WRITE;
/*!40000 ALTER TABLE `options` DISABLE KEYS */;
INSERT INTO `options` VALUES (26,6,'Diaphragme',1),(31,7,'Est le principal muscle inspiratoire',1),(36,8,'Volume de r├®serve inspiratoire (VRI)',1),(41,12,'Muscles sterno cl├®ido masto├»dien',0),(42,11,'La ventilation est meilleure aux sommets pulmonaires.',0),(43,9,'DEM 75%',1),(44,14,'Est le principal muscle inspiratoire',1),(45,12,'Diaphragme',0),(46,11,'La perfusion est meilleure aux bases pulmonaires',1),(47,9,'VEMS',1),(48,13,'Concernant les pressions partielles des gaz, quelles sont les propositions justes?',1),(49,12,'Muscles intercostaux externes',0),(50,11,'L\'effet shunt est une diminution de VA/Q.',1),(51,9,'DEP',1),(52,14,'Est un muscle expiratoire',0),(53,12,'Muscles abdominaux',1),(54,13,'L\'hypoventilation alv├®olaire donne une hypercapnie.',1),(55,11,'Le rapport VA/Q est homog├¿ne dans un poumon normal.',0),(56,9,'DEM 25%',0),(57,12,'Muscles intercostaux internes',1),(58,13,'L\'hyperventilation diminue la somme PO2+PCO2 chez le sujet normal',0),(59,14,'Est un muscle lisse',0),(60,9,'DEM 50%',0),(61,11,'Le shunt vrai r├®pond ├á l\'02.',0),(62,15,'L\'an├®mie.',1),(63,13,'L\'exercice augmente la PCO2 chez le sujet normal',0),(64,14,'Est innerv├® par le nerf phr├®nique',1),(65,15,'L\'├®paississement de la surface d\'├®changes.',1),(66,13,'L\'exercice aggrave l\'hypoxie dans la fibrose pulmonaire',1),(67,14,'Est un muscle endurant',1),(68,15,'La fibrose pulmonaire.',1),(69,17,'Il participe aux ├®changes gazeux.',0),(70,17,'Il fait partie du volume courant',1),(71,15,'L\'augmentation de la surface d\'├®changes.',0),(72,10,'Est compos├® prot├®ines et de lipides',1),(73,15,'L\'exercice physique',0),(74,17,'Il est augment├® par l\'obstruction bronchique.',0),(75,10,'Est secr├®t├® par le pneumocyte |',0),(76,17,'Il est directement proportionnel au rapport VA/Q.',1),(77,16,'Volume courant (VT)',1),(78,10,'Diminue la tension de la surface pulmonaire',1),(79,17,'Il est augment├® lors de l\'embolie pulmonaire.',1),(80,10,'Permet aux alv├®oles de rester au sec',1),(81,16,'Volume r├®siduel VR',0),(82,10,'Diminue le travail respiratoire',1),(83,16,'D├®bit expiratoire de pointe (DEP)',0),(84,16,'Volume de r├®serve inspiratoire VRI',1),(85,16,'Volume de r├®serve expiratoire VRE',1),(86,18,'Le groupe respiratoire ventral bulbaire (GRV) est responsable de l\'expiration.',1),(87,18,'Le nerf vague stimule l\'inspiration',0),(88,18,'Une section au-dessous de la protub├®rance affecte la respiration automatique',1),(89,18,'Une section de la moelle inhibe l\'expiration',0),(90,19,'Les ch├®mor├®cepteurs p├®riph├®riques sont sensibles ├á l\'hypercapnie.',1),(91,18,'Le cortex c├®r├®bral est responsable de l\'automatisme respiratoire.',0),(92,19,'Les ch├®mor├®cepteurs centraux sont sensibles ├á l\'hypoxie.',0),(93,20,'Elle montre l\'├®volution de la saturation en 02 en fonction de la Pa 02',1),(94,19,'Le corpuscule aortique est en contact avec le nerf vague.',1),(95,19,'L\'hypoxie augmente la sensibilit├® au CO2',1),(96,20,'La courbe ├á une forme sigmo├»de',1),(97,19,'L\'acidose diminue la sensibilit├® au CO2',0),(98,20,'La courbe ├á une forme lin├®aire',0),(99,20,'La courbe a un plateau',1),(100,20,'Pour une Pa 02 inf├®rieure ├á 60 mmHg la partie de la courbe de dissociation est une pente',1),(101,21,'alpha adr├®nergique',0),(102,24,'VIP (Vaso-actif intestinal peptide)',1),(103,22,'P 50 diminu├®',1),(104,23,'Prostaglandines',0),(105,21,'R├®cepteurs muscariniques M1, M3',0),(106,22,'Hypothermie',1),(107,24,'Substance P',0),(108,23,'├ëosinophile chemotactic facteur (ECF)',1),(109,25,'Le CO2 peut ├¬tre transport├® sous forme combin├®e et dissoute',1),(110,22,'Acidose respiratoire (PH diminue)',0),(111,21,'B├¬ta adr├®nergique',1),(112,24,'Histamine',0),(113,23,'Histamine',1),(114,25,'La forme combin├®e est la forme pr├®dominante du transport du CO2',1),(115,22,'Pression partielle de CO2 augmente',0),(116,24,'Ac├®tylcholine',0),(117,21,'Fibres C',0),(118,23,'Neutrophil Chemotactic Factor NCF',1),(119,26,'la post charge',0),(120,25,'La Pression d\'oxyg├¿ne influence sur le transport du CO2 (Effet Haldane)',1),(121,24,'Noradr├®naline (r├®cepteurs b├¬ta)',1),(122,22,'Augmentation du 2,3 diphosphoglyc├®rates (2,3 DPG)',0),(123,21,'R├®cepteurs d\'irritation',0),(124,27,'L\'inotropisme',0),(125,23,'Leucotri├¿nes',0),(126,26,'La pr├® charge',1),(127,25,'La courbe de dissociation du CO2 a une forme sigmo├»de',0),(128,26,'La fr├®quence cardiaque',0),(129,25,'La courbe de dissociation a un plateau comme la courbe de dissociation de l\'02',0),(130,27,'La contraction isovolum├®trique',0),(131,27,'Le mouvement actif des valves cardiaques',0),(132,26,'l\'inotropisme',0),(133,27,'La relaxation isovolum├®trique',1),(134,28,'augmente en cas d\'hyperthyro├»die',1),(135,28,'diminue en cas de fi├¿vre',0),(136,28,'diminue en cas d\'anxi├®t├®',0),(137,28,'diminue en cas de tachycardie mod├®r├®e',0),(138,29,'la postcharge',0),(139,29,'La contractilit├®',1),(140,29,'La pression art├®rielle',0),(141,30,'L\'ouverture des canaux potassiques favorise l\'entr├®e du calcium',0),(142,29,'La contractilit├® et la postcharge',0),(143,31,'est la pression mesur├®e lorsque le coeur se contracte',0),(144,30,'les r├®cepteurs RYR2 sont stimul├®s par l\'entr├®e du calcium extracellulaire',1),(145,32,'s\'exprime en mmHg',0),(146,33,'L\'oreillette droite',0),(147,31,'diminue au cours du vieillissement',0),(148,34,'la pompe musculaire',0),(149,30,'Les ├®changeurs Na+/Ca++ ne participent pas',0),(150,36,'correspond ├á l\'intervalle auriculoventriculaire',0),(151,35,'ind├®pendante de la surface de section de l\'art├¿re',0),(152,32,'est inversement proportionnel ├á la r├®sistance des vaisseaux sanguins',1),(153,33,'Le noeud sinusal',0),(154,31,'augmente au cours du vieillissement',1),(155,34,'la pression dans l\'oreillette gauche',0),(156,35,'plus importante dans les capillaires',0),(157,30,'le Phospholamban favorise la recapture du calcium sarcoplasmique',0),(158,36,'Va de la fin du QRS ├á la fin de l\'onde T',0),(159,33,'Le sinus carotidien',1),(160,31,'est fonction du volume systolique',0),(161,35,'plus importante lorsque la surface de section est petite',1),(162,32,'s\'exprime en mmHg par unit├® de volume',0),(163,34,'la pression oncotique',1),(164,33,'Le noeud auriculoventriculaire',0),(165,32,'est proportionnel ├á la r├®sistance des vaisseaux sanguins',0),(166,36,'correspond ├á l\'├®tat de d├®polarisation compl├¿te des ventricules',1),(167,35,'plus importante lorsque la surface de section est grande',0),(168,34,'la viscosit├® sanguine',0),(169,36,'correspond ├á l\'├®tat de repolarisation compl├¿te des ventricules',0),(170,37,'du syst├¿me nerveux central',0),(171,37,'du syst├¿me sympathique qui innerve les valves cardiaques',0),(172,37,'du syst├¿me parasympathique qui Innerve les oreillettes font',1),(173,37,'du syst├¿me parasympathique qui innerve les ventricules',0),(174,38,'un remplissage actif en protodiastole',0),(175,38,'un remplissage actif en m├®sodiastole',0),(176,38,'un remplissage passif en t├®l├®diastole',0),(177,38,'un remplissage actif en t├®l├®diastole',1),(178,39,'agit sur des r├®cepteurs adr├®nergiques',0),(179,39,'a un effet chronotrope positif',0),(180,39,'a pour nerf eff├®rent le nerf de Hering',0),(181,40,'a un d├®bit ├®gal au d├®bit veineux',0),(182,41,'correspond au second bruit du coeur',0),(183,40,'v├®hicule la lymphe de fa├ºon passive',1),(184,43,'regroupe les art├®rioles, les capillaires et les veinules',1),(185,42,'la Lubrification',1),(186,44,'est un R├®seau nerveux discontinu',0),(187,41,'correspond au d├®but de la relaxation isovolum├®trique',0),(188,39,'a pour nerf eff├®rent la dixi├¿me paire des nerfs cr├óniens',1),(189,45,'la viscosit├® sanguine',0),(190,44,'Assure une Fonction int├®grative',1),(191,40,'v├®hicule la lymphe ind├®pendamment de la contraction musculaire',0),(192,42,'la Digestion de l\'amidon',1),(193,41,'correspond ├á la fin de l\'├®jection ventriculaire rapide',0),(194,46,'Myog├®nique',1),(195,45,'diam├¿tre des grosses art├¿res',0),(196,44,'est ├á la base du Fonctionnement coordonn├® du tube digestif',1),(197,42,'la Digestion des protides',0),(198,41,'correspond ├á la fin de la contraction isovolum├®trique',1),(199,43,'est caract├®ris├®e par la vasomotricit├® des capillaires',0),(200,40,'v├®hicule la lymphe ind├®pendamment de la pression abdominale',0),(201,46,'Nerveux',1),(202,45,'diam├¿tre des art├®rioles',0),(203,42,'la phonation',1),(204,44,'est la Voie finale commune aux deux syst├¿mes nerveux digestifs',1),(205,43,'est caract├®ris├®e par un vitesse sanguine ├®lev├®e',0),(206,46,'Hormonal',1),(207,45,'diam├¿tre des capillaires',1),(208,42,'la D├®fense immunitaire',1),(209,44,'est mis en jeu de fa├ºon r├®flexe',1),(210,43,'a un r├┤le dans le retour veineux',0),(211,46,'la stimulation du nerf vague a une action relaxatrice de l\'estomac proximal',0),(212,46,'La gastrine acc├®l├¿re l\'├®vacuation',0),(213,47,'Les cellules musculaires poss├¿dent des propri├®t├®s ├®lectrophysiologiques identiques dans tout l\'estomac.',0),(214,47,'Assure le broyage le stockage le m├®lange et la Propulsion',1),(215,47,'Le flux trans-pylorique est pulsatile',1),(216,47,'La vidange gastrique est rapide et constante pour les graisses',0),(217,47,'La stimulation du pneumogastrique (X) d├®clenche le p├®ristaltisme antral',1),(218,48,'Son automatisme.',1),(219,48,'L\'existence de cellules sp├®cialis├®es: les cellules interstitielles de Cajal (CIC).',1),(220,48,'l\'absence d\'un rythme ├®lectrique de base',0),(221,48,'une fr├®quence de d├®polarisation qui d├®pend du segment du tube digestif',1),(222,48,'La pr├®sence de jonctions communicantes entre les fibres musculaires',1),(223,49,'est une zone de haute pression intra-luminale',1),(224,51,'Un PH variable',1),(225,50,'est assur├®e par la totalit├® du tube digestif.',0),(226,52,'N├® sous l\'influence du syst├¿me nerveux central',0),(227,49,'agit comme une barri├¿re tonique entre le pharynx et l\'oesophage',1),(228,53,'acide',0),(229,50,'se fait uniquement par Transport actif',0),(230,51,'Une commande neuro-hormonale',1),(231,52,'A la m├¬me fr├®quence le long du du tube digestif',0),(232,49,'son ouverture se fait par le d├®placement de l\'os hyo├»de',1),(233,51,'La pr├®sence d\'eau, d\'├®lectrolytes',1),(234,50,'n├®cessite une pr├®paration par La digestion intestinale',1),(235,54,'II compl├¿te l\'absorption de l\'eau et des ├®lectrolytes.',1),(236,49,'ne r├®pond ├á aucune commande neurologique',0),(237,53,'Isotonique au plasma',1),(238,52,'Est d├®finie par des oscillations r├®guli├¿res du potentiel de membrane',1),(239,55,'m├®lange',1),(240,51,'Un d├®bit constant',0),(241,50,'se fait en une seule ├®tape : le franchissement de l\'├®pith├®lium',0),(242,54,'Assure une absorption passive de sodium',0),(243,49,'est ferm├® au cours des vomissements',0),(244,51,'une composition variable',1),(245,53,'Compos├®e d\'enzymes et d\'├®l├®ments hydro-├®lectrolytiques.',1),(246,55,'broyage',1),(247,52,'Est ├á l\'origine d\'une activit├® m├®canique',0),(248,50,'est facilit├®e par les diff├®rentes propri├®t├®s de la paroi intestinale.',1),(249,54,'un lieu important de m├®tabolisme et de fermentation',1),(250,53,'Compos├®e d\'enzymes et d\'├®l├®ments hydro-├®lectrolytiques.',0),(251,55,'stockage',1),(252,52,'les cellules interstitielles de Cajal (CIC) n\'ont aucun r├┤le dans sa naissance',0),(253,54,'la flore bact├®rienne ne joue aucun r├┤le dans les fonctions physiologiques de colon',0),(254,53,'indispensable ├á la digestion des aliments',1),(255,55,'continence',0),(256,54,'permet de r├®cup├®rer de l\'├®nergie',1),(257,56,'est une phase volontaire',0),(259,58,'survient En p├®riode de je├╗ne',1),(260,58,'int├®resse la totalit├® du tube digestif de la bouche ├á l\'anus',0),(261,55,'d├®f├®cation',0),(263,56,'commence lorsque le bol alimentaire est press├® contre le palais.',1),(264,58,'est une activit├® motrice cyclique',1),(266,58,'se compose de 3 phases',1),(267,56,'les voies respiratoires sont ouvertes au cours de cette phase',0),(269,58,'permet l\'├®vacuation des particules indigestibles dans l\'intestin gr├¬le',1),(271,56,'Le bol alimentaire est propuls├® dans l\'oropharynx par le piston lingual',1),(272,56,'l\'├®piglotte s\'abaisse pour fermer l\'entr├®e du vestibule laryng├®.',1),(784,179,'Est un R├®seau nerveux discontinu',0),(785,179,'Ne permet pas l\'initiation d\'une activit├® motrice',0),(786,179,'Assure le┬áfonctionnement coordonn├® du tube digestif',1),(787,179,'Est la Voie finale commune aux deux syst├¿mes nerveux digestifs',1),(789,180,'Son automatisme.',1),(790,180,'L\'existence de cellules sp├®cialis├®es : les cellules interstitielles de Cajal (CIC).',1),(791,180,'L\'absence d\'un rythme ├®lectrique de base',0),(792,180,'Une fr├®quence de d├®polarisation identique le long du tube digestif',0),(793,180,'La pr├®sence de jonctions communicantes entre les fibres musculaires.',1),(794,181,'Est une activit├® motrice cyclique',1),(795,181,'Se d├®pla├ºant dans le sens oral--> aboral',1),(796,181,'Se compose d\'une phase unique',0),(797,181,'Est non propag├®e',0),(798,181,'Se poursuit apr├¿s L\'ingestion des aliments',0),(799,182,'Est un ensemble d\'acte st├®r├®otyp├®s s├®quenc├®s',1),(800,182,'Est pilot├® par un centre programmateur bulbaire',1),(801,182,'Comprend un seul temps: le temps pharyng├®.',0),(802,182,'Est un acte volontaire dans sa totalit├®',0),(803,182,'N├®cessite une coordination avec le centre respiratoire',1),(804,183,'Sa naissance suite ├á une distension de la lumi├¿re digestive',1),(805,183,'Une relaxation du segment recevant le chyme',1),(806,183,'Son caract├¿re stationnaire et non propulsive',0),(807,183,'Sa r├®gulation par des influx neuronaux',1),(808,183,'La contraction du segment en amont du stimulus',1),(809,184,'Un r├┤le chimique et moteur',1),(810,184,'Est un liquide de pH acide',0),(811,184,'Un D├®bit stable et identique le long de la journ├®e',0),(812,184,'Participe dans la phonation',1),(813,184,'Son insuffisance favorise les caries dentaires',1),(814,185,'Le poids des aliments,',1),(815,185,'Le d├®placement de l\'os hyo├»de',1),(816,185,'La commande neurologique',1),(817,185,'La commande hormonal',0),(818,185,'La vue et l\'odeur des aliments',0),(819,186,'trois phases: c├®phalique gastrique et intestinale',1),(820,186,'L\'Activation parasympathique lors de la phase c├®phalique',1),(821,186,'Une lib├®ration de la gastrine lors de la Phase intestinale',0),(822,186,'une inhibition suite ├á la distension du duod├®num',1),(823,186,'une s├®cr├®tion r├®flexe de Gastrine suite ├á la distension gastrique',1),(824,187,'Les cellules musculaires poss├¿dent les propri├®t├®s ├®lectrophysiologiques identique dans tout l\'estomac.',0),(825,187,'Assure le broyage le stockage le m├®lange et la Propulsion',1),(826,187,'Le flux trans-pylorique est pulsatile',1),(827,187,'La vidange gastrique est rapide et constante pour les graisses',0),(828,187,'La stimulation du pneumogastrique (X) inhibe le p├®ristaltisme antral',0),(829,188,'Un PH constant',0),(830,188,'Une commande neuro-hormonale',1),(831,188,'une composition hydro ├®lectrolytique',1),(832,188,'Un d├®bit constant',0),(833,188,'une composition variable',1),(834,189,'Assure le M├®lange du chyme',1),(835,189,'Assure le Contact du chyme avec la muqueuse',1),(836,189,'Est identique ├á jeun et en postprandial',0),(837,189,'Est sous Influences neuro- hormonales',1),(838,189,'Est repr├®sent├®e par le complexe moteur migrant au repos',1),(839,190,'est Assur├®e par l\'intestin gr├¬le.',1),(840,190,'Se fait par Transport actif, passif, passif facilit├®',1),(841,190,'N├®cessite une pr├®paration par La digestion',1),(842,190,'Se fait en une seule ├®tape : le franchissement de l\'├®pith├®lium',0),(843,190,'Est facilit├®e par les diff├®rentes propri├®t├®s de la paroi intestinale',1),(844,191,'la s├®cr├®tion endocrine du foie',0),(845,191,'form├®e et s├®cr├®t├®e uniquement par les h├®patocytes',0),(846,191,'Un mode d\'├®limination des d├®chets',1),(847,191,'Essentielle aux fonctions de digestion et d\'absorption',1),(848,191,'N├®cessaire ├á la digestion des graisses',1),(849,192,'Elle Assure une seule fonction la Continence',0),(850,192,'Le r├®flexe recto-anale inhibiteur RRAI est d├®clench├® par la distension rectale',1),(851,192,'R├®flexe recto-anale inhibiteur RRAI entraine la fermeture du sphincter interne',0),(852,192,'Le r├®flexe recto-anale excitateur RRAE entraine la fermeture du sphincter externe',1),(853,192,'Le r├®flexe recto-anale excitateur RRAE assure la d├®f├®cation',0),(854,193,'Production des acides biliaires',1),(855,193,'Formation des lipoprot├®ines',1),(856,193,'Lipogen├¿se de novo',1),(857,193,'Stockage des Acides Gras',1),(858,193,'R├®gulation de l\'absorption des lipides',0),(859,194,'Le stockage de acides amin├®s',0),(860,194,'La synth├¿se des prot├®ines',1),(861,194,'Le catabolisme des Acides amin├®s',1),(862,194,'La synth├¿se de novo des Acides amin├®s',0),(863,194,'La synth├¿se de l\'albumine',1),(864,195,'le caract├¿re capacitif du rectum n\'a aucun r├┤le',0),(865,195,'Le r├®flexe recto-anale Inhibiteur RRAI est d├®clench├® de fa├ºon volontaire et consciente',0),(866,195,'Le r├®flexe recto-anale inhibiteur RRAI entraine la fermeture du sphincter interne',0),(867,195,'Le r├®flexe recto-anale excitateur RRAE entraine la fermeture du sphincter externe',1),(868,195,'Le r├®flexe recto-anale excitateur RRAE permet la d├®f├®cation',0),(869,196,'chute des r├®sistances syst├®miques',0),(870,196,'hypovol├®mie relative',0),(871,196,'hypo contractilit├® cardiaque',0),(872,196,'hypovol├®mie vraie',1),(873,196,'bradycardie extr├¬me',0),(874,197,'La pr├®charge par remplissage intraveineux',1),(875,197,'La postcharge par vasodilatateurs',0),(876,197,'L\'inotropie par des vasopresseurs',0),(877,197,'La chronotropie par des bradycardisants',0),(878,197,'Le retour veineux par des diur├®tiques',0),(879,198,'insuffisance de fermeture de la valve aortique',0),(880,198,'limitation d\'ouverture de la valve mitrale',0),(881,198,'insuffisance de fermeture de la valve mitrale',1),(882,198,'limitation d\'ouverture de la valve aortique',0),(883,198,'limitation d\'ouverture de la valve tricuspide',0),(884,199,'Insuffisance de fermeture de la valve aortique',0),(885,199,'Limitation d\'ouverture de la valve mitrale',0),(886,199,'Insuffisance de fermeture de la valve mitrale',1),(887,199,'Limitation d\'ouverture de la valve aortique',0),(888,199,'Limitation d\'ouverture de la valve tricuspide',0),(889,200,'Le volume t├®l├®systolique',1),(890,200,'la fraction d\'├®jection',1),(891,200,'la fr├®quence cardiaque',0),(892,200,'la mesure du d├®bit cardiaque',1),(893,200,'la compliance ventriculaire',0),(894,201,'l\'hormone antidiur├®tique',0),(895,201,'L\'angiotensine 2',0),(896,201,'l\'endoth├®line',0),(897,201,'le baror├®flexe',1),(898,201,'l\'ac├®tylcholine',0),(899,202,'3 l/min',0),(900,202,'4 1/min.',1),(901,202,'5 l/min',0),(902,202,'6 1/min',0),(903,202,'71/min',0),(904,203,'15%',0),(905,203,'20%',0),(906,203,'25%',1),(907,203,'30%',0),(908,203,'35%',0),(909,204,'augmenter la contractilit├®',0),(910,204,'baisser la pr├®charge',0),(911,204,'augmenter le retour veineux',0),(912,204,'diminuer la postcharge',1),(913,204,'augmenter la pression art├®rielle',0),(914,205,'la pression systolique',0),(915,205,'la pression diastolique',0),(916,205,'la pression puls├®e',1),(917,205,'la pression moyenne',0),(918,205,'la pression centrale',0),(919,206,'l\'entr├®e massive de sodium dans la cellule',0),(920,206,'la lib├®ration massive de calcium du r├®ticulum sarcoplasmique',1),(921,206,'le recaptage de calcium par la Ryanodine',0),(922,206,'la propagation de l\'influx ├®lectrique',0),(923,206,'le d├®lai auriculo ventriculaire',0),(924,207,'l\'allongement du QT',0),(925,207,'la largeur du QRS',0),(926,207,'la d├®viation axiale du coeur',0),(927,207,'l\'allongement du PR',0),(928,207,'La raccourcissement du PR',1),(929,208,'augmentation de la fr├®quence cardiaque',1),(930,208,'Augmentation du retour veineux',1),(931,208,'diminution du tonus sympathique',0),(932,208,'augmentation de la contractilit├® ventriculaire',1),(933,208,'raccourcissement de la p├®riode r├®fractaire',0),(934,209,'d├®bute ├á la phase 2 du potentiel d\'action',0),(935,209,'co├»ncide avec l\'ouverture de la valve mitrale',0),(936,209,'d├®bute avec le QRS sur l\'ECG',0),(937,209,'co├»ncide avec la systole auriculaire',0),(938,209,'co├»ncide avec le recaptage du calcium par le syst├¿me phospholamban',1),(939,210,'canaux sodiques rapides',0),(940,210,'canaux If',1),(941,210,'├®changeurs sodium-calcium',0),(942,210,'canaux potassiques',0),(943,210,'canaux calciques voltage d├®pendants',0),(944,211,'rendre le potentiel de membrane moins ├®lectron├®gatif',0),(945,211,'raccourcir les p├®riodes r├®fractaires',0),(946,211,'hyperpolarisation des membranes cellulaires',1),(947,211,'acc├®l├¿re les pentes de d├®polarisation',0),(948,211,'facilite le couplage actine -myosine',0),(949,212,'un flux sanguin laminaire',0),(950,212,'une augmentation de la pression art├®rielle',0),(951,212,'une diminution de la tension pari├®tale',0),(952,212,'une acc├®l├®ration des vitesses circulatoires',1),(953,212,'une augmentation du d├®bit sanguin',0),(954,213,'Sont des muscles stri├®s',1),(955,213,'Elles peuvent ├¬tre inspiratoires ou expiratoires',1),(956,213,'Le diaphragme est le principal muscle inspiratoire',1),(957,213,'Sont des muscles non endurants',0),(958,213,'Sont des muscles lisses',0),(959,214,'Muscles abdominaux',0),(960,214,'Muscles sterno cl├®ido masto├»dien',1),(961,214,'Diaphragme',1),(962,214,'Muscles intercostaux internes',0),(963,214,'Muscles intercostaux externes',1),(964,215,'DEM 25%',0),(965,215,'DEM 50%',0),(966,215,'DMM 25-75%',0),(967,215,'VEMS',1),(968,215,'DEP',1),(969,216,'Capacit├® pulmonaire totale : CPT=CV+VR',1),(970,216,'Capacit├® r├®siduelle fonctionnelle : CRF= VR+VRE',1),(971,216,'Capacit├® vitale : CV=VT+VRI+VRE',1),(972,216,'Capacit├® Vitale : CV-VRI+VT',0),(973,216,'Capacit├® pulmonaire totale=CRF+VT+VRI',1),(974,217,'Est compos├® uniquement de prot├®ines',0),(975,217,'Diminue la tension de la surface pulmonaire',1),(976,217,'Permet aux alv├®oles de rester au sec',1),(977,217,'Est s├®cr├®t├® par le pneumocyte II',1),(978,217,'Diminue le travail respiratoire',1),(979,218,'L\'oxyg├¿ne peut ├¬tre transport├® uniquement sous forme dissoute',0),(980,218,'La forme combin├®e est la forme principale de transport',1),(981,218,'Seule la forme dissoute participe aux ├®changes',1),(982,218,'Dans la forme combin├®e l\'oxyg├¿ne est li├® ├á l\'h├®moglobine',1),(983,218,'La forme dissoute repr├®sente 97% du transport de l\'oxyg├¿ne',0),(984,219,'Elle montre l\'├®volution du contenu en 02 en fonction de la Pa 02',1),(985,219,'La courbe ├á une forme sigmo├»de',1),(986,219,'La courbe ├á une forme lin├®aire',0),(987,219,'Pour une Pa 02 inf├®rieure ├á 60 mmHg la partie de la courbe de dissociation est une pente',1),(988,219,'La courbe a un plateau',1),(989,220,'Hyperthermie',0),(990,220,'Acidose respiratoire',0),(991,220,'Pression partielle de CO2 diminue',1),(992,220,'Augmentation du 2,3 diphosphoglyc├®rates (2,3 DPG)',0),(993,220,'P 50 diminue',1),(994,221,'Le CO2 peut ├¬tre transport├® t sous forme combin├®e et dissoute',1),(995,221,'Sa forme dissoute repr├®sente 90% du transport du CO2',0),(996,221,'La pression d\'oxyg├¿ne n\'influence pas sur le transport du CO2',0),(997,221,'La courbe de dissociation du CO2 est lin├®aire',1),(998,221,'La courbe de dissociation a un plateau comme la courbe de dissociation de l\'02',0),(999,222,'alpha adr├®nergique',0),(1000,222,'R├®cepteurs muscariniques',0),(1001,222,'B├¬ta adr├®nergique',1),(1002,222,'Fibres C',0),(1003,222,'R├®cepteurs d\'irritation',0),(1004,223,'Prostaglandines',0),(1005,223,'Leucotri├¿nes',0),(1006,223,'Histamine',1),(1007,223,'NCF (Neutrophil Chemotactic Factor)',1),(1008,223,'Substance P',0),(1009,224,'VIP (Vaso-actif intestinal peptide)',1),(1010,224,'Substance P',0),(1011,224,'Histamine',0),(1012,224,'Atropine',1),(1013,224,'Leucotri├¿nes',0),(1014,225,'Absence de trouble ventilatoire',0),(1015,225,'Il s\'agit d\'un trouble ventilatoire obstructif',0),(1016,225,'Il s\'agit d\'un Trouble ventilatoire restrictif',1),(1017,225,'Il s\'agit d\'un trouble ventilatoire mixte',0),(1018,225,'Il s\'agit d\'une hyperr├®activit├® bronchique',0),(1019,226,'Le groupe respiratoire dorsal bulbaire (GRD) est responsable de l\'expiration',0),(1020,226,'Le nerf vague inhibe le groupe respiratoire ventral (GRV)',0),(1021,226,'Une section au-dessus de la protub├®rance affecte la respiration volontaire',1),(1022,226,'Une section de la moelle entra├«ne un arr├¬t ventilatoire',1),(1023,226,'Une section entre le bulbe et le pont entra├«ne une respiration irr├®guli├¿re',1),(1024,227,'Les ch├®mor├®cepteurs p├®riph├®riques ne sont pas sensibles ├á l\'hypercapnie',0),(1025,227,'Les ch├®mor├®cepteurs centraux sont sensibles ├á la baisse du pH',1),(1026,227,'Le corpuscule aortique est en contact avec le nerf vague',1),(1027,227,'L\'hypoxie augmente la sensibilit├® au CO2',1),(1028,227,'L\'exercice diminue la sensibilit├® au CO2',0),(1029,228,'La pression partielle du CO2 du gaz inspir├® est de 30 mm Hg.',0),(1030,228,'Une hypoventilation alv├®olaire donne une hypercapnie',1),(1031,228,'Une hyperventilation alv├®olaire donne une hyperoxie',1),(1032,228,'Chez le sujet sain, la somme Pa02 et PaCO2 augmente ├á l\'exercice',0),(1033,228,'A l\'exercice, la PaCO2 diminue',1),(1034,229,'La DLCO est directement proportionnelle ├á la surface d\'├®changes',1),(1035,229,'La DLCO est augment├®e en cas de polyglobulie',1),(1036,229,'Le CO2 diffuse mieux que l\'02',1),(1037,229,'La DLCO est directement proportionnelle ├á l\'├®paisseur de diffusion',0),(1038,229,'La DLCO est augment├®e en cas de fibrose pulmonaire',0),(1041,6,'Muscles abdominaux',0),(1042,6,'Muscles intercostaux internes',0),(1043,6,'Muscle sternocl├®idomasto├»dien',1),(1046,6,'Muscles intercostaux externes',1),(1047,7,'Est innerv├® par le nerf phr├®nique',1),(1048,7,'Est un muscle lisse',0),(1049,7,'Est un muscle endurant',1),(1050,7,'Est un muscle expiratoire',0),(1051,8,'Volume courant (VT)',1),(1052,8,'Volume de r├®serve expiratoire (VRE)',1),(1053,8,'Volume r├®siduel (VR)',0),(1054,8,'Volume expiratoire maximum seconde (VEMS)',0),(1113,179,'new option',0);
/*!40000 ALTER TABLE `options` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `points`
--

DROP TABLE IF EXISTS `points`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `points` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `totalPoints` int NOT NULL DEFAULT '0',
  `userId` int NOT NULL,
  `moduleId` int NOT NULL,
  `currentTime` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`Id`),
  UNIQUE KEY `Points_userId_moduleId_key` (`userId`,`moduleId`),
  KEY `Points_moduleId_fkey` (`moduleId`),
  CONSTRAINT `Points_moduleId_fkey` FOREIGN KEY (`moduleId`) REFERENCES `module` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Points_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=217 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `points`
--

LOCK TABLES `points` WRITE;
/*!40000 ALTER TABLE `points` DISABLE KEYS */;
INSERT INTO `points` VALUES (161,1000200,67,2,'2023-09-11 18:34:25.882'),(162,0,67,7,'2023-08-28 16:53:53.908'),(163,0,67,10,'2023-08-28 16:53:53.908'),(164,0,67,23,'2023-08-28 16:53:53.908'),(165,0,67,24,'2023-08-28 16:53:53.908'),(166,0,67,27,'2023-08-28 16:53:53.908'),(167,0,67,8,'2023-08-28 16:53:53.908'),(168,0,67,9,'2023-08-28 16:53:53.908'),(169,0,67,12,'2023-08-28 16:53:53.908'),(170,0,67,28,'2023-08-28 16:53:53.908'),(171,0,67,29,'2023-08-28 16:53:53.908'),(174,0,94,2,'2023-09-01 16:04:24.760'),(175,0,94,7,'2023-09-01 16:04:24.760'),(176,0,94,10,'2023-09-01 16:04:24.760'),(177,0,94,23,'2023-09-01 16:04:24.760'),(178,0,94,24,'2023-09-01 16:04:24.760'),(179,0,94,27,'2023-09-01 16:04:24.760'),(180,0,95,2,'2023-09-04 15:22:38.802'),(181,0,95,12,'2023-09-04 15:22:38.802'),(207,200,97,2,'2023-09-07 14:06:05.088'),(208,0,97,7,'2023-09-07 14:03:05.282'),(209,0,97,10,'2023-09-07 14:03:05.282'),(210,0,97,23,'2023-09-07 14:03:05.282'),(211,0,97,24,'2023-09-07 14:03:05.282'),(212,0,97,27,'2023-09-07 14:03:05.282'),(213,800,98,2,'2023-09-11 16:45:05.532'),(214,0,98,12,'2023-09-11 16:39:29.128'),(215,0,99,2,'2023-09-16 08:39:45.078'),(216,0,99,12,'2023-09-16 08:39:45.078');
/*!40000 ALTER TABLE `points` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `question`
--

DROP TABLE IF EXISTS `question`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `question` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Text` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `CasClinique` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Number` int NOT NULL,
  `CoursId` int NOT NULL,
  `ExamId` int NOT NULL,
  `Image` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ParentId` int DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `Question_CoursId_fkey` (`CoursId`),
  KEY `Question_ExamId_fkey` (`ExamId`),
  KEY `Question_ParentId_fkey` (`ParentId`),
  CONSTRAINT `Question_CoursId_fkey` FOREIGN KEY (`CoursId`) REFERENCES `cours` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Question_ExamId_fkey` FOREIGN KEY (`ExamId`) REFERENCES `exam` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Question_ParentId_fkey` FOREIGN KEY (`ParentId`) REFERENCES `question` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=244 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `question`
--

LOCK TABLES `question` WRITE;
/*!40000 ALTER TABLE `question` DISABLE KEYS */;
INSERT INTO `question` VALUES (6,'Parmi ces muscles ceux qui sont des muscles inspiratoires :',NULL,1,12,2,NULL,NULL),(7,'Le diaphragme est :',NULL,2,12,2,NULL,NULL),(8,'Parmi ces volumes pulmonaires quels ceux qui sont mobilisables :',NULL,3,12,2,NULL,NULL),(9,'Parmi ces d├®bits cochez ceux qui explorent les voies a├®riennes de gros calibre:','',5,12,3,NULL,NULL),(10,'Cochez la ou les r├®ponses vraies concernant le surfactant:','',4,12,3,NULL,NULL),(11,'Concernant le rapport ventilation perfusion (VA/Q), quelles sont les propositions justes ?','',9,13,3,NULL,NULL),(12,'Parmi ces muscles ceux qui sont des muscles expiratoires:','',2,12,3,NULL,NULL),(13,'Concernant les pressions partielles des gaz, quelles sont les propositions justes?','',7,13,3,NULL,NULL),(14,'Cochez la ou les r├®ponses vraies concernant le diaphragme :','',1,12,3,NULL,NULL),(15,'La capacit├® de diffusion du CO (DLCO) est alt├®r├®e par : quelles sont les propositions justes','',8,13,3,NULL,NULL),(16,'Parmi ces volumes cochez ceux qui sont mobilisables :','',3,12,3,NULL,NULL),(17,'Concernant l\'espace mort, quelles sont les propositions justes?','',6,13,3,NULL,NULL),(18,'Concernant les centres respiratoires, quelles sont les propositions justes ?','',10,16,3,NULL,NULL),(19,'Concernant les ch├®mor├®cepteurs, quelles sont les propositions justes ?','',11,16,3,NULL,NULL),(20,'Concernant la courbe de dissociation l\'oxyh├®moglobine (courbe de Barcroft):','',12,14,3,NULL,NULL),(21,'Parmi ces r├®cepteurs celui dont la stimulation entra├«ne une bronchodilatation:','',15,15,3,NULL,NULL),(22,'L\'affinit├® de l\'h├®moglobine pour l\'oxyg├¿ne augmente dans les situations suivantes :','',13,14,3,NULL,NULL),(23,'Dans le contr├┤le humoral de la bronchomotricit├® cochez les substances qui sont des m├®diateur pr├®form├®es:','',16,15,3,NULL,NULL),(24,'Parmi m├®diateurs cochez ceux qui ont un effet bronchodilatateurs:','',17,15,3,NULL,NULL),(25,'Concernant le transport du gaz carbonique CO2 dans la sang:','',14,14,3,NULL,NULL),(26,'Suite ├á une h├®morragie aigue, le d├®bit cardiaque diminue ├á cause de l\'un des d├®terminants suivants, lequel?','',19,18,3,NULL,NULL),(27,'La performance diastolique du ventricule gauche d├®pend de (une seule r├®ponse)','',20,18,3,NULL,NULL),(28,'Le d├®bit cardiaque (une seule r├®ponse):','',18,18,3,NULL,NULL),(29,'Selon Frank-Starling, la variation de la pr├®charge modifie (une seule r├®ponse):','',21,18,3,NULL,NULL),(30,'Dans le couplage excitation-contraction, on trouve (une seule r├®ponse):','',22,20,3,NULL,NULL),(31,'La pression puls├®e (une seule r├®ponse):','',28,21,3,NULL,NULL),(32,'Le d├®bit cardiaque (une seule r├®ponse) :','',27,18,3,NULL,NULL),(33,'Les baror├®cepteurs du baror├®flexe se situe dans (une seule r├®ponse):','',23,19,3,NULL,NULL),(34,'Les ├®changes au niveau capillaire d├®pendent de (une seule r├®ponse) :','',24,21,3,NULL,NULL),(35,'La vitesse d\'├®coulement du sang est (une seule r├®ponse) :','',25,21,3,NULL,NULL),(36,'L\'intervalle ST (une seule r├®ponse):','',26,19,3,NULL,NULL),(37,'L\'innervation cardiaque est sous la d├®pendance (une seule r├®ponse):','',30,19,3,NULL,NULL),(38,'Le remplissage ventriculaire comporte (une seule r├®ponse):','',31,17,3,NULL,NULL),(39,'L\'innervation parasympathique cardiaque (une seule r├®ponse):','',32,19,3,NULL,NULL),(40,'La circulation lymphatique (une seule r├®ponse):','',33,21,3,NULL,NULL),(41,'L\'ouverture des valves aortiques (une seule r├®ponse):','',34,17,3,NULL,NULL),(42,'Le ou les r├┤les de la s├®cr├®tion salivaire sont :','',37,3,3,NULL,NULL),(43,'La microcirculation (une seule r├®ponse):','',35,21,3,NULL,NULL),(44,'Le Syst├¿me nerveux intrins├¿que du tube digestif','',36,2,3,NULL,NULL),(45,'Les r├®sistances ├á l\'├®coulement sont dues principalement ├á (une seule r├®ponse):','',29,21,3,NULL,NULL),(46,'le Contr├┤le de la motricit├® gastrique est :','',39,4,3,NULL,NULL),(47,'Concernant la fonction motrice de l\'estomac :','',40,4,3,NULL,NULL),(48,'le muscle lisse digestif se caract├®rise par :','',41,2,3,NULL,NULL),(49,'Le sphincter sup├®rieur de l\'oesophage :','',44,3,3,NULL,NULL),(50,'l\'absorption des nutriments :','',47,8,3,NULL,NULL),(51,'Le suc gastrique se caract├®rise par :','',46,4,3,NULL,NULL),(52,'Le rythme ├®lectrique de base de la cellule musculaire lisse digestive:','',43,2,3,NULL,NULL),(53,'La s├®cr├®tion pancr├®atique est :','',42,5,3,NULL,NULL),(54,'Au niveau du c├┤lon:','',48,9,3,NULL,NULL),(55,'la motricit├® colique permet une activit├® de :','',49,9,3,NULL,NULL),(56,'La Phase pharyng├®e de la d├®glutition :','',45,3,3,NULL,NULL),(58,'le complexe moteur migrant CMM:','',38,4,3,NULL,NULL),(179,'Le Syst├¿me nerveux intrins├¿que du tube digestif :','',1,2,19,NULL,NULL),(180,'le muscle lisse digestif se caract├®rise par :','',2,2,19,NULL,NULL),(181,'le complexe moteur migrant (CMM):','',3,4,19,NULL,NULL),(182,'La d├®glutition :','',4,3,19,NULL,NULL),(183,'Le p├®ristaltisme est caract├®ris├® par :','',5,2,19,NULL,NULL),(184,'La salive:','',6,3,19,NULL,NULL),(185,'l\'ouverture du sphincter sup├®rieure de l\'oesophage est assur├®e par :','',7,3,19,NULL,NULL),(186,'la r├®gulation de la s├®cr├®tion gastrique comporte:','',8,4,19,NULL,NULL),(187,'Concernant la fonction motrice de l\'estomac :','',9,4,19,NULL,NULL),(188,'Le suc gastrique se caract├®rise par :','',10,4,19,NULL,NULL),(189,'La Motricit├® de l\'intestin gr├¬le :','',11,5,19,NULL,NULL),(190,'l\'absorption des nutriments :','',12,8,19,NULL,NULL),(191,'la s├®cr├®tion biliaire est :','',13,5,19,NULL,NULL),(192,'concernant la motricit├® ano-rectale :','',14,9,19,NULL,NULL),(193,'Le foie assure','',15,10,19,NULL,NULL),(194,'Le m├®tabolisme h├®patique des prot├®ines permet:','',16,10,19,NULL,NULL),(195,'dans la motricit├® ano-rectale:','',50,9,3,NULL,NULL),(196,'L\'hypotension est due ├á priori ├á une baisse du d├®bit cardiaque par (une seule\nr├®ponse):','Un jeune patient de 20 ans a ├®t├® victime d\'un accident de la voie publique avec h├®morragie abondante. Sa pression art├®rielle aux urgences a ├®t├® de 70/40 mmHg.',17,18,19,NULL,NULL),(197,'Chez ce m├¬me patient, La correction de l\'├®tat de choc impose de corriger (une\nseule r├®ponse):','',18,18,19,NULL,196),(198,'On retrouve ├á l\'auscultation d\'un patient de 43 ans, un souffle cardiaque systolique. Il s\'agit de :','',19,17,19,NULL,NULL),(199,'Si le souffle de ce patient de 43 ans a ├®t├® en rapport avec une r├®gurgitation. Ce sera une (une seule r├®ponse) :','',20,17,19,NULL,198),(200,'La performance systolique du ventricule gauche peut ├¬tre ├®valu├®e par :','',21,18,19,NULL,NULL),(201,'La r├®gulation de la pression art├®rielle lors du passage de la position couch├®e\n├á la position debout fait intervenir (une seule r├®ponse):','',22,21,19,NULL,NULL),(202,'Said a une fr├®quence cardiaque de 100 bpm, un volume t├®l├®diastolique du VG de 160ml et un volume t├®l├®systolique de 120 ml, le d├®bit cardiaque est de :','',23,18,19,NULL,NULL),(203,'La fraction d\'├®jection du ventricule gauche chez Said sera de','',24,18,19,NULL,NULL),(204,'On peut am├®liorer le travail du coeur chez Said en utilisant des vasodilatateurs pour (une seule r├®ponse) :','',25,18,19,NULL,NULL),(205,'le param├¿tre de la pression art├®rielle qui refl├¿te la compliance art├®rielle est (une seule r├®ponse) :','',26,21,19,NULL,NULL),(206,'Le principe de Fabiato explique (une seule r├®ponse juste):','',27,20,19,NULL,NULL),(207,'La pr├®-excitation ventriculaire est reconnue sur l\'ECG par (une seule\nr├®ponse juste):','',28,19,19,NULL,NULL),(208,'Le d├®bit cardiaque s\'adapte ├á l\'effort par :','',29,18,19,NULL,NULL),(209,'La repolarisation myocardique :','',30,19,19,NULL,NULL),(210,'la pente de la phase de d├®polarisation diastolique lente est sous l\'effet des (une seule r├®ponse):','',31,19,19,NULL,NULL),(211,'L\'ac├®tylcholine a comme effet au niveau du coeur (une seule r├®ponse):','',32,19,19,NULL,NULL),(212,'Selon le principe de continuit├®, une st├®nose art├®rielle de 70% engendre :','',33,21,19,NULL,NULL),(213,'Cochez la ou les r├®ponses vraies concernant les muscles respiratoires:','',34,12,19,NULL,NULL),(214,'Parmi ces muscles ceux qui sont des muscles inspiratoires :','',35,12,19,NULL,NULL),(215,'Parmi ces d├®bits cochez ceux qui explorent les voies a├®riennes de gros calibre:','',36,12,19,NULL,NULL),(216,'Cochez la ou les r├®ponses vraies :','',37,12,19,NULL,NULL),(217,'Cochez la ou les r├®ponses vraies concernant le surfactant:','',38,12,19,NULL,NULL),(218,'Concernant le transport de l\'oxyg├¿ne dans le sang cochez la ou les r├®ponses vraies :','',39,14,19,NULL,NULL),(219,'Concernant la courbe de dissociation l\'oxyh├®moglobine (courbe de Barcroft):','',40,14,19,NULL,NULL),(220,'L\'affinit├® de l\'h├®moglobine pour l\'oxyg├¿ne augmente dans les situations suivantes :','',41,14,19,NULL,NULL),(221,'Concernant le transport du gaz carbonique CO2 dans le sang :','',42,14,19,NULL,NULL),(222,'Parmi ces r├®cepteurs celui dont la stimulation entra├«ne une bronchodilatation :','',43,15,19,NULL,NULL),(223,'Dans le contr├┤le humorale de la bronchomotricit├® cochez les substances qui sont pr├®form├®es:','',44,15,19,NULL,NULL),(224,'Parmi ces neurom├®diateurs cochez ceux qui ont un effet bronchodilatateurs :','',45,15,19,NULL,NULL),(225,'Devant un VEMS diminu├®, une CV diminu├®, et un rapport de Tiffeneau\nnormal vous concluez:','',46,12,19,NULL,NULL),(226,'Cochez le les propositions justes concernant les centres respiratoires :','',47,16,19,NULL,NULL),(227,'Concernant les ch├®mor├®cepteurs, cochez les propositions vraies :','',48,16,19,NULL,NULL),(228,'Concernant les pressions partielles des gaz, cochez les propositions vraies :','',49,13,19,NULL,NULL),(229,'Concernant la capacit├® de diffusion du CO, cochez les propositions vraies:','',50,13,19,NULL,NULL);
/*!40000 ALTER TABLE `question` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sousmodule`
--

DROP TABLE IF EXISTS `sousmodule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sousmodule` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Icon` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `moduleId` int NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `SousModule_moduleId_fkey` (`moduleId`),
  CONSTRAINT `SousModule_moduleId_fkey` FOREIGN KEY (`moduleId`) REFERENCES `module` (`Id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sousmodule`
--

LOCK TABLES `sousmodule` WRITE;
/*!40000 ALTER TABLE `sousmodule` DISABLE KEYS */;
/*!40000 ALTER TABLE `sousmodule` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Fname` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Lname` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Plan` enum('FIRST','SECOND','THIRD','FOURTH','FIFTH') COLLATE utf8mb4_unicode_ci NOT NULL,
  `Semester1` tinyint(1) NOT NULL DEFAULT '1',
  `Semester2` tinyint(1) NOT NULL DEFAULT '0',
  `Subscription` enum('FREE','PAID','PLUS') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'FREE',
  `FullName` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Role` enum('USER','ADMIN') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'USER',
  `RefreshToken` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Date1` datetime(3) DEFAULT NULL,
  `Date2` datetime(3) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `User_Email_key` (`Email`),
  UNIQUE KEY `User_RefreshToken_key` (`RefreshToken`)
) ENGINE=InnoDB AUTO_INCREMENT=100 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (67,'admin','admin','akram.ammour.91@gmail.com','$2b$10$OAz7gbs9KdlVAGVAlbWOnOx8n5f90Q1q2TDgV9h.g/I1H.qVYjVJW','SECOND',1,1,'PLUS','admin admin','ADMIN','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6ImFrcmFtLmFtbW91ci45MUBnbWFpbC5jb20iLCJpYXQiOjE2OTQ4NTM2MDMsImV4cCI6MTY5NTQ1ODQwM30.DafUVjjGCLALQG3q5nSHyOn6XSKAjNIk0uBjGmq6_eQ','2024-01-07 23:00:00.000',NULL),(94,'akram','ammour','akram.ammour@gmail.com','$2b$10$0MV7tb/GvJ880ygGEN0Aquq8qjm8GDdAtHX7nb0jjoGKaENw.GfJe','SECOND',1,0,'PAID','akram ammour','USER',NULL,'2024-02-12 23:00:00.000',NULL),(95,'akram','ammour','akram.ammour.2004@gmail.com','$2b$10$4NYL56KEAm5KhCihix/t7uix3dB/HxLE.a6WxG0z/0E9pYiRnSyCe','SECOND',1,1,'FREE','akram ammour','USER',NULL,NULL,NULL),(97,'ghita','el karnighi','ghita.el@gmail.com','$2b$10$pL6IXWr4Gnm4F83msDvrAO3yQHtYZQMaW4iZy2g1C/Fbdi7QMz.Uu','SECOND',1,0,'PAID','ghita el karnighi','USER','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6ImdoaXRhLmVsQGdtYWlsLmNvbSIsImlhdCI6MTY5NDA5NTQxMiwiZXhwIjoxNjk0NzAwMjEyfQ.y8hJWdothal3NZRlmFzMwMvCFFZ7QaGaFYNzqghraQo',NULL,NULL),(98,'moncef','zaakour','m.zakour@gmail.com','$2b$10$YNiFr8zKetNfX/8NUFrnr.QADTa8F.i6JHADmICCy5kneXxx/UHuq','SECOND',1,1,'FREE','moncef zaakour','USER',NULL,NULL,NULL),(99,'hello','hello','hello@hello.com','$2b$10$6a8gJUOJs46xbPQW5bYRMO44kppBTo8rp/FZ92.kqJ2dIWUoc5N56','SECOND',1,1,'FREE','hello hello','USER',NULL,NULL,NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usercourseanswer`
--

DROP TABLE IF EXISTS `usercourseanswer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usercourseanswer` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `coursId` int NOT NULL,
  `questionId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `UserCourseAnswer_userId_fkey` (`userId`),
  KEY `UserCourseAnswer_coursId_fkey` (`coursId`),
  KEY `UserCourseAnswer_questionId_fkey` (`questionId`),
  CONSTRAINT `UserCourseAnswer_coursId_fkey` FOREIGN KEY (`coursId`) REFERENCES `cours` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `UserCourseAnswer_questionId_fkey` FOREIGN KEY (`questionId`) REFERENCES `question` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `UserCourseAnswer_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=124 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usercourseanswer`
--

LOCK TABLES `usercourseanswer` WRITE;
/*!40000 ALTER TABLE `usercourseanswer` DISABLE KEYS */;
INSERT INTO `usercourseanswer` VALUES (112,97,2,48),(113,97,2,44),(114,98,12,6),(115,98,12,7),(116,98,12,8),(117,98,12,9),(118,98,12,10),(119,98,12,12),(120,98,12,14),(121,98,12,16),(122,67,17,198),(123,67,17,199);
/*!40000 ALTER TABLE `usercourseanswer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usercourseprogress`
--

DROP TABLE IF EXISTS `usercourseprogress`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usercourseprogress` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `coursId` int NOT NULL,
  `questionId` int NOT NULL,
  `isCorrect` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `UserCourseProgress_userId_fkey` (`userId`),
  KEY `UserCourseProgress_coursId_fkey` (`coursId`),
  KEY `UserCourseProgress_questionId_fkey` (`questionId`),
  CONSTRAINT `UserCourseProgress_coursId_fkey` FOREIGN KEY (`coursId`) REFERENCES `cours` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `UserCourseProgress_questionId_fkey` FOREIGN KEY (`questionId`) REFERENCES `question` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `UserCourseProgress_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=123 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usercourseprogress`
--

LOCK TABLES `usercourseprogress` WRITE;
/*!40000 ALTER TABLE `usercourseprogress` DISABLE KEYS */;
INSERT INTO `usercourseprogress` VALUES (111,97,2,48,1),(112,97,2,44,1),(113,98,12,6,1),(114,98,12,7,1),(115,98,12,8,1),(116,98,12,9,1),(117,98,12,10,1),(118,98,12,12,1),(119,98,12,14,1),(120,98,12,16,1),(121,67,17,198,1),(122,67,17,199,1);
/*!40000 ALTER TABLE `usercourseprogress` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userexamanswer`
--

DROP TABLE IF EXISTS `userexamanswer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `userexamanswer` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `examId` int NOT NULL,
  `questionId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `UserExamAnswer_userId_fkey` (`userId`),
  KEY `UserExamAnswer_examId_fkey` (`examId`),
  KEY `UserExamAnswer_questionId_fkey` (`questionId`),
  CONSTRAINT `UserExamAnswer_examId_fkey` FOREIGN KEY (`examId`) REFERENCES `exam` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `UserExamAnswer_questionId_fkey` FOREIGN KEY (`questionId`) REFERENCES `question` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `UserExamAnswer_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=85 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userexamanswer`
--

LOCK TABLES `userexamanswer` WRITE;
/*!40000 ALTER TABLE `userexamanswer` DISABLE KEYS */;
INSERT INTO `userexamanswer` VALUES (83,67,19,196),(84,67,19,197);
/*!40000 ALTER TABLE `userexamanswer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userexamprogress`
--

DROP TABLE IF EXISTS `userexamprogress`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `userexamprogress` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `examId` int NOT NULL,
  `questionId` int NOT NULL,
  `isCorrect` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `UserExamProgress_userId_fkey` (`userId`),
  KEY `UserExamProgress_examId_fkey` (`examId`),
  KEY `UserExamProgress_questionId_fkey` (`questionId`),
  CONSTRAINT `UserExamProgress_examId_fkey` FOREIGN KEY (`examId`) REFERENCES `exam` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `UserExamProgress_questionId_fkey` FOREIGN KEY (`questionId`) REFERENCES `question` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `UserExamProgress_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=85 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userexamprogress`
--

LOCK TABLES `userexamprogress` WRITE;
/*!40000 ALTER TABLE `userexamprogress` DISABLE KEYS */;
INSERT INTO `userexamprogress` VALUES (83,67,19,196,1),(84,67,19,197,1);
/*!40000 ALTER TABLE `userexamprogress` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-09-19 17:48:29
