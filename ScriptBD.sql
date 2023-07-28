-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 28-07-2023 a las 03:29:11
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `green_garden_2`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carrito`
--

CREATE TABLE `carrito` (
  `id` int(11) NOT NULL,
  `usuario_id` int(11) DEFAULT NULL,
  `producto_id` int(11) DEFAULT NULL,
  `precio` decimal(10,2) DEFAULT NULL,
  `cantidad` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `carrito`
--

INSERT INTO `carrito` (`id`, `usuario_id`, `producto_id`, `precio`, `cantidad`) VALUES
(3, 12, 3, 100.00, 1),
(5, 12, 10, 100.00, 1),
(6, 12, 11, 100.00, 1),
(7, 12, 9, 100.00, 1),
(10, 102, 2, 100.00, 1),
(11, 103, 15, 100.00, 1),
(12, 103, 14, 100.00, 1),
(13, 103, 13, 100.00, 1),
(14, 104, 5, 100.00, 1),
(15, 104, 2, 100.00, 1),
(16, 104, 14, 100.00, 1),
(17, 1, 2, 200.00, 2),
(18, 1, 5, 100.00, 1),
(19, 1, 1, 101.00, 1),
(20, 105, 10, 100.00, 1),
(21, 105, 11, 100.00, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias`
--

