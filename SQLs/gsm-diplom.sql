-- phpMyAdmin SQL Dump
-- version 3.5.1
-- http://www.phpmyadmin.net
--
-- Хост: 127.0.0.1
-- Время создания: Июл 13 2022 г., 10:13
-- Версия сервера: 5.5.25
-- Версия PHP: 5.3.13

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- База данных: `gsm-diplom`
--

-- --------------------------------------------------------

--
-- Структура таблицы `auto_bases`
--

CREATE TABLE IF NOT EXISTS `auto_bases` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci AUTO_INCREMENT=7 ;

--
-- Дамп данных таблицы `auto_bases`
--

INSERT INTO `auto_bases` (`ID`, `Name`) VALUES
(1, 'Для стажеров и кандидатов'),
(2, 'Первая АвтоБаза'),
(3, 'Галактика');

-- --------------------------------------------------------

--
-- Структура таблицы `check_connect`
--

CREATE TABLE IF NOT EXISTS `check_connect` (
  `ID` int(10) NOT NULL AUTO_INCREMENT,
  `status-connect` int(10) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- Дамп данных таблицы `check_connect`
--

INSERT INTO `check_connect` (`ID`, `status-connect`) VALUES
(1, 1);

-- --------------------------------------------------------

--
-- Структура таблицы `positions`
--

CREATE TABLE IF NOT EXISTS `positions` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci AUTO_INCREMENT=6 ;

--
-- Дамп данных таблицы `positions`
--

INSERT INTO `positions` (`ID`, `Name`) VALUES
(1, 'Суперадмин'),
(2, 'Админ'),
(3, 'Подписант'),
(4, 'Водитель'),
(5, 'Стажер');

-- --------------------------------------------------------

--
-- Структура таблицы `records`
--

CREATE TABLE IF NOT EXISTS `records` (
  `ID` int(11) NOT NULL,
  `Number` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `RecordStatus` int(11) DEFAULT NULL,
  `DateOpen` date DEFAULT NULL,
  `DateClose` date DEFAULT NULL,
  `KilometrsOpen` int(11) DEFAULT NULL,
  `KilometrsClose` int(11) DEFAULT NULL,
  `UsedLiters` decimal(10,3) DEFAULT NULL,
  `IDvehicle` int(11) DEFAULT NULL,
  `IDtypegsm` int(11) DEFAULT NULL,
  `IDsigner` int(11) DEFAULT NULL,
  `IDdriver` int(11) DEFAULT NULL,
  `IDautobase` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `fkn_status_idx` (`RecordStatus`),
  KEY `fkn_vehicle_idx` (`IDvehicle`),
  KEY `fkn_typegsm_three_idx` (`IDtypegsm`),
  KEY `fkn_signer_idx` (`IDsigner`),
  KEY `fkn_driver_idx` (`IDdriver`),
  KEY `fkn_autobase_two_idx` (`IDautobase`),
  KEY `fkn_autobase_three_idx` (`IDautobase`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `record_statuses`
--

CREATE TABLE IF NOT EXISTS `record_statuses` (
  `ID` int(11) NOT NULL,
  `Name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `storehouse`
--

CREATE TABLE IF NOT EXISTS `storehouse` (
  `ID` int(11) NOT NULL,
  `IDtypegsm` int(11) DEFAULT NULL,
  `Liters` decimal(10,3) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `fkn_typegsm_idx` (`IDtypegsm`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `types_gsm`
--

CREATE TABLE IF NOT EXISTS `types_gsm` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ForKilo` decimal(10,3) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci AUTO_INCREMENT=2 ;

--
-- Дамп данных таблицы `types_gsm`
--

INSERT INTO `types_gsm` (`ID`, `Name`, `ForKilo`) VALUES
(1, 'Бензин', '0.990');

-- --------------------------------------------------------

--
-- Структура таблицы `vehicles`
--

CREATE TABLE IF NOT EXISTS `vehicles` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Model` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Number` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `IDautobase` int(11) DEFAULT NULL,
  `IDtypegsm` int(11) DEFAULT NULL,
  `Kilometrs` int(11) DEFAULT NULL,
  `Liters` decimal(10,3) DEFAULT NULL,
  `Expense` decimal(10,3) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `fkn_typegsm_idx` (`IDtypegsm`),
  KEY `fkn_typegsm_two_idx` (`IDtypegsm`),
  KEY `fkn_autobase_two_idx` (`IDautobase`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci AUTO_INCREMENT=3 ;

--
-- Дамп данных таблицы `vehicles`
--

INSERT INTO `vehicles` (`ID`, `Model`, `Number`, `IDautobase`, `IDtypegsm`, `Kilometrs`, `Liters`, `Expense`) VALUES
(1, 'ВАЗ', 'В884ГГ56', 3, 1, 0, '50.000', '10.000'),
(2, 'ВАЗ', 'В884ГГ56', 3, 1, 0, '50.000', '10.000');

-- --------------------------------------------------------

--
-- Структура таблицы `workers`
--

CREATE TABLE IF NOT EXISTS `workers` (
  `ID` int(11) NOT NULL,
  `SurName` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Name` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `MiddleName` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `LoginUser` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `PasswordUser` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `IDautobases` int(11) DEFAULT NULL,
  `IDposition` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `fkn_position_idx` (`IDposition`),
  KEY `fkn_autobase_idx` (`IDautobases`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `records`
--
ALTER TABLE `records`
  ADD CONSTRAINT `fkn_autobase_three` FOREIGN KEY (`IDautobase`) REFERENCES `auto_bases` (`ID`),
  ADD CONSTRAINT `fkn_driver` FOREIGN KEY (`IDdriver`) REFERENCES `workers` (`ID`),
  ADD CONSTRAINT `fkn_signer` FOREIGN KEY (`IDsigner`) REFERENCES `workers` (`ID`),
  ADD CONSTRAINT `fkn_status` FOREIGN KEY (`RecordStatus`) REFERENCES `record_statuses` (`ID`),
  ADD CONSTRAINT `fkn_typegsm_three` FOREIGN KEY (`IDtypegsm`) REFERENCES `types_gsm` (`ID`),
  ADD CONSTRAINT `fkn_vehicle` FOREIGN KEY (`IDvehicle`) REFERENCES `vehicles` (`ID`);

--
-- Ограничения внешнего ключа таблицы `storehouse`
--
ALTER TABLE `storehouse`
  ADD CONSTRAINT `fkn_typegsm` FOREIGN KEY (`IDtypegsm`) REFERENCES `types_gsm` (`ID`);

--
-- Ограничения внешнего ключа таблицы `vehicles`
--
ALTER TABLE `vehicles`
  ADD CONSTRAINT `fkn_autobase_two` FOREIGN KEY (`IDautobase`) REFERENCES `auto_bases` (`ID`),
  ADD CONSTRAINT `fkn_typegsm_two` FOREIGN KEY (`IDtypegsm`) REFERENCES `types_gsm` (`ID`);

--
-- Ограничения внешнего ключа таблицы `workers`
--
ALTER TABLE `workers`
  ADD CONSTRAINT `fkn_autobase` FOREIGN KEY (`IDautobases`) REFERENCES `auto_bases` (`ID`),
  ADD CONSTRAINT `fkn_position` FOREIGN KEY (`IDposition`) REFERENCES `positions` (`ID`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
