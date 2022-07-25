import Toast from './../../../../../Toast';

import CreateTypeGSMService from './CreateTypeGSM.Service';

const CreateTypeGSMController = (
  dashboardComponentMount,
  { nameTypeGSM, forKiloTypeGSM },
  setLoadSpinerActive,
  setStatusMountCreateTypeGSM
) => {
  setLoadSpinerActive(true);

  setTimeout(() => {
    if (nameTypeGSM.length < 3 || nameTypeGSM.length > 100) {
      new Toast({
        title: 'Ошибка',
        text: 'Строка с названием типа ГСМ от 3 до 100 символов (включительно).',
        theme: 'danger',
        autohide: true,
        interval: 5000,
      });

      setLoadSpinerActive(false);
      return;
    }

    if (!Number.isFinite(Number(forKiloTypeGSM))) {
      new Toast({
        title: 'Ошибка',
        text: 'Строка с весом типа ГСМ должна быть числом.',
        theme: 'danger',
        autohide: true,
        interval: 5000,
      });

      setLoadSpinerActive(false);
      return;
    }

    new Toast({
      title: 'Создание типа ГСМ',
      text: 'На сервер был отправлен запрос на создание типа ГСМ, ждите...',
      theme: 'light',
      autohide: true,
      interval: 1000,
    });

    setTimeout(async () => {
      const { ok, status, responseFetch } = await CreateTypeGSMService(
        dashboardComponentMount,
        {
          nameTypeGSM,
          forKiloTypeGSM,
        }
      );

      if (!ok && status === 400) {
        new Toast({
          title: 'Ошибка при создании типа ГСМ',
          text: responseFetch,
          theme: 'danger',
          autohide: true,
          interval: 3000,
        });
        return;
      }

      new Toast({
        title: 'Вас ждет успех!',
        text: `${responseFetch}`,
        theme: 'success',
        autohide: true,
        interval: 3000,
      });

      setLoadSpinerActive(false);
      setStatusMountCreateTypeGSM(false);
    }, 1000);
  }, 1000);
};

export default CreateTypeGSMController;
