import Cookies from 'js-cookie';
const { URL_BACKEND } = require('./../../../../../CONFIG.json');

const CreateWorkerAccountService = async (
  dashboardComponentMount,
  { surName, name, middleName, loginUser, passwordUser, idAutoBase, idPosition }
) => {
  const tempUserAuthCookie = Cookies.get('GSM_DIPLOM_COOKIES_JWT');

  let responseFetch = await fetch(`${URL_BACKEND}/api/account/create`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${tempUserAuthCookie}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
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

export default CreateWorkerAccountService;
