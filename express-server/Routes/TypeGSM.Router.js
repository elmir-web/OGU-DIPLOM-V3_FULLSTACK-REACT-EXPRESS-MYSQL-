const Router = require(`express`);
const { check } = require(`express-validator`);

const typeGSMController = require(`./../Controllers/TypeGSM.Controller`);

const router = new Router();

router.post(
  `/type-gsm/create`,
  [
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

router.get(`/types-gsm/get`, typeGSMController.getTypesGSM);

router.get(`/type-gsm/get/:id`, typeGSMController.getOneTypeGSM);

router.delete(`/type-gsm/delete/:id`, typeGSMController.deleteTypeGSM);

router.put(
  `/type-gsm/change`,
  [
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
