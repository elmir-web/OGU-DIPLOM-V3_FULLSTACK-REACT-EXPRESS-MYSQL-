import Cookies from 'js-cookie';
const { URL_BACKEND } = require('./../../../../../CONFIG.json');

const ChangeUpdateService = async (
  { surName, name, middleName, loginUser, passwordUser },
  dataAccount,
  setDataAccount,
  getDataAccount
) => {
  const tempUserAuthCookie = Cookies.get('GSM_DIPLOM_COOKIES_JWT');

  let responseFetch = await fetch(`${URL_BACKEND}/api/account/change`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${tempUserAuthCookie}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ID: dataAccount.ID,
      SurName: surName,
      Name: name,
      MiddleName: middleName,
      LoginUser: loginUser,
      PasswordUser: passwordUser,
      IDautobases: dataAccount.IDautobases.ID,
      IDposition: dataAccount.IDposition.ID,
    }),
  });

  const { ok, status } = responseFetch;
  responseFetch = await responseFetch.json();

  const { responseFetch: myAccount } = await getDataAccount({
    myJWT: tempUserAuthCookie,
  });

  setDataAccount(myAccount);

  return { ok, status, responseFetch };
};

export default ChangeUpdateService;
