const autoBaseService = require("./../Services/AutoBase.Service");

class AutoBaseController {
  createAutoBase(req, res) {
    console.log(req.body);
    res.status(200).json("5");
  }

  getAutoBases(req, res) {}

  getOneAutoBase(req, res) {}

  deleteAutoBase(req, res) {}

  updateAutoBase(req, res) {}
}

module.exports = new AutoBaseController();
