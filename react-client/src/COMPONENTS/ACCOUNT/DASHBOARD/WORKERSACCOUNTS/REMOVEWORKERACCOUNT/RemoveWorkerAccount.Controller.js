import Toast from './../../../../../Toast';

import RemoveWorkerAccountService from './RemoveWorkerAccount.Service';

const RemoveWorkerAccountController = (
  dashboardComponentMount,
  { statusMountRemoveWorkerAccount },
  setLoadSpinerActive,
  setStatusMountRemoveWorkerAccount
) => {
  setLoadSpinerActive(true);

  setTimeout(() => {
    new Toast({
      title: 'Удаление аккаунта',
      text: 'На сервер был отправлен запрос на удаление аккаунта, ждите...',
      theme: 'light',
      autohide: true,
      interval: 1000,
    });

    setTimeout(async () => {
      const { ok, status, responseFetch } = await RemoveWorkerAccountService(
        dashboardComponentMount,
        { statusMountRemoveWorkerAccount }
      );

      if (!ok && status === 400) {
        new Toast({
          title: 'Ошибка при удалении аккаунта',
          text: responseFetch.message,
          theme: 'danger',
          autohide: true,
          interval: 3000,
        });

        setLoadSpinerActive(false);
        setStatusMountRemoveWorkerAccount(null);
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
      setStatusMountRemoveWorkerAccount(null);
    }, 1000);
  }, 1000);
};

export default RemoveWorkerAccountController;
