import Toast from '../../../../../Toast';

import ClosedRecordService from './ClosedRecord.Service';

const ClosedRecordController = (
  dashboardComponentMount,
  { statusMountClosedRecord },
  { kilometersTraveled, consumptionOneKilometr },
  setLoadSpinerActive,
  setStatusMountClosedRecord
) => {
  setLoadSpinerActive(true);

  setTimeout(() => {
    new Toast({
      title: 'Изменение путевого листа',
      text: 'На сервер был отправлен запрос на измение путевого листа, ждите...',
      theme: 'light',
      autohide: true,
      interval: 1000,
    });

    setTimeout(async () => {
      const { ok, status, responseFetch } = await ClosedRecordService(
        dashboardComponentMount,
        { statusMountClosedRecord },
        { kilometersTraveled, consumptionOneKilometr }
      );

      if (!ok && status === 400) {
        new Toast({
          title: 'Ошибка при измении путевого листа',
          text: responseFetch.message,
          theme: 'danger',
          autohide: true,
          interval: 3000,
        });

        setLoadSpinerActive(false);
        setStatusMountClosedRecord(null);
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
      setStatusMountClosedRecord(null);
    }, 1000);
  }, 1000);
};

export default ClosedRecordController;
