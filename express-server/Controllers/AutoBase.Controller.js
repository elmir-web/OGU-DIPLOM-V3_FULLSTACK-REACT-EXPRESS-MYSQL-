const { validationResult } = require(`express-validator`);
const autoBaseService = require(`./../Services/AutoBase.Service`);

class AutoBaseController {
  async createAutoBase(req, res) {
    const errors = validationResult(req);

    let errMessages = ``;

    if (!errors.isEmpty()) {
      for (let i = 0; i < errors.errors.length; i++) {
        errMessages += `${errors.errors[i].msg} | `;
      }

      return res.status(400).json({
        error: true,
        message: `Ошибка при создании автомобильной базы. Подробная информация: ${errMessages}`,
      }); // Возвращаем на клиент статус 400 и строку с ошибками валидации данных
    }

    const { Name } = req.body;

    const result = await autoBaseService.createAutoBase({ Name });

    if (result)
      res.status(200).json(`Автобаза с названием "${Name}" создана успешно`);
    else
      res.status(400).json({
        error: true,
        message: `Создать автобазу названием "${Name}" не получилось`,
      });
  }

  async getAutoBases(req, res) {
    const result = await autoBaseService.getAutoBases();

    res.status(200).json(result);
  }

  async getOneAutoBase(req, res) {
    const idAutoBase = req.params.id;

    const result = await autoBaseService.getOneAutoBase(idAutoBase);

    if (result.length === 0)
      res.status(400).json({
        error: true,
        message: `Автомобильной базы с ID "${idAutoBase}" не существует`,
      });
    else res.status(200).json(result);
  }

  async deleteAutoBase(req, res) {
    const idAutoBase = req.params.id;

    try {
      const result = await autoBaseService.deleteAutoBase(idAutoBase);

      if (result)
        res
          .status(200)
          .json(`Автомобильная база с ID "${idAutoBase}" успешно удалена`);
      else
        res.status(400).json({
          error: true,
          message: `Автомобильную базу с ID "${idAutoBase}" удалить не получилось. Проверьте правильно ли указан ID`,
        });
    } catch (err) {
      if (
        err.sqlMessage.indexOf(`Cannot delete or update a parent row`) !== -1
      ) {
        res.status(400).json({
          error: true,
          message: `Автомобильную базу с ID "${idAutoBase}" удалить не получилось. Она является родительской. Оригинальное сообщение: "${err.sqlMessage}"`,
        });
      }
    }
  }

  async updateAutoBase(req, res) {
    const errors = validationResult(req);

    let errMessages = ``;

    if (!errors.isEmpty()) {
      for (let i = 0; i < errors.errors.length; i++) {
        errMessages += `${errors.errors[i].msg} | `;
      }

      return res.status(400).json({
        error: true,
        message: `Ошибка при измении автомобильной базы. Подробная информация: ${errMessages}`,
      }); // Возвращаем на клиент статус 400 и строку с ошибками валидации данных
    }

    const { ID, Name } = req.body;

    const result = await autoBaseService.updateAutoBase({ ID, Name });

    if (result)
      res
        .status(200)
        .json(`Автобаза с ID: "${ID}" изменила название на "${Name}"`);
    else
      res.status(400).json(`Переименовать автобазу с ID "${ID}" не получилось`);
  }
}

module.exports = new AutoBaseController();
