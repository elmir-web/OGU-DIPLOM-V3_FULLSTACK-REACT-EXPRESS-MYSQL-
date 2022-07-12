const Router = require("express");
const autoBaseController = require("./../Controllers/AutoBase.Controller");

const router = new Router();

router.post("/auto-base/create", autoBaseController.createAutoBase);
router.get("/auto-bases/get", autoBaseController.getAutoBases);
router.get("/auto-base/get/:id", autoBaseController.getOneAutoBase);
router.delete("/auto-base/delete", autoBaseController.deleteAutoBase);
router.put("/auto-base/change", autoBaseController.updateAutoBase);

module.exports = router;
