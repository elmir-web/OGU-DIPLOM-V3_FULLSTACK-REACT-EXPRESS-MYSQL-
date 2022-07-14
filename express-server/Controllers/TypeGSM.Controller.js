const { validationResult } = require(`express-validator`);
const typeGSMService = require(`./../Services/TypeGSM.Service`);

class TypeGSMController {
  async createTypeGSM(req, res) {
    const errors = validationResult(req);

    let errMessages = ``;

    if (!errors.isEmpty()) {
      for (let i = 0; i < errors.errors.length; i++) {
        errMessages += `${errors.errors[i].msg} | `;
      }

      return res.status(400).json({
        error: true,
        message: `Ошибка при создании типа ГСМ. Подробная информация: ${errMessages}`,
      }); // Возвращаем на клиент статус 400 и строку с ошибками валидации данных
    }

    const { Name, ForKilo } = req.body;

    const result = await typeGSMService.createTypeGSM({ Name, ForKilo });

    if (result)
      res.status(200).json(`Тип ГСМ с названием "${Name}" создан успешно`);
    else
      res.status(400).json({
        error: true,
        message: `Создать тип ГСМ названием "${Name}" не получилось`,
      });
  }

  async getTypesGSM(req, res) {
    const result = await typeGSMService.getTypesGSM();

    res.status(200).json(result);
  }

  async getOneTypeGSM(req, res) {
    const idTypeGSM = req.params.id;

    const result = await typeGSMService.getOneTypeGSM(idTypeGSM);

    if (result === undefined)
      res.status(400).json({
        error: true,
        message: `Тип ГСМ с ID "${idTypeGSM}" не существует`,
      });
    else res.status(200).json(result);
  }

  async deleteTypeGSM(req, res) {
    const idTypeGSM = req.params.id;

    try {
      const result = await typeGSMService.deleteTypeGSM(idTypeGSM);

      if (result)
        res.status(200).json(`Тип ГСМ с ID "${idTypeGSM}" успешно удален`);
      else
        res.status(400).json({
          error: true,
          message: `Тип ГСМ с ID "${idTypeGSM}" удалить не получилось. Проверьте правильно ли указан ID`,
        });
    } catch (err) {
      if (
        err.sqlMessage.indexOf(`Cannot delete or update a parent row`) !== -1
      ) {
        res.status(400).json({
          error: true,
          message: `Тип ГСМ с ID "${idTypeGSM}" удалить не получилось. Он является родительским. Оригинальное сообщение: "${err.sqlMessage}"`,
        });
      }
    }
  }

  async updateTypeGSM(req, res) {
    const errors = validationResult(req);

    let errMessages = ``;

    if (!errors.isEmpty()) {
      for (let i = 0; i < errors.errors.length; i++) {
        errMessages += `${errors.errors[i].msg} | `;
      }

      return res.status(400).json({
        error: true,
        message: `Ошибка при измении типа ГСМ. Подробная информация: ${errMessages}`,
      }); // Возвращаем на клиент статус 400 и строку с ошибками валидации данных
    }

    const { ID, Name, ForKilo } = req.body;

    const result = await typeGSMService.updateTypeGSM({ ID, Name, ForKilo });

    if (result) res.status(200).json(`Тип ГСМ с ID: "${ID}" обновлен`);
    else res.status(400).json(`Обновить тип ГСМ с ID "${ID}" не получилось`);
  }
}

module.exports = new TypeGSMController();
