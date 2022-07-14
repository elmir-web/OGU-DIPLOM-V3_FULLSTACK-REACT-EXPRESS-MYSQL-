const { validationResult } = require(`express-validator`);
const recordStatusService = require(`./../Services/RecordStatus.Service`);

class RecordStatusController {
  async createRecordStatus(req, res) {
    const errors = validationResult(req);

    let errMessages = ``;

    if (!errors.isEmpty()) {
      for (let i = 0; i < errors.errors.length; i++) {
        errMessages += `${errors.errors[i].msg} | `;
      }

      return res.status(400).json({
        error: true,
        message: `Ошибка при создании статуса путевого листа. Подробная информация: ${errMessages}`,
      }); // Возвращаем на клиент статус 400 и строку с ошибками валидации данных
    }

    const { Name } = req.body;

    const result = await recordStatusService.createRecordStatus({ Name });

    if (result)
      res
        .status(200)
        .json(`Статус путевого листа с названием "${Name}" создана успешно`);
    else
      res.status(400).json({
        error: true,
        message: `Создать статус путевого листа названием "${Name}" не получилось`,
      });
  }

  async getRecordStatuses(req, res) {
    const result = await recordStatusService.getRecordStatuses();

    res.status(200).json(result);
  }

  async getOneRecordStatus(req, res) {
    const idRecordStatus = req.params.id;

    const result = await recordStatusService.getOneRecordStatus(idRecordStatus);

    if (result === undefined)
      res.status(400).json({
        error: true,
        message: `Статуса путевого листа с ID "${idRecordStatus}" не существует`,
      });
    else res.status(200).json(result);
  }

  async deleteRecordStatus(req, res) {
    const idRecordStatus = req.params.id;

    try {
      const result = await recordStatusService.deleteRecordStatus(
        idRecordStatus
      );

      if (result)
        res
          .status(200)
          .json(
            `Статус путевого листа с ID "${idRecordStatus}" успешно удален`
          );
      else
        res.status(400).json({
          error: true,
          message: `Статус путевого листа с ID "${idRecordStatus}" удалить не получилось. Проверьте правильно ли указан ID`,
        });
    } catch (err) {
      if (
        err.sqlMessage.indexOf(`Cannot delete or update a parent row`) !== -1
      ) {
        res.status(400).json({
          error: true,
          message: `Статус путевого листа с ID "${idRecordStatus}" удалить не получилось. Он является родительским. Оригинальное сообщение: "${err.sqlMessage}"`,
        });
      }
    }
  }

  async updateRecordStatus(req, res) {
    const errors = validationResult(req);

    let errMessages = ``;

    if (!errors.isEmpty()) {
      for (let i = 0; i < errors.errors.length; i++) {
        errMessages += `${errors.errors[i].msg} | `;
      }

      return res.status(400).json({
        error: true,
        message: `Ошибка при измении статуса путевого листа. Подробная информация: ${errMessages}`,
      }); // Возвращаем на клиент статус 400 и строку с ошибками валидации данных
    }

    const { ID, Name } = req.body;

    const result = await recordStatusService.updateRecordStatus({ ID, Name });

    if (result)
      res
        .status(200)
        .json(
          `Статус путевого листа ID: "${ID}" изменила название на "${Name}"`
        );
    else
      res
        .status(400)
        .json(`Переименовать статус путевого листа с ID "${ID}" не получилось`);
  }
}

module.exports = new RecordStatusController();
