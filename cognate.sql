-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 16, 2022 at 01:19 PM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.0.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cognate`
--

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `Cat_ID` int(11) NOT NULL,
  `category` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `cognate_table`
--

CREATE TABLE `cognate_table` (
  `ID` int(11) NOT NULL,
  `email` varchar(5000) NOT NULL,
  `password` varchar(500) NOT NULL,
  `sec1` varchar(600) NOT NULL,
  `sec2` varchar(600) NOT NULL,
  `code` varchar(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `cognate_table`
--

INSERT INTO `cognate_table` (`ID`, `email`, `password`, `sec1`, `sec2`, `code`) VALUES
(1, 'cw==', 'YQ==', 'c2E=', 'c2E=', '474425');

-- --------------------------------------------------------

--
-- Table structure for table `customer_data`
--

CREATE TABLE `customer_data` (
  `Customer_ID` int(11) NOT NULL,
  `Customer_name` varchar(635) NOT NULL,
  `Customer_email` varchar(635) NOT NULL,
  `Customer_cell` varchar(11) NOT NULL,
  `Customer_address` varchar(635) NOT NULL,
  `Customer_purchase` varchar(635) NOT NULL,
  `Customer_date` date NOT NULL,
  `Customer_total` int(11) NOT NULL,
  `Customer_Quantity` varchar(11) NOT NULL,
  `Customer_modepayment` varchar(3000) NOT NULL,
  `Customer_payment` varchar(545) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `customer_data_draft`
--

CREATE TABLE `customer_data_draft` (
  `Customer_ID` int(11) NOT NULL,
  `Customer_name` varchar(635) NOT NULL,
  `Customer_email` varchar(635) NOT NULL,
  `Customer_cell` varchar(635) NOT NULL,
  `Customer_address` varchar(635) NOT NULL,
  `Customer_purchase` varchar(635) NOT NULL,
  `Customer_date` date NOT NULL,
  `Customer_total` int(11) NOT NULL,
  `Customer_Quantity` varchar(635) NOT NULL,
  `Customer_modepayment` varchar(635) NOT NULL,
  `Customer_payment` varchar(635) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `product_data`
--

CREATE TABLE `product_data` (
  `Product_ID` int(11) NOT NULL,
  `Product_image` longtext NOT NULL,
  `Product_name` longtext NOT NULL,
  `Product_category` longtext NOT NULL,
  `Product_stocks` int(255) NOT NULL,
  `Product_price` int(255) NOT NULL,
  `Product_Status` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `product_retrievedata`
--

CREATE TABLE `product_retrievedata` (
  `Product_ID` int(11) NOT NULL,
  `Product_image` longtext NOT NULL,
  `Product_name` longtext NOT NULL,
  `Product_category` longtext NOT NULL,
  `Product_stocks` int(255) NOT NULL,
  `Product_price` int(255) NOT NULL,
  `Product_Status` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `recycle_bin_customer`
--

CREATE TABLE `recycle_bin_customer` (
  `Customer_ID` int(11) NOT NULL,
  `Customer_name` varchar(500) NOT NULL,
  `Customer_email` varchar(635) NOT NULL,
  `Customer_cell` varchar(11) NOT NULL,
  `Customer_address` varchar(635) NOT NULL,
  `Customer_purchase` varchar(635) NOT NULL,
  `Customer_date` date NOT NULL,
  `Customer_total` int(11) NOT NULL,
  `Customer_Quantity` varchar(635) NOT NULL,
  `Customer_modepayment` varchar(200) NOT NULL,
  `Customer_payment` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `recycle_bin_product`
--

CREATE TABLE `recycle_bin_product` (
  `Product_ID` int(11) NOT NULL,
  `Product_image` longtext NOT NULL,
  `Product_name` varchar(500) NOT NULL,
  `Product_category` varchar(500) NOT NULL,
  `Product_stocks` int(255) NOT NULL,
  `Product_price` int(255) NOT NULL,
  `Product_status` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`Cat_ID`);

--
-- Indexes for table `cognate_table`
--
ALTER TABLE `cognate_table`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `customer_data`
--
ALTER TABLE `customer_data`
  ADD PRIMARY KEY (`Customer_ID`);

--
-- Indexes for table `customer_data_draft`
--
ALTER TABLE `customer_data_draft`
  ADD PRIMARY KEY (`Customer_ID`);

--
-- Indexes for table `product_data`
--
ALTER TABLE `product_data`
  ADD PRIMARY KEY (`Product_ID`);

--
-- Indexes for table `product_retrievedata`
--
ALTER TABLE `product_retrievedata`
  ADD PRIMARY KEY (`Product_ID`);

--
-- Indexes for table `recycle_bin_customer`
--
ALTER TABLE `recycle_bin_customer`
  ADD PRIMARY KEY (`Customer_ID`);

--
-- Indexes for table `recycle_bin_product`
--
ALTER TABLE `recycle_bin_product`
  ADD PRIMARY KEY (`Product_ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `Cat_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `cognate_table`
--
ALTER TABLE `cognate_table`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `customer_data`
--
ALTER TABLE `customer_data`
  MODIFY `Customer_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=140;

--
-- AUTO_INCREMENT for table `customer_data_draft`
--
ALTER TABLE `customer_data_draft`
  MODIFY `Customer_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=118;

--
-- AUTO_INCREMENT for table `product_data`
--
ALTER TABLE `product_data`
  MODIFY `Product_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2441;

--
-- AUTO_INCREMENT for table `product_retrievedata`
--
ALTER TABLE `product_retrievedata`
  MODIFY `Product_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2441;

--
-- AUTO_INCREMENT for table `recycle_bin_customer`
--
ALTER TABLE `recycle_bin_customer`
  MODIFY `Customer_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=141;

--
-- AUTO_INCREMENT for table `recycle_bin_product`
--
ALTER TABLE `recycle_bin_product`
  MODIFY `Product_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2441;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
