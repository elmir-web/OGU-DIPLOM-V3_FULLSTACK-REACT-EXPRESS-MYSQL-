const { validationResult } = require(`express-validator`);
const storeHouseService = require(`./../Services/StoreHouse.Service`);

class TypeGSMController {
  async createStoreHouse(req, res) {
    const errors = validationResult(req);

    let errMessages = ``;

    if (!errors.isEmpty()) {
      for (let i = 0; i < errors.errors.length; i++) {
        errMessages += `${errors.errors[i].msg} | `;
      }
      return res.status(400).json({
        error: true,
        message: `Ошибка при создании элемента склада. Подробная информация: ${errMessages}`,
      }); // Возвращаем на клиент статус 400 и строку с ошибками валидации данных
    }

    const { IDtypegsm, Liters } = req.body;

    const result = await storeHouseService.createStoreHouse({
      IDtypegsm,
      Liters,
    });

    if (result) res.status(200).json(`Элемент склада создан успешно`);
    else
      res.status(400).json({
        error: true,
        message: `Создать элемент склада не получилось`,
      });
  }

  async getItemsStoreHouse(req, res) {
    const result = await storeHouseService.getItemsStoreHouse();

    res.status(200).json(result);
  }

  async getOneItemStoreHouse(req, res) {
    const idItemStoreHouse = req.params.id;

    const result = await storeHouseService.getOneItemStoreHouse(
      idItemStoreHouse
    );

    if (result === undefined)
      res.status(400).json({
        error: true,
        message: `Элемент склада с ID "${idItemStoreHouse}" не существует`,
      });
    else res.status(200).json(result);
  }

  async deleteStoreHouse(req, res) {
    const idItemStoreHouse = req.params.id;

    try {
      const result = await storeHouseService.deleteStoreHouse(idItemStoreHouse);

      if (result)
        res
          .status(200)
          .json(`Элемент склада с ID "${idItemStoreHouse}" успешно удален`);
      else
        res.status(400).json({
          error: true,
          message: `Элемент склада ID "${idItemStoreHouse}" удалить не получилось. Проверьте правильно ли указан ID`,
        });
    } catch (err) {
      if (
        err.sqlMessage.indexOf(`Cannot delete or update a parent row`) !== -1
      ) {
        res.status(400).json({
          error: true,
          message: `Элемент склада с ID "${idItemStoreHouse}" удалить не получилось. Он является родительским. Оригинальное сообщение: "${err.sqlMessage}"`,
        });
      }
    }
  }

  async updateStoreHouse(req, res) {
    const errors = validationResult(req);

    let errMessages = ``;

    if (!errors.isEmpty()) {
      for (let i = 0; i < errors.errors.length; i++) {
        errMessages += `${errors.errors[i].msg} | `;
      }

      return res.status(400).json({
        error: true,
        message: `Ошибка при измении элемента склада. Подробная информация: ${errMessages}`,
      }); // Возвращаем на клиент статус 400 и строку с ошибками валидации данных
    }

    const { ID, IDtypegsm, Liters } = req.body;

    const result = await storeHouseService.updateStoreHouse({
      ID,
      IDtypegsm,
      Liters,
    });

    if (result) res.status(200).json(`Элемент склада с ID: "${ID}" обновлен`);
    else
      res
        .status(400)
        .json(`Обновить элемент склада с ID "${ID}" не получилось`);
  }
}

module.exports = new TypeGSMController();
