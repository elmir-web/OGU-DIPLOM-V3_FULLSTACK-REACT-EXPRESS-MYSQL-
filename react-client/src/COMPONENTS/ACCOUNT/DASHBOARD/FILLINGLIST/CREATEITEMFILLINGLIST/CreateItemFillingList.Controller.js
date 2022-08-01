import Toast from '../../../../../Toast';

import CreateItemFillingListService from './CreateItemFillingList.Service';

const CreateItemFillingListController = (
  dashboardComponentMount,
  { number, liters, IDrecord },
  setLoadSpinerActive,
  setStatusMountCreateItemFillingList
) => {
  setLoadSpinerActive(true);

  setTimeout(() => {
    if (number.length < 3 || number.length > 100) {
      new Toast({
        title: 'Ошибка',
        text: 'Строка с номером заправочной ведомости от 3 до 100 символов (включительно).',
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

    new Toast({
      title: 'Создание путевого листа',
      text: 'На сервер был отправлен запрос на создание путевого листа, ждите...',
      theme: 'light',
      autohide: true,
      interval: 1000,
    });

    setTimeout(async () => {
      const { ok, status, responseFetch } = await CreateItemFillingListService(
        dashboardComponentMount,
        { number, liters, IDrecord }
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
        setStatusMountCreateItemFillingList(false);
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
      setStatusMountCreateItemFillingList(false);
    }, 1000);
  }, 1000);
};

export default CreateItemFillingListController;
