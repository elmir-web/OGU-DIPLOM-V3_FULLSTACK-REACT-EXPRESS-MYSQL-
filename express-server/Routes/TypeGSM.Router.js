const Router = require(`express`);
const { check } = require(`express-validator`);

const roleMiddleware = require(`./../Middlewares/Role.Middleware`);

const typeGSMController = require(`./../Controllers/TypeGSM.Controller`);

const router = new Router();

router.post(
  `/type-gsm/create`,
  [
    roleMiddleware(["Суперадмин", "Админ"]),

    check(
      `Name`,
      `Название типа ГСМ должно быть от 3 до 100 символов (включительно)`
    ).isLength({
      min: 3,
      max: 100,
    }),

    check(`ForKilo`, `Это значение должно быть числом`).isFloat(),
  ],
  typeGSMController.createTypeGSM
);

router.get(
  `/types-gsm/get`,
  roleMiddleware(["Суперадмин", "Админ"]),
  typeGSMController.getTypesGSM
);

router.get(
  `/type-gsm/get/:id`,
  roleMiddleware(["Суперадмин", "Админ"]),
  typeGSMController.getOneTypeGSM
);

router.delete(
  `/type-gsm/delete/:id`,
  roleMiddleware(["Суперадмин", "Админ"]),
  typeGSMController.deleteTypeGSM
);

router.put(
  `/type-gsm/change`,
  [
    roleMiddleware(["Суперадмин", "Админ"]),

    check(
      `Name`,
      `Название типа ГСМ должно быть от 3 до 100 символов (включительно)`
    ).isLength({
      min: 3,
      max: 100,
    }),

    check(`ForKilo`, `Это значение должно быть числом`).isFloat(),
  ],
  typeGSMController.updateTypeGSM
);

module.exports = router;
