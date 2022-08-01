const Router = require(`express`);

const vehicleWorkController = require(`./../Controllers/VehicleWork.Controller`);

const roleMiddleware = require(`./../Middlewares/Role.Middleware`);

const router = new Router();

router.get(
  `/my-vehicles/by-account/:id`,
  roleMiddleware(['Суперадмин', 'Водитель']),
  vehicleWorkController.getMyVehicle
);

router.get(
  `/my-records/by-account/:id`,
  roleMiddleware(['Суперадмин', 'Водитель']),
  vehicleWorkController.getMyRecords
);

module.exports = router;
