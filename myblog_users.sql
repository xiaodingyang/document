-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: myblog
-- ------------------------------------------------------
-- Server version	8.0.19

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
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '用户名',
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '密码',
  `realname` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '昵称',
  `auth` int NOT NULL COMMENT '1. 普通用户\r\n2. 管理员\r\n3. 超级管理员（只有一个）',
  `headImg` longtext CHARACTER SET utf8 COLLATE utf8_general_ci COMMENT '头像',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (46,'test','6edefe384116934463e4c62e4ce97b53','普通用户',1,'{\"name\":\"qq.jpg\",\"uid\":\"rc-upload-1587455227395-2\",\"url\":\"http://xiaodingyang-1300707163.cos.ap-chengdu.myqcloud.com/qq.jpg\",\"percent\":100,\"status\":\"done\",\"response\":{\"data\":[],\"message\":\"OK！\",\"status\":200}}'),(54,'admin','acc4bb5abb75576fd0ad8ff7348a963b','admin',2,'{\"name\":\"xiaodingyang.jpg\",\"uid\":\"rc-upload-1587111729662-2\",\"url\":\"http://xiaodingyang-1300707163.cos.ap-chengdu.myqcloud.com/xiaodingyang.jpg\",\"percent\":100,\"status\":\"done\",\"response\":{\"message\":\"无效的token\",\"status\":403}}'),(55,'xiaodingyang','4c219a050659f96762cbe8f522d9ff4c','长安与故里',3,'{\"name\":\"xiaodingyang.jpg\",\"uid\":\"rc-upload-1587352799932-2\",\"url\":\"http://xiaodingyang-1300707163.cos.ap-chengdu.myqcloud.com/xiaodingyang.jpg\",\"percent\":100,\"status\":\"done\",\"response\":{\"message\":\"无效的token\",\"status\":403}}');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-12-17 23:04:34
