const Router = require(`express`);
const { check } = require(`express-validator`);

const positionController = require(`./../Controllers/Position.Controller`);

const router = new Router();

router.post(
  `/position/create`,
  [
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

router.get(`/positions/get`, positionController.getPositions);

router.get(`/position/get/:id`, positionController.getOnePosition);

router.delete(`/position/delete/:id`, positionController.deletePosition);

router.put(
  `/position/change`,
  [
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
