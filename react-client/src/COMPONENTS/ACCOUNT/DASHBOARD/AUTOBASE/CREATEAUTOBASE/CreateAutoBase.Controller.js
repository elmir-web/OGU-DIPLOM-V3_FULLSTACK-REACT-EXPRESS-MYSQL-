import Toast from "./../../../../../Toast";

import CreateAutoBaseService from "./CreateAutoBase.Service";

const CreateAutoBaseController = (
  dashboardComponentMount,
  { nameAutoBase },
  setLoadSpinerActive,
  setStatusMountCreateAutoBase
) => {
  setLoadSpinerActive(true);

  setTimeout(() => {
    if (nameAutoBase.length < 3 || nameAutoBase.length > 100) {
      new Toast({
        title: "Ошибка",
        text: "Строка с названием автомобильной базы от 3 до 100 символов (включительно).",
        theme: "danger",
        autohide: true,
        interval: 5000,
      });

      setLoadSpinerActive(false);
      return;
    }

    new Toast({
      title: "Создание автомобильной базы",
      text: "На сервер был отправлен запрос на создание автомобильной базы, ждите...",
      theme: "light",
      autohide: true,
      interval: 1000,
    });

    setTimeout(async () => {
      const { ok, status, responseFetch } = await CreateAutoBaseService(
        dashboardComponentMount,
        {
          nameAutoBase,
        }
      );

      if (!ok && status === 400) {
        new Toast({
          title: "Ошибка при создании автомобильной базы",
          text: responseFetch,
          theme: "danger",
          autohide: true,
          interval: 3000,
        });
        return;
      }

      new Toast({
        title: "Вас ждет успех!",
        text: `${responseFetch}`,
        theme: "success",
        autohide: true,
        interval: 3000,
      });

      setLoadSpinerActive(false);
      setStatusMountCreateAutoBase(false);
    }, 1000);
  }, 1000);
};

export default CreateAutoBaseController;
