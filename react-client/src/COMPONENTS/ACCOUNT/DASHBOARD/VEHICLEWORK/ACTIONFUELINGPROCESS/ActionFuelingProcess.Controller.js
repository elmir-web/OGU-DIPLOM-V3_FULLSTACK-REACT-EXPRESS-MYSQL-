import Toast from '../../../../../Toast';

import ActionFuelingProcessService from './ActionFuelingProcess.Service';

const ActionFuelingProcessController = async (
  dashboardComponentMount,
  {
    fillingListCurrentVeh,
    liters,
    statusMountActionFuelingProcess,
    thisItemStoreHouse,
  },
  setLoadSpinerActive,
  setStatusMountActionFuelingProcess
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
      title: 'Редактирование транспорта',
      text: 'На сервер был отправлен запрос на редактирование транспорта, ждите...',
      theme: 'light',
      autohide: true,
      interval: 1000,
    });

    setTimeout(async () => {
      const { ok, status, responseFetch } = await ActionFuelingProcessService(
        dashboardComponentMount,
        {
          fillingListCurrentVeh,
          liters,
          statusMountActionFuelingProcess,
          thisItemStoreHouse,
        }
      );

      if (!ok && status === 400) {
        new Toast({
          title: 'Ошибка при редактировании транспорта',
          text: responseFetch,
          theme: 'danger',
          autohide: true,
          interval: 3000,
        });

        setLoadSpinerActive(false);
        setStatusMountActionFuelingProcess(null);
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
      setStatusMountActionFuelingProcess(null);
    }, 1000);
  }, 1000);
};

export default ActionFuelingProcessController;
