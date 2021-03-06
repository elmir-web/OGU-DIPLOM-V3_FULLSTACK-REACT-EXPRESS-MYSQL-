const Router = require(`express`);
const { check } = require(`express-validator`);

const roleMiddleware = require(`./../Middlewares/Role.Middleware`);

const RecordController = require(`./../Controllers/Record.Controller`);

const router = new Router();

router.post(
  `/record/create`,
  [
    roleMiddleware(['Суперадмин', 'Подписант']),

    check(
      `Number`,
      `Гос. номер должен быть от 3 до 100 символов (включительно)`
    ).isLength({
      min: 3,
      max: 100,
    }),

    check(`RecordStatus`, `Статус путевого листа должно быть числом`).isInt(),

    check(`DateOpen`, `Это значение должно быть 10 символов`).isLength({
      min: 10,
      max: 10,
    }),

    check(`KilometrsOpen`, `Пробег открытия должно быть числом`).isInt(),

    check(`UsedLiters`, `Количество литров должно быть числом`).isFloat(),

    check(`IDvehicle`, `Это значение должно быть числом`).isInt(),

    check(`IDtypegsm`, `Это значение должно быть числом`).isInt(),

    check(`IDsigner`, `Это значение должно быть числом`).isInt(),

    check(`IDdriver`, `Это значение должно быть числом`).isInt(),

    check(`IDautobase`, `Это значение должно быть числом`).isInt(),
  ],
  RecordController.createRecord
);
router.get(
  `/records/get`,
  roleMiddleware(['Суперадмин', 'Подписант']),
  RecordController.getRecords
);
router.get(
  `/record/get/:id`,
  roleMiddleware(['Суперадмин', 'Подписант']),
  RecordController.getOneRecord
);
router.delete(
  `/record/delete/:id`,
  roleMiddleware(['Суперадмин', 'Подписант']),
  RecordController.deleteRecord
);
router.put(
  `/record/change`,
  [
    roleMiddleware(['Суперадмин', 'Подписант']),

    check(
      `Number`,
      `Гос. номер должен быть от 3 до 100 символов (включительно)`
    ).isLength({
      min: 3,
      max: 100,
    }),

    check(`RecordStatus`, `Это значение должно быть числом`).isInt(),

    check(`DateOpen`, `Это значение должно быть 10 символов`).isLength({
      min: 10,
      max: 10,
    }),

    check(`KilometrsOpen`, `Это значение должно быть числом`).isInt(),

    check(`UsedLiters`, `Это значение должно быть числом`).isFloat(),

    check(`IDvehicle`, `Это значение должно быть числом`).isInt(),

    check(`IDtypegsm`, `Это значение должно быть числом`).isInt(),

    check(`IDsigner`, `Это значение должно быть числом`).isInt(),

    check(`IDdriver`, `Это значение должно быть числом`).isInt(),

    check(`IDautobase`, `Это значение должно быть числом`).isInt(),
  ],
  RecordController.updateRecord
);

module.exports = router;
