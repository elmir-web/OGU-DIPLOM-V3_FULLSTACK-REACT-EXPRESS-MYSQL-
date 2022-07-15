const Router = require(`express`);
const { check } = require(`express-validator`);

const vehicleController = require(`../Controllers/Vehicle.Controller`);

const router = new Router();

router.post(
  `/vehicle/create`,
  [
    check(
      `Model`,
      `Название модели должно быть от 3 до 100 символов (включительно)`
    ).isLength({
      min: 3,
      max: 100,
    }),

    check(
      `Number`,
      `Гос. номер должен быть от 3 до 100 символов (включительно)`
    ).isLength({
      min: 3,
      max: 100,
    }),

    check(`IDautobase`, `Это значение должно быть числом`).isInt(),

    check(`IDtypegsm`, `Это значение должно быть числом`).isInt(),

    check(`Kilometrs`, `Это значение должно быть числом`).isInt(),

    check(`Liters`, `Это значение должно быть числом`).isFloat(),

    check(`Expense`, `Это значение должно быть числом`).isFloat(),
  ],
  vehicleController.createVehicle
);

router.get(`/vehicles/get`, vehicleController.getVehicles);

router.get(`/vehicle/get/:id`, vehicleController.getOneVehicle);

router.delete(`/vehicle/delete/:id`, vehicleController.deleteVehicle);

router.put(
  `/vehicle/change`,
  [
    check(
      `Model`,
      `Название модели должно быть от 3 до 100 символов (включительно)`
    ).isLength({
      min: 3,
      max: 100,
    }),

    check(
      `Number`,
      `Гос. номер должен быть от 3 до 100 символов (включительно)`
    ).isLength({
      min: 3,
      max: 100,
    }),

    check(`IDautobase`, `Это значение должно быть числом`).isInt(),

    check(`IDtypegsm`, `Это значение должно быть числом`).isInt(),

    check(`Kilometrs`, `Это значение должно быть числом`).isInt(),

    check(`Liters`, `Это значение должно быть числом`).isFloat(),

    check(`Expense`, `Это значение должно быть числом`).isFloat(),
  ],
  vehicleController.updateVehicle
);

module.exports = router;
