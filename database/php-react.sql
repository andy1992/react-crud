-- phpMyAdmin SQL Dump
-- version 4.3.11
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Dec 20, 2016 at 04:42 AM
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `description`, `created`, `modified`) VALUES
(1, 'Sports', 'Products you use for sports.', '2015-08-02 23:56:46', '2015-08-02 22:59:36'),
(2, 'Personal', 'Products for you personal needs.', '2015-08-02 23:56:46', '2015-08-02 22:59:36');

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
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `description`, `price`, `category_id`, `created`, `modified`) VALUES
(3, 'Gatorade', 'This is a very good drink for athletes.', 1.99, 1, '2015-08-02 12:14:29', '2015-08-02 08:57:13'),
(4, 'Eye Glasses', 'It will make you read better.', 6, 2, '2015-08-02 12:15:04', '2016-08-26 11:34:09'),
(6, 'Mouse', 'Very useful if you love your computer.', 11.35, 2, '2015-08-02 12:17:58', '2015-08-02 08:57:38'),
(8, 'Pillow', 'Sleeping well is important.', 8.99, 2, '2015-08-02 12:18:56', '2015-08-02 08:57:38'),
(13, 'Cellphone Stand', 'Very useful if you are a developer.', 5.55, 2, '2015-08-03 08:00:16', '2016-12-16 08:46:01'),
(19, 'Test 1', 'test desc', 10, 2, '2016-08-21 00:24:24', '2016-12-16 09:44:33'),
(20, 'Samsung Galaxy S7', 'Black Onyx', 599, 2, '2016-08-21 00:26:03', '2016-08-20 17:26:03'),
(21, 'Xiaomi mi5', 'Flagship wannabe', 399, 2, '2016-08-21 00:28:08', '2016-08-20 17:28:08'),
(23, 'Ash', 'Pokemon Master', 20, 1, '2016-12-16 15:58:58', '2016-12-16 08:58:58'),
(26, 'Test 2', 'Test 2', 25, -1, '2016-12-16 16:37:05', '2016-12-16 09:37:05');

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
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=27;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
