-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:33065
-- Tiempo de generación: 16-06-2025 a las 23:24:31
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `luxdata`
--
CREATE DATABASE IF NOT EXISTS `luxdata` DEFAULT CHARACTER SET utf8 COLLATE utf8_spanish2_ci;
USE `luxdata`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `auditoria`
--

CREATE TABLE `auditoria` (
  `id` int(11) NOT NULL,
  `time` timestamp NOT NULL DEFAULT current_timestamp(),
  `user` int(5) NOT NULL,
  `action` varchar(20) NOT NULL,
  `tabla` varchar(20) NOT NULL,
  `text` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `auditoria`
--

INSERT INTO `auditoria` (`id`, `time`, `user`, `action`, `tabla`, `text`) VALUES
(1, '2025-06-06 02:56:34', 0, 'UPDATE', 'Estancia', 'La estancia con id: 19 se le realizo un check-in'),
(2, '2025-06-06 02:58:22', 0, 'UPDATE', 'Estancia', 'La estancia con id: 9 se le realizo un check-in'),
(3, '2025-06-06 12:10:54', 0, 'INSERT', 'Cliente', 'Insertado cliente: 24 como acompañante de estancia: 8'),
(4, '2025-06-06 12:10:54', 0, 'UPDATE', 'Estancia', 'La estancia con id: 8 se le realizo un check-in'),
(5, '2025-06-06 14:09:15', 0, 'INSERT', 'Cliente', 'Insertado cliente: 25 como acompañante de estancia: 4'),
(6, '2025-06-06 14:09:15', 0, 'UPDATE', 'Estancia', 'La estancia con id: 4 se le realizo un check-in'),
(7, '2025-06-12 14:50:32', 0, 'INSERT', 'Pagos', 'ID pago: 20 creada'),
(8, '2025-06-12 14:50:32', 0, 'INSERT', 'Estancia', 'ID Estancia: 20 creada'),
(9, '2025-06-12 14:50:32', 0, 'INSERT', 'Pagos_x_estacia', 'ID Estancia: 20 asociada al ID Pago: 20'),
(10, '2025-06-12 14:50:32', 0, 'INSERT', 'HabitacionxEstancia', 'ID Estancia: 20 asociada a la ID Habitacion: 102'),
(11, '2025-06-12 14:51:53', 0, 'UPDATE', 'Estancia', 'ID estancia: 1 CheckOut realizado'),
(12, '2025-06-12 14:54:07', 0, 'UPDATE', 'Pagos', 'ID Pago: REF-5824691 validado'),
(13, '2025-06-12 15:06:34', 0, 'INSERT', 'Pagos', 'ID pago: 21 creada'),
(14, '2025-06-12 15:06:34', 0, 'INSERT', 'Estancia', 'ID Estancia: 21 creada'),
(15, '2025-06-12 15:06:34', 0, 'INSERT', 'Pagos_x_estacia', 'ID Estancia: 21 asociada al ID Pago: 21'),
(16, '2025-06-12 15:06:34', 0, 'INSERT', 'Pagos', 'ID pago: 22 creada'),
(17, '2025-06-12 15:06:34', 0, 'INSERT', 'Estancia', 'ID Estancia: 22 creada'),
(18, '2025-06-12 15:06:34', 0, 'INSERT', 'HabitacionxEstancia', 'ID Estancia: 21 asociada a la ID Habitacion: 301'),
(19, '2025-06-12 15:06:34', 0, 'INSERT', 'Pagos_x_estacia', 'ID Estancia: 22 asociada al ID Pago: 22'),
(20, '2025-06-12 15:06:34', 0, 'INSERT', 'HabitacionxEstancia', 'ID Estancia: 22 asociada a la ID Habitacion: 301'),
(21, '2025-06-12 15:43:54', 0, 'UPDATE', 'Pagos', 'ID Pago: 2372636 validado'),
(22, '2025-06-12 15:43:57', 0, 'UPDATE', 'Pagos', 'ID Pago: 2372636 validado'),
(23, '2025-06-12 15:44:03', 0, 'UPDATE', 'Pagos', 'ID Pago: 012312 validado'),
(24, '2025-06-12 15:44:04', 0, 'UPDATE', 'Pagos', 'ID Pago: 012312 validado'),
(25, '2025-06-12 15:44:04', 0, 'UPDATE', 'Pagos', 'ID Pago: 012312 validado'),
(26, '2025-06-12 15:44:05', 0, 'UPDATE', 'Pagos', 'ID Pago: 012312 validado'),
(27, '2025-06-12 15:49:52', 0, 'INSERT', 'Pagos', 'ID pago: 23 creada'),
(28, '2025-06-12 15:49:52', 0, 'INSERT', 'Estancia', 'ID Estancia: 23 creada'),
(29, '2025-06-12 15:49:52', 0, 'INSERT', 'Pagos_x_estacia', 'ID Estancia: 23 asociada al ID Pago: 23'),
(30, '2025-06-12 15:49:52', 0, 'INSERT', 'HabitacionxEstancia', 'ID Estancia: 23 asociada a la ID Habitacion: 301'),
(31, '2025-06-12 15:49:54', 0, 'INSERT', 'Pagos', 'ID pago: 24 creada'),
(32, '2025-06-12 15:49:54', 0, 'INSERT', 'Estancia', 'ID Estancia: 24 creada'),
(33, '2025-06-12 15:49:54', 0, 'INSERT', 'Pagos_x_estacia', 'ID Estancia: 24 asociada al ID Pago: 24'),
(34, '2025-06-12 15:49:54', 0, 'INSERT', 'HabitacionxEstancia', 'ID Estancia: 24 asociada a la ID Habitacion: 301'),
(35, '2025-06-12 15:50:55', 0, 'UPDATE', 'Pagos', 'ID Pago: 22222222 validado'),
(36, '2025-06-12 15:50:58', 0, 'UPDATE', 'Pagos', 'ID Pago: 22222222 validado'),
(37, '2025-06-15 19:17:30', 0, 'UPDATE', 'Estancia', 'ID estancia: 24 CheckIn realizado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--

CREATE TABLE `clientes` (
  `id` int(5) NOT NULL,
  `nombre` varchar(60) NOT NULL,
  `tipoDocumento` varchar(1) NOT NULL,
  `documento` varchar(30) NOT NULL,
  `fechaNac` date DEFAULT NULL,
  `localidad` varchar(120) NOT NULL,
  `genero` varchar(1) NOT NULL,
  `telefono` varchar(30) DEFAULT NULL,
  `correo` varchar(60) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `clientes`
--

INSERT INTO `clientes` (`id`, `nombre`, `tipoDocumento`, `documento`, `fechaNac`, `localidad`, `genero`, `telefono`, `correo`) VALUES
(1, 'María González', 'V', '12345678', '1985-07-15', 'Miranda', 'F', '0412-9876543', 'maria.gonzalez@example.com'),
(2, 'Carlos Pérez', 'E', '98765432', '1990-03-22', 'Zulia', 'M', '0416-5554433', 'carlos.perez@example.com'),
(3, 'Andrea Smith', 'V', '45678912', '1988-11-30', 'Apure', 'F', '0424-1239876', 'andrea.smith@example.com'),
(4, 'Roberto Medina', 'V', '78912345', '1975-09-12', 'Lara', 'M', '0426-3692581', 'roberto.medina@example.com'),
(5, 'Luisa Rodríguez', 'V', '25896314', '1992-04-18', 'Mérida', 'F', '0412-7531598', 'luisa.rdz@example.com'),
(6, 'Jorge Silva', 'E', '14785236', '1987-08-25', 'Anzoátegui', 'M', '0416-8426753', 'jorge.silva@example.com'),
(7, 'Valentina Morán', 'V', '36914785', '1998-01-30', 'Anzoátegui', 'F', '0424-9517532', 'valentina.m@example.com'),
(8, 'Daniel Suárez', 'V', '75315982', '1980-11-12', 'Táchira', 'M', '0414-2684135', 'daniel.suarez@example.com'),
(9, 'Camila Rojas', 'E', '95135782', '1995-06-07', 'Anzoátegui', 'F', '0426-4862731', 'camila.rojas@example.com'),
(10, 'Diego Luna', 'E', '42355788', '1989-07-09', 'Apure', 'M', '0412-11223344', 'diegolunatic@gmail.com'),
(11, 'Luis Vargas', 'E', '26841357', '1984-10-15', 'Amazonas', 'M', '0416-3751862', 'luis.vargas@example.com'),
(12, 'Andrés Castillo', 'V', '48135792', '1989-12-05', 'Cojedes', 'M', '0414-5926813', 'andres.c@example.com'),
(13, 'Patricia López', 'V', '72468135', '1986-02-14', 'Aragua', 'F', '0416-1357924', 'patricia.lopez@example.com'),
(14, 'Diana Ramírez', 'V', '94681357', '1983-04-17', 'Zulia', 'F', '0414-3579246', 'diana.ramirez@example.com'),
(15, 'Fernando Castro', 'V', '15792468', '1998-09-08', 'Barinas', 'M', '0426-4681357', 'fernando.c@example.com'),
(16, 'Adalides', 'V', '26376323', '1999-09-29', 'Bolívar', 'F', '4249163070', 'carlos@monkey.com'),
(17, 'Eban', '', '23232355', '1999-06-05', 'Nueva Esparta', 'M', '25356823', 'money@gmail.com'),
(18, 'Hoy ', '', '2827373', '1999-06-05', 'Bolívar', 'M', '32273232', 'catst@gmail.com'),
(19, 'Bencema', 'V', '11726332', NULL, 'Nueva Esparta', 'M', NULL, NULL),
(20, 'Brasso Ramirez', 'V', '7834654', NULL, 'Amazonas', 'M', NULL, NULL),
(21, 'Selena Garcia', 'E', '14631761', NULL, 'Falcón', 'F', NULL, NULL),
(22, 'Brasso Ramirez', 'V', '7834654', NULL, 'Amazonas', 'M', NULL, NULL),
(23, 'Selena Garcia', 'E', '14631761', NULL, 'Falcón', 'F', NULL, NULL),
(24, 'Carlos Auditoria ', 'V', '6264723', NULL, 'Sucre', 'M', NULL, NULL),
(25, 'Moises', 'V', '30656844', NULL, 'Nueva Esparta', 'M', NULL, NULL),
(26, 'Brayan', '', '30648699', '2003-10-01', 'Bolívar', 'M', '4249641361', 'brayanc@gmi.com'),
(27, 'Albin', 'V', '12140792', '1975-11-08', 'Bolívar', 'F', '42498473', 'cadt@gmail.com'),
(28, 'erika zambrano', 'V', '14222761', '2020-12-12', 'Bolívar', 'F', '42498473', 'cadt@gmail.com');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estadoreserva`
--

CREATE TABLE `estadoreserva` (
  `id` int(11) NOT NULL,
  `estado` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `estadoreserva`
--

INSERT INTO `estadoreserva` (`id`, `estado`) VALUES
(1, 'Reserva Online'),
(2, 'Reserva recepcion'),
(3, 'No reservada');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estancia`
--

CREATE TABLE `estancia` (
  `id` int(5) NOT NULL,
  `reservanteId` int(11) NOT NULL,
  `fechaCreacion` date NOT NULL DEFAULT current_timestamp(),
  `fechaReservaIn` date NOT NULL,
  `fechaReservaOut` date NOT NULL,
  `checkIn` datetime DEFAULT NULL,
  `checkOut` datetime DEFAULT NULL,
  `nroOcupantes` int(11) NOT NULL,
  `estadoReservaId` int(11) NOT NULL,
  `cancelado` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `estancia`
--

INSERT INTO `estancia` (`id`, `reservanteId`, `fechaCreacion`, `fechaReservaIn`, `fechaReservaOut`, `checkIn`, `checkOut`, `nroOcupantes`, `estadoReservaId`, `cancelado`) VALUES
(1, 1, '2025-06-05', '2025-06-10', '2025-06-12', '2025-06-05 21:18:23', '2025-06-12 10:51:53', 1, 1, 0),
(2, 2, '2025-06-05', '2025-06-05', '2025-06-18', '2025-06-05 12:01:12', '2025-06-05 12:13:51', 1, 1, 0),
(3, 3, '2025-06-05', '2025-06-20', '2025-06-25', '2025-06-05 20:41:27', NULL, 1, 1, 0),
(4, 4, '2025-06-05', '2025-06-28', '2025-07-02', '2025-06-06 10:09:15', NULL, 2, 1, 0),
(5, 5, '2025-06-05', '2025-06-12', '2025-06-14', '2025-06-05 22:43:50', NULL, 1, 1, 0),
(6, 6, '2025-06-05', '2025-06-20', '2025-06-23', '2025-06-05 20:35:39', NULL, 2, 1, 0),
(7, 7, '2025-06-05', '2025-06-08', '2025-06-09', '2025-06-05 12:13:42', NULL, 1, 1, 0),
(8, 8, '2025-06-05', '2025-06-25', '2025-06-28', '2025-06-06 08:10:54', NULL, 2, 1, 0),
(9, 9, '2025-06-05', '2025-06-15', '2025-06-18', '2025-06-05 22:58:22', NULL, 1, 1, 0),
(10, 10, '2025-06-05', '2025-06-04', '2025-06-15', NULL, NULL, 4, 1, 0),
(11, 11, '2025-06-05', '2025-06-19', '2025-06-22', NULL, NULL, 3, 1, 0),
(12, 12, '2025-06-05', '2025-06-25', '2025-06-28', NULL, NULL, 2, 1, 0),
(13, 13, '2025-06-05', '2025-06-05', '2025-06-18', '2025-06-05 10:27:29', '2025-06-05 10:56:58', 1, 1, 0),
(15, 14, '2025-06-05', '2025-06-12', '2025-06-15', NULL, NULL, 3, 1, 0),
(16, 15, '2025-06-05', '2025-05-05', '2025-05-19', NULL, NULL, 4, 1, 0),
(17, 16, '2025-06-05', '2025-06-05', '2025-06-07', '2025-06-05 12:03:02', '2025-06-05 12:15:18', 1, 1, 0),
(18, 17, '2025-06-05', '2025-09-05', '2025-09-13', NULL, NULL, 1, 1, 0),
(19, 18, '2025-06-05', '2025-06-05', '2025-06-07', '2025-06-05 22:56:34', NULL, 1, 1, 0),
(20, 26, '2025-06-12', '2025-06-12', '2025-06-13', NULL, NULL, 1, 1, 0),
(21, 27, '2025-06-12', '2025-06-13', '2025-06-14', NULL, NULL, 1, 1, 0),
(22, 27, '2025-06-12', '2025-06-13', '2025-06-14', NULL, NULL, 1, 1, 0),
(23, 28, '2025-06-12', '2025-06-12', '2025-06-13', '2025-06-15 15:14:27', NULL, 1, 1, 0),
(24, 28, '2025-06-12', '2025-06-12', '2025-06-13', '2025-06-15 15:17:30', NULL, 1, 1, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `habitacion`
--

CREATE TABLE `habitacion` (
  `id` int(5) NOT NULL,
  `tipoId` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `habitacion`
--

INSERT INTO `habitacion` (`id`, `tipoId`) VALUES
(101, 1),
(102, 1),
(103, 1),
(104, 1),
(105, 1),
(106, 1),
(107, 1),
(108, 1),
(109, 1),
(110, 1),
(201, 2),
(202, 2),
(203, 2),
(204, 2),
(205, 2),
(206, 2),
(207, 2),
(208, 2),
(209, 2),
(210, 2),
(301, 3),
(302, 3),
(303, 3),
(304, 3),
(305, 3),
(401, 4),
(501, 5),
(502, 5),
(503, 5),
(504, 5),
(505, 5),
(601, 6),
(602, 6),
(603, 6),
(604, 6),
(605, 6);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `habitaciones_x_estancia`
--

CREATE TABLE `habitaciones_x_estancia` (
  `estanciaId` int(11) NOT NULL,
  `habitacionId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `habitaciones_x_estancia`
--

INSERT INTO `habitaciones_x_estancia` (`estanciaId`, `habitacionId`) VALUES
(1, 101),
(2, 201),
(2, 101),
(3, 301),
(4, 101),
(4, 201),
(5, 202),
(6, 101),
(6, 102),
(7, 301),
(8, 201),
(9, 101),
(10, 201),
(10, 601),
(11, 101),
(11, 102),
(11, 401),
(12, 501),
(13, 401),
(15, 102),
(15, 103),
(16, 201),
(16, 601),
(17, 102),
(18, 601),
(19, 301),
(20, 102),
(21, 301),
(22, 301),
(23, 301),
(24, 301);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ocupantes_x_estancia`
--

CREATE TABLE `ocupantes_x_estancia` (
  `estanciaId` int(11) NOT NULL,
  `clienteId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pagos`
--

CREATE TABLE `pagos` (
  `id` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `monto` int(20) NOT NULL,
  `referencia` varchar(30) NOT NULL,
  `fechaCreacion` timestamp NOT NULL DEFAULT current_timestamp(),
  `validado` int(5) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `pagos`
--

INSERT INTO `pagos` (`id`, `fecha`, `monto`, `referencia`, `fechaCreacion`, `validado`) VALUES
(1, '2025-06-05', 1200, 'REF-4587123', '2025-06-05 06:32:48', 1),
(2, '2025-06-05', 2500, 'REF-7896541', '2025-06-05 06:33:36', 1),
(3, '2025-06-05', 3200, 'REF-3216549', '2025-06-05 06:33:52', 1),
(4, '2025-06-05', 1800, 'REF-9638527', '2025-06-05 06:34:02', 1),
(5, '2025-06-05', 980, 'REF-5824691', '2025-06-05 06:34:36', 1),
(6, '2025-06-05', 2750, 'REF-3571598', '2025-06-05 06:34:45', NULL),
(7, '2025-06-05', 650, 'REF-8642135', '2025-06-05 06:35:55', 1),
(8, '2025-06-05', 1890, 'REF-9426873', '2025-06-05 06:36:05', NULL),
(9, '2025-06-05', 1320, 'REF-6248135', '2025-06-05 06:37:09', NULL),
(10, '2025-06-04', 268840, 'REF-775521', '2025-06-05 09:41:18', NULL),
(11, '2025-06-05', 2850, 'REF-2684135', '2025-06-05 09:46:12', NULL),
(12, '2025-06-05', 3800, 'REF-4813579', '2025-06-05 09:46:54', NULL),
(13, '2025-06-05', 1100, 'REF-7246813', '2025-06-05 09:47:36', NULL),
(14, '2025-06-05', 3150, 'REF-9468135', '2025-06-05 09:51:07', NULL),
(15, '2025-06-05', 3150, 'REF-9468135', '2025-06-05 09:52:00', NULL),
(16, '2025-06-05', 8200, 'REF-1579246', '2025-06-05 09:54:15', NULL),
(17, '2025-06-05', 7520, '7456464', '2025-06-05 14:51:54', NULL),
(18, '2025-06-05', 20000, '3737474', '2025-06-05 19:32:11', NULL),
(19, '2025-06-05', 99999, '1234565', '2025-06-05 19:33:39', 1),
(20, '2025-06-12', 30000, '012312', '2025-06-12 14:50:32', 1),
(21, '2025-06-12', 11280, '2372636', '2025-06-12 15:06:34', 1),
(22, '2025-06-12', 11280, '2372636', '2025-06-12 15:06:34', 1),
(23, '2025-06-12', 11280, '22222222', '2025-06-12 15:49:52', 1),
(24, '2025-06-12', 11280, '22222222', '2025-06-12 15:49:54', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pagosxestancia`
--

CREATE TABLE `pagosxestancia` (
  `idEstancia` int(5) NOT NULL,
  `idPago` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `pagosxestancia`
--

INSERT INTO `pagosxestancia` (`idEstancia`, `idPago`) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5),
(6, 6),
(7, 7),
(8, 8),
(9, 9),
(10, 10),
(11, 11),
(12, 12),
(13, 13),
(15, 15),
(16, 16),
(17, 17),
(18, 18),
(19, 19),
(20, 20),
(21, 21),
(22, 22),
(23, 23),
(24, 24);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol`
--

CREATE TABLE `rol` (
  `id` int(5) NOT NULL,
  `rolNombre` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `rol`
--

INSERT INTO `rol` (`id`, `rolNombre`) VALUES
(1, 'Gerente'),
(2, 'Recepcionista'),
(3, 'Estadista');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_habitacion`
--

CREATE TABLE `tipo_habitacion` (
  `id` int(2) NOT NULL,
  `tipoNombre` varchar(30) NOT NULL,
  `tipoCamas` varchar(40) NOT NULL,
  `minPersonas` int(2) NOT NULL,
  `maxPersonas` int(2) NOT NULL,
  `precio` int(5) NOT NULL,
  `img` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `tipo_habitacion`
--

INSERT INTO `tipo_habitacion` (`id`, `tipoNombre`, `tipoCamas`, `minPersonas`, `maxPersonas`, `precio`, `img`) VALUES
(1, 'Standard King', '1 Cama King', 1, 2, 80, 'img/room-1.jpg'),
(2, 'Standard Double', '2 Camas Queen', 1, 4, 80, 'img/room-2.jpg'),
(3, 'Suite Ejecutiva', '1 Cama King', 1, 2, 120, 'img/room-3.jpg'),
(4, 'Suite Presidencial', '1 Cama King', 1, 2, 200, 'img/room-4.jpg'),
(5, 'Standard Familiar', '2 Camas individual y 1 Cama King', 3, 4, 100, 'img/room-5.jpg'),
(6, 'Suite Empresarial', '4 Camas Queen', 2, 4, 180, 'img/room-6.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user`
--

CREATE TABLE `user` (
  `id` int(5) NOT NULL,
  `username` varchar(60) NOT NULL,
  `password` varchar(256) NOT NULL,
  `email` varchar(60) NOT NULL,
  `rol` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `user`
--

INSERT INTO `user` (`id`, `username`, `password`, `email`, `rol`) VALUES
(1, 'Carlos Volweides', 'carlos@123.com', 'carlos@123.com', 1),
(2, 'admin', '1234', 'pepito@123.com', 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `auditoria`
--
ALTER TABLE `auditoria`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `estadoreserva`
--
ALTER TABLE `estadoreserva`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `estancia`
--
ALTER TABLE `estancia`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_estado_reserva` (`estadoReservaId`),
  ADD KEY `id_reservante` (`reservanteId`);

--
-- Indices de la tabla `habitacion`
--
ALTER TABLE `habitacion`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tipo_id` (`tipoId`);

--
-- Indices de la tabla `habitaciones_x_estancia`
--
ALTER TABLE `habitaciones_x_estancia`
  ADD KEY `estanciaId` (`estanciaId`),
  ADD KEY `habitacionId` (`habitacionId`);

--
-- Indices de la tabla `ocupantes_x_estancia`
--
ALTER TABLE `ocupantes_x_estancia`
  ADD KEY `id_estancia` (`estanciaId`),
  ADD KEY `id_cliente` (`clienteId`);

--
-- Indices de la tabla `pagos`
--
ALTER TABLE `pagos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `pagosxestancia`
--
ALTER TABLE `pagosxestancia`
  ADD KEY `idEstancia` (`idEstancia`),
  ADD KEY `idPago` (`idPago`);

--
-- Indices de la tabla `rol`
--
ALTER TABLE `rol`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `tipo_habitacion`
--
ALTER TABLE `tipo_habitacion`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD KEY `rol` (`rol`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `auditoria`
--
ALTER TABLE `auditoria`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT de la tabla `clientes`
--
ALTER TABLE `clientes`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT de la tabla `estadoreserva`
--
ALTER TABLE `estadoreserva`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `estancia`
--
ALTER TABLE `estancia`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT de la tabla `pagos`
--
ALTER TABLE `pagos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT de la tabla `rol`
--
ALTER TABLE `rol`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `tipo_habitacion`
--
ALTER TABLE `tipo_habitacion`
  MODIFY `id` int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `user`
--
ALTER TABLE `user`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `estancia`
--
ALTER TABLE `estancia`
  ADD CONSTRAINT `estancia_ibfk_1` FOREIGN KEY (`estadoReservaId`) REFERENCES `estadoreserva` (`id`);

--
-- Filtros para la tabla `habitacion`
--
ALTER TABLE `habitacion`
  ADD CONSTRAINT `habitacion_ibfk_1` FOREIGN KEY (`tipoId`) REFERENCES `tipo_habitacion` (`id`);

--
-- Filtros para la tabla `habitaciones_x_estancia`
--
ALTER TABLE `habitaciones_x_estancia`
  ADD CONSTRAINT `habitaciones_x_estancia_ibfk_1` FOREIGN KEY (`estanciaId`) REFERENCES `estancia` (`id`),
  ADD CONSTRAINT `habitaciones_x_estancia_ibfk_2` FOREIGN KEY (`habitacionId`) REFERENCES `habitacion` (`id`);

--
-- Filtros para la tabla `ocupantes_x_estancia`
--
ALTER TABLE `ocupantes_x_estancia`
  ADD CONSTRAINT `ocupantes_x_estancia_ibfk_1` FOREIGN KEY (`clienteId`) REFERENCES `clientes` (`id`),
  ADD CONSTRAINT `ocupantes_x_estancia_ibfk_2` FOREIGN KEY (`estanciaId`) REFERENCES `estancia` (`id`);

--
-- Filtros para la tabla `pagosxestancia`
--
ALTER TABLE `pagosxestancia`
  ADD CONSTRAINT `pagosxestancia_ibfk_1` FOREIGN KEY (`idPago`) REFERENCES `pagos` (`id`),
  ADD CONSTRAINT `pagosxestancia_ibfk_2` FOREIGN KEY (`idEstancia`) REFERENCES `estancia` (`id`);

--
-- Filtros para la tabla `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`rol`) REFERENCES `rol` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
