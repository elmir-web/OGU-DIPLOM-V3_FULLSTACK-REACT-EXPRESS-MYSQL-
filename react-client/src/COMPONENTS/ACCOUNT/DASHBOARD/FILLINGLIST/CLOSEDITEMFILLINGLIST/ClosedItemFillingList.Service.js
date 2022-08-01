import Cookies from 'js-cookie';
const { URL_BACKEND } = require('../../../../../CONFIG.json');

const ClosedItemFillingListService = async (
  dashboardComponentMount,
  { statusMountClosedFillingList }
) => {
  const tempUserAuthCookie = Cookies.get('GSM_DIPLOM_COOKIES_JWT');

  let responseFetch = await fetch(`${URL_BACKEND}/api/filling-list/change`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${tempUserAuthCookie}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ID: statusMountClosedFillingList.ID,
      Number: statusMountClosedFillingList.Number,
      Liters: statusMountClosedFillingList.Liters,
      UsedLiters: statusMountClosedFillingList.UsedLiters,
      FillingStatus: 2,
      IDrecord: statusMountClosedFillingList.IDrecord.ID,
    }),
  });

  const { ok, status } = responseFetch;
  responseFetch = await responseFetch.json();

  dashboardComponentMount();

  return { ok, status, responseFetch };
};

export default ClosedItemFillingListService;
