-- MySQL dump 10.13  Distrib 5.5.50, for debian-linux-gnu (x86_64)
--
-- Host: 0.0.0.0    Database: mporn
-- ------------------------------------------------------
-- Server version	5.5.50-0ubuntu0.14.04.1

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
-- Table structure for table `cliente`
--
USE mporn;

DROP TABLE IF EXISTS `cliente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cliente` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nome` varchar(128) NOT NULL,
  `email` varchar(128) NOT NULL,
  `cpfcnpj` varchar(11) NOT NULL,
  `senha` varchar(65) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cliente`
--

LOCK TABLES `cliente` WRITE;
/*!40000 ALTER TABLE `cliente` DISABLE KEYS */;
INSERT INTO `cliente` VALUES (1,'Bracobom','contato@bracomal.com.br','04040224040','b7e94be513e96e8c45cd23d162275e5a12ebde9100a425c4ebcdd7fa4dcd897c'),(2,'Tecnovit','contato@tecnovit.com.br','03939223913','senha'),(3,'Acerte Compras','contato@acertecompras.com.br','03939223913','senha'),(4,'Bracomal','contato@bracomal.com.br','03939223914','b7e94be513e96e8c45cd23d162275e5a12ebde9100a425c4ebcdd7fa4dcd897c'),(5,'Jussara','jussa@gmail.com','03939223913','b7e94be513e96e8c45cd23d162275e5a12ebde9100a425c4ebcdd7fa4dcd897c'),(6,'Jussara','jussa@gmail.com','03939223913','b7e94be513e96e8c45cd23d162275e5a12ebde9100a425c4ebcdd7fa4dcd897c');
/*!40000 ALTER TABLE `cliente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `especialidade`
--

DROP TABLE IF EXISTS `especialidade`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `especialidade` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nome` varchar(40) NOT NULL,
  `descricao` varchar(128) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `especialidade`
--

LOCK TABLES `especialidade` WRITE;
/*!40000 ALTER TABLE `especialidade` DISABLE KEYS */;
INSERT INTO `especialidade` VALUES (1,'CSS','Folha de Estilos'),(2,'HTML','Linguagem de marcação básica'),(3,'PHP','Linguagem de programação back-end'),(4,'SysAdmin',''),(5,'JS,JQuery','Linguagem de programação Front-End');
/*!40000 ALTER TABLE `especialidade` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `freelancer`
--

DROP TABLE IF EXISTS `freelancer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `freelancer` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nome` varchar(128) NOT NULL,
  `email` varchar(128) NOT NULL,
  `cpfcnpj` varchar(11) NOT NULL,
  `senha` varchar(65) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `freelancer`
--

LOCK TABLES `freelancer` WRITE;
/*!40000 ALTER TABLE `freelancer` DISABLE KEYS */;
INSERT INTO `freelancer` VALUES (1,'FABRICIO PINTO BARBOSA','fabriciopbrb@gmail.com','03939223913','b7e94be513e96e8c45cd23d162275e5a12ebde9100a425c4ebcdd7fa4dcd897c'),(2,'FABRICIO PINTO BARBOSA','fabricio@dipcorp.com.br','03939223913','b7e94be513e96e8c45cd23d162275e5a12ebde9100a425c4ebcdd7fa4dcd897c');
/*!40000 ALTER TABLE `freelancer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `freelancer_especialidade`
--

DROP TABLE IF EXISTS `freelancer_especialidade`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `freelancer_especialidade` (
  `id_freelancer` int(10) unsigned NOT NULL,
  `id_especialidade` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id_freelancer`,`id_especialidade`),
  KEY `id_especialidade` (`id_especialidade`),
  KEY `id_freelancer` (`id_freelancer`),
  CONSTRAINT `freelancer_especialidade_ibfk_1` FOREIGN KEY (`id_freelancer`) REFERENCES `freelancer` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `freelancer_especialidade_ibfk_2` FOREIGN KEY (`id_especialidade`) REFERENCES `especialidade` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `freelancer_especialidade`
--

LOCK TABLES `freelancer_especialidade` WRITE;
/*!40000 ALTER TABLE `freelancer_especialidade` DISABLE KEYS */;
INSERT INTO `freelancer_especialidade` VALUES (1,1),(2,1),(1,2),(2,2),(1,3),(2,3),(1,4),(1,5),(2,5);
/*!40000 ALTER TABLE `freelancer_especialidade` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `plano_especialidade`
--

DROP TABLE IF EXISTS `plano_especialidade`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `plano_especialidade` (
  `id_plano` int(10) unsigned NOT NULL,
  `id_especialidade` int(10) unsigned NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `plano_especialidade`
--

LOCK TABLES `plano_especialidade` WRITE;
/*!40000 ALTER TABLE `plano_especialidade` DISABLE KEYS */;
INSERT INTO `plano_especialidade` VALUES (1,1),(1,2),(2,1),(2,2),(2,5),(3,1),(3,2),(3,3),(3,5);
/*!40000 ALTER TABLE `plano_especialidade` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `planos`
--

DROP TABLE IF EXISTS `planos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `planos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(64) NOT NULL,
  `descricaocurta` varchar(256) DEFAULT NULL,
  `valor` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `planos`
--

LOCK TABLES `planos` WRITE;
/*!40000 ALTER TABLE `planos` DISABLE KEYS */;
INSERT INTO `planos` VALUES (1,'Site Estatico','Criação de sites estaticos',1500),(2,'Site Intermediario','Criação de sites com tecnologia JS, JQuery',2000),(3,'Site Avançado','Criação de sites com tecnologia JS, JQuery e PHP',3000);
/*!40000 ALTER TABLE `planos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trabalho`
--

DROP TABLE IF EXISTS `trabalho`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `trabalho` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nome` varchar(128) COLLATE utf8_unicode_ci NOT NULL,
  `plano` int(10) unsigned NOT NULL,
  `descricao` varchar(256) COLLATE utf8_unicode_ci DEFAULT NULL,
  `id_cliente` int(11) NOT NULL,
  `id_freelancer` int(11) DEFAULT NULL,
  `situacao` int(11) DEFAULT '1',
  `detalhado` varchar(1000) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_cliente` (`id_cliente`),
  KEY `id_freelancer` (`id_freelancer`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trabalho`
--

LOCK TABLES `trabalho` WRITE;
/*!40000 ALTER TABLE `trabalho` DISABLE KEYS */;
INSERT INTO `trabalho` VALUES (1,'Bracomal Pneus',1,'Apresentação da Empresa',1,NULL,0,'Trabalho todo detalhado aqui!'),(2,'Site de Loja de Tecnologia',1,'Apresentação da Empresa',2,NULL,0,'Trabalho todo detalhado aqui!'),(3,'E-commerce',3,'Loja de Vendas ONline',3,NULL,0,'Trabalho todo detalhado aqui!'),(4,'Luiza Alimentos',1,'Site para apresentar a empresa',1,1,1,'Trabalho todo detalhado aqui!'),(6,'Site Fui Feito',2,'Site que já foi feito',2,1,2,'Trabalho todo detalhado aqui!'),(7,'Site Já feito Também',1,'Outro site já feito',3,1,2,'Trabalho todo detalhado aqui!'),(8,'Novo Trabalho Bracobum',1,'Site para apresentação da Empresa',4,NULL,0,'Descrição detalhada Aqui!'),(9,'Novo Trabalho 2',1,'Descricao pequena',4,1,3,'Descricao detalhada');
/*!40000 ALTER TABLE `trabalho` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-10-10  5:28:28
