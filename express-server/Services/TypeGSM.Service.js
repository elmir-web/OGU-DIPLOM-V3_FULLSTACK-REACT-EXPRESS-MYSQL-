class TypeGSMService {
  async createTypeGSM({ Name, ForKilo }) {
    try {
      const [rowsTypeGSM] = await global.connectMySQL.execute(
        `INSERT INTO types_gsm (Name, ForKilo) VALUES ('${Name}', '${ForKilo}')`
      );

      if (rowsTypeGSM[`affectedRows`]) return true;
      else return false;
    } catch (err) {
      return false;
    }
  }

  async getTypesGSM() {
    const [rowsAllTypesGSM] = await global.connectMySQL.execute(
      `SELECT * FROM types_gsm`
    );

    return rowsAllTypesGSM;
  }

  async getOneTypeGSM(id) {
    const [rowsAllTypesGSM] = await global.connectMySQL.execute(
      `SELECT * FROM types_gsm WHERE ID = ${id}`
    );

    return rowsAllTypesGSM[0];
  }

  async deleteTypeGSM(id) {
    let [rowsDeletedTypeGSM] = await global.connectMySQL.execute(
      `DELETE FROM types_gsm WHERE ID = ${id}`
    );

    if (rowsDeletedTypeGSM[`affectedRows`]) return true;
    else return false;
  }

  async updateTypeGSM({ ID, Name, ForKilo }) {
    const [rowsUpdatedTypeGSM] = await global.connectMySQL.execute(
      `UPDATE types_gsm SET Name = '${Name}', ForKilo = '${ForKilo}' WHERE ID = ${ID}`
    );

    if (rowsUpdatedTypeGSM[`affectedRows`]) return true;
    else return false;
  }
}

module.exports = new TypeGSMService();
