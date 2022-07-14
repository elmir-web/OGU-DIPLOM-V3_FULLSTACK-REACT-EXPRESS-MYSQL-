class AutoBaseService {
  async createAutoBase({ Name }) {
    try {
      const [rowsAutoBase] = await global.connectMySQL.execute(
        `INSERT INTO auto_bases (Name) VALUES ('${Name}')`
      );

      if (rowsAutoBase["affectedRows"]) return true;
      else return false;
    } catch (err) {
      return false;
    }
  }

  async getAutoBases() {
    const [rowsAllAutoBase] = await global.connectMySQL.execute(
      `SELECT * FROM auto_bases`
    );

    return rowsAllAutoBase;
  }

  async getOneAutoBase(id) {
    const [rowsAllAutoBase] = await global.connectMySQL.execute(
      `SELECT * FROM auto_bases WHERE ID = ${id}`
    );

    return rowsAllAutoBase[0];
  }

  async deleteAutoBase(id) {
    let [rowsDeletedAutoBased] = await global.connectMySQL.execute(
      `DELETE FROM auto_bases WHERE ID = ${id}`
    );

    if (rowsDeletedAutoBased["affectedRows"]) return true;
    else return false;
  }

  async updateAutoBase({ ID, Name }) {
    const [rowsUpdatedAutoBase] = await global.connectMySQL.execute(
      `UPDATE auto_bases SET Name = '${Name}' WHERE ID = ${ID}`
    );

    if (rowsUpdatedAutoBase["affectedRows"]) return true;
    else return false;
  }
}

module.exports = new AutoBaseService();
