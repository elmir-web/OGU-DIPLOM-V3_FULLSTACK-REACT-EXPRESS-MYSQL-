import Toast from './../../../../../Toast';

import RemoveStoreHouseService from './RemoveStoreHouse.Service';

const RemoveStoreHouseController = (
  dashboardComponentMount,
  { statusMountRemoveStoreHouseItem },
  setLoadSpinerActive,
  setStatusMountRemoveStoreHouseItem
) => {
  setLoadSpinerActive(true);

  setTimeout(() => {
    new Toast({
      title: 'Удаление элемента склада',
      text: 'На сервер был отправлен запрос на удаление элемента склада, ждите...',
      theme: 'light',
      autohide: true,
      interval: 1000,
    });

    setTimeout(async () => {
      const { ok, status, responseFetch } = await RemoveStoreHouseService(
        dashboardComponentMount,
        { statusMountRemoveStoreHouseItem }
      );

      if (!ok && status === 400) {
        new Toast({
          title: 'Ошибка при удалении элемента склада',
          text: responseFetch.message,
          theme: 'danger',
          autohide: true,
          interval: 3000,
        });

        setLoadSpinerActive(false);
        setStatusMountRemoveStoreHouseItem(null);
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
      setStatusMountRemoveStoreHouseItem(null);
    }, 1000);
  }, 1000);
};

export default RemoveStoreHouseController;
