const Router = require("express");
const { check } = require(`express-validator`);

const accountController = require("./../Controllers/Account.Controller");

const router = new Router();

router.post("/account/create", [], accountController.createAccount);
router.get("/accounts/get", accountController.getAccounts);
router.get("/account/get/:id", accountController.getOneAccount);
router.delete("/account/delete", accountController.deleteAccount);
router.put("/account/change", accountController.updateAccount);

module.exports = router;
