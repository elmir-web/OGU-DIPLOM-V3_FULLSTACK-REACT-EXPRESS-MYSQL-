const axios = require(`axios`);

const vehicleWorkService = require(`./../Services/VehicleWork.Service`);

class VehicleWorkController {
  async getMyVehicle(req, res) {
    const idAccount = req.params.id;

    const result = await vehicleWorkService.getMyVehicle(idAccount);

    if (result === undefined)
      res.status(400).json({
        error: true,
        message: `Транспорта для аккаунта ID "${idAccount}" не существует`,
      });
    else res.status(200).json(result);
  }

  async getMyRecords(req, res) {
    const idAccount = req.params.id;

    const result = await vehicleWorkService.getMyRecords(idAccount);

    if (result === undefined)
      res.status(400).json({
        error: true,
        message: `Путевых листов для аккаунта ID "${idAccount}" не существует`,
      });
    else res.status(200).json(result);
  }
}

module.exports = new VehicleWorkController();
