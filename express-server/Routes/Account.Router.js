const Router = require(`express`);
const { check } = require(`express-validator`);

const authMiddleware = require(`./../Middlewares/Auth.Middleware`);
const roleMiddleware = require(`./../Middlewares/Role.Middleware`);

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

router.get(`/account/my-data`, authMiddleware, accountController.getMyData);

router.post(
  `/account/create`,
  [
    roleMiddleware(["Суперадмин", "Админ"]),

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

router.get(
  `/accounts/get`,
  roleMiddleware(["Суперадмин", "Админ"]),
  accountController.getAccounts
);

router.get(
  `/account/get/:id`,
  roleMiddleware(["Суперадмин", "Админ"]),
  accountController.getOneAccount
);

router.delete(
  `/account/delete/:id`,
  roleMiddleware(["Суперадмин", "Админ"]),
  accountController.deleteAccount
);

router.put(
  `/account/change`,
  [
    roleMiddleware(["Суперадмин", "Админ"]),

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
