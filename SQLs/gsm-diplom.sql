-- phpMyAdmin SQL Dump
-- version 3.5.1
-- http://www.phpmyadmin.net
--
-- Хост: 127.0.0.1
-- Время создания: Июл 12 2022 г., 17:11
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
-- Структура таблицы `auto-bases`
--

CREATE TABLE IF NOT EXISTS `auto-bases` (
  `ID` int(11) NOT NULL,
  `Name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `check-connect`
--

CREATE TABLE IF NOT EXISTS `check-connect` (
  `ID` int(10) NOT NULL AUTO_INCREMENT,
  `status-connect` int(10) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- Дамп данных таблицы `check-connect`
--

INSERT INTO `check-connect` (`ID`, `status-connect`) VALUES
(1, 1);

-- --------------------------------------------------------

--
-- Структура таблицы `positions`
--

CREATE TABLE IF NOT EXISTS `positions` (
  `ID` int(11) NOT NULL,
  `Name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `record-statuses`
--

CREATE TABLE IF NOT EXISTS `record-statuses` (
  `ID` int(11) NOT NULL,
  `Name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

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
-- Структура таблицы `types-gsm`
--

CREATE TABLE IF NOT EXISTS `types-gsm` (
  `ID` int(11) NOT NULL,
  `Name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ForKilo` decimal(10,3) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `vehicles`
--

CREATE TABLE IF NOT EXISTS `vehicles` (
  `ID` int(11) NOT NULL,
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

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
  ADD CONSTRAINT `fkn_autobase_three` FOREIGN KEY (`IDautobase`) REFERENCES `auto-bases` (`ID`),
  ADD CONSTRAINT `fkn_driver` FOREIGN KEY (`IDdriver`) REFERENCES `workers` (`ID`),
  ADD CONSTRAINT `fkn_signer` FOREIGN KEY (`IDsigner`) REFERENCES `workers` (`ID`),
  ADD CONSTRAINT `fkn_status` FOREIGN KEY (`RecordStatus`) REFERENCES `record-statuses` (`ID`),
  ADD CONSTRAINT `fkn_typegsm_three` FOREIGN KEY (`IDtypegsm`) REFERENCES `types-gsm` (`ID`),
  ADD CONSTRAINT `fkn_vehicle` FOREIGN KEY (`IDvehicle`) REFERENCES `vehicles` (`ID`);

--
-- Ограничения внешнего ключа таблицы `storehouse`
--
ALTER TABLE `storehouse`
  ADD CONSTRAINT `fkn_typegsm` FOREIGN KEY (`IDtypegsm`) REFERENCES `types-gsm` (`ID`);

--
-- Ограничения внешнего ключа таблицы `vehicles`
--
ALTER TABLE `vehicles`
  ADD CONSTRAINT `fkn_autobase_two` FOREIGN KEY (`IDautobase`) REFERENCES `auto-bases` (`ID`),
  ADD CONSTRAINT `fkn_typegsm_two` FOREIGN KEY (`IDtypegsm`) REFERENCES `types-gsm` (`ID`);

--
-- Ограничения внешнего ключа таблицы `workers`
--
ALTER TABLE `workers`
  ADD CONSTRAINT `fkn_autobase` FOREIGN KEY (`IDautobases`) REFERENCES `auto-bases` (`ID`),
  ADD CONSTRAINT `fkn_position` FOREIGN KEY (`IDposition`) REFERENCES `positions` (`ID`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
