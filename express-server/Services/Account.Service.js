const axios = require(`axios`);

const {
  SERVER_WORKING_ON_ADRESS,
  SERVER_START_ON_PORT,
} = require(`./../ServerConfig.json`);

class AccountService {
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
      let [rowsCheckWorkerAccount] = await global.connectMySQL.execute(
        `SELECT * FROM workers WHERE LoginUser = '${LoginUser}'` // Отправляем запрос на наличие такого аккаунта
      );

      if (rowsCheckWorkerAccount.length > 0) {
        return {
          error: true,
          message: `Ошибка: Такой аккаунт уже существует!`,
        };
      }

      let [rowsCreateWorker] = await global.connectMySQL.execute(
        `INSERT INTO workers (SurName, Name, MiddleName, LoginUser, PasswordUser, IDautobases, IDposition) VALUES ('${SurName}', '${Name}', '${MiddleName}', '${LoginUser}', '${PasswordUser}', '${IDautobases}', '${IDposition}')`
      );

      if (rowsCreateWorker["affectedRows"])
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
      `${SERVER_WORKING_ON_ADRESS}:${SERVER_START_ON_PORT}/api/auto-base/get/${rowsAllAccounts[0].IDautobases}`
    );

    rowsAllAccounts[0].IDautobases = getAutoBaseWorker.data;

    const getPositionsWorker = await axios.get(
      `${SERVER_WORKING_ON_ADRESS}:${SERVER_START_ON_PORT}/api/position/get/${rowsAllAccounts[0].IDposition}`
    );

    rowsAllAccounts[0].IDposition = getPositionsWorker.data;

    return rowsAllAccounts[0];
  }

  async deleteAccount(id) {
    let [rowsDeletedAccount] = await global.connectMySQL.execute(
      `DELETE FROM workers WHERE ID = ${id}`
    );

    if (rowsDeletedAccount["affectedRows"]) return true;
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

    if (rowsUpdatedAccount["affectedRows"]) return true;
    else return false;
  }
}

module.exports = new AccountService();
