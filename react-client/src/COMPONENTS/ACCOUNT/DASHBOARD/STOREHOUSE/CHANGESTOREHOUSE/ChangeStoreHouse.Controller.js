import Toast from './../../../../../Toast';

import ChangeStoreHouseService from './ChangeStoreHouse.Service';

const ChangeStoreHouseController = (
  dashboardComponentMount,
  { idItemStoreHouse, idTypeGSM, liters },
  setLoadSpinerActive,
  setStatusMountChangeStoreHouseItem
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
      title: 'Редактирование элемента склада',
      text: 'На сервер был отправлен запрос на редактирование элемента склада, ждите...',
      theme: 'light',
      autohide: true,
      interval: 1000,
    });

    setTimeout(async () => {
      const { ok, status, responseFetch } = await ChangeStoreHouseService(
        dashboardComponentMount,
        {
          idItemStoreHouse,
          idTypeGSM,
          liters,
        }
      );

      if (!ok && status === 400) {
        new Toast({
          title: 'Ошибка при аккаунта',
          text: responseFetch,
          theme: 'danger',
          autohide: true,
          interval: 3000,
        });

        setLoadSpinerActive(false);
        setStatusMountChangeStoreHouseItem(null);
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
      setStatusMountChangeStoreHouseItem(null);
    }, 1000);
  }, 1000);
};

export default ChangeStoreHouseController;
