const Router = require(`express`);
const { check } = require(`express-validator`);

const accountController = require(`./../Controllers/Account.Controller`);

const router = new Router();

router.post(
  `/account/auth`,
  [
    check(
      `LoginUser`,
      `Логин не может быть меньше 3 и больше 30 символов (включительно)`
    ).isLength({
      min: 3,
      max: 30,
    }),

    check(
      `PasswordUser`,
      `Пароль не может быть меньше 3 и больше 30 символов (включительно)`
    ).isLength({
      min: 3,
      max: 30,
    }),
  ],
  accountController.authAccount
);

router.post(
  `/account/create`,
  [
    check(
      `SurName`,
      `Фамилия не может быть меньше 3 и больше 50 символов (включительно)`
    ).isLength({
      min: 3,
      max: 50,
    }),

    check(
      `Name`,
      `Имя не может быть меньше 3 и больше 50 символов (включительно)`
    ).isLength({
      min: 3,
      max: 50,
    }),

    check(
      `MiddleName`,
      `Отчество не может быть меньше 3 и больше 50 символов (включительно)`
    ).isLength({
      min: 3,
      max: 50,
    }),

    check(
      `LoginUser`,
      `Логин не может быть меньше 3 и больше 30 символов (включительно)`
    ).isLength({
      min: 3,
      max: 30,
    }),

    check(
      `PasswordUser`,
      `Пароль не может быть меньше 3 и больше 30 символов (включительно)`
    ).isLength({
      min: 3,
      max: 30,
    }),

    check(`IDautobases`, `Это значение должно быть числом`).isInt(),

    check(`IDposition`, `Это значение должно быть числом`).isInt(),
  ],
  accountController.createAccount
);

router.get(`/accounts/get`, accountController.getAccounts);

router.get(`/account/get/:id`, accountController.getOneAccount);

router.delete(`/account/delete/:id`, accountController.deleteAccount);

router.put(
  `/account/change`,
  [
    check(
      `SurName`,
      `Фамилия не может быть меньше 3 и больше 50 символов (включительно)`
    ).isLength({
      min: 3,
      max: 50,
    }),

    check(
      `Name`,
      `Имя не может быть меньше 3 и больше 50 символов (включительно)`
    ).isLength({
      min: 3,
      max: 50,
    }),

    check(
      `MiddleName`,
      `Отчество не может быть меньше 3 и больше 50 символов (включительно)`
    ).isLength({
      min: 3,
      max: 50,
    }),

    check(
      `LoginUser`,
      `Логин не может быть меньше 3 и больше 30 символов (включительно)`
    ).isLength({
      min: 3,
      max: 30,
    }),

    check(
      `PasswordUser`,
      `Пароль не может быть меньше 3 и больше 30 символов (включительно)`
    ).isLength({
      min: 3,
      max: 30,
    }),

    check(`IDautobases`, `Это значение должно быть числом`).isInt(),

    check(`IDposition`, `Это значение должно быть числом`).isInt(),
  ],
  accountController.updateAccount
);

module.exports = router;
