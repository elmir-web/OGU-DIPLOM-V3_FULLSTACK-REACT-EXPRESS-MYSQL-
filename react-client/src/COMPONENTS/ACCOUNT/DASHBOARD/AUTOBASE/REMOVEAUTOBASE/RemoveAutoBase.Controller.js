import Toast from "./../../../../../Toast";

import RemoveAutoBaseService from "./RemoveAutoBase.Service";

const RemoveAutoBaseComponent = async (
  dashboardComponentMount,
  { statusMountRemoveAutoBase },
  setLoadSpinerActive,
  setStatusMountRemoveAutoBase
) => {
  setLoadSpinerActive(true);

  setTimeout(() => {
    new Toast({
      title: "Удаление автомобильной базы",
      text: "На сервер был отправлен запрос на удаление автомобильной базы, ждите...",
      theme: "light",
      autohide: true,
      interval: 1000,
    });

    setTimeout(async () => {
      const { ok, status, responseFetch } = await RemoveAutoBaseService(
        dashboardComponentMount,
        { statusMountRemoveAutoBase }
      );

      if (!ok && status === 400) {
        new Toast({
          title: "Ошибка при удалении автомобильной базы",
          text: responseFetch.message,
          theme: "danger",
          autohide: true,
          interval: 3000,
        });

        setLoadSpinerActive(false);
        setStatusMountRemoveAutoBase(null);
        return;
      }

      new Toast({
        title: "Вас ждет успех!",
        text: `${responseFetch}`,
        theme: "success",
        autohide: true,
        interval: 3000,
      });

      console.log(responseFetch);

      setLoadSpinerActive(false);
      setStatusMountRemoveAutoBase(null);
    }, 1000);
  }, 1000);
};

export default RemoveAutoBaseComponent;
