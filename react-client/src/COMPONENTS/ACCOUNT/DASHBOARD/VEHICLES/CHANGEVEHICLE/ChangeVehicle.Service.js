import Cookies from 'js-cookie';
const { URL_BACKEND } = require('./../../../../../CONFIG.json');

const ChangeVehicleService = async (
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
) => {
  const tempUserAuthCookie = Cookies.get('GSM_DIPLOM_COOKIES_JWT');

  let responseFetch = await fetch(`${URL_BACKEND}/api/vehicle/change`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${tempUserAuthCookie}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ID: IDVehicle,
      Model: model,
      Number: number,
      idAutoBase,
      IDautobase: idAutoBase,
      IDtypegsm: idTypeGSM,
      Kilometrs: kilometrs,
      Liters: liters,
      Expense: expense,
    }),
  });

  const { ok, status } = responseFetch;
  responseFetch = await responseFetch.json();

  dashboardComponentMount();

  return { ok, status, responseFetch };
};

export default ChangeVehicleService;
