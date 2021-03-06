const { validationResult } = require(`express-validator`);
const RecordService = require(`./../Services/Record.Service`);

class RecordController {
  async createRecord(req, res) {
    const errors = validationResult(req);

    let errMessages = ``;

    if (!errors.isEmpty()) {
      for (let i = 0; i < errors.errors.length; i++) {
        errMessages += `${errors.errors[i].msg} | `;
      }

      return res.status(400).json({
        error: true,
        message: `Ошибка при создании путевого листа. Подробная информация: ${errMessages}`,
      }); // Возвращаем на клиент статус 400 и строку с ошибками валидации данных
    }

    const {
      Number,
      RecordStatus,
      DateOpen,
      DateClose,
      KilometrsOpen,
      KilometrsClose,
      UsedLiters,
      IDvehicle,
      IDtypegsm,
      IDsigner,
      IDdriver,
      IDautobase,
    } = req.body;

    const result = await RecordService.createRecord({
      Number,
      RecordStatus,
      DateOpen,
      DateClose,
      KilometrsOpen,
      KilometrsClose,
      UsedLiters,
      IDvehicle,
      IDtypegsm,
      IDsigner,
      IDdriver,
      IDautobase,
    });

    if (result) res.status(200).json(`Путевой лист создан успешно`);
    else
      res.status(400).json({
        error: true,
        message: `Создать путевой лист не получилось`,
      });
  }

  async getRecords(req, res) {
    const result = await RecordService.getRecords();

    res.status(200).json(result);
  }

  async getOneRecord(req, res) {
    const idRecord = req.params.id;

    const result = await RecordService.getOneRecord(idRecord);

    if (result === undefined)
      res.status(400).json({
        error: true,
        message: `Путевой лист с ID "${idRecord}" не существует`,
      });
    else res.status(200).json(result);
  }

  async deleteRecord(req, res) {
    const idRecord = req.params.id;

    try {
      const result = await RecordService.deleteRecord(idRecord);

      if (result)
        res.status(200).json(`Путевой лист с ID "${idRecord}" успешно удален`);
      else
        res.status(400).json({
          error: true,
          message: `Путевой лист с ID "${idRecord}" удалить не получилось. Проверьте правильно ли указан ID`,
        });
    } catch (err) {
      if (
        err.sqlMessage.indexOf(`Cannot delete or update a parent row`) !== -1
      ) {
        res.status(400).json({
          error: true,
          message: `Путевой лист с ID "${idRecord}" удалить не получилось. Он является родительским. Оригинальное сообщение: "${err.sqlMessage}"`,
        });
      }
    }
  }

  async updateRecord(req, res) {
    const errors = validationResult(req);

    let errMessages = ``;

    if (!errors.isEmpty()) {
      for (let i = 0; i < errors.errors.length; i++) {
        errMessages += `${errors.errors[i].msg} | `;
      }

      return res.status(400).json({
        error: true,
        message: `Ошибка при измении путевого листа. Подробная информация: ${errMessages}`,
      }); // Возвращаем на клиент статус 400 и строку с ошибками валидации данных
    }

    const {
      ID,
      Number,
      RecordStatus,
      DateOpen,
      DateClose,
      KilometrsOpen,
      KilometrsClose,
      UsedLiters,
      IDvehicle,
      IDtypegsm,
      IDsigner,
      IDdriver,
      IDautobase,
    } = req.body;

    const result = await RecordService.updateRecord({
      ID,
      Number,
      RecordStatus,
      DateOpen,
      DateClose,
      KilometrsOpen,
      KilometrsClose,
      UsedLiters,
      IDvehicle,
      IDtypegsm,
      IDsigner,
      IDdriver,
      IDautobase,
    });

    if (result) res.status(200).json(`Путевой лист ID: "${ID}" обновлен`);
    else
      res.status(400).json(`Обновить путевой лист с ID "${ID}" не получилось`);
  }
}

module.exports = new RecordController();
