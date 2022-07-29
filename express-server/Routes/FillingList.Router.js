const Router = require(`express`);
const { check } = require(`express-validator`);

const roleMiddleware = require(`./../Middlewares/Role.Middleware`);

const fillingListController = require(`./../Controllers/FillingList.Controller`);

const router = new Router();

router.post(
  `/filling-list/create`,
  [
    roleMiddleware(['Суперадмин', 'Подписант']),

    check(
      `Number`,
      `Учетный номер не может быть меньше 3 и больше 100 символов (включительно)`
    ).isLength({
      min: 3,
      max: 100,
    }),

    check(`Liters`, `Количество литров должно быть числом`).isFloat(),

    check(
      `usedLiters`,
      `Использовано литров значение должно быть числом`
    ).isFloat(),

    check(`FilingStatus`, `Это значение должно быть числом`).isInt(),

    check(`IDrecord`, `Это значение должно быть числом`).isInt(),
  ],
  fillingListController.CreateItemFillingList
);

router.get(
  `/filling-lists/get`,
  roleMiddleware(['Суперадмин', 'Подписант']),
  fillingListController.getItemsFillingLists
);

router.get(
  `/filling-list/get/:id`,
  roleMiddleware(['Суперадмин', 'Подписант']),
  fillingListController.getOneItemFillingList
);

router.delete(
  `/filling-list/delete/:id`,
  roleMiddleware(['Суперадмин', 'Подписант']),
  fillingListController.deleteItemFillingList
);

router.put(
  `/filling-list/change`,
  [
    roleMiddleware(['Суперадмин', 'Подписант']),

    check(
      `Number`,
      `Учетный номер не может быть меньше 3 и больше 100 символов (включительно)`
    ).isLength({
      min: 3,
      max: 100,
    }),

    check(`Liters`, `Это значение должно быть числом`).isFloat(),

    check(`usedLiters`, `Это значение должно быть числом`).isFloat(),

    check(`FilingStatus`, `Это значение должно быть числом`).isInt(),

    check(`IDrecord`, `Это значение должно быть числом`).isInt(),
  ],
  fillingListController.updateItemFillingList
);

module.exports = router;
