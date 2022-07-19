const Router = require(`express`);
const { check } = require(`express-validator`);

const roleMiddleware = require(`./../Middlewares/Role.Middleware`);

const recordStatusController = require(`./../Controllers/RecordStatus.Controller`);

const router = new Router();

router.post(
  `/record-status/create`,
  [
    roleMiddleware(["Суперадмин", "Админ"]),

    check(
      `Name`,
      `Название статуса путевого листа не может быть меньше 3 и больше 100 символов (включительно)`
    ).isLength({
      min: 3,
      max: 100,
    }),
  ],
  recordStatusController.createRecordStatus
);

router.get(
  `/records-statuses/get`,
  roleMiddleware(["Суперадмин", "Админ"]),
  recordStatusController.getRecordStatuses
);

router.get(
  `/record-status/get/:id`,
  roleMiddleware(["Суперадмин", "Админ"]),

  recordStatusController.getOneRecordStatus
);

router.delete(
  `/record-status/delete/:id`,
  roleMiddleware(["Суперадмин", "Админ"]),

  recordStatusController.deleteRecordStatus
);

router.put(
  `/record-status/change`,
  [
    roleMiddleware(["Суперадмин", "Админ"]),

    check(
      `Name`,
      `Название статуса путевого листа не может быть меньше 3 и больше 100 символов (включительно)`
    ).isLength({
      min: 3,
      max: 100,
    }),
  ],
  recordStatusController.updateRecordStatus
);

module.exports = router;
