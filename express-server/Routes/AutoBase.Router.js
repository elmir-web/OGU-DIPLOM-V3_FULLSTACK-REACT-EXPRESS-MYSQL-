const Router = require(`express`);
const { check } = require(`express-validator`);

const autoBaseController = require(`./../Controllers/AutoBase.Controller`);

const router = new Router();

// TODO: ПРОДОЛЖИТЬ ЗДЕСЬ
router.post(
  `/auto-base/create`,
  [
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

router.get(`/auto-bases/get`, autoBaseController.getAutoBases);

router.get(`/auto-base/get/:id`, autoBaseController.getOneAutoBase);

router.delete(`/auto-base/delete/:id`, autoBaseController.deleteAutoBase);

router.put(
  `/auto-base/change`,
  [
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
