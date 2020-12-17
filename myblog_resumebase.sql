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
-- Table structure for table `resumebase`
--

DROP TABLE IF EXISTS `resumebase`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `resumebase` (
  `aboutMe` longtext CHARACTER SET utf8 COLLATE utf8_general_ci COMMENT '关于我',
  `id` int NOT NULL AUTO_INCREMENT COMMENT '主键',
  `expectedJob` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '期望工作',
  `expectedAddress` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '期望地址',
  `expectedSalary` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '期望薪资',
  `currentStatus` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '目前状态',
  `schoolName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '学校',
  `schoolNature` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '性质',
  `schoolHonou` longtext CHARACTER SET utf8 COLLATE utf8_general_ci COMMENT '荣誉',
  `jobExperience` longtext CHARACTER SET utf8 COLLATE utf8_general_ci COMMENT '经验',
  `skillList` longtext CHARACTER SET utf8 COLLATE utf8_general_ci COMMENT '技能',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=74 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `resumebase`
--

LOCK TABLES `resumebase` WRITE;
/*!40000 ALTER TABLE `resumebase` DISABLE KEYS */;
INSERT INTO `resumebase` VALUES ('<div><span>1. 本人乐观向上、吃苦耐劳。</span></div><div><span>2. 良好的社会交际能力，有较强的团队合作精神，能与不同层次&nbsp;的人交流与沟通。</span></div><div><span>3. 工作认真负责，付出全部精力和热情，喜欢挑战，能在短时间适&nbsp;应高压力任务。</span></div><div><span>4. 学习能力强，具备敏锐洞察力、较强团队管理与经营决策能力，&nbsp;熟练运用激励策略引导团队。</span></div><div><span>5. 本人热爱互联网这个行业，更加热爱前端这个职业。为了解新技&nbsp;术经常在下班业余时间</span></div><div>在&nbsp;github，CSDN，慕课网，es6阮一峰等网站学习，加强自己的技术。<br></div><div>6. 真诚的希望能为其所用，通过不断提升自我实现价值，为将来&nbsp;奋斗不息</div>',73,'前端工程师','成都','税后10k','离职','成都工业学院','统招本科','连续四年一等奖学金，班长，主办校内装机，软件创新大赛大赛等等','三年','{\"tag\":\"HTML+CSS\",\"value\":\"8\"}xdy{\"tag\":\"Javascript\",\"value\":\"7\"}xdy{\"tag\":\"Es6\",\"value\":\"7\"}xdy{\"tag\":\"React.js\",\"value\":\"7\"}xdy{\"tag\":\"Vue.js\",\"value\":\"7\"}xdy{\"tag\":\"开发常用工具（git，Jinkens，项目搭建）\",\"value\":\"7\"}xdy{\"tag\":\"小程序（微信，支付宝，百度小程序，uni-app）\",\"value\":\"7\"}');
/*!40000 ALTER TABLE `resumebase` ENABLE KEYS */;
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
