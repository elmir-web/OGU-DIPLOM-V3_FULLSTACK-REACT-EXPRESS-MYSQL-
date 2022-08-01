const axios = require(`axios`);

class VehicleWorkService {
  async getMyVehicle(idAccount) {
    const getMyRecords = await axios.get(
      `http://localhost:8080/api/my-records/by-account/${idAccount}`,
      {
        headers: {
          Authorization: `Bearer system.system.system`,
        },
      }
    );

    let idsMyVehicles = [];

    for (let index = 0; index < getMyRecords.data.length; index++) {
      idsMyVehicles.push(getMyRecords.data[index].IDvehicle.ID);
    }

    idsMyVehicles = [...new Set(idsMyVehicles)];

    const objectsMyVehicles = [];

    for (let index = 0; index < idsMyVehicles.length; index++) {
      const getMyOneVehicle = await axios.get(
        `http://localhost:8080/api/vehicle/get/${idsMyVehicles[index]}`,
        {
          headers: {
            Authorization: `Bearer system.system.system`,
          },
        }
      );

      objectsMyVehicles.push(getMyOneVehicle.data);
    }

    if (objectsMyVehicles.length === 0) return undefined;

    return objectsMyVehicles;
  }

  async getMyRecords(idAccount) {
    const [rowsAllRecords] = await global.connectMySQL.execute(
      `SELECT * FROM records WHERE IDdriver = ${idAccount}`
    );

    if (rowsAllRecords.length === 0) return undefined;

    for (let index = 0; index < rowsAllRecords.length; index++) {
      const getMyOneRecord = await axios.get(
        `http://localhost:8080/api/record/get/${rowsAllRecords[index].ID}`,
        {
          headers: {
            Authorization: `Bearer system.system.system`,
          },
        }
      );

      rowsAllRecords[index] = getMyOneRecord.data;
    }

    return rowsAllRecords;
  }
}

module.exports = new VehicleWorkService();
