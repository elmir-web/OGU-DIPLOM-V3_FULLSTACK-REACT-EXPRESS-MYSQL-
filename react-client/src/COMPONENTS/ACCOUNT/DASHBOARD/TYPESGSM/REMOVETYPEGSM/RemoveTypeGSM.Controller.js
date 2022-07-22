import Toast from "./../../../../../Toast";

import RemoveTypeGSMService from "./RemoveAutoBase.Service";

const RemoveTypeGSMController = async (
  dashboardComponentMount,
  { statusMountRemoveTypeGSM },
  setLoadSpinerActive,
  setStatusMountRemoveTypeGSM
) => {
  setLoadSpinerActive(true);

  setTimeout(() => {
    new Toast({
      title: "Удаление типа ГСМ",
      text: "На сервер был отправлен запрос на удаление типа ГСМ, ждите...",
      theme: "light",
      autohide: true,
      interval: 1000,
    });

    setTimeout(async () => {
      const { ok, status, responseFetch } = await RemoveTypeGSMService(
        dashboardComponentMount,
        { statusMountRemoveTypeGSM }
      );

      if (!ok && status === 400) {
        new Toast({
          title: "Ошибка при удалении типа ГСМ",
          text: responseFetch.message,
          theme: "danger",
          autohide: true,
          interval: 3000,
        });

        setLoadSpinerActive(false);
        setStatusMountRemoveTypeGSM(null);
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
      setStatusMountRemoveTypeGSM(null);
    }, 1000);
  }, 1000);
};

export default RemoveTypeGSMController;
