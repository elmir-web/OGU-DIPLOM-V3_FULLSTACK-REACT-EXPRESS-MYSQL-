class RecordStatusService {
  async createRecordStatus({ Name }) {
    try {
      const [rowsRecordStatus] = await global.connectMySQL.execute(
        `INSERT INTO record_statuses (Name) VALUES ('${Name}')`
      );

      if (rowsRecordStatus["affectedRows"]) return true;
      else return false;
    } catch (err) {
      return false;
    }
  }

  async getRecordStatuses() {
    const [rowsAllRecordStatuses] = await global.connectMySQL.execute(
      `SELECT * FROM record_statuses`
    );

    return rowsAllRecordStatuses;
  }

  async getOneRecordStatus(id) {
    const [rowsAllRecordStatuses] = await global.connectMySQL.execute(
      `SELECT * FROM record_statuses WHERE ID = ${id}`
    );

    return rowsAllRecordStatuses[0];
  }

  async deleteRecordStatus(id) {
    let [rowsDeletedRecordStatus] = await global.connectMySQL.execute(
      `DELETE FROM record_statuses WHERE ID = ${id}`
    );

    if (rowsDeletedRecordStatus["affectedRows"]) return true;
    else return false;
  }

  async updateRecordStatus({ ID, Name }) {
    const [rowsUpdatedRecordStatus] = await global.connectMySQL.execute(
      `UPDATE record_statuses SET Name = '${Name}' WHERE ID = ${ID}`
    );

    if (rowsUpdatedRecordStatus["affectedRows"]) return true;
    else return false;
  }
}

module.exports = new RecordStatusService();
