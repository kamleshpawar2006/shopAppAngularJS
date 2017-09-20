-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Sep 20, 2017 at 08:45 PM
-- Server version: 5.6.17
-- PHP Version: 5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `mydbnew`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE IF NOT EXISTS `categories` (
  `category_id` int(11) NOT NULL AUTO_INCREMENT,
  `category_name` varchar(30) NOT NULL,
  `category_description` varchar(150) NOT NULL,
  PRIMARY KEY (`category_id`),
  UNIQUE KEY `category_name_UNIQUE` (`category_name`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=34 ;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`category_id`, `category_name`, `category_description`) VALUES
(32, 'Shirts', 'Shirts description'),
(33, 'Jeans', 'Jeans description');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE IF NOT EXISTS `products` (
  `product_id` int(11) NOT NULL AUTO_INCREMENT,
  `product_name` varchar(45) NOT NULL,
  `product_description` varchar(45) NOT NULL,
  `category_id` int(11) NOT NULL,
  `product_price` int(11) NOT NULL,
  PRIMARY KEY (`product_id`),
  UNIQUE KEY `product_id_UNIQUE` (`product_id`),
  KEY `cat_id_idx` (`category_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=28 ;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`product_id`, `product_name`, `product_description`, `category_id`, `product_price`) VALUES
(24, 'Pepe', 'Pepe jeans description', 33, 3432),
(25, 'Levis', 'Levis jeans description', 33, 3421),
(26, 'Mufti', 'Shirts description', 32, 2341),
(27, 'Peter England', 'Peter England shirts description', 32, 2312);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `full_name` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `mobile_no` varchar(45) DEFAULT NULL,
  `password` varchar(45) DEFAULT NULL,
  `user_type` int(11) DEFAULT '2',
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=6 ;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `full_name`, `email`, `mobile_no`, `password`, `user_type`) VALUES
(2, 'kamlesh', 'kamleshpawar2006@gmail.com', '9890986929', 'kamlesh', 1),
(3, 'Sukhada Desale', 'sd00508139@techmahindra.com', '9665385236', '$ukhadaD@5', 2),
(4, 'Sourav Dutta', 'souravf177@gmail.com', '7278871766', '123', 2),
(5, 'kamlesh pawar', 'kp00498088@techmahindra.com', '9890986929', 'kamlesh', 2);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `cat_id_fk` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
