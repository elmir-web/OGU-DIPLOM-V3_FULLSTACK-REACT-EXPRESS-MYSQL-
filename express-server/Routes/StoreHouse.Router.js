const Router = require(`express`);
const { check } = require(`express-validator`);

const storeHouseController = require(`./../Controllers/StoreHouse.Controller`);

const router = new Router();

router.post(
  `/item-storehouse/create`,
  [
    check(`IDtypegsm`, `Это значение должно быть числом`).isInt(),

    check(`Liters`, `Это значение должно быть числом`).isFloat(),
  ],
  storeHouseController.createStoreHouse
);

router.get(`/items-storehouse/get`, storeHouseController.getItemsStoreHouse);

router.get(
  `/item-storehouse/get/:id`,
  storeHouseController.getOneItemStoreHouse
);

router.delete(
  `/item-storehouse/delete/:id`,
  storeHouseController.deleteStoreHouse
);

router.put(
  `/item-storehouse/change`,
  [
    check(`IDtypegsm`, `Это значение должно быть числом`).isInt(),

    check(`Liters`, `Это значение должно быть числом`).isFloat(),
  ],
  storeHouseController.updateStoreHouse
);

module.exports = router;
