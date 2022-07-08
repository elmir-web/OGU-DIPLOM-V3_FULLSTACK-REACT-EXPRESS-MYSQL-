-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Хост: localhost
-- Время создания: Июл 08 2022 г., 13:40
-- Версия сервера: 5.7.38-0ubuntu0.18.04.1
-- Версия PHP: 7.2.24-0ubuntu0.18.04.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `123`
--

-- --------------------------------------------------------

--
-- Структура таблицы `auto-bases`
--

CREATE TABLE `auto-bases` (
  `ID` int(11) NOT NULL,
  `Name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `positions`
--

CREATE TABLE `positions` (
  `ID` int(11) NOT NULL,
  `Name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `record-statuses`
--

CREATE TABLE `record-statuses` (
  `ID` int(11) NOT NULL,
  `Name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `records`
--

CREATE TABLE `records` (
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
  `IDautobase` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `storehouse`
--

CREATE TABLE `storehouse` (
  `ID` int(11) NOT NULL,
  `IDtypegsm` int(11) DEFAULT NULL,
  `Liters` decimal(10,3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `types-gsm`
--

CREATE TABLE `types-gsm` (
  `ID` int(11) NOT NULL,
  `Name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ForKilo` decimal(10,3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `vehicles`
--

CREATE TABLE `vehicles` (
  `ID` int(11) NOT NULL,
  `Model` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Number` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `IDautobase` int(11) DEFAULT NULL,
  `IDtypegsm` int(11) DEFAULT NULL,
  `Kilometrs` int(11) DEFAULT NULL,
  `Liters` decimal(10,3) DEFAULT NULL,
  `Expense` decimal(10,3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `workers`
--

CREATE TABLE `workers` (
  `ID` int(11) NOT NULL,
  `SurName` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Name` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `MiddleName` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `LoginUser` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `PasswordUser` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `IDautobases` int(11) DEFAULT NULL,
  `IDposition` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `auto-bases`
--
ALTER TABLE `auto-bases`
  ADD PRIMARY KEY (`ID`);

--
-- Индексы таблицы `positions`
--
ALTER TABLE `positions`
  ADD PRIMARY KEY (`ID`);

--
-- Индексы таблицы `record-statuses`
--
ALTER TABLE `record-statuses`
  ADD PRIMARY KEY (`ID`);

--
-- Индексы таблицы `records`
--
ALTER TABLE `records`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `fkn_status_idx` (`RecordStatus`),
  ADD KEY `fkn_vehicle_idx` (`IDvehicle`),
  ADD KEY `fkn_typegsm_three_idx` (`IDtypegsm`),
  ADD KEY `fkn_signer_idx` (`IDsigner`),
  ADD KEY `fkn_driver_idx` (`IDdriver`),
  ADD KEY `fkn_autobase_two_idx` (`IDautobase`),
  ADD KEY `fkn_autobase_three_idx` (`IDautobase`);

--
-- Индексы таблицы `storehouse`
--
ALTER TABLE `storehouse`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `fkn_typegsm_idx` (`IDtypegsm`);

--
-- Индексы таблицы `types-gsm`
--
ALTER TABLE `types-gsm`
  ADD PRIMARY KEY (`ID`);

--
-- Индексы таблицы `vehicles`
--
ALTER TABLE `vehicles`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `fkn_typegsm_idx` (`IDtypegsm`),
  ADD KEY `fkn_typegsm_two_idx` (`IDtypegsm`),
  ADD KEY `fkn_autobase_two_idx` (`IDautobase`);

--
-- Индексы таблицы `workers`
--
ALTER TABLE `workers`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `fkn_position_idx` (`IDposition`),
  ADD KEY `fkn_autobase_idx` (`IDautobases`);

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
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
