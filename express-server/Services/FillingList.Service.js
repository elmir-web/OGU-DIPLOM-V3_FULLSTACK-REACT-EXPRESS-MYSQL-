const axios = require(`axios`);

const {
  SERVER_WORKING_ON_ADRESS,
  SERVER_START_ON_PORT,
} = require(`./../ServerConfig.json`);

class FillingListService {
  async CreateItemFillingList({
    Number,
    Liters,
    UsedLiters,
    FillingStatus,
    IDrecord,
  }) {
    try {
      const [rowsFillingList] = await global.connectMySQL.execute(
        `INSERT INTO filling_list (Number, Liters, UsedLiters, FillingStatus, IDrecord) VALUES ('${Number}', '${Liters}', '${UsedLiters}', '${FillingStatus}', '${IDrecord}')`
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

    for (let i = 0; i < rowsAllItemsFillingLists.length; i++) {
      const getRecord = await axios.get(
        `${SERVER_WORKING_ON_ADRESS}:${SERVER_START_ON_PORT}/api/record/get/${rowsAllItemsFillingLists[i].IDrecord}`,
        {
          headers: {
            Authorization: `Bearer system.system.system`,
          },
        }
      );

      rowsAllItemsFillingLists[i].IDrecord = getRecord.data;
    }

    return rowsAllItemsFillingLists;
  }

  async getOneItemFillingList(id) {
    const [rowsAllItemsFillingLists] = await global.connectMySQL.execute(
      `SELECT * FROM filling_list WHERE ID = ${id}`
    );

    const getRecord = await axios.get(
      `${SERVER_WORKING_ON_ADRESS}:${SERVER_START_ON_PORT}/api/record/get/${rowsAllItemsFillingLists[0].IDrecord}`,
      {
        headers: {
          Authorization: `Bearer system.system.system`,
        },
      }
    );

    rowsAllItemsFillingLists[0].IDrecord = getRecord.data;

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
    UsedLiters,
    FillingStatus,
    IDrecord,
  }) {
    const [rowsUpdatedItemFillingList] = await global.connectMySQL.execute(
      `UPDATE filling_list SET Number = '${Number}', Liters = '${Liters}', UsedLiters = '${UsedLiters}', FillingStatus = '${FillingStatus}', IDrecord = '${IDrecord}' WHERE ID = ${ID}`
    );

    if (rowsUpdatedItemFillingList[`affectedRows`]) return true;
    else return false;
  }
}

module.exports = new FillingListService();
