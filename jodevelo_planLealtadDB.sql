-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jul 03, 2017 at 05:32 AM
-- Server version: 10.1.21-MariaDB
-- PHP Version: 5.6.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `jodevelo_planLealtad`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_articulos`
--

CREATE TABLE `tbl_articulos` (
  `art_id` int(11) NOT NULL,
  `art_fac_id` int(11) NOT NULL,
  `art_sku` varchar(50) NOT NULL,
  `art_cant` int(11) NOT NULL,
  `art_preciouni` double(12,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_articulos`
--

INSERT INTO `tbl_articulos` (`art_id`, `art_fac_id`, `art_sku`, `art_cant`, `art_preciouni`) VALUES
(1, 78901, 'GHKFJRU7898', 1, 14500.00),
(2, 78901, 'GHKFJRU7899', 1, 12500.00),
(3, 78901, 'GHKFJRU7900', 2, 10000.00),
(4, 78901, 'GHKFJRU7901', 1, 22000.00),
(5, 78902, 'GHKFJRU7898', 1, 14500.00),
(6, 78102, 'GHKFJRU1235', 8, 1600.00),
(7, 78903, 'GHKFJRU7589', 3, 8300.00),
(8, 78904, 'GHKFJRU0098', 1, 47900.00),
(9, 78905, 'GHKFJRU0897', 2, 14600.00),
(10, 78906, 'GHKFJRU0897', 1, 14600.00);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_clientes`
--

CREATE TABLE `tbl_clientes` (
  `cli_id` varchar(20) NOT NULL,
  `cli_nombre` varchar(20) NOT NULL,
  `cli_apellido` varchar(20) NOT NULL,
  `cli_telefono` varchar(20) NOT NULL,
  `cli_fechanac` date NOT NULL,
  `cli_fechareg` date DEFAULT NULL,
  `cli_estado` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_clientes`
--

INSERT INTO `tbl_clientes` (`cli_id`, `cli_nombre`, `cli_apellido`, `cli_telefono`, `cli_fechanac`, `cli_fechareg`, `cli_estado`) VALUES
('109288356', 'Xinia', 'Porras', '88702359', '1969-04-02', '2017-07-03', 1),
('114350445', 'Jose Manuel', 'Badilla Porras', '87063990', '1990-07-04', '2017-07-03', 1),
('207893456', 'Silvia', 'Obando', '89056789', '1986-04-17', '2017-07-03', 1),
('305670145', 'Eduardo', 'Mendez', '67452378', '1983-11-25', '2017-07-03', 1);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_facturas`
--

CREATE TABLE `tbl_facturas` (
  `fac_id` int(11) NOT NULL,
  `fac_cli_id` varchar(20) NOT NULL,
  `fac_fechacompra` date DEFAULT NULL,
  `fac_moneda` varchar(20) NOT NULL,
  `fac_puntosredim` double(12,2) NOT NULL,
  `fac_total` double(12,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_facturas`
--

INSERT INTO `tbl_facturas` (`fac_id`, `fac_cli_id`, `fac_fechacompra`, `fac_moneda`, `fac_puntosredim`, `fac_total`) VALUES
(78102, '109288356', '2016-02-25', 'Colones', 0.00, 12800.00),
(78901, '114350445', '2017-07-02', 'Colones', 0.00, 69000.00),
(78902, '114350445', '2017-07-02', 'Colones', -5000.00, 14500.00),
(78903, '109288356', '2017-06-29', 'Colones', 0.00, 24900.00),
(78904, '207893456', '2017-07-01', 'Colones', 0.00, 47900.00),
(78905, '305670145', '2017-07-01', 'Colones', 0.00, 29200.00),
(78906, '305670145', '2017-07-01', 'Colones', -1000.00, 14600.00);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_puntos`
--

CREATE TABLE `tbl_puntos` (
  `pun_id` int(11) NOT NULL,
  `pun_fac_id` int(11) NOT NULL,
  `pun_totalpun` double(12,2) NOT NULL,
  `pun_tipo` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_puntos`
--

INSERT INTO `tbl_puntos` (`pun_id`, `pun_fac_id`, `pun_totalpun`, `pun_tipo`) VALUES
(1, 78901, 6900.00, 'Suma'),
(2, 78902, -5000.00, 'Resta'),
(3, 78902, 950.00, 'Suma'),
(4, 78102, 1280.00, 'Suma'),
(5, 78903, 2490.00, 'Suma'),
(6, 78904, 4790.00, 'Suma'),
(7, 78905, 2920.00, 'Suma'),
(8, 78906, -1000.00, 'Resta'),
(9, 78906, 1360.00, 'Suma');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_articulos`
--
ALTER TABLE `tbl_articulos`
  ADD PRIMARY KEY (`art_id`),
  ADD KEY `art_fac_id` (`art_fac_id`);

--
-- Indexes for table `tbl_clientes`
--
ALTER TABLE `tbl_clientes`
  ADD PRIMARY KEY (`cli_id`);

--
-- Indexes for table `tbl_facturas`
--
ALTER TABLE `tbl_facturas`
  ADD PRIMARY KEY (`fac_id`),
  ADD KEY `fac_cli_id` (`fac_cli_id`);

--
-- Indexes for table `tbl_puntos`
--
ALTER TABLE `tbl_puntos`
  ADD PRIMARY KEY (`pun_id`),
  ADD KEY `pun_fac_id` (`pun_fac_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_articulos`
--
ALTER TABLE `tbl_articulos`
  MODIFY `art_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT for table `tbl_puntos`
--
ALTER TABLE `tbl_puntos`
  MODIFY `pun_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `tbl_articulos`
--
ALTER TABLE `tbl_articulos`
  ADD CONSTRAINT `tbl_articulos_ibfk_1` FOREIGN KEY (`art_fac_id`) REFERENCES `tbl_facturas` (`fac_id`);

--
-- Constraints for table `tbl_facturas`
--
ALTER TABLE `tbl_facturas`
  ADD CONSTRAINT `tbl_facturas_ibfk_1` FOREIGN KEY (`fac_cli_id`) REFERENCES `tbl_clientes` (`cli_id`);

--
-- Constraints for table `tbl_puntos`
--
ALTER TABLE `tbl_puntos`
  ADD CONSTRAINT `tbl_puntos_ibfk_1` FOREIGN KEY (`pun_fac_id`) REFERENCES `tbl_facturas` (`fac_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
