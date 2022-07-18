const axios = require(`axios`);
const jwt = require("jsonwebtoken");

const {
  SERVER_WORKING_ON_ADRESS,
  SERVER_START_ON_PORT,
  SERVER_SECRET_KEY,
} = require(`./../ServerConfig.json`);

function generateAccessToken(payload) {
  payload.IDposition = payload.IDposition.ID;

  return jwt.sign(payload, SERVER_SECRET_KEY, { expiresIn: "24h" }); // Возвращаем созданный на основании payload, секретного ключа токен который будет жить 24 часа
}

class AccountService {
  async authAccount({ LoginUser, PasswordUser }) {
    try {
      const [rowsCheckWorkerAccount] = await global.connectMySQL.execute(
        `SELECT * FROM workers WHERE LoginUser = '${LoginUser}'` // Отправляем запрос о наличии аккаунта
      );

      if (!rowsCheckWorkerAccount.length) {
        return {
          error: true,
          message: `Аккаунта с логином ${LoginUser} не существует.`,
        };
      }

      if (rowsCheckWorkerAccount[0].PasswordUser !== PasswordUser) {
        return {
          error: true,
          message: `Пароль от аккаунта введен не правильно.`,
        };
      }

      rowsCheckWorkerAccount[0] = await axios.get(
        `${SERVER_WORKING_ON_ADRESS}:${SERVER_START_ON_PORT}/api/account/get/${rowsCheckWorkerAccount[0].ID}`,
        {
          headers: {
            Authorization: `Bearer system.system.system`,
          },
        }
      );

      rowsCheckWorkerAccount[0] = rowsCheckWorkerAccount[0].data;

      const token = generateAccessToken({
        ID: rowsCheckWorkerAccount[0].ID, // Передаем на нее ID аккаунта
        LoginUser: rowsCheckWorkerAccount[0].LoginUser, // Логин
        PasswordUser: rowsCheckWorkerAccount[0].PasswordUser, // Пароль
        IDposition: rowsCheckWorkerAccount[0].IDposition, // ID должности
      });

      return {
        error: false,
        JWT: token,
        message: `Аккаунт успешно авторизован!`,
        account: rowsCheckWorkerAccount[0],
      };
    } catch (errorObject) {
      console.log(errorObject);

      return {
        error: true,
        message: `Ошибка авторизации аккаунта!`,
        errorObject: errorObject,
      };
    }
  }

  async getMyData(id) {
    const getWorker = await axios.get(
      `${SERVER_WORKING_ON_ADRESS}:${SERVER_START_ON_PORT}/api/account/get/${id}`
    );

    return getWorker.data;
  }

  async createAccount({
    SurName,
    Name,
    MiddleName,
    LoginUser,
    PasswordUser,
    IDautobases,
    IDposition,
  }) {
    try {
      const [rowsCheckWorkerAccount] = await global.connectMySQL.execute(
        `SELECT * FROM workers WHERE LoginUser = '${LoginUser}'` // Отправляем запрос на наличие такого аккаунта
      );

      if (rowsCheckWorkerAccount.length > 0) {
        return {
          error: true,
          message: `Ошибка: Такой аккаунт уже существует!`,
        };
      }

      const [rowsCreateWorker] = await global.connectMySQL.execute(
        `INSERT INTO workers (SurName, Name, MiddleName, LoginUser, PasswordUser, IDautobases, IDposition) VALUES ('${SurName}', '${Name}', '${MiddleName}', '${LoginUser}', '${PasswordUser}', '${IDautobases}', '${IDposition}')`
      );

      if (rowsCreateWorker[`affectedRows`])
        return {
          error: false,
          message: `Аккаунт успешно создан!`,
        };
      else
        return {
          error: false,
          message: `Аккаунт успешно создан!`,
        };
    } catch (err) {
      return false;
    }
  }

  async getAccounts() {
    const [rowsAllAccounts] = await global.connectMySQL.execute(
      `SELECT * FROM workers`
    );

    for (let i = 0; i < rowsAllAccounts.length; i++) {
      const getAutoBaseWorker = await axios.get(
        `${SERVER_WORKING_ON_ADRESS}:${SERVER_START_ON_PORT}/api/auto-base/get/${rowsAllAccounts[i].IDautobases}`
      );

      rowsAllAccounts[i].IDautobases = getAutoBaseWorker.data;

      const getPositionsWorker = await axios.get(
        `${SERVER_WORKING_ON_ADRESS}:${SERVER_START_ON_PORT}/api/position/get/${rowsAllAccounts[i].IDposition}`
      );

      rowsAllAccounts[i].IDposition = getPositionsWorker.data;
    }

    return rowsAllAccounts;
  }

  async getOneAccount(id) {
    const [rowsAllAccounts] = await global.connectMySQL.execute(
      `SELECT * FROM workers WHERE ID = ${id}`
    );

    const getAutoBaseWorker = await axios.get(
      `${SERVER_WORKING_ON_ADRESS}:${SERVER_START_ON_PORT}/api/auto-base/get/${rowsAllAccounts[0].IDautobases}`,
      {
        headers: {
          Authorization: `Bearer system.system.system`,
        },
      }
    );

    rowsAllAccounts[0].IDautobases = getAutoBaseWorker.data;

    const getPositionsWorker = await axios.get(
      `${SERVER_WORKING_ON_ADRESS}:${SERVER_START_ON_PORT}/api/position/get/${rowsAllAccounts[0].IDposition}`,
      {
        headers: {
          Authorization: `Bearer system.system.system`,
        },
      }
    );

    rowsAllAccounts[0].IDposition = getPositionsWorker.data;

    return rowsAllAccounts[0];
  }

  async deleteAccount(id) {
    const [rowsDeletedAccount] = await global.connectMySQL.execute(
      `DELETE FROM workers WHERE ID = ${id}`
    );

    if (rowsDeletedAccount[`affectedRows`]) return true;
    else return false;
  }

  async updateAccount({
    ID,
    SurName,
    Name,
    MiddleName,
    LoginUser,
    PasswordUser,
    IDautobases,
    IDposition,
  }) {
    const [rowsUpdatedAccount] = await global.connectMySQL.execute(
      `UPDATE workers SET SurName = '${SurName}', Name = '${Name}', MiddleName = '${MiddleName}', LoginUser = '${LoginUser}', PasswordUser = '${PasswordUser}', IDautobases = '${IDautobases}', IDposition = '${IDposition}' WHERE ID = ${ID}`
    );

    if (rowsUpdatedAccount[`affectedRows`]) return true;
    else return false;
  }
}

module.exports = new AccountService();
