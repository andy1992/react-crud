-- phpMyAdmin SQL Dump
-- version 4.3.11
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Dec 25, 2016 at 11:23 AM
-- Server version: 5.6.24
-- PHP Version: 5.6.24

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `php-react`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE IF NOT EXISTS `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(128) NOT NULL,
  `description` text NOT NULL,
  `created` datetime NOT NULL,
  `modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `description`, `created`, `modified`) VALUES
(1, 'Smartphone', 'Not a stupid phone', '2015-08-02 23:56:46', '2016-12-20 06:51:25'),
(2, 'Tablet', 'A small smartphone-laptop mix', '2015-08-02 23:56:46', '2016-12-20 06:51:42'),
(3, 'Ultrabook', 'Ultra portable and powerful laptop', '2016-12-20 13:51:15', '2016-12-20 06:51:52');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE IF NOT EXISTS `products` (
  `id` int(11) NOT NULL,
  `name` varchar(128) NOT NULL,
  `description` text NOT NULL,
  `price` double NOT NULL,
  `category_id` int(11) NOT NULL,
  `created` datetime NOT NULL,
  `modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `description`, `price`, `category_id`, `created`, `modified`) VALUES
(32, 'ASUS Zenbook 3', 'The most powerful and ultraportable Zenbook ever', 1799, 3, '2016-12-20 13:53:00', '2016-12-20 06:53:00'),
(33, 'Dell XPS 13', 'Super powerful and portable ultrabook with ultra thin bezel infinity display', 2199, 3, '2016-12-20 13:53:34', '2016-12-20 06:53:34'),
(34, 'Samsung Galaxy S7', 'Define what a phone can do', 649, 1, '2016-12-20 13:54:16', '2016-12-20 06:54:16'),
(35, 'Samsung Galaxy Tab S2', 'Latest Generation of Samsung Galaxy Tab Series tablet', 599, 2, '2016-12-20 13:54:43', '2016-12-20 06:54:43'),
(36, 'Apple iPad Pro', 'Powerful, thin, and light tablet from Apple', 899, 2, '2016-12-20 13:55:02', '2016-12-20 06:55:02'),
(37, 'Google Pixel', 'World''s leading smartphone camera, first phone by Google.', 649, 1, '2016-12-20 13:55:23', '2016-12-20 06:55:23'),
(38, 'Oneplus 3T', 'Never Settle', 439, 1, '2016-12-20 13:59:06', '2016-12-20 06:59:06'),
(39, 'Asus Zenfone 3 Deluxe', 'Super powerful and gorgeously designed phablet', 799, 1, '2016-12-20 13:59:37', '2016-12-20 06:59:37'),
(40, 'Xiaomi Mi Mix', 'Bezelless. Powerful. Gorgeous.', 699, 1, '2016-12-20 14:00:20', '2016-12-20 07:00:20'),
(41, 'Huawei P9', 'First Leica Branded Dual-camera Smartphone', 499, 1, '2016-12-20 14:00:45', '2016-12-20 07:00:45'),
(42, 'Xiaomi Mi 5S', 'First Xiaomi smartphone to come with light-sensitive camera', 349, 1, '2016-12-20 14:01:40', '2016-12-20 07:10:14'),
(43, 'LG V20', 'Superb dual camera, Space-grade Aluminum build, fantastic sound quality', 749, 1, '2016-12-20 14:02:28', '2016-12-20 07:02:28');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` bigint(20) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `created_at`) VALUES
(1, 'admin@react-crud.com', '$2y$10$98uieNukRl.w8dY3O.sTiegbcCuXueuDX9Df174wjaUBO4uTFQ91S', '2016-12-23 02:54:42');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=44;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=6;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
