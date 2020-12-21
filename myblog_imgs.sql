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
-- Table structure for table `imgs`
--

DROP TABLE IF EXISTS `imgs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `imgs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `imgKey` longtext CHARACTER SET utf8 COLLATE utf8_general_ci COMMENT '图片标识',
  `imgList` longtext CHARACTER SET utf8 COLLATE utf8_general_ci COMMENT '图片列表',
  `description` longtext CHARACTER SET utf8 COLLATE utf8_general_ci COMMENT '图片描述',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `imgs`
--

LOCK TABLES `imgs` WRITE;
/*!40000 ALTER TABLE `imgs` DISABLE KEYS */;
INSERT INTO `imgs` VALUES (13,'swiperImg','{\"name\":\"王者荣耀孙悟空-大圣娶亲8k游戏壁纸7680x4320_彼岸图网.jpg\",\"uid\":\"rc-upload-1587021522729-2\",\"url\":\"http://xiaodingyang-1300707163.cos.ap-chengdu.myqcloud.com/%E7%8E%8B%E8%80%85%E8%8D%A3%E8%80%80%E5%AD%99%E6%82%9F%E7%A9%BA-%E5%A4%A7%E5%9C%A3%E5%A8%B6%E4%BA%B28k%E6%B8%B8%E6%88%8F%E5%A3%81%E7%BA%B87680x4320_%E5%BD%BC%E5%B2%B8%E5%9B%BE%E7%BD%91.jpg\",\"percent\":100,\"status\":\"done\",\"response\":{\"message\":\"无效的token\",\"status\":403}}xdy{\"name\":\"浓浓的一杯咖啡图片_彼岸图网.jpg\",\"uid\":\"rc-upload-1587022344464-2\",\"url\":\"http://xiaodingyang-1300707163.cos.ap-chengdu.myqcloud.com/%E6%B5%93%E6%B5%93%E7%9A%84%E4%B8%80%E6%9D%AF%E5%92%96%E5%95%A1%E5%9B%BE%E7%89%87_%E5%BD%BC%E5%B2%B8%E5%9B%BE%E7%BD%91.jpg\",\"percent\":100,\"status\":\"done\",\"response\":{\"message\":\"无效的token\",\"status\":403}}xdy{\"name\":\"page2.jpg\",\"uid\":\"rc-upload-1587022344464-4\",\"url\":\"http://xiaodingyang-1300707163.cos.ap-chengdu.myqcloud.com/page2.jpg\",\"percent\":100,\"status\":\"done\",\"response\":{\"message\":\"无效的token\",\"status\":403}}xdy{\"name\":\"5.jpg\",\"uid\":\"rc-upload-1587022344464-6\",\"url\":\"http://xiaodingyang-1300707163.cos.ap-chengdu.myqcloud.com/5.jpg\",\"percent\":100,\"status\":\"done\",\"response\":{\"message\":\"无效的token\",\"status\":403}}','轮播图图片'),(14,'navImg','{\"name\":\"nav1.jpg\",\"uid\":\"rc-upload-1587022344464-9\",\"url\":\"http://xiaodingyang-1300707163.cos.ap-chengdu.myqcloud.com/nav1.jpg\",\"percent\":100,\"status\":\"done\",\"response\":{\"message\":\"无效的token\",\"status\":403}}xdy{\"name\":\"nav2.jpg\",\"uid\":\"rc-upload-1587022344464-11\",\"url\":\"http://xiaodingyang-1300707163.cos.ap-chengdu.myqcloud.com/nav2.jpg\",\"percent\":100,\"status\":\"done\",\"response\":{\"message\":\"无效的token\",\"status\":403}}xdy{\"name\":\"nav3.jpg\",\"uid\":\"rc-upload-1587022344464-13\",\"url\":\"http://xiaodingyang-1300707163.cos.ap-chengdu.myqcloud.com/nav3.jpg\",\"percent\":100,\"status\":\"done\",\"response\":{\"message\":\"无效的token\",\"status\":403}}','导航栏背景图'),(15,'webHomeImg','{\"name\":\"page1.jpg\",\"uid\":\"rc-upload-1587022344464-16\",\"url\":\"http://xiaodingyang-1300707163.cos.ap-chengdu.myqcloud.com/page1.jpg\",\"percent\":100,\"status\":\"done\",\"response\":{\"message\":\"无效的token\",\"status\":403}}','博客首页背景'),(16,'appHomeBg','{\"name\":\"shizi.jpg\",\"uid\":\"rc-upload-1587022344464-19\",\"url\":\"http://xiaodingyang-1300707163.cos.ap-chengdu.myqcloud.com/shizi.jpg\",\"percent\":100,\"status\":\"done\",\"response\":{\"message\":\"无效的token\",\"status\":403}}','博客背景图'),(17,'qqImg','{\"name\":\"qq.jpg\",\"uid\":\"rc-upload-1587022344464-22\",\"url\":\"http://xiaodingyang-1300707163.cos.ap-chengdu.myqcloud.com/qq.jpg\",\"percent\":100,\"status\":\"done\",\"response\":{\"message\":\"无效的token\",\"status\":403}}','qq二维码'),(18,'wxImg','{\"name\":\"wx.jpg\",\"uid\":\"rc-upload-1587022344464-25\",\"url\":\"http://xiaodingyang-1300707163.cos.ap-chengdu.myqcloud.com/wx.jpg\",\"percent\":100,\"status\":\"done\",\"response\":{\"message\":\"无效的token\",\"status\":403}}','微信二维码'),(19,'headImg','{\"name\":\"xiaodingyang.jpg\",\"uid\":\"rc-upload-1587022344464-28\",\"url\":\"http://xiaodingyang-1300707163.cos.ap-chengdu.myqcloud.com/xiaodingyang.jpg\",\"percent\":100,\"status\":\"done\",\"response\":{\"message\":\"无效的token\",\"status\":403}}','本人头像');
/*!40000 ALTER TABLE `imgs` ENABLE KEYS */;
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
