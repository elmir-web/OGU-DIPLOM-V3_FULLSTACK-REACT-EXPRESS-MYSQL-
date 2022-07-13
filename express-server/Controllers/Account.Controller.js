const accountService = require("./../Services/Account.Service");

class AccountController {
  async createAccount(req, res) {
    const {
      SurName,
      Name,
      MiddleName,
      LoginUser,
      PasswordUser,
      IDautobases,
      IDposition,
    } = req.body;

    res.status(200).json(req.body);
  }

  async getAccounts() {}

  async getOneAccount() {}

  async deleteAccount() {}

  async updateAccount() {}
}

module.exports = new AccountController();
