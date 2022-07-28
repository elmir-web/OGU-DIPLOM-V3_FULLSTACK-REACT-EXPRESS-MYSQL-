import Toast from '../../../../../Toast';

import RemoveRecordService from './RemoveRecord.Service';

const RemoveRecordController = (
  dashboardComponentMount,
  { statusMountRemoveRecord },
  setLoadSpinerActive,
  setStatusMountRemoveRecord
) => {
  setLoadSpinerActive(true);

  setTimeout(() => {
    new Toast({
      title: 'Удаление путевого листа',
      text: 'На сервер был отправлен запрос на удаление путевого листа, ждите...',
      theme: 'light',
      autohide: true,
      interval: 1000,
    });

    setTimeout(async () => {
      const { ok, status, responseFetch } = await RemoveRecordService(
        dashboardComponentMount,
        { statusMountRemoveRecord }
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
        setStatusMountRemoveRecord(null);
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
      setStatusMountRemoveRecord(null);
    }, 1000);
  }, 1000);
};

export default RemoveRecordController;
