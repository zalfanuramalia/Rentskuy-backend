-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 02 Feb 2022 pada 09.11
-- Versi server: 10.4.22-MariaDB
-- Versi PHP: 8.0.14

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
(5, 'Truck', '2022-02-02 12:12:07', NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `history`
--

CREATE TABLE `history` (
  `id` int(11) NOT NULL,
  `id_users` int(11) DEFAULT NULL,
  `id_vehicles` int(11) DEFAULT NULL,
  `date_rent` date NOT NULL DEFAULT current_timestamp(),
  `return` varchar(80) NOT NULL,
  `prepayment` int(80) NOT NULL,
  `new_arrival` varchar(80) NOT NULL,
  `createdAt` datetime DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `history`
--

INSERT INTO `history` (`id`, `id_users`, `id_vehicles`, `date_rent`, `return`, `prepayment`, `new_arrival`, `createdAt`, `updatedAt`) VALUES
(1, 2, 26, '2022-02-02', 'payment', 300000, 'new', '2022-02-02 12:38:17', NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(80) NOT NULL,
  `identity` varchar(10) NOT NULL,
  `gender` varchar(80) NOT NULL,
  `email` varchar(80) NOT NULL,
  `address` varchar(100) NOT NULL,
  `number` varchar(13) NOT NULL,
  `birthdate` varchar(80) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `name`, `identity`, `gender`, `email`, `address`, `number`, `birthdate`, `createdAt`, `updatedAt`) VALUES
(2, 'Meli', '12345688', 'Women', 'meli@gmail.com', 'Soeharto street number 1', '081234567890', '2 January 1987', '2022-02-02 11:07:47', NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `vehicles`
--

CREATE TABLE `vehicles` (
  `id` int(11) NOT NULL,
  `category_id` int(11) DEFAULT NULL,
  `merk` varchar(80) NOT NULL,
  `price` int(11) NOT NULL,
  `location` varchar(50) NOT NULL,
  `qty` int(10) NOT NULL,
  `can_prepayment` tinyint(4) NOT NULL,
  `isAvailable` tinyint(4) NOT NULL,
  `popularity` int(100) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `vehicles`
--

INSERT INTO `vehicles` (`id`, `category_id`, `merk`, `price`, `location`, `qty`, `can_prepayment`, `isAvailable`, `popularity`, `createdAt`, `updatedAt`) VALUES
(26, 1, 'Suzuki Ertiga', 350000, 'Yogyakarta', 1, 1, 1, 0, '2022-01-31 12:02:19', '2022-02-02 12:41:59'),
(27, 1, 'Mitsubishi', 250000, 'Yogyakarta', 3, 1, 1, 2, '2022-01-31 12:02:31', '2022-02-02 12:41:59'),
(28, 1, 'BMW', 250000, 'Yogyakarta', 1, 1, 1, 9, '2022-01-31 12:02:39', '2022-02-02 12:41:59'),
(29, 1, 'Suzuki Balemo', 250000, 'Yogyakarta', 1, 1, 1, 7, '2022-01-31 14:38:56', '2022-02-02 12:41:59'),
(30, 1, 'Ignis Suzuki', 200000, 'Yogyakarta', 2, 1, 1, 3, '2022-01-31 16:03:20', '2022-02-02 12:41:59'),
(31, 1, 'Honda', 200000, 'Yogyakarta', 2, 1, 1, 0, '2022-01-31 16:04:05', '2022-02-02 12:41:59'),
(32, 1, 'Mazda', 200000, 'Yogyakarta', 2, 1, 1, 0, '2022-01-31 16:04:35', '2022-02-02 12:41:59'),
(33, 1, 'Hino', 200000, 'Yogyakarta', 1, 1, 1, 0, '2022-01-31 16:05:23', '2022-02-02 12:41:59');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

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
-- AUTO_INCREMENT untuk tabel `history`
--
ALTER TABLE `history`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2147483648;

--
-- AUTO_INCREMENT untuk tabel `vehicles`
--
ALTER TABLE `vehicles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

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
