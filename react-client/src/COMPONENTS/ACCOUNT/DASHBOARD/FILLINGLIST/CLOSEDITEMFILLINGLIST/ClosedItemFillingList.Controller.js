import Toast from '../../../../../Toast';

import ClosedItemFillingListService from './ClosedItemFillingList.Service';

const ClosedItemFillingListController = (
  dashboardComponentMount,
  { statusMountClosedFillingList },
  setLoadSpinerActive,
  setStatusMountClosedFillingList
) => {
  setLoadSpinerActive(true);

  setTimeout(() => {
    new Toast({
      title: 'Изменение заправочной ведомости',
      text: 'На сервер был отправлен запрос на измение заправочной ведомости, ждите...',
      theme: 'light',
      autohide: true,
      interval: 1000,
    });

    setTimeout(async () => {
      const { ok, status, responseFetch } = await ClosedItemFillingListService(
        dashboardComponentMount,
        { statusMountClosedFillingList }
      );

      if (!ok && status === 400) {
        new Toast({
          title: 'Ошибка при измении заправочной ведомости',
          text: responseFetch.message,
          theme: 'danger',
          autohide: true,
          interval: 3000,
        });

        setLoadSpinerActive(false);
        setStatusMountClosedFillingList(null);
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
      setStatusMountClosedFillingList(null);
    }, 1000);
  }, 1000);
};

export default ClosedItemFillingListController;
