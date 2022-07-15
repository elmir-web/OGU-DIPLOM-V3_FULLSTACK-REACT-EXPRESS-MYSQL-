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

      if (rowsRecord["affectedRows"]) return true;
      else return false;
    } catch (err) {
      return false;
    }
  }

  async getRecords() {
    const [rowsAllRecords] = await global.connectMySQL.execute(
      `SELECT * FROM records`
    );

    return rowsAllRecords;
  }

  async getOneRecord(id) {
    const [rowsAllTypesGSM] = await global.connectMySQL.execute(
      `SELECT * FROM records WHERE ID = ${id}`
    );

    return rowsAllTypesGSM[0];
  }

  async deleteRecord() {}

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
  }) {}
}

module.exports = new RecordService();
