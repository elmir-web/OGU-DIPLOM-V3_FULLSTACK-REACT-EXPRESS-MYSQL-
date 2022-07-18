const axios = require(`axios`);

const {
  SERVER_WORKING_ON_ADRESS,
  SERVER_START_ON_PORT,
} = require(`./../ServerConfig.json`);

class RecordService {
  async createRecord({
    Number,
    RecordStatus,
    DateOpen,
    DateClose,
    KilometrsOpen,
    KilometrsClose,
    UsedLiters,
    IDvehicle,
    IDtypegsm,
    IDsigner,
    IDdriver,
    IDautobase,
  }) {
    try {
      const [rowsRecord] = await global.connectMySQL.execute(
        `INSERT INTO records (Number, RecordStatus, DateOpen, DateClose, KilometrsOpen, KilometrsClose, UsedLiters, IDvehicle, IDtypegsm, IDsigner, IDdriver, IDautobase) VALUES ('${Number}', '${RecordStatus}', '${DateOpen}', '${DateClose}', '${KilometrsOpen}', '${KilometrsClose}', '${UsedLiters}', '${IDvehicle}', '${IDtypegsm}', '${IDsigner}', '${IDdriver}', '${IDautobase}')`
      );

      if (rowsRecord[`affectedRows`]) return true;
      else return false;
    } catch (err) {
      return false;
    }
  }

  async getRecords() {
    const [rowsAllRecords] = await global.connectMySQL.execute(
      `SELECT * FROM records`
    );

    for (let i = 0; i < rowsAllRecords.length; i++) {
      const getRecordStatus = await axios.get(
        `${SERVER_WORKING_ON_ADRESS}:${SERVER_START_ON_PORT}/api/record-status/get/${rowsAllRecords[i].RecordStatus}`
      );

      rowsAllRecords[i].RecordStatus = getRecordStatus.data;

      const getVehicle = await axios.get(
        `${SERVER_WORKING_ON_ADRESS}:${SERVER_START_ON_PORT}/api/vehicle/get/${rowsAllRecords[i].IDvehicle}`
      );

      rowsAllRecords[i].IDvehicle = getVehicle.data;

      const getTypeGSM = await axios.get(
        `${SERVER_WORKING_ON_ADRESS}:${SERVER_START_ON_PORT}/api/type-gsm/get/${rowsAllRecords[i].IDtypegsm}`
      );

      rowsAllRecords[i].IDtypegsm = getTypeGSM.data;

      const getSigner = await axios.get(
        `${SERVER_WORKING_ON_ADRESS}:${SERVER_START_ON_PORT}/api/account/get/${rowsAllRecords[i].IDsigner}`
      );

      rowsAllRecords[i].IDsigner = getSigner.data;

      const getDriver = await axios.get(
        `${SERVER_WORKING_ON_ADRESS}:${SERVER_START_ON_PORT}/api/account/get/${rowsAllRecords[i].IDdriver}`
      );

      rowsAllRecords[i].IDdriver = getDriver.data;

      const getAutobase = await axios.get(
        `${SERVER_WORKING_ON_ADRESS}:${SERVER_START_ON_PORT}/api/auto-base/get/${rowsAllRecords[i].IDautobase}`
      );

      rowsAllRecords[i].IDautobase = getAutobase.data;
    }

    return rowsAllRecords;
  }

  async getOneRecord(id) {
    const [rowsAllRecords] = await global.connectMySQL.execute(
      `SELECT * FROM records WHERE ID = ${id}`
    );

    const getRecordStatus = await axios.get(
      `${SERVER_WORKING_ON_ADRESS}:${SERVER_START_ON_PORT}/api/record-status/get/${rowsAllRecords[0].RecordStatus}`
    );

    rowsAllRecords[0].RecordStatus = getRecordStatus.data;

    const getVehicle = await axios.get(
      `${SERVER_WORKING_ON_ADRESS}:${SERVER_START_ON_PORT}/api/vehicle/get/${rowsAllRecords[0].IDvehicle}`
    );

    rowsAllRecords[0].IDvehicle = getVehicle.data;

    const getTypeGSM = await axios.get(
      `${SERVER_WORKING_ON_ADRESS}:${SERVER_START_ON_PORT}/api/type-gsm/get/${rowsAllRecords[0].IDtypegsm}`
    );

    rowsAllRecords[0].IDtypegsm = getTypeGSM.data;

    const getSigner = await axios.get(
      `${SERVER_WORKING_ON_ADRESS}:${SERVER_START_ON_PORT}/api/account/get/${rowsAllRecords[0].IDsigner}`
    );

    rowsAllRecords[0].IDsigner = getSigner.data;

    const getDriver = await axios.get(
      `${SERVER_WORKING_ON_ADRESS}:${SERVER_START_ON_PORT}/api/account/get/${rowsAllRecords[0].IDdriver}`
    );

    rowsAllRecords[0].IDdriver = getDriver.data;

    const getAutobase = await axios.get(
      `${SERVER_WORKING_ON_ADRESS}:${SERVER_START_ON_PORT}/api/auto-base/get/${rowsAllRecords[0].IDautobase}`
    );

    rowsAllRecords[0].IDautobase = getAutobase.data;

    return rowsAllRecords[0];
  }

  async deleteRecord(id) {
    let [rowsDeletedRecord] = await global.connectMySQL.execute(
      `DELETE FROM records WHERE ID = ${id}`
    );

    if (rowsDeletedRecord[`affectedRows`]) return true;
    else return false;
  }

  async updateRecord({
    ID,
    Number,
    RecordStatus,
    DateOpen,
    DateClose,
    KilometrsOpen,
    KilometrsClose,
    UsedLiters,
    IDvehicle,
    IDtypegsm,
    IDsigner,
    IDdriver,
    IDautobase,
  }) {
    const [rowsUpdatedRecord] = await global.connectMySQL.execute(
      `UPDATE records SET Number = '${Number}', RecordStatus = '${RecordStatus}', DateOpen = '${DateOpen}', DateClose = '${DateClose}', KilometrsOpen = '${KilometrsOpen}', KilometrsClose = '${KilometrsClose}', UsedLiters = '${UsedLiters}', IDvehicle = '${IDvehicle}', IDtypegsm = '${IDtypegsm}', IDsigner = ${IDsigner}, IDdriver = '${IDdriver}', IDautobase = '${IDautobase}' WHERE ID = '${ID}'`
    );

    if (rowsUpdatedRecord[`affectedRows`]) return true;
    else return false;
  }
}

module.exports = new RecordService();
