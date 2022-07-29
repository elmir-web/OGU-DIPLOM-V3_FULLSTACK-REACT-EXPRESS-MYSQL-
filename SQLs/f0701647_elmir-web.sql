-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Хост: 10.0.0.57
-- Время создания: Июл 29 2022 г., 12:29
-- Версия сервера: 5.7.37-40
-- Версия PHP: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `f0701647_elmir-web`
--

-- --------------------------------------------------------

--
-- Структура таблицы `auto_bases`
--

CREATE TABLE `auto_bases` (
  `ID` int(11) NOT NULL,
  `Name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `auto_bases`
--

INSERT INTO `auto_bases` (`ID`, `Name`) VALUES
(1, 'Для стажеров и кандидатов'),
(2, 'Кувандык, первая (на ул. Заводская, маг.: Светофор)');

-- --------------------------------------------------------

--
-- Структура таблицы `check_connect`
--

CREATE TABLE `check_connect` (
  `ID` int(10) NOT NULL,
  `status-connect` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `check_connect`
--

INSERT INTO `check_connect` (`ID`, `status-connect`) VALUES
(1, 1);

-- --------------------------------------------------------

--
-- Структура таблицы `filling_list`
--

CREATE TABLE `filling_list` (
  `ID` int(10) NOT NULL,
  `Number` varchar(100) NOT NULL,
  `Liters` decimal(10,3) NOT NULL,
  `FilingStatus` int(10) NOT NULL,
  `IDrecord` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `filling_statuses`
--

CREATE TABLE `filling_statuses` (
  `ID` int(10) NOT NULL,
  `Name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `filling_statuses`
--

INSERT INTO `filling_statuses` (`ID`, `Name`) VALUES
(1, 'Заправка разрешена'),
(2, 'Заправка запрещена');

-- --------------------------------------------------------

--
-- Структура таблицы `positions`
--

CREATE TABLE `positions` (
  `ID` int(11) NOT NULL,
  `Name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

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
-- Структура таблицы `record_statuses`
--

CREATE TABLE `record_statuses` (
  `ID` int(11) NOT NULL,
  `Name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `record_statuses`
--

INSERT INTO `record_statuses` (`ID`, `Name`) VALUES
(1, 'Открыт'),
(2, 'Закрыт');

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
-- Структура таблицы `types_gsm`
--

CREATE TABLE `types_gsm` (
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
-- Дамп данных таблицы `workers`
--

INSERT INTO `workers` (`ID`, `SurName`, `Name`, `MiddleName`, `LoginUser`, `PasswordUser`, `IDautobases`, `IDposition`) VALUES
(1, 'Суперадминов', 'Суперадмин', 'Суперадминович', 'SUPERADMIN.LOGIN', 'SUPERADMIN.PASS', 2, 1),
(2, 'Админов', 'Админ', 'Админович', 'ADMIN.LOGIN', 'ADMIN.PASS', 2, 2),
(3, 'Подписантов1', 'Подписант1', 'Подписантович1', 'SIGNER1.LOGIN', 'SIGNER1.PASS', 2, 3),
(4, 'Подписантов2', 'Подписант2', 'Подписантович2', 'SIGNER2.LOGIN', 'SIGNER2.PASS', 2, 3),
(5, 'Водителов1', 'Водитель1', 'Водителевич1', 'DRIVER1.LOGIN', 'DRIVER1.PASS', 2, 4),
(6, 'Водителов2', 'Водитель2', 'Водителевич2', 'DRIVER2.LOGIN', 'DRIVER2.PASS', 2, 4),
(7, 'Стажеров1', 'Стажер1', 'Стажерович1', 'CANDIDATE1.LOGIN', 'CANDIDATE1.PASS', 1, 5),
(8, 'Стажеров2', 'Стажер2', 'Стажерович2', 'CANDIDATE2.LOGIN', 'CANDIDATE2.PASS', 1, 5);

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `auto_bases`
--
ALTER TABLE `auto_bases`
  ADD PRIMARY KEY (`ID`);

--
-- Индексы таблицы `check_connect`
--
ALTER TABLE `check_connect`
  ADD PRIMARY KEY (`ID`);

--
-- Индексы таблицы `filling_list`
--
ALTER TABLE `filling_list`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `FilingStatus` (`FilingStatus`),
  ADD KEY `IDrecord` (`IDrecord`);

--
-- Индексы таблицы `filling_statuses`
--
ALTER TABLE `filling_statuses`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `ID` (`ID`);

--
-- Индексы таблицы `positions`
--
ALTER TABLE `positions`
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
-- Индексы таблицы `record_statuses`
--
ALTER TABLE `record_statuses`
  ADD PRIMARY KEY (`ID`);

--
-- Индексы таблицы `storehouse`
--
ALTER TABLE `storehouse`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `fkn_typegsm_idx` (`IDtypegsm`);

--
-- Индексы таблицы `types_gsm`
--
ALTER TABLE `types_gsm`
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
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `auto_bases`
--
ALTER TABLE `auto_bases`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `check_connect`
--
ALTER TABLE `check_connect`
  MODIFY `ID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT для таблицы `filling_list`
--
ALTER TABLE `filling_list`
  MODIFY `ID` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `filling_statuses`
--
ALTER TABLE `filling_statuses`
  MODIFY `ID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `positions`
--
ALTER TABLE `positions`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT для таблицы `records`
--
ALTER TABLE `records`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `record_statuses`
--
ALTER TABLE `record_statuses`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `storehouse`
--
ALTER TABLE `storehouse`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `types_gsm`
--
ALTER TABLE `types_gsm`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `vehicles`
--
ALTER TABLE `vehicles`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `workers`
--
ALTER TABLE `workers`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `filling_list`
--
ALTER TABLE `filling_list`
  ADD CONSTRAINT `filling_list_ibfk_1` FOREIGN KEY (`FilingStatus`) REFERENCES `filling_statuses` (`ID`),
  ADD CONSTRAINT `filling_list_ibfk_2` FOREIGN KEY (`IDrecord`) REFERENCES `records` (`ID`);

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
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
