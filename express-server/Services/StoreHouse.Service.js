class StoreHouseService {
  async createStoreHouse({ IDtypegsm, Liters }) {
    try {
      const [rowsStoreHouse] = await global.connectMySQL.execute(
        `INSERT INTO storehouse (IDtypegsm, Liters) VALUES ('${IDtypegsm}', '${Liters}')`
      );

      console.log(rowsStoreHouse);

      if (rowsStoreHouse["affectedRows"]) return true;
      else return false;
    } catch (err) {
      return false;
    }
  }

  async getItemsStoreHouse() {
    const [rowsItemsStoreHouse] = await global.connectMySQL.execute(
      `SELECT * FROM storehouse`
    );

    return rowsItemsStoreHouse;
  }

  async getOneItemStoreHouse(id) {
    const [rowsItemStoreHouse] = await global.connectMySQL.execute(
      `SELECT * FROM storehouse WHERE ID = ${id}`
    );

    return rowsItemStoreHouse[0];
  }

  async deleteStoreHouse(id) {
    let [rowsDeletedStoreHouse] = await global.connectMySQL.execute(
      `DELETE FROM storehouse WHERE ID = ${id}`
    );

    if (rowsDeletedStoreHouse["affectedRows"]) return true;
    else return false;
  }

  async updateStoreHouse({ ID, IDtypegsm, Liters }) {
    const [rowsUpdatedStoreHouse] = await global.connectMySQL.execute(
      `UPDATE storehouse SET IDtypegsm = '${IDtypegsm}', Liters = '${Liters}' WHERE ID = ${ID}`
    );

    if (rowsUpdatedStoreHouse["affectedRows"]) return true;
    else return false;
  }
}

module.exports = new StoreHouseService();
