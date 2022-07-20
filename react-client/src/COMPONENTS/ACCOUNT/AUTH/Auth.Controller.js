import AuthService from "./Auth.Service";

import Toast from "../../../Toast";

const AuthController = (
  { loginUser, passwordUser },
  setLoadSpinerActive,
  navigate
) => {
  setLoadSpinerActive(true);

  setTimeout(() => {
    if (loginUser.length < 3 || loginUser.length > 30) {
      new Toast({
        title: "Ошибка",
        text: "Строка с логином от 3 до 50 символов (включительно).",
        theme: "danger",
        autohide: true,
        interval: 5000,
      });

      setLoadSpinerActive(false);
      return;
    }

    if (passwordUser.length < 3 || passwordUser.length > 30) {
      new Toast({
        title: "Ошибка",
        text: "Строка с паролем от 3 до 50 символов (включительно).",
        theme: "danger",
        autohide: true,
        interval: 5000,
      });

      setLoadSpinerActive(false);
      return;
    }

    new Toast({
      title: "Авторизация аккаунта",
      text: "На сервер был отправлен запрос на авторизацию аккаунта, ждите...",
      theme: "light",
      autohide: true,
      interval: 1000,
    });

    setTimeout(async () => {
      const { ok, status, responseFetch } = await AuthService({
        loginUser,
        passwordUser,
      });

      if (!ok && status === 400) {
        new Toast({
          title: "Ошибка при авторизации аккаунта",
          text: responseFetch,
          theme: "danger",
          autohide: true,
          interval: 3000,
        });
        return;
      }

      new Toast({
        title: "Вас ждет успех!",
        text: `${responseFetch.message}`,
        theme: "success",
        autohide: true,
        interval: 3000,
      });

      new Toast({
        title: "Переадресация",
        text: `Пожалуйста, оставайтесь на этой странице! Через 3 секунды вас автоматически перенаправит на страницу профиля...`,
        theme: "info",
        autohide: true,
        interval: 5000,
      });

      console.log(ok, status, responseFetch);

      // setTimeout(() => navigate("/account/login"), 3000);
    }, 1000);
  }, 1000);
};

export default AuthController;
