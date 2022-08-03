import Toast from './../../../../../Toast';

import ChangeVehicleService from './ChangeVehicle.Service';

const ChangeVehicleController = async (
  dashboardComponentMount,
  {
    IDVehicle,
    model,
    number,
    idAutoBase,
    idTypeGSM,
    kilometrs,
    liters,
    expense,
  },
  setLoadSpinerActive,
  setStatusMountChangeVehicle
) => {
  setLoadSpinerActive(true);

  setTimeout(() => {
    if (model.length < 3 || model.length > 100) {
      new Toast({
        title: 'Ошибка',
        text: 'Строка с моделью транспорта от 3 до 100 символов (включительно).',
        theme: 'danger',
        autohide: true,
        interval: 5000,
      });

      setLoadSpinerActive(false);
      return;
    }

    if (number.length < 3 || number.length > 100) {
      new Toast({
        title: 'Ошибка',
        text: 'Строка с гос.номером транспорта от 3 до 100 символов (включительно).',
        theme: 'danger',
        autohide: true,
        interval: 5000,
      });

      setLoadSpinerActive(false);
      return;
    }

    if (!Number.isFinite(Number(kilometrs))) {
      new Toast({
        title: 'Ошибка',
        text: 'Строка с пробегом должна быть числом.',
        theme: 'danger',
        autohide: true,
        interval: 5000,
      });

      setLoadSpinerActive(false);
      return;
    }

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

    if (!Number.isFinite(Number(expense))) {
      new Toast({
        title: 'Ошибка',
        text: 'Строка с расходом должна быть числом.',
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
      const { ok, status, responseFetch } = await ChangeVehicleService(
        dashboardComponentMount,
        {
          IDVehicle,
          model,
          number,
          idAutoBase,
          idTypeGSM,
          kilometrs,
          liters,
          expense,
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
        setStatusMountChangeVehicle(null);
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
      setStatusMountChangeVehicle(null);
    }, 1000);
  }, 1000);
};

export default ChangeVehicleController;
