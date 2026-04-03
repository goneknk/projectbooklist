-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 03, 2026 at 10:17 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `booklibrary`
--

-- --------------------------------------------------------

--
-- Table structure for table `books`
--

CREATE TABLE `books` (
  `book_id` bigint(20) NOT NULL,
  `title` varchar(255) NOT NULL,
  `author` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `category` enum('นิยาย','การ์ตูน','การศึกษา','พัฒนาตนเอง','ธุรกิจ','เทคโนโลยี','ประวัติศาสตร์','ชีวประวัติ','วิทยาศาสตร์','สุขภาพ','เด็กและเยาวชน','จิตวิทยา','อื่นๆ') NOT NULL,
  `published_year` year(4) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `user_id` bigint(20) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `books`
--

INSERT INTO `books` (`book_id`, `title`, `author`, `description`, `category`, `published_year`, `image`, `user_id`, `created_at`, `updated_at`) VALUES
(1, 'Harry Potter and the Philosopher\'s Stone', 'J.K.Rowling', 'แฮร์รี่ พอตเตอร์ เด็กชายกำพร้าที่ค้นพบว่าตนเองเป็นพ่อมด ได้เข้าเรียนที่โรงเรียนเวทมนตร์ฮอกวอตส์ และเริ่มต้นการผจญภัยครั้งแรก พร้อมเผชิญหน้ากับความลับของศิลาอาถรรพ์และการกลับมาของลอร์ดโวลเดอมอร์', 'นิยาย', '1997', '1775035577171.jpg', 1, NULL, NULL),
(4, 'Harry Potter and the Prisoner of Azkaban', 'korn', 'นักโทษอันตราย ซีเรียส แบล็ก หลบหนีจากคุกอัซคาบัน และถูกเชื่อว่าไล่ล่าแฮร์รี่ แต่ความจริงที่ซ่อนอยู่กลับเปลี่ยนชีวิตของแฮร์รี่ไปตลอดกาล', 'นิยาย', '1998', '1775034359125.jpg', 2, NULL, NULL),
(5, 'Harry Potter and the Goblet of Fire', 'J.K.Rowling', 'แฮร์รี่ถูกเลือกเข้าแข่งขันประลองเวทไตรภาคโดยไม่คาดคิด ต้องเผชิญภารกิจอันตราย และเป็นจุดเริ่มต้นของการคืนชีพอย่างแท้จริงของโวลเดอมอร์', 'นิยาย', '2000', '1775035204225.jpg', 1, NULL, NULL),
(6, 'Harry Potter and the Chamber of Secrets', 'J.K.Rowling', 'เหตุการณ์ประหลาดเกิดขึ้นในฮอกวอตส์ นักเรียนถูกทำให้กลายเป็นหิน แฮร์รี่ต้องค้นหาความลับของห้องแห่งความลับ และเผชิญหน้ากับสัตว์ประหลาดในตำนาน', 'นิยาย', '1998', '1775037025521.jpg', 1, NULL, NULL),
(7, 'Harry Potter and the Order of the Phoenix', 'J.K.Rowling', 'กระทรวงเวทมนตร์ปฏิเสธการกลับมาของโวลเดอมอร์ แฮร์รี่และเพื่อน ๆ จัดตั้งกลุ่มกองทัพดัมเบิลดอร์เพื่อฝึกป้องกันตัว และต้องเผชิญการสูญเสียครั้งใหญ่', 'นิยาย', '2003', '1775037079624.jpg', 1, NULL, NULL),
(8, 'Harry Potter and the Half-Blood Prince', 'J.K.Rowling', 'ดัมเบิลดอร์เริ่มเปิดเผยอดีตของโวลเดอมอร์ให้แฮร์รี่รู้ เพื่อเตรียมตัวสู่สงครามครั้งสุดท้าย พร้อมความลับของเจ้าชายเลือดผสม', 'นิยาย', '2005', NULL, 1, NULL, NULL),
(9, 'Harry Potter and the Deathly Hallows', 'J.K.Rowling', 'แฮร์รี่ รอน และเฮอร์ไมโอนี่ออกเดินทางทำลายฮอร์ครักซ์เพื่อหยุดโวลเดอมอร์ นำไปสู่ศึกสุดท้ายแห่งฮอกวอตส์และบทสรุปของเรื่องราวทั้งหมด', 'การ์ตูน', '2007', NULL, 1, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` bigint(20) NOT NULL,
  `user_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `user_name`, `email`, `password`, `created_at`, `updated_at`) VALUES
(1, 'Rowling', 'Rowling@gmail.com', '$2b$10$w0qpsHnzpVpHxyowA0CNdO1CIUmhZ98hTwsOHA522LVNgTudI4bNe', NULL, NULL),
(2, 'korn', 'korn@gmail.com', '$2b$10$w0qpsHnzpVpHxyowA0CNdO1CIUmhZ98hTwsOHA522LVNgTudI4bNe', NULL, NULL),
(3, 'book', 'book@gmail.com', '$2b$10$2ZeFB5kuXXw.WnUBbUpqEePiBrr0ey4R2Ib3hY871qPQ7ds0MNKuq', NULL, NULL),
(4, 'test', 'test@gmail.com', '$2b$10$Y91yDnT8367jX7qsxIK6meuWTgQDVIsL1BbBPk17RbCs.GbJ1wPXa', NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `books`
--
ALTER TABLE `books`
  ADD PRIMARY KEY (`book_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `books`
--
ALTER TABLE `books`
  MODIFY `book_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `books`
--
ALTER TABLE `books`
  ADD CONSTRAINT `books_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
