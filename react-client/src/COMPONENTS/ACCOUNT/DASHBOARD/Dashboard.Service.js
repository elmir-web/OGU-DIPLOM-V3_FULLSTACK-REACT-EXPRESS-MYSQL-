import Cookies from 'js-cookie';
import Toast from './../../../Toast';

const { URL_BACKEND } = require('./../../../CONFIG.json');

const dashboardDataLoad = (
  dataAccount,
  navigate,
  {
    setAllAutoBase,
    setAllPositions,
    setAllAccounts,
    setAllRecordsStatuses,
    setTypesGSM,
    setStoreHouseItems,
    setAllVehicles,
    setAllRecords,
  }
) => {
  (async () => {
    if (
      Cookies.get('GSM_DIPLOM_COOKIES_JWT') === undefined &&
      dataAccount === null
    ) {
      new Toast({
        title: 'Ошибка',
        text: `Вы не авторизированы в аккаунт!`,
        theme: 'danger',
        autohide: true,
        interval: 10000,
      });

      navigate('/');
      return;
    }

    // datas
    const dataAllAutoBases = await fetch(`${URL_BACKEND}/api/auto-bases/get`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer system.system.system`,
      },
    });

    setAllAutoBase(await dataAllAutoBases.json());

    const dataAllPositions = await fetch(`${URL_BACKEND}/api/positions/get`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer system.system.system`,
      },
    });

    setAllPositions(await dataAllPositions.json());

    const dataAllAccount = await fetch(`${URL_BACKEND}/api/accounts/get`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer system.system.system`,
      },
    });

    setAllAccounts(await dataAllAccount.json());

    const dataRecordsStatuses = await fetch(
      `${URL_BACKEND}/api/records-statuses/get`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer system.system.system`,
        },
      }
    );

    setAllRecordsStatuses(await dataRecordsStatuses.json());

    const dataTypesGSM = await fetch(`${URL_BACKEND}/api/types-gsm/get`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer system.system.system`,
      },
    });

    setTypesGSM(await dataTypesGSM.json());

    const dataStoreHouseItems = await fetch(
      `${URL_BACKEND}/api/items-storehouse/get`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer system.system.system`,
        },
      }
    );

    setStoreHouseItems(await dataStoreHouseItems.json());

    const dataAllVehicles = await fetch(`${URL_BACKEND}/api/vehicles/get`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer system.system.system`,
      },
    });

    setAllVehicles(await dataAllVehicles.json());

    const dataAllRecords = await fetch(`${URL_BACKEND}/api/records/get`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer system.system.system`,
      },
    });

    setAllRecords(await dataAllRecords.json());
  })();
};

export default dashboardDataLoad;
