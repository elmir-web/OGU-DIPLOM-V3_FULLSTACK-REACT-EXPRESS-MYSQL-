import Toast from "./../../../../../Toast";

import ChangeTypeGSMService from "./ChangeAutoBase.Service";

const ChangeTypeGSMController = (
  dashboardComponentMount,
  { IDTypeGSM, nameTypeGSM, forKiloTypeGSM },
  setLoadSpinerActive,
  setStatusMountChangeTypeGSM
) => {
  setLoadSpinerActive(true);

  setTimeout(() => {
    if (nameTypeGSM.length < 3 || nameTypeGSM.length > 100) {
      new Toast({
        title: "Ошибка",
        text: "Строка с названием типа ГСМ от 3 до 100 символов (включительно).",
        theme: "danger",
        autohide: true,
        interval: 5000,
      });

      setLoadSpinerActive(false);
      return;
    }

    new Toast({
      title: "Редактирование типа ГСМ",
      text: "На сервер был отправлен запрос на редактирование типа ГСМ, ждите...",
      theme: "light",
      autohide: true,
      interval: 1000,
    });

    setTimeout(async () => {
      const { ok, status, responseFetch } = await ChangeTypeGSMService(
        dashboardComponentMount,
        {
          IDTypeGSM,
          nameTypeGSM,
          forKiloTypeGSM,
        }
      );

      if (!ok && status === 400) {
        new Toast({
          title: "Ошибка при редактировании типа ГСМ",
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
      setStatusMountChangeTypeGSM(null);
    }, 1000);
  }, 1000);
};

export default ChangeTypeGSMController;
