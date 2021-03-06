import Cookies from 'js-cookie';
const { URL_BACKEND } = require('../../../../../CONFIG.json');

const CreateItemFillingListService = async (
  dashboardComponentMount,
  { number, liters, IDrecord }
) => {
  const tempUserAuthCookie = Cookies.get('GSM_DIPLOM_COOKIES_JWT');

  let responseFetch = await fetch(`${URL_BACKEND}/api/filling-list/create`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${tempUserAuthCookie}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      Number: number,
      Liters: liters,
      UsedLiters: 0,
      FillingStatus: 1,
      IDrecord: IDrecord,
    }),
  });

  const { ok, status } = responseFetch;
  responseFetch = await responseFetch.json();

  dashboardComponentMount();

  return { ok, status, responseFetch };
};

export default CreateItemFillingListService;
