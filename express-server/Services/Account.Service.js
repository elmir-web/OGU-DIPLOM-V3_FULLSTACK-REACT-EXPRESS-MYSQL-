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
  }

  async getAccounts() {
    const [rowsAllAccounts] = await global.connectMySQL.execute(
      `SELECT * FROM workers`
    );

    return rowsAllAccounts;
  }

  async getOneAccount(id) {
    const [rowsAllAccounts] = await global.connectMySQL.execute(
      `SELECT * FROM workers WHERE ID = ${id}`
    );

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
