const { validationResult } = require(`express-validator`);
const positionService = require(`./../Services/Position.Service`);

class PositionController {
  async createPosition(req, res) {
    const errors = validationResult(req);

    let errMessages = ``;

    if (!errors.isEmpty()) {
      for (let i = 0; i < errors.errors.length; i++) {
        errMessages += `${errors.errors[i].msg} | `;
      }

      return res.status(400).json({
        error: true,
        message: `Ошибка при создании должности. Подробная информация: ${errMessages}`,
      }); // Возвращаем на клиент статус 400 и строку с ошибками валидации данных
    }

    const { Name } = req.body;

    const result = await positionService.createPosition({ Name });

    if (result)
      res.status(200).json(`Должность с названием "${Name}" создана успешно`);
    else
      res.status(400).json({
        error: true,
        message: `Создать должность названием "${Name}" не получилось`,
      });
  }

  async getPositions(req, res) {
    const result = await positionService.getPositions();

    res.status(200).json(result);
  }

  async getOnePosition(req, res) {
    const idPosition = req.params.id;

    const result = await positionService.getOnePosition(idPosition);

    if (result === undefined)
      res.status(400).json({
        error: true,
        message: `Должности с ID "${idPosition}" не существует`,
      });
    else res.status(200).json(result);
  }

  async deletePosition(req, res) {
    const idPosition = req.params.id;

    try {
      const result = await positionService.deletePosition(idPosition);

      if (result)
        res.status(200).json(`Должность с ID "${idPosition}" успешно удалена`);
      else
        res.status(400).json({
          error: true,
          message: `Должность с ID "${idPosition}" удалить не получилось. Проверьте правильно ли указан ID`,
        });
    } catch (err) {
      if (
        err.sqlMessage.indexOf(`Cannot delete or update a parent row`) !== -1
      ) {
        res.status(400).json({
          error: true,
          message: `Должность с ID "${idPosition}" удалить не получилось. Она является родительской. Оригинальное сообщение: "${err.sqlMessage}"`,
        });
      }
    }
  }

  async updatePosition(req, res) {
    const errors = validationResult(req);

    let errMessages = ``;

    if (!errors.isEmpty()) {
      for (let i = 0; i < errors.errors.length; i++) {
        errMessages += `${errors.errors[i].msg} | `;
      }

      return res.status(400).json({
        error: true,
        message: `Ошибка при измении должности. Подробная информация: ${errMessages}`,
      }); // Возвращаем на клиент статус 400 и строку с ошибками валидации данных
    }

    const { ID, Name } = req.body;

    const result = await positionService.updatePosition({ ID, Name });

    if (result)
      res
        .status(200)
        .json(`Должность с ID: "${ID}" изменила название на "${Name}"`);
    else
      res
        .status(400)
        .json(`Переименовать должность с ID "${ID}" не получилось`);
  }
}

module.exports = new PositionController();
