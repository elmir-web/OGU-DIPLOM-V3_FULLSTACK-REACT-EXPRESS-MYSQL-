import Toast from './../../../../../Toast';

import RemoveVehicleService from './RemoveVehicle.Service';

const RemoveVehicleController = async (
  dashboardComponentMount,
  { statusMountRemoveVehicle },
  setLoadSpinerActive,
  setStatusMountRemoveVehicle
) => {
  setLoadSpinerActive(true);
  setTimeout(() => {
    new Toast({
      title: 'Удаление транспорта',
      text: 'На сервер был отправлен запрос на удаление транспорта, ждите...',
      theme: 'light',
      autohide: true,
      interval: 1000,
    });

    setTimeout(async () => {
      const { ok, status, responseFetch } = await RemoveVehicleService(
        dashboardComponentMount,
        { statusMountRemoveVehicle }
      );

      if (!ok && status === 400) {
        new Toast({
          title: 'Ошибка при удалении транспорта',
          text: responseFetch.message,
          theme: 'danger',
          autohide: true,
          interval: 3000,
        });

        setLoadSpinerActive(false);
        setStatusMountRemoveVehicle(null);
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
      setStatusMountRemoveVehicle(null);
    }, 1000);
  }, 1000);
};

export default RemoveVehicleController;
