-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: nextbank
-- ------------------------------------------------------
-- Server version	8.0.36

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `account`
--

DROP TABLE IF EXISTS `account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `account` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `account_number` varchar(255) DEFAULT NULL,
  `balance` decimal(38,2) NOT NULL DEFAULT '0.00',
  `type` enum('CHECKING','SAVINGS') DEFAULT NULL,
  `client_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_66gkcp94endmotfwb8r4ocxm9` (`account_number`),
  KEY `FKkm8yb63h4ownvnlrbwnadntyn` (`client_id`),
  CONSTRAINT `FKkm8yb63h4ownvnlrbwnadntyn` FOREIGN KEY (`client_id`) REFERENCES `client` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account`
--

LOCK TABLES `account` WRITE;
/*!40000 ALTER TABLE `account` DISABLE KEYS */;
INSERT INTO `account` VALUES (7,'XX1843890881239592',571.00,'CHECKING',1),(8,'XX9686450297199971',2041.00,'SAVINGS',2),(9,'XX7824920350497487',236.54,'CHECKING',3),(10,'XX7771960972411528',8000.00,'SAVINGS',3),(11,'XX0557770163143114',3470.00,'SAVINGS',4),(12,'XX7702240760241579',450.00,'CHECKING',4),(13,'XX3829440615471118',3651.23,'SAVINGS',1),(14,'XX1609230344438224',680.00,'CHECKING',2),(15,'XX1986350174537547',3380.00,'SAVINGS',2),(16,'XX6412510811104294',300.00,'SAVINGS',1);
/*!40000 ALTER TABLE `account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `client`
--

DROP TABLE IF EXISTS `client`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `client` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `pesel` varchar(255) DEFAULT NULL,
  `date_of_birth` date DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_dy4mmtkt7gfqng0m4xgewcb0x` (`pesel`),
  UNIQUE KEY `UK_bfgjs3fem0hmjhvih80158x29` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `client`
--

LOCK TABLES `client` WRITE;
/*!40000 ALTER TABLE `client` DISABLE KEYS */;
INSERT INTO `client` VALUES (1,NULL,'1990-01-01','john.doe@example.com','John','Doe','securePassword123'),(2,NULL,'1985-05-15','jane.smith@example.com','Jane','Smith','anotherSecurePass456'),(3,NULL,'1985-03-13','frank.apple@example.com','Apple','Frank','password123'),(4,NULL,'1999-04-23','m.smith@example.com','Smith','Martin','password123');
/*!40000 ALTER TABLE `client` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transaction`
--

DROP TABLE IF EXISTS `transaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transaction` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `amount` decimal(38,2) DEFAULT NULL,
  `date` datetime(6) DEFAULT NULL,
  `type` enum('DEPOSIT','WITHDRAWAL','TRANSFER') DEFAULT NULL,
  `donor_account_id` bigint DEFAULT NULL,
  `recipient_account_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK317ucrmhliy3ids31kpr1673o` (`recipient_account_id`),
  KEY `FKr7ke2vmf7v6lk4onqj3cuj4rv` (`donor_account_id`),
  CONSTRAINT `FK317ucrmhliy3ids31kpr1673o` FOREIGN KEY (`recipient_account_id`) REFERENCES `account` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FKr7ke2vmf7v6lk4onqj3cuj4rv` FOREIGN KEY (`donor_account_id`) REFERENCES `account` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transaction`
--

LOCK TABLES `transaction` WRITE;
/*!40000 ALTER TABLE `transaction` DISABLE KEYS */;
INSERT INTO `transaction` VALUES (5,567.00,'2024-05-21 20:07:49.717040','DEPOSIT',NULL,7),(6,2000.00,'2024-05-21 20:08:01.979872','DEPOSIT',NULL,8),(7,236.54,'2024-05-21 20:08:28.924020','DEPOSIT',NULL,9),(8,8000.00,'2024-05-21 20:08:47.829284','DEPOSIT',NULL,10),(9,3470.00,'2024-05-21 20:09:05.990409','DEPOSIT',NULL,11),(10,400.00,'2024-05-21 20:09:31.632618','DEPOSIT',NULL,12),(11,4040.00,'2024-05-21 20:09:42.159300','DEPOSIT',NULL,13),(12,680.00,'2024-05-21 20:09:51.777462','DEPOSIT',NULL,14),(13,3380.00,'2024-05-21 20:10:03.914923','DEPOSIT',NULL,15),(14,0.00,'2024-05-23 17:44:27.765532','TRANSFER',13,8),(15,41.00,'2024-05-23 17:56:24.557761','TRANSFER',13,8),(16,1.00,'2024-05-23 18:30:28.999880','DEPOSIT',NULL,13),(17,1.23,'2024-05-23 18:30:50.605649','DEPOSIT',NULL,13),(18,4.00,'2024-05-23 18:47:42.854392','DEPOSIT',NULL,7),(19,300.00,'2024-05-27 18:28:37.134929','TRANSFER',13,16),(20,50.00,'2024-05-28 19:44:47.741578','TRANSFER',13,12);
/*!40000 ALTER TABLE `transaction` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-29 11:54:53
