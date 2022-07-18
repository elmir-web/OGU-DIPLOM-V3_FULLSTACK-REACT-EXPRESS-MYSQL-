const { validationResult } = require(`express-validator`);
const accountService = require("./../Services/Account.Service");

class AccountController {
  async authAccount(req, res) {
    const errors = validationResult(req); // Получаем массив ошибок валидации данных

    let errMessages = ``; // Создаем временную переменную для возврата на клиент ошибок валидации данных в удобном в будущем виде

    // Если массив ошибок валидации данных не пустой
    if (!errors.isEmpty()) {
      // Бегаем по массиву ошибок валидации данных
      for (let i = 0; i < errors.errors.length; i++) {
        errMessages += `${errors.errors[i].msg} | `; // Прибавляем их в переменную
      }

      return res
        .status(400)
        .json(`Ошибка при авторизации. Подробная информация: ${errMessages}`); // Возвращаем на клиент статус 400 и строку с ошибками валидации данных
    }

    const { LoginUser, PasswordUser } = req.body;

    const result = await accountService.authAccount({
      LoginUser,
      PasswordUser,
    });

    if (result?.error === true) res.status(400).json(result.message);
    else res.status(200).json(result);
  }

  async getMyData(req, res) {
    res.status(200).json(await accountService.getMyData(req.userData.ID));
  }

  async createAccount(req, res) {
    const errors = validationResult(req);

    let errMessages = ``;

    if (!errors.isEmpty()) {
      for (let i = 0; i < errors.errors.length; i++) {
        errMessages += `${errors.errors[i].msg} | `;
      }

      return res.status(400).json({
        error: true,
        message: `Ошибка при создании сотрудника. Подробная информация: ${errMessages}`,
      }); // Возвращаем на клиент статус 400 и строку с ошибками валидации данных
    }

    const {
      SurName,
      Name,
      MiddleName,
      LoginUser,
      PasswordUser,
      IDautobases,
      IDposition,
    } = req.body;

    const result = await accountService.createAccount({
      SurName,
      Name,
      MiddleName,
      LoginUser,
      PasswordUser,
      IDautobases,
      IDposition,
    });

    if (result.error === true) res.status(400).json(result.message);
    else res.status(200).json(result.message);
  }

  async getAccounts(req, res) {
    const result = await accountService.getAccounts();

    res.status(200).json(result);
  }

  async getOneAccount(req, res) {
    const idAccount = req.params.id;

    const result = await accountService.getOneAccount(idAccount);

    if (result === undefined)
      res.status(400).json({
        error: true,
        message: `Аккаунта с ID "${idAccount}" не существует`,
      });
    else res.status(200).json(result);
  }

  async deleteAccount(req, res) {
    const idAccount = req.params.id;

    try {
      const result = await accountService.deleteAccount(idAccount);

      if (result)
        res.status(200).json(`Аккаунт с ID "${idAccount}" успешно удален`);
      else
        res.status(400).json({
          error: true,
          message: `Аккаунт с ID "${idAccount}" удалить не получилось. Проверьте правильно ли указан ID`,
        });
    } catch (err) {
      if (
        err.sqlMessage.indexOf(`Cannot delete or update a parent row`) !== -1
      ) {
        res.status(400).json({
          error: true,
          message: `Аккаунт с ID "${idAccount}" удалить не получилось. Он является родительским. Оригинальное сообщение: "${err.sqlMessage}"`,
        });
      }
    }
  }

  async updateAccount(req, res) {
    const errors = validationResult(req);

    let errMessages = ``;

    if (!errors.isEmpty()) {
      for (let i = 0; i < errors.errors.length; i++) {
        errMessages += `${errors.errors[i].msg} | `;
      }

      return res.status(400).json({
        error: true,
        message: `Ошибка при создании сотрудника. Подробная информация: ${errMessages}`,
      }); // Возвращаем на клиент статус 400 и строку с ошибками валидации данных
    }

    const {
      ID,
      SurName,
      Name,
      MiddleName,
      LoginUser,
      PasswordUser,
      IDautobases,
      IDposition,
    } = req.body;

    const result = await accountService.updateAccount({
      ID,
      SurName,
      Name,
      MiddleName,
      LoginUser,
      PasswordUser,
      IDautobases,
      IDposition,
    });

    if (result) res.status(200).json(`Аккаунт с ID: "${ID}" успешно обновлен`);
    else res.status(400).json(`Аккаунт с ID "${ID}" не получилось обновить`);
  }
}

module.exports = new AccountController();
