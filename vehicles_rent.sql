-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 11 Feb 2022 pada 09.45
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
(3, 33, '-50021', 1, '2022-02-11 15:40:13', NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `history`
--

CREATE TABLE `history` (
  `id` int(11) NOT NULL,
  `id_users` int(11) DEFAULT NULL,
  `id_vehicles` int(11) DEFAULT NULL,
  `start_rent` date NOT NULL DEFAULT current_timestamp(),
  `returned` enum('Yes','No') NOT NULL,
  `new_arrival` varchar(80) NOT NULL,
  `createdAt` datetime DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `history`
--

INSERT INTO `history` (`id`, `id_users`, `id_vehicles`, `start_rent`, `returned`, `new_arrival`, `createdAt`, `updatedAt`) VALUES
(3, 6, 34, '2021-12-30', 'Yes', 'new', '2021-12-30 00:00:00', '2022-02-05 20:25:20'),
(4, 2, 35, '2021-12-31', 'Yes', 'new', '2022-01-31 11:53:54', '2022-02-05 20:25:41'),
(5, 6, 30, '2022-01-01', 'Yes', 'old', '2022-01-01 11:54:26', '2022-02-05 20:26:04'),
(6, 5, 34, '2022-01-04', 'Yes', 'old', '2022-01-04 11:54:57', '2022-02-05 20:26:13'),
(7, 5, 29, '2022-01-12', 'Yes', 'new', '2022-01-12 14:15:09', '2022-02-11 07:47:45'),
(8, 2, 40, '2022-01-19', 'Yes', 'new', '2022-02-19 14:22:06', '2022-02-05 20:44:21'),
(9, 2, 40, '2022-01-25', 'Yes', 'new', '2022-01-25 22:28:24', '2022-02-05 20:26:57'),
(10, 6, 34, '2022-01-31', 'Yes', 'new', '2022-01-31 10:05:28', '2022-02-05 20:27:40'),
(11, 7, 32, '2022-02-01', 'Yes', 'new', '2022-02-01 15:12:53', '2022-02-05 20:27:48'),
(12, 10, 33, '2022-02-02', 'Yes', 'new', '2022-02-02 19:07:52', '2022-02-05 20:27:19'),
(13, 9, 28, '2022-02-02', 'Yes', 'new', '2022-02-02 19:10:09', '2022-02-05 20:27:55'),
(14, 6, 43, '2022-02-04', 'Yes', 'new', '2022-02-04 19:33:32', '2022-02-06 09:17:05'),
(15, 9, 42, '2022-02-05', 'Yes', 'new', '2022-02-05 19:33:48', '2022-02-06 09:17:13'),
(20, 3, 43, '2022-02-05', 'Yes', 'new', '2022-02-05 19:33:56', '2022-02-05 21:06:28'),
(21, 13, 34, '2022-02-05', 'No', 'new', '2022-02-05 20:32:03', '2022-02-05 20:32:31'),
(22, 12, 40, '2022-02-05', 'No', 'new', '2022-02-05 20:32:58', '2022-02-05 14:32:37'),
(23, 11, 42, '2022-02-05', 'Yes', 'new', '2022-02-05 21:07:20', '2022-02-05 21:07:55'),
(24, 11, 36, '2022-02-05', 'Yes', 'new', '2022-02-05 21:07:47', '2022-02-05 15:07:33'),
(25, 2, 42, '2022-02-05', 'Yes', 'new', '2022-02-05 21:08:25', '2022-02-05 15:08:14'),
(28, 8, 43, '2022-02-10', 'Yes', 'new', '2022-02-10 07:09:23', '2022-02-10 07:26:47'),
(29, 10, 44, '2022-02-10', 'No', 'new', '2022-02-10 07:09:50', NULL),
(30, 9, 47, '2022-02-10', 'No', 'new', '2022-02-10 07:13:22', NULL),
(31, 9, 47, '2022-02-11', 'No', 'new', '2022-02-11 07:22:16', NULL);

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
(33, 'Zalfa', '87654312', 'Women', 'zalfafanur@gmail.com', 'Mengkudu 41 street number 100', '082178641321', '1999-01-24', 'zalfa', '$2b$10$0/7P8QCwKAfLjD2T20riL.CedVDq2Ic6O2YfORWHGNdr2fgNtnM/G', '2022-02-11 12:06:26', '2022-02-11 15:41:27'),
(34, 'Salwa', '', 'Men', 'salwa@gmail.com', '', '', NULL, 'salwa', '$2b$10$OSGT0wLIGL.k0yawf5KVR.0Hp50WqJya8Qn2I7YRv9q4/Ge2Loud2', '2022-02-11 12:36:34', NULL),
(35, 'Saniyyah', '', 'Men', 'saniyyah@gmail.com', '', '', NULL, 'saniyyah', '$2b$10$KFTfoiAxNONvRKYP.IVAH.SoLXDQlMbTpCafKN4HNTIWDYoZQ8XmW', '2022-02-11 12:38:08', NULL);

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
  `can_prepayment` tinyint(4) NOT NULL,
  `isAvailable` tinyint(4) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `vehicles`
--

INSERT INTO `vehicles` (`id`, `category_id`, `brand`, `image`, `price`, `location`, `qty`, `can_prepayment`, `isAvailable`, `createdAt`, `updatedAt`) VALUES
(27, 1, 'Mitsubishi', NULL, 250000, 'Bandung', 3, 1, 1, '2022-01-31 12:02:31', '2022-02-11 07:33:25'),
(28, 1, 'BMW', NULL, 250000, 'Yogyakarta', 1, 1, 1, '2022-01-31 12:02:39', '2022-02-02 12:41:59'),
(29, 1, 'Suzuki Balemo', NULL, 250000, 'Bandung', 1, 1, 1, '2022-01-31 14:38:56', '2022-02-11 07:33:35'),
(30, 1, 'Ignis Suzuki', NULL, 200000, 'Yogyakarta', 2, 1, 1, '2022-01-31 16:03:20', '2022-02-02 12:41:59'),
(31, 1, 'Honda', NULL, 200000, 'Yogyakarta', 2, 1, 1, '2022-01-31 16:04:05', '2022-02-02 12:41:59'),
(32, 1, 'Mazda', NULL, 200000, 'Yogyakarta', 2, 1, 1, '2022-01-31 16:04:35', '2022-02-02 12:41:59'),
(33, 1, 'Hino', NULL, 200000, 'Yogyakarta', 1, 1, 1, '2022-01-31 16:05:23', '2022-02-02 12:41:59'),
(34, 1, 'Ferrari', NULL, 200000, 'Yogyakarta', 1, 1, 1, '2022-02-02 19:29:53', '2022-02-02 19:30:51'),
(35, 1, 'Chevrolet', NULL, 200000, 'Yogyakarta', 1, 1, 1, '2022-02-02 19:32:16', '2022-02-02 19:36:17'),
(36, 1, 'Nissan', NULL, 200000, 'Yogyakarta', 2, 1, 1, '2022-02-02 19:35:55', '2022-02-02 19:36:46'),
(37, 1, 'Hyundai', NULL, 300000, 'Yogyakarta', 1, 1, 1, '2022-02-02 19:57:44', '2022-02-02 13:56:40'),
(38, 1, 'Chery', NULL, 200000, 'Yogyakarta', 1, 1, 1, '2022-02-03 10:36:13', NULL),
(39, 2, 'Honda Genio', NULL, 250000, 'Bandung', 1, 1, 1, '2022-02-04 10:41:12', '2022-02-11 07:33:42'),
(40, 2, 'Yamaha Nmax', NULL, 250000, 'Yogyakarta', 1, 1, 1, '2022-02-04 10:46:38', '2022-02-04 20:50:40'),
(41, 2, 'Viar', NULL, 200000, 'Yogyakarta', 1, 1, 1, '2022-02-05 16:11:58', NULL),
(42, 2, 'Gilera', NULL, 200000, 'Yogyakarta', 1, 1, 1, '2022-02-05 16:12:21', '2022-02-05 16:17:43'),
(43, 2, 'Petronas Yamaha SRT', 'uploads/Petronas-Yamaha-1644418219223-192454176-jpg', 200000, 'Yogyakarta', 1, 1, 1, '2022-02-05 16:14:38', '2022-02-09 21:50:19'),
(44, 2, 'Harley Davidson Iron 1200', 'uploads/Harley-Davidson-Iron1200-1644371689638-334446882.jpg', 150000, 'Yogyakarta', 1, 1, 1, '2022-02-09 08:54:49', '2022-02-09 09:35:37'),
(45, 2, 'Kaisar Ruby V250', 'uploads/Kaisar-Ruby-V250-1644374383719-391880077.jpg', 150000, 'Yogyakarta', 1, 1, 1, '2022-02-09 09:39:43', NULL),
(47, 2, 'Viar Star NX', 'uploads/Viar-Star-NX-1644385802396-550870182.jpg', 150000, 'Yogyakarta', 1, 1, 1, '2022-02-09 12:50:02', NULL),
(49, 2, 'Kymco Downtown 250i', 'uploads/Kymco-Downtown-250i-1644554202754-419776006.jpg', 200000, 'Yogyakarta', 1, 1, 1, '2022-02-09 19:08:35', '2022-02-11 11:36:42'),
(50, 2, 'Viar Cross X 150', NULL, 200000, 'Yogyakarta', 1, 1, 1, '2022-02-09 19:12:33', '2022-02-11 12:47:24'),
(51, 2, 'Viar Cross X 150', 'uploads/Viar-Cross-X-150-1644408778763-78770406-jpg', 150000, 'Yogyakarta', 1, 1, 1, '2022-02-09 19:12:58', NULL),
(52, 2, 'Viar Cross X 150', 'uploads/Viar-Cross-X-150-1644409001083-916811639-jpg', 150000, 'Yogyakarta', 1, 1, 1, '2022-02-09 19:16:41', NULL),
(53, 2, 'Petronas Yamaha SRT', 'uploads/Petronas-Yamaha-1644417238072-412644107-jpg', 200000, 'Yogyakarta', 1, 1, 1, '2022-02-09 19:18:04', '2022-02-09 21:33:58'),
(54, 2, 'Suzuki Satria F150', 'uploads/Suzuki-Satria-F150-1644546483961-304131263-jpg', 200000, 'Yogyakarta', 1, 1, 1, '2022-02-09 19:39:21', '2022-02-11 09:28:03'),
(55, 2, 'Suzuki Gixxer SF 250', 'uploads/Suzuki-Gixxer-SF-250-1644418633965-423914196-jpg', 150000, 'Yogyakarta', 1, 1, 1, '2022-02-09 21:57:13', NULL),
(56, 2, 'Benelli Patagonian Eagle', 'uploads/Benelli-Patagonian-Eagle-1644490137581-913404908-jpg', 150000, 'Yogyakarta', 1, 1, 1, '2022-02-10 17:48:57', NULL),
(57, 2, 'Kymco Like 150i', 'uploads/Kymco-Like-150i-1644558136144-319951699.jpg', 150000, 'Yogyakarta', 1, 1, 1, '2022-02-11 12:42:16', NULL);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT untuk tabel `history`
--
ALTER TABLE `history`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT untuk tabel `vehicles`
--
ALTER TABLE `vehicles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

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
