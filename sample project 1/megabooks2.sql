CREATE DATABASE  IF NOT EXISTS `megabooks` /*!40100 DEFAULT CHARACTER SET utf8 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `megabooks`;
-- MySQL dump 10.13  Distrib 8.0.22, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: megabooks
-- ------------------------------------------------------
-- Server version	8.0.22

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
-- Table structure for table `customers`
--

DROP TABLE IF EXISTS `customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customers` (
  `customer_id` bigint NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`customer_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customers`
--

LOCK TABLES `customers` WRITE;
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;
INSERT INTO `customers` VALUES (1,'Maria','Butina','MButina@gmail.com'),(2,'Steve','Rogers','rogers@gmail.com'),(3,'Joseph','Manderley','manderley@govmail.com'),(4,'Susan','Wright','swright567@gmail.com'),(5,'Olivia','Vetina','olive2Vetina3@gmail.com'),(6,'Jeff','Jebb','Gmail@blah');
/*!40000 ALTER TABLE `customers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employees`
--

DROP TABLE IF EXISTS `employees`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employees` (
  `employee_id` bigint NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `start_date` date NOT NULL,
  `position_held` varchar(45) NOT NULL,
  PRIMARY KEY (`employee_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employees`
--

LOCK TABLES `employees` WRITE;
/*!40000 ALTER TABLE `employees` DISABLE KEYS */;
INSERT INTO `employees` VALUES (1,'Vinny','Sinistra','2020-02-02','Sales representative'),(2,'Steve','Holden','2019-01-09','Cashier'),(3,'Josephine','Farthright','2018-08-06','Clerk'),(4,'Julia','Kenner','2020-04-03','Janitor'),(5,'Bob','Kreps','2020-06-06','Cashier'),(6,'Sammy','Jacobs','2020-03-03','Cashier'),(7,'David','Davies','2020-03-03','Cashier'),(8,'Elizabith','Morrison','2019-05-01','Cashier'),(9,'Christa','Jenkins','2019-05-02','Cashier');
/*!40000 ALTER TABLE `employees` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `product_id` bigint NOT NULL AUTO_INCREMENT,
  `product_title` varchar(255) NOT NULL,
  `amount_in_stock` int NOT NULL,
  `price` decimal(5,2) NOT NULL,
  PRIMARY KEY (`product_id`),
  UNIQUE KEY `product_title_UNIQUE` (`product_title`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'The hitchhiker\'s guide to the galaxy',5,99.99),(2,'Automate the boring stuff with Python',3,299.99),(3,'A brief history of time',7,399.99),(4,'How to win friends and influence people',9,499.99),(5,'Artificial intelligence, a modern approach',8,599.99);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `purchases`
--

DROP TABLE IF EXISTS `purchases`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `purchases` (
  `purchase_id` bigint NOT NULL AUTO_INCREMENT,
  `customer_id` bigint NOT NULL,
  `employee_id` bigint DEFAULT NULL,
  `product_id` bigint NOT NULL,
  `purchased_online` tinyint NOT NULL,
  `purchase_date` datetime NOT NULL,
  `amount_paid` decimal(5,2) NOT NULL,
  PRIMARY KEY (`purchase_id`),
  KEY `purchases_customer_ID_idx` (`customer_id`),
  KEY `purchases_employee_ID_idx` (`employee_id`),
  KEY `purchases_product_ID_idx` (`product_id`),
  CONSTRAINT `purchases_customer_ID` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`customer_id`),
  CONSTRAINT `purchases_employee_ID` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`),
  CONSTRAINT `purchases_product_ID` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `purchases`
--

LOCK TABLES `purchases` WRITE;
/*!40000 ALTER TABLE `purchases` DISABLE KEYS */;
INSERT INTO `purchases` VALUES (1,3,NULL,1,1,'2020-07-09 22:15:43',99.99),(2,4,1,1,0,'2020-08-10 20:24:42',99.99),(3,1,3,1,0,'2020-09-04 12:45:56',99.99),(4,2,2,1,0,'2020-08-11 13:33:12',99.99),(5,3,3,4,0,'2020-06-13 23:12:13',499.99),(6,1,5,2,0,'2020-06-14 11:11:12',299.99),(7,2,5,3,0,'2020-06-15 10:12:13',399.99),(8,3,5,4,0,'2020-06-16 09:04:03',499.99),(9,5,NULL,2,1,'2020-07-19 09:08:06',299.99),(10,5,NULL,2,1,'2020-07-19 09:08:06',299.99),(11,5,NULL,2,1,'2020-07-19 09:08:06',299.99);
/*!40000 ALTER TABLE `purchases` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'megabooks'
--

--
-- Dumping routines for database 'megabooks'
--
/*!50003 DROP PROCEDURE IF EXISTS `addOrEdit` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `addOrEdit`(
IN _customer_id BIGINT,
IN _first_name VARCHAR(255),
IN _last_name VARCHAR(255),
IN _email VARCHAR(255)
)
BEGIN
IF _customer_id = 0 THEN
	INSERT INTO customers(first_name,last_name,email)
	VALUES (_first_name,_last_name,_email);
	SET _customer_id = last_insert_id();
ELSE
	UPDATE customers
	SET
	first_name = _first_name,
	last_name = _last_name,
	email = _email
	WHERE customer_id = _customer_id;
END IF;
	SELECT _customer_id AS 'customer_id';
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-12-22  9:53:49
