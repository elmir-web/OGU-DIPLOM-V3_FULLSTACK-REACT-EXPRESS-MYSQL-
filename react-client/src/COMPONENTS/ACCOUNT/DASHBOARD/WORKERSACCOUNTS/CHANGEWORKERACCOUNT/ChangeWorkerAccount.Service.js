import Cookies from 'js-cookie';
const { URL_BACKEND } = require('./../../../../../CONFIG.json');

const ChangeWorkerAccountService = async (
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
) => {
  const tempUserAuthCookie = Cookies.get('GSM_DIPLOM_COOKIES_JWT');

  let responseFetch = await fetch(`${URL_BACKEND}/api/account/change`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${tempUserAuthCookie}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ID: IDWorker,
      SurName: surName,
      Name: name,
      MiddleName: middleName,
      LoginUser: loginUser,
      PasswordUser: passwordUser,
      IDautobases: idAutoBase,
      IDposition: idPosition,
    }),
  });

  const { ok, status } = responseFetch;
  responseFetch = await responseFetch.json();

  dashboardComponentMount();

  return { ok, status, responseFetch };
};

export default ChangeWorkerAccountService;
