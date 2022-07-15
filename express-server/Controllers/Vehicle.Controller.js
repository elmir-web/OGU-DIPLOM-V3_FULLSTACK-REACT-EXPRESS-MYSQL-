const { validationResult } = require(`express-validator`);
const vehicleService = require(`../Services/Vehicle.Service`);

class TypeGSMController {
  async createVehicle(req, res) {
    const errors = validationResult(req);

    let errMessages = ``;

    if (!errors.isEmpty()) {
      for (let i = 0; i < errors.errors.length; i++) {
        errMessages += `${errors.errors[i].msg} | `;
      }

      return res.status(400).json({
        error: true,
        message: `Ошибка при создании транспорта. Подробная информация: ${errMessages}`,
      }); // Возвращаем на клиент статус 400 и строку с ошибками валидации данных
    }

    const { Model, Number, IDautobase, IDtypegsm, Kilometrs, Liters, Expense } =
      req.body;

    const result = await vehicleService.createVehicle({
      Model,
      Number,
      IDautobase,
      IDtypegsm,
      Kilometrs,
      Liters,
      Expense,
    });

    if (result) res.status(200).json(`Транспорт создан успешно`);
    else
      res.status(400).json({
        error: true,
        message: `Создать транспорт не получилось`,
      });
  }

  async getVehicles(req, res) {
    const result = await vehicleService.getVehicles();

    res.status(200).json(result);
  }

  async getOneVehicle(req, res) {
    const idVehicle = req.params.id;

    const result = await vehicleService.getOneVehicle(idVehicle);

    if (result === undefined)
      res.status(400).json({
        error: true,
        message: `Транспорт с ID "${idVehicle}" не существует`,
      });
    else res.status(200).json(result);
  }

  async deleteVehicle(req, res) {
    const idVehicle = req.params.id;

    try {
      const result = await vehicleService.deleteVehicle(idVehicle);

      if (result)
        res.status(200).json(`Транспорт с ID "${idVehicle}" успешно удален`);
      else
        res.status(400).json({
          error: true,
          message: `Транспорт с ID "${idVehicle}" удалить не получилось. Проверьте правильно ли указан ID`,
        });
    } catch (err) {
      if (
        err.sqlMessage.indexOf(`Cannot delete or update a parent row`) !== -1
      ) {
        res.status(400).json({
          error: true,
          message: `Транспорт с ID "${idVehicle}" удалить не получилось. Он является родительским. Оригинальное сообщение: "${err.sqlMessage}"`,
        });
      }
    }
  }

  async updateVehicle(req, res) {
    const errors = validationResult(req);

    let errMessages = ``;

    if (!errors.isEmpty()) {
      for (let i = 0; i < errors.errors.length; i++) {
        errMessages += `${errors.errors[i].msg} | `;
      }

      return res.status(400).json({
        error: true,
        message: `Ошибка при измении транспорта. Подробная информация: ${errMessages}`,
      }); // Возвращаем на клиент статус 400 и строку с ошибками валидации данных
    }

    const {
      ID,
      Model,
      Number,
      IDautobase,
      IDtypegsm,
      Kilometrs,
      Liters,
      Expense,
    } = req.body;

    const result = await vehicleService.updateVehicle({
      ID,
      Model,
      Number,
      IDautobase,
      IDtypegsm,
      Kilometrs,
      Liters,
      Expense,
    });

    if (result) res.status(200).json(`Транспорт с ID: "${ID}" обновлен`);
    else res.status(400).json(`Обновить транспорт с ID "${ID}" не получилось`);
  }
}

module.exports = new TypeGSMController();
