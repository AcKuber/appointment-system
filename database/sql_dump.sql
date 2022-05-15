-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 15, 2022 at 07:09 AM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.1.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `online_appointment`
--

-- --------------------------------------------------------

--
-- Table structure for table `activity`
--

CREATE TABLE `activity` (
  `id` int(11) NOT NULL,
  `aname` varchar(100) NOT NULL,
  `atype` varchar(20) DEFAULT NULL CHECK (`atype` in ('Leave','Appointment','Break')),
  `astatus` varchar(20) DEFAULT NULL CHECK (`astatus` in ('Active','Cancelled','Deactivated')),
  `adate` datetime NOT NULL,
  `startTime` time DEFAULT NULL,
  `endTime` time DEFAULT NULL,
  `addedOn` datetime DEFAULT current_timestamp(),
  `officer_id` int(11) NOT NULL,
  `visitor_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `activity`
--

INSERT INTO `activity` (`id`, `aname`, `atype`, `astatus`, `adate`, `startTime`, `endTime`, `addedOn`, `officer_id`, `visitor_id`) VALUES
(1, 'Leave for festival', 'Leave', 'Active', '2022-05-15 00:00:00', '09:00:00', '17:00:00', '2022-05-11 12:18:49', 11, NULL),
(2, 'Meeting with Manoj Sir', 'Appointment', 'Active', '2022-05-18 00:00:00', '14:17:00', '15:18:00', '2022-05-11 13:17:32', 11, 2),
(4, 'Leave for test user', 'Leave', 'Deactivated', '2022-05-20 00:00:00', '20:43:00', '21:45:00', '2022-05-15 07:43:22', 10, NULL),
(5, 'Meeting with Manoj Sir', 'Appointment', 'Active', '2022-05-27 00:00:00', '10:43:00', '11:45:00', '2022-05-15 07:44:18', 11, 2);

-- --------------------------------------------------------

--
-- Table structure for table `officer`
--

CREATE TABLE `officer` (
  `id` int(11) NOT NULL,
  `oname` varchar(50) NOT NULL,
  `post` varchar(50) NOT NULL,
  `ostatus` varchar(10) DEFAULT NULL CHECK (`ostatus` in ('Active','Inactive')),
  `workStartTime` time NOT NULL,
  `workEndTime` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `officer`
--

INSERT INTO `officer` (`id`, `oname`, `post`, `ostatus`, `workStartTime`, `workEndTime`) VALUES
(9, 'The Kubera', 'Manager', 'Active', '08:00:00', '17:00:00'),
(10, 'Test User', 'CEO', 'Inactive', '11:11:00', '22:10:00'),
(11, 'Manoj Sitoula', 'CEO', 'Active', '10:16:00', '15:18:00'),
(12, 'Test Twice', 'MA', 'Inactive', '16:21:00', '20:25:00');

-- --------------------------------------------------------

--
-- Table structure for table `visitor`
--

CREATE TABLE `visitor` (
  `id` int(11) NOT NULL,
  `vname` varchar(50) NOT NULL,
  `mobile_no` varchar(50) NOT NULL,
  `email` varchar(30) NOT NULL,
  `vstatus` varchar(10) DEFAULT NULL CHECK (`vstatus` in ('Active','Inactive'))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `visitor`
--

INSERT INTO `visitor` (`id`, `vname`, `mobile_no`, `email`, `vstatus`) VALUES
(1, 'New Visitor', '9841123456', 'yourmail@kuber.com', 'Inactive'),
(2, 'Kamal Hassan', '9823456843', 'guptori@hotmail.com', 'Active');

-- --------------------------------------------------------

--
-- Table structure for table `work_days`
--

CREATE TABLE `work_days` (
  `officer_id` int(11) NOT NULL,
  `DAYOFWEEK` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `work_days`
--

INSERT INTO `work_days` (`officer_id`, `DAYOFWEEK`) VALUES
(9, 'sunday'),
(10, 'friday'),
(10, 'monday'),
(10, 'sunday'),
(11, 'friday'),
(11, 'monday'),
(11, 'sunday'),
(11, 'wednesday'),
(12, 'monday'),
(12, 'saturday'),
(12, 'sunday'),
(12, 'thursday'),
(12, 'tuesday'),
(12, 'wednesday');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `activity`
--
ALTER TABLE `activity`
  ADD PRIMARY KEY (`id`),
  ADD KEY `officer_id` (`officer_id`),
  ADD KEY `visitor_id` (`visitor_id`);

--
-- Indexes for table `officer`
--
ALTER TABLE `officer`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `visitor`
--
ALTER TABLE `visitor`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `mobile_no` (`mobile_no`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `work_days`
--
ALTER TABLE `work_days`
  ADD PRIMARY KEY (`officer_id`,`DAYOFWEEK`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `activity`
--
ALTER TABLE `activity`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `officer`
--
ALTER TABLE `officer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `visitor`
--
ALTER TABLE `visitor`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `activity`
--
ALTER TABLE `activity`
  ADD CONSTRAINT `activity_ibfk_1` FOREIGN KEY (`officer_id`) REFERENCES `officer` (`id`),
  ADD CONSTRAINT `activity_ibfk_2` FOREIGN KEY (`visitor_id`) REFERENCES `visitor` (`id`);

--
-- Constraints for table `work_days`
--
ALTER TABLE `work_days`
  ADD CONSTRAINT `work_days_ibfk_1` FOREIGN KEY (`officer_id`) REFERENCES `officer` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
