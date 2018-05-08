-- MySQL dump 10.13  Distrib 5.7.17, for macos10.12 (x86_64)
--
-- Host: 127.0.0.1    Database: mockserverdb
-- ------------------------------------------------------
-- Server version	5.7.18

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `ms_api`
--

DROP TABLE IF EXISTS `ms_api`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ms_api` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `groupId` bigint(20) DEFAULT NULL,
  `apiName` varchar(50) DEFAULT NULL,
  `urlMD5` varchar(50) DEFAULT NULL COMMENT 'url转换成MD5后的值，用于URL匹配',
  `urlString` varchar(200) DEFAULT NULL COMMENT 'api url 的路径字符串',
  `method` tinyint(4) DEFAULT NULL COMMENT 'API请求的方法：POST PUT GET DELETE等',
  `outputData` varchar(500) DEFAULT NULL COMMENT '出参内容',
  `dbNameAndTableName` varchar(500) DEFAULT NULL COMMENT '对应的数据库和表',
  `preAPI` varchar(200) DEFAULT NULL COMMENT '前置API，调用这个API之前需要使用到的API',
  `failData` varchar(300) DEFAULT NULL COMMENT '错误数据',
  `versionNo` varchar(10) DEFAULT NULL COMMENT '版本号',
  `isExpired` tinyint(4) DEFAULT '0' COMMENT '是否过期',
  `requestContentType` tinyint(4) DEFAULT NULL COMMENT 'request content type：json text',
  `responseContentType` tinyint(4) DEFAULT NULL COMMENT 'response content type：json image pdf等',
  `inputBodyType` int(11) DEFAULT '0',
  `inputBodyFlag` int(11) DEFAULT '0',
  `inputHeadFlag` int(11) DEFAULT '0',
  `outPutFailDesc` varchar(1000) DEFAULT NULL,
  `outPutDesc` varchar(1000) DEFAULT NULL,
  `inputTypeDesc` varchar(1000) DEFAULT NULL,
  `createTime` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8 COMMENT='ms:mock server api表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ms_api`
--

