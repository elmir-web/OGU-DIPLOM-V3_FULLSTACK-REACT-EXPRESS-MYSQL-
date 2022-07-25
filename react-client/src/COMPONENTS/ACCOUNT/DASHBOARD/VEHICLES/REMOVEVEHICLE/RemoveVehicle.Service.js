import Cookies from 'js-cookie';
const { URL_BACKEND } = require('./../../../../../CONFIG.json');

const RemoveVehicleService = async (
  dashboardComponentMount,
  { statusMountRemoveVehicle }
) => {
  const tempUserAuthCookie = Cookies.get('GSM_DIPLOM_COOKIES_JWT');

  let responseFetch = await fetch(
    `${URL_BACKEND}/api/vehicle/delete/${statusMountRemoveVehicle.ID}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${tempUserAuthCookie}`,
      },
    }
  );

  const { ok, status } = responseFetch;
  responseFetch = await responseFetch.json();

  dashboardComponentMount();

  return { ok, status, responseFetch };
};

export default RemoveVehicleService;
