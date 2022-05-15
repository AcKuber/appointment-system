/*
SQLyog Professional v13.1.1 (64 bit)
MySQL - 10.4.22-MariaDB : Database - online_appointment
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`online_appointment` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;

USE `online_appointment`;

/*Table structure for table `activity` */

DROP TABLE IF EXISTS `activity`;

CREATE TABLE `activity` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `aname` varchar(100) NOT NULL,
  `atype` varchar(20) DEFAULT NULL CHECK (`atype` in ('Leave','Appointment','Break')),
  `astatus` varchar(20) DEFAULT NULL CHECK (`astatus` in ('Active','Cancelled','Deactivated')),
  `adate` datetime NOT NULL,
  `startTime` time DEFAULT NULL,
  `endTime` time DEFAULT NULL,
  `addedOn` datetime DEFAULT current_timestamp(),
  `officer_id` int(11) NOT NULL,
  `visitor_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `officer_id` (`officer_id`),
  KEY `visitor_id` (`visitor_id`),
  CONSTRAINT `activity_ibfk_1` FOREIGN KEY (`officer_id`) REFERENCES `officer` (`id`),
  CONSTRAINT `activity_ibfk_2` FOREIGN KEY (`visitor_id`) REFERENCES `visitor` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;

/*Data for the table `activity` */

insert  into `activity`(`id`,`aname`,`atype`,`astatus`,`adate`,`startTime`,`endTime`,`addedOn`,`officer_id`,`visitor_id`) values 
(1,'Leave for festival','Leave','Active','2022-05-15 00:00:00','09:00:00','17:00:00','2022-05-11 12:18:49',11,NULL),
(2,'Meeting with Manoj Sir','Appointment','Active','2022-05-18 00:00:00','14:17:00','15:18:00','2022-05-11 13:17:32',11,2),
(4,'Leave for test user','Leave','Deactivated','2022-05-20 00:00:00','20:43:00','21:45:00','2022-05-15 07:43:22',10,NULL),
(5,'Meeting with Manoj Sir','Appointment','Active','2022-05-27 00:00:00','10:43:00','11:45:00','2022-05-15 07:44:18',11,2);

/*Table structure for table `officer` */

DROP TABLE IF EXISTS `officer`;

CREATE TABLE `officer` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `oname` varchar(50) NOT NULL,
  `post` varchar(50) NOT NULL,
  `ostatus` varchar(10) DEFAULT NULL CHECK (`ostatus` in ('Active','Inactive')),
  `workStartTime` time NOT NULL,
  `workEndTime` time NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4;

/*Data for the table `officer` */

insert  into `officer`(`id`,`oname`,`post`,`ostatus`,`workStartTime`,`workEndTime`) values 
(9,'The Kubera','Manager','Active','08:00:00','17:00:00'),
(10,'Test User','CEO','Inactive','11:11:00','22:10:00'),
(11,'Manoj Sitoula','CEO','Active','10:16:00','15:18:00'),
(12,'Test Twice','MA','Inactive','16:21:00','20:25:00');

/*Table structure for table `visitor` */

DROP TABLE IF EXISTS `visitor`;

CREATE TABLE `visitor` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `vname` varchar(50) NOT NULL,
  `mobile_no` varchar(50) NOT NULL,
  `email` varchar(30) NOT NULL,
  `vstatus` varchar(10) DEFAULT NULL CHECK (`vstatus` in ('Active','Inactive')),
  PRIMARY KEY (`id`),
  UNIQUE KEY `mobile_no` (`mobile_no`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

/*Data for the table `visitor` */

insert  into `visitor`(`id`,`vname`,`mobile_no`,`email`,`vstatus`) values 
(1,'New Visitor','9841123456','yourmail@kuber.com','Inactive'),
(2,'Kamal Hassan','9823456843','guptori@hotmail.com','Active');

/*Table structure for table `work_days` */

DROP TABLE IF EXISTS `work_days`;

CREATE TABLE `work_days` (
  `officer_id` int(11) NOT NULL,
  `DAYOFWEEK` varchar(10) NOT NULL,
  PRIMARY KEY (`officer_id`,`DAYOFWEEK`),
  CONSTRAINT `work_days_ibfk_1` FOREIGN KEY (`officer_id`) REFERENCES `officer` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `work_days` */

insert  into `work_days`(`officer_id`,`DAYOFWEEK`) values 
(9,'sunday'),
(10,'friday'),
(10,'monday'),
(10,'sunday'),
(11,'friday'),
(11,'monday'),
(11,'sunday'),
(11,'wednesday'),
(12,'monday'),
(12,'saturday'),
(12,'sunday'),
(12,'thursday'),
(12,'tuesday'),
(12,'wednesday');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
