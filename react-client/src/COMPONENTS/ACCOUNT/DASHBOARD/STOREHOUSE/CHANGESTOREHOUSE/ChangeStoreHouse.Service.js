import Cookies from 'js-cookie';
const { URL_BACKEND } = require('./../../../../../CONFIG.json');

const ChangeStoreHouseService = async (
  dashboardComponentMount,
  { idItemStoreHouse, idTypeGSM, liters }
) => {
  const tempUserAuthCookie = Cookies.get('GSM_DIPLOM_COOKIES_JWT');

  let responseFetch = await fetch(`${URL_BACKEND}/api/item-storehouse/change`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${tempUserAuthCookie}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ID: idItemStoreHouse,
      IDtypegsm: idTypeGSM,
      Liters: liters,
    }),
  });

  const { ok, status } = responseFetch;
  responseFetch = await responseFetch.json();

  dashboardComponentMount();

  return { ok, status, responseFetch };
};

export default ChangeStoreHouseService;
