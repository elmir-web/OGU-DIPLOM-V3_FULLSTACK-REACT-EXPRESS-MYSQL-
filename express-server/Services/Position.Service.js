class PositionService {
  async createPosition({ Name }) {
    try {
      const [rowsPosition] = await global.connectMySQL.execute(
        `INSERT INTO positions (Name) VALUES ('${Name}')`
      );

      if (rowsPosition[`affectedRows`]) return true;
      else return false;
    } catch (err) {
      return false;
    }
  }

  async getPositions() {
    const [rowsAllPositions] = await global.connectMySQL.execute(
      `SELECT * FROM positions`
    );

    return rowsAllPositions;
  }

  async getOnePosition(id) {
    const [rowsAllPositions] = await global.connectMySQL.execute(
      `SELECT * FROM positions WHERE ID = ${id}`
    );

    return rowsAllPositions[0];
  }

  async deletePosition(id) {
    let [rowsDeletedPosition] = await global.connectMySQL.execute(
      `DELETE FROM positions WHERE ID = ${id}`
    );

    if (rowsDeletedPosition[`affectedRows`]) return true;
    else return false;
  }

  async updatePosition({ ID, Name }) {
    const [rowsUpdatedPosition] = await global.connectMySQL.execute(
      `UPDATE positions SET Name = '${Name}' WHERE ID = ${ID}`
    );

    if (rowsUpdatedPosition[`affectedRows`]) return true;
    else return false;
  }
}

module.exports = new PositionService();