CREATE TABLE `categorias` (
  `id_cat` int(11) NOT NULL,
  `categoria` varchar(100) DEFAULT NULL,
  `descripcion` text DEFAULT NULL,
  `imagen` varchar(50) DEFAULT 'sin-portada.jpg',
  `estatus` int(2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categorias`
--

INSERT INTO `categorias` (`id_cat`, `categoria`, `descripcion`, `imagen`, `estatus`) VALUES
(1, 'Plantas de Interiores', 'Categoría que incluye plantas ideales para cultivar en interiores.', 'Menta.jpg.jpg', 0),
(2, 'Bonsai', 'Categoría que engloba árboles en miniatura cultivados en macetas.', 'bonsai.jpg', 1),
(3, 'Plantas Acuáticas', 'Categoría que incluye plantas que crecen en ambientes acuáticos.', 'plantas_acuaticas.jpg', 1),
(4, 'Plantas Carnívoras', 'Categoría que engloba plantas que obtienen nutrientes atrapando insectos.', 'plantas_carnivoras.jpg', 1),
(5, 'Palmas', 'Categoría que incluye plantas de la familia Arecaceae.', 'palmas.jpg', 1),
(6, 'Bulbosas', 'Categoría que engloba plantas que crecen a partir de bulbos.', 'flores_bulbosas.jpg', 1),
(7, 'Frutales', 'Categoría que incluye plantas que producen frutos comestibles.', 'plantas_frutales.jpg', 1),
(8, 'Plantas Medicinales', 'Categoría que engloba plantas utilizadas con fines medicinales.', 'plantas-medicinales.jpg', 1),
(9, 'Bromelias', 'Categoría que incluye plantas de la familia Bromeliaceae.', 'bromelias.jpg', 1),
(10, 'Bambúes', 'Categoría que engloba plantas de la subfamilia Bambusoideae.', 'bambu.jpg', 1),
(11, 'Plantas de Sombra', 'Categoría que incluye plantas que se desarrollan en áreas sombreadas.', 'plantas_de_sombra.jpg', 1),
(12, 'Cactos', 'Categoría que engloba plantas pertenecientes a la familia Cactaceae.', 'cactus.jpg', 1),
(13, 'Árboles Frutales', 'Categoría que incluye árboles que producen frutas.', 'arboles_frutales.jpg', 1),
(14, 'Plantas de Exterior', 'Categoría que engloba plantas ideales para cultivar en exteriores.', 'plantas_de_exterior.jpg', 1),
(15, 'Plantas Colgantes', 'Categoría que incluye plantas que se cultivan colgando.', 'plantas_colgantes.jpg', 1),
(16, 'Bulbos Ornamentales', 'Categoría que engloba bulbos utilizados con fines ornamentales.', 'bulbos_ornamentales.jpg', 1),
(17, 'Plantas Aromáticas', 'Categoría que incluye plantas utilizadas para aromatizar y condimentar.', 'flores_aromaticas.jpg', 1),
(18, 'Plantas Nativas', 'Categoría que engloba plantas autóctonas de una región o país.', 'plantas_nativas.jpg', 1),
(19, 'Árboles Ornamentales', 'Categoría que incluye árboles utilizados con fines ornamentales.', 'arboles_ornamentales.jpg', 1),
(20, 'Plantas Trepadoras', 'Categoría que engloba plantas que trepan y se adhieren a superficies.', 'plantas_trepadoras.jpg', 0),
(23, 'Esta la nueva 12345', 'Esta es una nueva desc.', 'Icon2.jpg.jpg', 1),
(24, 'Bonsais', 'Hola!', 'Captura de pantalla 2023-07-27 113938.png.png', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `contacto`
--

CREATE TABLE `contacto` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) DEFAULT NULL,
  `correo_electronico` varchar(100) NOT NULL,
  `mensaje` text NOT NULL,
  `fecha_creacion` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `contacto`
--

INSERT INTO `contacto` (`id`, `nombre`, `correo_electronico`, `mensaje`, `fecha_creacion`) VALUES
(1, 'Frank Rojas', 'aaa@gmail.com', 'Hola', '2023-07-25 17:54:57'),
(2, 'uwu', 'uwu@gnail.com', 'Eta vaina la andamos probando causa', '2023-07-27 17:11:31'),
(3, 'Frank', 'FrankRojas@gmail.com', 'Hola!', '2023-07-27 19:27:31');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id_prod` int(11) NOT NULL,
  `prod_nom` varchar(50) DEFAULT NULL,
  `cat_id` int(11) DEFAULT NULL,
  `descripcion` text DEFAULT NULL,
  `estatus` int(2) DEFAULT NULL,
  `TOP` int(11) DEFAULT NULL,
  `imagen` varchar(50) DEFAULT NULL,
  `precio` decimal(10,0) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id_prod`, `prod_nom`, `cat_id`, `descripcion`, `estatus`, `TOP`, `imagen`, `precio`) VALUES
(1, 'Planta de Serpientes', 20, 'Sansevieria trifasciata, también conocida como lengua de suegra.', 1, 1, 'arboles.jpg', 101),
(2, 'Helecho Nido de Ave', 9, 'Helecho tropical con forma de nido, ideal para interiores.', 1, 1, 'Menta.jpg.jpg', 100),
(3, 'Calathea Ornata', 1, 'Planta con hojas de patrón distintivo y atractivo.', 1, 0, 'fondo-1.jpg', 100),
(4, 'Poto', 1, 'Scindapsus aureus, popular planta trepadora de interior.', 1, 0, 'poto.jpg.jpg', 100),
(5, 'Bonsái de Ficus', 2, 'Ficus retusa cultivado como un impresionante bonsái.', 1, 1, 'bonsai de ficus.jpg.jpg', 100),
(6, 'Bonsái de Pino Blanco', 2, 'Pinus parviflora cuidadosamente podado en un bonsái.', 1, 0, 'bonsai de pino blanco.jpg.jpg', 100),
(7, 'Bonsái de Cerezo', 2, 'Bonsái de Prunus serrulata, conocido como cerezo japonés.', 1, 0, 'bonsai_cerezo.jpg.jpg', 100),
(8, 'Bonsái de Olmo Chino', 2, 'Ulmus parvifolia, un clásico bonsái de hoja perenne.', 1, 0, 'bonsai_olmo_chino.jpg.jpg', 100),
(9, 'Lirio de Agua', 3, 'Nymphaea spp., una hermosa planta acuática con flores.', 1, 0, 'lirio de aguila.jpg.jpg', 100),
(10, 'Helecho Acuático', 3, 'Ceratopteris thalictroides, un helecho perfecto para acuarios.', 1, 1, 'helecho.jpg.jpg', 100),
(11, 'Cola de Zorro', 3, 'Ceratopteris cornuta, planta flotante para acuarios.', 1, 1, 'cola_de_zorro.jpg.jpg', 100),
(12, 'Egeria Densa', 3, 'Planta acuática de rápido crecimiento y filtradora de agua.', 1, 1, 'egeria_densa.jpg.jpg', 100),
(13, 'Dionaea Muscipula', 4, 'Planta carnívora conocida como Venus atrapamoscas.', 1, 0, 'dionea muscipula.jpg.jpg', 100),
(14, 'Nepenthes', 4, 'Nepenthes spp., populares plantas enredaderas carnívoras.', 1, 1, 'nepenthes.jpg.jpg', 100),
(15, 'Sarracenia', 4, 'Sarracenia spp., tubos de captura de insectos.', 1, 0, 'sarracenia.jpg.jpg', 100),
(17, 'Palmera', 5, 'Palmera tropical del caribe', 1, 0, 'arboles_ornamentales.jpg.jpg', 1000),
(19, 'Cocos Nucifera', 5, 'El cocotero es uno de los nombres de palmeras tropicales más conocidos. La palmera Cocos nucifera puede llegar a alcanzar hasta los 24 metros de altura. Se le reconoce por su tallo encorvado o inclinado por su fruto, el coco. Es propio de climas tropicales y muy utilizado como planta de interiores amplios por el color intenso de sus hojas.', 1, 0, 'cocos.jpg.jpg', 1100);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id_usuario` int(11) NOT NULL,
  `Nombre` varchar(50) DEFAULT NULL,
  `Apellido` varchar(50) DEFAULT NULL,
  `correo` varchar(100) NOT NULL,
  `contrasenia` varchar(100) NOT NULL,
  `nivel_acceso` varchar(50) DEFAULT NULL,
  `imagen_usuario` varchar(50) DEFAULT 'Icon2.jpg'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_usuario`, `Nombre`, `Apellido`, `correo`, `contrasenia`, `nivel_acceso`, `imagen_usuario`) VALUES
(1, 'Frank', 'Rojas', 'fco3190@admon.com', 'password123', 'Administrador', 'F (1).png'),
(2, 'Juan', 'Pérez', 'juan.perez@example.com', 'password1', 'Usuario', 'Icon2.jpg'),
(3, 'María', 'Gómez', 'maria.gomez@example.com', 'password2', 'Usuario', 'Icon2.jpg'),
(4, 'Carlos', 'López', 'carlos.lopez@example.com', 'password3', 'Usuario', 'Icon2.jpg'),
(5, 'Ana', 'Martínez', 'ana.martinez@example.com', 'password4', 'Usuario', 'Icon2.jpg'),
(6, 'Pedro', 'Rodríguez', 'pedro.rodriguez@example.com', 'password5', 'Usuario', 'Icon2.jpg'),
(7, 'Laura', 'Hernández', 'laura.hernandez@example.com', 'password6', 'Usuario', 'Icon2.jpg'),
(8, 'Luis', 'García', 'luis.garcia@example.com', 'password7', 'Usuario', 'Icon2.jpg'),
(9, 'Sofía', 'Díaz', 'sofia.diaz@example.com', 'password8', 'Usuario', 'Icon2.jpg'),
(10, 'Jorge', 'Moreno', 'jorge.moreno@example.com', 'password9', 'Usuario', 'Icon2.jpg'),
(11, 'Carolina', 'Romero', 'carolina.romero@example.com', 'password10', 'Usuario', 'Icon2.jpg'),
(12, 'John', 'Doe', 'john.doe@example.com', 'password11', 'Usuario', 'Icon2.jpg'),
(13, 'Jane', 'Smith', 'jane.smith@example.com', 'password12', 'Usuario', 'Icon2.jpg'),
(14, 'Michael', 'Johnson', 'michael.johnson@example.com', 'password13', 'Usuario', 'Icon2.jpg'),
(15, 'Emily', 'Brown', 'emily.brown@example.com', 'password14', 'Usuario', 'Icon2.jpg'),
(16, 'Daniel', 'Lee', 'daniel.lee@example.com', 'password15', 'Usuario', 'Icon2.jpg'),
(17, 'Olivia', 'Wilson', 'olivia.wilson@example.com', 'password16', 'Usuario', 'Icon2.jpg'),
(18, 'William', 'Anderson', 'william.anderson@example.com', 'password17', 'Usuario', 'Icon2.jpg'),
(19, 'Emma', 'Taylor', 'emma.taylor@example.com', 'password18', 'Usuario', 'Icon2.jpg'),
(20, 'David', 'Thomas', 'david.thomas@example.com', 'password19', 'Usuario', 'Icon2.jpg'),
(21, 'Ava', 'Jackson', 'ava.jackson@example.com', 'password20', 'Usuario', 'Icon2.jpg'),
(22, 'Sophia', 'White', 'sophia.white@example.com', 'password21', 'Usuario', 'Icon2.jpg'),
(23, 'James', 'Harris', 'james.harris@example.com', 'password22', 'Usuario', 'Icon2.jpg'),
(24, 'Isabella', 'Martin', 'isabella.martin@example.com', 'password23', 'Usuario', 'Icon2.jpg'),
(25, 'Joseph', 'Thompson', 'joseph.thompson@example.com', 'password24', 'Usuario', 'Icon2.jpg'),
(26, 'Mia', 'Garcia', 'mia.garcia@example.com', 'password25', 'Usuario', 'Icon2.jpg'),
(27, 'Benjamin', 'Wilson', 'benjamin.wilson@example.com', 'password26', 'Usuario', 'Icon2.jpg'),
(28, 'Amelia', 'Lewis', 'amelia.lewis@example.com', 'password27', 'Usuario', 'Icon2.jpg'),
(29, 'Ethan', 'Scott', 'ethan.scott@example.com', 'password28', 'Usuario', 'Icon2.jpg'),
(30, 'Harper', 'Green', 'harper.green@example.com', 'password29', 'Usuario', 'Icon2.jpg'),
(31, 'Alexander', 'King', 'alexander.king@example.com', 'password30', 'Usuario', 'Icon2.jpg'),
(32, 'Evelyn', 'Baker', 'evelyn.baker@example.com', 'password31', 'Usuario', 'Icon2.jpg'),
(33, 'Elijah', 'Gonzalez', 'elijah.gonzalez@example.com', 'password32', 'Usuario', 'Icon2.jpg'),
(34, 'Charlotte', 'Evans', 'charlotte.evans@example.com', 'password33', 'Usuario', 'Icon2.jpg'),
(35, 'Michael', 'Walker', 'michael.walker@example.com', 'password34', 'Usuario', 'Icon2.jpg'),
(36, 'Scarlett', 'Allen', 'scarlett.allen@example.com', 'password35', 'Usuario', 'Icon2.jpg'),
(37, 'William', 'Young', 'william.young@example.com', 'password36', 'Usuario', 'Icon2.jpg'),
(38, 'Grace', 'Scott', 'grace.scott@example.com', 'password37', 'Usuario', 'Icon2.jpg'),
(39, 'Lucas', 'Turner', 'lucas.turner@example.com', 'password38', 'Usuario', 'Icon2.jpg'),
(40, 'Chloe', 'Ward', 'chloe.ward@example.com', 'password39', 'Usuario', 'Icon2.jpg'),
(41, 'Oliver', 'Morris', 'oliver.morris@example.com', 'password40', 'Usuario', 'Icon2.jpg'),
(42, 'Natalie', 'Bennett', 'natalie.bennett@example.com', 'password41', 'Usuario', 'Icon2.jpg'),
(43, 'Logan', 'Smith', 'logan.smith@example.com', 'password42', 'Usuario', 'Icon2.jpg'),
(44, 'Hannah', 'Perez', 'hannah.perez@example.com', 'password43', 'Usuario', 'Icon2.jpg'),
(45, 'Emma', 'Collins', 'emma.collins@example.com', 'password44', 'Usuario', 'Icon2.jpg'),
(46, 'Carter', 'Morris', 'carter.morris@example.com', 'password45', 'Usuario', 'Icon2.jpg'),
(47, 'Madison', 'Murphy', 'madison.murphy@example.com', 'password46', 'Usuario', 'Icon2.jpg'),
(48, 'Sebastian', 'James', 'sebastian.james@example.com', 'password47', 'Usuario', 'Icon2.jpg'),
(49, 'Aria', 'Ward', 'aria.ward@example.com', 'password48', 'Usuario', 'Icon2.jpg'),
(50, 'Jayden', 'Kelly', 'jayden.kelly@example.com', 'password49', 'Usuario', 'Icon2.jpg'),
(51, 'Ella', 'Adams', 'ella.adams@example.com', 'password50', 'Usuario', 'Icon2.jpg'),
(52, 'Muhammad', 'Rivera', 'muhammad.rivera@example.com', 'password51', 'Usuario', 'Icon2.jpg'),
(53, 'Scarlett', 'Garcia', 'scarlett.garcia@example.com', 'password52', 'Usuario', 'Icon2.jpg'),
(54, 'Aiden', 'Foster', 'aiden.foster@example.com', 'password53', 'Usuario', 'Icon2.jpg'),
(55, 'Layla', 'Martin', 'layla.martin@example.com', 'password54', 'Usuario', 'Icon2.jpg'),
(56, 'Daniel', 'Reed', 'daniel.reed@example.com', 'password55', 'Usuario', 'Icon2.jpg'),
(57, 'Abigail', 'Jenkins', 'abigail.jenkins@example.com', 'password56', 'Usuario', 'Icon2.jpg'),
(58, 'Matthew', 'Davies', 'matthew.davies@example.com', 'password57', 'Usuario', 'Icon2.jpg'),
(59, 'Emily', 'Hill', 'emily.hill@example.com', 'password58', 'Usuario', 'Icon2.jpg'),
(60, 'Olivia', 'Barnes', 'olivia.barnes@example.com', 'password59', 'Usuario', 'Icon2.jpg'),
(61, 'Samuel', 'Thomas', 'samuel.thomas@example.com', 'password60', 'Usuario', 'Icon2.jpg'),
(62, 'Avery', 'Young', 'avery.young@example.com', 'password61', 'Usuario', 'Icon2.jpg'),
(63, 'Grace', 'Davis', 'grace.davis@example.com', 'password62', 'Usuario', 'Icon2.jpg'),
(64, 'Jackson', 'Carter', 'jackson.carter@example.com', 'password63', 'Usuario', 'Icon2.jpg'),
(65, 'Sofia', 'Johnson', 'sofia.johnson@example.com', 'password64', 'Usuario', 'Icon2.jpg'),
(66, 'Lucas', 'Harris', 'lucas.harris@example.com', 'password65', 'Usuario', 'Icon2.jpg'),
(67, 'Isabella', 'White', 'isabella.white@example.com', 'password66', 'Usuario', 'Icon2.jpg'),
(68, 'Mia', 'King', 'mia.king@example.com', 'password67', 'Usuario', 'Icon2.jpg'),
(69, 'Aiden', 'Wilson', 'aiden.wilson@example.com', 'password68', 'Usuario', 'Icon2.jpg'),
(70, 'Evelyn', 'Smith', 'evelyn.smith@example.com', 'password69', 'Usuario', 'Icon2.jpg'),
(71, 'James', 'Jones', 'james.jones@example.com', 'password70', 'Usuario', 'Icon2.jpg'),
(72, 'Amelia', 'Anderson', 'amelia.anderson@example.com', 'password71', 'Usuario', 'Icon2.jpg'),
(73, 'Ethan', 'Johnson', 'ethan.johnson@example.com', 'password72', 'Usuario', 'Icon2.jpg'),
(74, 'Harper', 'Martinez', 'harper.martinez@example.com', 'password73', 'Usuario', 'Icon2.jpg'),
(75, 'Elijah', 'Brown', 'elijah.brown@example.com', 'password74', 'Usuario', 'Icon2.jpg'),
(76, 'Charlotte', 'Taylor', 'charlotte.taylor@example.com', 'password75', 'Usuario', 'Icon2.jpg'),
(77, 'Michael', 'Wilson', 'michael.wilson@example.com', 'password76', 'Usuario', 'Icon2.jpg'),
(78, 'Aria', 'Lopez', 'aria.lopez@example.com', 'password77', 'Usuario', 'Icon2.jpg'),
(79, 'Alexander', 'Jackson', 'alexander.jackson@example.com', 'password78', 'Usuario', 'Icon2.jpg'),
(80, 'Mila', 'Davis', 'mila.davis@example.com', 'password79', 'Usuario', 'Icon2.jpg'),
(81, 'Benjamin', 'White', 'benjamin.white@example.com', 'password80', 'Usuario', 'Icon2.jpg'),
(82, 'Ava', 'Jones', 'ava.jones@example.com', 'password81', 'Usuario', 'Icon2.jpg'),
(83, 'Logan', 'Lee', 'logan.lee@example.com', 'password82', 'Usuario', 'Icon2.jpg'),
(84, 'Chloe', 'Smith', 'chloe.smith@example.com', 'password83', 'Usuario', 'Icon2.jpg'),
(85, 'Oliver', 'Johnson', 'oliver.johnson@example.com', 'password84', 'Usuario', 'Icon2.jpg'),
(86, 'Natalie', 'Garcia', 'natalie.garcia@example.com', 'password85', 'Usuario', 'Icon2.jpg'),
(87, 'Elijah', 'Williams', 'elijah.williams@example.com', 'password86', 'Usuario', 'Icon2.jpg'),
(88, 'Sofia', 'Harris', 'sofia.harris@example.com', 'password87', 'Usuario', 'Icon2.jpg'),
(89, 'Daniel', 'Davis', 'daniel.davis@example.com', 'password88', 'Usuario', 'Icon2.jpg'),
(90, 'Avery', 'Smith', 'avery.smith@example.com', 'password89', 'Usuario', 'Icon2.jpg'),
(91, 'Abigail', 'Miller', 'abigail.miller@example.com', 'password90', 'Usuario', 'Icon2.jpg'),
(92, 'Lucas', 'Garcia', 'lucas.garcia@example.com', 'password91', 'Usuario', 'Icon2.jpg'),
(93, 'Grace', 'Johnson', 'grace.johnson@example.com', 'password92', 'Usuario', 'Icon2.jpg'),
(94, 'Jackson', 'Anderson', 'jackson.anderson@example.com', 'password93', 'Usuario', 'Icon2.jpg'),
(95, 'Scarlett', 'Brown', 'scarlett.brown@example.com', 'password94', 'Usuario', 'Icon2.jpg'),
(96, 'William', 'Smith', 'william.smith@example.com', 'password95', 'Usuario', 'Icon2.jpg'),
(98, 'Samuel', 'Lopez', 'samuel.lopez@example.com', 'password97', 'Usuario', 'Icon2.jpg'),
(102, 'chimalin', 'uwu', 'uwu@gnail.com', '09876554', 'Usuario', 'Icon2.jpg'),
(103, 'adu', 'suazo', 'adu@gmail.com', 'poiuytre', 'Usuario', 'Icon2.jpg'),
(104, 'nono', 'zaca', 'zaca@gmail.com', 'Zaca1234', 'Usuario', 'Icon2.jpg'),
(105, 'Frank', 'Rojas', 'FrankRojas@gmail.com', 'Cozal2233', 'Usuario', 'Icon2.jpg');

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `vista_carrito`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `vista_carrito` (
`id` int(11)
,`usuario_id` int(11)
,`nombre_producto` varchar(50)
,`precio` decimal(10,2)
,`cantidad` int(11)
,`imagen` varchar(50)
);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `vw_obtenerusuarios`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `vw_obtenerusuarios` (
`id_usuario` int(11)
,`correo` varchar(100)
,`contrasenia` varchar(100)
);

-- --------------------------------------------------------

--
-- Estructura para la vista `vista_carrito`
--
DROP TABLE IF EXISTS `vista_carrito`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vista_carrito`  AS SELECT `c`.`id` AS `id`, `c`.`usuario_id` AS `usuario_id`, `p`.`prod_nom` AS `nombre_producto`, `c`.`precio` AS `precio`, `c`.`cantidad` AS `cantidad`, `p`.`imagen` AS `imagen` FROM ((`carrito` `c` join `usuarios` `u` on(`c`.`usuario_id` = `u`.`id_usuario`)) join `productos` `p` on(`c`.`producto_id` = `p`.`id_prod`)) ;

-- --------------------------------------------------------

--
-- Estructura para la vista `vw_obtenerusuarios`
--
DROP TABLE IF EXISTS `vw_obtenerusuarios`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vw_obtenerusuarios`  AS SELECT `usuarios`.`id_usuario` AS `id_usuario`, `usuarios`.`correo` AS `correo`, `usuarios`.`contrasenia` AS `contrasenia` FROM `usuarios` ;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `carrito`
--
ALTER TABLE `carrito`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usuario_id` (`usuario_id`),
  ADD KEY `producto_id` (`producto_id`);

--
-- Indices de la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`id_cat`);

--
-- Indices de la tabla `contacto`
--
ALTER TABLE `contacto`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id_prod`),
  ADD KEY `cat_id` (`cat_id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `carrito`
--
ALTER TABLE `carrito`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT de la tabla `categorias`
--
ALTER TABLE `categorias`
  MODIFY `id_cat` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT de la tabla `contacto`
--
ALTER TABLE `contacto`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id_prod` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=106;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `carrito`
--
ALTER TABLE `carrito`
  ADD CONSTRAINT `carrito_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id_usuario`),
  ADD CONSTRAINT `carrito_ibfk_2` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id_prod`);

--
-- Filtros para la tabla `productos`
--
ALTER TABLE `productos`
  ADD CONSTRAINT `productos_ibfk_1` FOREIGN KEY (`cat_id`) REFERENCES `categorias` (`id_cat`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
