import Toast from './../../../../../Toast';

import ChangeWorkerAccountService from './ChangeWorkerAccount.Service';

const ChangeWorkerAccountController = (
  dashboardComponentMount,
  {
    IDWorker,
    surName,
    name,
    middleName,
    loginUser,
    passwordUser,
    idAutoBase,
    idPosition,
  },
  setLoadSpinerActive,
  setStatusMountChangeWorkerAccount
) => {
  setLoadSpinerActive(true);

  setTimeout(() => {
    if (surName.length < 3 || surName.length > 50) {
      new Toast({
        title: 'Ошибка',
        text: 'Строка с фамилией от 3 до 50 символов (включительно).',
        theme: 'danger',
        autohide: true,
        interval: 5000,
      });

      setLoadSpinerActive(false);
      return;
    }

    if (name.length < 3 || name.length > 50) {
      new Toast({
        title: 'Ошибка',
        text: 'Строка с именем от 3 до 50 символов (включительно).',
        theme: 'danger',
        autohide: true,
        interval: 5000,
      });

      setLoadSpinerActive(false);
      return;
    }

    if (middleName.length < 3 || middleName.length > 50) {
      new Toast({
        title: 'Ошибка',
        text: 'Строка с отчеством от 3 до 50 символов (включительно).',
        theme: 'danger',
        autohide: true,
        interval: 5000,
      });

      setLoadSpinerActive(false);
      return;
    }

    if (loginUser.length < 3 || loginUser.length > 30) {
      new Toast({
        title: 'Ошибка',
        text: 'Строка с логином от 3 до 30 символов (включительно).',
        theme: 'danger',
        autohide: true,
        interval: 5000,
      });

      setLoadSpinerActive(false);
      return;
    }

    if (passwordUser.length < 3 || passwordUser.length > 30) {
      new Toast({
        title: 'Ошибка',
        text: 'Строка с паролем от 3 до 30 символов (включительно).',
        theme: 'danger',
        autohide: true,
        interval: 5000,
      });

      setLoadSpinerActive(false);
      return;
    }

    new Toast({
      title: 'Редактирование аккаунта',
      text: 'На сервер был отправлен запрос на редактирование аккаунта, ждите...',
      theme: 'light',
      autohide: true,
      interval: 1000,
    });

    setTimeout(async () => {
      const { ok, status, responseFetch } = await ChangeWorkerAccountService(
        dashboardComponentMount,
        {
          IDWorker,
          surName,
          name,
          middleName,
          loginUser,
          passwordUser,
          idAutoBase,
          idPosition,
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
      setStatusMountChangeWorkerAccount(null);
    }, 1000);
  }, 1000);
};

export default ChangeWorkerAccountController;
