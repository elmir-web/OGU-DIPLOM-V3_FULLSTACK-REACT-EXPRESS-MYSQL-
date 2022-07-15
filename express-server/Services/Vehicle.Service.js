class VehicleService {
  async createVehicle({
    Model,
    Number,
    IDautobase,
    IDtypegsm,
    Kilometrs,
    Liters,
    Expense,
  }) {
    try {
      const [rowsVehicles] = await global.connectMySQL.execute(
        `INSERT INTO vehicles (Model, Number, IDautobase, IDtypegsm, Kilometrs, Liters, Expense) VALUES ('${Model}', '${Number}', '${IDautobase}', '${IDtypegsm}', '${Kilometrs}', '${Liters}', '${Expense}')`
      );

      if (rowsVehicles["affectedRows"]) return true;
      else return false;
    } catch (err) {
      return false;
    }
  }

  async getVehicles() {
    const [rowsAllVehicles] = await global.connectMySQL.execute(
      `SELECT * FROM vehicles`
    );

    return rowsAllVehicles;
  }

  async getOneVehicle(id) {
    const [rowsAllTypesGSM] = await global.connectMySQL.execute(
      `SELECT * FROM vehicles WHERE ID = ${id}`
    );

    return rowsAllTypesGSM[0];
  }

  async deleteVehicle(id) {
    let [rowsDeletedVehicle] = await global.connectMySQL.execute(
      `DELETE FROM vehicles WHERE ID = ${id}`
    );

    if (rowsDeletedVehicle["affectedRows"]) return true;
    else return false;
  }

  async updateVehicle({
    ID,
    Model,
    Number,
    IDautobase,
    IDtypegsm,
    Kilometrs,
    Liters,
    Expense,
  }) {
    const [rowsUpdatedVehicle] = await global.connectMySQL.execute(
      `UPDATE vehicles SET Model = '${Model}', Number = '${Number}', IDautobase = '${IDautobase}', IDtypegsm = '${IDtypegsm}', Kilometrs = '${Kilometrs}', Liters = '${Liters}', Expense = '${Expense}' WHERE ID = ${ID}`
    );

    if (rowsUpdatedVehicle["affectedRows"]) return true;
    else return false;
  }
}

module.exports = new VehicleService();
