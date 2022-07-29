const { validationResult } = require(`express-validator`);
const fillingListService = require(`./../Services/FillingList.Service`);

class FillingListController {
  async CreateItemFillingList(req, res) {
    const errors = validationResult(req);

    let errMessages = ``;

    if (!errors.isEmpty()) {
      for (let i = 0; i < errors.errors.length; i++) {
        errMessages += `${errors.errors[i].msg} | `;
      }

      return res.status(400).json({
        error: true,
        message: `Ошибка при создании элемента разрешения выдачи топлива. Подробная информация: ${errMessages}`,
      }); // Возвращаем на клиент статус 400 и строку с ошибками валидации данных
    }

    const { Number, Liters, usedLiters, FilingStatus, IDrecord } = req.body;

    const result = await fillingListService.CreateItemFillingList({
      Number,
      Liters,
      usedLiters,
      FilingStatus,
      IDrecord,
    });

    if (result)
      res
        .status(200)
        .json(`Элемент разрешения выдачи топлива "${Number}" создан успешно`);
    else
      res.status(400).json({
        error: true,
        message: `Создать элемент разрешения выдачи топлива "${Number}" не получилось`,
      });
  }

  async getItemsFillingLists(req, res) {
    const result = await fillingListService.getItemsFillingLists();

    res.status(200).json(result);
  }

  async getOneItemFillingList(req, res) {
    const idItemFillingList = req.params.id;

    const result = await fillingListService.getOneItemFillingList(
      idItemFillingList
    );

    if (result === undefined)
      res.status(400).json({
        error: true,
        message: `Элемент разрешения выдачи топлива с ID "${idItemFillingList}" не существует`,
      });
    else res.status(200).json(result);
  }

  async deleteItemFillingList(req, res) {
    const idItemFillingList = req.params.id;

    try {
      const result = await fillingListService.deleteItemFillingList(
        idItemFillingList
      );

      if (result)
        res
          .status(200)
          .json(
            `Элемент разрешения выдачи топлива с ID "${idItemFillingList}" успешно удален`
          );
      else
        res.status(400).json({
          error: true,
          message: `Элемент разрешения выдачи топлива с ID "${idItemFillingList}" удалить не получилось. Проверьте правильно ли указан ID`,
        });
    } catch (err) {
      if (
        err.sqlMessage.indexOf(`Cannot delete or update a parent row`) !== -1
      ) {
        res.status(400).json({
          error: true,
          message: `Элемент разрешения выдачи топлива с ID "${idItemFillingList}" удалить не получилось. Он является родительским. Оригинальное сообщение: "${err.sqlMessage}"`,
        });
      }
    }
  }

  async updateItemFillingList(req, res) {
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

    const { ID, Number, Liters, usedLiters, FilingStatus, IDrecord } = req.body;

    const result = await fillingListService.updateItemFillingList({
      ID,
      Number,
      Liters,
      usedLiters,
      FilingStatus,
      IDrecord,
    });

    if (result)
      res
        .status(200)
        .json(`Элемент разрешения выдачи топлива с ID: "${ID}" обновлен`);
    else
      res
        .status(400)
        .json(
          `Элемент разрешения выдачи топлива с ID "${ID}" обновить не получилось`
        );
  }
}

module.exports = new FillingListController();
