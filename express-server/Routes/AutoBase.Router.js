const Router = require(`express`);
const { check } = require(`express-validator`);

const roleMiddleware = require(`./../Middlewares/Role.Middleware`);

const autoBaseController = require(`./../Controllers/AutoBase.Controller`);

const router = new Router();

router.post(
  `/auto-base/create`,
  [
    roleMiddleware(["Суперадмин", "Админ"]),

    check(
      `Name`,
      `Название автомобильной базы не может быть меньше 3 и больше 100 символов (включительно)`
    ).isLength({
      min: 3,
      max: 100,
    }),
  ],
  autoBaseController.createAutoBase
);

router.get(
  `/auto-bases/get`,
  roleMiddleware(["Суперадмин", "Админ"]),
  autoBaseController.getAutoBases
);

router.get(
  `/auto-base/get/:id`,
  roleMiddleware(["Суперадмин", "Админ"]),
  autoBaseController.getOneAutoBase
);

router.delete(
  `/auto-base/delete/:id`,
  roleMiddleware(["Суперадмин", "Админ"]),
  autoBaseController.deleteAutoBase
);

router.put(
  `/auto-base/change`,
  [
    roleMiddleware(["Суперадмин", "Админ"]),

    check(
      `Name`,
      `Название автомобильной базы не может быть меньше 3 и больше 100 символов (включительно)`
    ).isLength({
      min: 3,
      max: 100,
    }),
  ],
  autoBaseController.updateAutoBase
);

module.exports = router;
