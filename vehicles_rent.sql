-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 07 Mar 2022 pada 07.06
-- Versi server: 10.4.14-MariaDB
-- Versi PHP: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vehicles_rent`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `category`
--

INSERT INTO `category` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
(1, 'Car', '2022-02-02 12:03:25', '2022-02-02 06:03:17'),
(2, 'Motorcycle', '2022-02-02 12:03:37', '2022-02-02 06:03:29'),
(3, 'Bike', '2022-02-02 12:03:44', '2022-02-02 06:03:39'),
(4, 'Bus', '2022-02-02 12:11:02', NULL),
(5, 'Truck', '2022-02-02 12:12:07', '2022-02-03 10:32:58');

-- --------------------------------------------------------

--
-- Struktur dari tabel `forgot_request`
--

CREATE TABLE `forgot_request` (
  `id` int(11) NOT NULL,
  `id_user` int(11) DEFAULT NULL,
  `code` varchar(60) NOT NULL,
  `isExpired` tinyint(4) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `forgot_request`
--

INSERT INTO `forgot_request` (`id`, `id_user`, `code`, `isExpired`, `createdAt`, `updatedAt`) VALUES
(1, 33, '-96300', 0, '2022-02-11 15:29:00', NULL),
(2, 33, '795246', 0, '2022-02-11 15:32:20', NULL),
(3, 33, '-50021', 1, '2022-02-11 15:40:13', NULL),
(4, 33, '199244', 1, '2022-02-12 13:38:58', NULL),
(5, 33, '879482', 1, '2022-02-12 13:50:19', NULL),
(6, 54, '778538', 1, '2022-02-14 13:54:37', NULL),
(7, 55, '765739', 1, '2022-02-14 22:02:12', NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `history`
--

CREATE TABLE `history` (
  `id` int(11) NOT NULL,
  `id_users` int(11) DEFAULT NULL,
  `id_vehicles` int(11) DEFAULT NULL,
  `start_rent` date NOT NULL DEFAULT current_timestamp(),
  `end_rent` date NOT NULL DEFAULT current_timestamp(),
  `returned` enum('Yes','No') NOT NULL,
  `new_arrival` varchar(80) NOT NULL,
  `createdAt` datetime DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `history`
--

INSERT INTO `history` (`id`, `id_users`, `id_vehicles`, `start_rent`, `end_rent`, `returned`, `new_arrival`, `createdAt`, `updatedAt`) VALUES
(3, 6, 34, '2021-12-30', '2022-03-07', 'Yes', 'new', '2021-12-30 00:00:00', '2022-02-05 20:25:20'),
(4, 2, 35, '2021-12-31', '2022-03-07', 'Yes', 'new', '2022-01-31 11:53:54', '2022-02-05 20:25:41'),
(5, 6, 30, '2022-01-01', '2022-03-07', 'Yes', 'old', '2022-01-01 11:54:26', '2022-02-05 20:26:04'),
(6, 5, 34, '2022-01-04', '2022-03-07', 'Yes', 'old', '2022-01-04 11:54:57', '2022-02-05 20:26:13'),
(7, 5, 29, '2022-01-12', '2022-03-07', 'Yes', 'new', '2022-01-12 14:15:09', '2022-02-11 07:47:45'),
(8, 2, 40, '2022-01-19', '2022-03-07', 'Yes', 'new', '2022-02-19 14:22:06', '2022-02-05 20:44:21'),
(9, 2, 40, '2022-01-25', '2022-03-07', 'Yes', 'new', '2022-01-25 22:28:24', '2022-02-05 20:26:57'),
(10, 6, 34, '2022-01-31', '2022-03-07', 'Yes', 'new', '2022-01-31 10:05:28', '2022-02-05 20:27:40'),
(11, 7, 32, '2022-02-01', '2022-03-07', 'Yes', 'new', '2022-02-01 15:12:53', '2022-02-05 20:27:48'),
(12, 10, 33, '2022-02-02', '2022-03-07', 'Yes', 'new', '2022-02-02 19:07:52', '2022-02-05 20:27:19'),
(13, 9, 28, '2022-02-02', '2022-03-07', 'Yes', 'new', '2022-02-02 19:10:09', '2022-02-05 20:27:55'),
(14, 6, 43, '2022-02-04', '2022-03-07', 'Yes', 'new', '2022-02-04 19:33:32', '2022-02-06 09:17:05'),
(15, 9, 42, '2022-02-05', '2022-03-07', 'Yes', 'new', '2022-02-05 19:33:48', '2022-02-06 09:17:13'),
(20, 3, 43, '2022-02-05', '2022-03-07', 'Yes', 'new', '2022-02-05 19:33:56', '2022-02-05 21:06:28'),
(21, 13, 34, '2022-02-05', '2022-03-07', 'Yes', 'new', '2022-02-05 20:32:03', '2022-02-12 20:26:22'),
(22, 12, 40, '2022-02-05', '2022-03-07', 'Yes', 'new', '2022-02-05 20:32:58', '2022-02-12 20:26:28'),
(23, 11, 42, '2022-02-05', '2022-03-07', 'Yes', 'new', '2022-02-05 21:07:20', '2022-02-05 21:07:55'),
(24, 11, 36, '2022-02-05', '2022-03-07', 'Yes', 'new', '2022-02-05 21:07:47', '2022-02-05 15:07:33'),
(25, 2, 42, '2022-02-05', '2022-03-07', 'Yes', 'new', '2022-02-05 21:08:25', '2022-02-05 15:08:14'),
(28, 8, 43, '2022-02-10', '2022-03-07', 'Yes', 'new', '2022-02-10 07:09:23', '2022-02-10 07:26:47'),
(29, 10, 44, '2022-02-10', '2022-03-07', 'Yes', 'new', '2022-02-10 07:09:50', '2022-02-12 20:25:32'),
(30, 9, 47, '2022-02-10', '2022-03-07', 'Yes', 'new', '2022-02-10 07:13:22', '2022-02-12 20:25:37'),
(31, 9, 47, '2022-02-11', '2022-03-07', 'Yes', 'new', '2022-02-11 07:22:16', '2022-02-12 20:25:42');

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(80) NOT NULL,
  `identity` varchar(8) NOT NULL,
  `gender` enum('Men','Women') NOT NULL,
  `email` varchar(80) NOT NULL,
  `address` varchar(100) NOT NULL,
  `number` varchar(13) NOT NULL,
  `birthdate` date DEFAULT NULL,
  `username` varchar(80) NOT NULL,
  `password` varchar(100) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `name`, `identity`, `gender`, `email`, `address`, `number`, `birthdate`, `username`, `password`, `createdAt`, `updatedAt`) VALUES
(2, 'Lana', '12345577', 'Women', 'lana@gmail.com', 'Soeharto 1 Street Number 1', '081234567894', '1987-01-02', '0', '0', '2022-02-02 19:51:47', '2022-02-05 14:48:36'),
(3, 'Dodot', '12345687', 'Men', 'dodot@gmail.com', 'Soekarno 1 street number 1', '081234567899', '1987-01-03', '0', '0', '2022-02-02 20:16:16', '2022-02-05 12:29:52'),
(4, 'Dela', '12345677', 'Women', 'dela@gmail.com', 'Soekarno 2 street number 1', '081234567899', '1987-01-05', '0', '0', '2022-02-02 20:17:03', '2022-02-05 12:29:52'),
(5, 'Dito', '12345667', 'Men', 'dito@gmail.com', 'Imam Bonjol Street Number 10', '082123456757', '1987-01-06', '0', '0', '2022-02-02 20:26:00', '2022-02-05 12:30:39'),
(6, 'Dila', '12345666', 'Women', 'dila@gmail.com', 'Soekarno 3 street number 1', '081234567999', '1987-01-07', '0', '0', '2022-02-03 09:07:01', '2022-02-05 12:29:52'),
(7, 'Dani', '12345653', 'Men', 'dila@gmail.com', 'Soekarno 3 street number 1', '081234567999', '1992-02-02', '0', '0', '2022-02-05 12:25:37', '2022-02-05 12:31:01'),
(8, 'Paijo', '12345634', 'Men', 'dila@gmail.com', 'Soekarno 3 street number 1', '081234567999', '1988-02-02', '0', '0', '2022-02-05 12:40:11', NULL),
(9, 'Deni', '12345623', 'Men', 'deni@gmail.com', 'Soekarno 3 street number 1', '081234567900', '1993-02-11', '0', '0', '2022-02-05 13:05:53', '2022-02-05 13:06:59'),
(10, 'Lilis', '12345645', 'Women', 'lilis@gmail.com', 'Soekarno 10 street number 1', '081234567943', '1987-05-06', '0', '0', '2022-02-05 13:08:10', NULL),
(11, 'Lia', '12345198', 'Women', 'lia@gmail.com', 'Soekarno 4 street number 1', '081234567694', '1987-10-12', '0', '0', '2022-02-05 14:24:40', NULL),
(12, 'Indra', '12345121', 'Men', 'indra@gmail.com', 'Soekarno 4 street number 10', '081234567602', '1987-10-07', '0', '0', '2022-02-05 14:30:22', '2022-02-05 14:32:56'),
(13, 'Genta', '12345115', 'Women', 'genta@gmail.com', 'Soekarno 4 street number 12', '081234567332', '1988-10-13', '0', '0', '2022-02-05 14:31:52', '2022-02-05 14:33:04'),
(14, 'Nazra', '87654321', 'Women', 'nazra@gmail.com', 'Mengkudu 2 street number 100', '082178641319', '1972-05-14', 'nazra', '1234', '2022-02-10 12:31:31', NULL),
(15, 'Nazra', '87654321', 'Women', 'nazra@gmail.com', 'Mengkudu 2 street number 100', '082178641319', '1972-05-14', 'nazra', '1234', '2022-02-10 12:32:07', NULL),
(16, 'Nazra', '87654321', 'Women', 'nazra@gmail.com', 'Mengkudu 2 street number 100', '082178641319', '1972-05-14', 'nazra', '1234', '2022-02-10 12:32:47', NULL),
(17, 'Nazra', '87654321', 'Women', 'nazra@gmail.com', 'Mengkudu 2 street number 100', '082178641319', '1972-05-14', 'nazra', '1234', '2022-02-10 12:34:04', NULL),
(18, 'Nazra', '87654321', 'Women', 'nazra@gmail.com', 'Mengkudu 2 street number 100', '082178641319', '1972-05-14', 'nazra', '1234', '2022-02-10 12:37:39', NULL),
(19, 'Nazra', '87654321', 'Women', 'nazra@gmail.com', 'Mengkudu 2 street number 100', '082178641319', '1972-05-14', 'nazra', '1234', '2022-02-10 12:38:42', NULL),
(20, 'Nazra', '87654321', 'Women', 'nazra@gmail.com', 'Mengkudu 2 street number 100', '082178641319', '1972-05-14', 'nazra', '1234', '2022-02-10 12:40:21', NULL),
(21, 'Nazra', '87654321', 'Women', 'nazra@gmail.com', 'Mengkudu 2 street number 100', '082178641319', '1972-05-14', 'nazra', '1234', '2022-02-10 12:41:44', NULL),
(22, 'Nazra', '87654321', 'Women', 'nazra@gmail.com', 'Mengkudu 2 street number 100', '082178641319', '1972-05-14', 'nazra', '1234', '2022-02-10 12:45:10', NULL),
(23, 'Nazra', '87654321', 'Women', 'nazra@gmail.com', 'Mengkudu 2 street number 100', '082178641319', '1972-05-14', 'nazra', '1234', '2022-02-10 12:46:30', NULL),
(24, 'Nazra', '87654321', 'Women', 'nazra@gmail.com', 'Mengkudu 2 street number 100', '082178641319', '1972-05-14', 'nazra', '1234', '2022-02-10 12:47:43', NULL),
(25, 'Nazra', '87654321', 'Women', 'nazra@gmail.com', 'Mengkudu 2 street number 100', '082178641319', '1972-05-14', 'nazra', '$2b$10$KPOTwf2daD/YY4ANuFKhluLTu7nYQtY8br/SA0AKNk2sJbbqH3JOu', '2022-02-10 12:55:25', NULL),
(26, 'Nazra', '87654321', 'Women', 'nazra@gmail.com', 'Mengkudu 2 street number 100', '082178641319', '1972-05-14', 'nazra', '$2b$10$BiK.KSzEsiGYeQ302u7k..QmNQJh9HB4yFXXeXSdJ05Paw9X8NQfu', '2022-02-10 12:56:23', NULL),
(27, 'Nazra', '87654321', 'Women', 'nazra@gmail.com', 'Mengkudu 2 street number 100', '082178641319', '1972-05-14', 'nazra', '$2b$10$wdQCAz7ZYsMOrEd/Gy7WDeV8d7Sb6PECTxcIv0eUgQ98Dnqwh58JW', '2022-02-10 13:10:04', NULL),
(28, 'Nazra', '87654321', 'Women', 'nazra@gmail.com', 'Mengkudu 2 street number 100', '082178641319', '1972-05-14', 'nazra', '$2b$10$bvEeasSI1UAHMvbsdlY7QurhzA4JSSKKGxt5z9/52jLbDc2rHocY2', '2022-02-10 13:13:25', NULL),
(29, 'Nazra', '87654321', 'Women', 'nazra@gmail.com', 'Mengkudu 2 street number 100', '082178641319', '1972-05-14', 'nazra', '$2b$10$NawvOkeHDNuScrWsaif40OOZzorL8O7ArcIhet.eJMXl77tBil6Hu', '2022-02-10 13:14:28', NULL),
(30, 'Nazra', '87654321', 'Women', 'nazra@gmail.com', 'Mengkudu 2 street number 100', '082178641319', '1972-05-14', 'nazra', '$2b$10$hIoJIeN43g2BV3QtpwpIUuraveLIqcWon2SAFZt9iXao2DZmUe.iK', '2022-02-10 13:14:32', NULL),
(31, 'Indra', '87654323', 'Men', 'indra@gmail.com', 'Mengkudu 3 street number 100', '082178641322', '1972-05-23', 'indra', '1234', '2022-02-10 13:24:40', NULL),
(32, 'Delia', '87654324', 'Women', 'delia@gmail.com', 'Mengkudu 4 street number 100', '082178641309', '1972-05-21', 'delia', '$2b$10$Z.SPbeTYl193/fNP7y/ADue9LntJkGpQAPt8tJSpLzow94h/wqcjC', '2022-02-10 13:28:01', NULL),
(33, 'Zalfa', '87654312', 'Women', 'zalfafanur@gmail.com', 'Mengkudu 41 street number 100', '082178641321', '1999-01-24', 'zalfa', '$2b$20$U1ePOiwHaA1eR6qmh7qA0u8m2ti.Dzwyv/JBAPJC/SfXthgblbvk.', '2022-02-11 12:06:26', '2022-02-12 13:52:30'),
(34, 'Salwa', '', 'Men', 'salwa@gmail.com', '', '', NULL, 'salwa', '$2b$10$OSGT0wLIGL.k0yawf5KVR.0Hp50WqJya8Qn2I7YRv9q4/Ge2Loud2', '2022-02-11 12:36:34', NULL),
(35, 'Saniyyah', '', 'Men', 'saniyyah@gmail.com', '', '', NULL, 'saniyyah', '$2b$10$KFTfoiAxNONvRKYP.IVAH.SoLXDQlMbTpCafKN4HNTIWDYoZQ8XmW', '2022-02-11 12:38:08', NULL),
(36, 'Farel', '', 'Men', 'farel@gmail.com', '', '', NULL, 'farel', '$2b$10$fCkwkI8Syj5EXTMQsgYxRe16V5zSQ7ua4qrjgAjfKzQIJTGvOwCde', '2022-02-11 22:41:19', NULL),
(37, 'Sindi', '', 'Men', 'sindi@gmail.com', '', '', NULL, 'sindi', '$2b$10$00NbRzo5Wpjb0V8tnwT8teFwuZsbPILBe4r1F0L.WretdVx.HmWN.', '2022-02-14 08:32:20', NULL),
(38, 'Boni Irman Nuriman', '87654340', 'Men', 'boniirman@gmail.com', 'Soeharto 1 Street Number 10', '081234567967', '1987-01-01', 'boni', '$2b$10$xmNCBLC14etG/Zdp71DFnOdYNUM2m4E0XX2YeGlDSB0ZDLPLDY4.y', '2022-02-14 08:34:51', '2022-02-14 15:45:37'),
(39, 'Sandy', '', 'Men', 'boni@gmail.com', '', '', NULL, 'sandy', '$2b$10$mZt1Bisr0VmBcH2ajEI4U.cmjnl.jYnM6S9QWYXJ9DvTw9k1qMyya', '2022-02-14 11:55:57', NULL),
(40, 'Linda', '', 'Men', 'boni@gmail.com', '', '', NULL, 'linda', '$2b$10$HDDDTRzwi2LlQ85BephPiuXaMyhOl0pFVL1c/1jtULokcfwUDTRPS', '2022-02-14 11:57:12', NULL),
(41, 'Linda', '', 'Men', 'boni@gmail.com', '', '', NULL, 'linda', '$2b$10$njvV5n8f/cr22E/shj7K/O10pdyXGI90ja.28QFgCZdeXJQA5Meiy', '2022-02-14 11:59:40', NULL),
(42, 'Toni', '', 'Men', 'toni@gmail.com', '', '', NULL, 'toni', '$2b$10$O46uLJWhqOijqUaYMr1Sz.HaWMWNZsTqrNq5gETBt.E0j.UAHNvJq', '2022-02-14 12:11:44', NULL),
(43, 'Sasa', '', 'Men', 'toni@gmail.com', '', '', NULL, 'Sasa', '$2b$10$0G2I8mAe1BjcOmT.DrFEU.bgHQCeCi91bOaIoq7mPJbuzdBrrpt3m', '2022-02-14 12:11:58', NULL),
(44, 'Sasa', '', 'Men', 'toni@gmail.com', '', '', NULL, 'Sasa', '$2b$10$eL/UZbdXltYSXGMp7WQRHeQfVQbD0WcoxDiJsJh8F97.USJ6NA7ue', '2022-02-14 12:12:48', NULL),
(45, 'Sasa', '', 'Men', 'toni@gmail.com', '', '', NULL, 'Sasa', '$2b$10$3nINVSly9j46nql3bKJnd.IBHRE5gDXcIOYz/V6FA.Ttf/gSeO0F6', '2022-02-14 12:16:03', NULL),
(46, 'Sasa', '', 'Men', 'toni@gmail.com', '', '', NULL, 'Sasa', '$2b$10$010.VmOcVkBnCD7A32b3UuXO5fyFSPnizRlhK9Z8XOZlpHiBRu54S', '2022-02-14 12:16:38', NULL),
(47, 'Giring', '', 'Men', 'giring@gmail.com', '', '', NULL, 'giring', '$2b$10$yVmVAHNbHKhC.eyrMEjA2O81haGk.FXh8bH8fPQ9j7/AvGnEA9892', '2022-02-14 12:19:08', NULL),
(48, 'Giring', '', 'Men', 'giring@gmail.com', '', '', NULL, 'giring1', '$2b$10$ruKmOei94DipsAt0jG9wsuDIhUSCaGReJVfIBqBx8REis/rWaBFoi', '2022-02-14 12:19:17', NULL),
(49, 'Giring', '', 'Men', 'giring@gmail.com', '', '', NULL, 'giring2', '$2b$10$69PGGph.S59Sewv3t9eOr.t1s.o2SbMlUP/PDcuFJQgtAc2H6VoLW', '2022-02-14 12:25:13', NULL),
(50, 'Giring', '', 'Men', 'giring@gmail.com', '', '', NULL, 'giring2', '$2b$10$0UZp5/xHiJ46.Xk7hW.fH.ksBLdHJBkIZZVyZUUn1TUXe5Gc50GAO', '2022-02-14 12:26:12', NULL),
(51, 'Giring', '', 'Men', 'giring@gmail.com', '', '', NULL, 'giring2', '$2b$10$ZQ16bBDwVQ1KM7lmJ9WvXO0bkYlczoRErvKfZRviW6TVlFObP8SBq', '2022-02-14 12:28:39', NULL),
(52, 'Giring', '', 'Men', 'giring@gmail.com', '', '', NULL, 'giring2', '$2b$10$LDf6rcRiFrpvdEgnyI/59OknraE5c60IZsGUIbMFrY3bVz8pMV94q', '2022-02-14 12:32:10', NULL),
(53, 'Lina', '', 'Men', 'lina@gmail.com', '', '', NULL, 'lina2', '$2b$10$Itk7AWdLFBnAVNEo9rc19OUMqJnWNUelTxGVpjdsxEnZFsDD4YUgm', '2022-02-14 13:50:39', NULL),
(54, 'bipih', '', 'Men', 'bipih40705@petloca.com', '', '', NULL, 'bipih1', '$2b$10$GuwpmUQNLj/CoZJ/K4j1G.T9Wam.9QHhuEq2.5ZuHObOQnFp7mMEG', '2022-02-14 13:54:24', '2022-02-14 14:10:07'),
(55, 'Edu Agritama', '', 'Men', 'iumyx13@gmail.com', '', '', NULL, 'edu123', '$2b$10$/./T4GHjfx2qDpUyVOBv9eGl.MSNsMA0UD0FLp2CmA6lwOOe.qrxm', '2022-02-14 22:00:38', '2022-02-14 22:11:07'),
(56, 'Admin1', '87654355', 'Men', 'admin1@mail.com', 'Mengkudu 41 street number 150', '082178641932', '1999-02-26', 'admin1', '$2b$10$Rg1RJgMfPQ/NNn9xAGqklelZSvvPSae0P5dAinZ14/dYOTT5txMtW', '2022-03-04 13:05:24', NULL),
(57, 'Tiara Andini', '', 'Women', 'tiara@gmail.com', '', '', NULL, 'tiara', '$2b$10$lnDvmj2V6V15lPOr9sUdmuo5BCkttXfGdIguAgmFh14HQW0t6uIo.', '2022-03-06 14:30:31', '2022-03-06 15:03:32'),
(58, 'Keisya Levronka', '', 'Women', 'keisya@gmail.com', '', '', NULL, 'keisya', '$2b$10$.12bbv0M2QqInRVEHOgkeeETxYl1xQqbXp2HWXWCseCAZxuuXFGn6', '2022-03-06 14:32:58', '2022-03-06 15:03:55');

-- --------------------------------------------------------

--
-- Struktur dari tabel `vehicles`
--

CREATE TABLE `vehicles` (
  `id` int(11) NOT NULL,
  `category_id` int(11) DEFAULT NULL,
  `brand` varchar(80) NOT NULL,
  `image` text DEFAULT NULL,
  `price` int(11) NOT NULL,
  `location` varchar(50) NOT NULL,
  `qty` int(10) NOT NULL,
  `can_prepayment` enum('Can Prepayment','No Prepayment') NOT NULL,
  `payment` enum('cash','transfer') NOT NULL,
  `isAvailable` enum('Available','Not Available') NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `vehicles`
--

INSERT INTO `vehicles` (`id`, `category_id`, `brand`, `image`, `price`, `location`, `qty`, `can_prepayment`, `payment`, `isAvailable`, `createdAt`, `updatedAt`) VALUES
(27, 1, 'Mitsubishi-Xpander', 'uploads/Mitsubishi-Xpander-1645802517766-289191393.png', 200000, 'Bandung', 1, 'Can Prepayment', 'cash', 'Available', '2022-01-31 12:02:31', '2022-02-25 22:21:57'),
(28, 1, 'BMW M5', 'uploads/BMW-M5-1645929124886-566603314.png', 200000, 'Bandung', 1, 'Can Prepayment', 'cash', 'Available', '2022-01-31 12:02:39', '2022-02-27 09:32:04'),
(29, 1, 'Suzuki Baleno', 'uploads/Suzuki-Baleno-1645929675712-821046850.png', 200000, 'Bandung', 1, 'Can Prepayment', 'cash', 'Available', '2022-01-31 14:38:56', '2022-02-27 09:41:15'),
(30, 1, 'Ignis Suzuki', 'uploads/Ignis-Suzuki-1645929830929-67008176.png', 250000, 'Yogyakarta', 1, 'Can Prepayment', 'cash', 'Available', '2022-01-31 16:03:20', '2022-02-27 09:43:50'),
(31, 1, 'Honda HRV', 'uploads/Honda-HRV-1645951555464-162187431.png', 200000, 'Yogyakarta', 1, 'Can Prepayment', 'cash', 'Available', '2022-01-31 16:04:05', '2022-02-27 15:45:55'),
(32, 1, 'Mazda CX 5', 'uploads/Mazda-CX-5-1645934589351-227278021.png', 200000, 'Yogyakarta', 1, 'Can Prepayment', 'cash', 'Available', '2022-01-31 16:04:35', '2022-02-27 11:03:09'),
(33, 1, 'Hino Dutro Dump 110 HD', 'uploads/Hino-Dutro-Dump-110-HD-1645945359161-771067236.png', 200000, 'Yogyakarta', 1, 'Can Prepayment', 'cash', 'Available', '2022-01-31 16:05:23', '2022-02-27 14:02:39'),
(34, 1, 'Ferrari 488 GTB', 'uploads/Ferrari-488-GTB-1645927361567-521345653.png', 200000, 'Bandung', 1, 'Can Prepayment', 'cash', 'Available', '2022-02-02 19:29:53', '2022-02-27 09:02:41'),
(35, 1, 'Chevrolet Spark', 'uploads/Chevrolet-Spark-1645945530910-759723949.png', 200000, 'Bandung', 1, 'Can Prepayment', 'cash', 'Available', '2022-02-02 19:32:16', '2022-02-27 14:05:30'),
(36, 1, 'Nissan Serena', 'uploads/Nissan_Serena-1645945714213-565497111.png', 250000, 'Bandung', 1, 'Can Prepayment', 'transfer', 'Available', '2022-02-02 19:35:55', '2022-02-28 23:21:32'),
(37, 1, 'Hyundai Grand I10', 'uploads/Hyundai-Grand-i10-1645948190216-536545681.png', 300000, 'Yogyakarta', 1, 'Can Prepayment', 'transfer', 'Available', '2022-02-02 19:57:44', '2022-02-28 23:21:26'),
(38, 1, 'Chery Tiggo 8 Pro', 'uploads/Chery-Tiggo-8-Pro-1645951700520-529224540.png', 200000, 'Bandung', 1, 'Can Prepayment', 'cash', 'Available', '2022-02-03 10:36:13', '2022-02-27 15:48:20'),
(39, 2, 'Honda Genio', 'uploads/Honda-Genio-1645930601268-124818531.png', 250000, 'Bandung', 1, 'Can Prepayment', 'transfer', 'Available', '2022-02-04 10:41:12', '2022-02-28 23:21:37'),
(40, 2, 'Yamaha NMax', 'uploads/Yamaha-Nmax-1645802458066-285144626.png', 200000, 'Bandung', 1, 'Can Prepayment', 'cash', 'Available', '2022-02-04 10:46:38', '2022-02-25 22:43:56'),
(41, 2, 'Viar Cross X 70 Mini Trail', 'uploads/Viar-Cross-X-70_Mini-Trail-1645930558489-96140840.png', 200000, 'Yogyakarta', 1, 'Can Prepayment', 'cash', 'Available', '2022-02-05 16:11:58', '2022-02-27 09:55:58'),
(42, 2, 'Gilera DNA 180', 'uploads/Gilera-DNA-180-1645928741348-430957491.png', 250000, 'Yogyakarta', 1, 'Can Prepayment', 'transfer', 'Available', '2022-02-05 16:12:21', '2022-02-28 23:21:44'),
(43, 2, 'Petronas Yamaha SRT', 'uploads/Petronas-Yamaha-SRT-1645928687000-905787836.png', 200000, 'Yogyakarta', 1, 'Can Prepayment', 'cash', 'Available', '2022-02-05 16:14:38', '2022-02-27 09:24:47'),
(44, 2, 'Harley Davidson Iron 1200', 'uploads/Harley-Davidson-Iron-1200-1645945928446-478437443.png', 150000, 'Yogyakarta', 1, 'Can Prepayment', 'cash', 'Available', '2022-02-09 08:54:49', '2022-02-27 14:12:08'),
(45, 2, 'Kaisar Ruby V250', 'uploads/Kaisar-Ruby-V250-1645954513605-68500514.png', 150000, 'Yogyakarta', 1, 'Can Prepayment', 'cash', 'Available', '2022-02-09 09:39:43', '2022-02-27 16:35:13'),
(47, 2, 'Viar Star NX', 'uploads/Viar-Star-NX-1645934415586-208217423.png', 150000, 'Yogyakarta', 1, 'Can Prepayment', 'cash', 'Available', '2022-02-09 12:50:02', '2022-02-27 11:00:15'),
(49, 2, 'Kymco Downtown 250i', 'uploads/Kymco-Downtown-250i-1645954443741-871878574.png', 200000, 'Bandung', 1, 'Can Prepayment', 'cash', 'Available', '2022-02-09 19:08:35', '2022-02-27 16:34:03'),
(50, 2, 'Yamaha Mio', 'uploads/Yamaha-Mio-1645968767219-279343803.png', 150000, 'Yogyakarta', 1, 'Can Prepayment', 'cash', 'Available', '2022-02-09 19:12:33', '2022-02-27 20:32:47'),
(51, 2, 'Viar Cross X 150', 'uploads/Viar-Cross-X-150-1644408778763-78770406-jpg', 150000, 'Yogyakarta', 1, 'Can Prepayment', 'cash', 'Available', '2022-02-09 19:12:58', NULL),
(52, 2, 'Viar Cross X 150', 'uploads/Viar-Cross-X-150-1644409001083-916811639-jpg', 150000, 'Yogyakarta', 1, 'Can Prepayment', 'cash', 'Available', '2022-02-09 19:16:41', NULL),
(53, 2, 'Petronas Yamaha SRT', 'uploads/Petronas-Yamaha-1644417238072-412644107-jpg', 200000, 'Yogyakarta', 1, 'Can Prepayment', 'cash', 'Available', '2022-02-09 19:18:04', '2022-02-09 21:33:58'),
(54, 2, 'Suzuki Satria F150', 'uploads/Suzuki-Satria-F150-1644546483961-304131263-jpg', 200000, 'Yogyakarta', 1, 'Can Prepayment', 'cash', 'Available', '2022-02-09 19:39:21', '2022-02-11 09:28:03'),
(55, 2, 'Suzuki Gixxer SF 250', 'uploads/Suzuki-Gixxer-SF-250-1644418633965-423914196-jpg', 150000, 'Yogyakarta', 1, 'Can Prepayment', 'cash', 'Available', '2022-02-09 21:57:13', NULL),
(56, 2, 'Benelli Patagonian Eagle', 'uploads/Benelli-Patagonian-Eagle-1644490137581-913404908-jpg', 150000, 'Yogyakarta', 1, 'Can Prepayment', 'cash', 'Available', '2022-02-10 17:48:57', NULL),
(57, 2, 'Kymco Like 150i', 'uploads/Kymco-Like-150i-1644558136144-319951699.jpg', 150000, 'Yogyakarta', 1, 'Can Prepayment', 'cash', 'Available', '2022-02-11 12:42:16', NULL),
(58, 2, 'KTM Duke 200', 'uploads/KTM-Duke-200-1644763893594-73278972.jpg', 150000, 'Bandung', 1, 'Can Prepayment', 'cash', 'Available', '2022-02-13 21:51:33', NULL),
(59, 2, 'Yamaha MIO M3 125 AKS SSS', 'uploads/Yamaha-MIO-M3-125-AKS-SSS-1644802153600-214374851.jpg', 150000, 'Bandung', 1, 'Can Prepayment', 'cash', 'Available', '2022-02-14 08:29:13', NULL),
(60, 2, 'Yamaha GEAR 125', 'uploads/Yamaha-GEAR-125-1644818205669-271067539.jpg', 150000, 'Bandung', 1, 'Can Prepayment', 'cash', 'Available', '2022-02-14 12:56:45', NULL),
(61, 2, 'Yamaha GEAR 125', 'uploads/Yamaha-GEAR-125-1644818878289-579448064.jpg', 150000, 'Bandung', 1, 'Can Prepayment', 'cash', 'Available', '2022-02-14 13:07:58', NULL),
(62, 2, 'Yamaha GEAR 125', 'uploads/Yamaha-GEAR-125-1644822666483-888302921.jpg', 150000, 'Bandung', 1, 'Can Prepayment', 'transfer', 'Available', '2022-02-14 14:11:06', '2022-02-28 23:22:04'),
(63, 2, 'Yamaha GEAR 125', NULL, 150000, 'Bandung', 1, 'Can Prepayment', 'transfer', 'Available', '2022-02-14 14:11:19', '2022-02-28 23:22:00'),
(64, 2, 'Yamaha GEAR 125', 'uploads/Yamaha-GEAR-125-1644823367310-384740597.jpg', 150000, 'Bandung', 1, 'Can Prepayment', 'cash', 'Available', '2022-02-14 14:22:47', NULL),
(65, 3, 'Element Troy x 10 Speed', 'uploads/Element-Troy-x-10-Speed-1645931790930-816319804.png', 100000, 'Bandung', 1, 'Can Prepayment', 'cash', 'Available', '2022-02-26 12:20:06', '2022-02-27 10:16:30'),
(66, 3, 'Polygon Monarch 5', 'uploads/Polygon-Monarch-5-1645931971132-495505297.png', 100000, 'Yogyakarta', 1, 'Can Prepayment', 'transfer', 'Available', '2022-02-26 12:21:47', '2022-03-07 12:51:24');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `forgot_request`
--
ALTER TABLE `forgot_request`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_user` (`id_user`);

--
-- Indeks untuk tabel `history`
--
ALTER TABLE `history`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_vehicles` (`id_vehicles`),
  ADD KEY `id_users` (`id_users`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `vehicles`
--
ALTER TABLE `vehicles`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_id` (`category_id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT untuk tabel `forgot_request`
--
ALTER TABLE `forgot_request`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT untuk tabel `history`
--
ALTER TABLE `history`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;

--
-- AUTO_INCREMENT untuk tabel `vehicles`
--
ALTER TABLE `vehicles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=67;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `forgot_request`
--
ALTER TABLE `forgot_request`
  ADD CONSTRAINT `forgot_request_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `history`
--
ALTER TABLE `history`
  ADD CONSTRAINT `history_ibfk_1` FOREIGN KEY (`id_vehicles`) REFERENCES `vehicles` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `history_ibfk_2` FOREIGN KEY (`id_users`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `vehicles`
--
ALTER TABLE `vehicles`
  ADD CONSTRAINT `vehicles_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
