const Router = require(`express`);
const { check } = require(`express-validator`);

const recordStatusController = require(`./../Controllers/RecordStatus.Controller`);

const router = new Router();

router.post(
  `/record-status/create`,
  [
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

router.get(`/records-statuses/get`, recordStatusController.getRecordStatuses);

router.get(`/record-status/get/:id`, recordStatusController.getOneRecordStatus);

router.delete(
  `/record-status/delete/:id`,
  recordStatusController.deleteRecordStatus
);

router.put(
  `/record-status/change`,
  [
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
