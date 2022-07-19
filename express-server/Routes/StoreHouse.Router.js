const Router = require(`express`);
const { check } = require(`express-validator`);

const roleMiddleware = require(`./../Middlewares/Role.Middleware`);

const storeHouseController = require(`./../Controllers/StoreHouse.Controller`);

const router = new Router();

router.post(
  `/item-storehouse/create`,
  [
    roleMiddleware(["Суперадмин", "Подписант"]),

    check(`IDtypegsm`, `Это значение должно быть числом`).isInt(),

    check(`Liters`, `Это значение должно быть числом`).isFloat(),
  ],
  storeHouseController.createStoreHouse
);

router.get(
  `/items-storehouse/get`,
  roleMiddleware(["Суперадмин", "Подписант"]),
  storeHouseController.getItemsStoreHouse
);

router.get(
  `/item-storehouse/get/:id`,
  roleMiddleware(["Суперадмин", "Подписант"]),
  storeHouseController.getOneItemStoreHouse
);

router.delete(
  `/item-storehouse/delete/:id`,
  roleMiddleware(["Суперадмин", "Подписант"]),
  storeHouseController.deleteStoreHouse
);

router.put(
  `/item-storehouse/change`,
  [
    roleMiddleware(["Суперадмин", "Подписант"]),

    check(`IDtypegsm`, `Это значение должно быть числом`).isInt(),

    check(`Liters`, `Это значение должно быть числом`).isFloat(),
  ],
  storeHouseController.updateStoreHouse
);

module.exports = router;
