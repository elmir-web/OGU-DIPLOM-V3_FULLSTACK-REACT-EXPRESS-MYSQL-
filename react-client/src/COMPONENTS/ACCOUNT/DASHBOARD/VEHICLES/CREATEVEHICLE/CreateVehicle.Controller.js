import Toast from './../../../../../Toast';

import CreateVehicleService from './CreateVehicle.Service';

const CreateVehicleController = async (
  dashboardComponentMount,
  { model, number, idAutoBase, idTypeGSM, kilometrs, liters, expense },
  setLoadSpinerActive,
  setStatusMountCreateVehicle
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
      title: 'Создание транспорта',
      text: 'На сервер был отправлен запрос на создание транспорта, ждите...',
      theme: 'light',
      autohide: true,
      interval: 1000,
    });

    setTimeout(async () => {
      const { ok, status, responseFetch } = await CreateVehicleService(
        dashboardComponentMount,
        { model, number, idAutoBase, idTypeGSM, kilometrs, liters, expense }
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
      setStatusMountCreateVehicle(false);
    }, 1000);
  }, 1000);
};

export default CreateVehicleController;