LOCK TABLES `ms_api` WRITE;
/*!40000 ALTER TABLE `ms_api` DISABLE KEYS */;
INSERT INTO `ms_api` VALUES (28,59,'测试API001','b9a0826ce7ea0aaea7b83d7a6823161f','/test/01',1,'{\"success\":true}','none','无','{\"success\":false}','0.0.1',0,1,1,1,1,1,'{\"success\":false}','{\"success\":true}','无','2018-05-07 13:00:29'),(29,59,'测试API002','6b14116bbc8edabdf9efd80fe96766ca','/test/02',1,'{\"success\":true}','none','无','{\"success\":false}','0.0.1',0,1,1,2,1,1,'{\"success\":false}','{\"success\":true}','无','2018-05-07 13:01:18'),(30,59,'详细的markdown文档测试','e9e8dbe6fdcc439f6817fee5bb8426e6','/test/003',3,'{\"ceshi\":1}','无','无','{\"ceshi\":1}','0.0.1',0,1,1,0,0,0,'**这里不传任何参数**\n# 标题\n## 标题\n### 标题','**这里不传任何参数**\n# 标题\n## 标题\n### 标题','**这里不传任何参数**\n# 标题\n## 标题\n### 标题','2018-05-08 14:36:43');
/*!40000 ALTER TABLE `ms_api` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ms_apigroup`
--

DROP TABLE IF EXISTS `ms_apigroup`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ms_apigroup` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `groupName` char(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=utf8 COMMENT='ms:mock server API分组表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ms_apigroup`
--

LOCK TABLES `ms_apigroup` WRITE;
/*!40000 ALTER TABLE `ms_apigroup` DISABLE KEYS */;
INSERT INTO `ms_apigroup` VALUES (1,'Sprint20'),(59,'Sprint21');
/*!40000 ALTER TABLE `ms_apigroup` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ms_columtype`
--

DROP TABLE IF EXISTS `ms_columtype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ms_columtype` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `columType` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COMMENT='ms:mock server 字段类型';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ms_columtype`
--

LOCK TABLES `ms_columtype` WRITE;
/*!40000 ALTER TABLE `ms_columtype` DISABLE KEYS */;
INSERT INTO `ms_columtype` VALUES (1,'字符串'),(2,'json'),(3,'整型'),(4,'浮点型'),(5,'列表');
/*!40000 ALTER TABLE `ms_columtype` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ms_contenttype`
--

DROP TABLE IF EXISTS `ms_contenttype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ms_contenttype` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `contentType` varchar(30) DEFAULT NULL,
  `extName` varchar(10) DEFAULT NULL COMMENT '扩展名',
  `desc` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='ms:mock server request and response的content Type';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ms_contenttype`
--

LOCK TABLES `ms_contenttype` WRITE;
/*!40000 ALTER TABLE `ms_contenttype` DISABLE KEYS */;
INSERT INTO `ms_contenttype` VALUES (1,'application/json','json','请求和返回json时使用此类型');
/*!40000 ALTER TABLE `ms_contenttype` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ms_input`
--

DROP TABLE IF EXISTS `ms_input`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ms_input` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `apiId` bigint(20) DEFAULT NULL,
  `hbType` int(11) DEFAULT NULL COMMENT 'hb：h=header b=body,记录是header的参数还是body类型的参数',
  `paramName` varchar(30) DEFAULT NULL COMMENT '参数名称',
  `paramType` int(11) DEFAULT NULL COMMENT '参数类型',
  `paramSpec` varchar(100) DEFAULT NULL COMMENT '参数规格，比如边界规格要求',
  `paramDesc` varchar(100) DEFAULT NULL COMMENT '参数说明',
  `paramUnit` tinyint(4) DEFAULT '0' COMMENT '参数单位，默认是没有单位的',
  `paramValue` varchar(1000) DEFAULT NULL COMMENT '参数值',
  `isMust` tinyint(4) DEFAULT '0' COMMENT '参数是否必填，1为必填，0为非必填',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8 COMMENT='ms:mock server 入参数据表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ms_input`
--

LOCK TABLES `ms_input` WRITE;
/*!40000 ALTER TABLE `ms_input` DISABLE KEYS */;
INSERT INTO `ms_input` VALUES (35,28,0,'stage',1,'test','测试环境',1,'test',1),(36,28,0,'key',1,'jts','OAuth',1,'jts',1),(37,28,1,'username',0,'最大长度15个字符','用户名',1,'admin',0),(38,28,1,'password',0,'最大长度为20个字符','密码',1,'123456',0),(39,29,0,'stage',1,'test','测试环境',1,'test',1),(40,29,0,'key',1,'jts','OAuth',1,'jts',1),(41,29,1,'none',2,'','',1,'{\"username\":\"admin\",\"password:\":\"123456\"}',1);
/*!40000 ALTER TABLE `ms_input` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ms_inputtype`
--

DROP TABLE IF EXISTS `ms_inputtype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ms_inputtype` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `inputTypeName` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COMMENT='ms:mock server 入参方式';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ms_inputtype`
--

LOCK TABLES `ms_inputtype` WRITE;
/*!40000 ALTER TABLE `ms_inputtype` DISABLE KEYS */;
INSERT INTO `ms_inputtype` VALUES (1,'body-form-data'),(2,'body-raw'),(3,'body-x-www-form-urlencoded');
/*!40000 ALTER TABLE `ms_inputtype` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ms_method`
--

DROP TABLE IF EXISTS `ms_method`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ms_method` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `methodName` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COMMENT='ms:mock server API提交请求的方法';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ms_method`
--

LOCK TABLES `ms_method` WRITE;
/*!40000 ALTER TABLE `ms_method` DISABLE KEYS */;
INSERT INTO `ms_method` VALUES (1,'POST'),(2,'GET'),(3,'PUT'),(4,'DELETE'),(5,'OPTIONS'),(6,'COPY');
/*!40000 ALTER TABLE `ms_method` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ms_ops`
--

DROP TABLE IF EXISTS `ms_ops`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ms_ops` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `userId` bigint(20) NOT NULL,
  `opContent` varchar(500) DEFAULT NULL,
  `createTime` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='ms:mock server 用户操作记录表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ms_ops`
--

LOCK TABLES `ms_ops` WRITE;
/*!40000 ALTER TABLE `ms_ops` DISABLE KEYS */;
/*!40000 ALTER TABLE `ms_ops` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ms_unit`
--

DROP TABLE IF EXISTS `ms_unit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ms_unit` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `unitName` varchar(10) DEFAULT NULL,
  `unitFlag` varchar(10) DEFAULT NULL,
  `desc` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COMMENT='ms:mock server 单位';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ms_unit`
--

LOCK TABLES `ms_unit` WRITE;
/*!40000 ALTER TABLE `ms_unit` DISABLE KEYS */;
INSERT INTO `ms_unit` VALUES (1,'无','n','无'),(2,'角','￥','单位为角'),(3,'分','￥','单位为分'),(4,'秒','s','单位为秒'),(5,'毫秒','ms','单位为毫秒'),(6,'分','m','单位为时间的分钟'),(7,'时','h','单位为时间的小时'),(8,'元','￥','单位为元');
/*!40000 ALTER TABLE `ms_unit` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ms_user`
--

DROP TABLE IF EXISTS `ms_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ms_user` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `userName` char(20) NOT NULL,
  `password` char(20) NOT NULL,
  `level` tinyint(4) DEFAULT '0',
  `createTime` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='ms:mock server 用户表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ms_user`
--

LOCK TABLES `ms_user` WRITE;
/*!40000 ALTER TABLE `ms_user` DISABLE KEYS */;
/*!40000 ALTER TABLE `ms_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ms_user_api`
--

DROP TABLE IF EXISTS `ms_user_api`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ms_user_api` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `userId` bigint(20) NOT NULL COMMENT '用户ID',
  `groupId` bigint(20) NOT NULL COMMENT '分组ID',
  `apiId` bigint(20) NOT NULL COMMENT 'API ID',
  `urlMD5` varchar(50) DEFAULT NULL COMMENT 'url转换成MD5后的值，用于URL匹配',
  `urlString` varchar(200) DEFAULT NULL COMMENT 'api url 的路径字符串',
  `method` tinyint(4) DEFAULT NULL COMMENT 'API请求的方法：POST PUT GET DELETE等',
  `inputType` tinyint(4) DEFAULT NULL COMMENT '入参类型：headers body',
  `outputData` varchar(500) DEFAULT NULL COMMENT '出参内容',
  `dbNameAndTableName` varchar(500) DEFAULT NULL COMMENT '对应的数据库和表',
  `preAPI` varchar(200) DEFAULT NULL COMMENT '前置API，调用这个API之前需要使用到的API',
  `failData` varchar(300) DEFAULT NULL COMMENT '错误数据',
  `versionNo` varchar(10) DEFAULT NULL COMMENT '版本号',
  `isExpired` tinyint(4) DEFAULT '0' COMMENT '是否过期',
  `requestContentType` tinyint(4) DEFAULT NULL COMMENT 'request content type：json text',
  `responseContentType` tinyint(4) DEFAULT NULL COMMENT 'response content type：json image pdf等',
  `createTime` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='ms:mock server 用户api表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ms_user_api`
--

LOCK TABLES `ms_user_api` WRITE;
/*!40000 ALTER TABLE `ms_user_api` DISABLE KEYS */;
/*!40000 ALTER TABLE `ms_user_api` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ms_user_input`
--

DROP TABLE IF EXISTS `ms_user_input`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ms_user_input` (
  `userApiId` bigint(20) DEFAULT NULL,
  `paramName` varchar(30) DEFAULT NULL COMMENT '参数名称',
  `paramType` int(11) DEFAULT NULL COMMENT '参数类型',
  `paramSpec` varchar(100) DEFAULT NULL COMMENT '参数规格，比如边界规格要求',
  `paramDesc` varchar(100) DEFAULT NULL COMMENT '参数说明',
  `paramUnit` tinyint(4) DEFAULT '0' COMMENT '参数单位，默认是没有单位的',
  `paramValue` varchar(100) DEFAULT NULL COMMENT '参数值',
  `isMust` tinyint(4) DEFAULT '0' COMMENT '参数是否必填，1为必填，0为非必填',
  `otherDesc` varchar(200) DEFAULT NULL COMMENT '其他的备注说明'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='ms:mock server 入参数据表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ms_user_input`
--

LOCK TABLES `ms_user_input` WRITE;
/*!40000 ALTER TABLE `ms_user_input` DISABLE KEYS */;
/*!40000 ALTER TABLE `ms_user_input` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-05-08 16:02:22
