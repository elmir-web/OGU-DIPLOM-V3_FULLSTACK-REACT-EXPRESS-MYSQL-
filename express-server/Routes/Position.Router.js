const Router = require(`express`);
const { check } = require(`express-validator`);

const roleMiddleware = require(`./../Middlewares/Role.Middleware`);

const positionController = require(`./../Controllers/Position.Controller`);

const router = new Router();

router.post(
  `/position/create`,
  [
    roleMiddleware(["Суперадмин", "Админ"]),

    check(
      `Name`,
      `Название должности не может быть меньше 3 и больше 100 символов (включительно)`
    ).isLength({
      min: 3,
      max: 100,
    }),
  ],
  positionController.createPosition
);

router.get(
  `/positions/get`,
  roleMiddleware(["Суперадмин", "Админ"]),
  positionController.getPositions
);

router.get(
  `/position/get/:id`,
  roleMiddleware(["Суперадмин", "Админ"]),
  positionController.getOnePosition
);

router.delete(
  `/position/delete/:id`,
  roleMiddleware(["Суперадмин", "Админ"]),
  positionController.deletePosition
);

router.put(
  `/position/change`,
  [
    roleMiddleware(["Суперадмин", "Админ"]),

    check(
      `Name`,
      `Название должности не может быть меньше 3 и больше 100 символов (включительно)`
    ).isLength({
      min: 3,
      max: 100,
    }),
  ],
  positionController.updatePosition
);

module.exports = router;
