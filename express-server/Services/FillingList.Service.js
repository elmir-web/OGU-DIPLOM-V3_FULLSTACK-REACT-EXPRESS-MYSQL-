class FillingListService {
  async CreateItemFillingList({
    Number,
    Liters,
    usedLiters,
    FilingStatus,
    IDrecord,
  }) {
    try {
      const [rowsFillingList] = await global.connectMySQL.execute(
        `INSERT INTO filling_list (Number, Liters, usedLiters, FilingStatus, IDrecord) VALUES ('${Number}', '${Liters}', '${usedLiters}', '${FilingStatus}', '${IDrecord}')`
      );

      if (rowsFillingList[`affectedRows`]) return true;
      else return false;
    } catch (err) {
      return false;
    }
  }

  async getItemsFillingLists() {
    const [rowsAllItemsFillingLists] = await global.connectMySQL.execute(
      `SELECT * FROM filling_list`
    );

    return rowsAllItemsFillingLists;
  }

  async getOneItemFillingList(id) {
    const [rowsAllItemsFillingLists] = await global.connectMySQL.execute(
      `SELECT * FROM filling_list WHERE ID = ${id}`
    );

    return rowsAllItemsFillingLists[0];
  }

  async deleteItemFillingList(id) {
    let [rowsDeletedItemFillingList] = await global.connectMySQL.execute(
      `DELETE FROM filling_list WHERE ID = ${id}`
    );

    if (rowsDeletedItemFillingList[`affectedRows`]) return true;
    else return false;
  }

  async updateItemFillingList({
    ID,
    Number,
    Liters,
    usedLiters,
    FilingStatus,
    IDrecord,
  }) {
    const [rowsUpdatedItemFillingList] = await global.connectMySQL.execute(
      `UPDATE filling_list SET Number = '${Number}', Liters = '${Liters}', usedLiters = '${usedLiters}', FilingStatus = '${FilingStatus}', IDrecord = '${IDrecord}' WHERE ID = ${ID}`
    );

    if (rowsUpdatedItemFillingList[`affectedRows`]) return true;
    else return false;
  }
}

module.exports = new FillingListService();
