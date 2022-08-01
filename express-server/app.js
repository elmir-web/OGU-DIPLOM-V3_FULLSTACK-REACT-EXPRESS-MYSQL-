// __________________________________________________ ИМПОРТЫ
const express = require(`express`);
const mysql = require(`mysql2/promise`);
const cors = require(`cors`);

const {
  SERVER_START_ON_PORT,
  SERVER_MYSQL_SETTINGS,
} = require(`./ServerConfig.json`);

const autoBaseRouter = require(`./Routes/AutoBase.Router`);
const positionRouter = require(`./Routes/Position.Router`);
const accountRouter = require(`./Routes/Account.Router`);
const recordStatusRouter = require(`./Routes/RecordStatus.Router`);
const typesGSMRouter = require(`./Routes/TypeGSM.Router`);
const storeHouseRouter = require(`./Routes/StoreHouse.Router`);
const vehicleRouter = require(`./Routes/Vehicle.Router`);
const recordRouter = require(`./Routes/Record.Router`);
const FillingListRouter = require(`./Routes/FillingList.Router`);
const vehicleWork = require(`./Routes/VehicleWork.Router`);

// __________________________________________________ ОБЪЕКТЫ
const app = express();

// __________________________________________________ ЗАПУСК СЕРВЕРА
const startThisApp = async () => {
  try {
    global.connectMySQL = await mysql.createPool(SERVER_MYSQL_SETTINGS);

    const [checkConnect] = await global.connectMySQL.execute(
      `SELECT * FROM check_connect LIMIT 0 , 30`
    );

    if (checkConnect[0][`status-connect`] === 1) {
      app.listen(SERVER_START_ON_PORT, () => {
        console.log(
          `Приложение Express JS запущено на порту "${SERVER_START_ON_PORT}" и подключение к СуБД MySQL успешно.`
        );
      });
    } else {
      throw `
      Проверьте данные для подключения к СуБД MySQL
      Возможно, данные подключения к СуБД MySQL неверные.
      Эти данные находятся в файле "ServerConfig.json" в корне проекта.
      Проверьте, чтобы в таблице "check-connect", единственно существующее свойство "status-connect" было в значении "1".
      Сейчас это значение
      `;
    }
  } catch (err) {
    console.log(
      `________________________________________________________________________________________________________________________`
    );
    console.log(`Ошибка подключения к СуБД MySQL!`);
    console.log(`SQL запрос: ${global.checkSQL}`);
    console.log(`Конфиг подключения к СуБД MySQL:`);
    console.log(SERVER_MYSQL_SETTINGS);
    console.log(`Информация о ошибке:`);
    console.log(err);
    console.log(
      `________________________________________________________________________________________________________________________`
    );
  }
};

startThisApp();

// __________________________________________________ НАСТРОЙКА
app.use(cors());
app.use(express.json());

// __________________________________________________ РОУТИНГ API
app.use(`/api`, autoBaseRouter); // Автомобильные базы
app.use(`/api`, positionRouter); // Должности
app.use(`/api`, accountRouter); // Аккаунты сотрудников | API: http(s)://адрес.порт/account
app.use(`/api`, recordStatusRouter); // Статусы путевого листа
app.use(`/api`, typesGSMRouter); // Все виды ГСМ
app.use(`/api`, storeHouseRouter); // Склад
app.use(`/api`, vehicleRouter); // Транспорт
app.use(`/api`, recordRouter); // Путевые листы
app.use(`/api`, FillingListRouter); // Заправочные ведомости
app.use(`/api`, vehicleWork);
