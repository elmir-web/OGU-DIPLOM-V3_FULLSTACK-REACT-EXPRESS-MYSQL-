const accountService = require("./../Services/Account.Service");

class AccountController {
  createAccount(req, res) {
    res.status(200).json(req.body);
  }

  getAccounts() {}

  getOneAccount() {}

  deleteAccount() {}

  updateAccount() {}
}

module.exports = new AccountController();
