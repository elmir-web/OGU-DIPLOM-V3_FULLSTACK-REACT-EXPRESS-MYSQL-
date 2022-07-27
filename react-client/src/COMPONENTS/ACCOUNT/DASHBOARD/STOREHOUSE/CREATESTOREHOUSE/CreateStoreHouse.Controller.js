import Toast from './../../../../../Toast';

import CreateStoreHouseService from './CreateStoreHouse.Service';

const CreateStoreHouseController = (
  dashboardComponentMount,
  { idTypeGSM, liters },
  setLoadSpinerActive,
  setStatusMountCreateStoreHouseItem
) => {
  setLoadSpinerActive(true);

  setTimeout(() => {
    if (!Number.isFinite(Number(liters))) {
      new Toast({
        title: 'Ошибка',
        text: 'Строка с литрами должна быть числом.',
        theme: 'danger',
        autohide: true,
        interval: 5000,
      });

      setLoadSpinerActive(false);
      return;
    }

    new Toast({
      title: 'Создание элемента склада',
      text: 'На сервер был отправлен запрос на создание элемента склада, ждите...',
      theme: 'light',
      autohide: true,
      interval: 1000,
    });

    setTimeout(async () => {
      const { ok, status, responseFetch } = await CreateStoreHouseService(
        dashboardComponentMount,
        {
          idTypeGSM,
          liters,
        }
      );

      if (!ok && status === 400) {
        new Toast({
          title: 'Ошибка при создании элемента склада',
          text: responseFetch.message,
          theme: 'danger',
          autohide: true,
          interval: 3000,
        });

        setLoadSpinerActive(false);
        setStatusMountCreateStoreHouseItem(false);
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
      setStatusMountCreateStoreHouseItem(false);
    }, 1000);
  }, 1000);
};

export default CreateStoreHouseController;
