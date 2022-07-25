import Cookies from 'js-cookie';
const { URL_BACKEND } = require('./../../../../../CONFIG.json');

const RemoveTypeGSMService = async (
  dashboardComponentMount,
  { statusMountRemoveTypeGSM }
) => {
  const tempUserAuthCookie = Cookies.get('GSM_DIPLOM_COOKIES_JWT');

  let responseFetch = await fetch(
    `${URL_BACKEND}/api/type-gsm/delete/${statusMountRemoveTypeGSM.ID}`,
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

export default RemoveTypeGSMService;
